// 定義快取名稱和需要快取的核心檔案
const CACHE_NAME = 'loan-assistant-cache-v1';
const urlsToCache = [
  '/',
  'index.html',
  'style.css',
  'app.js',
  'manifest.json',
  'icons/icon-192.png'
];

// 監聽 'install' 事件，在 Service Worker 安裝時進行快取
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('快取已開啟');
        return cache.addAll(urlsToCache);
      })
  );
});

// 監聽 'fetch' 事件，攔截網路請求
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果快取中有對應的回應，就直接回傳
        // 否則，就發出網路請求
        return response || fetch(event.request);
      })
  );
});
