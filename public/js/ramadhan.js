const doaHarian = [
  {
    arab: "تَقَبَّلَ اللَّهُ مِنَّا وَمِنْكُمْ صَالِحَ الْأَعْمَالِ",
    id: "Taqabbalallahu minna wa minkum shalihal a'mal (Semoga Allah menerima amal ibadah kami dan kalian).",
    en: "May Allah accept (good deeds) from us and from you."
  },
  {
    arab: "اللهم قوِّ إيماننا وثبّت قلوبنا على دينك",
    id: "Ya Allah, kuatkan iman kami dan teguhkan hati kami di atas agama-Mu.",
    en: "O Allah, strengthen our faith and keep our hearts firm upon Your religion."
  },
  {
    arab: "اللهم تقبّل صيامنا وقيامنا وسائر أعمالنا",
    id: "Ya Allah, terimalah puasa, shalat malam, dan seluruh amal kami.",
    en: "O Allah, accept our fasting, night prayers, and all our deeds."
  },
  {
    arab: "اللهم اغفر لنا ذنوبنا ما تقدّم منها وما تأخر",
    id: "Ya Allah, ampunilah dosa-dosa kami yang telah lalu maupun yang akan datang.",
    en: "O Allah, forgive our past and future sins."
  },
  {
    arab: "اللهم وسّع علينا رزقنا وبارك لنا فيه",
    id: "Ya Allah, lapangkan rezeki kami dan berkahilah di dalamnya.",
    en: "O Allah, expand our sustenance and bless it."
  },
  {
    arab: "اللهم اجعلنا من أهل القرآن الذين هم أهلك وخاصتك",
    id: "Ya Allah, jadikan kami termasuk ahli Al-Qur'an yang Engkau muliakan.",
    en: "O Allah, make us among the people of the Qur'an, Your special servants."
  },
  {
    arab: "اللهم أجرنا من النار ونجّنا من عذابها",
    id: "Ya Allah, lindungi kami dari api neraka dan selamatkan kami dari azabnya.",
    en: "O Allah, protect us from the Hellfire and save us from its punishment."
  },
  {
    arab: "اللهم اجعلنا من الصابرين الشاكرين",
    id: "Ya Allah, jadikan kami hamba yang sabar dan pandai bersyukur.",
    en: "O Allah, make us among those who are patient and grateful."
  },
  {
    arab: "اللهم طهّر قلوبنا من النفاق وأعمالنا من الرياء",
    id: "Ya Allah, bersihkan hati kami dari kemunafikan dan amal kami dari riya.",
    en: "O Allah, purify our hearts from hypocrisy and our deeds from showing off."
  },
  {
    arab: "اللهم ارزقنا قيام ليلة القدر إيمانًا واحتسابًا",
    id: "Ya Allah, karuniakan kami kesempatan beribadah di malam Lailatul Qadr dengan iman dan keikhlasan.",
    en: "O Allah, grant us the blessing to worship on Laylatul Qadr with faith and sincerity."
  }
];

const SITE_LANGS = ["id", "en", "ar"];

function decodeMojibake(value) {
  if (typeof value !== "string") return value;
  const brokenPattern = /[\u00D8\u00D9\u00C3\u00C2\u00E2\u00F0\u2018\u2019\u201A\u201C\u201D\u201E\u2020\u2021\u2022\u2026\u2030\u2039\u203A\u2122]/;
  if (!brokenPattern.test(value)) return value;

  const cp1252ByteMap = {
    0x20ac: 0x80,
    0x201a: 0x82,
    0x0192: 0x83,
    0x201e: 0x84,
    0x2026: 0x85,
    0x2020: 0x86,
    0x2021: 0x87,
    0x02c6: 0x88,
    0x2030: 0x89,
    0x0160: 0x8a,
    0x2039: 0x8b,
    0x0152: 0x8c,
    0x017d: 0x8e,
    0x2018: 0x91,
    0x2019: 0x92,
    0x201c: 0x93,
    0x201d: 0x94,
    0x2022: 0x95,
    0x2013: 0x96,
    0x2014: 0x97,
    0x02dc: 0x98,
    0x2122: 0x99,
    0x0161: 0x9a,
    0x203a: 0x9b,
    0x0153: 0x9c,
    0x017e: 0x9e,
    0x0178: 0x9f
  };

  const toByte = (char) => {
    const code = char.codePointAt(0);
    if (code <= 0xff) return code;
    return cp1252ByteMap[code] ?? 0x3f;
  };

  let current = value;
  for (let i = 0; i < 2; i++) {
    try {
      const bytes = new Uint8Array(Array.from(current, toByte));
      const decoded = new TextDecoder("utf-8").decode(bytes);
      if (!decoded || decoded === current) break;
      current = decoded;
      if (!brokenPattern.test(current)) break;
    } catch {
      break;
    }
  }

  return current;
}

function normalizeTree(node) {
  if (typeof node === "string") return decodeMojibake(node);
  if (Array.isArray(node)) return node.map((item) => normalizeTree(item));
  if (node && typeof node === "object") {
    Object.keys(node).forEach((key) => {
      node[key] = normalizeTree(node[key]);
    });
  }
  return node;
}
const ramadhanUiText = {
  id: {
    location_unavailable: "Lokasi tidak tersedia",
    notification_imsak_title: "Waktu Imsak",
    notification_imsak_body: "Sudah masuk waktu imsak. Segera selesaikan sahur.",
    notification_prayer_title: "Waktu {{prayer}}",
    notification_prayer_body: "Sudah masuk waktu {{prayer}}",
    countdown_to_imsak: "Menuju Imsak: {{hour}}j {{minute}}m",
    countdown_to_iftar: "Menuju Berbuka: {{hour}}j {{minute}}m",
    unsupported_notification: "Browser tidak mendukung notifikasi.",
    notification_enabled: "Notifikasi Aktif",
    qibla_from_north: "{{degree}}° dari utara",
    dua_sahur: "Aku niat berpuasa esok hari karena Allah Ta'ala.",
    dua_iftar: "Ya Allah, karena-Mu aku berpuasa, kepada-Mu aku beriman, dan dengan rezeki-Mu aku berbuka."
  },
  en: {
    location_unavailable: "Location is not available",
    notification_imsak_title: "Imsak Time",
    notification_imsak_body: "Imsak time has started. Please finish suhoor.",
    notification_prayer_title: "{{prayer}} Time",
    notification_prayer_body: "{{prayer}} time has started",
    countdown_to_imsak: "Until Imsak: {{hour}}h {{minute}}m",
    countdown_to_iftar: "Until Iftar: {{hour}}h {{minute}}m",
    unsupported_notification: "Your browser does not support notifications.",
    notification_enabled: "Notifications On",
    qibla_from_north: "{{degree}}° from north",
    dua_sahur:
      "I intend to fast tomorrow for the sake of Allah the Most High.",
    dua_iftar:
      "O Allah, for You I fasted, in You I believe, and with Your provision I break my fast."
  },
  ar: {
    location_unavailable: "الموقع غير متاح",
    notification_imsak_title: "وقت الإمساك",
    notification_imsak_body: "دخل وقت الإمساك. يُرجى إنهاء السحور.",
    notification_prayer_title: "وقت {{prayer}}",
    notification_prayer_body: "دخل وقت {{prayer}}",
    countdown_to_imsak: "حتى الإمساك: {{hour}}س {{minute}}د",
    countdown_to_iftar: "حتى الإفطار: {{hour}}س {{minute}}د",
    unsupported_notification: "المتصفح لا يدعم الإشعارات.",
    notification_enabled: "تم تفعيل الإشعارات",
    qibla_from_north: "{{degree}}° من الشمال",
    dua_sahur: "نويت صوم غدٍ لله تعالى.",
    dua_iftar: "اللهم لك صمت وبك آمنت وعلى رزقك أفطرت."
  }
};



const prayerNameByLang = {
  id: { fajr: "Subuh", dhuhr: "Dzuhur", asr: "Ashar", maghrib: "Maghrib", isha: "Isya" },
  en: { fajr: "Fajr", dhuhr: "Dhuhr", asr: "Asr", maghrib: "Maghrib", isha: "Isha" },
  ar: { fajr: "الفجر", dhuhr: "الظهر", asr: "العصر", maghrib: "المغرب", isha: "العشاء" }
};

normalizeTree(doaHarian);
normalizeTree(ramadhanUiText);
normalizeTree(prayerNameByLang);

function getSiteLang() {
  const saved = localStorage.getItem("siteLang") || "id";
  return SITE_LANGS.includes(saved) ? saved : "id";
}

function t(key, params = {}) {
  const lang = getSiteLang();
  const value = ramadhanUiText[lang]?.[key] || ramadhanUiText.id[key] || key;
  return String(value).replace(/\{\{\s*(\w+)\s*\}\}/g, (_, token) => {
    return Object.prototype.hasOwnProperty.call(params, token) ? params[token] : "";
  });
}

function prayerLabel(prayerKey) {
  const lang = getSiteLang();
  return prayerNameByLang[lang]?.[prayerKey] || prayerNameByLang.id[prayerKey] || prayerKey;
}

function toMinutes(timeValue) {
  if (!timeValue || typeof timeValue !== "string") return null;
  const [h, m] = timeValue.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
}

function isWithinTimeWindow(nowMin, startMin, endMin) {
  if (startMin === null || endMin === null) return false;
  if (startMin <= endMin) return nowMin >= startMin && nowMin <= endMin;
  return nowMin >= startMin || nowMin <= endMin;
}

function tampilkanDoaHarian() {
  const el = document.getElementById("doa-harian");
  if (!el) return;

  const day = new Date().getDate();
  const doa = doaHarian[(day - 1) % doaHarian.length];

  el.innerHTML = `
    <div class="doa-arab">${doa.arab}</div>
    <div class="doa-id">${doa.id}</div>
    <div class="doa-en">${doa.en}</div>
  `;
}

document.addEventListener("click", () => {
  const adzan = document.getElementById("adzan-audio");
  if (adzan) adzan.play().then(() => adzan.pause());
}, { once: true });

let times = {};

function bootstrapRamadhan() {
  loadRamadhanTimes();
  tampilkanDoaHarian();
  initNotifyButton();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrapRamadhan, { once: true });
} else {
  bootstrapRamadhan();
}

async function loadRamadhanTimes() {
  try {
    const pos = await new Promise((res, rej) =>
      navigator.geolocation.getCurrentPosition(res, rej)
    );

    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    loadRamadhanTable(lat, lon);
    calculateQibla(lat, lon);

    const res = await fetch(
      `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=11`
    );

    const data = await res.json();
    const t = data.data.timings;

    // tanggal hijriyah
const hijri = data.data.date.hijri;
const hijriText = `${hijri.weekday.en}, ${hijri.day} ${hijri.month.en} ${hijri.year} H`;

const hijriEl = document.getElementById("hijriDate");
if (hijriEl) hijriEl.textContent = hijriText;

    times = {
  imsak: t.Imsak.slice(0, 5),
  fajr: t.Fajr.slice(0, 5),
  dhuhr: t.Dhuhr.slice(0, 5),
  asr: t.Asr.slice(0, 5),
  maghrib: t.Maghrib.slice(0, 5),
  isha: t.Isha.slice(0, 5)
};

// jalankan semua fitur setelah waktu tersedia
updateCountdown();
highlightCurrentPrayer();
updateRamadhanMode();
autoNightMode();
ramadhanNotifications();
updateMiniPrayer();
setInterval(updateMiniPrayer, 60000);

// interval
setInterval(updateCountdown, 1000);
setInterval(highlightCurrentPrayer, 60000);
setInterval(updateRamadhanMode, 60000);
setInterval(playAdzanIfTime, 60000);
setInterval(autoNightMode, 60000);

    document.getElementById("time-imsak").textContent = times.imsak;
    document.getElementById("time-fajr").textContent = times.fajr;
    document.getElementById("time-maghrib").textContent = times.maghrib;

    const city = data.data.meta.timezone.replace("_", " ");
    document.getElementById("ramadhan-city").textContent = city;

updateCountdown(); // langsung jalan tanpa nunggu 1 detik
   setInterval(updateCountdown, 1000);

  

  } catch {
    document.getElementById("ramadhan-city").textContent =
      t("location_unavailable");
  }
}


function ramadhanNotifications() {
  if (!("Notification" in window)) return;

  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }

  setInterval(() => {
    if (!times.fajr) return;

    const now = new Date();
    const nowMin = now.getHours() * 60 + now.getMinutes();

    // notifikasi imsak
    const [ih, im] = times.imsak.split(":").map(Number);
    const imsakMin = ih * 60 + im;

    if (nowMin === imsakMin) {
      new Notification(t("notification_imsak_title"), {
        body: t("notification_imsak_body"),
        icon: "assets/icons/mosque.png"
      });

      const adzan = document.getElementById("adzan-audio");
      if (adzan) adzan.play();
    }

    // notifikasi shalat
    const prayers = [
      { key: "fajr", time: times.fajr },
      { key: "dhuhr", time: times.dhuhr },
      { key: "asr", time: times.asr },
      { key: "maghrib", time: times.maghrib },
      { key: "isha", time: times.isha }
    ];

    prayers.forEach(prayer => {
      const [h, m] = prayer.time.split(":").map(Number);
      const prayerMin = h * 60 + m;

      if (nowMin === prayerMin) {
        const prayerName = prayerLabel(prayer.key);
        new Notification(t("notification_prayer_title", { prayer: prayerName }), {
          body: t("notification_prayer_body", { prayer: prayerName }),
          icon: "assets/icons/mosque.png"
        });

        const adzan = document.getElementById("adzan-audio");
        if (adzan) adzan.play();
      }
    });

  }, 60000);
}

/* =====================
   DARK MODE TOGGLE
===================== */
 const themeBtn = document.getElementById("themeToggle");

if (themeBtn) {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️";
  }

  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");
    themeBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

async function loadRamadhanTable(lat, lon) {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;

  const res = await fetch(
    `https://api.aladhan.com/v1/calendar?latitude=${lat}&longitude=${lon}&method=2&month=${month}&year=${year}`
  );

  const data = await res.json();
  const days = data.data;

  const tbody = document.getElementById("ramadhan-table-body");
  if (!tbody) return;

  tbody.innerHTML = "";

  const today = new Date().getDate();

days.forEach((day, i) => {
  const tr = document.createElement("tr");

  const dayNum = parseInt(day.date.gregorian.day);

  if (dayNum === today) {
    tr.classList.add("today");
    tr.id = "today-row";
  }

    const imsak = day.timings.Imsak.slice(0, 5);
const fajr = day.timings.Fajr.slice(0, 5);
const maghrib = day.timings.Maghrib.slice(0, 5);

    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${day.date.readable}</td>
      <td>${imsak}</td>
      <td>${fajr}</td>
      <td>${maghrib}</td>
    `;

    tbody.appendChild(tr);
  });
}

// auto scroll ke hari ini
setTimeout(() => {
  const todayRow = document.getElementById("today-row");
  if (todayRow) {
    todayRow.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }
}, 300);

  // =========================
// DOA SAHUR & BERBUKA OTOMATIS
// =========================
const duaBox = document.getElementById("ramadhan-dua");
const duaText = document.getElementById("dua-text");

if (duaBox && duaText) {
  duaBox.style.display = "block";

  // waktu sekarang
  const now = new Date();
  const hour = now.getHours();

  // DOA SAHUR
  if (hour >= 2 && hour < 5) {
    duaText.innerHTML = `
      <div class="dua-arab">
نَوَيْتُ صَوْمَ غَدٍ لِلّٰهِ تَعَالَى
      </div>
      <div class="dua-arti">
        ${t("dua_sahur")}
      </div>
    `;
  }

  // DOA BERBUKA
  else if (hour >= 17 && hour < 19) {
    duaText.innerHTML = `
      <div class="dua-arab">
        اللّٰهُمَّ لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَىٰ رِزْقِكَ أَفْطَرْتُ
      </div>
      <div class="dua-arti">
        ${t("dua_iftar")}
      </div>
    `;
  }

  // selain waktu sahur/berbuka
  else {
    duaBox.style.display = "none";
  }
}

function updateRamadhanMode() {
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();

  document.body.classList.remove("sahur-mode", "iftar-mode");

  const imsakMin = toMinutes(times.imsak);
  const maghribMin = toMinutes(times.maghrib);

  if (imsakMin !== null) {
    const sahurStart = (imsakMin - 180 + 1440) % 1440;
    if (isWithinTimeWindow(nowMin, sahurStart, imsakMin)) {
      document.body.classList.add("sahur-mode");
      return;
    }
  }

  if (maghribMin !== null) {
    const iftarStart = (maghribMin - 120 + 1440) % 1440;
    const iftarEnd = (maghribMin + 60) % 1440;
    if (isWithinTimeWindow(nowMin, iftarStart, iftarEnd)) {
      document.body.classList.add("iftar-mode");
      return;
    }
  }

  // fallback aman kalau data jadwal belum siap
  const hour = now.getHours();
  if (hour >= 2 && hour < 5) {
    document.body.classList.add("sahur-mode");
  } else if (hour >= 17 && hour < 19) {
    document.body.classList.add("iftar-mode");
  }
}

function updateCountdown() {
  if (!times.imsak || !times.maghrib) return;

  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();

  const [mh, mm] = times.maghrib.split(":").map(Number);
  const maghribMin = mh * 60 + mm;

  const [ih, im] = times.imsak.split(":").map(Number);
  const imsakMin = ih * 60 + im;

  let nextText = "";

  if (nowMin < imsakMin) {
    const diff = imsakMin - nowMin;
    nextText = t("countdown_to_imsak", {
      hour: Math.floor(diff / 60),
      minute: diff % 60
    });
  } else if (nowMin < maghribMin) {
    const diff = maghribMin - nowMin;
    nextText = t("countdown_to_iftar", {
      hour: Math.floor(diff / 60),
      minute: diff % 60
    });
  } else {
    const diff = 1440 - nowMin + imsakMin;
    nextText = t("countdown_to_imsak", {
      hour: Math.floor(diff / 60),
      minute: diff % 60
    });
  }
const heroEl = document.getElementById("hero-countdown");
if (heroEl) heroEl.textContent = nextText;

const boxEl = document.getElementById("ramadhan-next");
if (boxEl) boxEl.textContent = nextText;
}

function initNotifyButton() {
  const btn = document.getElementById("notifyBtn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    if (!("Notification" in window)) {
      alert(t("unsupported_notification"));
      return;
    }

    Notification.requestPermission().then((perm) => {
      if (perm === "granted") {
        btn.textContent = t("notification_enabled");
        btn.classList.add("active");
      }
    });
  });
}

function updateMiniPrayer() {
  if (!times.fajr) return;

  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();

  const prayers = [
    { key: "fajr", name: prayerLabel("fajr"), time: times.fajr },
    { key: "dhuhr", name: prayerLabel("dhuhr"), time: times.dhuhr },
    { key: "asr", name: prayerLabel("asr"), time: times.asr },
    { key: "maghrib", name: prayerLabel("maghrib"), time: times.maghrib },
    { key: "isha", name: prayerLabel("isha"), time: times.isha }
  ];

  let next = prayers[0];

  for (let p of prayers) {
    const [h, m] = p.time.split(":").map(Number);
    const pMin = h * 60 + m;

    if (nowMin < pMin) {
      next = p;
      break;
    }
  }

  const nameEl = document.getElementById("mini-name");
  const timeEl = document.getElementById("mini-time");

  if (nameEl) nameEl.textContent = next.name;
  if (timeEl) timeEl.textContent = next.time;
}

function highlightCurrentPrayer() {
  if (!times.fajr) return;

  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();

  const prayerOrder = [
    { key: "fajr", id: "time-fajr" },
    { key: "dhuhr", id: "time-dhuhr" },
    { key: "asr", id: "time-asr" },
    { key: "maghrib", id: "time-maghrib" },
    { key: "isha", id: "time-isha" }
  ];

  let current = prayerOrder[0];

  for (let i = 0; i < prayerOrder.length; i++) {
    const p = prayerOrder[i];
    const t = times[p.key];
    if (!t) continue;

    const [h, m] = t.split(":").map(Number);
    const pMin = h * 60 + m;

    if (nowMin >= pMin) {
      current = p;
    }
  }

  document.querySelectorAll(".ramadhan-card")
    .forEach(c => c.classList.remove("active"));

  const el = document.getElementById(current.id);
  if (el) {
    const card = el.closest(".ramadhan-card");
    if (card) card.classList.add("active");
  }
}

function playAdzanIfTime() {
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();

  const adzanTimes = [
    times.fajr,
    times.dhuhr,
    times.asr,
    times.maghrib,
    times.isha
  ];

  for (let t of adzanTimes) {
    if (!t) continue;

    const [h, m] = t.split(":").map(Number);
    const pMin = h * 60 + m;

    if (nowMin === pMin) {
      const adzan = document.getElementById("adzan-audio");
      if (adzan) adzan.play();
    }
  }
}

function calculateQibla(lat, lon) {
  const kaabaLat = 21.4225;
  const kaabaLon = 39.8262;

  const toRad = d => d * Math.PI / 180;
  const toDeg = r => r * 180 / Math.PI;

  const dLon = toRad(kaabaLon - lon);

  const y = Math.sin(dLon);
  const x =
    Math.cos(toRad(lat)) * Math.tan(toRad(kaabaLat)) -
    Math.sin(toRad(lat)) * Math.cos(dLon);

  let qibla = toDeg(Math.atan2(y, x));
  qibla = (qibla + 360) % 360;

  const el = document.getElementById("qiblaDirection");
  if (el) el.textContent = t("qibla_from_north", { degree: Math.round(qibla) });
}

function autoNightMode() {
  if (!times.isha) return;

  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();

  const [ih, im] = times.isha.split(":").map(Number);
  const ishaMin = ih * 60 + im;

  if (nowMin >= ishaMin) {
    document.body.classList.add("dark");
  }
}








