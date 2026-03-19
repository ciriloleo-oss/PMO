const CACHE_NAME = 'manut-aars-static-20260318a';
const ASSETS = [
  './manut_oper.html?v=20260318a',
  './manut_oper_app.html?v=20260318a',
  './manifest_manut.json?v=20260318a',
  './manutAARS_192.png?v=20260318a',
  './manutAARS_512.png?v=20260318a'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).catch(() => null));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  if(event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  if(req.method !== 'GET') return;

  if(url.pathname.includes('/rest/v1/') || url.pathname.includes('/storage/v1/')){
    event.respondWith(fetch(req, { cache: 'no-store' }));
    return;
  }

  if(req.mode === 'navigate'){
    event.respondWith(fetch(req).catch(() => caches.match('./manut_oper.html?v=20260318a')));
    return;
  }

  event.respondWith(
    caches.match(req, { ignoreSearch: false }).then(cached => {
      if(cached) return cached;
      return fetch(req).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy)).catch(() => null);
        return response;
      });
    })
  );
});
