import Script from "next/script";

export const metadata = {
  title: "Kaffarah & Fidyah",
};

export default function KaffarahPage() {
  return (
    <>
      <link rel="stylesheet" href="/css/kaffarah.css" />

      <nav className="navbar">
        <div className="nav-container">
          <a href="index.html" className="logo">
            Portal Literasi Islam
          </a>

          <ul className="nav-menu">
            <li>
              <a href="index.html">Beranda</a>
            </li>

            <li>
              <a href="tools/mawaris.html">Hitung Mawaris</a>
            </li>

            <li>
              <a href="haid.html">Kalkulator Haid</a>
            </li>

            <li>
              <a href="nifas.html">Kalkulator Nifas</a>
            </li>

            <li>
              <a href="suci.html">Masa Suci</a>
            </li>

            <li>
              <a href="tools/kaffarah.html" className="active">
                Kaffarah &amp; Fidyah
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container">
        <h1 className="title">🧾 Kaffarah &amp; Fidyah</h1>

        <p className="desc">
          Gunakan kalkulator ini untuk menghitung kewajiban kaffarah dan fidyah
          sesuai fiqh.
        </p>

        <div className="tool-grid">
          <a href="tool/kaffarah-jima.html" className="tool-card">
            <h3>⚖️ Kaffarah Jima Ramadhan</h3>
            <p>Pelanggaran hubungan suami istri di siang Ramadan</p>
          </a>

          <a href="tool/kaffarah-sumpah.html" className="tool-card">
            <h3>📜 Kaffarah Sumpah</h3>
            <p>Kaffarah bagi orang yang melanggar sumpah</p>
          </a>

          <a href="tool/fidyah.html" className="tool-card">
            <h3>🍽️ Fidyah Puasa</h3>
            <p>Hitung fidyah bagi orang yang tidak mampu puasa</p>
          </a>

          <a href="tool/qadha-puasa.html" className="tool-card">
            <div className="tool-card-head">
              <span className="icon" aria-hidden="true">
                🗓️
              </span>
              <h3>Qadha Puasa</h3>
            </div>

            <p>Hitung jumlah hari puasa Ramadhan yang harus diganti.</p>
          </a>
        </div>
      </div>

      <section className="pre-footer">
        <h2>Portal Fiqh Digital</h2>

        <p>
          Portal ini menyediakan berbagai kalkulator fiqh untuk membantu
          memahami hukum Islam secara praktis.
        </p>

        <div className="pre-footer-buttons">
          <a href="zakat.html">Kalkulator Zakat</a>

          <a href="tools/mawaris.html">Kalkulator Mawaris</a>

          <a href="haid.html">Fiqh Wanita</a>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-bottom">
          <div className="footer-links">
            <a href="faq.html">FAQ</a>
            <a href="kontak.html">Kontak</a>
            <a href="privacy.html">Privacy Policy</a>
            <a href="disclaimer.html">Disclaimer</a>
          </div>

          <p>© 2026 Portal Literasi Islam – Seluruh hak cipta dilindungi.</p>
        </div>
      </footer>

      <Script src="/js/kaffarah-fidyah-i18n.js" strategy="afterInteractive" />
      <Script src="/js/auth.js" strategy="afterInteractive" />
      <Script src="/js/access-guard.js" strategy="afterInteractive" />
    </>
  );
}