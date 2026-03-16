import type { Metadata } from "next";

import DonationActions from "@/components/DonationActions";

export const metadata: Metadata = {
  title: "Donasi | Portal Literasi Islam",
  description:
    "Dukungan Anda membantu Portal Literasi Islam menghadirkan kajian ilmiah, literasi Islam, dan pengembangan edukasi digital.",
};

export default function DonasiPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
        <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 px-6 py-12 text-white sm:px-12">
          <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-extrabold">
            🤝 Dukungan Dakwah Digital
          </span>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Bersama Membangun <br />
            <span className="text-yellow-200">Literasi Keislaman Berkualitas</span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80">
            Dukungan Anda membantu Portal Literasi Islam menghadirkan kajian ilmiah, literasi Islam, dan pengembangan
            edukasi digital yang dapat diakses secara gratis oleh masyarakat.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {["📘 Pengembangan Kajian Ilmiah", "🛠️ Infrastruktur Website", "💻 Edukasi Digital Islam"].map((item) => (
              <div key={item} className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-10 sm:px-12">
          <DonationActions />
        </div>
      </section>
    </main>
  );
}
