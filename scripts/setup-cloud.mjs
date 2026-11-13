import { existsSync } from "node:fs";
import { connectPostgres } from "../server/sql.mjs";
import { migrate } from "../server/migrate.mjs";
import { setupError } from "../server/setup-errors.mjs";
if (existsSync(".env")) process.loadEnvFile(".env");
const secret =
  process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!process.env.DATABASE_URL || !process.env.SUPABASE_URL || !secret) {
  console.error(
    "Set DATABASE_URL, SUPABASE_URL, and SUPABASE_SECRET_KEY in your private .env or environment first.",
  );
  process.exit(1);
}
let db;
let stage = "database connection";
try {
  db = await connectPostgres(
    process.env.DATABASE_MIGRATION_URL || process.env.DATABASE_URL,
  );
  await db.prepare("SELECT 1 AS ok").get();
  console.log("Database connection verified.");
  stage = "database migration";
  await migrate(db);
  console.log("Database migration and catalog seed verified.");
  stage = "private receipt storage";
  const { createClient } = await import("@supabase/supabase-js");
  const client = createClient(process.env.SUPABASE_URL, secret, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const name = "payment-receipts";
  const { data, error } = await client.storage.getBucket(name);
  if (
    error &&
    String(error.statusCode || error.status) !== "404" &&
    !/not found/i.test(error.message)
  )
    throw error;
  const config = {
    public: false,
    fileSizeLimit: 3 * 1024 * 1024,
    allowedMimeTypes: ["image/png", "image/jpeg", "image/webp"],
  };
  const result = data
    ? await client.storage.updateBucket(name, config)
    : await client.storage.createBucket(name, config);
  if (result.error) throw result.error;
  const check = await client.storage.getBucket(name);
  if (check.error) throw check.error;
  if (!check.data || check.data.public)
    throw Error("Private bucket verification failed");
  console.log(
    "Database migration applied; catalog seeded without overwriting existing products. Private payment-receipts bucket verified.",
  );
} catch (error) {
  console.error(setupError(error, stage));
  process.exitCode = 1;
} finally {
  if (db) await db.close();
}
