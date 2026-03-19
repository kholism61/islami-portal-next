import fs from "node:fs";
import path from "node:path";
import { notFound, redirect } from "next/navigation";

import LegacyHtmlPage from "../../components/core/LegacyHtmlPage";

function findLegacyHtmlFile(segments: string[]): string | null {
  const candidate = `${segments.join("/")}.html`;
  const fullPath = path.join(process.cwd(), "legacy-pages", candidate);
  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
    return candidate;
  }

  const indexCandidate = path.join(segments.join("/"), "index.html");
  const indexFull = path.join(process.cwd(), "legacy-pages", indexCandidate);
  if (fs.existsSync(indexFull) && fs.statSync(indexFull).isFile()) {
    return indexCandidate;
  }

  return null;
}

export default async function LegacyCatchAllPage({
  params,
}: {
  params: { legacy?: string[] };
}) {
  const segments = Array.isArray(params.legacy) ? params.legacy : [];

  if (segments.length === 1) {
    const slug = String(segments[0] || "").toLowerCase();
    if (slug === "index") redirect("/");
    if (slug === "signin") redirect("/signin");
    if (slug === "signup") redirect("/signup");
    if (slug === "portal-admin" || slug === "admin") redirect("/portal-admin");
  }

  const relFilePath = findLegacyHtmlFile(segments);
  if (!relFilePath) {
    notFound();
  }

  return <LegacyHtmlPage relFilePath={relFilePath} />;
}
