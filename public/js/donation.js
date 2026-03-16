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

document.addEventListener("DOMContentLoaded", () => {
  const copyButtons = document.querySelectorAll(".copy-btn");

  copyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.copy;
      const text = document.getElementById(targetId)?.innerText;
      if (!text) return;

      navigator.clipboard.writeText(text).then(() => {
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
});
