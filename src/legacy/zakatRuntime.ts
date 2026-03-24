"use client";

import { loadPublicScript } from "@/legacy/loadPublicScript";

export type ZakatRuntime = {
  loaded: true;
};

export async function ensureZakatRuntime(options?: {
  chartSrc?: string;
  i18nSrc?: string;
  src?: string;
}): Promise<ZakatRuntime> {
  await loadPublicScript(options?.chartSrc || "https://cdn.jsdelivr.net/npm/chart.js");
  await loadPublicScript(options?.i18nSrc || "/js/zakat-pages-i18n.js");
  await loadPublicScript(options?.src || "/js/zakat.js");
  return { loaded: true };
}
