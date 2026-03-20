"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
    footerCopy: "© 2026 Portal Literasi Islam",
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
    footerCopy: "© 2026 Islamic Literacy Portal",
  },
  ar: {
    title: "الفقه الذكي | بوابة الثقافة الإسلامية",
    logoText: "البوابة الإسلامية",
    navHome: "الرئيسية",
    navMawaris: "حاسبة المواريث",
    navZakat: "حاسبة الزكاة",
    navKaffarah: "الكفارة والفدية",
    heroTitle: "الفقه الذكي",
    heroDesc: "دليل فقهي تفاعلي يعتمد على مسار نعم/لا للمساعدة في قرارات العبادة اليومية.",
    cardPuasaTitle: "الفقه الذكي للصيام",
    cardPuasaDesc: "تحقق من أحكام صيام رمضان والقضاء عبر مسار عملي واضح.",
    cardHaidTitle: "الفقه الذكي للحيض",
    cardHaidDesc: "تصنيف منظم للحيض والاستحاضة والنفاس.",
    cardZakatTitle: "الفقه الذكي للزكاة",
    cardZakatDesc: "دليل سريع لزكاة الفطر وزكاة المال.",
    cardShalatTitle: "الفقه الذكي للصلاة",
    cardShalatDesc: "مساعدة في اتخاذ قرار الصلاة في الحالة العادية أو عند وجود عذر.",
    cardThaharahTitle: "الفقه الذكي للطهارة",
    cardThaharahDesc: "دليل للوضوء والغسل والتيمم وأحكام النجاسة.",
    pfAboutTitle: "بوابة الثقافة الإسلامية",
    pfAboutDesc: "بوابة تعليمية للفقه والعبادة مبنية على مراجع العلماء المعتمدين.",
    pfFeatureTitle: "المزايا",
    pfFeature1: "حاسبة الحيض",
    pfFeature2: "حاسبة المواريث",
    pfFeature3: "الفقه الذكي",
    pfFeature4: "مقالات الفقه",
    pfRefTitle: "المراجع",
    pfRef1: "كفاية الأخيار",
    pfRef2: "فتح القريب",
    pfRef3: "الإبانة",
    pfRef4: "تحفة المحتاج",
    footerAbout: "من نحن",
    footerFaq: "الأسئلة الشائعة",
    footerContact: "تواصل",
    footerPrivacy: "سياسة الخصوصية",
    footerDisclaimer: "إخلاء المسؤولية",
    footerCopy: "© 2026 بوابة الثقافة الإسلامية",
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
              <Image
                src="/assets/images/logo.png"
                alt=""
                className="logo-icon"
                width={32}
                height={32}
                priority
              />
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