(function () {
  function rt(key, params = {}) {
    return window.PortalAdminI18n?.t?.(`runtime.${key}`, params) || key;
  }

  function translateRole(role) {
    const value = String(role || "").trim().toLowerCase();
    if (value === "admin") return rt("roleAdmin");
    if (value === "member") return rt("roleMember");
    if (value === "editor") return rt("roleEditor");
    return role || "-";
  }

  function extractAuditActor(item) {
    const email = String(item?.email || "").trim();
    const raw = String(item?.message || "").trim();
    const patterns = [
      /^(.*?)\s+(masuk ke portal|keluar dari portal|membuat akun baru)$/i,
      /^(.*?)\s+(signed in to the portal|signed out from the portal|created a new account)$/i,
      /^(.*?)\s+(سجل الدخول إلى البوابة|سجل الخروج من البوابة|أنشأ حسابًا جديدًا)$/i
    ];

    for (const pattern of patterns) {
      const match = raw.match(pattern);
      if (match && match[1]) return match[1].trim();
    }

    if (email.includes("@")) return email.split("@")[0];
    return raw || rt("fallbackUser");
  }

  function getAuditActionLabel(type) {
    const value = String(type || "").trim().toLowerCase();
    if (value === "signin") return rt("auditSignin");
    if (value === "signup") return rt("auditSignup");
    if (value === "signout") return rt("auditSignout");
    return value || "-";
  }

  function getAuditMessage(item) {
    const actor = extractAuditActor(item);
    return `${actor} ${getAuditActionLabel(item?.type)}`;
  }

  function safeParse(value, fallback) {
    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  }

  function formatCurrency(amount) {
    if (window.PortalAdminI18n?.formatCurrency) {
      return window.PortalAdminI18n.formatCurrency(amount);
    }
    return `Rp ${Number(amount || 0).toLocaleString("id-ID")}`;
  }

  function normalizeDate(value) {
    if (!value) return "-";

    const directDate = new Date(value);
    if (!Number.isNaN(directDate.getTime())) {
      return window.PortalAuth.formatDate(value);
    }

    if (typeof value === "string" && value.includes("/")) {
      return value;
    }

    return String(value);
  }

  function collectTransactions() {
    const transactions = [];

    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (!key) continue;

      if (key.startsWith("zakatHistory_")) {
        const email = key.replace("zakatHistory_", "") || rt("localUserEmail");
        const items = safeParse(localStorage.getItem(key), []);

        if (!Array.isArray(items)) continue;

        items.forEach((item) => {
          transactions.push({
            name: item.name || email,
            category: item.type || rt("fallbackType"),
            amount: Number(item.amount || item.total || 0),
            date: item.date || item.createdAt || "-"
          });
        });
      }

      if (key.startsWith("donationHistory_") || key.startsWith("donasiHistory_")) {
        const items = safeParse(localStorage.getItem(key), []);

        if (!Array.isArray(items)) continue;

        items.forEach((item) => {
          transactions.push({
            name: item.name || item.email || rt("fallbackDonor"),
            category: item.type || rt("fallbackDonationType"),
            amount: Number(item.amount || item.nominal || 0),
            date: item.date || item.createdAt || "-"
          });
        });
      }
    }

    return transactions.sort((left, right) => {
      const leftDate = new Date(left.date).getTime() || 0;
      const rightDate = new Date(right.date).getTime() || 0;
      return rightDate - leftDate;
    });
  }

  function collectCategoryStats(transactions) {
    const bookmarks = safeParse(localStorage.getItem("bookmarks"), []);
    const offlineArticles = safeParse(localStorage.getItem("offlineArticles"), []);
    const readingProgress = safeParse(localStorage.getItem("readingProgress"), {});

    const map = new Map();

    transactions.forEach((item) => {
      const label = item.category || rt("fallbackCategory");
      map.set(label, (map.get(label) || 0) + 1);
    });

    map.set(rt("catBookmark"), Array.isArray(bookmarks) ? bookmarks.length : 0);
    map.set(rt("catOffline"), Array.isArray(offlineArticles) ? offlineArticles.length : 0);
    map.set(rt("catReading"), Object.keys(readingProgress || {}).length);

    return Array.from(map.entries())
      .map(([label, value]) => ({ label, value }))
      .sort((left, right) => right.value - left.value);
  }

  function renderUsers(users) {
    const body = document.getElementById("usersTableBody");
    if (!body) return;

    if (!users.length) {
      body.innerHTML = `<tr><td colspan="4" class="empty-state">${rt("emptyUsers")}</td></tr>`;
      return;
    }

    body.innerHTML = users
      .slice(0, 8)
      .map((user) => `
        <tr>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td><span class="role-pill ${user.role}">${translateRole(user.role)}</span></td>
          <td>${window.PortalAuth.formatDate(user.createdAt)}</td>
        </tr>
      `)
      .join("");
  }

  function renderTransactions(transactions) {
    const body = document.getElementById("transactionsTableBody");
    if (!body) return;

    if (!transactions.length) {
      body.innerHTML = `<tr><td colspan="4" class="empty-state">${rt("emptyTransactions")}</td></tr>`;
      return;
    }

    body.innerHTML = transactions
      .slice(0, 8)
      .map((item) => `
        <tr>
          <td>${item.name}</td>
          <td>${item.category}</td>
          <td>${formatCurrency(item.amount)}</td>
          <td>${normalizeDate(item.date)}</td>
        </tr>
      `)
      .join("");
  }

  function renderCategoryStats(items) {
    const wrapper = document.getElementById("categoryStats");
    if (!wrapper) return;

    if (!items.length) {
      wrapper.innerHTML = `<p class="empty-state">${rt("emptyCategories")}</p>`;
      return;
    }

    const maxValue = Math.max(...items.map((item) => item.value), 1);

    wrapper.innerHTML = items
      .slice(0, 6)
      .map((item) => {
        const percentage = Math.max(8, Math.round((item.value / maxValue) * 100));
        return `
          <div class="metric-row">
            <div class="metric-copy">
              <strong>${item.label}</strong>
              <small>${item.value} ${rt("activitySuffix")}</small>
            </div>
            <div class="metric-bar">
              <span class="metric-fill" style="width:${percentage}%"></span>
            </div>
          </div>
        `;
      })
      .join("");
  }

  function renderAudit() {
    const auditList = document.getElementById("auditList");
    if (!auditList) return;

    const audit = window.PortalAuth.getAuditLog();

    if (!audit.length) {
      auditList.innerHTML = `<li>${rt("emptyAudit")}</li>`;
      return;
    }

    auditList.innerHTML = audit
      .slice(0, 6)
      .map((item) => `
        <li>
          <strong>${getAuditActionLabel(item.type)}</strong><br>
          ${getAuditMessage(item)}<br>
          <small>${item.email || rt("noEmail")} - ${window.PortalAuth.formatDate(item.timestamp)}</small>
        </li>
      `)
      .join("");
  }

  function renderStats(users, transactions) {
    const adminCount = users.filter((user) => user.role === "admin").length;
    const totalAmount = transactions.reduce((sum, item) => sum + Number(item.amount || 0), 0);

    const totalUsers = document.getElementById("totalUsers");
    const totalAdmins = document.getElementById("totalAdmins");
    const totalTransactions = document.getElementById("totalTransactions");
    const totalCollections = document.getElementById("totalCollections");
    const heroUserCount = document.getElementById("heroUserCount");
    const heroTransactionCount = document.getElementById("heroTransactionCount");

    if (totalUsers) totalUsers.textContent = String(users.length);
    if (totalAdmins) totalAdmins.textContent = String(adminCount);
    if (totalTransactions) totalTransactions.textContent = String(transactions.length);
    if (totalCollections) totalCollections.textContent = formatCurrency(totalAmount);
    if (heroUserCount) heroUserCount.textContent = `${users.length} ${rt("userSuffix")}`;
    if (heroTransactionCount) heroTransactionCount.textContent = `${transactions.length} ${rt("trxSuffix")}`;
  }

  function exportUsers(users) {
    const rows = [rt("exportUsersHeader")];
    users.forEach((user) => {
      rows.push(`"${user.name}","${user.email}","${translateRole(user.role)}","${user.createdAt}"`);
    });

    const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = rt("exportUsersFile");
    link.click();
    URL.revokeObjectURL(link.href);
  }

  function clearAnalytics() {
    const removableKeys = [];

    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (!key) continue;

      if (
        key.startsWith("zakatHistory_") ||
        key.startsWith("donationHistory_") ||
        key.startsWith("donasiHistory_") ||
        [
          "zakatMonthly",
          "bookmarks",
          "offlineArticles",
          "readingProgress",
          "readingHistory",
          "totalArticlesRead",
          "readingTime",
          "readingStreak",
          "haid_history"
        ].includes(key)
      ) {
        removableKeys.push(key);
      }
    }

    removableKeys.forEach((key) => localStorage.removeItem(key));
  }

  document.addEventListener("DOMContentLoaded", () => {
    const adminUser = window.PortalAuth.requireAuth({ adminOnly: true });
    if (!adminUser) return;

    const adminIdentity = document.getElementById("adminIdentity");
    const logoutButton = document.getElementById("logoutButton");
    const exportUsersButton = document.getElementById("exportUsersButton");
    const clearAnalyticsButton = document.getElementById("clearAnalyticsButton");

    const users = window.PortalAuth.getUsers().sort((left, right) => {
      const leftDate = new Date(left.createdAt).getTime() || 0;
      const rightDate = new Date(right.createdAt).getTime() || 0;
      return rightDate - leftDate;
    });
    const transactions = collectTransactions();
    const categoryStats = collectCategoryStats(transactions);

    if (adminIdentity) {
      adminIdentity.textContent = `${adminUser.name} (${translateRole(adminUser.role)})`;
    }

    renderStats(users, transactions);
    renderUsers(users);
    renderTransactions(transactions);
    renderCategoryStats(categoryStats);
    renderAudit();

    if (logoutButton) {
      logoutButton.addEventListener("click", () => {
        window.PortalAuth.logout();
        const host = window.location.hostname;
        const isLocalDev = host === "localhost" || host === "127.0.0.1";
        window.location.href = isLocalDev ? "signin.html" : "/signin";
      });
    }

    if (exportUsersButton) {
      exportUsersButton.addEventListener("click", () => exportUsers(users));
    }

    if (clearAnalyticsButton) {
      clearAnalyticsButton.addEventListener("click", () => {
        const approved = window.confirm(rt("confirmResetAnalytics"));
        if (!approved) return;

        clearAnalytics();
        window.location.reload();
      });
    }
  });
})();

