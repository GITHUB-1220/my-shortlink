
export async function onRequestPost({ request, env }) {

  const data = await request.json();

  let expire = null;

  if (data.expireDate) {
    expire = new Date(
      data.expireDate + "T23:59:59"
    ).getTime();
  }

  await env.LINKS.put(
    data.code,
    JSON.stringify({
      url: data.url,
      expire,
      clicks: 0,
      createdAt: Date.now()
    })
  );

  return new Response(
    "创建成功: /" + data.code
  );
}
