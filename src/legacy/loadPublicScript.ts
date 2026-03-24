"use client";

declare global {
  interface Window {
    __publicScriptPromises?: Partial<Record<string, Promise<void>>>;
  }
}

function getStore() {
  if (!window.__publicScriptPromises) {
    window.__publicScriptPromises = {};
  }

  return window.__publicScriptPromises;
}

export function loadPublicScript(src: string): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  const store = getStore();
  if (store[src]) return store[src] as Promise<void>;

  store[src] = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[data-public-src="${src}"]`
    );

    if (existing?.dataset.loaded === "true") {
      resolve();
      return;
    }

    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error(`Failed to load ${src}`)),
        { once: true }
      );
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.dataset.publicSrc = src;

    script.addEventListener(
      "load",
      () => {
        script.dataset.loaded = "true";
        resolve();
      },
      { once: true }
    );

    script.addEventListener(
      "error",
      () => reject(new Error(`Failed to load ${src}`)),
      { once: true }
    );

    document.body.appendChild(script);
  });

  return store[src] as Promise<void>;
}
