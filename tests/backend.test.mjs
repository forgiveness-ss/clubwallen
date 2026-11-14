import { test } from "node:test";
import assert from "node:assert/strict";
import { Readable } from "node:stream";
import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { createHmac } from "node:crypto";
import { createApi } from "../server/api.mjs";
import { cryptoAmount } from "../server/crypto-quotes.mjs";
const WIRE_SETTINGS = {
  wireEnabled: "true",
  wireBeneficiary: "Fixture Owner",
  wireBank: "Fixture Bank",
  wireAccount: "123456789",
  wireRouting: "021000021",
  wireBankAddress: "1 Test Street, NY",
  wireBeneficiaryAddress: "2 Test Street, NY",
};
const origin = "http://localhost:4173";
const password = "FixturePassword!2026";
test("Crypto quotes use decimal arithmetic and round up only to the asset precision", () => {
  assert.equal(cryptoAmount(35000, "70000.0000", "btc"), "0.00500000");
  assert.equal(cryptoAmount(100, "3", "usdt"), "0.333334");
  assert.equal(cryptoAmount(35000, "0.9999", "usdt"), "350.035004");
  assert.throws(() => cryptoAmount(35000, "0", "btc"));
});
function request(
  api,
  route,
  { method = "GET", data, cookie, originHeader = origin, headers = {} } = {},
) {
  const raw = typeof data === "string" ? data : JSON.stringify(data ?? {});
  const req = Readable.from(method === "GET" ? [] : [Buffer.from(raw)]);
  req.method = method;
  req.url = route;
  req.headers = {
    host: "localhost:4173",
    origin: originHeader,
    "content-type": "application/json",
    ...headers,
    ...(cookie ? { cookie } : {}),
  };
  req.socket = { remoteAddress: "127.0.0.1" };
  const res = {
    headers: {},
    status: 200,
    writableEnded: false,
    headersSent: false,
    setHeader(key, value) {
      this.headers[key.toLowerCase()] = value;
    },
    writeHead(status, headers) {
      this.status = status;
      this.headersSent = true;
      for (const [k, v] of Object.entries(headers))
        this.headers[k.toLowerCase()] = v;
    },
    end(data) {
      this.raw = data;
      this.writableEnded = true;
    },
  };
  return api.handle(req, res).then((handled) => {
    let json;
    try {
      json = JSON.parse(String(res.raw));
    } catch {}
    return {
      ...res,
      json,
      handled,
      cookie: res.headers["set-cookie"]?.split(";")[0],
    };
  });
}
async function fixture(options = {}) {
  const dir = await mkdtemp(path.join(os.tmpdir(), "exclusive-backend-"));
  const api = await createApi({
    filename: path.join(dir, "db.sqlite"),
    dataDir: dir,
    ...options,
  });
  return {
    api,
    dir,
    close: async () => {
      await api.close();
      await rm(dir, { recursive: true, force: true });
    },
  };
}
async function admin(api) {
  const result = await request(api, "/api/admin/setup", {
    method: "POST",
    data: { email: "owner@example.com", name: "Owner", password },
  });
  assert.equal(result.status, 201);
  return result.cookie;
}
const membership = {
  name: "A Customer",
  email: "member@example.com",
  method: "wire",
  items: [{ productId: "membership-crew", quantity: 1, size: "M" }],
};
async function createWireOrder(api, owner) {
  await request(api, "/api/admin/settings", {
    method: "PATCH",
    cookie: owner,
    data: WIRE_SETTINGS,
  });
  const created = await request(api, "/api/orders", {
    method: "POST",
    data: membership,
  });
  assert.equal(created.status, 201, JSON.stringify(created.json));
  return new URL(created.json.url, origin);
}
const receipt =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aFioAAAAASUVORK5CYII=";
test("Admin setup, protected records, CSRF, session expiry, and customer roles", async () => {
  const f = await fixture();
  try {
    assert.equal((await request(f.api, "/api/status")).json.adminReady, false);
    assert.equal((await request(f.api, "/api/admin/customers")).status, 401);
    assert.equal(
      (
        await request(f.api, "/api/admin/setup", {
          method: "POST",
          originHeader: "https://evil.example",
          data: {},
        })
      ).status,
      403,
    );
    const owner = await admin(f.api);
    assert.equal((await request(f.api, "/api/status")).json.adminReady, true);
    assert.equal(
      (
        await request(f.api, "/api/admin/setup", {
          method: "POST",
          data: { email: "second@example.com", password, name: "Other" },
        })
      ).status,
      409,
    );
    const stored = await f.api.db.prepare("SELECT * FROM accounts").get();
    assert.ok(!stored.password_hash.includes(password));
    const member = await request(f.api, "/api/auth/signup", {
      method: "POST",
      data: {
        firstName: "Member",
        email: "member@example.com",
        password,
        role: "admin",
      },
    });
    assert.equal(member.json.user.role, "customer");
    assert.equal(
      (await request(f.api, "/api/admin/orders", { cookie: member.cookie }))
        .status,
      401,
    );
    assert.equal(
      (
        await request(f.api, "/api/auth/login", {
          method: "POST",
          data: { email: "owner@example.com", password: "incorrect" },
        })
      ).status,
      401,
    );
    assert.ok(owner.includes("exclusive_session="));
    await request(f.api, "/api/auth/logout", {
      method: "POST",
      cookie: owner,
      data: {},
    });
    assert.equal(
      (await request(f.api, "/api/admin/orders", { cookie: owner })).status,
      401,
    );
    const loggedIn = await request(f.api, "/api/auth/login", {
      method: "POST",
      data: { email: "owner@example.com", password },
    });
    assert.equal(loggedIn.status, 200);
    await f.api.db.prepare("UPDATE sessions SET expires_at=0").run();
    assert.equal(
      (await request(f.api, "/api/auth/me", { cookie: loggedIn.cookie })).json
        .user,
      null,
    );
  } finally {
    await f.close();
  }
});
test("Wire receipts await review, server prices cannot be spoofed, membership grants exactly once", async () => {
  const f = await fixture();
  try {
    const owner = await admin(f.api);
    assert.equal(
      (
        await request(f.api, "/api/orders", {
          method: "POST",
          data: membership,
        })
      ).status,
      503,
    );
    const link = await createWireOrder(f.api, owner),
      query = link.search;
    const order = (await request(f.api, "/api/order" + query)).json.order;
    assert.equal(order.amount_cents, 35000);
    assert.equal(order.payment_status, "unpaid");
    assert.equal(
      (await request(f.api, "/api/order?order=" + order.id + "&token=bad"))
        .status,
      403,
    );
    const spoof = await request(f.api, "/api/orders", {
      method: "POST",
      data: { ...membership, amount_cents: 1, price: 0.01 },
    });
    const spoofLink = new URL(spoof.json.url, origin);
    assert.equal(
      (await request(f.api, "/api/order" + spoofLink.search)).json.order
        .amount_cents,
      35000,
    );
    assert.equal(
      (
        await request(f.api, "/api/orders", {
          method: "POST",
          data: {
            ...membership,
            items: [{ productId: "membership-crew", quantity: -2, size: "M" }],
          },
        })
      ).status,
      400,
    );
    assert.equal(
      (
        await request(f.api, "/api/order/proof" + query, {
          method: "POST",
          data: {
            image:
              "data:image/png;base64,ZW5vdWdoLWJ5dGVzLWJ1dC1ub3QtYW4taW1hZ2U=",
            reference: "fake",
          },
        })
      ).status,
      400,
    );
    assert.equal(
      (
        await request(f.api, "/api/order/proof" + query, {
          method: "POST",
          data: { image: receipt, reference: "receipt-ref" },
        })
      ).status,
      200,
    );
    assert.equal(
      (await request(f.api, "/api/order" + query)).json.order.payment_status,
      "awaiting_review",
    );
    assert.equal(
      (await f.api.db.prepare("SELECT COUNT(*) AS n FROM memberships").get()).n,
      0,
    );
    assert.equal(
      (
        await request(f.api, "/api/admin/orders", {
          method: "PATCH",
          cookie: owner,
          data: { id: order.id, action: "verify_cashapp" },
        })
      ).status,
      409,
    );
    assert.equal(
      (await request(f.api, "/api/admin/receipt?order=" + order.id)).status,
      401,
    );
    assert.equal(
      (
        await request(f.api, "/api/admin/receipt?order=" + order.id, {
          cookie: owner,
        })
      ).headers["content-type"],
      "image/png",
    );
    assert.equal(
      (
        await request(f.api, "/api/admin/orders", {
          method: "PATCH",
          cookie: owner,
          data: {
            id: order.id,
            action: "verify_transfer",
            confirmed: true,
            reference: "bank-verified-reference",
          },
        })
      ).status,
      200,
    );
    const grant = await f.api.db.prepare("SELECT * FROM memberships").get();
    assert.ok(grant);
    assert.equal(
      new Date(grant.expires_at).getUTCFullYear(),
      new Date(grant.starts_at).getUTCFullYear() + 1,
    );
    assert.equal(
      (
        await request(f.api, "/api/admin/orders", {
          method: "PATCH",
          cookie: owner,
          data: {
            id: order.id,
            action: "verify_transfer",
            confirmed: true,
            reference: "duplicate",
          },
        })
      ).status,
      409,
    );
    assert.equal(
      (await f.api.db.prepare("SELECT COUNT(*) AS n FROM memberships").get()).n,
      1,
    );
    assert.equal(
      (
        await request(f.api, "/api/admin/orders", {
          method: "PATCH",
          cookie: owner,
          data: { id: order.id, action: "fulfill" },
        })
      ).status,
      200,
    );
  } finally {
    await f.close();
  }
});
test("Historical Stripe orders still require matching signed Apple Pay wallet events", async () => {
  let wallet = "apple_pay";
  const oid = "historical-order";
  const f = await fixture({
    stripeKey: "sk_test_fixture",
    stripeWebhook: "whsec_fixture",
    fetcher: async () =>
      Response.json({
        id: "pi_fixture",
        client_secret: "pi_fixture_secret_test",
        status: "succeeded",
        amount: 35000,
        amount_received: 35000,
        currency: "usd",
        livemode: false,
        metadata: { order_id: oid },
        latest_charge: {
          payment_method_details: { card: { wallet: { type: wallet } } },
        },
      }),
  });
  try {
    const owner = await admin(f.api);
    await f.api.db
      .prepare(
        "INSERT INTO customers(id,email,name,created_at) VALUES(?,?,?,?)",
      )
      .run(
        "historical-customer",
        "old@example.test",
        "Historical Customer",
        new Date().toISOString(),
      );
    await f.api.db
      .prepare(
        "INSERT INTO orders(id,customer_id,method,amount_cents,items,access_token_hash,provider_id,provider_mode,created_at) VALUES(?,?,?,?,?,?,?,?,?)",
      )
      .run(
        oid,
        "historical-customer",
        "applepay",
        35000,
        JSON.stringify([
          {
            productId: "membership-crew",
            kind: "membership",
            name: "Crew",
            quantity: 1,
            unitPrice: 35000,
          },
        ]),
        "not-used-in-this-test",
        "pi_fixture",
        "test",
        new Date().toISOString(),
      );
    const event = {
      id: "evt_one",
      type: "payment_intent.succeeded",
      livemode: false,
      data: {
        object: {
          id: "pi_fixture",
          status: "succeeded",
          metadata: { order_id: oid },
          amount_received: 35000,
          currency: "usd",
        },
      },
    };
    async function send(e, delta = 0) {
      const raw = JSON.stringify(e),
        t = Math.floor(Date.now() / 1000) + delta,
        sig = createHmac("sha256", "whsec_fixture")
          .update(t + "." + raw)
          .digest("hex");
      return request(f.api, "/api/webhooks/stripe", {
        method: "POST",
        data: raw,
        headers: { "stripe-signature": `t=${t},v1=${sig}` },
      });
    }
    assert.equal(
      (
        await request(f.api, "/api/webhooks/stripe", {
          method: "POST",
          data: event,
        })
      ).status,
      400,
    );
    assert.equal((await send(event, -600)).status, 400);
    assert.equal(
      (
        await send({
          ...event,
          data: { object: { ...event.data.object, amount_received: 1 } },
        })
      ).status,
      400,
    );
    assert.equal((await send({ ...event, livemode: true })).status, 400);
    wallet = "google_pay";
    assert.equal((await send(event)).status, 400);
    wallet = "apple_pay";
    assert.equal((await send(event)).status, 200);
    assert.equal((await send(event)).json.duplicate, true);
    assert.equal(
      (await f.api.db.prepare("SELECT COUNT(*) AS n FROM memberships").get()).n,
      1,
    );
    assert.equal(
      (await request(f.api, "/api/admin/overview", { cookie: owner })).json
        .paidCents,
      0,
    );
    assert.equal(
      (
        await send({
          id: "evt_refund",
          type: "charge.refunded",
          livemode: false,
          data: { object: { refunded: true, payment_intent: "pi_fixture" } },
        })
      ).status,
      200,
    );
    assert.equal(
      (await f.api.db.prepare("SELECT status FROM memberships").get()).status,
      "cancelled",
    );
  } finally {
    await f.close();
  }
});
test("Catalog updates, support replies, customer isolation, and data persistence", async () => {
  const f = await fixture();
  try {
    const owner = await admin(f.api);
    const product = await f.api.db
      .prepare("SELECT * FROM products WHERE id='reserve-hoodie'")
      .get();
    assert.equal(
      (
        await request(f.api, "/api/admin/products", {
          method: "PATCH",
          cookie: owner,
          data: { ...product, price_cents: -2, active: true },
        })
      ).status,
      400,
    );
    assert.equal(
      (
        await request(f.api, "/api/admin/products", {
          method: "PATCH",
          cookie: owner,
          data: { ...product, price_cents: 7500, inventory: 5, active: true },
        })
      ).status,
      200,
    );
    assert.equal(
      (await request(f.api, "/api/catalog")).json.products.find(
        (p) => p.id === "reserve-hoodie",
      ).price_cents,
      7500,
    );
    const member = await request(f.api, "/api/auth/signup", {
      method: "POST",
      data: { firstName: "Member", email: "member@example.com", password },
    });
    assert.equal(
      (await request(f.api, "/api/account", { cookie: member.cookie })).json
        .verificationRequired,
      true,
    );
    const client = await f.api.db
      .prepare("SELECT * FROM customers WHERE email=?")
      .get("member@example.com");
    await request(f.api, "/api/admin/customers", {
      method: "PATCH",
      cookie: owner,
      data: { id: client.id, action: "verify_account" },
    });
    await request(f.api, "/api/support", {
      method: "POST",
      data: {
        name: "Member",
        email: "member@example.com",
        subject: "Question",
        message: "Where is my order?",
      },
    });
    const messages = (
      await request(f.api, "/api/admin/messages", { cookie: owner })
    ).json.rows;
    const reply = await request(f.api, "/api/admin/messages", {
      method: "PATCH",
      cookie: owner,
      data: {
        id: messages[0].id,
        reply: "We are looking into it.",
        status: "open",
      },
    });
    assert.equal(reply.json.emailSent, false);
    const account = (
      await request(f.api, "/api/account", { cookie: member.cookie })
    ).json;
    assert.equal(
      account.messages[0].replies[0].body,
      "We are looking into it.",
    );
    const other = await request(f.api, "/api/auth/signup", {
      method: "POST",
      data: { firstName: "Other", email: "other@example.com", password },
    });
    assert.equal(
      (await request(f.api, "/api/account", { cookie: other.cookie })).json
        .messages.length,
      0,
    );
    await f.api.close();
    const reopened = await createApi({
      filename: path.join(f.dir, "db.sqlite"),
      dataDir: f.dir,
    });
    assert.equal(
      (await reopened.db.prepare("SELECT COUNT(*) AS n FROM messages").get()).n,
      1,
    );
    assert.equal(
      (
        await reopened.db
          .prepare("SELECT price_cents FROM products WHERE id='reserve-hoodie'")
          .get()
      ).price_cents,
      7500,
    );
    await reopened.close();
  } finally {
    try {
      await f.api.close();
    } catch {}
    await rm(f.dir, { recursive: true, force: true });
  }
});

test("BTC and USDT wallet transfers retain their network/address, wait for verified funds, and cannot reuse a transaction", async () => {
  let quotesAvailable = true;
  const f = await fixture({
    fetcher: async (url) => {
      if (!quotesAvailable) throw Error("Quote provider unavailable");
      return Response.json({
        error: [],
        result: {
          PAIR: { c: [url.includes("XBTUSD") ? "70000.00" : "0.9999"] },
        },
      });
    },
  });
  try {
    const owner = await admin(f.api),
      wallet = {
        btcEnabled: "true",
        btcAddress: "1BoatSLRHtKNngkdXEeobR76b53LETtpyT",
        usdtEnabled: "true",
        usdtNetwork: "ethereum",
        usdtAddress: "0x742d35cc6634c0532925a3b844bc454e4438f44e",
      };
    assert.equal(
      (
        await request(f.api, "/api/admin/settings", {
          method: "PATCH",
          cookie: owner,
          data: { ...wallet, btcAddress: "invalid" },
        })
      ).status,
      400,
    );
    assert.equal(
      (
        await request(f.api, "/api/admin/settings", {
          method: "PATCH",
          cookie: owner,
          data: wallet,
        })
      ).status,
      200,
    );
    const flags = (await request(f.api, "/api/status")).json;
    assert.deepEqual(flags.methods, ["applepay", "btc", "usdt", "wire"]);
    assert.equal(flags.btcConfigured, true);
    assert.equal(flags.usdtConfigured, true);
    assert.equal(flags.btcAddress, undefined);
    const orders = [];
    for (const method of ["btc", "usdt"]) {
      const created = await request(f.api, "/api/orders", {
        method: "POST",
        data: { ...membership, method },
      });
      assert.equal(created.status, 201, JSON.stringify(created.json));
      const query = new URL(created.json.url, origin).search,
        order = (await request(f.api, "/api/order" + query)).json.order;
      orders.push({ query, order });
      assert.equal(order.payment_status, "unpaid");
      assert.equal(
        order.payment_details.network,
        method === "btc" ? "bitcoin" : "ethereum",
      );
      assert.equal(
        order.payment_details.amount,
        method === "btc" ? "0.00500000" : "350.035004",
      );
      assert.equal(
        (
          await request(f.api, "/api/order/proof" + query, {
            method: "POST",
            data: { reference: "invalid" },
          })
        ).status,
        400,
      );
      const hash = (method === "btc" ? "a" : "b").repeat(64);
      assert.equal(
        (
          await request(f.api, "/api/order/proof" + query, {
            method: "POST",
            data: { reference: hash },
          })
        ).status,
        200,
      );
      assert.equal(
        (
          await request(f.api, "/api/admin/orders", {
            method: "PATCH",
            cookie: owner,
            data: { id: order.id, action: "verify_transfer", reference: hash },
          })
        ).status,
        409,
      );
      assert.equal(
        (
          await request(f.api, "/api/admin/orders", {
            method: "PATCH",
            cookie: owner,
            data: {
              id: order.id,
              action: "verify_transfer",
              reference: hash,
              confirmed: true,
            },
          })
        ).status,
        200,
      );
    }
    await request(f.api, "/api/admin/settings", {
      method: "PATCH",
      cookie: owner,
      data: {
        usdtNetwork: "tron",
        usdtAddress: "TJRabPrwbZy45sbavfcjinPJC18kjpRTv8",
      },
    });
    assert.equal(
      (await request(f.api, "/api/order" + orders[1].query)).json.order
        .payment_details.network,
      "ethereum",
    );
    const duplicate = await request(f.api, "/api/orders", {
        method: "POST",
        data: { ...membership, method: "btc" },
      }),
      duplicateQuery = new URL(duplicate.json.url, origin).search;
    await request(f.api, "/api/order/proof" + duplicateQuery, {
      method: "POST",
      data: { reference: "a".repeat(64) },
    });
    assert.equal(
      (
        await request(f.api, "/api/admin/orders", {
          method: "PATCH",
          cookie: owner,
          data: {
            id: duplicate.json.orderId,
            action: "verify_transfer",
            reference: "a".repeat(64),
            confirmed: true,
          },
        })
      ).status,
      409,
    );
    assert.equal(
      (await f.api.db.prepare("SELECT COUNT(*) AS n FROM memberships").get()).n,
      2,
    );
    quotesAvailable = false;
    const pending = await request(f.api, "/api/orders", {
        method: "POST",
        data: { ...membership, method: "btc" },
      }),
      pendingQuery = new URL(pending.json.url, origin).search;
    assert.equal(
      (await request(f.api, "/api/order" + pendingQuery)).json.order.status,
      "quote_requested",
    );
    assert.equal(
      (
        await request(f.api, "/api/order/proof" + pendingQuery, {
          method: "POST",
          data: { reference: "c".repeat(64) },
        })
      ).status,
      409,
    );
    assert.equal(
      (
        await request(f.api, "/api/admin/orders", {
          method: "PATCH",
          cookie: owner,
          data: {
            id: pending.json.orderId,
            action: "set_crypto_quote",
            amount: "0.0051",
          },
        })
      ).status,
      200,
    );
    assert.equal(
      (await request(f.api, "/api/order" + pendingQuery)).json.order
        .payment_details.amount,
      "0.0051",
    );
  } finally {
    await f.close();
  }
});

test("Editable instruction checkout needs no Stripe account, snapshots copy, and only an admin can confirm payment", async () => {
  let providerCalls = 0;
  const f = await fixture({
    fetcher: async () => {
      providerCalls++;
      throw Error("No provider request should occur");
    },
  });
  try {
    const owner = await admin(f.api);
    assert.equal(
      (await request(f.api, "/api/payment-instructions/applepay")).status,
      404,
    );
    assert.equal(
      (
        await request(f.api, "/api/admin/settings", {
          method: "PATCH",
          cookie: owner,
          data: { applePayEnabled: "true" },
        })
      ).status,
      400,
    );
    const copy = {
      applePayEnabled: "true",
      applePayButtonLabel: "Apple Pay instructions",
      applePayTitle: "Read these payment instructions",
      applePayInstructions:
        "Step 1: Follow the receiving service instructions.\nStep 2: Include the order reference.",
      applePayRecipientLabel: "Receiving contact",
      applePayRecipient: "555-0100",
      applePayContinueLabel: "Got it",
      applePayReferenceLabel: "Transfer ID",
      applePayReviewMessage: "We will verify your payment.",
      applePayReceiptRequired: "false",
    };
    assert.equal(
      (
        await request(f.api, "/api/admin/settings", {
          method: "PATCH",
          cookie: owner,
          data: copy,
        })
      ).status,
      200,
    );
    const flags = (await request(f.api, "/api/status")).json;
    assert.equal(flags.applePayConfigured, true);
    assert.equal(flags.applePayMode, "manual");
    assert.equal(
      (await request(f.api, "/api/payment-instructions/applepay")).json
        .instructions.instructions,
      copy.applePayInstructions,
    );
    assert.equal(
      (
        await request(f.api, "/api/admin/settings", {
          method: "PATCH",
          data: { applePayInstructions: "attacker" },
        })
      ).status,
      401,
    );
    const checkout = await request(f.api, "/api/orders", {
      method: "POST",
      data: {
        ...membership,
        method: "applepay",
        amount: 1,
        payment_status: "paid",
      },
    });
    assert.equal(checkout.status, 201, JSON.stringify(checkout.json));
    const query = new URL(checkout.json.url, origin).search;
    const original = (await request(f.api, "/api/order" + query)).json.order;
    assert.equal(original.amount_cents, 35000);
    assert.equal(original.payment_status, "unpaid");
    assert.equal(original.payment_details.type, "manual_instructions");
    assert.equal(original.payment_details.recipient, "555-0100");
    assert.equal(
      (
        await f.api.db
          .prepare("SELECT provider_id FROM orders WHERE id=?")
          .get(original.id)
      ).provider_id,
      null,
    );
    await request(f.api, "/api/admin/settings", {
      method: "PATCH",
      cookie: owner,
      data: {
        applePayInstructions: "Updated instructions",
        applePayRecipient: "555-0101",
        applePayReceiptRequired: "true",
      },
    });
    assert.equal(
      (await request(f.api, "/api/order" + query)).json.order.payment_details
        .instructions,
      copy.applePayInstructions,
    );
    assert.equal(
      (await request(f.api, "/api/payment-instructions/applepay")).json
        .instructions.recipient,
      "555-0101",
    );
    assert.equal(
      (
        await request(f.api, "/api/order/proof" + query, {
          method: "POST",
          data: { reference: "manual-reference" },
        })
      ).status,
      200,
    );
    assert.equal(
      (await f.api.db.prepare("SELECT COUNT(*) AS n FROM memberships").get()).n,
      0,
    );
    assert.equal(
      (
        await request(f.api, "/api/admin/orders", {
          method: "PATCH",
          cookie: owner,
          data: {
            id: original.id,
            action: "verify_transfer",
            reference: "manual-reference",
          },
        })
      ).status,
      409,
    );
    assert.equal(
      (
        await request(f.api, "/api/admin/orders", {
          method: "PATCH",
          cookie: owner,
          data: {
            id: original.id,
            action: "verify_transfer",
            reference: "manual-reference",
            confirmed: true,
          },
        })
      ).status,
      200,
    );
    const next = await request(f.api, "/api/orders", {
        method: "POST",
        data: { ...membership, method: "applepay" },
      }),
      nextQuery = new URL(next.json.url, origin).search;
    assert.equal(
      (
        await request(f.api, "/api/order/proof" + nextQuery, {
          method: "POST",
          data: { reference: "new-reference" },
        })
      ).status,
      400,
      "new orders honor updated receipt requirements",
    );
    assert.equal(providerCalls, 0);
  } finally {
    await f.close();
  }
});
