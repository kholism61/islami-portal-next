const CACHE_NAME = "islami-portal-next-v9";
const OFFLINE_URL = "/offline";

const PRECACHE_URLS = [
  "/",
  "/articles",
  "/bookmark",
  "/offline",
  "/signin",
  "/signup",
  "/zakat",
  "/about",
  "/faq",
  "/donasi",
  "/manifest.webmanifest",
  "/assets/icons/icon-192.png",
  "/assets/icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );

  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) return;

  const isNavigation = request.mode === "navigate";
  const isHtml = request.headers.get("accept")?.includes("text/html");
  const isAsset = url.pathname.startsWith("/css/")
    || url.pathname.startsWith("/js/")
    || url.pathname.startsWith("/assets/")
    || url.pathname.endsWith(".css")
    || url.pathname.endsWith(".js")
    || url.pathname.endsWith(".mjs")
    || url.pathname.endsWith(".png")
    || url.pathname.endsWith(".jpg")
    || url.pathname.endsWith(".jpeg")
    || url.pathname.endsWith(".webp")
    || url.pathname.endsWith(".gif")
    || url.pathname.endsWith(".svg")
    || url.pathname.endsWith(".ico");

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      if (!isNavigation && !isHtml && !isAsset) {
        const cached = await cache.match(request);
        if (cached) return cached;

        try {
          const response = await fetch(request);
          if (response && response.status === 200 && response.type === "basic") {
            cache.put(request, response.clone());
          }
          return response;
        } catch {
          return cached || new Response("Offline", { status: 503 });
        }
      }

      try {
        const networkResponse = await fetch(request);
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === "basic") {
          cache.put(request, networkResponse.clone());
        }
        return networkResponse;
      } catch {
        const cached = await cache.match(request);
        if (cached) return cached;

        const offlineFallback = await cache.match(OFFLINE_URL);
        if (offlineFallback) return offlineFallback;

        return new Response("Offline", { status: 503 });
      }
    })()
  );
});
