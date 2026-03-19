"use client";

import Link from "next/link";

import KfiScope from "@/components/kaffarah/KfiScope";

import "./kaffarah-jima.css";

import { useMemo, useState } from "react";

export default function KalkulatorKaffarahJimaPage() {
  const [jumlah, setJumlah] = useState<number>(0);
  const [harga, setHarga] = useState<number>(0);

  const computed = useMemo(() => {
    if (!jumlah || jumlah <= 0) {
      return {
        orangMiskin: 0,
        hariPuasa: 0,
        total: 0,
        hasil: "Hasil perhitungan akan muncul di sini.",
        analisis: "Analisis akan muncul setelah perhitungan."
      };
    }

    const orangMiskin = jumlah * 60;
    const hariPuasa = jumlah * 60;
    const total = orangMiskin * (harga || 0);
    const formatRupiah = (angka: number) =>
      "Rp " + Number(angka || 0).toLocaleString("id-ID");

    const hasil = `
Total Kaffarah

${jumlah} pelanggaran

60 orang miskin × ${jumlah}

= ${orangMiskin} orang miskin

Estimasi biaya

${orangMiskin} × ${formatRupiah(harga)}

= ${formatRupiah(total)}

Alternatif kaffarah

Puasa 2 bulan berturut
= ${hariPuasa} hari
`;

    let analisis = `
Orang ini melakukan pelanggaran jima di siang hari Ramadhan
sebanyak ${jumlah} kali.

Menurut fiqh, kaffarahnya adalah:

1. Memerdekakan budak
2. Jika tidak mampu -> puasa 2 bulan berturut-turut
3. Jika tidak mampu -> memberi makan 60 orang miskin

Jika memilih memberi makan:

Total orang miskin:
${orangMiskin} orang

Estimasi biaya:
${formatRupiah(total)}

Dalil:

Hadits Abu Hurairah:
Seorang lelaki datang kepada Nabi ﷺ dan berkata
"Aku celaka."

Nabi bertanya:
"Apa yang membuatmu celaka?"

Ia menjawab:
"Aku menggauli istriku di siang hari Ramadhan."

(HR Bukhari dan Muslim)

Dalil Qur'an:

فَمَن لَمْ يَجِدْ فَصِيَامُ شَهْرَيْنِ مُتَتَابِعَيْنِ
فَمَن لَمْ يَسْتَطِعْ فَإِطْعَامُ سِتِّينَ مِسْكِينًا

(QS Al-Mujadilah: 4)
`;

    if (jumlah > 1) {
      analisis += `
Catatan:
Mayoritas ulama menyatakan setiap pelanggaran
memiliki kaffarah tersendiri.
`;
    }

    return {
      orangMiskin,
      hariPuasa,
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
      alert("Masukkan jumlah pelanggaran.");
      return;
    }
  };

  return (
    <>
      <KfiScope bodyClass="tool-kaffarah-jima" />
      <link rel="preload" as="style" href="/css/kaffarah-shared.css" />
      <link rel="stylesheet" href="/css/kaffarah-shared.css" />
      <nav className="navbar">
        <div className="nav-container">
          <Link href="/" className="logo" aria-label="Portal Literasi Islam">
            <span className="logo-mark" aria-hidden="true">
              <img
                src="/assets/images/logo.png"
                alt=""
                className="logo-icon"
                loading="eager"
                decoding="async"
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
              <Link href="/kaffarah">Kaffarah &amp; Fidyah</Link>
            </li>
          </ul>
        </div>
      </nav>

      <section className="hero">
        <h1>Kaffarah Jima Ramadhan</h1>

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
            <input
              type="number"
              id="jumlahJima"
              placeholder="contoh: 1"
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
              id="hargaKaffarah"
              placeholder="contoh: 25000"
              value={harga ? String(harga) : ""}
              onChange={(e) => {
                const next = parseInt(e.target.value, 10);
                setHarga(Number.isFinite(next) ? next : 0);
              }}
            />
          </div>

          <div className="harga-preset">
            <button className="harga-btn" id="kaffarahHarga10kBtn" type="button" onClick={() => setHarga(10000)}>
              10k
            </button>
            <button className="harga-btn" id="kaffarahHarga15kBtn" type="button" onClick={() => setHarga(15000)}>
              15k
            </button>
            <button className="harga-btn" id="kaffarahHarga20kBtn" type="button" onClick={() => setHarga(20000)}>
              20k
            </button>
            <button className="harga-btn" id="kaffarahHarga25kBtn" type="button" onClick={() => setHarga(25000)}>
              25k
            </button>
          </div>

          <button
            className="btn-hitung"
            id="hitungKaffarahJimaBtn"
            type="button"
            onClick={handleHitung}
          >
            Hitung Kaffarah
          </button>

          <h3 className="summary-title">
            Total Orang Miskin <span id="totalMiskin">{computed.orangMiskin}</span>
          </h3>

          <div className="stats-container">
            <div className="stat-card">
              <span>Pelanggaran</span>
              <h3 id="statPelanggaran">{jumlah}</h3>
            </div>

            <div className="stat-card">
              <span>Orang Miskin</span>
              <h3 id="statMiskin">{computed.orangMiskin}</h3>
            </div>
          </div>

          <div id="hasilKaffarah" className="hasil-box">
            <pre className="pre-text">{computed.hasil}</pre>
          </div>

          <div className="analisis-box">
            <h3>Analisis Fiqh</h3>

            <div id="analisisKaffarah">
              <pre className="pre-text">{computed.analisis}</pre>
            </div>
          </div>
        </div>
      </section>

      <div className="action-buttons">
        <button className="btn-copy" id="copyKaffarahJimaBtn" type="button" onClick={handleCopy}>
          Salin Hasil
        </button>

        <button className="btn-wa" id="shareKaffarahJimaBtn" type="button" onClick={handleShare}>
          Bagikan WhatsApp
        </button>

        <button className="btn-reset" id="resetKaffarahJimaBtn" type="button" onClick={handleReset}>
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

        <p>&copy; 2026 Portal Literasi Islam - Seluruh hak cipta dilindungi.</p>
      </footer>
    </>
  );
}