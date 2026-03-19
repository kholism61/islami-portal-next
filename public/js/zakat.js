/* =====================
   DARK MODE TOGGLE
===================== */
 const themeBtn = document.getElementById("themeToggle");

if (themeBtn) {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "\u2600\uFE0F";
  }

  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");
    themeBtn.textContent = isDark ? "\u2600\uFE0F" : "\uD83C\uDF19";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

function setupScrollToTopButton() {
  const scrollBtn = document.getElementById("scrollToTopBtn");
  if (!scrollBtn) return false;

  if (scrollBtn.dataset.scrollTopBound === "true") {
    const refresh = scrollBtn.__scrollTopRefresh;
    if (typeof refresh === "function") refresh();
    return true;
  }
  scrollBtn.dataset.scrollTopBound = "true";

  function setVisible(isVisible) {
    if (isVisible) {
      scrollBtn.classList.add("show");
      scrollBtn.style.opacity = "1";
      scrollBtn.style.visibility = "visible";
      scrollBtn.style.transform = "translateY(0)";
      scrollBtn.style.pointerEvents = "auto";
    } else {
      scrollBtn.classList.remove("show");
      scrollBtn.style.opacity = "0";
      scrollBtn.style.visibility = "hidden";
      scrollBtn.style.transform = "translateY(14px)";
      scrollBtn.style.pointerEvents = "none";
    }
  }

  function getScrollTop() {
    const values = [
      window.pageYOffset,
      window.scrollY,
      document.scrollingElement?.scrollTop,
      document.documentElement?.scrollTop,
      document.body?.scrollTop
    ];

    return values.reduce((max, value) => {
      const safeValue = Number(value || 0);
      return Number.isFinite(safeValue) ? Math.max(max, safeValue) : max;
    }, 0);
  }

  function getViewportHeight() {
    const values = [
      window.innerHeight,
      document.documentElement?.clientHeight,
      document.body?.clientHeight
    ];

    return values.reduce((max, value) => {
      const safeValue = Number(value || 0);
      return Number.isFinite(safeValue) ? Math.max(max, safeValue) : max;
    }, 0);
  }

  function getDocumentHeight() {
    const values = [
      document.scrollingElement?.scrollHeight,
      document.documentElement?.scrollHeight,
      document.body?.scrollHeight,
      document.documentElement?.offsetHeight,
      document.body?.offsetHeight
    ];

    return values.reduce((max, value) => {
      const safeValue = Number(value || 0);
      return Number.isFinite(safeValue) ? Math.max(max, safeValue) : max;
    }, 0);
  }

  function getThresholds() {
    const viewportHeight = getViewportHeight();
    const documentHeight = getDocumentHeight();
    const maxScrollable = Math.max(documentHeight - viewportHeight, 0);
    const showAt = Math.max(96, Math.min(220, Math.round(viewportHeight * 0.24)));
    const hideAt = Math.max(40, showAt - 72);

    return {
      maxScrollable,
      showAt,
      hideAt
    };
  }

  function handleScroll() {
    const currentScrollY = getScrollTop();
    const { maxScrollable, showAt, hideAt } = getThresholds();

    if (maxScrollable <= 80) {
      setVisible(false);
      return;
    }

    if (currentScrollY >= showAt) {
      setVisible(true);
      return;
    }

    if (currentScrollY <= hideAt) {
      setVisible(false);
    }
  }

  function scrollToTop() {
    const targets = [
      document.scrollingElement,
      document.documentElement,
      document.body
    ].filter(Boolean);

    for (const target of targets) {
      try {
        if (typeof target.scrollTo === "function") {
          target.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          target.scrollTop = 0;
        }
      } catch {
        target.scrollTop = 0;
      }
    }

    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      window.scrollTo(0, 0);
    }
  }

  const refreshVisibility = () => {
    window.requestAnimationFrame(handleScroll);
  };

  scrollBtn.__scrollTopRefresh = refreshVisibility;

  window.addEventListener("scroll", refreshVisibility, { passive: true });
  document.addEventListener("scroll", refreshVisibility, { passive: true, capture: true });
  window.addEventListener("touchmove", refreshVisibility, { passive: true });
  window.addEventListener("resize", refreshVisibility, { passive: true });
  window.addEventListener("orientationchange", refreshVisibility, { passive: true });

  scrollBtn.addEventListener("click", scrollToTop);
  scrollBtn.addEventListener("touchend", scrollToTop, { passive: true });

  refreshVisibility();

  let ticks = 0;
  const interval = window.setInterval(() => {
    ticks += 1;
    refreshVisibility();
    if (ticks >= 25) window.clearInterval(interval);
  }, 400);

  return true;
}

(function initScrollToTopButton() {
  if (typeof document === "undefined") return;

  let attempts = 0;
  const poll = () => {
    attempts += 1;
    const bound = setupScrollToTopButton();
    if (bound || attempts >= 30) return;
    setTimeout(poll, 300);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", poll, { once: true });
  }
  window.addEventListener("load", poll, { once: true });
  window.addEventListener("pageshow", poll);
  document.addEventListener("visibilitychange", poll);
  poll();
})();

let zakatChartInstance = null;
let historyChartInstance = null;
let livestockChartInstance = null;

const ZAKAT_LANGS = ["id", "en", "ar"];
const ZAKAT_UI_TEXT = {
  id: {
    yearly_chart_label: "Total Zakat per Tahun",
    result_title: "Hasil Perhitungan Zakat",
    nisab_gold: "Nisab Emas (85gr)",
    zakat_maal: "Zakat Maal",
    zakat_stock_trading: "Zakat Saham Trading",
    zakat_trade: "Zakat Perdagangan",
    zakat_stock_production: "Zakat Saham Produksi",
    zakat_income: "Zakat Penghasilan",
    zakat_gold: "Zakat Emas",
    zakat_fitrah: "Zakat Fitrah",
    zakat_agriculture: "Zakat Pertanian",
    zakat_rikaz: "Zakat Rikaz",
    zakat_mining: "Zakat Barang Tambang",
    zakat_company: "Zakat Perusahaan",
    zakat_goat: "Zakat Kambing",
    zakat_cow: "Zakat Sapi",
    zakat_camel: "Zakat Unta",
    explain_terms: "Lihat Penjelasan Istilah",
    total_money: "Total Zakat Uang",
    not_required: "Tidak wajib",
    not_required_unmet: "Tidak wajib (syarat belum terpenuhi)",
    goat_count: "{{count}} ekor kambing",
    camel_goat_count: "{{count}} kambing",
    cow_tabi: "{{count}} tabi' (1 th)",
    cow_musinnah: "{{count}} musinnah (2 th)",
    camel_bintu_makhadh: "1 bintu makhadh (1 th)",
    camel_bintu_labun_single: "1 bintu labun (2 th)",
    camel_hiqqah_single: "1 hiqqah (3 th)",
    camel_jadzaah_single: "1 jadza'ah (4 th)",
    camel_bintu_labun_double: "2 bintu labun",
    camel_hiqqah_double: "2 hiqqah",
    camel_hiqqah_count: "{{count}} hiqqah",
    camel_bintu_labun_count: "{{count}} bintu labun",
    term_bintu_makhadh: "Unta betina usia 1 tahun.",
    term_bintu_labun: "Unta betina usia 2 tahun.",
    term_hiqqah: "Unta betina usia 3 tahun.",
    term_jadzaah: "Unta betina usia 4 tahun.",
    term_tabi: "Sapi usia 1 tahun.",
    term_musinnah: "Sapi usia 2 tahun.",
    chart_labels: [
      "Zakat Maal",
      "Saham Trading",
      "Perdagangan",
      "Saham Produksi",
      "Penghasilan",
      "Emas",
      "Fitrah",
      "Pertanian",
      "Rikaz",
      "Barang Tambang",
      "Perusahaan"
    ],
    livestock_labels: ["Kambing", "Sapi", "Unta"],
    livestock_dataset: "Jumlah Ternak",
    mazhab_syafii: "Menggunakan standar umum zakat sesuai praktik mazhab Syafi’i.",
    mazhab_hanafi: "Mazhab Hanafi: lebih luas dalam perhitungan harta dan zakat fitrah boleh dengan uang.",
    mazhab_maliki: "Mazhab Maliki: menekankan kepemilikan penuh dan kestabilan harta sebelum zakat.",
    mazhab_hanbali: "Mazhab Hanbali: mirip dengan Syafi’i, dengan beberapa perbedaan dalam detail harta.",
    monthly_separator: " — ",
    livestock_modal_note: "Berdasarkan ketentuan zakat ternak dalam hadits Nabi ﷺ dan fiqh klasik."
  },
  en: {
    yearly_chart_label: "Total Zakat per Year",
    result_title: "Zakat Calculation Result",
    nisab_gold: "Gold Nisab (85g)",
    zakat_maal: "Wealth Zakat",
    zakat_stock_trading: "Trading Stock Zakat",
    zakat_trade: "Trade Zakat",
    zakat_stock_production: "Production Stock Zakat",
    zakat_income: "Income Zakat",
    zakat_gold: "Gold Zakat",
    zakat_fitrah: "Fitrah Zakat",
    zakat_agriculture: "Agriculture Zakat",
    zakat_rikaz: "Rikaz Zakat",
    zakat_mining: "Mining Zakat",
    zakat_company: "Company Zakat",
    zakat_goat: "Goat Zakat",
    zakat_cow: "Cow Zakat",
    zakat_camel: "Camel Zakat",
    explain_terms: "View Term Details",
    total_money: "Total Monetary Zakat",
    not_required: "Not required",
    not_required_unmet: "Not required (conditions not met)",
    goat_count: "{{count}} goat(s)",
    camel_goat_count: "{{count}} goat(s)",
    cow_tabi: "{{count}} tabi' (1 yr)",
    cow_musinnah: "{{count}} musinnah (2 yr)",
    camel_bintu_makhadh: "1 bintu makhadh (1 yr)",
    camel_bintu_labun_single: "1 bintu labun (2 yr)",
    camel_hiqqah_single: "1 hiqqah (3 yr)",
    camel_jadzaah_single: "1 jadza'ah (4 yr)",
    camel_bintu_labun_double: "2 bintu labun",
    camel_hiqqah_double: "2 hiqqah",
    camel_hiqqah_count: "{{count}} hiqqah",
    camel_bintu_labun_count: "{{count}} bintu labun",
    term_bintu_makhadh: "Female camel aged 1 year.",
    term_bintu_labun: "Female camel aged 2 years.",
    term_hiqqah: "Female camel aged 3 years.",
    term_jadzaah: "Female camel aged 4 years.",
    term_tabi: "Cow aged 1 year.",
    term_musinnah: "Cow aged 2 years.",
    chart_labels: [
      "Wealth",
      "Trading Stocks",
      "Trade",
      "Production Stocks",
      "Income",
      "Gold",
      "Fitrah",
      "Agriculture",
      "Rikaz",
      "Mining",
      "Company"
    ],
    livestock_labels: ["Goats", "Cows", "Camels"],
    livestock_dataset: "Livestock Count",
    mazhab_syafii: "Using common zakat standards based on Syafi’i school practice.",
    mazhab_hanafi: "Hanafi school: broader asset calculation and fitrah zakat may be paid in money.",
    mazhab_maliki: "Maliki school: emphasizes full ownership and asset stability before zakat.",
    mazhab_hanbali: "Hanbali school: similar to Syafi’i with some differences in details.",
    monthly_separator: " — ",
    livestock_modal_note: "Based on classical fiqh and the Prophet's ﷺ hadith on livestock zakat."
  },
  ar: {
    yearly_chart_label: "إجمالي الزكاة السنوي",
    result_title: "نتيجة حساب الزكاة",
    nisab_gold: "نصاب الذهب (85 جم)",
    zakat_maal: "زكاة المال",
    zakat_stock_trading: "زكاة أسهم التداول",
    zakat_trade: "زكاة التجارة",
    zakat_stock_production: "زكاة أسهم الإنتاج",
    zakat_income: "زكاة الدخل",
    zakat_gold: "زكاة الذهب",
    zakat_fitrah: "زكاة الفطر",
    zakat_agriculture: "زكاة الزروع",
    zakat_rikaz: "زكاة الركاز",
    zakat_mining: "زكاة المعادن",
    zakat_company: "زكاة الشركة",
    zakat_goat: "زكاة الغنم",
    zakat_cow: "زكاة البقر",
    zakat_camel: "زكاة الإبل",
    explain_terms: "عرض شرح المصطلحات",
    total_money: "إجمالي زكاة الأموال",
    not_required: "غير واجب",
    not_required_unmet: "غير واجب (الشروط غير مكتملة)",
    goat_count: "{{count}} رأس غنم",
    camel_goat_count: "{{count}} رأس غنم",
    cow_tabi: "{{count}} تبيع (سنة)",
    cow_musinnah: "{{count}} مسنة (سنتان)",
    camel_bintu_makhadh: "1 بنت مخاض (سنة)",
    camel_bintu_labun_single: "1 بنت لبون (سنتان)",
    camel_hiqqah_single: "1 حقة (3 سنوات)",
    camel_jadzaah_single: "1 جذعة (4 سنوات)",
    camel_bintu_labun_double: "2 بنت لبون",
    camel_hiqqah_double: "2 حقة",
    camel_hiqqah_count: "{{count}} حقة",
    camel_bintu_labun_count: "{{count}} بنت لبون",
    term_bintu_makhadh: "أنثى من الإبل عمرها سنة.",
    term_bintu_labun: "أنثى من الإبل عمرها سنتان.",
    term_hiqqah: "أنثى من الإبل عمرها ثلاث سنوات.",
    term_jadzaah: "أنثى من الإبل عمرها أربع سنوات.",
    term_tabi: "بقر عمره سنة.",
    term_musinnah: "بقر عمره سنتان.",
    chart_labels: [
      "المال",
      "أسهم التداول",
      "التجارة",
      "أسهم الإنتاج",
      "الدخل",
      "الذهب",
      "الفطر",
      "الزروع",
      "الركاز",
      "المعادن",
      "الشركة"
    ],
    livestock_labels: ["الغنم", "البقر", "الإبل"],
    livestock_dataset: "عدد الأنعام",
    mazhab_syafii: "المعيار العام للزكاة وفق المذهب الشافعي.",
    mazhab_hanafi: "المذهب الحنفي أوسع في حساب الأموال ويجيز زكاة الفطر نقدا.",
    mazhab_maliki: "المذهب المالكي يؤكد تمام الملك واستقرار المال قبل الوجوب.",
    mazhab_hanbali: "المذهب الحنبلي قريب من الشافعي مع فروق في بعض التفاصيل.",
    monthly_separator: " — ",
    livestock_modal_note: "وفق أحكام زكاة الأنعام في الحديث النبوي والفقه الكلاسيكي."
  }
};

function getZakatLang() {
  const saved = localStorage.getItem("siteLang") || "id";
  return ZAKAT_LANGS.includes(saved) ? saved : "id";
}

function interpolateTemplate(source, params = {}) {
  return String(source).replace(/\{\{\s*(\w+)\s*\}\}/g, (_, token) => params[token] ?? "");
}

function zt(key, params = {}) {
  const lang = getZakatLang();
  const pack = ZAKAT_UI_TEXT[lang] || ZAKAT_UI_TEXT.id;
  const fallback = ZAKAT_UI_TEXT.id[key];
  const value = pack[key] ?? fallback ?? key;
  if (typeof value !== "string") return value;
  return interpolateTemplate(value, params);
}


function rupiah(num) {
  return "Rp" + Math.round(num).toLocaleString("id-ID");
}

function drawHistoryChart() {
  const canvas = document.getElementById("historyChart");
  if (!canvas) return;

  let history;

  try {
    const userData = JSON.parse(localStorage.getItem("user"));
if (!userData) return;

const key = "zakatHistory_" + userData.email;

history = JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    history = [];
  }

  if (!Array.isArray(history) || history.length === 0) return;

  const yearly = {};

  history.forEach(item => {
    const date = new Date(item.date);
    const year = date.getFullYear();

    const value = Number(item.amount || item.total || 0);

    if (!yearly[year]) yearly[year] = 0;
    yearly[year] += value;
  });

  const labels = Object.keys(yearly);
  const data = Object.values(yearly);

  if (historyChartInstance) {
    historyChartInstance.destroy();
  }

  historyChartInstance = new Chart(canvas, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: zt("yearly_chart_label"),
        data: data,
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}


function calculateAllZakat() {
  const mazhab = document.getElementById("mazhab")?.value || "syafii";

  const goldPrice = +document.getElementById("goldPrice").value || 1000000;

const nisabMaal = goldPrice * 85;
const nisabSaham = goldPrice * 85;
const nisabPerdagangan = goldPrice * 85;

/* =========================
   ZAKAT MAAL (FINAL FIXED)
========================== */

const cash = +document.getElementById("cash").value || 0;
const savings = +document.getElementById("savings").value || 0;
const gold = +document.getElementById("gold").value || 0;
const sukuk = +document.getElementById("sukuk")?.value || 0;
const reksadana = +document.getElementById("reksadana")?.value || 0;
const crypto = +document.getElementById("crypto")?.value || 0;
const sewaIncome = +document.getElementById("sewaIncome")?.value || 0;
const sewaExpense = +document.getElementById("sewaExpense")?.value || 0;

const sewaNet = sewaIncome - sewaExpense;

const receivable = +document.getElementById("receivable").value || 0;
const receivableType =
  document.getElementById("receivableType")?.value || "kuat";

const debt = +document.getElementById("debt").value || 0;

/* Piutang hanya dihitung kalau KUAT */
const adjustedReceivable =
  receivableType === "kuat"
    ? receivable
    : 0;

/* Total aset maal pribadi */
const maalAssets =
  cash +
  savings +
  gold +
  sukuk +
  reksadana +
  crypto +
  sewaNet +
  adjustedReceivable;

/* Dikurangi hutang jatuh tempo */
const maalNet = maalAssets - debt;

const maalLikuid = maalNet;

const haulMaal =
  document.getElementById("haulMaal")?.checked;

const zakatMaal =
 maalLikuid >= nisabMaal && haulMaal
    ? maalLikuid * 0.025
    : 0;

    /* =========================
   ZAKAT SAHAM (TERPISAH)
========================== */
const stocks = +document.getElementById("stocks")?.value || 0;
const stockType = document.getElementById("stockType")?.value || "trading";
const stockProfit = +document.getElementById("stockProfit")?.value || 0;

let sahamLikuid = 0;
let zakatSaham = 0;

if (stockType === "trading") {
  sahamLikuid = stocks;
}
else if (stockType === "produksi") {
  if (stockProfit >= nisabMaal) {
    zakatSaham = stockProfit * 0.025;
  }
}

const haulSaham =
  document.getElementById("haulSaham")?.checked;

const zakatSahamTrading =
  sahamLikuid >= nisabSaham && haulSaham
    ? sahamLikuid * 0.025
    : 0;

  /* =========================
     ZAKAT PENGHASILAN
  ========================== */

  const salary = +document.getElementById("salary").value || 0;
  const expenses = +document.getElementById("expenses").value || 0;

  const salaryNet = salary - expenses;

 const salaryMethod =
  document.getElementById("salaryMethod")?.value || "haul";

const haulSalary =
  document.getElementById("haulSalary")?.checked;

let zakatSalary = 0;

if (salaryMethod === "haul") {

  if (salaryNet >= nisabMaal && haulSalary) {
    zakatSalary = salaryNet * 0.025;
  }

} else if (salaryMethod === "monthly") {

  const nisabBulanan = nisabMaal / 12;

  if (salaryNet >= nisabBulanan) {
    zakatSalary = salaryNet * 0.025;
  }

}


  /* =========================
     ZAKAT PERDAGANGAN
  ========================== */

  const capital = +document.getElementById("capital").value || 0;
  const profit = +document.getElementById("profit").value || 0;
  const stock = +document.getElementById("stock").value || 0;
  const businessReceivable =
    +document.getElementById("businessReceivable").value || 0;
  const businessDebt =
    +document.getElementById("businessDebt").value || 0;

  const businessNet =
    capital +
    profit +
    stock +
    businessReceivable -
    businessDebt;

 const usahaLikuid = businessNet;

 const haulPerdagangan =
  document.getElementById("haulPerdagangan")?.checked;

const zakatPerdagangan =
  usahaLikuid >= nisabPerdagangan && haulPerdagangan
    ? usahaLikuid * 0.025
    : 0;


    /* =========================
   ZAKAT PERUSAHAAN
========================== */

const companyCurrentAssets =
  +document.getElementById("companyCurrentAssets")?.value || 0;

const companyStock =
  +document.getElementById("companyStock")?.value || 0;

const companyReceivable =
  +document.getElementById("companyReceivable")?.value || 0;

const companyDebt =
  +document.getElementById("companyDebt")?.value || 0;

const haulCompany =
  document.getElementById("haulCompany")?.checked;

const companyNet =
  companyCurrentAssets +
  companyStock +
  companyReceivable -
  companyDebt;

const zakatCompany =
  companyNet >= nisabPerdagangan && haulCompany
    ? companyNet * 0.025
    : 0;



  /* =========================
     ZAKAT EMAS
  ========================== */

  const emasGram =
    +document.getElementById("emas-gram").value || 0;

  const emasHarga =
    +document.getElementById("emas-harga").value || 0;

    const emasDipakai = document.getElementById("emasDipakai")?.checked;

  const emasTotal = emasGram * emasHarga;
  const emasNisab = 85 * emasHarga;

  let zakatEmas = 0;

if (mazhab === "hanafi") {
  // tetap wajib walau dipakai
  if (emasTotal >= emasNisab) {
    zakatEmas = emasTotal * 0.025;
  }
} else {
  // Syafi’i dll -> tidak wajib jika dipakai
  if (!emasDipakai && emasTotal >= emasNisab) {
    zakatEmas = emasTotal * 0.025;
  }
}

  /* =========================
     ZAKAT FITRAH
  ========================== */

  const fitrahJumlah =
    +document.getElementById("fitrah-jumlah").value || 0;

  const fitrahHarga =
    +document.getElementById("fitrah-harga").value || 0;

  let zakatFitrah = 0;

if (mazhab === "hanafi") {
  // boleh uang
  zakatFitrah = fitrahJumlah * 2.5 * fitrahHarga;
} else {
  // selain hanafi -> tetap makanan (info saja)
  zakatFitrah = fitrahJumlah * 2.5 * fitrahHarga;
}

  /* =========================
     ZAKAT PERTANIAN
  ========================== */

  const harvest =
    +document.getElementById("harvest")?.value || 0;

  const harvestPrice =
    +document.getElementById("harvestPrice")?.value || 0;

  const irrigationRate =
    +document.getElementById("irrigationType")?.value || 10;

  const nisabHarvest = 653;

  let zakatHarvest = 0;

  if (harvest >= nisabHarvest) {
    const totalValue = harvest * harvestPrice;
    zakatHarvest =
      totalValue * (irrigationRate / 100);
  }


 /* =========================
   ZAKAT PETERNAKAN (FULL FIQH FINAL)
========================== */

const goatCount =
  +document.getElementById("goatCount")?.value || 0;

const cowCount =
  +document.getElementById("cowCount")?.value || 0;

const camelCount =
  +document.getElementById("camelCount")?.value || 0;

/* ===== SYARAT WAJIB ===== */

const haulTernak =
  document.getElementById("haulTernak")?.checked;

const ternakGembala =
  document.getElementById("ternakGembala")?.checked;

const ternakBukanKerja =
  document.getElementById("ternakBukanKerja")?.checked;

let zakatGoat = zt("not_required");
let zakatCow = zt("not_required");
let zakatCamel = zt("not_required");

/* Jika syarat tidak terpenuhi */
if (!haulTernak || !ternakGembala || !ternakBukanKerja) {

  zakatGoat = zt("not_required_unmet");
  zakatCow = zt("not_required_unmet");
  zakatCamel = zt("not_required_unmet");

} else {

  /* =====================
     KAMBING / DOMBA
  ===================== */

  if (goatCount >= 40 && goatCount <= 120) {
    zakatGoat = zt("goat_count", { count: 1 });
  } 
  else if (goatCount >= 121 && goatCount <= 200) {
    zakatGoat = zt("goat_count", { count: 2 });
  } 
  else if (goatCount >= 201 && goatCount <= 300) {
    zakatGoat = zt("goat_count", { count: 3 });
  } 
  else if (goatCount > 300) {
    zakatGoat =
      zt("goat_count", { count: Math.floor(goatCount / 100) });
  }

  /* =====================
     SAPI
  ===================== */

  if (cowCount >= 30) {

    let remaining = cowCount;
    let tabi = 0;       // 30 ekor
    let musinnah = 0;   // 40 ekor

    /* Cari kombinasi optimal */
    while (remaining >= 30) {

      if (remaining >= 40 && (remaining - 40) % 30 !== 10) {
        musinnah++;
        remaining -= 40;
      } else {
        tabi++;
        remaining -= 30;
      }

      if (remaining < 30) break;
    }

    if (tabi > 0 || musinnah > 0) {
      zakatCow = "";
      if (tabi > 0)
        zakatCow += `${zt("cow_tabi", { count: tabi })} `;
      if (musinnah > 0)
        zakatCow += zt("cow_musinnah", { count: musinnah });
    }
  }

  /* =====================
     UNTA
  ===================== */

  if (camelCount >= 5 && camelCount <= 9) {
    zakatCamel = zt("camel_goat_count", { count: 1 });
  }
  else if (camelCount >= 10 && camelCount <= 14) {
    zakatCamel = zt("camel_goat_count", { count: 2 });
  }
  else if (camelCount >= 15 && camelCount <= 19) {
    zakatCamel = zt("camel_goat_count", { count: 3 });
  }
  else if (camelCount >= 20 && camelCount <= 24) {
    zakatCamel = zt("camel_goat_count", { count: 4 });
  }
  else if (camelCount >= 25 && camelCount <= 35) {
    zakatCamel = zt("camel_bintu_makhadh");
  }
  else if (camelCount >= 36 && camelCount <= 45) {
    zakatCamel = zt("camel_bintu_labun_single");
  }
  else if (camelCount >= 46 && camelCount <= 60) {
    zakatCamel = zt("camel_hiqqah_single");
  }
  else if (camelCount >= 61 && camelCount <= 75) {
    zakatCamel = zt("camel_jadzaah_single");
  }
  else if (camelCount >= 76 && camelCount <= 90) {
    zakatCamel = zt("camel_bintu_labun_double");
  }
  else if (camelCount >= 91 && camelCount <= 120) {
    zakatCamel = zt("camel_hiqqah_double");
  }
 else if (camelCount > 120) {

  let bestHiqqah = 0;
  let bestBintuLabun = 0;
  let smallestRemainder = camelCount;

  for (let hiqqah = 0; hiqqah <= Math.floor(camelCount / 50); hiqqah++) {

    for (let bintuLabun = 0; bintuLabun <= Math.floor(camelCount / 40); bintuLabun++) {

      const total = (hiqqah * 50) + (bintuLabun * 40);

      if (total <= camelCount) {

        const remainder = camelCount - total;

        if (remainder < smallestRemainder) {
          smallestRemainder = remainder;
          bestHiqqah = hiqqah;
          bestBintuLabun = bintuLabun;
        }

        if (remainder === 0) break;
      }
    }
  }

  zakatCamel = "";

  if (bestHiqqah > 0) {
    zakatCamel += `${zt("camel_hiqqah_count", { count: bestHiqqah })} `;
  }

  if (bestBintuLabun > 0) {
    zakatCamel += zt("camel_bintu_labun_count", { count: bestBintuLabun });
  }

}

}
/* =========================
   ZAKAT RIKAZ
========================== */

const rikaz =
  +document.getElementById("rikaz")?.value || 0;

const zakatRikaz =
  rikaz > 0
    ? rikaz * 0.20
    : 0;

    /* =========================
   ZAKAT BARANG TAMBANG
========================== */

const madin =
  +document.getElementById("madin")?.value || 0;

let zakatMadin = 0;

if (mazhab === "hanafi") {
  zakatMadin = madin * 0.20;
} else {
  zakatMadin = madin * 0.025;
}

  /* =========================
     TOTAL
  ========================== */

const totalZakat =
  zakatMaal +
  zakatSahamTrading +
  zakatPerdagangan +
  zakatSaham +
  zakatSalary +
  zakatEmas +
  zakatFitrah +
  zakatHarvest +
  zakatRikaz +
  zakatMadin +
  zakatCompany;


/* =========================
   SIMPAN RIWAYAT USER
========================== */

let userData = null;
try {
  userData = JSON.parse(localStorage.getItem("user"));
} catch {
  userData = null;
}

const historyKey = userData && userData.email
  ? "zakatHistory_" + userData.email
  : "zakatHistory_public";

let history = [];
try {
  history = JSON.parse(localStorage.getItem(historyKey)) || [];
} catch {
  history = [];
}

history.push({
  amount: totalZakat,
  date: new Date().toISOString()
});

localStorage.setItem(historyKey, JSON.stringify(history));

  /* =========================
     OUTPUT
  ========================== */

  const resultEl = document.getElementById("zakat-result");
  if (resultEl) resultEl.innerHTML = `
    <h3>${zt("result_title")}</h3>
   <p><strong>${zt("nisab_gold")}:</strong> ${rupiah(nisabMaal)}</p>
    <hr>

   <p>${zt("zakat_maal")}: ${rupiah(zakatMaal)}</p>
<p>${zt("zakat_stock_trading")}: ${rupiah(zakatSahamTrading)}</p>
<p>${zt("zakat_trade")}: ${rupiah(zakatPerdagangan)}</p>
<p>${zt("zakat_stock_production")}: ${rupiah(zakatSaham)}</p>
    <p>${zt("zakat_income")}: ${rupiah(zakatSalary)}</p>
    <p>${zt("zakat_gold")}: ${rupiah(zakatEmas)}</p>
    <p>${zt("zakat_fitrah")}: ${rupiah(zakatFitrah)}</p>
    <p>${zt("zakat_agriculture")}: ${rupiah(zakatHarvest)}</p>
    <p>${zt("zakat_rikaz")}: ${rupiah(zakatRikaz)}</p>
    <p>${zt("zakat_mining")}: ${rupiah(zakatMadin)}</p>
    <p>${zt("zakat_company")}: ${rupiah(zakatCompany)}</p>

   <hr>

<p><strong>${zt("zakat_goat")}:</strong> ${zakatGoat}</p>
<p><strong>${zt("zakat_cow")}:</strong> ${zakatCow}</p>
<p><strong>${zt("zakat_camel")}:</strong> ${zakatCamel}</p>
<button onclick="showTernakInfo()" class="info-btn">
  ${zt("explain_terms")}
</button>

<hr>

    <h3>${zt("total_money")}: ${rupiah(totalZakat)}</h3>
  `;

  try {
    const target = resultEl || document.getElementById("zakatChart") || document.getElementById("historyChart");
    if (target && typeof target.scrollIntoView === "function") {
      window.requestAnimationFrame(() => {
        try {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        } catch {
          target.scrollIntoView();
        }
      });
    }
  } catch {}


  /* =========================
     UPDATE CHART
  ========================== */

 drawZakatChart({
  maal: zakatMaal,
  sahamTrading: zakatSahamTrading,
  perdagangan: zakatPerdagangan,
  sahamProduksi: zakatSaham,
  salary: zakatSalary,
  emas: zakatEmas,
  fitrah: zakatFitrah,
  harvest: zakatHarvest,
  rikaz: zakatRikaz,
  madin: zakatMadin,
  company: zakatCompany
});

  drawLivestockChart(goatCount, cowCount, camelCount);
  if (totalZakat > 0) {
  saveMonthlyHistory(totalZakat);
}
drawMonthlyHistory();
  drawHistoryChart();
}


function drawZakatChart(data) {
  const ctx = document.getElementById("zakatChart");
  if (!ctx) return;

  if (zakatChartInstance) {
    zakatChartInstance.destroy();
  }

  const rawData = [
  data.maal || 0,
  data.sahamTrading || 0,
  data.perdagangan || 0,
  data.sahamProduksi || 0,
  data.salary || 0,
  data.emas || 0,
  data.fitrah || 0,
  data.harvest || 0,
  data.rikaz || 0,
  data.madin || 0,
  data.company || 0
];

  const total = rawData.reduce((a, b) => a + b, 0);

  const percentData = rawData.map(v =>
    total > 0 ? (v / total * 100) : 0
  );

  zakatChartInstance = new Chart(ctx, {
    type: "doughnut",
    data: {
     labels: zt("chart_labels"),
      datasets: [{
        data: percentData
      }]
    },
    options: {
      plugins: {
        legend: {
          position: "bottom"
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.label + ": " + context.parsed.toFixed(2) + "%";
            }
          }
        }
      }
    }
  });
}

function drawLivestockChart(goatCount, cowCount, camelCount) {
  const ctx = document.getElementById("livestockChart");
  if (!ctx) return;

  if (livestockChartInstance) {
    livestockChartInstance.destroy();
    livestockChartInstance = null;
  }

  livestockChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: zt("livestock_labels"),
      datasets: [{
        label: zt("livestock_dataset"),
        data: [
          Number(goatCount) || 0,
          Number(cowCount) || 0,
          Number(camelCount) || 0
        ]
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

/* Load history saat halaman dibuka */
document.addEventListener("DOMContentLoaded", drawHistoryChart);


const mazhabSelect = document.getElementById("mazhab");
const mazhabInfo = document.getElementById("mazhab-info");

if (mazhabSelect) {
  mazhabSelect.addEventListener("change", () => {
    const value = mazhabSelect.value;

    let text = "";

    if (value === "syafii") {
      text = zt("mazhab_syafii");
    } else if (value === "hanafi") {
      text = zt("mazhab_hanafi");
    } else if (value === "maliki") {
      text = zt("mazhab_maliki");
    } else if (value === "hanbali") {
      text = zt("mazhab_hanbali");
    }

    mazhabInfo.textContent = text;
  });
  mazhabSelect.dispatchEvent(new Event("change"));
}

const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.tab;

    tabButtons.forEach(b => b.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById("tab-" + target).classList.add("active");
  });
});

/* =====================
   LOGIN USER (SAFE)
===================== */

function sanitizeName(name) {
  // hanya huruf, angka, spasi
  return name
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .trim()
    .slice(0, 25);
}

function loadUser() {
  const user = localStorage.getItem("user");

  const out = document.getElementById("user-logged-out");
  const inn = document.getElementById("user-logged-in");
  const app = document.getElementById("zakat-app");

  if (!out || !inn) return;

  if (!user) {
    out.style.display = "block";
    inn.style.display = "none";
    if (app) app.style.display = "block";
    return;
  }

  const data = JSON.parse(user);

  out.style.display = "none";
  inn.style.display = "block";
  if (app) app.style.display = "block";
}

/* =====================
   RIWAYAT BULANAN
===================== */

function saveMonthlyHistory(total) {
  const date = new Date();
  const key = date.getFullYear() + "-" + (date.getMonth() + 1);

  let history =
    JSON.parse(localStorage.getItem("zakatMonthly")) || {};

  history[key] = (history[key] || 0) + total;

  localStorage.setItem("zakatMonthly", JSON.stringify(history));
  drawMonthlyHistory();
}

function drawMonthlyHistory() {
  const list = document.getElementById("monthly-history");
  if (!list) return;

  const history =
    JSON.parse(localStorage.getItem("zakatMonthly")) || {};

  list.innerHTML = "";

  Object.keys(history)
    .sort()
    .reverse()
    .forEach(key => {
      const li = document.createElement("li");
      li.textContent =
        key + zt("monthly_separator") + rupiah(history[key]);
      list.appendChild(li);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  loadUser();
  drawMonthlyHistory();
});

function refreshZakatLanguageUi() {
  if (mazhabSelect) {
    mazhabSelect.dispatchEvent(new Event("change"));
  }
  drawMonthlyHistory();
  drawHistoryChart();
}

window.addEventListener("portal-language-change", refreshZakatLanguageUi);
window.addEventListener("storage", (event) => {
  if (event.key === "siteLang") refreshZakatLanguageUi();
});


function handleCredentialResponse(response) {
  const data = parseJwt(response.credential);

  const user = {
    name: data.name,
    email: data.email,
    picture: data.picture
  };

  localStorage.setItem("user", JSON.stringify(user));

  // reload agar UI update
  location.reload();
}


function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(c =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      )
      .join('')
  );

  return JSON.parse(jsonPayload);
}

function logoutUser() {
  // hapus data user
  localStorage.removeItem("user");

  // tampilkan kembali layar login
  const loggedOutEl = document.getElementById("user-logged-out");
  if (loggedOutEl) loggedOutEl.style.display = "block";

  // sembunyikan tampilan user login
  const loggedInEl = document.getElementById("user-logged-in");
  if (loggedInEl) loggedInEl.style.display = "none";

  // sembunyikan kalkulator
  const zakatAppEl = document.getElementById("zakat-app");
  if (zakatAppEl) zakatAppEl.style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {

  // ==============================
  // LOGIN CHECK
  // ==============================
  const user = localStorage.getItem("user");
  const nameEl = document.getElementById("user-name");
  const loggedOutEl = document.getElementById("user-logged-out");
  const loggedInEl = document.getElementById("user-logged-in");
  const zakatAppEl = document.getElementById("zakat-app");

  if (user) {
    const data = JSON.parse(user);
    if (nameEl) nameEl.textContent = data.name;
    if (loggedOutEl) loggedOutEl.style.display = "none";
    if (loggedInEl) loggedInEl.style.display = "block";
    if (zakatAppEl) zakatAppEl.style.display = "block";
  } else {
    if (loggedOutEl) loggedOutEl.style.display = "block";
    if (loggedInEl) loggedInEl.style.display = "none";
    if (zakatAppEl) zakatAppEl.style.display = "block";
  }

  // ==============================
  // SAHAM UI LOGIC
  // ==============================

  const stockTypeSelect = document.getElementById("stockType");
  const stockProfitSection = document.getElementById("stock-profit-section");
  const haulWrapper = document.getElementById("haulSahamWrapper");

  function updateStockUI() {
    if (!stockTypeSelect) return;

    if (stockTypeSelect.value === "trading") {
      if (stockProfitSection) stockProfitSection.style.display = "none";
      if (haulWrapper) haulWrapper.style.display = "flex";
    } else {
      if (stockProfitSection) stockProfitSection.style.display = "block";
      if (haulWrapper) haulWrapper.style.display = "none";
    }
  }

  if (stockTypeSelect) {
    stockTypeSelect.addEventListener("change", updateStockUI);
  }

  updateStockUI(); // jalankan saat pertama load

  const salaryMethodSelect = document.getElementById("salaryMethod");
const haulSalaryWrapper = document.getElementById("haulSalaryWrapper");

function updateSalaryUI() {
  if (!salaryMethodSelect || !haulSalaryWrapper) return;

  if (salaryMethodSelect.value === "monthly") {
    haulSalaryWrapper.style.display = "none";
  } else {
    haulSalaryWrapper.style.display = "flex";
  }
}

if (salaryMethodSelect) {
  salaryMethodSelect.addEventListener("change", updateSalaryUI);
}

updateSalaryUI();

});

function showTernakInfo() {

  const content = `
    <p><strong>Bintu makhadh</strong>: ${zt("term_bintu_makhadh")}</p>
    <p><strong>Bintu labun</strong>: ${zt("term_bintu_labun")}</p>
    <p><strong>Hiqqah</strong>: ${zt("term_hiqqah")}</p>
    <p><strong>Jadza'ah</strong>: ${zt("term_jadzaah")}</p>
    <p><strong>Tabi'</strong>: ${zt("term_tabi")}</p>
    <p><strong>Musinnah</strong>: ${zt("term_musinnah")}</p>
    <hr>
    <small>${zt("livestock_modal_note")}</small>
  `;

  document.getElementById("ternakModalContent").innerHTML = content;
  document.getElementById("ternakModal").style.display = "block";
}

function closeTernakInfo() {
  document.getElementById("ternakModal").style.display = "none";
}





