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

function resolveContentRoot(): string {
  let current = process.cwd();
  for (let i = 0; i < 6; i += 1) {
    const candidate = path.join(current, "content", "articles");
    if (fs.existsSync(candidate)) return candidate;
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }
  return path.join(process.cwd(), "content", "articles");
}

const CONTENT_ROOT = resolveContentRoot();
const SUPPORTED_LANGS: ArticleLang[] = ["id", "en", "ar"];

const DEBUG_ARTICLES = process.env.DEBUG_ARTICLES === "1";
let debugPrintedRoot = false;

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

function findMarkdownByFrontmatterSlug(dir: string, targetSlug: string): string | null {
  const files = safeReadDir(dir).filter((name) => name.toLowerCase().endsWith(".md"));
  for (const filename of files) {
    const fullPath = path.join(dir, filename);
    let source = "";
    try {
      source = safeReadFile(fullPath);
    } catch {
      continue;
    }
    const { data } = parseMarkdown(source);
    const slug = String(data.slug || "").trim();
    if (slug && slug === targetSlug) return fullPath;
  }
  return null;
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

  const normalizedSlug = slug.replace(/\.md$/i, "");
  const fallbackPath = path.join(dir, `${normalizedSlug}.md`);

  let filePath = fs.existsSync(directPath) ? directPath : fallbackPath;

  if (DEBUG_ARTICLES) {
    if (!debugPrintedRoot) {
      debugPrintedRoot = true;
      try {
        console.log("[articles] CONTENT_ROOT=", CONTENT_ROOT);
      } catch {}
    }
    try {
      console.log("[articles] getArticle", { lang, slug, dir, directExists: fs.existsSync(directPath), fallbackExists: fs.existsSync(fallbackPath) });
    } catch {}
  }

  if (!fs.existsSync(filePath)) {
    const matched = findMarkdownByFrontmatterSlug(dir, normalizedSlug);
    if (DEBUG_ARTICLES) {
      try {
        console.log("[articles] frontmatter-scan", { normalizedSlug, matched });
      } catch {}
    }
    if (!matched) return null;
    filePath = matched;
  }

  const source = safeReadFile(filePath);
  const { data, content } = parseMarkdown(source);

  const resolvedSlug = String(data.slug || normalizedSlug);
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
