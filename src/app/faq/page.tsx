import Script from "next/script";

export const metadata = {
  title: "FAQ | Portal Literasi Islam",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function FAQPage() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-FD9932Y04M"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-FD9932Y04M');
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
        <h1 className="page-title">FAQ</h1>
        <div className="page-divider"></div>

        <p className="page-lead">
          Pertanyaan umum seputar tujuan, metodologi, dan pengelolaan Portal
          Literasi Islam.
        </p>

        <section className="faq-section">
          <div className="faq-item">
            <button className="faq-question">
              Apa tujuan Portal Literasi Islam?
              <span className="faq-icon">+</span>
            </button>
            <div className="faq-answer">
              Portal ini bertujuan menghadirkan kajian Islam berbasis keilmuan,
              metodologi yang jelas, serta adab akademik yang bertanggung jawab.
            </div>
          </div>

          <div className="faq-item">
            <button className="faq-question">
              Apakah tulisan di sini merupakan fatwa?
              <span className="faq-icon">+</span>
            </button>
            <div className="faq-answer">
              Tidak. Seluruh tulisan disajikan sebagai bahan kajian dan refleksi
              ilmiah, bukan sebagai fatwa atau klaim kebenaran tunggal.
            </div>
          </div>

          <div className="faq-item">
            <button className="faq-question">
              Siapa yang mengelola website ini?
              <span className="faq-icon">+</span>
            </button>
            <div className="faq-answer">
              Website ini dikelola secara mandiri oleh Muhammad Nurcholis,
              mahasiswa Syariah wa Qanun Universitas Al-Azhar, Kairo.
            </div>
          </div>

          <div className="faq-item">
            <button className="faq-question">
              Apakah pembaca boleh memberi masukan?
              <span className="faq-icon">+</span>
            </button>
            <div className="faq-answer">
              Sangat boleh. Masukan dan diskusi terbuka melalui halaman Kontak
              atau media sosial yang tersedia.
            </div>
          </div>

          <div className="faq-update-info">
            <strong>Pemberitahuan Pembaruan Situs:</strong>
            <br />
            <br />
            Jika tampilan atau isi website tidak berubah setelah pembaruan,
            silakan lakukan langkah berikut:
            <ul>
              <li>
                <strong>Di HP:</strong> Hapus cache dan cookie browser, lalu
                buka kembali situs.
              </li>
              <li>
                <strong>Di laptop/komputer (Windows):</strong> Tekan{" "}
                <strong>Ctrl + Shift + R</strong> untuk hard refresh.
              </li>
            </ul>
            Website ini menggunakan teknologi{" "}
            <strong>PWA (Progressive Web App)</strong> sehingga browser
            terkadang menampilkan versi yang tersimpan.
          </div>
        </section>
      </main>

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

      <section className="prefooter">
        <div className="prefooter-overlay"></div>

        <div className="prefooter-inner">
          <div className="prefooter-col">
            <h4>Portal Literasi Islam</h4>
            <p>
              Portal kajian Islam yang menghadirkan analisis ilmiah, pemikiran
              kritis, dan dialog keislaman dalam konteks modern.
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
              Seluruh konten disajikan untuk tujuan edukasi dan kajian ilmiah,
              bukan sebagai fatwa atau klaim kebenaran tunggal.
            </p>
          </div>
        </div>

        <div className="prefooter-social">
          <a
            href="https://wa.me/6282124305278"
            aria-label="WhatsApp"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-whatsapp"></i>
          </a>
          <a
            href="https://instagram.com/nurcholism51"
            aria-label="Instagram"
            target="_blank"
            rel="noreferrer"
          >
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

      <footer className="site-footer">
        <div className="footer-links">
          <a href="/about">Tentang</a>
          <a href="/faq">FAQ</a>
          <a href="/kontak">Kontak</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/disclaimer">Disclaimer</a>
        </div>

        <div className="footer-copy">
          © 2026 Portal Literasi Islam – Seluruh hak cipta dilindungi.
        </div>
      </footer>

      <Script src="/js/faq.js" strategy="afterInteractive" />
      <Script src="/js/nav-active.js" strategy="afterInteractive" />
      <Script src="/js/common-brand-i18n.js" strategy="afterInteractive" />
      <Script src="/js/static-pages-i18n.js" strategy="afterInteractive" />
      <Script src="/js/auth.js" strategy="afterInteractive" />
      <Script src="/js/access-guard.js" strategy="afterInteractive" />
    </>
  );
}