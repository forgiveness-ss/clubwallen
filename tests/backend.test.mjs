import { test } from "node:test";
import assert from "node:assert/strict";
import { Readable } from "node:stream";
import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { createHmac } from "node:crypto";
import { createApi } from "../server/api.mjs";
const origin = "http://localhost:4173";
const password = "FixturePassword!2026";
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
  method: "cashapp",
  items: [{ productId: "membership-crew", quantity: 1, size: "M" }],
};
async function createCashOrder(api, owner) {
  await request(api, "/api/admin/settings", {
    method: "PATCH",
    cookie: owner,
    data: { cashTag: "$FixtureStore" },
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
test("Cash App receipts await review, server prices cannot be spoofed, membership grants exactly once", async () => {
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
    const link = await createCashOrder(f.api, owner),
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
            action: "verify_cashapp",
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
            action: "verify_cashapp",
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
test("Stripe uses USD one-time sessions; signed matching webhooks grant access and full refunds revoke it", async () => {
  let sessionNumber = 0,
    form;
  const f = await fixture({
    stripeKey: "sk_test_fixture",
    stripeWebhook: "whsec_fixture",
    fetcher: async (url, options) => {
      assert.equal(url, "https://api.stripe.com/v1/checkout/sessions");
      form = options.body;
      return new Response(
        JSON.stringify({
          id: "cs_test_" + ++sessionNumber,
          url: "https://checkout.stripe.com/c/pay/fixture",
        }),
        { status: 200 },
      );
    },
  });
  try {
    const owner = await admin(f.api);
    const checkout = await request(f.api, "/api/orders", {
      method: "POST",
      data: { ...membership, method: "card", amount: 1 },
    });
    assert.equal(checkout.status, 201);
    assert.equal(form.get("mode"), "payment");
    assert.equal(form.get("line_items[0][price_data][currency]"), "usd");
    assert.equal(form.get("line_items[0][price_data][unit_amount]"), "35000");
    assert.equal(form.get("payment_method_types[0]"), "card");
    const oid = checkout.json.orderId;
    const event = {
      id: "evt_one",
      type: "checkout.session.completed",
      livemode: false,
      data: {
        object: {
          id: "cs_test_1",
          client_reference_id: oid,
          metadata: { order_id: oid },
          amount_total: 35000,
          currency: "usd",
          payment_status: "paid",
          payment_intent: "pi_fixture",
        },
      },
    };
    const send = async (e, delta = 0) => {
      const raw = JSON.stringify(e),
        t = Math.floor(Date.now() / 1000) + delta;
      const sig = createHmac("sha256", "whsec_fixture")
        .update(t + "." + raw)
        .digest("hex");
      return request(f.api, "/api/webhooks/stripe", {
        method: "POST",
        data: raw,
        headers: { "stripe-signature": `t=${t},v1=${sig}` },
      });
    };
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
          id: "evt_bad",
          data: { object: { ...event.data.object, amount_total: 1 } },
        })
      ).status,
      400,
    );
    assert.equal(
      (await send({ ...event, id: "evt_live", livemode: true })).status,
      400,
    );
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
      "test payments must not inflate live revenue",
    );
    const refund = {
      id: "evt_refund",
      livemode: false,
      type: "charge.refunded",
      data: { object: { refunded: true, payment_intent: "pi_fixture" } },
    };
    assert.equal((await send(refund)).status, 200);
    assert.equal(
      (await f.api.db.prepare("SELECT status FROM memberships").get()).status,
      "cancelled",
    );
    await request(f.api, "/api/admin/settings", {
      method: "PATCH",
      cookie: owner,
      data: { cryptoEnabled: "true" },
    });
    assert.equal(
      (
        await request(f.api, "/api/orders", {
          method: "POST",
          data: { ...membership, method: "crypto" },
        })
      ).status,
      201,
    );
    assert.equal(form.get("payment_method_types[0]"), "crypto");
    assert.equal(form.get("mode"), "payment");
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
