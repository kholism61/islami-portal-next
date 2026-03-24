"use client";

import { loadPublicScript } from "@/legacy/loadPublicScript";

export type DonationRuntime = {
  loaded: true;
};

export async function ensureDonationRuntime(options?: { src?: string }): Promise<DonationRuntime> {
  const src = options?.src || "/js/donation.js";
  await loadPublicScript(src);
  return { loaded: true };
}
