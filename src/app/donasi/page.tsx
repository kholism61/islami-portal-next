import Script from "next/script";

export const metadata = {
  title: "Donasi | Portal Literasi Islam",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function DonasiPage() {
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

      <section className="donation-hero">
        <div className="donation-hero-content">
          <span className="donation-tag">🤝 Dukungan Dakwah Digital</span>

          <h1>
            Bersama Membangun <br />
            <span>Literasi Keislaman Berkualitas</span>
          </h1>

          <p>
            Dukungan Anda membantu Portal Literasi Islam menghadirkan kajian
            ilmiah, literasi Islam, dan pengembangan edukasi digital yang dapat
            diakses secara gratis oleh masyarakat.
          </p>
        </div>
      </section>

      <div className="donation-highlights">
        <div className="highlight">📘 Pengembangan Kajian Ilmiah</div>

        <div className="highlight">🛠️ Infrastruktur Website</div>

        <div className="highlight">💻 Edukasi Digital Islam</div>
      </div>

      <main className="page">
        <div className="donation-card">
          <div className="donation-wrapper">
            <div className="donation-box">
              <h3>💳 Informasi Donasi</h3>

              <div className="donation-info">
                <strong>Transfer Bank</strong>
                <p>Bank Mandiri</p>

                <div className="copy-row">
                  <span id="bank-number">1830006850027</span>
                  <button className="copy-btn" data-copy="bank-number">
                    📋 Salin
                  </button>
                </div>

                <p>a.n. MUHAMMAD NURCHOLIS</p>
              </div>

              <button className="qris-toggle" type="button">
                <span>📱 Donasi via QRIS</span>
                <span className="qris-icon">+</span>
              </button>

              <div className="qris-content">
                <img
                  src="/assets/images/qris.png"
                  alt="QRIS Donasi Portal Literasi Islam"
                />
                <p className="qris-text">
                  Scan QRIS menggunakan e-wallet atau mobile banking Anda.
                </p>
              </div>

              <div className="preset-amounts">
                <a
                  href="https://www.paypal.com/ncp/payment/CUEW253D7GJSC"
                  target="_blank"
                  rel="noreferrer"
                >
                  $5
                </a>
                <a
                  href="https://www.paypal.com/ncp/payment/CUEW253D7GJSC"
                  target="_blank"
                  rel="noreferrer"
                >
                  $10
                </a>
                <a
                  href="https://www.paypal.com/ncp/payment/CUEW253D7GJSC"
                  target="_blank"
                  rel="noreferrer"
                >
                  $25
                </a>
              </div>

              <a
                href="https://www.paypal.com/ncp/payment/CUEW253D7GJSC"
                target="_blank"
                rel="noreferrer"
                className="paypal-btn"
              >
                🌍 Donasi Internasional via PayPal
              </a>

              <p className="donation-note">
                🔒 Secure payment powered by PayPal
              </p>

              <div className="donation-info">
                <strong>Kontak Konfirmasi</strong>
                <p>Email: nurcholism51@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
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

      <footer className="site-footer">
        <div className="footer-links">
          <a href="/about">Tentang</a>
          <a href="/faq">FAQ</a>
          <a href="/kontak">Kontak</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/disclaimer">Disclaimer</a>
        </div>

        <div className="footer-copy">
          2026 Portal Literasi Islam – Seluruh hak cipta dilindungi.
        </div>
      </footer>

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

      <Script src="/js/nav-active.js?v=20260317b" strategy="afterInteractive" />
      <Script src="/js/donation.js?v=20260317b" strategy="afterInteractive" />
      <Script src="/js/common-brand-i18n.js?v=20260317b" strategy="afterInteractive" />
      <Script src="/js/static-pages-i18n.js" strategy="afterInteractive" />
      <Script src="/js/auth.js" strategy="afterInteractive" />
      <Script src="/js/access-guard.js" strategy="afterInteractive" />
    </>
  );
}