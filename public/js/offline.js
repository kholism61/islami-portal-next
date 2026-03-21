const SITE_LANGS = ["id", "en", "ar"];
const articleStoreCache = new Map();

function getLegacyArticleStore() {
  const store = window.__PORTAL_ARTICLE_STORE__;
  return store && typeof store === "object" ? store : {};
}

function safeJsonParse(storageKey, fallbackValue) {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return fallbackValue;
    const parsed = JSON.parse(raw);
    return parsed ?? fallbackValue;
  } catch {
    return fallbackValue;
  }
}

const offlineUiText = {
  id: {
    page_title: "Artikel Offline | Portal Literasi Islam",
    nav_logo: "Artikel Offline",
    main_title: "Artikel Tersimpan Offline",
    filter_all: "Semua",
    filter_new: "Belum dibaca",
    filter_reading: "Sedang dibaca",
    filter_done: "Selesai",
    sort_progress: "Urut: Progress",
    sort_title: "Urut: Judul",
    stat_offline: "Artikel Offline",
    stat_average: "Rata-rata Progress",
    download_all: "Download Semua",
    delete_all: "Hapus Semua",
    search_placeholder: "Cari artikel offline...",
    empty_state: "Tidak ada artikel ditemukan.",
    progress_text: "{{percent}}% selesai",
    read_article: "Baca Artikel",
    delete_btn: "Hapus",
    confirm_delete_all: "Hapus semua artikel offline?",
    download_done: "Semua artikel berhasil diunduh ({{count}} artikel).",
    download_none: "Data artikel belum tersedia.",
    prefooter_about_title: "Portal Literasi Islam",
    prefooter_about_body: "Portal kajian Islam yang menghadirkan analisis ilmiah, pemikiran kritis, dan dialog keislaman dalam konteks modern.",
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
    prefooter_note_body: "Seluruh konten disajikan untuk tujuan edukasi dan kajian ilmiah, bukan sebagai fatwa atau klaim kebenaran tunggal.",
    footer_about: "Tentang",
    footer_faq: "FAQ",
    footer_contact: "Kontak",
    footer_privacy: "Privacy Policy",
    footer_disclaimer: "Disclaimer",
    footer_copy: "(c) 2026 Portal Literasi Islam - Seluruh hak cipta dilindungi."
  },
  en: {
    page_title: "Offline Articles | Islamic Literacy Portal",
    nav_logo: "Offline Articles",
    main_title: "Saved Offline Articles",
    filter_all: "All",
    filter_new: "Unread",
    filter_reading: "Reading",
    filter_done: "Completed",
    sort_progress: "Sort: Progress",
    sort_title: "Sort: Title",
    stat_offline: "Offline Articles",
    stat_average: "Average Progress",
    download_all: "Download All",
    delete_all: "Delete All",
    search_placeholder: "Search offline articles...",
    empty_state: "No articles found.",
    progress_text: "{{percent}}% completed",
    read_article: "Read Article",
    delete_btn: "Delete",
    confirm_delete_all: "Delete all offline articles?",
    download_done: "All articles downloaded ({{count}} articles).",
    download_none: "Article source is not available yet.",
    prefooter_about_title: "Islamic Literacy Portal",
    prefooter_about_body: "An Islamic study platform delivering scientific analysis, critical thought, and Islamic discourse in a modern context.",
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
    prefooter_note_body: "All content is provided for educational and academic study purposes, not as a fatwa or a single absolute claim.",
    footer_about: "About",
    footer_faq: "FAQ",
    footer_contact: "Contact",
    footer_privacy: "Privacy Policy",
    footer_disclaimer: "Disclaimer",
    footer_copy: "(c) 2026 Islamic Literacy Portal - All rights reserved."
  },
  ar: {
    page_title: "المقالات دون اتصال | بوابة الثقافة الإسلامية",
    nav_logo: "المقالات دون اتصال",
    main_title: "المقالات المحفوظة دون اتصال",
    filter_all: "الكل",
    filter_new: "غير مقروء",
    filter_reading: "قيد القراءة",
    filter_done: "مكتمل",
    sort_progress: "ترتيب: التقدم",
    sort_title: "ترتيب: العنوان",
    stat_offline: "مقالات دون اتصال",
    stat_average: "متوسط التقدم",
    download_all: "تنزيل الكل",
    delete_all: "حذف الكل",
    search_placeholder: "ابحث في المقالات دون اتصال...",
    empty_state: "لا توجد مقالات.",
    progress_text: "اكتمل {{percent}}%",
    read_article: "اقرأ المقال",
    delete_btn: "حذف",
    confirm_delete_all: "حذف كل المقالات دون اتصال؟",
    download_done: "تم تنزيل كل المقالات ({{count}} مقال).",
    download_none: "مصدر المقالات غير متاح حالياً.",
    prefooter_about_title: "بوابة الثقافة الإسلامية",
    prefooter_about_body: "منصة دراسات إسلامية تقدم تحليلًا علميًا وفكرًا نقديًا وحوارًا إسلاميًا في سياق معاصر.",
    prefooter_main_title: "الدراسات الرئيسية",
    prefooter_main_1: "الفقه وأصول الفقه",
    prefooter_main_2: "الحديث ودراسات السند",
    prefooter_main_3: "الفكر الإسلامي",
    prefooter_main_4: "الإسلام والدولة",
    prefooter_main_5: "قضايا معاصرة",
    prefooter_features_title: "الميزات",
    prefooter_feature_1: "مقالات مختارة",
    prefooter_feature_2: "حفظ المقالات",
    prefooter_feature_3: "بحث ذكي",
    prefooter_feature_4: "وضع القراءة",
    prefooter_feature_5: "متعدد اللغات",
    prefooter_note_title: "ملاحظة",
    prefooter_note_body: "جميع المحتويات مقدمة لأغراض تعليمية وأكاديمية، وليست فتوى أو ادعاءً وحيدًا للحقيقة.",
    footer_about: "من نحن",
    footer_faq: "الأسئلة الشائعة",
    footer_contact: "تواصل",
    footer_privacy: "سياسة الخصوصية",
    footer_disclaimer: "إخلاء المسؤولية",
    footer_copy: "(c) 2026 بوابة الثقافة الإسلامية - جميع الحقوق محفوظة."
  }
};

function normalizeSiteLang(lang = "id") {
  return SITE_LANGS.includes(lang) ? lang : "id";
}

function getSiteLang() {
  return normalizeSiteLang(
    window.PortalI18n?.getCurrentLang?.() ||
      localStorage.getItem("siteLang") ||
      "id"
  );
}

function t(key, params = {}) {
  const lang = getSiteLang();
  const text = offlineUiText[lang]?.[key] ?? offlineUiText.id[key] ?? key;
  return String(text).replace(/\{\{\s*(\w+)\s*\}\}/g, (_, token) => {
    return Object.prototype.hasOwnProperty.call(params, token)
      ? params[token]
      : "";
  });
}

function applyDocumentLang() {
  const lang = getSiteLang();
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
}

function slugify(text = "") {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function loadStoreForLang(lang = "id") {
  const safeLang = normalizeSiteLang(lang);
  if (articleStoreCache.has(safeLang)) {
    return articleStoreCache.get(safeLang);
  }

  const store = getLegacyArticleStore()?.[safeLang];
  if (store && typeof store === "object") {
    articleStoreCache.set(safeLang, store);
    return store;
  }

  // Do not cache empty results. Article store might load after this script.
  return {};
}

function getDownloadStore() {
  const preferred = loadStoreForLang(getSiteLang());
  if (Object.keys(preferred).length > 0) {
    return preferred;
  }
  return loadStoreForLang("id");
}

function getDisplayArticleById(id, fallbackArticle = null) {
  const safeId = String(id || "");
  if (!safeId) return fallbackArticle;

  const preferredStore = loadStoreForLang(getSiteLang());
  if (preferredStore?.[safeId]) return preferredStore[safeId];

  for (const lang of SITE_LANGS) {
    const store = loadStoreForLang(lang);
    if (store?.[safeId]) return store[safeId];
  }

  return fallbackArticle;
}

const container = document.getElementById("offline-list");
const searchInput = document.getElementById("offline-search");
const sortSelect = document.getElementById("sort-select");
const deleteAllBtn = document.getElementById("delete-all");
const downloadAllBtn = document.getElementById("download-all");

if (!container || !sortSelect) {
  // not on offline page
} else {
  let activeFilter = "all";
  let offlineData = safeJsonParse("offlineArticles", {});

  function getProgressData() {
    return safeJsonParse("readingProgress", {});
  }

  function updateOfflineStats() {
    const progressData = getProgressData();
    const ids = Object.keys(offlineData);
    const countEl = document.getElementById("stat-offline-count");
    const progressEl = document.getElementById("stat-offline-progress");

    if (!countEl || !progressEl) return;

    if (ids.length === 0) {
      countEl.textContent = "0";
      progressEl.textContent = "0%";
      return;
    }

    let total = 0;
    ids.forEach((id) => {
      total += progressData[id] || 0;
    });

    const avg = Math.round(total / ids.length);
    countEl.textContent = String(ids.length);
    progressEl.textContent = `${avg}%`;
  }

  function renderOfflineList(filterText = "") {
    container.innerHTML = "";

    const progressData = getProgressData();
    let ids = Object.keys(offlineData);

    ids = ids.filter((id) => {
      const displayArticle = getDisplayArticleById(id, offlineData[id]);
      const title = String(displayArticle?.judul || offlineData[id]?.judul || "").toLowerCase();
      return title.includes(filterText.toLowerCase());
    });

    ids = ids.filter((id) => {
      const progress = progressData[id] || 0;
      if (activeFilter === "new") return progress === 0;
      if (activeFilter === "reading") return progress > 0 && progress < 100;
      if (activeFilter === "done") return progress >= 100;
      return true;
    });

    if (sortSelect.value === "progress") {
      ids.sort((a, b) => (progressData[b] || 0) - (progressData[a] || 0));
    } else if (sortSelect.value === "title") {
      ids.sort((a, b) => {
        const titleA = String(getDisplayArticleById(a, offlineData[a])?.judul || offlineData[a]?.judul || "");
        const titleB = String(getDisplayArticleById(b, offlineData[b])?.judul || offlineData[b]?.judul || "");
        return titleA.localeCompare(titleB);
      });
    }

    if (ids.length === 0) {
      container.innerHTML = `<p>${t("empty_state")}</p>`;
      updateOfflineStats();
      return;
    }

    ids.forEach((id) => {
      const article = offlineData[id];
      if (!article) return;
      const displayArticle = getDisplayArticleById(id, article) || article;

      const progress = Math.max(0, Math.min(100, Math.round(progressData[id] || 0)));
      const card = document.createElement("div");
      card.className = "offline-card";

      card.innerHTML = `
        ${(displayArticle.thumbnail || article.thumbnail) ? `<img src="${displayArticle.thumbnail || article.thumbnail}" class="offline-thumb" alt="${displayArticle.judul || article.judul || id}">` : ""}
        <h3>${displayArticle.judul || article.judul || ""}</h3>
        <p>${displayArticle.kategori || article.kategori || ""}</p>
        <div class="offline-progress-bar">
          <div class="offline-progress-fill" style="width:${progress}%"></div>
        </div>
        <p class="offline-progress-text">${t("progress_text", { percent: progress })}</p>
        <div class="offline-actions">
          <a href="/article?id=${id}&slug=${slugify(displayArticle.judul || article.judul || id)}" class="btn-premium">${t("read_article")}</a>
          <button class="delete-btn" data-id="${id}">${t("delete_btn")}</button>
        </div>
      `;

      container.appendChild(card);
    });

    updateOfflineStats();
  }

  function syncStaticTexts() {
    applyDocumentLang();
    document.title = t("page_title");

    const logo = document.querySelector(".navbar .logo");
    const mainTitle = document.querySelector("main.container > h2");
    const statOffline = document.querySelector(".offline-stat-card:nth-child(1) small");
    const statAverage = document.querySelector(".offline-stat-card:nth-child(2) small");
    const filterAll = document.querySelector(".filter-btn[data-filter='all']");
    const filterNew = document.querySelector(".filter-btn[data-filter='new']");
    const filterReading = document.querySelector(".filter-btn[data-filter='reading']");
    const filterDone = document.querySelector(".filter-btn[data-filter='done']");
    const sortProgress = sortSelect.querySelector("option[value='progress']");
    const sortTitle = sortSelect.querySelector("option[value='title']");

    if (logo) logo.textContent = t("nav_logo");
    if (mainTitle) mainTitle.textContent = t("main_title");
    if (statOffline) statOffline.textContent = t("stat_offline");
    if (statAverage) statAverage.textContent = t("stat_average");
    if (filterAll) filterAll.textContent = t("filter_all");
    if (filterNew) filterNew.textContent = t("filter_new");
    if (filterReading) filterReading.textContent = t("filter_reading");
    if (filterDone) filterDone.textContent = t("filter_done");
    if (sortProgress) sortProgress.textContent = t("sort_progress");
    if (sortTitle) sortTitle.textContent = t("sort_title");
    if (searchInput) searchInput.setAttribute("placeholder", t("search_placeholder"));
    if (downloadAllBtn) downloadAllBtn.textContent = t("download_all");
    if (deleteAllBtn) deleteAllBtn.textContent = t("delete_all");

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

    prefooterBindings.forEach(([selector, key]) => {
      const node = document.querySelector(selector);
      if (node) node.textContent = t(key);
    });
  }

  function rerenderAll() {
    syncStaticTexts();
    renderOfflineList(searchInput?.value || "");
  }

  searchInput?.addEventListener("input", (event) => {
    renderOfflineList(event.target.value);
  });

  sortSelect.addEventListener("change", () => {
    renderOfflineList(searchInput?.value || "");
  });

  document.querySelectorAll(".filter-btn").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((node) => node.classList.remove("active"));
      button.classList.add("active");
      activeFilter = button.dataset.filter || "all";
      renderOfflineList(searchInput?.value || "");
    });
  });

  document.addEventListener("click", (event) => {
    const deleteButton = event.target.closest(".delete-btn");
    if (!deleteButton) return;

    const id = deleteButton.dataset.id;
    delete offlineData[id];
    localStorage.setItem("offlineArticles", JSON.stringify(offlineData));
    renderOfflineList(searchInput?.value || "");
  });

  deleteAllBtn?.addEventListener("click", () => {
    if (!window.confirm(t("confirm_delete_all"))) return;

    localStorage.removeItem("offlineArticles");
    offlineData = {};
    renderOfflineList(searchInput?.value || "");
  });

  downloadAllBtn?.addEventListener("click", () => {
    const store = getDownloadStore();
    const ids = Object.keys(store || {});

    if (!ids.length) {
      window.alert(t("download_none"));
      return;
    }

    localStorage.setItem("offlineArticles", JSON.stringify(store));
    offlineData = safeJsonParse("offlineArticles", {});
    renderOfflineList(searchInput?.value || "");
    window.alert(t("download_done", { count: ids.length }));
  });

  window.addEventListener("storage", (event) => {
    if (
      event.key === "readingProgress" ||
      event.key === "offlineArticles" ||
      event.key === "siteLang"
    ) {
      offlineData = safeJsonParse("offlineArticles", {});
      rerenderAll();
    }
  });

  window.addEventListener("reading-progress-updated", () => {
    offlineData = safeJsonParse("offlineArticles", {});
    rerenderAll();
  });

  window.addEventListener("focus", () => {
    offlineData = safeJsonParse("offlineArticles", {});
    renderOfflineList(searchInput?.value || "");
  });

  window.addEventListener("portal-language-change", rerenderAll);

  rerenderAll();
}

