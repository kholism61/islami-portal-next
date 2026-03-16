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
      footerAbout: "Tentang",
      footerFaq: "FAQ",
      footerContact: "Kontak",
      footerPrivacy: "Privacy Policy",
      footerDisclaimer: "Disclaimer",
      footerCopy: "© 2026 Portal Literasi Islam"
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
      footerAbout: "About",
      footerFaq: "FAQ",
      footerContact: "Contact",
      footerPrivacy: "Privacy Policy",
      footerDisclaimer: "Disclaimer",
      footerCopy: "© 2026 Islamic Literacy Portal"
    },
    ar: {
      title: "الفقه الذكي | بوابة الثقافة الإسلامية",
      logoText: "البوابة الإسلامية",
      navHome: "الرئيسية",
      navMawaris: "حاسبة المواريث",
      navZakat: "حاسبة الزكاة",
      navKaffarah: "الكفارة والفدية",
      heroTitle: "الفقه الذكي",
      heroDesc: "دليل فقهي تفاعلي بمسار نعم/لا لاتخاذ قرارات العبادة اليومية.",
      cardPuasaTitle: "الفقه الذكي للصيام",
      cardPuasaDesc: "تحقق من أحكام صيام رمضان والقضاء بمسار عملي.",
      cardHaidTitle: "الفقه الذكي للحيض",
      cardHaidDesc: "تصنيف منظم لأحكام الحيض والاستحاضة والنفاس.",
      cardZakatTitle: "الفقه الذكي للزكاة",
      cardZakatDesc: "دليل سريع لوجوب زكاة الفطر وزكاة المال.",
      cardShalatTitle: "الفقه الذكي للصلاة",
      cardShalatDesc: "مساعدة في قرارات الصلاة في الأحوال العادية وحال العذر.",
      cardThaharahTitle: "الفقه الذكي للطهارة",
      cardThaharahDesc: "دليل الوضوء والغسل والتيمم وأحكام النجاسة.",
      pfAboutTitle: "بوابة الثقافة الإسلامية",
      pfAboutDesc: "بوابة تعليمية في الفقه والعبادة مبنية على مراجع علمية معتمدة.",
      pfFeatureTitle: "المزايا",
      pfFeature1: "حاسبة الحيض",
      pfFeature2: "حاسبة المواريث",
      pfFeature3: "الفقه الذكي",
      pfFeature4: "مقالات فقهية",
      pfRefTitle: "المراجع",
      footerAbout: "من نحن",
      footerFaq: "الأسئلة الشائعة",
      footerContact: "تواصل",
      footerPrivacy: "سياسة الخصوصية",
      footerDisclaimer: "إخلاء المسؤولية",
      footerCopy: "© 2026 بوابة الثقافة الإسلامية"
    }
  };

  const keys = Object.keys(dict.id);
  const langButtons = Array.from(document.querySelectorAll(".lang-switch button[data-lang]"));
  let lang = localStorage.getItem("smartFiqhLang") || "id";
  if (!dict[lang]) lang = "id";

  function applyLang(nextLang) {
    if (!dict[nextLang]) return;
    lang = nextLang;
    localStorage.setItem("smartFiqhLang", lang);

    const words = dict[lang];
    document.documentElement.lang = lang;
    document.body.classList.toggle("rtl-ui", lang === "ar");
    document.title = words.title;

    keys.forEach((key) => {
      const el = document.getElementById(key);
      if (el) el.textContent = words[key];
    });

    langButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
  }

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => applyLang(btn.dataset.lang || "id"));
  });

  applyLang(lang);
})();
