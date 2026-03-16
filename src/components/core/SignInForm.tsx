"use client";

import { useState } from "react";

import { login } from "@/lib/auth-client";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        try {
          login({ email, password });
          window.location.href = "/";
        } catch (err) {
          setError(err instanceof Error ? err.message : "Login gagal");
        } finally {
          setLoading(false);
        }
      }}
    >
      <label className="grid gap-2">
        <span className="text-xs font-bold text-zinc-700">Email</span>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold"
          placeholder="email@domain.com"
          autoComplete="email"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-xs font-bold text-zinc-700">Password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold"
          placeholder="******"
          autoComplete="current-password"
        />
      </label>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-700">
          {error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-extrabold text-white hover:bg-zinc-800 disabled:opacity-60"
      >
        {loading ? "Memproses..." : "Sign In"}
      </button>

      <p className="text-xs text-zinc-500">
        Akun default admin: <span className="font-semibold">nurcholism51@gmail.com</span> / <span className="font-semibold">Admin123!</span>
      </p>
    </form>
  );
}
