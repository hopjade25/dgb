// dgb 서비스 워커: 앱 셸 사전 캐시 + 차트/음악 데이터는 처음 받을 때 캐시(오프라인 재생)
const V='dgb-202610101850';
const SHELL=['./','index.html','css/dgb.css','manifest.webmanifest','data/songs.json','icons/icon-192.png','data/img/notes/red.png','data/img/notes/gold.png','data/img/notes/green.png',
 'js/0-core.js','js/1-parser.js','js/2-audio.js','js/3-songs.js','js/4-state.js','js/5-input.js','js/6-menu.js','js/7-update.js','js/8-render.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(K=>Promise.all(K.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
 // 셸·목록: 네트워크 우선(업데이트 즉시 반영), 실패 시 캐시 / 차트·음악: 캐시 우선
 const data=/\/(charts|data\/music|data\/sfx|data\/img)\//.test(u.pathname);
 e.respondWith(data?caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const c=res.clone();caches.open(V).then(x=>x.put(e.request,c));return res;}))
  :fetch(e.request).then(res=>{const c=res.clone();caches.open(V).then(x=>x.put(e.request,c));return res;}).catch(()=>caches.match(e.request)));});
