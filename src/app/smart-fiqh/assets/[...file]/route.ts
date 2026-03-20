import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const BASE_DIR = path.join(process.cwd(), "src", "app", "smart-fiqh");

function contentType(filePath: string) {
  if (filePath.endsWith(".js")) return "application/javascript; charset=utf-8";
  if (filePath.endsWith(".css")) return "text/css; charset=utf-8";
  if (filePath.endsWith(".json")) return "application/json; charset=utf-8";
  return "application/octet-stream";
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ file: string[] }> }
) {
  const { file } = await params;

  const joined = file.join("/");
  const resolved = path.join(BASE_DIR, joined);

  if (!resolved.startsWith(BASE_DIR + path.sep)) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const body = await readFile(resolved);
    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": contentType(resolved),
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
