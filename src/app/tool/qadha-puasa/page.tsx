"use client";

import Link from "next/link";
import Script from "next/script";

export default function KalkulatorQadhaPuasaPage() {
  return (
    <>
      <link rel="stylesheet" href="/tool/qadha-puasa.css" />

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
              <Link href="/nifas">Kalkulator Nifas</Link>
            </li>

            <li>
              <Link href="/suci">Masa Suci</Link>
            </li>

            <li>
              <Link href="/kaffarah">Kaffarah &amp; Fidyah</Link>
            </li>
          </ul>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h1>📅 Kalkulator Qadha Puasa</h1>

          <p>
            Hitung jumlah hari puasa Ramadhan yang harus diganti (qadha) dengan
            mudah sesuai fiqh.
          </p>

          <div className="hero-line"></div>
        </div>
      </section>

      <section className="calculator-section">
        <div className="container">
          <div className="calc-card">
            <h2>Perhitungan Qadha Puasa</h2>

            <label>Jumlah hari puasa yang ditinggalkan</label>

            <input
              type="number"
              id="hariPuasa"
              min="1"
              max="30"
              required
              placeholder="contoh: 5"
            />

            <button onClick={() => (window as any).hitungQadha?.()}>
              Hitung Qadha
            </button>

            <button
              onClick={() => (window as any).resetQadha?.()}
              className="reset-btn"
            >
              Reset
            </button>

            <button onClick={() => (window as any).shareWhatsApp?.()}>
              Bagikan WhatsApp
            </button>
          </div>

          <div className="result-grid">
            <div className="result-card">
              <span>Hari Qadha</span>

              <h3 id="hasilHari">0</h3>
            </div>

            <div className="result-card">
              <span>Estimasi selesai (hari)</span>

              <h3 id="estimasiHari">0</h3>
            </div>
          </div>

          <div className="info-box">
            <h3>Penjelasan Fiqh</h3>

            <p>
              Qadha puasa wajib bagi orang yang meninggalkan puasa Ramadhan
              karena uzur syar&apos;i seperti sakit atau safar.
            </p>

            <p>Allah berfirman:</p>

            <blockquote>
              &quot;Barang siapa sakit atau dalam perjalanan, maka wajib
              mengganti pada hari yang lain.&quot;
              <br />
              <br />
              (QS Al-Baqarah: 184)
            </blockquote>
          </div>
        </div>
      </section>

      <section className="pre-footer">
        <div className="pre-footer-grid">
          <div className="pf-box">
            <h3>Portal Literasi Islam</h3>

            <p>
              Website ini menyediakan kalkulator fiqh wanita, mawaris, dan
              berbagai alat bantu fiqh berbasis mazhab Syafi&apos;i.
            </p>
          </div>

          <div className="pf-box">
            <h3>Fitur</h3>

            <ul>
              <li>Kalkulator Haid</li>
              <li>Kalkulator Mawaris</li>
              <li>Fiqh Wanita</li>
              <li>Artikel Fiqh</li>
            </ul>
          </div>

          <div className="pf-box">
            <h3>Referensi</h3>

            <ul>
              <li>Kifayatul Akhyar</li>
              <li>Fathul Qarib</li>
              <li>Al-Ibanah Wal Ifadhah</li>
              <li>Tuhfatul Muhtaj</li>
            </ul>
          </div>
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
      </footer>

      <div className="footer-bottom">
        <p>© 2026 Portal Literasi Islam — Seluruh hak cipta dilindungi.</p>
      </div>

      <Script src="/tool/qadha-puasa.js" strategy="afterInteractive" />
      <Script
        src="/js/kaffarah-fidyah-i18n.js"
        strategy="afterInteractive"
      />
      <Script src="/js/auth.js" strategy="afterInteractive" />
      <Script src="/js/access-guard.js" strategy="afterInteractive" />
    </>
  );
}