import type { Metadata } from "next";
import Link from "next/link";

import SignInForm from "@/components/core/SignInForm";

export const metadata: Metadata = {
  title: "Sign In | Portal Literasi Islam",
  description: "Masuk ke akun Portal Literasi Islam.",
};

export default function SignInPage() {
  return (
    <main className="mx-auto w-full max-w-md px-4 py-12">
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-10">
        <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900">Sign In</h1>
        <p className="mt-2 text-sm leading-7 text-zinc-600">Masuk menggunakan akun yang tersimpan di localStorage.</p>

        <div className="mt-6">
          <SignInForm />
        </div>

        <p className="mt-6 text-center text-xs text-zinc-600">
          Belum punya akun?{" "}
          <Link href="/signup" className="font-bold text-zinc-900 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}
