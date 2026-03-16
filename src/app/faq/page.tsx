import type { Metadata } from "next";

import FaqAccordion from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "FAQ | Portal Literasi Islam",
  description: "Pertanyaan umum seputar tujuan, metodologi, dan pengelolaan Portal Literasi Islam.",
};

const items = [
  {
    q: "Apa tujuan Portal Literasi Islam?",
    a: "Portal ini bertujuan menghadirkan kajian Islam berbasis keilmuan, metodologi yang jelas, serta adab akademik yang bertanggung jawab.",
  },
  {
    q: "Apakah tulisan di sini merupakan fatwa?",
    a: "Tidak. Seluruh tulisan disajikan sebagai bahan kajian dan refleksi ilmiah, bukan sebagai fatwa atau klaim kebenaran tunggal.",
  },
  {
    q: "Siapa yang mengelola website ini?",
    a: "Website ini dikelola secara mandiri oleh Muhammad Nurcholis, mahasiswa Syariah wa Qanun Universitas Al-Azhar, Kairo.",
  },
  {
    q: "Apakah pembaca boleh memberi masukan?",
    a: "Sangat boleh. Masukan dan diskusi terbuka melalui halaman Kontak atau media sosial yang tersedia.",
  },
];

export default function FaqPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-10">
        <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">FAQ</h1>
        <div className="mt-3 h-1 w-16 rounded-full bg-zinc-900/80" />

        <p className="mt-6 text-sm leading-7 text-zinc-700">
          Pertanyaan umum seputar tujuan, metodologi, dan pengelolaan Portal Literasi Islam.
        </p>

        <section className="mt-8">
          <FaqAccordion items={items} />
        </section>

        <section className="mt-10 rounded-3xl bg-zinc-50 p-6 sm:p-8">
          <p className="text-sm font-bold text-zinc-900">Pemberitahuan Pembaruan Situs:</p>
          <p className="mt-3 text-sm leading-7 text-zinc-700">
            Jika tampilan atau isi website tidak berubah setelah pembaruan, silakan lakukan langkah berikut:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-700">
            <li>
              <span className="font-bold text-zinc-900">Di HP:</span> Hapus cache dan cookie browser, lalu buka kembali
              situs.
            </li>
            <li>
              <span className="font-bold text-zinc-900">Di laptop/komputer (Windows):</span> Tekan{" "}
              <span className="font-bold text-zinc-900">Ctrl + Shift + R</span> untuk hard refresh.
            </li>
          </ul>
          <p className="mt-4 text-sm leading-7 text-zinc-700">
            Website ini menggunakan teknologi <span className="font-bold text-zinc-900">PWA</span> sehingga browser
            terkadang menampilkan versi yang tersimpan.
          </p>
        </section>
      </div>
    </main>
  );
}
