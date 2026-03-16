import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto w-full max-w-5xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-zinc-900">Portal Literasi Islam</h3>
            <p className="text-xs leading-6 text-zinc-600">
              Portal kajian Islam yang menghadirkan analisis ilmiah, pemikiran kritis, dan dialog keislaman dalam konteks
              modern.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-zinc-900">Navigasi</h3>
            <div className="flex flex-col gap-2 text-xs font-semibold text-zinc-700">
              <Link href="/about" className="hover:text-zinc-900">
                Tentang
              </Link>
              <Link href="/faq" className="hover:text-zinc-900">
                FAQ
              </Link>
              <Link href="/donasi" className="hover:text-zinc-900">
                Donasi
              </Link>
              <Link href="/articles" className="hover:text-zinc-900">
                Artikel
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-zinc-900">Catatan</h3>
            <p className="text-xs leading-6 text-zinc-600">
              Seluruh konten disajikan untuk tujuan edukasi dan kajian ilmiah, bukan sebagai fatwa atau klaim kebenaran
              tunggal.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-zinc-900">Kontak</h3>
            <div className="space-y-2 text-xs text-zinc-600">
              <a className="block font-semibold text-zinc-700 hover:text-zinc-900" href="mailto:nurcholism51@gmail.com">
                nurcholism51@gmail.com
              </a>
              <a
                className="block font-semibold text-zinc-700 hover:text-zinc-900"
                href="https://wa.me/6282124305278"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
              <a
                className="block font-semibold text-zinc-700 hover:text-zinc-900"
                href="https://instagram.com/nurcholism51"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} Portal Literasi Islam – Seluruh hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
}
