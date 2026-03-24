"use client";

import { loadPublicScript } from "@/legacy/loadPublicScript";

export type ScrollToTopRuntime = {
  loaded: true;
};

export async function ensureScrollToTopRuntime(options?: { src?: string }): Promise<ScrollToTopRuntime> {
  const src = options?.src || "/js/scroll-to-top.js";
  await loadPublicScript(src);
  return { loaded: true };
}
