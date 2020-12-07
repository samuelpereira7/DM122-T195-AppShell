const cacheName = 'app-shell-v1';
const assetsToCache = [
  'offline.html',
  'index.html',
];

async function cacheStaticAssets() {
  try {
    const cache = await caches.open(cacheName);
    return await cache.addAll(assetsToCache);
  } catch (error) {
    console.error('Failed to install assets cache: ', error);
  }
}

self.addEventListener('install', event => {
  console.log('[Service Worker] Installing service worker...');
  event.waitUntil(cacheStaticAssets());
  self.skipWaiting();    
});

function removeOldCache(cacheKey) {
  if(cacheKey !== cacheName) {
    console.log('[Service Worker] Removing old cache ')
    return caches.delete(cacheKey);
  }
}

async function cacheCleanUp() {
  const keyList = await caches.keys();
  return Promise.all(keyList.map(removeOldCache));
}

self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating service worker...');
  event.waitUntil(cacheCleanUp());
  self.clients.claim();
});

async function networkFirst(request) {
  try {
    return await fetch(request);
  } catch {
    const cache = await caches.open(cacheName);
    return cache.match('offline.html');
  }
}

self.addEventListener('fetch', event => {
  // console.log('[Service Worker] Fetching event...', event);
  event.respondWith(networkFirst(event.request));
});