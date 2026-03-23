// =====================
// GLOBAL STATE
// =====================
var SITE_LANGS = window.SITE_LANGS || (window.SITE_LANGS = ["id", "en", "ar"]);
const localeMap = { id: "id-ID", en: "en-US", ar: "ar-EG" };
var articleStoreCache = window.__PORTAL_ARTICLE_STORE_CACHE__ || (window.__PORTAL_ARTICLE_STORE_CACHE__ = new Map());

function getLegacyArticleStore() {
  const store = window.__PORTAL_ARTICLE_STORE__;
  return store && typeof store === "object" ? store : {};
}

function bindArticleSaveButtonsWithRetry(attemptsLeft = 80) {
  if (!isArticlePage) return;
  const bookmarkBtn = document.getElementById("bookmarkBtn");
  const offlineBtn = document.getElementById("offlineSaveBtn");

  const hasAny = !!bookmarkBtn || !!offlineBtn;
  if (!hasAny) {
    if ((attemptsLeft || 0) <= 0) return;
    window.setTimeout(() => bindArticleSaveButtonsWithRetry((attemptsLeft || 0) - 1), 80);
    return;
  }

  if (bookmarkBtn && !bookmarkBtn.dataset.bound) {
    const articleId = getCurrentArticleId();
    if (!articleId) {
      bookmarkBtn.disabled = true;
    } else {
      let saved = [];
      try {
        const parsed = JSON.parse(localStorage.getItem("bookmarks"));
        saved = Array.isArray(parsed) ? parsed : [];
      } catch {
        saved = [];
      }
      setArticleBookmarkState(bookmarkBtn, saved.includes(articleId));
    }

    bookmarkBtn.dataset.bound = "1";
    bookmarkBtn.addEventListener("click", () => {
      const id = getCurrentArticleId();
      if (!id) return;

      let savedNow = [];
      try {
        const parsed = JSON.parse(localStorage.getItem("bookmarks"));
        savedNow = Array.isArray(parsed) ? parsed : [];
      } catch {
        savedNow = [];
      }
      savedNow = [...new Set(savedNow)];

      const wasSaved = savedNow.includes(id);
      savedNow = wasSaved ? savedNow.filter((item) => item !== id) : [...savedNow, id];
      localStorage.setItem("bookmarks", JSON.stringify(savedNow));
      if (!wasSaved) {
        try {
          upsertBookmarkArticleMeta(id);
        } catch {}
      } else {
        try {
          removeBookmarkArticleMeta(id);
        } catch {}
      }
      setArticleBookmarkState(bookmarkBtn, !wasSaved);
      window.updateBookmarkBadge?.();
      try {
        window.dispatchEvent(new Event("bookmarks-updated"));
      } catch {}
      try {
        showToast(uiText(!wasSaved ? "bookmark_added" : "bookmark_removed"));
      } catch {}
    });
  }

  if (offlineBtn && !offlineBtn.dataset.bound) {
    const safeId = getCurrentArticleId();
    if (!safeId) {
      offlineBtn.disabled = true;
    }

    offlineBtn.dataset.bound = "1";
    offlineBtn.addEventListener("click", () => {
      const id = getCurrentArticleId();
      if (!id) return;

      const offline = safeJsonParse("offlineArticles", {});
      const fromStore = getArticleRawById(id) || getLegacyArticleStore()?.[id] || articleStore?.[id];
      const snapshot = fromStore || buildOfflineSnapshotFromDom(id);
      if (!snapshot) return;
      offline[id] = snapshot;
      localStorage.setItem("offlineArticles", JSON.stringify(offline));
      try {
        window.dispatchEvent(new Event("offlineUpdated"));
      } catch {}
      try {
        showToast(uiText("offline_saved"));
      } catch {}
    });
  }
}

function onDomReady(callback) {
  if (typeof document === "undefined") return;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback);
    return;
  }
  callback();
}

onDomReady(() => {
  try {
    bindArticleSaveButtonsWithRetry();
  } catch {}
});

window.addEventListener("load", () => {
  try {
    bindArticleSaveButtonsWithRetry();
  } catch {}
});

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

const mojibakePattern = /(?:\u00C3|\u00C2|\u00E2|\u00F0|\u00D8|\u00D9|\u00EF|\u00C4|\u00E1)/;
const cp1252ByteMap = new Map([
  [0x20AC, 0x80], [0x201A, 0x82], [0x0192, 0x83], [0x201E, 0x84],
  [0x2026, 0x85], [0x2020, 0x86], [0x2021, 0x87], [0x02C6, 0x88],
  [0x2030, 0x89], [0x0160, 0x8A], [0x2039, 0x8B], [0x0152, 0x8C],
  [0x017D, 0x8E], [0x2018, 0x91], [0x2019, 0x92], [0x201C, 0x93],
  [0x201D, 0x94], [0x2022, 0x95], [0x2013, 0x96], [0x2014, 0x97],
  [0x02DC, 0x98], [0x2122, 0x99], [0x0161, 0x9A], [0x203A, 0x9B],
  [0x0153, 0x9C], [0x017E, 0x9E], [0x0178, 0x9F]
]);

function decodeMojibakeOnce(value = "") {
  if (typeof value !== "string" || !mojibakePattern.test(value)) return value;
  if (typeof TextDecoder === "undefined") return value;

  const bytes = [];
  for (const char of value) {
    const codePoint = char.codePointAt(0);

    if (codePoint <= 0xFF) {
      bytes.push(codePoint);
      continue;
    }

    const mappedByte = cp1252ByteMap.get(codePoint);
    if (mappedByte === undefined) return value;
    bytes.push(mappedByte);
  }

  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(Uint8Array.from(bytes));
  } catch {
    return value;
  }
}

function repairMojibakeString(value = "") {
  let current = String(value);

  for (let i = 0; i < 12; i += 1) {
    const next = decodeMojibakeOnce(current);
    if (next === current) break;
    current = next;
  }

  return current;
}

function repairNestedText(input) {
  if (typeof input === "string") return repairMojibakeString(input);

  if (Array.isArray(input)) {
    for (let i = 0; i < input.length; i += 1) {
      input[i] = repairNestedText(input[i]);
    }
    return input;
  }

  if (input && typeof input === "object") {
    Object.keys(input).forEach((key) => {
      input[key] = repairNestedText(input[key]);
    });
  }

  return input;
}

function repairDomMojibake(root = document.body) {
  if (!root) return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  let current = walker.nextNode();

  while (current) {
    nodes.push(current);
    current = walker.nextNode();
  }

  nodes.forEach((node) => {
    const fixed = repairMojibakeString(node.nodeValue || "");
    if (fixed !== node.nodeValue) {
      node.nodeValue = fixed;
    }
  });

  root.querySelectorAll("[title],[aria-label],[placeholder]").forEach((el) => {
    ["title", "aria-label", "placeholder"].forEach((attr) => {
      const value = el.getAttribute(attr);
      if (!value) return;
      const fixed = repairMojibakeString(value);
      if (fixed !== value) {
        el.setAttribute(attr, fixed);
      }
    });
  });
}

function normalizeSiteLang(lang = "id") {
  return SITE_LANGS.includes(lang) ? lang : "id";
}

function getCurrentArticleId() {
  try {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get("id") || params.get("slug");
    if (fromQuery) return fromQuery;

    const path = String(window.location.pathname || "");
    const match = path.match(/^\/(?:article|articles|offline\/read)\/(.+)$/);
    if (!match || !match[1]) return "";
    const slug = match[1].split("/")[0];
    try {
      return decodeURIComponent(slug);
    } catch {
      return slug;
    }
  } catch {
    return "";
  }
}

function upsertBookmarkArticleMeta(articleId) {
  if (!articleId) return;

  const raw = getArticleRawById(articleId);
  const view = getArticleView(articleId);
  const source = view || raw;
  if (!source) return;

  const meta = {
    id: source.id || articleId,
    slug: source.slug || articleId,
    judul: source.judul || "",
    kategori: source.kategori || "",
    subkategori: source.subkategori || "",
    penulis: source.penulis || "",
    tanggal: source.tanggal || "",
    createdAt: source.createdAt || "",
    thumbnail: source.thumbnail || "",
    preview: source.preview || source.ringkasan || "",
    ringkasan: source.ringkasan || source.preview || "",
    bahasa: source.bahasa || source.locale || "",
    locale: source.locale || source.bahasa || "",
    lang: source.lang || ""
  };

  let map = {};
  try {
    const parsed = JSON.parse(localStorage.getItem("bookmarkArticles"));
    map = parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    map = {};
  }

  map[articleId] = meta;
  try {
    localStorage.setItem("bookmarkArticles", JSON.stringify(map));
  } catch {}
}

function removeBookmarkArticleMeta(articleId) {
  if (!articleId) return;

  let map = {};
  try {
    const parsed = JSON.parse(localStorage.getItem("bookmarkArticles"));
    map = parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    map = {};
  }

  if (!map || typeof map !== "object" || !map[articleId]) return;
  delete map[articleId];
  try {
    localStorage.setItem("bookmarkArticles", JSON.stringify(map));
  } catch {}
}

function buildOfflineSnapshotFromDom(articleId) {
  if (!articleId) return null;
  const titleEl = document.getElementById("judul-artikel");
  const penulisEl = document.getElementById("penulis");
  const tanggalEl = document.getElementById("tanggal");
  const kategoriEl = document.getElementById("kategori");
  const isiEl = document.getElementById("isi-artikel");
  const thumbEl = document.getElementById("article-thumb");

  const isi = isiEl ? isiEl.innerHTML : "";
  if (!isi) return null;

  const title = titleEl ? (titleEl.textContent || "").trim() : "";
  const penulis = penulisEl ? (penulisEl.textContent || "").trim() : "";
  const tanggal = tanggalEl ? (tanggalEl.textContent || "").trim() : "";
  const kategori = kategoriEl ? (kategoriEl.textContent || "").trim() : "";
  const thumbnail = thumbEl && thumbEl.getAttribute ? (thumbEl.getAttribute("src") || "") : "";

  return {
    id: articleId,
    slug: articleId,
    judul: title,
    penulis,
    tanggal,
    kategori,
    thumbnail,
    isi,
  };
}

function getBookmarkArticlesMap() {
  try {
    const parsed = JSON.parse(localStorage.getItem("bookmarkArticles"));
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function getLightArticleMeta(articleId) {
  if (!articleId) return null;
  const raw = getArticleRawById(articleId);
  if (raw) return raw;

  const legacy = getLegacyArticleStore();
  const legacyFound = legacy && typeof legacy === "object" ? legacy[articleId] : null;
  if (legacyFound) return legacyFound;

  const bookmarksMeta = getBookmarkArticlesMap();
  const savedMeta = bookmarksMeta && typeof bookmarksMeta === "object" ? bookmarksMeta[articleId] : null;
  if (savedMeta) return savedMeta;

  const offline = safeJsonParse("offlineArticles", {});
  const offlineMeta = offline && typeof offline === "object" ? offline[articleId] : null;
  if (offlineMeta) return offlineMeta;

  return null;
};

function hasBrokenTranslationText(value = "") {
  const text = String(value || "");
  if (!text) return false;
  return /\?{4,}/.test(text) || /translation in progress/i.test(text) || text.includes("الترجمة قيد الإعداد");
}

function isUsableArticleTranslation(article, lang = "id") {
  if (!article || typeof article !== "object") return false;

  const sample = [
    article.judul,
    article.ringkasan,
    article.preview,
    article.isi,
    article.kategori,
    article.subkategori,
    article.tanggal,
  ]
    .filter(Boolean)
    .join(" ");

  if (!sample.trim()) return false;
  if (hasBrokenTranslationText(sample)) return false;

  if (lang === "ar") {
    const arabicChars = (sample.match(/[\u0600-\u06FF]/g) || []).length;
    if (arabicChars < 20) return false;
  }

  return true;
}

function getSiteLang() {
  return normalizeSiteLang(window.PortalI18n?.getCurrentLang?.() || localStorage.getItem("siteLang") || "id");
}

function loadStoreForLang(lang = "id") {
  const safeLang = normalizeSiteLang(lang);
  const legacy = getLegacyArticleStore();
  const store = legacy[safeLang];

  const hasUsableStore = store && typeof store === "object" && Object.keys(store).length > 0;
  if (hasUsableStore) {
    const cached = articleStoreCache.get(safeLang);
    if (cached !== store) {
      repairNestedText(store);
      articleStoreCache.set(safeLang, store);
    }
    return store;
  }

  const cached = articleStoreCache.get(safeLang);
  if (cached && typeof cached === "object" && Object.keys(cached).length > 0) {
    return cached;
  }

  return {};
}

let articleStore = loadStoreForLang(getSiteLang());
const FALLBACK_LANG_ORDER = ["id", "en", "ar"];

function refreshArticleStore() {
  articleStore = loadStoreForLang(getSiteLang());
  return articleStore;
}

function buildSitePath(pathname = "") {
  const raw = String(pathname || "").trim();
  if (!raw) return "/";
  if (/^(https?:)?\/\//i.test(raw)) return raw;
  if (raw.startsWith("/")) return raw;
  return `/${raw.replace(/^\.\//, "")}`;
}

function buildArticleHref(id, title = "") {
  const basePath = typeof window !== "undefined" && String(window.location?.pathname || "").startsWith("/articles")
    ? "/articles"
    : "/article";
  const params = new URLSearchParams();
  if (id) params.set("id", String(id));
  const slug = slugify(title || "");
  if (slug) params.set("slug", slug);
  return `${basePath}?${params.toString()}`;
}

const getLocalizedArticle = (id, lang = getSiteLang()) => {
  const order = [normalizeSiteLang(lang), ...FALLBACK_LANG_ORDER.filter((item) => item !== normalizeSiteLang(lang))];

  for (const locale of order) {
    const store = loadStoreForLang(locale);
    const article = store[id];
    if (isUsableArticleTranslation(article, locale)) {
      return article;
    }
  }

  return null;
};
/*
  palestina: {
    labels: { id: "Palestina & Perjuangan", en: "Palestine & Resistance", ar: "ÙÙ„Ø³Ø·ÙŠÙ† ÙˆØ§Ù„Ù…Ù‚Ø§ÙˆÙ…Ø©" },
    icon: "ðŸ›¡ï¸",
    aliases: ["palestina", "palestina & perjuangan", "palestine", "palestine & resistance", "gaza", "ÙÙ„Ø³Ø·ÙŠÙ†", "ÙÙ„Ø³Ø·ÙŠÙ† ÙˆØ§Ù„Ù…Ù‚Ø§ÙˆÙ…Ø©"],
  },
  fatwa: {
    labels: { id: "Fatwa Dar al-Ifta", en: "Dar al-Ifta Fatwas", ar: "ÙØªØ§ÙˆÙ‰ Ø¯Ø§Ø± Ø§Ù„Ø¥ÙØªØ§Ø¡" },
    icon: "ðŸ“‘",
    aliases: ["fatwa", "fatwa dar al-ifta", "dar al-ifta", "dar al-ifta fatwas", "ÙØªÙˆÙ‰", "ÙØªØ§ÙˆÙ‰ Ø¯Ø§Ø± Ø§Ù„Ø¥ÙØªØ§Ø¡"],
  },
};

*/
function getArticleRawById(id) {
  if (!id) return null;
  if (isUsableArticleTranslation(articleStore[id], getSiteLang())) return articleStore[id];

  for (const lang of FALLBACK_LANG_ORDER) {
    const store = loadStoreForLang(lang);
    if (isUsableArticleTranslation(store[id], lang)) return store[id];
  }

  return null;
}

function getOfflineArticleById(id) {
  if (!id) return null;

  try {
    const offline = safeJsonParse("offlineArticles", {});
    return offline[id] || null;
  } catch {
    return null;
  }
}

function getAllArticleKeys(includeOffline = false) {
  const keys = new Set();

  FALLBACK_LANG_ORDER.forEach((lang) => {
    const store = loadStoreForLang(lang);
    Object.keys(store || {}).forEach((id) => keys.add(id));
  });

  if (!keys.size) {
    Object.keys(articleStore || {}).forEach((id) => keys.add(id));
  }

  if (includeOffline) {
    try {
      const offline = safeJsonParse("offlineArticles", {});
      Object.keys(offline).forEach((id) => keys.add(id));
    } catch {
      // ignore invalid offline payload
    }
  }

  return Array.from(keys);
}

function getSortedGlobalArticleKeysByDate(includeOffline = false) {
  return getAllArticleKeys(includeOffline).sort((a, b) => {
    const bSource = getArticleRawById(b) || (includeOffline ? getOfflineArticleById(b) : null);
    const aSource = getArticleRawById(a) || (includeOffline ? getOfflineArticleById(a) : null);
    const bDate = new Date(bSource?.createdAt || bSource?.tanggal || 0).getTime();
    const aDate = new Date(aSource?.createdAt || aSource?.tanggal || 0).getTime();
    return bDate - aDate;
  });
}

const categoryMeta = {
 ilmusyariah: {
  labels: {
    id: "Ilmu Syariah",
    en: "Islamic Law",
    ar: "الفقه الإسلامي"
  },
  icon: "⚖️",
  aliases: [
    "ilmusyariah",
    "ilmu syariah",
    "ilmu-syariah",
    "islamic law",
    "sharia studies",
    "fiqh",
    "الفقه",
    "الفقه الإسلامي",
    "الدراسات الشرعية"
  ],
},
  hadis: {
    labels: { id: "Hadis", en: "Hadith", ar: "الحديث" },
    icon: "📜",
    aliases: ["hadis", "hadith", "الحديث"],
  },
  ibadah: {
    labels: { id: "Ibadah", en: "Worship", ar: "العبادة" },
    icon: "🕋",
    aliases: ["ibadah", "worship", "العبادة", "fiqh ibadah"],
  },
  quran: {
    labels: { id: "Quran", en: "Qur'an", ar: "القرآن" },
    icon: "📖",
    aliases: ["quran", "qur'an", "al-quran", "al-qur'an & tafsir", "al-quran & tafsir", "القرآن", "القرآن والتفسير"],
  },
  tasawuf: {
    labels: { id: "Tasawuf", en: "Tasawuf", ar: "التصوف" },
    icon: "✨",
    aliases: ["tasawuf", "sufism", "التصوف"],
  },
  pemikiran: {
    labels: { id: "Pemikiran", en: "Thought", ar: "الفكر" },
    icon: "💡",
    aliases: ["pemikiran", "pemikiran islam", "thought", "islamic thought", "الفكر", "الفكر الإسلامي"],
  },
  politik: {
  labels: {
    id: "Politik Islam",
    en: "Islamic Politics",
    ar: "السياسة الإسلامية"
  },
  icon: "🏛️",
  aliases: [
    "politik",
    "politik islam",
    "islam & negara",
    "islam dan negara",
    "islam & state",
    "islamic politics",
    "السياسة",
    "السياسة الإسلامية",
    "الإسلام والدولة",
    "politics",
    "islam and state"
  ],
},
  ramadhan: {
    labels: { id: "Ramadhan", en: "Ramadan", ar: "رمضان" },
    icon: "🌙",
    aliases: ["ramadhan", "ramadan", "ramadan at al-azhar", "رمضان", "رمضان في الأزهر"],
  },
  keilmuan: {
    labels: { id: "Keilmuan", en: "Knowledge", ar: "المعرفة" },
    icon: "🎓",
    aliases: ["keilmuan", "knowledge", "islamic scholarship", "tradisi keilmuan islam", "المعرفة", "التراث العلمي الإسلامي"],
  },
  palestina: {
    labels: { id: "Palestina & Perjuangan", en: "Palestine & Resistance", ar: "ÙÙ„Ø³Ø·ÙŠÙ† ÙˆØ§Ù„Ù…Ù‚Ø§ÙˆÙ…Ø©" },
    icon: "🛡️",
    aliases: ["palestina", "palestina & perjuangan", "palestine", "palestine & resistance", "gaza", "ÙÙ„Ø³Ø·ÙŠÙ†", "ÙÙ„Ø³Ø·ÙŠÙ† ÙˆØ§Ù„Ù…Ù‚Ø§ÙˆÙ…Ø©"],
  },
  fatwa: {
    labels: { id: "Fatwa Dar al-Ifta", en: "Dar al-Ifta Fatwas", ar: "ÙØªØ§ÙˆÙ‰ Ø¯Ø§Ø± Ø§Ù„Ø¥ÙØªØ§Ø¡" },
    icon: "📑",
    aliases: ["fatwa", "fatwa dar al-ifta", "dar al-ifta", "dar al-ifta fatwas", "ÙØªÙˆÙ‰", "ÙØªØ§ÙˆÙ‰ Ø¯Ø§Ø± Ø§Ù„Ø¥ÙØªØ§Ø¡"],
  },
  kalam: {
    labels: { id: "Ilmu Kalam", en: "Islamic Theology", ar: "علم الكلام" },
    icon: "🧭",
    aliases: ["kalam", "ilmu kalam", "kalam-akidah", "kalam-klasik", "kalam-modern", "علم الكلام"],
  },
  sirah: {
    labels: { id: "Sirah Nabawiyah", en: "Prophetic Biography", ar: "السيرة النبوية" },
    icon: "🕊️",
    aliases: ["sirah", "sirah nabawiyah", "sirah-makkiyah", "sirah-madaniyah", "السيرة", "السيرة النبوية"],
  },
  psikologi: {
    labels: { id: "Psikologi", en: "Psychology", ar: "علم النفس" },
    icon: "🧠",
    aliases: ["psikologi", "psychology", "nafs-dalam-islam", "psikologi-ibadah", "tazkiyatun-nafs", "psikologi-sosial", "psikologi-pendidikan", "kesehatan-mental", "علم النفس"],
  },
  kontemporer: {
    labels: { id: "Tantangan Zaman", en: "Contemporary Challenges", ar: "التحديات المعاصرة" },
    icon: "🌐",
    aliases: ["kontemporer", "tantangan zaman", "isu kontemporer", "etika-digital", "politik-global", "gender", "ekonomi-modern", "التحديات المعاصرة"],
  },
};

categoryMeta.palestina = {
  ...categoryMeta.palestina,
  labels: {
    id: "Palestina & Perjuangan",
    en: "Palestine & Resistance",
    ar: "\u0641\u0644\u0633\u0637\u064A\u0646 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0645\u0629",
  },
  icon: "\u{1F6E1}\uFE0F",
  aliases: [
    "palestina",
    "palestina & perjuangan",
    "palestine",
    "palestine & resistance",
    "gaza",
    "\u0641\u0644\u0633\u0637\u064A\u0646",
    "\u0641\u0644\u0633\u0637\u064A\u0646 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0645\u0629",
  ],
};

categoryMeta.fatwa = {
  ...categoryMeta.fatwa,
  labels: {
    id: "Fatwa Dar al-Ifta",
    en: "Dar al-Ifta Fatwas",
    ar: "\u0641\u062A\u0627\u0648\u0649 \u062F\u0627\u0631 \u0627\u0644\u0625\u0641\u062A\u0627\u0621",
  },
  icon: "\u{1F4D1}",
  aliases: [
    "fatwa",
    "fatwa dar al-ifta",
    "dar al-ifta",
    "dar al-ifta fatwas",
    "\u0641\u062A\u0648\u0649",
    "\u0641\u062A\u0627\u0648\u0649 \u062F\u0627\u0631 \u0627\u0644\u0625\u0641\u062A\u0627\u0621",
  ],
};

function normalizeCategoryLabel(value = "") {
  return repairMojibakeString(String(value || ""))
    .replace(/\u00a0/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function normalizeSlugKey(value = "") {
  return repairMojibakeString(String(value || ""))
    .replace(/\u00a0/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
    .replace(/\-+/g, "-")
    .replace(/^\-+|\-+$/g, "");
}

function isKnownCategoryKey(value = "") {
  const token = normalizeSlugKey(value);
  if (!token) return false;
  return Boolean(categoryMeta && Object.prototype.hasOwnProperty.call(categoryMeta, token));
}

function resolveCategoryKey(value = "") {
  const token = normalizeSlugKey(value);
  if (token && isKnownCategoryKey(token)) return token;
  return getCanonicalCategoryKey(value) || token || null;
}

function getCanonicalCategoryKey(category = "") {
  const token = normalizeCategoryLabel(category);
  if (!token) return null;

  return Object.entries(categoryMeta).find(([, meta]) => meta.aliases.includes(token))?.[0] || null;
}

/* Subkategori mengikuti ID, tampilan pakai label id/en/ar */
const subcategoryMeta = {
  "catatan-ramadhan": { id: "Catatan Ramadhan", en: "Ramadan Notes", ar: "ملاحظات رمضان" },
  "tadabbur": { id: "Tadabbur", en: "Reflection", ar: "التدبر" },
  "sejarah-azhar": { id: "Sejarah Azhar", en: "Al-Azhar History", ar: "تاريخ الأزهر" },
  "fiqh": { id: "Fiqh", en: "Fiqh", ar: "الفقه" },
  "ushulfiqh": { id: "Ushul Fiqh", en: "Usul al-Fiqh", ar: "أصول الفقه" },
  "hadis-mustolah": { id: "Mustolah Hadis", en: "Hadith Terminology", ar: "مصطلح الحديث" },
  "hadis-ulumul": { id: "Ulumul Hadis", en: "Hadith Sciences", ar: "علوم الحديث" },
  "syamail": { id: "Syamail", en: "Shamā'il", ar: "الشمائل" },
  "tasawuf-tarekat": { id: "Tasawuf & Tarekat", en: "Tasawuf & Tariqa", ar: "التصوف والطريقة" },
  "tasawuf-akhlak": { id: "Tasawuf & Akhlak", en: "Tasawuf & Character", ar: "التصوف والأخلاق" },
  "politik-islam": { id: "Politik Islam", en: "Islamic Politics", ar: "السياسة الإسلامية" },
  "pemikiran-modern": { id: "Pemikiran Modern", en: "Modern Thought", ar: "الفكر الحديث" },
  "pemikiran-klasik": { id: "Pemikiran Klasik", en: "Classical Thought", ar: "الفكر الكلاسيكي" },
  "tradisi-keilmuan": { id: "Tradisi Keilmuan", en: "Scholarly Tradition", ar: "التقاليد العلمية" },
  "ibadah-shalat": { id: "Ibadah Shalat", en: "Prayer Worship", ar: "عبادة الصلاة" },
  "ibadah-puasa": { id: "Ibadah Puasa", en: "Fasting Worship", ar: "عبادة الصوم" },
  "quran-tafsir-surah": { id: "Tafsir Surah", en: "Surah Tafsir", ar: "تفسير السور" },
  "quran-tafsir-ayat": { id: "Tafsir Ayat", en: "Verse Tafsir", ar: "تفسير الآيات" },
};

function getCanonicalSubcategoryKey(categoryKey, subcategory = "") {
  const token = normalizeCategoryLabel(subcategory);
  if (!token) return null;

  if (categoryKey === "ramadhan") {
    if (token.includes("catatan") || token.includes("note") || token.includes("spiritual") || token.includes("reflection")) return "catatan-ramadhan";
    if (token.includes("tadabbur") || token.includes("reflect")) return "tadabbur";
    if (token.includes("sejarah") || token.includes("azhar") || token.includes("history")) return "sejarah-azhar";
  }

  if (categoryKey === "hadis") {
    if (token.includes("mustolah") || token.includes("mustalah")) return "hadis-mustolah";
    if (token.includes("ulumul") || token.includes("ulum")) return "hadis-ulumul";
    if (token.includes("syamail") || token.includes("syama")) return "syamail";
  }

  if (categoryKey === "tasawuf") {
    if (token.includes("tarekat") || token.includes("tariqa") || token.includes("tarekat")) return "tasawuf-tarekat";
    if (token.includes("akhlak") || token.includes("character") || token.includes("and character")) return "tasawuf-akhlak";
  }

  if (categoryKey === "politik") {
    if (token.includes("politik") || token.includes("political") || token.includes("islam")) return "politik-islam";
  }

  if (categoryKey === "pemikiran") {
    if (token.includes("klasik") || token.includes("classic")) return "pemikiran-klasik";
    if (token.includes("modern") || token.includes("social") || token.includes("islamic")) return "pemikiran-modern";
  }

  if (categoryKey === "keilmuan") {
    if (token.includes("tradisi") || token.includes("scholarly") || token.includes("tradition")) return "tradisi-keilmuan";
  }

  if (categoryKey === "ilmusyariah") {
    if (token === "fiqh" || token.includes("fiqh")) return "fiqh";
    if (token.includes("ushul")) return "ushulfiqh";
  }

  if (categoryKey === "ibadah") {
    if (token.includes("shalat") || token.includes("prayer")) return "ibadah-shalat";
    if (token.includes("puasa") || token.includes("fasting")) return "ibadah-puasa";
  }

  if (categoryKey === "quran") {
    if (token.includes("surah") || token.includes("surat")) return "quran-tafsir-surah";
    if (token.includes("ayat") || token.includes("verse")) return "quran-tafsir-ayat";
  }

  if (categoryKey === "palestina") {
    if (token.includes("sejarah") || token.includes("history") || token.includes("konflik") || token.includes("conflict")) return "palestina-sejarah";
    if (token.includes("opini") || token.includes("opinion") || token.includes("analisis") || token.includes("analysis")) return "palestina-opini";
  }

  if (categoryKey === "fatwa") {
    if (token.includes("ibadah") || token.includes("worship") || token.includes("ritual")) return "fatwa-ibadah";
    if (token.includes("kontemporer") || token.includes("contemporary") || token.includes("modern")) return "fatwa-kontemporer";
  }

  return null;
}

function getLocalizedSubcategory(subcategoryKey, categoryKey, lang = getSiteLang()) {
  const key = normalizeSlugKey(subcategoryKey) || getCanonicalSubcategoryKey(categoryKey, subcategoryKey);
  if (key && subcategoryMeta[key]) {
    const meta = subcategoryMeta[key];
    return meta[lang] || meta.id || subcategoryKey || "";
  }
  return repairMojibakeString(String(subcategoryKey || "")).trim() || subcategoryKey || "";
}

function getStableArticleMeta(id, rawArticle = null, viewArticle = null) {
  const baseStore = loadStoreForLang("id");
  const baseArticle = (id && baseStore[id]) || rawArticle || viewArticle || null;
  const categorySource = baseArticle?.kategori || rawArticle?.kategori || viewArticle?.kategori || "";
  const subcategorySource = baseArticle?.subkategori || rawArticle?.subkategori || viewArticle?.subkategori || "";
  const tagSource = baseArticle?.tag || rawArticle?.tag || viewArticle?.tag || "";

  const categoryKey = resolveCategoryKey(categorySource)
    || normalizeCategoryLabel(categorySource);

  const subcategoryKeyDirect = normalizeSlugKey(subcategorySource);
  const subcategoryKey = subcategoryKeyDirect
    || getCanonicalSubcategoryKey(categoryKey, subcategorySource)
    || null;

  const tagKey = normalizeSlugKey(tagSource);

  return {
    categoryKey,
    subcategoryKey,
    tagKey,
    rawCategory: categorySource,
    rawSubcategory: subcategorySource,
    rawTag: tagSource,
  };
}

function getLocalizedCategory(category, lang = getSiteLang()) {
  const key = resolveCategoryKey(category);
  if (key && categoryMeta[key]?.labels) {
    return categoryMeta[key].labels[lang] || categoryMeta[key].labels.id;
  }
  return repairMojibakeString(String(category || "")).trim() || category || "";
}

const formatArticleDate = (article, lang = getSiteLang(), includeWeekday = false) => {
  const source = article?.createdAt || article?.tanggal || article?.date || "";
  const parsed = new Date(source);

  if (Number.isNaN(parsed.getTime())) {
    return article?.tanggal || source || "";
  }

  const locale = localeMap[normalizeSiteLang(lang)] || localeMap.id;
  return new Intl.DateTimeFormat(locale, includeWeekday
    ? {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
    : {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  ).format(parsed);
};

const pageParams = (() => {
  try {
    return new URLSearchParams(window.location.search);
  } catch {
    return new URLSearchParams();
  }
})();

const isArticlePage =
  document.getElementById("isi-artikel") !== null;

const isHomePage =
  document.getElementById("articles-container") !== null &&
  !isArticlePage &&
  !pageParams.get("id") &&
  !pageParams.get("slug");

let cards = [];
let activeFilter = "all";

let sidebar = null;
let overlay = null;

function getArticleView(id) {
  return getLocalizedArticle(id, getSiteLang()) || getArticleRawById(id) || getOfflineArticleById(id);
}

function getStrictLocalizedArticle(id, lang = getSiteLang()) {
  const safeLang = normalizeSiteLang(lang);
  const store = loadStoreForLang(safeLang);
  const article = store[id];
  return isUsableArticleTranslation(article, safeLang) ? article : null;
}

function getSortedArticleKeysByDate() {
  return Object.keys(articleStore).sort((a, b) => {
    const bDate = new Date(getArticleRawById(b)?.createdAt || 0).getTime();
    const aDate = new Date(getArticleRawById(a)?.createdAt || 0).getTime();
    return bDate - aDate;
  });
}

function getPreviewText(article) {
  return (article?.preview || article?.ringkasan || article?.isi?.replace(/<[^>]*>/g, " ") || "")
    .replace(/\s+/g, " ")
    .trim();
}

function isFlagEnabled(value) {
  if (value === true || value === 1) return true;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    return normalized === "true" || normalized === "1" || normalized === "yes";
  }
  return false;
}

function initDomTextRepair() {
  repairDomMojibake(document.body);
  const observer = new MutationObserver(() => {
    repairDomMojibake(document.body);
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
  });
}
const articleUiText = {
  id: {
    site_name: "Portal Literasi Islam",
    read_more: "Baca Selengkapnya",
    popular_badge: "Populer",
    featured_badge: "Featured",
    new_badge: "Baru",
    articles_count_label: "artikel",
    prev_article: "Artikel Sebelumnya",
    next_article: "Artikel Selanjutnya",
    read_short: "Baca",
    copy_success: "Tersalin!",
    copy_link: "Copy Link",
    read_time: "\u{1F552} {{minutes}} menit baca",
    article_translate: "Terjemahkan:",
    toc: "Daftar Isi",
    not_found_title: "Artikel tidak ditemukan",
    not_found_body: "Artikel yang Anda cari belum tersedia atau tautan tidak valid.",
    back_home: "Kembali ke Beranda",
    focus_mode: "Mode Fokus",
    save_offline: "Simpan Offline",
    save_bookmark: "Simpan",
    read_mode: "Mode Baca",
    reset: "Reset",
    bookmark_hint: "Artikel tersimpan dapat dilihat di menu <strong>Bookmark</strong>",
    share_whatsapp: "WhatsApp",
    share_copy: "Copy Link",
    related_articles: "Artikel Terkait",
    recommended_articles: "Artikel Direkomendasikan",
    breadcrumb_home: "Beranda",
    author_label: "Penulis",
    read_offline: "Baca Offline",
    continue_from: "Lanjutkan dari {{percent}}%",
    continue_reading_action: "Lanjutkan Membaca",
    start_reading: "Mulai Membaca",
    featured_articles: "Artikel Pilihan",
    continue_reading_title: "Lanjutkan Membaca",
    reader_stats_title: "Statistik Membaca",
    download_category_label: "Download kategori ini",
    empty_articles: "Artikel tidak ditemukan"
  },
  en: {
    site_name: "Islamic Literacy Portal",
    read_more: "Read More",
    popular_badge: "Popular",
    featured_badge: "Featured",
    new_badge: "New",
    articles_count_label: "articles",
    prev_article: "Previous Article",
    next_article: "Next Article",
    read_short: "Read",
    copy_success: "Copied!",
    copy_link: "Copy Link",
    read_time: "\u{1F552} {{minutes}} min read",
    article_translate: "Translate:",
    toc: "Table of Contents",
    not_found_title: "Article not found",
    not_found_body: "The article you are looking for is not available yet or the link is invalid.",
    back_home: "Back to Home",
    focus_mode: "Focus Mode",
    save_offline: "Save Offline",
    save_bookmark: "Save",
    read_mode: "Reading Mode",
    reset: "Reset",
    bookmark_hint: "Saved articles are available in the <strong>Bookmark</strong> menu",
    share_whatsapp: "WhatsApp",
    share_copy: "Copy Link",
    related_articles: "Related Articles",
    recommended_articles: "Recommended Articles",
    breadcrumb_home: "Home",
    author_label: "Author",
    read_offline: "Read Offline",
    continue_from: "Continue from {{percent}}%",
    continue_reading_action: "Continue Reading",
    start_reading: "Start Reading",
    featured_articles: "Featured Articles",
    continue_reading_title: "Continue Reading",
    reader_stats_title: "Reading Stats",
    download_category_label: "Download this category",
    empty_articles: "No articles found"
  },

  ar: {
    site_name: "بوابة الثقافة الإسلامية",
    read_more: "اقرأ المزيد",
    popular_badge: "شائع",
    featured_badge: "مميز",
    new_badge: "جديد",
    articles_count_label: "مقالة",
    prev_article: "المقال السابق",
    next_article: "المقال التالي",
    read_short: "اقرأ",
    copy_success: "تم النسخ!",
    copy_link: "نسخ الرابط",
    read_time: "\u{1F552} {{minutes}} دقائق قراءة",
    article_translate: "ترجم:",
    toc: "جدول المحتويات",
    not_found_title: "لم يتم العثور على المقال",
    not_found_body: "المقال الذي تبحث عنه غير متوفر بعد أو أن الرابط غير صالح.",
    back_home: "العودة إلى الرئيسية",
    focus_mode: "وضع التركيز",
    save_offline: "حفظ دون اتصال",
    save_bookmark: "حفظ",
    read_mode: "وضع القراءة",
    reset: "إعادة ضبط",
    bookmark_hint: "يمكن مشاهدة المقالات المحفوظة من قائمة <strong>الإشارات المرجعية</strong>",
    share_whatsapp: "واتساب",
    share_copy: "نسخ الرابط",
    related_articles: "مقالات ذات صلة",
    recommended_articles: "مقالات مقترحة",
    breadcrumb_home: "الرئيسية",
    author_label: "الكاتب",
    read_offline: "قراءة دون اتصال",
    continue_from: "تابع من {{percent}}%",
    continue_reading_action: "متابعة القراءة",
    start_reading: "ابدأ القراءة",
    featured_articles: "مقالات مميزة",
    continue_reading_title: "تابع القراءة",
    reader_stats_title: "إحصاءات القراءة",
    download_category_label: "تنزيل هذه الفئة",
    empty_articles: "لم يتم العثور على مقالات"
  }
};

repairNestedText(articleUiText);


Object.assign(articleUiText.id, {
  bookmark_added: "Artikel disimpan",
  bookmark_removed: "Bookmark dihapus",
  offline_saved: "Artikel disimpan offline",
  offline_status: "Anda sedang offline.",
  online_back: "Koneksi kembali online.",
  focus_exit: "Keluar Fokus",
  generic_success: "Perubahan berhasil disimpan",
  download_done: "Semua artikel kategori berhasil diunduh",
  copied_label: "Tersalin!",
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
  footer_copy: "(c) 2026 Portal Literasi Islam - Seluruh hak cipta dilindungi.",
});

Object.assign(articleUiText.en, {
  bookmark_added: "Article saved",
  bookmark_removed: "Bookmark removed",
  offline_saved: "Article saved offline",
  offline_status: "You are offline.",
  online_back: "Connection is back online.",
  focus_exit: "Exit Focus",
  generic_success: "Changes saved successfully",
  download_done: "Category articles downloaded",
  copied_label: "Copied!",
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
  footer_copy: "(c) 2026 Islamic Literacy Portal - All rights reserved.",
});

articleUiText.id.smart_fiqh = "Smart Fiqh";
articleUiText.en.smart_fiqh = "Smart Fiqh";
articleUiText.ar.smart_fiqh = "\u0627\u0644\u0641\u0642\u0647 \u0627\u0644\u0630\u0643\u064A";

const portalOfflineText = window.PortalI18n?.t?.("offline_notice");
const portalOnlineText = window.PortalI18n?.t?.("online_status");

function uiText(key, params = {}) {
  const lang = getSiteLang();
  const portalValue = window.PortalI18n?.t?.(key, params);
  if (portalValue && portalValue !== key) {
    return String(portalValue).replace(/\{\{\s*(\w+)\s*\}\}/g, (_, token) => params[token] ?? "");
  }
  const source = articleUiText[lang]?.[key] || articleUiText.id[key] || key;
  return String(source).replace(/\{\{\s*(\w+)\s*\}\}/g, (_, token) => params[token] ?? "");
}

function getArticleCountLabel(count = 0, lang = getSiteLang()) {
  const safeCount = Number.isFinite(Number(count)) ? Number(count) : 0;
  const label = uiText("articles_count_label");
  if (lang === "ar") {
    return `${safeCount} ${label}`;
  }
  return `${safeCount} ${label}`;
}

function sanitizeUiMessage(message, fallbackKey = "generic_success") {
  const repaired = repairMojibakeString(String(message ?? "")).trim();
  if (!repaired || /[??????]/.test(repaired) || repaired.length > 180) {
    return uiText(fallbackKey);
  }
  return repaired;
}

function localizeAuthorName(author = "", lang = getSiteLang()) {
  const value = String(author || "").trim();
  if (!value) return value;

  const authorMap = {
    "Tim Kajian Ramadhan": { en: "Ramadan Study Team", ar: "فريق دراسات رمضان" },
    "Tim Kajian Hadis": { en: "Hadith Study Team", ar: "فريق دراسات الحديث" },
    "Tim Kajian Fiqh": { en: "Fiqh Study Team", ar: "فريق دراسات الفقه" },
    "Tim Kajian Tafsir": { en: "Tafsir Study Team", ar: "فريق دراسات التفسير" },
    "Tim Kajian Tasawuf": { en: "Tasawuf Study Team", ar: "فريق دراسات التصوف" },
    "Tim Kajian Pemikiran": { en: "Thought Study Team", ar: "فريق دراسات الفكر" },
    "Tim Kajian Keilmuan": { en: "Scholarship Study Team", ar: "فريق الدراسات العلمية" },
    "Tim Kajian Syama'il": { en: "Shama'il Study Team", ar: "فريق دراسات الشمائل" },
    "Tim Kajian ibadah": { en: "Worship Study Team", ar: "فريق دراسات العبادة" },
    "Redaksi Politik": { en: "Politics Editorial Team", ar: "هيئة التحرير السياسية" },
    "Redaksi Maqasid": { en: "Maqasid Editorial", ar: "هيئة تحرير المقاصد" },
  };

  if (authorMap[value]?.[lang]) return authorMap[value][lang];

  return value;
}

function setThemeToggleIcon(button) {
  if (!button) return;
  const dark = document.body.classList.contains("dark");
  button.textContent = dark ? "\u2600\uFE0F" : "\uD83C\uDF19";
}

function setCardBookmarkState(button, active) {
  if (!button) return;
  button.classList.toggle("active", !!active);
  button.textContent = active ? "\u2605" : "\u2606";
  button.setAttribute("aria-label", active ? uiText("bookmark_removed") : uiText("save_bookmark"));
}

function setArticleBookmarkState(button, active) {
  if (!button) return;
  button.textContent = active
    ? `\u2605 ${uiText("bookmark_added")}`
    : `\u2606 ${uiText("save_bookmark")}`;
}

function setFocusModeLabel(button, active) {
  if (!button) return;
  button.textContent = active ? `\u274C ${uiText("focus_exit")}` : `\u{1F514} ${uiText("focus_mode")}`;
}

window.addEventListener("portal-language-change", () => {
  if (isHomePage || isArticlePage) {
    window.location.reload();
  }
});

function normalize(text = "") {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

function slugify(text = "") {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function setReaderButtonState(button, active) {
  if (!button) return;
  button.classList.toggle("active", !!active);
  button.setAttribute("aria-pressed", active ? "true" : "false");
}

function applyRTL(lang = getSiteLang()) {
  const safeLang = normalizeSiteLang(lang);
  const isArabic = safeLang === "ar";

  document.documentElement.setAttribute("lang", safeLang);
  document.documentElement.setAttribute("dir", isArabic ? "rtl" : "ltr");

  const articleWrap = document.querySelector(".article-content");
  if (articleWrap) {
    articleWrap.setAttribute("dir", isArabic ? "rtl" : "ltr");
  }

  const articleBody = document.getElementById("isi-artikel");
  if (articleBody) {
    articleBody.setAttribute("dir", isArabic ? "rtl" : "ltr");
    articleBody.setAttribute("lang", isArabic ? "ar" : safeLang);
    articleBody.style.direction = isArabic ? "rtl" : "ltr";
    articleBody.style.textAlign = isArabic ? "right" : "left";
  }
}

function renderArticleBreadcrumb(category = "", title = "") {
  const breadcrumbCategory = document.getElementById("breadcrumb-category");
  const breadcrumbTitle = document.getElementById("breadcrumb-title");

  if (breadcrumbCategory) {
    breadcrumbCategory.textContent = category || "";
    breadcrumbCategory.style.display = category ? "" : "none";
  }

  if (breadcrumbTitle) {
    breadcrumbTitle.textContent = title || "";
    breadcrumbTitle.style.display = title ? "" : "none";
  }
}

function renderRelatedArticles(articleId, articleKeys, currentRaw, currentView) {
  const relatedContainer = document.getElementById("related-container");
  const relatedSection = document.querySelector(".related-articles");
  const relatedTitle = document.querySelector(".related-articles h3");
  const activeLang = getSiteLang();
  const strictOnly = activeLang !== "id";

  if (relatedTitle) relatedTitle.textContent = uiText("related_articles");
  if (!relatedContainer || !relatedSection || !articleId) return;

  relatedContainer.innerHTML = "";
  relatedSection.style.display = "block";

  const currentStableMeta = getStableArticleMeta(articleId, currentRaw, currentView);
  const currentCategoryKey = currentStableMeta?.categoryKey || "";

  if (!currentCategoryKey) {
    relatedSection.style.display = "none";
    return;
  }

  let relatedKeys = articleKeys
    .filter((key) => key !== articleId)
      .filter((key) => {
      const rawItem = getArticleRawById(key) || null;
      const viewItem = (strictOnly ? getStrictLocalizedArticle(key) : null)
        || getArticleView(key)
        || rawItem;

      if (!rawItem && !viewItem) return false;

      const stableMeta = getStableArticleMeta(key, rawItem, viewItem);
      return stableMeta?.categoryKey === currentCategoryKey;
    })
    .slice(0, 3);

  if (relatedKeys.length === 0) {
    relatedSection.style.display = "none";
    return;
  }

  const cards = relatedKeys
    .map((key) => {
      const rawItem = getArticleRawById(key) || null;
      const item = (strictOnly ? getStrictLocalizedArticle(key) : null)
        || getArticleView(key)
        || rawItem;
      if (!item) return "";

      const itemStable = getStableArticleMeta(key, rawItem, item);
      const itemCatLabel = getLocalizedCategory(itemStable.rawCategory || item.kategori, activeLang);
      return `
        <div class="related-card">
          <span class="lang-badge">${item.lang || "ID"}</span>
          <a href="${buildArticleHref(key, item.judul || key)}" class="related-link">
            <img src="${item.thumbnail || "assets/images/default.jpg"}" class="related-thumb" alt="${item.judul || "Artikel"}">
            <span class="category">${itemCatLabel || ""}</span>
            <h4>${item.judul || ""}</h4>
            <span class="related-read">${uiText("read_short")}</span>
          </a>
        </div>
      `;
    })
    .filter(Boolean)
    .join("");

  if (!cards) {
    relatedSection.style.display = "none";
    return;
  }

  relatedContainer.innerHTML = cards;
}

function renderRecommendedArticles(articleId) {
  const container = document.getElementById("recommended-container");
  const section = document.querySelector(".recommended-section");
  const sectionTitle = document.querySelector(".recommended-section h3");
  const activeLang = getSiteLang();
  const strictOnly = activeLang !== "id";

  if (sectionTitle) sectionTitle.textContent = `\u2728 ${uiText("recommended_articles")}`;
  if (!container || !articleId) return;

  const offlineMap = safeJsonParse("offlineArticles", {});
  const offlineCurrent = offlineMap[articleId] || null;
  const currentRaw = getArticleRawById(articleId) || offlineCurrent;
  const currentView = getArticleView(articleId) || currentRaw;
  if (!currentRaw || !currentView) {
    container.innerHTML = "";
    if (section) section.style.display = "none";
    return;
  }

  if (section) section.style.display = "";

  const currentStableMeta = getStableArticleMeta(articleId, currentRaw, currentView);
  const currentCategoryKey = currentStableMeta?.categoryKey || "";
  const currentSubcategoryKey = currentStableMeta?.subcategoryKey || "";
  const currentTag = normalize(currentView?.tag || currentRaw?.tag || "");

  const reading = safeJsonParse("readingProgress", {});
  const userCategories = {};

  Object.keys(reading).forEach((id) => {
    const meta = getStableArticleMeta(id, getArticleRawById(id), getArticleView(id));
    const catKey = meta?.categoryKey || "";
    if (!catKey) return;
    userCategories[catKey] = (userCategories[catKey] || 0) + 1;
  });

  const allKeys = getSortedGlobalArticleKeysByDate(true);

  let scored = allKeys
    .filter((id) => id !== articleId)
    .map((id) => {
      const rawArticle = getArticleRawById(id) || offlineMap[id];
      const view = strictOnly ? getStrictLocalizedArticle(id) : (getStrictLocalizedArticle(id) || getArticleView(id) || rawArticle);
      if (!rawArticle || !view) return null;

      const itemStableMeta = getStableArticleMeta(id, rawArticle, view);
      const catKey = itemStableMeta?.categoryKey || "";
      const subKey = itemStableMeta?.subcategoryKey || "";
      const tag = normalize(view.tag || rawArticle.tag || "");

      let score = 0;
      if (catKey && catKey === currentCategoryKey) score += 3;
      if (subKey && subKey === currentSubcategoryKey) score += 2;
      if (tag && tag === currentTag) score += 2;
      if (userCategories[catKey]) score += userCategories[catKey] * 2;
      if (isFlagEnabled(rawArticle.popular)) score += 2;
      if (isFlagEnabled(rawArticle.featured)) score += 1;

      return { id, rawArticle, view, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (scored.length === 0) {
    scored = allKeys
      .filter((id) => id !== articleId)
      .slice(0, 3)
      .map((id) => {
        const rawArticle = getArticleRawById(id) || offlineMap[id];
        const view = strictOnly ? getStrictLocalizedArticle(id) : (getStrictLocalizedArticle(id) || getArticleView(id) || rawArticle);
        if (!rawArticle || !view) return null;
        return { id, rawArticle, view, score: 0 };
      })
      .filter(Boolean);
  }

  if (!scored.length) {
    container.innerHTML = "";
    if (section) section.style.display = "none";
    return;
  }

  container.innerHTML = scored
    .map((item) => {
      const recStable = getStableArticleMeta(item.id, item.rawArticle, item.view);
      const recCatLabel = getLocalizedCategory(recStable.rawCategory || item.view.kategori, activeLang);
      return `
      <a href="${buildArticleHref(item.id, item.view.judul || item.id)}" class="recommended-card">
        <span class="rec-cat">${recCatLabel || ""}</span>
        <h4>${item.view.judul || ""}</h4>
        <p>${formatArticleDate(item.view || item.rawArticle, activeLang)}</p>
      </a>
    `;
    })
    .join("");
}

function buildArticleToc() {
  const tocList = document.getElementById("toc-list");
  const contentEl = document.getElementById("isi-artikel");
  const tocBox = document.getElementById("toc");
  const tocToggleBtn = document.getElementById("tocToggle");

  if (!tocList || !contentEl || !tocBox) return;

  tocList.innerHTML = "";
  const headings = Array.from(contentEl.querySelectorAll("h2, h3, h4"));

  if (!headings.length) {
    setTocOpenState(false);
    tocBox.style.display = "none";
    if (tocToggleBtn) tocToggleBtn.style.display = "none";
    return;
  }

  tocBox.style.display = "";
  if (tocToggleBtn) tocToggleBtn.style.display = "inline-flex";
  bindArticleTocShell();

  const usedIds = new Set();
  const ensureUniqueId = (baseId, index) => {
    let candidate = (baseId || "").trim();
    if (!candidate) candidate = `section-${index + 1}`;

    if (!usedIds.has(candidate)) {
      usedIds.add(candidate);
      return candidate;
    }

    let suffix = 2;
    while (usedIds.has(`${candidate}-${suffix}`)) {
      suffix += 1;
    }

    const unique = `${candidate}-${suffix}`;
    usedIds.add(unique);
    return unique;
  };

  const linkById = new Map();

  headings.forEach((heading, index) => {
    const textSlug = slugify(heading.textContent || "");
    const safeId = ensureUniqueId(heading.id || textSlug, index);

    heading.id = safeId;
    heading.style.scrollMarginTop = `${getArticleScrollOffset() + 24}px`;

    const li = document.createElement("li");
    li.className = heading.tagName.toLowerCase();

    const a = document.createElement("a");
    a.href = `#${safeId}`;
    a.textContent = heading.textContent || "";

    li.appendChild(a);
    tocList.appendChild(li);
    linkById.set(safeId, a);
  });

  let lastActiveId = "";

  const activateTocLink = () => {
    const offset = getArticleScrollOffset() + 8;
    let activeHeading = headings[0];

    headings.forEach((heading) => {
      if (heading.getBoundingClientRect().top - offset <= 0) {
        activeHeading = heading;
      }
    });

    const nextActiveId = activeHeading?.id || "";
    if (!nextActiveId || nextActiveId === lastActiveId) return;

    lastActiveId = nextActiveId;

    tocList.querySelectorAll("a").forEach((link) => {
      link.classList.remove("active");
    });

    const activeLink = linkById.get(nextActiveId);
    if (activeLink) {
      activeLink.classList.add("active");
    }
  };

  if (window.__tocClickHandler) {
    tocList.removeEventListener("click", window.__tocClickHandler);
  }

  window.__tocClickHandler = (event) => {
    const targetLink = event.target?.closest?.("a[href^='#']");
    if (!targetLink || !tocList.contains(targetLink)) return;

    event.preventDefault();

    const id = targetLink.getAttribute("href")?.slice(1);
    const heading = id ? document.getElementById(id) : null;
    if (!heading) return;

    heading.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, "", `#${id}`);
    }

    setTocOpenState(false);
  };

  tocList.addEventListener("click", window.__tocClickHandler);

  const onScroll = () => {
    if (window.__tocScrollTicking) return;
    window.__tocScrollTicking = true;

    requestAnimationFrame(() => {
      window.__tocScrollTicking = false;
      activateTocLink();
    });
  };

  if (window.__tocScrollHandler) {
    window.removeEventListener("scroll", window.__tocScrollHandler);
  }

  window.__tocScrollHandler = onScroll;
  window.addEventListener("scroll", window.__tocScrollHandler, { passive: true });

  if (window.__tocResizeHandler) {
    window.removeEventListener("resize", window.__tocResizeHandler);
  }

  window.__tocResizeHandler = () => {
    activateTocLink();
  };

  window.addEventListener("resize", window.__tocResizeHandler, { passive: true });

  activateTocLink();
}

function setTocOpenState(isOpen) {
  const toc = document.getElementById("toc");
  const tocToggle = document.getElementById("tocToggle");

  if (!toc || !tocToggle) return;

  toc.classList.toggle("active", isOpen);
  tocToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  setReaderButtonState?.(tocToggle, isOpen);
}

function bindArticleTocShell() {
  const toc = document.getElementById("toc");
  const tocToggle = document.getElementById("tocToggle");

  if (!toc || !tocToggle) return;

  if (window.__tocToggleHandler) {
    tocToggle.removeEventListener("click", window.__tocToggleHandler);
  }

  window.__tocToggleHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setTocOpenState(!toc.classList.contains("active"));
  };

  tocToggle.addEventListener("click", window.__tocToggleHandler);

  if (window.__tocDocumentClickHandler) {
    document.removeEventListener("click", window.__tocDocumentClickHandler);
  }

  window.__tocDocumentClickHandler = (event) => {
    const target = event.target;
    if (!toc.contains(target) && !tocToggle.contains(target)) {
      setTocOpenState(false);
    }
  };

  document.addEventListener("click", window.__tocDocumentClickHandler);
}

function getArticleScrollOffset() {
  const navbar = document.querySelector(".navbar");
  return (navbar?.offsetHeight || 84) + 12;
}
onDomReady(() => {
  initDomTextRepair();

 // ===============================
// QUICK MENU NAVIGATION
// ===============================
const quickLinks = document.querySelectorAll(".quick-card");

quickLinks.forEach(link => {
  link.addEventListener("click", e => {

    const targetId = link.getAttribute("href");

    // kalau link normal (about.html dll) biarkan jalan
    if (!targetId || !targetId.startsWith("#")) return;

    e.preventDefault();

    const target = document.querySelector(targetId);
    if (!target) return;

    const offset =
      document.querySelector(".navbar")?.offsetHeight || 0;

    const y =
      target.getBoundingClientRect().top +
      window.pageYOffset -
      offset -
      12;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });

    // AUTO OPEN DONASI
    if (targetId === "#donasi") {
      const donateContent = document.getElementById("donate-content");

      if (donateContent && donateContent.style.display !== "block") {
        donateContent.style.display = "block";
      }
    }
  });
});

// ===============================
// ACTIVE STATE ON SCROLL
// ===============================
const sections = document.querySelectorAll("section[id]");
const quickCards = document.querySelectorAll(".quick-card");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  quickCards.forEach(card => {
    card.classList.remove("active");
    if (card.getAttribute("href") === `#${current}`) {
      card.classList.add("active");
    }
  });
});


 /* =====================
   DARK MODE TOGGLE
===================== */
 const themeBtn = document.getElementById("themeToggle");

if (themeBtn) {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }

  setThemeToggleIcon(themeBtn);

  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");
    setThemeToggleIcon(themeBtn);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

  /* =====================
     SIDEBAR TOGGLE
  ===================== */
  const menuBtn = document.getElementById("menuBtn");
  sidebar = document.getElementById("sidebar");
  overlay = document.getElementById("overlay");

  if (menuBtn && sidebar && overlay) {
    menuBtn.addEventListener("click", () => {
      sidebar.classList.add("active");
      overlay.classList.add("active");
    });

    overlay.addEventListener("click", () => {
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
    });
  }

(function sidebarAutoDetect() {
  if (typeof articleStore === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const articleId = params.get("id");
  const article = articleId ? (getArticleRawById(articleId) || articleStore[articleId] || getArticleView(articleId)) : null;
  if (!articleId || !article) return;

  const stableMeta = getStableArticleMeta(articleId, article, article);
  const sub = stableMeta.subcategoryKey || stableMeta.categoryKey;
  const cat = stableMeta.categoryKey;


  // ===== AKTIFKAN LINK SUBMENU =====
  const activeLink = document.querySelector(
    `.submenu a[data-filter="${sub}"]`
  );

  if (activeLink) {
    activeLink.classList.add("active");

    const parent = activeLink.closest(".has-children");
    if (parent) {
      parent.classList.add("active");

      // auto scroll sidebar
      setTimeout(() => {
        parent.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }, 150);
    }
  }

  // ===== FALLBACK (KALAU GA ADA SUBKATEGORI) =====
  if (!activeLink) {
    const main = document.querySelector(
      `.sidebar-toggle + .submenu a[data-filter="${cat}"]`
    );
    if (main) {
      main.classList.add("active");
      const parent = main.closest(".has-children");
      parent?.classList.add("active");
    }
  }
})();

});


function applyArticleFilter(filter, triggerElement = null) {
  activeFilter = String(filter || "all")
    .trim()
    .toLowerCase();

  const activeFilterSlug = normalizeSlugKey(activeFilter);
  const activeFilterCompact = activeFilterSlug.replace(/\-/g, "");

  document
    .querySelectorAll(".sidebar-link, .submenu a, .category-card")
    .forEach((el) => el.classList.remove("active"));

  if (triggerElement) {
    triggerElement.classList.add("active");
    const parent = triggerElement.closest(".has-children");
    if (parent) parent.classList.add("active");
  }

  let shownCount = 0;

  cards.forEach((card) => {
    const category = card.dataset.category;
    const subcategory = card.dataset.subcategory;
    const tag = card.dataset.tag;
    const isFeatured = card.dataset.featured === "true";
    const isPopular = card.dataset.popular === "true";

    const categoryCompact = (category || "").replace(/\-/g, "");
    const subcategoryCompact = (subcategory || "").replace(/\-/g, "");
    const tagCompact = (tag || "").replace(/\-/g, "");

    let show = false;

    if (activeFilter === "all") {
      if (!isFeatured && !isPopular && shownCount < 3) {
        show = true;
        shownCount++;
      }
    } else if (
      category === activeFilter ||
      subcategory === activeFilter ||
      tag === activeFilter
    ) {
      show = true;
    } else if (
      categoryCompact === activeFilterCompact ||
      subcategoryCompact === activeFilterCompact ||
      tagCompact === activeFilterCompact
    ) {
      show = true;
    }

    card.style.display = show ? "block" : "none";
  });

  if (featuredSection) {
    featuredSection.style.display =
      activeFilter === "all" && hasHomeFeaturedArticles() ? "block" : "none";
  }

  if (triggerElement && sidebar && overlay && sidebar.classList.contains("active")) {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  }
}

// TOGGLE SUBMENU
document.querySelectorAll(".sidebar-toggle").forEach(btn => {
  btn.addEventListener("click", () => {
    const parent = btn.closest(".has-children");
    const filterKey = btn.querySelector(".badge")?.dataset?.count
      || btn.dataset?.filter
      || parent?.querySelector(":scope > .sidebar-link")?.dataset?.filter
      || null;

    document.querySelectorAll(".has-children").forEach(item => {
      if (item !== parent) item.classList.remove("active");
    });

    if (!parent) return;
    parent.classList.toggle("active");

    // auto scroll ke item
    parent.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    const cardList = Array.isArray(cards) ? cards : Array.from(cards || []);
    if (filterKey && cardList.some((card) =>
      card?.dataset?.category === filterKey ||
      card?.dataset?.subcategory === filterKey ||
      card?.dataset?.tag === filterKey
    )) {
      applyArticleFilter(filterKey, null);
    }
  });
});



/* =====================
   SEARCH ARTIKEL (ENHANCED)
===================== */
var articleSearchInput = document.getElementById("searchInput");
var emptyState = document.getElementById("empty-state");

function runSearch() {
  const keyword = (articleSearchInput && articleSearchInput.value || "").toLowerCase().trim();
  let visibleCount = 0;

  cards.forEach(card => {
    const title = card.querySelector("h3")?.innerText.toLowerCase() || "";
    const match = title.includes(keyword);

    card.style.display = match ? "block" : "none";
    if (match) visibleCount++;
  });

  // empty state
  if (emptyState) {
    emptyState.style.display = visibleCount === 0 ? "block" : "none";
  }

  return visibleCount;
}

if (articleSearchInput) {
  if (articleSearchInput.dataset.searchBound !== "1") {
    articleSearchInput.dataset.searchBound = "1";

    // realtime search
    articleSearchInput.addEventListener("input", () => {
      runSearch();
    });

    // tekan ENTER
    articleSearchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();

        const resultCount = runSearch();

        if (resultCount > 0) {
          // scroll ke hasil
          document
            .getElementById("articles-container")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          // scroll ke not found
          emptyState?.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        }
      }
    });
  }
}


  /* =====================
   AUTO-GENERATE HOME ARTICLES (FINAL AMAN)
===================== */

function waitForHomeStoreAndRender(attemptsLeft = 60) {
  const articlesContainer = document.getElementById("articles-container");
  if (!articlesContainer) {
    if ((attemptsLeft || 0) <= 0) return;
    window.setTimeout(() => waitForHomeStoreAndRender((attemptsLeft || 0) - 1), 60);
    return;
  }

  if (!articleStore || typeof articleStore !== "object" || Object.keys(articleStore).length === 0) {
    refreshArticleStore();
  }

  if (!articleStore || typeof articleStore !== "object" || Object.keys(articleStore).length === 0) {
    if ((attemptsLeft || 0) <= 0) return;
    window.setTimeout(() => waitForHomeStoreAndRender((attemptsLeft || 0) - 1), 60);
    return;
  }

  articlesContainer.style.visibility = "hidden";
  articlesContainer.innerHTML = ""; // hapus skeleton SAJA SEKALI

  //  urutkan artikel (terbaru dulu)
  const articleKeys = getSortedArticleKeysByDate();
  const displayKeys = articleKeys.length ? articleKeys : getSortedGlobalArticleKeysByDate();

  function createCards(articles) {
    articles.forEach((id) => {
      const article = articleStore[id] || getArticleRawById(id);
      const articleRaw = getArticleRawById(id) || article;
      const articleView = getArticleView(id);
      if (!article || !articleView || !articleRaw) return;
      const stableMeta = getStableArticleMeta(id, articleRaw, articleView);

      const card = document.createElement("article");
      card.className = "card";

      card.dataset.category = stableMeta.categoryKey;
      if (stableMeta.subcategoryKey) {
        card.dataset.subcategory = stableMeta.subcategoryKey;
      }
      if (stableMeta.tagKey) {
        card.dataset.tag = stableMeta.tagKey;
      }

      const isFeaturedArticle = isFlagEnabled(articleRaw.featured);
      const isPopularArticle = isFlagEnabled(articleRaw.popular);

      if (isFeaturedArticle) {
        card.dataset.featured = "true";
        card.classList.add("is-featured");
        card.classList.add("show-featured");
      }

      if (isPopularArticle) {
        card.dataset.popular = "true";
        card.classList.add("is-popular");
      }

    const daysOld =
      (new Date() - new Date(articleRaw.createdAt || article.createdAt)) / (1000 * 60 * 60 * 24);
    const isNew = daysOld <= 7;

    const langBadge = document.createElement("span");
    langBadge.className = `lang-badge flag-${articleView.locale || articleView.bahasa || "id"}`;

    const img = document.createElement("img");
    img.className = "thumb";
    img.src = articleView.thumbnail || articleRaw.thumbnail || article.thumbnail || "assets/images/default.jpg";
    img.alt = articleView.judul || "";

    const categoryTop = document.createElement("div");
    categoryTop.className = "card-top";

    const categorySpan = document.createElement("span");
    categorySpan.className = "category";
    categorySpan.textContent = getLocalizedCategory(
      stableMeta.rawCategory || articleRaw.kategori || articleView.kategori,
      getSiteLang()
    );

    const bookmarkBtn = document.createElement("button");
    bookmarkBtn.className = "card-bookmark";
    bookmarkBtn.dataset.id = id;
    bookmarkBtn.innerHTML = "&#9734;";

    try {
      const saved = JSON.parse(localStorage.getItem("bookmarks")) || [];
      setCardBookmarkState(bookmarkBtn, Array.isArray(saved) && saved.includes(id));
    } catch {
      setCardBookmarkState(bookmarkBtn, false);
    }

    categoryTop.appendChild(categorySpan);
    categoryTop.appendChild(bookmarkBtn);

    const titleEl = document.createElement("h3");
    const titleText = articleView.judul || "";
    titleEl.textContent = titleText.length > 40 ? titleText.slice(0, 40) + "..." : titleText;

    const previewEl = document.createElement("p");
    previewEl.textContent = `${getPreviewText(articleView).slice(0, 85)}...`;

    const readMore = document.createElement("a");
    readMore.className = "read-more";
    readMore.href = buildArticleHref(id, titleText);
    readMore.textContent = uiText("read_more");

    const tanggal = formatArticleDate(articleRaw, getSiteLang(), true);
    const dateEl = document.createElement("span");
    dateEl.className = "card-date";
    dateEl.textContent = tanggal;

    card.appendChild(langBadge);
    card.appendChild(img);
    if (isPopularArticle) {
      const popularBadge = document.createElement("span");
      popularBadge.className = "badge-popular";
      popularBadge.textContent = uiText("popular_badge");
      card.appendChild(popularBadge);
    }
    if (isFeaturedArticle) {
      const featuredBadge = document.createElement("span");
      featuredBadge.className = "badge-featured";
      featuredBadge.textContent = uiText("featured_badge");
      card.appendChild(featuredBadge);
    }
    if (isNew) {
      const newBadge = document.createElement("span");
      newBadge.className = "badge-new";
      newBadge.textContent = uiText("new_badge");
      card.appendChild(newBadge);
    }
    card.appendChild(categoryTop);
    card.appendChild(titleEl);
    card.appendChild(previewEl);
    const footer = document.createElement("div");
    footer.className = "card-footer";
    footer.appendChild(readMore);
    footer.appendChild(dateEl);
    card.appendChild(footer);

    articlesContainer.appendChild(card);
    });
  }

function bindCardBookmarkClicks() {
  const container = document.getElementById("articles-container") || document;
  if (!container || container.dataset.bookmarkBound) return;
  container.dataset.bookmarkBound = "1";

  container.addEventListener("click", (event) => {
    const target = event.target;
    const origin =
      target && target instanceof Element
        ? target
        : target && target.parentElement
          ? target.parentElement
          : null;
    const btn = origin ? origin.closest(".card-bookmark") : null;
    if (!btn) return;

    event.preventDefault();
    event.stopPropagation();

    const id = btn.dataset.id;
    if (!id) return;

    let savedNow = [];
    try {
      savedNow = JSON.parse(localStorage.getItem("bookmarks")) || [];
    } catch {
      savedNow = [];
    }

    savedNow = Array.isArray(savedNow) ? [...new Set(savedNow)] : [];
    const wasSaved = savedNow.includes(id);
    const nextSaved = wasSaved ? savedNow.filter((item) => item !== id) : [...savedNow, id];

    localStorage.setItem("bookmarks", JSON.stringify(nextSaved));
    if (!wasSaved) {
      try {
        upsertBookmarkArticleMeta(id);
      } catch {}
    } else {
      try {
        removeBookmarkArticleMeta(id);
      } catch {}
    }
    setCardBookmarkState(btn, !wasSaved);
    updateBookmarkBadge();
    try {
      window.dispatchEvent(new Event("bookmarks-updated"));
    } catch {}

    try {
      showToast(uiText(!wasSaved ? "bookmark_added" : "bookmark_removed"));
    } catch {}
  }, true);

}

  createCards(displayKeys);
  cards = document.querySelectorAll(".card");
  bindCardBookmarkClicks();
  finalizeHomeArticleSections();
  articlesContainer.style.visibility = "";
}

function hasHomeFeaturedArticles() {
  if (!isHomePage || typeof articleStore === "undefined") return false;
  return getSortedGlobalArticleKeysByDate().length > 0;
}

function applyHomeLatestArticlesLayout() {
  if (!isHomePage) return;

  cards = document.querySelectorAll("#articles-container .card");

  let shown = 0;
  cards.forEach((card) => {
    const isFeatured = card.dataset.featured === "true";
    const isPopular = card.dataset.popular === "true";

    if (!isFeatured && !isPopular && shown < 3) {
      card.style.display = "block";
      shown++;
    } else {
      card.style.display = "none";
    }
  });
}

function renderHomePopularArticles() {
  if (!isHomePage || typeof articleStore === "undefined") return;

  const popularContainer = document.getElementById("popular-container");
  if (!popularContainer) return;

  popularContainer.innerHTML = "";
  const popularSection = popularContainer.closest(".popular-section");
  const popularKeys = getSortedGlobalArticleKeysByDate();
  const sourceKeys = popularKeys.filter((id) => {
    const raw = getArticleRawById(id) || articleStore[id];
    return isFlagEnabled(raw?.popular);
  }).slice(0, 3);

  if (sourceKeys.length === 0) {
    if (popularSection) popularSection.style.display = "none";
    return;
  }

  if (popularSection) popularSection.style.display = "";

  sourceKeys.forEach((id) => {
    const article = getArticleRawById(id) || articleStore[id];
    const articleView = getArticleView(id) || article;
    const stableMeta = getStableArticleMeta(id, article, articleView);

    if (!article || !articleView || !isFlagEnabled(article.popular)) return;

    const card = document.createElement("article");
    card.className = "card";
    card.classList.add("is-popular");

    const langBadge = document.createElement("span");
    langBadge.className = `lang-badge flag-${articleView.locale || articleView.bahasa || "id"}`;

    const img = document.createElement("img");
    img.className = "thumb";
    img.src = articleView.thumbnail || article.thumbnail || "assets/images/default.jpg";
    img.alt = articleView.judul || "";

    const categoryTop = document.createElement("div");
    categoryTop.className = "card-top";

    const categorySpan = document.createElement("span");
    categorySpan.className = "category";
    categorySpan.textContent = getLocalizedCategory(
      stableMeta.rawCategory || article.kategori || articleView.kategori,
      getSiteLang()
    );

    categoryTop.appendChild(categorySpan);

    const titleEl = document.createElement("h3");
    const titleText = articleView.judul || "";
    titleEl.textContent = titleText.length > 40 ? titleText.slice(0, 40) + "..." : titleText;

    const previewEl = document.createElement("p");
    previewEl.textContent = `${getPreviewText(articleView).slice(0, 85)}...`;

    const readMore = document.createElement("a");
    readMore.className = "read-more";
    readMore.href = buildArticleHref(id, titleText);
    readMore.textContent = uiText("read_more");

    const tanggal = formatArticleDate(article, getSiteLang(), true);
    const dateEl = document.createElement("span");
    dateEl.className = "card-date";
    dateEl.textContent = tanggal;

    const footer = document.createElement("div");
    footer.className = "card-footer";
    footer.appendChild(readMore);
    footer.appendChild(dateEl);

    card.appendChild(langBadge);
    card.appendChild(img);
    if (getSiteLang() !== "ar") {
      const popularBadge = document.createElement("span");
      popularBadge.className = "badge-popular";
      popularBadge.textContent = uiText("popular_badge");
      card.appendChild(popularBadge);
    }
    card.appendChild(categoryTop);
    card.appendChild(titleEl);
    card.appendChild(previewEl);
    card.appendChild(footer);

    popularContainer.appendChild(card);
  });
}

function renderHomeFeaturedArticles() {
  if (!isHomePage || typeof articleStore === "undefined") return;

  const featuredSection = document.getElementById("featured-article");
  try {
    const existing = document.getElementById("featured-link");
    if (existing && !existing.getAttribute("data-featured-label")) {
      existing.setAttribute("data-featured-label", uiText("featured_articles"));
    }
  } catch {}
  const heroFeaturedTitle = document.getElementById("hero-featured-title");
  const heroSubtitle = document.getElementById("hero-subtitle");
  const articleKeys = getSortedGlobalArticleKeysByDate(false);

  if (window.__portalHomeFeaturedTimer) {
    clearInterval(window.__portalHomeFeaturedTimer);
    window.__portalHomeFeaturedTimer = null;
  }

  if (!featuredSection || articleKeys.length === 0) {
    return;
  }

  const featuredKeys = articleKeys.filter((key) => {
    const raw = getArticleRawById(key) || getOfflineArticleById(key) || articleStore[key];
    return isFlagEnabled(raw?.featured);
  });
  const rotationKeys = (featuredKeys.length ? featuredKeys : articleKeys).slice(0, 6);

  if (!rotationKeys.length) {
    featuredSection.style.display = "none";
    if (heroFeaturedTitle) heroFeaturedTitle.textContent = "";
    if (heroSubtitle) heroSubtitle.textContent = "";
    return;
  }

  let currentFeaturedIndex = 0;

  function renderFeatured(index) {
    const id = rotationKeys[index % rotationKeys.length];
    const data = getArticleView(id) || getOfflineArticleById(id) || articleStore[id];
    if (!data) return;

    const preview = getPreviewText(data);
    featuredSection.innerHTML = "";

    const link = document.createElement("a");
    link.href = buildArticleHref(id, data.judul || id);
    link.className = "featured-card";
    try {
      link.setAttribute("data-featured-label", uiText("featured_articles"));
    } catch {}

    const img = document.createElement("img");
    img.className = "featured-thumb";
    img.src = data.thumbnail || "assets/images/default.jpg";
    img.alt = data.judul || "";

    const content = document.createElement("div");
    content.className = "featured-content";

    const featuredBadge = document.createElement("span");
    featuredBadge.className = "featured-inline-badge";
    featuredBadge.textContent = uiText("featured_articles");

    const category = document.createElement("span");
    category.className = "category";
    category.textContent = getLocalizedCategory(data.kategori || "", getSiteLang());

    const title = document.createElement("h2");
    title.textContent = data.judul || "";

    const desc = document.createElement("p");
    desc.textContent = `${preview.slice(0, 160)}...`;

    content.appendChild(featuredBadge);
    content.appendChild(category);
    content.appendChild(title);
    content.appendChild(desc);

    link.appendChild(img);
    link.appendChild(content);

    featuredSection.appendChild(link);
    featuredSection.style.display = "block";

    if (heroFeaturedTitle) {
      heroFeaturedTitle.textContent = data.judul || "";
      heroFeaturedTitle.href = buildArticleHref(id, data.judul || id);
    }

    if (heroSubtitle) {
      heroSubtitle.textContent = preview ? `${preview.slice(0, 120)}...` : "";
    }
  }

  function startAutoRotate() {
    if (rotationKeys.length <= 1) return;
    if (window.__portalHomeFeaturedTimer) {
      clearInterval(window.__portalHomeFeaturedTimer);
    }

    window.__portalHomeFeaturedTimer = window.setInterval(() => {
      currentFeaturedIndex = (currentFeaturedIndex + 1) % rotationKeys.length;
      renderFeatured(currentFeaturedIndex);
    }, 6000);
  }

  function stopAutoRotate() {
    if (window.__portalHomeFeaturedTimer) {
      clearInterval(window.__portalHomeFeaturedTimer);
      window.__portalHomeFeaturedTimer = null;
    }
  }

  renderFeatured(currentFeaturedIndex);
  startAutoRotate();
  featuredSection.onmouseenter = stopAutoRotate;
  featuredSection.onmouseleave = startAutoRotate;
}

function finalizeHomeArticleSections() {
  if (!isHomePage) return;

  applyHomeLatestArticlesLayout();
  renderHomePopularArticles();
  renderHomeFeaturedArticles();
  updateSidebarBadges();

  try {
    renderHomeCategoryGrid();
  } catch {}

  const urlFilter = new URLSearchParams(window.location.search).get("filter");
  if (urlFilter) {
    const sidebarLink = document.querySelector(`[data-filter="${urlFilter}"]`);
    sidebarLink?.click();
  }
}

waitForHomeStoreAndRender();

  // =====================
// CATEGORY ICON MAP
// =====================
const icons = {
  "Ilmu Syariah": "\u2696\uFE0F",
  "Hadis": "\uD83D\uDCDC",
  "Ibadah": "\uD83D\uDD4B",
  "Quran": "\uD83D\uDCD6",
  "Tasawuf": "\u2728",
  "Pemikiran": "\uD83D\uDCA1",
  "Politik": "\uD83C\uDFDB\uFE0F",
  "Ramadhan": "\uD83C\uDF19",
  "Keilmuan": "\uD83C\uDF93",
  "Kontemporer": "\uD83C\uDF0D",
  "Kalam": "\uD83D\uDDE3\uFE0F",
  "Sirah": "\uD83D\uDD4A\uFE0F",
  "Psikologi": "\uD83E\uDDE0"
};

const categoryIconAliases = {
  "semua artikel": "📚",
  "all articles": "📚",
  "جميع المقالات": "📚",
  "ilmu syariah": icons["Ilmu Syariah"],
  "sharia studies": icons["Ilmu Syariah"],
  "الدراسات الشرعية": icons["Ilmu Syariah"],
  "keilmuan": icons["Keilmuan"],
  "tradisi keilmuan islam": icons["Keilmuan"],
  "islamic scholarship": icons["Keilmuan"],
  "التراث العلمي الإسلامي": icons["Keilmuan"],
  "hadis": icons["Hadis"],
  "hadith": icons["Hadis"],
  "الحديث": icons["Hadis"],
  "ibadah": icons["Ibadah"],
  "fiqh ibadah": icons["Ibadah"],
  "pemikiran islam": icons["Pemikiran"],
  "worship": icons["Ibadah"],
  "العبادة": icons["Ibadah"],
  "quran": icons["Quran"],
  "alquran": icons["Quran"],
  "al-quran": icons["Quran"],
  "al-quran & tafsir": icons["Quran"],
  "qur'an & tafsir": icons["Quran"],
  "al-qur'an & tafsir": icons["Quran"],
  "القرآن والتفسير": icons["Quran"],
  "tasawuf": icons["Tasawuf"],
  "sufism": icons["Tasawuf"],
  "التصوف": icons["Tasawuf"],
  "pemikiran": icons["Pemikiran"],
  "thought": icons["Pemikiran"],
  "fikir": icons["Pemikiran"],
  "islamic thought": icons["Pemikiran"],
  "الفكر الإسلامي": icons["Pemikiran"],
  "politik": icons["Politik"],
  "politics": icons["Politik"],
  "islam & state": icons["Politik"],
  "الإسلام والدولة": icons["Politik"],
  "ramadhan": icons["Ramadhan"],
  "ramadan": icons["Ramadhan"],
  "ramadan at al-azhar": icons["Ramadhan"],
  "رمضان في الأزهر": icons["Ramadhan"],
  "kontemporer": icons["Kontemporer"],
  "islam & modern challenges": icons["Kontemporer"],
  "الإسلام وتحديات العصر": icons["Kontemporer"],
  "fiqh": "📘",
  "الفقه": "📘",
  "ushul fiqh": "🧠",
  "usul fiqh": "🧠",
  "أصول الفقه": "🧠",
  "pendidikan & bahasa arab": "🧑‍🏫",
  "education & arabic": "🧑‍🏫",
  "التربية واللغة العربية": "🧑‍🏫",
  "ilmu kalam": "🧭",
  "kalam": "🧭",
  "علم الكلام": "🧭",
  "sirah nabawiyah": "🕊️",
  "prophetic biography": "🕊️",
  "السيرة النبوية": "🕊️",
  "psikologi": "🧠",
  "psychology": "🧠",
  "علم النفس": "🧠",
};

function getCategoryIcon(name = "") {
  const canonicalKey = getCanonicalCategoryKey(name);
  if (canonicalKey && categoryMeta[canonicalKey]?.icon) {
    return categoryMeta[canonicalKey].icon;
  }

  const repaired = repairMojibakeString(String(name)).trim();
  const key = repaired.toLowerCase();
  return categoryIconAliases[key] || icons[repaired] || icons[name] || icons["Ilmu Syariah"];
}
window.getCategoryIcon = getCategoryIcon;

  // =====================
// CATEGORY GRID (HOME)
// =====================
const categoryGrid = document.getElementById("category-grid");

function repairCategoryCards(root = document) {
  try {
    if (!root || typeof root.querySelectorAll !== "function") return;

    root.querySelectorAll("a.category-card[data-filter]").forEach((card) => {
      try {
        const filter = card?.dataset?.filter;
        if (!filter) return;

        const hasImg = !!card.querySelector("img");
        const hasContent = !!card.querySelector(".cat-content");
        if (hasImg && hasContent) return;

        const stored = window.__portalHomeCategories || {};
        const data = stored[filter] && typeof stored[filter] === "object"
          ? stored[filter]
          : { count: 0, thumb: (typeof getCategoryThumb === "function" ? getCategoryThumb(filter) : "/assets/images/default.jpg"), label: filter };

        while (card.firstChild) card.removeChild(card.firstChild);

        const img = document.createElement("img");
        const rawThumb = typeof data.thumb === "string" ? data.thumb.trim() : "";
        const pickThumb = () => {
          if (filter === "politik") return "/assets/images/politik.jpg?v=20260317e";
          const candidate = rawThumb
            || (typeof getCategoryThumb === "function" ? getCategoryThumb(filter) : "")
            || "/assets/images/default.jpg";
          if (candidate.startsWith("http://") || candidate.startsWith("https://") || candidate.startsWith("data:")) return candidate;
          if (candidate.startsWith("/")) return candidate;
          return "/" + candidate.replace(/^\/+/, "");
        };

        img.src = pickThumb();
        const resolvedLang = typeof getSiteLang === "function" ? getSiteLang() : "id";
        const resolvedLabel = typeof getLocalizedCategory === "function"
          ? getLocalizedCategory(filter, resolvedLang)
          : filter;
        img.alt = resolvedLabel;
        img.onerror = () => {
          img.onerror = null;
          img.src = "/assets/images/default.jpg";
        };

        const content = document.createElement("div");
        content.className = "cat-content";

        const title = document.createElement("h3");
        const icon = typeof getCategoryIcon === "function" ? getCategoryIcon(filter) : "";
        title.textContent = `${icon} ${resolvedLabel}`.trim();

        const meta = document.createElement("span");
        meta.textContent = typeof getArticleCountLabel === "function"
          ? getArticleCountLabel(Number(data.count) || 0, resolvedLang)
          : String(Number(data.count) || 0);

        content.appendChild(title);
        content.appendChild(meta);

        card.appendChild(img);
        card.appendChild(content);
      } catch {}
    });
  } catch {}
}

function renderHomeCategoryGrid() {
  if (!isHomePage || !categoryGrid) return;
  if (typeof window.__PORTAL_ARTICLE_STORE__ === "undefined") return;

  const categories = {};

  getAllArticleKeys(false).forEach((id) => {
    const articleView = getArticleView(id);
    const articleRaw = getArticleRawById(id);
    const article = articleView || articleRaw;
    if (!article) return;

    const stableMeta = getStableArticleMeta(id, articleRaw, articleView);
    const cat = stableMeta.rawCategory || articleRaw?.kategori || article.kategori || "";
    const subCat = stableMeta.rawSubcategory || articleRaw?.subkategori || article.subkategori || "";
    const key = stableMeta.categoryKey
      || getCanonicalCategoryKey(cat)
      || getCanonicalCategoryKey(subCat)
      || normalize(cat)
      || normalizeCategoryLabel(cat);

    if (!key) return;

    if (!categories[key]) {
      categories[key] = {
        count: 0,
        thumb: article.thumbnail || articleRaw?.thumbnail || "",
        label: cat || key,
      };
    }

    if (!categories[key].thumb && (article.thumbnail || articleRaw?.thumbnail)) {
      categories[key].thumb = article.thumbnail || articleRaw?.thumbnail || "";
    }

    categories[key].count++;
  });

  const getCategoryThumb = (key) => {
    const fallback = "/assets/images/default.jpg";
    const map = {
      ilmusyariah: "/assets/images/fiqh.png",
      hadis: "/assets/images/hadis.jpg",
      ibadah: "/assets/images/kaaba.png",
      quran: "/assets/images/quran.png",
      tasawuf: "/assets/images/tasawuf.png",
      pemikiran: "/assets/images/pemikiran.png",
      politik: "/assets/images/politik.jpg",
      ramadhan: "/assets/images/ramadhan.png",
      keilmuan: "/assets/images/kajian.png",
      palestina: "/assets/images/palestina.png",
      fatwa: "/assets/images/dar-ifta.jpg",
      kalam: "/assets/images/ilmu%20kalam.webp",
      sirah: "/assets/images/sirah%20nabawiyah.webp",
      psikologi: "/assets/images/psikologi.webp",
      kontemporer: "/assets/images/tantanganzaman.webp"
    };
    return map[key] || fallback;
  };

  Object.keys(categoryMeta).forEach((key) => {
    if (!categories[key]) {
      categories[key] = {
        count: 0,
        thumb: getCategoryThumb(key),
        label: getLocalizedCategory(key, getSiteLang())
      };
      return;
    }

    if (!categories[key].thumb) {
      categories[key].thumb = getCategoryThumb(key);
    }
  });

  categoryGrid.innerHTML = "";
  const renderCategoryCard = (name, data) => {
    const safeData = (data && typeof data === "object")
      ? data
      : { count: 0, thumb: getCategoryThumb(name), label: name };

    const card = document.createElement("a");
    card.href = "#";
    card.dataset.filter = name;
    card.className = "category-card";

    const img = document.createElement("img");
    const rawThumb = typeof safeData.thumb === "string" ? safeData.thumb.trim() : "";
    const politikBuster = "20260317e";
    const pickThumb = () => {
      if (name === "politik") return `/assets/images/politik.jpg?v=${politikBuster}`;
      const candidate = rawThumb || getCategoryThumb(name) || "/assets/images/default.jpg";
      if (candidate.startsWith("http://") || candidate.startsWith("https://") || candidate.startsWith("data:")) {
        return candidate;
      }
      if (candidate.startsWith("/")) return candidate;
      return "/" + candidate.replace(/^\/+/, "");
    };
    img.src = pickThumb();
    img.alt = getLocalizedCategory(name, getSiteLang());
    img.onerror = () => {
      const alreadyRetried = img.dataset.retry === "1";
      if (name === "politik" && !alreadyRetried) {
        img.dataset.retry = "1";
        img.src = "/assets/images/politik.jpg";
        return;
      }
      img.onerror = null;
      img.src = "/assets/images/default.jpg";
    };

    const content = document.createElement("div");
    content.className = "cat-content";

    const title = document.createElement("h3");
    title.textContent = `${getCategoryIcon(name)} ${getLocalizedCategory(name, getSiteLang())}`;

    const meta = document.createElement("span");
    const resolvedLang = typeof getSiteLang === "function" ? getSiteLang() : "id";
    meta.textContent = typeof getArticleCountLabel === "function"
      ? getArticleCountLabel(Number(safeData.count) || 0, resolvedLang)
      : String(Number(safeData.count) || 0);

    content.appendChild(title);
    content.appendChild(meta);

    card.appendChild(img);
    card.appendChild(content);

    categoryGrid.appendChild(card);
  };

  Object.keys(categoryMeta).forEach((name) => {
    renderCategoryCard(name, categories[name]);
  });

  Object.entries(categories)
    .filter(([name]) => !categoryMeta[name])
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([name, data]) => {
      renderCategoryCard(name, data);
    });

  try {
    window.__portalHomeCategories = categories;
  } catch {}

  window.setTimeout(() => repairCategoryCards(categoryGrid), 0);
  window.setTimeout(() => repairCategoryCards(categoryGrid), 250);
}

function initHomeCategoryGridWithRetry(attemptsLeft = 80) {
  if (!isHomePage || !categoryGrid) return;

  if (typeof window.__PORTAL_ARTICLE_STORE__ === "undefined") {
    if ((attemptsLeft || 0) <= 0) return;
    window.setTimeout(() => initHomeCategoryGridWithRetry((attemptsLeft || 0) - 1), 60);
    return;
  }

  renderHomeCategoryGrid();
}

onDomReady(() => {
  initHomeCategoryGridWithRetry();
});

onDomReady(() => {
  try {
    repairCategoryCards(document);
  } catch {}

  try {
    const observer = new MutationObserver(() => {
      try {
        repairCategoryCards(document);
      } catch {}
    });

    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
    }
  } catch {}

  try {
    let ticks = 0;
    const timer = window.setInterval(() => {
      ticks += 1;
      try {
        repairCategoryCards(document);
      } catch {}
      if (ticks >= 20) window.clearInterval(timer);
    }, 300);
  } catch {}
});

// =====================
// CATEGORY CARD FILTER
// =====================
if (categoryGrid) {
  categoryGrid.addEventListener("click", (e) => {
    const target = e.target;
    const card = target && typeof target.closest === "function"
      ? target.closest(".category-card")
      : null;
    if (!card) return;

    e.preventDefault();

    const filter = card.dataset.filter;
    const searchInput = document.getElementById("searchInput");
    if (searchInput) searchInput.value = "";

    // reset main title
    const mainTitle = document.getElementById("main-title");
    if (mainTitle) mainTitle.textContent = uiText("title_default");

    applyArticleFilter(filter, card);

    document
      .getElementById("articles-container")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

updateSidebarBadges();
const params = new URLSearchParams(window.location.search);
const urlFilter = params.get("filter");

if (urlFilter) {
  const sidebarLink = document.querySelector(`[data-filter="${urlFilter}"]`);
  sidebarLink?.click();
}
function updateSidebarBadges() {
  if (typeof articleStore === "undefined") return;

  const categoryCount = {};
  const subcategoryCount = {};
  const tagCount = {};

  const sourceIds = getAllArticleKeys(false);

  sourceIds.forEach((id) => {
    const rawArticle = getArticleRawById(id);
    const viewArticle = getArticleView(id);
    const stableMeta = getStableArticleMeta(id, rawArticle, viewArticle);
    const cat = stableMeta.categoryKey;
    const sub = stableMeta.subcategoryKey || null;
    const tag = stableMeta.tagKey || null;

    const compactSub = sub ? String(sub).replace(/\-/g, "") : null;
    const compactTag = tag ? String(tag).replace(/\-/g, "") : null;

    if (cat) categoryCount[cat] = (categoryCount[cat] || 0) + 1;
    if (sub) subcategoryCount[sub] = (subcategoryCount[sub] || 0) + 1;
    if (compactSub) subcategoryCount[compactSub] = (subcategoryCount[compactSub] || 0) + 1;
    if (tag) tagCount[tag] = (tagCount[tag] || 0) + 1;
    if (compactTag) tagCount[compactTag] = (tagCount[compactTag] || 0) + 1;
  });

  const total = sourceIds.length;

  document.querySelectorAll("[data-count]").forEach(badge => {
    const key = badge.dataset.count;

    let value = 0;

    if (key === "all") {
      value = total;
    } else if (categoryCount[key] !== undefined) {
      value = categoryCount[key];
    } else if (subcategoryCount[key] !== undefined) {
      value = subcategoryCount[key];
    } else if (tagCount[key] !== undefined) {
      value = tagCount[key];
    }

    badge.textContent = value;
  });
}

  /* =====================
   FILTER KATEGORI (INDEX) - FINAL STABLE
===================== */

const featuredSection = document.getElementById("featured-article");

const filterLinks = isHomePage
  ? document.querySelectorAll("[data-filter]")
  : [];

filterLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    applyArticleFilter(link.dataset.filter, link);

    // =====================
    // SCROLL
    // =====================
    document
      .getElementById("articles-container")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});


  /* =====================
     HALAMAN ARTIKEL
  ===================== */
  if (typeof articleStore !== "undefined") {

    const params = new URLSearchParams(window.location.search);
    const articleId = params.get("id");

    const titleEl = document.getElementById("judul-artikel");
    const penulisEl = document.getElementById("penulis");
    const tanggalEl = document.getElementById("tanggal");
    const kategoriEl = document.getElementById("kategori");
    const isiEl = document.getElementById("isi-artikel");
    const notFoundEl = document.getElementById("not-found");
    const articleContent = document.querySelector(".article-content");

    const breadcrumbCategory = document.getElementById("breadcrumb-category");
    const breadcrumbTitle = document.getElementById("breadcrumb-title");

    const prevBtn = document.getElementById("prev-article");
    const nextBtn = document.getElementById("next-article");

    const articleKeys = isHomePage
      ? getSortedGlobalArticleKeysByDate(false)
      : getSortedGlobalArticleKeysByDate(true);

    const rawData = getArticleRawById(articleId);
    let data = getArticleView(articleId) || rawData;

    const canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) {
      try {
        const canonicalUrl = new URL(window.location.href);
        canonicalUrl.pathname = canonicalUrl.pathname.replace(/\.html$/, "");
        canonicalEl.setAttribute("href", canonicalUrl.toString());
      } catch {
        // ignore
      }
    }

// fallback ke offline
if (!data) {
  const offline = safeJsonParse("offlineArticles", {});
  data = offline[articleId] || null;
}

if (articleId && data) {

  let offline = safeJsonParse("offlineArticles", {});

  if (rawData && !offline[articleId]) {
    offline[articleId] = rawData;
    localStorage.setItem(
      "offlineArticles",
      JSON.stringify(offline)
    );
  }

  const thumbEl = document.getElementById("article-thumb");
  if (thumbEl && data.thumbnail) {
    thumbEl.src = data.thumbnail;
    thumbEl.alt = data.judul;
  } else if (thumbEl) {
    thumbEl.style.display = "none";
  }

  document.title = `${data.judul} | ${uiText("site_name")}`;
  const metaDesc = document.querySelector(`meta[name="description"]`);
  if (metaDesc) {
    const plainText = getPreviewText(data).slice(0, 160);
    metaDesc.setAttribute("content", plainText);
  }

  const ogTitle = document.querySelector(`meta[property="og:title"]`);
  const ogDesc = document.querySelector(`meta[property="og:description"]`);
  const ogImage = document.querySelector(`meta[property="og:image"]`);
  const ogUrl = document.querySelector(`meta[property="og:url"]`);

  if (ogTitle) ogTitle.setAttribute("content", data.judul);
  if (ogDesc) {
    const plainText = getPreviewText(data).slice(0, 160);
    ogDesc.setAttribute("content", plainText);
  }
  if (ogImage && data.thumbnail) {
    ogImage.setAttribute("content", data.thumbnail);
  }
  if (ogUrl) ogUrl.setAttribute("content", window.location.href);

  const schemaScript = document.getElementById("schema-article");
  if (schemaScript) {
    const plainText = getPreviewText(data).slice(0, 160);
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: data.judul || "",
      description: plainText,
      image: data.thumbnail
        ? [data.thumbnail]
        : ["https://islami-portal-next.vercel.app/assets/images/logo.png"],
      author: {
        "@type": "Person",
        name: "Muhammad Nurcholis"
      },
      publisher: {
        "@type": "Organization",
        name: "Portal Literasi Islam",
        logo: {
          "@type": "ImageObject",
          url: "https://islami-portal-next.vercel.app/assets/images/logo.png"
        }
      },
      datePublished: rawData?.tanggal || new Date().toISOString(),
      dateModified: rawData?.tanggal || new Date().toISOString(),
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": window.location.href
      },
      articleSection: data.kategori || "Artikel",
      inLanguage: getSiteLang()
    };
    schemaScript.textContent = JSON.stringify(schemaData);
  }

  const shareWaBtn = document.getElementById("share-wa");
  const copyLinkBtn = document.getElementById("copy-link");
  const currentUrl = window.location.href;
  const shareText = `${data.judul} - ${currentUrl}`;

  if (shareWaBtn) {
    shareWaBtn.textContent = `\u{1F4AC} ${uiText("share_whatsapp")}`;
    shareWaBtn.addEventListener("click", () => {
      const waUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
      window.open(waUrl, "_blank");
    });
  }

  if (copyLinkBtn) {
    copyLinkBtn.textContent = `\u{1F517} ${uiText("share_copy")}`;
    copyLinkBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(currentUrl).then(() => {
        copyLinkBtn.textContent = `✅ ${uiText("copy_success")}`;
        setTimeout(() => {
          copyLinkBtn.textContent = `🔗 ${uiText("share_copy")}`;
        }, 2000);
      });
    });
  }

  if (titleEl) titleEl.textContent = data.judul;

if (penulisEl) penulisEl.textContent =
  `✍️ ${uiText("author_label")}: ${localizeAuthorName(data.penulis, getSiteLang())}`;

if (tanggalEl) tanggalEl.textContent =
  `📅 ${formatArticleDate(rawData || data, getSiteLang())}`;

const articleStableMeta = getStableArticleMeta(articleId, rawData || data, data);
  const localizedCategory = getLocalizedCategory(articleStableMeta.rawCategory || data.kategori, getSiteLang());
  const localizedSubcategory = articleStableMeta.subcategoryKey
    ? getLocalizedSubcategory(articleStableMeta.subcategoryKey, articleStableMeta.categoryKey, getSiteLang())
    : "";

  if (kategoriEl) {
    kategoriEl.textContent = localizedSubcategory
      ? `${localizedCategory} › ${localizedSubcategory}`
      : (localizedCategory || data.kategori || "");
  }
  if (isiEl) isiEl.innerHTML = data.isi;
  wrapArticleReferenceSection(document.getElementById("isi-artikel"));
  formatArticleBlockquotes(document.getElementById("isi-artikel"));
  updateReadTime();
  applyArabicDirection(document.getElementById("isi-artikel"));
  applyRTL(getSiteLang());

  const breadcrumbCategoryText = localizedCategory || data.kategori || "";
  renderArticleBreadcrumb(breadcrumbCategoryText, data.judul || "");

  const index = articleKeys.indexOf(articleId);

  if (prevBtn) {
    if (index > 0) {
      const prevId = articleKeys[index - 1];
      const prevArticle = getArticleView(prevId) || getOfflineArticleById(prevId);
      if (!prevId || !prevArticle) {
        prevBtn.style.display = "none";
      } else {
        prevBtn.href = buildArticleHref(prevId, prevArticle.judul || prevId);
        prevBtn.textContent = uiText("prev_article");
      }
    } else {
      prevBtn.style.display = "none";
    }
  }

  if (nextBtn) {
    if (index < articleKeys.length - 1) {
      const nextId = articleKeys[index + 1];
      const nextArticle = getArticleView(nextId) || getOfflineArticleById(nextId);
      if (!nextId || !nextArticle) {
        nextBtn.style.display = "none";
      } else {
        nextBtn.href = buildArticleHref(nextId, nextArticle.judul || nextId);
        nextBtn.textContent = uiText("next_article");
      }
    } else {
      nextBtn.style.display = "none";
    }
  }

  renderRelatedArticles(articleId, articleKeys, rawData || data, data);
renderRecommendedArticles(articleId);
  buildArticleToc();
  initTocFloating();

} else if (articleContent && notFoundEl) {
  articleContent.style.display = "none";
  notFoundEl.style.display = "block";
}

function initTocFloating() {
  if (!isArticlePage) return;

  const toc = document.getElementById("toc");
  if (!toc) return;
  if (toc.dataset.tocFloatingBound === "true") return;

  toc.dataset.tocFloatingBound = "true";

  const wrap = document.querySelector(".toc-wrap");
  let startY = (wrap || toc).getBoundingClientRect().top + window.scrollY;

  const update = () => {
    if (!toc.classList.contains("active")) {
      toc.classList.remove("toc-float-panel");
      return;
    }

    const shouldFloat = window.scrollY > startY - 14;
    toc.classList.toggle("toc-float-panel", shouldFloat);
  };

  const onResize = () => {
    toc.classList.remove("toc-float-panel");
    startY = (wrap || toc).getBoundingClientRect().top + window.scrollY;
    update();
  };

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", onResize);
  update();
}

function formatArticleBlockquotes(container) {
  if (!container) return;

  const arabicRegex = /[\u0600-\u06FF]/;

  container.querySelectorAll("blockquote").forEach((blockquote) => {
    if (blockquote.dataset.formatted === "true") return;

    const normalized = blockquote.innerHTML
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>\s*<p>/gi, "\n\n")
      .replace(/<\/?p>/gi, "")
      .trim();

    if (!normalized || !arabicRegex.test(normalized)) return;

    const parts = normalized
      .split(/\n\s*\n/)
      .map((part) => part.trim())
      .filter(Boolean);

    const segments = (parts.length ? parts : [normalized]).map((part) => {
      const kind = arabicRegex.test(part) ? "quote-arabic" : "quote-translation";
      return `<div class="${kind}">${part}</div>`;
    });

    blockquote.innerHTML = segments.join("");
    blockquote.dataset.formatted = "true";
  });
}

function wrapArticleReferenceSection(container) {
  if (!container) return;
  if (container.querySelector(":scope > .referensi")) return;

  const headings = Array.from(container.querySelectorAll("h2, h3"));
  const targets = [
    "references",
    "referensi",
    "daftar pustaka",
    "bibliography",
    "المراجع",
    "المصادر",
  ];

  const heading = headings.find((el) => {
    const text = (el.textContent || "").trim().toLowerCase();
    return targets.some((token) => text === token || text.includes(token));
  });

  if (!heading) return;

  const wrapper = document.createElement("div");
  wrapper.className = "referensi";

  const startLevel = heading.tagName;
  const nodesToMove = [];
  let node = heading;

  while (node) {
    const next = node.nextSibling;

    if (
      node !== heading &&
      node.nodeType === Node.ELEMENT_NODE &&
      (node.tagName === startLevel || node.tagName === "H2" || node.tagName === "H3")
    ) {
      break;
    }

    nodesToMove.push(node);
    node = next;
  }

  if (!nodesToMove.length) return;

  heading.parentNode?.insertBefore(wrapper, nodesToMove[0]);
  nodesToMove.forEach((n) => wrapper.appendChild(n));
}

function applyArabicDirection(container) {
  if (!container) return;

  const arabicRegex = /[\u0600-\u06FF]/;
  const latinRegex = /[A-Za-z]/;
  const arabicWordRegex = /([\u0600-\u06FF][\u0600-\u06FF\u064B-\u065F\u0670\u06D6-\u06ED\s]*)/g;

  container.querySelectorAll("p, h1, h2, h3, h4, h5, h6, blockquote, li").forEach((el) => {
    const text = (el.textContent || "").trim();
    const hasArabic = arabicRegex.test(text);
    const hasLatin = latinRegex.test(text);

    el.classList.remove("arabic-text");
    el.removeAttribute("dir");
    el.removeAttribute("lang");

    /* full Arabic block */
    if (hasArabic && !hasLatin) {
      el.classList.add("arabic-text");
      el.setAttribute("dir", "rtl");
      el.setAttribute("lang", "ar");
      return;
    }

    /* mixed Latin + Arabic */
    if (hasArabic && hasLatin) {
      el.setAttribute("dir", "ltr");

      if (!el.dataset.arabicWrapped) {
        el.innerHTML = el.innerHTML.replace(
          arabicWordRegex,
          '<span class="ar-inline" dir="rtl" lang="ar">$1</span>'
        );
        el.dataset.arabicWrapped = "true";
      }
    }
  });
}

function syncArticleChrome() {
  if (!isArticlePage) return;

  const backBtn = document.querySelector(".back-btn");
  const breadcrumbHome = document.querySelector(".breadcrumb a");
  const tocTitle = document.querySelector("#toc h3");
  const tocToggle = document.getElementById("tocToggle");
  const translateLabel = document.getElementById("article-translate-label");
  const notFoundTitle = document.querySelector("#not-found h2");
  const notFoundBody = document.querySelector("#not-found p");
  const notFoundLink = document.querySelector("#not-found a");
  const focusModeBtn = document.getElementById("focusModeBtn");
  const offlineSaveBtn = document.getElementById("offlineSaveBtn");
  const bookmarkBtn = document.getElementById("bookmarkBtn");
  const bookmarkHint = document.querySelector(".bookmark-hint");
  const readModeBtn = document.getElementById("readModeBtn");
  const resetReaderBtn = document.getElementById("resetBtn");
  const relatedTitle = document.querySelector(".related-articles h3");
  const recommendedTitle = document.querySelector(".recommended-section h3");

  if (backBtn) backBtn.setAttribute("aria-label", uiText("back_home"));
  const pageLogo = document.querySelector(".navbar .logo");
  if (pageLogo) pageLogo.textContent = uiText("site_name");
  if (breadcrumbHome) breadcrumbHome.textContent = uiText("breadcrumb_home");
  if (tocTitle) {
  tocTitle.innerHTML = `<span class="toc-title-icon">\u{1F4D1}</span><span>${uiText("toc")}</span>`;
}

if (tocToggle) {
  tocToggle.innerHTML = `<span class="toc-toggle-icon">\u2630</span><span>${uiText("toc")}</span>`;
}
  if (translateLabel) translateLabel.innerHTML = "&#127760; " + uiText("article_translate");
  if (notFoundTitle) notFoundTitle.textContent = uiText("not_found_title");
  if (notFoundBody) notFoundBody.textContent = uiText("not_found_body");
  if (notFoundLink) notFoundLink.textContent = uiText("back_home");
  setFocusModeLabel(focusModeBtn, document.body.classList.contains("focus-mode"));
  if (offlineSaveBtn) offlineSaveBtn.textContent = `\u2B07\uFE0F ${uiText("save_offline")}`;
  if (bookmarkHint) bookmarkHint.innerHTML = uiText("bookmark_hint");
  if (readModeBtn) readModeBtn.textContent = `\u{1F4D6} ${uiText("read_mode")}`;
  if (resetReaderBtn) resetReaderBtn.textContent = `\u267B\uFE0F ${uiText("reset")}`;
  if (relatedTitle) relatedTitle.textContent = uiText("related_articles");
  if (recommendedTitle) recommendedTitle.textContent = `\u2728 ${uiText("recommended_articles")}`;

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
    if (node) node.textContent = uiText(key);
  });

  if (!bookmarkBtn) return;

  const articleId = getCurrentArticleId();

  if (!articleId) {
    bookmarkBtn.disabled = true;
    return;
  }

  let saved = [];
  try {
    const parsed = JSON.parse(localStorage.getItem("bookmarks"));
    saved = Array.isArray(parsed) ? parsed : [];
  } catch {
    saved = [];
  }

  setArticleBookmarkState(bookmarkBtn, saved.includes(articleId));

  if (bookmarkBtn.dataset.bound) return;
  bookmarkBtn.dataset.bound = "1";

  bookmarkBtn.addEventListener("click", () => {
    let savedNow = [];
    try {
      const parsed = JSON.parse(localStorage.getItem("bookmarks"));
      savedNow = Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error("Error parsing bookmarks:", e);
      savedNow = [];
    }
    savedNow = [...new Set(savedNow)];

    const wasSaved = savedNow.includes(articleId);
    savedNow = wasSaved ? savedNow.filter((id) => id !== articleId) : [...savedNow, articleId];

    localStorage.setItem("bookmarks", JSON.stringify(savedNow));
    if (!wasSaved) {
      try {
        upsertBookmarkArticleMeta(articleId);
      } catch {}
    } else {
      try {
        removeBookmarkArticleMeta(articleId);
      } catch {}
    }
    const nowSaved = savedNow.includes(articleId);
    setArticleBookmarkState(bookmarkBtn, nowSaved);
    showToast(uiText(nowSaved ? "bookmark_added" : "bookmark_removed"));
    window.updateBookmarkBadge?.();
    try {
      window.dispatchEvent(new Event("bookmarks-updated"));
    } catch {}
  });
}

window.syncArticleChrome = syncArticleChrome;

if (typeof syncArticleChrome === "function") syncArticleChrome();

function updateReadTime() {
  const readTimeEl = document.getElementById("read-time");
  const content = document.getElementById("isi-artikel");
  if (!readTimeEl || !content) return;

  const text = content.innerText || "";
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const fontSize = parseInt(window.getComputedStyle(content).fontSize, 10) || 16;

  let speed = 200;
  if (fontSize >= 20) speed = 160;
  else if (fontSize <= 15) speed = 240;

  const minutes = Math.max(1, Math.ceil(words / speed));
  readTimeEl.textContent = uiText("read_time", { minutes });
}

function updateBookmarkBadge() {
  const badges = Array.from(
    new Set([
      ...document.querySelectorAll(".bookmark-count"),
      ...document.querySelectorAll(".bookmark-badge"),
      ...document.querySelectorAll("#bookmark-count")
    ])
  );
  if (badges.length === 0) return;

  let saved = [];
  try {
    const parsed = JSON.parse(localStorage.getItem("bookmarks"));
    saved = Array.isArray(parsed) ? parsed : [];
  } catch {
    saved = [];
  }

  badges.forEach((badge) => {
    badge.textContent = String(saved.length);
    badge.style.display = saved.length > 0 ? "flex" : "none";
  });
}

window.updateBookmarkBadge = updateBookmarkBadge;

onDomReady(() => {
  updateBookmarkBadge();
  if (typeof bindCardBookmarkClicks === "function") {
    bindCardBookmarkClicks();
  }
});

window.addEventListener("storage", () => {
  updateBookmarkBadge();
});

const articleBody = document.getElementById("isi-artikel");
const fontMinusBtn = document.getElementById("fontMinus");
const fontPlusBtn = document.getElementById("fontPlus");

function getCurrentFontSize() {
  if (!articleBody) return 16;
  return parseFloat(window.getComputedStyle(articleBody).fontSize) || 16;
}

function applyArticleFontSize(size) {
  if (!articleBody) return;
  const clamped = Math.max(14, Math.min(24, size));
  articleBody.style.fontSize = `${clamped}px`;
  localStorage.setItem("articleFontSize", String(clamped));
  if (typeof updateReadTime === "function") {
    updateReadTime();
  }
}

if (articleBody) {
  const savedFont = parseFloat(localStorage.getItem("articleFontSize") || "");
  if (Number.isFinite(savedFont)) {
    applyArticleFontSize(savedFont);
  }
}

fontMinusBtn?.addEventListener("click", () => {
  applyArticleFontSize(getCurrentFontSize() - 1);
});

fontPlusBtn?.addEventListener("click", () => {
  applyArticleFontSize(getCurrentFontSize() + 1);
});

document.getElementById("fontReset")?.addEventListener("click", () => {
  const articleBody = document.getElementById("isi-artikel");
  if (!articleBody) return;

  articleBody.style.fontSize = "16px";
  localStorage.removeItem("articleFontSize");
  if (typeof updateReadTime === "function") {
    updateReadTime();
  }
});

const readModeBtn = document.getElementById("readModeBtn");
const resetBtn = document.getElementById("resetBtn");

setReaderButtonState(readModeBtn, document.body.classList.contains("read-mode"));

if (readModeBtn) {
  readModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("read-mode");
    setReaderButtonState(readModeBtn, document.body.classList.contains("read-mode"));
  });
}

if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    document.body.classList.remove("read-mode");
    document.body.classList.remove("focus-mode");
    setTocOpenState(false);
    setReaderButtonState(readModeBtn, false);
    setReaderButtonState(document.getElementById("focusModeBtn"), false);
    localStorage.removeItem("articleFontSize");
    localStorage.setItem("focusMode", "off");
    location.reload();
  });
}



// =====================
// QUOTE SELECTION (FINAL & AMAN)
// =====================

document.addEventListener("mouseup", (e) => {
  const box = document.getElementById("quoteBox");
  const quote = document.getElementById("quoteText");

  if (!box || !quote) return;

  // jangan tutup
  if (box.contains(e.target)) return;

  const text = window.getSelection().toString().trim();

  if (text.length > 20) {
    quote.textContent = `"${text}"`;
    box.style.display = "block";
  } else {
    box.style.display = "none";
  }
});

const waQuoteButton = document.getElementById("waQuote");
if (waQuoteButton) waQuoteButton.textContent = `\u{1F4AC} ${uiText("share_whatsapp")}`;
waQuoteButton?.addEventListener("click", () => {
  const text = document.getElementById("quoteText").textContent;
  window.open(
    `https://wa.me/?text=${encodeURIComponent(text + "\n\n" + location.href)}`,
    "_blank"
  );
});

const copyBtn = document.getElementById("copyQuote");

if (copyBtn) {
  copyBtn.addEventListener("click", () => {
    const text = document.getElementById("quoteText")?.textContent?.trim();

    if (!text) return;

    navigator.clipboard.writeText(text).then(() => {
      const originalText = copyBtn.textContent;

      copyBtn.textContent = uiText("copied_label");
      copyBtn.disabled = true;

      setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.disabled = false;
      }, 1500);
    });
  });
}

const quoteBox = document.getElementById("quoteBox");
const closeQuoteBtn = document.getElementById("closeQuote");

if (closeQuoteBtn && quoteBox) {
  closeQuoteBtn.addEventListener("click", () => {
    quoteBox.classList.remove("show");
    quoteBox.style.display = "none";
  });
}

/* =====================
   AUTO FOCUS SEARCH (HOME)
===================== */
if (isHomePage) {
  const search = document.getElementById("searchInput");
  if (search) {
    setTimeout(() => {
      search.focus();
    }, 600);
  }
}


// INTRO VALUES ANIMATION
const valueItems = document.querySelectorAll(".value-item");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

valueItems.forEach(item => observer.observe(item));

// =====================
// TOAST (GLOBAL, SIMPLE)
// =====================

function showToast(message, duration = 2000) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = sanitizeUiMessage(message, "generic_success");
  toast.classList.add("show");

  clearTimeout(toast._timer);

  toast._timer = setTimeout(() => {
    toast.classList.remove("show");
  }, duration);
}

document.querySelectorAll(".prefooter-col a[data-filter]").forEach(link => {
  link.onclick = e => {
    e.preventDefault();

    const filter = link.dataset.filter;

    // klik sidebar filter otomatis
    const sidebarLink = document.querySelector(
      `[data-filter="${filter}"]`
    );

    if (sidebarLink) {
      sidebarLink.click();
    }

    // scroll ke artikel
    document
      .getElementById("articles-container")
      ?.scrollIntoView({ behavior: "smooth" });
  };
});

// ===============================
// READING PROGRESS STANDALONE (REMOVED)
// ===============================

// =====================
// AUTO SCROLL KE POSISI TERAKHIR (FINAL)
// =====================
(function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || params.get("slug");
  if (!id) return;

  if (window.__PORTAL_AUTO_SCROLL_DONE__) return;

  const data =
    safeJsonParse("readingProgress", {});

  const rawPercent = data[id];
  const percent = Number(rawPercent);
  if (!Number.isFinite(percent) || percent <= 0 || percent >= 96) return;

  const runAutoScroll = () => {
    const start = Date.now();
    const maxWaitMs = 12000;

    const attemptScroll = () => {
      if (window.__PORTAL_AUTO_SCROLL_DONE__) return;

      const content = document.getElementById("isi-artikel");
      const hasContent = !!(content && (content.textContent || "").trim().length > 0);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (!hasContent || docHeight <= 0) {
        if (Date.now() - start > maxWaitMs) return;
        window.setTimeout(attemptScroll, 120);
        return;
      }

      const target = (docHeight * percent) / 100;
      window.__PORTAL_AUTO_SCROLL_DONE__ = true;
      window.scrollTo({
        top: target,
        behavior: "smooth"
      });

      window.setTimeout(() => {
        try {
          const current = window.scrollY || 0;
          if (current < Math.max(20, target * 0.25)) {
            window.scrollTo({
              top: target,
              behavior: "smooth"
            });
          }
        } catch {}
      }, 900);
    };

    window.setTimeout(attemptScroll, 250);

    window.setTimeout(() => {
      try {
        window.dispatchEvent(new Event("portal-auto-scroll"));
      } catch {}
    }, 0);
  };

  if (document.readyState === "complete") {
    runAutoScroll();
    return;
  }

  window.addEventListener("load", runAutoScroll);
})();


(function () {
  const btn = document.getElementById("focusModeBtn");
  if (!btn) return;

  // load status
  if (localStorage.getItem("focusMode") === "on") {
    document.body.classList.add("focus-mode");
  }

  setFocusModeLabel(btn, document.body.classList.contains("focus-mode"));
  setReaderButtonState(btn, document.body.classList.contains("focus-mode"));

  btn.addEventListener("click", () => {
    document.body.classList.toggle("focus-mode");

    const active = document.body.classList.contains("focus-mode");

    setFocusModeLabel(btn, active);
    setReaderButtonState(btn, active);

    localStorage.setItem("focusMode", active ? "on" : "off");
  });
})();

// =============================
// TOP PROGRESS BAR
// =============================
window.addEventListener("scroll", () => {
  const bar = document.getElementById("progress-bar");
  if (!bar) return;

  const docHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  if (docHeight <= 0) return;

  const percent = Math.round(
    (window.scrollY / docHeight) * 100
  );

  bar.style.width = percent + "%";

  // ===============================
  // SIMPAN PROGRESS BACA
  // ===============================
  const id = getCurrentArticleId();
  if (!id) return;

  let reading =
    safeJsonParse("readingProgress", {});

  const prev = Number(reading[id] || 0);
  const wasDone = Boolean(reading[id + "_done"]);

  // If user re-reads from the top after finishing, restart progress instead of sticking at 100%.
  const nearTop = (window.scrollY || 0) < 80;
  const looksLikeRestart = nearTop && percent <= 8 && (wasDone || prev >= 95);

  if (looksLikeRestart) {
    reading[id] = percent;
    if (Object.prototype.hasOwnProperty.call(reading, id + "_done")) {
      delete reading[id + "_done"];
    }
  }

  const prevAfterReset = Number(reading[id] || 0);
  const next = Math.max(prevAfterReset, percent);
  reading[id] = next;
  localStorage.setItem("readingProgress", JSON.stringify(reading));

  try {
    window.dispatchEvent(new CustomEvent("reading-progress-updated", {
      detail: { id, percent: next }
    }));
  } catch {}

  // ===============================
  // JIKA ARTIKEL SELESAI
  // ===============================
  if (next >= 95 && !reading[id + "_done"]) {
    reading[id + "_done"] = true;
    localStorage.setItem("readingProgress", JSON.stringify(reading));

    try {
      window.dispatchEvent(new CustomEvent("reading-progress-updated", {
        detail: { id, percent: next, done: true }
      }));
    } catch {}

    const today = new Date().toISOString().slice(0, 10);

    let history =
      safeJsonParse("readingHistory", {});

    history[today] = (history[today] || 0) + 1;
    localStorage.setItem(
      "readingHistory",
      JSON.stringify(history)
    );

    let total =
      parseInt(localStorage.getItem("totalArticlesRead")) || 0;

    localStorage.setItem(
      "totalArticlesRead",
      total + 1
    );
  }
});

// =====================
// GLOBAL DARK MODE AUTO
// =====================
(function () {
  const saved = localStorage.getItem("theme");

  // jika belum ada pilihan, ikuti sistem
  if (!saved) {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  } else if (saved === "dark") {
    document.body.classList.add("dark");
  }
})();

// =====================
// TEXT HIGHLIGHT SAVE
// =====================
document.addEventListener("mouseup", () => {
  const selection = window.getSelection();
  const text = selection.toString().trim();
  if (text.length < 20) return;

  const articleId = getCurrentArticleId();
  if (!articleId) return;

  const highlights =
    safeJsonParse("highlights", {});

  if (!highlights[articleId]) {
    highlights[articleId] = [];
  }

  highlights[articleId].push(text);
  localStorage.setItem("highlights", JSON.stringify(highlights));
});


// =====================
// SAVE ARTICLE OFFLINE
// =====================
const offlineBtn = document.getElementById("offlineSaveBtn");

if (offlineBtn && !offlineBtn.dataset.bound) {
  const articleId = getCurrentArticleId();

  if (!articleId) {
    offlineBtn.disabled = true;
  }

  offlineBtn.dataset.bound = "1";

  offlineBtn.addEventListener("click", () => {

    const safeId = getCurrentArticleId();
    if (!safeId) return;

    const offline =
      safeJsonParse("offlineArticles", {});

    const fromStore = getArticleRawById(safeId) || getLegacyArticleStore()?.[safeId] || articleStore?.[safeId];
    const snapshot = fromStore || buildOfflineSnapshotFromDom(safeId);
    if (!snapshot) return;

    offline[safeId] = snapshot;

    localStorage.setItem(
      "offlineArticles",
      JSON.stringify(offline)
    );

    try {
      window.dispatchEvent(new Event("offlineUpdated"));
    } catch {}

    if (typeof showToast === "function") {
      showToast(uiText("offline_saved"));
    }
  });
}

function updateOfflineCount() {
  const el = document.getElementById("offline-count");
  if (!el) return;

  const data =
    safeJsonParse("offlineArticles", {});

  el.textContent = Object.keys(data).length;
}

updateOfflineCount();

// ==============================
// RENDER OFFLINE DI HOME
// ==============================
function renderOfflineHome() {
  const section = document.getElementById("offline-section");
  const list = document.getElementById("offline-home-list");

  const offline =
    safeJsonParse("offlineArticles", {});

  const ids = Object.keys(offline);

  if (!section) return;

  if (ids.length === 0) {
    section.style.display = "none";
    return;
  }

  section.style.display = "block";

  // Home tidak menampilkan card/grid offline (hanya header + link).
  // Jika container list tidak ada, kita cukup toggle visibility section.
  if (!list) return;

  list.innerHTML = "";
  let rendered = 0;

  ids.slice(0, 3).forEach((id) => {
    const article = offline[id];
    const articleView = article;
    if (!articleView) return;

    const card = document.createElement("article");
    card.className = "card";

    const img = document.createElement("img");
    img.className = "thumb";
    img.src = articleView.thumbnail || article.thumbnail || "assets/images/default.jpg";
    img.alt = articleView.judul || "";

    const categorySpan = document.createElement("span");
    categorySpan.className = "category";
    categorySpan.textContent = getLocalizedCategory(articleView.kategori || "", getSiteLang());

    const titleEl = document.createElement("h3");
    titleEl.textContent = articleView.judul || "";

    const readMore = document.createElement("a");
    readMore.className = "read-more";
    readMore.href = buildArticleHref(id, articleView.judul || "");
    readMore.textContent = uiText("read_offline");

    const tanggal = formatArticleDate(article, getSiteLang(), true);
    const dateEl = document.createElement("span");
    dateEl.className = "card-date";
    dateEl.textContent = tanggal;

    const footer = document.createElement("div");
    footer.className = "card-footer";
    footer.appendChild(readMore);
    footer.appendChild(dateEl);

    card.appendChild(img);
    card.appendChild(categorySpan);
    card.appendChild(titleEl);
    card.appendChild(footer);

    list.appendChild(card);
    rendered++;
  });

  section.style.display = rendered > 0 ? "block" : "none";
}

// ===============================
// DOWNLOAD SEMUA ARTIKEL KATEGORI
// ===============================
function initDownloadCategoryButtonWithRetry(attemptsLeft = 80) {
  const downloadBtn = document.getElementById("download-category");
  if (!downloadBtn) {
    if ((attemptsLeft || 0) <= 0) return;
    window.setTimeout(() => initDownloadCategoryButtonWithRetry((attemptsLeft || 0) - 1), 60);
    return;
  }

  if (downloadBtn.dataset.bound === "true") return;
  downloadBtn.dataset.bound = "true";

  downloadBtn.addEventListener("click", () => {
    const progressBox = document.getElementById("download-progress");
    const progressFill = document.getElementById("progress-fill");
    const progressText = document.getElementById("progress-text");

    const currentFilter = (activeFilter || "all").trim().toLowerCase();
    const filterSlug = normalizeSlugKey(currentFilter);
    const filterCompact = filterSlug.replace(/\-/g, "");

    const sourceIds = getAllArticleKeys(false);
    let ids = sourceIds;

    if (filterSlug !== "all") {
      ids = sourceIds.filter((id) => {
        const raw = getArticleRawById(id);
        const view = getArticleView(id);
        const meta = getStableArticleMeta(id, raw, view);

        const cat = meta.categoryKey || "";
        const sub = meta.subcategoryKey || "";
        const tag = meta.tagKey || "";

        const catCompact = String(cat).replace(/\-/g, "");
        const subCompact = String(sub).replace(/\-/g, "");
        const tagCompact = String(tag).replace(/\-/g, "");

        return (
          cat === filterSlug ||
          sub === filterSlug ||
          tag === filterSlug ||
          catCompact === filterCompact ||
          subCompact === filterCompact ||
          tagCompact === filterCompact
        );
      });
    }

    const total = ids.length;
    let done = 0;

    const offline = safeJsonParse("offlineArticles", {});
    if (progressBox) progressBox.style.display = "flex";

    let targetPercent = 0;
    let visualPercent = 0;
    let completed = false;
    let rafId = 0;

    function paintProgress(value) {
      if (progressFill) progressFill.style.width = value + "%";
      if (progressText) progressText.textContent = Math.round(value) + "%";
    }

    function animateProgress() {
      const delta = targetPercent - visualPercent;
      if (Math.abs(delta) < 0.2) {
        visualPercent = targetPercent;
      } else {
        visualPercent += delta * 0.22;
      }

      paintProgress(visualPercent);

      if (!completed || visualPercent < 100) {
        rafId = window.requestAnimationFrame(animateProgress);
      }
    }

    if (total === 0) {
      targetPercent = 0;
      visualPercent = 0;
      paintProgress(0);
      return;
    }

    if (rafId) window.cancelAnimationFrame(rafId);
    targetPercent = 0;
    visualPercent = 0;
    completed = false;
    paintProgress(0);
    rafId = window.requestAnimationFrame(animateProgress);

    const chunkSize = 40;
    function pump(startIndex) {
      const endIndex = Math.min(startIndex + chunkSize, total);

      for (let i = startIndex; i < endIndex; i++) {
        const id = ids[i];
        const raw = getArticleRawById(id) || articleStore[id];
        if (raw) offline[id] = raw;
        done++;
      }

      targetPercent = Math.round((done / total) * 100);

      if (done >= total) {
        localStorage.setItem(
          "offlineArticles",
          JSON.stringify(offline)
        );

        completed = true;
        targetPercent = 100;

        downloadBtn.classList.add("downloaded");
        downloadBtn.textContent = uiText("download_done");

        updateOfflineCount();
        updateHomeStats();        //  TAMBAHAN INI
        renderOfflineHome();      //  supaya section offline update
        return;
      }

      window.setTimeout(() => pump(endIndex), 0);
    }

    pump(0);
  });
}

onDomReady(() => {
  initDownloadCategoryButtonWithRetry();
});

function updateOnlineStatus() {
  const el = document.getElementById("offline-indicator");
  if (!el) return;

  if (navigator.onLine) {
    el.textContent = uiText("online_status");
    el.classList.remove("offline");
  } else {
    el.textContent = uiText("offline_status");
    el.classList.add("offline");
  }
}

window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOnlineStatus);
window.addEventListener("portal-language-change", updateOnlineStatus);

updateOnlineStatus();
// jalankan saat halaman dimuat
renderOfflineHome();

// =============================
// OFFLINE TOAST
// =============================
function showOfflineToast(message) {
  const toast = document.getElementById("offline-toast");
  if (!toast) return;

  toast.textContent = repairMojibakeString(message);
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

// Expose for bookmark.js and offline.js grid category localization
if (typeof window !== "undefined") {
  window.getLocalizedCategory = getLocalizedCategory;
}

// cek status awal
window.addEventListener("load", () => {
  if (!navigator.onLine) {
    showOfflineToast(uiText("offline_status"));
  }
});

// saat internet putus
window.addEventListener("offline", () => {
  showOfflineToast(uiText("offline_status"));
});

// saat internet kembali
window.addEventListener("online", () => {
  showOfflineToast(uiText("online_back"));
});

function renderLastReading() {
  const section = document.getElementById("last-reading");
  const container = document.getElementById("last-reading-card");

  if (!section || !container) return;

  const progress =
    safeJsonParse("readingProgress", {});

  const ids = Object.keys(progress).filter((id) => {
    const percent = Number(progress[id]);
    return !id.endsWith("_done") && Number.isFinite(percent) && percent > 5 && percent < 100;
  });

  if (ids.length === 0) {
    section.style.display = "none";
    return;
  }

  const id = ids[ids.length - 1];
  const articleView = getLightArticleMeta(id) || {
    id,
    slug: id,
    judul: id,
    kategori: "",
    thumbnail: "",
  };

  section.style.display = "block";

  const percent = Number(progress[id]);
  const slug = slugify(articleView.judul);

  container.innerHTML = "";
  const wrapper = document.createElement("div");
  wrapper.className = "last-reading-card";

  const category = document.createElement("span");
  category.className = "category";
  category.textContent = getLocalizedCategory(articleView.kategori || "", getSiteLang());

  const title = document.createElement("h3");
  title.textContent = articleView.judul || "";

  const bar = document.createElement("div");
  bar.className = "reading-progress-bar";

  const fill = document.createElement("div");
  fill.className = "reading-progress-fill";
  fill.style.width = `${percent}%`;
  bar.appendChild(fill);

  const note = document.createElement("p");
  note.textContent = uiText("continue_from", { percent });

  const link = document.createElement("a");
  link.href = buildArticleHref(id, slug);
  link.className = "btn-premium";
  link.textContent = uiText("continue_reading_action");

  wrapper.appendChild(category);
  wrapper.appendChild(title);
  wrapper.appendChild(bar);
  wrapper.appendChild(note);
  wrapper.appendChild(link);

  container.appendChild(wrapper);

  const card = container.querySelector(".last-reading-card");
  if (!card) return;

  card.classList.remove(
    "card-low",
    "card-mid",
    "card-high"
  );

  if (percent < 40) {
    card.classList.add("card-low");
  } else if (percent < 80) {
    card.classList.add("card-mid");
  } else {
    card.classList.add("card-high");
  }
}

// ===============================
// AUTO REFRESH SAAT KEMBALI KE TAB
// ===============================
function refreshHomeWidgets() {
  // Render fast from localStorage first (no store refresh)
  renderLastReading();
  updateReaderStats();
  updateHomeStats();
  renderOfflineHome();

  // Optionally refresh store in background to improve titles/categories
  window.setTimeout(() => {
    try {
      refreshArticleStore();
      renderLastReading();
      updateReaderStats();
    } catch {}
  }, 0);
}

function refreshHomeQuickWidgets() {
  updateHomeStats();
  renderOfflineHome();
  if (typeof updateOfflineCount === "function") updateOfflineCount();
}

function initHomeWidgetsWithRetry(attemptsLeft = 80) {
  if (!isHomePage) return;

  // Quick widgets: do NOT wait for store
  const offlineStat = document.getElementById("stat-offline");
  const offlineSection = document.getElementById("offline-section");
  if (offlineStat || offlineSection) {
    refreshHomeQuickWidgets();
  }

  // Reading widgets: wait for store + containers
  const needs = [
    document.getElementById("reader-stats"),
    document.getElementById("last-reading")
  ];

  const hasReadingContainers = needs.some(Boolean);
  const hasQuickContainers = !!offlineStat || !!offlineSection;
  if (!hasReadingContainers && !hasQuickContainers) {
    if ((attemptsLeft || 0) <= 0) return;
    window.setTimeout(() => initHomeWidgetsWithRetry((attemptsLeft || 0) - 1), 60);
    return;
  }

  if (!hasReadingContainers) {
    // Quick widgets already handled; keep retrying until reading containers exist.
    if ((attemptsLeft || 0) <= 0) return;
    window.setTimeout(() => initHomeWidgetsWithRetry((attemptsLeft || 0) - 1), 60);
    return;
  }

  // Reading widgets should render even if store isn't ready (use localStorage first).
  refreshHomeWidgets();

  // Refresh store in background to improve titles/categories.
  const storeReady = !!(articleStore && typeof articleStore === "object" && Object.keys(articleStore).length > 0);
  if (!storeReady) {
    try {
      refreshArticleStore();
    } catch {}
  }
}

onDomReady(() => {
  // Render quick widgets immediately to avoid "lambat" feel
  if (isHomePage) {
    try {
      refreshHomeQuickWidgets();
    } catch {}
  }
  initHomeWidgetsWithRetry();
});

window.addEventListener("focus", refreshHomeWidgets);

window.addEventListener("reading-progress-updated", () => {
  if (!isHomePage) return;
  try {
    refreshHomeWidgets();
  } catch {}
});

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    refreshHomeWidgets();
  }
});

function updateHomeStats() {
  const offlineEl = document.getElementById("stat-offline");
  const statCard = offlineEl?.closest(".stat-card");

  if (!offlineEl || !statCard) return;

  const offline =
    safeJsonParse("offlineArticles", {});

  const count = Object.keys(offline).length;
  offlineEl.textContent = count;

  // =============================
  // HIDE kalau 0
  // =============================
  if (count === 0) {
    statCard.style.display = "none";
    return;
  } else {
    statCard.style.display = "flex";
  }

  // =============================
  // WARNA LEVEL
  // =============================
  statCard.classList.remove(
    "offline-low",
    "offline-mid",
    "offline-high"
  );

  if (count >= 20) {
    statCard.classList.add("offline-high");
  } else if (count >= 10) {
    statCard.classList.add("offline-mid");
  } else if (count >= 5) {
    statCard.classList.add("offline-low");
  }
}

// =====================
// READER STATS (GLOBAL)
// =====================
function updateReaderStats() {
  const section = document.getElementById("reader-stats");
  if (!section) return;

  const reading =
    safeJsonParse("readingProgress", {});

  const ids = Object.keys(reading).filter((id) => {
    const percent = Number(reading[id]);
    return !id.endsWith("_done") && Number.isFinite(percent) && percent > 0;
  });

  if (ids.length === 0) {
    section.style.display = "none";
    return;
  }

  section.style.display = "block";

  const articleCount = ids.length;
  let totalMinutes = 0;
  const readingTime = safeJsonParse("readingTime", {});
  let totalMs = 0;
  ids.forEach((id) => {
    const ms = readingTime && typeof readingTime === "object" ? Number(readingTime[id] || 0) : 0;
    if (Number.isFinite(ms) && ms > 0) totalMs += ms;
  });
  if (totalMs > 0) {
    totalMinutes = Math.max(1, Math.round(totalMs / 60000));
  } else {
    totalMinutes = articleCount;
  }

  let lastTitle = uiText("continue_reading_action");
  const lastId = ids[ids.length - 1];
  const lastArticle = lastId ? getLightArticleMeta(lastId) : null;

  if (lastArticle?.judul) {
    lastTitle =
      lastArticle.judul.length > 18
        ? lastArticle.judul.slice(0, 18) + "..."
        : lastArticle.judul;
  } else if (lastId) {
    lastTitle = lastId.length > 18 ? lastId.slice(0, 18) + "..." : lastId;
  }

  const elArticles = document.getElementById("stat-articles");
  const elTime = document.getElementById("stat-time");
  const elLast = document.getElementById("stat-last");

  if (elArticles) elArticles.textContent = articleCount;
  if (elTime) elTime.textContent = totalMinutes;
  if (elLast) elLast.textContent = lastTitle;

  section.classList.remove(
    "reader-green",
    "reader-blue",
    "reader-gold",
    "reader-default"
  );

  if (articleCount >= 5) {
    section.classList.add("reader-green");
  } else if (totalMinutes >= 30) {
    section.classList.add("reader-blue");
  } else {
    section.classList.add("reader-default");
  }
}

// REAL READING TIME TRACKER
// ===============================
let readingStart = Date.now();
let totalTime = 0;

const articleIdForTime = getCurrentArticleId();

function saveReadingTime() {
  if (!articleIdForTime) return;

  const now = Date.now();
  const sessionTime = now - readingStart;
  totalTime += sessionTime;

  const data =
    safeJsonParse("readingTime", {});

  data[articleIdForTime] =
  (data[articleIdForTime] || 0) + sessionTime;

  localStorage.setItem("readingTime", JSON.stringify(data));

  readingStart = now;
}

// simpan tiap 10 detik
setInterval(saveReadingTime, 10000);

// simpan saat keluar halaman
window.addEventListener("beforeunload", saveReadingTime);

// ===============================
// READING STREAK
// ===============================
function updateReadingStreak() {
  const today = new Date().toDateString();

  let data =
    safeJsonParse("readingStreak", {
      lastDay: null,
      streak: 0
    });

  if (data.lastDay !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (data.lastDay === yesterday.toDateString()) {
      data.streak += 1;
    } else {
      data.streak = 1;
    }

    data.lastDay = today;
    localStorage.setItem("readingStreak", JSON.stringify(data));
  }
}

updateReadingStreak();

// ===============================
// RECOMMENDED ARTICLES (ARTICLE PAGE)
// ===============================
if (isArticlePage) {
  const currentId = getCurrentArticleId();
  if (currentId) {
    renderRecommendedArticles(currentId);
  }
}

// ================= ADVANCED FLOATING SCROLL =================
(function () {

  const floating = document.querySelector(".floating-actions");
  if (!floating) return; //Kalau tidak ada (bukan index), stop di sini

  let lastScrollY = window.scrollY;
  let ticking = false;

  const SHOW_AFTER = 150;
  const SCROLL_SENSITIVITY = 8;

  function handleScroll() {
    const currentY = window.scrollY;
    const diff = currentY - lastScrollY;

    if (currentY < SHOW_AFTER) {
      floating.classList.add("hide");
    } else {
      if (diff > SCROLL_SENSITIVITY) {
        // Scroll turun tampil
        floating.classList.remove("hide");
      } else if (diff < -SCROLL_SENSITIVITY) {
        // Scroll naik sembunyi
        floating.classList.add("hide");
      }
    }

    lastScrollY = currentY;
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(handleScroll);
      ticking = true;
    }
  });

})();

// ===============================
// OFFLINE EVENT LISTENER (GLOBAL)
// ===============================
window.addEventListener("offlineUpdated", () => {
  if (typeof updateOfflineCount === "function") updateOfflineCount();
  if (typeof updateHomeStats === "function") updateHomeStats();
  if (typeof renderOfflineHome === "function") renderOfflineHome();
});

}

// LEGACY_UI_NORMALIZER_V2
Object.assign(articleUiText.ar, {
  site_name: "بوابة الثقافة الإسلامية",
  read_more: "اقرأ المزيد",
  popular_badge: "شائع",
  featured_badge: "مميز",
  new_badge: "جديد",
  articles_count_label: "مقالة",
  prev_article: "المقال السابق",
  next_article: "المقال التالي",
  read_short: "اقرأ",
  copy_success: "تم النسخ!",
  copy_link: "نسخ الرابط",
  read_time: "\u{1F552} {{minutes}} دقائق قراءة",
  article_translate: "ترجم:",
  toc: "جدول المحتويات",
  not_found_title: "لم يتم العثور على المقال",
  not_found_body: "المقال الذي تبحث عنه غير متوفر بعد أو أن الرابط غير صالح.",
  back_home: "العودة إلى الرئيسية",
  focus_mode: "وضع التركيز",
  save_offline: "حفظ دون اتصال",
  save_bookmark: "حفظ",
  read_mode: "وضع القراءة",
  reset: "إعادة ضبط",
  bookmark_hint: "يمكن مشاهدة المقالات المحفوظة من قائمة <strong>الإشارات المرجعية</strong>",
  share_whatsapp: "واتساب",
  share_copy: "نسخ الرابط",
  related_articles: "مقالات ذات صلة",
  recommended_articles: "مقالات مقترحة",
  breadcrumb_home: "الرئيسية",
  author_label: "الكاتب",
  read_offline: "قراءة دون اتصال",
  continue_from: "تابع من {{percent}}%",
  continue_reading_action: "متابعة القراءة",
  bookmark_added: "تم حفظ المقال",
  bookmark_removed: "تم حذف الإشارة المرجعية",
  offline_saved: "تم حفظ المقال دون اتصال",
  offline_status: portalOfflineText || "أنت الآن غير متصل بالإنترنت.",
  online_back: portalOnlineText || "عاد الاتصال بالإنترنت.",
  focus_exit: "الخروج من وضع التركيز",
  generic_success: "تم تنفيذ العملية بنجاح",
  download_done: "تم تنزيل جميع المقالات",
  copied_label: "تم النسخ!",
  prefooter_about_title: "بوابة الثقافة الإسلامية",
  prefooter_about_body: "منصة معرفية إسلامية تقدم مقالات ومواد علمية رصينة بلغة واضحة وقريبة من القارئ.",
  prefooter_main_title: "القائمة الرئيسية",
  prefooter_main_1: "أحدث المقالات",
  prefooter_main_2: "المقالات الشائعة",
  prefooter_main_3: "تصنيفات المقالات",
  prefooter_main_4: "القراءة دون اتصال",
  prefooter_main_5: "الأسئلة الشائعة",
  prefooter_features_title: "المزايا",
  prefooter_feature_1: "وضع القراءة",
  prefooter_feature_2: "حفظ الإشارات",
  prefooter_feature_3: "دعم RTL",
  prefooter_feature_4: "الوضع الداكن",
  prefooter_feature_5: "ترجمة المقالات",
  prefooter_note_title: "تنبيه",
  prefooter_note_body: "هذا الموقع لا يزال في مرحلة التطوير، وقد يتم تحديث بعض الميزات والمحتويات بشكل دوري.",
  footer_about: "من نحن",
  footer_faq: "الأسئلة الشائعة",
  footer_contact: "تواصل",
  footer_privacy: "سياسة الخصوصية",
  footer_disclaimer: "إخلاء المسؤولية",
  footer_copy: "(c) 2026 بوابة الثقافة الإسلامية - جميع الحقوق محفوظة.",
});

function normalizeLegacyUi() {
  const setText = (selector, value) => {
    const el = document.querySelector(selector);
    if (el) el.textContent = value;
  };
  const setHtml = (selector, value) => {
    const el = document.querySelector(selector);
    if (el) el.innerHTML = value;
  };

  if (isHomePage) {
    setText('#themeToggle', '\u{1F319}');
    setText('#langBtn', '\u{1F310}');
    const navBookmark = document.querySelector('.nav-bookmark-icon');
    const bookmarkCount = document.querySelector('.nav-bookmark-icon .bookmark-count')?.textContent || '0';
    if (navBookmark) navBookmark.innerHTML = '\u{1F516} <span class="bookmark-count">' + bookmarkCount + '</span>';
    document.querySelectorAll('.lang-menu button[data-set-lang]').forEach((button) => {
      const lang = button.getAttribute('data-set-lang');
      if (lang === 'id') button.textContent = '\u{1F1EE}\u{1F1E9} Indonesia';
      if (lang === 'en') button.textContent = '\u{1F1EC}\u{1F1E7} English';
      if (lang === 'ar') button.textContent = '\u{1F1F8}\u{1F1E6} العربية';
    });
    setText('.quick-card[href="/about"] .icon', '\u2139\uFE0F');
    setText('.quick-card[href="about"] .icon', '\u2139\uFE0F');
    setText('.quick-card[href="about.html"] .icon', '\u2139\uFE0F');
    setText('.quick-card[href="/faq"] .icon', '\u2753');
    setText('.quick-card[href="faq"] .icon', '\u2753');
    setText('.quick-card[href="faq.html"] .icon', '\u2753');
    setText('.quick-card[href="/donasi"] .icon', '\u{1F91D}');
    setText('.quick-card[href="donasi"] .icon', '\u{1F91D}');
    setText('.quick-card[href="donasi.html"] .icon', '\u{1F91D}');
    setText('.quick-card[href="/kontak"] .icon', '\u2709\uFE0F');
    setText('.quick-card[href="kontak"] .icon', '\u2709\uFE0F');
    setText('.quick-card[href="kontak.html"] .icon', '\u2709\uFE0F');
    setText('.quick-card[href="/ramadhan"] .icon', '\u{1F319}');
    setText('.quick-card[href="ramadhan"] .icon', '\u{1F319}');
    setText('.quick-card[href="ramadhan.html"] .icon', '\u{1F319}');
    setText('.btn-primary[href="#articles-container"]', '\u{1F4DA} ' + uiText('start_reading'));
    setText('.btn-secondary[href="#featured-article"]', '\u2B50 ' + uiText('featured_articles'));
    setText('#hero-featured-label', '\u2B50 ' + uiText('featured_articles') + ':');
    setText('.featured-cta', uiText('read_more'));
    document.querySelectorAll('.featured-card').forEach((card) => {
      card.setAttribute('data-featured-label', '\u2B50 ' + uiText('featured_articles'));
    });
    setText('.home-stats .stat-icon', '\u{1F4E5}');
    setText('#last-reading h2', '\u{1F4D6} ' + uiText('continue_reading_title'));
    setText('#reader-stats h3', '\u{1F4CA} ' + uiText('reader_stats_title'));
    setText('#download-category', '\u2B07\uFE0F ' + uiText('download_category_label'));
    setText('#empty-state', '\u274C ' + uiText('empty_articles'));
    setText('.popular-section .section-icon-fixed', '\u{1F525}');
    setText('.tools-section .section-icon-fixed', '\u{1F6E0}\uFE0F');
    setText('.categories-home .section-icon-fixed', '\u{1F5C2}\uFE0F');
    setText('#offline-section .section-icon-fixed', '\u{1F4E5}');
    setText('.tool-card[href="/zakat"] .icon', '\u{1F4B0}');
    setText('.tool-card[href="zakat.html"] .icon', '\u{1F4B0}');
    setText('.tool-card[href="/tools/mawaris"] .icon', '\u{1F9EE}');
    setText('.tool-card[href="tools/mawaris.html"] .icon', '\u{1F9EE}');
    setText('.tool-card[href="/haid"] .icon', '\u{1F469}');
    setText('.tool-card[href="haid.html"] .icon', '\u{1F469}');
    setText('.tool-card[href="/kaffarah"] .icon', '\u{1F381}');
    setText('.tool-card[href="kaffarah.html"] .icon', '\u{1F381}');
    setText('.tool-card[href="/smart"] .icon', '\u{1F9E0}');
    setText('.tool-card[href="smart.html"] .icon', '\u{1F9E0}');
    setText('.tool-card[href="/smart"] h3', uiText('smart_fiqh'));
    setText('.tool-card[href="smart.html"] h3', uiText('smart_fiqh'));
    setText('.smart-fiqh-card .icon', '\u{1F9E0}');
    setText('.sidebar-link[data-filter="all"] .icon', '\u{1F4DA}');
    setText('.menu-mawaris .icon', '\u{1F9EE}');
    setText('.menu-haid .icon', '\u{1F469}');
    setText('.menu-offline .icon', '\u{1F4E5}');
    document.querySelectorAll('.sidebar-toggle').forEach((button) => {
      const textEl = button.querySelector('.text');
      const iconEl = button.querySelector('.icon');
      const label = textEl?.textContent?.trim() || '';
      if (!iconEl) return;
      iconEl.textContent = getCategoryIcon(label);
    });
    setText('.prayer-title', '\u{1F54C} Waktu Sholat Hari Ini');
    setText('#open-quran', "\u{1F4D6} Baca Qur'an");
    setText('#open-hadith', '\u{1F4DC} Baca Hadis');
    setText('#azan-toggle', '\u{1F514} Azan Aktif');
    setText('#settings-toggle', '\u2699\uFE0F');
    setText('#notif-toggle', '\u{1F514} Aktifkan Notifikasi');
    setText('#volume-toggle', '\u{1F50A}');
    setHtml('.prayer-location', '\u{1F4CD} <span id="prayer-city">Mendeteksi lokasi...</span>');
    setText('#hijri-date', '\u{1F5D3}\uFE0F --');
    setText('#test-azan', '\u{1F9EA} Test Azan');
    setText('#azan-stop', '\u23F9 Stop Azan');
    setText('#azan-status', '\u2139\uFE0F Tidak ada azan');
    setText('.zakat-icon', '\u{1F4B0}');
    setText('.zakat-arrow', '\u279C');
    setText('#openTasbih', '\u{1F4FF}');
    setText('#openKiblat', '\u{1F9ED}');
    setText('#tasbihPopup h3', '\u{1F4FF} Tasbih Digital');
    setText('#tasbihText', 'سَبِّحِ اللَّه');
    setText('#kiblatPopup h3', '\u{1F9ED} Arah Kiblat');
    setText('#compass', '\u{1F9ED}');
    setText('#offline-toast', '\u{1F4F4} Anda sedang offline. Hanya artikel yang sudah diunduh yang bisa dibaca.');
    setText('#quran-popup h2', "\u{1F4D6} Baca Al-Qur'an");
    setText('#quran-close', '\u2715');
    setText('#hadith-popup h2', '\u{1F4DA} Koleksi Hadis');
    setText('#hadith-close', '\u2715');
    const footerCopy = document.querySelector('.site-footer .footer-copy');
    if (footerCopy) footerCopy.innerHTML = '&copy; 2026 Portal Literasi Islam - Seluruh hak cipta dilindungi.';
  }

  if (isArticlePage) {
    const tocTitle = document.querySelector('#toc h3');
    if (tocTitle) tocTitle.innerHTML = '<span class="toc-title-icon">\u{1F4D1}</span><span>' + uiText('toc') + '</span>';
    const tocToggle = document.getElementById('tocToggle');
    if (tocToggle) tocToggle.innerHTML = '<span class="toc-toggle-icon">\u2630</span><span>' + uiText('toc') + '</span>';
    const offlineSaveBtn = document.getElementById('offlineSaveBtn');
    if (offlineSaveBtn) offlineSaveBtn.textContent = '\u2B07\uFE0F ' + uiText('save_offline');
    const readModeBtn = document.getElementById('readModeBtn');
    if (readModeBtn) readModeBtn.textContent = '\u{1F4D6} ' + uiText('read_mode');
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) resetBtn.textContent = '\u267B\uFE0F ' + uiText('reset');
    const recommendedTitle = document.querySelector('.recommended-section h3');
    if (recommendedTitle) recommendedTitle.textContent = '\u2728 ' + uiText('recommended_articles');
    const shareWaBtn = document.getElementById('share-wa');
    if (shareWaBtn) shareWaBtn.textContent = '\u{1F4AC} ' + uiText('share_whatsapp');
    const copyLinkBtn = document.getElementById('copy-link');
    if (copyLinkBtn) copyLinkBtn.textContent = '\u{1F517} ' + uiText('share_copy');
    const copyQuoteBtn = document.getElementById('copyQuote');
    if (copyQuoteBtn) copyQuoteBtn.textContent = '\u{1F4CB} Copy';
    const waQuoteBtn = document.getElementById('waQuote');
    if (waQuoteBtn) waQuoteBtn.textContent = '\u{1F4AC} WhatsApp';
  }
}

onDomReady(normalizeLegacyUi);
window.addEventListener('portal-language-change', normalizeLegacyUi);
if (isArticlePage && typeof window.syncArticleChrome === "function") window.syncArticleChrome();

(() => {
  const scrollBtn = document.getElementById("scrollToTopBtn");
  if (!scrollBtn) return;

  let lastScrollY = window.scrollY;

  function handleScroll() {
    const currentScrollY = window.scrollY;
    const isScrollingDown = currentScrollY > lastScrollY;

    if (currentScrollY > 320 && isScrollingDown) {
      scrollBtn.classList.add("show");
    } else if (currentScrollY < 220 || currentScrollY < lastScrollY) {
      scrollBtn.classList.remove("show");
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener("scroll", handleScroll, { passive: true });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  handleScroll();
})();
