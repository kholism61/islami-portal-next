(function () {
  function initScrollToTop() {
    const scrollBtn = document.getElementById("scrollToTopBtn");
    if (!scrollBtn) return;

    if (scrollBtn.dataset.scrollTopBound === "true") return;
    scrollBtn.dataset.scrollTopBound = "true";

    function handleScroll() {
      const currentScrollY =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      if (currentScrollY > 320) {
        scrollBtn.classList.add("show");
      } else if (currentScrollY < 220) {
        scrollBtn.classList.remove("show");
      }
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
