(function(){
  try {
    var lang = localStorage.getItem("siteLang") || "id";
    if (lang === "ar") {
      document.documentElement.setAttribute("dir", "rtl");
      document.documentElement.setAttribute("lang", "ar");
      document.documentElement.classList.add("rtl-ui");
    }
  } catch(e) {}
})();
