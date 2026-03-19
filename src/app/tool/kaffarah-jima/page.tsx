import Link from "next/link";
import Script from "next/script";

export const metadata = {
  title: "Kalkulator Kaffarah Jima Ramadhan",
};

export default function KalkulatorKaffarahJimaPage() {
  return (
    <>
      <Script
        id="schema-kaffarah-jima"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Kalkulator Kaffarah Jima Ramadhan",
            applicationCategory: "ReligiousApplication",
            description:
              "Kalkulator fiqh untuk menghitung kaffarah jima di siang hari Ramadhan.",
          }),
        }}
      />

      <link rel="stylesheet" href="/tool/kaffarah-jima.css" />

      <nav className="navbar">
        <div className="nav-container">
          <Link href="/" className="logo">
            Portal Literasi Islam
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
              <Link href="/kaffarah">Kaffarah &amp; Fidyah</Link>
            </li>
          </ul>
        </div>
      </nav>

      <section className="hero">
        <h1>🔥 Kaffarah Jima Ramadhan</h1>

        <p>
          Simulasi kewajiban kaffarah bagi orang yang melakukan hubungan suami
          istri di siang hari bulan Ramadhan.
        </p>
      </section>

      <section className="kaffarah-section">
        <div className="kaffarah-card">
          <h2>Perhitungan Kaffarah</h2>

          <div className="form-group">
            <label>Jumlah pelanggaran</label>
            <input type="number" id="jumlahJima" placeholder="contoh: 1" />
          </div>

          <div className="form-group">
            <label>Harga makanan per orang (Rp)</label>
            <input
              type="number"
              id="hargaKaffarah"
              placeholder="contoh: 25000"
            />
          </div>

          <div className="harga-preset">
            <button className="harga-btn" id="kaffarahHarga10kBtn" type="button">
              10k
            </button>
            <button className="harga-btn" id="kaffarahHarga15kBtn" type="button">
              15k
            </button>
            <button className="harga-btn" id="kaffarahHarga20kBtn" type="button">
              20k
            </button>
            <button className="harga-btn" id="kaffarahHarga25kBtn" type="button">
              25k
            </button>
          </div>

          <button className="btn-hitung" id="hitungKaffarahJimaBtn" type="button">
            Hitung Kaffarah
          </button>

          <div className="stat-box">
            <p>
              Total Pelanggaran <strong id="totalPelanggaran">0</strong>
            </p>
            <p>
              Total Orang Miskin <strong id="totalMiskin">0</strong>
            </p>
          </div>

          <div className="stats-container">
            <div className="stat-card">
              <span>Pelanggaran</span>
              <h3 id="statPelanggaran">0</h3>
            </div>

            <div className="stat-card">
              <span>Orang Miskin</span>
              <h3 id="statMiskin">0</h3>
            </div>
          </div>

          <div id="hasilKaffarah" className="hasil-box">
            Hasil perhitungan akan muncul di sini.
          </div>

          <div className="analisis-box">
            <h3>Analisis Fiqh</h3>

            <div id="analisisKaffarah">
              Analisis akan muncul setelah perhitungan.
            </div>
          </div>
        </div>
      </section>

      <div className="action-buttons">
        <button className="btn-copy" id="copyKaffarahJimaBtn" type="button">
          Salin Hasil
        </button>

        <button className="btn-wa" id="shareKaffarahJimaBtn" type="button">
          Bagikan WhatsApp
        </button>

        <button className="btn-reset" id="resetKaffarahJimaBtn" type="button">
          Reset
        </button>
      </div>

      <footer className="footer">
        <div className="footer-links">
          <Link href="/about">Tentang</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/kontak">Kontak</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/disclaimer">Disclaimer</Link>
        </div>

        <p> 2026 Portal Literasi Islam – Seluruh hak cipta dilindungi.</p>
      </footer>

      <Script src="/tool/kaffarah-jima.js" strategy="afterInteractive" />
      <Script id="kaffarah-jima-bind" strategy="afterInteractive">
        {`
          (function () {
            function bind(id, fn) {
              var el = document.getElementById(id);
              if (!el) return;
              if (el.dataset.bound) return;
              el.dataset.bound = '1';
              el.addEventListener('click', function () {
                try { fn(el); } catch (e) {}
              });
            }

            bind('kaffarahHarga10kBtn', function (el) {
              if (typeof window !== 'undefined' && typeof window.setHarga === 'function') window.setHarga(10000, el);
            });
            bind('kaffarahHarga15kBtn', function (el) {
              if (typeof window !== 'undefined' && typeof window.setHarga === 'function') window.setHarga(15000, el);
            });
            bind('kaffarahHarga20kBtn', function (el) {
              if (typeof window !== 'undefined' && typeof window.setHarga === 'function') window.setHarga(20000, el);
            });
            bind('kaffarahHarga25kBtn', function (el) {
              if (typeof window !== 'undefined' && typeof window.setHarga === 'function') window.setHarga(25000, el);
            });
            bind('hitungKaffarahJimaBtn', function () {
              if (typeof window !== 'undefined' && typeof window.hitungKaffarah === 'function') window.hitungKaffarah();
            });
            bind('copyKaffarahJimaBtn', function () {
              if (typeof window !== 'undefined' && typeof window.copyHasil === 'function') window.copyHasil();
            });
            bind('shareKaffarahJimaBtn', function () {
              if (typeof window !== 'undefined' && typeof window.shareWhatsapp === 'function') window.shareWhatsapp();
            });
            bind('resetKaffarahJimaBtn', function () {
              if (typeof window !== 'undefined' && typeof window.resetKaffarah === 'function') window.resetKaffarah();
            });
          })();
        `}
      </Script>
      <Script
        src="/js/kaffarah-fidyah-i18n.js"
        strategy="afterInteractive"
      />
      <Script src="/js/auth.js" strategy="afterInteractive" />
      <Script src="/js/access-guard.js" strategy="afterInteractive" />
    </>
  );
}