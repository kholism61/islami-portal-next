"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import type { ArticleSummary } from "@/lib/articles";

export default function HomeClient({ articles }: { articles: ArticleSummary[] }) {
  const [query, setQuery] = useState("");
  const [offlineCount, setOfflineCount] = useState(0);

  useEffect(() => {
    const readOffline = () => {
      try {
        const offlineRaw = JSON.parse(localStorage.getItem("offlineArticles") || "{}");
        const count = offlineRaw && typeof offlineRaw === "object" ? Object.keys(offlineRaw).length : 0;
        setOfflineCount(count);
      } catch {
        setOfflineCount(0);
      }
    };

    readOffline();
    window.addEventListener("storage", readOffline);
    window.addEventListener("focus", readOffline);
    return () => {
      window.removeEventListener("storage", readOffline);
      window.removeEventListener("focus", readOffline);
    };
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return articles;

    return articles.filter((item) => {
      return (
        item.title.toLowerCase().includes(needle) ||
        (item.excerpt || "").toLowerCase().includes(needle) ||
        (item.category || "").toLowerCase().includes(needle)
      );
    });
  }, [articles, query]);

  useEffect(() => {
    document.body.classList.add("home-page");
    return () => {
      document.body.classList.remove("home-page");
    };
  }, []);

  return (
    <div>
      <section className="quick-menu">
        <div className="quick-menu-inner">
          <Link href="/about" className="quick-card">
            <span className="icon">ℹ️</span>
            <div>
              <strong>Tentang</strong>
              <small>Profil & visi portal</small>
            </div>
          </Link>

          <Link href="/faq" className="quick-card">
            <span className="icon">❓</span>
            <div>
              <strong>FAQ</strong>
              <small>Pertanyaan umum</small>
            </div>
          </Link>

          <Link href="/donasi" className="quick-card highlight">
            <span className="icon">🤝</span>
            <div>
              <strong>Donasi</strong>
              <small>Dukung dakwah ilmiah</small>
            </div>
          </Link>

          <Link href="/offline" className="quick-card">
            <span className="icon">📥</span>
            <div>
              <strong>Offline</strong>
              <small>Tersimpan: {offlineCount}</small>
            </div>
          </Link>

          <Link href="/zakat" className="quick-card ramadhan-card">
            <span className="icon">🧮</span>
            <div>
              <strong>Kalkulator Zakat</strong>
              <small>Hitung zakat</small>
            </div>
          </Link>
        </div>
      </section>

      <header className="navbar">
        <button id="menuBtn" className="menu-btn">
          &#9776;
        </button>
        <h1 className="logo">Portal Literasi Islam</h1>
        <button id="themeToggle" className="theme-toggle">
          🌙
        </button>
        <span id="offline-indicator" className="offline-indicator">
          🌐 Online
        </span>

        <div className="lang-dropdown" id="langDropdown">
          <button id="langBtn" className="lang-btn">
            🌐
          </button>
          <div className="lang-menu">
            <button type="button">🇮🇩 Indonesia</button>
            <button type="button">🇬🇧 English</button>
            <button type="button">🇸🇦 العربية</button>
          </div>
        </div>

        <Link href="/bookmark" className="nav-bookmark-icon">
          🔖 <span className="bookmark-count">0</span>
        </Link>
      </header>

      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="hero-title">Portal Literasi Islam</h1>
          <p id="hero-subtitle" className="hero-text">
            Ruang kajian Islam yang membahas fiqh, hadis, dan pemikiran keislaman dalam konteks zaman modern secara ilmiah
            dan mendalam.
          </p>
          <p className="hero-tagline hero-text">
            Portal kajian Islam berbasis literatur, analisis ilmiah, dan refleksi pemikiran kontemporer
          </p>

          <div className="hero-buttons hero-cta">
            <a href="#articles-container" className="btn-primary">
              📚 Mulai Membaca
            </a>
            <a href="#featured-article" className="btn-secondary">
              ⭐ Artikel Pilihan
            </a>
          </div>

          <div className="hero-buttons hero-auth-buttons" id="authActionBar">
            <Link href="/signin" className="btn-secondary auth-entry-btn" id="signInBtn">
              Sign In
            </Link>
            <Link href="/signup" className="btn-secondary auth-entry-btn" id="signUpBtn">
              Sign Up
            </Link>
            <button type="button" className="btn-primary auth-exit-btn" id="logoutBtn" style={{ display: "none" }}>
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
            <span id="stat-offline">{offlineCount}</span>
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
            Portal Literasi Islam merupakan ruang kajian Islam yang menyajikan pembahasan fiqh, hadis, pemikiran Islam,
            serta isu-isu kontemporer dengan pendekatan <strong>ilmiah, berimbang, dan bertanggung jawab</strong>.
          </p>

          <div className="welcome-topics">
            <span>ilmu syariah</span>
            <span>Hadis</span>
            <span>Pemikiran Islam</span>
            <span>Islam & Negara</span>
          </div>

          <div className="welcome-search">
            <input
              type="text"
              id="searchInput"
              placeholder="Cari artikel berdasarkan judul"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </section>

        <section className="articles" id="articles">
          <div className="section-header">
            <h2>Artikel Terbaru</h2>
            <p className="section-subtitle">
              Kumpulan artikel terbaru seputar fiqh, hadis, pemikiran Islam, dan isu kontemporer.
            </p>
          </div>

          <div id="articles-container">
            {filtered.length === 0 ? (
              <p id="empty-state" style={{ textAlign: "center", color: "#666", marginTop: 40 }}>
                ❌ Artikel tidak ditemukan
              </p>
            ) : null}

            {filtered.map((article) => (
              <article
                key={`${article.lang}:${article.slug}`}
                className="card"
                data-category={(article.category || "").toLowerCase()}
              >
                <span className={`lang-badge flag-${article.lang}`}></span>
                <img
                  src={article.thumbnail || "/assets/images/default.jpg"}
                  className="thumb"
                  alt={article.title}
                />

                <div className="card-top">
                  <span className="category">{article.category || ""}</span>
                  <button className="card-bookmark" data-id={article.slug} type="button">
                    &#9734;
                  </button>
                </div>

                <h3>{article.title.length > 40 ? `${article.title.slice(0, 40)}...` : article.title}</h3>
                <p>{(article.excerpt || "").slice(0, 85)}...</p>

                <div className="card-footer">
                  <Link className="read-more" href={`/article/${encodeURIComponent(article.slug)}`}>
                    Baca Selengkapnya
                  </Link>
                  <span className="card-date">{article.createdAt || ""}</span>
                </div>
              </article>
            ))}
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
        </ul>
      </aside>
    </div>
  );
}
