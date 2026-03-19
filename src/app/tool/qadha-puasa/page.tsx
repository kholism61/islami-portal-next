"use client";

import Link from "next/link";
import Script from "next/script";

import "./qadha-puasa.css";

import { useEffect, useMemo, useState } from "react";

export default function KalkulatorQadhaPuasaPage() {
  const [hari, setHari] = useState<number>(0);

  useEffect(() => {
    document.body.classList.add("tool-qadha-puasa");
    document.body.classList.add("kfi-scope");
    const ensureI18n = () => {
      if ((window as any).__kfiMaybeApply) return;
      if (document.getElementById("kfi-i18n-script")) return;
      const script = document.createElement("script");
      script.id = "kfi-i18n-script";
      script.src = "/js/kaffarah-fidyah-i18n.js";
      script.async = true;
      script.onload = () => (window as any).__kfiMaybeApply?.();
      document.body.appendChild(script);
    };

    ensureI18n();
    (window as any).__kfiMaybeApply?.();
    setTimeout(() => {
      ensureI18n();
      (window as any).__kfiMaybeApply?.();
    }, 0);
    setTimeout(() => {
      ensureI18n();
      (window as any).__kfiMaybeApply?.();
    }, 100);
    setTimeout(() => {
      ensureI18n();
      (window as any).__kfiMaybeApply?.();
    }, 500);
    setTimeout(() => {
      ensureI18n();
      (window as any).__kfiMaybeApply?.();
    }, 1200);
    return () => {
      document.body.classList.remove("tool-qadha-puasa");
      document.body.classList.remove("kfi-scope");
    };
  }, []);

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

          <div className="info-box">
            <h3>Penjelasan Fiqh</h3>

            <p>
              Qadha puasa wajib bagi orang yang meninggalkan puasa Ramadhan
              karena uzur syar'i seperti sakit atau safar.
            </p>

            <p>
              Jika seseorang tidak berpuasa karena uzur yang dibenarkan, maka ia
              mengganti (qadha) sejumlah hari yang ditinggalkan pada hari lain
              setelah Ramadhan.
            </p>

            <p>
              Qadha berbeda dengan fidyah. Qadha adalah mengganti puasa, sedangkan
              fidyah adalah memberi makan orang miskin. Dalam sebagian kasus,
              seseorang bisa wajib qadha saja, atau qadha dan fidyah (misalnya
              menunda qadha tanpa uzur hingga masuk Ramadhan berikutnya menurut
              sebagian pendapat dalam mazhab Syafi'i).
            </p>

            <p>
              Disarankan untuk menyegerakan qadha sebelum datang Ramadhan
              berikutnya, agar lebih aman dari khilaf dan lebih menjaga kewajiban.
            </p>

            <p>
              Niat qadha dilakukan di malam hari sebelum terbit fajar, sebagaimana
              puasa wajib pada umumnya.
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
          <p> 2026 Portal Literasi Islam — Seluruh hak cipta dilindungi.</p>
        </div>
      </footer>

      <Script src="/js/kaffarah-fidyah-i18n.js" strategy="afterInteractive" />
      <Script src="/js/auth.js" strategy="afterInteractive" />
      <Script src="/js/access-guard.js" strategy="afterInteractive" />
    </>
  );
}