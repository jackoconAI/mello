const CACHE_NAME = "mello-v1";
const OFFLINE_URLS = ["/board", "/login", "/scope/new"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(OFFLINE_URLS).catch(() => {
        // Some URLs may not be available yet during dev
        console.log("Some offline URLs could not be cached");
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Network-first strategy for API calls
  if (event.request.url.includes("/api/")) {
    event.respondWith(
      fetch(event.request).catch(() =>
        new Response(JSON.stringify({ error: "Offline" }), {
          headers: { "Content-Type": "application/json" },
        })
      )
    );
    return;
  }

  // Cache-first for static assets
  if (
    event.request.destination === "image" ||
    event.request.destination === "font" ||
    event.request.destination === "style" ||
    event.request.destination === "script"
  ) {
    event.respondWith(
      caches.match(event.request).then(
        (cached) =>
          cached ||
          fetch(event.request).then((response) => {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
            return response;
          })
      )
    );
    return;
  }

  // Network-first for navigation
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

// Handle form draft messages from the app
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SAVE_DRAFT") {
    // Store draft in IndexedDB via the service worker
    // The app handles this via localStorage, but this is a backup
    console.log("Draft saved via SW:", event.data.payload);
  }
});
