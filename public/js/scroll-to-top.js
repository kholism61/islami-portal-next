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
    document.addEventListener("scroll", handleScroll, { passive: true, capture: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });
    window.addEventListener("orientationchange", handleScroll, { passive: true });

    const interval = window.setInterval(handleScroll, 350);
    window.addEventListener(
      "beforeunload",
      () => {
        try {
          window.clearInterval(interval);
        } catch {}
      },
      { once: true }
    );

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

  function scheduleInit() {
    try {
      initScrollToTop();
    } catch {}
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleInit);
  }

  window.addEventListener("load", scheduleInit, { once: true });
  window.addEventListener("pageshow", scheduleInit);
  document.addEventListener("visibilitychange", scheduleInit);

  scheduleInit();

  let attempts = 0;
  const initPoller = window.setInterval(() => {
    attempts += 1;
    scheduleInit();
    if (document.getElementById("scrollToTopBtn")?.dataset?.scrollTopBound === "true") {
      window.clearInterval(initPoller);
      return;
    }
    if (attempts >= 30) {
      window.clearInterval(initPoller);
    }
  }, 400);
})();
