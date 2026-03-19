import Link from "next/link";
import FiqhWanitaNav from "@/components/fiqh/FiqhWanitaNav";
import ScrollToTopButton from "@/components/fiqh/ScrollToTopButton";
import FiqhPageRuntime from "@/components/fiqh/FiqhPageRuntime";

export const metadata = {
  title: "Kalkulator Masa Suci | Portal Literasi Islam",
};

export default function MasaSuciPage() {
  return (
    <>
      <link rel="stylesheet" href="/css/nifas.css" />
      <link rel="stylesheet" href="/css/suci.css" />
      <link rel="stylesheet" href="/css/fiqh-wanita-shared.css" />
      <FiqhWanitaNav currentPath="/suci" />

      <section className="hero">
        <h1>Kalkulator Masa Suci</h1>
        <p>Menghitung masa suci minimal antara dua haid menurut fiqh</p>
      </section>

      <div className="container">
        <div className="card">
          <label>Tanggal Selesai Haid</label>

          <input type="date" id="haidEnd" />

          <button id="hitungSuciBtn" type="button">
            Hitung Masa Suci
          </button>

          <div className="result-card" id="result">
            Hasil akan muncul di sini

            <div className="timeline" id="timeline"></div>
          </div>

          <h4>Kalender Fiqh Wanita</h4>

          <div className="fiqh-calendar" id="fiqhCalendar"></div>

          <div className="legend-quru">
            <span className="box-haid"></span> Haid
            <span className="box-suci"></span> Masa Suci
            <span className="box-next"></span> Boleh Haid
            <span className="box-today"></span> Hari ini
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-menu">
            <Link href="/">Beranda</Link>
            <Link href="/haid">Haid</Link>
            <Link href="/nifas">Nifas</Link>
            <Link href="/iddah">Iddah</Link>
          </div>

          <div className="footer-copy">
            © 2026 Portal Literasi Islam
          </div>
        </div>
      </footer>

      <ScrollToTopButton />

      <FiqhPageRuntime page="suci" />
    </>
  );
}
