self.addEventListener('install', event => {
  console.log('[Service Worker] Installing service worker...');
  self.skipWaiting();    
});

self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating service worker...');
});

self.addEventListener('fetch', event => {
  console.log('[Service Worker] Fetching event...', event);
});