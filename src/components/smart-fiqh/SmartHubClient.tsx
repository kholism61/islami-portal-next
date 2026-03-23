"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Lang = "id" | "en" | "ar";

type Copy = {
  title: string;
  logoText: string;
  navHome: string;
  navMawaris: string;
  navZakat: string;
  navKaffarah: string;
  heroTitle: string;
  heroDesc: string;
  cardPuasaTitle: string;
  cardPuasaDesc: string;
  cardHaidTitle: string;
  cardHaidDesc: string;
  cardZakatTitle: string;
  cardZakatDesc: string;
  cardShalatTitle: string;
  cardShalatDesc: string;
  cardThaharahTitle: string;
  cardThaharahDesc: string;
  pfAboutTitle: string;
  pfAboutDesc: string;
  pfFeatureTitle: string;
  pfFeature1: string;
  pfFeature2: string;
  pfFeature3: string;
  pfFeature4: string;
  pfRefTitle: string;
  pfRef1: string;
  pfRef2: string;
  pfRef3: string;
  pfRef4: string;
  footerAbout: string;
  footerFaq: string;
  footerContact: string;
  footerPrivacy: string;
  footerDisclaimer: string;
  footerCopy: string;
};

const COPY: Record<Lang, Copy> = {
  id: {
    title: "Smart Fiqh | Portal Literasi Islam",
    logoText: "Islami Portal",
    navHome: "Beranda",
    navMawaris: "Hitung Mawaris",
    navZakat: "Kalkulator Zakat",
    navKaffarah: "Kaffarah & Fidyah",
    heroTitle: "Smart Fiqh",
    heroDesc: "Panduan fiqh interaktif berbasis alur Ya/Tidak untuk keputusan ibadah harian.",
    cardPuasaTitle: "Smart Fiqh Puasa",
    cardPuasaDesc: "Cek hukum puasa Ramadhan dan qadha dengan alur praktis.",
    cardHaidTitle: "Smart Fiqh Haid",
    cardHaidDesc: "Klasifikasi haid, istihadhah, dan nifas secara terstruktur.",
    cardZakatTitle: "Smart Fiqh Zakat",
    cardZakatDesc: "Panduan cepat kewajiban zakat fitrah dan zakat maal.",
    cardShalatTitle: "Smart Fiqh Shalat",
    cardShalatDesc: "Bantuan keputusan shalat pada kondisi normal atau uzur.",
    cardThaharahTitle: "Smart Fiqh Thaharah",
    cardThaharahDesc: "Panduan wudhu, mandi wajib, tayammum, dan najis.",
    pfAboutTitle: "Portal Literasi Islam",
    pfAboutDesc: "Portal edukasi fiqh dan ibadah berbasis referensi ulama mu'tamad.",
    pfFeatureTitle: "Fitur",
    pfFeature1: "Kalkulator Haid",
    pfFeature2: "Kalkulator Mawaris",
    pfFeature3: "Smart Fiqh",
    pfFeature4: "Artikel Fiqh",
    pfRefTitle: "Referensi",
    pfRef1: "Kifayatul Akhyar",
    pfRef2: "Fathul Qarib",
    pfRef3: "Al-Ibanah",
    pfRef4: "Tuhfatul Muhtaj",
    footerAbout: "Tentang",
    footerFaq: "FAQ",
    footerContact: "Kontak",
    footerPrivacy: "Privacy Policy",
    footerDisclaimer: "Disclaimer",
    footerCopy: "\u00A9 2026 Portal Literasi Islam",
  },
  en: {
    title: "Smart Fiqh | Islamic Literacy Portal",
    logoText: "Islami Portal",
    navHome: "Home",
    navMawaris: "Mawarith Calculator",
    navZakat: "Zakat Calculator",
    navKaffarah: "Kaffarah & Fidyah",
    heroTitle: "Smart Fiqh",
    heroDesc: "Interactive fiqh guidance using a Yes/No flow for daily worship decisions.",
    cardPuasaTitle: "Smart Fiqh Fasting",
    cardPuasaDesc: "Check Ramadan and qada fasting rulings with a practical flow.",
    cardHaidTitle: "Smart Fiqh Menstruation",
    cardHaidDesc: "Structured classification of menstruation, istihada, and nifas.",
    cardZakatTitle: "Smart Fiqh Zakat",
    cardZakatDesc: "Quick guide to Zakat al-Fitr and Zakat al-Mal obligations.",
    cardShalatTitle: "Smart Fiqh Prayer",
    cardShalatDesc: "Prayer decision support for normal and excuse conditions.",
    cardThaharahTitle: "Smart Fiqh Purification",
    cardThaharahDesc: "Guide for wudu, ghusl, tayammum, and impurity rules.",
    pfAboutTitle: "Islamic Literacy Portal",
    pfAboutDesc: "Fiqh and worship education portal based on trusted scholarly references.",
    pfFeatureTitle: "Features",
    pfFeature1: "Menstrual Calculator",
    pfFeature2: "Mawarith Calculator",
    pfFeature3: "Smart Fiqh",
    pfFeature4: "Fiqh Articles",
    pfRefTitle: "References",
    pfRef1: "Kifayatul Akhyar",
    pfRef2: "Fathul Qarib",
    pfRef3: "Al-Ibanah",
    pfRef4: "Tuhfatul Muhtaj",
    footerAbout: "About",
    footerFaq: "FAQ",
    footerContact: "Contact",
    footerPrivacy: "Privacy Policy",
    footerDisclaimer: "Disclaimer",
    footerCopy: "\u00A9 2026 Islamic Literacy Portal",
  },
  ar: {
    title: "\u0627\u0644\u0641\u0642\u0647 \u0627\u0644\u0630\u0643\u064a | \u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u062b\u0642\u0627\u0641\u0629 \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a\u0629",
    logoText: "\u0627\u0644\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a\u0629",
    navHome: "\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629",
    navMawaris: "\u062d\u0627\u0633\u0628\u0629 \u0627\u0644\u0645\u0648\u0627\u0631\u064a\u062b",
    navZakat: "\u062d\u0627\u0633\u0628\u0629 \u0627\u0644\u0632\u0643\u0627\u0629",
    navKaffarah: "\u0627\u0644\u0643\u0641\u0627\u0631\u0629 \u0648\u0627\u0644\u0641\u062f\u064a\u0629",
    heroTitle: "\u0627\u0644\u0641\u0642\u0647 \u0627\u0644\u0630\u0643\u064a",
    heroDesc: "\u062f\u0644\u064a\u0644 \u0641\u0642\u0647\u064a \u062a\u0641\u0627\u0639\u0644\u064a \u064a\u0639\u062a\u0645\u062f \u0639\u0644\u0649 \u0645\u0633\u0627\u0631 \u0646\u0639\u0645/\u0644\u0627 \u0644\u0644\u0645\u0633\u0627\u0639\u062f\u0629 \u0641\u064a \u0642\u0631\u0627\u0631\u0627\u062a \u0627\u0644\u0639\u0628\u0627\u062f\u0629 \u0627\u0644\u064a\u0648\u0645\u064a\u0629.",
    cardPuasaTitle: "\u0627\u0644\u0641\u0642\u0647 \u0627\u0644\u0630\u0643\u064a \u0644\u0644\u0635\u064a\u0627\u0645",
    cardPuasaDesc: "\u062a\u062d\u0642\u0642 \u0645\u0646 \u0623\u062d\u0643\u0627\u0645 \u0635\u064a\u0627\u0645 \u0631\u0645\u0636\u0627\u0646 \u0648\u0627\u0644\u0642\u0636\u0627\u0621 \u0639\u0631\u0641 \u0645\u0633\u0627\u0631 \u0639\u0645\u0644\u064a \u0648\u0627\u0644\u0648\u062c\u0632.",
    cardHaidTitle: "\u0627\u0644\u0641\u0642\u0647 \u0627\u0644\u0630\u0643\u064a \u0644\u0644\u062d\u064a\u0636",
    cardHaidDesc: "\u062a\u0635\u0646\u064a\u0641 \u0645\u0646\u0638\u0645 \u0644\u0644\u062d\u064a\u0636 \u0648\u0627\u0644\u0627\u0633\u062a\u062d\u0627\u0636\u0629 \u0648\u0627\u0644\u0646\u0641\u0627\u0633.",
    cardZakatTitle: "\u0627\u0644\u0641\u0642\u0647 \u0627\u0644\u0630\u0643\u064a \u0644\u0644\u0632\u0643\u0627\u0629",
    cardZakatDesc: "\u062f\u0644\u064a\u0644 \u0633\u0631\u064a\u0639 \u0644\u0632\u0643\u0627\u0629 \u0627\u0644\u0641\u0637\u0631 \u0648\u0632\u0643\u0627\u0629 \u0627\u0644\u0645\u0627\u0644.",
    cardShalatTitle: "\u0627\u0644\u0641\u0642\u0647 \u0627\u0644\u0630\u0643\u064a \u0644\u0644\u0635\u0644\u0627\u0629",
    cardShalatDesc: "\u0645\u0633\u0627\u0639\u062f\u0629 \u0641\u064a \u0627\u062a\u062e\u0627\u0630 \u0642\u0631\u0627\u0631 \u0627\u0644\u0635\u0644\u0627\u0629 \u0641\u064a \u0627\u0644\u062d\u0627\u0644\u0629 \u0627\u0644\u0639\u0627\u062f\u064a\u0629 \u0623\u0648 \u0639\u0646\u062f \u0648\u062c\u0648\u062f \u0639\u0630\u0631.",
    cardThaharahTitle: "\u0627\u0644\u0641\u0642\u0647 \u0627\u0644\u0630\u0643\u064a \u0644\u0644\u0637\u0647\u0627\u0631\u0629",
    cardThaharahDesc: "\u062f\u0644\u0644 \u0644\u0644\u0648\u0636\u0648\u0621 \u0648\u0627\u0644\u063a\u0633\u0644 \u0648\u0627\u0644\u062a\u064a\u0645\u0645 \u0648\u0623\u062d\u0643\u0627\u0645 \u0627\u0644\u0646\u062c\u0627\u0633\u0629.",
    pfAboutTitle: "\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u062b\u0642\u0627\u0641\u0629 \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a\u0629",
    pfAboutDesc: "\u0628\u0648\u0627\u0628\u0629 \u062a\u0639\u0644\u064a\u0645\u064a\u0629 \u0644\u0644\u0641\u0642\u0647 \u0648\u0627\u0644\u0639\u0628\u0627\u062f\u0629 \u0645\u0628\u0646\u064a\u0629 \u0639\u0644\u0649 \u0645\u0631\u0627\u062c\u0639 \u0627\u0644\u0639\u0644\u0645\u0627\u0621 \u0627\u0644\u0645\u0639\u062a\u0645\u062f\u064a\u0646.",
    pfFeatureTitle: "\u0627\u0644\u0645\u0632\u0627\u064a\u0627",
    pfFeature1: "\u062d\u0627\u0633\u0628\u0629 \u0627\u0644\u062d\u064a\u0636",
    pfFeature2: "\u062d\u0627\u0633\u0628\u0629 \u0627\u0644\u0645\u0648\u0627\u0631\u064a\u062b",
    pfFeature3: "\u0627\u0644\u0641\u0642\u0647 \u0627\u0644\u0630\u0643\u064a",
    pfFeature4: "\u0645\u0642\u0627\u0644\u0627\u062a \u0627\u0644\u0641\u0642\u0647",
    pfRefTitle: "\u0627\u0644\u0645\u0631\u0627\u062c\u0639",
    pfRef1: "\u0643\u0641\u0627\u064a\u0629 \u0627\u0644\u0623\u062e\u064a\u0627\u0631",
    pfRef2: "\u0641\u062a\u062d \u0627\u0644\u0642\u0631\u064a\u0628",
    pfRef3: "\u0627\u0644\u0625\u0628\u0627\u0646\u0629",
    pfRef4: "\u062a\u062d\u0641\u0629 \u0627\u0644\u0645\u062d\u062a\u0627\u062c",
    footerAbout: "\u0645\u0646 \u0646\u062d\u0646",
    footerFaq: "\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629",
    footerContact: "\u062a\u0648\u0627\u0635\u0644",
    footerPrivacy: "\u0633\u064a\u0627\u0633\u0629 \u0627\u0644\u062e\u0635\u0648\u0635\u064a\u0629",
    footerDisclaimer: "\u0625\u062e\u0644\u0627\u0639 \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u064a\u0629",
    footerCopy: "\u00A9 2026 \u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u062b\u0642\u0627\u0641\u0629 \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a\u0629",
  },
};

const LANGS: Lang[] = ["id", "en", "ar"];

function isLang(value: string | null): value is Lang {
  return value === "id" || value === "en" || value === "ar";
}

export default function SmartHubClient() {
  const [lang, setLang] = useState<Lang>("id");

  useEffect(() => {
    const stored = window.localStorage.getItem("siteLang") || window.localStorage.getItem("smartFiqhLang");
    if (isLang(stored)) {
      setLang(stored);
    }
  }, []);

  useEffect(() => {
    const words = COPY[lang];
    window.localStorage.setItem("siteLang", lang);
    window.localStorage.setItem("smartFiqhLang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("rtl-ui", lang === "ar");
    document.title = words.title;

    return () => {
      document.body.classList.remove("rtl-ui");
    };
  }, [lang]);

  useEffect(() => {
    const handleStorage = () => {
      const stored = window.localStorage.getItem("siteLang") || window.localStorage.getItem("smartFiqhLang");
      if (isLang(stored)) {
        setLang(stored);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const words = COPY[lang];

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <Link href="/" className="logo" aria-label="Portal Literasi Islam">
            <span className="logo-mark" aria-hidden="true">
              <img src="/favicon.ico" alt="" className="logo-icon" width={12} height={12} />
            </span>
            <span className="logo-text" id="logoText">
              {words.logoText}
            </span>
          </Link>

          <ul className="nav-menu">
            <li>
              <Link href="/" id="navHome">
                {words.navHome}
              </Link>
            </li>
            <li>
              <Link href="/tools/mawaris" id="navMawaris">
                {words.navMawaris}
              </Link>
            </li>
            <li>
              <Link href="/zakat" id="navZakat">
                {words.navZakat}
              </Link>
            </li>
            <li>
              <Link href="/kaffarah" id="navKaffarah">
                {words.navKaffarah}
              </Link>
            </li>
          </ul>

          <div className="lang-switch" aria-label="Language">
            {LANGS.map((code) => (
              <button
                key={code}
                type="button"
                data-lang={code}
                className={lang === code ? "active" : undefined}
                aria-pressed={lang === code}
                onClick={() => setLang(code)}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section className="hero">
        <h1 id="heroTitle">{words.heroTitle}</h1>
        <p id="heroDesc">{words.heroDesc}</p>
      </section>

      <section className="fiqh-tools">
        <div className="fiqh-grid">
          <Link href="/smart-fiqh/smart-puasa" className="fiqh-card">
            <span className="icon">{"\u{1F319}"}</span>
            <h3 id="cardPuasaTitle">{words.cardPuasaTitle}</h3>
            <p id="cardPuasaDesc">{words.cardPuasaDesc}</p>
          </Link>

          <Link href="/smart-fiqh/smart-haid" className="fiqh-card">
            <span className="icon">{"\u{1FA78}"}</span>
            <h3 id="cardHaidTitle">{words.cardHaidTitle}</h3>
            <p id="cardHaidDesc">{words.cardHaidDesc}</p>
          </Link>

          <Link href="/smart-fiqh/smart-zakat" className="fiqh-card">
            <span className="icon">{"\u{1F4B0}"}</span>
            <h3 id="cardZakatTitle">{words.cardZakatTitle}</h3>
            <p id="cardZakatDesc">{words.cardZakatDesc}</p>
          </Link>

          <Link href="/smart-fiqh/smart-shalat" className="fiqh-card">
            <span className="icon">{"\u{1F54C}"}</span>
            <h3 id="cardShalatTitle">{words.cardShalatTitle}</h3>
            <p id="cardShalatDesc">{words.cardShalatDesc}</p>
          </Link>

          <Link href="/smart-fiqh/smart-thaharah-modern" className="fiqh-card">
            <span className="icon">{"\u{1F4A7}"}</span>
            <h3 id="cardThaharahTitle">{words.cardThaharahTitle}</h3>
            <p id="cardThaharahDesc">{words.cardThaharahDesc}</p>
          </Link>
        </div>
      </section>

      <section className="pre-footer">
        <div className="pf-grid">
          <div>
            <h3 id="pfAboutTitle">{words.pfAboutTitle}</h3>
            <p id="pfAboutDesc">{words.pfAboutDesc}</p>
          </div>

          <div>
            <h3 id="pfFeatureTitle">{words.pfFeatureTitle}</h3>
            <ul>
              <li id="pfFeature1">{words.pfFeature1}</li>
              <li id="pfFeature2">{words.pfFeature2}</li>
              <li id="pfFeature3">{words.pfFeature3}</li>
              <li id="pfFeature4">{words.pfFeature4}</li>
            </ul>
          </div>

          <div>
            <h3 id="pfRefTitle">{words.pfRefTitle}</h3>
            <ul>
              <li id="pfRef1">{words.pfRef1}</li>
              <li id="pfRef2">{words.pfRef2}</li>
              <li id="pfRef3">{words.pfRef3}</li>
              <li id="pfRef4">{words.pfRef4}</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-links">
          <Link href="/about" id="footerAbout">
            {words.footerAbout}
          </Link>
          <Link href="/faq" id="footerFaq">
            {words.footerFaq}
          </Link>
          <Link href="/kontak" id="footerContact">
            {words.footerContact}
          </Link>
          <Link href="/privacy" id="footerPrivacy">
            {words.footerPrivacy}
          </Link>
          <Link href="/disclaimer" id="footerDisclaimer">
            {words.footerDisclaimer}
          </Link>
        </div>
        <p id="footerCopy">{words.footerCopy}</p>
      </footer>
    </>
  );
}
