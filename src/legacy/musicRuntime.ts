"use client";

import { loadPublicScript } from "@/legacy/loadPublicScript";

export type MusicRuntime = {
  loaded: true;
};

export async function ensureMusicRuntime(options?: { src?: string }): Promise<MusicRuntime> {
  const src = options?.src || "/js/music.js";
  await loadPublicScript(src);
  return { loaded: true };
}
