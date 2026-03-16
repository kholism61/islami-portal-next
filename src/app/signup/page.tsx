import type { Metadata } from "next";
import Link from "next/link";

import SignUpForm from "@/components/core/SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up | Portal Literasi Islam",
  description: "Buat akun Portal Literasi Islam.",
};

export default function SignUpPage() {
  return (
    <main className="mx-auto w-full max-w-md px-4 py-12">
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-10">
        <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900">Sign Up</h1>
        <p className="mt-2 text-sm leading-7 text-zinc-600">Akun disimpan di localStorage (tanpa backend).</p>

        <div className="mt-6">
          <SignUpForm />
        </div>

        <p className="mt-6 text-center text-xs text-zinc-600">
          Sudah punya akun?{" "}
          <Link href="/signin" className="font-bold text-zinc-900 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}
