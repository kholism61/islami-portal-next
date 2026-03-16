import fs from "node:fs";
import path from "node:path";
import type { NextRequest } from "next/server";

const CONTENT_TYPES: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".map": "application/json; charset=utf-8",
};

function safeJoin(root: string, parts: string[]) {
  const full = path.resolve(root, ...parts);
  const resolvedRoot = path.resolve(root);
  if (!full.startsWith(resolvedRoot + path.sep) && full !== resolvedRoot) return null;
  return full;
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const resolved = await params;
  const parts = Array.isArray(resolved.path) ? resolved.path : [resolved.path];
  const filePath = safeJoin(path.join(process.cwd(), "css"), parts);
  if (!filePath) return new Response("Not found", { status: 404 });
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) return new Response("Not found", { status: 404 });

  const ext = path.extname(filePath).toLowerCase();
  const type = CONTENT_TYPES[ext] ?? "application/octet-stream";
  const data = fs.readFileSync(filePath);

  return new Response(data, {
    status: 200,
    headers: {
      "content-type": type,
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
}
