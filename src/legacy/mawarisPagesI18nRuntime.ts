"use client";

import { loadPublicScript } from "@/legacy/loadPublicScript";

export type MawarisPagesI18nRuntime = {
  loaded: true;
};

export async function ensureMawarisPagesI18nRuntime(options?: { src?: string }): Promise<MawarisPagesI18nRuntime> {
  const src = options?.src || "/js/mawaris-pages-i18n.js";
  await loadPublicScript(src);
  return { loaded: true };
}
