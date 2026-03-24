"use client";

import { loadPublicScript } from "@/legacy/loadPublicScript";

export type AccessGuardRuntime = {
  loaded: true;
};

export async function ensureAccessGuardRuntime(options?: { authSrc?: string; guardSrc?: string }): Promise<AccessGuardRuntime> {
  const authSrc = options?.authSrc || "/js/auth.js";
  const guardSrc = options?.guardSrc || "/js/access-guard.js";

  await loadPublicScript(authSrc);
  await loadPublicScript(guardSrc);

  return { loaded: true };
}
