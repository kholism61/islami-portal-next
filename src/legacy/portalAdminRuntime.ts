"use client";

import { loadPublicScript } from "@/legacy/loadPublicScript";

export type PortalAdminRuntime = {
  loaded: true;
};

export async function ensurePortalAdminRuntime(options?: { i18nSrc?: string; authSrc?: string; guardSrc?: string; src?: string }): Promise<PortalAdminRuntime> {
  await loadPublicScript(options?.i18nSrc || "/js/admin-pages-i18n.js");

  await loadPublicScript(options?.authSrc || "/js/auth.js");
  await loadPublicScript(options?.guardSrc || "/js/access-guard.js");

  await loadPublicScript(options?.src || "/js/portal-admin.js");

  return { loaded: true };
}
