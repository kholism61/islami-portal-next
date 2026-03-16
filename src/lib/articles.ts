import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ArticleLang = "id" | "en" | "ar";

export type ArticleFrontmatter = {
  title?: string;
  author?: string;
  date?: string;
  createdAt?: string;
  popular?: boolean;
  category?: string;
  subcategory?: string;
  tag?: string;
  language?: string;
  lang?: string;
  thumbnail?: string;
  slug?: string;
  excerpt?: string;
};

export type ArticleSummary = {
  slug: string;
  lang: ArticleLang;
  title: string;
  excerpt: string;
  thumbnail?: string;
  createdAt?: string;
  author?: string;
  category?: string;
};

export type ArticleDetail = ArticleSummary & {
  content: string;
};

const CONTENT_ROOT = path.join(process.cwd(), "content", "articles");
const SUPPORTED_LANGS: ArticleLang[] = ["id", "en", "ar"];

function normalizeLang(value: unknown): ArticleLang {
  const raw = String(value || "").toLowerCase();
  if (raw === "en" || raw === "ar" || raw === "id") return raw;
  return "id";
}

function normalizeThumbnail(value: unknown): string | undefined {
  const raw = String(value || "").trim();
  if (!raw) return undefined;
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  if (raw.startsWith("/")) return raw;
  return `/${raw}`;
}

function safeReadDir(dir: string): string[] {
  try {
    return fs.readdirSync(dir);
  } catch {
    return [];
  }
}

function safeReadFile(filePath: string): string {
  return fs.readFileSync(filePath, "utf8");
}

function parseMarkdown(source: string) {
  const parsed = matter(source);
  const data = (parsed.data || {}) as ArticleFrontmatter;
  return { data, content: parsed.content || "" };
}

function getLangDir(lang: ArticleLang) {
  return path.join(CONTENT_ROOT, lang);
}

export function listArticles(langInput: unknown = "id"): ArticleSummary[] {
  const lang = normalizeLang(langInput);
  const dir = getLangDir(lang);
  const files = safeReadDir(dir)
    .filter((name) => name.toLowerCase().endsWith(".md"))
    .sort();

  const items = files
    .map((filename) => {
      const fullPath = path.join(dir, filename);
      const source = safeReadFile(fullPath);
      const { data } = parseMarkdown(source);

      const slug = String(data.slug || filename.replace(/\.md$/i, ""));
      const title = String(data.title || slug);
      const excerpt = String(data.excerpt || "").trim();
      const thumbnail = normalizeThumbnail(data.thumbnail);

      return {
        slug,
        lang,
        title,
        excerpt,
        thumbnail,
        createdAt: data.createdAt ? String(data.createdAt) : undefined,
        author: data.author ? String(data.author) : undefined,
        category: data.category ? String(data.category) : undefined,
      } satisfies ArticleSummary;
    })
    .filter((item) => item.slug);

  return items.reverse();
}

export function getArticle(slugInput: unknown, langInput: unknown = "id"): ArticleDetail | null {
  const lang = normalizeLang(langInput);
  const slug = String(slugInput || "").trim();
  if (!slug) return null;

  const dir = getLangDir(lang);
  const directPath = path.join(dir, `${slug}.md`);

  const filePath = fs.existsSync(directPath)
    ? directPath
    : path.join(dir, `${slug.replace(/\.md$/i, "")}.md`);

  if (!fs.existsSync(filePath)) return null;

  const source = safeReadFile(filePath);
  const { data, content } = parseMarkdown(source);

  const resolvedSlug = String(data.slug || slug.replace(/\.md$/i, ""));
  const title = String(data.title || resolvedSlug);
  const excerpt = String(data.excerpt || "").trim();
  const thumbnail = normalizeThumbnail(data.thumbnail);

  return {
    slug: resolvedSlug,
    lang,
    title,
    excerpt,
    thumbnail,
    createdAt: data.createdAt ? String(data.createdAt) : undefined,
    author: data.author ? String(data.author) : undefined,
    category: data.category ? String(data.category) : undefined,
    content,
  };
}

export function getAvailableLangs(slugInput: unknown): ArticleLang[] {
  const slug = String(slugInput || "").trim();
  if (!slug) return [];

  return SUPPORTED_LANGS.filter((lang) => {
    const dir = getLangDir(lang);
    return fs.existsSync(path.join(dir, `${slug}.md`));
  });
}
