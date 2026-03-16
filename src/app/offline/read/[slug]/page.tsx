"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";

function safeParse<T>(value: string | null, fallback: T): T {
  try {
    if (!value) return fallback;
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

type OfflinePayload = {
  slug?: string;
  judul?: string;
  title?: string;
  kategori?: string;
  category?: string;
  thumbnail?: string;
  ringkasan?: string;
  excerpt?: string;
  isi?: string; // legacy HTML
  content?: string; // markdown
};

export default function OfflineReadPage({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug || "");
  const [map, setMap] = useState<Record<string, OfflinePayload>>(() => {
    if (typeof window === "undefined") return {};
    return safeParse<Record<string, OfflinePayload>>(localStorage.getItem("offlineArticles"), {});
  });

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === "offlineArticles") {
        setMap(safeParse<Record<string, OfflinePayload>>(event.newValue, {}));
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const payload = map?.[slug] || null;

  const title = payload?.judul || payload?.title || slug;
  const category = payload?.kategori || payload?.category || "";
  const excerpt = payload?.ringkasan || payload?.excerpt || "";

  const htmlBody = useMemo(() => {
    const raw = String(payload?.isi || "");
    return raw;
  }, [payload?.isi]);

  const mdBody = useMemo(() => {
    return String(payload?.content || "");
  }, [payload?.content]);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-10">
        <Link href="/offline" className="text-xs font-bold text-zinc-700 hover:underline">
          ← Kembali ke Offline
        </Link>

        {!payload ? (
          <div className="mt-6">
            <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900">Artikel offline tidak ditemukan</h1>
            <p className="mt-2 text-sm leading-7 text-zinc-600">
              Data offline untuk <span className="font-semibold">{slug}</span> tidak ada di perangkat ini.
            </p>
          </div>
        ) : (
          <div className="mt-6">
            <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">{title}</h1>
            {category ? <p className="mt-2 text-xs font-semibold text-zinc-500">{category}</p> : null}
            {excerpt ? <p className="mt-4 text-sm leading-7 text-zinc-600">{excerpt}</p> : null}

            <div className="mt-8">
              {htmlBody ? (
                <article className="markdown" dangerouslySetInnerHTML={{ __html: htmlBody }} />
              ) : (
                <article className="markdown">
                  <ReactMarkdown>{mdBody}</ReactMarkdown>
                </article>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
