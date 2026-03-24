"use client";

import { loadPublicScript } from "@/legacy/loadPublicScript";

export type ArticleRuntime = {
  syncArticleChrome?: () => void;
  updateBookmarkBadge?: () => void;
  getLocalizedCategory?: (category: string, lang?: string) => string;
  getCategoryIcon?: (name: string) => string;
};

export async function ensureArticleRuntime(): Promise<ArticleRuntime> {
  await loadPublicScript("/js/article-store.js?v=20260321a");
  await loadPublicScript("/js/i18n.js?v=20260321a");
  await loadPublicScript("/js/article.js?v=20260321a");

  return {
    syncArticleChrome: window.syncArticleChrome,
    updateBookmarkBadge: window.updateBookmarkBadge,
    getLocalizedCategory: window.getLocalizedCategory,
    getCategoryIcon: window.getCategoryIcon
  };
}
