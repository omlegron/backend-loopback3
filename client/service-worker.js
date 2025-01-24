self.addEventListener('install', function(event) {
  console.log('Service Worker installed');
  // Perform install steps
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      console.log('Caching files');
      return cache.addAll([
        // Add files to cache
        '/',
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log('Service Worker activated');
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Cache hit - return response from cache
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
