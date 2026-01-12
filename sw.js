const CACHE_NAME = 'my-pwa-cache-v1';
// 需要快取的核心檔案列表
const urlsToCache = [
  '/<Your-Repository-Name>/',
  '/<Your-Repository-Name>/index.html',
  '/<Your-Repository-Name>/style.css',
  '/<Your-Repository-Name>/app.js',
  '/<Your-Repository-Name>/images/icons/icon-192x192.png'
];

// 1. 安裝 Service Worker 並快取核心檔案
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. 攔截網路請求，優先從快取中讀取
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果快取中有對應的回應，則直接回傳
        if (response) {
          return response;
        }
        // 否則，發出網路請求
        return fetch(event.[...](asc_slot://start-slot-21)request);
      })
  );
});
