"use client";

export type AccessGuardRuntime = {
  loaded: true;
};

export async function ensureAccessGuardRuntime(options?: { authSrc?: string; guardSrc?: string }): Promise<AccessGuardRuntime> {
  void options;

  return { loaded: true };
}
