 /* =========================
   GLOBAL STATE
========================= */
// =========================
// DETEKSI RAMADHAN OTOMATIS
// =========================
function checkRamadhan() {
  const hijriEl = document.getElementById("hijri-date");
  if (!hijriEl) return;

  const text = hijriEl.textContent || "";
  if (/(Ramadan|Ramadhan|رمضان)/.test(text)) {
    document.body.classList.add("ramadhan-mode");
  } else {
    document.body.classList.remove("ramadhan-mode");
  }
}

let prayerTimes = {};
let azanEnabled = true;
let alarmEnabled = true;
let lastPlayed = null;
let notifiedBefore = {}; //  notif 5 menit sebelum
let beforeMinutes = 5; // notifikasi sebelum azan
let azanTolerance = 3; // default 3 menit
let latestHijri = null;
let lastPrayerCity = "";

function getPrayerLang() {
  return window.PortalI18n?.getCurrentLang?.() || localStorage.getItem("siteLang") || "id";
}

function getPrayerLocale() {
  return { id: "id-ID", en: "en-US", ar: "ar-EG" }[getPrayerLang()] || "id-ID";
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

function applyPrayerVisualModes(timesMap, nowMin) {
  document.body.classList.remove("sahur-mode", "iftar-mode");

  const imsakMin = toMinutes(timesMap?.imsak);
  if (imsakMin !== null) {
    const sahurStart = (imsakMin - 180 + 1440) % 1440;
    if (isWithinTimeWindow(nowMin, sahurStart, imsakMin)) {
      document.body.classList.add("sahur-mode");
      return;
    }
  }

  const maghribMin = toMinutes(timesMap?.maghrib);
  if (maghribMin !== null) {
    const iftarStart = (maghribMin - 120 + 1440) % 1440;
    const iftarEnd = (maghribMin + 60) % 1440;
    if (isWithinTimeWindow(nowMin, iftarStart, iftarEnd)) {
      document.body.classList.add("iftar-mode");
    }
  }
}

const prayerNames = {
  imsak: { id: "Imsak", en: "Imsak", ar: "الإمساك" },
  fajr: { id: "Subuh", en: "Fajr", ar: "الفجر" },
  dhuhr: { id: "Dzuhur", en: "Dhuhr", ar: "الظهر" },
  asr: { id: "Ashar", en: "Asr", ar: "العصر" },
  maghrib: { id: "Maghrib", en: "Maghrib", ar: "المغرب" },
  isha: { id: "Isya", en: "Isha", ar: "العشاء" }
};

const hijriMonthNames = {
  Muharram: { id: "Muharram", en: "Muharram", ar: "محرم" },
  Safar: { id: "Safar", en: "Safar", ar: "صفر" },
  "Rabi al-Awwal": { id: "Rabiul Awal", en: "Rabi al-Awwal", ar: "ربيع الأول" },
  "Rabi al-Thani": { id: "Rabiul Akhir", en: "Rabi al-Thani", ar: "ربيع الآخر" },
  "Jumada al-Ula": { id: "Jumadil Ula", en: "Jumada al-Ula", ar: "جمادى الأولى" },
  "Jumada al-Akhirah": { id: "Jumadil Akhirah", en: "Jumada al-Akhirah", ar: "جمادى الآخرة" },
  Rajab: { id: "Rajab", en: "Rajab", ar: "رجب" },
  Shaban: { id: "Syaban", en: "Shaban", ar: "شعبان" },
  Ramadan: { id: "Ramadhan", en: "Ramadan", ar: "رمضان" },
  Shawwal: { id: "Syawal", en: "Shawwal", ar: "شوال" },
  "Dhul Qadah": { id: "Dzulqaidah", en: "Dhul Qadah", ar: "ذو القعدة" },
  "Dhul Hijjah": { id: "Dzulhijjah", en: "Dhul Hijjah", ar: "ذو الحجة" }
};

const prayerUiText = {
  id: {
    azan_active: "🔔 Azan Aktif",
    azan_inactive: "🔕 Azan Mati",
    notif_enable: "🔔 Aktifkan Notifikasi",
    notif_active: "✅ Notifikasi Aktif",
    notif_denied: "❌ Ditolak",
    reminder_title: "Pengingat Sholat",
    reminder_body: "{{minutes}} menit lagi masuk waktu {{prayer}}",
    prayer_time_title: "Waktu Sholat",
    prayer_time_body: "Telah masuk waktu {{prayer}}",
    now_prayer: "Sekarang {{prayer}}",
    next_prayer: "Menuju {{prayer}} • {{hours}}j {{minutes}}m",
    progress_to: "Menuju {{prayer}}",
    tolerance_label: "Toleransi Azan",
    tolerance_exact: "Tepat waktu",
    notification_label: "Notifikasi",
    volume_label: "Volume Azan",
    muadzin_label: "Suara Muadzin",
    city_detecting: "Mendeteksi lokasi...",
    manual_playing: "🔊 Azan manual diputar",
    manual_stopped: "⏹ Azan dihentikan",
    manual_idle: "⏸ Tidak ada azan",
    test_azan: "🧪 Test Azan",
    stop_azan: "⏹ Stop Azan",
    alarm_title: "Alarm Adzan",
    ramadan_day: "Ramadhan hari ke-{{day}}"
  },
  en: {
    azan_active: "🔔 Adhan On",
    azan_inactive: "🔕 Adhan Off",
    notif_enable: "🔔 Enable Notifications",
    notif_active: "✅ Notifications On",
    notif_denied: "❌ Denied",
    reminder_title: "Prayer Reminder",
    reminder_body: "{{minutes}} minutes until {{prayer}}",
    prayer_time_title: "Prayer Time",
    prayer_time_body: "It is now time for {{prayer}}",
    now_prayer: "Now {{prayer}}",
    next_prayer: "Until {{prayer}} • {{hours}}h {{minutes}}m",
    progress_to: "Until {{prayer}}",
    tolerance_label: "Adhan Tolerance",
    tolerance_exact: "On time",
    notification_label: "Notifications",
    volume_label: "Adhan Volume",
    muadzin_label: "Muezzin Voice",
    city_detecting: "Detecting location...",
    manual_playing: "🔊 Manual adhan playing",
    manual_stopped: "⏹ Adhan stopped",
    manual_idle: "⏸ No adhan playing",
    test_azan: "🧪 Test Adhan",
    stop_azan: "⏹ Stop Adhan",
    alarm_title: "Adhan Alarm",
    ramadan_day: "Ramadan day {{day}}"
  },
  ar: {
    azan_active: "🔔 الأذان مفعل",
    azan_inactive: "🔕 الأذان متوقف",
    notif_enable: "🔔 تفعيل الإشعارات",
    notif_active: "✅ الإشعارات مفعلة",
    notif_denied: "❌ مرفوض",
    reminder_title: "تذكير الصلاة",
    reminder_body: "يتبقى {{minutes}} دقيقة على {{prayer}}",
    prayer_time_title: "وقت الصلاة",
    prayer_time_body: "دخل وقت {{prayer}}",
    now_prayer: "الآن {{prayer}}",
    next_prayer: "إلى {{prayer}} • {{hours}}س {{minutes}}د",
    progress_to: "إلى {{prayer}}",
    tolerance_label: "سماحية الأذان",
    tolerance_exact: "في الوقت",
    notification_label: "الإشعارات",
    volume_label: "مستوى الأذان",
    muadzin_label: "صوت المؤذن",
    city_detecting: "جارٍ تحديد الموقع...",
    manual_playing: "🔊 تم تشغيل الأذان اليدوي",
    manual_stopped: "⏹ تم إيقاف الأذان",
    manual_idle: "⏸ لا يوجد أذان الآن",
    test_azan: "🧪 اختبار الأذان",
    stop_azan: "⏹ إيقاف الأذان",
    alarm_title: "منبه الأذان",
    ramadan_day: "اليوم {{day}} من رمضان"
  }
};

function prayerText(key, params = {}) {
  const lang = getPrayerLang();
  const source = prayerUiText[lang]?.[key] || prayerUiText.id[key] || key;
  return String(source).replace(/\{\{\s*(\w+)\s*\}\}/g, (_, token) => params[token] ?? "");
}

function getPrayerName(name) {
  const lang = getPrayerLang();
  return prayerNames[name]?.[lang] || prayerNames[name]?.id || String(name || "");
}

function getHijriMonthName(monthName) {
  const lang = getPrayerLang();
  return hijriMonthNames[monthName]?.[lang] || monthName || "";
}

/* =========================
   ELEMENTS
========================= */
const azanToggle = document.getElementById("azan-toggle");
const alarmBtn = document.getElementById("alarm-toggle");
const azanAudio = document.getElementById("azan-audio");
const muadzinSelect = document.getElementById("muadzin-select");
//  UNLOCK AUDIO (WAJIB UNTUK AUTOPLAY)
if (azanAudio) {
  document.body.addEventListener("click", () => {
    azanAudio.play().then(() => {
      azanAudio.pause();
      azanAudio.currentTime = 0;
      console.log("Audio unlocked");
    }).catch(() => {});
  }, { once: true });
}

const notifBtn = document.getElementById("notif-toggle");
const volumeSlider = document.getElementById("azan-volume");

const volumeToggle = document.getElementById("volume-toggle");
const toleranceSelect = document.getElementById("azanTolerance");

let lastVolume = 1; // simpan volume sebelum mute
function setAzanToggleState() {
  if (!azanToggle) return;
  azanToggle.classList.toggle("active", azanEnabled);
  azanToggle.textContent = azanEnabled ? prayerText("azan_active") : prayerText("azan_inactive");
}

function setNotifButtonState(mode = "idle") {
  if (!notifBtn) return;
  const key = mode === "active" ? "notif_active" : mode === "denied" ? "notif_denied" : "notif_enable";
  notifBtn.textContent = prayerText(key);
}

function setManualAzanStatus(type = "idle") {
  const statusEl = document.getElementById("azan-status");
  if (!statusEl) return;
  statusEl.dataset.state = type;
  const key = type === "playing" ? "manual_playing" : type === "stopped" ? "manual_stopped" : "manual_idle";
  statusEl.textContent = prayerText(key);
}

function renderPrayerCity() {
  const cityEl = document.getElementById("prayer-city");
  if (!cityEl) return;
  cityEl.textContent = lastPrayerCity || prayerText("city_detecting");
}

function renderHijriInfo() {
  const hijriEl = document.getElementById("hijri-date");
  const ramadhanInfo = document.getElementById("ramadhan-day");

  if (hijriEl && latestHijri) {
    hijriEl.textContent = `📅 ${latestHijri.day} ${getHijriMonthName(latestHijri.month.en)} ${latestHijri.year} H`;
  }

  if (ramadhanInfo) {
    if (latestHijri?.month?.en === "Ramadan") {
      ramadhanInfo.textContent = prayerText("ramadan_day", { day: latestHijri.day });
    } else {
      ramadhanInfo.textContent = "";
    }
  }

  checkRamadhan();
}

function applyPrayerStaticTranslations() {
  const lang = getPrayerLang();
  const prayerNameMap = [
    ["#prayer-fajr .prayer-name", "fajr"],
    ["#prayer-dhuhr .prayer-name", "dhuhr"],
    ["#prayer-asr .prayer-name", "asr"],
    ["#prayer-maghrib .prayer-name", "maghrib"],
    ["#prayer-isha .prayer-name", "isha"]
  ];

  prayerNameMap.forEach(([selector, name]) => {
    const el = document.querySelector(selector);
    if (el) el.textContent = getPrayerName(name);
  });

  const homeLabels = document.querySelectorAll(".home-prayer-widget .widget-card > div small");
  if (homeLabels[0]) homeLabels[0].textContent = getPrayerName("imsak");
  if (homeLabels[1]) homeLabels[1].textContent = getPrayerName("fajr");
  if (homeLabels[2]) homeLabels[2].textContent = getPrayerName("maghrib");

  const toleranceLabel = document.querySelector("label[for=\"azanTolerance\"]");
  if (toleranceLabel) toleranceLabel.textContent = prayerText("tolerance_label");
  const notificationLabel = document.querySelector("label[for=\"notif-toggle\"]");
  if (notificationLabel) notificationLabel.textContent = prayerText("notification_label");
  const volumeLabel = document.querySelector("label[for=\"azan-volume\"]");
  if (volumeLabel) volumeLabel.textContent = prayerText("volume_label");
  const muadzinLabel = document.querySelector("label[for=\"muadzin-select\"]");
  if (muadzinLabel) muadzinLabel.textContent = prayerText("muadzin_label");

  if (toleranceSelect) {
    const optionLabels = {
      "0": prayerText("tolerance_exact"),
      "1": getPrayerLang() === "ar" ? "1 دقيقة" : getPrayerLang() === "en" ? "1 minute" : "1 menit",
      "2": getPrayerLang() === "ar" ? "2 دقيقة" : getPrayerLang() === "en" ? "2 minutes" : "2 menit",
      "3": getPrayerLang() === "ar" ? "3 دقائق" : getPrayerLang() === "en" ? "3 minutes" : "3 menit",
      "5": getPrayerLang() === "ar" ? "5 دقائق" : getPrayerLang() === "en" ? "5 minutes" : "5 menit"
    };
    Array.from(toleranceSelect.options).forEach((option) => {
      option.textContent = optionLabels[option.value] || option.textContent;
    });
  }

  if (alarmBtn) {
    alarmBtn.title = prayerText("alarm_title");
    alarmBtn.setAttribute("aria-label", prayerText("alarm_title"));
  }

  const testAzanBtn = document.getElementById("test-azan");
  if (testAzanBtn) testAzanBtn.textContent = prayerText("test_azan");
  const stopAzanBtn = document.getElementById("azan-stop");
  if (stopAzanBtn) stopAzanBtn.textContent = prayerText("stop_azan");
  const prayerTitle = document.querySelector(".prayer-title");
  if (prayerTitle) {
    prayerTitle.textContent =
      lang === "ar" ? "🕌 أوقات الصلاة اليوم"
      : lang === "en" ? "🕌 Prayer Times Today"
      : "🕌 Waktu Sholat Hari Ini";
  }
  const openQuranBtn = document.getElementById("open-quran");
  if (openQuranBtn) {
    openQuranBtn.textContent =
      lang === "ar" ? "📖 اقرأ القرآن"
      : lang === "en" ? "📖 Read Qur'an"
      : "📖 Baca Qur'an";
  }
  const openHadithBtn = document.getElementById("open-hadith");
  if (openHadithBtn) {
    openHadithBtn.textContent =
      lang === "ar" ? "📜 اقرأ الحديث"
      : lang === "en" ? "📜 Read Hadith"
      : "📜 Baca Hadis";
  }
  const settingsButton = document.getElementById("settings-toggle");
  if (settingsButton) settingsButton.textContent = "⚙️";
  if (volumeToggle) volumeToggle.textContent = azanAudio?.muted ? "🔇" : "🔊";
  const playBtn = document.getElementById("daily-ayah-play");
  if (playBtn && (!playBtn.textContent || playBtn.textContent === "?")) {
    playBtn.textContent = "▶";
  }
  const stopBtn = document.getElementById("daily-ayah-stop");
  if (stopBtn && (!stopBtn.textContent || stopBtn.textContent === "?")) {
    stopBtn.textContent = "⏹";
  }
  if (alarmBtn && (!alarmBtn.textContent || alarmBtn.textContent.includes("?"))) {
    alarmBtn.textContent = "⏰";
  }
  const quranTitle = document.querySelector("#quran-popup h2");
  if (quranTitle) {
    quranTitle.textContent =
      lang === "ar" ? "📖 قراءة القرآن"
      : lang === "en" ? "📖 Read the Qur'an"
      : "📖 Baca Al-Qur'an";
  }
  const hadithTitle = document.querySelector("#hadith-popup h2");
  if (hadithTitle) {
    hadithTitle.textContent =
      lang === "ar" ? "📚 مجموعة الأحاديث"
      : lang === "en" ? "📚 Hadith Collection"
      : "📚 Koleksi Hadis";
  }

  renderPrayerCity();
  checkRamadhan();
  setAzanToggleState();
  setNotifButtonState(Notification.permission === "granted" ? "active" : Notification.permission === "denied" ? "denied" : "idle");
  setManualAzanStatus(document.getElementById("azan-status")?.dataset?.state || "idle");
}

window.addEventListener("portal-language-change", () => {
  applyPrayerStaticTranslations();
  updatePrayerUI();
  updateClockAndCountdown();
  highlightActivePrayer();
  renderDailyAyah();
});


if (volumeToggle && azanAudio) {
  // load mute state
  const muted = localStorage.getItem("azanMuted") === "true";
  azanAudio.muted = muted;
  volumeToggle.textContent = muted ? "🔇" : "🔊";

  volumeToggle.onclick = () => {
    if (azanAudio.muted) {
      // UNMUTE
      azanAudio.muted = false;
      azanAudio.volume = lastVolume || 1;
      volumeToggle.textContent = "🔊";
      localStorage.setItem("azanMuted", "false");
    } else {
      // MUTE
      lastVolume = azanAudio.volume;
      azanAudio.muted = true;
      volumeToggle.textContent = "🔇";
      localStorage.setItem("azanMuted", "true");
    }
  };
}

if (toleranceSelect) {
  const savedTol = localStorage.getItem("azanTolerance");
  if (savedTol !== null) {
    azanTolerance = Number(savedTol);
    toleranceSelect.value = savedTol;
  }

  toleranceSelect.onchange = () => {
    azanTolerance = Number(toleranceSelect.value);
    localStorage.setItem("azanTolerance", azanTolerance);
  };
}

if (volumeSlider && azanAudio && volumeToggle) {

  const savedVol = localStorage.getItem("azanVolume");
  if (savedVol !== null) {
    azanAudio.volume = savedVol;
    volumeSlider.value = savedVol;
  }

  volumeSlider.oninput = () => {
    azanAudio.volume = volumeSlider.value;
    azanAudio.muted = false;
    volumeToggle.textContent = "🔊";
    localStorage.setItem("azanVolume", volumeSlider.value);
  };
}


/* =========================
   TOGGLE AZAN
========================= */
if (azanToggle) {
  azanToggle.onclick = () => {
    azanEnabled = !azanEnabled;
    setAzanToggleState();
  };
}

/* =========================
   TOGGLE ALARM
========================= */
if (alarmBtn) {
  alarmEnabled = localStorage.getItem("alarmAdzan") !== "false";
  alarmBtn.classList.toggle("active", alarmEnabled);

  alarmBtn.onclick = () => {
    alarmEnabled = !alarmEnabled;
    localStorage.setItem("alarmAdzan", alarmEnabled);
    alarmBtn.classList.toggle("active", alarmEnabled);
  };
}

/* =========================
   MUADZIN AUDIO MAP
========================= */
const muadzinMap = {
  mishary: {
    normal: "assets/audio/azan/mishary.mp3",
    fajr: "assets/audio/azan/mishary-fajr.mp3"
  },
  makkah: {
    normal: "assets/audio/azan/makkah.mp3",
    fajr: "assets/audio/azan/makkah.mp3"
  },
  madinah: {
    normal: "assets/audio/azan/madinah.mp3",
    fajr: "assets/audio/azan/madinah.mp3"
  },
  egypt: {
    normal: "assets/audio/azan/egypt.mp3",
    fajr: "assets/audio/azan/egypt.mp3"
  }
};

if (muadzinSelect) {
  muadzinSelect.onchange = () => {
    azanAudio.src = muadzinMap[muadzinSelect.value];
  };
  if (muadzinSelect && azanAudio) {
  const muadzin = muadzinSelect.value || "mishary";
  azanAudio.src = muadzinMap[muadzin].normal;
}
}

/* =========================
   NOTIFICATION PERMISSION
========================= */
if (notifBtn) {
  notifBtn.onclick = async () => {
    const perm = await Notification.requestPermission();
    notifBtn.textContent =
      perm === "granted" ? prayerText("notif_active") : prayerText("notif_denied");
  };
}


/* =========================
   LOAD PRAYER TIMES (API)
========================= */
applyPrayerStaticTranslations();
loadPrayerTimes();

async function getGeoPosition() {
  if (!navigator.geolocation) {
    throw new Error("GEO_UNSUPPORTED");
  }

  const isLocalhost = location.hostname === "localhost" || location.hostname === "127.0.0.1";
  if (!window.isSecureContext && !isLocalhost) {
    throw new Error("GEO_INSECURE");
  }

  if (navigator.permissions?.query) {
    try {
      const perm = await navigator.permissions.query({ name: "geolocation" });
      if (perm.state === "denied") {
        throw new Error("GEO_DENIED");
      }
    } catch {
      // ignore permission API failures
    }
  }

  const options = {
    enableHighAccuracy: true,
    timeout: 12000,
    maximumAge: 5 * 60 * 1000,
  };

  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  );
}

function setPrayerCityFallback(reason = "") {
  const lang = getPrayerLang();
  if (reason === "GEO_DENIED") {
    lastPrayerCity = lang === "ar" ? "❌ تم رفض الموقع" : lang === "en" ? "❌ Location denied" : "❌ Lokasi ditolak";
  } else if (reason === "GEO_INSECURE") {
    lastPrayerCity = lang === "ar" ? "⚠️ يحتاج HTTPS" : lang === "en" ? "⚠️ Requires HTTPS" : "⚠️ Harus HTTPS";
  } else if (reason === "GEO_UNSUPPORTED") {
    lastPrayerCity = lang === "ar" ? "⚠️ لا يدعم الموقع" : lang === "en" ? "⚠️ Location unsupported" : "⚠️ Lokasi tidak didukung";
  } else {
    lastPrayerCity = lang === "ar" ? "⚠️ تعذر تحديد الموقع" : lang === "en" ? "⚠️ Location unavailable" : "⚠️ Lokasi tidak tersedia";
  }
  renderPrayerCity();
}

async function loadPrayerTimes() {
  try {
    const pos = await getGeoPosition();
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    localStorage.setItem("prayerLastLat", String(lat));
    localStorage.setItem("prayerLastLon", String(lon));

    const res = await fetch(
      `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=11`
    );
    const data = await res.json();
    const t = data.data.timings;
    // HIJRI DATE
const hijriEl = document.getElementById("hijri-date");
if (hijriEl) {
  const hijri = data.data.date.hijri;
  latestHijri = hijri;

  if (hijri.month.en === "Ramadan") {
    const day = parseInt(hijri.day, 10);
    const ramadhanInfo = document.getElementById("ramadhan-day");

    if (ramadhanInfo) {
      ramadhanInfo.textContent = prayerText("ramadan_day", { day });
    }
  }
}
renderHijriInfo();
    const fajrValue = t.Fajr ? t.Fajr.slice(0, 5) : "";
    let imsakValue = t.Imsak ? t.Imsak.slice(0, 5) : "";
    if (!imsakValue && fajrValue) {
      const [fh, fm] = fajrValue.split(":").map(Number);
      if (!Number.isNaN(fh) && !Number.isNaN(fm)) {
        let imsakMin = fh * 60 + fm - 10;
        if (imsakMin < 0) imsakMin += 24 * 60;
        const ih = Math.floor(imsakMin / 60);
        const im = imsakMin % 60;
        imsakValue = `${String(ih).padStart(2, "0")}:${String(im).padStart(2, "0")}`;
      }
    }

    prayerTimes = {
      imsak:   imsakValue,
      fajr:    t.Fajr.slice(0,5),
      dhuhr:   t.Dhuhr.slice(0,5),
      asr:     t.Asr.slice(0,5),
      maghrib: t.Maghrib.slice(0,5),
      isha:    t.Isha.slice(0,5)
    };

    Object.entries(prayerTimes).forEach(([name, time]) => {
      const el = document.getElementById(`time-${name}`);
      if (el) el.textContent = time;
    });

    const cityEl = document.getElementById("prayer-city");
if (cityEl) {
  lastPrayerCity = data.data.meta.timezone.replace("_", " ");
  renderPrayerCity();
}

    updatePrayerUI();

  } catch (err) {
    setPrayerCityFallback(err?.message || "");
    loadFallbackPrayerTimes();
  }
}

/* =========================
   FALLBACK
========================= */
function loadFallbackPrayerTimes() {
  prayerTimes = {
    imsak: "04:35",
    fajr: "04:45",
    dhuhr: "12:03",
    asr: "15:26",
    maghrib: "18:07",
    isha: "19:16"
  };
  updatePrayerUI();
}

/* =========================
   UPDATE UI
========================= */
function updatePrayerUI() {
  Object.entries(prayerTimes).forEach(([name, time]) => {
    const el = document.getElementById(`time-${name}`);
    if (el) el.textContent = time;
  });

  // === TENTUKAN SHOLAT AKTIF ===
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  let currentPrayer = "isha";

  const order = ["fajr", "dhuhr", "asr", "maghrib", "isha"];

  for (let i = order.length - 1; i >= 0; i--) {
    const name = order[i];
    const time = prayerTimes[name];
    if (!time) continue;

    const [h, m] = time.split(":").map(Number);
    const prayerMinutes = h * 60 + m;

    if (currentMinutes >= prayerMinutes) {
      currentPrayer = name;
      break;
    }
  }

  setPrayerTheme(currentPrayer);
}

/* =========================
   HIGHLIGHT ACTIVE PRAYER
========================= */
function highlightActivePrayer() {
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  let active = null;

  Object.entries(prayerTimes).forEach(([name, time]) => {
    const [h, m] = time.split(":").map(Number);
    if (nowMin >= h * 60 + m) active = name;
  });

  document.querySelectorAll(".prayer-item")
    .forEach(el => el.classList.remove("active"));

  const statusBox = document.getElementById("prayer-status");

  if (active) {
    document.getElementById(`prayer-${active}`)
      ?.classList.add("active");

    if (statusBox) {
      statusBox.textContent =
        prayerText("now_prayer", { prayer: getPrayerName(active) });
      statusBox.classList.add("active");
    }
  }
}


/* =========================
   CLOCK + COUNTDOWN + AZAN
========================= */
function updateClockAndCountdown() {
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  // SMART SILENT MODE (kecuali subuh)
const hour = now.getHours();

if (azanAudio && !azanAudio.muted) {
  const savedVol = localStorage.getItem("azanVolume");

  if (!savedVol) {
    if (hour >= 21 || hour < 5) {
      azanAudio.volume = 0.35;
    } else {
      azanAudio.volume = 0.8;
    }
  }
}

  // CLOCK
  const clock = document.getElementById("current-clock");
  const time = document.getElementById("current-time");
  const date = document.getElementById("current-date");

  if (clock) {
    clock.textContent = now.toLocaleTimeString(getPrayerLocale(), {
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  if (time) {
    time.textContent = now.toLocaleTimeString(getPrayerLocale(), {
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  if (date) {
    date.textContent = now.toLocaleDateString(getPrayerLocale(), {
      weekday: "long",
      day: "numeric",
      month: "long"
    });
  }

  let nextName = null;
  let nextDiff = null;

  let times = { ...prayerTimes };

applyPrayerVisualModes(times, nowMin);

  Object.entries(times).forEach(([name, time]) => {
  if (!time || typeof time !== "string") return;
  const match = time.match(/^(\d{1,2}):(\d{2})/);
  if (!match) return;
  const h = Number(match[1]);
  const m = Number(match[2]);
  if (Number.isNaN(h) || Number.isNaN(m)) return;

  let diff = (h * 60 + m) - nowMin;

  // kalau sudah lewat, hitung ke hari berikutnya
  if (diff < 0) diff += 24 * 60;

  if (
  nextName !== "imsak" && // jangan timpa kalau imsak masih aktif
  (nextDiff === null || diff < nextDiff)
) {
  nextDiff = diff;
  nextName = name;
}

  // ðŸ”” NOTIF SEBELUM AZAN
  const prayerMin = h * 60 + m;
  const diffBefore = prayerMin - nowMin;

  if (
    diffBefore === beforeMinutes &&
    !notifiedBefore[name] &&
    Notification.permission === "granted"
  ) {
    new Notification(prayerText("reminder_title"), {
      body: prayerText("reminder_body", { minutes: beforeMinutes, prayer: getPrayerName(name) }),
      icon: "assets/icons/mosque.png"
    });

    notifiedBefore[name] = true;
  }

  // AZAN
  const diffReal = nowMin - prayerMin;

if (
  diffReal >= 0 &&
  diffReal <= azanTolerance &&
  alarmEnabled &&
  azanEnabled &&
  lastPlayed !== name
) {
  

  lastPlayed = name;

  const muadzin = muadzinSelect?.value || "mishary";

  const src =
    name === "fajr"
      ? muadzinMap[muadzin].fajr
      : muadzinMap[muadzin].normal;

  if (azanAudio) {
    azanAudio.src = src;
    azanAudio.currentTime = 0;

    if (name === "fajr") {
      azanAudio.volume = 1;
    }

    azanAudio.play().catch(() => {});
  }
      // NOTIF MASUK WAKTU
      if (Notification.permission === "granted") {
        new Notification(prayerText("prayer_time_title"), {
          body: prayerText("prayer_time_body", { prayer: getPrayerName(name) }),
          icon: "assets/icons/mosque.png"
        });
      }
    }
  });

  // TEXT MENUJU SHOLAT
const nextEl = document.getElementById("next-prayer");
if (nextEl && nextName && nextDiff !== null) {

  let label = getPrayerName(nextName);

  if (nextName === "imsak") {
    label = getPrayerName("imsak");
    nextEl.classList.add("next-imsak");
    nextEl.classList.remove("next-iftar");
  } 
  else if (nextName === "maghrib") {
    label = getPrayerName("maghrib");
    nextEl.classList.add("next-iftar");
    nextEl.classList.remove("next-imsak");
  } 
  else {
    nextEl.classList.remove("next-imsak");
    nextEl.classList.remove("next-iftar");
  }

  nextEl.textContent = prayerText("next_prayer", { prayer: label, hours: Math.floor(nextDiff / 60), minutes: nextDiff % 60 });
}

  /* ======================
     PROGRESS MENUJU SHOLAT
  ====================== */

  const progressFill = document.getElementById("prayer-progress-fill");
  const progressLabel = document.getElementById("progress-prayer-name");
  const progressPercent = document.getElementById("progress-percent");

  if (nextName && progressFill && progressLabel) {
    let prevTimeMin = null;

Object.entries(prayerTimes).forEach(([name, time]) => {
  const [h, m] = time.split(":").map(Number);
  const tMin = h * 60 + m;

  if (tMin <= nowMin) {
    if (prevTimeMin === null || tMin > prevTimeMin) {
      prevTimeMin = tMin;
    }
  }
});

// kalau belum ada sholat sebelumnya (misal setelah tengah malam)
if (prevTimeMin === null) {
  const times = Object.values(prayerTimes).map(t => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  });
  prevTimeMin = Math.max(...times) - 1440; // ambil isya kemarin
}
    const nextTimeMin = nowMin + nextDiff;
    const totalRange = nextTimeMin - prevTimeMin;
    const passed = nowMin - prevTimeMin;

    let percent =
      totalRange > 0
        ? Math.min(100, Math.max(0, (passed / totalRange) * 100))
        : 0;

    progressFill.style.width = percent.toFixed(1) + "%";
    progressLabel.textContent = prayerText("progress_to", { prayer: getPrayerName(nextName) });
    progressPercent.textContent = `${percent.toFixed(0)}%`;
  }
}
/* =========================
   INTERVALS
========================= */
setInterval(() => {
  updateClockAndCountdown();
  highlightActivePrayer();
}, 1000);

// reset notif tiap tengah malam
setInterval(() => {
  const now = new Date();
  if (now.getHours() === 0 && now.getMinutes() === 0) {
    notifiedBefore = {};
    lastPlayed = null;
  }
}, 60000);

const todayKey = new Date().toDateString();
const lastDay = localStorage.getItem("notifDay");

if (lastDay !== todayKey) {
  notifiedBefore = {};
  localStorage.setItem("notifDay", todayKey);
}

/* ======================
   AYAT HARI INI â€” PROFESSIONAL PLAYER
====================== */

const ayatList = [
  {
    global: 2,
    arab: "الٓمٓ ذَٰلِكَ ٱلْكِتَـٰبُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ",
    arti: {
      id: "Alif Lam Mim. Kitab (Al-Qur'an) ini tidak ada keraguan padanya; petunjuk bagi orang-orang yang bertakwa.",
      en: "Alif Lam Mim. This is the Book in which there is no doubt, a guidance for the God-conscious.",
      ar: "الم. ذلك الكتاب لا ريب فيه هدى للمتقين."
    }
  },
  {
    global: 3,
    arab: "ٱلَّذِينَ يُؤْمِنُونَ بِٱلْغَيْبِ وَيُقِيمُونَ ٱلصَّلَوٰةَ وَمِمَّا رَزَقْنَـٰهُمْ يُنفِقُونَ",
    arti: {
      id: "(Yaitu) mereka yang beriman kepada yang gaib, melaksanakan salat, dan menginfakkan sebagian rezeki yang Kami berikan kepada mereka.",
      en: "Those who believe in the unseen, establish prayer, and spend from what We have provided for them.",
      ar: "الذين يؤمنون بالغيب ويقيمون الصلاة ومما رزقناهم ينفقون."
    }
  },
  {
    global: 4,
    arab: "وَٱلَّذِينَ يُؤْمِنُونَ بِمَآ أُنزِلَ إِلَيْكَ وَمَآ أُنزِلَ مِن قَبْلِكَ وَبِٱلْـَٔاخِرَةِ هُمْ يُوقِنُونَ",
    arti: {
      id: "Dan mereka beriman kepada (Al-Qur'an) yang diturunkan kepadamu dan yang diturunkan sebelummu, serta mereka yakin akan adanya akhirat.",
      en: "And those who believe in what was revealed to you and what was revealed before you, and they are certain of the Hereafter.",
      ar: "والذين يؤمنون بما أنزل إليك وما أنزل من قبلك وبالآخرة هم يوقنون."
    }
  },
  {
    global: 5,
    arab: "أُو۟لَـٰٓئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ ۖ وَأُو۟لَـٰٓئِكَ هُمُ ٱلْمُفْلِحُونَ",
    arti: {
      id: "Merekalah yang mendapat petunjuk dari Tuhannya, dan merekalah orang-orang yang beruntung.",
      en: "Those are upon guidance from their Lord, and it is they who are successful.",
      ar: "أولئك على هدى من ربهم وأولئك هم المفلحون."
    }
  },
  {
    global: 6,
    arab: "إِنَّ ٱلَّذِينَ كَفَرُوا۟ سَوَآءٌ عَلَيْهِمْ ءَأَنذَرْتَهُمْ أَمْ لَمْ تُنذِرْهُمْ لَا يُؤْمِنُونَ",
    arti: {
      id: "Sesungguhnya orang-orang kafir, sama saja bagi mereka, kamu beri peringatan atau tidak kamu beri peringatan, mereka tidak akan beriman.",
      en: "Indeed, those who disbelieve, it is all the same whether you warn them or do not warn them; they will not believe.",
      ar: "إن الذين كفروا سواء عليهم أأنذرتهم أم لم تنذرهم لا يؤمنون."
    }
  }
];

const todayAyatIndex = new Date().getDate() % ayatList.length;

function getAyatMeaning(ayat) {
  if (!ayat) return "";
  if (typeof ayat.arti === "string") return ayat.arti;
  const lang = getPrayerLang();
  return ayat.arti?.[lang] || ayat.arti?.id || "";
}

function renderDailyAyah() {
  if (!arabEl || !artiEl) return;
  const ayat = ayatList[todayAyatIndex];
  if (!ayat) return;
  arabEl.textContent = ayat.arab;
  artiEl.textContent = getAyatMeaning(ayat);
}
const arabEl = document.getElementById("daily-ayah-arab");
const artiEl = document.getElementById("daily-ayah-arti");
const playBtn = document.getElementById("daily-ayah-play");
const stopBtn = document.getElementById("daily-ayah-stop");
const qariSelect = document.getElementById("qari-select");

let ayahAudio = new Audio();
ayahAudio.onerror = () => {
  console.error("Audio gagal dimuat:", ayahAudio.src);
};
let playerState = "stopped"; 
// states: playing | paused | stopped

if (arabEl && artiEl && playBtn && stopBtn && qariSelect) {
  renderDailyAyah();

function loadAudio() {
  const qari = qariSelect.value;

  if (qari === "mishary") {
    ayahAudio.src =
      "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/002.mp3";
  }

  else if (qari === "sudais") {
    ayahAudio.src =
      "https://download.quranicaudio.com/quran/sodais_and_shuraim/002.mp3";
  }

  else if (qari === "maher") {
    ayahAudio.src =
      "https://download.quranicaudio.com/quran/salah_alhashim/002.mp3";
  }
}

  /* ======================
     PLAY / PAUSE TOGGLE
  ====================== */
 playBtn.onclick = () => {

  if (playerState === "stopped") {

    loadAudio();
    ayahAudio.play();

    playerState = "playing";
    playBtn.textContent = "⏸";   // pause icon

  }

  else if (playerState === "playing") {

    ayahAudio.pause();

    playerState = "paused";
    playBtn.textContent = "▶";   // play icon

  }

  else if (playerState === "paused") {

    ayahAudio.play();

    playerState = "playing";
    playBtn.textContent = "⏸";   // pause icon

  }

};

  /* =========================
   STOP BUTTON
========================= */

stopBtn.onclick = () => {

  ayahAudio.pause();
  ayahAudio.currentTime = 0;

  playerState = "stopped";
  playBtn.textContent = "▶";

};

/* =========================
   RESET KALAU AUDIO SELESAI
========================= */

ayahAudio.onended = () => {

  playerState = "stopped";
  playBtn.textContent = "▶";

};

}

/* =========================
   MANUAL TEST AZAN
========================= */

const testBtn = document.getElementById("test-azan");
const azanStopBtn = document.getElementById("azan-stop");
const statusBox = document.getElementById("azan-status");

if (testBtn && azanAudio) {

  testBtn.onclick = () => {

    const muadzin = muadzinSelect?.value || "mishary";

    azanAudio.src = `assets/audio/azan/${muadzin}.mp3`;

    azanAudio.currentTime = 0;
    azanAudio.play();

    if (statusBox) {
      setManualAzanStatus("playing");
    }
  };
}

if (azanStopBtn && azanAudio) {

  azanStopBtn.onclick = () => {
    azanAudio.pause();
    azanAudio.currentTime = 0;

    if (statusBox) {
      setManualAzanStatus("stopped");
    }
  };
}

if (location.hostname === "localhost") {
  document.querySelectorAll(".dev-only")
    .forEach(el => el.style.display = "block");
}

const settingsToggle = document.getElementById("settings-toggle");
const settingsPanel = document.getElementById("settings-panel");

if (settingsToggle && settingsPanel) {
  settingsToggle.onclick = () => {
    settingsPanel.classList.toggle("active");
  };
}

function setPrayerTheme(prayer) {
  const box = document.querySelector(".prayer-box");
  if (!box) return;

  box.className = "prayer-box";

  if (prayer === "fajr") box.classList.add("prayer-subuh");
  if (prayer === "dhuhr") box.classList.add("prayer-dzuhur");
  if (prayer === "asr") box.classList.add("prayer-ashar");
  if (prayer === "maghrib") box.classList.add("prayer-maghrib");
  if (prayer === "isha") box.classList.add("prayer-isya");
}

loadHomePrayerTimes();

async function loadHomePrayerTimes() {
  try {
    const pos = await getGeoPosition();
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    const res = await fetch(
      `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=11`
    );

    const data = await res.json();
    const t = data.data.timings;

    document.getElementById("home-imsak").textContent =
      t.Imsak.slice(0, 5);
    document.getElementById("home-fajr").textContent =
      t.Fajr.slice(0, 5);
    document.getElementById("home-maghrib").textContent =
      t.Maghrib.slice(0, 5);

  } catch (e) {
    const lat = Number(localStorage.getItem("prayerLastLat"));
    const lon = Number(localStorage.getItem("prayerLastLon"));
    if (Number.isFinite(lat) && Number.isFinite(lon)) {
      try {
        const res = await fetch(
          `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=11`
        );

        const data = await res.json();
        const t = data.data.timings;

        document.getElementById("home-imsak").textContent =
          t.Imsak.slice(0, 5);
        document.getElementById("home-fajr").textContent =
          t.Fajr.slice(0, 5);
        document.getElementById("home-maghrib").textContent =
          t.Maghrib.slice(0, 5);

        return;
      } catch {
        // ignore fallback fetch errors
      }
    }

    console.log("Prayer widget location lookup failed");
  }
}

const openBtn = document.getElementById("open-quran");
const quranPopup = document.getElementById("quran-popup");
const closeBtn = document.getElementById("quran-close");
const quranBody = document.getElementById("quran-body");
const juzSelect = document.getElementById("juz-select");
const translationSelect = document.getElementById("translation-select");

let currentTranslation = 33; // default Indonesia

// isi juz dropdown
for (let i = 1; i <= 30; i++) {
  const opt = document.createElement("option");
  opt.value = i;
  opt.textContent = "Juz " + i;
  juzSelect.appendChild(opt);
}

// buka popup
openBtn.addEventListener("click", () => {
  quranPopup.classList.add("active");
  loadJuz(1);
});

// tutup popup
closeBtn.addEventListener("click", () => {
  quranPopup.classList.remove("active");
});

// ganti juz
juzSelect.addEventListener("change", () => {
  loadJuz(juzSelect.value);
});

// ganti bahasa
translationSelect.addEventListener("change", () => {
  currentTranslation = translationSelect.value;
  loadJuz(juzSelect.value);
});

// load juz dengan terjemahan
async function loadJuz(juzNumber) {
  quranBody.innerHTML = `<div class="loading">${getPrayerLang() === "ar" ? "جارٍ التحميل..." : getPrayerLang() === "en" ? "Loading..." : "Memuat..."}</div>`;

  try {
    const res = await fetch(
      `https://api.quran.com/api/v4/quran/verses/uthmani?juz_number=${juzNumber}`
    );

    const data = await res.json();
    const verses = data.verses;

    // ambil terjemahan
    const transRes = await fetch(
      `https://api.quran.com/api/v4/quran/translations/${currentTranslation}?juz_number=${juzNumber}`
    );

    const transData = await transRes.json();
    const translations = transData.translations;

    quranBody.innerHTML = "";

    verses.forEach((verse, index) => {
      const div = document.createElement("div");
      div.classList.add("ayah");

      div.innerHTML = `
        <div class="ayah-number">
          ${verse.verse_key}
        </div>

        <div class="arab">
          ${verse.text_uthmani}
        </div>

        <div class="translation">
          ${translations[index].text}
        </div>
      `;

      quranBody.appendChild(div);
    });

  } catch (err) {
    quranBody.innerHTML = getPrayerLang() === "ar" ? "تعذر تحميل القرآن." : getPrayerLang() === "en" ? "Failed to load the Qur'an." : "Gagal memuat Al-Qur'an.";
  }
}

// ================= POPUP CONTROL =================
const tasbihPopup = document.getElementById("tasbihPopup");
const kiblatPopup = document.getElementById("kiblatPopup");

function openCenteredPopup(popupEl) {
  if (!popupEl) return;
  popupEl.style.display = "flex";
}

function closeCenteredPopup(popupEl) {
  if (!popupEl) return;
  popupEl.style.display = "none";
}

document.getElementById("openTasbih").onclick = () => {
  openCenteredPopup(tasbihPopup);
  renderTasbihState();
};

document.getElementById("closeTasbih").onclick = () =>
  closeCenteredPopup(tasbihPopup);

document.getElementById("openKiblat").onclick = () => {
  openCenteredPopup(kiblatPopup);
  renderQiblaDegree();
};

document.getElementById("closeKiblat").onclick = () =>
  closeCenteredPopup(kiblatPopup);


// ================= TASBIH =================
let count = 0;
let mode = 0;
let currentQiblaDegree = null;

const dzikir = [
  {
    arab: "سُبْحَانَ ٱللّٰهِ",
    translation: {
      id: "Maha Suci Allah",
      en: "Glory be to Allah",
      ar: "سبحان الله"
    }
  },
  {
    arab: "ٱلْحَمْدُ لِلّٰهِ",
    translation: {
      id: "Segala puji bagi Allah",
      en: "All praise is for Allah",
      ar: "الحمد لله"
    }
  },
  {
    arab: "ٱللّٰهُ أَكْبَرُ",
    translation: {
      id: "Allah Maha Besar",
      en: "Allah is the Greatest",
      ar: "الله أكبر"
    }
  }
];

const tasbihText = document.getElementById("tasbihText");
const tasbihTranslation = document.getElementById("tasbihTranslation");
const tasbihCount = document.getElementById("tasbihCount");

function getPopupLang() {
  return window.PortalI18n?.getCurrentLang?.() || localStorage.getItem("siteLang") || "id";
}

function getPopupText(key, fallback = "") {
  const lang = getPopupLang();
  const fallbackMap = {
    tasbih_title: {
      id: "📿 Tasbih Digital",
      en: "📿 Digital Tasbih",
      ar: "📿 مسبحة رقمية"
    },
    tasbih_press: {
      id: "Tekan",
      en: "Count",
      ar: "اضغط"
    },
    tasbih_reset: {
      id: "Reset",
      en: "Reset",
      ar: "إعادة ضبط"
    },
    qibla_title: {
      id: "🧭 Arah Kiblat",
      en: "🧭 Qibla Direction",
      ar: "🧭 اتجاه القبلة"
    },
    qibla_degree_format: {
      id: "Derajat Kiblat: {{degree}}°",
      en: "Qibla Degree: {{degree}}°",
      ar: "درجة القبلة: {{degree}}°"
    },
    detecting: {
      id: "Mendeteksi...",
      en: "Detecting...",
      ar: "جارٍ التحديد..."
    }
  };

  const translated = window.PortalI18n?.t?.(key);
  if (translated && translated !== key) return translated;
  return fallbackMap[key]?.[lang] || fallback;
}

function renderTasbihState() {
  const lang = getPopupLang();
  const currentDzikir = dzikir[mode] || dzikir[0];
  const tasbihTitle = document.querySelector("#tasbihPopup h3");
  const tasbihBtn = document.getElementById("tasbihBtn");
  const resetTasbihBtn = document.getElementById("resetTasbih");

  if (tasbihTitle) tasbihTitle.textContent = getPopupText("tasbih_title", "📿 Tasbih Digital");
  if (tasbihText) tasbihText.textContent = currentDzikir.arab;
  if (tasbihTranslation) tasbihTranslation.textContent = currentDzikir.translation[lang] || currentDzikir.translation.id;
  if (tasbihCount) tasbihCount.textContent = String(count);
  if (tasbihBtn) tasbihBtn.textContent = getPopupText("tasbih_press", "Tekan");
  if (resetTasbihBtn) resetTasbihBtn.textContent = getPopupText("tasbih_reset", "Reset");
}

function renderQiblaDegree() {
  const titleEl = document.querySelector("#kiblatPopup h3");
  const degreeEl = document.getElementById("kiblatDegree");
  const degreeFormat = getPopupText("qibla_degree_format", "Derajat Kiblat: {{degree}}°");

  if (titleEl) titleEl.textContent = getPopupText("qibla_title", "🧭 Arah Kiblat");
  if (!degreeEl) return;

  if (typeof currentQiblaDegree === "number") {
    degreeEl.textContent = degreeFormat.replace("{{degree}}", Math.round(currentQiblaDegree));
  } else {
    degreeEl.textContent = getPopupText("detecting", "Mendeteksi...");
  }
}

document.getElementById("tasbihBtn").onclick = () => {
  count++;
  tasbihCount.innerText = count;

  if (count >= 33) {
    count = 0;
    mode++;
    if (mode >= dzikir.length) mode = 0;
  }

  renderTasbihState();
};

document.getElementById("resetTasbih").onclick = () => {
  count = 0;
  mode = 0;
  renderTasbihState();
};

window.addEventListener("portal-language-change", () => {
  renderTasbihState();
  renderQiblaDegree();
});

renderTasbihState();
renderQiblaDegree();

// ==============================
// KIBLAT TANPA API (STABIL)
// ==============================

function getQiblaDirection(lat, lon) {
  const kaabaLat = 21.4225 * Math.PI / 180;
  const kaabaLon = 39.8262 * Math.PI / 180;

  const userLat = lat * Math.PI / 180;
  const userLon = lon * Math.PI / 180;

  const dLon = kaabaLon - userLon;

  const y = Math.sin(dLon);
  const x =
    Math.cos(userLat) * Math.tan(kaabaLat) -
    Math.sin(userLat) * Math.cos(dLon);

  let bearing = Math.atan2(y, x) * 180 / Math.PI;
  return (bearing + 360) % 360;
}

function startCompass(qibla) {
  const compass = document.getElementById("compass");

  let currentRotation = 0;

  function handleOrientation(event) {
    let heading;

    if (event.webkitCompassHeading !== undefined) {
      // iOS
      heading = event.webkitCompassHeading;
    } else if (event.alpha !== null) {
      // Android
      heading = 360 - event.alpha;
    } else {
      return;
    }

    let targetRotation = qibla - heading;

    // normalisasi biar nggak lompat 360Â°
    targetRotation = (targetRotation + 360) % 360;

    // smoothing (biar halus)
    currentRotation += (targetRotation - currentRotation) * 0.2;

    compass.style.transform = `rotate(${currentRotation}deg)`;
  }

  // iOS permission
  if (
    typeof DeviceOrientationEvent !== "undefined" &&
    typeof DeviceOrientationEvent.requestPermission === "function"
  ) {
    DeviceOrientationEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === "granted") {
          window.addEventListener("deviceorientation", handleOrientation);
        }
      })
      .catch(console.error);
  } else {
    window.addEventListener("deviceorientation", handleOrientation, true);
  }
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const qibla = getQiblaDirection(lat, lon);
    currentQiblaDegree = qibla;
    renderQiblaDegree();

    startCompass(qibla);
  });
}

const openHadith = document.getElementById("open-hadith");
const hadithPopup = document.getElementById("hadith-popup");
const closeHadith = document.getElementById("hadith-close");
const hadithBody = document.getElementById("hadith-body");
const bookSelect = document.getElementById("book-select");
const rangeInput = document.getElementById("hadith-range");
const loadBtn = document.getElementById("load-hadith");

openHadith.onclick = () => {
  hadithPopup.classList.add("active");
  loadHadith();
};

closeHadith.onclick = () => {
  hadithPopup.classList.remove("active");
};

loadBtn.onclick = () => {
  loadHadith(bookSelect.value, rangeInput.value);
};

async function loadHadith(book = "bukhari", range = "1-5") {

  hadithBody.innerHTML = getPrayerLang() === "ar" ? "جارٍ تحميل الحديث..." : getPrayerLang() === "en" ? "Loading hadith..." : "Memuat hadis...";

  try {
    const res = await fetch(
      `https://api.hadith.gading.dev/books/${book}?range=${range}`
    );

    const data = await res.json();
    const hadiths = data.data.hadiths;

    hadithBody.innerHTML = "";

    hadiths.forEach(h => {

      const div = document.createElement("div");
      div.classList.add("hadith-card");

      div.innerHTML = `
        <h3>HR. ${data.data.name} No. ${h.number}</h3>
        <div class="arab">${h.arab}</div>
        <div class="translation">${h.id}</div>
      `;

      hadithBody.appendChild(div);
    });

  } catch (err) {
    hadithBody.innerHTML = getPrayerLang() === "ar" ? "تعذر تحميل الحديث." : getPrayerLang() === "en" ? "Failed to load hadith." : "Gagal memuat hadis.";
  }
}







