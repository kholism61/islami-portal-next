"use client";

import { loadPublicScript } from "@/legacy/loadPublicScript";

export type SmartHubRuntime = {
  loaded: true;
};

export async function ensureSmartHubRuntime(options?: { src?: string }): Promise<SmartHubRuntime> {
  const src = options?.src || "/js/smart-hub.js";
  await loadPublicScript(src);
  return { loaded: true };
}
