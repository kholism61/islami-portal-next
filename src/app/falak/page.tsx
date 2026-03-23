import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Belajar Ilmu Falak | Portal Literasi Islam",
  description:
    "Modul pembelajaran interaktif ilmu falak: arah kiblat, waktu shalat, dan kalender hijriyah.",
};

export default function FalakPage() {
  return (
    <>
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <link rel="stylesheet" href="/css/falak.css?v=20260323c" />

      <div className="falak-page">
        {/* NAVBAR */}
        <nav className="falak-nav">
          <div className="falak-nav-inner">
            <Link href="/" className="falak-brand">
              <img className="falak-brand-icon" src="/favicon.ico" alt="" />
              <span className="falak-brand-text">
                Portal Literasi Islam
              </span>
            </Link>

            <div className="falak-nav-center">
              <Link href="/" className="falak-nav-home">
                Beranda
              </Link>

              <div className="falak-nav-links">
                <Link href="/ramadhan">Jadwal Imsakiyah</Link>
              </div>
            </div>

            <div className="falak-lang">
              <button className="falak-lang-btn active" data-lang="id">ID</button>
              <button className="falak-lang-btn" data-lang="en">EN</button>
              <button className="falak-lang-btn" data-lang="ar">AR</button>
            </div>
          </div>
        </nav>

        {/* HERO */}
        <header className="falak-hero">
          <h1>Belajar Ilmu Falak</h1>

          <p className="falak-hero-desc">
            Modul pembelajaran interaktif ilmu falak: dari pengenalan dasar
            hingga simulasi praktis arah kiblat, waktu shalat, dan kalender
            hijriyah.
          </p>

          <nav className="falak-quick-nav">
            <a href="#gambar-api">Gambar & Peta</a>
            <a href="#topik">Topik</a>
            <a href="#simulasi">Simulasi</a>
            <a href="#istilah">Istilah</a>
          </nav>
        </header>

        <main className="falak-main">

          {/* PENGANTAR */}
          <section className="falak-section">
            <h2 className="falak-section-title">
              <span>📚</span> Pengantar Ilmu Falak
            </h2>

            <div className="falak-intro-card">
              <p>
                Ilmu falak adalah cabang ilmu yang mempelajari gerakan benda
                langit untuk keperluan ibadah dan penentuan waktu dalam Islam.
              </p>

              <p>
                Ilmu ini digunakan untuk menentukan waktu shalat, arah kiblat,
                penetapan awal bulan hijriyah, serta hisab hilal.
              </p>

              <div className="falak-intro-grid">
                <div className="falak-intro-item">
                  <span>🕌</span> Waktu Shalat
                </div>

                <div className="falak-intro-item">
                  <span>🧭</span> Arah Kiblat
                </div>

                <div className="falak-intro-item">
                  <span>📅</span> Kalender Hijriyah
                </div>

                <div className="falak-intro-item">
                  <span>🌙</span> Hisab Hilal
                </div>
              </div>
            </div>
          </section>

          {/* TOPIK */}
          <section className="falak-section" id="topik">
            <h2 className="falak-section-title">
              <span>🧩</span> Topik Pembelajaran
            </h2>

            <p className="falak-section-desc">
              Pilih salah satu topik untuk melihat ringkasan singkat.
            </p>

            <div className="falak-topik-grid">
              <button className="falak-topik-card" data-accordion="qibla">
                <div className="falak-topik-icon">🧭</div>
                <h3>Arah Kiblat</h3>
                <p>Menentukan arah Ka'bah dari lokasi manapun.</p>
              </button>

              <button className="falak-topik-card" data-accordion="shalat">
                <div className="falak-topik-icon">🕌</div>
                <h3>Waktu Shalat</h3>
                <p>Penentuan waktu shalat berdasarkan posisi Matahari.</p>
              </button>

              <button className="falak-topik-card" data-accordion="kalender">
                <div className="falak-topik-icon">📅</div>
                <h3>Kalender Hijriyah</h3>
                <p>Sistem penanggalan lunar dalam Islam.</p>
              </button>

              <button className="falak-topik-card" data-accordion="hilal">
                <div className="falak-topik-icon">🌙</div>
                <h3>Hisab Hilal</h3>
                <p>Perhitungan hilal untuk penetapan awal bulan.</p>
              </button>

              <button className="falak-topik-card" data-accordion="gerhana">
                <div className="falak-topik-icon">🌑</div>
                <h3>Gerhana</h3>
                <p>Fenomena gerhana dan shalat kusuf/khusuf.</p>
              </button>
            </div>

            <div className="falak-accordion-wrapper" id="accordionWrapper" />
          </section>

          {/* API NASA + MAP */}
          <section className="falak-section" id="gambar-api">
            <h2 className="falak-section-title">
              <span>🖼️</span> Gambar Astronomi & Peta
            </h2>

            <div className="falak-api-grid">
              <div className="falak-apod-card">
                <h4 id="falak-apod-title">
                  Gambar Astronomi Hari Ini
                </h4>

                <div id="falak-apod-wrap">
                  <img className="falak-apod-img" src="" alt="" />
                  <p className="falak-apod-caption"></p>
                </div>

                <small>Sumber: NASA APOD</small>
              </div>

              <div className="falak-map-card">
                <h4>Peta Dunia - Lokasi Ka'bah</h4>

                <div
                  id="falak-map"
                  className="falak-map-container"
                ></div>
              </div>
            </div>
          </section>

          {/* SIMULASI */}
          <section className="falak-section" id="simulasi">
            <h2 className="falak-section-title">
              <span>🛠️</span> Simulasi Falak
            </h2>

            <div className="falak-tools-grid">

              {/* QIBLA */}
              <div className="falak-tool-card">
                <h3>🧭 Kalkulator Arah Kiblat</h3>

                <input
                  type="text"
                  id="qibla-lat"
                  placeholder="Latitude"
                />

                <input
                  type="text"
                  id="qibla-lon"
                  placeholder="Longitude"
                />

                <button
                  className="falak-btn falak-btn-primary"
                  id="qibla-calc"
                >
                  Hitung
                </button>

                <div id="qibla-result"></div>
              </div>

              {/* HIJRI */}
              <div className="falak-tool-card">
                <h3>📅 Konversi Hijriyah</h3>

                <select id="hijri-mode" defaultValue="g2h">
                  <option value="g2h">Masehi → Hijriyah</option>
                  <option value="h2g">Hijriyah → Masehi</option>
                </select>

                <input
                  type="number"
                  id="hijri-day"
                  placeholder="Tanggal"
                />

                <input
                  type="number"
                  id="hijri-month"
                  placeholder="Bulan"
                />

                <input
                  type="number"
                  id="hijri-year"
                  placeholder="Tahun"
                />

                <button
                  className="falak-btn falak-btn-primary"
                  id="hijri-calc"
                >
                  Konversi
                </button>

                <div id="hijri-result"></div>
              </div>

              {/* SHALAT */}
              <div className="falak-tool-card">
                <h3>⏰ Jadwal Shalat</h3>

                <button
                  className="falak-btn falak-btn-primary"
                  id="shalat-calc"
                >
                  Tampilkan Jadwal
                </button>

                <div id="shalat-result"></div>
              </div>

            </div>
          </section>

          {/* ISTILAH */}
          <section className="falak-section" id="istilah">
            <h2 className="falak-section-title">
              <span>📋</span> Istilah Penting Falak
            </h2>

            <div className="falak-glossary">

              <div className="falak-glossary-card">
                <b>Zenith</b>
                <span>Titik tepat di atas kepala pengamat.</span>
              </div>

              <div className="falak-glossary-card">
                <b>Azimuth</b>
                <span>Sudut dari utara ke arah horizontal.</span>
              </div>

              <div className="falak-glossary-card">
                <b>Ijtima</b>
                <span>Konjungsi bulan dan matahari.</span>
              </div>

            </div>
          </section>
        </main>

        {/* PRE FOOTER */}
        <section className="falak-prefooter">
          <div className="falak-prefooter-inner">
            <div>
              <h4>Portal Literasi Islam</h4>
              <p>
                Kajian Islam berbasis literatur dan analisis ilmiah.
              </p>
            </div>

            <div>
              <h4>Tools</h4>
              <ul>
                <li>
                  <Link href="/zakat">Kalkulator Zakat</Link>
                </li>
                <li>
                  <Link href="/ramadhan">Jadwal Imsakiyah</Link>
                </li>
                <li>
                  <Link href="/falak">Belajar Falak</Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="falak-footer">
          <div className="falak-footer-links">
            <Link href="/about">Tentang</Link>
            <Link href="/kontak">Kontak</Link>
            <Link href="/faq">FAQ</Link>
          </div>

          <div className="falak-footer-copy">
            &copy; 2026 Portal Literasi Islam
          </div>
        </footer>
      </div>

      <Script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        strategy="afterInteractive"
      />

      <Script src="/js/falak-api.js?v=20260323c" strategy="afterInteractive" />
      <Script src="/js/falak.js?v=20260323c" strategy="afterInteractive" />
    </>
  );
}