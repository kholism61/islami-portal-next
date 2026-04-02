import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MawarisPagesRuntimeLoader from "@/components/runtime/MawarisPagesRuntimeLoader";

import "../fiqh-pages.css";

export const metadata: Metadata = {
  title: "Metodologi Perhitungan Mawaris",
};

export default function MetodologiPage() {
  return (
    <div className="fiqh-page">
      <nav className="top-nav">
        <div className="nav-container">
          <Link href="/" className="logo" aria-label="Portal Literasi Islam">
            <span className="logo-mark" aria-hidden="true">
              <Image src="/favicon.ico" alt="" className="logo-icon" width={12} height={12} />
            </span>
            <span className="logo-text">Portal Literasi Islam</span>
          </Link>

          <div className="nav-links">
            <Link href="/">Beranda</Link>
            <Link href="/tools/mawaris">Hitung Mawaris</Link>
            <Link href="/tabel-fiqh">Tabel Fiqh</Link>
            <Link href="/metodologi">Metodologi</Link>
          </div>
        </div>
      </nav>

      <header className="page-header">
        <h1>Metodologi Perhitungan</h1>
        <p>Penjelasan sistem dan pendekatan fiqh yang digunakan</p>
      </header>

      <section className="content-section">
        <h2>Metodologi Perhitungan Mawaris</h2>

        <h3>1. Landasan Mazhab</h3>
        <p>
          Perhitungan dalam sistem ini menggunakan pendekatan Jumhur serta
          beberapa mazhab (Syafi&apos;i dan Hanafi). Rujukan utama berasal dari:
        </p>
        <ul>
          <li>Al-Fiqh al-Manhaji</li>
          <li>Syarh Rohabiyyah</li>
          <li>Al Masalik Az Zahabiyah</li>
          <li>Fath al-Qarib</li>
        </ul>

        <h3>2. Urutan Pembagian Harta</h3>
        <p>
          Sebelum pembagian kepada ahli waris, harta dibagi dalam urutan
          berikut:
        </p>
        <ol>
          <li>Biaya pemakaman</li>
          <li>Pelunasan hutang</li>
          <li>Pelaksanaan wasiat (maksimal 1/3 harta)</li>
          <li>Pembagian kepada ahli waris</li>
        </ol>

        <h3>3. Identifikasi Ahli Waris</h3>
        <p>
          Sistem mengidentifikasi ahli waris yang berhak berdasarkan struktur:
        </p>
        <ul>
          <li>Furu&apos; (anak, cucu)</li>
          <li>Ushul (ayah, ibu, kakek, nenek)</li>
          <li>Hawasyi (saudara, paman, dll)</li>
        </ul>

        <h3>4. Penentuan Ashabul Furudh</h3>
        <p>
          Bagian tetap (fardh) diberikan terlebih dahulu kepada: Suami, Istri,
          Ayah, Ibu, Anak Perempuan, Cucu Perempuan, Saudara Perempuan
          (sekandung/sebapak/seibu).
        </p>

        <h3>5. Perhitungan Asal Masalah</h3>
        <p>
          Asal masalah ditentukan dari penyebut pecahan terbesar untuk
          menyamakan seluruh bagian ahli waris.
        </p>

        <h3>6. &apos;Awl (Penyesuaian Proporsional)</h3>
        <p>
          Jika total bagian melebihi 1 (100%), maka dilakukan &apos;awl, yaitu
          menaikkan asal masalah dan menyesuaikan seluruh bagian secara
          proporsional.
        </p>

        <h3>7. Radd (Pengembalian Sisa)</h3>
        <p>
          Jika terdapat sisa harta dan tidak ada ashabah, maka sisa
          dikembalikan kepada ahli waris ashhabul furudh kecuali suami dan
          istri.
        </p>

        <h3>8. Ashabah</h3>
        <p>
          Jika terdapat sisa setelah pembagian fardh, maka diberikan kepada
          ashabah terdekat sesuai urutan nasab.
        </p>

        <h3>9. Hijab (Penghalang)</h3>
        <p>
          Ahli waris tertentu dapat terhalang (mahjub) oleh ahli waris yang
          lebih dekat, misalnya:
        </p>
        <ul>
          <li>Saudara terhalang oleh ayah</li>
          <li>Cucu terhalang oleh anak laki-laki</li>
          <li>Saudara seibu terhalang oleh anak atau ayah</li>
        </ul>

        <h3>10. Dzawil Arham</h3>
        <p>
          Jika tidak ada ashhabul furudh dan ashabah, maka digunakan metode:
        </p>
        <ul>
          <li>Qarabah (Jumhur)</li>
          <li>Tanzil</li>
        </ul>

        <h3>11. Validasi Akademik</h3>
        <p>
          Sistem ini bersifat edukatif. Dalam praktik nyata, disarankan
          konsultasi dengan ahli faraidh atau lembaga fatwa terpercaya.
        </p>
      </section>

      <footer className="simple-footer">
       © 2026 Portal Literasi Islam - Seluruh hak cipta dilindungi.
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

      <MawarisPagesRuntimeLoader />
    </div>
  );
}
