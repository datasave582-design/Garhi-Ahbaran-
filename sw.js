const V='mg38';
const ASSETS=['./','./index.html','./fb.js','./manifest.json','./icon-192.png','./icon-512.png'];
const CDN=['www.gstatic.com','fonts.googleapis.com','fonts.gstatic.com'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(V).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
function save(req,res){if(res&&(res.ok||res.type==='opaque')){const copy=res.clone();caches.open(V).then(c=>c.put(req,copy)).catch(()=>{})}return res}
// cache पहले, पीछे से अपडेट (तेज़)
function swr(req){return caches.match(req).then(hit=>{const net=fetch(req).then(r=>save(req,r)).catch(()=>hit);return hit||net})}
self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET') return;
  const url=new URL(req.url);
  if(url.origin!==self.location.origin){
    if(CDN.includes(url.hostname)) event.respondWith(swr(req));
    return;
  }
  if(url.pathname.startsWith('/__/')) return;
  if(req.mode==='navigate'){
    // नेटवर्क पहले (नया वर्ज़न), 4 सेकंड में न आए तो cache से तुरंत खोल दो
    event.respondWith(new Promise(resolve=>{
      let done=false;
      const fallback=()=>caches.match('./index.html').then(r=>r||caches.match('./'));
      const t=setTimeout(()=>{if(!done)fallback().then(r=>{if(r&&!done){done=true;resolve(r)}})},4000);
      fetch(req).then(res=>{if(done)return;done=true;clearTimeout(t);if(res.ok){const copy=res.clone();caches.open(V).then(c=>c.put('./index.html',copy)).catch(()=>{})}resolve(res)}).catch(()=>{if(done)return;clearTimeout(t);fallback().then(r=>{done=true;resolve(r||Response.error())})});
    }));
    return;
  }
  event.respondWith(swr(req));
});
