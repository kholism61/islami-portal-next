import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getSessionTokenFromCookieHeader, hashSessionToken } from "@/lib/auth/session";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const token = getSessionTokenFromCookieHeader(req.headers.get("cookie"));

  if (!token) {
    return NextResponse.json({ ok: true, user: null }, { status: 200 });
  }

  const tokenHash = hashSessionToken(token);

  const session = await prisma.session.findUnique({
    where: { tokenHash },
    include: { user: true },
  });

  if (!session) {
    return NextResponse.json({ ok: true, user: null }, { status: 200 });
  }

  if (session.expiresAt.getTime() <= Date.now()) {
    await prisma.session.delete({ where: { tokenHash } }).catch(() => {});
    return NextResponse.json({ ok: true, user: null }, { status: 200 });
  }

  const { user } = session;

  return NextResponse.json({
    ok: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      picture: user.picture,
      createdAt: user.createdAt,
    },
  });
}
