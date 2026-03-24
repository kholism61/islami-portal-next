"use client";

import { loadPublicScript } from "@/legacy/loadPublicScript";

export type OfflineRuntime = {
  loaded: true;
};

export async function ensureOfflineRuntime(): Promise<OfflineRuntime> {
  await loadPublicScript("/js/article-store.js?v=20260323b");
  await loadPublicScript("/js/i18n.js?v=20260321a");
  await loadPublicScript("/js/article.js?v=20260324d");
  await loadPublicScript("/js/offline.js?v=20260323b");

  return { loaded: true };
}
