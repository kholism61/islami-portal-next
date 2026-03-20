import Image from "next/image";
import Link from "next/link";

import SmartFiqhScope from "@/components/smart-fiqh/SmartFiqhScope";

import "../smart-engine.css";

export const metadata = {
  title: "Smart Fiqh Shalat Lengkap",
};

export default function SmartFiqhShalatPage() {
  return (
    <>
      <SmartFiqhScope page="shalat" />

      <nav className="navbar">
        <div className="nav-container">
          <Link href="/" className="logo" aria-label="Portal Literasi Islam">
            <span className="logo-mark" aria-hidden="true">
              <Image
                src="/assets/images/logo.png"
                alt=""
                className="logo-icon"
                width={32}
                height={32}
                priority
              />
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
            Panduan Lengkap
          </span>

          <h1 id="heroTitle">Smart Fiqh Shalat Lengkap</h1>

          <p id="heroDesc">
            Panduan fiqh shalat yang lebih panjang, modern, dan konsisten untuk
            3 bahasa. Modul ini mencakup syarat wajib, syarat sah, thaharah,
            najis, aurat, kiblat, qadha, shalat Jumat, safar, qashar, jamak,
            imam-makmum, masbuq, rukun, sunnah ab&apos;adh, uzur medis, serta
            kondisi darurat di kendaraan dengan analisis fiqh dan dalil ringkas.
          </p>
        </div>
      </section>

      <section className="fiqh-insight">
        <div className="fiqh-insight-grid">
          <article className="fiqh-insight-card">
            <div className="insight-badge" id="noteBadgeSecondary">
              Panduan Lengkap
            </div>

            <h3 id="fiqhNoteTitle">Penjelasan Fiqh Tambahan</h3>

            <p id="fiqhNoteBody">
              Modul ini tidak hanya mengejar sah atau batal, tetapi juga
              membantu membedakan mana yang termasuk syarat, rukun, wajib
              praktis, sunnah penyempurna, dan rukhsah ketika ada uzur. Untuk
              kasus yang sangat rinci seperti perbedaan rincian mazhab, shalat
              di ICU, operasi besar, jamaah Jumat di tempat terbatas, atau
              akumulasi qadha bertahun-tahun, tetap disarankan merujuk kepada
              guru fiqh atau mufti yang terpercaya.
            </p>
          </article>

          <article className="fiqh-insight-card">
            <div className="insight-badge" id="methodBadge">
              Metode Sistem
            </div>

            <h3 id="smartMethodTitle">Metode Smart Analyzer</h3>

            <p id="smartMethodBody">
              Alur analisis dibangun bertahap agar keputusan shalat tidak
              tergesa-gesa dan tetap mudah dipahami pengguna awam maupun
              penuntut ilmu.
            </p>

            <ul className="smart-method-list">
              <li id="smartMethodPoint1">
                1) Tashawwur: identifikasi jenis kasus, apakah shalat biasa,
                qadha, Jumat, safar, sakit, atau keadaan darurat.
              </li>

              <li id="smartMethodPoint2">
                2) Takyif Fiqhi: cek syarat wajib, syarat sah, rukun, dan rukhsah
                yang relevan sebelum mengeluarkan hasil.
              </li>

              <li id="smartMethodPoint3">
                3) Tanzil: keluarkan status hukum, prioritas tindakan, dalil
                ringkas, serta catatan risiko bila pengguna salah memahami
                kasusnya.
              </li>
            </ul>
          </article>
        </div>
      </section>

      <main className="engine-wrapper">
        <section className="engine-card">
          <div className="engine-head">
            <h2 id="engineTitle">AI Fiqh Analyzer: Shalat</h2>
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

              <span
                className="arabic-ibarah"
                id="resultIbarah"
              ></span>
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
        <p id="smartFooterCopy">
          &copy; 2026 Portal Literasi Islam - Smart Fiqh Shalat Lengkap
        </p>
      </footer>
    </>
  );
}