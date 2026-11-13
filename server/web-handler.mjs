import { Readable } from "node:stream";

// Web-standard entry point keeps the original Stripe body bytes intact.
export async function serveRequest(
  api,
  request,
  { clientAddress = "unknown" } = {},
) {
  const url = new URL(request.url);
  // A rewrite carries the path explicitly; direct /api/index calls cannot choose a route.
  const route =
    url.pathname === "/api/index"
      ? url.searchParams.get("__route")
      : url.pathname;
  if (
    !route?.startsWith("/api/") ||
    route.includes("?") ||
    route.includes("#") ||
    route.includes("..")
  )
    return new Response("Not found", { status: 404 });
  url.searchParams.delete("__route");
  const req = request.body ? Readable.fromWeb(request.body) : Readable.from([]);
  req.method = request.method;
  req.url = route + url.search;
  req.headers = Object.fromEntries(request.headers);
  req.headers.host = url.host;
  req.socket = { remoteAddress: clientAddress };
  req.clientAddress = clientAddress;
  const headers = new Headers();
  let status = 200,
    bytes;
  const res = {
    headersSent: false,
    writableEnded: false,
    setHeader: (key, value) => headers.set(key, value),
    writeHead(code, values) {
      status = code;
      this.headersSent = true;
      for (const [key, value] of Object.entries(values))
        headers.set(key, value);
    },
    end(data) {
      bytes = data;
      this.writableEnded = true;
    },
  };
  const handled = await api.handle(req, res);
  if (!handled) return new Response("Not found", { status: 404 });
  return new Response(bytes ?? null, { status, headers });
}
