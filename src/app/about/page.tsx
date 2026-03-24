import Script from "next/script";
import Image from "next/image";
import StaticPagesRuntimeLoader from "@/components/runtime/StaticPagesRuntimeLoader";

export const metadata = {
  title: "Tentang | Portal Literasi Islam",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function AboutPage() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-5YD3GDLQVG"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-5YD3GDLQVG');
        `}
      </Script>

      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&family=Amiri&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />
      <link rel="stylesheet" href="/css/pages.css" />

      <header className="navbar">
        <div className="nav-inner">
          <div className="nav-left">
            <a href="/" className="nav-brand">
              📚 <span>Portal Literasi Islam</span>
            </a>
          </div>

          <nav className="nav-links">
            <a href="/">Beranda</a>
            <a href="/about">Tentang</a>
            <a href="/faq">FAQ</a>
            <a href="/donasi">Donasi</a>
            <a href="/kontak">Kontak</a>
          </nav>
        </div>
      </header>

      <main className="page">
        <h1 className="page-title">Tentang Portal Literasi Islam</h1>
        <div className="page-divider"></div>

        <p className="page-lead">
          Portal Literasi Islam merupakan ruang kajian Islam yang berupaya menghadirkan diskursus keagamaan secara ilmiah,
          berimbang, dan bertanggung jawab secara akademik. Portal ini dibangun sebagai sarana berbagi pengetahuan,
          refleksi, dan pemikiran keislaman yang berlandaskan sumber-sumber otoritatif serta tradisi keilmuan Islam yang
          mapan. Di tengah arus informasi yang cepat dan seringkali dangkal, Portal Literasi Islam berupaya menghadirkan
          konten yang tidak hanya informatif, tetapi juga argumentatif, metodologis, dan berakar pada literatur klasik
          maupun kontemporer. Setiap tulisan disusun dengan pendekatan ilmiah, memperhatikan konteks, serta menjaga adab
          keilmuan dalam perbedaan pendapat.
        </p>

        <section className="about-section">
          <h3>Landasan dan Tujuan</h3>
          <p>
            Website ini hadir sebagai respons atas kebutuhan ruang diskusi keislaman yang tidak berhenti pada slogan atau
            narasi populer semata, tetapi berangkat dari metodologi, literatur, serta etika intelektual. Portal Literasi
            Islam bertujuan untuk:
          </p>

          <ul>
            <li>Menyebarkan pemahaman Islam yang berbasis ilmu dan literatur otoritatif.</li>
            <li>Menjadi ruang refleksi dan diskusi yang sehat, rasional, dan beradab.</li>
            <li>Menghubungkan khazanah klasik Islam dengan realitas kontemporer.</li>
            <li>Menyajikan kajian yang moderat, proporsional, dan kontekstual.</li>
          </ul>

          <p>
            Sebagai bagian dari tradisi keilmuan Islam yang moderat dan terbuka, portal ini berupaya menempatkan diskursus
            Islam secara proporsional - baik dalam ranah fikih, pemikiran, tasawuf, maupun isu-isu keislaman kontemporer.
          </p>

          <h3>Visi</h3>
          <p>
            Menjadi portal kajian keislaman yang berlandaskan tradisi ilmiah, moderat, dan berwibawa dalam menyajikan
            pemikiran Islam yang rasional, berimbang, dan bertanggung jawab.
          </p>

          <h3>Misi</h3>
          <ol>
            <li>Menyajikan kajian Islam berbasis sumber-sumber otoritatif dan metodologi ilmiah.</li>
            <li>Menghidupkan tradisi literasi dan diskusi keilmuan dalam masyarakat Muslim.</li>
            <li>Menjembatani khazanah ulama klasik dengan kebutuhan umat di era modern.</li>
            <li>Menghadirkan pemikiran Islam yang moderat, inklusif, dan kontekstual.</li>
            <li>Menjadi referensi bacaan yang kredibel bagi pelajar, mahasiswa, dan masyarakat umum.</li>
          </ol>

          <h3>Nilai-Nilai Dasar</h3>
          <p>Portal Literasi Islam berpegang pada beberapa prinsip utama:</p>
          <ol>
            <li>
              Ilmiah
              <br />
              <span className="sub-text">Setiap tulisan berlandaskan dalil, literatur, dan argumentasi yang jelas.</span>
            </li>
            <li>
              Moderat
              <br />
              <span className="sub-text">Menghindari sikap ekstrem, provokatif, atau simplifikasi yang menyesatkan.</span>
            </li>
            <li>
              Beradab
              <br />
              <span className="sub-text">Menjaga etika dalam perbedaan pendapat serta menghormati khazanah ulama.</span>
            </li>
            <li>
              Kontekstual
              <br />
              <span className="sub-text">Mengaitkan ajaran Islam dengan realitas sosial dan tantangan zaman.</span>
            </li>
            <li>
              Bertanggung Jawab
              <br />
              <span className="sub-text">Konten disusun dengan kesadaran akan dampak sosial dan intelektualnya.</span>
            </li>
          </ol>

          <h3>Ruang Lingkup Kajian</h3>
          <p>Portal ini berfokus pada beberapa bidang utama:</p>
          <ul>
            <li>Fikih dan Ushul Fikih</li>
            <li>Ilmu Hadis dan Ulumul Hadis</li>
            <li>Tafsir dan Ulumul Qur’an</li>
            <li>Sejarah dan Peradaban Islam</li>
            <li>Pemikiran Islam Klasik dan Kontemporer</li>
            <li>Isu-isu Keislaman Modern</li>
          </ul>
        </section>

        <section className="about-note">
          <blockquote>
            Seluruh tulisan disajikan sebagai bahan refleksi dan kajian ilmiah, bukan sebagai fatwa atau klaim kebenaran
            tunggal.
          </blockquote>
        </section>
      </main>

      <section className="author-section">
        <div className="author-card">
          <div className="author-photo">
            <Image
              src="/assets/images/author.jpg"
              alt="Muhammad Nurcholis"
              width={260}
              height={260}
            />
          </div>

          <div className="author-info">
            <h3>Muhammad Nurcholis</h3>
            <span className="author-role">
              Alumni Madrasah Saulatiyah, Makkah Al-Mukarramah
              <br />
              Mahasiswa Syariah wa Qanun
              <br />
              Universitas Al-Azhar, Kairo
            </span>

            <div className="author-tags">
              <span>Fiqh</span>
              <span>Pemikiran Islam</span>
              <span>Isu Kontemporer</span>
            </div>
          </div>
        </div>
      </section>

      <section className="prefooter">
        <div className="prefooter-overlay"></div>

        <div className="prefooter-inner">
          <div className="prefooter-col">
            <h4>Portal Literasi Islam</h4>
            <p>
              Portal kajian Islam yang menghadirkan analisis ilmiah, pemikiran kritis, dan dialog keislaman dalam konteks
              modern.
            </p>
          </div>

          <div className="prefooter-col">
            <h4>Kajian Utama</h4>
            <ul>
              <li>
                <a href="/?filter=fiqh">Fiqh &amp; Ushul Fiqh</a>
              </li>
              <li>
                <a href="/?filter=hadis">Hadis &amp; Studi Sanad</a>
              </li>
              <li>
                <a href="/?filter=pemikiran">Pemikiran Islam</a>
              </li>
              <li>
                <a href="/?filter=politik">Islam &amp; Negara</a>
              </li>
              <li>
                <a href="/?filter=kontemporer">Isu Kontemporer</a>
              </li>
            </ul>
          </div>

          <div className="prefooter-col">
            <h4>Fitur</h4>
            <ul>
              <li>Artikel Pilihan</li>
              <li>Bookmark Artikel</li>
              <li>Pencarian Cerdas</li>
              <li>Mode Baca</li>
              <li>Multi Bahasa</li>
            </ul>
          </div>

          <div className="prefooter-col">
            <h4>Catatan</h4>
            <p className="prefooter-note">
              Seluruh konten disajikan untuk tujuan edukasi dan kajian ilmiah, bukan sebagai fatwa atau klaim kebenaran
              tunggal.
            </p>
          </div>
        </div>

        <div className="prefooter-social">
          <a href="https://wa.me/6282124305278" aria-label="WhatsApp" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-whatsapp"></i>
          </a>
          <a href="https://instagram.com/nurcholism51" aria-label="Instagram" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a
            href="https://www.threads.net/@nurcholism51"
            aria-label="Threads"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-threads"></i>
          </a>
          <a href="mailto:nurcholism51@gmail.com" aria-label="Email">
            <i className="fa-regular fa-envelope"></i>
          </a>
        </div>
      </section>

      <button id="scrollToTopBtn" className="scroll-to-top" aria-label="Kembali ke atas" type="button">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 19V5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <path
            d="M6 11L12 5L18 11"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <footer className="site-footer">
        <div className="footer-links">
          <a href="/about">Tentang</a>
          <a href="/faq">FAQ</a>
          <a href="/kontak">Kontak</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/disclaimer">Disclaimer</a>
        </div>

        <div className="footer-copy">© 2026 Portal Literasi Islam – Seluruh hak cipta dilindungi.</div>
      </footer>

      <StaticPagesRuntimeLoader />
    </>
  );
}
