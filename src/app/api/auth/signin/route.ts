import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { generateSessionToken, hashSessionToken, setSessionCookie } from "@/lib/auth/session";
import { getClientIp, rateLimitOrThrow } from "@/lib/auth/rateLimit";

const SigninSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);

    const json = await req.json().catch(() => null);
    const parsed = SigninSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid input", issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const email = normalizeEmail(parsed.data.email);
    const password = parsed.data.password;

    rateLimitOrThrow(`signin:ip:${ip}`, { limit: 15, windowMs: 60_000 });
    rateLimitOrThrow(`signin:email:${email}`, { limit: 10, windowMs: 60_000 });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { ok: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return NextResponse.json(
        { ok: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = generateSessionToken();
    const tokenHash = hashSessionToken(token);
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 14);

    await prisma.session.create({
      data: {
        tokenHash,
        userId: user.id,
        expiresAt,
      },
    });

    await setSessionCookie(token);

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
  } catch (err) {
    const status = typeof (err as any)?.status === "number" ? (err as any).status : 500;
    const retryAfterSeconds = (err as any)?.retryAfterSeconds;
    return NextResponse.json(
      { ok: false, error: (err as Error)?.message || "Internal Server Error" },
      {
        status,
        headers:
          status === 429 && retryAfterSeconds
            ? { "retry-after": String(retryAfterSeconds) }
            : undefined,
      }
    );
  }
}
