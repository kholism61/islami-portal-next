import Script from "next/script";
import KontakRuntimeLoader from "@/components/runtime/KontakRuntimeLoader";
import StaticPagesRuntimeLoader from "@/components/runtime/StaticPagesRuntimeLoader";

export const metadata = {
  title: "Kontak | Portal Literasi Islam",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function KontakPage() {
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

      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&family=Amiri&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />
      <link rel="stylesheet" href="/css/pages.css" />

      <header className="navbar">
        <div className="nav-inner">
          <div className="nav-left">
            <a href="/" className="nav-brand">
              📚 <span>Portal Literasi Islam</span>
            </a>
          </div>

          <nav className="nav-links">
            <a href="/">Beranda</a>
            <a href="/about">Tentang</a>
            <a href="/faq">FAQ</a>
            <a href="/donasi">Donasi</a>
            <a href="/kontak">Kontak</a>
          </nav>
        </div>
      </header>

      <main className="page-container">
        <h1 className="page-title">Kontak, Diskusi &amp; Masukan</h1>
        <div className="page-divider"></div>

        <p className="page-lead">
          Portal Literasi Islam terbuka terhadap <b>diskusi ilmiah</b>,{" "}
          <b>kritik konstruktif</b>, serta <b>masukan akademik</b> demi menjaga
          kualitas kajian dan tanggung jawab keilmuan.
        </p>

        <section className="contact-grid">
          <div className="contact-card">
            <div className="contact-icon">📧</div>
            <h3>Email Resmi</h3>
            <p>
              Untuk diskusi ilmiah, koreksi tulisan, atau komunikasi formal
              terkait konten dan kajian.
            </p>
            <a href="mailto:nurcholism51@gmail.com" className="contact-link">
              nurcholism51@gmail.com
            </a>
          </div>

          <div className="contact-card">
            <div className="contact-icon">💬</div>
            <h3>WhatsApp</h3>
            <p>Diskusi singkat, klarifikasi cepat, atau pertanyaan non-formal.</p>
            <a
              href="https://wa.me/6282124305278"
              target="_blank"
              rel="noreferrer"
              className="contact-link"
            >
              Chat via WhatsApp
            </a>
          </div>

          <div className="contact-card">
            <div className="contact-icon">📸</div>
            <h3>Instagram</h3>
            <p>Informasi publik, pembaruan konten, dan interaksi umum.</p>
            <a
              href="https://instagram.com/nurcholism51"
              target="_blank"
              rel="noreferrer"
              className="contact-link"
            >
              @nurcholism51
            </a>
          </div>
        </section>

        <section className="contact-note">
          <h3>Catatan Penting</h3>
          <ul>
            <li>
              Masukan diharapkan disampaikan dengan adab dan argumentasi yang
              jelas.
            </li>
            <li>
              Perbedaan pendapat merupakan bagian dari tradisi keilmuan Islam.
            </li>
            <li>
              Seluruh konten di situs ini bersifat kajian dan refleksi ilmiah.
            </li>
            <li>
              Website ini tidak dimaksudkan sebagai fatwa atau klaim kebenaran
              tunggal.
            </li>
          </ul>
        </section>
      </main>

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
                <a href="/?filter=fiqh">Fiqh &amp; Ushul Fiqh</a>
              </li>
              <li>
                <a href="/?filter=hadis">Hadis &amp; Studi Sanad</a>
              </li>
              <li>
                <a href="/?filter=pemikiran">Pemikiran Islam</a>
              </li>
              <li>
                <a href="/?filter=politik">Islam &amp; Negara</a>
              </li>
              <li>
                <a href="/?filter=kontemporer">Isu Kontemporer</a>
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
            <i className="fa-brands fa-whatsapp"></i>
          </a>
          <a
            href="https://instagram.com/nurcholism51"
            aria-label="Instagram"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a
            href="https://www.threads.net/@nurcholism51"
            aria-label="Threads"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-threads"></i>
          </a>
          <a href="mailto:nurcholism51@gmail.com" aria-label="Email">
            <i className="fa-regular fa-envelope"></i>
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
        © 2026 Portal Literasi Islam – Seluruh hak cipta dilindungi.
        </div>
      </footer>

      <KontakRuntimeLoader />
      <StaticPagesRuntimeLoader includeNavActive={false} />
    </>
  );
}