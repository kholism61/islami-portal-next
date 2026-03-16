import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import ArticleActions from "@/components/core/ArticleActions";
import { getArticle } from "@/lib/articles";

type PageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;
  const article = getArticle(slug, "id");

  if (!article) {
    return {
      title: "Artikel tidak ditemukan",
      description: "Artikel yang Anda cari belum tersedia atau tautan tidak valid.",
    };
  }

  return {
    title: article.title,
    description: article.excerpt || "Portal Literasi Islam",
    openGraph: {
      title: article.title,
      description: article.excerpt || "Portal Literasi Islam",
      images: article.thumbnail ? [article.thumbnail] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = params;
  const article = getArticle(slug, "id");

  if (!article) {
    return (
      <div className="min-h-screen bg-zinc-50 px-4 py-16 text-zinc-900">
        <div className="mx-auto w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold">Artikel tidak ditemukan</h1>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Artikel yang Anda cari belum tersedia atau tautan tidak valid.
          </p>
          <div className="mt-6">
            <Link
              href="/articles"
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white"
            >
              Kembali ke daftar artikel
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-4 py-5">
          <div>
            <Link href="/articles" className="text-sm font-semibold text-zinc-700">
              ← Daftar Artikel
            </Link>
            <h1 className="mt-2 text-2xl font-bold tracking-tight">{article.title}</h1>
            <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold text-zinc-600">
              {article.author ? (
                <span className="rounded-full bg-zinc-100 px-3 py-1">{article.author}</span>
              ) : null}
              {article.createdAt ? (
                <span className="rounded-full bg-zinc-100 px-3 py-1">{article.createdAt}</span>
              ) : null}
              {article.category ? (
                <span className="rounded-full bg-zinc-100 px-3 py-1">{article.category}</span>
              ) : null}
            </div>
          </div>

          <nav className="hidden items-center gap-2 sm:flex">
            <Link
              href="/"
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-zinc-100"
            >
              Home
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-4 py-10">
        {article.thumbnail ? (
          <div className="mb-8 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
            <div className="relative h-56 w-full sm:h-72">
              <Image
                src={article.thumbnail}
                alt={article.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        ) : null}

        <ArticleActions article={article} />

        <article className="markdown rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-10">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </article>
      </main>
    </div>
  );
}
