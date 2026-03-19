import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const CONTENT_ROOT = path.join(ROOT, "content", "articles");
const OUT_FILE = path.join(ROOT, "public", "js", "article-store.js");

const LANGS = ["id", "en", "ar"];
const LOCALE_MAP = { id: "id-ID", en: "en-US", ar: "ar-EG" };

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeThumbnail(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  if (raw.startsWith("/")) return raw.slice(1);
  return raw;
}

function markdownToHtml(md) {
  const source = String(md || "").replace(/\r\n/g, "\n");
  const lines = source.split("\n");
  const out = [];

  let paragraph = [];
  let inBlockquote = false;
  let blockquote = [];
  let listType = null; // 'ul' | 'ol'
  let listItems = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    const text = paragraph.join(" ").trim();
    if (text) out.push(`<p>${inline(text)}</p>`);
    paragraph = [];
  };

  const flushBlockquote = () => {
    if (!inBlockquote) return;
    const text = blockquote.join("\n").trim();
    if (text) out.push(`<blockquote>${markdownToHtml(text)}</blockquote>`);
    blockquote = [];
    inBlockquote = false;
  };

  const flushList = () => {
    if (!listType) return;
    const tag = listType;
    const itemsHtml = listItems
      .map((item) => `<li>${inline(item.trim())}</li>`)
      .join("");
    out.push(`<${tag}>${itemsHtml}</${tag}>`);
    listType = null;
    listItems = [];
  };

  const inline = (text) => {
    let t = escapeHtml(text);
    t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    t = t.replace(/\*(.+?)\*/g, "<em>$1</em>");
    t = t.replace(/`(.+?)`/g, "<code>$1</code>");
    t = t.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    return t;
  };

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const trimmed = line.trimEnd();

    const isEmpty = trimmed.trim() === "";

    if (inBlockquote) {
      if (trimmed.startsWith(">")) {
        blockquote.push(trimmed.replace(/^>\s?/, ""));
        continue;
      }
      flushBlockquote();
    }

    if (trimmed.startsWith(">")) {
      flushParagraph();
      flushList();
      inBlockquote = true;
      blockquote.push(trimmed.replace(/^>\s?/, ""));
      continue;
    }

    const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      const level = headingMatch[1].length;
      const content = headingMatch[2] || "";
      out.push(`<h${level}>${inline(content.trim())}</h${level}>`);
      continue;
    }

    const ulMatch = trimmed.match(/^[-*]\s+(.*)$/);
    const olMatch = trimmed.match(/^\d+\.\s+(.*)$/);
    if (ulMatch || olMatch) {
      flushParagraph();
      const nextType = ulMatch ? "ul" : "ol";
      if (listType && listType !== nextType) flushList();
      listType = nextType;
      listItems.push((ulMatch ? ulMatch[1] : olMatch[1]) || "");
      continue;
    }

    if (isEmpty) {
      flushParagraph();
      flushList();
      continue;
    }

    paragraph.push(trimmed.trim());
  }

  flushBlockquote();
  flushParagraph();
  flushList();

  return out.join("\n");
}

function readMarkdownFiles(lang) {
  const dir = path.join(CONTENT_ROOT, lang);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => name.toLowerCase().endsWith(".md"))
    .sort();
}

function buildStoreForLang(lang) {
  const files = readMarkdownFiles(lang);
  const store = {};

  for (const filename of files) {
    const fullPath = path.join(CONTENT_ROOT, lang, filename);
    let source = "";

    try {
      source = fs.readFileSync(fullPath, "utf8");
    } catch {
      continue;
    }

    const parsed = matter(source);
    const data = parsed.data || {};
    const content = parsed.content || "";

    const slug = String(data.slug || filename.replace(/\.md$/i, "")).trim();
    if (!slug) continue;

    const title = String(data.title || slug).trim();
    const excerpt = String(data.excerpt || "").trim();
    const createdAt = data.createdAt ? String(data.createdAt) : "";

    const item = {
      id: slug,
      slug,
      judul: title,
      penulis: data.author ? String(data.author) : "",
      tanggal: data.date ? String(data.date) : "",
      createdAt,
      popular: Boolean(data.popular),
      featured: Boolean(data.featured),
      kategori: data.category ? String(data.category) : "",
      subkategori: data.subcategory ? String(data.subcategory) : "",
      tag: data.tag ? String(data.tag) : "",
      bahasa: lang,
      lang: String(data.lang || lang).toUpperCase(),
      locale: LOCALE_MAP[lang] || "id-ID",
      thumbnail: normalizeThumbnail(data.thumbnail),
      ringkasan: excerpt,
      preview: excerpt,
      isi: markdownToHtml(content),
    };

    store[slug] = item;
  }

  return store;
}

function main() {
  if (!fs.existsSync(CONTENT_ROOT)) {
    console.error(`[md:update] content root not found: ${CONTENT_ROOT}`);
    process.exit(1);
  }

  const all = {};
  for (const lang of LANGS) {
    all[lang] = buildStoreForLang(lang);
  }

  ensureDir(path.dirname(OUT_FILE));

  const payload = `window.__PORTAL_ARTICLE_STORE__ = ${JSON.stringify(all, null, 2)};\n`;
  fs.writeFileSync(OUT_FILE, payload, "utf8");

  const counts = LANGS.map((l) => `${l}:${Object.keys(all[l] || {}).length}`).join(" ");
  console.log(`[md:update] wrote ${path.relative(ROOT, OUT_FILE)} (${counts})`);
}

main();
