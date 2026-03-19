import Script from "next/script";

export const metadata = {
  title: "Smart Fiqh | Portal Literasi Islam",
};

export default function SmartPage() {
  return (
    <>
      <link rel="stylesheet" href="/css/smart.css" />

      <nav className="navbar">
        <div className="nav-container">
          <a href="index.html" className="logo" id="logoText">
            Islami Portal
          </a>

          <ul className="nav-menu">
            <li>
              <a href="index.html" id="navHome">
                Beranda
              </a>
            </li>
            <li>
              <a href="tools/mawaris.html" id="navMawaris">
                Hitung Mawaris
              </a>
            </li>
            <li>
              <a href="zakat.html" id="navZakat">
                Kalkulator Zakat
              </a>
            </li>
            <li>
              <a href="kaffarah.html" id="navKaffarah">
                Kaffarah &amp; Fidyah
              </a>
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
        <h1 id="heroTitle">Smart Fiqh</h1>
        <p id="heroDesc">
          Panduan fiqh interaktif berbasis alur Ya/Tidak untuk keputusan ibadah
          harian.
        </p>
      </section>

      <section className="fiqh-tools">
        <div className="fiqh-grid">
          <a href="smart-fiqh/smart-puasa.html" className="fiqh-card">
            <span className="icon">🌙</span>
            <h3 id="cardPuasaTitle">Smart Fiqh Puasa</h3>
            <p id="cardPuasaDesc">
              Cek hukum puasa Ramadhan dan qadha dengan alur praktis.
            </p>
          </a>

          <a href="smart-fiqh/smart-haid.html" className="fiqh-card">
            <span className="icon">🩸</span>
            <h3 id="cardHaidTitle">Smart Fiqh Haid</h3>
            <p id="cardHaidDesc">
              Klasifikasi haid, istihadhah, dan nifas secara terstruktur.
            </p>
          </a>

          <a href="smart-fiqh/smart-zakat.html" className="fiqh-card">
            <span className="icon">💰</span>
            <h3 id="cardZakatTitle">Smart Fiqh Zakat</h3>
            <p id="cardZakatDesc">
              Panduan cepat kewajiban zakat fitrah dan zakat maal.
            </p>
          </a>

          <a href="smart-fiqh/smart-shalat.html" className="fiqh-card">
            <span className="icon">🕌</span>
            <h3 id="cardShalatTitle">Smart Fiqh Shalat</h3>
            <p id="cardShalatDesc">
              Bantuan keputusan shalat pada kondisi normal atau uzur.
            </p>
          </a>

          <a href="smart-fiqh/smart-thaharah-modern.html" className="fiqh-card">
            <span className="icon">💧</span>
            <h3 id="cardThaharahTitle">Smart Fiqh Thaharah</h3>
            <p id="cardThaharahDesc">
              Panduan wudhu, mandi wajib, tayammum, dan najis.
            </p>
          </a>
        </div>
      </section>

      <section className="pre-footer">
        <div className="pf-grid">
          <div>
            <h3 id="pfAboutTitle">Portal Literasi Islam</h3>
            <p id="pfAboutDesc">
              Portal edukasi fiqh dan ibadah berbasis referensi ulama
              mu&apos;tamad.
            </p>
          </div>

          <div>
            <h3 id="pfFeatureTitle">Fitur</h3>
            <ul>
              <li id="pfFeature1">Kalkulator Haid</li>
              <li id="pfFeature2">Kalkulator Mawaris</li>
              <li id="pfFeature3">Smart Fiqh</li>
              <li id="pfFeature4">Artikel Fiqh</li>
            </ul>
          </div>

          <div>
            <h3 id="pfRefTitle">Referensi</h3>
            <ul>
              <li>Kifayatul Akhyar</li>
              <li>Fathul Qarib</li>
              <li>Al-Ibanah</li>
              <li>Tuhfatul Muhtaj</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-links">
          <a href="about.html" id="footerAbout">
            Tentang
          </a>
          <a href="faq.html" id="footerFaq">
            FAQ
          </a>
          <a href="kontak.html" id="footerContact">
            Kontak
          </a>
          <a href="privacy.html" id="footerPrivacy">
            Privacy Policy
          </a>
          <a href="disclaimer.html" id="footerDisclaimer">
            Disclaimer
          </a>
        </div>
        <p id="footerCopy">© 2026 Portal Literasi Islam</p>
      </footer>

      <Script src="/js/smart-hub.js" strategy="afterInteractive" />
      <Script src="/js/auth.js" strategy="afterInteractive" />
      <Script src="/js/access-guard.js" strategy="afterInteractive" />
    </>
  );
}