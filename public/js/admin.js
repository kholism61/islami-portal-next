/* =========================
   KONFIGURASI ADMIN
========================= */
const ADMIN_EMAIL = "nurcholism51@gmail.com";

/* =========================
   GLOBAL STATE
========================= */
let zakatHistory = [];

function setupScrollToTopButton() {
  const scrollBtn = document.getElementById("scrollToTopBtn");
  if (!scrollBtn) return false;

  if (scrollBtn.dataset.scrollTopBound === "true") return true;
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
    const el = document.scrollingElement || document.documentElement;
    const value = Number(el?.scrollTop || 0);
    return Number.isFinite(value) ? value : 0;
  }

  function handleScroll() {
    const currentScrollY = getScrollTop();
    if (currentScrollY > 320) setVisible(true);
    if (currentScrollY < 220) setVisible(false);
  }

  function scrollToTop() {
    const el = document.scrollingElement || document.documentElement;
    try {
      if (el && typeof el.scrollTo === "function") {
        el.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    } catch {}

    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      window.scrollTo(0, 0);
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  document.addEventListener("scroll", handleScroll, { passive: true, capture: true });
  window.addEventListener("touchmove", handleScroll, { passive: true });
  window.addEventListener("orientationchange", handleScroll, { passive: true });

  scrollBtn.addEventListener("click", scrollToTop);
  scrollBtn.addEventListener("touchend", scrollToTop, { passive: true });

  setVisible(getScrollTop() > 320);
  handleScroll();

  let ticks = 0;
  const interval = window.setInterval(() => {
    ticks += 1;
    handleScroll();
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

function at(key, params = {}) {
  return window.PortalAdminI18n?.t?.(`runtime.${key}`, params) || key;
}

function adminCurrency(amount) {
  if (window.PortalAdminI18n?.formatCurrency) {
    return window.PortalAdminI18n.formatCurrency(amount);
  }
  return "Rp " + Number(amount || 0).toLocaleString("id-ID");
}

/* =========================
   CEK LOGIN USER
   (dashboard ini menampilkan riwayat zakat
   milik pengguna yang sedang login)
========================= */
function getLegacyUser() {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
}

function getCurrentUser() {
  try {
    const portalUser = window.PortalAuth?.getCurrentUser?.();
    if (portalUser && portalUser.email) return portalUser;
  } catch {}

  const legacy = getLegacyUser();
  if (legacy && legacy.email) return legacy;
  return null;
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    scheduleAdminLoad();
  });
} else {
  scheduleAdminLoad();
}

window.addEventListener("portal-language-change", () => {
  loadAdminData();
});

window.addEventListener("storage", (event) => {
  if (event.key === "siteLang" || event.key === "user" || event.key === "islamiPortalSession") {
    loadAdminData();
  }
});

function scheduleAdminLoad() {
  let attempts = 0;
  const tick = () => {
    attempts += 1;
    loadAdminData();
    const user = getCurrentUser();
    if (user && user.email) return;
    if (attempts >= 10) return;
    setTimeout(tick, 80);
  };
  tick();
}

/* =========================
   LOAD DATA ADMIN
========================= */
function loadAdminData() {
  zakatHistory = [];
  const user = getCurrentUser();
  if (!user || !user.email) {
    renderTable();
    renderStats();
    return;
  }

  const typeLabel = at("typeZakat") || "Zakat";
  const isAdmin = false;

  const pushHistory = (owner, raw) => {
    if (!Array.isArray(raw)) return;
    const displayName = owner.name || owner.fullName || owner.email || at("fallbackUser");
    const email = owner.email || at("localUserEmail") || "";
    raw.forEach((item) => {
      zakatHistory.push({
        name: displayName,
        email,
        type: typeLabel,
        amount: Number(item?.amount || item?.total || 0),
        date: item?.date || item?.createdAt || new Date().toISOString()
      });
    });
  };

  const key = "zakatHistory_" + user.email;
  let raw = [];
  try {
    raw = JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    raw = [];
  }
  pushHistory(user, raw);

  renderTable();
  renderStats();
  drawMonthlyChart();
  loadDashboardStats(zakatHistory);
  drawYearlyChart(zakatHistory);
}

/* =========================
   RENDER TABLE
========================= */
function renderTable() {
  const tableBody = document.getElementById("zakat-table") || document.querySelector("tbody");
  if (!tableBody) return;

  tableBody.innerHTML = "";

  zakatHistory.forEach(item => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = item.name || at("fallbackUser");

    const typeCell = document.createElement("td");
    typeCell.textContent = item.type || at("fallbackType");

    const amountCell = document.createElement("td");
    amountCell.textContent = adminCurrency(item.amount);

    const dateCell = document.createElement("td");
    dateCell.textContent = item.date;

    row.appendChild(nameCell);
    row.appendChild(typeCell);
    row.appendChild(amountCell);
    row.appendChild(dateCell);

    tableBody.appendChild(row);
  });
}

/* =========================
   RENDER STATS
========================= */
function renderStats() {
  const totalUsersEl = document.getElementById("total-users");
  const totalZakatEl = document.getElementById("total-zakat");

  let total = 0;
  let transaksi = 0;

  zakatHistory.forEach(item => {
    const value = Number(item.amount) || 0;
    if (value > 0) {
      total += value;
    }
    transaksi += 1;
  });

  if (totalUsersEl) totalUsersEl.textContent = String(transaksi);

  if (totalZakatEl)
    totalZakatEl.textContent = adminCurrency(total);
}

/* =========================
   GRAFIK BULANAN
========================= */
function drawMonthlyChart() {
  const ctxCandidates = document.querySelectorAll("#monthlyChart");
  const ctx = ctxCandidates && ctxCandidates.length
    ? ctxCandidates[ctxCandidates.length - 1]
    : document.getElementById("monthlyChart");
  if (!ctx) return;
  if (typeof window.Chart !== "function") return;

  const monthly = {};

  zakatHistory.forEach(item => {
    if (!item.date) return;

    const date = new Date(item.date);
    const key =
      date.getFullYear() + "-" + (date.getMonth() + 1);

    monthly[key] = (monthly[key] || 0) + Number(item.amount || 0);
  });

  const labels = Object.keys(monthly).sort();
  const values = labels.map(k => monthly[k]);

  try {
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: at("chartTotal"),
          data: values
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }
    });
  } catch {}
}

/* =========================
   DASHBOARD STATS
========================= */
function loadDashboardStats(history) {
  let total = 0;
  let users = new Set();

  history.forEach(item => {
    total += Number(item.amount) || 0;
    users.add(item.email || item.name);
  });

  const totalZakatEl = document.getElementById("stat-total-zakat");
  const totalTransEl = document.getElementById("stat-total-transaksi");
  const totalUserEl = document.getElementById("stat-total-user");

  if (totalZakatEl)
    totalZakatEl.textContent = adminCurrency(total);

  if (totalTransEl)
    totalTransEl.textContent = history.length;

  if (totalUserEl)
    totalUserEl.textContent = users.size;
}

/* =========================
   GRAFIK TAHUNAN
========================= */
function drawYearlyChart(history) {
  const ctx = document.getElementById("yearlyChart");
  if (!ctx) return;
  if (typeof window.Chart !== "function") return;

  const yearly = {};

  history.forEach(item => {
    if (!item.date) return;

    let year;

    if (item.date.includes("/")) {
      year = item.date.split("/")[2];
    } else {
      year = new Date(item.date).getFullYear();
    }

    const value = Number(item.amount) || 0;

    if (!yearly[year]) yearly[year] = 0;
    yearly[year] += value;
  });

  const labels = Object.keys(yearly);
  const values = Object.values(yearly);

  if (labels.length === 0) return;

  try {
    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [{
          label: at("chartYearly"),
          data: values,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  } catch {}
}

/* =========================
   EXPORT CSV
========================= */
function exportToExcel() {
  if (!zakatHistory.length) {
    alert(at("noData"));
    return;
  }

  let csv = at("csvHeader") + "\n";

  zakatHistory.forEach(item => {
    csv += `${item.name},${item.type},${item.amount},${item.date}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = at("csvFile");
  a.click();

  URL.revokeObjectURL(url);
}

/* =========================
   EXPORT PDF
========================= */
function exportToPDF() {
  window.print();
}

/* =========================
   RESET DATA
========================= */
function resetAllData() {
  const confirmReset = confirm(
    at("confirmResetData")
  );

  if (!confirmReset) return;

  const keysToDelete = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (
      key.startsWith("zakatHistory_") ||
      key === "zakatMonthly"
    ) {
      keysToDelete.push(key);
    }
  }

  keysToDelete.forEach(key =>
    localStorage.removeItem(key)
  );

  alert(at("resetDone"));
  location.reload();
}
