import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function normalizeHtmlPath(pathname: string) {
  if (!pathname) return pathname;
  if (!pathname.toLowerCase().endsWith(".html")) return null;

  const lower = pathname.toLowerCase();
  if (lower === "/index.html") return "/";
  if (lower === "/signin.html") return "/signin";
  if (lower === "/signup.html") return "/signup";
  if (lower === "/portal-admin.html" || lower === "/admin.html") return "/portal-admin";

  return pathname.replace(/\.html$/i, "");
}

export function middleware(request: NextRequest) {
  const nextPath = normalizeHtmlPath(request.nextUrl.pathname);
  if (!nextPath) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = nextPath;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/:path*.html"],
};
