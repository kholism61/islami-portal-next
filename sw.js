// NOTE:
// This repository contains a single functional Service Worker at `public/sw.js`.
// Next.js serves files under `public/` at the site root (e.g. `/sw.js`).
// This root-level file is intentionally a no-op stub to avoid confusion.

self.addEventListener("install", () => {
  try {
    self.skipWaiting();
  } catch {}
});

self.addEventListener("activate", () => {
  try {
    self.clients.claim();
  } catch {}
});

self.addEventListener("message", (event) => {
  if (event?.data?.type === "SKIP_WAITING") {
    try {
      self.skipWaiting();
    } catch {}
  }
});