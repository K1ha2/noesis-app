const CACHE_NAME = "noesis-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/css/main.css",
  "/js/main.js",
  "/js/chat.js",
  "/js/music.js",
  "/js/snake.js",
  "/js/fitness.js",
  "/js/lotus.js",
  "/js/settings.js",
  "/js/onboarding.js",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(err => console.error("Cache install failed:", err))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});