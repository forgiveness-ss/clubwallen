import { existsSync } from "node:fs";
import { connectPostgres } from "../server/sql.mjs";
import { migrate } from "../server/migrate.mjs";
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
try {
  db = await connectPostgres(
    process.env.DATABASE_MIGRATION_URL || process.env.DATABASE_URL,
  );
  await migrate(db);
  const { createClient } = await import("@supabase/supabase-js");
  const client = createClient(process.env.SUPABASE_URL, secret, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const name = "payment-receipts";
  const { data, error } = await client.storage.getBucket(name);
  if (
    error &&
    String(error.status) !== "404" &&
    !/not found/i.test(error.message)
  )
    throw Error("Unable to inspect private receipt bucket");
  const config = {
    public: false,
    fileSizeLimit: 3 * 1024 * 1024,
    allowedMimeTypes: ["image/png", "image/jpeg", "image/webp"],
  };
  const result = data
    ? await client.storage.updateBucket(name, config)
    : await client.storage.createBucket(name, config);
  if (result.error)
    throw Error("Unable to create or secure private receipt bucket");
  const check = await client.storage.getBucket(name);
  if (check.error || check.data.public)
    throw Error("Private bucket verification failed");
  console.log(
    "Database migration applied; catalog seeded without overwriting existing products. Private payment-receipts bucket verified.",
  );
} catch {
  // Do not print provider errors that could include connection credentials.
  console.error(
    "Cloud setup failed. Check project status, database connection/SSL, and server key permissions. No credentials were printed.",
  );
  process.exitCode = 1;
} finally {
  if (db) await db.close();
}
