"use client";

import { loadPublicScript } from "@/legacy/loadPublicScript";

export type HomeAdsRuntime = {
  loaded: true;
};

export async function ensureHomeAdsRuntime(options?: { src?: string }): Promise<HomeAdsRuntime> {
  const src = options?.src || "/js/home-ads.js";
  await loadPublicScript(src);
  return { loaded: true };
}
