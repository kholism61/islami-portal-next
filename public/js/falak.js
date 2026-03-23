/**
 * Belajar Ilmu Falak - Modul edukasi interaktif
 * 3 bahasa (ID, EN, AR) + tools: qibla, hijri converter, jadwal shalat
 */
(function () {
  const LANGS = { id: "id", en: "en", ar: "ar" };
  let currentLang = localStorage.getItem("falakLang") || "id";

  const T = {
    id: {
      page_title: "Belajar Ilmu Falak | Portal Literasi Islam",
      nav_home: "Beranda", nav_ramadhan: "Jadwal Imsakiyah",
      hero_title: "Belajar Ilmu Falak",
      hero_desc: "Modul pembelajaran interaktif ilmu falak: dari pengenalan dasar hingga simulasi praktis arah kiblat, waktu shalat, dan kalender hijriyah.",
      brand_portal: "Portal Literasi Islam",
      nav_label: "Menu",
      section1_title: "Pengantar Ilmu Falak",
      intro_p1: "Ilmu falak (astronomi Islam) adalah cabang ilmu yang mempelajari gerakan benda-benda langit untuk keperluan ibadah dan penentuan waktu dalam Islam.",
      intro_p2: "Pentingnya ilmu falak dalam Islam terkait dengan waktu shalat, arah kiblat, penetapan awal bulan hijriyah (termasuk Ramadhan dan Syawal), serta hisab hilal untuk menentukan kapan bulan baru dimulai.",
      intro_role1: "Waktu Shalat", intro_role2: "Arah Kiblat", intro_role3: "Kalender Hijriyah", intro_role4: "Hisab Hilal",
      section2_title: "Topik Pembelajaran",
      topik1_title: "Arah Kiblat", topik1_desc: "Menentukan arah Ka'bah dari lokasi manapun di dunia.",
      topik2_title: "Waktu Shalat", topik2_desc: "Penentuan waktu lima shalat fardhu berdasarkan posisi Matahari.",
      topik3_title: "Kalender Hijriyah", topik3_desc: "Sistem penanggalan berbasis bulan (lunar) dalam Islam.",
      topik4_title: "Hisab Hilal", topik4_desc: "Perhitungan matematis untuk menentukan munculnya bulan baru.",
      topik5_title: "Gerhana dalam Falak Islam", topik5_desc: "Shalat gerhana (kusuf & khusuf) dan fenomena astronominya.",
      accordion_qibla: "Arah kiblat ditentukan dengan menghitung sudut dari Utara searah jarum jam menuju Ka'bah di Mekah. Koordinat Ka'bah: 21°25'21\"N, 39°49'34\"E. Perhitungan memakai rumus sferik trigonometri berdasarkan lintang dan bujur pengamat.",
      accordion_shalat: "Waktu shalat ditentukan berdasarkan posisi Matahari: Subuh saat fajar astronomis, Dzuhur saat Matahari melintasi meridian, Ashar saat bayangan = panjang benda + bayangan saat zawal, Maghrib saat Matahari terbenam, Isya saat hilangnya syafak.",
      accordion_kalender: "Kalender Hijriyah berdasarkan siklus bulan. Satu bulan = satu kali revolusi Bulan mengelilingi Bumi (~29,5 hari). Tahun kabisat Hijriyah menambah 1 hari di 11 tahun dari 30 tahun (sistem Kamilah atau Basithah).",
      accordion_hilal: "Hisab hilal menghitung kapan konjungsi (ijtima) terjadi dan apakah pada saat Matahari terbenam, hilal sudah di atas ufuk. Kriteria imkanur rukyat Indonesia: elongasi ≥6,4° dan tinggi hilal ≥3° (atau elongasi ≥6,4° dan umur bulan ≥8 jam).",
      accordion_gerhana: "Gerhana matahari (kusuf) dan gerhana bulan (khusuf) adalah tanda kekuasaan Allah. Rasulullah SAW memerintahkan shalat gerhana saat terjadi. Gerhana terjadi saat Bulan, Bumi, dan Matahari segaris.",
      section3_title: "Simulasi Falak",
      section3_desc: "Praktik langsung dengan tools sederhana.",
      tool1_title: "Kalkulator Arah Kiblat", tool1_lat: "Lintang (°)", tool1_lon: "Bujur (°)",
      tool2_title: "Konversi Hijriyah-Masehi", tool2_mode: "Mode", tool2_g2h: "Masehi → Hijriyah", tool2_h2g: "Hijriyah → Masehi",
      tool2_day: "Tanggal", tool2_month: "Bulan", tool2_year: "Tahun",
      tool3_title: "Jadwal Waktu Shalat", tool3_desc: "Menggunakan lokasi Anda.", tool3_btn: "Tampilkan Jadwal",
      btn_calc: "Hitung", btn_convert: "Konversi",
      result_qibla: "Derajat kiblat: {{deg}}° (dari Utara searah jarum jam)",
      result_loc_err: "Lokasi tidak tersedia. Masukkan koordinat manual.",
      result_hijri_loading: "Memuat...",
      result_hijri_invalid_year: "Tahun Hijriyah harus 4 digit (mis. 1446)",
      result_shalat_loading: "Memuat jadwal...",
      shalat_fajr: "Subuh", shalat_sunrise: "Terbit", shalat_dhuhr: "Dzuhur", shalat_asr: "Ashar", shalat_sunset: "Terbenam", shalat_maghrib: "Maghrib", shalat_isha: "Isya",
      section4_title: "Istilah Penting Falak",
      term_zenith: "Zenith", def_zenith: "Titik tepat di atas kepala pengamat di langit.",
      term_azimuth: "Azimuth", def_azimuth: "Sudut dari Utara ke arah horizontal (0°–360°).",
      term_ijtima: "Ijtima", def_ijtima: "Konjungsi; Bulan segaris dengan Matahari (bulan baru astronomis).",
      term_elongasi: "Elongasi", def_elongasi: "Sudut pemisah antara Bulan dan Matahari di langit.",
      term_ufuk: "Ufuk", def_ufuk: "Garis batas antara langit dan bumi di pandangan pengamat.",
      term_rukyat: "Rukyat", def_rukyat: "Pengamatan hilal dengan mata atau teleskop.",
      term_hisab: "Hisab", def_hisab: "Perhitungan astronomi untuk menentukan posisi benda langit.",
      section5_title: "Langkah Belajar Falak",
      step1_title: "Pengenalan Dasar", step1_desc: "Pahami apa itu ilmu falak dan kaitannya dengan ibadah Islam.",
      step2_title: "Arah Kiblat", step2_desc: "Pelajari bagaimana menentukan arah Ka'bah dari lokasi Anda.",
      step3_title: "Waktu Shalat", step3_desc: "Pahami penentuan waktu Subuh, Dzuhur, Ashar, Maghrib, dan Isya.",
      step4_title: "Kalender Hijriyah", step4_desc: "Pelajari sistem penanggalan lunar dan perbedaannya dengan Masehi.",
      step5_title: "Hisab Hilal", step5_desc: "Pelajari perhitungan hilal untuk penetapan awal bulan.",
      footer_portal: "Portal Literasi Islam", footer_desc: "Kajian Islam berbasis literatur dan analisis ilmiah.",
      footer_tools: "Tools", footer_zakat: "Kalkulator Zakat", footer_ramadhan: "Jadwal Imsakiyah", footer_falak: "Belajar Ilmu Falak",
      footer_note: "Catatan", footer_disclaimer: "Modul ini untuk edukasi. Hasil perhitungan sebaiknya diverifikasi dengan sumber resmi.",
      footer_about: "Tentang", footer_contact: "Kontak", footer_faq: "FAQ",
      footer_copy: "© 2026 Portal Literasi Islam",
      err_invalid_input: "Masukkan tidak valid.",
      err_invalid_response: "Respons tidak valid.",
      err_generic: "Terjadi kesalahan.",
      err_network: "Koneksi gagal. Cek jaringan Anda.",
      err_api: "API sementara tidak tersedia.",
      err_no_data: "Data tidak tersedia.",
      disclaimer_muqoddimah: "Modul ini masih muqaddimah (pengantar). Materi lengkap akan dikembangkan bertahap. Untuk kajian mendalam, silakan rujuk literatur ilmu falak atau lembaga resmi.",
      langkah_more: "Mulai Belajar Falak",
      langkah_more_desc: "Panduan bertahap dari pengenalan dasar hingga hisab hilal tersedia di halaman khusus pembelajaran."
    },
    en: {
      page_title: "Learn Islamic Astronomy | Islamic Literacy Portal",
      nav_home: "Home", nav_ramadhan: "Imsakiyah Schedule",
      hero_title: "Learn Islamic Astronomy",
      hero_desc: "Interactive learning module on Islamic astronomy: from basic introduction to practical simulation of qibla direction, prayer times, and the Hijri calendar.",
      brand_portal: "Islamic Literacy Portal",
      nav_label: "Menu",
      section1_title: "Introduction to Islamic Astronomy",
      intro_p1: "Islamic astronomy (ilm al-falak) is the branch of science that studies the motion of celestial bodies for worship and time determination in Islam.",
      intro_p2: "The importance of Islamic astronomy in Islam is related to prayer times, qibla direction, determination of the beginning of Hijri months (including Ramadan and Shawwal), and hilal calculation to determine when the new month begins.",
      intro_role1: "Prayer Times", intro_role2: "Qibla Direction", intro_role3: "Hijri Calendar", intro_role4: "Hilal Calculation",
      section2_title: "Learning Topics",
      topik1_title: "Qibla Direction", topik1_desc: "Determining the direction of the Kaaba from anywhere in the world.",
      topik2_title: "Prayer Times", topik2_desc: "Determining the five daily prayer times based on the Sun's position.",
      topik3_title: "Hijri Calendar", topik3_desc: "Lunar-based calendar system in Islam.",
      topik4_title: "Hilal Calculation", topik4_desc: "Mathematical calculation to determine the new moon's appearance.",
      topik5_title: "Eclipse in Islamic Astronomy", topik5_desc: "Eclipse prayer (kusuf & khusuf) and its astronomical phenomena.",
      accordion_qibla: "Qibla direction is determined by calculating the angle from North clockwise to the Kaaba in Mecca. Kaaba coordinates: 21°25'21\"N, 39°49'34\"E. The calculation uses spherical trigonometry based on the observer's latitude and longitude.",
      accordion_shalat: "Prayer times are determined by the Sun's position: Fajr at astronomical twilight, Dhuhr when the Sun crosses the meridian, Asr when shadow = object length + shadow at noon, Maghrib at sunset, Isha when twilight disappears.",
      accordion_kalender: "The Hijri calendar is based on the lunar cycle. One month = one lunar revolution (~29.5 days). Hijri leap years add 1 day in 11 of 30 years (Kamilah or Basithah system).",
      accordion_hilal: "Hilal calculation determines when conjunction (ijtima) occurs and whether at sunset the crescent is above the horizon. Indonesian imkanur rukyat criteria: elongation ≥6.4° and hilal altitude ≥3°.",
      accordion_gerhana: "Solar eclipse (kusuf) and lunar eclipse (khusuf) are signs of Allah's power. The Prophet commanded eclipse prayer when they occur. Eclipses happen when the Moon, Earth, and Sun align.",
      section3_title: "Falak Simulation",
      section3_desc: "Hands-on practice with simple tools.",
      tool1_title: "Qibla Direction Calculator", tool1_lat: "Latitude (°)", tool1_lon: "Longitude (°)",
      tool2_title: "Hijri-Gregorian Converter", tool2_mode: "Mode", tool2_g2h: "Gregorian → Hijri", tool2_h2g: "Hijri → Gregorian",
      tool2_day: "Day", tool2_month: "Month", tool2_year: "Year",
      tool3_title: "Prayer Times Schedule", tool3_desc: "Using your location.", tool3_btn: "Show Schedule",
      btn_calc: "Calculate", btn_convert: "Convert",
      result_qibla: "Qibla degree: {{deg}}° (from North, clockwise)",
      result_loc_err: "Location unavailable. Enter coordinates manually.",
      result_hijri_loading: "Loading...",
      result_hijri_invalid_year: "Hijri year must be 4 digits (e.g. 1446)",
      result_shalat_loading: "Loading schedule...",
      shalat_fajr: "Fajr", shalat_sunrise: "Sunrise", shalat_dhuhr: "Dhuhr", shalat_asr: "Asr", shalat_sunset: "Sunset", shalat_maghrib: "Maghrib", shalat_isha: "Isha",
      section4_title: "Key Falak Terms",
      term_zenith: "Zenith", def_zenith: "The point directly above the observer in the sky.",
      term_azimuth: "Azimuth", def_azimuth: "Angle from North to horizontal direction (0°–360°).",
      term_ijtima: "Ijtima", def_ijtima: "Conjunction; Moon in line with the Sun (astronomical new moon).",
      term_elongasi: "Elongation", def_elongasi: "Angular separation between the Moon and the Sun in the sky.",
      term_ufuk: "Horizon", def_ufuk: "The boundary line between sky and earth in the observer's view.",
      term_rukyat: "Rukyat", def_rukyat: "Observation of the crescent with the naked eye or telescope.",
      term_hisab: "Hisab", def_hisab: "Astronomical calculation to determine celestial positions.",
      section5_title: "Steps to Learn Falak",
      step1_title: "Basic Introduction", step1_desc: "Understand what Islamic astronomy is and its relation to Islamic worship.",
      step2_title: "Qibla Direction", step2_desc: "Learn how to determine the Kaaba direction from your location.",
      step3_title: "Prayer Times", step3_desc: "Understand the determination of Fajr, Dhuhr, Asr, Maghrib, and Isha times.",
      step4_title: "Hijri Calendar", step4_desc: "Learn the lunar calendar system and its difference from the Gregorian calendar.",
      step5_title: "Hilal Calculation", step5_desc: "Learn hilal calculation for determining the new month.",
      footer_portal: "Islamic Literacy Portal", footer_desc: "Islamic scholarship based on literature and academic analysis.",
      footer_tools: "Tools", footer_zakat: "Zakat Calculator", footer_ramadhan: "Imsakiyah Schedule", footer_falak: "Learn Islamic Astronomy",
      footer_note: "Note", footer_disclaimer: "This module is for education. Calculation results should be verified with official sources.",
      footer_about: "About", footer_contact: "Contact", footer_faq: "FAQ",
      footer_copy: "© 2026 Islamic Literacy Portal",
      err_invalid_input: "Invalid input.",
      err_invalid_response: "Invalid response.",
      err_generic: "An error occurred.",
      err_network: "Connection failed. Check your network.",
      err_api: "API temporarily unavailable.",
      err_no_data: "No data available.",
      disclaimer_muqoddimah: "This module is still a muqaddimah (introduction). Full content will be developed gradually. For in-depth study, please refer to falak literature or official institutions.",
      langkah_more: "Start Learning Falak",
      langkah_more_desc: "Step-by-step guide from basic introduction to hilal calculation is available on the dedicated learning page."
    },
    ar: {
      page_title: "تعلم علم الفلك | بوابة الثقافة الإسلامية",
      nav_home: "الرئيسية", nav_ramadhan: "جدول الإمساكية",
      hero_title: "تعلم علم الفلك",
      hero_desc: "وحدة تعليمية تفاعلية في علم الفلك الإسلامي: من المقدمة الأساسية إلى المحاكاة العملية لاتجاه القبلة وأوقات الصلاة والتقويم الهجري.",
      brand_portal: "بوابة الثقافة الإسلامية",
      nav_label: "القائمة",
      section1_title: "مقدمة في علم الفلك",
      intro_p1: "علم الفلك الإسلامي هو الفرع الذي يدرس حركة الأجرام السماوية لصالح العبادة وتحديد الوقت في الإسلام.",
      intro_p2: "أهمية علم الفلك في الإسلام تتعلق بأوقات الصلاة، واتجاه القبلة، وتحديد بداية الأشهر الهجرية (بما فيها رمضان وشوال)، وحساب الهلال لتحديد بداية الشهر الجديد.",
      intro_role1: "أوقات الصلاة", intro_role2: "اتجاه القبلة", intro_role3: "التقويم الهجري", intro_role4: "حساب الهلال",
      section2_title: "مواضيع التعلم",
      topik1_title: "اتجاه القبلة", topik1_desc: "تحديد اتجاه الكعبة من أي مكان في العالم.",
      topik2_title: "أوقات الصلاة", topik2_desc: "تحديد أوقات الصلوات الخمس بناءً على موقع الشمس.",
      topik3_title: "التقويم الهجري", topik3_desc: "نظام التقويم القمري في الإسلام.",
      topik4_title: "حساب الهلال", topik4_desc: "الحساب الرياضي لتحديد ظهور الهلال الجديد.",
      topik5_title: "الكسوف في الفلك الإسلامي", topik5_desc: "صلاة الكسوف والخسوف وظواهرها الفلكية.",
      accordion_qibla: "اتجاه القبلة يُحدد بحساب الزاوية من الشمال مع اتجاه عقارب الساعة نحو الكعبة بمكة. إحداثيات الكعبة: ٢١°٢٥'٢١\"ش، ٣٩°٤٩'٣٤\"ق.",
      accordion_shalat: "أوقات الصلاة تُحدد بموقع الشمس: الفجر عند الفجر الفلكي، والظهر عند عبور الشمس خط الزوال، والعصر عندما الظل = طول الجسم + ظل الزوال، والمغرب عند الغروب، والعشاء عند زوال الشفق.",
      accordion_kalender: "التقويم الهجري يعتمد على الدورة القمرية. الشهر = دورة قمرية واحدة (~٢٩,٥ يوماً). السنوات الكبيسة تضيف يوماً في ١١ من ٣٠ سنة.",
      accordion_hilal: "حساب الهلال يحدد وقت الاقتران وهل الهلال فوق الأفق عند الغروب. معايير إمكان الرؤية الإندونيسية: الاستطالة ≥٦,٤° وارتفاع الهلال ≥٣°.",
      accordion_gerhana: "كسوف الشمس وخسوف القمر آيات من قدرة الله. النبي أمر بصلاة الكسوف عند حدوثهما. يحدث الكسوف عندما يقع القمر والأرض والشمس على خط واحد.",
      section3_title: "محاكاة الفلك",
      section3_desc: "تدريب عملي بأدوات بسيطة.",
      tool1_title: "حاسبة اتجاه القبلة", tool1_lat: "خط العرض (°)", tool1_lon: "خط الطول (°)",
      tool2_title: "تحويل الهجري-الميلادي", tool2_mode: "الوضع", tool2_g2h: "ميلادي → هجري", tool2_h2g: "هجري → ميلادي",
      tool2_day: "اليوم", tool2_month: "الشهر", tool2_year: "السنة",
      tool3_title: "جدول أوقات الصلاة", tool3_desc: "استخدام موقعك.", tool3_btn: "عرض الجدول",
      btn_calc: "احسب", btn_convert: "تحويل",
      result_qibla: "درجة القبلة: {{deg}}° (من الشمال مع عقارب الساعة)",
      result_loc_err: "الموقع غير متاح. أدخل الإحداثيات يدوياً.",
      result_hijri_loading: "جارٍ التحميل...",
      result_hijri_invalid_year: "السنة الهجرية يجب أن تكون 4 أرقام (مثلاً 1446)",
      result_shalat_loading: "جارٍ تحميل الجدول...",
      shalat_fajr: "الفجر", shalat_sunrise: "الشروق", shalat_dhuhr: "الظهر", shalat_asr: "العصر", shalat_sunset: "الغروب", shalat_maghrib: "المغرب", shalat_isha: "العشاء",
      section4_title: "مصطلحات فلكية مهمة",
      term_zenith: "سمت الرأس", def_zenith: "النقطة فوق رأس الراصد في السماء.",
      term_azimuth: "السمت", def_azimuth: "الزاوية من الشمال إلى الاتجاه الأفقي (٠°–٣٦٠°).",
      term_ijtima: "الاقتران", def_ijtima: "توافق القمر مع الشمس (المحاق الفلكي).",
      term_elongasi: "الاستطالة", def_elongasi: "الزاوية بين القمر والشمس في السماء.",
      term_ufuk: "الأفق", def_ufuk: "الخط الفاصل بين السماء والأرض في نظر الراصد.",
      term_rukyat: "الرؤية", def_rukyat: "مراقبة الهلال بالعين أو التلسكوب.",
      term_hisab: "الحساب", def_hisab: "الحساب الفلكي لتحديد مواقع الأجرام.",
      section5_title: "خطوات تعلم الفلك",
      step1_title: "المقدمة الأساسية", step1_desc: "افهم ما هو علم الفلك وكيف يرتبط بعبادة الإسلام.",
      step2_title: "اتجاه القبلة", step2_desc: "تعلم تحديد اتجاه الكعبة من موقعك.",
      step3_title: "أوقات الصلاة", step3_desc: "افهم تحديد أوقات الفجر والظهر والعصر والمغرب والعشاء.",
      step4_title: "التقويم الهجري", step4_desc: "تعلم نظام التقويم القمري واختلافه عن الميلادي.",
      step5_title: "حساب الهلال", step5_desc: "تعلم حساب الهلال لتحديد بداية الشهر.",
      footer_portal: "بوابة الثقافة الإسلامية", footer_desc: "دراسات إسلامية مبنية على الأدب والتحليل العلمي.",
      footer_tools: "الأدوات", footer_zakat: "حاسبة الزكاة", footer_ramadhan: "جدول الإمساكية", footer_falak: "تعلم علم الفلك",
      footer_note: "ملاحظة", footer_disclaimer: "هذه الوحدة للتعليم. يُنصح بالتحقق من النتائج مع المصادر الرسمية.",
      footer_about: "عن البوابة", footer_contact: "اتصل", footer_faq: "الأسئلة",
      footer_copy: "© 2026 بوابة الثقافة الإسلامية",
      err_invalid_input: "إدخال غير صحيح.",
      err_invalid_response: "استجابة غير صالحة.",
      err_generic: "حدث خطأ.",
      err_network: "فشل الاتصال. تحقق من الشبكة.",
      err_api: "الواجهة غير متاحة مؤقتاً.",
      err_no_data: "لا توجد بيانات.",
      disclaimer_muqoddimah: "هذه الوحدة لا تزال مقدمة. المحتوى الكامل سيتطور تدريجياً. للدراسة المتعمقة راجع أدب علم الفلك أو المؤسسات الرسمية.",
      langkah_more: "ابدأ تعلم الفلك",
      langkah_more_desc: "دليل تدريجي من المقدمة الأساسية إلى حساب الهلال متوفر في صفحة التعلم المخصصة."
    }
  };

  const ACCORDION = {
    qibla: "accordion_qibla", shalat: "accordion_shalat", kalender: "accordion_kalender",
    hilal: "accordion_hilal", gerhana: "accordion_gerhana"
  };

  function t(key) {
    return T[currentLang]?.[key] ?? T.id[key] ?? key;
  }

  function applyTranslations() {
    document.documentElement.lang = currentLang === "ar" ? "ar" : currentLang === "en" ? "en" : "id";
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("rtl-ui", currentLang === "ar");
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const val = t(key);
      if (val) {
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") el.placeholder = val;
        else el.textContent = val;
      }
    });
    const titleEl = document.querySelector("title");
    if (titleEl) titleEl.textContent = t("page_title");
  }

  function getQiblaDirection(lat, lon) {
    const kaabaLat = 21.4225 * Math.PI / 180;
    const kaabaLon = 39.8262 * Math.PI / 180;
    const userLat = lat * Math.PI / 180;
    const userLon = lon * Math.PI / 180;
    const dLon = kaabaLon - userLon;
    const y = Math.sin(dLon);
    const x = Math.cos(userLat) * Math.tan(kaabaLat) - Math.sin(userLat) * Math.cos(dLon);
    let bearing = Math.atan2(y, x) * 180 / Math.PI;
    return (bearing + 360) % 360;
  }

  function initQibla() {
    const latIn = document.getElementById("qibla-lat");
    const lonIn = document.getElementById("qibla-lon");
    const resultEl = document.getElementById("qibla-result");
    const btn = document.getElementById("qibla-calc");

    btn.onclick = () => {
      const lat = parseFloat(latIn.value?.replace(",", "."));
      const lon = parseFloat(lonIn.value?.replace(",", "."));
      if (Number.isNaN(lat) || Number.isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
        resultEl.textContent = t("result_loc_err");
        resultEl.style.display = "block";
        return;
      }
      const deg = Math.round(getQiblaDirection(lat, lon));
      resultEl.textContent = t("result_qibla").replace("{{deg}}", deg);
      resultEl.style.display = "block";
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          latIn.value = pos.coords.latitude.toFixed(4);
          lonIn.value = pos.coords.longitude.toFixed(4);
        },
        () => {}
      );
    }
  }

  function pad2(n) {
    return String(n).padStart(2, "0");
  }

  async function convertHijri() {
    const mode = document.getElementById("hijri-mode").value;
    const day = parseInt(document.getElementById("hijri-day").value, 10);
    const month = parseInt(document.getElementById("hijri-month").value, 10);
    const year = parseInt(document.getElementById("hijri-year").value, 10);
    const resultEl = document.getElementById("hijri-result");

    if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year)) {
      resultEl.textContent = t("err_invalid_input");
      return;
    }
    if (mode === "h2g" && year < 1000) {
      resultEl.textContent = t("result_hijri_invalid_year");
      return;
    }

    resultEl.textContent = t("result_hijri_loading");
    resultEl.style.display = "block";

    const dateStr = `${pad2(day)}-${pad2(month)}-${year}`;
    const endpoint = mode === "g2h" ? "gToH" : "hToG";
    const url = `https://api.aladhan.com/v1/${endpoint}?date=${dateStr}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.code === 200 && data.data) {
        const d = mode === "g2h" ? data.data.hijri : data.data.gregorian;
        if (d && d.day && d.month && d.year) {
          const monthName = d.month.en || d.month.ar || String(d.month.number);
          resultEl.textContent = `${d.day} ${monthName} ${d.year}`;
        } else {
          resultEl.textContent = t("err_invalid_response");
        }
      } else {
        resultEl.textContent = data.data?.reason || t("err_generic");
      }
    } catch (e) {
      resultEl.textContent = t("err_network");
    }
  }

  function initHijri() {
    const modeSelect = document.getElementById("hijri-mode");
    const dayEl = document.getElementById("hijri-day");
    const monthEl = document.getElementById("hijri-month");
    const yearEl = document.getElementById("hijri-year");

    function setDefaults() {
      if (modeSelect.value === "g2h") {
        const today = new Date();
        dayEl.value = today.getDate();
        monthEl.value = today.getMonth() + 1;
        yearEl.value = today.getFullYear();
      } else {
        dayEl.value = 1;
        monthEl.value = 9;
        yearEl.value = 1446;
      }
    }

    setDefaults();
    modeSelect.addEventListener("change", setDefaults);
    document.getElementById("hijri-calc").onclick = convertHijri;
  }

  async function loadPrayerTimes() {
    const resultEl = document.getElementById("shalat-result");
    resultEl.textContent = t("result_shalat_loading");
    resultEl.style.display = "block";

    try {
      const pos = await new Promise((res, rej) =>
        navigator.geolocation.getCurrentPosition(res, rej)
      );
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      const res = await fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=11`);
      const data = await res.json();
      if (data.code !== 200) {
        resultEl.textContent = t("err_api");
        return;
      }

      const tms = data.data.timings;
      const keys = [
        ["Fajr", "shalat_fajr"],
        ["Sunrise", "shalat_sunrise"],
        ["Dhuhr", "shalat_dhuhr"],
        ["Asr", "shalat_asr"],
        ["Sunset", "shalat_sunset"],
        ["Maghrib", "shalat_maghrib"],
        ["Isha", "shalat_isha"]
      ];

      let html = "";
      keys.forEach(([apiKey, i18nKey]) => {
        const time = (tms[apiKey] || "").slice(0, 5);
        if (time) html += `<div class="falak-shalat-item"><span>${t(i18nKey)}</span><strong>${time}</strong></div>`;
      });
      resultEl.innerHTML = html || t("err_no_data");
    } catch {
      resultEl.textContent = t("result_loc_err");
    }
  }

  function initAccordion() {
    const wrapper = document.getElementById("accordionWrapper");
    let activeId = null;

    document.querySelectorAll(".falak-topik-card").forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute("data-accordion");
        const key = ACCORDION[id];
        if (!key) return;

        if (activeId === id) {
          wrapper.innerHTML = "";
          activeId = null;
          return;
        }

        activeId = id;
        wrapper.innerHTML = `<div class="falak-accordion-content">${t(key)}</div>`;
        wrapper.scrollIntoView({ behavior: "smooth", block: "nearest" });
      };
    });
  }

  function initLang() {
    document.querySelectorAll(".falak-lang-btn").forEach(btn => {
      btn.onclick = () => {
        const lang = btn.getAttribute("data-lang");
        currentLang = lang;
        localStorage.setItem("falakLang", lang);
        document.querySelectorAll(".falak-lang-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        applyTranslations();
      };
    });
  }

  function bootstrap() {
    initLang();
    applyTranslations();
    initQibla();
    initHijri();
    document.getElementById("shalat-calc").onclick = loadPrayerTimes;
    initAccordion();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap);
  } else {
    bootstrap();
  }
})();
