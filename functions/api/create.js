
export async function onRequestPost({request, env}){
 const data=await request.json();
 const expire=Date.now()+((data.days||7)*86400000);
 await env.LINKS.put(data.code, JSON.stringify({
   url:data.url, expire, clicks:0
 }));
 return new Response("创建成功: /"+data.code);
}
