import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getArticle } from "@/lib/articles";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
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
  const { slug } = await params;

  redirect(`/article?id=${encodeURIComponent(slug)}`);
}
