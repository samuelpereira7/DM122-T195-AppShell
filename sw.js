self.addEventListener('install', event => {
  console.log('[Service Worker] Installing service worker...');
  event.waitUntil(
    caches.open('app-shell-v1')
      .then(cache => {
        return cache.addAll([
          'offline.html'
        ]);
      })
  );
  self.skipWaiting();    
});

self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating service worker...');
});

async function networkFirst(request) {
  try {
    return await fetch(request);
  } catch {
    const cache = await caches.open('app-shell-v1');
    return cache.match('offline.html');
  }
}

self.addEventListener('fetch', event => {
  // console.log('[Service Worker] Fetching event...', event);
  event.respondWith(networkFirst(event.request));
});