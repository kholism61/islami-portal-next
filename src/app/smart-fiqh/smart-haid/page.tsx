import Link from "next/link";

import SmartFiqhScope from "@/components/smart-fiqh/SmartFiqhScope";

import "../smart-engine.css";

export const metadata = {
  title: "Smart Fiqh Haid",
};

export default function SmartFiqhHaidPage() {
  return (
    <>
      <SmartFiqhScope page="haid" />

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
      </nav>

      <section className="hero hero-full">
        <div className="hero-shell">
          <span className="hero-badge" id="noteBadge">
            Panduan Ringkas
          </span>
          <h1 id="heroTitle">Smart Fiqh Haid</h1>
          <p id="heroDesc">
            Analisis fiqh haid, istihadhah, dan nifas dengan alur Ya/Tidak yang
            lebih dalam, ringkas, dan mudah dipahami untuk keputusan ibadah
            harian.
          </p>
        </div>
      </section>

      <section className="fiqh-insight">
        <div className="fiqh-insight-grid">
          <article className="fiqh-insight-card">
            <div className="insight-badge" id="noteBadgeSecondary">
              Panduan Ringkas
            </div>
            <h3 id="fiqhNoteTitle">Penjelasan Fiqh Tambahan</h3>
            <p id="fiqhNoteBody">
              Modul ini memberi keputusan ringkas berbasis urutan pertanyaan.
              Untuk kasus yang panjang, darah terputus-putus, adat yang berubah
              total, atau kondisi medis yang rumit, tetap rujuk ustadzah, mufti,
              atau tenaga medis terpercaya.
            </p>
          </article>
          <article className="fiqh-insight-card">
            <div className="insight-badge" id="methodBadge">
              Metode Sistem
            </div>
            <h3 id="smartMethodTitle">Metode Smart Analyzer</h3>
            <p id="smartMethodBody">
              Alur dibangun dengan tiga tahap agar keputusan lebih stabil,
              terukur, dan mudah ditelusuri alasannya.
            </p>
            <ul className="smart-method-list">
              <li id="smartMethodPoint1">
                1) Tashawwur: identifikasi apakah darah berkaitan dengan nifas,
                haid baru, atau istihadhah.
              </li>
              <li id="smartMethodPoint2">
                2) Takyif Fiqhi: cek batas 15 hari, adat haid, masa suci, dan
                kemungkinan tamyiz.
              </li>
              <li id="smartMethodPoint3">
                3) Tanzil: keluarkan status hukum, implikasi ibadah, dan rujukan
                ringkas yang relevan.
              </li>
            </ul>
          </article>
        </div>
      </section>

      <main className="engine-wrapper">
        <section className="engine-card">
          <div className="engine-head">
            <h2 id="engineTitle">AI Fiqh Analyzer: Haid</h2>
            <span className="step-text" id="stepText">
              Langkah 1/1
            </span>
          </div>

          <div className="progress-track">
            <div className="progress-fill" id="progressFill"></div>
          </div>

          <div className="question-box" id="questionBox">
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
              <strong id="labelStatus">Status:</strong>{" "}
              <span id="resultStatus"></span>
            </p>
            <p className="result-line">
              <strong id="labelObligation">Kewajiban:</strong>{" "}
              <span id="resultObligation"></span>
            </p>
            <p className="result-line">
              <strong id="labelExplanation">Penjelasan:</strong>{" "}
              <span id="resultExplanation"></span>
            </p>
            <p className="result-line">
              <strong id="labelReference">Landasan:</strong>{" "}
              <span id="resultReference"></span>
            </p>

            <div className="result-arabic-line" id="fiqhEvidenceWrap">
              <p className="result-line">
                <strong id="aiEvidenceLabel">Ibarah Fiqh</strong>
              </p>
              <span className="arabic-ibarah" id="resultIbarah"></span>
            </div>

            <div className="ai-panel">
              <div className="ai-panel-head">
                <h4 id="aiPanelTitle">AI Insight Modern</h4>
                <span className="ai-chip">AI</span>
              </div>
              <div className="ai-grid">
                <div className="ai-card">
                  <strong id="aiSummaryLabel">Ringkasan</strong>
                  <p id="aiSummary"></p>
                </div>
                <div className="ai-card">
                  <strong id="aiReasoningLabel">Analisis</strong>
                  <p id="aiReasoning"></p>
                </div>
                <div className="ai-card">
                  <strong id="aiRiskLabel">Catatan Risiko</strong>
                  <p id="aiRisk"></p>
                </div>
                <div className="ai-card">
                  <strong id="aiAdviceLabel">Saran Praktis</strong>
                  <p id="aiAdvice"></p>
                </div>
              </div>
              <div className="ai-source-box">
                <strong id="aiSourceLabel">Dalil Ringkas</strong>
                <p id="resultEvidence"></p>
              </div>
            </div>
          </div>

          <div className="reset-wrap">
            <button type="button" className="btn-reset" id="resetBtn">
              Mulai Ulang
            </button>
          </div>
        </section>
      </main>

      <footer className="smart-footer">
        <p id="smartFooterCopy">&copy; 2026 Portal Literasi Islam - Smart Fiqh Haid</p>
      </footer>
    </>
  );
}