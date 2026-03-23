(function () {
  const ROTATE_INTERVAL = 5000;
  const MAX_ADS = 5;

  function initHomeAds() {
    const container = document.querySelector(".home-ads-banner");
    if (!container) return;

    const slides = container.querySelectorAll(".home-ads-slide");
    const dotsContainer = document.querySelector(".home-ads-dots");
    const dots = dotsContainer ? dotsContainer.querySelectorAll(".home-ads-dot") : [];

    const total = Math.min(slides.length, MAX_ADS);
    if (total === 0) return;

    let currentIndex = 0;
    let rotateTimer = null;

    function showSlide(index) {
      const i = ((index % total) + total) % total;
      currentIndex = i;

      slides.forEach((el, idx) => {
        el.classList.toggle("active", idx === i);
      });

      dots.forEach((el, idx) => {
        el.classList.toggle("active", idx === i);
      });
    }

    function next() {
      showSlide(currentIndex + 1);
    }

    function startRotate() {
      if (rotateTimer) clearInterval(rotateTimer);
      rotateTimer = setInterval(next, ROTATE_INTERVAL);
    }

    function stopRotate() {
      if (rotateTimer) {
        clearInterval(rotateTimer);
        rotateTimer = null;
      }
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener("click", () => {
        showSlide(idx);
        stopRotate();
        startRotate();
      });
    });

    showSlide(0);
    startRotate();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHomeAds);
  } else {
    initHomeAds();
  }
})();
