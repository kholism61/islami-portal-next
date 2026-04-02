(function () {
  const STORAGE_KEYS = {
    session: "islamiPortalSession",
    audit: "islamiPortalAudit",
    legacyUser: "user",
    attempts: "islamiPortalLoginAttempts"
  };

  const ADMIN_EMAILS = [
    "nurcholism51@gmail.com"
  ];

  const API = {
    signup: "/api/auth/signup",
    signin: "/api/auth/signin",
    signout: "/api/auth/signout",
    me: "/api/auth/me"
  };

  function rt(key, params = {}) {
    return window.PortalAdminI18n?.t?.(`runtime.${key}`, params) || params.fallback || key;
  }

  function currentLocale() {
    const lang = localStorage.getItem("siteLang") || "id";
    if (lang === "ar") return "ar-EG";
    if (lang === "en") return "en-US";
    return "id-ID";
  }

  function defaultUserLabel() {
    return rt("fallbackUser", { fallback: "Portal User" });
  }

  function auditActionText(type) {
    if (type === "signin") return rt("auditSignin", { fallback: "Signed in to the portal" });
    if (type === "signup") return rt("auditSignup", { fallback: "Created a new account" });
    if (type === "signout") return rt("auditSignout", { fallback: "Signed out from the portal" });
    return type;
  }

  function safeParse(value, fallback) {
    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  }

  function getAttemptsStore() {
    const store = safeParse(localStorage.getItem(STORAGE_KEYS.attempts), {});
    return store && typeof store === "object" ? store : {};
  }

  function saveAttemptsStore(store) {
    localStorage.setItem(STORAGE_KEYS.attempts, JSON.stringify(store || {}));
  }

  function getAttemptState(email) {
    const key = normalizeEmail(email);
    const store = getAttemptsStore();
    const raw = store[key];
    if (!raw || typeof raw !== "object") return { count: 0, lockedUntil: 0 };
    return {
      count: Number(raw.count) || 0,
      lockedUntil: Number(raw.lockedUntil) || 0
    };
  }

  function clearAttemptState(email) {
    const key = normalizeEmail(email);
    const store = getAttemptsStore();
    delete store[key];
    saveAttemptsStore(store);
  }

  function registerFailedAttempt(email) {
    const key = normalizeEmail(email);
    if (!key) return;
    const now = Date.now();
    const store = getAttemptsStore();
    const current = getAttemptState(key);
    const nextCount = (current.count || 0) + 1;
    let lockedUntil = current.lockedUntil || 0;

    if (nextCount >= 5) {
      lockedUntil = Math.max(lockedUntil, now + 10 * 60 * 1000);
    }

    store[key] = { count: nextCount, lockedUntil };
    saveAttemptsStore(store);
  }

  function ensureNotLocked(email) {
    const key = normalizeEmail(email);
    const state = getAttemptState(key);
    const now = Date.now();
    if (state.lockedUntil && state.lockedUntil > now) {
      const seconds = Math.ceil((state.lockedUntil - now) / 1000);
      throw new Error(rt("errorLocked", { fallback: `Terlalu banyak percobaan. Coba lagi dalam ${seconds} detik.` }));
    }
  }

  function normalizeEmail(email) {
    return String(email || "").trim().toLowerCase();
  }

  function inferRole(email) {
    return ADMIN_EMAILS.includes(normalizeEmail(email)) ? "admin" : "member";
  }

  function normalizeSessionUser(user) {
    const email = normalizeEmail(user && user.email);
    return {
      id: String((user && user.id) || ""),
      name: String((user && user.name) || defaultUserLabel()),
      email,
      role: (user && user.role) === "admin" ? "admin" : inferRole(email),
      picture: String((user && user.picture) || ""),
      createdAt: (user && user.createdAt) || new Date().toISOString(),
      lastLoginAt: new Date().toISOString()
    };
  }

  function getUsers() {
    return [];
  }

  function buildSessionUser(user) {
    const normalizedUser = normalizeSessionUser(user);
    return {
      id: normalizedUser.id,
      name: normalizedUser.name,
      email: normalizedUser.email,
      role: normalizedUser.role,
      picture: normalizedUser.picture,
      createdAt: normalizedUser.createdAt,
      lastLoginAt: new Date().toISOString()
    };
  }

  function syncLegacyShape(sessionUser) {
    localStorage.setItem(
      STORAGE_KEYS.legacyUser,
      JSON.stringify({
        name: sessionUser.name,
        email: sessionUser.email,
        picture: sessionUser.picture || "",
        role: sessionUser.role
      })
    );
  }

  function pushAudit(type, message, email) {
    const audit = safeParse(localStorage.getItem(STORAGE_KEYS.audit), []);
    const nextAudit = Array.isArray(audit) ? audit : [];

    const normalizedEmail = normalizeEmail(email);
    const actorName = String(message || "").replace(/\s+(masuk ke portal|keluar dari portal|membuat akun baru|signed in to the portal|signed out from the portal|created a new account|سجل الدخول إلى البوابة|سجل الخروج من البوابة|أنشأ حسابًا جديدًا)$/i, "").trim() || (normalizedEmail.includes("@") ? normalizedEmail.split("@")[0] : defaultUserLabel());

    nextAudit.unshift({
      type,
      message: `${actorName} ${auditActionText(type)}`,
      email: normalizedEmail,
      timestamp: new Date().toISOString()
    });

    localStorage.setItem(STORAGE_KEYS.audit, JSON.stringify(nextAudit.slice(0, 12)));
  }

  function persistSession(user) {
    const sessionUser = buildSessionUser(user);
    localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(sessionUser));
    syncLegacyShape(sessionUser);
    return sessionUser;
  }

  function getSession() {
    const existingSession = safeParse(localStorage.getItem(STORAGE_KEYS.session), null);
    if (!existingSession || !existingSession.email) {
      return null;
    }

    const normalizedSession = buildSessionUser(existingSession);
    localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(normalizedSession));
    syncLegacyShape(normalizedSession);
    return normalizedSession;
  }

  function getCurrentUser() {
    return getSession();
  }

  async function hydrateSessionFromServer() {
    try {
      const res = await fetch(API.me, { credentials: "include", cache: "no-store" });
      const data = await res.json().catch(() => null);
      if (!data || !data.ok) return null;
      if (!data.user) {
        localStorage.removeItem(STORAGE_KEYS.session);
        localStorage.removeItem(STORAGE_KEYS.legacyUser);
        return null;
      }

      const sessionUser = buildSessionUser(data.user);
      localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(sessionUser));
      syncLegacyShape(sessionUser);
      return sessionUser;
    } catch {
      return null;
    }
  }

  function getAuditLog() {
    const audit = safeParse(localStorage.getItem(STORAGE_KEYS.audit), []);
    return Array.isArray(audit) ? audit : [];
  }

  function formatDate(value) {
    if (!value) return "-";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;

    return new Intl.DateTimeFormat(currentLocale(), {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);
  }

  function isLocalDevHost() {
    const host = window.location.hostname;
    return host === "localhost" || host === "127.0.0.1";
  }

  function toPageHref(value) {
    if (!value) return value;
    const trimmed = String(value).trim();
    if (!trimmed) return value;

    const withSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
    if (withSlash === "/index.html") return "/";
    return withSlash.replace(/\.html$/i, "");
  }

  function getPostLoginRedirect(user, next) {
    if (user && user.role === "admin") {
      return toPageHref("portal-admin.html");
    }

    if (next) {
      return toPageHref(next);
    }

    return toPageHref("index.html");
  }

  async function signup(payload) {
    const name = String(payload.name || "").trim();
    const email = normalizeEmail(payload.email);
    const password = String(payload.password || "");
    const confirmPassword = String(payload.confirmPassword || "");

    if (name.length < 3) {
      throw new Error(rt("errorNameMin", { fallback: "Name must be at least 3 characters." }));
    }

    if (!email.includes("@")) {
      throw new Error(rt("errorInvalidEmail", { fallback: "Invalid email address." }));
    }

    if (password.length < 6) {
      throw new Error(rt("errorPasswordMin", { fallback: "Password must be at least 6 characters." }));
    }

    if (password !== confirmPassword) {
      throw new Error(rt("errorPasswordMismatch", { fallback: "Password confirmation does not match." }));
    }

    const response = await fetch(API.signup, {
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, email, password, confirmPassword })
    });

    const data = await response.json().catch(() => null);
    if (!response.ok || !data || !data.ok) {
      throw new Error((data && data.error) || rt("errorSignup", { fallback: "Sign up failed." }));
    }

    const sessionUser = persistSession(data.user);
    pushAudit("signup", `${name} ${auditActionText("signup")}`, email);

    return {
      user: sessionUser,
      redirectTo: getPostLoginRedirect(sessionUser, payload.next)
    };
  }

  async function login(payload) {
    const email = normalizeEmail(payload.email);
    const password = String(payload.password || "");

    if (!email || !password) {
      throw new Error(rt("errorLoginRequired", { fallback: "Email and password are required." }));
    }

    ensureNotLocked(email);

    const response = await fetch(API.signin, {
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password })
    });

    const data = await response.json().catch(() => null);
    if (!response.ok || !data || !data.ok) {
      registerFailedAttempt(email);
      throw new Error((data && data.error) || rt("errorWrongPassword", { fallback: "Incorrect password." }));
    }

    clearAttemptState(email);

    const sessionUser = persistSession(data.user);
    pushAudit("signin", `${sessionUser.name} ${auditActionText("signin")}`, email);

    return {
      user: sessionUser,
      redirectTo: getPostLoginRedirect(sessionUser, payload.next)
    };
  }

  async function logout() {
    const currentUser = getCurrentUser();
    if (currentUser) {
      pushAudit("signout", `${currentUser.name} ${auditActionText("signout")}`, currentUser.email);
    }

    try {
      await fetch(API.signout, { method: "POST", credentials: "include" });
    } catch {}

    localStorage.removeItem(STORAGE_KEYS.session);
    localStorage.removeItem(STORAGE_KEYS.legacyUser);
  }

  function clearSession() {
    localStorage.removeItem(STORAGE_KEYS.session);
  }

  function requireAuth(options = {}) {
    const settings = {
      adminOnly: false,
      redirectTo: "/signin",
      ...options
    };

    const user = getCurrentUser();
    const currentPage = window.location.pathname.split("/").pop() || "portal-admin.html";
    const currentKey = currentPage.endsWith(".html") ? currentPage : `${currentPage}.html`;
    const nextTarget = toPageHref(currentKey);
    const redirectTo = toPageHref(settings.redirectTo);

    if (!user) {
      window.location.href = `${redirectTo}?next=${encodeURIComponent(nextTarget)}`;
      return null;
    }

    if (settings.adminOnly && user.role !== "admin") {
      const signinHref = toPageHref("signin.html");
      window.location.href = `${signinHref}?next=${encodeURIComponent(nextTarget)}&denied=1`;
      return null;
    }

    return user;
  }

  window.PortalAuth = {
    ADMIN_EMAILS,
    STORAGE_KEYS,
    clearSession,
    formatDate,
    getAuditLog,
    getCurrentUser,
    getPostLoginRedirect,
    getUsers,
    hydrateSessionFromServer,
    login,
    logout,
    pushAudit,
    requireAuth,
    signup,
    upsertUser: function () { return null; }
  };

  const BRAND_LABELS = new Set(["Portal Literasi Islam", "Islamic Literacy Portal", "بوابة الثقافة الإسلامية"]);

  function ensureNavBrandStyle() {
    if (document.getElementById("portal-brand-style")) return;
    const style = document.createElement("style");
    style.id = "portal-brand-style";
    style.textContent = `
      .portal-nav-brand {
        white-space: nowrap;
      }
      .portal-nav-brand .portal-brand-glass {
        width: 1.52em;
        height: 1.52em;
        border-radius: 0.44em;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        vertical-align: -0.28em;
        margin-inline-end: 0.42em;
        background: linear-gradient(145deg, rgba(45, 212, 191, 0.2), rgba(59, 130, 246, 0.24));
        border: 1px solid rgba(255, 255, 255, 0.28);
        box-shadow:
          0 8px 18px rgba(2, 10, 24, 0.28),
          inset 0 1px 0 rgba(255, 255, 255, 0.22);
        backdrop-filter: blur(6px);
      }
      .portal-nav-brand .portal-brand-icon {
        width: 0.92em;
        height: 0.92em;
        border-radius: 0.22em;
        object-fit: contain;
        filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
      }
      .portal-nav-brand .portal-brand-text {
        font-weight: 700;
        letter-spacing: 0.01em;
        background: linear-gradient(95deg, #f8fbff 0%, #7dd3fc 50%, #2dd4bf 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    `;
    document.head.appendChild(style);
  }

  function normalizeBrandText(text = "") {
    return String(text)
      .replace(/^[^\p{L}\p{N}\u0600-\u06FF]+/u, "")
      .replace(/[.\-•|:!]+$/u, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function iconifyNavBrand(root = document) {
    if (!document.body) return;
    ensureNavBrandStyle();

    const navBrandSelectors = [
      ".navbar .logo",
      ".navbar .nav-brand",
      ".navbar .logo-text",
      ".main-navbar .logo",
      ".main-navbar .nav-brand",
      ".main-navbar .logo-text",
      "header .logo",
      "header .nav-brand",
      ".ramadhan-navbar .logo"
    ];

    navBrandSelectors.forEach((selector) => {
      root.querySelectorAll(selector).forEach((el) => {
        if (el.dataset.portalBrandDone === "1") return;
        const normalized = normalizeBrandText(el.textContent);
        if (!BRAND_LABELS.has(normalized)) return;

        const iconSrc = "/favicon.ico";

        el.dataset.portalBrandDone = "1";
        el.classList.add("portal-nav-brand");
        el.innerHTML = `<span class="portal-brand-glass"><img class="portal-brand-icon" src="${iconSrc}" alt=""></span><span class="portal-brand-text">${normalized}</span>`;
      });
    });
  }

  function scheduleNavBrandIconify() {
    window.requestAnimationFrame(() => {
      iconifyNavBrand(document);
      window.dispatchEvent(new CustomEvent("portal-brand-ready"));
    });
  }

  hydrateSessionFromServer();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleNavBrandIconify, { once: true });
  } else {
    scheduleNavBrandIconify();
  }

  window.addEventListener("portal-language-change", scheduleNavBrandIconify);
})();
