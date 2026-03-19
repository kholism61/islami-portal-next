"use client";

import Link from "next/link";
import Script from "next/script";

import "./kaffarah-sumpah.css";

import { useEffect, useMemo, useState } from "react";

export default function KalkulatorKaffarahSumpahPage() {
  const [jumlah, setJumlah] = useState<number>(0);
  const [harga, setHarga] = useState<number>(0);

  useEffect(() => {
    document.body.classList.add("tool-kaffarah-sumpah");
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
      document.body.classList.remove("tool-kaffarah-sumpah");
      document.body.classList.remove("kfi-scope");
    };
  }, []);

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

        <div className="footer-bottom"> 2026 Portal Literasi Islam</div>
      </footer>

      <Script src="/js/kaffarah-fidyah-i18n.js" strategy="afterInteractive" />
      <Script src="/js/auth.js" strategy="afterInteractive" />
      <Script src="/js/access-guard.js" strategy="afterInteractive" />
    </>
  );
}