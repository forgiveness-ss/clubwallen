export function cloudConfiguration(env) {
  const secret = env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY;
  const missing = ["APP_BASE_URL", "DATABASE_URL", "SUPABASE_URL"].filter(
    (key) => !env[key]?.trim(),
  );
  if (!secret?.trim()) missing.push("SUPABASE_SECRET_KEY");
  const fail = (message) => {
    const error = Error("Invalid cloud configuration");
    error.safeMessage = message;
    throw error;
  };
  if (missing.length)
    fail(
      `Missing Vercel environment variables: ${missing.join(", ")}. Add them to Production and redeploy.`,
    );
  let base, database, storage;
  try {
    base = new URL(env.APP_BASE_URL);
  } catch {}
  if (
    !base ||
    base.protocol !== "https:" ||
    base.username ||
    base.password ||
    base.pathname !== "/" ||
    base.search ||
    base.hash
  ) {
    fail(
      "APP_BASE_URL must be your HTTPS website origin, for example https://your-project.vercel.app. Update it in Vercel Production environment variables and redeploy.",
    );
  }
  try {
    database = new URL(env.DATABASE_URL);
  } catch {}
  if (
    !database ||
    !["postgres:", "postgresql:"].includes(database.protocol) ||
    !database.username ||
    !database.password
  ) {
    fail(
      "DATABASE_URL must be the complete PostgreSQL connection string from Supabase Connect, including the database password. Update it in Vercel and redeploy.",
    );
  }
  try {
    storage = new URL(env.SUPABASE_URL);
  } catch {}
  if (
    !storage ||
    storage.protocol !== "https:" ||
    storage.username ||
    storage.password ||
    storage.pathname !== "/" ||
    storage.search ||
    storage.hash
  ) {
    fail(
      "SUPABASE_URL must be your HTTPS Supabase project URL. Update it in Vercel and redeploy.",
    );
  }
  if (secret.startsWith("sb_publishable_"))
    fail(
      "SUPABASE_SECRET_KEY must be a server secret key, not a publishable key. Update it in Vercel and redeploy.",
    );
  return {
    baseUrl: base.origin,
    databaseUrl: env.DATABASE_URL,
    supabaseUrl: storage.origin,
    supabaseSecret: secret,
  };
}
