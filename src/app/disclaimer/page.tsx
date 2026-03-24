import Script from "next/script";
import StaticPagesRuntimeLoader from "@/components/runtime/StaticPagesRuntimeLoader";

export const metadata = {
  title: "Disclaimer - Portal Literasi Islam",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function DisclaimerPage() {
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

      <link rel="stylesheet" href="/css/legal.css?v=20260318a" />

      <header className="legal-header">
        <a href="/" className="legal-back">
          ← Beranda
        </a>
        <div className="legal-title">
          <span className="legal-logo-glass">
            <img src="/favicon.ico" alt="" width={20} height={20} />
          </span>
          <span className="legal-title-text">Portal Literasi Islam</span>
        </div>
      </header>

      <div className="page-container">
        <h1>Disclaimer</h1>

        <p>
          Seluruh konten yang tersedia di situs{" "}
          <strong>Portal Literasi Islam</strong>
          disajikan untuk tujuan edukasi, kajian ilmiah, dan pengembangan
          wawasan keislaman.
        </p>

        <h2>Bukan Fatwa Resmi</h2>
        <p>
          Artikel yang dimuat bukan merupakan fatwa resmi, keputusan hukum,
          atau representasi mutlak dari lembaga keagamaan tertentu. Pembaca
          disarankan untuk merujuk kepada ulama, lembaga resmi, atau otoritas
          keagamaan setempat dalam mengambil keputusan hukum.
        </p>

        <h2>Sumber dan Referensi</h2>
        <p>
          Kami berusaha menyajikan konten berdasarkan sumber yang dapat
          dipertanggungjawabkan secara ilmiah, seperti kitab klasik, karya
          ulama, jurnal akademik, dan literatur terpercaya. Namun demikian,
          kemungkinan kesalahan penulisan, interpretasi, atau pembaruan
          informasi tetap dapat terjadi.
        </p>

        <h2>Tanggung Jawab Penggunaan Informasi</h2>
        <p>
          Segala tindakan yang dilakukan pembaca berdasarkan informasi dari
          situs ini sepenuhnya menjadi tanggung jawab pribadi pembaca. Pengelola
          situs tidak bertanggung jawab atas kerugian, kesalahpahaman, atau
          dampak lain yang timbul dari penggunaan konten.
        </p>

        <h2>Tautan Eksternal</h2>
        <p>
          Situs ini dapat memuat tautan ke situs eksternal sebagai referensi.
          Kami tidak memiliki kendali atas isi dan kebijakan situs tersebut,
          sehingga tidak bertanggung jawab atas konten yang terdapat di luar
          situs ini.
        </p>

        <a href="/" className="page-back">
          ← Kembali ke Beranda
        </a>
      </div>

      <footer className="site-footer">
        <div className="footer-links">
          <a href="/about">Tentang</a>
          <a href="/faq">FAQ</a>
          <a href="/kontak">Kontak</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/disclaimer">Disclaimer</a>
        </div>

        <div className="footer-copy">
          2026 Portal Literasi Islam – Seluruh hak cipta dilindungi.
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

      <StaticPagesRuntimeLoader />
    </>
  );
}