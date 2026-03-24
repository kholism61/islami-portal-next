"use client";

import { loadPublicScript } from "@/legacy/loadPublicScript";

export type KontakRuntime = {
  loaded: true;
};

export async function ensureKontakRuntime(options?: { src?: string }): Promise<KontakRuntime> {
  const src = options?.src || "/js/kontak.js";
  await loadPublicScript(src);
  return { loaded: true };
}
