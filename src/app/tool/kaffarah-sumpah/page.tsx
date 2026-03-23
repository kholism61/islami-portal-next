"use client";

import Link from "next/link";

import Image from "next/image";

import KfiScope from "@/components/kaffarah/KfiScope";
import ScrollToTopButton from "@/components/fiqh/ScrollToTopButton";

import "./kaffarah-sumpah.css";

import { useMemo, useState } from "react";

export default function KalkulatorKaffarahSumpahPage() {
  const [jumlah, setJumlah] = useState<number>(0);
  const [harga, setHarga] = useState<number>(0);

  const computed = useMemo(() => {
    if (!jumlah || jumlah <= 0) {
      return {
        orangMiskin: 0,
        total: 0,
        hasil: "Hasil perhitungan akan muncul di sini.",
        analisis: "Analisis akan muncul setelah perhitungan."
      };
    }

    const orangMiskin = jumlah * 10;
    const total = orangMiskin * (harga || 0);
    const formatRupiah = (angka: number) =>
      "Rp " + Number(angka || 0).toLocaleString("id-ID");

    const hasil = `
Total Kaffarah

${jumlah} sumpah

10 orang miskin × ${jumlah}

= ${orangMiskin} orang miskin

Estimasi biaya

${orangMiskin} × ${formatRupiah(harga)}

= ${formatRupiah(total)}

Alternatif kaffarah

Puasa 3 hari
`;

    const analisis = `
Orang ini melanggar sumpah sebanyak ${jumlah} kali.

Menurut fiqh:

1. Memberi makan 10 orang miskin
2. Memberi pakaian 10 orang miskin
3. Memerdekakan budak

Jika tidak mampu:

Puasa 3 hari.

Dalil:

لَا يُؤَاخِذُكُمُ اللَّهُ بِاللَّغْوِ فِي أَيْمَانِكُمْ
وَلَٰكِنْ يُؤَاخِذُكُمْ بِمَا عَقَّدتُّمُ الْأَيْمَانَ

(QS Al-Maidah: 89)
`;

    return {
      orangMiskin,
      total,
      hasil,
      analisis
    };
  }, [jumlah, harga]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(computed.hasil);
      alert("Hasil berhasil disalin");
    } catch {
      alert("Hasil berhasil disalin");
    }
  };

  const handleShare = () => {
    const url = "https://wa.me/?text=" + encodeURIComponent(computed.hasil);
    window.open(url, "_blank");
  };

  const handleReset = () => {
    setJumlah(0);
    setHarga(0);
  };

  const handleHitung = () => {
    if (!jumlah || jumlah <= 0) {
      alert("Masukkan jumlah sumpah.");
      return;
    }
  };

  return (
    <>
      <KfiScope bodyClass="tool-kaffarah-sumpah" />
      <link rel="preload" as="style" href="/css/kaffarah-shared.css?v=20260323" />
      <link rel="stylesheet" href="/css/kaffarah-shared.css?v=20260323" />
      <header className="navbar">
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

          <nav>
            <Link href="/">Beranda</Link>
            <Link href="/kaffarah">Kaffarah &amp; Fidyah</Link>
            <Link href="/about">Tentang</Link>
            <Link href="/kontak">Kontak</Link>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="kfi-hero-shell">
          <span className="kfi-hero-badge" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M9.2 20v-7.3c0-.9.7-1.6 1.6-1.6h.2V5.8c0-1 .8-1.8 1.8-1.8s1.8.8 1.8 1.8v3.6h.5c1 0 1.9.8 1.9 1.9V20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9.2 12.2 7.8 11a1.8 1.8 0 0 0-2.6.2 1.8 1.8 0 0 0 .2 2.6l2.5 2.2c.8.7 1.3 1.7 1.3 2.8V20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>

          <div className="kfi-hero-copy">
            <h1>Kalkulator Kaffarah Sumpah</h1>

            <p>Kaffarah bagi orang yang melanggar sumpah</p>
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
              value={jumlah ? String(jumlah) : ""}
              onChange={(e) => {
                const next = parseInt(e.target.value, 10);
                setJumlah(Number.isFinite(next) ? next : 0);
              }}
            />
          </div>

          <div className="form-group">
            <label>Harga makanan per orang (Rp)</label>
            <input
              type="number"
              id="hargaSumpah"
              placeholder="contoh: 15000"
              value={harga ? String(harga) : ""}
              onChange={(e) => {
                const next = parseInt(e.target.value, 10);
                setHarga(Number.isFinite(next) ? next : 0);
              }}
            />
          </div>

          <div className="harga-preset">
            <button
              className="harga-btn"
              onClick={() => setHarga(10000)}
            >
              10k
            </button>

            <button
              className="harga-btn"
              onClick={() => setHarga(15000)}
            >
              15k
            </button>

            <button
              className="harga-btn"
              onClick={() => setHarga(20000)}
            >
              20k
            </button>

            <button
              className="harga-btn"
              onClick={() => setHarga(25000)}
            >
              25k
            </button>
          </div>

          <button
            className="btn-hitung"
            type="button"
            onClick={handleHitung}
          >
            Hitung Kaffarah
          </button>

          <div className="stats">
            <div className="stat-box">
              <p>Sumpah</p>
              <h2 id="statSumpah">{jumlah}</h2>
            </div>

            <div className="stat-box">
              <p>Orang Miskin</p>
              <h2 id="statMiskin">{computed.orangMiskin}</h2>
            </div>
          </div>

          <div className="hasil-box" id="hasilSumpah">
            {computed.hasil}
          </div>

          <div className="analisis-box">
            <h2>Analisis Fiqh</h2>

            <div id="analisisSumpah">
              {computed.analisis}
            </div>
          </div>

          <div className="actions">
            <button type="button" onClick={handleCopy}>
              Salin Hasil
            </button>

            <button type="button" onClick={handleShare}>
              Bagikan WhatsApp
            </button>

            <button type="button" onClick={handleReset}>
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
              dan panduan ibadah berbasis Al-Qur'an dan Sunnah.
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

        <div className="footer-bottom">&copy; 2026 Portal Literasi Islam</div>
      </footer>

      <ScrollToTopButton />
    </>
  );
}