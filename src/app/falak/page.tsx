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
              <span className="falak-brand-text" data-i18n="brand_portal">
                Portal Literasi Islam
              </span>
            </Link>

            <div className="falak-nav-center">
              <Link href="/" className="falak-nav-home">
                <span data-i18n="nav_home">Beranda</span>
              </Link>

              <div className="falak-nav-links">
                <Link href="/ramadhan">
                  <span data-i18n="nav_ramadhan">Jadwal Imsakiyah</span>
                </Link>
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
          <h1 data-i18n="hero_title">Belajar Ilmu Falak</h1>

          <p className="falak-hero-desc" data-i18n="hero_desc">
            Modul pembelajaran interaktif ilmu falak: dari pengenalan dasar
            hingga simulasi praktis arah kiblat, waktu shalat, dan kalender
            hijriyah.
          </p>

          <nav className="falak-quick-nav">
            <a href="#gambar-api" data-i18n="quick_gambar">Gambar & Peta</a>
            <a href="#topik" data-i18n="quick_topik">Topik</a>
            <a href="#simulasi" data-i18n="quick_simulasi">Simulasi</a>
            <a href="#istilah" data-i18n="quick_istilah">Istilah</a>
          </nav>
        </header>

        <main className="falak-main">

          {/* PENGANTAR */}
          <section className="falak-section">
            <h2 className="falak-section-title">
              <span>📚</span> <span data-i18n="section1_title">Pengantar Ilmu Falak</span>
            </h2>

            <div className="falak-intro-card">
              <p data-i18n="intro_p1">
                Ilmu falak adalah cabang ilmu yang mempelajari gerakan benda
                langit untuk keperluan ibadah dan penentuan waktu dalam Islam.
              </p>

              <p data-i18n="intro_p2">
                Ilmu ini digunakan untuk menentukan waktu shalat, arah kiblat,
                penetapan awal bulan hijriyah, serta hisab hilal.
              </p>

              <div className="falak-intro-grid">
                <div className="falak-intro-item">
                  <span>🕌</span> <span data-i18n="intro_role1">Waktu Shalat</span>
                </div>

                <div className="falak-intro-item">
                  <span>🧭</span> <span data-i18n="intro_role2">Arah Kiblat</span>
                </div>

                <div className="falak-intro-item">
                  <span>📅</span> <span data-i18n="intro_role3">Kalender Hijriyah</span>
                </div>

                <div className="falak-intro-item">
                  <span>🌙</span> <span data-i18n="intro_role4">Hisab Hilal</span>
                </div>
              </div>
            </div>
          </section>

          {/* TOPIK */}
          <section className="falak-section" id="topik">
            <h2 className="falak-section-title">
              <span>🧩</span> <span data-i18n="section2_title">Topik Pembelajaran</span>
            </h2>

            <p className="falak-section-desc" data-i18n="section2_desc">
              Pilih salah satu topik untuk melihat ringkasan singkat.
            </p>

            <div className="falak-topik-grid">
              <button className="falak-topik-card" data-accordion="qibla">
                <div className="falak-topik-icon">🧭</div>
                <h3 data-i18n="topik1_title">Arah Kiblat</h3>
                <p data-i18n="topik1_desc">Menentukan arah Ka'bah dari lokasi manapun.</p>
              </button>

              <button className="falak-topik-card" data-accordion="shalat">
                <div className="falak-topik-icon">🕌</div>
                <h3 data-i18n="topik2_title">Waktu Shalat</h3>
                <p data-i18n="topik2_desc">Penentuan waktu shalat berdasarkan posisi Matahari.</p>
              </button>

              <button className="falak-topik-card" data-accordion="kalender">
                <div className="falak-topik-icon">📅</div>
                <h3 data-i18n="topik3_title">Kalender Hijriyah</h3>
                <p data-i18n="topik3_desc">Sistem penanggalan lunar dalam Islam.</p>
              </button>

              <button className="falak-topik-card" data-accordion="hilal">
                <div className="falak-topik-icon">🌙</div>
                <h3 data-i18n="topik4_title">Hisab Hilal</h3>
                <p data-i18n="topik4_desc">Perhitungan hilal untuk penetapan awal bulan.</p>
              </button>

              <button className="falak-topik-card" data-accordion="gerhana">
                <div className="falak-topik-icon">🌑</div>
                <h3 data-i18n="topik5_title">Gerhana</h3>
                <p data-i18n="topik5_desc">Fenomena gerhana dan shalat kusuf/khusuf.</p>
              </button>
            </div>

            <div className="falak-accordion-wrapper" id="accordionWrapper" />
          </section>

          {/* API NASA + MAP */}
          <section className="falak-section" id="gambar-api">
            <h2 className="falak-section-title">
              <span>🖼️</span> <span data-i18n="section_gambar_title">Gambar Astronomi & Peta</span>
            </h2>

            <div className="falak-api-grid">
              <div className="falak-apod-card">
                <h4 id="falak-apod-title" data-i18n="apod_title">Gambar Astronomi Hari Ini</h4>

                <div id="falak-apod-wrap">
                  <img className="falak-apod-img" src="" alt="" />
                  <p className="falak-apod-caption"></p>
                </div>

                <small data-i18n="apod_source">Sumber: NASA APOD</small>
              </div>

              <div className="falak-map-card">
                <h4 data-i18n="map_title">Peta Dunia - Lokasi Ka'bah</h4>

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
              <span>🛠️</span> <span data-i18n="section3_title">Simulasi Falak</span>
            </h2>

            <p className="falak-section-desc" data-i18n="section3_desc">
              Praktik langsung dengan tools sederhana.
            </p>

            <div className="falak-tools-grid">

              {/* QIBLA */}
              <div className="falak-tool-card">
                <h3>🧭 <span data-i18n="tool1_title">Kalkulator Arah Kiblat</span></h3>

                <input
                  type="text"
                  id="qibla-lat"
                  placeholder="Latitude"
                  data-i18n="tool1_lat"
                />

                <input
                  type="text"
                  id="qibla-lon"
                  placeholder="Longitude"
                  data-i18n="tool1_lon"
                />

                <button
                  className="falak-btn falak-btn-primary"
                  id="qibla-calc"
                  data-i18n="btn_calc"
                >
                  Hitung
                </button>

                <div id="qibla-result"></div>
              </div>

              {/* HIJRI */}
              <div className="falak-tool-card">
                <h3>📅 <span data-i18n="tool2_title">Konversi Hijriyah</span></h3>

                <select id="hijri-mode" defaultValue="g2h">
                  <option value="g2h" data-i18n="tool2_g2h">Masehi → Hijriyah</option>
                  <option value="h2g" data-i18n="tool2_h2g">Hijriyah → Masehi</option>
                </select>

                <input
                  type="number"
                  id="hijri-day"
                  placeholder="Tanggal"
                  data-i18n="tool2_day"
                />

                <input
                  type="number"
                  id="hijri-month"
                  placeholder="Bulan"
                  data-i18n="tool2_month"
                />

                <input
                  type="number"
                  id="hijri-year"
                  placeholder="Tahun"
                  data-i18n="tool2_year"
                />

                <button
                  className="falak-btn falak-btn-primary"
                  id="hijri-calc"
                  data-i18n="btn_convert"
                >
                  Konversi
                </button>

                <div id="hijri-result"></div>
              </div>

              {/* SHALAT */}
              <div className="falak-tool-card">
                <h3>⏰ <span data-i18n="tool3_title">Jadwal Shalat</span></h3>

                <button
                  className="falak-btn falak-btn-primary"
                  id="shalat-calc"
                  data-i18n="tool3_btn"
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
              <span>📋</span> <span data-i18n="section4_title">Istilah Penting Falak</span>
            </h2>

            <div className="falak-glossary">

              <div className="falak-glossary-card">
                <b data-i18n="term_zenith">Zenith</b>
                <span data-i18n="def_zenith">Titik tepat di atas kepala pengamat.</span>
              </div>

              <div className="falak-glossary-card">
                <b data-i18n="term_azimuth">Azimuth</b>
                <span data-i18n="def_azimuth">Sudut dari utara ke arah horizontal.</span>
              </div>

              <div className="falak-glossary-card">
                <b data-i18n="term_ijtima">Ijtima</b>
                <span data-i18n="def_ijtima">Konjungsi bulan dan matahari.</span>
              </div>

            </div>
          </section>
        </main>

        {/* PRE FOOTER */}
        <section className="falak-prefooter">
          <div className="falak-prefooter-inner">
            <div className="falak-prefooter-col">
              <h4 data-i18n="footer_portal">Portal Literasi Islam</h4>
              <p data-i18n="footer_desc">
                Kajian Islam berbasis literatur dan analisis ilmiah.
              </p>
            </div>

            <div className="falak-prefooter-col">
              <h4 data-i18n="footer_tools">Tools</h4>
              <ul>
                <li>
                  <Link href="/zakat">
                    <span data-i18n="footer_zakat">Kalkulator Zakat</span>
                  </Link>
                </li>
                <li>
                  <Link href="/ramadhan">
                    <span data-i18n="footer_ramadhan">Jadwal Imsakiyah</span>
                  </Link>
                </li>
                <li>
                  <Link href="/falak">
                    <span data-i18n="footer_falak">Belajar Falak</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="falak-footer">
          <div className="falak-footer-links">
            <Link href="/about"><span data-i18n="footer_about">Tentang</span></Link>
            <Link href="/kontak"><span data-i18n="footer_contact">Kontak</span></Link>
            <Link href="/faq"><span data-i18n="footer_faq">FAQ</span></Link>
          </div>

          <div className="falak-footer-copy">
            <span data-i18n="footer_copy">&copy; 2026 Portal Literasi Islam</span>
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