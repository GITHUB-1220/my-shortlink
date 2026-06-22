
export async function onRequest(context){
 const code=context.params.code;
 if(code==='admin') return context.next();
 const raw=await context.env.LINKS.get(code);
 if(!raw) return new Response('链接不存在',{status:404});
 const item=JSON.parse(raw);
 if(Date.now()>item.expire) return new Response('链接已过期',{status:410});
 item.clicks=(item.clicks||0)+1;
 await context.env.LINKS.put(code, JSON.stringify(item));
 return Response.redirect(item.url,302);
}
