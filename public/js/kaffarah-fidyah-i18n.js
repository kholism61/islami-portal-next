(() => {
  const TARGET_PAGES = new Set([
    "kaffarah.html",
    "kaffarah-jima.html",
    "kaffarah-sumpah.html",
    "fidyah.html",
    "qadha-puasa.html"
  ]);

  const rawPage = (window.location.pathname.split("/").pop() || "").toLowerCase();
  const page = rawPage.endsWith(".html") ? rawPage : (rawPage ? `${rawPage}.html` : rawPage);
  if (!TARGET_PAGES.has(page)) return;

  const LANGS = ["id", "en", "ar"];
  const PAGE_TITLES = {
    "kaffarah.html": {
      en: "Kaffarah & Fidyah | Islamic Literacy Portal",
      ar: "الكفارة والفدية | بوابة الثقافة الإسلامية"
    },
    "kaffarah-jima.html": {
      en: "Kaffarah for Ramadan Intercourse | Islamic Literacy Portal",
      ar: "كفارة الجماع في رمضان | بوابة الثقافة الإسلامية"
    },
    "kaffarah-sumpah.html": {
      en: "Kaffarah for Oath | Islamic Literacy Portal",
      ar: "كفارة اليمين | بوابة الثقافة الإسلامية"
    },
    "fidyah.html": {
      en: "Fidyah Calculator | Islamic Literacy Portal",
      ar: "حاسبة الفدية | بوابة الثقافة الإسلامية"
    },
    "qadha-puasa.html": {
      en: "Qadha Fasting Calculator | Islamic Literacy Portal",
      ar: "حاسبة قضاء الصيام | بوابة الثقافة الإسلامية"
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
      "Portal Fiqh": "Fiqh Portal",
      "Portal Fiqh Digital": "Digital Fiqh Portal",
      "Islami Portal": "Islamic Portal",
      "Islamic Portal": "Islamic Portal",
      "Beranda": "Home",
      "Hitung Mawaris": "Mawaris Calculator",
      "Kalkulator Haid": "Menstrual Calculator",
      "Kalkulator Nifas": "Postpartum Calculator",
      "Masa Suci": "Purity Period",
      "Kaffarah & Fidyah": "Kaffarah & Fidyah",
      "Tentang": "About",
      "Kontak": "Contact",
      "Privacy Policy": "Privacy Policy",
      "Disclaimer": "Disclaimer",
      "FAQ": "FAQ",
      "Offline Artikel": "Offline Articles",
      "Menu": "Menu",
      "Informasi": "Information",
      "Fitur": "Features",
      "Referensi": "References",
      "Artikel Fiqh": "Fiqh Articles",
      "Kalkulator Fiqh": "Fiqh Calculator",
      "Kaffarah": "Kaffarah",
      "Zakat": "Zakat",
      "Mawaris": "Mawaris",
      "Kalkulator": "Calculator",
      "Kalkulator Zakat": "Zakat Calculator",
      "Kalkulator Mawaris": "Mawaris Calculator",
      "Fiqh Wanita": "Women's Fiqh",
      "Seluruh hak cipta dilindungi.": "All rights reserved.",

      "🧾 Kaffarah & Fidyah": "🧾 Kaffarah & Fidyah",
      "Gunakan kalkulator ini untuk menghitung kewajiban kaffarah dan fidyah sesuai fiqh.": "Use this calculator to estimate kaffarah and fidyah obligations according to fiqh.",
      "⚖️ Kaffarah Jima Ramadhan": "⚖️ Kaffarah for Ramadan Intercourse",
      "Pelanggaran hubungan suami istri di siang Ramadan": "Violation of marital intercourse during daytime in Ramadan",
      "📜 Kaffarah Sumpah": "📜 Kaffarah for Oath",
      "Kaffarah bagi orang yang melanggar sumpah": "Kaffarah for those who break an oath",
      "🍽️ Fidyah Puasa": "🍽️ Fidyah for Fasting",
      "Hitung fidyah bagi orang yang tidak mampu puasa": "Calculate fidyah for those unable to fast",
      "Qadha Puasa": "Qadha Fasting",
      "Hitung jumlah hari puasa Ramadhan yang harus diganti.": "Calculate how many Ramadan fasting days must be made up.",

      "🔥 Kaffarah Jima Ramadhan": "🔥 Kaffarah for Ramadan Intercourse",
      "Simulasi kewajiban kaffarah bagi orang yang melakukan hubungan suami istri di siang hari bulan Ramadhan.": "Simulation of kaffarah obligation for those who had marital intercourse during daytime in Ramadan.",
      "Perhitungan Kaffarah": "Kaffarah Calculation",
      "Jumlah pelanggaran": "Number of violations",
      "Harga makanan per orang (Rp)": "Meal cost per person (Rp)",
      "contoh: 1": "example: 1",
      "contoh: 25000": "example: 25000",
      "Hitung Kaffarah": "Calculate Kaffarah",
      "Total Pelanggaran": "Total Violations",
      "Total Orang Miskin": "Total Poor People",
      "Pelanggaran": "Violations",
      "Orang Miskin": "Poor People",
      "Hasil perhitungan akan muncul di sini.": "Calculation results will appear here.",
      "Analisis Fiqh": "Fiqh Analysis",
      "Analisis akan muncul setelah perhitungan.": "Analysis will appear after calculation.",
      "Salin Hasil": "Copy Result",
      "Bagikan WhatsApp": "Share on WhatsApp",
      "Reset": "Reset",

      "Total Kaffarah": "Total Kaffarah",
      "pelanggaran": "violations",
      "60 orang miskin": "60 poor people",
      "orang miskin": "poor people",
      "orang": "people",
      "Estimasi biaya": "Estimated cost",
      "Alternatif kaffarah": "Kaffarah alternative",
      "Puasa 2 bulan berturut": "Fast for 2 consecutive months",
      "= 120 hari": "= 120 days",
      "hari": "days",
      "Masukkan jumlah pelanggaran.": "Enter the number of violations.",
      "Orang ini melakukan pelanggaran jima di siang hari Ramadhan": "This person committed intercourse violation during daytime in Ramadan",
      "sebanyak": "as many as",
      "kali.": "times.",
      "Menurut fiqh, kaffarahnya adalah:": "According to fiqh, the kaffarah is:",
      "1. Memerdekakan budak": "1. Freeing a slave",
      "2. Jika tidak mampu â†’ puasa 2 bulan berturut-turut": "2. If unable -> fast for 2 consecutive months",
      "3. Jika tidak mampu â†’ memberi makan 60 orang miskin": "3. If unable -> feed 60 poor people",
      "2. Jika tidak mampu -> puasa 2 bulan berturut-turut": "2. If unable -> fast for 2 consecutive months",
      "3. Jika tidak mampu -> memberi makan 60 orang miskin": "3. If unable -> feed 60 poor people",
      "Jika memilih memberi makan:": "If choosing to feed:",
      "Total orang miskin:": "Total poor people:",
      "Dalil:": "Evidence:",
      "Hadits Abu Hurairah:": "Hadith of Abu Hurairah:",
      "Seorang lelaki datang kepada Nabi ï·º dan berkata": "A man came to the Prophet and said",
      "Seorang lelaki datang kepada Nabi ﷺ dan berkata": "A man came to the Prophet and said",
      "Aku celaka.": "I am ruined.",
      "Nabi bertanya:": "The Prophet asked:",
      "Apa yang membuatmu celaka?": "What ruined you?",
      "Ia menjawab:": "He replied:",
      "Aku menggauli istriku di siang hari Ramadhan.": "I had intercourse with my wife during daytime in Ramadan.",
      "(HR Bukhari dan Muslim)": "(Narrated by Bukhari and Muslim)",
      "Dalil Qur'an:": "Qur'anic evidence:",
      "Catatan:": "Note:",
      "Mayoritas ulama menyatakan setiap pelanggaran": "Most scholars state that each violation",
      "memiliki kaffarah tersendiri.": "has its own separate kaffarah.",
      "Hasil berhasil disalin": "Result copied successfully",

      "Kalkulator Kaffarah Sumpah": "Kaffarah for Oath Calculator",
      "Kalkulator fiqh modern: zakat, mawaris, fidyah,": "Modern fiqh calculators: zakat, mawaris, fidyah,",
      "kaffarah, dan panduan ibadah berbasis dalil.": "kaffarah, and worship guides based on textual evidence.",
      "Portal edukasi Islam yang menyediakan artikel,": "An Islamic education portal providing articles,",
      "kalkulator fiqh, dan panduan ibadah berbasis": "fiqh calculators, and worship guides based on",
      "Al-Qur'an dan Sunnah.": "the Qur'an and Sunnah.",
      "Gunakan Kalkulator": "Use Calculator",
      "Baca Artikel": "Read Articles",
      "Perhitungan Kaffarah Sumpah": "Kaffarah for Oath Calculation",
      "Jumlah sumpah yang dilanggar": "Number of broken oaths",
      "contoh: 2": "example: 2",
      "contoh: 15000": "example: 15000",
      "Sumpah": "Oaths",
      "Masukkan jumlah sumpah.": "Enter the number of oaths.",
      "sumpah": "oaths",
      "Puasa 3 hari": "Fast for 3 days",
      "Orang ini melanggar sumpah sebanyak": "This person broke an oath",
      "Menurut fiqh:": "According to fiqh:",
      "1. Memberi makan 10 orang miskin": "1. Feed 10 poor people",
      "2. Memberi pakaian 10 orang miskin": "2. Provide clothing to 10 poor people",
      "3. Memerdekakan budak": "3. Freeing a slave",
      "Jika tidak mampu:": "If unable:",
      "Dalil Qur'an": "Qur'anic evidence",

      "Kalkulator Fidyah": "Fidyah Calculator",
      "🔴 Kalkulator Fidyah Puasa": "🔴 Fidyah Fasting Calculator",
      "Hitung kewajiban fidyah secara praktis sesuai fiqh.": "Calculate fidyah obligations practically according to fiqh.",
      "Portal ini menyediakan berbagai kalkulator fiqh untuk membantu memahami hukum Islam secara praktis.": "This portal provides various fiqh calculators to help understand Islamic rulings practically.",
      "Portal ini menyediakan berbagai kalkulator fiqh untuk membantu memahami": "This portal provides various fiqh calculators to help understand",
      "Portal ini menyediakan berbagai kalkulator fiqh": "This portal provides various fiqh calculators",
      "untuk membantu memahami": "to help understand",
      "hukum Islam secara praktis.": "Islamic rulings practically.",
      "Masukkan jumlah hari puasa yang ditinggalkan untuk mengetahui": "Enter the number of missed fasting days to know",
      "kewajiban fidyah yang harus dibayarkan.": "the fidyah obligation to be paid.",
      "Perhitungan Fidyah": "Fidyah Calculation",
      "Jumlah hari tidak puasa": "Number of missed fasting days",
      "Harga makanan per hari (Rp)": "Meal cost per day (Rp)",
      "contoh: 10": "example: 10",
      "Metode pembayaran": "Payment method",
      "Uang": "Money",
      "Beras": "Rice",
      "Total Hari": "Total Days",
      "Total Fidyah": "Total Fidyah",
      "Penjelasan fiqh akan muncul di sini.": "Fiqh explanation will appear here.",
      "Masukkan jumlah hari puasa.": "Enter number of fasting days.",
      "Total Fidyah Beras": "Total Rice Fidyah",
      "Orang ini meninggalkan puasa": "This person missed fasting for",
      "Menurut mazhab Syafi'i, fidyah adalah memberi makan": "According to the Shafi'i school, fidyah means feeding",
      "fidyah adalah memberi makan satu orang miskin": "fidyah is feeding one poor person",
      "satu orang miskin untuk setiap hari puasa yang ditinggalkan.": "one poor person for each missed fasting day.",
      "untuk setiap hari puasa yang ditinggalkan.": "for each missed fasting day.",
      "Total orang miskin yang harus diberi makan:": "Total poor people to be fed:",
      "Estimasi biaya fidyah:": "Estimated fidyah cost:",
      "Fidyah dibayarkan dalam bentuk makanan pokok": "Fidyah is paid in staple food",
      "sebanyak 1 mud (~0.75 kg) untuk setiap hari puasa.": "as much as 1 mud (~0.75 kg) for each fasting day.",
      "Total fidyah beras yang harus dikeluarkan:": "Total rice fidyah to be provided:",
      "Ini setara memberi makan": "This equals feeding",
      "Menurut Mazhab Syafi'i,": "According to the Shafi'i school,",
      "kg beras": "kg rice",

      "Kalkulator Qadha Puasa": "Qadha Fasting Calculator",
      "📅 Kalkulator Qadha Puasa": "📅 Qadha Fasting Calculator",
      "Hitung jumlah hari puasa Ramadhan yang harus diganti (qadha) dengan mudah sesuai fiqh.": "Calculate the number of Ramadan fasting days that must be made up (qadha) according to fiqh.",
      "Perhitungan Qadha Puasa": "Qadha Fasting Calculation",
      "Jumlah hari puasa yang ditinggalkan": "Number of missed fasting days",
      "contoh: 5": "example: 5",
      "Hitung Qadha": "Calculate Qadha",
      "Hari Qadha": "Qadha Days",
      "Estimasi selesai (hari)": "Estimated completion (days)",
      "Penjelasan Fiqh": "Fiqh Explanation",
      "Qadha puasa wajib bagi orang yang meninggalkan puasa Ramadhan karena uzur syar'i seperti sakit atau safar.": "Qadha fasting is obligatory for those who miss Ramadan fast due to valid excuses like sickness or travel.",
      "Allah berfirman:": "Allah says:",
      "\"Barang siapa sakit atau dalam perjalanan, maka wajib mengganti pada hari yang lain.\"": "\"Whoever is sick or on a journey, then make it up on other days.\"",
      "(QS Al-Baqarah: 184)": "(Qur'an Al-Baqarah: 184)",
      "Website ini menyediakan kalkulator fiqh wanita,": "This website provides women's fiqh calculators,",
      "mawaris, dan berbagai alat bantu fiqh berbasis": "mawaris, and various fiqh tools based on",
      "mazhab Syafi'i.": "the Shafi'i school.",
      "Masukkan jumlah hari puasa": "Enter number of fasting days",
      "Jumlah hari harus lebih dari 0": "Number of days must be greater than 0",
      "Jumlah hari tidak boleh lebih dari 30": "Number of days must not exceed 30",
      "Saya memiliki": "I have",
      "hari qadha puasa yang harus diganti. Dihitung menggunakan Kalkulator Fiqh di Portal Literasi Islam.": "days of qadha fasting to make up. Calculated using the Fiqh Calculator at Islamic Literacy Portal.",
      "Kifayatul Akhyar": "Kifayatul Akhyar",
      "Fathul Qarib": "Fathul Qarib",
      "Al-Ibanah Wal Ifadhah": "Al-Ibanah Wal Ifadhah",
      "Tuhfatul Muhtaj": "Tuhfatul Muhtaj"
    },

    ar: {
      "Portal Literasi Islam": "بوابة الثقافة الإسلامية",
      "Portal Fiqh": "بوابة الفقه",
      "Portal Fiqh Digital": "بوابة الفقه الرقمية",
      "Islami Portal": "البوابة الإسلامية",
      "Islamic Portal": "البوابة الإسلامية",
      "Beranda": "الرئيسية",
      "Hitung Mawaris": "حاسبة المواريث",
      "Kalkulator Haid": "حاسبة الحيض",
      "Kalkulator Nifas": "حاسبة النفاس",
      "Masa Suci": "مدة الطهر",
      "Kaffarah & Fidyah": "الكفارة والفدية",
      "Tentang": "من نحن",
      "Kontak": "تواصل",
      "Privacy Policy": "سياسة الخصوصية",
      "Disclaimer": "إخلاء المسؤولية",
      "FAQ": "الأسئلة الشائعة",
      "Offline Artikel": "المقالات دون اتصال",
      "Menu": "القائمة",
      "Informasi": "معلومات",
      "Fitur": "الميزات",
      "Referensi": "المراجع",
      "Artikel Fiqh": "مقالات فقهية",
      "Kalkulator Fiqh": "حاسبة الفقه",
      "Kaffarah": "الكفارة",
      "Zakat": "الزكاة",
      "Mawaris": "المواريث",
      "Kalkulator": "الحاسبة",
      "Kalkulator Zakat": "حاسبة الزكاة",
      "Kalkulator Mawaris": "حاسبة المواريث",
      "Fiqh Wanita": "فقه المرأة",
      "Seluruh hak cipta dilindungi.": "جميع الحقوق محفوظة.",

      "🧾 Kaffarah & Fidyah": "🧾 الكفارة والفدية",
      "Gunakan kalkulator ini untuk menghitung kewajiban kaffarah dan fidyah sesuai fiqh.": "استخدم هذه الحاسبة لتقدير واجبات الكفارة والفدية وفق الفقه.",
      "⚖️ Kaffarah Jima Ramadhan": "⚖️ كفارة الجماع في رمضان",
      "Pelanggaran hubungan suami istri di siang Ramadan": "مخالفة الجماع نهار رمضان",
      "📜 Kaffarah Sumpah": "📜 كفارة اليمين",
      "Kaffarah bagi orang yang melanggar sumpah": "كفارة لمن يحنث في اليمين",
      "🍽️ Fidyah Puasa": "🍽️ فدية الصيام",
      "Hitung fidyah bagi orang yang tidak mampu puasa": "احسب الفدية لمن لا يستطيع الصيام",
      "Qadha Puasa": "قضاء الصيام",
      "Hitung jumlah hari puasa Ramadhan yang harus diganti.": "احسب عدد أيام صيام رمضان التي يجب قضاؤها.",

      "🔥 Kaffarah Jima Ramadhan": "🔥 كفارة الجماع في رمضان",
      "Simulasi kewajiban kaffarah bagi orang yang melakukan hubungan suami istri di siang hari bulan Ramadhan.": "محاكاة لواجب الكفارة لمن جامع نهار رمضان.",
      "Perhitungan Kaffarah": "حساب الكفارة",
      "Jumlah pelanggaran": "عدد المخالفات",
      "Harga makanan per orang (Rp)": "سعر الطعام لكل شخص (روبية)",
      "contoh: 1": "مثال: 1",
      "contoh: 25000": "مثال: 25000",
      "Hitung Kaffarah": "احسب الكفارة",
      "Total Pelanggaran": "إجمالي المخالفات",
      "Total Orang Miskin": "إجمالي المساكين",
      "Pelanggaran": "المخالفات",
      "Orang Miskin": "المساكين",
      "Hasil perhitungan akan muncul di sini.": "ستظهر نتيجة الحساب هنا.",
      "Analisis Fiqh": "التحليل الفقهي",
      "Analisis akan muncul setelah perhitungan.": "سيظهر التحليل بعد الحساب.",
      "Salin Hasil": "نسخ النتيجة",
      "Bagikan WhatsApp": "مشاركة واتساب",
      "Reset": "إعادة ضبط",

      "Total Kaffarah": "إجمالي الكفارة",
      "pelanggaran": "مخالفات",
      "60 orang miskin": "60 مسكينًا",
      "orang miskin": "مساكين",
      "orang": "شخص",
      "Estimasi biaya": "التكلفة التقديرية",
      "Alternatif kaffarah": "بديل الكفارة",
      "Puasa 2 bulan berturut": "صيام شهرين متتابعين",
      "= 120 hari": "= 120 يومًا",
      "hari": "يوم",
      "Masukkan jumlah pelanggaran.": "أدخل عدد المخالفات.",
      "Orang ini melakukan pelanggaran jima di siang hari Ramadhan": "هذا الشخص ارتكب مخالفة الجماع في نهار رمضان",
      "sebanyak": "بعدد",
      "kali.": "مرات.",
      "Menurut fiqh, kaffarahnya adalah:": "بحسب الفقه، الكفارة هي:",
      "1. Memerdekakan budak": "1. عتق رقبة",
      "2. Jika tidak mampu â†’ puasa 2 bulan berturut-turut": "2. إن لم يستطع -> صيام شهرين متتابعين",
      "3. Jika tidak mampu â†’ memberi makan 60 orang miskin": "3. إن لم يستطع -> إطعام 60 مسكينًا",
      "2. Jika tidak mampu -> puasa 2 bulan berturut-turut": "2. إن لم يستطع -> صيام شهرين متتابعين",
      "3. Jika tidak mampu -> memberi makan 60 orang miskin": "3. إن لم يستطع -> إطعام 60 مسكينًا",
      "Jika memilih memberi makan:": "إذا اختار الإطعام:",
      "Total orang miskin:": "إجمالي المساكين:",
      "Dalil:": "الدليل:",
      "Hadits Abu Hurairah:": "حديث أبي هريرة:",
      "Seorang lelaki datang kepada Nabi ï·º dan berkata": "جاء رجل إلى النبي ﷺ وقال",
      "Seorang lelaki datang kepada Nabi ﷺ dan berkata": "جاء رجل إلى النبي ﷺ وقال",
      "Aku celaka.": "هلكت.",
      "Nabi bertanya:": "قال النبي:",
      "Apa yang membuatmu celaka?": "ما أهلكك؟",
      "Ia menjawab:": "قال:",
      "Aku menggauli istriku di siang hari Ramadhan.": "جامعت زوجتي في نهار رمضان.",
      "(HR Bukhari dan Muslim)": "(رواه البخاري ومسلم)",
      "Dalil Qur'an:": "الدليل من القرآن:",
      "Catatan:": "ملاحظة:",
      "Mayoritas ulama menyatakan setiap pelanggaran": "يرى جمهور العلماء أن كل مخالفة",
      "memiliki kaffarah tersendiri.": "لها كفارة مستقلة.",
      "Hasil berhasil disalin": "تم نسخ النتيجة بنجاح",

      "Kalkulator Kaffarah Sumpah": "حاسبة كفارة اليمين",
      "Kalkulator fiqh modern: zakat, mawaris, fidyah,": "حاسبات فقهية حديثة: الزكاة، المواريث، الفدية،",
      "kaffarah, dan panduan ibadah berbasis dalil.": "الكفارة، وأدلة العبادة المبنية على النصوص.",
      "Portal edukasi Islam yang menyediakan artikel,": "بوابة تعليمية إسلامية توفر المقالات،",
      "kalkulator fiqh, dan panduan ibadah berbasis": "وحاسبات الفقه، وأدلة العبادة المبنية على",
      "Al-Qur'an dan Sunnah.": "القرآن والسنة.",
      "Gunakan Kalkulator": "استخدم الحاسبة",
      "Baca Artikel": "اقرأ المقالات",
      "Perhitungan Kaffarah Sumpah": "حساب كفارة اليمين",
      "Jumlah sumpah yang dilanggar": "عدد الأيمان المنقوضة",
      "contoh: 2": "مثال: 2",
      "contoh: 15000": "مثال: 15000",
      "Sumpah": "الأيمان",
      "Masukkan jumlah sumpah.": "أدخل عدد الأيمان.",
      "sumpah": "أيمان",
      "Puasa 3 hari": "صيام 3 أيام",
      "Orang ini melanggar sumpah sebanyak": "هذا الشخص نقض اليمين",
      "Menurut fiqh:": "بحسب الفقه:",
      "1. Memberi makan 10 orang miskin": "1. إطعام 10 مساكين",
      "2. Memberi pakaian 10 orang miskin": "2. كسوة 10 مساكين",
      "3. Memerdekakan budak": "3. عتق رقبة",
      "Jika tidak mampu:": "إن لم يستطع:",
      "Dalil Qur'an": "الدليل من القرآن",

      "Kalkulator Fidyah": "حاسبة الفدية",
      "🔴 Kalkulator Fidyah Puasa": "🔴 حاسبة فدية الصيام",
      "Hitung kewajiban fidyah secara praktis sesuai fiqh.": "احسب واجب الفدية عمليًا وفق الفقه.",
      "Portal ini menyediakan berbagai kalkulator fiqh untuk membantu memahami hukum Islam secara praktis.": "توفر هذه البوابة حاسبات فقهية متنوعة للمساعدة على فهم أحكام الإسلام بشكل عملي.",
      "Portal ini menyediakan berbagai kalkulator fiqh untuk membantu memahami": "توفر هذه البوابة حاسبات فقهية متنوعة للمساعدة على فهم",
      "Portal ini menyediakan berbagai kalkulator fiqh": "توفر هذه البوابة حاسبات فقهية متنوعة",
      "untuk membantu memahami": "للمساعدة على فهم",
      "hukum Islam secara praktis.": "أحكام الإسلام بشكل عملي.",
      "Masukkan jumlah hari puasa yang ditinggalkan untuk mengetahui": "أدخل عدد أيام الصيام المتروكة لمعرفة",
      "kewajiban fidyah yang harus dibayarkan.": "واجب الفدية الذي يجب دفعه.",
      "Perhitungan Fidyah": "حساب الفدية",
      "Jumlah hari tidak puasa": "عدد أيام الإفطار",
      "Harga makanan per hari (Rp)": "سعر الطعام لليوم (روبية)",
      "contoh: 10": "مثال: 10",
      "Metode pembayaran": "طريقة الدفع",
      "Uang": "نقود",
      "Beras": "أرز",
      "Total Hari": "إجمالي الأيام",
      "Total Fidyah": "إجمالي الفدية",
      "Penjelasan fiqh akan muncul di sini.": "سيظهر الشرح الفقهي هنا.",
      "Masukkan jumlah hari puasa.": "أدخل عدد أيام الصيام.",
      "Total Fidyah Beras": "إجمالي فدية الأرز",
      "Orang ini meninggalkan puasa": "هذا الشخص ترك الصيام",
      "Menurut mazhab Syafi'i, fidyah adalah memberi makan": "وفق المذهب الشافعي، الفدية هي إطعام",
      "fidyah adalah memberi makan satu orang miskin": "الفدية هي إطعام مسكين واحد",
      "satu orang miskin untuk setiap hari puasa yang ditinggalkan.": "مسكين واحد عن كل يوم صيام متروك.",
      "untuk setiap hari puasa yang ditinggalkan.": "عن كل يوم صيام متروك.",
      "Total orang miskin yang harus diberi makan:": "إجمالي المساكين الواجب إطعامهم:",
      "Estimasi biaya fidyah:": "التكلفة التقديرية للفدية:",
      "Fidyah dibayarkan dalam bentuk makanan pokok": "تُدفع الفدية على شكل طعام أساسي",
      "sebanyak 1 mud (~0.75 kg) untuk setiap hari puasa.": "بمقدار مد واحد (~0.75 كجم) عن كل يوم.",
      "Total fidyah beras yang harus dikeluarkan:": "إجمالي فدية الأرز الواجبة:",
      "Ini setara memberi makan": "وهذا يعادل إطعام",
      "Menurut Mazhab Syafi'i,": "وفق المذهب الشافعي،",
      "kg beras": "كجم أرز",

      "Kalkulator Qadha Puasa": "حاسبة قضاء الصيام",
      "📅 Kalkulator Qadha Puasa": "📅 حاسبة قضاء الصيام",
      "Hitung jumlah hari puasa Ramadhan yang harus diganti (qadha) dengan mudah sesuai fiqh.": "احسب عدد أيام صيام رمضان التي يجب قضاؤها بسهولة وفق الفقه.",
      "Perhitungan Qadha Puasa": "حساب قضاء الصيام",
      "Jumlah hari puasa yang ditinggalkan": "عدد أيام الصيام المتروكة",
      "contoh: 5": "مثال: 5",
      "Hitung Qadha": "احسب القضاء",
      "Hari Qadha": "أيام القضاء",
      "Estimasi selesai (hari)": "المدة التقديرية للانتهاء (أيام)",
      "Penjelasan Fiqh": "الشرح الفقهي",
      "Qadha puasa wajib bagi orang yang meninggalkan puasa Ramadhan karena uzur syar'i seperti sakit atau safar.": "قضاء الصيام واجب لمن ترك صيام رمضان لعذر شرعي كالمرض أو السفر.",
      "Allah berfirman:": "قال الله تعالى:",
      "\"Barang siapa sakit atau dalam perjalanan, maka wajib mengganti pada hari yang lain.\"": "\"فمن كان منكم مريضًا أو على سفر فعدة من أيام أخر\"",
      "(QS Al-Baqarah: 184)": "(سورة البقرة: 184)",
      "Website ini menyediakan kalkulator fiqh wanita,": "يوفر هذا الموقع حاسبات فقه المرأة،",
      "mawaris, dan berbagai alat bantu fiqh berbasis": "والمواريث، وأدوات فقهية متنوعة مبنية على",
      "mazhab Syafi'i.": "المذهب الشافعي.",
      "Masukkan jumlah hari puasa": "أدخل عدد أيام الصيام",
      "Jumlah hari harus lebih dari 0": "يجب أن يكون عدد الأيام أكبر من 0",
      "Jumlah hari tidak boleh lebih dari 30": "يجب ألا يتجاوز عدد الأيام 30",
      "Saya memiliki": "لدي",
      "hari qadha puasa yang harus diganti. Dihitung menggunakan Kalkulator Fiqh di Portal Literasi Islam.": "يومًا من قضاء الصيام يجب عليّ أداؤها. تم الحساب باستخدام حاسبة الفقه في بوابة الثقافة الإسلامية.",
      "Kifayatul Akhyar": "كفاية الأخيار",
      "Fathul Qarib": "فتح القريب",
      "Al-Ibanah Wal Ifadhah": "الإبانة والإفادة",
      "Tuhfatul Muhtaj": "تحفة المحتاج"
    }
  };

  const SORTED_KEYS = {
    en: Object.keys(PHRASE_MAP.en).sort((a, b) => b.length - a.length),
    ar: Object.keys(PHRASE_MAP.ar).sort((a, b) => b.length - a.length)
  };

  function getLang() {
    const saved = localStorage.getItem("siteLang") || "id";
    return LANGS.includes(saved) ? saved : "id";
  }

  function setDirection(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("rtl-ui", lang === "ar");
    document.body.classList.remove("lang-id", "lang-en", "lang-ar");
    document.body.classList.add(`lang-${lang}`);
  }

  function ensureStyle() {
    if (document.getElementById("kaffarah-lang-style")) return;
    const style = document.createElement("style");
    style.id = "kaffarah-lang-style";
    style.textContent = `
      .kfi-lang-switch {
        margin-left: auto;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        margin-top: 2px;
        margin-bottom: 2px;
      }
      .kfi-lang-switch select {
        border: 1px solid rgba(255,255,255,.35);
        background: rgba(255,255,255,.12);
        color: inherit;
        border-radius: 999px;
        padding: 4px 10px;
        font-size: 12px;
      }
      body.rtl-ui .kfi-lang-switch {
        margin-left: 0;
        margin-right: auto;
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
      .navbar .logo {
        display: inline-flex;
        align-items: center;
        margin-right: 12px;
      }
      body.rtl-ui .navbar .logo {
        margin-right: 0;
        margin-left: 12px;
      }
      .navbar .nav-menu,
      .navbar nav {
        display: flex;
        align-items: center;
        gap: 14px;
        flex-wrap: wrap;
      }
      body.rtl-ui .nav-menu,
      body.rtl-ui nav {
        direction: rtl;
      }
      body.rtl-ui .nav-menu a,
      body.rtl-ui nav a {
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
      body.rtl-ui .hasil-box,
      body.rtl-ui .analisis-box,
      body.rtl-ui .fiqh-box,
      body.rtl-ui .info-box,
      body.rtl-ui blockquote {
        text-align: right;
      }
    `;
    document.head.appendChild(style);
  }

  function normalizeMojibake(str) {
    if (!str) return str;
    return str
      .replaceAll("Ã¢â€ â€™", "->")
      .replaceAll("â†’", "->")
      .replaceAll("→", "->")
      .replaceAll("Ã—", "×")
      .replaceAll("Ã¢â‚¬â€œ", "-")
      .replaceAll("â€“", "-")
      .replaceAll("â€”", "-")
      .replaceAll("Â©", "©")
      .replaceAll("ï·º", "ﷺ");
  }

  function ensureSwitcher(lang) {
    const container = document.querySelector(".nav-container") || document.querySelector(".navbar");
    if (!container) return;

    let wrap = document.getElementById("kfi-lang-switch");
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.id = "kfi-lang-switch";
      wrap.className = "kfi-lang-switch";
      wrap.innerHTML = `
        <label for="kfi-lang-select" id="kfi-lang-label"></label>
        <select id="kfi-lang-select">
          <option value="id">ID</option>
          <option value="en">EN</option>
          <option value="ar">AR</option>
        </select>
      `;
      container.appendChild(wrap);
      wrap.querySelector("#kfi-lang-select")?.addEventListener("change", (e) => {
        localStorage.setItem("siteLang", e.target.value);
        location.reload();
      });
    }

    const label = wrap.querySelector("#kfi-lang-label");
    if (label) label.textContent = LABELS[lang] || LABELS.id;
    const select = wrap.querySelector("#kfi-lang-select");
    if (select) select.value = lang;
  }

  function replaceText(str, lang) {
    if (lang === "id") return normalizeMojibake(str);
    const keys = SORTED_KEYS[lang];
    const map = PHRASE_MAP[lang];
    if (!keys || !map || !str) return str;

    let out = normalizeMojibake(str);
    keys.forEach((key) => {
      if (out.includes(key)) out = out.split(key).join(map[key]);
    });
    return out;
  }

  function translatePlaceholders(root, lang) {
    root.querySelectorAll("[placeholder]").forEach((el) => {
      const before = el.getAttribute("placeholder");
      if (!before) return;
      const after = replaceText(before, lang);
      if (after !== before) el.setAttribute("placeholder", after);
    });
  }

  function translateTextNodes(root, lang) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach((node) => {
      const parent = node.parentElement?.tagName;
      if (parent === "SCRIPT" || parent === "STYLE" || parent === "NOSCRIPT") return;
      const before = node.textContent;
      const after = replaceText(before, lang);
      if (after !== before) node.textContent = after;
    });
  }

  function installAlertTranslator(lang) {
    if (!window.__kfiAlertOriginal) {
      window.__kfiAlertOriginal = window.alert.bind(window);
    }
    window.alert = (msg) => window.__kfiAlertOriginal(replaceText(String(msg ?? ""), lang));
  }

  function installObserver(lang) {
    if (window.__kfiObserver) window.__kfiObserver.disconnect();
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
            const before = node.textContent || "";
            const after = replaceText(before, lang);
            if (after !== before) node.textContent = after;
          }
        });

        if (mutation.type === "characterData" && mutation.target?.parentElement) {
          translateTextNodes(mutation.target.parentElement, lang);
        }
      });

      busy = false;
    });

    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true
    });
    window.__kfiObserver = observer;
  }

  function patchShareFunctions(lang) {
    ["shareWhatsApp", "shareWA", "shareWhatsapp"].forEach((fnName) => {
      const fn = window[fnName];
      if (typeof fn !== "function" || fn.__kfiWrapped) return;

      const wrapped = function (...args) {
        const originalOpen = window.open;
        window.open = function (url, ...rest) {
          try {
            if (typeof url === "string" && url.includes("wa.me/?text=")) {
              const idx = url.indexOf("text=");
              if (idx >= 0) {
                const prefix = url.slice(0, idx + 5);
                const encoded = url.slice(idx + 5);
                const decoded = decodeURIComponent(encoded);
                const translated = replaceText(decoded, lang);
                url = prefix + encodeURIComponent(translated);
              }
            }
          } catch {}
          return originalOpen.call(this, url, ...rest);
        };

        try {
          return fn.apply(this, args);
        } finally {
          window.open = originalOpen;
        }
      };

      wrapped.__kfiWrapped = true;
      window[fnName] = wrapped;
    });
  }

  function apply(lang) {
    setDirection(lang);
    ensureStyle();
    ensureSwitcher(lang);

    const nextTitle = PAGE_TITLES[page]?.[lang];
    if (nextTitle && lang !== "id") {
      document.title = nextTitle;
    }

    if (lang === "id") return;

    translateTextNodes(document.body, lang);
    translatePlaceholders(document.body, lang);
    installAlertTranslator(lang);
    installObserver(lang);
    patchShareFunctions(lang);
  }

  document.addEventListener("DOMContentLoaded", () => apply(getLang()));
})();
