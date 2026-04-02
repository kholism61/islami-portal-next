import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { generateSessionToken, hashSessionToken, setSessionCookie } from "@/lib/auth/session";
import { getClientIp, rateLimitOrThrow } from "@/lib/auth/rateLimit";

const ADMIN_EMAILS = ["nurcholism51@gmail.com"];

const SignupSchema = z
  .object({
    name: z.string().trim().min(3),
    email: z.string().trim().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password confirmation does not match.",
    path: ["confirmPassword"],
  });

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function POST(req: Request) {
  const ip = getClientIp(req);

  const json = await req.json().catch(() => null);
  const parsed = SignupSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid input", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const { name, password } = parsed.data;
  const email = normalizeEmail(parsed.data.email);
  const role = ADMIN_EMAILS.includes(email) ? "admin" : "member";

  rateLimitOrThrow(`signup:ip:${ip}`, { limit: 8, windowMs: 60_000 });
  rateLimitOrThrow(`signup:email:${email}`, { limit: 5, windowMs: 60_000 });

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { ok: false, error: "Email already registered" },
      { status: 409 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role,
      picture: "",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      picture: true,
      createdAt: true,
    },
  });

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

  return NextResponse.json({ ok: true, user });
}
