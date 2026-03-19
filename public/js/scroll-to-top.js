(function () {
  function initScrollToTop() {
    const scrollBtn = document.getElementById("scrollToTopBtn");
    if (!scrollBtn) return;

    if (scrollBtn.dataset.scrollTopBound === "true") return;
    scrollBtn.dataset.scrollTopBound = "true";

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
      try {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch {
        window.scrollTo(0, 0);
      }
    });

    handleScroll();
  }

  if (typeof document === "undefined") return;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initScrollToTop);
  } else {
    initScrollToTop();
  }
})();
