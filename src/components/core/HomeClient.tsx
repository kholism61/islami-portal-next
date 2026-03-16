"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { ArticleSummary } from "@/lib/articles";

export default function HomeClient({ articles }: { articles: ArticleSummary[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return articles;

    return articles.filter((item) => {
      return (
        item.title.toLowerCase().includes(needle) ||
        (item.excerpt || "").toLowerCase().includes(needle) ||
        (item.category || "").toLowerCase().includes(needle)
      );
    });
  }, [articles, query]);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto w-full max-w-5xl px-4 py-10">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-10">
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
            Portal Literasi Islam
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-zinc-600">
            Homepage versi Next.js. Artikel dibaca dari folder markdown.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-xs font-bold text-zinc-700">Cari artikel</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari judul / ringkasan / kategori"
                className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold"
              />
            </label>

            <div className="flex flex-wrap items-end gap-2">
              <Link
                href="/articles"
                className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
              >
                Semua artikel
              </Link>
              <Link
                href="/bookmark"
                className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-100"
              >
                Bookmark
              </Link>
              <Link
                href="/offline"
                className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-100"
              >
                Offline
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => (
            <Link
              key={`${article.lang}:${article.slug}`}
              href={`/article/${encodeURIComponent(article.slug)}`}
              className="group rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-base font-bold leading-snug group-hover:underline">
                  {article.title}
                </h2>
                {article.createdAt ? (
                  <span className="shrink-0 rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">
                    {article.createdAt}
                  </span>
                ) : null}
              </div>

              {article.excerpt ? (
                <p className="mt-2 line-clamp-4 text-sm leading-6 text-zinc-600">
                  {article.excerpt}
                </p>
              ) : (
                <p className="mt-2 text-sm leading-6 text-zinc-500">Buka untuk membaca.</p>
              )}

              <div className="mt-4 flex items-center justify-between text-xs font-semibold text-zinc-500">
                <span>{article.category || ""}</span>
                <span className="text-zinc-700">Baca</span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-zinc-200 bg-white p-8 text-center text-sm text-zinc-600">
            Artikel tidak ditemukan.
          </div>
        ) : null}
      </div>
    </div>
  );
}
