import Link from "next/link";

import SmartFiqhScope from "@/components/smart-fiqh/SmartFiqhScope";

import "./smart-engine-thaharah.css";

export const metadata = {
  title: "Smart Fiqh Thaharah",
};

export default function SmartFiqhThaharahPage() {
  return (
    <>
      <SmartFiqhScope page="thaharah" />

      <div className="page-glow page-glow-left"></div>
      <div className="page-glow page-glow-right"></div>

      <nav className="navbar">
        <div className="nav-container">
          <Link href="/" className="logo" aria-label="Portal Literasi Islam">
            <span className="logo-mark" aria-hidden="true">
              <img src="/favicon.ico" alt="" className="logo-icon" width={12} height={12} />
            </span>
            <span className="logo-text" id="logoText">
              Portal Literasi Islam
            </span>
          </Link>

          <button
            className="nav-toggle"
            id="navToggle"
            aria-label="Toggle navigation"
            aria-expanded="false"
          >
            {"\u2630"}
          </button>

          <div className="nav-panel" id="navPanel">
            <ul className="nav-menu">
              <li>
                <Link href="/" id="navHome">
                  Beranda
                </Link>
              </li>

              <li>
                <Link href="/smart" id="navSmart">
                  Smart Fiqh
                </Link>
              </li>

              <li>
                <Link href="/tools/mawaris" id="navMawaris">
                  Hitung Mawaris
                </Link>
              </li>

              <li>
                <Link href="/zakat" id="navZakat">
                  Kalkulator Zakat
                </Link>
              </li>
            </ul>

            <div className="lang-switch" aria-label="Language">
              <button type="button" data-lang="id" className="active">
                ID
              </button>

              <button type="button" data-lang="en">
                EN
              </button>

              <button type="button" data-lang="ar">
                AR
              </button>
            </div>
          </div>
        </div>
      </nav>

      <header className="hero hero-full">
        <div className="hero-shell">
          <span className="hero-badge">Fiqh Decision Flow</span>

          <h1 id="heroTitle">Smart Fiqh Thaharah</h1>

          <p id="heroDesc">
            Panduan fiqh bersuci yang lebih lengkap untuk wudhu, mandi wajib,
            tayammum, najis, jenis-jenis najis, luka/perban, uzur medis, dan
            keraguan dalam thaharah dengan alur Ya/Tidak yang ringkas namun
            berbobot.
          </p>

          <div className="hero-stats">
            <article className="stat-card">
              <strong>14</strong>
              <span>Alur Pertanyaan</span>
            </article>

            <article className="stat-card">
              <strong>13</strong>
              <span>Hasil Hukum</span>
            </article>

            <article className="stat-card">
              <strong>3</strong>
              <span>Bahasa Aktif</span>
            </article>
          </div>
        </div>
      </header>

      <main className="layout-shell">
        <section className="engine-column">
          <article className="engine-card engine-primary-card">
            <div className="engine-head">
              <div>
                <span className="section-kicker">Interactive Engine</span>
                <h2 id="engineTitle">Mesin Hukum Thaharah Lengkap</h2>
              </div>

              <span className="step-text" id="stepText">
                Langkah 1
              </span>
            </div>

            <div className="progress-track" aria-hidden="true">
              <div className="progress-fill" id="progressFill"></div>
            </div>

            <div className="question-box" id="questionBox">
              <div className="question-mark">?</div>

              <p className="question-title" id="questionText"></p>

              <div className="answer-actions">
                <button
                  type="button"
                  className="btn-answer btn-yes"
                  id="yesBtn"
                >
                  Ya
                </button>

                <button
                  type="button"
                  className="btn-answer btn-no"
                  id="noBtn"
                >
                  Tidak
                </button>
              </div>
            </div>

            <div className="result-box" id="resultBox">
              <h3 id="resultTitle">Hasil Hukum</h3>

              <p className="result-line">
                <strong id="labelStatus">Status</strong>
                <span id="resultStatus"></span>
              </p>

              <p className="result-line">
                <strong id="labelObligation">Kewajiban</strong>
                <span id="resultObligation"></span>
              </p>

              <p className="result-line">
                <strong id="labelExplanation">Penjelasan</strong>
                <span id="resultExplanation"></span>
              </p>

              <p className="result-line">
                <strong id="labelReference">Landasan</strong>
                <span id="resultReference"></span>
              </p>
            </div>

            <div className="reset-wrap">
              <button type="button" className="btn-reset" id="resetBtn">
                Mulai Ulang
              </button>
            </div>
          </article>
        </section>

        <aside className="info-column">
          <article className="info-card">
            <span className="insight-badge">Cakupan</span>

            <h3>Ruang Lingkup Smart Thaharah</h3>

            <p>
              Mencakup wudhu, mandi wajib, tayammum, penghalang sampainya air,
              luka dan jabirah, najis ringan, najis sedang, najis berat, sisa
              jejak najis yang sulit hilang, uzur medis berkepanjangan, dan
              kaidah penting untuk menolak waswas dalam bersuci.
            </p>
          </article>

          <article className="info-card">
            <span className="insight-badge">Prinsip</span>

            <h3>Catatan Fiqh Praktis</h3>

            <p>
              Syariat menuntut ketelitian pada rukun dan syarat, namun menolak
              waswas, sikap berlebihan, dan beban yang tidak realistis. Air
              dipakai bila ada dan aman, tayammum diambil saat ada uzur, dan
              keyakinan tidak gugur hanya karena keraguan.
            </p>
          </article>

          <article className="info-card">
            <span className="insight-badge">Arah Pakai</span>

            <h3>Pedoman Penggunaan</h3>

            <ul className="smart-method-list">
              <li>Jawab pertanyaan secara berurutan sesuai kondisi nyata.</li>

              <li>
                Gunakan hasil sebagai panduan awal yang cepat dan terstruktur.
              </li>

              <li>
                Untuk kasus medis berat atau sangat spesifik, tetap konsultasi
                fiqh lanjutan.
              </li>
            </ul>
          </article>
        </aside>
      </main>

      <footer className="smart-footer">
        <p>&copy; 2026 Smart Fiqh Thaharah - Portal Literasi Islam</p>
      </footer>
    </>
  );
}
