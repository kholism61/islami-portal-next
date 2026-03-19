import Link from "next/link";
import FiqhWanitaNav from "@/components/fiqh/FiqhWanitaNav";
import ScrollToTopButton from "@/components/fiqh/ScrollToTopButton";
import FiqhPageRuntime from "@/components/fiqh/FiqhPageRuntime";

export const metadata = {
  title: "Kalkulator Iddah",
};

export default function IddahPage() {
  return (
    <>
      <link rel="stylesheet" href="/css/iddah.css" />
      <link rel="stylesheet" href="/css/fiqh-wanita-shared.css" />
      <FiqhWanitaNav currentPath="/iddah" />

      <section className="hero">
        <h1>Kalkulator Masa Iddah</h1>
        <p>Menghitung masa iddah menurut fiqh Islam</p>
      </section>

      <div className="container">
        <div className="card">
          <label>Jenis Iddah</label>

          <select id="iddahType">
            <option value="talak">Talak (3 Quru&apos;)</option>
            <option value="talakQabla">Talak sebelum Dukhul</option>
            <option value="wafat">Wafat</option>
            <option value="hamil">Hamil</option>
            <option value="fasakh">Fasakh / Pembatalan Nikah</option>
          </select>

          <label>Tanggal Mulai</label>

          <input type="date" id="startDate" />

          <button id="hitungIddahBtn" type="button">
            Hitung Masa Iddah
          </button>

          <div className="result-card" id="result">
            <h3>Hasil Perhitungan Iddah</h3>

            <div className="iddah-main">
              <p>
                <b>Jenis Iddah:</b> <span id="jenis"></span>
              </p>

              <p>
                <b>Tanggal Mulai:</b> <span id="mulai"></span>
              </p>

              <p>
                <b>Durasi:</b> <span id="durasi"></span>
              </p>

              <p>
                <b>Berakhir:</b> <span id="akhir"></span>
              </p>

              <p>
                <b>Status Saat Ini:</b> <span id="status"></span>
              </p>
            </div>

            <div className="iddah-progress">
              <div id="iddahBar"></div>
            </div>

            <hr />

            <h4>Timeline Iddah</h4>

            <div id="timeline" className="timeline"></div>

            <div className="legend-quru">
              <span className="quru1-box"></span> Quru 1
              <span className="quru2-box"></span> Quru 2
              <span className="quru3-box"></span> Quru 3
            </div>

            <p className="quru-info">
              Dalam mazhab Syafi&apos;i, quru berarti masa suci di antara dua
              haid. Iddah selesai setelah tiga masa suci.
            </p>

            <hr />

            <h4>Penjelasan Fiqh</h4>

            <p id="fiqhText"></p>

            <p className="dalil" id="dalil"></p>

            <hr />

            <h4>Catatan Selama Masa Iddah</h4>

            <ul id="rules"></ul>

            <hr />

            <h4>Referensi Kitab</h4>

            <ul className="kitab">
              <li>Kifayatul Akhyar</li>
              <li>Fathul Qarib</li>
              <li>Al-Majmu&apos;</li>
              <li>Tuhfatul Muhtaj</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="data-haid">
        <div>
          Rata-rata Haid: <span id="avgHaid">-</span> hari
        </div>

        <div>
          Masa Suci: <span id="avgSuci">-</span> hari
        </div>
      </div>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-left">Portal Literasi Islam</div>

          <div className="footer-menu">
            <Link href="/haid">Haid</Link>
            <Link href="/suci">Masa Suci</Link>
            <Link href="/nifas">Nifas</Link>
            <Link href="/iddah">Iddah</Link>
          </div>

          <div className="footer-copy">
            2026 Fiqh Wanita – Mazhab Syafi&apos;i
          </div>
        </div>
      </footer>

      <ScrollToTopButton />

      <FiqhPageRuntime page="iddah" />
    </>
  );
}
