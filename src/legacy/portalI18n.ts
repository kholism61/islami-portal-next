"use client";

import { loadPublicScript } from "@/legacy/loadPublicScript";

export type SiteLang = "id" | "en" | "ar";

export type PortalI18n = {
  getCurrentLang: () => SiteLang;
  setLang: (lang: SiteLang) => void;
  t: (key: string, params?: Record<string, unknown>) => string;
  translateAuthError: (message: string, lang?: SiteLang) => string;
  apply: (lang?: SiteLang) => void;
};

export async function ensurePortalI18n(): Promise<PortalI18n> {
  await loadPublicScript("/js/i18n.js?v=20260321a");

  if (!window.PortalI18n) {
    throw new Error("PortalI18n is not available after loading /js/i18n.js");
  }

  return window.PortalI18n;
}

export function getPortalI18nSafe(): PortalI18n | null {
  return window.PortalI18n ?? null;
}
