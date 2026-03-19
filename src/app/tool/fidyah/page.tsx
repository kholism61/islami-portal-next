import Head from "next/head";
import Link from "next/link";
import Script from "next/script";

export default function KalkulatorFidyahPage() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Kalkulator Fidyah</title>
        <link rel="stylesheet" href="/tool/fidyah.css" />
      </Head>

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
              <Link href="/kaffarah">Kaffarah &amp; Fidyah</Link>
            </li>
          </ul>
        </div>
      </nav>

      <section className="hero-fidyah">
        <div className="hero-content">
          <h1>🔴 Kalkulator Fidyah Puasa</h1>

          <p>
            Hitung kewajiban fidyah secara praktis sesuai fiqh. Masukkan jumlah
            hari puasa yang ditinggalkan untuk mengetahui kewajiban fidyah yang
            harus dibayarkan.
          </p>
        </div>
      </section>

      <section className="fidyah-section">
        <div className="fidyah-card">
          <h2>Perhitungan Fidyah</h2>

          <div className="form-group">
            <label>Jumlah hari tidak puasa</label>

            <input
              type="number"
              id="hariFidyah"
              placeholder="contoh: 10"
            />
          </div>

          <div className="form-group">
            <label>Harga makanan per hari (Rp)</label>

            <input
              type="number"
              id="hargaFidyah"
              placeholder="contoh: 25000"
            />
          </div>

          <div className="harga-preset">
            <button id="harga10kBtn" type="button">
              10k
            </button>

            <button id="harga15kBtn" type="button">
              15k
            </button>

            <button id="harga20kBtn" type="button">
              20k
            </button>

            <button id="harga25kBtn" type="button">
              25k
            </button>
          </div>

          <div className="form-group">
            <label>Metode pembayaran</label>

            <select id="metodeFidyah">
              <option value="uang">Uang</option>

              <option value="beras">Beras</option>
            </select>
          </div>

          <button
            className="btn-reset"
            id="resetFidyahBtn"
            type="button"
          >
            Reset
          </button>

          <div className="stat-fidyah">
            <div>
              <span>Total Hari</span>
              <strong id="statHari">0</strong>
            </div>

            <div>
              <span>Total Fidyah</span>
              <strong id="statTotal">0</strong>
            </div>
          </div>

          <div id="hasilFidyah" className="hasil-box">
            Hasil perhitungan akan muncul di sini.
          </div>

          <div className="analisis-fiqh">
            <h3>Analisis Fiqh</h3>

            <div id="analisisFidyah">
              Analisis akan muncul setelah perhitungan.
            </div>
          </div>

          <div id="fiqhFidyah" className="fiqh-box">
            Penjelasan fiqh akan muncul di sini.
          </div>
        </div>
      </section>

      <section className="pre-footer">
        <h2>Portal Fiqh Digital</h2>

        <p>
          Portal ini menyediakan berbagai kalkulator fiqh untuk membantu
          memahami hukum Islam secara praktis.
        </p>

        <div className="tools-shortcut">
          <Link href="/zakat" className="tool-btn">
            Zakat
          </Link>

          <Link href="/tools/mawaris" className="tool-btn">
            Mawaris
          </Link>

          <Link href="/haid" className="tool-btn">
            Fiqh Wanita
          </Link>

          <Link href="/kaffarah" className="tool-btn">
            Kaffarah
          </Link>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-links">
          <Link href="/about">Tentang</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/kontak">Kontak</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/disclaimer">Disclaimer</Link>
        </div>

        <p>© 2026 Portal Literasi Islam – Seluruh hak cipta dilindungi.</p>
      </footer>

      <Script src="/tool/fidyah.js" strategy="afterInteractive" />
      <Script id="fidyah-bind" strategy="afterInteractive">
        {`
          (function () {
            function bind(id, fn) {
              var el = document.getElementById(id);
              if (!el) return;
              if (el.dataset.bound) return;
              el.dataset.bound = '1';
              el.addEventListener('click', function () {
                try { fn(); } catch (e) {}
              });
            }

            bind('harga10kBtn', function () {
              if (typeof window !== 'undefined' && typeof window.setHarga === 'function') window.setHarga(10000);
            });
            bind('harga15kBtn', function () {
              if (typeof window !== 'undefined' && typeof window.setHarga === 'function') window.setHarga(15000);
            });
            bind('harga20kBtn', function () {
              if (typeof window !== 'undefined' && typeof window.setHarga === 'function') window.setHarga(20000);
            });
            bind('harga25kBtn', function () {
              if (typeof window !== 'undefined' && typeof window.setHarga === 'function') window.setHarga(25000);
            });
            bind('resetFidyahBtn', function () {
              if (typeof window !== 'undefined' && typeof window.resetFidyah === 'function') window.resetFidyah();
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