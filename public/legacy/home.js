(function () {
  function safeParse(value, fallback) {
    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  }

  function updateBookmarkBadge() {
    const badge = document.querySelector(".bookmark-count");
    if (!badge) return;

    const saved = safeParse(localStorage.getItem("bookmarks"), []);
    const count = Array.isArray(saved) ? saved.length : 0;
    badge.textContent = String(count);
    badge.style.display = count > 0 ? "flex" : "none";
  }

  function updateOfflineCount() {
    const el = document.getElementById("stat-offline");
    if (!el) return;

    const offline = safeParse(localStorage.getItem("offlineArticles"), {});
    const count = offline && typeof offline === "object" ? Object.keys(offline).length : 0;
    el.textContent = String(count);
  }

  function setupThemeToggle() {
    const btn = document.getElementById("themeToggle");
    if (!btn) return;

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      btn.textContent = "☀️";
    }

    btn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");
      btn.textContent = isDark ? "☀️" : "🌙";
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  function setupLangDropdown() {
    const wrapper = document.getElementById("langDropdown");
    const btn = document.getElementById("langBtn");
    if (!wrapper || !btn) return;

    btn.addEventListener("click", (event) => {
      event.preventDefault();
      wrapper.classList.toggle("active");
    });

    document.addEventListener("click", (event) => {
      if (!wrapper.contains(event.target)) {
        wrapper.classList.remove("active");
      }
    });
  }

  function setupSidebar() {
    const btn = document.getElementById("menuBtn");
    const sidebar = document.getElementById("sidebar");
    if (!btn || !sidebar) return;

    btn.addEventListener("click", () => {
      sidebar.classList.toggle("active");
    });

    document.addEventListener("click", (event) => {
      if (sidebar.classList.contains("active")) {
        if (event.target === btn) return;
        if (!sidebar.contains(event.target)) {
          sidebar.classList.remove("active");
        }
      }
    });
  }

  function setupOfflineIndicator() {
    const el = document.getElementById("offline-indicator");
    if (!el) return;

    function sync() {
      const online = navigator.onLine;
      el.classList.toggle("offline", !online);
      el.textContent = online ? "🌐 Online" : "📴 Offline";
    }

    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    sync();
  }

  function init() {
    setupThemeToggle();
    setupLangDropdown();
    setupSidebar();
    setupOfflineIndicator();

    updateBookmarkBadge();
    updateOfflineCount();

    window.addEventListener("storage", () => {
      updateBookmarkBadge();
      updateOfflineCount();
    });

    window.addEventListener("focus", () => {
      updateBookmarkBadge();
      updateOfflineCount();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
