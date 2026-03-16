"use client";

import { useEffect, useMemo, useState } from "react";

import type { ArticleDetail } from "@/lib/articles";

type Props = {
  article: Pick<ArticleDetail, "slug" | "title" | "excerpt" | "thumbnail" | "createdAt" | "author" | "category" | "content">;
};

function safeParse<T>(value: string | null, fallback: T): T {
  try {
    if (!value) return fallback;
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function getBookmarks(): string[] {
  return safeParse<string[]>(localStorage.getItem("bookmarks"), []);
}

function setBookmarks(next: string[]) {
  localStorage.setItem("bookmarks", JSON.stringify(Array.from(new Set(next))));
}

function getOffline(): Record<string, any> {
  return safeParse<Record<string, any>>(localStorage.getItem("offlineArticles"), {});
}

function setOffline(next: Record<string, any>) {
  localStorage.setItem("offlineArticles", JSON.stringify(next));
}

export default function ArticleActions({ article }: Props) {
  const [mounted, setMounted] = useState(false);
  const [saved, setSaved] = useState(false);
  const [offlineSaved, setOfflineSaved] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);

    const currentBookmarks = getBookmarks();
    setSaved(currentBookmarks.includes(article.slug));

    const offlineMap = getOffline();
    setOfflineSaved(Boolean(offlineMap[article.slug]));
  }, [article.slug]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 1600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const offlinePayload = useMemo(() => {
    return {
      slug: article.slug,
      judul: article.title,
      kategori: article.category || "",
      penulis: article.author || "",
      createdAt: article.createdAt || "",
      thumbnail: article.thumbnail || "",
      ringkasan: article.excerpt || "",
      content: article.content,
    };
  }, [article]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      <button
        type="button"
        onClick={() => {
          const next = getBookmarks();
          const nextSaved = next.includes(article.slug)
            ? next.filter((id) => id !== article.slug)
            : [...next, article.slug];
          setBookmarks(nextSaved);
          setSaved(nextSaved.includes(article.slug));
          setToast(nextSaved.includes(article.slug) ? "Disimpan ke bookmark" : "Dihapus dari bookmark");
        }}
        className={`rounded-2xl px-4 py-3 text-sm font-extrabold transition ${
          saved ? "bg-amber-500 text-amber-950 hover:bg-amber-400" : "bg-zinc-900 text-white hover:bg-zinc-800"
        }`}
      >
        {saved ? "⭐ Bookmarked" : "⭐ Simpan Bookmark"}
      </button>

      <button
        type="button"
        onClick={() => {
          const offline = getOffline();
          if (offline[article.slug]) {
            delete offline[article.slug];
            setOffline(offline);
            setOfflineSaved(false);
            setToast("Dihapus dari offline");
            return;
          }

          offline[article.slug] = offlinePayload;
          setOffline(offline);
          setOfflineSaved(true);
          setToast("Tersimpan untuk offline");
        }}
        className={`rounded-2xl border px-4 py-3 text-sm font-extrabold transition ${
          offlineSaved
            ? "border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
            : "border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50"
        }`}
      >
        {offlineSaved ? "⬇️ Offline tersimpan" : "⬇️ Simpan Offline"}
      </button>

      {toast ? (
        <div className="sm:col-span-2 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-xs font-semibold text-zinc-700">
          {toast}
        </div>
      ) : null}
    </div>
  );
}
