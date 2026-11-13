import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export const RECEIPT_LIMIT = 3 * 1024 * 1024;
export async function receiptStore({
  dataDir,
  supabaseUrl,
  supabaseSecret,
  bucket = "payment-receipts",
  cloud = false,
}) {
  if (supabaseUrl && supabaseSecret) {
    if (!supabaseUrl.startsWith("https://"))
      throw Error("SUPABASE_URL must use HTTPS");
    const { createClient } = await import("@supabase/supabase-js");
    const client = createClient(supabaseUrl, supabaseSecret, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const storage = client.storage.from(bucket);
    return {
      async put(name, bytes, contentType) {
        const { error } = await storage.upload(name, bytes, {
          contentType,
          upsert: false,
        });
        if (error) throw Error("Private receipt upload failed");
      },
      async get(name) {
        if (name !== path.basename(name)) throw Error("Invalid receipt key");
        const { data, error } = await storage.download(name);
        if (error) throw Error("Private receipt download failed");
        return Buffer.from(await data.arrayBuffer());
      },
    };
  }
  if (cloud) throw Error("Supabase private storage is not configured");
  const root = path.join(dataDir, "receipts");
  return {
    async put(name, bytes) {
      await mkdir(root, { recursive: true, mode: 0o700 });
      await writeFile(path.join(root, path.basename(name)), bytes, {
        mode: 0o600,
      });
    },
    get: (name) => readFile(path.join(root, path.basename(name))),
  };
}
