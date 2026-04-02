import Link from "next/link";
import FiqhWanitaNav from "@/components/fiqh/FiqhWanitaNav";
import ScrollToTopButton from "@/components/fiqh/ScrollToTopButton";
import FiqhPageRuntime from "@/components/fiqh/FiqhPageRuntime";

import "./haid.css";
import "./fiqh-wanita-shared.css";

export const metadata = {
  title: "Kalkulator Haid Syafi'i",
};

export default function HaidPage() {
  return (
    <>
      <FiqhWanitaNav currentPath="/haid" />

      <section className="hero">
        <h1>Kalkulator Haid</h1>
        <p>Mazhab Syafi&apos;i - Sistem Fiqh Wanita</p>
      </section>

      <div className="container">
        <div className="card">
          <label>Tanggal Selesai Haid Sebelumnya (Opsional)</label>
          <input type="date" id="prevEnd" lang="en-CA" />

          <label>Tanggal Mulai Darah</label>
          <input type="date" id="start" lang="en-CA" />

          <label>Tanggal Selesai Darah</label>
          <input type="date" id="end" lang="en-CA" />

          <label>Status Wanita</label>
          <select id="type">
            <option value="mubtadiah">Mubtadi’ah (Pertama Kali)</option>
            <option value="mu'tadah">Mu’tadah (Punya Kebiasaan)</option>
            <option value="mustahadhah">Mustahadhah (Darah Terus)</option>
          </select>

          <div className="mumayyiz-wrapper">
            <input type="checkbox" id="mumayyiz" />
            <label htmlFor="mumayyiz">
              Bisa membedakan darah kuat &amp; lemah (Mumayyizah)
            </label>
          </div>

          <div id="tamyizBox" style={{ display: "none" }}>
            <label>Jumlah Hari Darah Kuat</label>
            <input
              type="number"
              id="strongDays"
              placeholder="Masukkan jumlah hari darah kuat"
            />
          </div>

          <label>Kebiasaan Haid (Hari)</label>
          <input
            type="number"
            id="habit"
            placeholder="Isi jika Mu’tadah / Mustahadhah"
          />

          <button id="hitungHaidBtn" type="button">Hitung Sekarang</button>
        </div>

        <div className="result-card" id="hasil"></div>
        <div className="ai-box" id="aiAnalysis"></div>

        <div className="fiqh-box">
          <h3>Analisis Fiqh</h3>

          <div className="fatwa-box">
            <div className="fatwa-title">Fatwa AI Fiqh</div>
            <div id="fatwaText"></div>
          </div>

          <div className="ai-engine">
            <h3>AI Fiqh Engine</h3>

            <p>
              <b>Jenis Wanita:</b> <span id="aiType"></span>
            </p>

            <p>
              <b>Kesimpulan Hukum:</b> <span id="aiHukum"></span>
            </p>
          </div>

          <div className="fiqh-item">
            <span>Jenis Wanita:</span>
            <b id="fiqhType">-</b>
          </div>

          <div className="fiqh-item">
            <span>Kebiasaan Haid:</span>
            <b id="habitHaid">-</b>
          </div>

          <div className="fiqh-item">
            <span>Status Darah:</span>
            <b id="bloodStatus">-</b>
          </div>

          <div className="fiqh-item">
            <span>Hukum:</span>
            <b id="fiqhRule">-</b>
          </div>

          <div id="fiqhSource"></div>
        </div>

        <div className="prediction-box" id="nextCycle">
          📅 Perkiraan siklus berikutnya: -
        </div>

        <div className="hijri-box">
          Tanggal Hijriyah: <span id="hijriDate"></span>
        </div>

        <div className="prediksi-durasi">
          Perkiraan durasi haid:
          <span id="predDurasi">-</span>
        </div>

        <div className="prediction-box">
          <div className="section-title">Prediksi 6 Bulan</div>

          <ul id="predictionList"></ul>
        </div>

        <div className="calendar-header">
          <div>Min</div>
          <div>Sen</div>
          <div>Sel</div>
          <div>Rab</div>
          <div>Kam</div>
          <div>Jum</div>
          <div>Sab</div>
        </div>

        <div className="timeline" id="timeline"></div>

        <div className="calendar-toolbar">
          <button id="prevMonth">&lt;</button>
          <div id="monthTitle"></div>
          <button id="nextMonth">&gt;</button>
        </div>

        <label>Warna darah dominan</label>

        <select id="bloodColor">
          <option value="dark">Merah tua / hitam</option>
          <option value="normal">Merah biasa</option>
          <option value="light">Merah muda</option>
          <option value="yellow">Kuning / keruh</option>
        </select>

        <div className="stats-box">
          <div className="stats-card">
            <div className="stats-title">⏱️ Durasi Haid</div>
            <div className="stats-value" id="avgHaid"></div>
          </div>

          <div className="stats-card">
            <div className="stats-title">🩸 Total Darah</div>
            <div className="stats-value" id="cycle"></div>
          </div>

          <div className="stats-card">
            <div className="stats-title">Rata-rata Haid</div>
            <div className="stats-value" id="avgCycle">
              -
            </div>
          </div>

          <div className="stats-card">
            <div className="stats-title">Siklus Terpendek</div>
            <div className="stats-value" id="minCycle">
              -
            </div>
          </div>

          <div className="stats-card">
            <div className="stats-title">Siklus Terpanjang</div>
            <div className="stats-value" id="maxCycle">
              -
            </div>
          </div>

          <div className="stats-card">
            <div className="stats-title">Status Siklus</div>
            <div className="stats-value" id="cycleStatus">
              -
            </div>
          </div>

          <div className="stats-card">
            <div className="stats-title">Rata-rata Suci</div>
            <div className="stats-value" id="avgSuci"></div>
          </div>
        </div>

        <div id="calendar"></div>

        <div className="timeline-container">
          <div className="section-title">Timeline Fiqh</div>

          <div id="fiqhTimeline" className="timeline-grid"></div>
        </div>

        <div className="legend">
          <div>
            <span className="dot haid"></span> Haid
          </div>
          <div>
            <span className="dot istihadhah"></span> Istihadhah
          </div>
          <div>
            <span className="dot suci"></span> Suci
          </div>
          <div>
            <span className="dot prediction"></span> Prediksi
          </div>
        </div>
      </div>

      <div className="chart-container">
        <div className="chartBox">
          <canvas id="cycleChart"></canvas>
        </div>

        <div className="historyBox">
          <h3>Riwayat Siklus</h3>
          <ul id="historyList"></ul>
        </div>

        <button id="exportHaidHistoryBtn" type="button" className="export-btn">
          Download Riwayat
        </button>

        <button id="resetHaidHistoryBtn" type="button">
          Reset Riwayat
        </button>

        <Link href="/istihadhah" className="istihadhah-btn">
          Lanjut ke Kalkulator Istihadhah →
        </Link>
      </div>

      <div className="pre-footer">
        <div className="pre-footer-grid">
          <div className="pf-box">
            <h3>Portal Literasi Islam</h3>
            <p>
              Website ini menyediakan kalkulator fiqh wanita, mawaris, dan
              berbagai alat bantu fiqh berbasis mazhab Syafi&apos;i.
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
      </div>

      <footer className="site-footer">
        <div className="footer-links">
          <Link href="/about">Tentang</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/kontak">Kontak</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/disclaimer">Disclaimer</Link>
        </div>

        <div className="footer-copy">
          © 2026 Portal Literasi Islam • Seluruh hak cipta dilindungi.
        </div>
      </footer>

      <ScrollToTopButton />

      <FiqhPageRuntime page="haid" />
    </>
  );
}
