const SITE_LANGS = ["id", "en", "ar"];
const articleStoreCache = new Map();

function getLegacyArticleStore() {
  return window.__PORTAL_ARTICLE_STORE__ || {};
}

const bookmarkUiText = {
  id: {
    page_title: "Artikel Tersimpan | Portal Literasi Islam",
    nav_logo: "Bookmark Ku",
    stat_saved_label: "Artikel disimpan",
    stat_reading_label: "Sedang dibaca",
    stat_streak_label: "Hari berturut-turut",
    goal_label: "Target Harian",
    goal_status: "{{count}} / {{target}} artikel",
    achievement_prefix: "Achievement:",
    achievement_beginner: "Pemula",
    achievement_novice: "Pembaca Pemula",
    achievement_active: "Pembaca Aktif",
    achievement_expert: "Ulama Digital",
    header_title: "Bookmark Saya",
    header_sub: "Kumpulan artikel yang Anda simpan untuk dibaca nanti.",
    export_pdf: "Export ke PDF",
    export_word: "Export ke Word",
    clear_all: "Hapus Semua",
    continue_reading_title: "Lanjut Membaca",
    stats_saved_line: "{{count}} artikel tersimpan",
    sort_newest: "Terbaru",
    sort_oldest: "Terlama",
    sort_az: "Judul A-Z",
    filter_all: "Semua Kategori",
    search_placeholder: "Cari bookmark...",
    not_found: "Bookmark tidak ditemukan",
    empty_state: "Belum ada artikel yang disimpan",
    read_btn: "Baca",
    remove_btn_title: "Hapus",
    reading_done: "Selesai dibaca",
    reading_percent: "{{percent}}% dibaca",
    toast_removed: "Bookmark dihapus",
    toast_no_bookmarks: "Tidak ada bookmark",
    confirm_clear_all: "Yakin hapus semua bookmark?",
    toast_cleared: "Semua bookmark dihapus",
    pdf_doc_title: "Daftar Artikel Bookmark",
    word_heading: "Artikel Bookmark",
    meta_category: "Kategori",
    meta_date: "Tanggal",
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
    page_title: "Saved Articles | Islamic Literacy Portal",
    nav_logo: "My Bookmarks",
    stat_saved_label: "Saved Articles",
    stat_reading_label: "In Progress",
    stat_streak_label: "Streak Days",
    goal_label: "Daily Goal",
    goal_status: "{{count}} / {{target}} article",
    achievement_prefix: "Achievement:",
    achievement_beginner: "Beginner",
    achievement_novice: "Early Reader",
    achievement_active: "Active Reader",
    achievement_expert: "Digital Scholar",
    header_title: "My Bookmarks",
    header_sub: "A collection of articles you saved to read later.",
    export_pdf: "Export to PDF",
    export_word: "Export to Word",
    clear_all: "Clear All",
    continue_reading_title: "Continue Reading",
    stats_saved_line: "{{count}} saved articles",
    sort_newest: "Newest",
    sort_oldest: "Oldest",
    sort_az: "Title A-Z",
    filter_all: "All Categories",
    search_placeholder: "Search bookmarks...",
    not_found: "No bookmark found",
    empty_state: "No saved articles yet",
    read_btn: "Read",
    remove_btn_title: "Remove",
    reading_done: "Finished",
    reading_percent: "{{percent}}% read",
    toast_removed: "Bookmark removed",
    toast_no_bookmarks: "No bookmarks available",
    confirm_clear_all: "Remove all bookmarks?",
    toast_cleared: "All bookmarks removed",
    pdf_doc_title: "Bookmark Article List",
    word_heading: "Bookmarked Articles",
    meta_category: "Category",
    meta_date: "Date",
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
    page_title: "المقالات المحفوظة | بوابة الثقافة الإسلامية",
    nav_logo: "مقالاتي المحفوظة",
    stat_saved_label: "مقالات محفوظة",
    stat_reading_label: "قيد القراءة",
    stat_streak_label: "أيام متتالية",
    goal_label: "الهدف اليومي",
    goal_status: "{{count}} / {{target}} مقال",
    achievement_prefix: "الإنجاز:",
    achievement_beginner: "مبتدئ",
    achievement_novice: "قارئ ناشئ",
    achievement_active: "قارئ نشط",
    achievement_expert: "باحث رقمي",
    header_title: "مراجعي المحفوظة",
    header_sub: "مجموعة المقالات التي حفظتها للقراءة لاحقًا.",
    export_pdf: "تصدير PDF",
    export_word: "تصدير Word",
    clear_all: "حذف الكل",
    continue_reading_title: "متابعة القراءة",
    stats_saved_line: "{{count}} مقالات محفوظة",
    sort_newest: "الأحدث",
    sort_oldest: "الأقدم",
    sort_az: "العنوان أ-ي",
    filter_all: "كل التصنيفات",
    search_placeholder: "ابحث في المحفوظات...",
    not_found: "لم يتم العثور على محفوظات",
    empty_state: "لا توجد مقالات محفوظة بعد",
    read_btn: "اقرأ",
    remove_btn_title: "حذف",
    reading_done: "تمت القراءة",
    reading_percent: "تمت قراءة {{percent}}%",
    toast_removed: "تم حذف الإشارة المرجعية",
    toast_no_bookmarks: "لا توجد محفوظات",
    confirm_clear_all: "هل تريد حذف كل المحفوظات؟",
    toast_cleared: "تم حذف كل المحفوظات",
    pdf_doc_title: "قائمة المقالات المحفوظة",
    word_heading: "المقالات المحفوظة",
    meta_category: "التصنيف",
    meta_date: "التاريخ",
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
  const text = bookmarkUiText[lang]?.[key] ?? bookmarkUiText.id[key] ?? key;
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

  const store = getLegacyArticleStore()[safeLang];
  if (store && typeof store === "object") {
    articleStoreCache.set(safeLang, store);
    return store;
  }

  const emptyStore = {};
  articleStoreCache.set(safeLang, emptyStore);
  return emptyStore;
}

function getLangPriority() {
  const preferred = getSiteLang();
  return [preferred, ...SITE_LANGS.filter((lang) => lang !== preferred)];
}

function getArticleById(id) {
  const safeId = String(id || "");
  if (!safeId) return null;

  const priority = getLangPriority();
  for (const lang of priority) {
    const store = loadStoreForLang(lang);
    if (store?.[safeId]) return store[safeId];
  }

  try {
    const meta = JSON.parse(localStorage.getItem("bookmarkArticles")) || {};
    if (meta && typeof meta === "object" && meta[safeId]) return meta[safeId];
  } catch {
    // ignore
  }

  return null;
}

function stripHtml(html = "") {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.textContent || "";
}

function initBookmarkPage() {
  const listEl = document.getElementById("bookmark-list");
  const emptyEl = document.getElementById("bookmark-empty");
  const notFoundEl = document.getElementById("bookmarkNotFound");
  const searchInput = document.getElementById("bookmarkSearch");
  const exportPdfBtn = document.getElementById("exportPdfBtn");
  const exportWordBtn = document.getElementById("exportWordBtn");
  const clearBtn = document.getElementById("clearBookmarks");
  const sortSelect = document.getElementById("bookmarkSort");
  const filterSelect = document.getElementById("bookmarkFilter");
  const continueEl = document.getElementById("continue-reading");
  const toast = document.getElementById("toast");

  if (!listEl || !emptyEl) return;

  function getBookmarks() {
    try {
      const parsed = JSON.parse(localStorage.getItem("bookmarks"));
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function setBookmarks(nextBookmarks) {
    localStorage.setItem("bookmarks", JSON.stringify(nextBookmarks));
  }

  function removeReadingProgress(id) {
    let data = {};
    try {
      const parsed = JSON.parse(localStorage.getItem("readingProgress"));
      data = parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      data = {};
    }
    delete data[id];
    localStorage.setItem("readingProgress", JSON.stringify(data));
  }

  function showToast(message, duration = 2000) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove("show"), duration);
  }

  function getAchievementLabel(totalRead = 0) {
    if (totalRead >= 25) return t("achievement_expert");
    if (totalRead >= 10) return t("achievement_active");
    if (totalRead >= 3) return t("achievement_novice");
    return t("achievement_beginner");
  }

  function updateStats() {
    const oldStats = document.getElementById("bookmarkStats");
    const bookmarkEl = document.getElementById("stat-bookmark-count");
    const readingEl = document.getElementById("stat-reading-count");
    const streakEl = document.getElementById("stat-streak");
    const goalStatus = document.getElementById("goal-status");
    const goalProgress = document.getElementById("goal-progress");
    const achievementEl = document.getElementById("achievement-label");

    const totalBookmarks = getBookmarks().length;
    let reading = {};
    try {
      const parsed = JSON.parse(localStorage.getItem("readingProgress"));
      reading = parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      reading = {};
    }
    const readingCount = Object.keys(reading).filter(
      (id) => !id.endsWith("_done") && reading[id] > 0 && reading[id] < 100
    ).length;

    if (oldStats) oldStats.textContent = t("stats_saved_line", { count: totalBookmarks });
    if (bookmarkEl) bookmarkEl.textContent = String(totalBookmarks);
    if (readingEl) readingEl.textContent = String(readingCount);

    let streakData = { streak: 0 };
    try {
      const parsed = JSON.parse(localStorage.getItem("readingStreak"));
      streakData = parsed && typeof parsed === "object" ? parsed : { streak: 0 };
    } catch {
      streakData = { streak: 0 };
    }
    if (streakEl) streakEl.textContent = String(streakData.streak || 0);

    const goalTarget = 1;
    const todayKey = new Date().toLocaleDateString("sv-SE");
    let history = {};
    try {
      const parsed = JSON.parse(localStorage.getItem("readingHistory"));
      history = parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      history = {};
    }
    const todayCount = history[todayKey] || 0;

    if (goalStatus) {
      goalStatus.textContent = t("goal_status", {
        count: todayCount,
        target: goalTarget
      });
    }

    if (goalProgress) {
      const percent = Math.min(100, (todayCount / goalTarget) * 100);
      goalProgress.style.width = `${percent}%`;
    }

    const totalRead = parseInt(localStorage.getItem("totalArticlesRead") || "0", 10) || 0;
    if (achievementEl) {
      achievementEl.textContent = getAchievementLabel(totalRead);
    }
  }

  function renderContinueReading() {
    if (!continueEl) return;

    let reading = {};
    try {
      const parsed = JSON.parse(localStorage.getItem("readingProgress"));
      reading = parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      reading = {};
    }
    const ids = Object.keys(reading).filter(
      (id) => !id.endsWith("_done") && reading[id] > 0
    );

    if (ids.length === 0) {
      continueEl.style.display = "none";
      continueEl.innerHTML = "";
      return;
    }

    continueEl.style.display = "block";
    continueEl.innerHTML = `<h2>${t("continue_reading_title")}</h2>`;

    ids.forEach((id) => {
      const article = getArticleById(id);
      if (!article) return;

      const percent = Math.max(0, Math.min(100, Math.round(reading[id] || 0)));
      const item = document.createElement("div");
      item.className = "continue-item";
      item.innerHTML = `
        <a href="article?id=${id}&slug=${slugify(article.judul || id)}">${article.judul || id}</a>
        <div class="reading-bar">
          <div class="reading-fill" style="width:${percent}%"></div>
        </div>
        <span class="reading-percent">${
          percent >= 100 ? t("reading_done") : t("reading_percent", { percent })
        }</span>
      `;

      continueEl.appendChild(item);
    });
  }

  function populateCategories() {
    if (!filterSelect) return;

    const current = filterSelect.value || "all";
    const saved = getBookmarks();
    const categories = new Set();

    saved.forEach((id) => {
      const article = getArticleById(id);
      if (article?.kategori) categories.add(article.kategori);
    });

    filterSelect.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.value = "all";
    defaultOption.textContent = t("filter_all");
    filterSelect.appendChild(defaultOption);

    Array.from(categories).sort((a, b) => a.localeCompare(b)).forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      filterSelect.appendChild(option);
    });

    filterSelect.value = Array.from(filterSelect.options).some((opt) => opt.value === current)
      ? current
      : "all";
  }

  function renderBookmarks() {
    let saved = getBookmarks();
    const sort = sortSelect?.value || "newest";
    const filter = filterSelect?.value || "all";

    saved = saved
      .map((id) => {
        const found = getArticleById(id);
        const fallback = {
          id,
          slug: id,
          judul: id,
          kategori: "",
          isi: "",
          thumbnail: ""
        };
        return { id, article: found || fallback };
      })
      .filter((item) => filter === "all" || item.article.kategori === filter);

    if (sort === "az") {
      saved.sort((a, b) => (a.article.judul || "").localeCompare(b.article.judul || ""));
    } else if (sort === "oldest") {
      saved.reverse();
    }

    listEl.innerHTML = "";
    updateStats();

    if (saved.length === 0) {
      emptyEl.style.display = "block";
      if (notFoundEl) notFoundEl.style.display = "none";
      return;
    }

    emptyEl.style.display = "none";
    if (notFoundEl) notFoundEl.style.display = "none";

    let progressMap = {};
    try {
      const parsed = JSON.parse(localStorage.getItem("readingProgress"));
      progressMap = parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      progressMap = {};
    }

    saved.forEach(({ id, article }) => {
      const percent = Math.max(0, Math.min(100, Math.round(progressMap[id] || 0)));
      const item = document.createElement("div");
      item.className = "bookmark-card";
      item.dataset.id = id;

      const thumb = article.thumbnail || "assets/images/default.jpg";
      const preview = String(stripHtml(article.isi || "") || "").slice(0, 100);

      item.innerHTML = `
        <img src="${thumb}" class="bookmark-thumb" alt="${article.judul || id}">
        <div class="bookmark-body">
          <span class="bookmark-category">${article.kategori || ""}</span>
          <h3>${article.judul || ""}</h3>
          <p>${preview}...</p>
          <div class="reading-bar">
            <div class="reading-fill" style="width:${percent}%"></div>
          </div>
          <span class="reading-percent">${t("reading_percent", { percent })}</span>
          <div class="bookmark-actions">
            <a href="/article?id=${id}&slug=${slugify(article.judul || id)}" class="read-btn">${t("read_btn")}</a>
            <button class="remove-icon" data-id="${id}" title="${t("remove_btn_title")}">x</button>
          </div>
        </div>
      `;

      listEl.appendChild(item);
    });

    runSearch();
  }

  function runSearch() {
    if (!searchInput) return 0;

    const keyword = searchInput.value.toLowerCase().trim();
    let found = 0;

    listEl.querySelectorAll(".bookmark-card").forEach((card) => {
      const match = card.innerText.toLowerCase().includes(keyword);
      card.style.display = match ? "block" : "none";
      if (match) found += 1;
    });

    if (notFoundEl) {
      const hasCards = listEl.querySelectorAll(".bookmark-card").length > 0;
      notFoundEl.style.display = hasCards && found === 0 ? "block" : "none";
    }

    return found;
  }

  function syncStaticTexts() {
    applyDocumentLang();
    document.title = t("page_title");

    const logo = document.querySelector(".navbar .logo");
    const statSavedLabel = document.querySelector(".bookmark-stats-modern .stat-box:nth-child(1) span");
    const statReadingLabel = document.querySelector(".bookmark-stats-modern .stat-box:nth-child(2) span");
    const statStreakLabel = document.querySelector(".bookmark-stats-modern .stat-box:nth-child(3) span");
    const goalLabel = document.querySelector(".reading-goal .goal-info span");
    const achievementPrefix = document.querySelector(".reading-achievement span");
    const headerTitle = document.querySelector(".bookmark-header h1");
    const headerSub = document.querySelector(".bookmark-header p");

    if (logo) logo.textContent = t("nav_logo");
    if (statSavedLabel) statSavedLabel.textContent = t("stat_saved_label");
    if (statReadingLabel) statReadingLabel.textContent = t("stat_reading_label");
    if (statStreakLabel) statStreakLabel.textContent = t("stat_streak_label");
    if (goalLabel) goalLabel.textContent = t("goal_label");
    if (achievementPrefix) achievementPrefix.textContent = t("achievement_prefix");
    if (headerTitle) headerTitle.textContent = t("header_title");
    if (headerSub) headerSub.textContent = t("header_sub");
    if (exportPdfBtn) exportPdfBtn.textContent = t("export_pdf");
    if (exportWordBtn) exportWordBtn.textContent = t("export_word");
    if (clearBtn) clearBtn.textContent = t("clear_all");
    if (searchInput) searchInput.setAttribute("placeholder", t("search_placeholder"));
    if (notFoundEl) notFoundEl.textContent = t("not_found");
    if (emptyEl) emptyEl.textContent = t("empty_state");

    if (sortSelect) {
      const newest = sortSelect.querySelector("option[value='newest']");
      const oldest = sortSelect.querySelector("option[value='oldest']");
      const az = sortSelect.querySelector("option[value='az']");
      if (newest) newest.textContent = t("sort_newest");
      if (oldest) oldest.textContent = t("sort_oldest");
      if (az) az.textContent = t("sort_az");
    }

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

  listEl.addEventListener("click", (event) => {
    const removeButton = event.target.closest(".remove-icon");
    if (!removeButton) return;

    const id = removeButton.dataset.id;
    const nextBookmarks = getBookmarks().filter((savedId) => savedId !== id);
    setBookmarks(nextBookmarks);
    removeReadingProgress(id);

    showToast(t("toast_removed"));
    populateCategories();
    renderBookmarks();
    renderContinueReading();
  });

  searchInput?.addEventListener("input", runSearch);
  searchInput?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();

    const found = runSearch();
    if (found > 0) {
      listEl.querySelector(".bookmark-card[style*='block']")?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    } else {
      notFoundEl?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });

  sortSelect?.addEventListener("change", renderBookmarks);
  filterSelect?.addEventListener("change", renderBookmarks);

  exportPdfBtn?.addEventListener("click", () => {
    const saved = getBookmarks();
    if (saved.length === 0) {
      showToast(t("toast_no_bookmarks"));
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      unit: "pt",
      format: "a4"
    });

    let y = 60;
    doc.setFont("Times", "Bold");
    doc.setFontSize(18);
    doc.text(t("pdf_doc_title"), 40, y);
    y += 40;

    saved.forEach((id, index) => {
      const article = getArticleById(id);
      if (!article) return;

      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 40;
      const usableWidth = pageWidth - margin * 2;
      const title = `${index + 1}. ${article.judul || id}`;
      const titleLines = doc.splitTextToSize(title, usableWidth);

      doc.setFont("Times", "Bold");
      doc.setFontSize(14);
      doc.text(titleLines, margin, y);
      y += titleLines.length * 12 + 12;

      doc.setFont("Times", "Normal");
      doc.setFontSize(10);
      doc.text(`${article.penulis || "-"} - ${article.tanggal || "-"}`, 40, y);
      y += 18;

      const temp = document.createElement("div");
      temp.innerHTML = article.isi || "";
      temp.querySelectorAll(".reference, .footnote, sup").forEach((node) => node.remove());

      let text = (temp.innerText || "").split("Referensi")[0].split("Daftar Pustaka")[0].trim();
      const lines = doc.splitTextToSize(text, 500);

      lines.forEach((line) => {
        if (y > 760) {
          doc.addPage();
          y = 60;
        }

        const isArabic = /[\u0600-\u06FF]/.test(line);
        if (isArabic) {
          doc.text(line, 555, y, { align: "right" });
        } else {
          doc.text(line, 40, y);
        }
        y += 16;
      });

      y += 30;
      if (y > 720) {
        doc.addPage();
        y = 60;
      }
    });

    doc.save("bookmark-articles.pdf");
  });

  exportWordBtn?.addEventListener("click", () => {
    const saved = getBookmarks();
    if (saved.length === 0) {
      showToast(t("toast_no_bookmarks"));
      return;
    }

    let content = `<h1>${t("word_heading")}</h1>`;

    saved.forEach((id) => {
      const article = getArticleById(id);
      if (!article) return;

      content += `
        <h2>${article.judul || id}</h2>
        <p><strong>${t("meta_category")}:</strong> ${article.kategori || "-"}</p>
        <p><strong>${t("meta_date")}:</strong> ${article.tanggal || "-"}</p>
        <hr>
        ${article.isi || ""}
        <br><br><hr><br>
      `;
    });

    const blob = new Blob(["\ufeff", content], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "bookmark-articles.doc";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });

  clearBtn?.addEventListener("click", () => {
    if (!window.confirm(t("confirm_clear_all"))) return;

    localStorage.removeItem("bookmarks");
    localStorage.removeItem("readingProgress");
    showToast(t("toast_cleared"));
    populateCategories();
    renderBookmarks();
    renderContinueReading();
  });

  function rerenderAll() {
    syncStaticTexts();
    populateCategories();
    renderBookmarks();
    renderContinueReading();
    updateStats();
  }

  (function waitForStoreAndRender(attemptsLeft = 80) {
    const store = getLegacyArticleStore();
    const ready = store && typeof store === "object" && Object.keys(store).length > 0;
    if (!ready) {
      if ((attemptsLeft || 0) <= 0) {
        rerenderAll();
        return;
      }
      window.setTimeout(() => waitForStoreAndRender((attemptsLeft || 0) - 1), 60);
      return;
    }
    articleStoreCache.clear();
    rerenderAll();
  })();

  window.addEventListener("focus", () => {
    renderBookmarks();
    renderContinueReading();
    updateStats();
  });

  window.addEventListener("storage", (event) => {
    if (event.key === "readingProgress" || event.key === "bookmarks" || event.key === "siteLang") {
      rerenderAll();
    }
  });

  window.addEventListener("reading-progress-updated", rerenderAll);

  window.addEventListener("portal-language-change", rerenderAll);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initBookmarkPage);
} else {
  initBookmarkPage();
}
