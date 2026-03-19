const SITE_LANGS = ["id", "en", "ar"];

const donationUiText = {
  id: {
    copied: "Tersalin"
  },
  en: {
    copied: "Copied"
  },
  ar: {
    copied: "تم النسخ"
  }
};

function normalizeLang(lang = "id") {
  return SITE_LANGS.includes(lang) ? lang : "id";
}

function t(key) {
  const lang = normalizeLang(localStorage.getItem("siteLang") || "id");
  return donationUiText[lang]?.[key] || donationUiText.id[key] || key;
}

(function () {
  function syncQrisState(toggle, card, icon, isOpen) {
    card.classList.toggle("qris-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));

    if (icon) {
      icon.textContent = isOpen ? "-" : "+";
      icon.setAttribute("aria-hidden", "true");
    }
  }

  function copyToClipboard(text) {
    if (!text) return Promise.resolve(false);

    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      return navigator.clipboard
        .writeText(text)
        .then(() => true)
        .catch(() => false);
    }

    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.top = "-9999px";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return Promise.resolve(Boolean(ok));
    } catch {
      return Promise.resolve(false);
    }
  }

  function initQrisToggle() {
    const toggle = document.querySelector(".qris-toggle");
    const content = document.querySelector(".qris-content");
    const icon = document.querySelector(".qris-toggle .qris-icon");
    const card = toggle?.closest?.(".donation-card") || document.querySelector(".donation-card");

    if (!toggle || !content || !card) return;
    if (toggle.dataset.qrisBound === "true") return;
    toggle.dataset.qrisBound = "true";

    syncQrisState(toggle, card, icon, card.classList.contains("qris-open"));

    toggle.addEventListener("click", () => {
      const isOpen = !card.classList.contains("qris-open");
      syncQrisState(toggle, card, icon, isOpen);
    });
  }

  function initDonation() {
    initQrisToggle();

    const copyButtons = document.querySelectorAll(".copy-btn");
    if (!copyButtons.length) return;

    copyButtons.forEach((button) => {
      if (button.dataset.copyBound === "true") return;
      button.dataset.copyBound = "true";

      button.addEventListener("click", () => {
        const targetId = button.dataset.copy;
        const text = document.getElementById(targetId)?.innerText;
        if (!text) return;

        copyToClipboard(text).then((success) => {
          if (!success) return;
          const original = button.innerHTML;
          button.innerHTML = `&#10003; ${t("copied")}`;
          button.classList.add("copied");

          setTimeout(() => {
            button.innerHTML = original;
            button.classList.remove("copied");
          }, 1500);
        });
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDonation);
  } else {
    initDonation();
  }
})();
