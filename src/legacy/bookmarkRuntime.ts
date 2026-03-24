"use client";

import { loadPublicScript } from "@/legacy/loadPublicScript";

export type BookmarkRuntime = {
  updateBookmarkBadge?: () => void;
  getLocalizedCategory?: (category: string, lang?: string) => string;
};

export async function ensureBookmarkRuntime(): Promise<BookmarkRuntime> {
  await loadPublicScript("/js/article-store.js?v=20260321a");
  await loadPublicScript("/js/i18n.js?v=20260321a");
  await loadPublicScript("/js/article.js?v=20260324d");
  await loadPublicScript("/js/bookmark.js?v=20260321a");

  return {
    updateBookmarkBadge: window.updateBookmarkBadge,
    getLocalizedCategory: window.getLocalizedCategory
  };
}
