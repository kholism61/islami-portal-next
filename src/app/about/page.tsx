import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Tentang | Portal Literasi Islam",
  description:
    "Portal Literasi Islam merupakan ruang kajian Islam yang berupaya menghadirkan diskursus keagamaan secara ilmiah, berimbang, dan bertanggung jawab.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-10">
        <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
          Tentang Portal Literasi Islam
        </h1>
        <div className="mt-3 h-1 w-16 rounded-full bg-zinc-900/80" />

        <p className="mt-6 text-sm leading-7 text-zinc-700">
          Portal Literasi Islam merupakan ruang kajian Islam yang berupaya menghadirkan diskursus keagamaan secara ilmiah,
          berimbang, dan bertanggung jawab secara akademik. Portal ini dibangun sebagai sarana berbagi pengetahuan,
          refleksi, dan pemikiran keislaman yang berlandaskan sumber-sumber otoritatif serta tradisi keilmuan Islam yang
          mapan.
        </p>
        <p className="mt-4 text-sm leading-7 text-zinc-700">
          Di tengah arus informasi yang cepat dan seringkali dangkal, Portal Literasi Islam berupaya menghadirkan konten
          yang tidak hanya informatif, tetapi juga argumentatif, metodologis, dan berakar pada literatur klasik maupun
          kontemporer. Setiap tulisan disusun dengan pendekatan ilmiah, memperhatikan konteks, serta menjaga adab
          keilmuan dalam perbedaan pendapat.
        </p>

        <section className="mt-10 space-y-6">
          <div>
            <h2 className="text-lg font-extrabold text-zinc-900">Landasan dan Tujuan</h2>
            <p className="mt-2 text-sm leading-7 text-zinc-700">
              Website ini hadir sebagai respons atas kebutuhan ruang diskusi keislaman yang tidak berhenti pada slogan atau
              narasi populer semata, tetapi berangkat dari metodologi, literatur, serta etika intelektual.
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-700">
              <li>Menyebarkan pemahaman Islam yang berbasis ilmu dan literatur otoritatif.</li>
              <li>Menjadi ruang refleksi dan diskusi yang sehat, rasional, dan beradab.</li>
              <li>Menghubungkan khazanah klasik Islam dengan realitas kontemporer.</li>
              <li>Menyajikan kajian yang moderat, proporsional, dan kontekstual.</li>
            </ul>

            <p className="mt-3 text-sm leading-7 text-zinc-700">
              Sebagai bagian dari tradisi keilmuan Islam yang moderat dan terbuka, portal ini berupaya menempatkan
              diskursus Islam secara proporsional—baik dalam ranah fikih, pemikiran, tasawuf, maupun isu-isu keislaman
              kontemporer.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-extrabold text-zinc-900">Visi</h2>
            <p className="mt-2 text-sm leading-7 text-zinc-700">
              Menjadi portal kajian keislaman yang berlandaskan tradisi ilmiah, moderat, dan berwibawa dalam menyajikan
              pemikiran Islam yang rasional, berimbang, dan bertanggung jawab.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-extrabold text-zinc-900">Misi</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-zinc-700">
              <li>Menyajikan kajian Islam berbasis sumber-sumber otoritatif dan metodologi ilmiah.</li>
              <li>Menghidupkan tradisi literasi dan diskusi keilmuan dalam masyarakat Muslim.</li>
              <li>Menjembatani khazanah ulama klasik dengan kebutuhan umat di era modern.</li>
              <li>Menghadirkan pemikiran Islam yang moderat, inklusif, dan kontekstual.</li>
              <li>Menjadi referensi bacaan yang kredibel bagi pelajar, mahasiswa, dan masyarakat umum.</li>
            </ol>
          </div>

          <div>
            <h2 className="text-lg font-extrabold text-zinc-900">Nilai-Nilai Dasar</h2>
            <p className="mt-2 text-sm leading-7 text-zinc-700">Portal Literasi Islam berpegang pada beberapa prinsip utama:</p>

            <ol className="mt-3 space-y-3 text-sm text-zinc-700">
              <li>
                <span className="font-bold text-zinc-900">Ilmiah</span>
                <p className="mt-1 leading-7 text-zinc-700">
                  Setiap tulisan berlandaskan dalil, literatur, dan argumentasi yang jelas.
                </p>
              </li>
              <li>
                <span className="font-bold text-zinc-900">Moderat</span>
                <p className="mt-1 leading-7 text-zinc-700">
                  Menghindari sikap ekstrem, provokatif, atau simplifikasi yang menyesatkan.
                </p>
              </li>
              <li>
                <span className="font-bold text-zinc-900">Beradab</span>
                <p className="mt-1 leading-7 text-zinc-700">
                  Menjaga etika dalam perbedaan pendapat serta menghormati khazanah ulama.
                </p>
              </li>
              <li>
                <span className="font-bold text-zinc-900">Kontekstual</span>
                <p className="mt-1 leading-7 text-zinc-700">
                  Mengaitkan ajaran Islam dengan realitas sosial dan tantangan zaman.
                </p>
              </li>
              <li>
                <span className="font-bold text-zinc-900">Bertanggung Jawab</span>
                <p className="mt-1 leading-7 text-zinc-700">
                  Konten disusun dengan kesadaran akan dampak sosial dan intelektualnya.
                </p>
              </li>
            </ol>
          </div>

          <div>
            <h2 className="text-lg font-extrabold text-zinc-900">Ruang Lingkup Kajian</h2>
            <p className="mt-2 text-sm leading-7 text-zinc-700">Portal ini berfokus pada beberapa bidang utama:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-700">
              <li>Fikih dan Ushul Fikih</li>
              <li>Ilmu Hadis dan Ulumul Hadis</li>
              <li>Tafsir dan Ulumul Qur’an</li>
              <li>Sejarah dan Peradaban Islam</li>
              <li>Pemikiran Islam Klasik dan Kontemporer</li>
              <li>Isu-isu Keislaman Modern</li>
            </ul>
          </div>
        </section>

        <section className="mt-10 rounded-3xl bg-zinc-50 p-6 sm:p-8">
          <blockquote className="text-sm font-semibold leading-7 text-zinc-700">
            Seluruh tulisan disajikan sebagai bahan refleksi dan kajian ilmiah, bukan sebagai fatwa atau klaim kebenaran
            tunggal.
          </blockquote>
        </section>
      </div>

      <section className="mx-auto mt-8 w-full max-w-5xl overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100">
            <Image src="/assets/images/author.jpg" alt="Muhammad Nurcholis" fill sizes="80px" className="object-cover" />
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-extrabold text-zinc-900">Muhammad Nurcholis</h3>
            <p className="mt-2 text-sm leading-7 text-zinc-700">
              Alumni Madrasah Saulatiyah, Makkah Al-Mukarramah
              <br />
              Mahasiswa Syariah wa Qanun
              <br />
              Universitas Al-Azhar, Kairo
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {["Fiqh", "Pemikiran Islam", "Isu Kontemporer"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-zinc-900/90 px-3 py-1 text-xs font-bold text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
