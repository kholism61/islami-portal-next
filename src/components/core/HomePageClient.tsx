"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export default function HomePageClient() {
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    document.body.classList.add("home-page");
    setMounted(true);
    return () => {
      document.body.classList.remove("home-page");
    };
  }, []);

  useEffect(() => {
    const readCount = () => {
      try {
        const parsed = JSON.parse(window.localStorage.getItem("bookmarks") || "[]");
        const count = Array.isArray(parsed) ? parsed.length : 0;
        setBookmarkCount(count);
      } catch {
        setBookmarkCount(0);
      }
    };

    readCount();
    const onStorage = (event: StorageEvent) => {
      if (event.key === "bookmarks") readCount();
    };
    const onLocalUpdate = () => readCount();

    window.addEventListener("storage", onStorage);
    window.addEventListener("bookmarks-updated", onLocalUpdate as EventListener);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("bookmarks-updated", onLocalUpdate as EventListener);
    };
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />
      <link rel="stylesheet" href="/css/style.css?v=20260321a" />

      <div className="home-page">
        <section className="quick-menu">
          <div className="quick-menu-inner">
            <a href="/about" className="quick-card">
              <span className="icon">ℹ️</span>
              <div>
                <strong>Tentang</strong>
                <small>Profil &amp; visi portal</small>
              </div>
            </a>

            <a href="/faq" className="quick-card">
              <span className="icon">❓</span>
              <div>
                <strong>FAQ</strong>
                <small>Pertanyaan umum</small>
              </div>
            </a>

            <a href="/donasi" className="quick-card highlight">
              <span className="icon">🤝</span>
              <div>
                <strong>Donasi</strong>
                <small>Dukung dakwah ilmiah</small>
              </div>
            </a>

            <a href="/kontak" className="quick-card">
              <span className="icon">✉️</span>
              <div>
                <strong>Kontak</strong>
                <small>Masukan &amp; diskusi</small>
              </div>
            </a>

            <a href="/ramadhan" className="quick-card ramadhan-card">
              <span className="icon">🌙</span>
              <div>
                <strong>Jadwal Imsakiyah</strong>
                <small>Imsak &amp; Berbuka</small>
              </div>
            </a>
          </div>
        </section>

        <header className="navbar" suppressHydrationWarning>
          <button id="menuBtn" className="menu-btn" type="button">
            &#9776;
          </button>

          <div className="nav-logo-badge" aria-hidden="true">
            <img
              src="/assets/images/logo.png"
              alt=""
              className="nav-logo-img"
              loading="eager"
              decoding="async"
            />
          </div>
          <h1 className="logo">Portal Literasi Islam</h1>
          <button id="themeToggle" className="theme-toggle" type="button">
            🌙
          </button>
          <span id="offline-indicator" className="offline-indicator">
            🌐 Online
          </span>

          <div className="lang-dropdown" id="langDropdown">
            <button id="langBtn" className="lang-btn" type="button">
              🌐
            </button>

            <div className="lang-menu" suppressHydrationWarning>
              <button type="button" data-set-lang="id">
                🇮🇩 Indonesia
              </button>
              <button type="button" data-set-lang="en">
                🇬🇧 English
              </button>
              <button type="button" data-set-lang="ar">
                🇸🇦 العربية
              </button>
            </div>
          </div>

          <a href="/bookmark" className="nav-bookmark-icon">
            🔖
            <span className="bookmark-count" suppressHydrationWarning>
              {mounted ? bookmarkCount : ""}
            </span>
          </a>
        </header>

        <section className="hero">
          <div className="hero-overlay"></div>

          <div className="hero-content">
            <h1 className="hero-title">Portal Literasi Islam</h1>

            <p id="hero-subtitle" className="hero-text">
              Ruang kajian Islam yang membahas fiqh, hadis, dan pemikiran
              keislaman dalam konteks zaman modern secara ilmiah dan mendalam.
            </p>

            <p className="hero-tagline hero-text">
              Portal kajian Islam berbasis literatur, analisis ilmiah, dan
              refleksi pemikiran kontemporer.
            </p>

            <div className="hero-buttons hero-cta">
              <a href="#articles-container" className="btn-primary">
                📚 Mulai Membaca
              </a>
              <a href="#featured-article" className="btn-secondary">
                ⭐ Artikel Pilihan
              </a>
            </div>

            <div
              className="hero-buttons hero-auth-buttons"
              id="authActionBar"
            >
              <a
                href="/signin"
                className="btn-secondary auth-entry-btn"
                id="signInBtn"
              >
                Sign In
              </a>
              <a
                href="/signup"
                className="btn-secondary auth-entry-btn"
                id="signUpBtn"
              >
                Sign Up
              </a>
              <button
                type="button"
                className="btn-primary auth-exit-btn"
                id="logoutBtn"
                style={{ display: "none" }}
              >
                Log Out
              </button>
            </div>

            <div className="hero-featured-mini">
              <span id="hero-featured-label">⭐ Artikel Pilihan:</span>
              <a href="#" id="hero-featured-title">
                Memuat...
              </a>
            </div>
          </div>
        </section>

        <section className="home-stats">
          <div className="stat-card">
            <div className="stat-icon">📥</div>
            <div className="stat-info">
              <span id="stat-offline">0</span>
              <small>Artikel Offline</small>
            </div>
          </div>
        </section>

        <main className="content">
          <section className="welcome">
            <h2 className="welcome-title">
              Selamat Datang di <span>Portal Literasi Islam</span>
            </h2>

            <p className="welcome-desc">
              Portal Literasi Islam merupakan ruang kajian Islam yang
              menyajikan pembahasan fiqh, hadis, pemikiran Islam, serta
              isu-isu kontemporer dengan pendekatan{" "}
              <strong>ilmiah, berimbang, dan bertanggung jawab</strong>.
            </p>

            <div className="welcome-topics">
              <span>Ilmu Syariah</span>
              <span>Hadis</span>
              <span>Pemikiran Islam</span>
              <span>Islam &amp; Negara</span>
            </div>

            <div className="welcome-search">
              <input
                type="text"
                id="searchInput"
                placeholder="Cari artikel berdasarkan judul"
              />
            </div>
          </section>

          <section
            id="last-reading"
            className="last-reading"
            style={{ display: "none" }}
          >
            <h2>📖 Lanjutkan Membaca</h2>
            <div id="last-reading-card"></div>
          </section>

          <section className="reader-stats" id="reader-stats">
            <h3>📊 Statistik Membaca</h3>
            <div className="stats-grid">
              <div className="stat-box">
                <span id="stat-articles">0</span>
                <p>Artikel Dibaca</p>
              </div>

              <div className="stat-box">
                <span id="stat-time">0</span>
                <p>Menit Membaca</p>
              </div>

              <div className="stat-box">
                <span id="stat-last">—</span>
                <p>Terakhir Dibaca</p>
              </div>
            </div>
          </section>

          <section className="home-prayer-widget">
            <div className="widget-card">
              <div>
                <small>Imsak</small>
                <h3 id="home-imsak">--:--</h3>
              </div>
              <div>
                <small>Subuh</small>
                <h3 id="home-fajr">--:--</h3>
              </div>
              <div>
                <small>Maghrib</small>
                <h3 id="home-maghrib">--:--</h3>
              </div>
            </div>
          </section>

          <section className="intro-values">
            <div className="values-inner">
              <div className="value-item">
                <h3>Landasan Keilmuan</h3>
                <p>
                  Setiap tulisan disusun dengan rujukan literatur dan metodologi
                  yang dapat dipertanggungjawabkan secara akademik.
                </p>
              </div>

              <div className="value-item">
                <h3>Konteks Kontemporer</h3>
                <p>
                  Islam dibahas dalam relasinya dengan realitas sosial, politik,
                  dan intelektual masa kini secara proporsional.
                </p>
              </div>
            </div>
          </section>

          <section className="author-preview">
            <div className="author-preview-card">
              <h3 className="author-name">Muhammad Nurcholis</h3>

              <p className="author-cred">
                Mahasiswa Syariah wa Qanun — Universitas Al-Azhar, Kairo
              </p>

              <p className="author-desc">
                Menekuni kajian fiqh, pemikiran Islam, dan isu keislaman
                kontemporer dengan pendekatan literatur klasik dan analisis
                akademik.
              </p>

              <a href="/about" className="author-btn">
                Profil Lengkap →
              </a>
            </div>
          </section>

          <section
            id="featured-article"
            className="featured-section"
            style={{ display: "none" }}
          >
            <a id="featured-link" className="featured-card">
              <img id="featured-thumb" className="featured-thumb" alt="" />

              <div className="featured-content">
                <span className="featured-inline-badge">Artikel Pilihan</span>
                <span id="featured-category" className="category"></span>
                <h2 id="featured-title"></h2>
                <p id="featured-excerpt"></p>
                <span className="featured-cta">Baca Artikel →</span>
              </div>
            </a>
          </section>

          <section className="articles" id="articles">
            <div className="section-header">
              <h2>Artikel Terbaru</h2>
              <p className="section-subtitle">
                Kumpulan artikel terbaru seputar fiqh, hadis, pemikiran Islam,
                dan isu kontemporer.
              </p>

              <button id="download-category" className="btn-premium" type="button">
                ⬇️ Download kategori ini
              </button>

              <div
                id="download-progress"
                className="download-progress"
                style={{ display: "none" }}
              >
                <div className="progress-bar">
                  <div id="progress-fill"></div>
                </div>
                <span id="progress-text">0%</span>
              </div>
            </div>

            <div id="articles-container">
              <p
                id="empty-state"
                style={{
                  display: "none",
                  textAlign: "center",
                  color: "#666",
                  marginTop: "40px",
                }}
              >
                ❌ Artikel tidak ditemukan
              </p>

              <div className="skeleton-card">
                <div className="skeleton-thumb"></div>
                <div className="skeleton-line"></div>
                <div className="skeleton-line short"></div>
              </div>

              <div className="skeleton-card">
                <div className="skeleton-thumb"></div>
                <div className="skeleton-line"></div>
                <div className="skeleton-line short"></div>
              </div>

              <div className="skeleton-card">
                <div className="skeleton-thumb"></div>
                <div className="skeleton-line"></div>
                <div className="skeleton-line short"></div>
              </div>
            </div>
          </section>

          <section className="articles popular-section">
            <div className="section-header">
              <h2>
                <span
                  className="section-icon section-icon-fixed"
                  aria-hidden="true"
                >
                  🔥
                </span>
                <span id="popular-title-text">Artikel Populer</span>
              </h2>
              <p className="section-subtitle">
                Artikel yang banyak dibaca dan direkomendasikan.
              </p>
            </div>

            <div id="popular-container" className="articles-grid"></div>
          </section>

          <section className="tools-section">
            <h2>
              <span
                className="section-icon section-icon-fixed"
                aria-hidden="true"
              >
                🛠️
              </span>
              <span id="tools-title-text">Tools Keislaman</span>
            </h2>

            <p className="tools-sub">
              Gunakan berbagai kalkulator fiqh untuk membantu ibadah dan
              memahami hukum Islam secara praktis.
            </p>

            <div className="tools-grid">
              <a href="/zakat" className="tool-card">
                <span className="icon">💰</span>
                <h3>Kalkulator Zakat</h3>
              </a>

              <a href="/tools/mawaris" className="tool-card">
                <span className="icon">🧮</span>
                <h3>Kalkulator Mawaris</h3>
              </a>

              <a href="/haid" className="tool-card">
                <span className="icon">👩</span>
                <h3>Fiqh Wanita</h3>
              </a>

              <a href="/kaffarah" className="tool-card">
                <span className="icon">🎁</span>
                <h3>Kaffarah &amp; Fidyah</h3>
              </a>

              <a href="/smart" className="tool-card">
                <span className="icon">{"\u{1F9E0}"}</span>
                <h3>Smart Fiqh</h3>
              </a>
            </div>
          </section>

          <section className="categories-home">
            <div className="section-header">
              <h2>
                <span
                  className="section-icon section-icon-fixed"
                  aria-hidden="true"
                >
                  🗂️
                </span>
                <span id="categories-title-text">Kategori</span>
              </h2>

              <p className="section-sub">
                Jelajahi berbagai topik keilmuan Islam yang tersedia di portal
                ini.
              </p>
            </div>

            <div id="category-grid"></div>
          </section>

          <section id="offline-section" className="offline-section">
            <div className="section-header">
              <h2>
                <span
                  className="section-icon section-icon-fixed"
                  aria-hidden="true"
                >
                  📥
                </span>
                <span id="offline-title-text">Artikel Offline</span>
              </h2>
              <a href="/offline" className="see-all">
                Lihat Semua
              </a>
            </div>
          </section>
        </main>

        <aside id="sidebar" className="sidebar">
          <ul className="sidebar-menu">
            <li className="single-item">
              <a href="#" data-filter="all" className="sidebar-link">
                <span className="icon">📚</span>
                <span className="text">Semua Artikel</span>
                <span className="badge" data-count="all">
                  0
                </span>
              </a>
            </li>

            <li className="has-children">
              <button className="sidebar-toggle" type="button">
                <span className="icon">⚖️</span>
                <span className="text">Ilmu Syariah</span>
                <span className="badge" data-count="ilmusyariah">
                  0
                </span>
              </button>

              <ul className="submenu">
                <li className="has-children">
                  <button className="sidebar-toggle" type="button">
                    <span className="icon">📘</span>
                    <span className="text">Fiqh</span>
                    <span className="badge" data-count="fiqh">
                      0
                    </span>
                  </button>
                  <ul className="submenu">
                    <li>
                      <a href="#" data-filter="fiqhibadah">
                        <span className="text">Fiqh Ibadah</span>
                        <span className="badge" data-count="fiqhibadah">
                          0
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="#" data-filter="fiqhmuamalah">
                        <span className="text">Fiqh Muamalah</span>
                        <span className="badge" data-count="fiqhmuamalah">
                          0
                        </span>
                      </a>
                    </li>
                  </ul>
                </li>

                <li className="has-children">
                  <button className="sidebar-toggle" type="button">
                    <span className="icon">🧠</span>
                    <span className="text">Ushul Fiqh</span>
                    <span className="badge" data-count="ushulfiqh">
                      0
                    </span>
                  </button>
                  <ul className="submenu">
                    <li>
                      <a href="#" data-filter="maqashidsyariah">
                        <span className="text">Maqashid Syariah</span>
                        <span className="badge" data-count="maqashidsyariah">
                          0
                        </span>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            <li className="has-children">
              <button className="sidebar-toggle" type="button">
                <span className="icon">📜</span>
                <span className="text">Hadis</span>
                <span className="badge" data-count="hadis">
                  0
                </span>
              </button>
              <ul className="submenu">
                <li>
                  <a href="#" data-filter="hadis-mustolah">
                    Mustolah Hadis
                  </a>
                </li>
                <li>
                  <a href="#" data-filter="hadis-ulumul">
                    Ulumul Hadis
                  </a>
                </li>
                <li>
                  <a href="#" data-filter="syamail">
                    Syama&apos;il
                  </a>
                </li>
              </ul>
            </li>

            <li className="has-children">
              <button className="sidebar-toggle" type="button">
                <span className="icon">💡</span>
                <span className="text">Pemikiran Islam</span>
                <span className="badge" data-count="pemikiran">
                  0
                </span>
              </button>
              <ul className="submenu">
                <li>
                  <a href="#" data-filter="pemikiran-klasik">
                    Klasik
                  </a>
                </li>
                <li>
                  <a href="#" data-filter="pemikiran-modern">
                    Modern
                  </a>
                </li>
              </ul>
            </li>

            <li className="has-children">
              <button className="sidebar-toggle" type="button">
                <span className="icon">🕋</span>
                <span className="text">Ibadah</span>
                <span className="badge" data-count="ibadah">
                  0
                </span>
              </button>

              <ul className="submenu">
                <li>
                  <a href="#" data-filter="ibadah-shalat">
                    Shalat
                  </a>
                </li>
                <li>
                  <a href="#" data-filter="ibadah-puasa">
                    Puasa
                  </a>
                </li>
                <li>
                  <a href="#" data-filter="ibadah-zakat">
                    Zakat &amp; Sedekah
                  </a>
                </li>
                <li>
                  <a href="#" data-filter="ibadah-haji">
                    Haji &amp; Umrah
                  </a>
                </li>
                <li>
                  <a href="#" data-filter="ibadah-dzikir">
                    Doa &amp; Dzikir
                  </a>
                </li>
                <li>
                  <a href="#" data-filter="ibadah-fadilah">
                    Fadilah Ibadah
                  </a>
                </li>
              </ul>
            </li>

            <li className="has-children">
              <button className="sidebar-toggle" type="button">
                <span className="icon">📖</span>
                <span className="text">Al-Qur&apos;an &amp; Tafsir</span>
                <span className="badge" data-count="quran">
                  0
                </span>
              </button>

              <ul className="submenu">
                <li>
                  <a href="#" data-filter="quran-tafsir-ayat">
                    Tafsir Ayat
                  </a>
                </li>
                <li>
                  <a href="#" data-filter="quran-tafsir-surah">
                    Tafsir Surah
                  </a>
                </li>
                <li>
                  <a href="#" data-filter="quran-tematik">
                    Tafsir Tematik
                  </a>
                </li>
                <li>
                  <a href="#" data-filter="quran-ulumul">
                    Ulumul Quran
                  </a>
                </li>
                <li>
                  <a href="#" data-filter="quran-fadilah">
                    Fadilah Al-Qur&apos;an
                  </a>
                </li>
              </ul>
            </li>

            <li className="has-children">
              <button className="sidebar-toggle" type="button">
                <span className="icon">🏛️</span>
                <span className="text">Islam &amp; Negara</span>
                <span className="badge" data-count="politik">
                  0
                </span>
              </button>
              <ul className="submenu">
                <li>
                  <a href="#" data-filter="politik">
                    Politik Islam
                  </a>
                </li>
                <li>
                  <a href="#" data-filter="khilafah">
                    Khilafah
                  </a>
                </li>
                <li>
                  <a href="#" data-filter="negara">
                    Negara &amp; Syariah
                  </a>
                </li>
              </ul>
            </li>

            <li className="has-children">
              <button className="sidebar-toggle" type="button">
                <span className="icon">🧑‍🏫</span>
                <span className="text">Pendidikan &amp; Bahasa Arab</span>
                <span className="badge" data-count="keilmuan">
                  0
                </span>
              </button>
              <ul className="submenu">
                <li>
                  <a href="#" data-filter="bahasa-arab">
                    Inovasi Pembelajaran
                  </a>
                </li>
                <li>
                  <a href="#" data-filter="pengembangan-bahan-ajar">
                    Pengembangan Bahan Ajar
                  </a>
                </li>
                <li>
                  <a href="#" data-filter="manajemen-pendidikan">
                    Manajemen Pendidikan
                  </a>
                </li>
                <li>
                  <a href="#" data-filter="pendidikan-anak-usia-dini">
                    Pendidikan Anak Usia Dini
                  </a>
                </li>
                <li>
                  <a href="#" data-filter="tradisi-keilmuan">
                    Tradisi Keilmuan Islam
                  </a>
                </li>
              </ul>
            </li>

            <li className="has-children">
              <button className="sidebar-toggle" type="button">
                <span className="icon">🌍</span>
                <span className="text">Islam &amp; Tantangan Zaman</span>
                <span className="badge" data-count="kontemporer">
                  0
                </span>
              </button>
              <ul className="submenu">
                <li>
                  <a href="#" data-filter="etika-digital">
                    Etika Digital
                  </a>
                </li>
                <li>
                  <a href="#" data-filter="politik-global">
                    Politik Global
                  </a>
                </li>
                <li>
                  <a href="#" data-filter="gender">
                    Gender &amp; Keadilan
                  </a>
                </li>
                <li>
                  <a href="#" data-filter="ekonomi-modern">
                    Ekonomi Syariah Modern
                  </a>
                </li>
              </ul>
            </li>

            <li className="has-children ramadhan-special">
              <button className="sidebar-toggle" type="button">
                <span className="icon">🌙</span>
                <span className="text">Ramadhan di Al-Azhar</span>
                <span className="badge" data-count="ramadhan">
                  0
                </span>
              </button>
              <ul className="submenu">
                <li>
                  <a href="#" data-filter="catatan-ramadhan">
                    Catatan Ramadhan
                  </a>
                </li>
                <li>
                  <a href="#" data-filter="sejarah-azhar">
                    Sejarah Al-Azhar
                  </a>
                </li>
                <li>
                  <a href="#" data-filter="tadabbur">
                    Tadabbur &amp; Refleksi
                  </a>
                </li>
              </ul>
            </li>

            <li className="has-children">
              <button className="sidebar-toggle" type="button">
                <span className="icon">🧭</span>
                <span className="text">Ilmu Kalam</span>
                <span className="badge" data-count="kalam">
                  0
                </span>
              </button>
              <ul className="submenu">
                <li>
                  <a href="#" data-filter="kalam-akidah">
                    Akidah Islam
                  </a>
                </li>
                <li>
                  <a href="#" data-filter="kalam-klasik">
                    Kalam Klasik
                  </a>
                </li>
                <li>
                  <a href="#" data-filter="kalam-modern">
                    Kalam Modern
                  </a>
                </li>
              </ul>
            </li>

            <li className="has-children">
              <button className="sidebar-toggle" type="button">
                <span className="icon">✨</span>
                <span className="text">Tasawuf</span>
                <span className="badge" data-count="tasawuf">
                  0
                </span>
              </button>
              <ul className="submenu">
                <li>
                  <a href="#" data-filter="tasawuf-akhlak">
                    Akhlak &amp; Tazkiyah
                  </a>
                </li>
                <li>
                  <a href="#" data-filter="tasawuf-tarekat">
                    Tasawuf &amp; Tarekat
                  </a>
                </li>
              </ul>
            </li>

            <li className="has-children">
              <button className="sidebar-toggle" type="button">
                <span className="icon">🕊️</span>
                <span className="text">Sirah Nabawiyah</span>
                <span className="badge" data-count="sirah">
                  0
                </span>
              </button>
              <ul className="submenu">
                <li>
                  <a href="#" data-filter="sirah-makkiyah">
                    Periode Makkiyah
                  </a>
                </li>
                <li>
                  <a href="#" data-filter="sirah-madaniyah">
                    Periode Madaniyah
                  </a>
                </li>
              </ul>
            </li>

            <li className="has-children">
              <button className="sidebar-toggle" type="button">
                <span className="icon">🧠</span>
                <span className="text">Psikologi</span>
                <span className="badge" data-count="psikologi">
                  0
                </span>
              </button>

              <ul className="submenu">
                <li>
                  <a href="#" data-filter="nafs-dalam-islam">
                    Konsep Nafs dalam Islam
                  </a>
                </li>
                <li>
                  <a href="#" data-filter="psikologi-ibadah">
                    Psikologi Ibadah
                  </a>
                </li>
                <li>
                  <a href="#" data-filter="tazkiyatun-nafs">
                    Tazkiyatun Nafs
                  </a>
                </li>
                <li>
                  <a href="#" data-filter="psikologi-sosial">
                    Psikologi Sosial
                  </a>
                </li>
                <li>
                  <a href="#" data-filter="psikologi-pendidikan">
                    Psikologi Pendidikan
                  </a>
                </li>
                <li>
                  <a href="#" data-filter="kesehatan-mental">
                    Kesehatan Mental
                  </a>
                </li>
              </ul>
            </li>

            <li className="has-children">
              <button className="sidebar-toggle" type="button">
                <span className="icon">🛡️</span>
                <span className="text">Palestina &amp; Perjuangan</span>
                <span className="badge" data-count="palestina">
                  0
                </span>
              </button>
              <ul className="submenu">
                <li>
                  <a href="#" data-filter="palestina-sejarah">
                    Sejarah &amp; Konflik
                  </a>
                </li>
                <li>
                  <a href="#" data-filter="palestina-opini">
                    Opini &amp; Analisis
                  </a>
                </li>
              </ul>
            </li>

            <li className="has-children">
              <button className="sidebar-toggle" type="button">
                <span className="icon">📑</span>
                <span className="text">Fatwa Dar al-Ifta</span>
                <span className="badge" data-count="fatwa">
                  0
                </span>
              </button>
              <ul className="submenu">
                <li>
                  <a href="#" data-filter="fatwa-ibadah">
                    Fatwa Ibadah
                  </a>
                </li>
                <li>
                  <a href="#" data-filter="fatwa-kontemporer">
                    Fatwa Kontemporer
                  </a>
                </li>
              </ul>
            </li>

            <li className="single-item">
              <a href="/tools/mawaris" className="sidebar-link menu-mawaris">
                <span className="icon">🧮</span>
                <span className="text">Kalkulator Mawaris</span>
              </a>
            </li>

            <li className="single-item">
              <a href="/haid" className="sidebar-link menu-haid">
                <span className="icon">👩</span>
                <span className="text">Fiqh Wanita</span>
              </a>
            </li>

            <li className="single-item">
              <a href="/offline" className="sidebar-link menu-offline">
                <span className="icon">📥</span>
                <span className="text">Artikel Offline</span>
                <span id="offline-count" className="badge">
                  0
                </span>
              </a>
            </li>
          </ul>
        </aside>

        <div id="overlay"></div>

        <div className="prayer-wrapper">
          <div className="prayer-box">
            <div className="ramadhan-stars"></div>

            <div className="prayer-title">
              🕌 Waktu Sholat Hari Ini
              <span id="prayer-status" className="prayer-status"></span>
            </div>

            <button id="open-quran" type="button">📖 Baca Qur&apos;an</button>
            <button id="open-hadith" className="yellow-btn" type="button">
              📜 Baca Hadis
            </button>

            <div className="prayer-meta">
              <span id="current-clock">--:--</span>
              <span className="divider">•</span>
              <span id="next-prayer">Menuju sholat berikutnya</span>
            </div>

            <div className="prayer-progress">
              <div className="progress-label">
                <span id="progress-prayer-name">
                  Menuju sholat berikutnya
                </span>
                <span id="progress-percent">0%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  id="prayer-progress-fill"
                ></div>
              </div>
            </div>

            <div className="prayer-controls-simple">
              <button id="azan-toggle" className="azan-toggle active" type="button">
                🔔 Azan Aktif
              </button>

              <button id="settings-toggle" className="settings-btn" type="button">
                ⚙️
              </button>

              <div id="settings-panel" className="settings-panel">
                <div className="setting-item">
                  <label htmlFor="azanTolerance">Toleransi Azan</label>
                  <select id="azanTolerance" defaultValue="3">
                    <option value="0">Tepat waktu</option>
                    <option value="1">1 menit</option>
                    <option value="2">2 menit</option>
                    <option value="3">3 menit</option>
                    <option value="5">5 menit</option>
                  </select>
                </div>

                <div className="setting-item">
                  <label htmlFor="notif-toggle">Notifikasi</label>
                  <button id="notif-toggle" type="button">
                    🔔 Aktifkan Notifikasi
                  </button>
                </div>

                <div className="setting-item">
                  <label htmlFor="azan-volume">Volume Azan</label>
                  <div className="volume-control">
                    <button id="volume-toggle" type="button">🔊</button>
                    <input
                      type="range"
                      id="azan-volume"
                      min="0"
                      max="1"
                      step="0.01"
                      defaultValue="1"
                    />
                  </div>
                </div>

                <div className="setting-item">
                  <label htmlFor="muadzin-select">Suara Muadzin</label>
                  <select id="muadzin-select">
                    <option value="mishary">Mishary Rashid</option>
                    <option value="makkah">Masjidil Haram</option>
                    <option value="madinah">Masjid Nabawi</option>
                    <option value="egypt">Mesir</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="prayer-info-row">
              <div className="prayer-location">
                📍 <span id="prayer-city">Mendeteksi lokasi...</span>
              </div>
              <div className="prayer-hijri" id="hijri-date">
                📅 --
              </div>
              <div id="ramadhan-day" className="ramadhan-day"></div>
            </div>

            <audio id="azan-audio" preload="auto">
              <source
                src="/assets/audio/azan/mishary.mp3"
                type="audio/mpeg"
              />
            </audio>

            <div className="prayer-header">
              <div className="prayer-clock">
                <span id="current-time">--:--</span>
                <small id="current-date">--</small>
              </div>

              <div className="ayah-player">
                <p id="daily-ayah-arab"></p>
                <p id="daily-ayah-arti"></p>

                <select id="qari-select">
                  <option value="mishary" data-i18n="qari_mishary">
                    Mishary Rashid
                  </option>
                  <option value="sudais" data-i18n="qari_sudais">
                    Abdul Rahman Al-Sudais
                  </option>
                  <option value="maher" data-i18n="qari_maher">
                    Maher Al-Muaiqly
                  </option>
                </select>

                <div className="ayah-controls">
                  <button id="daily-ayah-play" type="button">▶</button>
                  <button id="daily-ayah-stop" type="button">⏹</button>
                </div>
              </div>

              <button
                id="alarm-toggle"
                className="alarm-btn"
                title="Alarm Adzan"
                type="button"
              >
                ⏰
              </button>
            </div>

            <div className="prayer-grid">
              <div className="prayer-item" id="prayer-fajr">
                <div className="prayer-name">Subuh</div>
                <div className="prayer-time" id="time-fajr">
                  --:--
                </div>
              </div>

              <div className="prayer-item" id="prayer-dhuhr">
                <div className="prayer-name">Dzuhur</div>
                <div className="prayer-time" id="time-dhuhr">
                  --:--
                </div>
              </div>

              <div className="prayer-item" id="prayer-asr">
                <div className="prayer-name">Ashar</div>
                <div className="prayer-time" id="time-asr">
                  --:--
                </div>
              </div>

              <div className="prayer-item" id="prayer-maghrib">
                <div className="prayer-name">Maghrib</div>
                <div className="prayer-time" id="time-maghrib">
                  --:--
                </div>
              </div>

              <div className="prayer-item" id="prayer-isha">
                <div className="prayer-name">Isya</div>
                <div className="prayer-time" id="time-isha">
                  --:--
                </div>
              </div>
            </div>

            <a href="/zakat" className="zakat-card">
              <div className="zakat-left">
                <div className="zakat-icon">💰</div>
                <div className="zakat-text">
                  <h3>Kalkulator Zakat</h3>
                  <p>Hitung zakat fitrah dan maal dengan mudah</p>
                </div>
              </div>
              <div className="zakat-arrow">➜</div>
            </a>
          </div>
        </div>

        <section className="prefooter">
          <div className="prefooter-overlay"></div>

          <div className="prefooter-inner">
            <div className="prefooter-col">
              <h4>Portal Literasi Islam</h4>
              <p>
                Portal kajian Islam yang menghadirkan analisis ilmiah, pemikiran
                kritis, dan dialog keislaman dalam konteks modern.
              </p>
            </div>

            <div className="prefooter-col">
              <h4>Kajian Utama</h4>
              <ul>
                <li>
                  <a href="#" data-filter="fiqh">
                    Fiqh &amp; Ushul Fiqh
                  </a>
                </li>
                <li>
                  <a href="#" data-filter="hadis">
                    Hadis &amp; Studi Sanad
                  </a>
                </li>
                <li>
                  <a href="#" data-filter="pemikiran">
                    Pemikiran Islam
                  </a>
                </li>
                <li>
                  <a href="#" data-filter="politik">
                    Islam &amp; Negara
                  </a>
                </li>
                <li>
                  <a href="#" data-filter="kontemporer">
                    Isu Kontemporer
                  </a>
                </li>
              </ul>
            </div>

            <div className="prefooter-col">
              <h4>Fitur</h4>
              <ul>
                <li>Artikel Pilihan</li>
                <li>Bookmark Artikel</li>
                <li>Pencarian Cerdas</li>
                <li>Mode Baca</li>
                <li>Multi Bahasa</li>
              </ul>
            </div>

            <div className="prefooter-col">
              <h4>Catatan</h4>
              <p className="prefooter-note">
                Seluruh konten disajikan untuk tujuan edukasi dan kajian ilmiah,
                bukan sebagai fatwa atau klaim kebenaran tunggal.
              </p>
            </div>
          </div>

          <div className="prefooter-social">
            <a
              href="https://wa.me/6282124305278"
              aria-label="WhatsApp"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
            </a>
            <a
              href="https://instagram.com/nurcholism51"
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-instagram" aria-hidden="true"></i>
            </a>
            <a
              href="https://www.threads.net/@nurcholism51"
              aria-label="Threads"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-threads" aria-hidden="true"></i>
            </a>
            <a href="mailto:nurcholism51@gmail.com" aria-label="Email">
              <i className="fa-regular fa-envelope" aria-hidden="true"></i>
            </a>
          </div>
        </section>

        <footer className="site-footer">
          <div className="footer-links">
            <a href="/about">Tentang</a>
            <a href="/faq">FAQ</a>
            <a href="/kontak">Kontak</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/disclaimer">Disclaimer</a>
          </div>

          <div className="footer-copy">
            &copy; 2026 Portal Literasi Islam - Seluruh hak cipta dilindungi.
          </div>
        </footer>

        <div className="floating-actions">
          <div className="floating-btn" id="openTasbih">
            📿
          </div>

          <div className="floating-btn" id="openKiblat">
            🧭
          </div>

          <a
            href="https://wa.me/6282124305278"
            target="_blank"
            rel="noreferrer"
            className="floating-btn wa-btn"
            aria-label="Chat via WhatsApp"
          >
            <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
          </a>
        </div>

        <div className="popup-overlay" id="tasbihPopup">
          <div className="popup-content">
            <span className="close-popup" id="closeTasbih">
              &times;
            </span>

            <h3>📿 Tasbih Digital</h3>

            <div className="tasbih-arab" id="tasbihText">
              سَبِّحِ اللَّه
            </div>

            <div className="tasbih-translation" id="tasbihTranslation">
              Maha Suci Allah
            </div>

            <div className="tasbih-count" id="tasbihCount">
              0
            </div>

            <button id="tasbihBtn" type="button">Tekan</button>
            <button id="resetTasbih" type="button">Reset</button>
          </div>
        </div>

        <div className="popup-overlay" id="kiblatPopup">
          <div className="popup-content">
            <span className="close-popup" id="closeKiblat">
              &times;
            </span>

            <h3>🧭 Arah Kiblat</h3>

            <div id="kiblatDegree">Mendeteksi...</div>
            <div className="compass" id="compass">
              🧭
            </div>
          </div>
        </div>

        <div id="toast" className="toast"></div>

        <div id="offline-toast" className="offline-toast">
          📴 Anda sedang offline. Hanya artikel yang sudah diunduh yang bisa
          dibaca.
        </div>

        <div className="quran-popup" id="quran-popup">
          <div className="quran-container">
            <div className="quran-header">
              <h2>📖 Baca Al-Qur&apos;an</h2>

              <select id="translation-select">
                <option value="33">Indonesia</option>
                <option value="20">English</option>
              </select>

              <div className="quran-header-controls">
                <select id="juz-select"></select>
                <button id="quran-close" type="button">✕</button>
              </div>
            </div>

            <div className="quran-body" id="quran-body">
              <div className="loading">Memuat...</div>
            </div>
          </div>
        </div>

        <button
          id="scrollToTopBtn"
          className="scroll-to-top"
          aria-label="Kembali ke atas"
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 19V5"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M6 11L12 5L18 11"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div id="hadith-popup" className="popup">
          <div className="popup-content">
            <div className="popup-header">
              <h2>📚 Koleksi Hadis</h2>
              <button id="hadith-close" type="button">✕</button>
            </div>

            <div className="hadith-controls">
              <select id="book-select">
                <option value="bukhari">Sahih Bukhari</option>
                <option value="muslim">Sahih Muslim</option>
                <option value="tirmidzi">Sunan Tirmidzi</option>
                <option value="abu-dawud">Sunan Abu Dawud</option>
                <option value="nasai">Sunan An-Nasai</option>
                <option value="ibnu-majah">Ibnu Majah</option>
              </select>

              <input type="text" id="hadith-range" defaultValue="1-5" />
              <button id="load-hadith" type="button">Load</button>
            </div>

            <div id="hadith-body"></div>
          </div>
        </div>
      </div>

      <Script src="/js/auth.js?v=20260317a" strategy="afterInteractive" />
      <Script id="auth-toggle" strategy="afterInteractive">
        {`
          (function () {
            function waitForAuth(ready, attemptsLeft) {
              if (window.PortalAuth && typeof window.PortalAuth.getCurrentUser === "function") {
                ready();
                return;
              }
              if ((attemptsLeft || 0) <= 0) {
                return;
              }
              window.setTimeout(() => waitForAuth(ready, (attemptsLeft || 0) - 1), 60);
            }

            function setLoggedInUI(signInBtn, signUpBtn, logoutBtn) {
              if (signInBtn) signInBtn.style.display = "none";
              if (signUpBtn) signUpBtn.style.display = "none";
              if (logoutBtn) {
                logoutBtn.style.display = "inline-flex";
                logoutBtn.classList.add("is-logged-in");
              }
            }

            function setLoggedOutUI(signInBtn, signUpBtn, logoutBtn) {
              if (signInBtn) signInBtn.style.display = "inline-flex";
              if (signUpBtn) signUpBtn.style.display = "inline-flex";
              if (logoutBtn) {
                logoutBtn.style.display = "none";
                logoutBtn.classList.remove("is-logged-in");
              }
            }

            function run() {
              const signInBtn = document.getElementById("signInBtn");
              const signUpBtn = document.getElementById("signUpBtn");
              const logoutBtn = document.getElementById("logoutBtn");

              let user = null;
              if (window.PortalAuth && typeof window.PortalAuth.getCurrentUser === "function") {
                user = window.PortalAuth.getCurrentUser();
              } else {
                try {
                  const raw = window.localStorage.getItem("islamiPortalSession");
                  const parsed = raw ? JSON.parse(raw) : null;
                  if (parsed && parsed.email) user = parsed;
                } catch {}
              }

              try {
                window.__portalAuthUi = {
                  ranAt: Date.now(),
                  hasPortalAuth: !!(window.PortalAuth && typeof window.PortalAuth.getCurrentUser === "function"),
                  hasUser: !!(user && user.email),
                  email: user && user.email ? user.email : null
                };
              } catch {}

              if (user) {
                setLoggedInUI(signInBtn, signUpBtn, logoutBtn);
              } else {
                setLoggedOutUI(signInBtn, signUpBtn, logoutBtn);
              }

              if (logoutBtn && !logoutBtn.dataset.bound) {
                logoutBtn.dataset.bound = "1";
                logoutBtn.addEventListener("click", () => {
                  if (window.PortalAuth) window.PortalAuth.logout();
                  window.location.reload();
                });
              }
            }

            function scheduleResync() {
              let ticks = 0;
              const timer = window.setInterval(() => {
                ticks += 1;
                run();

                if (ticks >= 16) {
                  window.clearInterval(timer);
                }
              }, 350);
            }

            if (document.readyState === "loading") {
              document.addEventListener("DOMContentLoaded", () => {
                run();
                waitForAuth(run, 500);
              });
              document.addEventListener("DOMContentLoaded", scheduleResync);
              return;
            }
            run();
            waitForAuth(run, 500);
            scheduleResync();

            window.addEventListener("storage", (event) => {
              if (event.key === "islamiPortalSession") run();
            });

            document.addEventListener("visibilitychange", () => {
              if (!document.hidden) run();
            });
          })();
        `}
      </Script>

      <Script src="/js/article-store.js?v=20260321a" strategy="afterInteractive" />
      <Script src="/js/article.js?v=20260321a" strategy="afterInteractive" type="module" />
      <Script src="/js/bookmark.js?v=20260321a" strategy="afterInteractive" type="module" />
      <Script src="/js/prayer.js?v=20260321a" strategy="afterInteractive" type="module" />
      <Script src="/js/i18n.js?v=20260321a" strategy="afterInteractive" />

    </>
  );
}
