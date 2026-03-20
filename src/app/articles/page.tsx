import Script from "next/script";
import Image from "next/image";

export const metadata = {
  title: "Portal Literasi Islam | Mimbar Ilmu untuk Umat",
  description: "Portal artikel Islam ilmiah dan akademik.",
  authors: [{ name: "Muhammad Nurcholis" }],
  icons: {
    icon: "/assets/images/logo.png",
  },
  alternates: {
    canonical: "https://islami-portal-next.vercel.app/article",
  },
  openGraph: {
    title: "",
    description: "",
    images: [""],
    url: "",
    type: "article",
    siteName: "Portal Literasi Islam",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portal Literasi Islam",
    description: "Mimbar Ilmu untuk Umat. Kajian fiqih, hadis, dan pemikiran Islam.",
    images: ["https://islami-portal-next.vercel.app/assets/images/preview.jpg"],
  },
};

export default function ArticlePage() {
  return (
    <>
      <link rel="stylesheet" href="/css/style.css?v=20260313z" />
      <link rel="stylesheet" href="/css/article.css?v=20260316e" />
      <link
        href="https://fonts.googleapis.com/css2?family=Amiri&family=Scheherazade+New&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&family=Amiri&display=swap"
        rel="stylesheet"
      />

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

      <Script
        id="schema-article"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {``}
      </Script>

      <div id="progress-bar"></div>

      <header className="navbar">
        <a href="/" className="back-btn" aria-label="Kembali ke Beranda">
          <svg
            width="20"
            height="20"
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

        <div className="nav-logo-badge" aria-hidden="true">
          <Image
            src="/assets/images/logo.png"
            alt=""
            className="nav-logo-img"
            width={28}
            height={28}
            priority
          />
        </div>

        <h1 className="logo">Portal Literasi Islam</h1>

        <button id="themeToggle" className="theme-toggle">
          🌙
        </button>

        <a href="/bookmark" className="nav-bookmark-icon">
          🔖 <span className="bookmark-count">3</span>
        </a>
      </header>

      <main className="article-content">
        <nav className="breadcrumb">
          <a href="/">Home</a>
          <span id="breadcrumb-category"></span>
          <span id="breadcrumb-title"></span>
        </nav>

        <button id="musicToggle" className="music-toggle">
          🎵
        </button>

        <audio id="bgMusic" loop></audio>

        <img id="article-thumb" className="article-thumb" alt="" />

        <div className="toc-wrap">
          <button
            id="tocToggle"
            className="toc-toggle"
            type="button"
            aria-expanded="false"
            aria-controls="toc"
          >
            <span className="toc-toggle-icon">☰</span>
            <span>Daftar Isi</span>
          </button>

          <nav id="toc" className="toc" aria-label="Daftar Isi">
            <h3>
              <span className="toc-title-icon">📑</span>
              <span>Daftar Isi</span>
            </h3>
            <ul id="toc-list"></ul>
          </nav>
        </div>

        <div
          id="not-found"
          style={{ display: "none", textAlign: "center", padding: "40px" }}
        >
          <h2>Artikel tidak ditemukan</h2>
          <p>Artikel yang Anda cari belum tersedia atau tautan tidak valid.</p>
          <a href="/" className="btn-premium">
            Kembali ke Beranda
          </a>
        </div>

        <article id="article-body">
          <h2 id="judul-artikel"></h2>

          <div className="article-tools">
            <div className="article-translate">
              <span id="article-translate-label">🌐 Terjemahkan:</span>
              <button type="button" data-set-lang="id">
                ID
              </button>
              <button type="button" data-set-lang="en">
                EN
              </button>
              <button type="button" data-set-lang="ar">
                AR
              </button>
            </div>

            <div className="font-size-control">
              <button id="fontMinus">A-</button>
              <button id="fontPlus">A+</button>
            </div>
          </div>

          <div className="reader-controls">
            <button id="focusModeBtn" className="focus-btn">
              🔔 Mode Fokus
            </button>

            <button id="offlineSaveBtn" className="reader-btn">
              ⬇️ Simpan Offline
            </button>

            <button id="bookmarkBtn" className="bookmark-btn">
              ⭐ Simpan
            </button>

            <button id="readModeBtn" className="reader-btn">
              📖 Mode Baca
            </button>

            <button id="resetBtn" className="reader-btn danger">
              ♻️ Reset
            </button>
          </div>

          <p className="bookmark-hint">
            📌 Artikel tersimpan dapat dilihat di menu <strong>Bookmark</strong>
          </p>

          <div className="meta">
            <span id="penulis"></span>
            <span id="tanggal"></span>
            <span id="read-time">🕒 0 menit baca</span>
            <span id="kategori" className="category"></span>
          </div>

          <div className="share-buttons">
            <button id="share-wa" className="share-btn wa">
              💬 WhatsApp
            </button>
            <button id="copy-link" className="share-btn">
              🔗 Copy Link
            </button>
          </div>

          <div id="isi-artikel"></div>
        </article>

        <div id="quoteBox" className="quote-box">
          <p id="quoteText"></p>
          <div className="quote-actions">
            <button id="copyQuote">📋 Copy</button>
            <button id="waQuote">💬 WhatsApp</button>
            <button id="closeQuote">✕</button>
          </div>
        </div>

        <div className="article-nav">
          <a id="prev-article" className="nav-link"></a>
          <a id="next-article" className="nav-link"></a>
        </div>

        <section className="related-articles">
          <h3>Artikel Terkait</h3>
          <div id="related-container" className="related-list"></div>
        </section>

        <section className="recommended-section">
          <h3>✨ Artikel Direkomendasikan</h3>
          <div id="recommended-container" className="recommended-list"></div>
        </section>
      </main>

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

      <div id="toast" className="toast"></div>

      <Script src="/js/article-store.js?v=20260317b" strategy="afterInteractive" />
      <Script src="/js/bookmark.js?v=20260317b" strategy="afterInteractive" type="module" />
      <Script src="/js/article.js?v=20260317b" strategy="afterInteractive" type="module" />
      <Script src="/js/music.js" strategy="afterInteractive" type="module" />
      <Script src="/js/i18n.js?v=20260316a" strategy="afterInteractive" />
      <Script src="/js/auth.js" strategy="afterInteractive" />
      <Script src="/js/access-guard.js" strategy="afterInteractive" />
    </>
  );
}