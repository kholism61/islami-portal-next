"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

type KfiScopeProps = {
  bodyClass?: string;
};

declare global {
  interface Window {
    __kfiMaybeApply?: () => void;
    __kfiScriptPromise?: Promise<void>;
    __kfiScriptLoaded?: boolean;
  }
}

const SCRIPT_ID = "kfi-i18n-script";
const SCRIPT_SRC = "/js/kaffarah-fidyah-i18n.js?v=20260323e";

function loadKfiI18nScript() {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.__kfiScriptLoaded && typeof window.__kfiMaybeApply === "function") {
    return Promise.resolve();
  }
  if (window.__kfiScriptPromise) return window.__kfiScriptPromise;

  const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
  if (existing) {
    window.__kfiScriptPromise = new Promise((resolve, reject) => {
      if (typeof window.__kfiMaybeApply === "function") {
        window.__kfiScriptLoaded = true;
        resolve();
        return;
      }

      existing.addEventListener(
        "load",
        () => {
          window.__kfiScriptLoaded = true;
          resolve();
        },
        { once: true }
      );

      existing.addEventListener(
        "error",
        () => reject(new Error("Failed to load kaffarah i18n script")),
        { once: true }
      );
    });

    return window.__kfiScriptPromise;
  }

  window.__kfiScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = false;
    script.defer = true;
    script.onload = () => {
      window.__kfiScriptLoaded = true;
      resolve();
    };
    script.onerror = () => reject(new Error("Failed to load kaffarah i18n script"));
    document.head.appendChild(script);
  });

  return window.__kfiScriptPromise;
}

function triggerApply() {
  if (typeof window === "undefined") return;

  const run = () => {
    try {
      window.__kfiMaybeApply?.();
      window.dispatchEvent(new CustomEvent("kfi:route-ready", {
        detail: { pathname: window.location.pathname }
      }));
    } catch {}
  };

  run();
  setTimeout(run, 0);
  setTimeout(run, 60);
  setTimeout(run, 180);

  try {
    requestAnimationFrame(() => requestAnimationFrame(run));
  } catch {}
}

export default function KfiScope({ bodyClass }: KfiScopeProps) {
  const pathname = usePathname();

  useLayoutEffect(() => {
    document.body.classList.add("kfi-scope");
    if (bodyClass) document.body.classList.add(bodyClass);

    let cancelled = false;
    triggerApply();

    loadKfiI18nScript()
      .then(() => {
        if (!cancelled) triggerApply();
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      if (bodyClass) document.body.classList.remove(bodyClass);
      document.body.classList.remove("kfi-scope");
    };
  }, [bodyClass, pathname]);

  return null;
}
