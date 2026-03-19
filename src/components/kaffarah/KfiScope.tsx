"use client";

import { useEffect } from "react";

export default function KfiScope() {
  useEffect(() => {
    document.body.classList.add("kfi-scope");

    const ensureI18n = () => {
      if ((window as any).__kfiMaybeApply) return;

      const existing = document.getElementById("kfi-i18n-script");
      if (existing) return;

      const script = document.createElement("script");
      script.id = "kfi-i18n-script";
      script.src = "/js/kaffarah-fidyah-i18n.js";
      script.async = true;
      script.onload = () => {
        (window as any).__kfiMaybeApply?.();
      };
      document.body.appendChild(script);
    };

    ensureI18n();
    (window as any).__kfiMaybeApply?.();
    setTimeout(() => {
      ensureI18n();
      (window as any).__kfiMaybeApply?.();
    }, 0);
    setTimeout(() => {
      ensureI18n();
      (window as any).__kfiMaybeApply?.();
    }, 200);
    setTimeout(() => {
      ensureI18n();
      (window as any).__kfiMaybeApply?.();
    }, 800);

    return () => {
      document.body.classList.remove("kfi-scope");
      document.body.classList.remove("rtl-ui", "lang-id", "lang-en", "lang-ar");
      document.documentElement.lang = "id";
      document.documentElement.dir = "ltr";
    };
  }, []);

  return null;
}
