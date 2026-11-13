// Classify known errors without including provider messages, URLs, SQL, or credentials.
export function setupError(error, stage) {
  const nodes = [error, error?.cause, ...(error?.errors || [])].filter(Boolean);
  const codes = new Set(nodes.map((e) => e.code));
  const matches = (pattern) => nodes.some((e) => pattern.test(e.message || ""));
  const status = Number(error?.statusCode || error?.status);
  let reason;
  if (codes.has("ERR_INVALID_URL"))
    reason =
      "A connection URL is invalid. Copy the complete project URL and database connection string into .env.";
  else if (
    [...codes].some((c) =>
      [
        "SELF_SIGNED_CERT_IN_CHAIN",
        "DEPTH_ZERO_SELF_SIGNED_CERT",
        "UNABLE_TO_VERIFY_LEAF_SIGNATURE",
        "UNABLE_TO_GET_ISSUER_CERT_LOCALLY",
        "CERT_HAS_EXPIRED",
        "ERR_TLS_CERT_ALTNAME_INVALID",
      ].includes(c),
    )
  )
    reason =
      "Database TLS certificate verification failed. Check the Supabase CA certificate or configure DATABASE_SSL_CA with your provider certificate.";
  else if (codes.has("ENOENT"))
    reason =
      "A required local file is missing. Check DATABASE_SSL_CA_FILE and the bundled migration/certificate files.";
  else if (codes.has("ENOTFOUND") || codes.has("EAI_AGAIN"))
    reason =
      "The service hostname could not be resolved. Copy the exact host from Supabase Connect and check your internet connection.";
  else if (codes.has("28P01") || matches(/password authentication|SASL|SCRAM/))
    reason =
      "Supabase rejected the database credentials. Check the DATABASE_URL username and database password, including URL encoding. The database password is separate from the API secret key.";
  else if (matches(/tenant or user not found/))
    reason =
      "The pooler host and username do not match a Supabase project. Copy the full connection string from Connect → Transaction pooler.";
  else if (matches(/circuit breaker/))
    reason =
      "Supabase temporarily blocked repeated connection attempts. Stop retries, correct the database credentials, and wait for the block to clear.";
  else if (
    codes.has("ETIMEDOUT") ||
    codes.has("ECONNREFUSED") ||
    codes.has("ENETUNREACH") ||
    matches(/timeout|timed out|connection terminated/)
  )
    reason =
      "The database could not be reached. Check that the project is running and the pooler port is reachable from your network.";
  else if (codes.has("42501") || status === 403)
    reason =
      "The configured account/key lacks permission for this step. Use the project database administrator for migration and a server secret key for Storage.";
  else if (status === 401 || matches(/invalid.*key|invalid.*JWT|unauthoriz/))
    reason =
      "Supabase rejected the Storage key. Copy a server secret key from the same project as SUPABASE_URL.";
  else if (codes.has("42601"))
    reason =
      "PostgreSQL rejected the migration SQL. Check the migration source; credentials were not printed.";
  else if (matches(/Applied migration was changed/))
    reason =
      "An applied migration has changed. Restore the original migration and add a new version for schema changes.";
  else if (status === 404)
    reason =
      "Supabase could not find the requested resource. Check SUPABASE_URL and project status.";
  else
    reason =
      "The provider rejected this step. Check the project logs and configuration; raw errors are hidden to protect credentials.";
  return `Cloud setup failed during ${stage}. ${reason}`;
}
