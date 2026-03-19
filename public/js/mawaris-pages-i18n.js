(() => {
  const LANGS = ["id", "en", "ar"];
  function getCurrentRouteInfo() {
    const pathname = window.location.pathname.toLowerCase();
    const rawPage = (pathname.split("/").filter(Boolean).pop() || "").toLowerCase();

    if (pathname.endsWith("/tools/mawaris") || rawPage === "mawaris") {
      return { pathname, rawPage, pageKey: "mawaris" };
    }
    if (pathname.endsWith("/tabel-fiqh") || rawPage === "tabel-fiqh") {
      return { pathname, rawPage, pageKey: "tabel-fiqh" };
    }
    if (pathname.endsWith("/metodologi") || rawPage === "metodologi") {
      return { pathname, rawPage, pageKey: "metodologi" };
    }
    return { pathname, rawPage, pageKey: rawPage.replace(/\.html$/, "") };
  }

  function getCurrentPageKey() {
    return getCurrentRouteInfo().pageKey;
  }

  const MAWARIS_FORM_MAP = {
    en: {
      "Total Harta (Rp)": "Total Estate (IDR)",
      "Suami": "Husband",
      "Jumlah Istri": "Number of Wives",
      "Ayah": "Father",
      "Ibu": "Mother",
      "Anak Laki-laki": "Sons",
      "Anak Perempuan": "Daughters",
      "Saudari Kandung": "Full Sisters",
      "Saudara Kandung": "Full Brothers",
      "Saudara Seibu": "Maternal Siblings",
      "Saudari Seayah": "Paternal Sisters",
      "Saudara Seayah": "Paternal Brothers",
      "Kakek (Ayah dari Ayah)": "Grandfather (Father's Father)",
      "Nenek (Ibu dari Ibu)": "Grandmother (Mother's Mother)",
      "Nenek (Ibu dari Ayah)": "Grandmother (Father's Mother)",
      "Cucu Laki (dari anak laki):": "Grandsons (from sons):",
      "Cucu Perempuan (dari anak laki):": "Granddaughters (from sons):",
      "Ahli Waris Lanjutan": "Extended Heirs",
      "(Aktif jika struktur utama kosong)": "(Active when core heirs are absent)",
      "Anak Saudara Kandung Laki:": "Son of Full Brother:",
      "Anak Saudara Seayah Laki:": "Son of Paternal Brother:",
      "Paman Kandung:": "Full Uncle:",
      "Paman Seayah:": "Paternal Uncle:",
      "Anak Paman Kandung:": "Son of Full Uncle:",
      "Anak Paman Seayah:": "Son of Paternal Uncle:",
      "Dzawil Arham": "Dhawu al-Arham",
      "Bibi Kandung:": "Full Aunt:",
      "Anak Saudari Kandung:": "Daughter of Full Sister:",
      "Anak Saudari Seayah:": "Daughter of Paternal Sister:",
      "Anak Saudari Seibu:": "Daughter of Maternal Sister:",
      "Bibi Seayah:": "Paternal Aunt:",
      "Bibi Seibu:": "Maternal Aunt:",
      "Paman Seibu:": "Maternal Uncle:",
      "Mazhab:": "Madhhab:",
      "Metode Dzawil Arham:": "Dhawu al-Arham Method:"
    },
    ar: {
      "Total Harta (Rp)": "إجمالي التركة (روبية)",
      "Suami": "الزوج",
      "Jumlah Istri": "عدد الزوجات",
      "Ayah": "الأب",
      "Ibu": "الأم",
      "Anak Laki-laki": "الأبناء الذكور",
      "Anak Perempuan": "البنات",
      "Saudari Kandung": "الأخوات الشقيقات",
      "Saudara Kandung": "الإخوة الأشقاء",
      "Saudara Seibu": "الإخوة لأم",
      "Saudari Seayah": "الأخوات لأب",
      "Saudara Seayah": "الإخوة لأب",
      "Kakek (Ayah dari Ayah)": "الجد (أبو الأب)",
      "Nenek (Ibu dari Ibu)": "الجدة (أم الأم)",
      "Nenek (Ibu dari Ayah)": "الجدة (أم الأب)",
      "Cucu Laki (dari anak laki):": "أحفاد ذكور (من الابن):",
      "Cucu Perempuan (dari anak laki):": "حفيدات (من الابن):",
      "Ahli Waris Lanjutan": "الورثة اللاحقون",
      "(Aktif jika struktur utama kosong)": "(تُفعل عند خلو الورثة الأساسيين)",
      "Anak Saudara Kandung Laki:": "ابن الأخ الشقيق:",
      "Anak Saudara Seayah Laki:": "ابن الأخ لأب:",
      "Paman Kandung:": "العم الشقيق:",
      "Paman Seayah:": "العم لأب:",
      "Anak Paman Kandung:": "ابن العم الشقيق:",
      "Anak Paman Seayah:": "ابن العم لأب:",
      "Dzawil Arham": "ذوو الأرحام",
      "Bibi Kandung:": "العمة الشقيقة:",
      "Anak Saudari Kandung:": "بنت الأخت الشقيقة:",
      "Anak Saudari Seayah:": "بنت الأخت لأب:",
      "Anak Saudari Seibu:": "بنت الأخت لأم:",
      "Bibi Seayah:": "العمة لأب:",
      "Bibi Seibu:": "العمة لأم:",
      "Paman Seibu:": "الخال:",
      "Mazhab:": "المذهب:",
      "Metode Dzawil Arham:": "منهج ذوي الأرحام:"
    }
  };

  const HEIR_NAME_MAP = {
    en: {
      "Suami": "Husband",
      "Istri": "Wife",
      "Ayah": "Father",
      "Ibu": "Mother",
      "Kakek": "Grandfather",
      "Nenek (Ibu dari Ibu)": "Grandmother (Mother's Mother)",
      "Nenek (Ibu dari Ayah)": "Grandmother (Father's Mother)",
      "Anak Laki-laki": "Sons",
      "Anak Perempuan": "Daughters",
      "Cucu Laki": "Grandsons",
      "Cucu Perempuan": "Granddaughters",
      "Saudara Kandung Laki": "Full Brothers",
      "Saudari Kandung": "Full Sisters",
      "Saudara Seayah Laki": "Paternal Brothers",
      "Saudari Seayah": "Paternal Sisters",
      "Saudara Seibu": "Maternal Siblings",
      "Anak Saudara Kandung Laki": "Son of Full Brother",
      "Anak Saudara Seayah Laki": "Son of Paternal Brother",
      "Paman Kandung": "Full Uncle",
      "Paman Seayah": "Paternal Uncle",
      "Anak Paman Kandung": "Son of Full Uncle",
      "Anak Paman Seayah": "Son of Paternal Uncle",
      "Anak Saudari Kandung": "Daughter of Full Sister",
      "Anak Saudari Seayah": "Daughter of Paternal Sister",
      "Anak Saudari Seibu": "Daughter of Maternal Sister",
      "Bibi Kandung": "Full Aunt",
      "Bibi Seayah": "Paternal Aunt",
      "Bibi Seibu": "Maternal Aunt",
      "Paman Seibu": "Maternal Uncle",
      "Baitul Maal": "Baitul Mal"
    },
    ar: {
      "Suami": "الزوج",
      "Istri": "الزوجة",
      "Ayah": "الأب",
      "Ibu": "الأم",
      "Kakek": "الجد",
      "Nenek (Ibu dari Ibu)": "الجدة (أم الأم)",
      "Nenek (Ibu dari Ayah)": "الجدة (أم الأب)",
      "Anak Laki-laki": "الأبناء الذكور",
      "Anak Perempuan": "البنات",
      "Cucu Laki": "أحفاد ذكور",
      "Cucu Perempuan": "حفيدات",
      "Saudara Kandung Laki": "الإخوة الأشقاء",
      "Saudari Kandung": "الأخوات الشقيقات",
      "Saudara Seayah Laki": "الإخوة لأب",
      "Saudari Seayah": "الأخوات لأب",
      "Saudara Seibu": "الإخوة لأم",
      "Anak Saudara Kandung Laki": "ابن الأخ الشقيق",
      "Anak Saudara Seayah Laki": "ابن الأخ لأب",
      "Paman Kandung": "العم الشقيق",
      "Paman Seayah": "العم لأب",
      "Anak Paman Kandung": "ابن العم الشقيق",
      "Anak Paman Seayah": "ابن العم لأب",
      "Anak Saudari Kandung": "بنت الأخت الشقيقة",
      "Anak Saudari Seayah": "بنت الأخت لأب",
      "Anak Saudari Seibu": "بنت الأخت لأم",
      "Bibi Kandung": "العمة الشقيقة",
      "Bibi Seayah": "العمة لأب",
      "Bibi Seibu": "العمة لأم",
      "Paman Seibu": "الخال",
      "Baitul Maal": "بيت المال"
    }
  };

  const RUNTIME_MAP = {
    en: {
      "Terjadi kesalahan sistem. Silakan refresh.": "A system error occurred. Please refresh.",
      "Input total harus angka tanpa simbol.": "Total input must be numeric without symbols.",
      "Input total harus angka.": "Total input must be numeric.",
      "Minimal pilih satu ahli waris.": "Please select at least one heir.",
      "Silakan pilih minimal satu ahli waris.": "Please select at least one heir.",
      "Masukkan jumlah harta yang valid.": "Please enter a valid estate amount.",
      "Ayah dan Kakek tidak mungkin ada bersamaan.": "Father and grandfather cannot both exist together.",
      "Saudara terhalang karena ada Ayah.": "Siblings are blocked because the father exists.",
      "Nenek terhalang karena ada Ibu.": "Grandmother is blocked because the mother exists.",
      "Saudara seibu terhalang karena ada Ayah, Kakek, atau Anak.": "Maternal siblings are blocked because father, grandfather, or child exists.",
      "Cucu terhalang karena ada Anak Laki.": "Grandchildren are blocked because a son exists.",
      "Terjadi kesalahan pembulatan internal.": "An internal rounding error occurred.",
      "Klik Hitung dulu sebelum download.": "Please click Calculate before downloading.",
      "Library jsPDF tidak ditemukan.": "jsPDF library not found.",
      "Menghitung...": "Calculating...",
      "Hitung": "Calculate",
      "Hasil Pembagian:": "Distribution Result:",
      " (per orang): Rp ": " (per person): IDR ",
      ": Rp ": ": IDR ",
      "Keterangan:": "Note:",
      "Terjadi 'Awl (penyesuaian proporsional karena total bagian melebihi harta).": "'Awl occurred (proportional adjustment because total shares exceeded the estate).",
      "Terjadi Radd (sisa harta dikembalikan kepada ahli waris selain suami/istri).": "Radd occurred (residue returned to heirs except spouse).",
      "Status Perhitungan:": "Calculation Status:",
      "Detail Akademik:": "Academic Details:",
      "Asal Masalah:": "Asl al-Mas'alah:",
      "Penjelasan Fiqh Detail:": "Detailed Fiqh Explanation:",
      "Perbandingan Qarabah vs Tanzil": "Qarabah vs Tanzil Comparison",
      "Ahli Waris": "Heir",
      "Selisih": "Difference",
      "Kasus khusus Akdariyyah.": "Special Akdariyyah case.",
      "Asal masalah normal (tidak terjadi 'Awl atau Radd).": "Normal asal masalah (no 'Awl or Radd occurred).",
      "Terjadi Radd (ada sisa harta yang dikembalikan).": "Radd occurred (remaining estate was returned).",
      "Terjadi 'Awl (asal masalah bertambah karena total bagian melebihi harta).": "'Awl occurred (asal masalah increased because total shares exceeded the estate).",
      "1. Identifikasi Ahli Waris:": "1. Heir Identification:",
      "2. Penetapan Furudh:": "2. Fixed Share Allocation:",
      "3. Pemeriksaan Sisa Harta:": "3. Residue Review:",
      "4. Dzawil Arham:": "4. Dhawu al-Arham:",
      "5. Kesimpulan:": "5. Conclusion:",
      "Terdapat: ": "There are: ",
      "Suami termasuk ahli waris furudh.": "The husband is among the fixed-share heirs.",
      "Karena ada anak, suami mendapat 1/4.": "Because there is a child, the husband receives 1/4.",
      "Karena tidak ada anak, suami mendapat 1/2.": "Because there is no child, the husband receives 1/2.",
      "Terjadi Radd karena masih ada sisa harta.": "Radd occurred because there is remaining estate.",
      "Terjadi 'Awl karena bagian melebihi harta.": "'Awl occurred because assigned shares exceed the estate.",
      "Sisa harta diberikan sesuai urutan ahli waris.": "Remaining estate is allocated by heir priority.",
      "Anak Saudari Kandung termasuk dzawil arham derajat pertama.": "The daughter of a full sister belongs to the first degree of dhawu al-arham.",
      "Dengan metode Qarabah (Jumhur), derajat terdekat menerima seluruh sisa.": "With Qarabah (majority), the nearest degree receives the full residue.",
      "Dengan metode Tanzil, ia diposisikan sebagai Saudari Kandung.": "With Tanzil, the heir is positioned as a full sister."
    },
    ar: {
      "Terjadi kesalahan sistem. Silakan refresh.": "حدث خطأ في النظام. يرجى إعادة التحميل.",
      "Input total harus angka tanpa simbol.": "يجب أن يكون إجمالي التركة رقمًا بدون رموز.",
      "Input total harus angka.": "يجب أن يكون الإجمالي رقمًا.",
      "Minimal pilih satu ahli waris.": "يرجى اختيار وارث واحد على الأقل.",
      "Silakan pilih minimal satu ahli waris.": "يرجى اختيار وارث واحد على الأقل.",
      "Masukkan jumlah harta yang valid.": "يرجى إدخال مبلغ تركة صالح.",
      "Ayah dan Kakek tidak mungkin ada bersamaan.": "لا يمكن اجتماع الأب والجد معًا.",
      "Saudara terhalang karena ada Ayah.": "الإخوة محجوبون لوجود الأب.",
      "Nenek terhalang karena ada Ibu.": "الجدة محجوبة لوجود الأم.",
      "Saudara seibu terhalang karena ada Ayah, Kakek, atau Anak.": "الإخوة لأم محجوبون لوجود الأب أو الجد أو الولد.",
      "Cucu terhalang karena ada Anak Laki.": "الأحفاد محجوبون لوجود ابن.",
      "Terjadi kesalahan pembulatan internal.": "حدث خطأ داخلي في التقريب.",
      "Klik Hitung dulu sebelum download.": "يرجى الضغط على \"احسب\" قبل التنزيل.",
      "Library jsPDF tidak ditemukan.": "مكتبة jsPDF غير موجودة.",
      "Menghitung...": "جارٍ الحساب...",
      "Hitung": "احسب",
      "Hasil Pembagian:": "نتيجة التقسيم:",
      " (per orang): Rp ": " (لكل فرد): روبية ",
      ": Rp ": ": روبية ",
      "Keterangan:": "ملاحظة:",
      "Terjadi 'Awl (penyesuaian proporsional karena total bagian melebihi harta).": "حدث العول (تعديل نسبي لأن مجموع الأنصبة تجاوز التركة).",
      "Terjadi Radd (sisa harta dikembalikan kepada ahli waris selain suami/istri).": "حدث الرد (أُعيد الفائض للورثة عدا الزوج/الزوجة).",
      "Status Perhitungan:": "حالة الحساب:",
      "Detail Akademik:": "تفاصيل أكاديمية:",
      "Asal Masalah:": "أصل المسألة:",
      "Penjelasan Fiqh Detail:": "شرح فقهي تفصيلي:",
      "Perbandingan Qarabah vs Tanzil": "مقارنة القرابة والتنزيل",
      "Ahli Waris": "الوارث",
      "Selisih": "الفارق",
      "Kasus khusus Akdariyyah.": "حالة الأكدرية الخاصة.",
      "Asal masalah normal (tidak terjadi 'Awl atau Radd).": "أصل المسألة عادي ولم يقع عول ولا رد.",
      "Terjadi Radd (ada sisa harta yang dikembalikan).": "وقع الرد لوجود فائض أُعيد إلى الورثة.",
      "Terjadi 'Awl (asal masalah bertambah karena total bagian melebihi harta).": "وقع العول فزاد أصل المسألة لأن مجموع الأنصبة تجاوز التركة.",
      "1. Identifikasi Ahli Waris:": "1. تحديد الورثة:",
      "2. Penetapan Furudh:": "2. تقرير الفروض:",
      "3. Pemeriksaan Sisa Harta:": "3. مراجعة الباقي من التركة:",
      "4. Dzawil Arham:": "4. ذوو الأرحام:",
      "5. Kesimpulan:": "5. الخلاصة:",
      "Terdapat: ": "الموجود: ",
      "Suami termasuk ahli waris furudh.": "الزوج من أصحاب الفروض.",
      "Karena ada anak, suami mendapat 1/4.": "لوجود ولد، يأخذ الزوج الربع.",
      "Karena tidak ada anak, suami mendapat 1/2.": "عند عدم وجود ولد، يأخذ الزوج النصف.",
      "Terjadi Radd karena masih ada sisa harta.": "حدث الرد لوجود فائض من التركة.",
      "Terjadi 'Awl karena bagian melebihi harta.": "حدث العول لأن الأنصبة تجاوزت التركة.",
      "Sisa harta diberikan sesuai urutan ahli waris.": "يُعطى الباقي بحسب ترتيب الورثة.",
      "Anak Saudari Kandung termasuk dzawil arham derajat pertama.": "بنت الأخت الشقيقة من ذوي الأرحام في الدرجة الأولى.",
      "Dengan metode Qarabah (Jumhur), derajat terdekat menerima seluruh sisa.": "بطريقة القرابة (قول الجمهور) تستحق الدرجة الأقرب كامل الباقي.",
      "Dengan metode Tanzil, ia diposisikan sebagai Saudari Kandung.": "بطريقة التنزيل تُنزَّل منزلة الأخت الشقيقة."
    }
  };

  const CONTENT_TRANSLATION_MAP = {
    fiqh: {
      en: {
        "Anak Perempuan": "Daughter",
        "Cucu Perempuan dari Anak Laki-laki": "Granddaughter (Son's Daughter)",
        "Saudara Perempuan Sekandung": "Full Sister",
        "Saudara Perempuan Sebapak": "Paternal Sister",
        "Saudara Laki-laki / Perempuan Seibu": "Maternal Siblings",
        "Ibu": "Mother",
        "Ayah": "Father",
        "Suami": "Husband",
        "Istri": "Wife",
        "Kakek": "Grandfather",
        "Ashabah": "Residuary (Ashabah)",
        "Mahjub": "Blocked (Mahjub)",
        "Ashabah ma'al ghair": "Residuary with others (ma'al ghair)",
        "1/3 Sisa": "1/3 of Residue",
        "1/6 + Sisa": "1/6 + Residue",
        "Bila sendirian, tidak ada anak laki-laki": "If alone and there is no son.",
        "Bila dua orang atau lebih, tidak ada anak laki-laki": "If there are two or more daughters and no son.",
        "Bersama anak laki-laki (laki-laki dua bagian perempuan)": "With a son (male receives twice the female share).",
        "Sendirian, tidak ada anak perempuan atau yang mengashabahkan": "If alone, with no daughter and no residuary counterpart.",
        "Dua orang atau lebih, tidak ada anak perempuan": "If two or more, with no daughter.",
        "Bersama satu anak perempuan (penyempurna 2/3)": "With one daughter (to complete the two-thirds share).",
        "Bersama cucu laki-laki sederajat": "With an equal-level grandson.",
        "Terhalang oleh anak laki-laki": "Blocked by the presence of a son.",
        "Sendirian, tidak ada anak, ayah, atau cucu": "If alone, with no child, father, or grandchild.",
        "Dua orang atau lebih, tidak ada penghalang": "If two or more and no blocker exists.",
        "Bersama saudara laki-laki sekandung": "With a full brother.",
        "Bersama anak perempuan": "With a daughter.",
        "Terhalang oleh anak laki-laki atau ayah": "Blocked by a son or father.",
        "Sendirian, tidak ada anak, cucu, ayah, atau saudara sekandung": "If alone, with no child, grandchild, father, or full sibling.",
        "Bersama satu saudara perempuan sekandung (penyempurna 2/3)": "With one full sister (to complete the two-thirds share).",
        "Bersama saudara laki-laki sebapak": "With a paternal brother.",
        "Bersama anak perempuan atau cucu perempuan": "With a daughter or granddaughter.",
        "Terhalang oleh anak laki-laki, ayah, atau saudara laki-laki sekandung": "Blocked by a son, father, or full brother.",
        "Terhalang oleh dua saudara perempuan sekandung yang telah mengambil 2/3": "Blocked by two full sisters who already take two-thirds.",
        "Sendirian, tidak ada anak atau ayah": "If alone, with no child or father.",
        "Dua orang atau lebih, tidak ada anak atau ayah": "If two or more, with no child or father.",
        "Terhalang oleh anak, cucu laki-laki, ayah, atau kakek": "Blocked by child, grandson, father, or grandfather.",
        "Ada anak atau dua saudara": "When there is a child or two siblings.",
        "Tidak ada anak dan tidak ada dua saudara": "When there is no child and not two siblings.",
        "Kasus Gharawain (bersama ayah & suami/istri)": "Gharawain case (with father and spouse).",
        "Ada anak laki-laki": "When there is a son.",
        "Ada anak perempuan": "When there is a daughter.",
        "Tidak ada anak": "When there is no child.",
        "Ada anak": "When there is a child.",
        "Bersama anak laki-laki atau cucu laki-laki": "With a son or grandson.",
        "anak": "child",
        "anak laki-laki": "son",
        "anak perempuan": "daughter",
        "cucu laki-laki": "grandson",
        "cucu perempuan": "granddaughter"
      },
      ar: {
        "Anak Perempuan": "البنت",
        "Cucu Perempuan dari Anak Laki-laki": "بنت الابن",
        "Saudara Perempuan Sekandung": "الأخت الشقيقة",
        "Saudara Perempuan Sebapak": "الأخت لأب",
        "Saudara Laki-laki / Perempuan Seibu": "الإخوة لأم",
        "Ibu": "الأم",
        "Ayah": "الأب",
        "Suami": "الزوج",
        "Istri": "الزوجة",
        "Kakek": "الجد",
        "Ashabah": "عصبة",
        "Mahjub": "محجوب",
        "Ashabah ma'al ghair": "عصبة مع الغير",
        "1/3 Sisa": "ثلث الباقي",
        "1/6 + Sisa": "1/6 + الباقي",
        "Bila sendirian, tidak ada anak laki-laki": "إذا كانت واحدة ولا يوجد ابن.",
        "Bila dua orang atau lebih, tidak ada anak laki-laki": "إذا كن اثنتين فأكثر ولا يوجد ابن.",
        "Bersama anak laki-laki (laki-laki dua bagian perempuan)": "مع الابن، للذكر مثل حظ الأنثيين.",
        "Sendirian, tidak ada anak perempuan atau yang mengashabahkan": "إذا كانت واحدة ولا توجد بنت ولا عاصب يجعلها عصبة.",
        "Dua orang atau lebih, tidak ada anak perempuan": "إذا كن اثنتين فأكثر ولا توجد بنت.",
        "Bersama satu anak perempuan (penyempurna 2/3)": "مع بنت واحدة تكملةً للثلثين.",
        "Bersama cucu laki-laki sederajat": "مع ابن ابن في درجتها.",
        "Terhalang oleh anak laki-laki": "محجوبة بوجود الابن.",
        "Sendirian, tidak ada anak, ayah, atau cucu": "إذا كانت واحدة ولا يوجد ولد ولا أب ولا حفيد.",
        "Dua orang atau lebih, tidak ada penghalang": "إذا كن اثنتين فأكثر ولا يوجد حاجب.",
        "Bersama saudara laki-laki sekandung": "مع الأخ الشقيق.",
        "Bersama anak perempuan": "مع البنت.",
        "Terhalang oleh anak laki-laki atau ayah": "محجوبة بالابن أو الأب.",
        "Sendirian, tidak ada anak, cucu, ayah, atau saudara sekandung": "إذا كانت واحدة ولا يوجد ولد ولا حفيد ولا أب ولا أخ شقيق.",
        "Bersama satu saudara perempuan sekandung (penyempurna 2/3)": "مع أخت شقيقة واحدة تكملةً للثلثين.",
        "Bersama saudara laki-laki sebapak": "مع الأخ لأب.",
        "Bersama anak perempuan atau cucu perempuan": "مع البنت أو بنت الابن.",
        "Terhalang oleh anak laki-laki, ayah, atau saudara laki-laki sekandung": "محجوبة بالابن أو الأب أو الأخ الشقيق.",
        "Terhalang oleh dua saudara perempuan sekandung yang telah mengambil 2/3": "محجوبة بأختين شقيقتين أخذتا الثلثين.",
        "Sendirian, tidak ada anak atau ayah": "إذا كان واحدًا ولا يوجد ولد ولا أب.",
        "Dua orang atau lebih, tidak ada anak atau ayah": "إذا كانوا اثنين فأكثر ولا يوجد ولد ولا أب.",
        "Terhalang oleh anak, cucu laki-laki, ayah, atau kakek": "محجوب بالولد أو ابن الابن أو الأب أو الجد.",
        "Ada anak atau dua saudara": "عند وجود ولد أو أخوين فأكثر.",
        "Tidak ada anak dan tidak ada dua saudara": "عند عدم وجود ولد ولا أخوين.",
        "Kasus Gharawain (bersama ayah & suami/istri)": "في الغراوين (مع الأب والزوج أو الزوجة).",
        "Ada anak laki-laki": "عند وجود ابن.",
        "Ada anak perempuan": "عند وجود بنت.",
        "Tidak ada anak": "عند عدم وجود ولد.",
        "Ada anak": "عند وجود ولد.",
        "Bersama anak laki-laki atau cucu laki-laki": "مع الابن أو ابن الابن.",
        "anak": "ولد",
        "anak laki-laki": "ابن",
        "anak perempuan": "بنت",
        "cucu laki-laki": "ابن الابن",
        "cucu perempuan": "بنت الابن"
      }
    },
    metodologi: {
      en: {
        "Metodologi Perhitungan Mawaris": "Mawaris Calculation Methodology",
        "1. Landasan Mazhab": "1. Madhhab Basis",
        "Perhitungan dalam sistem ini menggunakan pendekatan Jumhur serta beberapa mazhab (Syafi'i dan Hanafi). Rujukan utama berasal dari:": "This system uses the Jumhur approach with selected madhhab references (Shafi'i and Hanafi). Main references include:",
        "Al-Fiqh al-Manhaji": "Al-Fiqh al-Manhaji",
        "Syarh Rohabiyyah": "Sharh al-Rahabiyyah",
        "Al Masalik Az Zahabiyah": "Al-Masalik al-Dhahabiyyah",
        "Fath al-Qarib": "Fath al-Qarib",
        "2. Urutan Pembagian Harta": "2. Estate Distribution Order",
        "Sebelum pembagian kepada ahli waris, harta dibagi dalam urutan berikut:": "Before distributing to heirs, the estate is processed in this order:",
        "Biaya pemakaman": "Funeral expenses",
        "Pelunasan hutang": "Debt settlement",
        "Pelaksanaan wasiat (maksimal 1/3 harta)": "Execution of will (maximum one-third of estate)",
        "Pembagian kepada ahli waris": "Distribution to heirs",
        "3. Identifikasi Ahli Waris": "3. Heir Identification",
        "Sistem mengidentifikasi ahli waris yang berhak berdasarkan struktur:": "The system identifies eligible heirs based on lineage structure:",
        "Furu' (anak, cucu)": "Furu' (children, grandchildren)",
        "Ushul (ayah, ibu, kakek, nenek)": "Ushul (father, mother, grandfather, grandmother)",
        "Hawasyi (saudara, paman, dll)": "Hawasyi (siblings, uncles, etc.)",
        "4. Penentuan Ashabul Furudh": "4. Determining Ashabul Furudh",
        "Bagian tetap (fardh) diberikan terlebih dahulu kepada: Suami, Istri, Ayah, Ibu, Anak Perempuan, Cucu Perempuan, Saudara Perempuan (sekandung/sebapak/seibu).": "Fixed shares (fardh) are prioritized for: Husband, Wife, Father, Mother, Daughter, Granddaughter, and Sisters (full/paternal/maternal).",
        "5. Perhitungan Asal Masalah": "5. Calculating Asal Masalah",
        "Asal masalah ditentukan dari penyebut pecahan terbesar untuk menyamakan seluruh bagian ahli waris.": "Asal masalah is set from the common denominator to align all heir fractions.",
        "6. 'Awl (Penyesuaian Proporsional)": "6. 'Awl (Proportional Adjustment)",
        "Jika total bagian melebihi 1 (100%), maka dilakukan 'awl, yaitu menaikkan asal masalah dan menyesuaikan seluruh bagian secara proporsional.": "If total shares exceed 1 (100%), 'awl is applied by scaling the denominator and adjusting all shares proportionally.",
        "7. Radd (Pengembalian Sisa)": "7. Radd (Return of Residue)",
        "Jika terdapat sisa harta dan tidak ada ashabah, maka sisa dikembalikan kepada ahli waris ashhabul furudh kecuali suami dan istri.": "If residue remains and no ashabah exists, the remainder is returned to ashhabul furudh heirs except husband and wife.",
        "8. Ashabah": "8. Ashabah",
        "Jika terdapat sisa setelah pembagian fardh, maka diberikan kepada ashabah terdekat sesuai urutan nasab.": "If residue remains after fixed shares, it goes to the nearest ashabah based on lineage priority.",
        "9. Hijab (Penghalang)": "9. Hijab (Blocking Rules)",
        "Ahli waris tertentu dapat terhalang (mahjub) oleh ahli waris yang lebih dekat, misalnya:": "Some heirs can be blocked (mahjub) by closer heirs, for example:",
        "Saudara terhalang oleh ayah": "Siblings are blocked by the father",
        "Cucu terhalang oleh anak laki-laki": "Grandchildren are blocked by a son",
        "Saudara seibu terhalang oleh anak atau ayah": "Maternal siblings are blocked by child or father",
        "10. Dzawil Arham": "10. Dhawu al-Arham",
        "Jika tidak ada ashhabul furudh dan ashabah, maka digunakan metode:": "If there are no ashhabul furudh and no ashabah, these methods are used:",
        "Qarabah (Jumhur)": "Qarabah (Majority view)",
        "Tanzil": "Tanzil",
        "11. Validasi Akademik": "11. Academic Validation",
        "Sistem ini bersifat edukatif. Dalam praktik nyata, disarankan konsultasi dengan ahli faraidh atau lembaga fatwa terpercaya.": "This system is educational. For real inheritance cases, consult a qualified faraidh scholar or trusted fatwa institution."
      },
      ar: {
        "Metodologi Perhitungan Mawaris": "منهجية حساب المواريث",
        "1. Landasan Mazhab": "1. الأساس المذهبي",
        "Perhitungan dalam sistem ini menggunakan pendekatan Jumhur serta beberapa mazhab (Syafi'i dan Hanafi). Rujukan utama berasal dari:": "يعتمد هذا النظام على منهج الجمهور مع الاستفادة من المذهبين الشافعي والحنفي، ومن أبرز المراجع:",
        "Al-Fiqh al-Manhaji": "الفقه المنهجي",
        "Syarh Rohabiyyah": "شرح الرحبية",
        "Al Masalik Az Zahabiyah": "المسالك الذهبية",
        "Fath al-Qarib": "فتح القريب",
        "2. Urutan Pembagian Harta": "2. ترتيب توزيع التركة",
        "Sebelum pembagian kepada ahli waris, harta dibagi dalam urutan berikut:": "قبل توزيع التركة على الورثة، تُرتَّب الحقوق على النحو الآتي:",
        "Biaya pemakaman": "تكاليف التجهيز والدفن",
        "Pelunasan hutang": "سداد الديون",
        "Pelaksanaan wasiat (maksimal 1/3 harta)": "تنفيذ الوصية (بحد أقصى ثلث التركة)",
        "Pembagian kepada ahli waris": "توزيع الباقي على الورثة",
        "3. Identifikasi Ahli Waris": "3. تحديد الورثة",
        "Sistem mengidentifikasi ahli waris yang berhak berdasarkan struktur:": "يحدّد النظام الورثة المستحقين وفق بنية القرابة:",
        "Furu' (anak, cucu)": "الفروع (الأبناء وأبناء الأبناء)",
        "Ushul (ayah, ibu, kakek, nenek)": "الأصول (الأب، الأم، الجد، الجدة)",
        "Hawasyi (saudara, paman, dll)": "الحواشي (الإخوة، الأعمام، وغيرهم)",
        "4. Penentuan Ashabul Furudh": "4. تحديد أصحاب الفروض",
        "Bagian tetap (fardh) diberikan terlebih dahulu kepada: Suami, Istri, Ayah, Ibu, Anak Perempuan, Cucu Perempuan, Saudara Perempuan (sekandung/sebapak/seibu).": "تُقدَّم الأنصبة المقدّرة أولًا لأصحاب الفروض: الزوج، الزوجة، الأب، الأم، البنت، بنت الابن، والأخوات (الشقيقة/لأب/لأم).",
        "5. Perhitungan Asal Masalah": "5. حساب أصل المسألة",
        "Asal masalah ditentukan dari penyebut pecahan terbesar untuk menyamakan seluruh bagian ahli waris.": "يُحدَّد أصل المسألة من المقام المشترك لتوحيد أنصبة جميع الورثة.",
        "6. 'Awl (Penyesuaian Proporsional)": "6. العول (التعديل النسبي)",
        "Jika total bagian melebihi 1 (100%), maka dilakukan 'awl, yaitu menaikkan asal masalah dan menyesuaikan seluruh bagian secara proporsional.": "إذا تجاوز مجموع الأنصبة 100% يُعمل بالعول، برفع أصل المسألة وتعديل الأنصبة بنسبة متناسبة.",
        "7. Radd (Pengembalian Sisa)": "7. الرد (إرجاع الفائض)",
        "Jika terdapat sisa harta dan tidak ada ashabah, maka sisa dikembalikan kepada ahli waris ashhabul furudh kecuali suami dan istri.": "إذا بقي فائض ولم يوجد عصبة، يُرد الباقي على أصحاب الفروض عدا الزوج والزوجة.",
        "8. Ashabah": "8. العصبة",
        "Jika terdapat sisa setelah pembagian fardh, maka diberikan kepada ashabah terdekat sesuai urutan nasab.": "إذا بقي شيء بعد الفروض، يُعطى لأقرب عصبة حسب ترتيب النسب.",
        "9. Hijab (Penghalang)": "9. الحجب",
        "Ahli waris tertentu dapat terhalang (mahjub) oleh ahli waris yang lebih dekat, misalnya:": "قد يُحجب بعض الورثة بوجود وارث أقرب، مثل:",
        "Saudara terhalang oleh ayah": "الإخوة يُحجبون بالأب",
        "Cucu terhalang oleh anak laki-laki": "الحفيد يُحجب بالابن",
        "Saudara seibu terhalang oleh anak atau ayah": "الإخوة لأم يُحجبون بالولد أو الأب",
        "10. Dzawil Arham": "10. ذوو الأرحام",
        "Jika tidak ada ashhabul furudh dan ashabah, maka digunakan metode:": "إذا لم يوجد أصحاب فروض ولا عصبة، فيُعمل بأحد المنهجين:",
        "Qarabah (Jumhur)": "القرابة (قول الجمهور)",
        "Tanzil": "التنزيل",
        "11. Validasi Akademik": "11. التحقق الأكاديمي",
        "Sistem ini bersifat edukatif. Dalam praktik nyata, disarankan konsultasi dengan ahli faraidh atau lembaga fatwa terpercaya.": "هذا النظام تعليمي، وفي القضايا الواقعية يُنصح بمراجعة مختص في الفرائض أو جهة فتوى موثوقة."
      }
    }
  };

  const ORIGINAL_PAGE_CONTENT = {
    fiqhTableBody: null,
    metodologiSection: null
  };

  const UI_DATA = {
    id: {
      switchLabel: "Bahasa",
      mawaris: {
        title: "Kalkulator Mawaris",
        logo: "Portal Literasi Islam",
        nav: ["Beranda", "Tabel Fiqh", "Metodologi", "Tentang", "Kontak"],
        h1: "⚖️ Kalkulator Mawaris (Jumhur)",
        mode: ["Mode Sederhana", "Mode Akademik"],
        calculate: "Hitung",
        compare: "Bandingkan Qarabah vs Tanzil",
        pdf: "Download PDF",
        mazhabOptions: ["Syafi'i", "Hanafi"],
        dzawilOptions: ["Qarabah (Jumhur)", "Tanzil"],
        helperTitle: "Terjemahan Istilah Form (Ringkas)",
        helperItems: [
          "Ahli waris inti: suami/istri, ayah, ibu, anak, saudara.",
          "Ahli waris lanjutan: keponakan, paman, sepupu (aktif jika inti kosong).",
          "Metode Dzawil Arham: Qarabah (Jumhur) dan Tanzil.",
          "Mode Akademik menampilkan detail alasan fiqh lebih lengkap."
        ],
        prefooterTitle: ["Portal Literasi Islam", "Referensi Fiqh", "Catatan"],
        prefooterBody: [
          "Kalkulator Mawaris berbasis Jumhur dan Mazhab (Syafi'i dan Hanafi)",
          "Al-Fiqh al-Manhaji<br>Syarh Rohabiyyah<br>Al Masalik Az Zahabiyah<br>Fath al-Qarib",
          "Hasil perhitungan bersifat edukatif. Disarankan verifikasi dengan ahli waris atau ulama."
        ],
        footer: ["Tentang", "FAQ", "Kontak", "Privacy Policy", "Disclaimer"],
        footerCopy: "© 2026 Portal Literasi Islam – Seluruh hak cipta dilindungi."
      },
      fiqh: {
        title: "Tabel Fiqh Mawaris",
        logo: "Portal Literasi Islam",
        nav: ["Beranda", "Hitung Mawaris", "Tabel Fiqh", "Metodologi"],
        h1: "Tabel Fiqh Pembagian Waris",
        sub: "Ringkasan bagian ahli waris berdasarkan Jumhur",
        tableTitle: "DAFTAR KEMUNGKINAN AHLI WARIS DALAM MENDAPATKAN HARTA WARIS",
        th: ["Nama", "No", "Bagian", "Keterangan"],
        footerCopy: "© 2026 Portal Literasi Islam – Seluruh hak cipta dilindungi."
      },
      metodologi: {
        title: "Metodologi Perhitungan Mawaris",
        logo: "Portal Literasi Islam",
        nav: ["Beranda", "Hitung Mawaris", "Tabel Fiqh", "Metodologi"],
        h1: "Metodologi Perhitungan",
        sub: "Penjelasan sistem dan pendekatan fiqh yang digunakan",
        footerCopy: "© 2026 Portal Literasi Islam – Seluruh hak cipta dilindungi."
      }
    },
    en: {
      switchLabel: "Language",
      mawaris: {
        title: "Mawaris Calculator",
        logo: "Islamic Literacy Portal",
        nav: ["Home", "Fiqh Table", "Methodology", "About", "Contact"],
        h1: "⚖️ Mawaris Calculator (Jumhur)",
        mode: ["Simple Mode", "Academic Mode"],
        calculate: "Calculate",
        compare: "Compare Qarabah vs Tanzil",
        pdf: "Download PDF",
        mazhabOptions: ["Shafi'i", "Hanafi"],
        dzawilOptions: ["Qarabah (Majority)", "Tanzil"],
        helperTitle: "Form Terms Translation (Quick)",
        helperItems: [
          "Core heirs: spouse, father, mother, children, siblings.",
          "Extended heirs: nephews, uncles, cousins (active when core line is absent).",
          "Dzawil Arham methods: Qarabah (majority) and Tanzil.",
          "Academic mode shows deeper fiqh reasoning details."
        ],
        prefooterTitle: ["Islamic Literacy Portal", "Fiqh References", "Notes"],
        prefooterBody: [
          "Jumhur-based Mawaris calculator with madhhab options (Shafi'i and Hanafi).",
          "Al-Fiqh al-Manhaji<br>Syarh Rohabiyyah<br>Al Masalik Az Zahabiyah<br>Fath al-Qarib",
          "This calculation is educational. Real cases should be verified with a qualified scholar."
        ],
        footer: ["About", "FAQ", "Contact", "Privacy Policy", "Disclaimer"],
        footerCopy: "© 2026 Islamic Literacy Portal – All rights reserved."
      },
      fiqh: {
        title: "Mawaris Fiqh Table",
        logo: "Islamic Literacy Portal",
        nav: ["Home", "Mawaris Calculator", "Fiqh Table", "Methodology"],
        h1: "Fiqh Table of Inheritance Distribution",
        sub: "Summary of heir shares based on Jumhur.",
        tableTitle: "LIST OF HEIR SHARE POSSIBILITIES IN INHERITANCE",
        th: ["Name", "No", "Share", "Description"],
        footerCopy: "© 2026 Islamic Literacy Portal – All rights reserved."
      },
      metodologi: {
        title: "Mawaris Calculation Methodology",
        logo: "Islamic Literacy Portal",
        nav: ["Home", "Mawaris Calculator", "Fiqh Table", "Methodology"],
        h1: "Calculation Methodology",
        sub: "System explanation and fiqh approach used.",
        footerCopy: "© 2026 Islamic Literacy Portal – All rights reserved."
      }
    },
    ar: {
      switchLabel: "اللغة",
      mawaris: {
        title: "حاسبة المواريث",
        logo: "بوابة الثقافة الإسلامية",
        nav: ["الرئيسية", "جدول الفقه", "المنهجية", "من نحن", "اتصل بنا"],
        h1: "⚖️ حاسبة المواريث (قول الجمهور)",
        mode: ["الوضع المبسط", "الوضع الأكاديمي"],
        calculate: "احسب",
        compare: "مقارنة القرابة والتنزيل",
        pdf: "تنزيل PDF",
        mazhabOptions: ["الشافعي", "الحنفي"],
        dzawilOptions: ["القرابة (الجمهور)", "التنزيل"],
        helperTitle: "ترجمة مختصرة لمصطلحات النموذج",
        helperItems: [
          "الورثة الأساسيون: الزوج/الزوجة، الأب، الأم، الأولاد، الإخوة.",
          "الورثة اللاحقون: أبناء الإخوة، الأعمام، أبناء الأعمام.",
          "طرق ذوي الأرحام: القرابة (الجمهور) والتنزيل.",
          "الوضع الأكاديمي يعرض تعليلًا فقهيًا أعمق."
        ],
        prefooterTitle: ["بوابة الثقافة الإسلامية", "مراجع فقهية", "ملاحظات"],
        prefooterBody: [
          "حاسبة مواريث مبنية على قول الجمهور مع خيارات المذاهب (الشافعي والحنفي).",
          "الفقه المنهجي<br>شرح الرحبية<br>المسالك الذهبية<br>فتح القريب",
          "النتائج تعليمية. في القضايا الواقعية يُنصح بمراجعة مختص في الفرائض."
        ],
        footer: ["من نحن", "الأسئلة الشائعة", "اتصل بنا", "سياسة الخصوصية", "إخلاء المسؤولية"],
        footerCopy: "© 2026 بوابة الثقافة الإسلامية – جميع الحقوق محفوظة."
      },
      fiqh: {
        title: "جدول فقه المواريث",
        logo: "بوابة الثقافة الإسلامية",
        nav: ["الرئيسية", "حاسبة المواريث", "جدول الفقه", "المنهجية"],
        h1: "جدول فقه تقسيم الميراث",
        sub: "ملخص أنصبة الورثة وفق قول الجمهور.",
        tableTitle: "قائمة احتمالات أنصبة الورثة في التركة",
        th: ["الاسم", "الرقم", "النصيب", "البيان"],
        footerCopy: "© 2026 بوابة الثقافة الإسلامية – جميع الحقوق محفوظة."
      },
      metodologi: {
        title: "منهجية حساب المواريث",
        logo: "بوابة الثقافة الإسلامية",
        nav: ["الرئيسية", "حاسبة المواريث", "جدول الفقه", "المنهجية"],
        h1: "منهجية الحساب",
        sub: "شرح النظام والمنهج الفقهي المعتمد.",
        footerCopy: "© 2026 بوابة الثقافة الإسلامية – جميع الحقوق محفوظة."
      }
    }
  };

  function getLang() {
    const saved = localStorage.getItem("siteLang") || "id";
    return LANGS.includes(saved) ? saved : "id";
  }

  function setLang(lang) {
    localStorage.setItem("siteLang", lang);
    apply(lang);
  }

  function setDirection(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("rtl-ui", lang === "ar");
  }

  function text(node, value) {
    if (node && value != null) node.textContent = value;
  }

  function texts(nodes, values = []) {
    values.forEach((value, i) => {
      if (nodes[i] && value != null) nodes[i].textContent = value;
    });
  }

  function ensureSwitcher(lang, label) {
    const host = document.querySelector(".nav-container");
    if (!host) return;

    let wrap = document.getElementById("lang-switch-wrap");
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.id = "lang-switch-wrap";
      wrap.className = "lang-switch-wrap";
      wrap.innerHTML = `
        <label for="site-lang-switch" class="lang-switch-label"></label>
        <select id="site-lang-switch" class="lang-switch-select">
          <option value="id">ID</option>
          <option value="en">EN</option>
          <option value="ar">AR</option>
        </select>
      `;
      host.appendChild(wrap);
      wrap.querySelector("#site-lang-switch")?.addEventListener("change", (e) => {
        setLang(e.target.value);
      });
    }

    const select = wrap.querySelector("#site-lang-switch");
    if (select) select.value = lang;
    text(wrap.querySelector(".lang-switch-label"), label);
  }

  function replaceMap(str, map = {}) {
    return Object.keys(map)
      .sort((a, b) => b.length - a.length)
      .reduce((acc, key) => acc.split(key).join(map[key]), str);
  }

  function translateTextNodes(root, map = {}) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      if (node.__mwOriginalText == null) {
        node.__mwOriginalText = node.textContent;
      }

      const original = node.__mwOriginalText;
      const trimmed = original.trim();
      if (!trimmed) return;
      const normalized = trimmed.replace(/\s+/g, " ");
      const translated = map[trimmed] || map[normalized] || trimmed;
      node.textContent = original.replace(trimmed, translated);
    });
  }

  function installAlertTranslator(lang) {
    if (!window.__mwAlertOriginal) {
      window.__mwAlertOriginal = window.alert.bind(window);
    }

    if (getCurrentPageKey() !== "mawaris") {
      window.alert = window.__mwAlertOriginal;
      return;
    }

    const map = RUNTIME_MAP[lang] || {};

    window.alert = (message) => {
      const msg = String(message ?? "");
      const translated = map[msg] || msg;
      window.__mwAlertOriginal(translated);
    };
  }

  function translateCalcButton(lang) {
    const map = RUNTIME_MAP[lang] || {};
    const btn = document.getElementById("hitungMawarisBtn");
    if (!btn) return;

    const fromId = map["Hitung"] ? "Hitung" : null;
    const fromCalc = map["Menghitung..."] ? "Menghitung..." : null;

    if (fromId && btn.textContent.trim() === "Hitung") btn.textContent = map["Hitung"];
    if (fromCalc && btn.textContent.trim() === "Menghitung...") btn.textContent = map["Menghitung..."];

    if (btn.__mwObserver) {
      btn.__mwObserver.disconnect();
    }

    const observer = new MutationObserver(() => {
      const v = btn.textContent.trim();
      if (v === "Hitung" && map["Hitung"]) btn.textContent = map["Hitung"];
      if (v === "Menghitung..." && map["Menghitung..."]) btn.textContent = map["Menghitung..."];
    });
    observer.observe(btn, { childList: true, characterData: true, subtree: true });
    btn.__mwObserver = observer;
  }

  function translateResultArea(lang) {
    const hasil = document.getElementById("hasil");
    if (!hasil) return;

    const phraseMap = RUNTIME_MAP[lang] || {};
    const heirMap = HEIR_NAME_MAP[lang] || {};

    const applyResultTranslation = () => {
      if (hasil.__mwBusy) return;
      hasil.__mwBusy = true;

      const current = hasil.innerHTML || "";
      if (current && current !== hasil.__mwLastTranslated) {
        hasil.__mwBaseSource = current;
      }

      const base = hasil.__mwBaseSource || current;
      let next = base;

      if (lang !== "id") {
        next = replaceMap(next, phraseMap);
        next = replaceMap(next, heirMap);
      }

      if (next !== current) {
        hasil.innerHTML = next;
      }

      hasil.__mwLastTranslated = next;

      if (window.mawarisChart && window.mawarisChart.data?.labels) {
        if (!window.mawarisChart.__mwBaseLabels) {
          window.mawarisChart.__mwBaseLabels = [...window.mawarisChart.data.labels];
        }

        window.mawarisChart.data.labels =
          lang === "id"
            ? [...window.mawarisChart.__mwBaseLabels]
            : window.mawarisChart.__mwBaseLabels.map((label) => heirMap[label] || label);

        window.mawarisChart.update();
      }

      hasil.__mwBusy = false;
    };

    if (hasil.__mwObserver) {
      hasil.__mwObserver.disconnect();
    }

    const observer = new MutationObserver(() => applyResultTranslation());
    observer.observe(hasil, { childList: true, subtree: true, characterData: true });
    hasil.__mwObserver = observer;

    applyResultTranslation();
  }

  function applyMawarisFormTranslations(lang) {
    const map = MAWARIS_FORM_MAP[lang] || {};

    const formBox = document.querySelector(".form-box");
    translateTextNodes(formBox, map);

    const sections = document.querySelectorAll(".section-title");
    if (sections[0]) {
      const node = sections[0].childNodes[0];
      if (node && node.nodeType === Node.TEXT_NODE) {
        if (node.__mwOriginalText == null) {
          node.__mwOriginalText = node.textContent;
        }
        node.textContent = map["Ahli Waris Lanjutan"] || node.__mwOriginalText;
      }
      const sub = sections[0].querySelector(".section-sub");
      if (sub && sub.dataset.mwOriginalText == null) {
        sub.dataset.mwOriginalText = sub.textContent;
      }
      text(sub, map["(Aktif jika struktur utama kosong)"] || sub?.dataset.mwOriginalText || "");
    }
    if (sections[1]) {
      if (sections[1].dataset.mwOriginalText == null) {
        sections[1].dataset.mwOriginalText = sections[1].textContent;
      }
      sections[1].textContent = map["Dzawil Arham"] || sections[1].dataset.mwOriginalText;
    }
  }

  function applyMawaris(pack, lang) {
    document.title = pack.title;
    text(document.querySelector(".navbar .logo-text"), pack.logo);
    texts(document.querySelectorAll(".nav-links a"), pack.nav);
    text(document.querySelector(".mawaris-container h1"), pack.h1);
    texts(document.querySelectorAll("#mode option"), pack.mode);
    const calculateBtn = document.getElementById("hitungMawarisBtn");
    if (calculateBtn) {
      calculateBtn.textContent = calculateBtn.disabled
        ? (RUNTIME_MAP[lang] || {})["Menghitung..."] || "Menghitung..."
        : pack.calculate;
    }

    text(document.getElementById("compareBtn"), pack.compare);
    text(document.getElementById("exportMawarisPdfBtn"), pack.pdf);
    texts(document.querySelectorAll("#mazhab option"), pack.mazhabOptions);
    texts(document.querySelectorAll("#dzawilMethod option"), pack.dzawilOptions);

    texts(document.querySelectorAll(".prefooter-col h4"), pack.prefooterTitle);
    const prefooterBodies = document.querySelectorAll(".prefooter-col p");
    pack.prefooterBody?.forEach((html, i) => {
      if (prefooterBodies[i]) prefooterBodies[i].innerHTML = html;
    });
    texts(document.querySelectorAll(".footer-links a"), pack.footer);

    const footer = document.querySelector(".footer-bottom");
    if (footer) {
      Array.from(footer.childNodes).forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          footer.removeChild(node);
        }
      });

      let copy = footer.querySelector(".footer-copy-text");
      if (!copy) {
        copy = document.createElement("div");
        copy.className = "footer-copy-text";
        footer.appendChild(copy);
      }
      copy.textContent = pack.footerCopy;
    }

    let helper = document.getElementById("mawaris-i18n-helper");
    if (!helper) {
      helper = document.createElement("section");
      helper.id = "mawaris-i18n-helper";
      helper.className = "i18n-helper-card";
      const target = document.getElementById("compareBtn");
      if (target?.parentNode) {
        target.parentNode.insertBefore(helper, target.nextSibling);
      }
    }

    if (helper) {
      helper.innerHTML = `
        <h3>${pack.helperTitle}</h3>
        <ul>${pack.helperItems.map((item) => `<li>${item}</li>`).join("")}</ul>
      `;
    }

    applyMawarisFormTranslations(lang);
    installAlertTranslator(lang);
    translateCalcButton(lang);
    translateResultArea(lang);
  }

  function applyFiqhContentTranslations(lang) {
    const tbody = document.querySelector(".fiqh-table tbody");
    if (!tbody) return;

    if (!ORIGINAL_PAGE_CONTENT.fiqhTableBody) {
      ORIGINAL_PAGE_CONTENT.fiqhTableBody = tbody.innerHTML;
    }

    tbody.innerHTML = ORIGINAL_PAGE_CONTENT.fiqhTableBody;

    if (lang === "id") return;

    translateTextNodes(tbody, CONTENT_TRANSLATION_MAP.fiqh[lang] || {});
  }

  function applyMetodologiContentTranslations(lang) {
    const section = document.querySelector(".content-section");
    if (!section) return;

    if (!ORIGINAL_PAGE_CONTENT.metodologiSection) {
      ORIGINAL_PAGE_CONTENT.metodologiSection = section.innerHTML;
    }

    section.innerHTML = ORIGINAL_PAGE_CONTENT.metodologiSection;

    if (lang === "id") return;

    translateTextNodes(section, CONTENT_TRANSLATION_MAP.metodologi[lang] || {});
  }

  function applyFiqh(pack, lang) {
    document.title = pack.title;
    text(document.querySelector(".logo-text"), pack.logo);
    texts(document.querySelectorAll(".nav-links a"), pack.nav);
    text(document.querySelector(".page-header h1"), pack.h1);
    text(document.querySelector(".page-header p"), pack.sub);
    text(document.querySelector(".table-title"), pack.tableTitle);
    texts(document.querySelectorAll(".fiqh-table thead th"), pack.th);
    text(document.querySelector(".simple-footer"), pack.footerCopy);
    applyFiqhContentTranslations(lang);
  }

  function applyMetodologi(pack, lang) {
    document.title = pack.title;
    text(document.querySelector(".logo-text"), pack.logo);
    texts(document.querySelectorAll(".nav-links a"), pack.nav);
    text(document.querySelector(".page-header h1"), pack.h1);
    text(document.querySelector(".page-header p"), pack.sub);
    text(document.querySelector(".simple-footer"), pack.footerCopy);
    applyMetodologiContentTranslations(lang);
  }

  function isPageReady() {
    const pageKey = getCurrentPageKey();
    if (pageKey === "mawaris") return !!document.querySelector(".mawaris-container");
    if (pageKey === "tabel-fiqh") return !!document.querySelector(".fiqh-table-section");
    if (pageKey === "metodologi") return !!document.querySelector(".content-section");
    return true;
  }

  function apply(lang = getLang()) {
    if (!isPageReady()) return false;

    const pageKey = getCurrentPageKey();
    const dict = UI_DATA[lang] || UI_DATA.id;
    setDirection(lang);
    ensureSwitcher(lang, dict.switchLabel);
    initScrollToTopButton();

    if (pageKey === "mawaris") applyMawaris(dict.mawaris, lang);
    if (pageKey === "tabel-fiqh") applyFiqh(dict.fiqh, lang);
    if (pageKey === "metodologi") applyMetodologi(dict.metodologi, lang);
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
    window.dispatchEvent(new Event("mw:routechange"));
  }

  function installNavigationHooks() {
    if (window.__mwI18nNavHooksInstalled) return;
    window.__mwI18nNavHooksInstalled = true;

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
    window.addEventListener("mw:routechange", () => applyWhenReady());
  }

  function initScrollToTopButton() {
    const scrollBtn = document.getElementById("scrollToTopBtn");
    if (!scrollBtn) return;

    if (window.__mwScrollToTopState?.handleScroll) {
      window.removeEventListener("scroll", window.__mwScrollToTopState.handleScroll);
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
    window.__mwScrollToTopState = {
      button: scrollBtn,
      handleScroll
    };

    if (scrollBtn.dataset.boundScrollTop !== "true") {
      scrollBtn.dataset.boundScrollTop = "true";
      scrollBtn.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      });
    }

    handleScroll();
  }

  installNavigationHooks();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => applyWhenReady());
  } else {
    applyWhenReady();
  }

  window.addEventListener("load", () => applyWhenReady());
  window.addEventListener("storage", (e) => {
    if (e.key === "siteLang") applyWhenReady();
  });
  window.addEventListener("mw:routechange", () => initScrollToTopButton());
  initScrollToTopButton();
})();
