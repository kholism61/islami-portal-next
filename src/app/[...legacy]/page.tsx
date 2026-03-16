import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";

import LegacyHtmlPage from "@/components/core/LegacyHtmlPage";

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

export default function LegacyCatchAllPage({ params }: { params: { legacy: string[] } }) {
  void params;
  notFound();
}
