import { test } from "node:test";
import assert from "node:assert/strict";
import { PGlite } from "@electric-sql/pglite";
import { createHmac } from "node:crypto";
import { postgresAdapter, postgresSql, databaseTls } from "../server/sql.mjs";
import { X509Certificate } from "node:crypto";
import { setupError } from "../server/setup-errors.mjs";
import { migrate } from "../server/migrate.mjs";
import { createApi } from "../server/api.mjs";
import { serveRequest } from "../server/web-handler.mjs";
import { settleOrder } from "../server/database.mjs";
import deployment from "../api/index.js";
import { cloudConfiguration } from "../server/cloud-config.mjs";
import { readAdminAccess } from "../src/admin-access.js";

test("Admin page waits for verified setup state and propagates backend failures instead of choosing sign-in", async () => {
  const failure = Error("Missing Vercel environment variables: APP_BASE_URL.");
  await assert.rejects(
    () =>
      readAdminAccess(async (route) => {
        if (route === "/api/status") throw failure;
        return { user: null };
      }),
    (error) => error === failure,
  );
  await assert.rejects(
    () => readAdminAccess(async () => ({})),
    /could not confirm/,
  );
  assert.deepEqual(
    await readAdminAccess(async (route) =>
      route === "/api/status"
        ? { adminReady: false, setupTokenRequired: true }
        : { user: null },
    ),
    { setup: true, setupTokenRequired: true, user: null },
  );
  assert.equal(
    (
      await readAdminAccess(async (route) =>
        route === "/api/status"
          ? { adminReady: true, setupTokenRequired: true }
          : { user: null },
      )
    ).setup,
    false,
  );
});

test("Cloud configuration identifies missing and invalid environment settings without exposing their values", () => {
  const env = {
    APP_BASE_URL: "https://club.example",
    DATABASE_URL: "postgresql://user:fixture-secret@db.example/postgres",
    SUPABASE_URL: "https://project.supabase.co",
    SUPABASE_SECRET_KEY: "sb_secret_fixture",
  };
  assert.equal(cloudConfiguration(env).baseUrl, "https://club.example");
  assert.throws(
    () => cloudConfiguration({ ...env, APP_BASE_URL: "" }),
    (error) =>
      /APP_BASE_URL/.test(error.safeMessage) &&
      !error.safeMessage.includes("fixture-secret"),
  );
  assert.throws(
    () => cloudConfiguration({ ...env, APP_BASE_URL: "http://localhost:4173" }),
    (error) => /HTTPS website origin/.test(error.safeMessage),
  );
  assert.throws(
    () =>
      cloudConfiguration({ ...env, DATABASE_URL: "invalid-fixture-secret" }),
    (error) =>
      /DATABASE_URL/.test(error.safeMessage) &&
      !error.safeMessage.includes("invalid-fixture-secret"),
  );
  assert.throws(
    () =>
      cloudConfiguration({
        ...env,
        SUPABASE_SECRET_KEY: "sb_publishable_fixture",
      }),
    (error) => /server secret key/.test(error.safeMessage),
  );
  assert.equal(
    cloudConfiguration({ ...env, ADMIN_EMAIL: "", ADMIN_SETUP_TOKEN: "" })
      .supabaseUrl,
    env.SUPABASE_URL,
    "bootstrap credentials are optional after the first administrator exists",
  );
});

test("Supabase database CAs are valid and remain scoped to provider hosts with verification enabled", async () => {
  const tls = await databaseTls("aws-0-us-east-1.pooler.supabase.com", {});
  assert.equal(tls.rejectUnauthorized, true);
  const bundled = tls.ca
    .at(-1)
    .match(/-----BEGIN CERTIFICATE-----[\s\S]+?-----END CERTIFICATE-----/g);
  assert.equal(bundled.length, 2);
  for (const pem of bundled) {
    const cert = new X509Certificate(pem);
    assert.equal(cert.ca, true);
    assert.ok(cert.verify(cert.publicKey));
    assert.ok(Date.parse(cert.validTo) > Date.now());
  }
  assert.deepEqual(
    await databaseTls("pooler.supabase.com.attacker.invalid", {}),
    { rejectUnauthorized: true },
  );
  assert.deepEqual(await databaseTls("db.example.com", {}), {
    rejectUnauthorized: true,
  });
});

test("Cloud setup diagnoses certificate, credential and provider failures without disclosing raw errors", () => {
  const credential = "never-print-this-fixture-secret";
  const url = "postgresql://owner:" + credential + "@private.example/db";
  const cases = [
    [{ code: "SELF_SIGNED_CERT_IN_CHAIN", message: url }, /TLS certificate/],
    [{ code: "28P01", message: url }, /database credentials/],
    [{ code: "ENOTFOUND", message: url }, /hostname/],
    [{ statusCode: "401", message: url }, /Storage key/],
    [{ cause: { code: "ECONNREFUSED", message: url } }, /could not be reached/],
    [{ code: "42601", message: url }, /migration SQL/],
    [{ message: url }, /raw errors are hidden/],
  ];
  for (const [error, expected] of cases) {
    const output = setupError(error, "database connection");
    assert.match(output, expected);
    assert.ok(!output.includes(credential));
    assert.ok(!output.includes("private.example"));
  }
});

const origin = "https://club.example";
const password = "CloudFixturePassword!2026";
const receipt =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aFioAAAAASUVORK5CYII=";
async function fixture() {
  const pg = new PGlite();
  // The same adapter used by pg, backed by PostgreSQL compiled to WASM for offline QA.
  const client = {
    query: async (sql, args = []) => {
      if (!args.length && sql.split(";").filter((s) => s.trim()).length > 1) {
        await pg.exec(sql);
        return { rows: [], rowCount: 0 };
      }
      const result = await pg.query(sql, args);
      return { rows: result.rows, rowCount: result.affectedRows };
    },
    release() {},
  };
  const db = postgresAdapter({
    ...client,
    connect: async () => client,
    end: async () => {},
  });
  await migrate(db);
  const files = new Map();
  let number = 0;
  const options = {
    database: db,
    cloud: true,
    baseUrl: origin,
    setupToken: "fixture-setup-token",
    adminEmail: "owner@example.com",
    stripeKey: "sk_test_fixture",
    stripeWebhook: "whsec_fixture",
    receipts: {
      put: async (name, bytes) => {
        files.set(name, bytes);
      },
      get: async (name) => files.get(name),
    },
    fetcher: async () =>
      Response.json({
        id: "cs_" + ++number,
        url: "https://checkout.stripe.com/c/pay/fixture",
      }),
  };
  const api = await createApi(options);
  async function call(
    route,
    { method = "GET", data, cookie, headers = {} } = {},
  ) {
    const request = new Request(origin + route, {
      method,
      headers: {
        origin,
        "content-type": "application/json",
        ...headers,
        ...(cookie ? { cookie } : {}),
      },
      ...(method === "GET"
        ? {}
        : {
            body: typeof data === "string" ? data : JSON.stringify(data ?? {}),
          }),
    });
    const response = await serveRequest(api, request, {
      clientAddress: "192.0.2.10",
    });
    let json;
    try {
      json = await response.clone().json();
    } catch {}
    return {
      status: response.status,
      json,
      response,
      cookie: response.headers.get("set-cookie")?.split(";")[0],
    };
  }
  return { pg, db, api, options, call, files, close: () => pg.close() };
}

test("PostgreSQL schema, protected cloud setup, CRM, private receipts and one-time membership settlement", async () => {
  const f = await fixture();
  try {
    const call = f.call;
    assert.equal((await call("/api/status")).json.setupTokenRequired, true);
    const form = { email: "owner@example.com", name: "Owner", password };
    assert.equal(
      (await call("/api/admin/setup", { method: "POST", data: form })).status,
      403,
    );
    assert.equal(
      (
        await call("/api/admin/setup", {
          method: "POST",
          data: {
            ...form,
            email: "other@example.com",
            setupToken: "fixture-setup-token",
          },
        })
      ).status,
      403,
    );
    const owner = await call("/api/admin/setup", {
      method: "POST",
      data: { ...form, setupToken: "fixture-setup-token" },
    });
    assert.equal(owner.status, 201, JSON.stringify(owner.json));
    assert.match(owner.response.headers.get("set-cookie"), /Secure/);
    const cookie = owner.cookie;
    assert.equal(
      (
        await call("/api/admin/setup", {
          method: "POST",
          data: { ...form, setupToken: "fixture-setup-token" },
        })
      ).status,
      409,
    );
    assert.equal(
      (
        await call("/api/admin/settings", {
          method: "PATCH",
          cookie,
          data: { cashTag: "$FixtureBusiness" },
        })
      ).status,
      200,
    );
    const catalog = (await call("/api/catalog")).json.products;
    assert.equal(catalog.length, 20);
    const product = catalog.find((p) => p.id === "reserve-hoodie");
    assert.equal(
      (
        await call("/api/admin/products", {
          method: "PATCH",
          cookie,
          data: { ...product, price_cents: 7500, inventory: 3 },
        })
      ).status,
      200,
    );
    const member = await call("/api/auth/signup", {
      method: "POST",
      data: { firstName: "Member", email: "member@example.com", password },
    });
    assert.equal(member.status, 201);
    assert.equal(
      (await call("/api/admin/orders", { cookie: member.cookie })).status,
      401,
    );
    const orderInput = {
      name: "Member",
      email: "member@example.com",
      method: "cashapp",
      items: [{ productId: "membership-crew", quantity: 1, size: "M" }],
    };
    const checkout = await call("/api/orders", {
      method: "POST",
      data: orderInput,
    });
    assert.equal(checkout.status, 201, JSON.stringify(checkout.json));
    const query = new URL(checkout.json.url, origin).search;
    assert.equal(
      (
        await call("/api/order/proof" + query, {
          method: "POST",
          data: { image: receipt, reference: "receipt" },
        })
      ).status,
      200,
    );
    assert.equal(f.files.size, 1);
    assert.equal(
      (await call("/api/admin/receipt?order=" + checkout.json.orderId)).status,
      401,
    );
    const view = await call(
      "/api/admin/receipt?order=" + checkout.json.orderId,
      { cookie },
    );
    assert.equal(view.status, 200);
    assert.equal(view.response.headers.get("content-type"), "image/png");
    const approved = await call("/api/admin/orders", {
      method: "PATCH",
      cookie,
      data: {
        id: checkout.json.orderId,
        action: "verify_cashapp",
        reference: "verified-ref",
      },
    });
    assert.equal(approved.status, 200, JSON.stringify(approved.json));
    assert.equal(
      (await f.db.prepare("SELECT COUNT(*) AS n FROM memberships").get()).n,
      1,
    );
    for (const route of [
      "overview",
      "customers",
      "orders",
      "memberships",
      "products",
      "messages",
      "settings",
      "activity",
    ]) {
      const response = await call("/api/admin/" + route, { cookie });
      assert.equal(
        response.status,
        200,
        route + ": " + JSON.stringify(response.json),
      );
    }
    const client = await f.db
      .prepare("SELECT * FROM customers WHERE email=?")
      .get("member@example.com");
    await call("/api/admin/customers", {
      method: "PATCH",
      cookie,
      data: { id: client.id, action: "verify_account" },
    });
    await call("/api/support", {
      method: "POST",
      data: { email: client.email, name: "Member", message: "A question" },
    });
    const message = (await call("/api/admin/messages", { cookie })).json
      .rows[0];
    assert.equal(
      (
        await call("/api/admin/messages", {
          method: "PATCH",
          cookie,
          data: { id: message.id, reply: "A response", status: "closed" },
        })
      ).status,
      200,
    );
    const account = await call("/api/account", { cookie: member.cookie });
    assert.equal(account.status, 200);
    assert.equal(account.json.messages[0].replies[0].body, "A response");
    await migrate(f.db);
    assert.equal(
      (await f.db.prepare("SELECT * FROM products WHERE id=?").get(product.id))
        .price_cents,
      7500,
      "rerunning setup must preserve CRM edits",
    );
    const secured = await f.pg.query(
      "SELECT relrowsecurity FROM pg_class JOIN pg_namespace n ON n.oid=relnamespace WHERE n.nspname='clubwallen' AND relname='orders'",
    );
    assert.equal(secured.rows[0].relrowsecurity, true);
    await f.pg.exec("CREATE ROLE anonymous_test; SET ROLE anonymous_test");
    await assert.rejects(
      () => f.pg.query("SELECT * FROM clubwallen.orders"),
      /permission denied/,
    );
    await f.pg.exec("RESET ROLE");
  } finally {
    await f.close();
  }
});

test("PostgreSQL webhook verification preserves raw bytes, rolls back stock conflicts and rate limits survive new function instances", async () => {
  const f = await fixture();
  try {
    const owner = await f.call("/api/admin/setup", {
      method: "POST",
      data: {
        email: "owner@example.com",
        name: "Owner",
        password,
        setupToken: "fixture-setup-token",
      },
    });
    const input = {
      name: "Customer",
      email: "customer@example.com",
      method: "card",
      items: [{ productId: "membership-crew", quantity: 1, size: "M" }],
    };
    const checkout = await f.call("/api/orders", {
      method: "POST",
      data: input,
    });
    assert.equal(checkout.status, 201);
    const event = {
      id: "evt_raw",
      type: "checkout.session.completed",
      livemode: false,
      data: {
        object: {
          id: "cs_1",
          client_reference_id: checkout.json.orderId,
          metadata: { order_id: checkout.json.orderId },
          amount_total: 35000,
          currency: "usd",
          payment_status: "paid",
          payment_intent: "pi_fixture",
        },
      },
    };
    const raw = JSON.stringify(event, null, 2) + "\n",
      t = Math.floor(Date.now() / 1000),
      signature = createHmac("sha256", "whsec_fixture")
        .update(t + "." + raw)
        .digest("hex");
    const send = () =>
      f.call("/api/webhooks/stripe", {
        method: "POST",
        data: raw,
        headers: { "stripe-signature": `t=${t},v1=${signature}` },
      });
    assert.equal((await send()).status, 200);
    assert.equal((await send()).json.duplicate, true);
    assert.equal(
      (await f.db.prepare("SELECT COUNT(*) AS n FROM memberships").get()).n,
      1,
    );
    assert.equal(
      (await f.call("/api/admin/overview", { cookie: owner.cookie })).json
        .testPaidCents,
      35000,
    );
    await f.db
      .prepare("UPDATE products SET inventory=1 WHERE id=?")
      .run("reserve-hoodie");
    const merch = await f.call("/api/orders", {
      method: "POST",
      data: {
        ...input,
        items: [{ productId: "reserve-hoodie", quantity: 1, size: "M" }],
        address: {
          line1: "1 Test Street",
          city: "Test",
          state: "NY",
          zip: "10001",
          country: "US",
        },
      },
    });
    assert.equal(merch.status, 201, JSON.stringify(merch.json));
    await f.db
      .prepare("UPDATE products SET inventory=0 WHERE id=?")
      .run("reserve-hoodie");
    await assert.rejects(
      () => settleOrder(f.db, merch.json.orderId, "test", "pi_stock"),
      /Inventory changed/,
    );
    assert.equal(
      (
        await f.db
          .prepare("SELECT payment_status FROM orders WHERE id=?")
          .get(merch.json.orderId)
      ).payment_status,
      "unpaid",
      "stock conflict must roll back the paid state",
    );
    for (let i = 0; i < 20; i++)
      await f.call("/api/auth/login", {
        method: "POST",
        data: { email: "missing@example.com", password: "wrong" },
      });
    const another = await createApi(f.options);
    const response = await serveRequest(
      another,
      new Request(origin + "/api/auth/login", {
        method: "POST",
        headers: { origin, "content-type": "application/json" },
        body: JSON.stringify({
          email: "missing@example.com",
          password: "wrong",
        }),
      }),
      { clientAddress: "192.0.2.10" },
    );
    assert.equal(response.status, 429);
    assert.equal(
      postgresSql(
        "SELECT * FROM orders WHERE reference='? FROM accounts' AND id=?",
      ),
      "SELECT * FROM clubwallen.orders WHERE reference='? FROM accounts' AND id=$1",
    );
  } finally {
    await f.close();
  }
});

test("Vercel function fails closed without cloud secrets", async () => {
  const response = await deployment.fetch(
    new Request("https://club.example/api/status"),
  );
  assert.equal(response.status, 503);
  assert.doesNotMatch(await response.text(), /postgres:\/\//);
});
