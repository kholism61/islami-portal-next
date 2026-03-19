import Script from "next/script";

export const metadata = {
  title: "Kalkulator Nifas",
};

export default function NifasPage() {
  return (
    <>
      <link rel="stylesheet" href="/css/nifas.css" />

      <nav className="navbar">
        <div className="nav-logo">Fiqh Wanita</div>

        <div className="nav-links">
          <a href="haid.html">Haid</a>
          <a href="suci.html">Masa Suci</a>
          <a href="iddah.html">Iddah</a>
          <a href="nifas.html" className="active">
            Nifas
          </a>
        </div>
      </nav>

      <section className="hero">
        <h1>Kalkulator Nifas</h1>
        <p>Menghitung masa nifas menurut fiqh Syafi&apos;i</p>
      </section>

      <div className="container">
        <div className="card">
          <label>Tanggal Melahirkan</label>

          <input type="date" id="birthDate" />

          <button id="hitungNifasBtn" type="button">
            Hitung Nifas
          </button>

          <div className="result-card" id="result">
            <h2>Hasil Perhitungan Nifas</h2>

            <p>
              <b>Tanggal Melahirkan:</b> <span id="mulai"></span>
            </p>

            <p>
              <b>Maksimal Nifas:</b> 60 hari
            </p>

            <p>
              <b>Perkiraan Selesai:</b> <span id="akhir"></span>
            </p>

            <p>
              <b>Status Saat Ini:</b> <span id="status"></span>
            </p>

            <div className="progress">
              <div id="nifasBar"></div>
            </div>

            <hr />

            <h3>Timeline Nifas</h3>

            <div id="timeline" className="timeline"></div>

            <div className="legend-nifas">
              <div>
                <span className="l-normal"></span>
                Nifas Umum (1–40 hari)
              </div>

              <div>
                <span className="l-max"></span>
                Maksimal Nifas (41–60 hari)
              </div>
            </div>

            <hr />

            <h3>Penjelasan Fiqh</h3>

            <p>
              Dalam mazhab Syafi&apos;i, maksimal masa nifas adalah 60 hari.
              Jika darah berhenti sebelum itu maka wanita wajib mandi dan
              kembali melaksanakan shalat.
            </p>

            <p>
              <b>Referensi:</b>
            </p>

            <ul>
              <li>Kifayatul Akhyar</li>
              <li>Fathul Qarib</li>
              <li>Al-Majmu&apos;</li>
              <li>Tuhfatul Muhtaj</li>
            </ul>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <p>© 2026 Portal Literasi Islam</p>

          <p>Kalkulator Fiqh Wanita – Mazhab Syafi&apos;i</p>
        </div>
      </footer>

      <Script src="/js/nifas.js" strategy="afterInteractive" />
      <Script id="nifas-bind" strategy="afterInteractive">
        {`
          (function () {
            var btn = document.getElementById('hitungNifasBtn');
            if (!btn) return;
            if (btn.dataset.bound) return;
            btn.dataset.bound = '1';
            btn.addEventListener('click', function () {
              try {
                if (typeof window !== 'undefined' && typeof window.hitungNifas === 'function') {
                  window.hitungNifas();
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