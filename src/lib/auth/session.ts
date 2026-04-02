import crypto from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE_NAME = "pli_session";

export function hashSessionToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString("base64url");
}

export function getSessionTokenFromCookieHeader(cookieHeader: string | null): string | null {
  const raw = cookieHeader || "";
  const match = raw.match(new RegExp(`(?:^|; )${SESSION_COOKIE_NAME}=([^;]+)`));
  const token = match?.[1] ? decodeURIComponent(match[1]) : null;
  return token || null;
}

export async function setSessionCookie(token: string, options?: { maxAgeSeconds?: number }) {
  const maxAgeSeconds = options?.maxAgeSeconds ?? 60 * 60 * 24 * 14;
  const jar = await cookies();
  jar.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: maxAgeSeconds,
  });
}

export async function clearSessionCookie() {
  const jar = await cookies();
  jar.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}
