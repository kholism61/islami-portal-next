"use client";

import { loadPublicScript } from "@/legacy/loadPublicScript";

export type RamadhanRuntime = {
  loaded: true;
};

export async function ensureRamadhanRuntime(options?: { src?: string }): Promise<RamadhanRuntime> {
  const src = options?.src || "/js/ramadhan.js";
  await loadPublicScript(src);
  return { loaded: true };
}
