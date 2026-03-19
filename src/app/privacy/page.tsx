import Script from "next/script";

export const metadata = {
  title: "Privacy Policy - Portal Literasi Islam",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function PrivacyPage() {
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

      <link rel="stylesheet" href="/css/legal.css?v=20260318a" />

      <header className="legal-header">
        <a href="/" className="legal-back">
          ← Beranda
        </a>
        <div className="legal-title">Portal Literasi Islam</div>
      </header>

      <div className="page-container">
        <h1>Kebijakan Privasi</h1>

        <p>Halaman ini menjelaskan bagaimana data pengguna digunakan di situs ini.</p>

        <h2>1. Informasi yang Dikumpulkan</h2>
        <p>Kami dapat mengumpulkan data seperti:</p>
        <ul>
          <li>Alamat IP</li>
          <li>Jenis perangkat</li>
          <li>Halaman yang dikunjungi</li>
        </ul>

        <h2>2. Penggunaan Data</h2>
        <p>Data digunakan untuk:</p>
        <ul>
          <li>Analisis trafik situs</li>
          <li>Peningkatan kualitas konten</li>
          <li>Layanan iklan seperti Google AdSense</li>
        </ul>

        <a href="/" className="page-back">
          ← Kembali ke Beranda
        </a>
      </div>

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

      <Script src="/js/common-brand-i18n.js?v=20260318a" strategy="afterInteractive" />
      <Script src="/js/static-pages-i18n.js?v=20260318a" strategy="afterInteractive" />
      <Script src="/js/auth.js?v=20260318a" strategy="afterInteractive" />
      <Script src="/js/access-guard.js?v=20260318a" strategy="afterInteractive" />
    </>
  );
}