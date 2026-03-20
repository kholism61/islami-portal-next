(function () {
  const LANGS = ["id", "en", "ar"];
  const rawPageName = (window.location.pathname.split("/").pop() || "").toLowerCase();
  const pageName = rawPageName.endsWith(".html") ? rawPageName : (rawPageName ? `${rawPageName}.html` : rawPageName);
  const host = window.location.hostname;
  const isLocalDev = host === "localhost" || host === "127.0.0.1";

  const textMap = {
    id: {
      site_name: "Portal Literasi Islam",
      nav_home: "Beranda",
      nav_about: "Tentang",
      nav_faq: "FAQ",
      nav_donate: "Donasi",
      nav_contact: "Kontak",
      footer_about: "Tentang",
      footer_faq: "FAQ",
      footer_contact: "Kontak",
      footer_privacy: "Privacy Policy",
      footer_disclaimer: "Disclaimer",
      footer_copy: "(c) 2026 Portal Literasi Islam - Seluruh hak cipta dilindungi.",
      prefooter_about_title: "Portal Literasi Islam",
      prefooter_about_body:
        "Portal kajian Islam yang menghadirkan analisis ilmiah, pemikiran kritis, dan dialog keislaman dalam konteks modern.",
      prefooter_main_title: "Kajian Utama",
      prefooter_main_1: "Fiqh & Ushul Fiqh",
      prefooter_main_2: "Hadis & Studi Sanad",
      prefooter_main_3: "Pemikiran Islam",
      prefooter_main_4: "Islam & Negara",
      prefooter_main_5: "Isu Kontemporer",
      prefooter_features_title: "Fitur",
      prefooter_feature_1: "Artikel Pilihan",
      prefooter_feature_2: "Bookmark Artikel",
      prefooter_feature_3: "Pencarian Cerdas",
      prefooter_feature_4: "Mode Baca",
      prefooter_feature_5: "Multi Bahasa",
      prefooter_note_title: "Catatan",
      prefooter_note_body:
        "Seluruh konten disajikan untuk tujuan edukasi dan kajian ilmiah, bukan sebagai fatwa atau klaim kebenaran tunggal."
    },
    en: {
      site_name: "Islamic Literacy Portal",
      nav_home: "Home",
      nav_about: "About",
      nav_faq: "FAQ",
      nav_donate: "Donate",
      nav_contact: "Contact",
      footer_about: "About",
      footer_faq: "FAQ",
      footer_contact: "Contact",
      footer_privacy: "Privacy Policy",
      footer_disclaimer: "Disclaimer",
      footer_copy: "(c) 2026 Islamic Literacy Portal - All rights reserved.",
      prefooter_about_title: "Islamic Literacy Portal",
      prefooter_about_body:
        "An Islamic study platform delivering scientific analysis, critical thought, and Islamic discourse in a modern context.",
      prefooter_main_title: "Main Studies",
      prefooter_main_1: "Fiqh & Usul Fiqh",
      prefooter_main_2: "Hadith & Sanad Studies",
      prefooter_main_3: "Islamic Thought",
      prefooter_main_4: "Islam & State",
      prefooter_main_5: "Contemporary Issues",
      prefooter_features_title: "Features",
      prefooter_feature_1: "Featured Articles",
      prefooter_feature_2: "Article Bookmarks",
      prefooter_feature_3: "Smart Search",
      prefooter_feature_4: "Reading Mode",
      prefooter_feature_5: "Multi Language",
      prefooter_note_title: "Note",
      prefooter_note_body:
        "All content is provided for educational and academic study purposes, not as a fatwa or a single absolute claim."
    },
    ar: {
      site_name: "بوابة الثقافة الإسلامية",
      nav_home: "الرئيسية",
      nav_about: "من نحن",
      nav_faq: "الأسئلة الشائعة",
      nav_donate: "التبرع",
      nav_contact: "تواصل",
      footer_about: "من نحن",
      footer_faq: "الأسئلة الشائعة",
      footer_contact: "تواصل",
      footer_privacy: "سياسة الخصوصية",
      footer_disclaimer: "إخلاء المسؤولية",
      footer_copy: "(c) 2026 بوابة الثقافة الإسلامية - جميع الحقوق محفوظة.",
      prefooter_about_title: "بوابة الثقافة الإسلامية",
      prefooter_about_body:
        "منصة دراسات إسلامية تقدم تحليلًا علميًا وفكرًا نقديًا وحوارًا إسلاميًا في سياق معاصر.",
      prefooter_main_title: "الدراسات الرئيسية",
      prefooter_main_1: "الفقه وأصول الفقه",
      prefooter_main_2: "الحديث ودراسات السند",
      prefooter_main_3: "الفكر الإسلامي",
      prefooter_main_4: "الإسلام والدولة",
      prefooter_main_5: "قضايا معاصرة",
      prefooter_features_title: "المميزات",
      prefooter_feature_1: "مقالات مختارة",
      prefooter_feature_2: "حفظ المقالات",
      prefooter_feature_3: "بحث ذكي",
      prefooter_feature_4: "وضع القراءة",
      prefooter_feature_5: "متعدد اللغات",
      prefooter_note_title: "ملاحظة",
      prefooter_note_body:
        "جميع المحتويات مقدمة لأغراض تعليمية وأكاديمية، وليست فتوى أو ادعاءً وحيدًا للحقيقة."
    }
  };

  const titleMap = {
    "faq.html": {
      id: "FAQ | Portal Literasi Islam",
      en: "FAQ | Islamic Literacy Portal",
      ar: "الأسئلة الشائعة | بوابة الثقافة الإسلامية"
    },
    "kontak.html": {
      id: "Kontak | Portal Literasi Islam",
      en: "Contact | Islamic Literacy Portal",
      ar: "تواصل | بوابة الثقافة الإسلامية"
    },
    "donasi.html": {
      id: "Donasi | Portal Literasi Islam",
      en: "Donate | Islamic Literacy Portal",
      ar: "التبرع | بوابة الثقافة الإسلامية"
    },
    "about.html": {
      id: "Tentang | Portal Literasi Islam",
      en: "About | Islamic Literacy Portal",
      ar: "من نحن | بوابة الثقافة الإسلامية"
    },
    "disclaimer.html": {
      id: "Disclaimer - Portal Literasi Islam",
      en: "Disclaimer - Islamic Literacy Portal",
      ar: "إخلاء المسؤولية - بوابة الثقافة الإسلامية"
    },
    "privacy.html": {
      id: "Privacy Policy - Portal Literasi Islam",
      en: "Privacy Policy - Islamic Literacy Portal",
      ar: "سياسة الخصوصية - بوابة الثقافة الإسلامية"
    },
    "ramadhan.html": {
      id: "Jadwal Imsakiyah | Portal Literasi Islam",
      en: "Imsakiyah Schedule | Islamic Literacy Portal",
      ar: "جدول الإمساكية | بوابة الثقافة الإسلامية"
    }
  };

  function setupProdCleanLinks() {
    if (isLocalDev) return;

    const rewriteHref = (href) => {
      if (!href || typeof href !== "string") return href;
      const trimmed = href.trim();

      if (
        !trimmed ||
        trimmed.startsWith("#") ||
        trimmed.startsWith("mailto:") ||
        trimmed.startsWith("tel:") ||
        trimmed.startsWith("javascript:") ||
        trimmed.startsWith("http://") ||
        trimmed.startsWith("https://")
      ) {
        return href;
      }

      if (trimmed.startsWith("assets/") || trimmed.startsWith("css/") || trimmed.startsWith("js/")) {
        return href;
      }

      const [pathPart, hashPart] = trimmed.split("#");
      const [pathOnly, queryPart] = pathPart.split("?");
      if (!pathOnly) return href;

      if (!/\.html$/i.test(pathOnly)) {
        return href;
      }

      const normalizedPathOnly = pathOnly.replace(/\\/g, "/");
      const cleanedPathOnly = normalizedPathOnly.replace(/\.html$/i, "");
      const finalPathOnly = /(^|\/)index$/i.test(cleanedPathOnly) ? "/" : cleanedPathOnly;

      return `${finalPathOnly}${queryPart ? `?${queryPart}` : ""}${hashPart ? `#${hashPart}` : ""}`;
    };

    const rewriteAnchors = (root = document) => {
      root.querySelectorAll("a[href]").forEach((a) => {
        if (a.dataset.prodHrefRewritten === "true") return;
        const original = a.getAttribute("href");
        const next = rewriteHref(original);
        if (next !== original) {
          a.setAttribute("href", next);
          a.dataset.prodHrefRewritten = "true";
        }
      });
    };

    rewriteAnchors(document);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches?.("a[href]")) {
            rewriteAnchors(node.parentElement || document);
            return;
          }
          rewriteAnchors(node);
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  function getLang() {
    const saved = localStorage.getItem("siteLang") || "id";
    return LANGS.includes(saved) ? saved : "id";
  }

  function apply(selector, value) {
    const node = document.querySelector(selector);
    if (!node || !value) return;
    node.textContent = value;
  }

  function run() {
    const lang = getLang();
    const text = textMap[lang] || textMap.id;

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    const title = titleMap[pageName]?.[lang];
    if (title) document.title = title;

    apply(".nav-brand span", text.site_name);
    apply(".legal-title", text.site_name);

    const navByHref = [
      ["index.html", "/", "nav_home"],
      ["about.html", "about", "nav_about"],
      ["faq.html", "faq", "nav_faq"],
      ["donasi.html", "donasi", "nav_donate"],
      ["kontak.html", "kontak", "nav_contact"]
    ];

    navByHref.forEach(([legacyHref, cleanHref, key]) => {
      document.querySelectorAll(`.nav-links a[href="${legacyHref}"]`).forEach((link) => {
        link.textContent = text[key];
      });
      document.querySelectorAll(`.nav-links a[href="${cleanHref}"]`).forEach((link) => {
        link.textContent = text[key];
      });
      document.querySelectorAll(`.nav-links a[href="/${cleanHref}"]`).forEach((link) => {
        link.textContent = text[key];
      });
    });

    const prefooterBindings = [
      [".prefooter-col:nth-child(1) h4", "prefooter_about_title"],
      [".prefooter-col:nth-child(1) p", "prefooter_about_body"],
      [".prefooter-col:nth-child(2) h4", "prefooter_main_title"],
      [".prefooter-col:nth-child(2) li:nth-child(1) a", "prefooter_main_1"],
      [".prefooter-col:nth-child(2) li:nth-child(2) a", "prefooter_main_2"],
      [".prefooter-col:nth-child(2) li:nth-child(3) a", "prefooter_main_3"],
      [".prefooter-col:nth-child(2) li:nth-child(4) a", "prefooter_main_4"],
      [".prefooter-col:nth-child(2) li:nth-child(5) a", "prefooter_main_5"],
      [".prefooter-col:nth-child(3) h4", "prefooter_features_title"],
      [".prefooter-col:nth-child(3) li:nth-child(1)", "prefooter_feature_1"],
      [".prefooter-col:nth-child(3) li:nth-child(2)", "prefooter_feature_2"],
      [".prefooter-col:nth-child(3) li:nth-child(3)", "prefooter_feature_3"],
      [".prefooter-col:nth-child(3) li:nth-child(4)", "prefooter_feature_4"],
      [".prefooter-col:nth-child(3) li:nth-child(5)", "prefooter_feature_5"],
      [".prefooter-col:nth-child(4) h4", "prefooter_note_title"],
      [".prefooter-note", "prefooter_note_body"],
      [".footer-links a:nth-child(1)", "footer_about"],
      [".footer-links a:nth-child(2)", "footer_faq"],
      [".footer-links a:nth-child(3)", "footer_contact"],
      [".footer-links a:nth-child(4)", "footer_privacy"],
      [".footer-links a:nth-child(5)", "footer_disclaimer"],
      [".footer-copy", "footer_copy"]
    ];

    prefooterBindings.forEach(([selector, key]) => apply(selector, text[key]));
  }

  function init() {
    setupProdCleanLinks();
    run();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.addEventListener("portal-language-change", run);
  window.addEventListener("storage", (event) => {
    if (event.key === "siteLang") run();
  });
})();
