(() => {
  const TARGET_PAGES = new Set([
    "haid",
    "istihadhah",
    "nifas",
    "suci",
    "iddah"
  ]);

  function getCurrentPageKey() {
    const pathname = window.location.pathname.toLowerCase();
    const rawPage = (pathname.split("/").filter(Boolean).pop() || "").toLowerCase();

    if (pathname.endsWith("/haid") || rawPage === "haid") return "haid";
    if (pathname.endsWith("/istihadhah") || rawPage === "istihadhah") return "istihadhah";
    if (pathname.endsWith("/nifas") || rawPage === "nifas") return "nifas";
    if (pathname.endsWith("/suci") || rawPage === "suci") return "suci";
    if (pathname.endsWith("/iddah") || rawPage === "iddah") return "iddah";

    return rawPage;
  }

  const page = getCurrentPageKey();
  const DEFAULT_TITLE = document.title;
  const host = window.location.hostname;
  const isLocalDev = host === "localhost" || host === "127.0.0.1";
  if (!TARGET_PAGES.has(page)) return;

  function setupProdCleanLinks() {
    if (isLocalDev) return;
  }

  const LANGS = ["id", "en", "ar"];
  const PAGE_TITLES = {
    "haid": {
      en: "Menstrual Calculator | Islamic Literacy Portal",
      ar: "حاسبة الحيض | بوابة الثقافة الإسلامية"
    },
    "istihadhah": {
      en: "Istihadhah Calculator | Islamic Literacy Portal",
      ar: "حاسبة الاستحاضة | بوابة الثقافة الإسلامية"
    },
    "nifas": {
      en: "Postpartum Calculator | Islamic Literacy Portal",
      ar: "حاسبة النفاس | بوابة الثقافة الإسلامية"
    },
    "suci": {
      en: "Purity Period Calculator | Islamic Literacy Portal",
      ar: "حاسبة مدة الطهر | بوابة الثقافة الإسلامية"
    },
    "iddah": {
      en: "Iddah Calculator | Islamic Literacy Portal",
      ar: "حاسبة العدة | بوابة الثقافة الإسلامية"
    }
  };

  const LABELS = {
    id: "Bahasa",
    en: "Language",
    ar: "اللغة"
  };

  const PHRASE_MAP = {
    en: {
      "Portal Literasi Islam": "Islamic Literacy Portal",
      "Website ini menyediakan kalkulator fiqh wanita,": "This website provides women's fiqh calculators,",
      "mawaris, dan berbagai alat bantu fiqh berbasis": "mawaris tools, and various Shafi'i-based fiqh utilities",
      "mazhab Syafi'i.": "of the Shafi'i school.",
      "© 2026 Fiqh Wanita – Mazhab Syafi'i": "© 2026 Women's Fiqh – Shafi'i School",
      "© 2026 Fiqh Wanita - Mazhab Syafi'i": "© 2026 Women's Fiqh - Shafi'i School",

      "Fiqh Wanita": "Women's Fiqh",
      "Beranda": "Home",
      "Hitung Mawaris": "Mawaris Calculator",
      "Tentang": "About",
      "Kontak": "Contact",
      "Privacy Policy": "Privacy Policy",
      "Disclaimer": "Disclaimer",
      "Seluruh hak cipta dilindungi.": "All rights reserved.",
      "Kalkulator Haid": "Menstrual Calculator",
      "Kalkulator Nifas": "Postpartum Calculator",
      "Kalkulator Masa Suci": "Purity Period Calculator",
      "Kalkulator Iddah": "Iddah Calculator",
      "Kalkulator Masa Iddah": "Iddah Period Calculator",
      "Kalkulator Istihadhah": "Istihadhah Calculator",
      "Kalkulator Fiqh Wanita - Mazhab Syafi'i": "Women's Fiqh Calculator - Shafi'i School",
      "Kalkulator Fiqh Wanita – Mazhab Syafi'i": "Women's Fiqh Calculator - Shafi'i School",
      "Fiqh Wanita – Mazhab Syafi'i": "Women's Fiqh – Shafi'i School",
      "Fiqh Wanita - Mazhab Syafi'i": "Women's Fiqh - Shafi'i School",
      "Kalkulator فقه المرأة - Mazhab Syafi'i": "Women's Fiqh Calculator - Shafi'i School",
      "Mazhab Syafi'i - Sistem Fiqh Wanita": "Shafi'i School - Women's Fiqh System",
      "Mazhab Syafi'i – Sistem Fiqh Wanita": "Shafi'i School - Women's Fiqh System",
      "Mazhab Syafi'i - Sistem فقه المرأة": "Shafi'i School - Women's Fiqh System",
      "Haid": "Menstruation",
      "Nifas": "Postpartum",
      "Iddah": "Iddah",
      "Masa Suci": "Purity Period",
      "Mazhab Syafi'i – Sistem Fiqh Wanita": "Shafi'i School - Women's Fiqh System",
      "Menghitung masa nifas menurut fiqh Syafi'i": "Calculating postpartum period according to Shafi'i fiqh.",
      "Menghitung masa suci minimal antara dua haid menurut fiqh": "Calculating minimum purity period between two menstruations according to fiqh.",
      "Menghitung masa iddah menurut fiqh Islam": "Calculating iddah period according to Islamic fiqh.",
      "Menentukan darah haid dan istihadhah menurut mazhab Syafi'i": "Determine menstruation and istihadhah blood according to the Shafi'i school.",
      "Dalam mazhab Syafi'i jika darah keluar melebihi masa kebiasaan haid,": "In the Shafi'i school, if bleeding exceeds the usual menstruation period,",
      "maka setelah masa tersebut dihukumi istihadhah.": "then after that period it is treated as istihadhah.",
      "Wanita tetap wajib shalat dan berwudhu setiap masuk waktu shalat.": "The woman remains obliged to pray and perform wudu at each prayer time.",
      "Dalam mazhab Syafi'i, maksimal masa nifas adalah 60 hari.": "In the Shafi'i school, the maximum postpartum period is 60 days.",
      "Jika darah berhenti sebelum itu maka wanita wajib mandi": "If bleeding stops before that, she must perform ghusl",
      "dan kembali melaksanakan shalat.": "and return to prayer.",
      "Dalam mazhab Syafi'i masa suci minimal antara dua haid adalah 15 hari.": "In the Shafi'i school, the minimum purity period between two menstruations is 15 days.",
      "Jika darah keluar sebelum itu maka dihukumi istihadhah.": "If bleeding appears before that, it is considered istihadhah.",
      "Dalam mazhab Syafi'i, quru berarti masa suci di antara dua haid.": "In the Shafi'i school, quru means the purity period between menstruations.",
      "Iddah selesai setelah tiga masa suci.": "Iddah ends after three purity periods.",

      "Tanggal Selesai Haid Sebelumnya (Opsional)": "Previous Menstruation End Date (Optional)",
      "Tanggal Mulai Darah": "Bleeding Start Date",
      "Tanggal Selesai Darah": "Bleeding End Date",
      "Status Wanita": "Woman Status",
      "Jumlah Hari Darah Kuat": "Strong-Blood Days",
      "Masukkan jumlah hari darah kuat": "Enter strong-blood days",
      "Kebiasaan Haid (Hari)": "Menstruation Habit (Days)",
      "Isi jika Mu’tadah / Mustahadhah": "Fill if Mu'tadah / Mustahadhah",
      "Isi jika Mu'tadah / Mustahadhah": "Fill if Mu'tadah / Mustahadhah",
      "Hitung Sekarang": "Calculate Now",
      "Mubtadi’ah (Pertama Kali)": "Mubtadi'ah (First Time)",
      "Mubtadi'ah (Pertama Kali)": "Mubtadi'ah (First Time)",
      "Mubtadi’ah (Pertama kali)": "Mubtadi'ah (First Time)",
      "Mubtadi'ah (Pertama kali)": "Mubtadi'ah (First Time)",
      "Mubtadiah (Pertama Kali)": "Mubtadi'ah (First Time)",
      "Mubtadiah (Pertama kali)": "Mubtadi'ah (First Time)",
      "Mu’tadah (Punya Kebiasaan)": "Mu'tadah (Has Habit)",
      "Mustahadhah (Darah Terus)": "Mustahadhah (Continuous Bleeding)",
      "Bisa membedakan darah kuat & lemah (Mumayyizah)": "Can distinguish strong and weak blood (Mumayyizah)",
      "Bisa membedakan darah kuat dan lemah (Mumayyizah)": "Can distinguish strong and weak blood (Mumayyizah)",
      "Warna darah dominan": "Dominant blood color",
      "Merah tua / hitam": "Dark red / black",
      "Merah biasa": "Normal red",
      "Merah muda": "Light red",
      "Kuning / keruh": "Yellow / cloudy",

      "Analisis Fiqh": "Fiqh Analysis",
      "Fatwa AI Fiqh": "AI Fiqh Opinion",
      "AI Fiqh Engine": "AI Fiqh Engine",
      "Jenis Wanita:": "Woman Type:",
      "Jenis wanita:": "Woman Type:",
      "Jenis wanita": "Woman type",
      "Mutahayyirah": "Mutahayyirah",
      "Mumayyizah": "Mumayyizah",
      "Mutahayyirah + Mumayyizah": "Mutahayyirah + Mumayyizah",
      "Jenis wanita: Mutahayyirah + Mumayyizah": "Woman type: Mutahayyirah + Mumayyizah",
      "نوع المرأة: Mutahayyirah + مميزة": "Woman type: Mutahayyirah + Mumayyizah",
      "Kesimpulan Hukum:": "Fiqh Ruling Summary:",
      "Kebiasaan Haid:": "Menstrual Habit:",
      "Status Darah:": "Blood Status:",
      "Hukum:": "Ruling:",
      "Perkiraan siklus berikutnya:": "Estimated next cycle:",
      "Tanggal Hijriyah:": "Hijri Date:",
      "Perkiraan durasi haid:": "Estimated menstruation duration:",
      "Prediksi 6 Bulan": "6-Month Prediction",
      "Timeline Fiqh": "Fiqh Timeline",
      "Riwayat Siklus": "Cycle History",
      "Download Riwayat": "Download History",
      "Reset Riwayat": "Reset History",
      "Lanjut ke Kalkulator Istihadhah ?": "Continue to Istihadhah Calculator?",
      "Lanjut ke Kalkulator Istihadhah →": "Continue to Istihadhah →",
      "Website ini menyediakan kalkulator fiqh wanita, mawaris, dan berbagai alat bantu fiqh berbasis mazhab Syafi'i.": "This website provides women's fiqh calculators, mawaris tools, and various Shafi'i-based fiqh utilities.",
      "Istihadhah cukup panjang, perlu perhatian.": "Istihadhah is quite prolonged and needs attention.",
      "⚠ Haid mendekati batas maksimal 15 hari.": "⚠ Menstruation is approaching the 15-day maximum.",
      "⚠ Haid mendekati batas maksimal fiqh Syafi'i (15 hari).": "⚠ Menstruation is approaching the Shafi'i fiqh maximum (15 days).",
      "⚠ Istihadhah cukup panjang.": "⚠ Istihadhah is quite prolonged.",
      "⚠ Siklus haid tidak stabil.": "⚠ Menstrual cycle is unstable.",

      "Siklus Terpanjang": "Longest Cycle",
      "Siklus Terpendek": "Shortest Cycle",
      "Status Siklus": "Cycle Status",
      "Rata-rata Suci": "Average Purity",
      "Rata-rata Haid": "Average Menstruation",
      "Rata-rata Haid:": "Average Menstruation:",
      "Masa Suci": "Purity Period",
      "Masa Suci:": "Purity Period:",
      "Durasi Haid": "Menstruation Duration",
      "Total Darah": "Total Bleeding",

      "⏱️ Durasi Haid": "⏱️ Menstruation Duration",
      "🩸 Total Darah": "🩸 Total Bleeding",
      "📅 Perkiraan siklus berikutnya:": "📅 Estimated next cycle:",
      "Fitur": "Features",
      "Kalkulator Mawaris": "Mawaris Calculator",
      "Artikel Fiqh": "Fiqh Articles",
      "Referensi": "References",

      "Hasil akan muncul di sini": "Results will appear here",
      "Hasil Perhitungan": "Calculation Result",
      "Mulai Darah:": "Bleeding Starts:",
      "Masa Haid (sesuai kebiasaan):": "Menstruation Period (based on habit):",
      "Setelah itu dihukumi Istihadhah": "After that it is treated as Istihadhah",
      "Maksimal haid adalah 15 hari, selebihnya dihukumi istihadhah.": "Maximum menstruation is 15 days, the rest is treated as istihadhah.",
      "Kaidah fiqh:": "Fiqh rules:",
      "• Minimal haid: 1 hari 1 malam": "- Minimum menstruation: 1 day and 1 night",
      "• Maksimal haid: 15 hari": "- Maximum menstruation: 15 days",
      "• Minimal suci antara dua haid: 15 hari": "- Minimum purity between two menstruations: 15 days",
      "Minimal haid: 1 hari 1 malam": "Minimum menstruation: 1 day and 1 night",
      "Maksimal haid: 15 hari": "Maximum menstruation: 15 days",
      "Minimal suci antara dua haid: 15 hari": "Minimum purity between two menstruations: 15 days",
      "Dalam mazhab Syafi'i wanita yang mengalami darah terus menerus": "In the Shafi'i school, women with continuous bleeding",
      "kembali kepada kebiasaan haidnya.": "return to their habitual menstruation period.",
      "<p><b>Setelah itu dihukumi Istihadhah</b></p>": "<p><b>After that it is treated as Istihadhah</b></p>",
      "<b>Kaidah fiqh:</b><br>â€¢ Minimal haid: 1 hari 1 malam<br>â€¢ Maksimal haid: 15 hari<br>â€¢ Minimal suci antara dua haid: 15 hari": "<b>Fiqh rules:</b><br>- Minimum menstruation: 1 day and 1 night<br>- Maximum menstruation: 15 days<br>- Minimum purity between two menstruations: 15 days",
      "Hari mulai keluar darah": "Bleeding start day",
      "Kebiasaan Haid (hari)": "Menstruation habit (days)",
      "Hari berhenti darah (opsional)": "Bleeding stop day (optional)",
      "contoh: 7": "example: 7",
      "Jenis Kondisi": "Condition type",
      "Mu'tadah (punya kebiasaan)": "Mu'tadah (has habit)",
      "Mu’tadah (punya kebiasaan)": "Mu'tadah (has habit)",
      "Mu'tadah (punya kebiasaan haid)": "Mu'tadah (has menstruation habit)",
      "Mu’tadah (punya kebiasaan haid)": "Mu'tadah (has menstruation habit)",
      "Mumayyizah (bisa bedakan darah)": "Mumayyizah (can distinguish blood type)",
      "Mutahayyirah (bingung)": "Mutahayyirah (uncertain)",
      "Hitung": "Calculate",
      "Penjelasan Fiqh": "Fiqh Explanation",
      "Hari ini": "Today",

      "Tanggal Melahirkan": "Delivery date",
      "Hitung Nifas": "Calculate Postpartum Period",
      "Hasil Perhitungan Nifas": "Postpartum Calculation Result",
      "Maksimal Nifas": "Maximum Postpartum",
      "Perkiraan Selesai:": "Estimated End:",
      "Status Saat Ini:": "Current Status:",
      "Timeline Nifas": "Postpartum Timeline",
      "Nifas Umum": "Common Postpartum",
      "Nifas Umum (1-40 hari)": "Common postpartum (1-40 days)",
      "Maksimal Nifas (41-60 hari)": "Maximum postpartum (41-60 days)",
      "Nifas Umum (1–40 hari)": "Common postpartum (1-40 days)",
      "Maksimal Nifas (41–60 hari)": "Maximum postpartum (41-60 days)",
      "Kalkulator Fiqh Wanita – Mazhab Syafi'i": "Women's Fiqh Calculator - Shafi'i School",
      "© 2026 Fiqh Wanita – Mazhab Syafi'i": "© 2026 Women's Fiqh - Shafi'i School",

      "Tanggal Selesai Haid": "Menstruation end date",
      "Selesai Haid:": "Menstruation End:",
      "Masa Suci Minimal:": "Minimum Purity Period:",
      "Boleh Haid Lagi Mulai:": "Menstruation Allowed Again From:",
      "Timeline Masa Suci": "Purity Period Timeline",
      "Hitung Masa Suci": "Calculate Purity Period",
      "Masa suci minimal telah terpenuhi.": "Minimum purity period has been fulfilled.",
      "Kalender Fiqh Wanita": "Women's Fiqh Calendar",
      "Boleh Haid": "Menstruation Allowed",
      "Masa Suci": "Purity Period",

      "Jenis Iddah": "Iddah type",
      "Talak (3 Quru')": "Divorce (3 Quru')",
      "Talak sebelum Dukhul": "Divorce before consummation",
      "Wafat": "Widowhood",
      "Hamil": "Pregnancy",
      "Fasakh / Pembatalan Nikah": "Annulment / Marriage Cancellation",
      "Tanggal Mulai": "Start date",
      "Hitung Masa Iddah": "Calculate Iddah Period",
      "Hasil Perhitungan Iddah": "Iddah Calculation Result",
      "Jenis Iddah:": "Iddah Type:",
      "Durasi:": "Duration:",
      "Berakhir:": "Ends:",
      "Timeline Iddah": "Iddah Timeline",
      "Quru 1": "Quru 1",
      "Quru 2": "Quru 2",
      "Quru 3": "Quru 3",
      "3 Quru": "3 Quru",
      "Catatan Selama Masa Iddah": "Notes During Iddah",
      "Referensi Kitab": "Reference Books",
      "Rata-rata Haid:": "Average Menstruation:",

      "Tanggal belum lengkap.": "Dates are incomplete.",
      "Tanggal tidak valid.": "Invalid date.",
      "Masukkan jumlah hari darah kuat.": "Enter strong-blood days.",
      "Isi kebiasaan 1–15 hari.": "Enter habit 1-15 days.",
      "Isi kebiasaan sebelumnya 1–15 hari.": "Enter previous habit 1-15 days.",
      "Masa haid maksimal dalam fiqh adalah 15 hari": "Maximum menstruation in fiqh is 15 days.",
      "Masa haid maksimal adalah 15 hari": "Maximum menstruation is 15 days.",
      "Minimal haid adalah 1 hari": "Minimum menstruation is 1 day.",
      "Isi semua data": "Fill all required fields.",
      "Tanggal berhenti darah tidak boleh sebelum mulai darah": "Stop date cannot be before start date.",
      "Masukkan tanggal melahirkan": "Enter delivery date.",
      "Belum melahirkan": "Not yet delivered",
      "Masa nifas maksimal telah selesai": "Maximum postpartum period has ended",
      "Masukkan tanggal selesai haid": "Enter menstruation end date.",
      "Masukkan tanggal mulai": "Enter start date.",
      "Belum mulai": "Not started yet",
      "Iddah selesai": "Iddah completed",
      "Tidak boleh menikah": "Marriage is not allowed",
      "Tidak boleh berhias secara berlebihan": "Avoid excessive adornment",
      "Tidak keluar rumah tanpa kebutuhan": "Do not leave home without need",
      "Boleh dilamar secara sindiran": "May receive indirect proposals",
      "Suami boleh rujuk jika talak raj'i": "Husband may reconcile if divorce is revocable",
      "Boleh berhias": "Adornment is allowed",
      "Tidak ada masa iddah": "No iddah period",
      "Iddah selesai saat melahirkan": "Iddah ends at delivery",
      "Tidak boleh menikah selama iddah": "Marriage is not allowed during iddah",
      "Tidak ada iddah": "No iddah",
      "Sampai melahirkan": "Until delivery",
      "Pendapat ulama fiqh": "Opinion of fiqh scholars",
      "Stabil": "Stable",
      "Tidak Stabil": "Unstable",
      "Analisis Sistem:": "System Analysis:",
      "Status:": "Status:",
      "Total Darah:": "Total Bleeding:",
      "Haid sah.": "Valid menstruation.",
      "Melebihi 15 hari -> 15 hari haid, sisanya istihadhah.": "Exceeds 15 days -> 15 days menstruation, the rest is istihadhah.",
      "Melebihi 15 hari → 15 hari haid, sisanya istihadhah.": "Exceeds 15 days -> 15 days menstruation, the rest is istihadhah.",
      "Mubtadi'ah Mumayyizah -> Darah kuat dihitung haid.": "Mubtadi'ah Mumayyizah -> Strong blood is counted as menstruation.",
      "Mubtadi’ah Mumayyizah → Darah kuat dihitung haid.": "Mubtadi'ah Mumayyizah -> Strong blood is counted as menstruation.",
      "Mu'tadah -> kembali ke kebiasaan.": "Mu'tadah -> return to habitual duration.",
      "Mu’tadah → kembali ke kebiasaan.": "Mu'tadah -> return to habitual duration.",
      "Mustahadhah -> kembali ke kebiasaan.": "Mustahadhah -> return to habitual duration.",
      "Mustahadhah → kembali ke kebiasaan.": "Mustahadhah -> return to habitual duration.",
      "Tamyiz tidak sah -> kembali ke hukum maksimal 15 hari.": "Invalid tamyiz -> return to maximum 15-day rule.",
      "Tamyiz tidak sah → kembali ke hukum maksimal 15 hari.": "Invalid tamyiz -> return to maximum 15-day rule.",
      "Wajib Mandi:": "Ghusl Required:",
      "Status Sholat:": "Prayer Status:",
      "Istihadhah (belum mencapai minimal suci 15 hari)": "Istihadhah (has not reached minimum 15-day purity)",
      "Tidak boleh sholat.": "Prayer is not allowed.",
      "Wajib sholat setelah hari ke-15.": "Prayer is required after day 15.",
      "Wajib sholat setelah hari kebiasaan.": "Prayer is required after habitual days.",
      "Wajib sholat setelah darah kuat selesai.": "Prayer is required after strong blood ends.",
      "Wajib sholat setelah masa haid selesai.": "Prayer is required after menstruation ends.",
      "Setelah darah berhenti.": "After bleeding stops.",
      "Setelah hari ke-15 atau darah berhenti.": "After day 15 or bleeding stops.",
      "Setelah hari ke-15.": "After day 15.",
      "Setelah hari kebiasaan selesai.": "After habitual days end.",
      "Setelah darah kuat selesai.": "After strong blood ends.",
      "Belum ada kebiasaan": "No habit yet",
      "Mubtada'ah (pertama haid)": "Mubtadi'ah (first menstruation)",
      "(punya pola siklus)": "(has cycle pattern)",
      "+ Mumayyizah": "+ Mumayyizah",
      "Mubtadi'ah": "Mubtadi'ah",
      "Mu'tadah": "Mu'tadah",
      "Mutahayyirah (siklus tidak stabil)": "Mutahayyirah (unstable cycle)",
      "mubtadiah": "Mubtadi'ah",
      "mustahadhah": "Mustahadhah",
      "mu'tadah": "Mu'tadah",
      "mutadayah": "Mu'tadah",
      "mumayyizah": "Mumayyizah",
      "mutahayyirah": "Mutahayyirah",
      "talak": "Divorce",
      "talakQabla": "Divorce before consummation",
      "wafat": "Widowhood",
      "hamil": "Pregnancy",
      "fasakh": "Annulment",
      "Sebagian darah dihukumi haid dan selebihnya istihadhah.": "Part of the blood is considered menstruation and the rest istihadhah.",
      "Seluruh darah dihukumi haid.": "All blood is considered menstruation.",
      "Semua darah dihukumi haid.": "All blood is considered menstruation.",
      "Hari pertama sampai ke-15 haid, selebihnya istihadhah.": "Days 1 to 15 are menstruation, the rest is istihadhah.",
      "<p><b>Darah berhenti dalam masa haid</b></p>": "<p><b>Bleeding stopped within menstruation period</b></p>",
      "<br>Haid": "<br>Menses",
      "<br>Suci": "<br>Purity",
      "| Haid:": "| Menses:",
      "Darah kuat (ciri haid)": "Strong blood (menstruation sign)",
      "Kemungkinan haid": "Possible menstruation",
      "Ciri istihadhah": "Istihadhah sign",
      "Berdasarkan data yang dimasukkan,": "Based on the entered data,",
      "Kebiasaan haid wanita ini adalah": "Her menstruation habit is",
      "wanita ini tergolong mu'tadah (memiliki kebiasaan haid).": "this woman is classified as mu'tadah (has menstruation habit).",
      "wanita ini tergolong mubtadi'ah (pertama kali mengalami haid).": "this woman is classified as mubtadi'ah (first menstruation).",
      "wanita ini mengalami istihadhah dan kembali kepada kebiasaan haidnya.": "this woman is experiencing istihadhah and returns to her menstruation habit.",
      "Darah selama": "Bleeding for",
      "hari dihukumi haid.": "days is considered menstruation.",
      "Sedangkan darah setelahnya selama": "Meanwhile the following bleeding for",
      "hari dihukumi istihadhah.": "days is considered istihadhah.",
      "Seluruh darah selama": "All bleeding for",
      "Menurut mazhab Syafi'i batas maksimal haid adalah 15 hari.": "According to the Shafi'i school, the maximum menstruation period is 15 days.",
      "Apabila darah melebihi 15 hari maka selebihnya dihukumi istihadhah.": "If bleeding exceeds 15 days, the rest is considered istihadhah.",
      "Referensi: Kifayatul Akhyar - Bab Al-Haid": "Reference: Kifayatul Akhyar - Chapter of Menstruation",
      "Referensi: Kifayatul Akhyar, Bab Al-Haid.": "Reference: Kifayatul Akhyar, Chapter of Menstruation.",
      "Durasi haid sangat pendek. Dalam fiqh Syafi'i minimal haid adalah 1 hari 1 malam.": "The menstruation duration is very short. In Shafi'i fiqh, the minimum is one day and one night.",
      "Wanita tetap wajib shalat dan wudhu setiap waktu shalat": "The woman remains obliged to pray and renew wudu at each prayer time.",
      "Dalam mazhab Syafi'i wanita yang mengalami darah terus menerus kembali kepada kebiasaan haidnya.": "In the Shafi'i school, women with continuous bleeding return to their menstruation habit.",
      "Durasi haid normal menurut kebiasaan mayoritas wanita.": "The menstruation duration is normal for most women.",
      "Durasi haid cukup panjang namun masih dalam batas umum.": "The menstruation duration is quite long but still within common limits.",
      "Durasi haid panjang. Perlu memastikan tidak mendekati batas maksimal 15 hari.": "The menstruation duration is long. Ensure it does not approach 15 days.",
      "Siklus haid tampak tidak stabil.": "Menstrual cycle appears unstable.",
      "Pola haid berbeda dari kebiasaan.": "Menstrual pattern differs from habit.",
      "Sistem memiliki cukup data untuk analisis pola siklus.": "The system has enough data for cycle pattern analysis.",
      "Haid mendekati batas maksimal 15 hari.": "Menstruation is approaching the 15-day maximum.",
      "Haid mendekati batas maksimal fiqh Syafi'i (15 hari).": "Menstruation is approaching the Shafi'i fiqh maximum (15 days).",
      "Siklus haid tidak stabil.": "Menstrual cycle is unstable.",
      "Masa suci minimal telah terpenuhi. Jika keluar darah sekarang bisa dihukumi haid.": "Minimum purity period is complete. If bleeding appears now, it can be considered menstruation.",
      "Masih dalam masa suci minimal. Tersisa": "Still in minimum purity period. Remaining",
      "Iddah fasakh sama seperti iddah talak.": "Iddah for annulment is the same as divorce iddah.",
      "Talak sebelum terjadi hubungan suami istri tidak mewajibkan iddah.": "Divorce before consummation does not require iddah.",
      "Iddah wanita yang ditalak adalah tiga quru. Menurut mazhab Syafi'i, quru ditafsirkan sebagai masa suci di antara dua haid.": "Iddah for divorced women is three quru. In Shafi'i fiqh, quru means purity period between menstruations.",
      "Wanita hamil masa iddahnya sampai melahirkan.": "For pregnant women, iddah lasts until delivery.",
      "Wanita yang ditinggal wafat suaminya wajib menjalani masa iddah selama empat bulan sepuluh hari.": "A widow must observe iddah for four months and ten days.",
      "Sedang menjalani masa iddah (hari ke": "Currently in iddah period (day",
      ") | tersisa": ") | remaining",
      "hari berdasarkan data haid)": "days based on menstruation data)",
      "| Sisa": "| Remaining",
      "Hari ke": "Day",
      "3 quru (estimasi 3 bulan)": "3 quru (estimated 3 months)",
      "3 quru (": "3 quru (",
      "4 bulan 10 hari": "4 months 10 days",
      "Sampai melahirkan": "Until delivery",
      "Tidak ada iddah": "No iddah",
      "QS Al-Ahzab 49": "Qur'an Al-Ahzab 49",
      "QS Al-Baqarah 234": "Qur'an Al-Baqarah 234",
      "QS Al-Baqarah ayat 228": "Qur'an Al-Baqarah 228",
      "QS At-Thalaq 4": "Qur'an At-Talaq 4",
      "Kifayatul Akhyar": "Kifayatul Akhyar",
      "Fathul Qarib": "Fathul Qarib",
      "Al-Majmu'": "Al-Majmu'",
      "Tuhfatul Muhtaj": "Tuhfatul Muhtaj",
      "Al-Ibanah Wal Ifadhah": "Al-Ibanah Wal Ifadhah",
      "Riwayat terakhir:": "Latest history:",
      "Haid + Istihadhah": "Menstruation + Istihadhah",
      "Haid": "Menses",
      "Istihadhah": "Istihadhah",
      "Istih.": "Istih.",
      "Suci": "Purity",
      "Prediksi": "Prediction",
      "hari": "days",
      "Min": "Sun",
      "Sen": "Mon",
      "Sel": "Tue",
      "Rab": "Wed",
      "Kam": "Thu",
      "Jum": "Fri",
      "Sab": "Sat",
      "Januari": "January",
      "Februari": "February",
      "Maret": "March",
      "April": "April",
      "Mei": "May",
      "Juni": "June",
      "Juli": "July",
      "Rabiul Awal": "Rabi al-Awwal",
      "Rabiul Akhir": "Rabi al-Akhir",
      "Jumadil Awal": "Jumada al-Ula",
      "Jumadil Akhir": "Jumada al-Akhirah",
      "Sya'ban": "Sha'ban",
      "Ramadhan": "Ramadan",
      "Syawal": "Shawwal",
      "Dzulqa'dah": "Dhu al-Qa'dah",
      "Dzulhijjah": "Dhu al-Hijjah",
      "Muharram": "Muharram",
      "Safar": "Safar",
      "Rajab": "Rajab",
      "Dzulqa'dah": "Dhu al-Qa'dah",
      "Agustus": "August",
      "September": "September",
      "Oktober": "October",
      "November": "November",
      "Desember": "December"
    },
    ar: {
      "Portal Literasi Islam": "بوابة الثقافة الإسلامية",
      "Website ini menyediakan kalkulator fiqh wanita,": "يوفر هذا الموقع حاسبات فقه المرأة،",
      "mawaris, dan berbagai alat bantu fiqh berbasis": "وأدوات المواريث ومختلف الوسائل الفقهية المعتمدة على",
      "mazhab Syafi'i.": "المذهب الشافعي.",
      "© 2026 Fiqh Wanita – Mazhab Syafi'i": "© 2026 فقه المرأة – المذهب الشافعي",
      "© 2026 Fiqh Wanita - Mazhab Syafi'i": "© 2026 فقه المرأة - المذهب الشافعي",

      "Fiqh Wanita": "فقه المرأة",
      "Beranda": "الرئيسية",
      "Hitung Mawaris": "حاسبة المواريث",
      "Tentang": "من نحن",
      "Kontak": "تواصل",
      "Privacy Policy": "سياسة الخصوصية",
      "Disclaimer": "إخلاء المسؤولية",
      "Seluruh hak cipta dilindungi.": "جميع الحقوق محفوظة.",
      "Kalkulator Haid": "حاسبة الحيض",
      "Kalkulator Nifas": "حاسبة النفاس",
      "Kalkulator Masa Suci": "حاسبة مدة الطهر",
      "Kalkulator Iddah": "حاسبة العدة",
      "Kalkulator Masa Iddah": "حاسبة مدة العدة",
      "Kalkulator Istihadhah": "حاسبة الاستحاضة",
      "Kalkulator Fiqh Wanita - Mazhab Syafi'i": "حاسبة فقه المرأة - المذهب الشافعي",
      "Kalkulator Fiqh Wanita – Mazhab Syafi'i": "حاسبة فقه المرأة - المذهب الشافعي",
      "Fiqh Wanita – Mazhab Syafi'i": "فقه المرأة - المذهب الشافعي",
      "Fiqh Wanita - Mazhab Syafi'i": "فقه المرأة - المذهب الشافعي",
      "Kalkulator فقه المرأة - Mazhab Syafi'i": "حاسبة فقه المرأة - المذهب الشافعي",
      "Mazhab Syafi'i - Sistem Fiqh Wanita": "المذهب الشافعي - نظام فقه المرأة",
      "Mazhab Syafi'i – Sistem Fiqh Wanita": "المذهب الشافعي - نظام فقه المرأة",
      "Mazhab Syafi'i - Sistem فقه المرأة": "المذهب الشافعي - نظام فقه المرأة",
      "Haid": "\u062d\u064a\u0636",
      "Nifas": "\u0646\u0641\u0627\u0633",
      "Iddah": "\u0639\u062f\u0629",
      "Masa Suci": "\u0645\u062f\u0629 \u0627\u0644\u0637\u0647\u0631",
      "Mazhab Syafi'i – Sistem Fiqh Wanita": "المذهب الشافعي - نظام فقه المرأة",
      "Menghitung masa nifas menurut fiqh Syafi'i": "حساب مدة النفاس وفق الفقه الشافعي",
      "Menghitung masa suci minimal antara dua haid menurut fiqh": "حساب أقل مدة طهر بين حيضتين وفق الفقه",
      "Menghitung masa iddah menurut fiqh Islam": "حساب مدة العدة وفق الفقه الإسلامي",
      "Menentukan darah haid dan istihadhah menurut mazhab Syafi'i": "تحديد دم الحيض والاستحاضة وفق المذهب الشافعي",
      "Dalam mazhab Syafi'i jika darah keluar melebihi masa kebiasaan haid,": "في المذهب الشافعي إذا تجاوز الدم مدة العادة،",
      "maka setelah masa tersebut dihukumi istihadhah.": "فما بعد ذلك يُحكم عليه بالاستحاضة.",
      "Wanita tetap wajib shalat dan berwudhu setiap masuk waktu shalat.": "وتبقى المرأة مطالبة بالصلاة والوضوء لكل وقت صلاة.",
      "Dalam mazhab Syafi'i, maksimal masa nifas adalah 60 hari.": "في المذهب الشافعي أقصى مدة النفاس 60 يومًا.",
      "Jika darah berhenti sebelum itu maka wanita wajib mandi": "فإذا انقطع الدم قبل ذلك وجب الغسل",
      "dan kembali melaksanakan shalat.": "والعودة إلى الصلاة.",
      "Dalam mazhab Syafi'i masa suci minimal antara dua haid adalah 15 hari.": "في المذهب الشافعي أقل الطهر بين حيضتين 15 يومًا.",
      "Jika darah keluar sebelum itu maka dihukumi istihadhah.": "وما نزل قبله فهو استحاضة.",
      "Dalam mazhab Syafi'i, quru berarti masa suci di antara dua haid.": "في المذهب الشافعي القرء يعني مدة الطهر بين حيضتين.",
      "Iddah selesai setelah tiga masa suci.": "تنتهي العدة بعد ثلاثة أطهار.",

      "Tanggal Selesai Haid Sebelumnya (Opsional)": "تاريخ انتهاء الحيض السابق (اختياري)",
      "Tanggal Mulai Darah": "تاريخ بداية الدم",
      "Tanggal Selesai Darah": "تاريخ توقف الدم",
      "Status Wanita": "حالة المرأة",
      "Jumlah Hari Darah Kuat": "عدد أيام الدم القوي",
      "Masukkan jumlah hari darah kuat": "أدخل عدد أيام الدم القوي",
      "Kebiasaan Haid (Hari)": "عادة الحيض (بالأيام)",
      "Isi jika Mu’tadah / Mustahadhah": "يُملأ إذا كانت معتادة / مستحاضة",
      "Isi jika Mu'tadah / Mustahadhah": "\u064a\u064f\u0645\u0644\u0623 \u0625\u0630\u0627 \u0643\u0627\u0646\u062a \u0645\u0639\u062a\u0627\u062f\u0629 / \u0645\u0633\u062a\u062d\u0627\u0636\u0629",
      "Isi jika Mu’tadah / Mustahadhah": "\u064a\u064f\u0645\u0644\u0623 \u0625\u0630\u0627 \u0643\u0627\u0646\u062a \u0645\u0639\u062a\u0627\u062f\u0629 / \u0645\u0633\u062a\u062d\u0627\u0636\u0629",
      "Hitung Sekarang": "احسب الآن",
      "Mubtadi’ah (Pertama Kali)": "مبتدئة (أول مرة)",
      "Mubtadi'ah (Pertama Kali)": "\u0645\u0628\u062a\u062f\u0626\u0629 (\u0623\u0648\u0644 \u0645\u0631\u0629)",
      "Mubtadi’ah (Pertama kali)": "مبتدئة (أول مرة)",
      "Mubtadi'ah (Pertama kali)": "\u0645\u0628\u062a\u062f\u0626\u0629 (\u0623\u0648\u0644 \u0645\u0631\u0629)",
      "Mubtadiah (Pertama Kali)": "\u0645\u0628\u062a\u062f\u0626\u0629 (\u0623\u0648\u0644 \u0645\u0631\u0629)",
      "Mubtadiah (Pertama kali)": "\u0645\u0628\u062a\u062f\u0626\u0629 (\u0623\u0648\u0644 \u0645\u0631\u0629)",
      "Mu’tadah (Punya Kebiasaan)": "معتادة (لها عادة)",
      "Mustahadhah (Darah Terus)": "مستحاضة (نزف مستمر)",
      "Bisa membedakan darah kuat & lemah (Mumayyizah)": "تستطيع التمييز بين الدم القوي والضعيف (مميزة)",
      "Bisa membedakan darah kuat dan lemah (Mumayyizah)": "تستطيع التمييز بين الدم القوي والضعيف (مميزة)",
      "Warna darah dominan": "لون الدم الغالب",
      "Merah tua / hitam": "أحمر داكن / أسود",
      "Merah biasa": "أحمر عادي",
      "Merah muda": "أحمر فاتح",
      "Kuning / keruh": "أصفر / عكر",

      "Analisis Fiqh": "تحليل فقهي",
      "Fatwa AI Fiqh": "فتوى فقهية بالذكاء الاصطناعي",
      "AI Fiqh Engine": "محرك الفقه الذكي",
      "Jenis Wanita:": "نوع المرأة:",
      "Jenis wanita:": "نوع المرأة:",
      "Jenis wanita": "نوع المرأة",
      "Mutahayyirah": "متحيرة",
      "Mumayyizah": "مميزة",
      "Mutahayyirah + Mumayyizah": "متحيرة + مميزة",
      "Jenis wanita: Mutahayyirah + Mumayyizah": "نوع المرأة: متحيرة + مميزة",
      "نوع المرأة: Mutahayyirah + مميزة": "نوع المرأة: متحيرة + مميزة",
      "Kesimpulan Hukum:": "خلاصة الحكم:",
      "Kebiasaan Haid:": "عادة الحيض:",
      "Status Darah:": "حالة الدم:",
      "Hukum:": "الحكم:",
      "Perkiraan siklus berikutnya:": "تقدير الدورة القادمة:",
      "Tanggal Hijriyah:": "التاريخ الهجري:",
      "Perkiraan durasi haid:": "تقدير مدة الحيض:",
      "Prediksi 6 Bulan": "توقع 6 أشهر",
      "Timeline Fiqh": "الخط الزمني الفقهي",
      "Riwayat Siklus": "سجل الدورات",
      "Download Riwayat": "تنزيل السجل",
      "Reset Riwayat": "إعادة ضبط السجل",
      "Lanjut ke Kalkulator Istihadhah ?": "الانتقال إلى حاسبة الاستحاضة؟",
      "Lanjut ke Kalkulator Istihadhah →": "الانتقال إلى الاستحاضة →",
      "Website ini menyediakan kalkulator fiqh wanita, mawaris, dan berbagai alat bantu fiqh berbasis mazhab Syafi'i.": "يوفر هذا الموقع حاسبات فقه المرأة والمواريث ومجموعة من الأدوات الفقهية المعتمدة على المذهب الشافعي.",
      "Istihadhah cukup panjang, perlu perhatian.": "الاستحاضة طويلة نسبيًا وتحتاج إلى الانتباه.",
      "⚠ Haid mendekati batas maksimal 15 hari.": "⚠ الحيض يقترب من الحد الأقصى البالغ 15 يومًا.",
      "⚠ Haid mendekati batas maksimal fiqh Syafi'i (15 hari).": "⚠ الحيض يقترب من الحد الأقصى في الفقه الشافعي (15 يومًا).",
      "⚠ Istihadhah cukup panjang.": "⚠ الاستحاضة طويلة نسبيًا.",
      "⚠ Siklus haid tidak stabil.": "⚠ دورة الحيض غير مستقرة.",

      "Siklus Terpanjang": "أطول دورة",
      "Siklus Terpendek": "أقصر دورة",
      "Status Siklus": "حالة الدورة",
      "Rata-rata Suci": "متوسط الطهر",
      "Rata-rata Haid": "متوسط الحيض",
      "Rata-rata Haid:": "متوسط الحيض:",
      "Masa Suci": "مدة الطهر",
      "Masa Suci:": "مدة الطهر:",
      "Durasi Haid": "مدة الحيض",
      "Total Darah": "إجمالي الدم",

      "⏱️ Durasi Haid": "⏱️ مدة الحيض",
      "🩸 Total Darah": "🩸 إجمالي الدم",
      "📅 Perkiraan siklus berikutnya:": "📅 تقدير الدورة القادمة:",
      "Fitur": "الميزات",
      "Kalkulator Mawaris": "حاسبة المواريث",
      "Artikel Fiqh": "مقالات فقهية",
      "Referensi": "المراجع",

      "Hasil akan muncul di sini": "ستظهر النتيجة هنا",
      "Hasil Perhitungan": "نتيجة الحساب",
      "Mulai Darah:": "بداية الدم:",
      "Masa Haid (sesuai kebiasaan):": "مدة الحيض (حسب العادة):",
      "Setelah itu dihukumi Istihadhah": "\u0628\u0639\u062f \u0630\u0644\u0643 \u064a\u064f\u062d\u0643\u0645 \u0639\u0644\u064a\u0647 \u0628\u0627\u0644\u0627\u0633\u062a\u062d\u0627\u0636\u0629",
      "Maksimal haid adalah 15 hari, selebihnya dihukumi istihadhah.": "\u0627\u0644\u062d\u062f \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u0644\u062d\u064a\u0636 15 \u064a\u0648\u0645\u064b\u0627\u060c \u0648\u0645\u0627 \u0632\u0627\u062f \u064a\u064f\u0639\u062f \u0627\u0633\u062a\u062d\u0627\u0636\u0629.",
      "Kaidah fiqh:": "\u0642\u0648\u0627\u0639\u062f \u0641\u0642\u0647\u064a\u0629:",
      "• Minimal haid: 1 hari 1 malam": "- \u0623\u0642\u0644 \u0627\u0644\u062d\u064a\u0636: \u064a\u0648\u0645 \u0648\u0644\u064a\u0644\u0629",
      "• Maksimal haid: 15 hari": "- \u0623\u0643\u062b\u0631 \u0627\u0644\u062d\u064a\u0636: 15 \u064a\u0648\u0645\u064b\u0627",
      "• Minimal suci antara dua haid: 15 hari": "- \u0623\u0642\u0644 \u0627\u0644\u0637\u0647\u0631 \u0628\u064a\u0646 \u062d\u064a\u0636\u062a\u064a\u0646: 15 \u064a\u0648\u0645\u064b\u0627",
      "Minimal haid: 1 hari 1 malam": "\u0623\u0642\u0644 \u0627\u0644\u062d\u064a\u0636: \u064a\u0648\u0645 \u0648\u0644\u064a\u0644\u0629",
      "Maksimal haid: 15 hari": "\u0623\u0643\u062b\u0631 \u0627\u0644\u062d\u064a\u0636: 15 \u064a\u0648\u0645\u064b\u0627",
      "Minimal suci antara dua haid: 15 hari": "\u0623\u0642\u0644 \u0627\u0644\u0637\u0647\u0631 \u0628\u064a\u0646 \u062d\u064a\u0636\u062a\u064a\u0646: 15 \u064a\u0648\u0645\u064b\u0627",
      "Dalam mazhab Syafi'i wanita yang mengalami darah terus menerus": "\u0641\u064a \u0627\u0644\u0645\u0630\u0647\u0628 \u0627\u0644\u0634\u0627\u0641\u0639\u064a\u060c \u0627\u0644\u0645\u0631\u0623\u0629 \u0627\u0644\u062a\u064a \u064a\u0633\u062a\u0645\u0631 \u0645\u0639\u0647\u0627 \u0627\u0644\u062f\u0645",
      "kembali kepada kebiasaan haidnya.": "\u062a\u0631\u062c\u0639 \u0625\u0644\u0649 \u0639\u0627\u062f\u0629 \u062d\u064a\u0636\u0647\u0627.",
      "<p><b>Setelah itu dihukumi Istihadhah</b></p>": "<p><b>بعد ذلك يُحكم عليه بالاستحاضة</b></p>",
      "<b>Kaidah fiqh:</b><br>â€¢ Minimal haid: 1 hari 1 malam<br>â€¢ Maksimal haid: 15 hari<br>â€¢ Minimal suci antara dua haid: 15 hari": "<b>قواعد فقهية:</b><br>- أقل الحيض: يوم وليلة<br>- أكثر الحيض: 15 يومًا<br>- أقل الطهر بين حيضتين: 15 يومًا",
      "Hari mulai keluar darah": "يوم بداية نزول الدم",
      "Kebiasaan Haid (hari)": "عادة الحيض (أيام)",
      "Hari berhenti darah (opsional)": "يوم توقف الدم (اختياري)",
      "contoh: 7": "مثال: 7",
      "Jenis Kondisi": "نوع الحالة",
      "Mu'tadah (punya kebiasaan)": "معتادة (لها عادة)",
      "Mu’tadah (punya kebiasaan)": "معتادة (لها عادة)",
      "Mu'tadah (punya kebiasaan haid)": "معتادة (لها عادة الحيض)",
      "Mu’tadah (punya kebiasaan haid)": "معتادة (لها عادة الحيض)",
      "Mumayyizah (bisa bedakan darah)": "مميزة (تفرق بين أنواع الدم)",
      "Mutahayyirah (bingung)": "متحيرة",
      "Hitung": "احسب",
      "Penjelasan Fiqh": "الشرح الفقهي",
      "Hari ini": "اليوم",

      "Tanggal Melahirkan": "تاريخ الولادة",
      "Hitung Nifas": "احسب النفاس",
      "Hasil Perhitungan Nifas": "نتيجة حساب النفاس",
      "Maksimal Nifas": "أقصى مدة النفاس",
      "Perkiraan Selesai:": "التاريخ المتوقع للانتهاء:",
      "Status Saat Ini:": "الحالة الحالية:",
      "Timeline Nifas": "الخط الزمني للنفاس",
      "Nifas Umum": "\u0646\u0641\u0627\u0633 \u0639\u0627\u062f\u064a",
      "Nifas Umum (1-40 hari)": "\u0646\u0641\u0627\u0633 \u0639\u0627\u062f\u064a (1-40 \u064a\u0648\u0645\u064b\u0627)",
      "Maksimal Nifas (41-60 hari)": "\u0623\u0642\u0635\u0649 \u0646\u0641\u0627\u0633 (41-60 \u064a\u0648\u0645\u064b\u0627)",
      "Nifas Umum (1–40 hari)": "نفاس معتاد (1-40 يومًا)",
      "Maksimal Nifas (41–60 hari)": "أقصى نفاس (41-60 يومًا)",
      "Kalkulator Fiqh Wanita – Mazhab Syafi'i": "حاسبة فقه المرأة - المذهب الشافعي",
      "© 2026 Fiqh Wanita – Mazhab Syafi'i": "© 2026 فقه المرأة - المذهب الشافعي",

      "Tanggal Selesai Haid": "تاريخ انتهاء الحيض",
      "Selesai Haid:": "\u0627\u0646\u062a\u0647\u0627\u0621 \u0627\u0644\u062d\u064a\u0636:",
      "Masa Suci Minimal:": "\u0623\u0642\u0644 \u0645\u062f\u0629 \u0637\u0647\u0631:",
      "Boleh Haid Lagi Mulai:": "\u064a\u062c\u0648\u0632 \u0627\u0644\u062d\u064a\u0636 \u0645\u0646:",
      "Timeline Masa Suci": "\u0627\u0644\u062e\u0637 \u0627\u0644\u0632\u0645\u0646\u064a \u0644\u0645\u062f\u0629 \u0627\u0644\u0637\u0647\u0631",
      "Hitung Masa Suci": "احسب مدة الطهر",
      "Masa suci minimal telah terpenuhi.": "اكتملت مدة الطهر الدنيا.",
      "Kalender Fiqh Wanita": "تقويم فقه المرأة",
      "Boleh Haid": "يجوز الحيض",
      "Masa Suci": "مدة الطهر",

      "Jenis Iddah": "نوع العدة",
      "Talak (3 Quru')": "طلاق (3 قروء)",
      "Talak sebelum Dukhul": "طلاق قبل الدخول",
      "Wafat": "وفاة الزوج",
      "Hamil": "حمل",
      "Fasakh / Pembatalan Nikah": "فسخ / إبطال النكاح",
      "Tanggal Mulai": "تاريخ البداية",
      "Hitung Masa Iddah": "احسب مدة العدة",
      "Hasil Perhitungan Iddah": "نتيجة حساب العدة",
      "Jenis Iddah:": "نوع العدة:",
      "Durasi:": "المدة:",
      "Berakhir:": "تنتهي في:",
      "Timeline Iddah": "الخط الزمني للعدة",
      "Quru 1": "القرء 1",
      "Quru 2": "القرء 2",
      "Quru 3": "القرء 3",
      "3 Quru": "3 قروء",
      "Catatan Selama Masa Iddah": "ملاحظات خلال العدة",
      "Referensi Kitab": "مراجع الكتب",
      "Rata-rata Haid:": "متوسط الحيض:",

      "Tanggal belum lengkap.": "التواريخ غير مكتملة.",
      "Tanggal tidak valid.": "التاريخ غير صالح.",
      "Masukkan jumlah hari darah kuat.": "أدخل عدد أيام الدم القوي.",
      "Isi kebiasaan 1–15 hari.": "أدخل العادة بين 1 و15 يومًا.",
      "Isi kebiasaan sebelumnya 1–15 hari.": "أدخل العادة السابقة بين 1 و15 يومًا.",
      "Masa haid maksimal dalam fiqh adalah 15 hari": "الحد الأقصى للحيض في الفقه 15 يومًا.",
      "Masa haid maksimal adalah 15 hari": "أقصى مدة الحيض 15 يومًا.",
      "Minimal haid adalah 1 hari": "أقل الحيض يوم واحد.",
      "Isi semua data": "يرجى إدخال جميع البيانات.",
      "Tanggal berhenti darah tidak boleh sebelum mulai darah": "لا يجوز أن يكون تاريخ توقف الدم قبل تاريخ بدايته.",
      "Masukkan tanggal melahirkan": "أدخل تاريخ الولادة.",
      "Belum melahirkan": "لم تلد بعد",
      "Masa nifas maksimal telah selesai": "انتهت مدة النفاس القصوى",
      "Masukkan tanggal selesai haid": "أدخل تاريخ انتهاء الحيض.",
      "Masukkan tanggal mulai": "أدخل تاريخ البداية.",
      "Belum mulai": "لم تبدأ بعد",
      "Iddah selesai": "انتهت العدة",
      "Tidak boleh menikah": "لا يجوز الزواج",
      "Tidak boleh berhias secara berlebihan": "لا تُظهر الزينة المبالغ فيها",
      "Tidak keluar rumah tanpa kebutuhan": "لا تخرج من البيت إلا لحاجة",
      "Boleh dilamar secara sindiran": "يجوز التعريض بالخطبة",
      "Suami boleh rujuk jika talak raj'i": "يجوز للزوج الرجعة إذا كان الطلاق رجعيًا",
      "Boleh berhias": "يجوز التزين",
      "Tidak ada masa iddah": "لا عدة",
      "Iddah selesai saat melahirkan": "تنتهي العدة بالولادة",
      "Tidak boleh menikah selama iddah": "لا يجوز الزواج أثناء العدة",
      "Tidak ada iddah": "لا عدة",
      "Sampai melahirkan": "حتى الولادة",
      "Pendapat ulama fiqh": "قول أهل الفقه",
      "Stabil": "مستقرة",
      "Tidak Stabil": "غير مستقرة",
      "Analisis Sistem:": "تحليل النظام:",
      "Status:": "الحالة:",
      "Total Darah:": "إجمالي الدم:",
      "Haid sah.": "حيض صحيح.",
      "Melebihi 15 hari -> 15 hari haid, sisanya istihadhah.": "إذا تجاوز الدم 15 يومًا فـ15 يومًا حيض وما بعده استحاضة.",
      "Melebihi 15 hari → 15 hari haid, sisanya istihadhah.": "إذا تجاوز الدم 15 يومًا فـ15 يومًا حيض وما بعده استحاضة.",
      "Mubtadi'ah Mumayyizah -> Darah kuat dihitung haid.": "المبتدئة المميزة: الدم القوي يُحسب حيضًا.",
      "Mubtadi’ah Mumayyizah → Darah kuat dihitung haid.": "المبتدئة المميزة: الدم القوي يُحسب حيضًا.",
      "Mu'tadah -> kembali ke kebiasaan.": "المعتادة: ترجع إلى عادتها.",
      "Mu’tadah → kembali ke kebiasaan.": "المعتادة: ترجع إلى عادتها.",
      "Mustahadhah -> kembali ke kebiasaan.": "المستحاضة: ترجع إلى عادتها.",
      "Mustahadhah → kembali ke kebiasaan.": "المستحاضة: ترجع إلى عادتها.",
      "Tamyiz tidak sah -> kembali ke hukum maksimal 15 hari.": "التمييز غير معتبر، فيرجع إلى حد 15 يومًا.",
      "Tamyiz tidak sah → kembali ke hukum maksimal 15 hari.": "التمييز غير معتبر، فيرجع إلى حد 15 يومًا.",
      "Wajib Mandi:": "يجب الغسل:",
      "Status Sholat:": "حكم الصلاة:",
      "Istihadhah (belum mencapai minimal suci 15 hari)": "استحاضة (لم تكتمل مدة الطهر الدنيا 15 يومًا)",
      "Tidak boleh sholat.": "لا تصلي في مدة الحيض.",
      "Wajib sholat setelah hari ke-15.": "تجب الصلاة بعد اليوم الخامس عشر.",
      "Wajib sholat setelah hari kebiasaan.": "تجب الصلاة بعد انتهاء أيام العادة.",
      "Wajib sholat setelah darah kuat selesai.": "تجب الصلاة بعد انتهاء الدم القوي.",
      "Wajib sholat setelah masa haid selesai.": "تجب الصلاة بعد انتهاء مدة الحيض.",
      "Setelah darah berhenti.": "بعد انقطاع الدم.",
      "Setelah hari ke-15 atau darah berhenti.": "بعد اليوم الخامس عشر أو انقطاع الدم.",
      "Setelah hari ke-15.": "بعد اليوم الخامس عشر.",
      "Setelah hari kebiasaan selesai.": "بعد انتهاء أيام العادة.",
      "Setelah darah kuat selesai.": "بعد انتهاء الدم القوي.",
      "Belum ada kebiasaan": "لا توجد عادة بعد",
      "Mubtada'ah (pertama haid)": "مبتدئة (أول حيض)",
      "(punya pola siklus)": "(لها نمط دورة)",
      "+ Mumayyizah": "+ مميزة",
      "Mubtadi'ah": "مبتدئة",
      "Mu'tadah": "معتادة",
      "Mutahayyirah (siklus tidak stabil)": "متحيرة (دورة غير مستقرة)",
      "mubtadiah": "مبتدئة",
      "mustahadhah": "مستحاضة",
      "mu'tadah": "معتادة",
      "mutadayah": "معتادة",
      "mumayyizah": "مميزة",
      "mutahayyirah": "متحيرة",
      "talak": "طلاق",
      "talakQabla": "طلاق قبل الدخول",
      "wafat": "وفاة الزوج",
      "hamil": "حمل",
      "fasakh": "فسخ",
      "Sebagian darah dihukumi haid dan selebihnya istihadhah.": "جزء من الدم يُحكم عليه بالحيض وما بقي استحاضة.",
      "Seluruh darah dihukumi haid.": "كل الدم يُحكم عليه بالحيض.",
      "Semua darah dihukumi haid.": "كل الدم يُحكم عليه بالحيض.",
      "Hari pertama sampai ke-15 haid, selebihnya istihadhah.": "الأيام من 1 إلى 15 حيض وما بعد ذلك استحاضة.",
      "<p><b>Darah berhenti dalam masa haid</b></p>": "<p><b>توقف الدم داخل مدة الحيض</b></p>",
      "<br>Haid": "<br>حيض",
      "<br>Suci": "<br>طهر",
      "| Haid:": "| حيض:",
      "Darah kuat (ciri haid)": "دم قوي (علامة حيض)",
      "Kemungkinan haid": "غالبًا حيض",
      "Ciri istihadhah": "علامة استحاضة",
      "Berdasarkan data yang dimasukkan,": "بناءً على البيانات المدخلة،",
      "Kebiasaan haid wanita ini adalah": "عادة الحيض لهذه المرأة هي",
      "wanita ini tergolong mu'tadah (memiliki kebiasaan haid).": "هذه المرأة من المعتادات (لها عادة حيض).",
      "wanita ini tergolong mubtadi'ah (pertama kali mengalami haid).": "هذه المرأة مبتدئة (أول مرة تحيض).",
      "wanita ini mengalami istihadhah dan kembali kepada kebiasaan haidnya.": "هذه المرأة تعاني من الاستحاضة وتعود إلى عادتها في الحيض.",
      "Darah selama": "الدم لمدة",
      "hari dihukumi haid.": "يومًا يُعد حيضًا.",
      "Sedangkan darah setelahnya selama": "أما الدم بعد ذلك لمدة",
      "hari dihukumi istihadhah.": "يومًا فيُعد استحاضة.",
      "Seluruh darah selama": "جميع الدم لمدة",
      "Menurut mazhab Syafi'i batas maksimal haid adalah 15 hari.": "بحسب المذهب الشافعي الحد الأقصى للحيض 15 يومًا.",
      "Apabila darah melebihi 15 hari maka selebihnya dihukumi istihadhah.": "إذا تجاوز الدم 15 يومًا فما بعده استحاضة.",
      "Referensi: Kifayatul Akhyar - Bab Al-Haid": "مرجع: كفاية الأخيار - باب الحيض",
      "Referensi: Kifayatul Akhyar, Bab Al-Haid.": "مرجع: كفاية الأخيار، باب الحيض.",
      "Durasi haid sangat pendek. Dalam fiqh Syafi'i minimal haid adalah 1 hari 1 malam.": "مدة الحيض قصيرة جدًا. في الفقه الشافعي الحد الأدنى يوم وليلة.",
      "Wanita tetap wajib shalat dan wudhu setiap waktu shalat": "تظل المرأة مطالبة بالصلاة والوضوء لكل وقت صلاة.",
      "Dalam mazhab Syafi'i wanita yang mengalami darah terus menerus kembali kepada kebiasaan haidnya.": "في المذهب الشافعي من استمر معها الدم ترجع إلى عادة حيضها.",
      "Durasi haid normal menurut kebiasaan mayoritas wanita.": "مدة الحيض طبيعية وفق عادة غالب النساء.",
      "Durasi haid cukup panjang namun masih dalam batas umum.": "مدة الحيض طويلة نسبيًا لكنها ضمن الحد المعتاد.",
      "Durasi haid panjang. Perlu memastikan tidak mendekati batas maksimal 15 hari.": "مدة الحيض طويلة ويجب التأكد من عدم اقترابها من الحد الأقصى 15 يومًا.",
      "Siklus haid tampak tidak stabil.": "دورة الحيض تبدو غير مستقرة.",
      "Pola haid berbeda dari kebiasaan.": "نمط الحيض مختلف عن العادة.",
      "Sistem memiliki cukup data untuk analisis pola siklus.": "لدى النظام بيانات كافية لتحليل نمط الدورة.",
      "Haid mendekati batas maksimal 15 hari.": "الحيض يقترب من الحد الأقصى 15 يومًا.",
      "Haid mendekati batas maksimal fiqh Syafi'i (15 hari).": "الحيض يقترب من الحد الأقصى في الفقه الشافعي (15 يومًا).",
      "Siklus haid tidak stabil.": "دورة الحيض غير مستقرة.",
      "Masa suci minimal telah terpenuhi. Jika keluar darah sekarang bisa dihukumi haid.": "اكتملت مدة الطهر الدنيا، وإذا نزل الدم الآن يمكن اعتباره حيضًا.",
      "Masih dalam masa suci minimal. Tersisa": "ما زالت في مدة الطهر الدنيا، المتبقي",
      "Iddah fasakh sama seperti iddah talak.": "عدة الفسخ كعدة الطلاق.",
      "Talak sebelum terjadi hubungan suami istri tidak mewajibkan iddah.": "الطلاق قبل الدخول لا يوجب العدة.",
      "Iddah wanita yang ditalak adalah tiga quru. Menurut mazhab Syafi'i, quru ditafsirkan sebagai masa suci di antara dua haid.": "عدة المطلقة ثلاثة قروء، وعند الشافعية يُفسَّر القرء بالطهر بين حيضتين.",
      "Wanita hamil masa iddahnya sampai melahirkan.": "عدة الحامل تنتهي بالولادة.",
      "Wanita yang ditinggal wafat suaminya wajib menjalani masa iddah selama empat bulan sepuluh hari.": "المرأة المتوفى عنها زوجها تعتد أربعة أشهر وعشرة أيام.",
      "Sedang menjalani masa iddah (hari ke": "تجري العدة حاليًا (اليوم",
      ") | tersisa": ") | المتبقي",
      "hari berdasarkan data haid)": "يومًا بناءً على بيانات الحيض)",
      "| Sisa": "| المتبقي",
      "Hari ke": "اليوم",
      "3 quru (estimasi 3 bulan)": "3 قروء (تقدير 3 أشهر)",
      "3 quru (": "3 قروء (",
      "4 bulan 10 hari": "4 أشهر و10 أيام",
      "Sampai melahirkan": "حتى الولادة",
      "Tidak ada iddah": "لا عدة",
      "QS Al-Ahzab 49": "القرآن الأحزاب 49",
      "QS Al-Baqarah 234": "القرآن البقرة 234",
      "QS Al-Baqarah ayat 228": "القرآن البقرة 228",
      "QS At-Thalaq 4": "القرآن الطلاق 4",
      "Kifayatul Akhyar": "كفاية الأخيار",
      "Fathul Qarib": "فتح القريب",
      "Al-Majmu'": "المجموع",
      "Tuhfatul Muhtaj": "تحفة المحتاج",
      "Al-Ibanah Wal Ifadhah": "الإبانة والإفادة",
      "Riwayat terakhir:": "آخر سجل:",
      "Haid + Istihadhah": "حيض + استحاضة",
      "Haid": "حيض",
      "Istihadhah": "استحاضة",
      "Istih.": "استح.",
      "Suci": "طهر",
      "Prediksi": "توقع",
      "hari": "يوم",
      "Min": "الأحد",
      "Sen": "الإثنين",
      "Sel": "الثلاثاء",
      "Rab": "الأربعاء",
      "Kam": "الخميس",
      "Jum": "الجمعة",
      "Sab": "السبت",
      "Januari": "يناير",
      "Februari": "فبراير",
      "Maret": "مارس",
      "April": "أبريل",
      "Mei": "مايو",
      "Juni": "يونيو",
      "Juli": "يوليو",
      "Rabiul Awal": "ربيع الأول",
      "Rabiul Akhir": "ربيع الآخر",
      "Jumadil Awal": "جمادى الأولى",
      "Jumadil Akhir": "جمادى الآخرة",
      "Sya'ban": "شعبان",
      "Ramadhan": "رمضان",
      "Syawal": "شوال",
      "Dzulqa'dah": "ذو القعدة",
      "Dzulhijjah": "ذو الحجة",
      "Muharram": "محرم",
      "Safar": "صفر",
      "Rajab": "رجب",
      "Dzulqa'dah": "ذو القعدة",
      "Agustus": "أغسطس",
      "September": "سبتمبر",
      "Oktober": "أكتوبر",
      "November": "نوفمبر",
      "Desember": "ديسمبر"
    }
  };

  const REVERSE_MAP = {
    en: new Map(),
    ar: new Map()
  };

  function buildReverseMaps() {
    ["en", "ar"].forEach((lang) => {
      const map = PHRASE_MAP[lang];
      if (!map) return;
      Object.keys(map).forEach((key) => {
        const val = map[key];
        if (typeof val === "string" && val) {
          REVERSE_MAP[lang].set(val, key);
        }
      });
    });
  }

  buildReverseMaps();

  const SORTED_KEYS = {
    en: Object.keys(PHRASE_MAP.en).sort((a, b) => b.length - a.length),
    ar: Object.keys(PHRASE_MAP.ar).sort((a, b) => b.length - a.length)
  };

  function getLang() {
    const saved = localStorage.getItem("siteLang") || "id";
    return LANGS.includes(saved) ? saved : "id";
  }

  const HAID_LANG_RELOAD_STATE_KEY = "fiqh-haid-lang-reload-state";
  let activeLang = getLang();

  function shouldReloadForLanguageChange(pageKey = getCurrentPageKey()) {
    return pageKey === "haid";
  }

  function persistHaidReloadState(nextLang) {
    if (!shouldReloadForLanguageChange()) return;

    const state = {
      lang: nextLang,
      values: {
        prevEnd: document.getElementById("prevEnd")?.value || "",
        start: document.getElementById("start")?.value || "",
        end: document.getElementById("end")?.value || "",
        type: document.getElementById("type")?.value || "mubtadiah",
        mumayyiz: !!document.getElementById("mumayyiz")?.checked,
        strongDays: document.getElementById("strongDays")?.value || "",
        habit: document.getElementById("habit")?.value || "",
        bloodColor: document.getElementById("bloodColor")?.value || "dark"
      },
      shouldRecalculate: Boolean(document.getElementById("hasil")?.textContent?.trim())
    };

    try {
      sessionStorage.setItem(HAID_LANG_RELOAD_STATE_KEY, JSON.stringify(state));
    } catch {}
  }

  function restoreHaidReloadState(attempt = 0) {
    if (!shouldReloadForLanguageChange()) return;

    let raw = null;
    try {
      raw = sessionStorage.getItem(HAID_LANG_RELOAD_STATE_KEY);
    } catch {}
    if (!raw) return;

    let state = null;
    try {
      state = JSON.parse(raw);
    } catch {
      state = null;
    }

    if (!state || (state.lang && state.lang !== getLang())) {
      try {
        sessionStorage.removeItem(HAID_LANG_RELOAD_STATE_KEY);
      } catch {}
      return;
    }

    const startInput = document.getElementById("start");
    const endInput = document.getElementById("end");
    const typeSelect = document.getElementById("type");
    const mumayyizInput = document.getElementById("mumayyiz");
    const tamyizBox = document.getElementById("tamyizBox");
    const strongDaysInput = document.getElementById("strongDays");
    const habitInput = document.getElementById("habit");
    const bloodColorSelect = document.getElementById("bloodColor");

    if (!startInput || !endInput || !typeSelect || !mumayyizInput || !strongDaysInput || !habitInput || !bloodColorSelect) {
      if (attempt >= 20) return;
      window.setTimeout(() => restoreHaidReloadState(attempt + 1), 150);
      return;
    }

    const values = state.values || {};
    const prevEndInput = document.getElementById("prevEnd");
    if (prevEndInput) prevEndInput.value = values.prevEnd || "";
    startInput.value = values.start || "";
    endInput.value = values.end || "";
    typeSelect.value = values.type || "mubtadiah";
    mumayyizInput.checked = Boolean(values.mumayyiz);
    if (tamyizBox) {
      tamyizBox.style.display = mumayyizInput.checked ? "block" : "none";
    }
    strongDaysInput.value = values.strongDays || "";
    habitInput.value = values.habit || "";
    bloodColorSelect.value = values.bloodColor || "dark";

    if (!state.shouldRecalculate) {
      try {
        sessionStorage.removeItem(HAID_LANG_RELOAD_STATE_KEY);
      } catch {}
      return;
    }

    if (typeof window.hitung !== "function") {
      if (attempt >= 20) return;
      window.setTimeout(() => restoreHaidReloadState(attempt + 1), 150);
      return;
    }

    try {
      sessionStorage.removeItem(HAID_LANG_RELOAD_STATE_KEY);
    } catch {}

    window.requestAnimationFrame(() => {
      try {
        window.hitung();
      } catch {}
    });
  }

  function applyLanguageChange(nextLang) {
    const currentPage = getCurrentPageKey();
    if (!LANGS.includes(nextLang) || nextLang === activeLang) {
      apply(nextLang);
      return;
    }

    localStorage.setItem("siteLang", nextLang);

    if (shouldReloadForLanguageChange(currentPage)) {
      persistHaidReloadState(nextLang);
      window.location.reload();
      return;
    }

    apply(nextLang);
  }


  function setDirection(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("rtl-ui", lang === "ar");
    document.body.classList.remove("lang-id", "lang-en", "lang-ar");
    document.body.classList.add(`lang-${lang}`);
  }

  function ensureStyle() {
    if (document.getElementById("fiqh-lang-style")) return;
    const style = document.createElement("style");
    style.id = "fiqh-lang-style";
    style.textContent = `
      .fiqh-lang-switch {
        margin-left: auto;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
      }
      .fiqh-lang-switch select {
        border: 1px solid rgba(255,255,255,.45);
        background: rgba(255,255,255,.12);
        color: inherit;
        border-radius: 999px;
        padding: 4px 10px;
        font-size: 12px;
      }
      .navbar {
        padding-top: 10px !important;
        padding-bottom: 10px !important;
      }
      .navbar .nav-container {
        width: 100%;
        box-sizing: border-box;
        padding-left: 18px !important;
        padding-right: 18px !important;
        display: flex;
        align-items: center;
        gap: 16px;
      }
      .navbar .nav-logo,
      .navbar .nav-title {
        display: inline-flex;
        align-items: center;
        margin-right: 12px;
      }
      .navbar .nav-links {
        display: flex;
        align-items: center;
        gap: 14px;
        flex-wrap: wrap;
      }
      .navbar .nav-links a {
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
      body.rtl-ui .fiqh-lang-switch {
        margin-left: 0;
        margin-right: auto;
      }
      body.rtl-ui .navbar {
        direction: rtl;
      }
      body.rtl-ui .nav-links {
        display: flex;
        align-items: center;
        gap: 18px;
      }
      body.rtl-ui .nav-links a {
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
      body.rtl-ui .nav-logo,
      body.rtl-ui .nav-title {
        margin-right: 0;
        margin-left: 12px;
      }
      body.rtl-ui .result-card,
      body.rtl-ui .result-box,
      body.rtl-ui .fiqh-box {
        text-align: right;
      }
      body.lang-en .container {
        max-width: 760px;
      }
      body.lang-en #calendar .day,
      body.lang-ar #calendar .day {
        padding: 10px 6px;
      }
      body.lang-en #calendar .day small,
      body.lang-ar #calendar .day small {
        display: block;
        margin-top: 4px;
        font-size: 10px;
        line-height: 1.1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      body.lang-en .timeline-grid,
      body.lang-ar .timeline-grid {
        grid-template-columns: repeat(7, minmax(0, 1fr));
      }
      body.lang-en .section-title,
      body.lang-ar .section-title {
        margin-top: 14px;
      }
      @media (max-width: 900px) {
        body.lang-en .container,
        body.lang-ar .container {
          max-width: 100%;
        }
      }
      body.lang-en .container,
      body.lang-ar .container {
        display: block !important;
        margin-left: auto !important;
        margin-right: auto !important;
        padding-left: 20px !important;
        padding-right: 20px !important;
      }
      body.lang-en .container > .card,
      body.lang-ar .container > .card {
        width: min(100%, 680px) !important;
        margin-left: auto !important;
        margin-right: auto !important;
      }
    `;
    document.head.appendChild(style);
  }

  function normalizeMojibake(str) {
    if (!str) return str;
    return str
      .replaceAll("â†’", "->")
      .replaceAll("â€“", "-")
      .replaceAll("â€”", "-")
      .replaceAll("â€¢", "-")
      .replaceAll("â€™", "'")
      .replaceAll("â€˜", "'")
      .replaceAll("â€œ", "\"")
      .replaceAll("â€", "\"")
      .replaceAll("âš ", "⚠")
      .replaceAll("’", "'")
      .replaceAll("‘", "'")
      .replaceAll("“", "\"")
      .replaceAll("”", "\"")
      .replaceAll("–", "-")
      .replaceAll("—", "-");
  }

  function ensureSwitcher(lang) {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;
    let wrap = document.getElementById("fiqh-lang-switch");
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.id = "fiqh-lang-switch";
      wrap.className = "fiqh-lang-switch";
      wrap.innerHTML = `
        <label for="fiqh-lang-select" id="fiqh-lang-label"></label>
        <select id="fiqh-lang-select">
          <option value="id">ID</option>
          <option value="en">EN</option>
          <option value="ar">AR</option>
        </select>
      `;
      navbar.appendChild(wrap);
      wrap.querySelector("#fiqh-lang-select")?.addEventListener("change", (e) => {
        const nextLang = e.target.value;
        applyLanguageChange(nextLang);
      });
    }
    const label = wrap.querySelector("#fiqh-lang-label");
    if (label) label.textContent = LABELS[lang] || LABELS.id;
    const select = wrap.querySelector("#fiqh-lang-select");
    if (select) select.value = lang;
  }

  function replaceText(str, lang) {
    const keys = SORTED_KEYS[lang];
    const map = PHRASE_MAP[lang];
    if (!keys || !map || !str) return str;
    let out = normalizeMojibake(str);

    const compact = out.replace(/\s+/g, " ").trim();
    if (map[compact]) return map[compact];

    keys.forEach((key) => {
      if (out.includes(key)) out = out.split(key).join(map[key]);
    });
    return out;
  }

  function reverseReplaceText(str, lang) {
    const reverse = REVERSE_MAP[lang];
    if (!reverse || !str) return str;

    let out = normalizeMojibake(str);
    const compact = out.replace(/\s+/g, " ").trim();
    if (reverse.has(compact)) return reverse.get(compact);

    // fallback: replace any translated fragments back to their key
    const forward = PHRASE_MAP[lang];
    if (!forward) return out;
    const translatedValues = Object.keys(forward)
      .map((key) => ({ key, value: forward[key] }))
      .filter((x) => typeof x.value === "string" && x.value)
      .sort((a, b) => String(b.value).length - String(a.value).length);

    translatedValues.forEach(({ key, value }) => {
      const v = String(value);
      if (out.includes(v)) out = out.split(v).join(key);
    });

    return out;
  }

  function translatePlaceholders(root, lang) {
    root.querySelectorAll("[placeholder]").forEach((el) => {
      if (el.__fiqhOriginalPlaceholder == null) {
        el.__fiqhOriginalPlaceholder = el.getAttribute("placeholder") || "";
      }

      const original = el.__fiqhOriginalPlaceholder;
      if (!original) return;

      if (lang === "id") {
        el.setAttribute("placeholder", original);
        return;
      }

      const after = replaceText(original, lang);
      el.setAttribute("placeholder", after);
    });
  }

  function translateTextNodes(root, lang) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const parent = node.parentElement?.tagName;
      if (parent === "SCRIPT" || parent === "STYLE" || parent === "NOSCRIPT") return;
      if (node.__fiqhOriginalText == null) {
        // If first time we see this node while non-ID lang is active (e.g., user previously used AR),
        // normalize it back to the Indonesian key so switching back to ID/EN doesn't keep Arabic.
        if (lang === "en") {
          node.__fiqhOriginalText = reverseReplaceText(node.textContent, "en");
        } else if (lang === "ar") {
          node.__fiqhOriginalText = reverseReplaceText(node.textContent, "ar");
        } else {
          node.__fiqhOriginalText = node.textContent;
        }
      }

      const original = node.__fiqhOriginalText || "";
      const trimmed = original.trim();
      if (!trimmed) return;

      if (lang === "id") {
        node.textContent = original;
        return;
      }

      const translated = replaceText(trimmed, lang);
      node.textContent = original.replace(trimmed, translated);
    });
  }

  function getTranslationRoots() {
    const roots = [];
    const navbar = document.querySelector(".navbar");
    if (navbar) roots.push(navbar);
    const hero = document.querySelector(".hero");
    if (hero) roots.push(hero);
    const container = document.querySelector(".container");
    if (container) roots.push(container);
    const dataHaid = document.querySelector(".data-haid");
    if (dataHaid) roots.push(dataHaid);
    const chart = document.querySelector(".chart-container");
    if (chart) roots.push(chart);
    const preFooter = document.querySelector(".pre-footer");
    if (preFooter) roots.push(preFooter);
    const footer = document.querySelector("footer");
    if (footer) roots.push(footer);
    if (!roots.length && document.body) roots.push(document.body);
    return roots;
  }

  function installAlertTranslator(lang) {
    if (!window.__fiqhAlertOriginal) {
      window.__fiqhAlertOriginal = window.alert.bind(window);
    }

    if (lang === "id") {
      window.alert = window.__fiqhAlertOriginal;
      return;
    }

    window.alert = (msg) => window.__fiqhAlertOriginal(replaceText(String(msg ?? ""), lang));
  }

  function initScrollToTopButton() {
    const scrollBtn = document.getElementById("scrollToTopBtn");
    if (!scrollBtn) return;

    if (window.__fiqhScrollState?.handleScroll) {
      window.removeEventListener("scroll", window.__fiqhScrollState.handleScroll);
    }

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;

      if (currentScrollY > 320 && isScrollingDown) {
        scrollBtn.classList.add("show");
      } else if (currentScrollY < 220 || currentScrollY < lastScrollY) {
        scrollBtn.classList.remove("show");
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.__fiqhScrollState = { handleScroll };

    if (scrollBtn.dataset.boundScrollTop !== "true") {
      scrollBtn.dataset.boundScrollTop = "true";
      scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    handleScroll();
  }

  function installObserver(lang) {
    if (window.__fiqhI18nObserver) window.__fiqhI18nObserver.disconnect();
    let busy = false;
    const observer = new MutationObserver((mutations) => {
      if (busy) return;
      busy = true;
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            translateTextNodes(node, lang);
            translatePlaceholders(node, lang);
          } else if (node.nodeType === Node.TEXT_NODE) {
            if (node.__fiqhOriginalText == null) {
              node.__fiqhOriginalText = node.textContent || "";
            }
            const original = node.__fiqhOriginalText || "";
            const trimmed = original.trim();
            if (!trimmed) return;
            node.textContent = lang === "id"
              ? original
              : original.replace(trimmed, replaceText(trimmed, lang));
          }
        });
      });
      busy = false;
    });
    getTranslationRoots().forEach((root) => {
      try {
        observer.observe(root, { subtree: true, childList: true });
      } catch (e) {}
    });
    window.__fiqhI18nObserver = observer;
  }

  function bindAction(buttonId, handlerName) {
    const button = document.getElementById(buttonId);
    if (!button) return false;

    if (button.dataset.bound === "1") {
      button.dataset.fiqhHandlerBound = handlerName;
      return true;
    }

    if (button.dataset.fiqhHandlerBound === handlerName) {
      return true;
    }

    button.dataset.fiqhHandlerBound = handlerName;
    button.addEventListener("click", () => {
      try {
        const handler = window[handlerName];
        if (typeof handler === "function") {
          handler();
        }
      } catch (error) {}
    });

    return true;
  }

  function bindCurrentPageActions() {
    const currentPage = getCurrentPageKey();

    if (currentPage === "haid") {
      const mainBound = bindAction("hitungHaidBtn", "hitung");
      bindAction("exportHaidHistoryBtn", "exportData");
      bindAction("resetHaidHistoryBtn", "resetHistory");
      return mainBound;
    }

    if (currentPage === "nifas") return bindAction("hitungNifasBtn", "hitungNifas");
    if (currentPage === "suci") return bindAction("hitungSuciBtn", "hitungSuci");
    if (currentPage === "iddah") return bindAction("hitungIddahBtn", "hitungIddah");
    if (currentPage === "istihadhah") return bindAction("hitungIstihadhahBtn", "hitungIstihadhah");

    return false;
  }

  function isPageReady() {
    const currentPage = getCurrentPageKey();
    if (currentPage === "haid") return !!document.getElementById("hitungHaidBtn");
    if (currentPage === "nifas") return !!document.getElementById("hitungNifasBtn");
    if (currentPage === "suci") return !!document.getElementById("hitungSuciBtn");
    if (currentPage === "iddah") return !!document.getElementById("hitungIddahBtn");
    if (currentPage === "istihadhah") return !!document.getElementById("hitungIstihadhahBtn");
    return false;
  }

  function apply(lang = getLang()) {
    const currentPage = getCurrentPageKey();
    if (!TARGET_PAGES.has(currentPage) || !isPageReady()) return false;

    activeLang = lang;
    setDirection(lang);
    ensureStyle();
    ensureSwitcher(lang);
    initScrollToTopButton();
    bindCurrentPageActions();

    if (lang === "id") {
      document.title = DEFAULT_TITLE;
    } else {
      const nextTitle = PAGE_TITLES[currentPage]?.[lang];
      document.title = nextTitle || DEFAULT_TITLE;
    }

    const roots = getTranslationRoots();
    roots.forEach((root) => {
      translateTextNodes(root, lang);
      translatePlaceholders(root, lang);
    });
    installAlertTranslator(lang);
    installObserver(lang);
    restoreHaidReloadState();
    return true;
  }

  function applyWhenReady(attempt = 0) {
    const applied = apply(getLang());
    if (applied || attempt >= 12) return;

    window.setTimeout(() => {
      applyWhenReady(attempt + 1);
    }, 150);
  }

  function notifyRouteChange() {
    window.dispatchEvent(new Event("fiqh:routechange"));
  }

  function installNavigationHooks() {
    if (window.__fiqhNavHooksInstalled) return;
    window.__fiqhNavHooksInstalled = true;

    const wrapHistoryMethod = (methodName) => {
      const original = window.history[methodName];
      if (typeof original !== "function") return;

      window.history[methodName] = function (...args) {
        const result = original.apply(this, args);
        window.setTimeout(notifyRouteChange, 0);
        return result;
      };
    };

    wrapHistoryMethod("pushState");
    wrapHistoryMethod("replaceState");

    window.addEventListener("popstate", () => {
      window.setTimeout(notifyRouteChange, 0);
    });
    window.addEventListener("fiqh:routechange", () => applyWhenReady());
  }

  installNavigationHooks();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      setupProdCleanLinks();
      initScrollToTopButton();
      applyWhenReady();
    });
  } else {
    setupProdCleanLinks();
    initScrollToTopButton();
    applyWhenReady();
  }

  window.addEventListener("load", () => applyWhenReady());
  window.addEventListener("storage", (e) => {
    if (e.key !== "siteLang") return;
    const nextLang = getLang();
    if (shouldReloadForLanguageChange() && nextLang !== activeLang) {
      persistHaidReloadState(nextLang);
      window.location.reload();
      return;
    }
    applyWhenReady();
  });
  window.addEventListener("portal-language-change", () => {
    const nextLang = getLang();
    if (shouldReloadForLanguageChange() && nextLang !== activeLang) {
      persistHaidReloadState(nextLang);
      window.location.reload();
      return;
    }
    applyWhenReady();
  });
  window.addEventListener("fiqh:routechange", () => initScrollToTopButton());
})();
