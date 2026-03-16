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
    "signin.html",
    "signup.html",
    "article.html",
    "donasi.html",
    "kontak.html",
    "faq.html",
    "disclaimer.html",
    "privacy.html",
    "about.html"
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
  const signinPath = isLocalDev ? "/signin.html" : "/signin";
  window.location.replace(`${signinPath}?next=${encodeURIComponent(target)}`);
})();
