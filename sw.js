// Holding Pattern // Daily Planner — service worker
// App-shell cache so the planner opens offline. Google APIs are network-only
// (cross-origin and the OAuth token is short-lived).

const CACHE = "holding-pattern-v2"; // v2: share_target manifest
const SHELL = ["./", "./index.html", "./manifest.json", "./icon.svg"];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(SHELL).catch(() => {}))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Don't cache cross-origin requests (Google APIs, gsi/client, gapi/api.js)
  if (url.origin !== self.location.origin) return;

  // For navigations, prefer network but fall back to cached index.html when offline
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).catch(() => caches.match("./index.html"))
    );
    return;
  }

  // For app shell assets: cache-first with background refresh
  event.respondWith(
    caches.match(req).then((cached) => {
      const fresh = fetch(req).then((resp) => {
        if (resp.ok && resp.status === 200 && resp.type === "basic") {
          const copy = resp.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        }
        return resp;
      }).catch(() => null);
      return cached || fresh;
    })
  );
});
