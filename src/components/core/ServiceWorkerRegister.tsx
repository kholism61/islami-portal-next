"use client";

import { useEffect } from "react";

function checkForUpdates(registration: ServiceWorkerRegistration | null) {
  try {
    registration?.update();
  } catch {}
}

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    let reloaded = false;

    navigator.serviceWorker
      .register("/sw.js?v=20260324a")
      .then((registration) => {
        /* Cek update setiap kali halaman dimuat (termasuk refresh biasa) */
        checkForUpdates(registration);

        if (registration.waiting) {
          registration.waiting.postMessage({ type: "SKIP_WAITING" });
        }

        registration.addEventListener("updatefound", () => {
          const worker = registration.installing;
          if (!worker) return;

          worker.addEventListener("statechange", () => {
            if (worker.state === "installed" && navigator.serviceWorker.controller) {
              worker.postMessage({ type: "SKIP_WAITING" });
            }
          });
        });
      })
      .catch(() => {});

    /* Cek lagi saat tab aktif / fokus (mis. kembali dari tab lain) */
    const onFocus = () => {
      navigator.serviceWorker.ready.then((reg) => checkForUpdates(reg));
    };
    const onVisible = () => {
      if (document.visibilityState === "visible") onFocus();
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisible);

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (reloaded) return;
      reloaded = true;
      window.location.reload();
    });

    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return null;
}
