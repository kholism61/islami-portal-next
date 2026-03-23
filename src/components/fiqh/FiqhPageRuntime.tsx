"use client";

import { useEffect } from "react";
import { loadLegacyScript } from "@/components/fiqh/legacy-runtime";

type PageKey = "haid" | "nifas" | "suci" | "iddah" | "istihadhah";

const PAGE_BINDINGS: Record<PageKey, Array<{ buttonId: string; handlerName: string }>> = {
  haid: [
    { buttonId: "hitungHaidBtn", handlerName: "hitung" },
    { buttonId: "exportHaidHistoryBtn", handlerName: "exportData" },
    { buttonId: "resetHaidHistoryBtn", handlerName: "resetHistory" }
  ],
  nifas: [{ buttonId: "hitungNifasBtn", handlerName: "hitungNifas" }],
  suci: [{ buttonId: "hitungSuciBtn", handlerName: "hitungSuci" }],
  iddah: [{ buttonId: "hitungIddahBtn", handlerName: "hitungIddah" }],
  istihadhah: [{ buttonId: "hitungIstihadhahBtn", handlerName: "hitungIstihadhah" }]
};

const PAGE_SCRIPTS: Record<PageKey, string[]> = {
  haid: ["/js/haid-engine.js", "https://cdn.jsdelivr.net/npm/chart.js"],
  nifas: ["/js/nifas.js"],
  suci: ["/js/suci.js"],
  iddah: ["/js/iddah.js"],
  istihadhah: ["/js/istihadhah.js"]
};

function bindAction(buttonId: string, handlerName: string) {
  const button = document.getElementById(buttonId);
  if (!button) return;
  if (button.dataset.fiqhBound === handlerName) return;

  button.dataset.fiqhBound = handlerName;
  button.addEventListener("click", () => {
    const fn = window[handlerName as keyof Window];
    if (typeof fn === "function") {
      fn();
    }
  });
}

function bindMumayyizToggle() {
  const checkbox = document.getElementById("mumayyiz") as HTMLInputElement | null;
  const box = document.getElementById("tamyizBox");
  if (!checkbox || !box) return () => {};

  const sync = () => {
    box.style.display = checkbox.checked ? "block" : "none";
  };

  checkbox.addEventListener("change", sync);
  sync();

  return () => checkbox.removeEventListener("change", sync);
}

export default function FiqhPageRuntime({ page }: { page: PageKey }) {
  useEffect(() => {
    let active = true;
    let cleanup = () => {};

    const init = async () => {
      if (page === "haid") {
        await loadLegacyScript("/js/haid-engine.js");
        void loadLegacyScript("https://cdn.jsdelivr.net/npm/chart.js");
      } else {
        for (const src of PAGE_SCRIPTS[page]) {
          await loadLegacyScript(src);
        }
      }

      await loadLegacyScript("/js/fiqh-wanita-i18n.js");

      if (!active) return;

      PAGE_BINDINGS[page].forEach(({ buttonId, handlerName }) => {
        bindAction(buttonId, handlerName);
      });

      if (page === "haid") {
        cleanup = bindMumayyizToggle();
      }

      window.dispatchEvent(new Event("fiqh:routechange"));
    };

    void init();

    return () => {
      active = false;
      cleanup();
    };
  }, [page]);

  return null;
}
