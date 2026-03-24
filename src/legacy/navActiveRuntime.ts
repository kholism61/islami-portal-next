"use client";

import { loadPublicScript } from "@/legacy/loadPublicScript";

export type NavActiveRuntime = {
  loaded: true;
};

export async function ensureNavActiveRuntime(options?: { src?: string }): Promise<NavActiveRuntime> {
  const src = options?.src || "/js/nav-active.js";
  await loadPublicScript(src);
  return { loaded: true };
}
