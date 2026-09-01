const json = (data, init = {}) =>
  new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...init.headers,
    },
  });

export const onRequestGet = async ({ request }) => {
  const cloudflare = request.cf ?? {};

  return json({
    ok: true,
    service: "project1-pages-function",
    location: cloudflare.colo ?? cloudflare.country ?? "Cloudflare edge",
    requestId: request.headers.get("cf-ray")?.split("-")[0] ?? crypto.randomUUID(),
    timestamp: new Date().toISOString(),
  });
};

export const onRequest = async (context) => {
  if (context.request.method === "GET") {
    return onRequestGet(context);
  }

  return json(
    { ok: false, error: "Method not allowed" },
    { status: 405, headers: { allow: "GET" } },
  );
};
