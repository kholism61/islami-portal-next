import Script from "next/script";

export const metadata = {
  title: "Artikel Tersimpan",
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "https://islami-portal-next.vercel.app/bookmark",
  },
};

export default function BookmarkPage() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />
      <link rel="stylesheet" href="/css/style.css?v=20260313z" />
      <link rel="stylesheet" href="/css/bookmark.css" />
      <link rel="stylesheet" href="/css/article.css" />

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

      <header className="navbar">
        <a href="/" className="nav-icon" title="Beranda">
          🏠
        </a>
        <h1 className="logo">Bookmark ku ⭐</h1>
        <button id="themeToggle" className="theme-toggle" type="button">
          🌙
        </button>
      </header>

      <div className="bookmark-stats-modern">
        <div className="stat-box">
          <b id="stat-bookmark-count">0</b>
          <span>Artikel disimpan</span>
        </div>
        <div className="stat-box">
          <b id="stat-reading-count">0</b>
          <span>Sedang dibaca</span>
        </div>
        <div className="stat-box">
          <b id="stat-streak">0</b>
          <span>Hari Berturut-turut</span>
        </div>
      </div>

      <div className="reading-goal">
        <div className="goal-info">
          <span>🎯 Target Harian</span>
          <strong id="goal-status">0 / 1 artikel</strong>
        </div>
        <div className="goal-bar">
          <div id="goal-progress"></div>
        </div>
      </div>

      <div className="reading-achievement">
        <span>🏆 Achievement:</span>
        <strong id="achievement-label">Pemula</strong>
      </div>

      <main className="bookmark-container">
        <div className="bookmark-header">
          <h1>⭐ Bookmark Saya</h1>
          <p>Kumpulan artikel yang Anda simpan untuk dibaca nanti.</p>
        </div>

        <button id="exportPdfBtn" className="bookmark-btn" type="button">
          📄 Export ke PDF
        </button>
        <button id="exportWordBtn" className="bookmark-btn" type="button">
          📝 Export ke Word
        </button>
        <button id="clearBookmarks" className="clear-bookmark" type="button">
          🗑️ Hapus Semua
        </button>

        <div id="continue-reading" className="continue-reading"></div>

        <div id="bookmarkStats" className="bookmark-stats">
          ⭐ 0 artikel tersimpan
        </div>

        <div className="bookmark-controls">
          <select id="bookmarkSort">
            <option value="newest">Terbaru</option>
            <option value="oldest">Terlama</option>
            <option value="az">Judul A-Z</option>
          </select>

          <select id="bookmarkFilter">
            <option value="all">Semua Kategori</option>
          </select>
        </div>

        <div className="bookmark-search">
          <input type="text" id="bookmarkSearch" placeholder="Cari bookmark..." />
        </div>

        <div id="bookmarkNotFound" className="not-found" style={{ display: "none" }}>
          ❌ Bookmark tidak ditemukan
        </div>

        <div id="bookmark-list" className="bookmark-list"></div>

        <section
          id="bookmark-related-section"
          className="bookmark-discovery bookmark-related-section"
          style={{ display: "none" }}
          aria-labelledby="bookmark-related-heading"
        >
          <div className="bookmark-discovery-stack">
            <h2 id="bookmark-related-heading" className="bookmark-discovery-title">
              Artikel terkait
            </h2>
            <p id="bookmark-related-desc" className="bookmark-discovery-desc" />
            <p className="bookmark-discovery-context" id="bookmark-related-lead" />
            <div
              id="bookmark-related-grid"
              className="bookmark-discovery-grid bookmark-related-grid related-list"
            />
          </div>
        </section>

        <section
          id="bookmark-recommended-section"
          className="bookmark-discovery bookmark-recommended-section"
          style={{ display: "none" }}
          aria-labelledby="bookmark-recommended-heading"
        >
          <div className="bookmark-discovery-stack">
            <h2 id="bookmark-recommended-heading" className="bookmark-discovery-title">
              Artikel direkomendasikan
            </h2>
            <p id="bookmark-recommended-desc" className="bookmark-discovery-desc" />
            <div className="bookmark-recommended-rows">
              <div id="bookmark-rec-row-1" className="bookmark-rec-grid recommended-list" />
              <div id="bookmark-rec-row-2" className="bookmark-rec-grid recommended-list" />
            </div>
          </div>
        </section>

        <p id="bookmark-empty" className="bookmark-empty" style={{ display: "none" }}>
          ⭐ Belum ada artikel yang disimpan
        </p>
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
          <a href="https://www.threads.net/@nurcholism51" aria-label="Threads" target="_blank" rel="noreferrer">
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

        <div className="footer-copy">&copy; 2026 Portal Literasi Islam - Seluruh hak cipta dilindungi.</div>
      </footer>

      <div id="toast" className="toast"></div>

      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
        strategy="afterInteractive"
      />
      <Script src="/js/article-store.js?v=20260321a" strategy="afterInteractive" />
      <Script src="/js/article.js?v=20260324f" strategy="afterInteractive" type="module" />
      <Script src="/js/bookmark.js?v=20260324f" strategy="afterInteractive" type="module" />
    </>
  );
}