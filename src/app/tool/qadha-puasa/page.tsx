"use client";

import Link from "next/link";

import Image from "next/image";

import KfiScope from "@/components/kaffarah/KfiScope";
import ScrollToTopButton from "@/components/fiqh/ScrollToTopButton";

import "./qadha-puasa.css";

import { useMemo, useState } from "react";

export default function KalkulatorQadhaPuasaPage() {
  const [hari, setHari] = useState<number>(0);

  const computed = useMemo(() => {
    const safeHari = Number.isFinite(hari) ? hari : 0;
    return {
      hasilHari: safeHari > 0 ? safeHari : 0,
      estimasiHari: safeHari > 0 ? safeHari : 0
    };
  }, [hari]);

  const validate = () => {
    if (!hari) {
      alert("Masukkan jumlah hari puasa");
      return false;
    }
    if (hari <= 0) {
      alert("Jumlah hari harus lebih dari 0");
      return false;
    }
    if (hari > 30) {
      alert("Jumlah hari tidak boleh lebih dari 30");
      return false;
    }
    return true;
  };

  const handleHitung = () => {
    validate();
  };

  const handleReset = () => {
    setHari(0);
  };

  const handleShare = () => {
    const days = computed.hasilHari;
    const text = `Saya memiliki ${days} hari qadha puasa yang harus diganti. Dihitung menggunakan Kalkulator Fiqh di Portal Literasi Islam.`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <KfiScope bodyClass="tool-qadha-puasa" />
      <link rel="preload" as="style" href="/css/kaffarah-shared.css" />
      <link rel="stylesheet" href="/css/kaffarah-shared.css" />
      <nav className="navbar">
        <div className="nav-container">
          <Link href="/" className="logo" aria-label="Portal Literasi Islam">
            <span className="logo-mark" aria-hidden="true">
              <Image
                src="/assets/images/logo.png"
                alt=""
                className="logo-icon"
                width={32}
                height={32}
                priority
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
              <Link href="/kaffarah">Kaffarah &amp; Fidyah</Link>
            </li>
          </ul>
        </div>
      </nav>

      <section className="hero">
        <div className="kfi-hero-shell">
          <span className="kfi-hero-badge" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="5" y="6" width="14" height="13" rx="3" stroke="currentColor" strokeWidth="1.8" />
              <path d="M8 4.5v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M16 4.5v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M5 10h14" stroke="currentColor" strokeWidth="1.8" />
              <path d="M9 13.2h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M10.5 16h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>

          <div className="kfi-hero-copy">
            <h1>Kalkulator Qadha Puasa</h1>

            <p>
              Hitung jumlah hari puasa Ramadhan yang harus diganti (qadha) dengan
              mudah sesuai fiqh.
            </p>
          </div>
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
              value={hari ? String(hari) : ""}
              onChange={(e) => {
                const next = parseInt(e.target.value, 10);
                setHari(Number.isFinite(next) ? next : 0);
              }}
            />

            <button type="button" onClick={handleHitung}>
              Hitung Qadha
            </button>

            <button
              onClick={handleReset}
              className="reset-btn"
              type="button"
            >
              Reset
            </button>

            <button type="button" onClick={handleShare}>
              Bagikan WhatsApp
            </button>
          </div>

          <div className="result-grid">
            <div className="result-card">
              <span>Hari Qadha</span>

              <h3 id="hasilHari">{computed.hasilHari}</h3>
            </div>

            <div className="result-card">
              <span>Estimasi selesai (hari)</span>

              <h3 id="estimasiHari">{computed.estimasiHari}</h3>
            </div>
          </div>

          <section className="guide-section">
            <div className="guide-header">
              <span className="guide-badge">PANDUAN PRAKTIS</span>

              <h3>Panduan Singkat Qadha Puasa</h3>

              <p>
                Penjelasan ini membantu memahami kapan qadha dilakukan, kapan
                sebaiknya segera ditunaikan, dan hal penting yang perlu
                diperhatikan.
              </p>
            </div>

            <div className="guide-grid">
              <div className="guide-card">
                <h4>Kapan wajib qadha?</h4>
                <p>
                  Qadha diwajibkan bagi muslim yang meninggalkan puasa Ramadhan
                  karena uzur seperti sakit, safar, haid, nifas, atau sebab syar'i
                  lain yang mewajibkan pengganti di hari berbeda.
                </p>
              </div>

              <div className="guide-card">
                <h4>Kapan sebaiknya ditunaikan?</h4>
                <p>
                  Qadha sebaiknya segera ditunaikan setelah uzur selesai agar
                  tanggungan ibadah cepat lunas dan tidak menumpuk sampai Ramadhan
                  berikutnya.
                </p>
              </div>

              <div className="guide-card">
                <h4>Catatan penting</h4>
                <p>
                  Bila qadha ditunda tanpa uzur hingga masuk Ramadhan berikutnya,
                  sebagian ulama mewajibkan qadha disertai fidyah. Untuk kasus
                  khusus, tetap rujuk kepada ustaz atau guru fiqh terpercaya.
                </p>
              </div>
            </div>

            <div className="guide-footer">
              <p>Allah berfirman:</p>

              <blockquote>
                &quot;Barang siapa sakit atau dalam perjalanan, maka wajib mengganti
                pada hari yang lain.&quot;
                <br />
                <br />
                (QS Al-Baqarah: 184)
              </blockquote>
            </div>
          </section>
        </div>
      </section>

      <section className="pre-footer">
        <div className="pre-footer-grid">
          <div className="pf-box">
            <h3>Portal Literasi Islam</h3>

            <p>
              Website ini menyediakan kalkulator fiqh wanita, mawaris, dan
              berbagai alat bantu fiqh berbasis mazhab Syafi'i.
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

        <div className="footer-bottom">
          <p>&copy; 2026 Portal Literasi Islam - Seluruh hak cipta dilindungi.</p>
        </div>
      </footer>

      <ScrollToTopButton />
    </>
  );
}