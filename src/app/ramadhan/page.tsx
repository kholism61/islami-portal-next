import Script from "next/script";
import StaticPagesRuntimeLoader from "@/components/runtime/StaticPagesRuntimeLoader";

export const metadata = {
  title: "Jadwal Imsakiyah",
  description:
    "Jadwal Imsakiyah, waktu imsak, subuh, dan maghrib otomatis berdasarkan lokasi Anda.",
  keywords: [
    "Imsakiyah",
    "Jadwal Puasa",
    "Imsak",
    "Subuh",
    "Maghrib",
    "Al-Qur'an",
  ],
  authors: [{ name: "Portal Literasi Islam" }],
  alternates: {
    canonical: "https://islami-portal-next.vercel.app/ramadhan",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RamadhanPage() {
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

      <meta name="theme-color" content="#0f172a" />
      <link rel="stylesheet" href="/css/ramadhan.css" />

      <nav className="ramadhan-navbar">
        <div className="logo">
          🌙 <span>Jadwal Imsakiyah</span>
        </div>

        <div className="nav-links">
          <a href="/">Beranda</a>
          <a href="/ramadhan">Imsakiyah</a>
          <a href="/bookmark">Bookmark</a>
        </div>

        <div className="prayer-mini" id="prayerMini">
          <span id="mini-name">Subuh</span>
          <strong id="mini-time">--:--</strong>
        </div>

        <button id="themeToggle">🌙</button>
      </nav>

      <section className="ramadhan-hero">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1>🌙 Ied Fitri Mubarak</h1>
          <p className="hero-sub">Bulan penuh berkah, ampunan, dan rahmat.</p>

          <h2 className="ramadhan-countdown">
            <span id="hero-countdown" className="countdown-box">
              Memuat...
            </span>
          </h2>

          <p className="hijri-date" id="hijriDate">
            Memuat tanggal hijriyah...
          </p>

          <div className="hero-buttons">
            <a href="#jadwal" className="hero-btn primary">
              Lihat Jadwal Hari Ini
            </a>
            <button className="hero-btn secondary" id="notifyBtn">
              Aktifkan Notifikasi
            </button>
          </div>
        </div>
      </section>

      <main>
        <div className="doa-harian-box">
          <h3>🤲 Doa Hari Ini</h3>
          <div id="doa-harian">Memuat doa...</div>
        </div>

        <section className="ramadhan-box" id="jadwal">
          <h1>🗓️ Jadwal Imsakiyah</h1>
          📍 <p id="ramadhan-city">Mendeteksi lokasi…</p>

          <div
            id="ramadhan-dua"
            className="ramadhan-dua"
            style={{ display: "none" }}
          >
            <p id="dua-text"></p>
          </div>

          <div className="ramadhan-table-box">
            <h2>📅 Jadwal Imsakiyah 1 Bulan</h2>

            <div className="qibla-box">
              <h3>🧭 Arah Kiblat</h3>
              <div id="qiblaDirection">Mendeteksi...</div>
            </div>

            <div className="table-scroll">
              <table className="ramadhan-table">
                <thead>
                  <tr>
                    <th>Hari</th>
                    <th>Tanggal</th>
                    <th>Imsak</th>
                    <th>Subuh</th>
                    <th>Maghrib</th>
                  </tr>
                </thead>
                <tbody id="ramadhan-table-body">
                  <tr>
                    <td colSpan={5}>Memuat jadwal...</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="ramadhan-grid">
            <div className="ramadhan-card">
              <h3>⏰ Imsak</h3>
              <span id="time-imsak">--:--</span>
            </div>

            <div className="ramadhan-card">
              <h3>🌅 Subuh</h3>
              <span id="time-fajr">--:--</span>
            </div>

            <div className="ramadhan-card">
              <h3>🌇 Berbuka (Maghrib)</h3>
              <span id="time-maghrib">--:--</span>
            </div>
          </div>

          <div className="ramadhan-countdown">
            <h2 id="ramadhan-next">Memuat...</h2>
          </div>
        </section>
      </main>

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

      <audio
        id="adzan-audio"
        src="/assets/audio/azan/mishary.mp3"
        preload="auto"
      ></audio>

      <Script src="/js/ramadhan.js" strategy="afterInteractive" />
      <StaticPagesRuntimeLoader />
    </>
  );
}