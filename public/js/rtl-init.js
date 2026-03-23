(function(){
  try {
    var lang = localStorage.getItem("siteLang") || "id";
    if (lang === "ar") {
      document.documentElement.setAttribute("dir", "rtl");
      document.documentElement.setAttribute("lang", "ar");
      document.documentElement.classList.add("rtl-ui");
      if (document.body) document.body.classList.add("rtl-ui");
      else document.addEventListener("DOMContentLoaded", function(){ document.body.classList.add("rtl-ui"); }, { once: true });
    }
  } catch(e) {}
})();
