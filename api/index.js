import { createApi } from "../server/api.mjs";
import { serveRequest } from "../server/web-handler.mjs";
import { cloudConfiguration } from "../server/cloud-config.mjs";
import { setupError } from "../server/setup-errors.mjs";
let pending;
function backend() {
  if (!pending) {
    pending = createApi({
      cloud: true,
      ...cloudConfiguration(process.env),
      setupToken: process.env.ADMIN_SETUP_TOKEN,
      adminEmail: process.env.ADMIN_EMAIL || "",
      allowedHosts: [
        process.env.VERCEL_URL,
        process.env.VERCEL_PROJECT_PRODUCTION_URL,
      ].filter(Boolean),
      stripeKey: process.env.STRIPE_SECRET_KEY || "",
      stripeWebhook: process.env.STRIPE_WEBHOOK_SECRET || "",
      stripePublishable: process.env.STRIPE_PUBLISHABLE_KEY || "",
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
    } catch (error) {
      return Response.json(
        {
          error:
            error.safeMessage || setupError(error, "backend initialization"),
          code: "BACKEND_NOT_READY",
        },
        { status: 503, headers: { "Cache-Control": "no-store" } },
      );
    }
  },
};
