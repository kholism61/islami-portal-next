"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useEffect } from "react";

import type { ArticleSummary } from "@/lib/articles";

export default function HomeClient({ articles }: { articles: ArticleSummary[] }) {
  const [query, setQuery] = useState("");
  const [offlineCount, setOfflineCount] = useState(0);

  useEffect(() => {
    const readOffline = () => {
      try {
        const offlineRaw = JSON.parse(localStorage.getItem("offlineArticles") || "{}");
        const count = offlineRaw && typeof offlineRaw === "object" ? Object.keys(offlineRaw).length : 0;
        setOfflineCount(count);
      } catch {
        setOfflineCount(0);
      }
    };

    readOffline();
    window.addEventListener("storage", readOffline);
    window.addEventListener("focus", readOffline);
    return () => {
      window.removeEventListener("storage", readOffline);
      window.removeEventListener("focus", readOffline);
    };
  }, []);

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
    <div className="min-h-screen text-zinc-900">
      <section className="mx-auto w-full max-w-5xl px-4 pt-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <Link
            href="/about"
            className="flex items-center gap-3 rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm hover:bg-zinc-50"
          >
            <span className="text-xl" aria-hidden>
              ℹ️
            </span>
            <div>
              <p className="text-sm font-extrabold">Tentang</p>
              <p className="text-xs text-zinc-600">Profil & visi portal</p>
            </div>
          </Link>

          <Link
            href="/faq"
            className="flex items-center gap-3 rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm hover:bg-zinc-50"
          >
            <span className="text-xl" aria-hidden>
              ❓
            </span>
            <div>
              <p className="text-sm font-extrabold">FAQ</p>
              <p className="text-xs text-zinc-600">Pertanyaan umum</p>
            </div>
          </Link>

          <Link
            href="/donasi"
            className="flex items-center gap-3 rounded-3xl border border-amber-200 bg-amber-50 p-4 shadow-sm hover:bg-amber-100"
          >
            <span className="text-xl" aria-hidden>
              🤝
            </span>
            <div>
              <p className="text-sm font-extrabold text-amber-950">Donasi</p>
              <p className="text-xs text-amber-900/80">Dukung dakwah ilmiah</p>
            </div>
          </Link>

          <Link
            href="/offline"
            className="flex items-center gap-3 rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm hover:bg-zinc-50"
          >
            <span className="text-xl" aria-hidden>
              📥
            </span>
            <div>
              <p className="text-sm font-extrabold">Offline</p>
              <p className="text-xs text-zinc-600">Tersimpan: {offlineCount}</p>
            </div>
          </Link>

          <Link
            href="/zakat"
            className="flex items-center gap-3 rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm hover:bg-zinc-50"
          >
            <span className="text-xl" aria-hidden>
              🧮
            </span>
            <div>
              <p className="text-sm font-extrabold">Zakat</p>
              <p className="text-xs text-zinc-600">Kalkulator zakat</p>
            </div>
          </Link>
        </div>
      </section>

      <section className="relative mt-8 overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(/assets/images/kaligrafi.png)", backgroundSize: "900px", backgroundPosition: "center", backgroundRepeat: "no-repeat" }} />
        <div className="relative mx-auto grid w-full max-w-5xl items-center gap-8 px-4 py-14 sm:grid-cols-2 sm:py-20">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Portal Literasi Islam
            </h1>
            <p className="mt-4 text-sm leading-7 text-white/80">
              Ruang kajian Islam yang membahas fiqh, hadis, dan pemikiran keislaman dalam konteks modern secara ilmiah dan
              mendalam.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#articles"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-extrabold text-blue-950 hover:bg-white/90"
              >
                📚 Mulai Membaca
              </a>
              <Link
                href="/articles"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-extrabold text-white hover:bg-white/15"
              >
                ⭐ Semua Artikel
              </Link>
            </div>
          </div>

          <div className="hidden sm:block">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
              <p className="text-xs font-bold text-white/70">Pencarian cepat</p>
              <label className="mt-3 grid gap-2">
                <span className="text-xs font-bold text-white/70">Cari artikel</span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari judul / ringkasan / kategori"
                  className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white placeholder:text-white/50"
                />
              </label>
              <p className="mt-3 text-xs text-white/60">Hasil: {filtered.length} artikel</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-10">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold text-zinc-600">Artikel Offline</p>
            <p className="mt-2 text-2xl font-extrabold text-zinc-900">{offlineCount}</p>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold text-zinc-600">Total Artikel (markdown)</p>
            <p className="mt-2 text-2xl font-extrabold text-zinc-900">{articles.length}</p>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold text-zinc-600">Bookmark</p>
            <Link href="/bookmark" className="mt-2 inline-flex text-sm font-extrabold text-blue-700 hover:underline">
              Lihat bookmark →
            </Link>
          </div>
        </div>

        <div id="articles" className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-zinc-900">Artikel Terbaru</h2>
            <p className="mt-1 text-sm text-zinc-600">Diambil dari markdown, ditampilkan dengan Next.js.</p>
          </div>

          <div className="w-full max-w-md">
            <label className="grid gap-2">
              <span className="text-xs font-bold text-zinc-700">Cari artikel</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari judul / ringkasan / kategori"
                className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold"
              />
            </label>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => (
            <Link
              key={`${article.lang}:${article.slug}`}
              href={`/article/${encodeURIComponent(article.slug)}`}
              className="group rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-bold leading-snug group-hover:underline">{article.title}</h3>
                {article.createdAt ? (
                  <span className="shrink-0 rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">
                    {article.createdAt}
                  </span>
                ) : null}
              </div>

              {article.excerpt ? (
                <p className="mt-2 line-clamp-4 text-sm leading-6 text-zinc-600">{article.excerpt}</p>
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
      </section>
    </div>
  );
}
