"use client";

import { useState } from "react";

import { signup } from "@/lib/auth-client";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
          signup({ name, email, password, confirmPassword });
          window.location.href = "/";
        } catch (err) {
          setError(err instanceof Error ? err.message : "Signup gagal");
        } finally {
          setLoading(false);
        }
      }}
    >
      <label className="grid gap-2">
        <span className="text-xs font-bold text-zinc-700">Nama</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold"
          placeholder="Nama kamu"
        />
      </label>

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
          placeholder="Minimal 6 karakter"
          autoComplete="new-password"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-xs font-bold text-zinc-700">Konfirmasi password</span>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold"
          placeholder="Ulangi password"
          autoComplete="new-password"
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
        {loading ? "Memproses..." : "Sign Up"}
      </button>
    </form>
  );
}
