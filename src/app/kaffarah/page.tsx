import Link from "next/link";

import Image from "next/image";

import KfiScope from "@/components/kaffarah/KfiScope";
import ScrollToTopButton from "@/components/fiqh/ScrollToTopButton";

export const metadata = {
  title: "Kaffarah & Fidyah",
};

export default function KaffarahPage() {
  return (
    <>
      <KfiScope />
      <link rel="preload" as="style" href="/css/kaffarah.css" />
      <link rel="stylesheet" href="/css/kaffarah.css" />
      <link rel="preload" as="style" href="/css/kaffarah-shared.css" />
      <link rel="stylesheet" href="/css/kaffarah-shared.css" />

      <nav className="navbar">
        <div className="nav-container">
          <Link href="/" className="logo" aria-label="Portal Literasi Islam">
            <span className="logo-mark" aria-hidden="true">
              <Image
                src="/assets/images/logo.png"
                alt=""
                className="logo-icon"
                width={32}
                height={32}
                priority
              />
            </span>
            <span className="logo-text">Portal Literasi Islam</span>
          </Link>

          <ul className="nav-menu">
            <li>
              <Link href="/">Beranda</Link>
            </li>

            <li>
              <Link href="/tools/mawaris">Hitung Mawaris</Link>
            </li>

            <li>
              <Link href="/haid">Kalkulator Haid</Link>
            </li>

            <li>
              <Link href="/nifas">Kalkulator Nifas</Link>
            </li>

            <li>
              <Link href="/suci">Masa Suci</Link>
            </li>

            <li>
              <Link href="/kaffarah" className="active">
                Kaffarah &amp; Fidyah
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container">
        <h1 className="title">Kaffarah &amp; Fidyah</h1>

        <p className="desc">
          Gunakan kalkulator ini untuk menghitung kewajiban kaffarah dan fidyah
          sesuai fiqh.
        </p>

        <div className="tool-grid">
          <Link href="/tool/kaffarah-jima" className="tool-card">
            <div className="tool-card-head">
              <span className="tool-card-icon jima" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M15.8 5.2a6.2 6.2 0 1 0 2.9 11.7A7.2 7.2 0 1 1 15.8 5.2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="M16.8 7.4v2.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M15.75 8.45h2.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </span>
              <h3>Kaffarah Jima Ramadhan</h3>
            </div>
            <p>Pelanggaran hubungan suami istri di siang Ramadan</p>
          </Link>

          <Link href="/tool/kaffarah-sumpah" className="tool-card">
            <div className="tool-card-head">
              <span className="tool-card-icon sumpah" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M9.2 20v-7.3c0-.9.7-1.6 1.6-1.6h.2V5.8c0-1 .8-1.8 1.8-1.8s1.8.8 1.8 1.8v3.6h.5c1 0 1.9.8 1.9 1.9V20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9.2 12.2 7.8 11a1.8 1.8 0 0 0-2.6.2 1.8 1.8 0 0 0 .2 2.6l2.5 2.2c.8.7 1.3 1.7 1.3 2.8V20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h3>Kaffarah Sumpah</h3>
            </div>
            <p>Kaffarah bagi orang yang melanggar sumpah</p>
          </Link>

          <Link href="/tool/fidyah" className="tool-card">
            <div className="tool-card-head">
              <span className="tool-card-icon fidyah" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M4.8 10.2h14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M6.2 10.2c0 4 2.4 6.8 5.8 6.8s5.8-2.8 5.8-6.8" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="M19.3 11.2a2.2 2.2 0 1 0 0 4.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8.8 6.2c.4.8.4 1.7-.1 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M12 5.3c.5 1 .5 2-.1 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M15.2 6.2c.4.8.4 1.7-.1 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </span>
              <h3>Fidyah Puasa</h3>
            </div>
            <p>Hitung fidyah bagi orang yang tidak mampu puasa</p>
          </Link>

          <Link href="/tool/qadha-puasa" className="tool-card">
            <div className="tool-card-head">
              <span className="tool-card-icon qadha" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="5" y="6" width="14" height="13" rx="3" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M8 4.5v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M16 4.5v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M5 10h14" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M9 13.2h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M10.5 16h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </span>
              <h3>Qadha Puasa</h3>
            </div>

            <p>Hitung jumlah hari puasa Ramadhan yang harus diganti.</p>
          </Link>
        </div>
      </div>

      <section className="pre-footer">
        <h2>Portal Fiqh Digital</h2>

        <p>
          Portal ini menyediakan berbagai kalkulator fiqh untuk membantu
          memahami hukum Islam secara praktis.
        </p>

        <div className="pre-footer-buttons">
          <Link href="/zakat">Kalkulator Zakat</Link>

          <Link href="/tools/mawaris">Kalkulator Mawaris</Link>

          <Link href="/haid">Fiqh Wanita</Link>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-bottom">
          <div className="footer-links">
            <Link href="/faq">FAQ</Link>
            <Link href="/kontak">Kontak</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/disclaimer">Disclaimer</Link>
          </div>

          <p>&copy; 2026 Portal Literasi Islam - Seluruh hak cipta dilindungi.</p>
        </div>
      </footer>

      <ScrollToTopButton />
    </>
  );
}
