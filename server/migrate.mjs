import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { PAYMENT_DEFAULTS } from "./payment-settings.mjs";

export async function migrate(db) {
  if (db.dialect !== "postgres")
    throw Error("Cloud migration requires PostgreSQL");
  const sql = await readFile(
    new URL("../supabase/migrations/001_crm.sql", import.meta.url),
    "utf8",
  );
  const checksum = createHash("sha256").update(sql).digest("hex");
  const catalog = JSON.parse(
    await readFile(new URL("./catalog.json", import.meta.url), "utf8"),
  );
  await db.transaction(async () => {
    await db.exec(
      "CREATE SCHEMA IF NOT EXISTS clubwallen; CREATE TABLE IF NOT EXISTS clubwallen.schema_migrations(version TEXT PRIMARY KEY,checksum TEXT NOT NULL,applied_at TEXT NOT NULL); LOCK TABLE clubwallen.schema_migrations IN EXCLUSIVE MODE",
    );
    for (const [version, source] of [
      ["001", sql],
      [
        "002",
        await readFile(
          new URL(
            "../supabase/migrations/002_payment_instructions.sql",
            import.meta.url,
          ),
          "utf8",
        ),
      ],
    ]) {
      const digest =
        version === "001"
          ? checksum
          : createHash("sha256").update(source).digest("hex");
      const previous = await db
        .prepare(
          "SELECT checksum FROM clubwallen.schema_migrations WHERE version=?",
        )
        .get(version);
      if (previous && previous.checksum !== digest)
        throw Error(
          "Applied migration was changed; add a new migration instead",
        );
      if (!previous) {
        await db.exec(source);
        await db
          .prepare("INSERT INTO clubwallen.schema_migrations VALUES(?,?,?)")
          .run(version, digest, new Date().toISOString());
      }
    }
    for (const [index, p] of catalog.entries()) {
      await db
        .prepare(
          "INSERT OR IGNORE INTO products(id,name,kind,price_cents,image,description,sizes,sort_order) VALUES(?,?,?,?,?,?,?,?)",
        )
        .run(
          p.id,
          p.name,
          p.kind,
          p.price_cents,
          p.image || null,
          p.description || "",
          JSON.stringify(p.sizes || []),
          index,
        );
    }
    for (const [key, value] of Object.entries({
      brand: "The Exclusive",
      country: "United States",
      currency: "USD",
      renewal: "manual",
      cashTag: "",
      supportEmail: "",
      cryptoEnabled: "false",
      ...PAYMENT_DEFAULTS,
    })) {
      await db
        .prepare("INSERT OR IGNORE INTO settings(key,value) VALUES(?,?)")
        .run(key, value);
    }
  });
}
