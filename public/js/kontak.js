var SITE_LANGS = window.SITE_LANGS || (window.SITE_LANGS = ["id", "en", "ar"]);

const kontakUiText = {
  id: {
    copied_email: "Email disalin",
    copied_whatsapp: "Nomor WhatsApp disalin"
  },
  en: {
    copied_email: "Email copied",
    copied_whatsapp: "WhatsApp number copied"
  },
  ar: {
    copied_email: "تم نسخ البريد الإلكتروني",
    copied_whatsapp: "تم نسخ رقم واتساب"
  }
};

function normalizeLang(lang = "id") {
  return SITE_LANGS.includes(lang) ? lang : "id";
}

function t(key) {
  const lang = normalizeLang(localStorage.getItem("siteLang") || "id");
  return kontakUiText[lang]?.[key] || kontakUiText.id[key] || key;
}

(function () {
  function createRipple(event, element) {
    const circle = document.createElement("span");
    circle.className = "ripple";

    const rect = element.getBoundingClientRect();
    circle.style.left = `${event.clientX - rect.left}px`;
    circle.style.top = `${event.clientY - rect.top}px`;

    element.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  }

  function showToast(message) {
    let toast = document.querySelector(".contact-toast");

    if (!toast) {
      toast = document.createElement("div");
      toast.className = "contact-toast";
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 2200);
  }

  function initKontak() {
    const links = document.querySelectorAll(".contact-link");
    if (!links.length) return;

    links.forEach((link) => {
      if (link.dataset.kontakBound === "true") return;
      link.dataset.kontakBound = "true";

      link.addEventListener("click", (event) => {
        createRipple(event, link);
      });

      link.addEventListener("click", () => {
        let textToCopy = "";

        if (link.href.startsWith("mailto:")) {
          textToCopy = link.textContent.trim();
          showToast(t("copied_email"));
        }

        if (link.href.includes("wa.me")) {
          textToCopy = link.href.split("wa.me/")[1];
          showToast(t("copied_whatsapp"));
        }

        if (textToCopy) {
          navigator.clipboard.writeText(textToCopy);
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initKontak);
  } else {
    initKontak();
  }
})();
