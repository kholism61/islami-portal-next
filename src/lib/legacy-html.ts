import fs from "node:fs";
import path from "node:path";

export type LegacyHead = {
  title?: string;
  description?: string;
  stylesheets: string[];
  scripts: string[];
};

export type LegacyPage = {
  head: LegacyHead;
  bodyHtml: string;
};

function normalizePublicHref(value: string): string {
  const raw = value.trim();
  if (!raw) return raw;
  if (/^(https?:)?\/\//i.test(raw)) return raw;
  if (raw.startsWith("/")) return raw;
  return `/${raw.replace(/^\.\//, "")}`;
}

function rewriteHtmlLinks(html: string): string {
  let out = html;

  out = out.replace(/\b(href|src)=("|')([^"']+)(\2)/gi, (_m, attr, quote, value) => {
    const normalized = normalizePublicHref(String(value));
    return `${attr}=${quote}${normalized}${quote}`;
  });

  out = out.replace(/\bhref=("|')([^"']+?)\.html(\1)/gi, (_m, quote, href) => {
    const target = String(href).trim();
    const base = target.replace(/^\.\//, "");
    if (base === "index") return `href=${quote}/${quote}`;
    return `href=${quote}/${base}${quote}`;
  });

  return out;
}

function stripScripts(html: string): string {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
}

export function loadLegacyHtml(relFilePath: string): LegacyPage {
  const projectRoot = process.cwd();
  const legacyRoot = path.join(projectRoot, "legacy-pages");
  const fullPath = path.join(legacyRoot, relFilePath);

  const raw = fs.readFileSync(fullPath, "utf8");

  const headChunk = raw.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? "";
  const bodyChunk = raw.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? "";

  const title = headChunk.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  const description = headChunk.match(/<meta\s+name=("|')description\1\s+content=("|')([^"']+)\2\s*\/?\s*>/i)?.[3]?.trim();

  const stylesheets: string[] = [];
  for (const match of headChunk.matchAll(/<link[^>]+rel=("|')stylesheet\1[^>]*>/gi)) {
    const tag = match[0];
    const href = tag.match(/href=("|')([^"']+)\1/i)?.[2];
    if (!href) continue;
    stylesheets.push(normalizePublicHref(href));
  }

  const scripts: string[] = [];
  for (const match of headChunk.matchAll(/<script[^>]+src=("|')([^"']+)\1[^>]*><\/script>/gi)) {
    scripts.push(normalizePublicHref(match[2]));
  }

  for (const match of bodyChunk.matchAll(/<script[^>]+src=("|')([^"']+)\1[^>]*><\/script>/gi)) {
    scripts.push(normalizePublicHref(match[2]));
  }

  const bodyHtml = rewriteHtmlLinks(stripScripts(bodyChunk));

  return {
    head: {
      title,
      description,
      stylesheets,
      scripts,
    },
    bodyHtml,
  };
}
