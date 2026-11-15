import {
  randomBytes,
  createHash,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";
import { receiptStore, RECEIPT_LIMIT } from "./receipts.mjs";
import path from "node:path";
import {
  openDatabase,
  id,
  now,
  customer,
  settings,
  publicProduct,
  orderView,
  settleOrder,
  audit,
  transaction,
} from "./database.mjs";
import {
  verifyStripe,
  stripeCheckout,
  applePayIntent,
  stripeIntent,
} from "./payments.mjs";
import {
  PAYMENT_DEFAULTS,
  paymentReadiness,
  validatePaymentSettings,
  receivingDetails,
  isManual,
} from "./payment-settings.mjs";
import { marketQuote, validCryptoAmount } from "./crypto-quotes.mjs";
const hash = (value) => createHash("sha256").update(value).digest("hex");
const passwordHash = (password) => {
  const salt = randomBytes(16).toString("hex");
  return salt + ":" + scryptSync(password, salt, 64).toString("hex");
};
const checkPassword = (password, stored) => {
  const [salt, key] = stored.split(":");
  return timingSafeEqual(
    scryptSync(password, salt, 64),
    Buffer.from(key, "hex"),
  );
};
const email = (value) =>
  typeof value === "string" &&
  value.length <= 254 &&
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const text = (value, max = 200) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";
const cleanUser = (row) =>
  row
    ? {
        id: row.id,
        email: row.email,
        role: row.role,
        firstName: row.first_name,
        lastName: row.last_name,
        verified: !!row.verified || row.role === "admin",
      }
    : null;
const fail = (status, message) => {
  const error = Error(message);
  error.status = status;
  throw error;
};
async function body(req, limit = 6 * 1024 * 1024) {
  let size = 0;
  const chunks = [];
  for await (const chunk of req) {
    size += chunk.length;
    if (size > limit) fail(413, "Request is too large");
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}
export async function createApi({
  filename,
  dataDir,
  databaseUrl = "",
  database,
  receipts,
  cloud = false,
  setupToken = "",
  adminEmail = "",
  allowedHosts = [],
  supabaseUrl = "",
  supabaseSecret = "",
  baseUrl = "http://localhost:4173",
  stripeKey = "",
  stripeWebhook = "",
  stripePublishable = "",
  fetcher = fetch,
} = {}) {
  if (cloud && !databaseUrl && !database)
    throw Error("DATABASE_URL is required on Vercel");
  const db = database || (await openDatabase(filename, { databaseUrl }));
  const env = { baseUrl, stripeKey, stripeWebhook };
  const storage =
    receipts ||
    (await receiptStore({ dataDir, supabaseUrl, supabaseSecret, cloud }));
  async function limited(req, key, max = 20) {
    const at = Date.now(),
      expires = at + 15 * 60000,
      bucket = hash(
        key + ":" + (req.clientAddress || req.socket.remoteAddress),
      );
    await db.prepare("DELETE FROM rate_limits WHERE expires_at<?").run(at);
    const current = await db
      .prepare(
        "INSERT INTO rate_limits(key,hits,expires_at) VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET hits=CASE WHEN rate_limits.expires_at<? THEN 1 ELSE rate_limits.hits+1 END,expires_at=CASE WHEN rate_limits.expires_at<? THEN ? ELSE rate_limits.expires_at END RETURNING hits",
      )
      .get(bucket, expires, at, at, expires);
    if (current.hits > max) fail(429, "Too many attempts. Please try later.");
  }
  async function session(req) {
    const token = (req.headers.cookie || "")
      .split(";")
      .map((v) => v.trim())
      .find((v) => v.startsWith("exclusive_session="))
      ?.slice(18);
    if (!token) return null;
    return await db
      .prepare(
        "SELECT a.* FROM sessions s JOIN accounts a ON a.id=s.account_id WHERE s.token_hash=? AND s.expires_at>?",
      )
      .get(hash(token), Date.now());
  }
  async function cookie(res, account) {
    const token = randomBytes(32).toString("hex");
    await db.prepare("DELETE FROM sessions WHERE expires_at<?").run(Date.now());
    await db
      .prepare("INSERT INTO sessions VALUES(?,?,?)")
      .run(hash(token), account.id, Date.now() + 8 * 3600000);
    res.setHeader(
      "Set-Cookie",
      `exclusive_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=28800${baseUrl.startsWith("https:") ? "; Secure" : ""}`,
    );
  }
  async function admin(req) {
    const user = await session(req);
    if (!user || user.role !== "admin")
      fail(401, "Sign in with an administrator account");
    return user;
  }
  async function orderAccess(req, url) {
    const row = await db
      .prepare(
        "SELECT o.*,c.email,c.name AS customer_name FROM orders o JOIN customers c ON c.id=o.customer_id WHERE o.id=?",
      )
      .get(url.searchParams.get("order") || "");
    if (!row) fail(404, "Order not found");
    const token = url.searchParams.get("token") || "";
    if (token.length < 32 || hash(token) !== row.access_token_hash)
      fail(403, "Invalid order link");
    return row;
  }
  async function config() {
    const s = await settings(db);
    return {
      brand: s.brand,
      country: "US",
      currency: "USD",
      renewal: "manual",
      ...paymentReadiness(s),
      supportEmail: s.supportEmail,
      emailConfigured: false,
    };
  }
  const reply = (res, value, status = 200) => {
    res.writeHead(status, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    });
    res.end(JSON.stringify(value));
    return true;
  };
  async function webhook(req, res, route, raw) {
    let event;
    try {
      event = JSON.parse(raw);
    } catch {
      fail(400, "Invalid webhook");
    }
    if (route === "/api/webhooks/stripe") {
      if (!verifyStripe(raw, req.headers["stripe-signature"], stripeWebhook))
        fail(400, "Invalid webhook signature");
      if (!event.id || typeof event.id !== "string")
        fail(400, "Missing event ID");
      if (
        await db
          .prepare("SELECT id FROM webhook_events WHERE id=?")
          .get("stripe:" + event.id)
      )
        return reply(res, { received: true, duplicate: true });
      const data = event.data?.object;
      if (event.type === "payment_intent.succeeded") {
        const order = await db
          .prepare(
            "SELECT * FROM orders WHERE provider_id=? AND method='applepay'",
          )
          .get(data?.id || "");
        if (
          !order ||
          data.status !== "succeeded" ||
          data.metadata?.order_id !== order.id ||
          data.amount_received !== order.amount_cents ||
          data.currency !== "usd" ||
          !!event.livemode !== (order.provider_mode === "live")
        )
          fail(400, "Apple Pay payment does not match the stored order");
        const intent = await stripeIntent(order.provider_id, env, fetcher);
        if (
          intent.status !== "succeeded" ||
          intent.amount_received !== order.amount_cents ||
          intent.currency !== "usd" ||
          intent.metadata?.order_id !== order.id ||
          !!intent.livemode !== (order.provider_mode === "live") ||
          intent.latest_charge?.payment_method_details?.card?.wallet?.type !==
            "apple_pay"
        )
          fail(
            400,
            "Stripe did not verify an Apple Pay payment for this order",
          );
        await settleOrder(db, order.id, "stripe-webhook", intent.id);
      }

      if (
        [
          "checkout.session.completed",
          "checkout.session.async_payment_succeeded",
        ].includes(event.type) &&
        data?.payment_status === "paid"
      ) {
        const order = await db
          .prepare(
            "SELECT * FROM orders WHERE provider_id=? AND method IN('card','crypto')",
          )
          .get(data.id);
        if (
          !order ||
          data.client_reference_id !== order.id ||
          data.metadata?.order_id !== order.id ||
          data.amount_total !== order.amount_cents ||
          data.currency !== "usd" ||
          !!event.livemode !== (order.provider_mode === "live")
        )
          fail(400, "Payment does not match the stored order");
        await settleOrder(
          db,
          order.id,
          "stripe-webhook",
          typeof data.payment_intent === "string" ? data.payment_intent : null,
        );
      }
      if (
        event.type === "charge.refunded" &&
        data?.refunded &&
        data.payment_intent
      ) {
        const order = await db
          .prepare("SELECT * FROM orders WHERE provider_payment_id=?")
          .get(data.payment_intent);
        if (order) {
          await transaction(db, async () => {
            await db
              .prepare(
                "UPDATE orders SET payment_status='refunded',status='refunded' WHERE id=?",
              )
              .run(order.id);
            await db
              .prepare(
                "UPDATE memberships SET status='cancelled' WHERE order_id=?",
              )
              .run(order.id);
            await audit(db, "stripe-webhook", "refund_confirmed", order.id);
          });
        }
      }
      await db
        .prepare("INSERT OR IGNORE INTO webhook_events VALUES(?,?,?)")
        .run("stripe:" + event.id, "stripe", now());
      return reply(res, { received: true });
    }
    fail(404, "Webhook provider not configured");
  }
  async function handle(req, res) {
    const url = new URL(req.url, baseUrl),
      route = url.pathname,
      method = req.method || "GET";
    if (!route.startsWith("/api/")) return false;
    try {
      const host = req.headers.host || "";
      const allowed = new Set([
        new URL(baseUrl).host,
        ...allowedHosts,
        ...(!cloud
          ? [
              `localhost:${new URL(baseUrl).port || 80}`,
              `127.0.0.1:${new URL(baseUrl).port || 80}`,
            ]
          : []),
      ]);
      if (!allowed.has(host)) fail(403, "Unrecognized host");
      if (route === "/api/webhooks/stripe") {
        if (method !== "POST") fail(405, "POST required");
        await webhook(req, res, route, await body(req, 1024 * 1024));
        return true;
      }
      let input = {};
      if (["POST", "PATCH", "PUT", "DELETE"].includes(method)) {
        if (
          req.headers.origin !== new URL(baseUrl).origin &&
          req.headers.origin !== (cloud ? "https://" : "http://") + host
        )
          fail(403, "Same-origin request required");
        if (
          !String(req.headers["content-type"] || "").startsWith(
            "application/json",
          )
        )
          fail(415, "JSON request required");
        try {
          input = JSON.parse(await body(req));
        } catch (error) {
          if (error.status) throw error;
          fail(400, "Invalid JSON");
        }
      }
      if (route === "/api/status" && method === "GET")
        return reply(res, {
          ...(await config()),
          setupTokenRequired: cloud,
          adminReady: !!(await db
            .prepare("SELECT id FROM accounts WHERE role='admin'")
            .get()),
        });
      if (route === "/api/catalog" && method === "GET")
        return reply(res, {
          products: (
            await db
              .prepare(
                "SELECT * FROM products WHERE active=1 ORDER BY sort_order,id",
              )
              .all()
          ).map(publicProduct),
        });
      if (route === "/api/payment-instructions/applepay" && method === "GET") {
        const cfg = await config();
        if (!cfg.applePayConfigured)
          fail(404, "These payment instructions are not available");
        return reply(res, {
          instructions: receivingDetails("applepay", await settings(db)),
        });
      }
      if (route === "/api/admin/setup" && method === "POST") {
        await limited(req, "setup", 5);
        if (cloud) {
          if (
            !setupToken ||
            hash(String(input.setupToken || "")) !== hash(setupToken)
          )
            fail(403, "A valid administrator setup token is required");
          if (
            adminEmail &&
            text(input.email, 254).toLowerCase() !== adminEmail.toLowerCase()
          )
            fail(403, "Use the configured administrator email");
        } else if (
          !["127.0.0.1", "::1", "::ffff:127.0.0.1"].includes(
            req.socket.remoteAddress,
          )
        )
          fail(403, "Setup is available on this computer only");
        if (
          await db.prepare("SELECT id FROM accounts WHERE role='admin'").get()
        )
          fail(409, "Administrator already configured");
        if (
          !email(input.email) ||
          typeof input.password !== "string" ||
          input.password.length < 12 ||
          input.password.length > 128 ||
          !text(input.name)
        )
          fail(
            400,
            "Enter your name, a valid email, and a password of 12–128 characters",
          );
        const user = await transaction(db, async () => {
          if (db.dialect === "postgres")
            await db.exec(
              "LOCK TABLE clubwallen.accounts IN SHARE ROW EXCLUSIVE MODE",
            );
          if (
            await db.prepare("SELECT id FROM accounts WHERE role='admin'").get()
          )
            fail(409, "Administrator already configured");
          const uid = id("usr");
          await db
            .prepare(
              "INSERT INTO accounts(id,email,password_hash,role,first_name,last_name,created_at,verified) VALUES(?,?,?,?,?,?,?,1)",
            )
            .run(
              uid,
              input.email.toLowerCase().trim(),
              passwordHash(input.password),
              "admin",
              text(input.name),
              "",
              now(),
            );
          const created = await db
            .prepare("SELECT * FROM accounts WHERE id=?")
            .get(uid);
          await audit(db, uid, "admin_created", uid);
          return created;
        });
        await cookie(res, user);
        return reply(res, { user: cleanUser(user) }, 201);
      }
      if (route === "/api/auth/login" && method === "POST") {
        await limited(req, "login");
        const account = await db
          .prepare("SELECT * FROM accounts WHERE email=?")
          .get(text(input.email, 254).toLowerCase());
        const password =
          typeof input.password === "string" ? input.password : "";
        if (
          password.length > 128 ||
          !account ||
          !checkPassword(password, account.password_hash)
        )
          fail(401, "Incorrect email or password");
        await cookie(res, account);
        return reply(res, { user: cleanUser(account) });
      }
      if (route === "/api/auth/signup" && method === "POST") {
        await limited(req, "signup");
        if (
          !email(input.email) ||
          !text(input.firstName) ||
          typeof input.password !== "string" ||
          input.password.length < 12 ||
          input.password.length > 128
        )
          fail(
            400,
            "Enter a valid email, first name, and password of 12–128 characters",
          );
        if (
          await db
            .prepare("SELECT id FROM accounts WHERE email=?")
            .get(input.email.toLowerCase().trim())
        )
          fail(409, "An account with this email already exists");
        const user = await transaction(db, async () => {
          const uid = id("usr");
          await db
            .prepare(
              "INSERT INTO accounts(id,email,password_hash,role,first_name,last_name,created_at) VALUES(?,?,?,?,?,?,?)",
            )
            .run(
              uid,
              input.email.toLowerCase().trim(),
              passwordHash(input.password),
              "customer",
              text(input.firstName),
              text(input.lastName),
              now(),
            );
          await customer(
            db,
            input.email.toLowerCase().trim(),
            `${text(input.firstName)} ${text(input.lastName)}`.trim(),
          );
          return await db.prepare("SELECT * FROM accounts WHERE id=?").get(uid);
        });
        await cookie(res, user);
        return reply(res, { user: cleanUser(user) }, 201);
      }
      if (route === "/api/auth/me" && method === "GET")
        return reply(res, { user: cleanUser(await session(req)) });
      if (route === "/api/auth/logout" && method === "POST") {
        const token = (req.headers.cookie || "").match(
          /exclusive_session=([^;]+)/,
        )?.[1];
        if (token)
          await db
            .prepare("DELETE FROM sessions WHERE token_hash=?")
            .run(hash(token));
        res.setHeader(
          "Set-Cookie",
          "exclusive_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0",
        );
        return reply(res, { success: true });
      }
      if (route === "/api/account" && method === "GET") {
        const user = await session(req);
        if (!user) fail(401, "Please sign in");
        if (!user.verified && user.role !== "admin")
          return reply(res, {
            user: cleanUser(user),
            verificationRequired: true,
            orders: [],
            memberships: [],
            messages: [],
          });
        const client = await db
          .prepare("SELECT * FROM customers WHERE email=?")
          .get(user.email);
        return reply(res, {
          user: cleanUser(user),
          orders: client
            ? (
                await db
                  .prepare(
                    "SELECT * FROM orders WHERE customer_id=? ORDER BY created_at DESC",
                  )
                  .all(client.id)
              ).map(orderView)
            : [],
          memberships: client
            ? await db
                .prepare(
                  "SELECT m.*,p.name FROM memberships m JOIN products p ON p.id=m.product_id WHERE customer_id=? ORDER BY expires_at DESC",
                )
                .all(client.id)
            : [],
          messages: client
            ? (
                await db
                  .prepare(
                    "SELECT * FROM messages WHERE customer_id=? ORDER BY created_at DESC",
                  )
                  .all(client.id)
              ).map((m) => ({ ...m, replies: JSON.parse(m.replies) }))
            : [],
        });
      }
      if (route === "/api/orders" && method === "POST") {
        await limited(req, "checkout", 100);
        const cfg = await config();
        if (!cfg.methods.includes(input.method))
          fail(400, "Choose Apple Pay, Bitcoin, USDT, or wire transfer");
        const ready = {
          applepay: cfg.applePayConfigured,
          btc: cfg.btcConfigured,
          usdt: cfg.usdtConfigured,
          wire: cfg.wireConfigured,
        };
        if (!ready[input.method])
          fail(
            503,
            "This payment method has not been configured by the business yet.",
          );
        if (!email(input.email) || !text(input.name))
          fail(400, "Enter your name and a valid email");
        if (
          !Array.isArray(input.items) ||
          input.items.length < 1 ||
          input.items.length > 30
        )
          fail(400, "Your cart must contain 1–30 items");
        const seen = new Set(),
          items = await Promise.all(
            input.items.map(async (item) => {
              if (
                !Number.isInteger(item.quantity) ||
                item.quantity < 1 ||
                item.quantity > 20
              )
                fail(400, "Invalid item quantity");
              const p = await db
                .prepare("SELECT * FROM products WHERE id=? AND active=1")
                .get(text(item.productId, 100));
              if (!p) fail(400, "A product is no longer available");
              const size = text(item.size, 40);
              const key = p.id + ":" + size;
              if (seen.has(key)) fail(400, "Duplicate cart item");
              seen.add(key);
              if (p.kind === "membership" && item.quantity !== 1)
                fail(400, "Membership quantities must be one");
              if (p.inventory !== null && p.inventory < item.quantity)
                fail(409, "Not enough inventory for " + p.name);
              const sizes = JSON.parse(p.sizes);
              if (sizes.length && !sizes.includes(size))
                fail(400, "Choose an available size for " + p.name);
              return {
                productId: p.id,
                name: p.name,
                kind: p.kind,
                unitPrice: p.price_cents,
                quantity: item.quantity,
                size,
              };
            }),
          );
        const membershipCount = items.filter(
          (i) => i.kind === "membership",
        ).length;
        if (membershipCount > 1) fail(400, "Choose one membership per order");
        const subtotal = items.reduce(
            (sum, i) => sum + i.unitPrice * i.quantity,
            0,
          ),
          shipping =
            items.some((i) => i.kind === "merch") && subtotal <= 10000
              ? 999
              : 0;

        const address = Object.fromEntries(
          ["line1", "city", "state", "zip", "country"].map((key) => [
            key,
            text(input.address?.[key], 200),
          ]),
        );
        if (
          items.some((i) => i.kind === "merch") &&
          ["line1", "city", "state", "zip", "country"].some(
            (key) => !address[key],
          )
        )
          fail(400, "Enter a complete shipping address");
        const oid = id("ord"),
          token = randomBytes(32).toString("hex"),
          client = await customer(
            db,
            input.email.toLowerCase().trim(),
            text(input.name),
          );
        const savedSettings = await settings(db);
        if (input.method === "usdt" && !cfg.usdtNetworks.some(n => n.network === input.network))
          fail(400, "Choose an available USDT receiving network");
        const details = receivingDetails(input.method, savedSettings, input.network);
        if (["btc", "usdt"].includes(input.method)) {
          try {
            Object.assign(
              details,
              await marketQuote(input.method, subtotal + shipping, fetcher),
            );
          } catch {
            details.quoteRequested = true;
          }
        }
        await db
          .prepare(
            "INSERT INTO orders(id,customer_id,method,amount_cents,items,address,access_token_hash,provider_mode,created_at,payment_details) VALUES(?,?,?,?,?,?,?,?,?,?)",
          )
          .run(
            oid,
            client.id,
            input.method,
            subtotal + shipping,
            JSON.stringify(items),
            JSON.stringify(address),
            hash(token),
            "live",
            now(),
            JSON.stringify(details),
          );
        const resultUrl = `/checkout/result?order=${oid}&token=${token}`;
        if (details.quoteRequested)
          await db
            .prepare("UPDATE orders SET status='quote_requested' WHERE id=?")
            .run(oid);
        return reply(res, { orderId: oid, url: resultUrl }, 201);
      }

      if (route === "/api/order" && method === "GET") {
        const order = await orderAccess(req, url);
        const publicOrder = {
          id: order.id,
          payment_status: order.payment_status,
          status: order.status,
          method: order.method,
          amount_cents: order.amount_cents,
          currency: order.currency,
          items: JSON.parse(order.items),
          reference: order.reference,
          receiptUploaded: !!order.receipt,
          created_at: order.created_at,
          payment_details: JSON.parse(order.payment_details || "{}"),
        };
        return reply(res, {
          order: publicOrder,
        });
      }
      if (route === "/api/order/applepay" && method === "GET") {
        const order = await orderAccess(req, url);
        if (
          order.method !== "applepay" ||
          !order.provider_id ||
          order.payment_status === "paid"
        )
          fail(409, "This order does not need Apple Pay");
        const intent = await stripeIntent(order.provider_id, env, fetcher);
        if (
          intent.metadata?.order_id !== order.id ||
          intent.amount !== order.amount_cents ||
          intent.currency !== "usd"
        )
          fail(409, "The payment does not match this order");
        return reply(res, {
          clientSecret: intent.client_secret,
          publishableKey: stripePublishable,
          returnUrl: baseUrl + "/checkout/result" + url.search,
        });
      }
      if (route === "/api/order/quote" && method === "POST") {
        await limited(req, "quote", 20);
        const order = await orderAccess(req, url);
        if (
          !["btc", "usdt"].includes(order.method) ||
          !["unpaid", "rejected"].includes(order.payment_status)
        )
          fail(409, "This order does not accept a new quote");
        const details = JSON.parse(order.payment_details || "{}");
        try {
          Object.assign(
            details,
            await marketQuote(order.method, order.amount_cents, fetcher),
          );
          details.quoteRequested = false;
        } catch {
          details.quoteRequested = true;
        }
        await db
          .prepare(
            "UPDATE orders SET payment_details=?,status=? WHERE id=? AND payment_status IN('unpaid','rejected')",
          )
          .run(
            JSON.stringify(details),
            details.quoteRequested ? "quote_requested" : "pending",
            order.id,
          );
        await audit(db, "customer", "crypto_quote_requested", order.id);
        return reply(res, { success: true });
      }
      if (route === "/api/order/proof" && method === "POST") {
        await limited(req, "proof", 20);
        const order = await orderAccess(req, url);
        if (
          !isManual(order.method) ||
          (order.method === "applepay" &&
            JSON.parse(order.payment_details || "{}").type !==
              "manual_instructions") ||
          !["unpaid", "rejected"].includes(order.payment_status)
        )
          fail(409, "This order does not accept a receipt");
        const reference = text(input.reference, 200);
        if (
          ["btc", "usdt"].includes(order.method) &&
          !(
            /^[a-fA-F0-9]{64}$/.test(reference) ||
            (order.method === "usdt" && /^0x[a-fA-F0-9]{64}$/.test(reference))
          )
        )
          fail(400, "Enter the blockchain transaction hash");
        if (!reference) fail(400, "Enter the transfer reference");
        if (
          ["btc", "usdt"].includes(order.method) &&
          !JSON.parse(order.payment_details || "{}").amount
        )
          fail(409, "Wait for an exact crypto amount before sending payment");
        const match =
          typeof input.image === "string" &&
          input.image.match(
            /^data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/=]+)$/,
          );
        if (input.image && !match)
          fail(400, "Upload a PNG, JPEG, or WebP receipt");
        const needsReceipt =
          ["wire", "cashapp"].includes(order.method) ||
          (order.method === "applepay" &&
            JSON.parse(order.payment_details || "{}").receiptRequired);
        if (needsReceipt && !match)
          fail(400, "Upload a receipt image for this transfer");
        let receipt = null;
        if (match) {
          const bytes = Buffer.from(match[2], "base64");
          if (bytes.length < 12 || bytes.length > RECEIPT_LIMIT)
            fail(400, "Receipt must be under 3 MB");
          const valid =
            match[1] === "png"
              ? bytes
                  .subarray(0, 8)
                  .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
              : match[1] === "jpeg"
                ? bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255
                : bytes.toString("ascii", 0, 4) === "RIFF" &&
                  bytes.toString("ascii", 8, 12) === "WEBP";
          if (!valid) fail(400, "The file is not a valid receipt image");
          receipt = id("receipt") + "." + match[1];
          await storage.put(receipt, bytes, "image/" + match[1]);
        }
        await db
          .prepare(
            "UPDATE orders SET receipt=?,reference=?,payment_status='awaiting_review' WHERE id=? AND payment_status IN('unpaid','rejected')",
          )
          .run(receipt, text(input.reference, 200), order.id);
        await audit(db, "customer", "receipt_submitted", order.id);
        return reply(res, { success: true, payment_status: "awaiting_review" });
      }
      if (
        (route === "/api/support" || route === "/api/notify-admin") &&
        method === "POST"
      ) {
        await limited(req, "support", 30);
        const data = route === "/api/notify-admin" ? input.data || {} : input;
        if (route === "/api/notify-admin" && input.type !== "support_message")
          return reply(res, { success: true, emailSent: false });
        if (
          !email(data.email) ||
          !text(data.name) ||
          !text(data.message, 10000)
        )
          fail(400, "Enter your name, email, and message");
        const client = await customer(
          db,
          data.email.toLowerCase().trim(),
          text(data.name),
        );
        await db
          .prepare(
            "INSERT INTO messages(id,customer_id,subject,body,created_at) VALUES(?,?,?,?,?)",
          )
          .run(
            id("msg"),
            client.id,
            text(data.subject) || "Support Request",
            text(data.message, 10000),
            now(),
          );
        return reply(res, { success: true, emailSent: false }, 201);
      }
      if (route.startsWith("/api/admin/")) {
        const user = await admin(req);
        if (route === "/api/admin/overview" && method === "GET")
          return reply(res, {
            customers: (
              await db.prepare("SELECT COUNT(*) AS n FROM customers").get()
            ).n,
            orders: (await db.prepare("SELECT COUNT(*) AS n FROM orders").get())
              .n,
            paidCents: (
              await db
                .prepare(
                  "SELECT COALESCE(SUM(amount_cents),0) AS n FROM orders WHERE payment_status='paid' AND provider_mode='live'",
                )
                .get()
            ).n,
            testPaidCents: (
              await db
                .prepare(
                  "SELECT COALESCE(SUM(amount_cents),0) AS n FROM orders WHERE payment_status='paid' AND provider_mode='test'",
                )
                .get()
            ).n,
            pendingReview: (
              await db
                .prepare(
                  "SELECT COUNT(*) AS n FROM orders WHERE payment_status='awaiting_review'",
                )
                .get()
            ).n,
            activeMembers: (
              await db
                .prepare(
                  "SELECT COUNT(DISTINCT customer_id) AS n FROM memberships WHERE status='active' AND expires_at>?",
                )
                .get(now())
            ).n,
            openMessages: (
              await db
                .prepare(
                  "SELECT COUNT(*) AS n FROM messages WHERE status='open'",
                )
                .get()
            ).n,
            recentOrders: (
              await db
                .prepare(
                  "SELECT o.*,c.email,c.name AS customer_name FROM orders o JOIN customers c ON c.id=o.customer_id ORDER BY o.created_at DESC LIMIT 8",
                )
                .all()
            ).map(orderView),
            activity: await db
              .prepare("SELECT * FROM audit ORDER BY created_at DESC LIMIT 12")
              .all(),
          });
        if (route === "/api/admin/customers" && method === "GET")
          return reply(res, {
            rows: await db
              .prepare(
                "SELECT c.*,(SELECT COUNT(*) FROM orders o WHERE o.customer_id=c.id) AS order_count,(SELECT verified FROM accounts a WHERE a.email=c.email AND a.role='customer') AS account_verified FROM customers c ORDER BY c.created_at DESC LIMIT 1000",
              )
              .all(),
          });
        if (route === "/api/admin/customers" && method === "POST") {
          if (!email(input.email) || !text(input.name))
            fail(400, "Enter a name and valid email");
          const row = await customer(
            db,
            input.email.toLowerCase().trim(),
            text(input.name),
          );
          await audit(db, user.id, "customer_created", row.id);
          return reply(res, { row }, 201);
        }
        if (route === "/api/admin/customers" && method === "PATCH") {
          if (input.action === "verify_account") {
            const client = await db
              .prepare("SELECT * FROM customers WHERE id=?")
              .get(text(input.id));
            if (!client) fail(404, "Customer not found");
            await db
              .prepare(
                "UPDATE accounts SET verified=1 WHERE email=? AND role='customer'",
              )
              .run(client.email);
            await audit(db, user.id, "email_ownership_verified", client.id);
          } else {
            await db
              .prepare("UPDATE customers SET notes=? WHERE id=?")
              .run(text(input.notes, 10000), text(input.id));
            await audit(db, user.id, "customer_notes_updated", text(input.id));
          }
          return reply(res, { success: true });
        }
        if (route === "/api/admin/orders" && method === "GET")
          return reply(res, {
            rows: (
              await db
                .prepare(
                  "SELECT o.*,c.email,c.name AS customer_name FROM orders o JOIN customers c ON c.id=o.customer_id ORDER BY o.created_at DESC LIMIT 1000",
                )
                .all()
            ).map(orderView),
          });
        if (route === "/api/admin/orders" && method === "PATCH") {
          const order = await db
            .prepare("SELECT * FROM orders WHERE id=?")
            .get(text(input.id));
          if (!order) fail(404, "Order not found");
          if (input.action === "set_crypto_quote") {
            if (
              !["btc", "usdt"].includes(order.method) ||
              !["unpaid", "rejected"].includes(order.payment_status) ||
              !validCryptoAmount(input.amount, order.method)
            )
              fail(409, "Enter a valid BTC or USDT amount for an unpaid order");
            const details = JSON.parse(order.payment_details || "{}");
            Object.assign(details, {
              amount: input.amount,
              source: "Administrator quote",
              quotedAt: now(),
              expiresAt: new Date(Date.now() + 15 * 60000).toISOString(),
              quoteRequested: false,
            });
            delete details.usdRate;
            await db
              .prepare(
                "UPDATE orders SET payment_details=?,status='pending' WHERE id=? AND payment_status IN('unpaid','rejected')",
              )
              .run(JSON.stringify(details), order.id);
          } else if (
            input.action === "verify_cashapp" ||
            input.action === "verify_transfer"
          ) {
            if (input.action === "verify_cashapp" && order.method !== "cashapp")
              fail(
                409,
                "Use the verified transfer review action for this order",
              );
            if (
              !isManual(order.method) ||
              (order.method === "applepay" &&
                JSON.parse(order.payment_details || "{}").type !==
                  "manual_instructions") ||
              order.payment_status !== "awaiting_review" ||
              ((order.method === "wire" ||
                order.method === "cashapp" ||
                (order.method === "applepay" &&
                  JSON.parse(order.payment_details || "{}").receiptRequired)) &&
                !order.receipt) ||
              !text(input.reference) ||
              (input.action === "verify_transfer" && input.confirmed !== true)
            )
              fail(
                409,
                "A submitted receipt and verified transaction reference are required",
              );
            if (
              ["btc", "usdt"].includes(order.method) &&
              order.reference !== text(input.reference)
            )
              fail(
                409,
                "The verified transaction hash must match the submitted hash",
              );
            const used = await db
              .prepare(
                "SELECT id FROM orders WHERE reference=? AND payment_status='paid' AND method=? AND id<>?",
              )
              .get(text(input.reference), order.method, order.id);
            if (used)
              fail(
                409,
                "This transaction reference has already been approved for another order",
              );
            await db
              .prepare("UPDATE orders SET reference=? WHERE id=?")
              .run(text(input.reference), order.id);
            const network =
              JSON.parse(order.payment_details || "{}").network || "";
            const referenceKey =
              order.method +
              ":" +
              network +
              ":" +
              text(input.reference).toLowerCase().replace(/^0x/, "");
            await settleOrder(
              db,
              order.id,
              user.id,
              text(input.reference),
              referenceKey,
            );
          } else if (
            input.action === "reject_cashapp" ||
            input.action === "reject_transfer"
          ) {
            if (
              !isManual(order.method) ||
              (order.method === "applepay" &&
                JSON.parse(order.payment_details || "{}").type !==
                  "manual_instructions") ||
              order.payment_status !== "awaiting_review"
            )
              fail(409, "Order is not awaiting review");
            await db
              .prepare(
                "UPDATE orders SET payment_status='rejected' WHERE id=? AND payment_status='awaiting_review'",
              )
              .run(order.id);
          } else if (input.action === "fulfill") {
            if (order.payment_status !== "paid")
              fail(409, "Only paid orders can be fulfilled");
            await db
              .prepare("UPDATE orders SET status='fulfilled' WHERE id=?")
              .run(order.id);
          } else fail(400, "Choose a valid order action");
          await audit(db, user.id, input.action, order.id);
          return reply(res, { success: true });
        }
        if (route === "/api/admin/receipt" && method === "GET") {
          const order = await db
            .prepare("SELECT receipt FROM orders WHERE id=?")
            .get(url.searchParams.get("order") || "");
          if (!order?.receipt) fail(404, "Receipt not found");
          const file = path.basename(order.receipt);
          const bytes = await storage.get(file);
          res.writeHead(200, {
            "Content-Type": "image/" + file.split(".").pop(),
            "X-Content-Type-Options": "nosniff",
            "Cache-Control": "no-store",
            "Content-Security-Policy": "default-src 'none'",
          });
          res.end(bytes);
          return true;
        }
        if (route === "/api/admin/memberships" && method === "GET")
          return reply(res, {
            rows: await db
              .prepare(
                "SELECT m.*,c.email,c.name AS customer_name,p.name AS plan FROM memberships m JOIN customers c ON c.id=m.customer_id JOIN products p ON p.id=m.product_id ORDER BY m.expires_at DESC LIMIT 1000",
              )
              .all(),
          });
        if (route === "/api/admin/memberships" && method === "PATCH") {
          if (!["active", "suspended"].includes(input.status))
            fail(400, "Invalid membership status");
          const row = await db
            .prepare("SELECT * FROM memberships WHERE id=?")
            .get(text(input.id));
          if (!row || row.status === "cancelled")
            fail(409, "Membership cannot be changed");
          await db
            .prepare("UPDATE memberships SET status=? WHERE id=?")
            .run(input.status, row.id);
          await audit(db, user.id, "membership_" + input.status, row.id);
          return reply(res, { success: true });
        }
        if (route === "/api/admin/products" && method === "GET")
          return reply(res, {
            rows: (
              await db
                .prepare("SELECT * FROM products ORDER BY sort_order,id")
                .all()
            ).map(publicProduct),
          });
        if (route === "/api/admin/products" && method === "PATCH") {
          if (
            !text(input.name) ||
            !Number.isSafeInteger(input.price_cents) ||
            input.price_cents < 100 ||
            input.price_cents > 10000000 ||
            !(
              input.inventory === null ||
              (Number.isInteger(input.inventory) && input.inventory >= 0)
            )
          )
            fail(
              400,
              "Enter a name, price of $1–$100,000, and valid inventory",
            );
          await db
            .prepare(
              "UPDATE products SET name=?,price_cents=?,active=?,inventory=? WHERE id=?",
            )
            .run(
              text(input.name),
              input.price_cents,
              input.active ? 1 : 0,
              input.inventory,
              text(input.id),
            );
          await audit(db, user.id, "product_updated", text(input.id));
          return reply(res, { success: true });
        }
        if (route === "/api/admin/messages" && method === "GET")
          return reply(res, {
            rows: (
              await db
                .prepare(
                  "SELECT m.*,c.name AS customer_name,c.email FROM messages m JOIN customers c ON c.id=m.customer_id ORDER BY m.created_at DESC LIMIT 1000",
                )
                .all()
            ).map((m) => ({ ...m, replies: JSON.parse(m.replies) })),
          });
        if (route === "/api/admin/messages" && method === "PATCH") {
          const message = await db
            .prepare("SELECT * FROM messages WHERE id=?")
            .get(text(input.id));
          if (!message) fail(404, "Message not found");
          const replies = JSON.parse(message.replies);
          if (text(input.reply, 10000))
            replies.push({
              id: id("reply"),
              body: text(input.reply, 10000),
              created_at: now(),
              from: "support",
            });
          await db
            .prepare("UPDATE messages SET status=?,replies=? WHERE id=?")
            .run(
              input.status === "closed" ? "closed" : "open",
              JSON.stringify(replies),
              message.id,
            );
          await audit(db, user.id, "support_updated", message.id);
          return reply(res, { success: true, emailSent: false });
        }
        if (route === "/api/admin/settings" && method === "GET")
          return reply(res, {
            settings: await settings(db),
            payments: await config(),
          });
        if (route === "/api/admin/settings" && method === "PATCH") {
          if (input.supportEmail && !email(input.supportEmail))
            fail(400, "Enter a valid support email");
          const allowed = [
            "brand",
            "supportEmail",
            ...Object.keys(PAYMENT_DEFAULTS),
          ];
          const current = await settings(db),
            changes = {};
          for (const key of allowed)
            if (typeof input[key] === "string")
              changes[key] = text(
                input[key],
                key === "applePayInstructions"
                  ? 5000
                  : key === "applePayReviewMessage"
                    ? 1500
                    : key === "wireInstructions"
                      ? 2000
                      : 500,
              );
          try {
            validatePaymentSettings({ ...current, ...changes });
          } catch (error) {
            fail(400, error.message);
          }
          await transaction(db, async () => {
            for (const [key, value] of Object.entries(changes))
              await db
                .prepare(
                  "INSERT INTO settings(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value",
                )
                .run(key, value);
          });
          await audit(db, user.id, "settings_updated", "payments");
          return reply(res, { success: true });
        }
        if (route === "/api/admin/activity" && method === "GET")
          return reply(res, {
            rows: await db
              .prepare("SELECT * FROM audit ORDER BY created_at DESC LIMIT 500")
              .all(),
          });
      }
      fail(404, "API route not found");
    } catch (error) {
      if (!res.headersSent)
        reply(
          res,
          {
            error: error.status
              ? error.message
              : "The server could not process that request.",
          },
          error.status || 500,
        );
      else res.end();
    }
    return true;
  }
  return { handle, db, close: () => db.close(), config };
}
