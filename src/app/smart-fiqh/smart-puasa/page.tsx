import Image from "next/image";
import Link from "next/link";

import SmartFiqhScope from "@/components/smart-fiqh/SmartFiqhScope";

import "./smart-engine-puasa.css";

export const metadata = {
  title: "Smart Fiqh Puasa | Portal Literasi Islam",
};

export default function SmartFiqhPuasaPage() {
  return (
    <>
      <SmartFiqhScope page="puasa" />

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

      <section className="hero">
        <div className="hero-badge" id="noteBadge">
          Smart Fiqh
        </div>

        <h1 id="heroTitle">Smart Fiqh Puasa</h1>

        <p id="heroDesc">
          Panduan fiqh puasa Ramadhan, qadha, nadzar, dan puasa sunnah dengan
          pertanyaan yang lebih panjang, dalil ringkas, serta analisis fiqh
          modern berbasis mazhab Syafi'i.
        </p>
      </section>

      <main className="engine-wrapper">
        <section className="engine-card">
          <div className="engine-head">
            <h2 id="engineTitle">AI Fiqh Analyzer: Puasa</h2>
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

            <div className="fiqh-evidence-wrap" id="fiqhEvidenceWrap">
              <p className="result-line result-arabic-line">
                <strong id="labelIbarah">Ibarah:</strong>
                <span id="resultIbarah" className="arabic-ibarah"></span>
              </p>

              <p className="result-line">
                <strong id="labelEvidenceText">Dalil:</strong>{" "}
                <span id="resultEvidence"></span>
              </p>
            </div>
          </div>

          <section className="ai-panel">
            <div className="panel-top">
              <span className="mini-badge" id="noteBadgeSecondary">
                Analisis
              </span>

              <h3 id="aiPanelTitle">AI Insight Modern</h3>
            </div>

            <div className="ai-grid">
              <article className="ai-item">
                <h4 id="aiSummaryLabel">Ringkasan</h4>
                <p id="aiSummary">
                  Sistem akan menampilkan ringkasan hukum sesuai jawaban Anda.
                </p>
              </article>

              <article className="ai-item">
                <h4 id="aiReasoningLabel">Analisis Fiqh</h4>
                <p id="aiReasoning">
                  Analisis fiqh akan muncul setelah hasil ditentukan.
                </p>
              </article>

              <article className="ai-item">
                <h4 id="aiRiskLabel">Catatan Risiko</h4>
                <p id="aiRisk">
                  Perhatikan kondisi khusus seperti sakit berat, kehamilan
                  berisiko, atau keterlambatan qadha.
                </p>
              </article>

              <article className="ai-item">
                <h4 id="aiAdviceLabel">Saran Praktis</h4>
                <p id="aiAdvice">
                  Catat jenis puasa, niat, dan sebab uzur agar putusan lebih
                  presisi.
                </p>
              </article>
            </div>
          </section>

          <div className="reset-wrap">
            <button type="button" className="btn-reset" id="resetBtn">
              Mulai Ulang
            </button>
          </div>
        </section>
      </main>

      <section className="fiqh-insight">
        <div className="fiqh-insight-grid">
          <article className="fiqh-insight-card">
            <span className="mini-badge" id="methodBadge">
              Ushul
            </span>

            <h3 id="fiqhNoteTitle">Penjelasan Fiqh Tambahan</h3>

            <p id="fiqhNoteBody">
              Modul ini membantu menilai syarat wajib, syarat sah, rukun puasa
              (niat dan imsak), jenis-jenis puasa, pembatal, uzur, qadha,
              fidyah, kaffarah, serta adab penyempurna ibadah.
            </p>
          </article>

          <article className="fiqh-insight-card">
            <h3 id="smartMethodTitle">Metode Smart Analyzer</h3>

            <p id="smartMethodBody">
              Alur dibangun dengan tahapan tashawwur, takyif fiqhi, dan tanzil
              agar keputusan lebih stabil, konsisten, dan mudah dipahami lintas
              bahasa.
            </p>

            <ul className="smart-method-list">
              <li id="smartMethodPoint1">
                1) Tashawwur: identifikasi apakah kasus ini Ramadhan, qadha,
                nadzar, atau puasa sunnah seperti Senin-Kamis, Ayyamul Bidh,
                Arafah, Asyura, atau Dawud.
              </li>

              <li id="smartMethodPoint2">
                2) Takyif Fiqhi: petakan status mukallaf, haid/nifas, niat, uzur
                syar'i, serta pembatal yang disengaja atau tidak disengaja.
              </li>

              <li id="smartMethodPoint3">
                3) Tanzil: tampilkan status hukum, kewajiban turunan, dalil
                ringkas, ibarah fiqh, catatan risiko, dan saran praktis.
              </li>
            </ul>
          </article>
        </div>
      </section>

      <footer className="smart-footer">
        <p id="smartFooterCopy">
          &copy; 2026 Portal Literasi Islam - Smart Fiqh Puasa
        </p>
      </footer>
    </>
  );
}