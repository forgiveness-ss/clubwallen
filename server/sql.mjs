import { AsyncLocalStorage } from "node:async_hooks";

// Keep application SQL portable; PostgreSQL tables live outside the public API schema.
export function postgresSql(sql) {
  if (/^INSERT OR IGNORE /i.test(sql))
    sql =
      sql.replace(/^INSERT OR IGNORE /i, "INSERT ") + " ON CONFLICT DO NOTHING";
  let parameter = 0;
  let tableNext = false;
  const tables = new Set([
    "accounts",
    "sessions",
    "customers",
    "products",
    "orders",
    "memberships",
    "messages",
    "webhook_events",
    "audit",
    "settings",
    "rate_limits",
  ]);
  return sql.replace(/'(?:''|[^'])*'|[a-zA-Z_][a-zA-Z_0-9]*|\?/g, (token) => {
    if (token.startsWith("'")) return token;
    if (token === "?") return "$" + ++parameter;
    const lower = token.toLowerCase();
    const qualify = tableNext && tables.has(lower);
    tableNext = ["from", "join", "update", "into"].includes(lower);
    return qualify ? "clubwallen." + token : token;
  });
}

export function postgresAdapter(pool) {
  const context = new AsyncLocalStorage();
  const query = (sql, args = []) =>
    (context.getStore() || pool).query(postgresSql(sql), args);
  return {
    dialect: "postgres",
    prepare(sql) {
      return {
        get: async (...args) => (await query(sql, args)).rows[0],
        all: async (...args) => (await query(sql, args)).rows,
        run: async (...args) => ({
          changes: (await query(sql, args)).rowCount,
        }),
      };
    },
    exec: (sql) => query(sql),
    async transaction(fn) {
      if (context.getStore()) return fn();
      const client = await pool.connect();
      try {
        await client.query("BEGIN");
        const result = await context.run(client, fn);
        await client.query("COMMIT");
        return result;
      } catch (error) {
        await client.query("ROLLBACK");
        throw error;
      } finally {
        client.release();
      }
    },
    close: () => pool.end(),
  };
}

// Serialize local transactions and other operations so awaits cannot expose partial writes.
export function sqliteAdapter(raw) {
  const context = new AsyncLocalStorage();
  let tail = Promise.resolve();
  const exclusive = (fn) => {
    if (context.getStore()) return Promise.resolve().then(fn);
    const result = tail.then(() => context.run(true, fn));
    tail = result.catch(() => {});
    return result;
  };
  return {
    dialect: "sqlite",
    prepare(sql) {
      const statement = raw.prepare(sql);
      return Object.fromEntries(
        ["get", "all", "run"].map((method) => [
          method,
          (...args) => exclusive(() => statement[method](...args)),
        ]),
      );
    },
    exec: (sql) => exclusive(() => raw.exec(sql)),
    transaction: (fn) =>
      exclusive(async () => {
        raw.exec("BEGIN IMMEDIATE");
        try {
          const result = await fn();
          raw.exec("COMMIT");
          return result;
        } catch (error) {
          raw.exec("ROLLBACK");
          throw error;
        }
      }),
    close: () => exclusive(() => raw.close()),
  };
}

export async function connectPostgres(connectionString) {
  const { Pool, types } = await import("pg");
  types.setTypeParser(20, (value) => {
    const number = Number(value);
    if (!Number.isSafeInteger(number))
      throw Error("Database number exceeds safe integer range");
    return number;
  });
  // No named prepared statements or session-level settings: compatible with Supavisor.
  const url = new URL(connectionString);
  for (const key of ["sslmode", "sslcert", "sslkey", "sslrootcert"])
    url.searchParams.delete(key);
  const pool = new Pool({
    connectionString: url.toString(),
    max: 1,
    ssl: { rejectUnauthorized: true },
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 10000,
    allowExitOnIdle: true,
  });
  pool.on("error", () => {}); // Failed idle connections are discarded; requests receive generic API errors.
  if (process.env.VERCEL) {
    const { attachDatabasePool } = await import("@vercel/functions");
    attachDatabasePool(pool);
  }
  return postgresAdapter(pool);
}
