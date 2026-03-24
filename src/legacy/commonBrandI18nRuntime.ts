"use client";

import { loadPublicScript } from "@/legacy/loadPublicScript";

export type CommonBrandI18nRuntime = {
  loaded: true;
};

export async function ensureCommonBrandI18nRuntime(options?: { src?: string }): Promise<CommonBrandI18nRuntime> {
  const src = options?.src || "/js/common-brand-i18n.js";
  await loadPublicScript(src);
  return { loaded: true };
}
