"use client";

import Script from "next/script";

export default function AdminPage() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-5YD3GDLQVG"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-5YD3GDLQVG');
        `}
      </Script>

      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="stylesheet" href="/css/admin.css?v=20260318b" />

      <nav className="main-navbar">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-icon">📊</span>
            <span className="logo-text">Zakat Portal</span>
          </div>

          <ul className="nav-menu">
            <li><a href="/">Beranda</a></li>
            <li><a href="/zakat">Kalkulator Zakat</a></li>
            <li><a href="/donasi">Donasi</a></li>
            <li><a href="/about">Tentang</a></li>
            <li><a href="/portal-admin">Admin</a></li>
          </ul>
        </div>
      </nav>

      <div className="admin-header">
        <h1>Riwayat Zakat</h1>

        <div className="admin-actions">
          <select id="filter-type" className="filter-select">
            <option value="all">Semua Kategori</option>
            <option value="Zakat">Zakat</option>
            <option value="Donasi">Donasi</option>
            <option value="Fitrah">Fitrah</option>
          </select>

          <button className="export-btn" onClick={() => (window as any).exportToExcel?.()}>
            Export Excel
          </button>
          <button className="pdf-btn" onClick={() => (window as any).exportToPDF?.()}>
            Export PDF
          </button>
          <button className="reset-btn" onClick={() => (window as any).resetAllData?.()}>
            Reset Data
          </button>
        </div>
      </div>

      <div className="admin-stats">
        <div className="stat">
          <h2 id="total-users">0</h2>
          <p>Total Transaksi</p>
        </div>

        <div className="stat">
          <h2 id="total-zakat">Rp 0</h2>
          <p>Total Zakat Saya</p>
        </div>
      </div>

      <h2>Riwayat Zakat</h2>
      <div className="admin-table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Jenis</th>
              <th>Jumlah</th>
              <th>Tanggal</th>
            </tr>
          </thead>
          <tbody id="zakat-table"></tbody>
        </table>
      </div>

      <div className="admin-chart">
        <h3>Grafik Zakat Bulanan</h3>
        <canvas id="monthlyChartTop"></canvas>
      </div>

      <section className="admin-dashboard">
        <div className="admin-stats">
          <div className="stat-card">
            <span>Total Zakat</span>
            <h2 id="stat-total-zakat">Rp 0</h2>
          </div>

          <div className="stat-card">
            <span>Total Transaksi</span>
            <h2 id="stat-total-transaksi">0</h2>
          </div>

          <div className="stat-card">
            <span>Total User</span>
            <h2 id="stat-total-user">0</h2>
          </div>
        </div>

        <div className="admin-filters">
          <label>Dari:</label>
          <input type="date" id="filter-from" />

          <label>Sampai:</label>
          <input type="date" id="filter-to" />

          <button
            onClick={() => (window as any).applyDateFilter?.()}
            className="filter-btn"
          >
            Terapkan
          </button>
        </div>

        <div className="admin-charts">
          <canvas id="yearlyChart" height={120}></canvas>
        </div>
      </section>

      <footer className="main-footer">
        <div className="footer-container">
          <div className="footer-col">
            <h3>Zakat Portal</h3>
            <p>
              Platform kalkulator dan pengelolaan zakat modern
              untuk memudahkan umat menunaikan kewajiban.
            </p>
          </div>

          <div className="footer-col">
            <h4>Menu</h4>
            <ul>
              <li><a href="/">Beranda</a></li>
              <li><a href="/zakat">Kalkulator</a></li>
              <li><a href="/donasi">Donasi</a></li>
              <li><a href="/about">Tentang</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Kontak</h4>
            <p>Email: nurcholism51@gmail.com</p>
            <p>WhatsApp: +62 821-2430-5278</p>
          </div>
        </div>

        <div className="footer-bottom">
          © 2026 Zakat Portal. All rights reserved.
        </div>
      </footer>

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

      <Script
        src="https://cdn.jsdelivr.net/npm/chart.js"
        strategy="afterInteractive"
      />

      <Script src="/js/admin-pages-i18n.js?v=20260318a" strategy="afterInteractive" />
      <Script src="/js/zakat.js?v=20260319a" strategy="afterInteractive" />
      <Script src="/js/admin.js?v=20260319a" strategy="afterInteractive" />
      <Script src="/js/auth.js?v=20260318a" strategy="afterInteractive" />
      <Script src="/js/access-guard.js?v=20260318a" strategy="afterInteractive" />
    </>
  );
}