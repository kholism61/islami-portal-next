"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect } from "react";
import MawarisPagesRuntimeLoader from "@/components/runtime/MawarisPagesRuntimeLoader";

type MawarisWindow = Window &
  typeof globalThis & {
    compareDzawil?: () => void;
    exportPDF?: () => void;
    hitungMawaris?: () => void;
    initMawarisPage?: () => void;
  };

function getMawarisWindow() {
  return window as MawarisWindow;
}

export default function MawarisClient() {
  useEffect(() => {
    let active = true;
    window.dispatchEvent(new CustomEvent("mw:page-ready"));

    void import("./mawaris-engine.js")
      .then(() => {
        if (!active) {
          return;
        }

        getMawarisWindow().initMawarisPage?.();
        window.dispatchEvent(new CustomEvent("mw:page-ready"));
      })
      .catch((error) => {
        console.error("Failed to initialize mawaris engine.", error);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="mawaris-page">
      <nav className="navbar">
        <div className="nav-container">
          <Link href="/" className="logo" aria-label="Portal Literasi Islam">
            <span className="logo-mark" aria-hidden="true">
              <img src="/favicon.ico" alt="" className="logo-icon" width={12} height={12} />
            </span>
            <span className="logo-text">Portal Literasi Islam</span>
          </Link>
          <ul className="nav-links">
            <li>
              <Link href="/">Beranda</Link>
            </li>
            <li>
              <Link href="/tabel-fiqh">Tabel Fiqh</Link>
            </li>
            <li>
              <Link href="/metodologi">Metodologi</Link>
            </li>
            <li>
              <Link href="/about">Tentang</Link>
            </li>
            <li>
              <Link href="/kontak">Kontak</Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="mawaris-container" data-page="mawaris">
        <h1>Kalkulator Mawaris (Jumhur)</h1>

        <div className="header-actions">
          <select id="mode" defaultValue="simple">
            <option value="simple">Mode Sederhana</option>
            <option value="academic">Mode Akademik</option>
          </select>
        </div>

        <div className="form-box">
          <label>Total Harta (Rp)</label>
          <input type="number" id="totalHarta" />

          <label>Suami</label>
          <input type="checkbox" id="suami" />

          <label>Jumlah Istri</label>
          <input type="number" id="istri" min="0" defaultValue="0" />

          <label>Ayah</label>
          <input type="checkbox" id="ayah" />

          <label>Ibu</label>
          <input type="checkbox" id="ibu" />

          <label>Anak Laki-laki</label>
          <input type="number" id="anakLaki" min="0" defaultValue="0" />

          <label>Anak Perempuan</label>
          <input type="number" id="anakPerempuan" min="0" defaultValue="0" />

          <label>Saudari Kandung</label>
          <input
            type="number"
            id="saudariKandung"
            min="0"
            defaultValue="0"
          />

          <label>Saudara Kandung</label>
          <input
            type="number"
            id="saudaraKandung"
            min="0"
            defaultValue="0"
          />

          <label>Saudara Seibu</label>
          <input type="number" id="maternalSiblings" defaultValue="0" min="0" />

          <label>Saudari Seayah</label>
          <input type="number" id="saudariSeayah" min="0" defaultValue="0" />

          <label>Saudara Seayah</label>
          <input type="number" id="saudaraSeayah" min="0" defaultValue="0" />

          <label>Kakek (Ayah dari Ayah)</label>
          <input type="checkbox" id="kakek" />

          <label>
            <input type="checkbox" id="nenekIbu" />
            Nenek (Ibu dari Ibu)
          </label>

          <label>
            <input type="checkbox" id="nenekAyah" />
            Nenek (Ibu dari Ayah)
          </label>

          <label>
            Cucu Laki (dari anak laki):
            <input type="number" id="cucuLaki" defaultValue="0" min="0" />
          </label>

          <label>
            Cucu Perempuan (dari anak laki):
            <input
              type="number"
              id="cucuPerempuan"
              defaultValue="0"
              min="0"
            />
          </label>

          <div className="section-title">
            Ahli Waris Lanjutan
            <span className="section-sub">
              (Aktif jika struktur utama kosong)
            </span>
          </div>

          <label>
            Anak Saudara Kandung Laki:
            <input type="number" id="nephewFull" defaultValue="0" min="0" />
          </label>

          <label>
            Anak Saudara Seayah Laki:
            <input
              type="number"
              id="nephewPaternal"
              defaultValue="0"
              min="0"
            />
          </label>

          <label>
            Paman Kandung:
            <input type="number" id="uncleFull" defaultValue="0" min="0" />
          </label>

          <label>
            Paman Seayah:
            <input
              type="number"
              id="unclePaternal"
              defaultValue="0"
              min="0"
            />
          </label>

          <label>
            Anak Paman Kandung:
            <input type="number" id="cousinFull" defaultValue="0" min="0" />
          </label>

          <label>
            Anak Paman Seayah:
            <input
              type="number"
              id="cousinPaternal"
              defaultValue="0"
              min="0"
            />
          </label>

          <hr />
          <div className="section-title">Dzawil Arham</div>

          <label>
            Bibi Kandung:
            <input type="number" id="auntFull" defaultValue="0" min="0" />
          </label>

          <label>
            Anak Saudari Kandung:
            <input
              type="number"
              id="daughterOfFullSister"
              defaultValue="0"
              min="0"
            />
          </label>

          <label>
            Anak Saudari Seayah:
            <input
              type="number"
              id="daughterOfPaternalSister"
              defaultValue="0"
              min="0"
            />
          </label>

          <label>
            Anak Saudari Seibu:
            <input
              type="number"
              id="daughterOfMaternalSister"
              defaultValue="0"
              min="0"
            />
          </label>

          <label>
            Bibi Seayah:
            <input
              type="number"
              id="auntPaternal"
              defaultValue="0"
              min="0"
            />
          </label>

          <label>
            Bibi Seibu:
            <input
              type="number"
              id="auntMaternal"
              defaultValue="0"
              min="0"
            />
          </label>

          <label>
            Paman Seibu:
            <input
              type="number"
              id="uncleMaternal"
              defaultValue="0"
              min="0"
            />
          </label>

          <label>
            Mazhab:
            <select id="mazhab" defaultValue="syafii">
              <option value="syafii">Syafi&apos;i</option>
              <option value="hanafi">Hanafi</option>
            </select>
          </label>

          <label>
            Metode Dzawil Arham:
            <select id="dzawilMethod" defaultValue="qarabah">
              <option value="qarabah">Qarabah (Jumhur)</option>
              <option value="tanzil">Tanzil</option>
            </select>
          </label>

          <button
            id="hitungMawarisBtn"
            type="button"
            onClick={() => getMawarisWindow().hitungMawaris?.()}
          >
            Hitung
          </button>
        </div>

        <button
          id="compareBtn"
          type="button"
          disabled
          onClick={() => getMawarisWindow().compareDzawil?.()}
        >
          Bandingkan Qarabah vs Tanzil
        </button>

        <div id="errorBox" aria-live="polite"></div>
        <div id="hasil"></div>

        <button
          id="exportMawarisPdfBtn"
          type="button"
          onClick={() => getMawarisWindow().exportPDF?.()}
        >
          Download PDF
        </button>

        <canvas id="chartMawaris" style={{ marginTop: "20px" }}></canvas>
      </div>

      <section className="prefooter">
        <div className="prefooter-container">
          <div className="prefooter-col">
            <h4>Portal Literasi Islam</h4>
            <p>
              Kalkulator Mawaris berbasis Jumhur dan Mazhab (Syafi&apos;i dan
              Hanafi)
            </p>
          </div>

          <div className="prefooter-col">
            <h4>Referensi Fiqh</h4>
            <p>
              Al-Fiqh al-Manhaji
              <br />
              Syarh Rohabiyyah
              <br />
              Al Masalik Az Zahabiyah
              <br />
              Fath al-Qarib
            </p>
          </div>

          <div className="prefooter-col">
            <h4>Catatan</h4>
            <p>
              Hasil perhitungan bersifat edukatif. Disarankan verifikasi dengan
              ahli waris atau ulama.
            </p>
          </div>
        </div>
      </section>

      <footer className="footer-bottom">
        <div className="footer-links">
          <Link href="/about">Tentang</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/kontak">Kontak</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/disclaimer">Disclaimer</Link>
        </div>

        <div className="footer-copy-text">
          &copy; 2026 Portal Literasi Islam - Seluruh hak cipta dilindungi.
        </div>
      </footer>

      <button
        id="scrollToTopBtn"
        className="scroll-to-top"
        aria-label="Kembali ke atas"
        type="button"
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 19V5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M6 11L12 5L18 11"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Script
        src="https://cdn.jsdelivr.net/npm/chart.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
        strategy="afterInteractive"
      />
      <MawarisPagesRuntimeLoader />
    </div>
  );
}
