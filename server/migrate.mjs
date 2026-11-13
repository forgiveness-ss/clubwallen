import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";

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
    const previous = await db
      .prepare(
        "SELECT checksum FROM clubwallen.schema_migrations WHERE version=?",
      )
      .get("001");
    if (previous && previous.checksum !== checksum)
      throw Error("Applied migration was changed; add a new migration instead");
    if (!previous) {
      await db.exec(sql);
      await db
        .prepare("INSERT INTO clubwallen.schema_migrations VALUES(?,?,?)")
        .run("001", checksum, new Date().toISOString());
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
    })) {
      await db
        .prepare("INSERT OR IGNORE INTO settings(key,value) VALUES(?,?)")
        .run(key, value);
    }
  });
}
