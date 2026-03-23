import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Muamalah Syariah | Portal Literasi Islam",
  description:
    "Kalkulator dan panduan akad syariah berdasarkan prinsip fiqih muamalah yang disepakati ulama.",
};

export default function MuamalahPage() {
  return (
    <>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />
      <link rel="stylesheet" href="/css/muamalah.css?v=20260323c" />

      <div className="muamalah-page">
        <nav className="muamalah-nav">
          <div className="muamalah-nav-inner">
            <Link href="/" className="muamalah-brand muamalah-brand-glass">
              <img
                className="muamalah-brand-icon"
                src="/favicon.ico"
                alt=""
              />
              <span
                className="muamalah-brand-text"
                data-i18n="brand_portal"
              >
                Portal Literasi Islam
              </span>
            </Link>

            <div className="muamalah-nav-center">
              <Link
                href="/"
                className="muamalah-nav-home"
                data-i18n="nav_home"
              >
                Beranda
              </Link>

              <div className="muamalah-nav-links">
                <Link href="/zakat" data-i18n="nav_zakat">
                  Zakat
                </Link>
                <Link href="/tools/mawaris" data-i18n="nav_mawaris">
                  Mawaris
                </Link>
              </div>
            </div>

            <div className="muamalah-lang">
              <button
                type="button"
                className="muamalah-lang-btn active"
                data-lang="id"
              >
                ID
              </button>
              <button
                type="button"
                className="muamalah-lang-btn"
                data-lang="en"
              >
                EN
              </button>
              <button
                type="button"
                className="muamalah-lang-btn"
                data-lang="ar"
              >
                AR
              </button>
            </div>
          </div>
        </nav>

        <header className="muamalah-hero">
          <h1 data-i18n="hero_title">Muamalah Syariah</h1>
          <p data-i18n="hero_desc">
            Kalkulator dan panduan akad syariah berdasarkan prinsip fiqih
            muamalah yang disepakati ulama.
          </p>
        </header>

        <main className="muamalah-main">
          <div className="muamalah-tools-grid">
            {/* TOOL 1: Bagi Hasil */}
            <section className="muamalah-section" id="tool-bagihasil">
              <div className="muamalah-tool-card">
                <h2>
                  <span>📊</span>{" "}
                  <span data-i18n="tool1_title">
                    Kalkulator Bagi Hasil Syariah
                  </span>
                </h2>

                <div className="muamalah-form-group">
                  <label data-i18n="tool1_modal">Total Modal (Rp)</label>
                  <input
                    type="number"
                    id="bagihasil-modal"
                    placeholder="0"
                    min="0"
                    step="1"
                  />
                </div>

                <div className="muamalah-form-group">
                  <label data-i18n="tool1_profit">Total Keuntungan (Rp)</label>
                  <input
                    type="number"
                    id="bagihasil-profit"
                    placeholder="0"
                    min="0"
                    step="1"
                  />
                </div>

                <div className="muamalah-form-group">
                  <label data-i18n="tool1_type">Jenis Akad</label>
                  <select id="bagihasil-type">
                    <option value="mudharabah" data-i18n="tool1_mudharabah">
                      Mudharabah
                    </option>
                    <option value="musyarakah" data-i18n="tool1_musyarakah">
                      Musyarakah
                    </option>
                  </select>
                </div>

                <div className="muamalah-form-group">
                  <label data-i18n="tool1_nisbah_owner">
                    Nisbah Pemilik Modal (%)
                  </label>
                  <input
                    type="number"
                    id="bagihasil-nisbah-owner"
                    placeholder="60"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </div>

                <div className="muamalah-form-group">
                  <label data-i18n="tool1_nisbah_worker">
                    Nisbah Pengelola / Mitra (%)
                  </label>
                  <input
                    type="number"
                    id="bagihasil-nisbah-worker"
                    placeholder="40"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </div>

                <div className="muamalah-form-actions">
                  <button
                    type="button"
                    className="muamalah-btn muamalah-btn-primary"
                    id="bagihasil-calc"
                    data-i18n="btn_calc"
                  >
                    Hitung
                  </button>
                  <button
                    type="button"
                    className="muamalah-btn muamalah-btn-reset"
                    id="bagihasil-reset"
                    data-i18n="btn_reset"
                  >
                    Reset
                  </button>
                </div>

                <div className="muamalah-result" id="bagihasil-result"></div>
              </div>
            </section>

            {/* TOOL 2: Murabahah */}
            <section className="muamalah-section" id="tool-murabahah">
              <div className="muamalah-tool-card">
                <h2>
                  <span>🏪</span>{" "}
                  <span data-i18n="tool2_title">Kalkulator Murabahah</span>
                </h2>

                <div className="muamalah-form-group">
                  <label data-i18n="tool2_cost">Harga Pokok (Rp)</label>
                  <input
                    type="number"
                    id="murabahah-cost"
                    placeholder="0"
                    min="0"
                    step="1"
                  />
                </div>

                <div className="muamalah-form-group">
                  <label data-i18n="tool2_margin">Margin (%)</label>
                  <input
                    type="number"
                    id="murabahah-margin"
                    placeholder="10"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="muamalah-form-group">
                  <label data-i18n="tool2_tenor">Tenor Cicilan (bulan)</label>
                  <input
                    type="number"
                    id="murabahah-tenor"
                    placeholder="12"
                    min="1"
                    step="1"
                  />
                </div>

                <div className="muamalah-form-actions">
                  <button
                    type="button"
                    className="muamalah-btn muamalah-btn-primary"
                    id="murabahah-calc"
                    data-i18n="btn_calc"
                  >
                    Hitung
                  </button>
                  <button
                    type="button"
                    className="muamalah-btn muamalah-btn-reset"
                    id="murabahah-reset"
                    data-i18n="btn_reset"
                  >
                    Reset
                  </button>
                </div>

                <div className="muamalah-result" id="murabahah-result"></div>
              </div>
            </section>

            {/* TOOL 3: Wasiat */}
            <section className="muamalah-section" id="tool-wasiat">
              <div className="muamalah-tool-card">
                <h2>
                  <span>📜</span>{" "}
                  <span data-i18n="tool3_title">Kalkulator Wasiat</span>
                </h2>

                <div className="muamalah-form-group">
                  <label data-i18n="tool3_wealth">Total Harta (Rp)</label>
                  <input
                    type="number"
                    id="wasiat-wealth"
                    placeholder="0"
                    min="0"
                    step="1"
                  />
                </div>

                <div className="muamalah-form-group">
                  <label data-i18n="tool3_value">Nilai Wasiat (Rp)</label>
                  <input
                    type="number"
                    id="wasiat-value"
                    placeholder="0"
                    min="0"
                    step="1"
                  />
                </div>

                <div className="muamalah-form-actions">
                  <button
                    type="button"
                    className="muamalah-btn muamalah-btn-primary"
                    id="wasiat-calc"
                    data-i18n="btn_calc"
                  >
                    Hitung
                  </button>
                  <button
                    type="button"
                    className="muamalah-btn muamalah-btn-reset"
                    id="wasiat-reset"
                    data-i18n="btn_reset"
                  >
                    Reset
                  </button>
                </div>

                <div className="muamalah-result" id="wasiat-result"></div>
              </div>
            </section>

            {/* TOOL 4: Hibah */}
            <section className="muamalah-section" id="tool-hibah">
              <div className="muamalah-tool-card">
                <h2>
                  <span>🎁</span>{" "}
                  <span data-i18n="tool4_title">
                    Kalkulator Hibah Sederhana
                  </span>
                </h2>

                <div className="muamalah-form-group">
                  <label data-i18n="tool4_wealth">Total Harta (Rp)</label>
                  <input
                    type="number"
                    id="hibah-wealth"
                    placeholder="0"
                    min="0"
                    step="1"
                  />
                </div>

                <div className="muamalah-form-group">
                  <label data-i18n="tool4_value">Nilai Hibah (Rp)</label>
                  <input
                    type="number"
                    id="hibah-value"
                    placeholder="0"
                    min="0"
                    step="1"
                  />
                </div>

                <div className="muamalah-form-actions">
                  <button
                    type="button"
                    className="muamalah-btn muamalah-btn-primary"
                    id="hibah-calc"
                    data-i18n="btn_calc"
                  >
                    Hitung
                  </button>
                  <button
                    type="button"
                    className="muamalah-btn muamalah-btn-reset"
                    id="hibah-reset"
                    data-i18n="btn_reset"
                  >
                    Reset
                  </button>
                </div>

                <div className="muamalah-result" id="hibah-result"></div>
              </div>
            </section>

            {/* TOOL 5: Akad Checker */}
            <section className="muamalah-section" id="tool-akad">
              <div className="muamalah-tool-card">
                <h2>
                  <span>✅</span>{" "}
                  <span data-i18n="tool5_title">Checker Akad Syariah</span>
                </h2>

                <div className="muamalah-form-group">
                  <label data-i18n="tool5_select">Pilih Jenis Akad</label>
                  <select id="akad-type">
                    <option value="" data-i18n="tool5_choose">
                      -- Pilih Akad --
                    </option>
                    <option value="mudharabah" data-i18n="akad_mudharabah">
                      Mudharabah
                    </option>
                    <option value="musyarakah" data-i18n="akad_musyarakah">
                      Musyarakah
                    </option>
                    <option value="murabahah" data-i18n="akad_murabahah">
                      Murabahah
                    </option>
                    <option value="ijarah" data-i18n="akad_ijarah">
                      Ijarah
                    </option>
                    <option value="salam" data-i18n="akad_salam">
                      Salam
                    </option>
                    <option value="istishna" data-i18n="akad_istishna">
                      Istishna
                    </option>
                    <option value="wadiah" data-i18n="akad_wadiah">
                      Wadiah
                    </option>
                    <option value="hibah" data-i18n="akad_hibah">
                      Hibah
                    </option>
                    <option value="wasiat" data-i18n="akad_wasiat">
                      Wasiat
                    </option>
                  </select>
                </div>

                <div
                  className="muamalah-akad-content"
                  id="akad-content"
                  style={{ display: "none" }}
                ></div>
              </div>
            </section>
          </div>
        </main>

        <section className="muamalah-prefooter">
          <div className="muamalah-prefooter-inner">
            <div className="muamalah-prefooter-col">
              <h4 data-i18n="footer_portal">Portal Literasi Islam</h4>
              <p data-i18n="footer_desc">
                Kajian Islam berbasis literatur dan analisis ilmiah.
              </p>
            </div>

            <div className="muamalah-prefooter-col">
              <h4 data-i18n="footer_tools">Tools</h4>
              <ul>
                <li>
                  <Link href="/zakat" data-i18n="footer_zakat">
                    Kalkulator Zakat
                  </Link>
                </li>
                <li>
                  <Link href="/tools/mawaris" data-i18n="footer_mawaris">
                    Kalkulator Mawaris
                  </Link>
                </li>
                <li>
                  <Link href="/muamalah" data-i18n="footer_muamalah">
                    Muamalah Syariah
                  </Link>
                </li>
              </ul>
            </div>

            <div className="muamalah-prefooter-col">
              <h4 data-i18n="footer_note">Catatan</h4>
              <p data-i18n="footer_disclaimer">
                Kalkulator ini bersifat bantuan edukasi. Konsultasi dengan
                ahlinya untuk keputusan final.
              </p>
            </div>
          </div>
        </section>

        <footer className="muamalah-footer">
          <div className="muamalah-footer-links">
            <Link href="/about" data-i18n="footer_about">
              Tentang
            </Link>
            <Link href="/kontak" data-i18n="footer_contact">
              Kontak
            </Link>
            <Link href="/faq" data-i18n="footer_faq">
              FAQ
            </Link>
          </div>
          <div className="muamalah-footer-copy" data-i18n="footer_copy">
            2026 Portal Literasi Islam
          </div>
        </footer>
      </div>

      <Script src="/js/muamalah.js?v=20260323c" strategy="afterInteractive" />
    </>
  );
}