export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <header className="border-b bg-white">
        <div className="mx-auto w-full max-w-5xl px-4 py-8">
          <h1 className="text-3xl font-bold tracking-tight">Portal Literasi Islam</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
            Versi Next.js (TypeScript). Konten artikel diambil dari markdown.
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 py-10">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-10">
          <h2 className="text-xl font-bold">Mulai membaca</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            Buka halaman daftar artikel untuk melihat konten dari folder markdown.
          </p>

          <div className="mt-6">
            <a
              href="/articles"
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Lihat daftar artikel
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
