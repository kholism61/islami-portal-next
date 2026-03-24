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

  const articleEntries: MetadataRoute.Sitemap = listArticles("id").map((article) => {
    const lastModified = article.createdAt ? new Date(article.createdAt) : now;
    return {
      url: `${baseUrl}/article/${encodeURIComponent(article.slug)}`,
      lastModified: Number.isNaN(lastModified.getTime()) ? now : lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    };
  });

  return [...staticEntries, ...articleEntries];
}
