"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

type SmartFiqhPage = "haid" | "puasa" | "shalat" | "zakat" | "thaharah";

declare global {
  interface Window {
    SMART_FIQH_CONFIG?: unknown;
  }
}

const PAGE_ASSETS: Record<SmartFiqhPage, { data: string; engine: string }> = {
  haid: {
    data: "/smart-fiqh/assets/smart-haid/smart-data-haid.js",
    engine: "/smart-fiqh/assets/smart-fiqh-engine.js",
  },
  puasa: {
    data: "/smart-fiqh/assets/smart-puasa/smart-data-puasa.js",
    engine: "/smart-fiqh/assets/smart-fiqh-engine.js",
  },
  shalat: {
    data: "/smart-fiqh/assets/smart-shalat/smart-data-shalat.js",
    engine: "/smart-fiqh/assets/smart-fiqh-engine.js",
  },
  zakat: {
    data: "/smart-fiqh/assets/smart-zakat/smart-data-zakat.js",
    engine: "/smart-fiqh/assets/smart-fiqh-engine.js",
  },
  thaharah: {
    data: "/smart-fiqh/assets/smart-thaharah-modern/smart-data-thaharah.js",
    engine: "/smart-fiqh/assets/smart-thaharah-modern/smart-fiqh-engine-thaharah.js",
  },
};

async function fetchText(src: string) {
  const res = await fetch(src, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${src}`);
  }
  return res.text();
}

function runScriptText(code: string) {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.text = code;
  document.body.appendChild(script);
  script.remove();
}

export default function SmartFiqhScope({
  page,
  bodyClass,
}: {
  page: SmartFiqhPage;
  bodyClass?: string;
}) {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const classes = ["tool-smart-fiqh", `tool-smart-fiqh-${page}`];
    if (bodyClass) classes.push(bodyClass);

    classes.forEach((cls) => document.body.classList.add(cls));

    return () => {
      classes.forEach((cls) => document.body.classList.remove(cls));
    };
  }, [page, bodyClass]);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      const { data, engine } = PAGE_ASSETS[page];
      const [dataCode, engineCode] = await Promise.all([
        fetchText(data),
        fetchText(engine),
      ]);

      if (cancelled) return;

      window.SMART_FIQH_CONFIG = undefined;
      runScriptText(dataCode);
      runScriptText(engineCode);
      window.dispatchEvent(new CustomEvent("smartfiqh:route-ready", { detail: { page, pathname } }));
    };

    void init();

    return () => {
      cancelled = true;
      window.SMART_FIQH_CONFIG = undefined;
    };
  }, [page, pathname]);

  return null;
}
