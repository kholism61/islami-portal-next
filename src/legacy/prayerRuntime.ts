"use client";

import { loadPublicScript } from "@/legacy/loadPublicScript";

export type PrayerRuntime = {
  loaded: true;
};

export async function ensurePrayerRuntime(): Promise<PrayerRuntime> {
  await loadPublicScript("/js/i18n.js?v=20260321a");
  await loadPublicScript("/js/prayer.js?v=20260321a");

  return { loaded: true };
}
