(function () {
  function safeText(el, text) {
    if (!el) return;
    el.textContent = text || "";
  }

  async function loadApod() {
    var titleEl = document.getElementById("falak-apod-title");
    var wrapEl = document.getElementById("falak-apod-wrap");
    if (!titleEl || !wrapEl) return;

    safeText(titleEl, "Memuat...");

    try {
      var res = await fetch(
        "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"
      );
      var data = await res.json();

      safeText(titleEl, data.title || "Astronomy Picture of the Day");

      var imgEl = wrapEl.querySelector(".falak-apod-img");
      var capEl = wrapEl.querySelector(".falak-apod-caption");

      if (data.media_type === "image" && imgEl) {
        imgEl.src = data.url;
        imgEl.alt = data.title || "";
      } else if (imgEl) {
        imgEl.removeAttribute("src");
      }

      if (capEl) {
        capEl.textContent = data.explanation || "";
        if (data.media_type !== "image" && data.url) {
          capEl.textContent =
            (capEl.textContent ? capEl.textContent + "\n\n" : "") +
            "Media: " +
            data.url;
        }
      }
    } catch (e) {
      safeText(titleEl, "Gagal memuat NASA APOD");
    }
  }

  function initMap() {
    var mapEl = document.getElementById("falak-map");
    if (!mapEl) return;
    if (!window.L) return;

    try {
      var kaabaLat = 21.4225;
      var kaabaLon = 39.8262;

      var map = window.L.map(mapEl, {
        scrollWheelZoom: false,
      }).setView([kaabaLat, kaabaLon], 3);

      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 18,
      }).addTo(map);

      window.L.marker([kaabaLat, kaabaLon])
        .addTo(map)
        .bindPopup("Ka'bah (Makkah)");

      setTimeout(function () {
        map.invalidateSize();
      }, 250);
    } catch (e) {
      // ignore
    }
  }

  function bootstrap() {
    loadApod();
    initMap();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap);
  } else {
    bootstrap();
  }
})();
