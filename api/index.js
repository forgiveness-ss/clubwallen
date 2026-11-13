import { createApi } from "../server/api.mjs";
import { serveRequest } from "../server/web-handler.mjs";
let pending;
function backend() {
  if (!pending) {
    const baseUrl = process.env.APP_BASE_URL;
    if (!baseUrl || !baseUrl.startsWith("https://"))
      throw Error("Set the HTTPS APP_BASE_URL");
    pending = createApi({
      cloud: true,
      baseUrl,
      databaseUrl: process.env.DATABASE_URL,
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseSecret:
        process.env.SUPABASE_SECRET_KEY ||
        process.env.SUPABASE_SERVICE_ROLE_KEY,
      setupToken: process.env.ADMIN_SETUP_TOKEN,
      adminEmail: process.env.ADMIN_EMAIL || "",
      allowedHosts: [
        process.env.VERCEL_URL,
        process.env.VERCEL_PROJECT_PRODUCTION_URL,
      ].filter(Boolean),
      stripeKey: process.env.STRIPE_SECRET_KEY || "",
      stripeWebhook: process.env.STRIPE_WEBHOOK_SECRET || "",
    }).catch((error) => {
      pending = undefined;
      throw error;
    });
  }
  return pending;
}
export default {
  async fetch(request) {
    try {
      const api = await backend();
      // Vercel supplies this header; never trust forwarded addresses in the local server.
      const clientAddress =
        request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
        "unknown";
      return await serveRequest(api, request, { clientAddress });
    } catch {
      return Response.json(
        {
          error:
            "The backend is not configured yet. Complete the Supabase and Vercel setup.",
        },
        { status: 503, headers: { "Cache-Control": "no-store" } },
      );
    }
  },
};
