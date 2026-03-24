"use client";

import { loadPublicScript } from "@/legacy/loadPublicScript";

export type AdminRuntime = {
  loaded: true;
};

export async function ensureAdminRuntime(options?: { i18nSrc?: string; src?: string }): Promise<AdminRuntime> {
  if (options?.i18nSrc) {
    await loadPublicScript(options.i18nSrc);
  } else {
    await loadPublicScript("/js/admin-pages-i18n.js");
  }

  await loadPublicScript("/js/auth.js");
  await loadPublicScript("/js/access-guard.js");

  const src = options?.src || "/js/admin.js";
  await loadPublicScript(src);

  return { loaded: true };
}
