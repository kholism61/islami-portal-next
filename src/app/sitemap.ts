import type { MetadataRoute } from "next";

import { listArticles } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://islami-portal-next.vercel.app";
  const now = new Date();

  const routes: string[] = [
    "/",
    "/about",
    "/kontak",
    "/faq",
    "/zakat",
    "/zakat-info",
    "/mawaris",
    "/muamalah",
    "/falak",
    "/ramadhan",
    "/offline",
    "/smart-ai"
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));

  const articleBySlug = new Map<string, Date>();
  ["id", "en", "ar"].forEach((lang) => {
    listArticles(lang).forEach((article) => {
      const slug = String(article.slug || "").trim();
      if (!slug) return;

      const candidate = article.createdAt ? new Date(article.createdAt) : now;
      const lastModified = Number.isNaN(candidate.getTime()) ? now : candidate;
      const prev = articleBySlug.get(slug);

      if (!prev || lastModified > prev) {
        articleBySlug.set(slug, lastModified);
      }
    });
  });

  const articleEntries: MetadataRoute.Sitemap = Array.from(articleBySlug.entries()).map(
    ([slug, lastModified]) => ({
      url: `${baseUrl}/article/${encodeURIComponent(slug)}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    })
  );

  return [...staticEntries, ...articleEntries];
}
