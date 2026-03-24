"use client";

import { loadPublicScript } from "@/legacy/loadPublicScript";

export type FalakRuntime = {
  loaded: true;
};

export async function ensureFalakRuntime(): Promise<FalakRuntime> {
  await loadPublicScript("/js/falak-api.js?v=20260321a");
  await loadPublicScript("/js/falak.js?v=20260321a");

  return { loaded: true };
}
