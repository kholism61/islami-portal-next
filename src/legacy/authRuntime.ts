"use client";

import { loadPublicScript } from "@/legacy/loadPublicScript";

export type PortalAuthUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member";
  picture?: string;
  createdAt?: string;
  lastLoginAt?: string;
};

export type PortalAuth = {
  getCurrentUser: () => PortalAuthUser | null;
  logout: () => void;
  clearSession: () => void;
  requireAuth: (options?: { adminOnly?: boolean; redirectTo?: string }) => PortalAuthUser | null;
};

export async function ensureAuthRuntime(options?: { src?: string }): Promise<PortalAuth> {
  const src = options?.src || "/js/auth.js";
  await loadPublicScript(src);

  if (!window.PortalAuth) {
    throw new Error(`PortalAuth is not available after loading ${src}`);
  }

  return window.PortalAuth;
}

export function getPortalAuthSafe(): PortalAuth | null {
  return window.PortalAuth ?? null;
}
