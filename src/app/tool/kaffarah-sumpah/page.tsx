"use client";

import Link from "next/link";
import Script from "next/script";

export default function KalkulatorKaffarahSumpahPage() {
  return (
    <>
      <link rel="stylesheet" href="/tool/kaffarah-sumpah.css" />

      <header className="navbar">
        <div className="nav-container">
          <div className="logo">Portal Literasi Islam</div>

          <nav>
            <Link href="/">Beranda</Link>
            <Link href="/kaffarah">Kalkulator Fiqh</Link>
            <Link href="/about">Tentang</Link>
            <Link href="/kontak">Kontak</Link>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>Portal Literasi Islam</h1>

          <p>
            Kalkulator fiqh modern: zakat, mawaris, fidyah, kaffarah, dan
            panduan ibadah berbasis dalil.
          </p>

          <div className="hero-buttons">
            <Link href="/kaffarah" className="btn-primary">
              Gunakan Kalkulator
            </Link>

            <Link href="/" className="btn-secondary">
              Baca Artikel
            </Link>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="card">
          <h1>Perhitungan Kaffarah Sumpah</h1>

          <div className="form-group">
            <label>Jumlah sumpah yang dilanggar</label>
            <input
              type="number"
              id="jumlahSumpah"
              placeholder="contoh: 2"
            />
          </div>

          <div className="form-group">
            <label>Harga makanan per orang (Rp)</label>
            <input
              type="number"
              id="hargaSumpah"
              placeholder="contoh: 15000"
            />
          </div>

          <div className="harga-preset">
            <button
              className="harga-btn"
              onClick={() => (window as any).setHargaSumpah?.(10000)}
            >
              10k
            </button>

            <button
              className="harga-btn"
              onClick={() => (window as any).setHargaSumpah?.(15000)}
            >
              15k
            </button>

            <button
              className="harga-btn"
              onClick={() => (window as any).setHargaSumpah?.(20000)}
            >
              20k
            </button>

            <button
              className="harga-btn"
              onClick={() => (window as any).setHargaSumpah?.(25000)}
            >
              25k
            </button>
          </div>

          <button
            className="btn-hitung"
            onClick={() => (window as any).hitungSumpah?.()}
          >
            Hitung Kaffarah
          </button>

          <div className="stats">
            <div className="stat-box">
              <p>Sumpah</p>
              <h2 id="statSumpah">0</h2>
            </div>

            <div className="stat-box">
              <p>Orang Miskin</p>
              <h2 id="statMiskin">0</h2>
            </div>
          </div>

          <div className="hasil-box" id="hasilSumpah">
            Hasil perhitungan akan muncul di sini.
          </div>

          <div className="analisis-box">
            <h2>Analisis Fiqh</h2>

            <div id="analisisSumpah">
              Analisis akan muncul setelah perhitungan.
            </div>
          </div>

          <div className="actions">
            <button onClick={() => (window as any).copyHasil?.()}>
              Salin Hasil
            </button>

            <button onClick={() => (window as any).shareWA?.()}>
              Bagikan WhatsApp
            </button>

            <button onClick={() => (window as any).resetSumpah?.()}>
              Reset
            </button>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-about">
            <h3>Portal Literasi Islam</h3>

            <p>
              Portal edukasi Islam yang menyediakan artikel, kalkulator fiqh,
              dan panduan ibadah berbasis Al-Qur&apos;an dan Sunnah.
            </p>
          </div>

          <div className="footer-links">
            <h4>Menu</h4>

            <Link href="/">Beranda</Link>
            <Link href="/offline">Offline Artikel</Link>
            <Link href="/kaffarah">Kalkulator</Link>
          </div>

          <div className="footer-links">
            <h4>Informasi</h4>

            <Link href="/about">Tentang</Link>
            <Link href="/kontak">Kontak</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </div>
        </div>

        <div className="footer-bottom">© 2026 Portal Literasi Islam</div>
      </footer>

      <Script src="/tool/kaffarah-sumpah.js" strategy="afterInteractive" />
      <Script
        src="/js/kaffarah-fidyah-i18n.js"
        strategy="afterInteractive"
      />
      <Script src="/js/auth.js" strategy="afterInteractive" />
      <Script src="/js/access-guard.js" strategy="afterInteractive" />
    </>
  );
}