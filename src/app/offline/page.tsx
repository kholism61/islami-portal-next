import Script from "next/script";

export const metadata = {
  title: "Artikel Offline",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function OfflinePage() {
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
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />
      <link rel="stylesheet" href="/css/style.css?v=20260313z" />
      <link rel="stylesheet" href="/css/offline.css" />

      <header className="navbar">
        <a href="/" className="back-btn" aria-label="Kembali">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </a>
        <h1 className="logo">Artikel Offline</h1>
        <button id="themeToggle" className="theme-toggle">
          🌙
        </button>
      </header>

      <main className="container">
        <h2>Artikel Tersimpan Offline</h2>

        <div className="offline-tools">
          <div className="offline-filters">
            <button className="filter-btn active" data-filter="all">
              Semua
            </button>
            <button className="filter-btn" data-filter="new">
              Belum dibaca
            </button>
            <button className="filter-btn" data-filter="reading">
              Sedang dibaca
            </button>
            <button className="filter-btn" data-filter="done">
              Selesai
            </button>
          </div>

          <div className="offline-actions-top">
            <select id="sort-select">
              <option value="progress">Urut: Progress</option>
              <option value="title">Urut: Judul</option>
            </select>

            <div className="offline-stats">
              <div className="offline-stat-card">
                <span id="stat-offline-count">0</span>
                <small>Artikel Offline</small>
              </div>

              <div className="offline-stat-card">
                <span id="stat-offline-progress">0%</span>
                <small>Rata-rata Progress</small>
              </div>
            </div>

            <button id="download-all" className="btn-premium">
              Download Semua
            </button>

            <button id="delete-all" className="btn-danger">
              Hapus Semua
            </button>
          </div>
        </div>

        <input
          type="text"
          id="offline-search"
          className="offline-search"
          placeholder="Cari artikel offline..."
        />

        <div id="offline-list" className="cards"></div>
      </main>

      <button
        id="scrollToTopBtn"
        className="scroll-to-top"
        aria-label="Kembali ke atas"
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 19V5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
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
          &copy; 2026 Portal Literasi Islam - Seluruh hak cipta dilindungi.
        </div>
      </footer>

      <Script src="/js/article-store.js?v=20260323b" strategy="afterInteractive" />
      <Script src="/js/offline.js?v=20260323b" strategy="afterInteractive" />
      <Script src="/js/article.js?v=20260323b" strategy="afterInteractive" />
      <Script src="/js/bookmark.js?v=20260323b" strategy="afterInteractive" />
      <Script src="/js/auth.js" strategy="afterInteractive" />
      <Script src="/js/access-guard.js" strategy="afterInteractive" />
    </>
  );
}