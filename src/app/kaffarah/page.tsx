import Link from "next/link";

import KfiScope from "@/components/kaffarah/KfiScope";

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
              <img
                src="/assets/images/logo.png"
                alt=""
                className="logo-icon"
                loading="eager"
                decoding="async"
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
            <h3>Kaffarah Jima Ramadhan</h3>
            <p>Pelanggaran hubungan suami istri di siang Ramadan</p>
          </Link>

          <Link href="/tool/kaffarah-sumpah" className="tool-card">
            <h3>Kaffarah Sumpah</h3>
            <p>Kaffarah bagi orang yang melanggar sumpah</p>
          </Link>

          <Link href="/tool/fidyah" className="tool-card">
            <h3>Fidyah Puasa</h3>
            <p>Hitung fidyah bagi orang yang tidak mampu puasa</p>
          </Link>

          <Link href="/tool/qadha-puasa" className="tool-card">
            <div className="tool-card-head">
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
    </>
  );
}
