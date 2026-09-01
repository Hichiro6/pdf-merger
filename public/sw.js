// PDF Merger Service Worker — offline-first cache
// Relative paths so the app works under any base path (e.g. GitHub Pages subpath).
const CACHE_NAME = 'pdf-merger-v1';

self.addEventListener('install', (event) => {
  // Precache on install; skipWaiting so new SW activates immediately.
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(['./', './index.html', './manifest.json', './favicon.svg']))
      .then(() => self.skipWaiting()),
  );
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))),
      )
      .then(() => self.clients.claim()),
  );
});

// Fetch: cache-first for static assets, network-first for pages
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle same-origin GET requests (ignore extensions, cross-origin)
  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) {
    return;
  }

  // Never intercept the PDF worker — it's loaded by the app itself
  if (request.url.includes('pdf.worker')) {
    return;
  }

  // Static assets: cache-first
  if (request.url.match(/\.(css|js|mjs|svg|png|woff2?|ico)$/)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        });
      }),
    );
    return;
  }

  // Pages: network-first with cache fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        return response;
      })
      .catch(() => caches.match(request).then((cached) => cached || caches.match('./index.html'))),
  );
});
