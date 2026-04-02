import Script from "next/script";
import Image from "next/image";

export const metadata = {
  title: "Admin Portal Literasi Islam",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function AdminPage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="/css/portal-admin.css" />

      <div className="admin-shell">
        <header className="admin-topbar">
          <a href="/" className="brand-mark">
            <span className="brand-icon" aria-hidden="true">
              <Image src="/favicon.ico" alt="" width={24} height={24} priority />
            </span>
            <span>
              <strong>Portal Literasi Islam</strong>
              <small>Modern knowledge workspace</small>
            </span>
          </a>

          <nav className="topbar-nav">
            <a href="/">Beranda</a>
            <a href="/smart">Smart Fiqh</a>
            <a href="/zakat">Kalkulator Zakat</a>
          </nav>

          <div className="topbar-actions">
            <div className="session-pill">
              <span className="session-label">Admin aktif</span>
              <strong id="adminIdentity">Memuat...</strong>
            </div>
            <button type="button" className="ghost-btn" id="logoutButton">
              Keluar
            </button>
          </div>
        </header>

        <main className="admin-main">
          <section className="admin-hero">
            <div className="hero-copy">
              <p className="eyebrow">Dashboard Admin</p>
              <h1>Dashboard administrasi dan pengelolaan Portal Literasi Islam.</h1>
              <p className="hero-text">
                Halaman ini merupakan panel administrasi untuk pengelolaan akun
                pengguna, memantau aktivitas zakat dan donasi, serta meninjau
                ringkasan data interaksi pembaca dari seluruh modul dan layanan
                portal.
              </p>

              <div className="hero-actions">
                <a href="/" className="secondary-btn">
                  Kembali ke portal
                </a>
              </div>
            </div>

            <div className="hero-panel">
              <h2>Ringkasan sistem</h2>
              <ul className="hero-points">
                <li>Sistem autentikasi lokal untuk manajemen akun portal</li>
                <li>
                  Pengaturan hak akses berbasis peran untuk admin dan member
                </li>
                <li>
                  Kompatibel dengan data historis yang tersimpan di browser
                </li>
              </ul>

              <div className="hero-meta">
                <div>
                  <span>Terdaftar</span>
                  <strong id="heroUserCount">0 akun</strong>
                </div>
                <div>
                  <span>Transaksi</span>
                  <strong id="heroTransactionCount">0 aktivitas</strong>
                </div>
              </div>
            </div>
          </section>

          <section className="stats-grid">
            <article className="stat-card emerald">
              <span className="stat-label">Total Pengguna</span>
              <strong id="totalUsers">0</strong>
              <p>Akun yang tersimpan pada sistem portal.</p>
            </article>

            <article className="stat-card gold">
              <span className="stat-label">Total Admin</span>
              <strong id="totalAdmins">0</strong>
              <p>Admin yang dapat membuka dashboard ini.</p>
            </article>

            <article className="stat-card blue">
              <span className="stat-label">Riwayat Transaksi</span>
              <strong id="totalTransactions">0</strong>
              <p>Gabungan data zakat, donasi, dan histori terkait.</p>
            </article>

            <article className="stat-card night">
              <span className="stat-label">Total Nominal</span>
              <strong id="totalCollections">Rp 0</strong>
              <p>Akumulasi nominal yang tercatat di browser ini.</p>
            </article>
          </section>

          <section className="panel-grid">
            <article className="admin-panel">
              <div className="panel-head">
                <div>
                  <p className="panel-kicker">Manajemen akun</p>
                  <h2>Pengguna terbaru</h2>
                </div>
                <button
                  type="button"
                  className="tiny-btn"
                  id="exportUsersButton"
                >
                  Export users
                </button>
              </div>

              <div className="table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Nama</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Bergabung</th>
                    </tr>
                  </thead>
                  <tbody id="usersTableBody"></tbody>
                </table>
              </div>
            </article>

            <article className="admin-panel">
              <div className="panel-head">
                <div>
                  <p className="panel-kicker">Aktivitas portal</p>
                  <h2>Transaksi terbaru</h2>
                </div>
                <button
                  type="button"
                  className="tiny-btn danger"
                  id="clearAnalyticsButton"
                >
                  Reset analytics
                </button>
              </div>

              <div className="table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Nama</th>
                      <th>Kategori</th>
                      <th>Nominal</th>
                      <th>Tanggal</th>
                    </tr>
                  </thead>
                  <tbody id="transactionsTableBody"></tbody>
                </table>
              </div>
            </article>
          </section>

          <section className="insight-grid">
            <article className="admin-panel compact">
              <div className="panel-head">
                <div>
                  <p className="panel-kicker">Distribusi konten</p>
                  <h2>Aktivitas per kategori</h2>
                </div>
              </div>
              <div id="categoryStats" className="metric-stack"></div>
            </article>

            <article className="admin-panel compact">
              <div className="panel-head">
                <div>
                  <p className="panel-kicker">Akses cepat</p>
                  <h2>Kelola area penting</h2>
                </div>
              </div>
              <div className="quick-links">
                <a href="/smart">Smart Fiqh</a>
                <a href="/ramadhan">Jadwal Imsakiyah</a>
                <a href="/bookmark">Bookmark</a>
                <a href="/kontak">Kontak</a>
              </div>
            </article>

            <article className="admin-panel compact">
              <div className="panel-head">
                <div>
                  <p className="panel-kicker">Audit auth</p>
                  <h2>Aktivitas login terakhir</h2>
                </div>
              </div>
              <ul id="auditList" className="audit-list"></ul>
            </article>
          </section>
        </main>
      </div>

      <Script src="/js/admin-pages-i18n.js?v=20260317b" strategy="afterInteractive" />
      <Script src="/js/portal-admin.js?v=20260317b" strategy="afterInteractive" />
    </>
  );
}