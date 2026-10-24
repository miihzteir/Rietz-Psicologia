// Rietz Psicologia: funciona offline e atualiza sozinho
const CACHE="rietz-v11";
const SHELL=["./","index.html","config.js","manifest.json","icons/icon-192.png","icons/icon-512.png","icons/apple-touch-icon.png","icons/favicon-32.png","icons/icon.svg"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL.map(u=>new Request(u,{cache:"reload"})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
  if(u.origin!==location.origin){if(/gstatic\.com|googleapis\.com\/css|fonts\.gstatic/.test(u.host+u.pathname))e.respondWith(caches.open(CACHE).then(c=>c.match(r).then(m=>m||fetch(r).then(n=>{if(n.ok)c.put(r,n.clone());return n}))));return}
  e.respondWith(fetch(r,{cache:"no-cache"}).then(n=>{if(n.ok){const cp=n.clone();caches.open(CACHE).then(c=>c.put(r,cp))}return n}).catch(()=>caches.match(r).then(m=>m||caches.match("index.html"))));
});
