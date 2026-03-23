"use client";

declare global {
  interface Window {
    __fiqhScriptPromises?: Partial<Record<string, Promise<void>>>;
    hitung?: () => void;
    exportData?: () => void;
    resetHistory?: () => void;
    hitungNifas?: () => void;
    hitungSuci?: () => void;
    hitungIddah?: () => void;
    hitungIstihadhah?: () => void;
  }
}

function getStore() {
  if (!window.__fiqhScriptPromises) {
    window.__fiqhScriptPromises = {};
  }

  return window.__fiqhScriptPromises;
}

export function loadLegacyScript(src: string) {
  if (typeof window === "undefined") return Promise.resolve();

  const store = getStore();
  if (store[src]) return store[src] as Promise<void>;

  store[src] = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[data-fiqh-src="${src}"]`
    );

    if (existing?.dataset.loaded === "true") {
      resolve();
      return;
    }

    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)), {
        once: true
      });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.dataset.fiqhSrc = src;
    script.addEventListener(
      "load",
      () => {
        script.dataset.loaded = "true";
        resolve();
      },
      { once: true }
    );
    script.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)), {
      once: true
    });
    document.body.appendChild(script);
  });

  return store[src];
}
