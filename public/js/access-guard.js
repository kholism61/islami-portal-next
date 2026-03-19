(function () {
  const pathname = window.location.pathname || "/index.html";
  const currentPath = pathname === "/" ? "index.html" : pathname.replace(/^\//, "");
  const pageName = currentPath.split("/").pop() || "index.html";
  const pageKey = pageName.endsWith(".html") ? pageName : `${pageName}.html`;
  const host = window.location.hostname;
  const isLocalDev = host === "localhost" || host === "127.0.0.1";
  const PUBLIC_PAGES = new Set([
    "",
    "index.html",
    "index",
    "signin.html",
    "signin",
    "signup.html",
    "signup",
    "article.html",
    "article",
    "zakat-info.html",
    "zakat-info",
    "donasi.html",
    "donasi",
    "kontak.html",
    "kontak",
    "faq.html",
    "faq",
    "disclaimer.html",
    "disclaimer",
    "privacy.html",
    "privacy",
    "about.html"
    ,"about"
  ]);

  if (PUBLIC_PAGES.has(pageName) || PUBLIC_PAGES.has(pageKey)) {
    return;
  }

  if (!window.PortalAuth || !window.PortalAuth.getCurrentUser) {
    return;
  }

  const user = window.PortalAuth.getCurrentUser();
  if (user) {
    return;
  }

  const target = `${currentPath}${window.location.search || ""}${window.location.hash || ""}`;
  const signinPath = "/signin";
  window.location.replace(`${signinPath}?next=${encodeURIComponent(target)}`);
})();
