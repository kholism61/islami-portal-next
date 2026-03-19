(function () {
  function initFaq() {
    const faqItems = document.querySelectorAll(".faq-item");
    if (!faqItems.length) return;

    faqItems.forEach((item) => {
      const btn = item.querySelector(".faq-question");
      if (!btn || btn.dataset.faqBound === "true") return;
      btn.dataset.faqBound = "true";

      btn.addEventListener("click", () => {
        faqItems.forEach((i) => {
          if (i !== item) i.classList.remove("active");
        });
        item.classList.toggle("active");
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFaq);
  } else {
    initFaq();
  }
})();