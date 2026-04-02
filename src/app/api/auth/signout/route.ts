import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import {
  clearSessionCookie,
  getSessionTokenFromCookieHeader,
  hashSessionToken,
} from "@/lib/auth/session";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const token = getSessionTokenFromCookieHeader(req.headers.get("cookie"));

  if (token) {
    const tokenHash = hashSessionToken(token);
    await prisma.session.delete({ where: { tokenHash } }).catch(() => {});
  }

  await clearSessionCookie();

  return NextResponse.json({ ok: true });
}
