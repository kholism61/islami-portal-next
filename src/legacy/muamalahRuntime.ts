"use client";

import { loadPublicScript } from "@/legacy/loadPublicScript";

export type MuamalahRuntime = {
  loaded: true;
};

export async function ensureMuamalahRuntime(options?: { src?: string }): Promise<MuamalahRuntime> {
  const src = options?.src || "/js/muamalah.js";
  await loadPublicScript(src);
  return { loaded: true };
}
