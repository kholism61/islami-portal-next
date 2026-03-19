function initNavActive() {
  // =====================
  // NAV ACTIVE
  // =====================
  const links = document.querySelectorAll(".nav-links a");

  let currentPage = location.pathname.split("/").pop();

  if (currentPage === "") {
    currentPage = "index.html";
  }

  const currentKey = currentPage.endsWith(".html") ? currentPage : `${currentPage}.html`;

  links.forEach((link) => {
    const linkPage = link.getAttribute("href");
    const linkKey = linkPage?.endsWith(".html") ? linkPage : `${linkPage}.html`;

    if (
      linkPage === currentPage ||
      linkPage === `/${currentPage}` ||
      linkKey === currentKey ||
      linkPage === `/${currentKey}` ||
      (currentKey === "index.html" && linkPage === "/")
    ) {
      link.classList.add("active");
    }
  });

  // =====================
  // PREFOOTER FILTER LINK
  // =====================
  document.querySelectorAll(".prefooter-col a[data-filter]").forEach((link) => {
    link.onclick = (e) => {
      e.preventDefault();

      const filter = link.dataset.filter;
      const sidebarLink = document.querySelector(`[data-filter="${filter}"]`);

      if (sidebarLink) {
        sidebarLink.click();
      }

      document.getElementById("articles-container")?.scrollIntoView({ behavior: "smooth" });
    };
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNavActive);
} else {
  initNavActive();
}
