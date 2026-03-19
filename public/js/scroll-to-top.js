(function () {
  function initScrollToTop() {
    const scrollBtn = document.getElementById("scrollToTopBtn");
    if (!scrollBtn) return;

    if (scrollBtn.dataset.scrollTopBound === "true") return;
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
      if (currentScrollY > 320) {
        setVisible(true);
      } else if (currentScrollY < 220) {
        setVisible(false);
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

    scrollBtn.addEventListener("click", scrollToTop);
    scrollBtn.addEventListener("touchend", scrollToTop, { passive: true });

    setVisible(getScrollTop() > 320);
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
