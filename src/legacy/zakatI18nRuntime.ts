"use client";

import { loadPublicScript } from "@/legacy/loadPublicScript";

export type ZakatI18nRuntime = {
  loaded: true;
};

export async function ensureZakatI18nRuntime(options?: { src?: string }): Promise<ZakatI18nRuntime> {
  const src = options?.src || "/js/zakat-pages-i18n.js";
  await loadPublicScript(src);
  return { loaded: true };
}
