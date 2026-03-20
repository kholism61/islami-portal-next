(function () {
  const dict = {
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
      footerCopy: "? 2026 Portal Literasi Islam"
    },
    en: {
      title: "Smart Fiqh | Islamic Literacy Portal",
      logoText: "Islami Portal",
      navHome: "Home",
      navMawaris: "Mawarith Calculator",
      navZakat: "Zakat Calculator",
      navKaffarah: "Kaffarah & Fidyah",
      heroTitle: "Smart Fiqh",
      heroDesc: "Interactive fiqh guidance using Yes/No flow for daily worship decisions.",
      cardPuasaTitle: "Smart Fiqh Fasting",
      cardPuasaDesc: "Check Ramadan and qada fasting rulings with practical flow.",
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
      footerCopy: "? 2026 Islamic Literacy Portal"
    },
    ar: {
      title: "????? ????? | ????? ??????? ?????????",
      logoText: "??????? ?????????",
      navHome: "????????",
      navMawaris: "????? ????????",
      navZakat: "????? ??????",
      navKaffarah: "??????? ???????",
      heroTitle: "????? ?????",
      heroDesc: "???? ???? ?????? ????? ???/?? ?????? ?????? ??????? ???????.",
      cardPuasaTitle: "????? ????? ??????",
      cardPuasaDesc: "???? ?? ????? ???? ????? ??????? ????? ????.",
      cardHaidTitle: "????? ????? ?????",
      cardHaidDesc: "????? ???? ?????? ????? ?????????? ???????.",
      cardZakatTitle: "????? ????? ??????",
      cardZakatDesc: "???? ???? ????? ???? ????? ????? ?????.",
      cardShalatTitle: "????? ????? ??????",
      cardShalatDesc: "?????? ?? ?????? ?????? ?? ??????? ??????? ???? ?????.",
      cardThaharahTitle: "????? ????? ???????",
      cardThaharahDesc: "???? ?????? ?????? ??????? ?????? ???????.",
      pfAboutTitle: "????? ??????? ?????????",
      pfAboutDesc: "????? ??????? ?? ????? ???????? ????? ??? ????? ????? ??????.",
      pfFeatureTitle: "???????",
      pfFeature1: "????? ?????",
      pfFeature2: "????? ????????",
      pfFeature3: "????? ?????",
      pfFeature4: "?????? ?????",
      pfRefTitle: "???????",
      pfRef1: "????? ???????",
      pfRef2: "??? ??????",
      pfRef3: "???????",
      pfRef4: "???? ???????",
      footerAbout: "?? ???",
      footerFaq: "??????? ???????",
      footerContact: "?????",
      footerPrivacy: "????? ????????",
      footerDisclaimer: "????? ?????????",
      footerCopy: "? 2026 ????? ??????? ?????????"
    }
  };

  const keys = Object.keys(dict.id);
  let lang = localStorage.getItem("siteLang") || localStorage.getItem("smartFiqhLang") || "id";
  if (!dict[lang]) lang = "id";

  function getLangButtons() {
    return Array.from(document.querySelectorAll(".lang-switch button[data-lang]"));
  }

  function applyLang(nextLang) {
    if (!dict[nextLang]) return;
    lang = nextLang;
    localStorage.setItem("smartFiqhLang", lang);
    localStorage.setItem("siteLang", lang);

    const words = dict[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("rtl-ui", lang === "ar");
    document.title = words.title;

    keys.forEach((key) => {
      const el = document.getElementById(key);
      if (el) el.textContent = words[key];
    });

    getLangButtons().forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
  }

  function bindLangButtons() {
    getLangButtons().forEach((btn) => {
      if (btn.dataset.smartHubBound === "true") return;
      btn.dataset.smartHubBound = "true";
      btn.addEventListener("click", () => applyLang(btn.dataset.lang || "id"));
    });
  }

  function init() {
    bindLangButtons();
    applyLang(lang);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }

  window.addEventListener("storage", (event) => {
    if (event.key === "siteLang" || event.key === "smartFiqhLang") {
      const nextLang = localStorage.getItem("siteLang") || localStorage.getItem("smartFiqhLang") || "id";
      applyLang(dict[nextLang] ? nextLang : "id");
    }
  });
})();
