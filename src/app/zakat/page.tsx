"use client";

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

export default function ZakatPage() {
  return (
    <>
      <link rel="canonical" href="https://islami-portal-next.vercel.app/zakat" />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="stylesheet" href="/css/zakat.css?v=20260323" />

      <nav className="main-navbar">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-glass">
              <img src="/favicon.ico" alt="" className="logo-icon" width={18} height={18} />
            </span>
            <span className="logo-text">Portal Literasi Islam</span>
          </div>

          <div className="nav-links">
            <Link href="/">Beranda</Link>
            <Link href="/ramadhan">Ramadhan</Link>
            <Link href="/bookmark">Bookmark</Link>
          </div>

          <div className="lang-switch" aria-label="Bahasa">
            <button type="button" data-lang="id">ID</button>
            <button type="button" data-lang="en">EN</button>
            <button type="button" data-lang="ar">AR</button>
          </div>

          <button id="themeToggle" className="theme-btn">
            🌙
          </button>
        </div>
      </nav>

      <section className="zakat-hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Kalkulator Zakat Modern</h1>
            <p>
              Hitung zakat maal, penghasilan, emas, perdagangan, dan fitrah
              dengan metode fiqih yang terpercaya.
            </p>

            <div className="hero-buttons">
              <a href="#zakat-app" className="hero-btn primary">
                Mulai Hitung
              </a>
              <Link href="/zakat-info" className="hero-btn secondary">
                Pelajari Zakat
              </Link>
            </div>
          </div>

          <div className="hero-image">
            <Image
              src="/assets/images/ilustrasi.png"
              alt="Ilustrasi Zakat"
              width={520}
              height={420}
              priority
            />
          </div>
        </div>
      </section>

      <section className="zakat-stats">
        <div className="stats-container">
          <div className="stat-box">
            <h3>10.000+</h3>
            <p>Pengguna</p>
          </div>
          <div className="stat-box">
            <h3>Rp 2 M+</h3>
            <p>Zakat dihitung</p>
          </div>
          <div className="stat-box">
            <h3>4 Mazhab</h3>
            <p>Metode perhitungan</p>
          </div>
          <div className="stat-box">
            <h3>100%</h3>
            <p>Sesuai fiqh</p>
          </div>
        </div>
      </section>

      <main>
        <div className="zakat-box zakat-mazhab">
          <h2>Metode Perhitungan</h2>

          <label>Pilih mazhab</label>
          <select id="mazhab">
            <option value="syafii">Syafi’i (umum di Indonesia)</option>
            <option value="hanafi">Hanafi</option>
            <option value="maliki">Maliki</option>
            <option value="hanbali">Hanbali</option>
          </select>

          <p className="mazhab-info" id="mazhab-info">
            Menggunakan standar umum zakat sesuai praktik mazhab Syafi’i.
          </p>
        </div>

        <div className="zakat-info-cards">
          <div className="info-card">
            <h3>Zakat Maal</h3>
            <p>
              Zakat atas harta yang disimpan selama 1 tahun dan telah mencapai
              nisab. Besarnya 2,5% dari total harta bersih.
            </p>
          </div>

          <div className="info-card">
            <h3>Zakat Penghasilan</h3>
            <p>
              Zakat dari gaji atau pendapatan rutin. Dikeluarkan jika
              penghasilan melebihi nisab bulanan.
            </p>
          </div>

          <div className="info-card">
            <h3>Zakat Fitrah</h3>
            <p>
              Zakat wajib setiap muslim menjelang Idul Fitri, sebesar ±2,5 kg
              bahan makanan pokok.
            </p>
          </div>

          <div className="info-card">
            <h3>📘 Tentang Zakat</h3>
            <p>
              Zakat adalah kewajiban bagi setiap muslim yang hartanya telah
              mencapai nisab dan haul. Besar zakat maal umumnya 2,5% dari harta
              bersih.
            </p>
          </div>

          <div className="info-card">
            <h3>⚖️ Nisab Zakat</h3>
            <p>
              Nisab zakat maal setara dengan <strong>85 gram emas</strong>. Jika
              harta mencapai nilai tersebut, maka wajib zakat.
            </p>
          </div>

          <div className="info-card">
            <h3>🤝 Penyaluran Zakat</h3>
            <p>
              Zakat dapat disalurkan melalui lembaga resmi seperti BAZNAS atau
              langsung kepada mustahik yang berhak.
            </p>
          </div>
        </div>

        <div className="zakat-user">
          <Link href="/admin" className="admin-btn">
            Lihat Perkembangan Zakat
          </Link>
        </div>

        <div id="zakat-app">
          <div className="zakat-page">
            <section className="zakat-container">
              <div className="zakat-tabs">
                <button className="tab-btn active" data-tab="maal">
                  Zakat Maal
                </button>
                <button className="tab-btn" data-tab="saham">
                  Saham
                </button>
                <button className="tab-btn" data-tab="fitrah">
                  Zakat Fitrah
                </button>
                <button className="tab-btn" data-tab="emas">
                  Zakat Emas
                </button>
                <button className="tab-btn" data-tab="penghasilan">
                  Penghasilan
                </button>
                <button className="tab-btn" data-tab="perdagangan">
                  Perdagangan
                </button>
                <button className="tab-btn" data-tab="pertanian">
                  Pertanian
                </button>
                <button className="tab-btn" data-tab="peternakan">
                  Peternakan
                </button>
                <button className="tab-btn" data-tab="rikaz">
                  Rikaz
                </button>
                <button className="tab-btn" data-tab="madin">
                  Barang Tambang
                </button>
                <button className="tab-btn" data-tab="perusahaan">
                  Perusahaan
                </button>
              </div>

              <div className="tab-content active" id="tab-maal">
                <div className="zakat-box">
                  <label>Uang tunai</label>
                  <input type="number" id="cash" placeholder="0" />

                  <label>Tabungan</label>
                  <input type="number" id="savings" placeholder="0" />

                  <label>Emas (rupiah)</label>
                  <input type="number" id="gold" placeholder="0" />

                  <label>Piutang</label>
                  <input type="number" id="receivable" placeholder="0" />

                  <label>Hutang jatuh tempo</label>
                  <input type="number" id="debt" placeholder="0" />

                  <label>Jenis Piutang</label>
                  <select id="receivableType">
                    <option value="kuat">Kuat (utang dagang / lancar)</option>
                    <option value="lemah">Lemah / belum pasti</option>
                  </select>

                  <div className="haul-check">
                    <input type="checkbox" id="haulMaal" />
                    <label htmlFor="haulMaal">Sudah haul (1 tahun)</label>
                  </div>

                  <div className="box-section">
                    <h4>Investasi Syariah</h4>

                    <label>Nilai Sukuk</label>
                    <input
                      type="number"
                      id="sukuk"
                      placeholder="Masukkan nilai sukuk"
                    />

                    <label>Reksa Dana Syariah</label>
                    <input
                      type="number"
                      id="reksadana"
                      placeholder="Masukkan nilai reksa dana"
                    />

                    <label>Aset Digital (Crypto sebagai maal)</label>
                    <input
                      type="number"
                      id="crypto"
                      placeholder="Masukkan nilai aset digital"
                    />
                  </div>

                  <div className="box-section">
                    <h4>Zakat Properti Sewa</h4>

                    <label>Total Pendapatan Sewa (1 tahun)</label>
                    <input type="number" id="sewaIncome" />

                    <label>Biaya Perawatan / Operasional</label>
                    <input type="number" id="sewaExpense" />
                  </div>
                </div>
              </div>

              <div className="tab-content" id="tab-saham">
                <div className="zakat-box">
                  <label>Total Nilai Saham</label>
                  <input type="number" id="stocks" placeholder="0" />

                  <label>Jenis Saham</label>
                  <select id="stockType">
                    <option value="trading">Saham Trading / Jual-Beli</option>
                    <option value="produksi">Saham Perusahaan Produksi</option>
                  </select>

                  <div id="stock-profit-section" style={{ display: "none" }}>
                    <label>Laba Bersih Perusahaan</label>
                    <input type="number" id="stockProfit" placeholder="0" />
                  </div>

                  <div id="haulSahamWrapper" className="haul-check">
                    <input type="checkbox" id="haulSaham" />
                    <label htmlFor="haulSaham">
                      Saham trading sudah haul
                    </label>
                  </div>
                </div>
              </div>

              <div className="tab-content" id="tab-perusahaan">
                <div className="zakat-box">
                  <h3>Zakat Perusahaan</h3>

                  <label>Aset Lancar</label>
                  <input
                    type="number"
                    id="companyCurrentAssets"
                    placeholder="0"
                  />

                  <label>Stok Barang</label>
                  <input type="number" id="companyStock" placeholder="0" />

                  <label>Piutang Lancar</label>
                  <input
                    type="number"
                    id="companyReceivable"
                    placeholder="0"
                  />

                  <label>Hutang Jatuh Tempo</label>
                  <input type="number" id="companyDebt" placeholder="0" />

                  <div className="haul-check">
                    <input type="checkbox" id="haulCompany" />
                    <label htmlFor="haulCompany">
                      Sudah mencapai haul (1 tahun)
                    </label>
                  </div>
                </div>
              </div>

              <div className="tab-content" id="tab-perdagangan">
                <div className="zakat-box">
                  <label>Modal usaha</label>
                  <input type="number" id="capital" placeholder="0" />

                  <label>Laba bersih</label>
                  <input type="number" id="profit" placeholder="0" />

                  <label>Stok barang</label>
                  <input type="number" id="stock" placeholder="0" />

                  <label>Piutang usaha</label>
                  <input
                    type="number"
                    id="businessReceivable"
                    placeholder="0"
                  />

                  <label>Hutang usaha</label>
                  <input type="number" id="businessDebt" placeholder="0" />

                  <div className="haul-check">
                    <input type="checkbox" id="haulPerdagangan" />
                    <label htmlFor="haulPerdagangan">
                      Usaha sudah haul (1 tahun)
                    </label>
                  </div>
                </div>
              </div>

              <div className="tab-content" id="tab-fitrah">
                <div className="zakat-box">
                  <label>Jumlah anggota keluarga</label>
                  <input
                    type="number"
                    id="fitrah-jumlah"
                    defaultValue="1"
                  />

                  <label>Harga beras per kg (Rp)</label>
                  <input
                    type="number"
                    id="fitrah-harga"
                    defaultValue="15000"
                  />
                </div>
              </div>

              <div className="tab-content" id="tab-emas">
                <div className="zakat-box">
                  <label>Berat emas (gram)</label>
                  <input type="number" id="emas-gram" defaultValue="0" />

                  <label>Harga emas per gram (Rp)</label>
                  <input
                    type="number"
                    id="emas-harga"
                    defaultValue="1000000"
                  />

                  <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                      <input type="checkbox" id="emasDipakai" />
                      <span>Emas ini dipakai sebagai perhiasan sehari-hari</span>
                    </label>
                  </div>

                  <div className="haul-check">
                    <input type="checkbox" id="haulEmas" />
                    <label htmlFor="haulEmas">Sudah haul (1 tahun)</label>
                  </div>
                </div>
              </div>

              <div className="tab-content" id="tab-penghasilan">
                <div className="zakat-box">
                  <label>Penghasilan bulanan</label>
                  <input type="number" id="salary" placeholder="0" />

                  <label>Kebutuhan pokok bulanan</label>
                  <input type="number" id="expenses" placeholder="0" />

                  <div className="haul-check">
                    <input type="checkbox" id="haulSalary" />
                    <label htmlFor="haulSalary">
                      Penghasilan sudah haul (1 tahun)
                    </label>
                  </div>

                  <label>Metode Zakat Penghasilan</label>
                  <select id="salaryMethod">
                    <option value="haul">Haul Tahunan (1 tahun)</option>
                    <option value="monthly">Bulanan Langsung</option>
                  </select>
                </div>
              </div>

              <div className="tab-content" id="tab-pertanian">
                <div className="zakat-box">
                  <label>Total hasil panen (kg)</label>
                  <input type="number" id="harvest" placeholder="0" />

                  <label>Harga per kg (Rp)</label>
                  <input type="number" id="harvestPrice" placeholder="0" />

                  <label>Jenis pengairan</label>
                  <select id="irrigationType">
                    <option value="10">Tadah hujan (10%)</option>
                    <option value="5">Irigasi biaya sendiri (5%)</option>
                    <option value="7.5">Campuran (7.5%)</option>
                  </select>
                </div>
              </div>

              <div className="tab-content" id="tab-peternakan">
                <div className="zakat-box">
                  <h4>Syarat Wajib Zakat Ternak</h4>

                  <div className="haul-check">
                    <input type="checkbox" id="haulTernak" />
                    <label htmlFor="haulTernak">Sudah haul 1 tahun</label>
                  </div>

                  <div className="haul-check">
                    <input type="checkbox" id="ternakGembala" />
                    <label htmlFor="ternakGembala">
                      Digembalakan mayoritas tahun (sa’imah)
                    </label>
                  </div>

                  <div className="haul-check">
                    <input type="checkbox" id="ternakBukanKerja" />
                    <label htmlFor="ternakBukanKerja">
                      Bukan ternak pekerja (bukan bajak/angkut)
                    </label>
                  </div>

                  <label>Jumlah kambing</label>
                  <input type="number" id="goatCount" placeholder="0" />

                  <label>Jumlah sapi</label>
                  <input type="number" id="cowCount" placeholder="0" />

                  <label>Jumlah Unta</label>
                  <input type="number" id="camelCount" placeholder="0" />
                </div>
              </div>

              <div className="tab-content" id="tab-rikaz">
                <div className="zakat-box">
                  <label>Nilai Rikaz (Harta Terpendam / Karun)</label>
                  <input type="number" id="rikaz" placeholder="0" />

                  <p style={{ fontSize: "13px", color: "#777", marginTop: "8px" }}>
                    Zakat rikaz sebesar 20% dan tidak mensyaratkan haul maupun
                    nisab.
                  </p>
                </div>
              </div>

              <div className="tab-content" id="tab-madin">
                <div className="zakat-box">
                  <label>Nilai Barang Tambang</label>
                  <input type="number" id="madin" placeholder="0" />

                  <label>Mazhab Perhitungan</label>
                  <select id="madinMazhab">
                    <option value="025">Mayoritas (2.5%)</option>
                    <option value="20">Hanafi (20%)</option>
                  </select>
                </div>
              </div>

              <div className="zakat-box zakat-settings">
                <h2>Pengaturan Nisab</h2>
                <label>Harga emas per gram</label>
                <input type="number" id="goldPrice" placeholder="1000000" />
                <label>Metode Nisab</label>
                <select id="nisabMethod">
                  <option value="emas">Emas (85 gram)</option>
                  <option value="perak">Perak (595 gram)</option>
                </select>
              </div>

              <button
                className="zakat-btn"
                onClick={() => (window as any).calculateAllZakat?.()}
              >
                Hitung Semua Zakat
              </button>

              <div id="zakat-result" className="zakat-result"></div>

              <div className="disclaimer-box">
                <small>
                  <strong>Disclaimer:</strong>
                  <br />
                  Perhitungan zakat dalam aplikasi ini mengikuti standar
                  mayoritas ulama dengan pendekatan Mazhab Syafi’i sebagai
                  default, serta mempertimbangkan ijtihad kontemporer dalam
                  zakat profesi, saham, dan bentuk harta modern. Untuk kondisi
                  khusus atau kasus yang kompleks, disarankan berkonsultasi
                  langsung dengan ahli fiqh atau lembaga zakat terpercaya.
                </small>
              </div>

              <canvas id="zakatChart" height={200}></canvas>

              <h3>Grafik Zakat Peternakan</h3>
              <canvas id="livestockChart"></canvas>

              <div className="zakat-pay">
                <a
                  href="https://baznas.go.id/bayarzakat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pay-btn"
                >
                  Bayar via BAZNAS
                </a>
              </div>

              <div className="zakat-history">
                <h3>Riwayat Zakat Tahunan</h3>
                <canvas id="historyChart" height={200}></canvas>
              </div>

              <div className="zakat-history">
                <h3>Riwayat Zakat Bulanan</h3>
                <ul id="monthly-history"></ul>
              </div>

              <div id="ternakModal" className="modal">
                <div className="modal-content">
                  <span
                    className="close"
                    onClick={() => (window as any).closeTernakInfo?.()}
                  >
                    &times;
                  </span>
                  <h3>Penjelasan Istilah Zakat Ternak</h3>
                  <div id="ternakModalContent"></div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <section className="zakat-cta">
        <div className="cta-box">
          <h2>Tunaikan Zakat Anda Sekarang</h2>
          <p>
            Hitung zakat secara mudah dan salurkan melalui lembaga resmi
            terpercaya.
          </p>

          <div className="cta-buttons">
            <a href="#zakat-app" className="cta-primary">
              Mulai Hitung
            </a>
            <a
              href="https://baznas.go.id"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-secondary"
            >
              Bayar via BAZNAS
            </a>
          </div>
        </div>
      </section>

      <button id="scrollToTopBtn" className="scroll-to-top" aria-label="Kembali ke atas" type="button">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 19V5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <path
            d="M6 11L12 5L18 11"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <footer className="site-footer">
        <div className="footer-links">
          <Link href="/about">Tentang</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/kontak">Kontak</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/disclaimer">Disclaimer</Link>
        </div>

        <div className="footer-copy">
          2026 Portal Literasi Islam – Seluruh hak cipta dilindungi.
        </div>
      </footer>

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-5YD3GDLQVG"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', 'G-5YD3GDLQVG');
        `}
      </Script>

      <Script
        src="https://cdn.jsdelivr.net/npm/chart.js"
        strategy="afterInteractive"
      />

      <Script src="/js/zakat.js?v=20260319a" strategy="afterInteractive" />
      <Script src="/js/zakat-pages-i18n.js?v=20260318b" strategy="afterInteractive" />
      <Script src="/js/auth.js?v=20260318b" strategy="afterInteractive" />
      <Script src="/js/access-guard.js?v=20260318b" strategy="afterInteractive" />
    </>
  );
}