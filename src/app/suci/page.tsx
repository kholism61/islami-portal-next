import Script from "next/script";

export const metadata = {
  title: "Kalkulator Masa Suci | Portal Literasi Islam",
};

export default function MasaSuciPage() {
  return (
    <>
      <link rel="stylesheet" href="/css/nifas.css" />
      <link rel="stylesheet" href="/css/suci.css" />

      <nav className="navbar">
        <div className="nav-title">Fiqh Wanita</div>

        <div className="nav-links">
          <a href="/haid.html">Kalkulator Haid</a>
          <a href="/nifas.html">Kalkulator Nifas</a>
          <a href="/iddah.html">Kalkulator Iddah</a>
          <a href="/suci.html" className="active">
            Masa Suci
          </a>
        </div>
      </nav>

      <section className="hero">
        <h1>Kalkulator Masa Suci</h1>
        <p>Menghitung masa suci minimal antara dua haid menurut fiqh</p>
      </section>

      <div className="container">
        <div className="card">
          <label>Tanggal Selesai Haid</label>

          <input type="date" id="haidEnd" />

          <button id="hitungSuciBtn" type="button">
            Hitung Masa Suci
          </button>

          <div className="result-card" id="result">
            Hasil akan muncul di sini

            <div className="timeline" id="timeline"></div>
          </div>

          <h4>Kalender Fiqh Wanita</h4>

          <div className="fiqh-calendar" id="fiqhCalendar"></div>

          <div className="legend-quru">
            <span className="box-haid"></span> Haid
            <span className="box-suci"></span> Masa Suci
            <span className="box-next"></span> Boleh Haid
            <span className="box-today"></span> Hari ini
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-menu">
            <a href="/index.html">Beranda</a>
            <a href="/haid.html">Haid</a>
            <a href="/nifas.html">Nifas</a>
            <a href="/iddah.html">Iddah</a>
          </div>

          <div className="footer-copy">
            © 2026 Portal Literasi Islam
          </div>
        </div>
      </footer>

      <Script src="/js/suci.js" strategy="afterInteractive" />
      <Script id="suci-bind" strategy="afterInteractive">
        {`
          (function () {
            var btn = document.getElementById('hitungSuciBtn');
            if (!btn) return;
            if (btn.dataset.bound) return;
            btn.dataset.bound = '1';
            btn.addEventListener('click', function () {
              try {
                if (typeof window !== 'undefined' && typeof window.hitungSuci === 'function') {
                  window.hitungSuci();
                }
              } catch (e) {}
            });
          })();
        `}
      </Script>
      <Script src="/js/fiqh-wanita-i18n.js" strategy="afterInteractive" />
      <Script src="/js/auth.js" strategy="afterInteractive" />
      <Script src="/js/access-guard.js" strategy="afterInteractive" />
    </>
  );
}

