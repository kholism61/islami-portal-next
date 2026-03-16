"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type BookmarkItem = {
  slug: string;
  title?: string;
  category?: string;
  thumbnail?: string;
  excerpt?: string;
};

function safeParse<T>(value: string | null, fallback: T): T {
  try {
    if (!value) return fallback;
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export default function BookmarkClient() {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [offlineMap, setOfflineMap] = useState<Record<string, any>>({});

  useEffect(() => {
    setSlugs(safeParse<string[]>(localStorage.getItem("bookmarks"), []));
    setOfflineMap(safeParse<Record<string, any>>(localStorage.getItem("offlineArticles"), {}));

    const onStorage = (event: StorageEvent) => {
      if (event.key === "bookmarks") {
        setSlugs(safeParse<string[]>(event.newValue, []));
      }
      if (event.key === "offlineArticles") {
        setOfflineMap(safeParse<Record<string, any>>(event.newValue, {}));
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const items = useMemo(() => {
    return slugs
      .map((slug) => {
        const offline = offlineMap[slug] || null;
        const title = offline?.judul || offline?.title || slug;
        const category = offline?.kategori || offline?.category || "";
        const excerpt = offline?.ringkasan || offline?.excerpt || "";
        const thumbnail = offline?.thumbnail || "";
        return { slug, title, category, excerpt, thumbnail } satisfies BookmarkItem;
      })
      .filter((item) => item.slug);
  }, [offlineMap, slugs]);

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-10">
      <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">Bookmark</h1>
      <p className="mt-2 text-sm leading-7 text-zinc-600">
        Daftar artikel yang kamu simpan. Data diambil dari localStorage key <code>bookmarks</code>.
      </p>

      {items.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-600">
          Belum ada bookmark.
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/article/${encodeURIComponent(item.slug)}`}
              className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h2 className="text-base font-bold text-zinc-900">{item.title}</h2>
              {item.category ? (
                <p className="mt-1 text-xs font-semibold text-zinc-500">{item.category}</p>
              ) : null}
              {item.excerpt ? (
                <p className="mt-2 line-clamp-4 text-sm leading-6 text-zinc-600">{item.excerpt}</p>
              ) : (
                <p className="mt-2 text-sm text-zinc-500">Buka artikel untuk membaca.</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
