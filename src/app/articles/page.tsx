import Link from "next/link";

import { listArticles } from "@/lib/articles";

export default function ArticlesPage() {
  const articles = listArticles("id");

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-5">
          <div>
            <Link href="/" className="text-sm font-semibold text-zinc-700">
              Portal Literasi Islam
            </Link>
            <h1 className="mt-1 text-2xl font-bold tracking-tight">Daftar Artikel</h1>
          </div>

          <nav className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-zinc-100"
            >
              Home
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 py-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
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
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Buka artikel untuk membaca selengkapnya.
                </p>
              )}

              <div className="mt-4 flex items-center justify-between text-xs font-semibold text-zinc-500">
                <span>{article.category || ""}</span>
                <span className="text-zinc-700">Baca</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
