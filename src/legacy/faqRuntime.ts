"use client";

import { loadPublicScript } from "@/legacy/loadPublicScript";

export type FaqRuntime = {
  loaded: true;
};

export async function ensureFaqRuntime(options?: { src?: string }): Promise<FaqRuntime> {
  const src = options?.src || "/js/faq.js";
  await loadPublicScript(src);
  return { loaded: true };
}
