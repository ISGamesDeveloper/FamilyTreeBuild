const cacheName = "DemoBuild-FamilyTree-1.0";
const contentToCache = [
    "Build/FamilyTree.loader.js",
    "Build/242baee708d9962cda03a212e1ed1588.js",
    "Build/43a42ff8e55e99281eeb142f2facf6aa.data",
    "Build/7ced7871f8991a062336a515da5222d7.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
