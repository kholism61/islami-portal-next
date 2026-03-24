import type { MetadataRoute } from "next";

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

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
  }));
}
