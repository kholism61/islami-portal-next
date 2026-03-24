"use client";

import { loadPublicScript } from "@/legacy/loadPublicScript";

export type StaticPagesI18nRuntime = {
  loaded: true;
};

export async function ensureStaticPagesI18nRuntime(options?: { src?: string }): Promise<StaticPagesI18nRuntime> {
  const src = options?.src || "/js/static-pages-i18n.js";
  await loadPublicScript(src);
  return { loaded: true };
}
