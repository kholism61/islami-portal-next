"use client";

import { loadPublicScript } from "@/legacy/loadPublicScript";

export type PortalAdminI18n = {
  getLang: () => string;
  t: (key: string, params?: Record<string, unknown>) => string;
  formatCurrency: (amount: number) => string;
};

export async function ensureAdminI18nRuntime(options?: { src?: string }): Promise<PortalAdminI18n> {
  const src = options?.src || "/js/admin-pages-i18n.js";
  await loadPublicScript(src);

  if (!window.PortalAdminI18n) {
    throw new Error(`PortalAdminI18n is not available after loading ${src}`);
  }

  return window.PortalAdminI18n as PortalAdminI18n;
}
