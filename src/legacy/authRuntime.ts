"use client";

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
  getUsers: () => PortalAuthUser[];
  getAuditLog: () => Array<{ type: string; message: string; email: string; timestamp: string }>;
  formatDate: (value: string) => string;
  logout: () => void;
  clearSession: () => void;
  requireAuth: (options?: { adminOnly?: boolean; redirectTo?: string }) => PortalAuthUser | null;
};

export async function ensureAuthRuntime(options?: { src?: string }): Promise<PortalAuth> {
  void options;
  throw new Error("Auth disabled");
}

export function getPortalAuthSafe(): PortalAuth | null {
  return null;
}
