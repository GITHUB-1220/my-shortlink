export async function onRequest(context) {
  const links = {
    test: {
      url: "https://example.com",
      expire: "2027-01-01T00:00:00Z"
    }
  };

  const code = context.params.code;
  const item = links[code];

  if (!item) {
    return new Response("链接不存在", { status: 404 });
  }

  if (Date.now() > new Date(item.expire).getTime()) {
    return new Response("链接已过期", { status: 410 });
  }

  return Response.redirect(item.url, 302);
}
