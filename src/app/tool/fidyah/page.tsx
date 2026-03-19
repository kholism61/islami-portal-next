"use client";

import Link from "next/link";
import Script from "next/script";

import "./fidyah.css";

import { useEffect, useMemo, useState } from "react";

export default function KalkulatorFidyahPage() {
  const [hari, setHari] = useState<number>(0);
  const [harga, setHarga] = useState<number>(0);
  const [metode, setMetode] = useState<"uang" | "beras">("uang");

  useEffect(() => {
    document.body.classList.add("tool-fidyah");
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
      document.body.classList.remove("tool-fidyah");
      document.body.classList.remove("kfi-scope");
    };
  }, []);

  const computed = useMemo(() => {
    if (!hari || hari <= 0) {
      return {
        statHari: 0,
        statTotal: 0,
        hasil: "Hasil perhitungan akan muncul di sini.",
        analisis: "Analisis akan muncul setelah perhitungan.",
        fiqh: "Penjelasan fiqh akan muncul di sini."
      };
    }

    const total = hari * (harga || 0);
    const totalBeras = Number((hari * 0.75).toFixed(2));
    const formatRupiah = (angka: number) =>
      "Rp " + Number(angka || 0).toLocaleString("id-ID");

    const fiqh = `
Menurut Mazhab Syafi'i,
fidyah adalah memberi makan satu orang miskin
untuk setiap hari puasa yang ditinggalkan.
`;

    if (metode === "beras") {
      const hasil = `
Total Fidyah Beras

${hari} hari × 0.75 kg

= ${totalBeras.toFixed(2)} kg beras
`;

      const analisis = `
Orang ini meninggalkan puasa ${hari} hari.

Fidyah dibayarkan dalam bentuk makanan pokok
sebanyak 1 mud (~0.75 kg) untuk setiap hari puasa.

Total fidyah beras yang harus dikeluarkan:
${totalBeras.toFixed(2)} kg beras.

Ini setara memberi makan ${hari} orang miskin.
`;

      return {
        statHari: hari,
        statTotal: total,
        hasil,
        analisis,
        fiqh
      };
    }

    const hasil = `
Total Fidyah

${hari} hari × ${formatRupiah(harga)}

= ${formatRupiah(total)}
`;

    const analisis = `
Orang ini meninggalkan puasa ${hari} hari.

Menurut mazhab Syafi'i, fidyah adalah memberi makan
satu orang miskin untuk setiap hari puasa yang ditinggalkan.

Total orang miskin yang harus diberi makan:
${hari} orang.

Estimasi biaya fidyah:
${formatRupiah(total)}.
`;

    return {
      statHari: hari,
      statTotal: total,
      hasil,
      analisis,
      fiqh
    };
  }, [hari, harga, metode]);

  const handleReset = () => {
    setHari(0);
    setHarga(0);
    setMetode("uang");
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
              value={hari ? String(hari) : ""}
              onChange={(e) => {
                const next = parseInt(e.target.value, 10);
                setHari(Number.isFinite(next) ? next : 0);
              }}
            />
          </div>

          <div className="form-group">
            <label>Harga makanan per hari (Rp)</label>

            <input
              type="number"
              id="hargaFidyah"
              placeholder="contoh: 25000"
              value={harga ? String(harga) : ""}
              onChange={(e) => {
                const next = parseInt(e.target.value, 10);
                setHarga(Number.isFinite(next) ? next : 0);
              }}
            />
          </div>

          <div className="harga-preset">
            <button id="harga10kBtn" type="button" onClick={() => setHarga(10000)}>
              10k
            </button>

            <button id="harga15kBtn" type="button" onClick={() => setHarga(15000)}>
              15k
            </button>

            <button id="harga20kBtn" type="button" onClick={() => setHarga(20000)}>
              20k
            </button>

            <button id="harga25kBtn" type="button" onClick={() => setHarga(25000)}>
              25k
            </button>
          </div>

          <div className="form-group">
            <label>Metode pembayaran</label>

            <select
              id="metodeFidyah"
              value={metode}
              onChange={(e) => setMetode(e.target.value === "beras" ? "beras" : "uang")}
            >
              <option value="uang">Uang</option>

              <option value="beras">Beras</option>
            </select>
          </div>

          <button
            className="btn-reset"
            id="resetFidyahBtn"
            type="button"
            onClick={handleReset}
          >
            Reset
          </button>

          <div className="stat-fidyah">
            <div>
              <span>Total Hari</span>
              <strong id="statHari">{computed.statHari}</strong>
            </div>

            <div>
              <span>Total Fidyah</span>
              <strong id="statTotal">{computed.statTotal}</strong>
            </div>
          </div>

          <div id="hasilFidyah" className="hasil-box">
            {computed.hasil}
          </div>

          <div className="analisis-fiqh">
            <h3>Analisis Fiqh</h3>

            <div id="analisisFidyah">
              {computed.analisis}
            </div>
          </div>

          <div id="fiqhFidyah" className="fiqh-box">
            {computed.fiqh}
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

        <p> 2026 Portal Literasi Islam – Seluruh hak cipta dilindungi.</p>
      </footer>

      <Script src="/js/kaffarah-fidyah-i18n.js" strategy="afterInteractive" />
      <Script src="/js/auth.js" strategy="afterInteractive" />
      <Script src="/js/access-guard.js" strategy="afterInteractive" />
    </>
  );
}