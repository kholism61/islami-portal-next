"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type OfflineRecord = {
  slug: string;
  title: string;
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

export default function OfflineClient() {
  const [map, setMap] = useState<Record<string, any>>({});

  useEffect(() => {
    setMap(safeParse<Record<string, any>>(localStorage.getItem("offlineArticles"), {}));

    const onStorage = (event: StorageEvent) => {
      if (event.key === "offlineArticles") {
        setMap(safeParse<Record<string, any>>(event.newValue, {}));
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const items = useMemo(() => {
    return Object.keys(map)
      .map((slug) => {
        const raw = map[slug] || {};
        return {
          slug,
          title: raw.judul || raw.title || slug,
          category: raw.kategori || raw.category || "",
          thumbnail: raw.thumbnail || "",
          excerpt: raw.ringkasan || raw.excerpt || "",
        } satisfies OfflineRecord;
      })
      .filter((item) => item.slug);
  }, [map]);

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">Offline</h1>
          <p className="mt-2 text-sm leading-7 text-zinc-600">
            Artikel yang disimpan untuk offline. Data diambil dari localStorage key <code>offlineArticles</code>.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (!window.confirm("Hapus semua artikel offline?")) return;
            localStorage.removeItem("offlineArticles");
            setMap({});
          }}
          className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-bold text-zinc-700 hover:bg-zinc-100"
        >
          Hapus semua
        </button>
      </div>

      {items.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-600">
          Belum ada artikel offline.
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.slug} className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
              <Link href={`/offline/read/${encodeURIComponent(item.slug)}`} className="block">
                <h2 className="text-base font-bold text-zinc-900 hover:underline">{item.title}</h2>
              </Link>
              {item.category ? <p className="mt-1 text-xs font-semibold text-zinc-500">{item.category}</p> : null}
              {item.excerpt ? (
                <p className="mt-2 line-clamp-4 text-sm leading-6 text-zinc-600">{item.excerpt}</p>
              ) : null}

              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href={`/offline/read/${encodeURIComponent(item.slug)}`}
                  className="rounded-full bg-zinc-900 px-4 py-2 text-xs font-bold text-white hover:bg-zinc-800"
                >
                  Baca
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    const next = { ...map };
                    delete next[item.slug];
                    localStorage.setItem("offlineArticles", JSON.stringify(next));
                    setMap(next);
                  }}
                  className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-bold text-zinc-700 hover:bg-zinc-100"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
