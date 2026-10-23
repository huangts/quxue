/* Offline cache for the lesson site. Scope is the folder that contains this file. */
const CACHE = "quxue-v1";
const PRECACHE = ["./index.html", "./math7a-1-1/index.html"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

async function cached(request) {
  const hit = await caches.match(request, { ignoreSearch: true });
  if (hit) return hit;
  const url = new URL(request.url);
  if (url.pathname.endsWith("/")) {
    const indexHit = await caches.match(new URL("index.html", url).href, { ignoreSearch: true });
    if (indexHit) return indexHit;
  }
  return null;
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(
    (async () => {
      const hit = await cached(request);
      if (hit) return hit;
      try {
        const response = await fetch(request);
        if (response && response.ok && response.type === "basic") {
          const cache = await caches.open(CACHE);
          cache.put(request, response.clone());
        }
        return response;
      } catch (err) {
        const fallback = await cached(request);
        if (fallback) return fallback;
        throw err;
      }
    })()
  );
});
