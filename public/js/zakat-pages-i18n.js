(() => {
  const LANGS = ["id", "en", "ar"];
  function getPage() {
    const rawPage = (window.location.pathname.split("/").pop() || "").toLowerCase();
    return rawPage.endsWith(".html") ? rawPage : (rawPage ? `${rawPage}.html` : rawPage);
  }
  const state = { zakatInfoOriginal: null };

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

  function normalizeTextTree(node) {
    if (typeof node === "string") return decodeMojibake(node);
    if (Array.isArray(node)) return node.map((item) => normalizeTextTree(item));
    if (node && typeof node === "object") {
      Object.keys(node).forEach((key) => {
        node[key] = normalizeTextTree(node[key]);
      });
    }
    return node;
  }

  const text = {
    zakat: {
      id: {
        pageTitle: "Hitung Zakat | Portal Literasi Islam",
        brand: "Portal Literasi Islam",
        nav: ["Beranda", "Ramadhan", "Bookmark"],
        heroTitle: "Kalkulator Zakat Modern",
        heroBody: "Hitung zakat maal, penghasilan, emas, perdagangan, dan fitrah dengan metode fiqih yang terpercaya.",
        heroButtons: ["Mulai Hitung", "Pelajari Zakat"],
        stats: ["Pengguna", "Zakat dihitung", "Metode perhitungan", "Sesuai fiqh"],
        calcTitle: "Metode Perhitungan",
        chooseMazhab: "Pilih mazhab",
        infoTitles: ["Zakat Maal", "Zakat Penghasilan", "Zakat Fitrah", "Tentang Zakat", "Nisab Zakat", "Penyaluran Zakat"],
        infoBodies: [
          "Zakat atas harta yang disimpan selama 1 tahun dan telah mencapai nisab. Besarnya 2,5% dari total harta bersih.",
          "Zakat dari gaji atau pendapatan rutin. Dikeluarkan jika penghasilan melebihi nisab bulanan.",
          "Zakat wajib setiap muslim menjelang Idul Fitri, sebesar 2,5 kg bahan makanan pokok.",
          "Zakat adalah kewajiban bagi setiap muslim yang hartanya telah mencapai nisab dan haul.",
          "Nisab zakat maal setara dengan 85 gram emas.",
          "Zakat dapat disalurkan melalui lembaga resmi seperti BAZNAS atau langsung kepada mustahik."
        ],
        tabs: ["Zakat Maal", "Saham", "Zakat Fitrah", "Zakat Emas", "Penghasilan", "Perdagangan", "Pertanian", "Peternakan", "Rikaz", "Barang Tambang", "Perusahaan"],
        adminBtn: "Lihat Perkembangan Zakat",
        calcButton: "Hitung Semua Zakat",
        disclaimerHtml:
          "<small><strong>Disclaimer:</strong><br>Perhitungan zakat dalam aplikasi ini bersifat edukatif. Untuk kasus khusus atau kondisi kompleks, silakan konsultasi langsung kepada ahli fiqh atau lembaga zakat terpercaya.</small>",
        livestockChartTitle: "Grafik Zakat Peternakan",
        payBaznas: "Bayar via BAZNAS",
        yearlyHistory: "Riwayat Zakat Tahunan",
        monthlyHistory: "Riwayat Zakat Bulanan",
        modalTitle: "Penjelasan Istilah Zakat Ternak",
        ctaTitle: "Tunaikan Zakat Anda Sekarang",
        ctaBody: "Hitung zakat secara mudah dan salurkan melalui lembaga resmi terpercaya.",
        ctaButtons: ["Mulai Hitung", "Bayar via BAZNAS"],
        footer: ["Tentang", "FAQ", "Kontak", "Privacy Policy", "Disclaimer"],
        footerCopy: "(c) 2026 Portal Literasi Islam - Seluruh hak cipta dilindungi.",
        greeting: "Assalamu'alaikum,",
        logout: "Keluar",
        sectionInvestment: "Investasi Syariah",
        sectionRent: "Zakat Properti Sewa",
        sectionLivestock: "Syarat Wajib Zakat Ternak",
        sectionNisab: "Pengaturan Nisab",
        rikazNote: "Zakat rikaz sebesar 20% dan tidak mensyaratkan haul maupun nisab."
      },
      en: {
        pageTitle: "Zakat Calculator | Islamic Literacy Portal",
        brand: "Islamic Literacy Portal",
        nav: ["Home", "Ramadan", "Bookmark"],
        heroTitle: "Modern Zakat Calculator",
        heroBody: "Calculate wealth, income, gold, trade, and fitrah zakat with trusted fiqh methods.",
        heroButtons: ["Start Calculating", "Learn Zakat"],
        stats: ["Users", "Zakat calculated", "Calculation methods", "Fiqh compliant"],
        calcTitle: "Calculation Method",
        chooseMazhab: "Choose madhhab",
        infoTitles: ["Wealth Zakat", "Income Zakat", "Fitrah Zakat", "About Zakat", "Nisab", "Distribution"],
        infoBodies: [
          "Zakat on wealth held for one lunar year and reaching nisab. The rate is 2.5% of net assets.",
          "Zakat on salaries or routine income when it reaches monthly or annual nisab.",
          "Mandatory zakat before Eid prayer, around 2.5 kg staple food per person.",
          "Zakat is obligatory when wealth reaches nisab and haul.",
          "Wealth nisab equals the value of 85 grams of gold.",
          "Zakat can be distributed through official institutions like BAZNAS or directly to eligible recipients."
        ],
        tabs: ["Wealth Zakat", "Stocks", "Fitrah Zakat", "Gold Zakat", "Income", "Trade", "Agriculture", "Livestock", "Rikaz", "Mining", "Company"],
        adminBtn: "View Zakat Progress",
        calcButton: "Calculate All Zakat",
        disclaimerHtml:
          "<small><strong>Disclaimer:</strong><br>This zakat calculation is educational. For special or complex cases, please consult a qualified scholar or trusted zakat institution.</small>",
        livestockChartTitle: "Livestock Zakat Chart",
        payBaznas: "Pay via BAZNAS",
        yearlyHistory: "Yearly Zakat History",
        monthlyHistory: "Monthly Zakat History",
        modalTitle: "Livestock Zakat Terms",
        ctaTitle: "Pay Your Zakat Now",
        ctaBody: "Calculate your zakat easily and distribute it through trusted institutions.",
        ctaButtons: ["Start Calculating", "Pay via BAZNAS"],
        footer: ["About", "FAQ", "Contact", "Privacy Policy", "Disclaimer"],
        footerCopy: "(c) 2026 Islamic Literacy Portal - All rights reserved.",
        greeting: "Peace be upon you,",
        logout: "Log Out",
        sectionInvestment: "Sharia Investment",
        sectionRent: "Rental Property Zakat",
        sectionLivestock: "Mandatory Livestock Conditions",
        sectionNisab: "Nisab Settings",
        rikazNote: "Rikaz zakat is 20% and does not require haul or nisab.",
        labels: {
          cash: "Cash",
          savings: "Savings",
          gold: "Gold (currency value)",
          receivable: "Receivables",
          debt: "Due debt",
          receivableType: "Receivable type",
          sukuk: "Sukuk value",
          reksadana: "Sharia mutual fund",
          crypto: "Digital asset (as maal)",
          sewaIncome: "Total rental income (1 year)",
          sewaExpense: "Maintenance / operational cost",
          stocks: "Total stock value",
          stockType: "Stock type",
          stockProfit: "Company net profit",
          companyCurrentAssets: "Current assets",
          companyStock: "Inventory",
          companyReceivable: "Current receivables",
          companyDebt: "Due debt",
          capital: "Business capital",
          profit: "Net profit",
          stock: "Inventory",
          businessReceivable: "Business receivables",
          businessDebt: "Business debt",
          "fitrah-jumlah": "Family members",
          "fitrah-harga": "Rice price per kg (IDR)",
          "emas-gram": "Gold weight (gram)",
          "emas-harga": "Gold price per gram (IDR)",
          salary: "Monthly income",
          expenses: "Monthly basic needs",
          salaryMethod: "Income zakat method",
          harvest: "Total harvest (kg)",
          harvestPrice: "Price per kg (IDR)",
          irrigationType: "Irrigation type",
          goatCount: "Number of goats",
          cowCount: "Number of cows",
          camelCount: "Number of camels",
          rikaz: "Rikaz value",
          madin: "Mining value",
          madinMazhab: "Madhhab method",
          goldPrice: "Gold price per gram",
          nisabMethod: "Nisab method"
        },
        checks: {
          haulMaal: "Has reached haul (1 year)",
          haulSaham: "Trading stocks have reached haul",
          haulCompany: "Has reached haul (1 year)",
          haulPerdagangan: "Business has reached haul (1 year)",
          haulEmas: "Has reached haul (1 year)",
          haulSalary: "Income has reached haul (1 year)",
          haulTernak: "Has reached haul 1 year",
          ternakGembala: "Grazed most of the year (sa'imah)",
          ternakBukanKerja: "Not used as working livestock"
        },
        placeholders: {
          sukuk: "Enter sukuk value",
          reksadana: "Enter mutual fund value",
          crypto: "Enter digital asset value"
        },
        options: {
          mazhab: {
            syafii: "Shafi'i (common in Indonesia)",
            hanafi: "Hanafi",
            maliki: "Maliki",
            hanbali: "Hanbali"
          },
          receivableType: {
            kuat: "Strong (trade receivable / liquid)",
            lemah: "Weak / uncertain"
          },
          stockType: {
            trading: "Trading stock",
            produksi: "Production company stock"
          },
          salaryMethod: {
            haul: "Annual haul (1 year)",
            monthly: "Direct monthly"
          },
          irrigationType: {
            "10": "Rain-fed (10%)",
            "5": "Self-funded irrigation (5%)",
            "7.5": "Mixed (7.5%)"
          },
          madinMazhab: {
            "025": "Majority (2.5%)",
            "20": "Hanafi (20%)"
          },
          nisabMethod: {
            emas: "Gold (85 grams)",
            perak: "Silver (595 grams)"
          }
        },
        jewelryCheck: "This gold is used as daily jewelry"
      },
      ar: {
        pageTitle: "حاسبة الزكاة | بوابة الثقافة الإسلامية",
        brand: "بوابة الثقافة الإسلامية",
        nav: ["الرئيسية", "رمضان", "المحفوظات"],
        heroTitle: "حاسبة زكاة حديثة",
        heroBody: "احسب زكاة المال والدخل والذهب والتجارة وزكاة الفطر بطريقة فقهية موثوقة.",
        heroButtons: ["ابدأ الحساب", "تعلّم الزكاة"],
        stats: ["المستخدمون", "زكاة محسوبة", "طرق الحساب", "مطابق للفقه"],
        calcTitle: "منهج الحساب",
        chooseMazhab: "اختر المذهب",
        infoTitles: ["زكاة المال", "زكاة الدخل", "زكاة الفطر", "حول الزكاة", "نصاب الزكاة", "توزيع الزكاة"],
        infoBodies: [
          "تجب زكاة المال إذا بلغ المال النصاب ومضى عليه حول قمري كامل.",
          "زكاة الدخل تكون على الراتب والإيراد المنتظم عند بلوغ النصاب.",
          "زكاة الفطر واجبة قبل صلاة العيد عن كل فرد.",
          "الزكاة فريضة إذا تحقق النصاب والحول.",
          "نصاب المال يعادل قيمة 85 جراما من الذهب.",
          "يمكن دفع الزكاة عبر الجهات الرسمية أو مباشرة للمستحقين."
        ],
        tabs: ["زكاة المال", "الأسهم", "زكاة الفطر", "زكاة الذهب", "الدخل", "التجارة", "الزراعة", "الأنعام", "الركاز", "المعادن", "الشركات"],
        adminBtn: "عرض تطور الزكاة",
        calcButton: "احسب جميع الزكاة",
        disclaimerHtml:
          "<small><strong>تنبيه:</strong><br>نتيجة الحاسبة تقدير تعليمي. للحالات الخاصة أو المعقدة يُنصح بالرجوع إلى أهل الفقه أو مؤسسة زكاة موثوقة.</small>",
        livestockChartTitle: "مخطط زكاة الأنعام",
        payBaznas: "الدفع عبر BAZNAS",
        yearlyHistory: "سجل الزكاة السنوي",
        monthlyHistory: "سجل الزكاة الشهري",
        modalTitle: "شرح مصطلحات زكاة الأنعام",
        ctaTitle: "أدّ زكاتك الآن",
        ctaBody: "احسب زكاتك بسهولة ووزعها عبر الجهات الرسمية الموثوقة.",
        ctaButtons: ["ابدأ الحساب", "الدفع عبر BAZNAS"],
        footer: ["من نحن", "الأسئلة الشائعة", "تواصل", "سياسة الخصوصية", "إخلاء المسؤولية"],
        footerCopy: "(c) 2026 بوابة الثقافة الإسلامية - جميع الحقوق محفوظة.",
        greeting: "السلام عليكم،",
        logout: "خروج",
        sectionInvestment: "الاستثمار الشرعي",
        sectionRent: "زكاة العقار المؤجر",
        sectionLivestock: "شروط زكاة الأنعام",
        sectionNisab: "إعدادات النصاب",
        rikazNote: "زكاة الركاز مقدارها 20٪ ولا يشترط فيها الحول ولا النصاب.",
        labels: {
          cash: "النقد",
          savings: "المدخرات",
          gold: "الذهب (قيمة نقدية)",
          receivable: "الديون المستحقة",
          debt: "الديون الحالة",
          receivableType: "نوع الدين",
          sukuk: "قيمة الصكوك",
          reksadana: "الصناديق الشرعية",
          crypto: "الأصول الرقمية",
          sewaIncome: "إجمالي دخل الإيجار (سنة)",
          sewaExpense: "تكلفة الصيانة والتشغيل",
          stocks: "إجمالي قيمة الأسهم",
          stockType: "نوع السهم",
          stockProfit: "صافي ربح الشركة",
          companyCurrentAssets: "الأصول المتداولة",
          companyStock: "المخزون",
          companyReceivable: "الذمم المدينة",
          companyDebt: "الديون الحالة",
          capital: "رأس المال",
          profit: "صافي الربح",
          stock: "المخزون",
          businessReceivable: "ديون التجارة المدينة",
          businessDebt: "ديون التجارة",
          "fitrah-jumlah": "عدد أفراد الأسرة",
          "fitrah-harga": "سعر الأرز لكل كجم",
          "emas-gram": "وزن الذهب (جرام)",
          "emas-harga": "سعر الذهب لكل جرام",
          salary: "الدخل الشهري",
          expenses: "الاحتياجات الأساسية الشهرية",
          salaryMethod: "طريقة زكاة الدخل",
          harvest: "إجمالي المحصول (كجم)",
          harvestPrice: "السعر لكل كجم",
          irrigationType: "نوع الري",
          goatCount: "عدد الغنم",
          cowCount: "عدد الأبقار",
          camelCount: "عدد الإبل",
          rikaz: "قيمة الركاز",
          madin: "قيمة المعادن",
          madinMazhab: "طريقة المذهب",
          goldPrice: "سعر الذهب لكل جرام",
          nisabMethod: "طريقة النصاب"
        },
        checks: {
          haulMaal: "اكتمل الحول (سنة)",
          haulSaham: "أسهم التداول أتمت الحول",
          haulCompany: "اكتمل الحول (سنة)",
          haulPerdagangan: "اكتمل حول التجارة (سنة)",
          haulEmas: "اكتمل الحول (سنة)",
          haulSalary: "اكتمل حول الدخل (سنة)",
          haulTernak: "اكتمل الحول سنة كاملة",
          ternakGembala: "ترعى أكثر السنة (سائمة)",
          ternakBukanKerja: "ليست أنعام عمل"
        },
        placeholders: {
          sukuk: "أدخل قيمة الصكوك",
          reksadana: "أدخل قيمة الصناديق",
          crypto: "أدخل قيمة الأصول الرقمية"
        },
        options: {
          mazhab: {
            syafii: "الشافعي",
            hanafi: "الحنفي",
            maliki: "المالكي",
            hanbali: "الحنبلي"
          },
          receivableType: {
            kuat: "دين قوي",
            lemah: "دين ضعيف / غير مؤكد"
          },
          stockType: {
            trading: "أسهم تداول",
            produksi: "أسهم شركة إنتاجية"
          },
          salaryMethod: {
            haul: "حول سنوي",
            monthly: "شهري مباشر"
          },
          irrigationType: {
            "10": "ري طبيعي (10%)",
            "5": "ري بتكلفة (5%)",
            "7.5": "مختلط (7.5%)"
          },
          madinMazhab: {
            "025": "قول الجمهور (2.5%)",
            "20": "الحنفي (20%)"
          },
          nisabMethod: {
            emas: "الذهب (85 جراما)",
            perak: "الفضة (595 جراما)"
          }
        },
        jewelryCheck: "هذا الذهب للزينة اليومية"
      }
    },
    zakatInfo: {
      id: {
        pageTitle: "Penjelasan Zakat | Portal Literasi Islam",
        brand: "Portal Literasi Islam",
        nav: ["Beranda", "Kalkulator Zakat"],
        heading: "Ringkasan Jenis-Jenis Zakat",
        tableHead: ["Jenis Zakat", "Objek Zakat", "Nisab", "Kadar Zakat", "Waktu Pembayaran", "Keterangan Fiqih"],
        fiqhTitle: "Penjelasan Fiqih Zakat Lengkap",
        ctaTitle: "Tunaikan Zakat Anda Sekarang",
        ctaBody: "Hitung zakat secara mudah dan salurkan melalui lembaga resmi terpercaya.",
        ctaButtons: ["Mulai Hitung", "Bayar via BAZNAS"],
        footer: ["Tentang", "FAQ", "Kontak", "Privacy Policy", "Disclaimer"],
        footerCopy: "(c) 2026 Portal Literasi Islam - Seluruh hak cipta dilindungi."
      },
      en: {
        pageTitle: "Zakat Guide | Islamic Literacy Portal",
        brand: "Islamic Literacy Portal",
        nav: ["Home", "Zakat Calculator"],
        heading: "Summary of Zakat Types",
        tableHead: ["Zakat Type", "Zakat Base", "Nisab", "Rate", "Payment Time", "Fiqh Notes"],
        fiqhTitle: "Comprehensive Fiqh Notes on Zakat",
        rows: [
          ["Fitrah Zakat", "Staple food", "1 sha'", "1 sha'/person", "Before Eid prayer", "Mandatory for Muslims with surplus food."],
          ["Gold Zakat", "Stored gold", "85 grams", "2.5%", "After 1 year", "Due when nisab and haul are complete."],
          ["Stock Zakat", "Stocks and sukuk", "85g gold value", "2.5%", "After 1 year", "Trading stocks follow trade zakat treatment."],
          ["Silver Zakat", "Stored silver", "595 grams", "2.5%", "After 1 year", "Classical nisab is 200 dirhams."],
          ["Income Zakat", "Salary and income", "85g gold/year", "2.5%", "Monthly or yearly", "Contemporary ijtihad based on qiyas."],
          ["Trade Zakat", "Business assets", "85g gold value", "2.5%", "Every year", "Net trade assets after due debts."],
          ["Agriculture Zakat", "Harvest output", "5 wasaq", "5% or 10%", "At harvest", "10% natural irrigation, 5% paid irrigation."],
          ["Livestock Zakat", "Camels, cows, goats", "By species", "Fiqh schedule", "After 1 year", "Applies to grazing livestock that meet nisab."],
          ["Rikaz Zakat", "Buried treasure", "No nisab", "20%", "When found", "Based on hadith: wa fi al-rikaz al-khums."],
          ["Mining Zakat", "Extracted minerals", "No haul", "2.5% or 20%", "When extracted", "Majority says 2.5%, some Hanafi views 20%."]
        ],
        cards: [
  {
    title: "Introduction to Zakat",
    body: `

<p><strong>a. Definition of Zakat</strong></p>

<p>Linguistically, zakat means growth and increase. The Arabs say <em>zakā az-zar‘u</em> when a plant grows and increases. It is also said <em>zakat an-nafaqah</em> when living expenses are blessed. Sometimes zakat is used with the meaning of purification. Allah the Exalted says: “Successful indeed is the one who purifies it (the soul)” (Ash-Shams: 9) and “Successful indeed is the one who purifies himself (with faith)” (Al-A‘la: 14). Derivatives of the word zakat are also used in the sense of praise. Allah the Exalted says: “So do not claim yourselves to be pure” (An-Najm: 32). The word is also used to express righteousness, such as <em>rajulun zakiyyun</em>, meaning a man whose goodness increases, and <em>rajulun min qaumin azkiyā’</em>, meaning a man from a righteous people. The phrase <em>zakkā al-qāḍī ash-shuhūd</em> means that a judge declares the witnesses to be upright and trustworthy.</p>

<p>The wealth that is given according to Islamic law is called zakat because it increases the wealth that is given and protects it from calamities. Allah the Exalted says: “And give zakat” (Al-Baqarah: 43). These linguistic meanings are reflected in the statement of Allah the Exalted: “Take charity from their wealth in order to purify them and cleanse them thereby” (At-Tawbah: 103). Zakat purifies the person who gives it from sin and increases both his reward and his wealth.</p>

<p>In Islamic law (shar‘), zakat is a mandatory right due upon wealth. The Maliki school defines zakat as giving a specific portion of certain wealth that has reached the nisab to those entitled to receive it, provided that ownership is complete and one full year has passed, except in the case of minerals, crops, and discovered treasure. The Hanafi school defines zakat as transferring ownership of a specific portion of wealth to specific individuals designated by the Sharia solely for the sake of Allah. The phrase “transfer of ownership” excludes merely feeding someone without giving them ownership. The Shafi‘i school defines zakat as a name for property that must be given from wealth or the body to certain recipients. The Hanbali school defines zakat as an obligatory right due upon specific wealth for specific groups at specific times.</p>

<p>The specified groups are the eight categories mentioned in the statement of Allah the Exalted: “Indeed, zakat is only for the poor and the needy…” (At-Tawbah: 60). The specified time refers to the completion of one year for livestock, money, and trade goods; when grains become hardened; when fruits ripen; when the obligation of zakat applies to honey and minerals; and when the sun sets on the night of Eid al-Fitr for zakat al-fitr.</p>

<p><strong>b. The Wisdom of Zakat</strong></p>

<p>The disparity in provision among people is a reality that arises in society and requires regulation within Islamic law. Allah the Exalted says: “And Allah has favored some of you over others in provision” (An-Nahl: 71). Allah has obligated the wealthy to give a prescribed right to the poor. Allah the Exalted says: “And in their wealth there is a right for the beggar and the deprived” (Adh-Dhariyat: 19).</p>

<p>The obligation of zakat is one of the primary means of addressing economic disparity and realizing social solidarity in Islam. Among the wisdoms of zakat is protecting wealth from the hands of wrongdoers. The Messenger of Allah ﷺ said: “Protect your wealth with zakat, treat your sick with charity, and prepare supplication against calamities.” Zakat helps the poor and guides them toward a dignified life. It protects society from the harms of poverty and preserves the strength of the state. The Prophet ﷺ said that Allah has obligated upon the wealthy a portion of wealth sufficient for the poor, and that the poor only suffer because of the negligence of the rich.</p>

<p>Zakat also purifies the soul from miserliness and trains the believer to be generous. It encourages participation in social obligations such as supporting the state, preparing armies, helping the poor, fulfilling vows and expiations, and performing other acts of goodness such as waqf, sacrifice, voluntary charity, and gifts. All of these strengthen solidarity and brotherhood within society. Zakat is also a form of gratitude for the blessing of wealth.</p>

<p><strong>c. The Obligation of Zakat</strong></p>

<p>Zakat is one of the five pillars of Islam and was made obligatory in Madinah in the month of Shawwal in the second year after the Hijrah, after the obligation of fasting in Ramadan and zakat al-fitr. Zakat is frequently mentioned together with prayer in the Qur’an, indicating its great importance. The obligation of zakat is established by the Qur’an, the Sunnah, and scholarly consensus (ijma‘).</p>

<p>Allah the Exalted says: “Establish prayer and give zakat” (Al-Baqarah: 43), “Take charity from their wealth” (At-Tawbah: 103), and “Give its due on the day of harvest” (Al-An‘am: 141). The Prophet ﷺ said: “Islam is built upon five pillars…” among them the payment of zakat. The Prophet ﷺ also said to Mu‘adh when sending him to Yemen that Allah has obligated charity to be taken from the wealthy among them and returned to their poor.</p>

<p>The Muslims unanimously agreed upon the obligation of zakat. The Companions agreed to fight those who refused to pay zakat. Whoever denies its obligation becomes a disbeliever and apostate, except in cases of ignorance such as a person newly entering Islam or living far from Muslim communities.</p>

<p><strong>d. The Punishment for Refusing Zakat</strong></p>

<p>Those who refuse to pay zakat face punishment both in the Hereafter and in this world. Allah the Exalted says: “And those who hoard gold and silver and do not spend it in the path of Allah—give them tidings of a painful punishment…” (At-Tawbah: 34–35).</p>

<p>The Prophet ﷺ said that wealth from which zakat is not paid will become a serpent that coils around its owner on the Day of Resurrection. In another narration it is mentioned that the owners of gold and silver who do not pay zakat will be branded with plates of fire from Hell.</p>

<p>As for the punishment in this world, zakat may be taken by force and even fought over if a group refuses to pay it. Abu Bakr as-Siddiq said that he would fight those who separate between prayer and zakat.</p>

<p><strong>2. THE CAUSE OF ZAKAT, ITS CONDITIONS, AND ITS PILLARS</strong></p>

<p>The Hanafi school states that the cause of zakat is ownership of a nisab that has the potential to grow, even if only theoretically, provided that one lunar year (haul) has passed, not a solar year, that there is no debt demanded by others, and that the wealth exceeds basic needs. The cause and condition depend on the existence of property. Whoever does not own a nisab has no obligation of zakat. Therefore there is no zakat on waqf property because ownership does not exist. Likewise, there is no zakat on property possessed by enemies in their territories. Nisab is the amount determined by the Sharia as a sign that zakat becomes obligatory, such as two hundred dirhams or twenty dinars.</p>

<p>There is no zakat obligation on property that has not yet been received because ownership is not yet complete. There is also no zakat on basic necessities such as clothing, houses, household furniture, vehicles, weapons, books, and professional tools if they are not intended for trade. There is no zakat on lost wealth, property that falls into the sea, property seized without proof of ownership, wealth buried and forgotten, forgotten deposits, or debts that are denied without evidence until they are recovered. The proof is the hadith: “There is no zakat on adh-Dhimār (wealth that is lost and cannot be expected to return).”</p>

<p>There is no zakat obligation on wealth that has not completed one year. There is no zakat on jewels, pearls, rubies, emeralds, or coral except when used for trade. The majority of scholars do not obligate zakat on livestock that are fed in stalls or used for labor, except according to the Maliki school.</p>

<p>The pillar of zakat is giving a portion of the nisab by relinquishing ownership and transferring it to the poor or their representative such as a ruler or zakat collector.</p>

<p><strong>Conditions for the Obligation of Zakat</strong></p>

<p>Zakat is obligatory upon a free, Muslim, adult, and sane person who possesses a nisab with complete ownership and for whom one full year has passed.</p>

<p><strong>Freedom</strong></p>
<p>Zakat is not obligatory upon a slave because he does not own property. The majority of scholars hold that zakat is due from his master. The Maliki school states that neither the slave nor his master is required to pay zakat on the slave’s possessions.</p>

<p><strong>Islam</strong></p>
<p>Zakat is not obligatory upon non-Muslims according to scholarly consensus. The Shafi‘i school obligates zakat on the wealth of an apostate before apostasy, whereas Abu Hanifah considers it void. Non-Muslims may be subject to a tenth tax in certain circumstances according to detailed juristic discussions.</p>

<p><strong>Adulthood and Sanity</strong></p>
<p>According to the Hanafi school, adulthood and sanity are conditions for zakat. However, the majority of scholars do not require them, meaning zakat is due on the wealth of children and the mentally ill, and their guardians must pay it on their behalf.</p>

<p><strong>Wealth that is Zakatable and Productive</strong></p>
<p>This includes gold, silver, paper currency, minerals, buried treasure, trade goods, crops, fruits, and livestock. There is no zakat on non-productive assets except when they are intended for trade.</p>

<p><strong>Reaching the Nisab</strong></p>
<p>The nisab for gold is twenty mithqal, for silver two hundred dirhams, for grains and fruits five wasaq, for goats forty, for camels five, and for cattle thirty.</p>

<p><strong>Complete Ownership</strong></p>
<p>The Hanafi school requires original ownership and actual possession. The Maliki school requires ownership and the ability to manage the property. The Shafi‘i school requires complete ownership and the ability to dispose of it. The Hanbali school also requires ownership and freedom of disposal.</p>

<p><strong>Completion of One Year (Haul)</strong></p>
<p>This is agreed upon as a condition for gold, silver, livestock, and trade goods. It is not required for crops, fruits, minerals, and rikaz. The Hanafi school requires the nisab to be complete at the beginning and end of the year, while the majority require it to remain throughout the year.</p>

<p><strong>No Outstanding Debt</strong></p>
<p>The Hanafi and Hanbali schools consider debt an obstacle to zakat in certain cases. The Maliki school differentiates between zakat on wealth and zakat on crops. The Shafi‘i school holds that debt does not prevent zakat.</p>

<p><strong>Beyond Basic Needs</strong></p>
<p>The Hanafi school requires that zakatable wealth must exceed essential needs such as living expenses, housing, clothing, work equipment, and books for scholars.</p>

<p><strong>Conditions for the Validity of Zakat</strong></p>

<p><strong>Intention</strong></p>
<p>Intention is unanimously agreed upon as a condition. It resides in the heart and must distinguish zakat from ordinary charity. According to some juristic discussions, the intention may precede payment within certain limits.</p>

<p><strong>Transfer of Ownership</strong></p>
<p>Zakat must be given to eligible recipients through a valid transfer of ownership. It is not sufficient merely to provide food without granting ownership.</p>

<p>The Maliki school adds that zakat must be paid after its obligation has become due, given to those entitled to receive it, and taken from the type of wealth upon which zakat is obligatory.</p>

<p><strong>3. TIME OF OBLIGATION AND PAYMENT OF ZAKAT</strong></p>

<p>Zakat becomes obligatory immediately once its conditions are fulfilled. It should not be delayed without a valid excuse. If someone is able to pay but delays it, he is sinful.</p>

<p>Zakat on gold, silver, trade goods, and livestock is paid after one full year. Zakat on crops and fruits is paid at harvest without waiting for a year. Zakat on honey and minerals is paid when obtained. Zakat al-fitr becomes due at sunset on the night of Eid al-Fitr.</p>

<p>The majority of scholars permit paying zakat in advance after possessing the nisab, based on the hadith that al-‘Abbas رضي الله عنه paid his zakat before its due time. The Maliki and Zahiri schools do not allow this.</p>

<p><strong>4. WHEN THE OBLIGATION OF ZAKAT FALLS AWAY</strong></p>

<p>The Hanafi school holds that if wealth is destroyed after zakat has become due, the obligation falls away unless the loss occurred due to negligence. The majority of scholars maintain that zakat does not fall away and remains a liability upon the owner.</p>

<p>The Maliki school provides a specific ruling concerning livestock zakat. Ibn Rushd mentions five opinions regarding zakat that has been separated and then lost: that it is not guaranteed at all, that it is always guaranteed, or that it is guaranteed only if negligence occurred.</p>

<p>The jurists differ on whether zakat falls away when wealth is destroyed after its obligation has become due. The Hanafi school states that if wealth is destroyed after zakat becomes obligatory, then the obligation falls away, similar to the tithe or land tax. This is because zakat is considered part of the nisab and the law aims at ease. Zakat becomes obligatory due to the presence of facilitating ability, meaning that the ability remains until the time of payment. Thus the obligation falls away when the zakatable wealth is destroyed.</p>

<p>The Sharia links obligation to facilitating ability. Something that depends on such ability cannot exist without it. Here, the facilitating ability refers to the capacity for growth, not merely the existence of the nisab. Zakat does not fall away if wealth is consumed unlawfully, because that constitutes transgression. If part of the wealth is destroyed, the obligation decreases proportionally.</p>

<p>Zakat al-fitr and the wealth required for Hajj do not fall away if the wealth is destroyed after the obligation occurs, just as marriage does not become invalid when witnesses die. This difference exists because zakat is related to the growth of wealth, whereas zakat al-fitr and Hajj are obligations within one’s liability.</p>

<p>It should also be noted that if wealth is destroyed after being loaned, rented, or replaced by other trade goods, it may be considered destruction, and the owner is not responsible for the zakat. However, replacing trade goods with non-trade assets or replacing livestock with other livestock outside the zakatable category counts as consumption, and the owner must still pay zakat.</p>

<p>The majority of scholars state that if wealth is destroyed after zakat has become obligatory, the obligation remains upon the owner. The possibility of performance is a condition for execution, not for obligation. A person who is obligated does not become free of the duty due to inability to perform it, similar to zakat al-fitr, Hajj, or debts owed to others.</p>

<p>Zakat is a specific right owed by the owner of wealth. If wealth is destroyed before reaching those entitled to receive it, the owner remains responsible for it, just as with debts owed to other people. If someone separates a portion of wealth intending it as zakat and it is then destroyed, it remains his responsibility and the obligation does not fall away.</p>

<p>The Maliki school excludes livestock zakat because, according to them, it becomes obligatory when the zakat collector arrives at the time the haul is completed. If the livestock perish before that time, the zakat is not required.</p>

<p>Ibn Rushd mentions five opinions regarding the case where zakat has been separated and then lost, such as through theft or fire. The first view is that it is not guaranteed at all. The second is that it is always guaranteed. The third is that it is guaranteed if negligence occurred but not otherwise, which is the well-known Maliki opinion. The fourth is that if negligence occurs it must be guaranteed, but if not, zakat is taken from the remainder, which is the opinion of Abu Thawr and al-Shafi‘i. The fifth is that the loss is shared proportionally between the poor and the owner according to their respective shares.</p>
    `
  },
  {
    title: "Zakat al-Fitr",
    body: `
     <div class="fiqh-image">
  <img src="assets/images/fitri.png" alt="Zakat Illustration">
</div>

<p>It contains 5 discussions:</p>
<p>1. The Legislation of Zakat al-Fitr, Its Ruling, and Those Who Are Commanded to Pay It.</p>
<p>2. The Time When Zakat al-Fitr Becomes Obligatory, and the Ruling on Paying It Early or Late.</p>
<p>3. The Required Type: Its Nature and Measure.</p>
<p>4. Matters That Are Recommended and Permissible in Zakat al-Fitr.</p>
<p>5. The Recipients of Zakat al-Fitr.</p>

<p><strong>1. The Legislation of Zakat al-Fitr, Its Ruling, and Those Who Are Commanded to Pay It</strong></p>

<p>Zakat al-Fitr was legislated in the second year after Hijrah, in the same year that the fast of Ramadan was made obligatory, before the obligation of regular zakat. The evidences for its obligation include the following:</p>

<p>The report of Ibn Umar, as narrated by the major compilers except Ibn Majah: “The Messenger of Allah ﷺ made Zakat al-Fitr of Ramadan obligatory upon the people as one sa‘ of dates or one sa‘ of barley, upon every free person and slave, male and female, among the Muslims.” One sa‘ is equivalent to one and one-third Egyptian measure by the modern standard. In the past, one sa‘ was two measures, or one-eighth of the Damascus mudd, commonly known as “thumniyyah.” This is equal to 2751 grams, while according to the Hanafis it is 3800 grams. This report indicates that Islam is a condition for Zakat al-Fitr, and therefore it is not obligatory upon non-Muslims.</p>

<p>The report of Abu Sa‘id: “We used to give Zakat al-Fitr while the Messenger of Allah ﷺ was among us. We would give one sa‘ of food, one sa‘ of dates, one sa‘ of barley, one sa‘ of raisins, and one sa‘ of cheese. I continued giving it in the same way I used to give it.” What is meant here by food is rice.</p>

<p>The report of Ibn Abbas: “The Messenger of Allah ﷺ made Zakat al-Fitr obligatory as a purification for the fasting person from idle talk and sins of the tongue, and as a means of feeding the poor. Whoever pays it before the prayer, it is an accepted zakat; and whoever pays it after the prayer, it is merely ordinary charity.” This contains evidence that Zakat al-Fitr is given to the poor rather than to all the other categories entitled to receive zakat.</p>

<p>The report of Abdullah ibn Tha‘labah: “The Messenger of Allah ﷺ delivered a sermon one or two days before Eid al-Fitr and said: ‘Pay one sa‘ of wheat, or one sa‘ of dates, or rice, on behalf of every free person and slave, young and old.’”</p>

<p>These reports indicate that the amount of Zakat al-Fitr is one sa‘ of wheat, rice, or dates. Some scholars qualified these reports with other hadiths indicating that half a sa‘ of wheat is sufficient. Among them is the hadith of Ibn Abbas, narrated as marfu‘ by al-Hakim with the wording: “Zakat al-Fitr is two mudds of wheat.” A similar hadith is narrated by al-Tirmidhi from Amr ibn Shu‘ayb, from his father, from his grandfather, as marfu‘, and by others as well.</p>

<p>Its wisdom is to make up for the shortcomings of fasting and to spare the poor from begging on the day of Eid al-Fitr. Waki‘ ibn al-Jarrah said, “Zakat al-Fitr in relation to Ramadan is like the prostration of forgetfulness in relation to prayer. Zakat repairs the deficiencies of fasting just as prostration repairs the deficiencies of prayer.” There is also a hadith that says, “Enrich them from going around asking on this day.” This means: spare the poor from begging on the day of Eid al-Fitr.</p>

<p>Its ruling: it is obligatory upon every free Muslim who is able to pay it at its proper time. This is based on the commands mentioned in the hadiths above. Ibn al-Mundhir said, “The scholars unanimously agreed that Zakat al-Fitr is obligatory.” Ishaq said, “The obligation of Zakat al-Fitr is a matter of scholarly consensus.”</p>

<p>Some Hanafi scholars stated that there are seven obligations in Islam: Zakat al-Fitr, supporting one’s siblings, Witr prayer, sacrifice, Umrah, serving one’s parents, and a wife’s obedience to her husband. There are also other obligations such as congregational prayer, the two Eid prayers, and others.</p>

<p>According to the Hanafis, the person obligated to pay Zakat al-Fitr is every free Muslim, young or old, male or female, sane or insane, provided that he owns wealth equal to one nisab beyond his essential needs: residence, clothing, household furnishings, riding animal, weapons, servants, his family’s needs, and his debts. A grandfather must pay Zakat al-Fitr on behalf of his grandsons through his son, but not grandsons through his daughter, if they are poor and have lost their father.</p>

<p>There are three conditions for the obligation of Zakat al-Fitr: Islam, freedom, and owning a nisab beyond essential needs. The first and second conditions are based on the hadiths already mentioned. The condition of possessing a nisab is based on the Prophet’s saying, “There is no charity except out of richness.” Richness is measured by the nisab, because the Sharia has determined it as such. This means wealth beyond essential needs, as mentioned above, since whatever is needed to fulfill necessities is treated as though it does not exist.</p>

<p>Zakat al-Fitr is paid by the obligated person on behalf of himself, his minor children, those who are mentally deficient, insane, and poor, as well as on behalf of his slaves used for service and not for trade. A Muslim master pays on behalf of his non-Muslim slave because the cause of obligation is present and the master is among those required to pay it.</p>

<p>A person is not required to pay it on behalf of his father or mother, even though they are his family, because he does not hold guardianship over them as he does over minor children. He is also not required to pay it on behalf of his minor siblings or relatives, even if they are part of his family. Likewise, he is not required to pay it on behalf of his wife or his adult children, even though they are his family. However, if he pays it on their behalf or on behalf of his wife without their instruction, then they are no longer required to pay it themselves.</p>

<p>A person is not obligated to pay it on behalf of his wife because of the weakness of his guardianship and financial responsibility toward her. He is not her guardian except in matters directly related to marriage, nor is he responsible for all her expenses outside regular maintenance such as medical treatment. Their general principle is that Zakat al-Fitr is connected to guardianship and maintenance. Therefore, whoever falls under one’s guardianship and maintenance, one must pay it for them; otherwise, one is not obligated.</p>

<p>The majority of scholars say that Zakat al-Fitr is obligatory upon every free Muslim, whether young or old, male or female, as also stated by the Hanafi scholars. Therefore, a non-Muslim is not required to pay Zakat al-Fitr, except according to the Shafi‘i and Maliki scholars, who state in the more correct opinion that a non-Muslim must pay it on behalf of his Muslim slave and Muslim relatives.</p>

<p>According to the Malikis and Shafi‘is, it is not obligatory upon the slave himself, nor upon anyone else on his behalf, because he does not own anything. As for the Hanbalis, they still obligate the slave to pay based on the general wording of the hadith: “The Messenger of Allah ﷺ made Zakat al-Fitr obligatory upon the free and the slave, male and female, from among the Muslims.”</p>

<p><strong>2. The Time When Zakat al-Fitr Becomes Obligatory and the Ruling on Paying It Early or Late</strong></p>

<p>The jurists have two opinions regarding the time when Zakat al-Fitr becomes obligatory and the matters related to it.</p>

<p>The Hanafis say that Zakat al-Fitr becomes obligatory at the break of dawn on the day of Eid al-Fitr. This is because the zakat is associated with Eid al-Fitr, and this association serves the purpose of specification. Such specification relates to the day itself, not the night before it, because fitr means the opposite of fasting, and that occurs during the day, not at night. Fasting on that day is unlawful. Therefore, whoever dies before dawn is not required to pay Zakat al-Fitr, and whoever embraces Islam or is born after dawn is also not required to pay it.</p>

<p>Zakat al-Fitr may be paid early or late. Therefore, it is permissible to pay it in advance after the beginning of Ramadan, before its obligatory time on Eid al-Fitr, and it is also permissible to delay it. It may be advanced before its due time because the cause of its obligation already exists, and thus it is similar to paying other forms of zakat after the nisab has been attained. In this matter, there is no distinction between one time and another.</p>

<p>As for the permissibility of paying it after Eid al-Fitr, that is because it is a financial act of worship whose meaning is rationally understandable. Therefore, the obligation does not fall away until it is fulfilled, like other kinds of zakat.</p>

<p>In summary: Zakat al-Fitr may be paid before Eid al-Fitr, even before Ramadan according to one apparent narration. However, the fatwa position is that Ramadan must have already begun, so it is not permissible to pay Zakat al-Fitr before Ramadan begins.</p>

<p>The majority of jurists say that Zakat al-Fitr becomes obligatory at sunset on the night of Eid al-Fitr, meaning the first night of Eid. This is because in the hadiths mentioned above it is linked to the breaking of the fast of Ramadan. Thus its obligation begins at sunset, because that association serves the purpose of specification.</p>

<p>The first general breaking of the fast in all of Ramadan, after which there is no further obligatory fasting, is after sunset on the night of Eid al-Fitr. Fasting ends at sunset. The reason for the difference between the majority and the Hanafis is whether Zakat al-Fitr is an act of worship connected to the day of Eid al-Fitr or to the completion of Ramadan, since the night of Eid is not itself part of Ramadan.</p>

<p>Whoever dies after sunset must pay Zakat al-Fitr. As for a child born after sunset, or a person who embraces Islam after sunset, or someone who had no wealth at the time of obligation and only acquired it afterward, then according to the majority he is not required to pay Zakat al-Fitr because the cause of obligation was not present. According to the Hanafi scholars, however, he is required to pay it.</p>

<p>According to the majority, the obligation to pay Zakat al-Fitr does not lapse because of death or anything similar. It remains a liability until it is paid.</p>

<p>As for paying it early, the Shafi‘is allow paying Zakat al-Fitr from the first day of Ramadan onward. This is because it is obligated by two causes: the fasting of Ramadan and the breaking of the fast. If one of the two causes is already present, it is permissible to advance it, just as with zakat on wealth after acquiring the nisab and before the completion of one year.</p>

<p>It is not permissible to advance Zakat al-Fitr before Ramadan, because that would mean advancing it before both causes exist, just as one may not pay zakat on wealth before both the nisab and the haul are completed.</p>

<p>According to the Malikis and Hanbalis, it is permissible to advance Zakat al-Fitr one or two days before Eid al-Fitr, but no more than that. This is based on the statement of Ibn Umar: “They used to give it one or two days before Eid al-Fitr.” It is not valid before that, because the objective of sparing the poor from begging on that day would not be achieved, as intended by the Sharia, in accordance with the Prophet’s saying: “Enrich them from asking on this day.” This is unlike zakat on wealth.</p>

<p><strong>Delaying Zakat al-Fitr Until After the Eid Prayer</strong></p>

<p>The Shafi‘i scholars said that it is recommended that Zakat al-Fitr should not be delayed until after the Eid prayer. This is because there is a command to pay it before leaving the house for the Eid prayer, as mentioned in the authentic collections of al-Bukhari and Muslim.</p>

<p>If it is delayed, then it is recommended to pay it early in the day to those who are entitled to receive it. It is unlawful to delay it until after the Eid prayer without an excuse, such as not having the wealth or not finding eligible recipients. This is because the purpose for which Zakat al-Fitr was legislated would not be fulfilled, namely, sparing the poor from begging on the day of Eid al-Fitr.</p>

<p>If a person delays it without excuse, then he has committed a sin and must make it up immediately, because its time has passed due to delaying it without excuse. As for delaying regular zakat from the time one is able to pay it, that is still considered performance within its valid time. The difference is that Zakat al-Fitr has a limited time just like prayer.</p>

<p>The Hanbalis held the same view as the Shafi‘is: the final time for Zakat al-Fitr is sunset on the day of Eid al-Fitr, based on the previously mentioned hadith, “Spare them from begging on this day.”</p>

<p>If someone delays Zakat al-Fitr beyond the day of Eid al-Fitr, then he is sinful because he delayed an obligation beyond its time and violated the command. Therefore, he must make it up, because Zakat al-Fitr is an act of worship whose obligation does not lapse merely because its time has passed, just like prayer. The most virtuous way is to pay Zakat al-Fitr on the day of Eid al-Fitr shortly before the prayer in a place that is not used for the Eid prayer itself.</p>

<p>The Malikis said that it is permissible to pay Zakat al-Fitr after the Eid prayer on the day of Eid al-Fitr. Zakat al-Fitr does not lapse simply because its time has passed. Rather, it remains a liability upon the person obliged to pay it until he pays it, just like other obligations. A person is sinful if he delays it until after Eid while he is able to pay it. If the time passed because he genuinely could not afford to pay it, then the obligation falls away.</p>

<p><strong>3. The Type of Obligation: Its Nature and Measure</strong></p>

<p>The Hanafis said that Zakat al-Fitr must be given from four items: wheat, rice, dates, and raisins. Its measure is half a sa‘ of wheat, or one full sa‘ of rice, dates, or raisins. According to Abu Hanifah and Muhammad al-Shaybani, one sa‘ is eight Iraqi ratls. One Iraqi ratl equals 130 dirhams, equivalent to 3,800 grams. This is because the Prophet ﷺ once performed ablution with one mudd equal to two ratls and bathed with one sa‘ equal to eight ratls. Likewise, one sa‘ according to Umar رضي الله عنه was this amount, and it was smaller than the sa‘ of Banu Hashim. The Muslims formerly used the sa‘ of Banu Hashim.</p>

<p>Their evidence for measuring Zakat al-Fitr as one sa‘ or half a sa‘ is the hadith of Tha‘labah ibn Sha‘ir al-‘Udhri, who said, “The Messenger of Allah ﷺ delivered a sermon before us and said: ‘Pay on behalf of every free person and slave half a sa‘ of wheat, one sa‘ of dates, and one sa‘ of rice.’”</p>

<p><strong>Paying Zakat al-Fitr in Cash Value</strong></p>

<p>According to the Hanafis, a person may pay Zakat al-Fitr in its monetary value, whether in dirhams, dinars, cash, goods, or anything else he wishes. This is because what is truly required is to spare the poor and needy from begging. This is based on the Prophet’s saying, “Spare them from begging on a day like this.”</p>

<p>Relieving the poor from begging can be achieved by giving them the value, and in fact that may be more complete and easier because it is more likely to meet their needs. Thus it becomes clear that the text of this hadith contains an effective cause (‘illah), namely <em>al-ighna’</em>, or making them self-sufficient.</p>

<p>The majority of scholars said that Zakat al-Fitr may be paid from grains and fruits that can serve as staple food, and the amount is one full sa‘. Their detailed views are as follows:</p>

<p>The Malikis held that Zakat al-Fitr must be paid from the staple food predominantly consumed in a given land, from nine types: wheat, rice, salaf (a type of rice), corn, paddy rice, dates, raisins, and cheese. Thus, what must be paid for zakat is the staple food most commonly consumed, of medium quality.</p>

<p>The Shafi‘is held that Zakat al-Fitr should be taken from the staple food most commonly consumed in a land or locality, because this differs according to place. What counts as the predominant staple food is the staple food most commonly consumed throughout the year. A better-quality staple food may be used to replace an inferior staple food in zakat, but not the reverse. According to the strongest opinion, this is measured by how widely the food is consumed, not by its price. Wheat is better than dates and rice. Dates are better than raisins. It is not permissible for one sa‘ paid as zakat on behalf of one person to consist of two different types.</p>

<p>If a land has several staple foods and it is difficult to determine which is predominant, then the best choice is the highest-quality staple food. The quality required for zakat is sound grain. It is not valid to pay zakat with grain that has been eaten by worms or is defective, even if it is still edible. Its measure is one sa‘, which according to the strongest opinion is 685 and 5/7 dirhams, or 5 and 7/3 Baghdad ratls, and 4.75 Egyptian ratls plus 7 uqiyyahs.</p>

<p>The Hanbalis maintained that it is obligatory to give the items explicitly mentioned in the textual evidence, namely wheat, dates, raisins, and cheese. If these staple foods are unavailable, then it is permissible to substitute them with any staple food from grains and fruits. It is not permissible to give Zakat al-Fitr from staple foods consisting of meat or milk.</p>

<p>The apparent view in the school is that one may not depart from the food types explicitly mentioned when one is able to give them, whether or not those foods are the staple foods of one’s land. It is also permissible to give flour, but not permissible to give bread for Zakat al-Fitr.</p>

<p>A person may give zakat from any of the types mentioned in the textual evidence even if that is not his own staple food, or even if his staple food is the staple food of the majority in his land.</p>

<p>Its measure is one Iraqi sa‘, which equals four average handfuls of a man. This is because that was the measure used in the time of the Prophet ﷺ. As mentioned earlier, according to the majority of jurists it equals 2751 grams, and according to another group 2176 grams. This is the measure used in calculating the five awsuq.</p>

<p>The evidence of the majority is the hadiths already mentioned, which are more authentic than the hadiths relied upon by the Hanafi scholars. Among them is the hadith of Abu Sa‘id al-Khudri: “When the Prophet ﷺ was still among us, we used to pay Zakat al-Fitr as one sa‘ of food, one sa‘ of wheat, one sa‘ of dates, one sa‘ of raisins, and one sa‘ of cheese.”</p>

<p>This hadith was narrated by al-Daraqutni from Malik ibn Anas, who said that one sa‘ according to the Prophet ﷺ was 5 and 1/3 Iraqi ratls.</p>

<p>As for paying zakat in the cash value of these food items, that is not permissible according to the majority. Whoever gives its monetary value instead, it is not valid. This is based on the statement of Umar ibn al-Khattab: “The Messenger of Allah ﷺ made Zakat al-Fitr obligatory as one sa‘ of dates and one sa‘ of wheat.” If someone turns away from that prescribed form, then he has abandoned the obligation.</p>

<p><strong>4. Matters Recommended and Permissible in Zakat al-Fitr</strong></p>

<p>The jurists agreed that it is recommended to pay Zakat al-Fitr on the day of Eid al-Fitr after dawn and before the Eid prayer. This is based on the hadith of Ibn Umar: “The Prophet ﷺ commanded that Zakat al-Fitr be paid before the people went out for the Eid prayer.” It is also based on the hadith of Ibn Abbas: “Whoever pays it before the prayer, then it is accepted zakat. Whoever pays it after the prayer, then it is ordinary charity.” Whether the zakat or charity is accepted depends upon the will of Allah SWT.</p>

<p>However, most jurists held that paying Zakat al-Fitr before the Eid prayer is only recommended. They maintained that Zakat al-Fitr remains valid if paid until the end of the day of Eid al-Fitr. Whoever delays paying Zakat al-Fitr until after the Eid prayer has left what is most virtuous. This is because the purpose of Zakat al-Fitr is to spare the poor from begging on that day, based on the hadith, “Spare them from begging on this day.”</p>

<p>When a person delays Zakat al-Fitr, that objective is not fully achieved, especially if it is delayed until after the prayer. Therefore, this indicates that delaying Zakat al-Fitr until after the prayer is mildly disliked (<em>makruh tanzihan</em>). The command to pay it before the prayer is therefore understood as recommendation only. Even so, the one who deliberately delays it is sinful, just like someone who deliberately performs prayer outside its proper time.</p>

<p>The Malikis mentioned that it is recommended for a person to give Zakat al-Fitr from the best staple food of his land. They also recommended that it should not exceed one sa‘; rather, any excess is disliked. This is because when the Sharia has specified something, going beyond it is an innovation. Sometimes innovation may lead to corruption, and sometimes to mere dislike. It is disliked when the increase is actually intentional. If not, then a slight increase is allowed in order to remove doubt.</p>

<p><strong>5. Those Who Receive Zakat al-Fitr</strong></p>

<p>The jurists agreed that those entitled to receive Zakat al-Fitr are the same people entitled to receive other obligatory forms of zakat. Since Zakat al-Fitr is zakat, its channels of distribution are the same as those of other zakat types. Since Zakat al-Fitr is also a form of charity, it falls under the category mentioned by Allah SWT in His saying:</p>

<p>


    `
  },
  {
    title: "Zakat on Metals (Gold, Silver, and Paper Currency)",
    body: `
      <div class="fiqh-image">
  <img src="assets/images/logam.png" alt="Zakat Illustration">
</div>

<p>The jurists agreed on the obligation of zakat on metals, whether in ingots, minted form, containers, or even jewelry according to the Hanafis, based on the evidences mentioned above from the Qur’an, the Sunnah, and consensus regarding the obligation of zakat in general. Here we will discuss the following matters.</p>

<p><strong>First: The Nisab and the Amount That Must Be Paid</strong></p>

<p>The nisab of gold is twenty mithqals or dinars. This is approximately equal to fourteen Ottoman gold liras, or fifteen French gold liras, or twelve English gold liras, and is roughly equal to one hundred grams according to the Iraqi mithqal, and ninety-six grams according to the foreign mithqal. According to the majority of scholars, it is 23/25 × 91 grams.</p>

<p>The difference between the two kinds of mithqal (0.2) is due to the foreign mithqal being 4.8 grams and the Iraqi mithqal being 5 grams. We should rely on the smaller amount as a matter of precaution, namely 85 grams, considering the Arab dirham (2.976 grams) as the preferable standard.</p>

<p>The nisab of silver is two hundred dirhams, which according to the Hanafis is about 700 grams, and according to the majority of scholars about 642 grams. The most precise opinion is 595 grams.</p>

<p>According to the majority of scholars (other than the Shafi‘is), gold and silver may be combined with each other to complete the nisab. Gold is combined with silver, and vice versa, according to market value. So whoever has one hundred dirhams and five mithqals worth another hundred is obligated to pay zakat, because their purpose and their zakat are the same. They are considered one type.</p>

<p>The Shafi‘is said that gold and silver cannot be combined with one another, just as camels and cattle cannot be combined. A type of zakatable wealth is completed only with another of the same kind, even if they differ in quality.</p>

<p>The first opinion is the one that should be followed today with regard to paper currency. Combining one type with the other has become necessary and decisive.</p>

<p><strong>Exchange Value and Estimating the Nisab</strong></p>

<p>The nisab of zakat must be estimated in every age according to the purchasing power of modern money and according to the exchange value of gold and silver each year in the country of the one paying zakat at the time of payment. This has become variable and is not always stable.</p>

<p>The Sharia originally set two equivalent measures: either twenty dinars (mithqals) or two hundred dirhams. Both represented equivalent value and equivalent price.</p>

<p>Thus, the nisab today should also be considered according to what was established in the original Sharia, without looking at the current difference in price between gold and silver.</p>

<p>Paper currency, according to the stronger opinion, should be estimated according to the value of gold. This is because gold is the original basis in financial dealings. It also represents the value standard of currency. Furthermore, the mithqal in the time of the Prophet ﷺ and among the people of Makkah was the basis of currency, and it is also the basis for estimating blood money.</p>

<p>Money exchangers should be asked about the value of gold in the local currency used in each country. For example, at one time the Egyptian pound equaled 2.5587 grams of gold. Today one gram of gold may equal about 500 Syrian liras, while one gram of silver may equal about ten Syrian liras.</p>

<p>Many contemporary scholars hold that currency should be estimated according to the price of silver in order to better preserve the welfare of the poor, since that is more beneficial for them. Dr. Wahbah al-Zuhayli favored this opinion, because fatwa should be based on what is more beneficial for the poor.</p>

<p><strong>Rules for Distributing Zakat</strong></p>

<p>It should be noted that when zakat is paid to social organizations, the zakat property itself must be delivered to those who are entitled to receive it. The officials of the organization may not purchase food, clothing, or the like with zakat funds intended for the poor, because they were not authorized to do so.</p>

<p>Likewise, religious educational institutions may not purchase anything at all, such as books and the like, from zakat funds.</p>

<p>The organization office must receive compensation or authorization from students of knowledge before distributing zakat funds to meet their needs such as food, drink, books, paper, and similar things. This is because transferring ownership of zakat to eligible recipients is a fundamental condition.</p>

<p>Then the entitled recipient may manage it in whatever way fulfills his interest. An organization may not independently establish buildings or laboratories from zakat money and then direct their benefits to zakat recipients, because it has not been authorized by those entitled to receive it in this matter.</p>

<p>However, in cases of necessity it is permissible to establish health centers or distribute medicines to the poor, for example, on condition that this is not treated as an endowment, so that it may be sold later and its price distributed to eligible recipients.</p>

<p><strong>The Zakat Rate</strong></p>

<p>The obligatory rate for gold and silver is 2.5%. If someone possesses two hundred dirhams and a full year has passed, then its zakat is five dirhams. For every twenty mithqals, the zakat is half a dinar.</p>

<p>The evidence for this comes from hadiths reported from the Prophet ﷺ. Among them is the hadith of Ali from the Prophet Muhammad ﷺ, who said:</p>

<p>“If you have two hundred dirhams and a full year passes over them, then five dirhams are due on them as zakat. And there is no obligation upon you regarding gold until you have twenty dinars. If you have twenty dinars and a full year passes over them, then half a dinar is due on them.”</p>

<p>Among them is also the hadith of Abu Sa‘id al-Khudri:</p>

<p>“There is no obligatory charity on less than five awsuq of dates, no obligatory charity on less than five uqiyyahs of silver, and no obligatory charity on less than five camels.”</p>

<p>In the narration of al-Bukhari: “The zakat due on silver is 2.5%.”</p>

<p>The zakat of gold is paid in gold, and the zakat of silver is paid in silver. If someone wishes to pay the zakat of silver in gold, or the zakat of gold in silver, that is permissible according to the Malikis in two circumstances. The payment is then made according to market value, according to the well-known opinion. This is not permitted according to the Shafi‘is.</p>

<p><strong>Second: What Is Below the Nisab and What Exceeds It</strong></p>

<p>As we know, zakat is obligatory by consensus on gold when it reaches twenty mithqals (dinars), whose value is equal to two hundred dirhams. As for what is less than twenty mithqals, there is no zakat on it unless it is completed by silver or trade goods.</p>

<p>The scholars agreed that if it is less than twenty mithqals and does not reach two hundred dirhams, then there is no zakat on it because it has not reached the nisab.</p>

<p>The Messenger of Allah ﷺ said: “There is no obligatory charity on less than twenty mithqals of gold, nor on less than two hundred dirhams.”</p>

<p>As for what exceeds the nisab, Abu Hanifah held that no zakat is due on the excess until it reaches forty dirhams, in which case one dirham becomes due; then for every additional forty dirhams, one dirham is due. There is no obligation between those amounts. Likewise, there is no zakat on extra dinars until they reach four dinars.</p>

<p>The two students of Abu Hanifah and the majority of jurists held that whatever exceeds two hundred is subject to zakat according to its exact proportion, even if the increase is slight. This is based on the saying of the Prophet Muhammad ﷺ: “Pay 2.5%; for every forty dirhams, one dirham is due. Nothing is due until it reaches two hundred. If it is two hundred dirhams, then five dirhams are due. Whatever exceeds that is calculated according to the same rate.”</p>

<p>This is the opinion that reason can readily accept.</p>

<p><strong>Third: The Ruling on Adulterated Metals (Maghshush)</strong></p>

<p><em>Al-maghshush</em> refers to material mixed with something of lesser value, such as gold mixed with silver, or silver mixed with copper.</p>

<p>The jurists held three opinions regarding the zakat of such material:</p>

<p>The Hanafis said that if the majority of the material is silver, then it is treated as silver. If the majority is gold, then it is treated as gold. If something else predominates over both the gold and silver, then it is treated as trade goods, and its value must reach the nisab, and it must be intended for trade like other goods, unless the pure silver contained in it itself reaches the nisab.</p>

<p>The Malikis said that what matters is the market value. Zakat is therefore due on material with full weight, on mixed material, and on underweight material if each is marketable like full-weight material. If it is not marketable, then the pure content is calculated by estimating the refining of the adulterated material.</p>

<p>The Shafi‘is and Hanbalis said that no zakat is due at all on mixed material unless the pure amount itself reaches a full nisab. Whoever owns gold or silver mixed with other substances owes no zakat on it until the pure gold or pure silver reaches the nisab.</p>

<p>If the amount of gold and silver in the mixed material is unknown and one is unsure whether it reaches the nisab or not, then the safer course is followed: either by paying from gold in an amount one is certain covers the required zakat, or by separating the two through fire to determine the amount of gold and silver in the material, and then paying zakat so that the obligation is discharged with certainty.</p>

<p>If containers of gold and silver are mixed together, meaning that both are melted and made into one vessel, such as a vessel weighing one thousand dirhams, where one of the metals is six hundred and the other four hundred, while the owner does not know which is heavier, then he pays zakat on both gold and silver according to the higher possible amount as a precaution. It is not permissible to assume it is all gold, because one of the two types cannot suffice without the other, even if one is more valuable. Nor is it sufficient to separate them with fire unless that is actually done. This applies when a small amount can be tested if all the parts are equal.</p>
    `
  },
  {
    title: "Zakat on Jewelry",
    body: `
     <div class="fiqh-image">
  <img src="assets/images/perhiasan.png" alt="Zakat Illustration">
</div>

<p>The jurists agreed on the obligation of zakat, as has already been explained regarding gold and silver in minted or non-minted form, such as gold bars, raw gold, containers, and unlawful jewelry such as men’s jewelry other than a silver ring, utensils in use, and household ornaments. There is no zakat on anything other than gold and silver, such as pearls, gemstones, and rubies.</p>

<p>According to the Malikis, jewelry on which zakat is obligatory is that which is intended for trade, based on consensus. Such jewelry is assessed according to its weight, not according to its crafted value. The same applies to containers, incense vessels for trade, kohl containers, and kohl applicators, even for women, as well as items kept as savings or keepsakes rather than for use.</p>

<p>If a woman’s jewelry is broken, there are five scenarios: first, it is broken in a way that it cannot be restored to its original state except by melting it down again; second, it is broken and she intends not to repair it; third, it is broken and she intends to repair it; fourth, it is broken and she has no intention at all, neither to repair it nor to leave it unrepaired; fifth, it is not completely ruined, but she intends not to repair it.</p>

<p>There is no zakat on jewelry if it is intended to be rented out, whether the one who owns it is male or female. Nor is there zakat on jewelry that is lawful for women, such as bracelets. Nor is there zakat on jewelry that is lawful for men, such as a sword hilt prepared for jihad, a silver ring, a replacement nose or tooth, or decorations for a mushaf or sword. The same applies when it is prepared for someone who may lawfully use it, such as a wife or an already existing daughter who is of an age suitable for adornment. But if it is intended for someone not yet born, or for someone not yet suitable for adornment because of young age, then zakat is obligatory on it.</p>

<p>According to the Shafi‘is, jewelry subject to zakat includes jewelry intended to be stored and saved, vessels, women’s jewelry used by men as adornment, men’s jewelry such as a sword used by women as adornment, unlawfully seized raw gold made into jewelry, and women’s jewelry considered extravagantly excessive, namely reaching two hundred mithqals, approximately 850 grams. The same ruling applies to jewelry whose use is disliked, by analogy with what is prohibited, such as reinforcing a large vessel out of necessity or a small vessel for adornment.</p>

<p>It is stated in I‘anatut-Talibin that gold and silver without extravagance are lawful for women and children by consensus, such as bracelets, anklets, and necklaces, and no zakat is due on these items. But if extravagance is involved, then none of that is lawful, such as anklets weighing two hundred mithqals each; zakat is then due on such items. The estimate of two hundred mithqals is taken from narrations of the Companions.</p>

<p>According to the stronger view, zakat is also obligatory on women’s jewelry if it is damaged in a way that prevents its use and requires melting and refashioning.</p>

<p>According to the clearest opinion, there is no zakat on jewelry that is permissible for women, such as anklets, bracelets, and similar items, because such items are prepared for permissible use and therefore resemble working animals.</p>

<p>According to the Hanbalis, jewelry on which zakat is obligatory includes jewelry intended for trade, jewelry prohibited for women when they have no right to use it, and jewelry prohibited for men, such as sword ornaments, belts, anklets, gold rings, adornments for riding animals, horse decorations such as bridles, saddles, dog collars, rider ornaments, mirrors, combs, kohl tools, kohl pencils, fans, drinking vessels, perfume containers, sniffing vessels, braziers, hangers, lamps, containers, adornments of books of knowledge unlike the mushaf, decorations for inkpots and pen cases, and everything prepared for rental, for professional use, for saving, for personal support when needed, or with no specific intended purpose.</p>

<p>The same applies to women’s jewelry if it is damaged and requires refashioning. But if it does not require refashioning and she intends to repair it, then no zakat is due. Nor is zakat due on items whose damage does not prevent their use; such items are treated like undamaged jewelry, unless she intends to destroy and melt them down, in which case zakat becomes due because the woman has intended not to use them.</p>

<p>According to the apparent view of the Hanbali school, there is no zakat on women’s jewelry if it is worn or lent out by women, nor even when kept by someone for a prohibited use, such as a man keeping women’s jewelry in order to lend it to them, or a woman keeping men’s jewelry in order to lend it to them.</p>

<p>In summary, the majority of scholars do not hold that zakat is obligatory on ordinary women’s jewelry because of the saying of the Messenger of Allah ﷺ, “There is no zakat on jewelry.” This is the view of Ibn Umar, Aishah, and Asma’ daughter of Abu Bakr. They also reasoned that jewelry is intended for permissible use, so no zakat is due on it, just as no zakat is due on working animals or personal clothing. Islam only made zakat obligatory on wealth that grows and is invested, meaning wealth that is in a condition of growth even if its owner leaves it unused. Permissible jewelry does not grow. But if it is kept as savings, or there is obvious extravagance beyond normal custom, or it is used by men as adornment, or used in vessels, gifts, statues, and the like, then zakat is due on all of that.</p>

<p>The Hanafis say that zakat is obligatory on men’s and women’s jewelry alike, whether it is in raw form or crafted form, vessels or otherwise, because gold and silver are productive forms of wealth. Their capacity for growth exists, as they are naturally fit for trade, unlike clothing. Gold and silver were created as standards of value, so their owner must pay zakat on them in all circumstances.</p>

<p>Their view is supported by the hadith in which the Messenger of Allah ﷺ said to a woman who had two gold bracelets on her hand, “Do you pay zakat on this jewelry?” The woman replied, “No.” The Messenger of Allah ﷺ said, “Would it please you if Allah were to place upon you two bracelets of fire?”</p>

<p>According to scholars other than the Shafi‘is, what matters in the nisab of jewelry on which zakat is due is the weight, not the price. So if someone owns jewelry worth two hundred dirhams but whose weight is less than two hundred dirhams, no zakat is due. But if its weight reaches two hundred, then zakat is due even if its market value is lower, because the hadith states, “There is no obligatory charity on less than five uqiyyahs of silver.”</p>

<p>The Hanbalis make an exception when the jewelry is intended for trade, in which case it is assessed by value. If its value in gold or silver reaches the nisab, then zakat is due on it because trade zakat depends on value. Gold and silver that are not intended for trade are zakated according to the substance itself. Reaching the nisab may be considered by either value or weight. The owner is given the choice between paying 2.5% of the jewelry itself in general form, or paying the equivalent of 2.5% from the same type of gold or silver.</p>

<p>If the jewelry contains pearls or diamonds mounted in it, then zakat is due on the gold and silver jewelry, not on the pearls, because no scholar holds that pearls are zakatable, as already explained. But if the jewelry is for trade, then its owner assesses it together with its pearls, because if pearls exist independently from gold and silver and are intended for trade, then they are assessed and zakated. The same applies if pearls are part of trade jewelry.</p>

<p>The Shafi‘is say that since zakat is obligatory on jewelry while its weight and value may differ, then what is considered is its value, not its weight. This differs from items prohibited due to their very substance, such as gold and silver vessels, in which case weight rather than value is considered. So if someone has jewelry weighing two hundred dirhams while its value is three hundred, he is instructed to choose between paying 2.5% of it in general form, after which the zakat collector sells it to purchase another type and distributes the proceeds to those entitled, or the owner pays five units whose value is seven and a half in cash form. It is not permissible to break it up and give five in fragmented form, because that would harm both the owner and those entitled to receive it.</p>
    `
  },
  {
    title: "Zakat on Debts",
    body: `
     <div class="fiqh-image">
  <img src="assets/images/utang.png" alt="Zakat Illustration">
</div>

<p>Wealth that reaches the nisab which is essentially a receivable owed by another person, and which has completed one lunar year, is subject to zakat according to conditions detailed within the different legal schools.</p>

<p>The Hanafis say that debts according to Imam Abu Hanifah are of three types: strong, medium, and weak.</p>

<p><strong>Strong debt</strong> refers to debts that replace trade wealth, such as the price of merchandise sold, when the debtor acknowledges the debt—even if bankrupt—or when he denies it but evidence exists. This type of debt must be zakated when the creditor receives it for the years that have passed. For every forty dirhams received, the zakat is one dirham, because anything less than one-fifth of the nisab is excused and has no zakat. Anything beyond that is zakated according to calculation.</p>

<p><strong>Medium debt</strong> refers to compensation for something not intended for trade. In other words, it is not a trade debt, such as the price of a house used as a residence or clothing needed for personal use. This is not subject to zakat unless the creditor receives a full nisab (two hundred dirhams). When he receives two hundred dirhams, he pays zakat for the past years. The elapsed years from the time the debt became obligatory are considered the responsibility of the buyer according to the most authentic narration.</p>

<p>Medium debt is like strong debt regarding the completion of one year. The counting of the year begins from the time the debtor commits to payment, not from the time the creditor receives it, according to the most authentic opinion.</p>

<p><strong>Weak debt</strong> refers to compensation that is not originally wealth, such as dowry (mahr), inheritance, wills, khul‘ compensation, reconciliation payments in cases of intentional killing, and blood money (diyah). The dowry is not considered compensation for wealth taken by the husband from his wife. Likewise, khul‘ compensation is not considered compensation for wealth transferred from the wife to the husband. The same applies to debts arising from wills, blood money, reconciliation payments, and inheritance. Zakat is not obligatory on these until the owner receives a full nisab and one year passes after receiving it.</p>

<p><strong>Conclusion:</strong> zakat is obligatory on all types of debts mentioned, but its payment occurs when the debt is received. One-fifth of the nisab applies to strong debt, while the full nisab applies to medium and weak debts, considering that weak debt is treated as newly acquired wealth, therefore requiring the completion of one year.</p>

<p>The two students of Abu Hanifah held that all debts are the same and all are considered strong. Zakat is obligatory on them before receiving them, except for blood money owed by the offender’s family, on which no zakat is obligatory until it is received and a year has passed. This is because debts—other than blood money—are the property of their owner, although the payment of zakat is not required immediately but rather upon receiving them.</p>

<p>The Malikis classify debts into three categories.</p>

<p><strong>First:</strong> debts that require the completion of one year after receiving them, such as inheritance, gifts, waqf distributions, charity, dowry, khul‘ compensation, compensation for crimes, and blood money. No zakat is due on these until the owner receives them and one year passes from the time of receipt. For example, if someone inherits wealth from his father and the court appoints a guardian of the estate before he receives it, and the wealth remains as a debt owed to him for years, then no zakat is due for those years until he receives it and one year passes afterward. This corresponds to what the Hanafis classify as weak debt. It also includes the price of goods sold from personal property, such as selling merchandise or a house. If someone sells his residence with deferred payment, he pays zakat on what he receives if it reaches the nisab and one year passes.</p>

<p><strong>Second:</strong> debts that are zakated for only one year, namely pure debts and trade debts. This corresponds to strong debt according to the Hanafis. Zakat here becomes obligatory with four conditions: first, the principal debt is gold, silver, or the value of stored trade goods; second, the owner receives part of the debt; third, what is received is gold or silver rather than merchandise; fourth, what is received reaches at least one nisab—even if received in installments—or less than the nisab but combined with other gold or silver until it reaches the nisab when one year passes.</p>

<p><strong>Third:</strong> the debt of a person who circulates money in trade, meaning a merchant who sells and buys with immediate payment. If the original debt is trade goods, then he pays zakat on that debt each year together with the value of the goods he possesses and the gold and silver he trades.</p>

<p>The Shafi‘is say that a creditor must pay zakat on his receivable for past years once it becomes possible for him to collect it, provided the debt is in the form of dinars, dirhams, or trade goods. If the debt consists of livestock or food items such as dates and grapes, then no zakat is obligatory on it.</p>

<p>The Hanbalis hold that zakat on debts is obligatory whether the debt is immediate or deferred, whether the debtor is known and able to pay, in hardship, denying the debt, or delaying payment. However, zakat does not have to be paid until the debt is actually received; once it is received, the zakat for the past period is paid immediately. This is because it is a debt existing in liability and there is no obligation to pay zakat before receiving it.</p>

<p>Zakat is intended for mutual assistance, and it does not include obligating someone to pay zakat from wealth that cannot yet be utilized. Such wealth remains in the same condition in all cases; therefore, the ruling regarding its obligation or exemption should follow the same principle as other forms of wealth.</p>

<p>As for entrusted property (amanah), its ruling is like property that is physically in one’s possession. The trustee acts as an agent in safeguarding the wealth, and his hand is like the owner’s hand. Therefore, zakat must be paid for the past years because the wealth is owned and capable of being utilized, just like the rest of his wealth.</p>

<p><strong>Conclusion:</strong> if the debt is active—that is, a debt owed by someone known and expected to repay at its time or upon request—then according to the majority of jurists the creditor must pay zakat on it. But if the debt is owed by someone in severe hardship, from whom repayment is unlikely, or someone who delays payment, denies the debt, or whose whereabouts are unknown, then according to most jurists zakat is not obligatory on it.</p>

<p>As for security deposits paid in cash, the zakat obligation remains upon the owner of the money. Such deposits are amounts paid by tenants to landlords as guarantees for rental payments at the agreed times. Zakat on that money is the responsibility of the owner of the funds, not the landlord, provided the conditions for zakat obligation are fulfilled.</p>
    `
  },
  {
    title: "Zakat on Paper Money",
    body: `
      <div class="fiqh-image">
  <img src="assets/images/uang.png" alt="Zakat Illustration">
</div>

<p>Paper money and coinage are forms of currency used in transactions as substitutes for gold and silver. They are regarded as being in the position of bank transfers guaranteed by the central bank of a country, corresponding to gold reserves kept in storage that can cover the circulating currency. However, most states prohibit direct transactions in gold. Therefore, it is no longer possible to withdraw the gold reserve corresponding to each unit of paper or metallic currency made from mixtures of certain mined substances such as bronze, copper, and the like, in order to preserve the gold reserves held in the state treasury.</p>

<p>Since this system only emerged relatively recently after the First World War, the earlier fuqaha did not discuss it. Contemporary jurists, however, have discussed the ruling of zakat on paper money. The majority of fuqaha (Hanafis, Malikis, and Shafi‘is) ruled that zakat is obligatory on paper money, because such currencies are effectively either strong debts owed by the state treasury, debt certificates, or bank transfers whose values are debts owed by the bank.</p>

<p>The followers of the Hanbali school held that zakat is not obligatory on paper money until it is actually exchanged for precious metals (gold or silver), by analogy with the collection of debt.</p>

<p>The correct view is that zakat on money is obligatory. This is because it functions as the medium for purchasing goods, while transactions in gold are prohibited. No state permits people to take out reserves equivalent to any type of transaction paper. Therefore, it is not valid to analogize such money to debt. A debt is not actually utilized by its owner, namely the creditor. The fuqaha did not obligate zakat on debts until they are received, due to the possibility that they may never be collected.</p>

<p>These currencies, however, are in fact fully used by their holders, just as gold was used as a means of exchange and a standard of value for goods. They are also truly possessed by the holder. Therefore, the view that there is disagreement over the zakat of such money is not correct. The view that there is no zakat on such money is clearly a mistaken ijtihad, because it leads—by obvious consequence—to denying zakat on the most crucial and important category of zakatable wealth.</p>

<p>Therefore, paper money is certainly subject to zakat, just like a collectible debt owed by a solvent debtor, as established in the Shafi‘i school. The due zakat is 2.5%.</p>

<p>Its nisab—as already explained—is estimated according to the nisab of gold established by the Shari‘ah, namely twenty dinars or mithqals. We choose its weight in gold as 85 grams, and in silver as 595 grams, in accordance with the Arab dirham at 2.975 grams. The stronger opinion is to estimate nisab according to gold, because that is what corresponds to the nisab of livestock (camels, cattle, and sheep), and also because of the rise in living standards and the increased cost of necessities.</p>

<p>Although many modern scholars estimate the nisab of money according to silver, since that is more beneficial to the poor and more cautious in matters of religion, the nisab of gold remains the one agreed upon by scholars and ثابت in authentic Sunnah. In the past, this was equivalent to twenty-six Egyptian riyals and one-third qirsh, around fifty Saudi or Emirati riyals, or about 55 to 60 rupees in Pakistan and India.</p>

<p>Zakat on paper money is not obligatory unless it reaches the legal nisab, a full lunar year passes over it, and it is free from debt. This is justice and fairness. The Hanafis add that the nisab must also be surplus beyond the owner’s essential needs, such as maintenance, clothing, housing rent, and military equipment.</p>

<p><strong>A Detailed Explanation of the Scholarly Opinions on the Zakat of Company Shares</strong></p>

<p>Because of the rise of transactions involving shares and bonds, people have always been eager to realize profits and seek Allah’s bounty through individual or private trade, and through collective or public enterprise. This is in line with the Shari‘ah’s encouragement and with the natural human inclination to develop and invest wealth so that it is not consumed by charity alone. Zakat, over time, can diminish capital itself if it is not invested.</p>

<p>Private capital alone often cannot usually finance large industrial, agricultural, or major commercial projects that require huge capital, such as joint-stock companies which need large sums of money to come into existence. In modern times, a method appeared of dividing large capital into portions through what are called shares, which entered economic life. Their values are paid by hundreds or thousands of people.</p>

<p>Existing companies sometimes need loans from individuals. Thus, they make use of what are called bonds in return for a fixed interest payment.</p>

<p>Both shares and bonds are termed—in modern economic terminology—securities, which circulate among the public, sometimes through advertisements in newspapers and daily papers, and sometimes in specialized markets called stock exchanges.</p>

<p>Since the rise of joint-stock companies in the second quarter of the twentieth century, people have asked about the ruling on dealing in shares and bonds—whether lawful or unlawful—the zakat due on them, and who is responsible for paying that zakat. Modern scholars have issued similar fatwas affirming the legality of dealing in shares and the prohibition of dealing in bonds because they involve riba, due to the fixed interest payment on the documented loan amount.</p>

<p>They differed over the percentage of zakat due—whether 2.5% or one-tenth—just as they differed over who must pay zakat on the shares: the shareholder or the company. However, they agreed that zakat is obligatory on both shares and bonds if their value reaches the legal nisab, even though bonds are mixed with unlawful gain through interest and corrupt practice. The unlawful nature of part of one’s wealth does not prevent zakat from being obligatory. On the contrary, one of the ways to rid oneself of unlawful wealth is to dispose of it in charity.</p>

<p><strong>The Definition of Shares and Bonds</strong></p>

<p>Shares are certificates of equal value, indivisible, tradable, and representing the rights of shareholders in companies participating in the capital.</p>

<p>Shares represent a portion of the company’s capital, and their owner is the shareholder. Shares have the following characteristics:</p>

<p>a. Shares are equal in nominal value. Therefore, shares may not be issued with different face values. Their equal value is the nominal value at which they are issued and defined by law, for example in the Emirates around one hundred dirhams or one dirham depending on the legal framework. The nominal value differs from both their market value and their real value. The nominal value is the value stated on the certificate and used in calculating the total capital of the company. The commercial value is the value of the share in the market or exchange. This changes according to supply, demand, market conditions, the company’s reputation, and the strength of the central guarantee of the currency. The real value of the share is the value of money that the share would represent if the company were liquidated and its assets distributed over the total number of shares.</p>

<p>b. Shares are indivisible. That means they cannot be represented in fractional form when ownership is shared among several people in relation to the company.</p>

<p>c. Shares are publicly tradable. That means ownership may be transferred from one person to another by recognized methods of trade, without requiring an order from the company.</p>

<p>If the share is nominative, its transfer occurs by endorsement. If it is a bearer share, transfer occurs simply by handover.</p>

<p>Most legal systems require shares to be registered by name, while some permit bearer shares under certain conditions.</p>

<p><strong>In summary:</strong> shares represent portions of a financial company.</p>

<p>As for bonds, they are financial certificates that can be traded, by which the person named in the document is entitled to receive a sum of money that he has loaned, together with a return exceeding the loan amount in the form of predetermined interest payable at maturity. In other words, a bond is a written contract for a debt owed to its holder on a specified date in return for a fixed interest payment.</p>

<p>Bonds resemble shares in that both have a nominal value, are tradable, and are indivisible.</p>

<p>The essential difference between shares and bonds is that a share represents a portion of ownership in the company. That means the shareholder is a partner in the company. A bond, however, represents a debt owed by the company or the state. That means its holder is a creditor.</p>

<p>Accordingly, the shareholder receives profit only when the company earns profits, while the bondholder receives fixed annual interest whether the company profits or not.</p>

<p>Shares generally bear the name of the owner in order to ensure state oversight of shareholders. Bonds, however, may either be registered or bearer instruments.</p>

<p>This view corresponds to what is established in the four madhhabs: factories, buildings, and production facilities themselves are not subject to zakat. Zakat is due only on the annual profits if they reach the legal nisab and a full year passes over them in the owner’s possession. This is the position adopted by the Islamic Fiqh Academy in Jeddah in its second session in 1406 AH / 1985 CE.</p>

<p>The fuqaha of the madhhabs ruled that no zakat is due on weapons used in service, scholars’ books, or tools of profession, because these are used for basic needs and are not growing assets. The cause of zakat is ownership of a nisab that is capable of growth, even by estimate.</p>

<p>In al-Mi‘yar al-Mu‘arrab by Abu al-‘Abbas al-Wansharisi, a question was asked regarding craftsmen after a year had passed while they still held some of their products such that, if valued and added to the cash they possessed, would amount to a nisab. Are they obliged to estimate those goods and pay zakat on them?</p>

<p>He answered that craftsmen pay zakat on the original wealth—cash—that has completed the haul in their possession if it reaches the nisab. They are not required to assess the value of their workmanship and wait for a haul over that value, because that is income resulting from their labor which is only acquired when sold. However, the raw materials used by craftsmen such as leather, wood, iron, and the like are assessed by the administrator apart from the labor component if they were bought for trade.</p>

<p>This is a very clear fatwa and it makes matters easier for craftsmen such as shoemakers, furniture makers, metal cabinet makers, and the like.</p>

<p>Dr. Wahbah al-Zuhayli supported the opinion of Shaykh ‘Abd al-Rahman ‘Isa with the qualification that zakat is due on industrial companies if their output consists of trade goods ready for sale or export after deducting the value of machinery and buildings. Thus, for example, a printing press pays zakat at the end of the year on everything it has produced such as paper and books in its possession. It also pays zakat on profits derived from the fees it earns from customers, after deducting the value of printing equipment, binding equipment, and other capital assets.</p>

<p>However, Prof. Dr. Yusuf al-Qaradawi did not agree with this opinion. He made zakat obligatory on all company shares, whether industrial or commercial. Regarding Shaykh ‘Abd al-Rahman ‘Isa’s differentiation between the two categories of shares, Dr. al-Qaradawi said that this distinction is not acceptable according to the justice of the Shari‘ah, which does not differentiate between two similar things.</p>

<p>He then supported the second opinion, namely that of Shaykh Muhammad Abu Zahrah and those who agreed with him, which does not differentiate between the two kinds of shares according to the type of company. He said this is more appropriate from the perspective of the individual and easier for calculation.</p>

<p>He then added: “It would be different if there were an Islamic state that wished to collect zakat directly from companies. In that case, perhaps Dr. Wahbah al-Zuhayli would regard the first opinion (that of Shaykh ‘Isa) as preferable and stronger.” والله أعلم.</p>

<p><strong>2. The Opinion of Ustadh ‘Abd al-Wahhab Khallaf, ‘Abd al-Rahman Hasan, and Muhammad Abu Zahrah</strong></p>

<p>These professors held that shares and bonds—securities—if intended for trade, are treated as trade goods and are subject to the same zakat as trade goods, namely 2.5%. Their zakat is 2.5% of both principal and growth, as established by the majority of fuqaha.</p>

<p>Dr. al-Qaradawi favored this opinion, saying: “Perhaps this view and fatwa are more suitable from the perspective of the individual than the first opinion. Every shareholder knows the number of his shares and knows his profits each year. He can easily pay zakat on them. This differs from the first opinion, which distinguishes between shares in one company and shares in another. Some are zakated based on income, while others are zakated based on the shares themselves according to their value plus the profits. This introduces some complexity for the ordinary individual.”</p>

<p>However, Dr. Wahbah al-Zuhayli held that the first opinion is the one established in fiqh and has been acted upon since the rise and spread of joint-stock companies in the 1940s, and that there is no real difficulty in the matter. A Muslim knows that industrial machinery is not subject to zakat. If his wealth is invested through shares in industrial companies, the portion corresponding to machinery is deducted. If his wealth is invested in shares of commercial companies, then he zakates them like trade goods.</p>

<p>Ustadh Muhammad Abu Zahrah also had an earlier opinion containing a distinction, mentioned in the statement of the Social Studies Workshop of the Arab League held in Damascus in 1952, and also in the second conference of the Islamic Research Academy in 1965.</p>

<p>Its content was that if shares and bonds are intended for trade or mudarabah, and are repeatedly bought and sold in the stock market, then they are treated as trade goods, and their zakat is calculated by assessing their value at the beginning and the end of the year, at a rate of 2.5% on capital and growth whenever they reach the nisab.</p>

<p>But if they are held for investment and wealth development rather than speculative buying and selling, and are only owned to obtain their profits and annual returns, then the zakat paid by the company suffices on behalf of the shareholders, meaning the shareholders themselves need not pay zakat separately.</p>

<p>This opinion looks at shares from the perspective of the owner and his intention: whether he intends trade or investment. It was suitable at a time when companies themselves would pay zakat on their wealth or ask how to pay it.</p>

<p>Dr. Wahbah al-Zuhayli did not consider this distinction necessary, because the purpose of buying shares is ultimately one: engaging in trade and seeking profit. Therefore, such shares should be zakated as trade goods.</p>

<p><strong>3. The Fatwa of the Shari‘ah Supervisory Board of Faisal Islamic Bank Sudan</strong></p>

<p>In fatwa no. 17 concerning the principles for zakat on the shares of Faisal Islamic Bank Sudan, the Shari‘ah Supervisory Board—without any party requesting a fatwa—stated as follows:</p>

<p>Based on the opinion of the majority of its members, the Board held that the bank should pay zakat on its shares according to the following principles:</p>

<p>The bank pays zakat on its shares after the completion of a haul at a rate of 2.5% of the contributed funds, meaning the value of the shares plus the value of trade goods specifically related to those shares. No zakat is due on fixed assets, along with the profits of the shares.</p>

<p>If the bank purchases real estate with shareholder funds for the purpose of trade by buying and selling, then it pays zakat on it like trade goods, meaning the value is added to the cash derived from the shares. If the bank buys it in order to lease it out, then it pays zakat on it as a productive fixed asset by paying 10% of the rent when received.</p>

<p>If the bank gives part of the shareholders’ funds to a working partner under mudarabah financing, then the bank pays zakat on the capital provided to the mudarib together with its share of the profit.</p>

<p>If the bank has due trade debts from shareholder funds and also has receivables owed to it by others, then those receivables are added to its assets. The bank deducts the debts it owes from the receivables owed to it and pays zakat on the remainder. If its debts exceed its receivables, then it deducts the excess from the cash it possesses and pays zakat on the remainder. If the bank’s trade receivables are deferred but likely collectible, then they are assessed in terms of goods, and those goods are then assessed in cash according to current value, and zakat is paid on that amount.</p>

<p>If the bank has receivables, it pays zakat on them just as it does on cash in hand, as long as repayment is expected.</p>

<p>A question was raised regarding small shareholders whose individual holdings do not reach the nisab: are they still subject to zakat when combined with others? If one says they are not liable because they do not individually own enough to complete one nisab, then their shares would be excluded from the total shareholding value.</p>

<p>These principles generally correspond to the opinion that shares are zakated like trade goods. However, they differ in details, because according to these principles the actual value of the share—its nominal value—is considered, not the market value as in the opinion of those who regard shares as trade goods. This is because market value is only an estimate, while the real value represents the actual reality. It is not sound to rely on estimates as long as the true value can be known. Likewise, zakat on income-generating real estate is taken from its rental income, not its capital value, because in reality the real estate itself is not trade merchandise.</p>

<p>It is clear that the amount paid from the first installment of those shares has completed one year and is subject to zakat. The bank must pay it according to the above principles. If applying these principles is difficult at the present time, then the bank may temporarily pay 2.5% of the total amount paid in the first installment after deducting the value of fixed equipment and the shares that do not reach the nisab, until the shareholders begin to receive profit. This is on condition that it works toward a method that will enable these principles to be fully implemented in the future.</p>

<p>This temporary solution does not differ much from the opinion that shares are trade goods whose zakat is assessed on their market value plus profit after deducting the value of fixed assets, except in two respects: first, it considers the nominal value of the shares; second, it does not add the profits, because they are unknown, nor does it deduct expenses even if known. Normally, expenses should be covered from profits, not from capital, so long as profits are not taken into account. Even fairness in expenses is not considered here. والله أعلم.</p>

<p>Although Dr. Wahbah al-Zuhayli generally supported this fatwa, he disagreed with it in the following points: first, income-generating real estate should be zakated at 2.5% of its profit, not 10% of the rent when received. This is after one full year has passed while the real estate remains in the possession of its owner or the bank. Second, company shares should be zakated like mixed assets, even if the individual holdings of some shareholders do not independently reach a legal nisab, as will be explained. Third, shares should be assessed according to their commercial market value in the stock exchange, not merely their nominal value. This is a known reality. Sometimes market value exceeds nominal value many times over, as has actually happened in some markets. If it is not currently known, zakat is still obligatory once it becomes known. Fourth, when profits are known they should be added to the net asset value of the shares, because every company prepares a complete balance sheet at the end of each year showing capital, depreciation, profits, and debts.</p>

<p><strong>The Amount Due in Zakat on Shares</strong></p>

<p>As already explained, shares are zakated like trade goods. Therefore, the due amount is 2.5% of the principal together with growth or profit.</p>

<p>If we do not adopt the detailed distinction mentioned in Ustadh Abu Zahrah’s earlier opinion, and instead follow the view of Shaykh ‘Abd al-Rahman ‘Isa regarding the necessity of distinguishing between commercial and industrial shares, then Abu Zahrah’s view that the zakat on commercial shares is 2.5% while the zakat on investment shares is 10% like productive fixed assets is not correct and contradicts the established fiqh position that the zakat rate on trade goods is 2.5%.</p>

<p>Therefore, Abu Zahrah’s view assigning a 10% zakat rate on investment shares is not consistent with the established madhhab positions. There is no good reason to distinguish between trade shares and investment shares. Indeed, in his later opinion he did not maintain this distinction and was content to say that zakat on shares is like zakat on trade goods.</p>

<p><strong>In summary:</strong> zakat on shares and bonds is obligatory at a rate of 2.5% of their commercial value together with their profits at the end of each year. Fixed capital assets are not zakated at 10% of net profit.</p>

<p><strong>The Person Responsible for Paying Zakat on Shares</strong></p>

<p>Ustadh Abu Zahrah and those who followed him held that what is due on shares and bonds to the one doing business through the company is not taken from the company itself. This is because companies whose wealth is zakated are considered productive entities whose assets grow through production and the like. As for the shares held by a trader in such a company, these are personal assets that grow as trade goods.</p>

<p>Dr. al-Qaradawi criticized this duality because it would result in zakat being imposed twice on the same shares: once by considering the shareholder as owner and trader, so 2.5% is taken from the shares and all profits, and again by considering him as producer, so one-tenth is taken from the company’s returns or profits. The stronger view is that one of these two zakats should suffice: either zakat on the value of the shares with their profits at 2.5%, or zakat on the company’s output and income at one-tenth of net profits, in order to avoid duplication and confusion.</p>

<p>Dr. Wahbah al-Zuhayli held that zakat on shares is only 2.5% of net assets together with annual profits. Shares are assessed in value like trade goods at the end of each year according to their market price at the time zakat is paid, not according to their purchase price. Shares are aggregated together at valuation even if they differ between commercial and industrial categories, after deducting the value of production tools.</p>

<p>Companies should pay zakat on all their shares, because the company benefits from the shares. The company stands in the position of a partner on behalf of the shareholders. Since the company has a recognized and independent legal personality, zakat may be imposed upon it.</p>

<p>Given that zakat is a financial obligation attached to wealth itself, zakat is due on the legal person, for which the usual personal conditions of legal responsibility such as puberty and sanity are not required. This is also by analogy to the zakat of livestock in the Shafi‘i school, which recognizes the effect of mixture in livestock and other cases. This is also the view of the Maliki and Hanbali schools regarding livestock zakat, acting on the generality of the Prophet’s established hadith on zakat: “Separate properties should not be combined, nor combined properties separated, out of fear of sadaqah.”</p>

<p>Since shares represent material value or a sum of wealth, they are wealth upon which zakat is due. Thus, mixture affects their zakat just as it does livestock. Likewise, the joint wealth shares storage, protection, and similar expenses. Zakat on wealth other than livestock—such as gold, silver, crops, fruits, and trade goods—is comparable to livestock in this respect. Their costs are reduced when the warehouse, scales, and seller are shared.</p>

<p>Accordingly, none of the shareholders in joint-stock companies is exempt from zakat on company shares, even if he owns only one share. Zakat is paid from the company’s net capital that is capable of growth, together with its growth, at a rate of 2.5%. The value of fixed assets such as land, buildings, machinery, and the like is not included, because the shares represent portions of the company’s net circulating assets, namely money and trade goods.</p>

<p>As for the opinion that the zakat of shares should be like the zakat of fixed assets at a rate of 10% of profit, this is a weak opinion not recognized by the established views of the earlier fuqaha.</p>

<p>Moreover, requiring the joint-stock company itself to pay zakat on all shares contains a clear benefit for the poor.</p>

<p><strong>In conclusion,</strong> Dr. Wahbah al-Zuhayli held that zakat on shares in companies is based on their commercial market value as announced in the market, not merely their nominal value. Shares are zakated like trade goods at a rate of 2.5% if the company is commercial in nature. If the company is purely industrial and neither trades nor produces trade goods, then the shares are not subject to zakat. But if the company produces goods for trade, such as a company manufacturing refrigerators, then its shares are zakated after deducting the amount corresponding to the value of industrial equipment and buildings. The company itself estimates the zakat value for all shares, and it is the company—not the shareholder—that pays. At the time of distribution, the company may hand the zakat amount over to the shareholder so that he himself gives it to the poor. والله أعلم.</p>
    `
  },
   {
    title: "Income Zakat",
    body: `
      <div class="fiqh-image">
  <img src="assets/images/gaji.png" alt="Zakat Illustration">
</div>

<p><strong>Zakat on Buildings, Factories, Income, and Independent Professions</strong></p>

<p>The discussion of zakat on buildings, factories, occupations, and independent professions is a continuation of the discussion on zakat on money, especially after explaining the rulings on zakat for shares and bonds. This section is specifically devoted to discussing zakat on income earned from leasing buildings, factories, transportation equipment, and from jobs and independent professions. In the present age, capital is not only invested in agricultural land or trade, but also in the construction of buildings for rent, the establishment of factories for production, the provision of means of transportation such as airplanes, ships, and cars, as well as cattle and poultry farming. All of these share a common feature: zakat is not due on the asset itself (the fixed capital), but rather on the income or net profit generated from it.</p>

<p>Although the majority of classical fuqaha did not state that zakat is obligatory on this type of income, and held that there is no zakat on residential houses, household furnishings, work tools, and riding animals, there is a view affirming the importance of zakat on the returns obtained from such productive assets. This is based on the presence of the effective cause (‘illah) of zakat, namely growth or increase of wealth (an-nama’). The legal ruling revolves around its effective cause: where the cause exists, the ruling exists; and where it is absent, the ruling is absent. In addition, the wisdom behind zakat includes purifying and cleansing the wealth of its owner, bringing relief to those in need, and contributing to the eradication of poverty, which is a concern of many institutions and organizations around the world.</p>

<p>The Second Conference of Muslim Scholars and the Second Islamic Research Conference in 1385 AH / 1965 CE resolved that productive wealth for which there is no explicit text or classical fiqh opinion obligating zakat on the asset itself is not subject to zakat on the physical asset, such as rented buildings, factories, airplanes, and the like. However, zakat is obligatory on the net profit if it reaches the nisab and a haul passes over it. The zakat rate is 2.5% of the net profit at the end of the year, just like trade zakat and cash zakat. In companies, what is taken into account is not the total combined profit of the whole company, but rather the share belonging to each owner or business unit. This decision is in line with the opinion narrated from Imam Ahmad, who held that assets generating material profit are subject to zakat, and also with the opinion of some Maliki scholars who held zakat to be due on assets that yield profit. Ibn ‘Aqil al-Hanbali and Hadaweh al-Zaydi also held that assets producing income, including leased real estate and every asset prepared for rental, are subject to zakat annually just like trade goods.</p>

<p>As for zakat on work and independent professions, work may either be independent and not tied to the state—such as that of a doctor, architect, lawyer, tailor, carpenter, and other freelance workers—or tied to a state institution or a public or private company, in which case the employee receives a monthly salary. The income earned by both freelancers and salaried employees has its own fiqh discussion. In the four madhhabs, it is established that there is no zakat on profit until it reaches the nisab and a haul passes over it. However, according to those other than the Shafi‘is, zakat is due on the total saved wealth even if part of it was acquired near the end of the haul, so long as the original nisab has been met. There is also an opinion that zakat on income becomes due immediately upon receipt, even before one full haul passes, as held by some Companions such as Ibn ‘Abbas, Ibn Mas‘ud, and Mu‘awiyah, and some Tabi‘in such as al-Zuhri, Hasan al-Basri, and Makhul, as well as ‘Umar ibn ‘Abd al-‘Aziz, al-Baqir, al-Sadiq, al-Nasir, and Dawud al-Zahiri.</p>

<p>The zakat rate on such income is 2.5%, based on the general evidences obligating zakat on money. Whether this income has completed a haul, or is paid upon receipt according to the opinion that allows this, the rate remains 2.5%. If a Muslim pays zakat on his income when he receives it, he does not have to pay zakat again when one full haul passes over that same wealth. Thus, a person with continuous income is treated like a farmer who must pay zakat on agricultural produce and fruits at harvest time after they have been processed and prepared.</p>
    `
  },
  {
    title: "Zakat on Trade Goods (‘Urudh at-Tijarah)",
    body: `
      <div class="fiqh-image">
  <img src="assets/images/dagang.png" alt="Zakat Illustration">
</div>

<p>Trade goods are what the Arabs call <em>‘urudh</em>, the plural of <em>‘aradh</em>, meaning worldly property other than minted gold and silver. It includes commodities, buildings, various animals, crops, clothing, and other assets that are prepared for commercial trade and sale.</p>

<p>According to the Malikiyyah, jewelry intended for trade is also included. Houses that are bought and sold for commercial purposes are treated like trade goods and are subject to zakat just like other commercial assets. However, houses used for personal residence or as workplaces such as shops and factories are not subject to zakat.</p>

<p><strong>Conditions for Zakat on Trade Goods</strong></p>

<p>The fuqaha set several conditions for zakat on trade goods. Among the agreed conditions are reaching the nisab, the completion of one lunar year (haul), and the existence of the intention to trade.</p>

<p>The nisab follows the nisab of gold and silver. The value of goods is assessed according to the market price in the region where the goods are located. If the goods are in a remote area, the value is estimated according to the nearest market.</p>

<p>The Malikiyyah distinguish between traders who store goods and those who circulate goods through continuous trade. A trader who stores goods is not required to pay zakat until the goods are sold, and then zakat is due for only one year. A trader who circulates goods must assess the value of the goods each year and pay zakat if the nisab is reached.</p>

<p>The majority of scholars consider both types of traders to have the same ruling: once a year passes, the value of the goods must be assessed and zakat paid accordingly.</p>

<p><strong>Calculation of the Haul</strong></p>

<p>The haul begins from the time the wealth is owned. The Hanafiyyah and Malikiyyah consider the beginning and the end of the haul to be decisive. The Shafi‘iyyah consider the nisab at the end of the haul to be sufficient. The Hanabilah require the nisab to exist throughout the entire haul.</p>

<p><strong>Intention of Trade</strong></p>

<p>The intention to trade must exist during the transaction. According to the Hanafiyyah, intention alone is not sufficient without real commercial activity. Most scholars require that ownership occurs through a commercial transaction such as purchase, not inheritance or gift.</p>

<p>The Shafi‘iyyah add that the intention must remain present in successive transactions until the capital is exhausted. If the wealth is intended for personal use, the haul is interrupted.</p>

<p><strong>Assessment and Amount of Zakat</strong></p>

<p>The value of trade goods is assessed at the end of the year according to the current market price rather than the purchase price. Goods of different types are combined in the assessment. The zakat due is 2.5% of the total value according to scholarly consensus.</p>

<p>The evidences include the verse of Allah in Surah Al-Baqarah (2:267) and several prophetic traditions concerning the obligation of zakat on trade.</p>

<p>According to the majority of scholars, the valuation should be made in a way that benefits the poor most, whether calculated in gold or silver value. The Shafi‘iyyah assess according to the currency used during the purchase.</p>

<p>The Hanafiyyah allow zakat to be paid either from the goods themselves or from their monetary value, while the majority require payment from their value.</p>

<p><strong>Profit and Growth of Wealth</strong></p>

<p>Scholars agree that trade profits are combined with the capital and are zakatable together when the haul is completed.</p>

<p>The Hanafiyyah also combine wealth acquired without trade such as inheritance with the trade capital. The Malikiyyah and Shafi‘iyyah do not combine such wealth with trade capital but begin a separate haul for it. The Hanabilah agree with the Shafi‘iyyah but require the original capital to have reached nisab.</p>

<p><strong>Additional Details According to the Malikiyyah</strong></p>

<p>According to the Malikiyyah, a trader who stores goods pays zakat only when the goods are sold and only for one year. A trader who actively circulates goods must evaluate and pay zakat every year.</p>

<p>Debts expected to be repaid are combined with the capital and zakat is paid on them, whereas debts that are unlikely to be repaid are not subject to zakat until they are actually received.</p>

<p><strong>Zakat in Partnership (Mudharabah)</strong></p>

<p>In a mudharabah partnership, Abu Hanifah holds that both the capital owner and the worker pay zakat on their shares annually without waiting for profit distribution.</p>

<p>The Hanabilah state that the capital owner pays zakat on the capital and profit, while the worker pays zakat on his share only after it is distributed and a new haul begins.</p>

<p>The Shafi‘iyyah state that the capital owner pays zakat on both capital and profit, while the worker pays zakat on his share once profit appears because he already has a legal right to it.</p>

<p>The Malikiyyah say the capital owner pays zakat annually on capital and profit, while the worker pays zakat on his share only after distribution and for one year.</p>

<p><strong>Practical Calculation of Trade Zakat</strong></p>

<p>In practice, at the end of each haul a trader calculates the total value of all goods for sale, estimates their market value, and adds them to cash, gold, silver, and collectible debts. After deducting debts that are due, if the remainder reaches nisab, zakat of 2.5% must be paid.</p>

<p>Shop equipment, shelves, scales, operational vehicles, machinery, and work tools are not included because they are not intended for sale.</p>

<p><strong>Change of Intention in Trade</strong></p>

<p>If a trader purchases goods with the intention of trade but later decides to use them personally, the haul is interrupted and the goods are no longer considered trade goods. If the intention to trade returns later, a new haul begins from that time.</p>

<p>If someone originally owns an item for personal use and later intends to sell it, the majority of scholars state that it does not become trade goods unless a new commercial transaction occurs.</p>

<p><strong>Changes in Nisab During the Year</strong></p>

<p>If the value of goods reaches nisab at the beginning of the year, drops below it during the year, and returns to nisab by the end of the year, zakat remains obligatory according to the Hanafiyyah and Malikiyyah because the beginning and end of the haul are considered.</p>

<p>The Shafi‘iyyah consider the condition at the end of the haul sufficient, while the Hanabilah require the nisab to exist throughout the haul except for minor fluctuations.</p>

<p><strong>Modern Corporate Trade Zakat</strong></p>

<p>In modern companies, all inventory intended for sale is included in trade zakat. Cash reserves, bank balances, receivables expected to be collected, and retained earnings are also included in the zakat calculation.</p>

<p>Fixed assets such as buildings, production machinery, vehicles, and equipment are excluded because they are not meant for sale.</p>

<p>If a company operates as a partnership or corporation, each shareholder pays zakat according to his share unless the company pays zakat on behalf of all shareholders.</p>

<p><strong>Debts in Trade Zakat</strong></p>

<p>Debts that are due may be deducted from the total wealth before calculating zakat according to most scholars. Thus a trader subtracts his payable debts from his total assets and pays zakat on the remaining amount if it reaches nisab.</p>

<p>Long-term debts that are not yet due are subject to scholarly disagreement; some scholars only deduct the installment due within the year.</p>

<p><strong>Mixed Types of Goods</strong></p>

<p>Trade goods of different categories are combined in the final assessment. For example, a trader who sells clothing, food, electronics, and construction materials calculates zakat based on the total value of all goods.</p>

<p>Profits from all these categories are also combined because they belong to the same commercial activity.</p>

<p><strong>Price Fluctuations</strong></p>

<p>If inflation or major price fluctuations occur, the valuation is still based on the market price at the time zakat is paid in order to preserve the rights of the poor according to the current economic condition.</p>
</div>
    `
  },
  {
    title: "Zakat on Crops and Fruits (Zakat on Produce or What Comes Out of the Earth)",
    body: `
     <div class="fiqh-image">
  <img src="assets/images/padi.png" alt="Zakat Illustration">
</div>

<p>This discussion covers the obligation of zakat on crops and fruits, the reason for its obligation, its conditions, what kinds of produce are subject to zakat, the nisab that makes zakat due, the amount that must be paid and its form, the time when it becomes obligatory and when it is paid, what items may be combined, zakat on endowed fruits, zakat on leased land, zakat on kharaj land (‘ushriyyah and kharajiyyah), the ruling on honey, and the causes that cancel zakat on crops and fruits.</p>

<p>Zakat on crops and fruits is obligatory based on the Qur’an, the Sunnah, ijma‘, and reason. The Qur’anic proof is the saying of Allah Most High: “...and give its due on the day of harvest.” (Surah al-An‘am: 141). Ibn ‘Abbas interpreted “its due” as the obligatory zakat, namely one-tenth or one-twentieth. Allah also says: “O you who believe, spend from the good things you have earned and from what We have brought forth from the earth for you.” (Surah al-Baqarah: 267). Zakat is referred to as spending in the verse: “And those who hoard gold and silver and do not spend it in the way of Allah...” (Surah at-Tawbah: 34).</p>

<p>The proof from the Sunnah is the Prophet’s saying: “That which is watered by the sky, springs, or draws water through its roots, its zakat is one-tenth. That which is watered by irrigation and expense, its zakat is one-twentieth.” In another narration: “On crops watered by rivers and rain, the zakat is one-tenth, and on those watered by tools, one-twentieth.” The Muslims have reached ijma‘ on the obligation of one-tenth on agricultural produce. Rationally, paying one-tenth is a form of gratitude for Allah’s blessing and a means of helping the poor.</p>

<p>The cause of this obligation is the emergence of produce from the land. If nothing comes out, then no zakat is due. If the crop is destroyed before ripening due to disease, then there is no zakat on ‘ushri land and no tax on kharaj land because actual growth did not occur. Zakat on crops becomes obligatory once the grain hardens, and zakat on fruits becomes obligatory once the fruit becomes visibly good and ripe, even if that occurs only in some of the fruits of that type.</p>

<p>Among its conditions are general conditions such as Islam, and according to some schools, puberty and sanity. The Hanafiyyah do not obligate zakat on the wealth of minors and the insane except in produce from Muslim land, because in it there is also the meaning of taxation. They stipulate that the land must be ‘ushriyyah, that produce must emerge, and that the crop must be of the kind cultivated for growth from the land. Abu Hanifah does not require nisab, so zakat is due on little and much alike.</p>

<p>The Malikiyyah require that the produce be specific grains or fruits such as dates, raisins, and olives, and that it reach the nisab of five wasqs (approximately 653 kg). There is no zakat on apples, pomegranates, or vegetables. The Shafi‘iyyah require that the produce be staple food that can be stored, such as wheat, rice, barley, dates, and raisins, that it reach five wasqs, and that it belong to a specific owner. There is no zakat on vegetables or fruits that cannot be stored. The Hanabilah require that the produce be measurable by volume, storable, dry, and reach five wasqs, and that it be owned by a free Muslim at the time zakat becomes obligatory, when the grain hardens or the fruit ripens.</p>

<p>As for what is subject to zakat, Abu Hanifah holds that everything that comes out of the earth is subject to zakat, whether little or much, except firewood, Persian bamboo, straw, and similar things not intended for cultivation. His proof is the hadith: “Whatever the earth produces, a tenth is due on it.” The majority of scholars hold that zakat applies only to what is staple food and can be stored. The Malikiyyah mention around twenty types of grains and fruits such as wheat, barley, rice, lentils, legumes, sesame, olives, dates, and raisins. The Shafi‘iyyah limit it to staple food that can be stored. The Hanabilah obligate it on all grains that can be measured and stored, including legumes and certain dried fruits such as dates and raisins.</p>

<p>Regarding olives, the Shafi‘iyyah in the new opinion and the stronger Hanbali view do not obligate zakat on them, whereas Abu Hanifah and the Malikiyyah do. According to the Malikiyyah, the nisab for olives is five wasqs.</p>

<p>Regarding honey, the Hanafiyyah and Hanabilah obligate one-tenth, with the Hanabilah setting the nisab at ten afraq. Their proof is the hadith of Abu Sayyarah: “O Messenger of Allah, I have honey.” The Prophet said: “Pay one-tenth of it.” There is also a narration that the Prophet took one-tenth from honey. The Malikiyyah and Shafi‘iyyah do not obligate zakat on it, because there is no clear authentic hadith on the matter, and honey is likened to milk, on which zakat is not obligatory. Abu ‘Ubayd considered it recommended rather than obligatory.</p>

<p>As for the nisab, Abu Hanifah does not require it and obligates zakat on little and much alike based on the general wording of the verses and hadiths. The majority require five wasqs based on the hadith: “There is no zakat on less than five wasqs.” They treat this as a specification of the general texts.</p>

<p>The amount of zakat is one-tenth (10%) for that which is watered without expense and one-twentieth (5%) for that which is watered with expense. According to Abu Hanifah, farming costs do not reduce the zakat. It is paid at harvest time.</p>

<p>The majority recommend estimation (<em>kharsh</em>) for dates and grapes before harvest based on hadiths that the Prophet sent workers to estimate the yield. ‘Attab ibn Usayd narrated that the Prophet ordered grapes to be estimated like dates and then their zakat to be taken in dried form. The Shafi‘iyyah and Hanabilah recommend leaving one-third or one-fourth for ease upon the owner, based on the hadith of Sahl ibn Abi Hathmah: “If you estimate, then take and leave one-third; if not, then leave one-fourth.” The Hanafiyyah and Malikiyyah do not require leaving such a share.</p>

<p>If the produce is destroyed without negligence before harvest, then zakat is cancelled because the object of obligation is gone. If another person consumes it, that person is liable for it. If the owner consumes it, he remains liable for its zakat. According to the Hanafiyyah, zakat is cancelled by apostasy and by death without a bequest, unless the produce still exists, in which case it is taken from that property.</p>

<p><strong>The Time When Zakat on Crops and Fruits Becomes Obligatory and Its Details</strong></p>

<p>According to the majority of scholars, zakat on crops and fruits becomes obligatory when the grain hardens and can be stored, and when the fruit shows signs of ripeness and goodness. This is the point at which the obligation attaches. However, the actual time of payment is at harvest, after drying and after removing straw and outer coverings. Allah says: “And give its due on the day of harvest.” (Surah al-An‘am: 141), which indicates that payment is due at harvest time. Nevertheless, because zakat is only due on grain that is dry and measurable, if someone pays it before drying and it later turns out to be less than the required amount, he must complete it. If it turns out to be more, then the excess counts as charity.</p>

<p>Different types of crops and fruits are not combined to complete the nisab according to the majority of scholars. Wheat is not combined with barley, and dates are not combined with grapes. However, one and the same type, even if of different quality, is combined, such as Ajwah dates with other dates, or different qualities of wheat, because they are still one basic type. The Malikiyyah and Hanabilah consider sameness of type to be the basis for combination. The Shafi‘iyyah hold the same. Since the Hanafiyyah do not require a nisab, they are less concerned with combining produce, because for them both small and large amounts are subject to zakat.</p>

<p>If a person owns several orchards in different places but their produce is of the same type and harvested in one season, all of it is combined in calculating the nisab. If the harvests occur in different seasons and a long period has passed such that it is treated by customary agricultural standards as a new cycle, then they are not combined. But as long as they remain in one harvest season, they are treated as one.</p>

<p>As for the zakat on fruits or crops that have been endowed as waqf, if the waqf is for a general cause such as a mosque, a bridge, or the poor at large without specific individual ownership, then there is no zakat according to the Shafi‘iyyah and Hanabilah because there is no specific owner. If the waqf is for specific individuals, then zakat is due on their shares if those shares reach the nisab. The Malikiyyah add that if the produce of the waqf is under the control of certain individuals and legally belongs to them, then zakat applies to them.</p>

<p>Zakat on leased land differs between zakat on the produce and zakat on the rent. If someone leases out his land to a farmer on a sharecropping basis, then zakat is due on the owner of the produce according to each party’s share. If the landowner receives a portion of the harvest, he pays zakat on that share if it reaches the nisab. If the land is leased for a fixed rent in cash or goods, then zakat on the crops is due on the farmer because he owns the produce. As for the rent received by the landowner, it is treated as wealth subject to zakat of money if it reaches the nisab and a haul passes over it.</p>

<p>Regarding kharaj land and ‘ushr land, the Hanafiyyah distinguish between ‘ushri land, which belongs to Muslims and is subject to one-tenth zakat, and kharaji land, which is subject to a fixed land tax. They hold that zakat and kharaj do not combine on the same land. Kharaji land is not subject to one-tenth because it is already subject to kharaj. The majority of scholars, however, allow both zakat on the produce and kharaj on the land, because kharaj is a tax on the land while zakat is an obligation on the produce, and therefore their causes and objects differ.</p>

<p>If ‘ushri land is not cultivated despite the ability to cultivate it, then there is no zakat because there is no produce. But if kharaji land is left uncultivated, the kharaj remains due under the land-tax system because kharaj is attached to the land itself, not to its output.</p>

<p>As for the collector of the agricultural tithe, during the time of the Prophet and the Rightly Guided Caliphs the state sent officials to estimate and collect agricultural zakat. They took according to the prescribed amount and were not allowed to take the best produce of the owner. The Prophet’s saying, “Do not take the best of their wealth,” indicates the prohibition of ظلم in collection.</p>

<p>If agricultural produce is destroyed before harvest due to a natural disaster and without the owner’s negligence, then zakat is cancelled because the object of the obligation is gone. If it is destroyed after the obligation has attached but before payment and without negligence, then according to the majority it is also cancelled because it had not yet become a stable debt in the owner’s liability. However, if it is destroyed due to the owner’s negligence, he remains liable for the zakat. If the produce is stolen and there was no negligence in safeguarding it, then there is no zakat on the missing portion.</p>

<p>If the owner claims that the produce was destroyed, his statement is accepted with an oath according to the Shafi‘iyyah where such destruction is possible. The Hanabilah accept it without an oath if there is strong likelihood. If it is impossible according to normal custom, then it is not accepted.</p>

<p>Zakat on crops does not require a haul because it is zakat on direct produce. Therefore it is paid each time there is a harvest, even if there are several harvests in one year. Each harvest is calculated independently. This differs from zakat on money and livestock, which do require a haul.</p>

<p>If someone harvests before the produce matures in order to avoid zakat, then according to the majority, if this occurred after the signs of obligation had appeared, zakat remains due. But if it happened before the signs appeared, then no zakat is due because the cause had not yet arisen.</p>

<p>If the produce is dried and measured and then found to be less than the nisab, no zakat is due according to the majority. According to Abu Hanifah, however, it remains due even if the amount is small. If it is dried and then decreases after having initially been estimated at the nisab, what counts is the final measured amount after drying.</p>

<p>As for honey, as previously mentioned, the Hanafiyyah and Hanabilah obligate one-tenth on it if it reaches the nisab according to the Hanabilah, based on hadiths concerning the collection of one-tenth from honey. The Malikiyyah and Shafi‘iyyah do not obligate it because there is no explicit authentic proof.</p>

<p><strong>The Shafi‘i School on Zakat of Crops and Fruits</strong></p>

<p>The Shafi‘i school holds that zakat on crops is due only on crops meeting two basic conditions: first, the crop must be a staple food under normal circumstances, not merely in necessity; second, it must be the kind normally cultivated by people. If it is not a staple food, such as vegetables, or it is not a cultivated type, such as wild plants, then no zakat is due on it.</p>

<p>What is meant by “cultivated by people” is not that there must be an intention to plant it, but rather that the species is generally one cultivated by humans. Therefore, if seeds fall and grow by themselves and reach the nisab, zakat is still due because the type belongs to cultivated crops.</p>

<p>A staple food means food ordinarily relied upon under normal conditions. Foods that only serve as substitutes in times of necessity are not subject to zakat. Therefore, grains such as tirmis, tsafa, sesame, cumin, and various vegetables are not considered staple foods according to the majority of Shafi‘i scholars and are not subject to zakat.</p>

<p>Zakat on crops is not due unless the produce reaches the nisab of five wasqs after being cleaned of straw and impurities. If it is less than five wasqs, zakat is not due. If it exceeds that amount, the entire excess is included in the zakatable amount.</p>

<p>Regarding husks and shells in calculating the nisab, Shafi‘i scholars divide them into three categories: a covering that is neither eaten nor part of storage is not counted in the nisab; a covering that is eaten is counted in the nisab; and a covering that is part of storage but not eaten is not counted according to the stronger opinion.</p>

<p>Rice and al-‘als, if still in their outer husks, are required to reach ten wasqs because after husking the clean amount is approximately five wasqs. If already husked, then five wasqs are sufficient.</p>

<p>The rate of zakat is one-tenth if the crop is irrigated without expense, such as by rain or rivers. If irrigation involves tools and expense, then the rate is one-twentieth. If both methods are combined, the rate is determined proportionally according to whichever predominates.</p>

<p>Different crop types are not combined in calculating the nisab. Wheat is not combined with barley, and dates are not combined with raisins. However, crops of the same type are combined even if they differ in quality.</p>

<p>Zakat becomes due when the grain hardens and forms. Before that point it is not due. Grain is not taken as zakat until it has been cleaned of its outer shell. Fruit is not taken as zakat until it has dried.</p>

<p>The costs of planting, harvesting, drying, and all other production expenses are borne by the owner and may not be deducted from zakat. Zakat is taken from the net produce itself.</p>

<p>If land is leased out, then the one-tenth zakat is the responsibility of the tenant who plants, not the landowner. If the land is lent, the zakat is likewise the responsibility of the borrower who plants it.</p>

<p>According to the Shafi‘i school, kharaj does not cancel the obligation of zakat. Both may apply together because their causes differ: kharaj is due because of the land, and zakat because of the crop.</p>

<p>The crops of a non-Muslim dhimmi are not subject to zakat because zakat requires Islam. If a waqf is general, there is no zakat on its produce. If the waqf is specific to certain individuals, then zakat applies if the produce reaches the nisab.</p>

<p>Once zakat has been paid at harvest, there is no annual zakat on the stored produce afterward. Each harvest stands on its own in the calculation of zakat.</p>

</div>
    `
  },
  {
    title: "Zakat on Animals or Livestock",
    body: `
      <div class="fiqh-image">
  <img src="assets/images/sapi.png" alt="Zakat Illustration">
</div>

<p>Zakat on animals or livestock includes the discussion of its legal basis, its conditions, its categories, the nisab for each type, the ruling on mixed livestock, whether zakat is due on the actual property or as a liability, the ruling on paying it in monetary value, combining different types, the ruling on offspring and produce that follow the mother animal, wealth acquired during the middle of the haul, zakat on nisab and not on the intermediate numbers (auqash), and what may be taken by the zakat collector. The obligation of zakat on livestock is established in the Sunnah of the Prophet ﷺ through a number of authentic and sound hadiths. The most well-known is the hadith of Abu Bakr رضي الله عنه, which contains the rates of zakat on camels and their nisab, the rates of zakat on livestock and their nisab, the ruling on mixed herds, the type that should be taken in zakat—namely average animals, not senile, one-eyed, or males unless the collector chooses otherwise—and the rule of one-fortieth on silver. The second is the hadith of Mu‘adh, which explains the nisab of cattle. The scholars are agreed on the obligation of zakat on livestock, namely camels, cattle, and domesticated sheep and goats, not horses, slaves, mules, or donkeys. Abu Hanifah held zakat to be obligatory on horses, while his two students did not, and their opinion became the basis for fatwa.</p>

<p>The jurists set five conditions for the obligation of zakat on livestock. First, the animals must be camels, cattle, or domesticated sheep and goats, not wild animals. Concerning crossbreeds between domesticated and wild animals, the Shafi‘is and Malikis do not obligate zakat because there is no text and they are not fully considered sheep or goats. The Hanbalis do obligate zakat. The Hanafis look at the mother: if the mother is domesticated, zakat is due. Second, the animals must reach the legal nisab as explained in the Sunnah. Third, one full haul must pass under complete ownership without interruption. If the nisab is lost and later regained, the haul begins anew. The offspring follow the haul of the mother. Fourth, according to the majority other than the Malikis, the animals must be grazing livestock (sa’imah), meaning they graze on public pasture for most of the year for the purpose of milk, breeding, or fattening. If they are fed for most of the year, then according to the majority no zakat is due. The Malikis obligate zakat whether they graze or are fed, based on the general wording of the hadith.</p>

<p>Zakat on camels is not due on fewer than five by consensus and hadith. On five camels, one sheep is due; on ten, two sheep; on fifteen, three sheep; on twenty, four sheep. From twenty-five to thirty-five, one bint makhadh is due. From thirty-six to forty-five, one bint labun. From forty-six to sixty, one hiqqah. From sixty-one to seventy-five, one jadha‘ah. From seventy-six to ninety, two bint labun. From ninety-one to one hundred twenty, two hiqqah. From one hundred twenty-one to one hundred twenty-nine, according to the majority, three bint labun are due. Above one hundred twenty, for every forty one bint labun is due, and for every fifty one hiqqah is due. The Hanafis begin a new calculation after one hundred twenty and detail the additional obligation through a different system, while also permitting payment by value. Between one required amount and the next are intermediate numbers (auqash) on which no zakat is due.</p>

<p>Zakat on cattle is due on thirty head with one tabi‘, on forty with one musinnah, and so on: for every thirty one tabi‘, and for every forty one musinnah. Buffalo are treated like cattle. Nothing is due on fewer than thirty. The majority do not obligate zakat on cattle that are not grazing. The Malikis do obligate it. Zakat on sheep and goats is due from forty to one hundred twenty with one sheep; from one hundred twenty-one to two hundred, two sheep; from two hundred one to three hundred ninety-nine, three sheep; at four hundred, four sheep; then one sheep for every additional hundred. Separate flocks must not be combined, nor combined flocks separated, out of fear of zakat. Old, defective, or male animals are not taken except when accepted or chosen by the collector.</p>

<p>There is no zakat on mules and donkeys except if kept for trade, by consensus. As for horses, Abu Hanifah obligates zakat on them if they graze, at one dinar per horse or according to their assessed value, whereas the majority do not obligate it based on the hadith: “There is no zakat on slaves or horses.”</p>

<p>Regarding mixing (khulṭah), according to the majority it affects the zakat of livestock, such that the herd is treated as one ownership under certain conditions, such as one pasture, one watering place, one breeding male, and no intention of avoiding zakat. The Hanafis do not consider mixing to have any effect. If zakat is taken from one share of mixed livestock, the others reimburse proportionally according to their ownership.</p>

<p>As for whether zakat is due on the actual property or in liability, the Hanafis, Malikis, and al-Shafi‘i in his new opinion say it is due on the property itself, so if the livestock is destroyed before payment, the zakat is cancelled. The Hanbalis say it is due as a liability, so it remains payable even if the property is destroyed. Regarding payment in value, the Hanafis allow it because the purpose of zakat is to enrich the poor and that can be achieved through monetary value. The majority do not allow it because the texts specify certain types, and zakat is a devotional matter based on textual prescription. The Shafi‘is allow it in some situations such as compensation adjustments (jubran) and trade zakat.</p>

<p>Combining different subtypes—such as wool sheep with goats, or cattle with buffalo—is allowed because they are treated as one type. The offspring follow the mother in the haul according to the consensus of the four imams. Regarding young livestock, Abu Hanifah says they do not incur zakat unless accompanied by adult animals, whereas the majority obligate zakat if the total number reaches the nisab. Wealth acquired during the middle of the haul, according to the Hanafis and Malikis, is added to the original nisab and all are zakated together; according to the Shafi‘is and Hanbalis, a new haul begins for it.</p>

<p>Auqash, meaning the numbers between two nisab thresholds, incur no zakat based on hadith. The zakat collector takes average animals, not the best and not the worst, not defective ones, not pregnant ones, and not those that have just given birth, unless all the livestock are of that kind or the owner agrees. Compensation adjustment (jubran) applies in camels if the required age category is not available, by moving up or down a level and paying the difference with two sheep or twenty dirhams according to the details of the school.</p>

<p><strong>Mixing (Khulṭah) in the Zakat of Livestock and Its Details</strong></p>

<p>Mixing (khulṭah) in livestock, according to the majority of scholars, affects the obligation of zakat, both by increasing and reducing it. If two or more people own livestock of the same type and graze them together while fulfilling the relevant conditions—namely one pasture, one watering place, one breeding male, one shepherd, one place of rest, and continuity throughout one full haul—then their wealth is treated like one wealth in zakat calculation. Accordingly, if each of them owns forty sheep and the herds are mixed, then only one sheep is due in total. But if each owns one hundred and one sheep and they are mixed, then the two together may owe three sheep because the herd is treated as one combined herd. However, the Malikis stipulate that each person must individually own a nisab before the mixing has any legal effect. If the combined herd reaches one nisab while each individual share is below the nisab, then according to the Malikis no zakat is due on either of them.</p>

<p>The Shafi‘is and Hanbalis divide mixing into two forms: mixing in ownership (real partnership), meaning shared ownership in specific animals without physical separation of shares, and mixing in description (khulṭah al-shifat), meaning that each person owns his own animals but the livestock are grazed together with shared facilities as mentioned above. In both forms, as long as the conditions are fulfilled and the owners are among those liable for zakat—Muslim, free, in possession of the nisab, and with a completed haul—then zakat is assessed as though it were one wealth. No intention of mixing for the purpose of affecting zakat is required, because the ruling follows the actual reality of shared management and reduced expenses, not intention.</p>

<p>As for mixing in other kinds of wealth, such as money, grains, fruits, and trade goods, the Hanbalis do not consider mixing to have any effect, because the hadith forbidding the combining of separate herds or separating combined herds for fear of zakat applies specifically to livestock. The Shafi‘is in the new opinion extend the effect of mixing to other types of wealth based on the general wording of the hadith.</p>

<p>Regarding what the collector takes from mixed livestock, if zakat is taken from the share of one partner, the other partner must compensate him proportionally according to the share of ownership. If there is disagreement about the value, then the statement of the one claiming compensation is accepted with an oath because he is the one bearing the burden.</p>

<p>As for whether zakat is due on the property itself or in liability, the Hanafis, Malikis, and al-Shafi‘i in his new opinion state that zakat is attached to the property itself, so if it is destroyed without negligence before payment, zakat is cancelled. But if it is destroyed through negligence or consumed after it became due, then replacement remains obligatory because it has the ruling of a violated trust. The Hanbalis say zakat remains a liability, so even if the wealth is destroyed, payment is still obligatory so long as the haul had been completed.</p>

<p>Regarding paying zakat in monetary value, the Hanafis allow this generally in zakat on livestock, agricultural produce, zakat al-fitr, expiations other than freeing a slave, and vows. Their proof is that what is required is the financial meaning, not a specific physical form, and the purpose of zakat is to satisfy the poor, which can be achieved through value. They also cite the practice of some Companions, such as ‘Umar رضي الله عنه, in certain reports. The majority of scholars reject payment by value except in limited cases, because zakat is an act of worship whose form is defined by the revealed texts, so it should not be transferred away from the specific types mentioned in those texts. The Shafi‘is make exceptions in trade zakat, compensation adjustment (jubran), and some administrative situations under state authority.</p>

<p>Regarding combining different subtypes, there is no disagreement that sheep and goats may be combined in the nisab, and likewise cattle and buffalo, as well as pure Arab camels and mixed camels. In payment, the majority allow choosing from any subtype so long as the value is fair. The Shafi‘is are stricter in considering price differences between subtypes.</p>

<p>The offspring follow the mother in the haul according to the consensus of the four imams. If the offspring are born before the haul is complete and the nisab is fulfilled, they are zakated together with the mothers. If they are born after the haul is complete, they begin a new haul of their own. Regarding young animals, Abu Hanifah and Muhammad require the presence of adult animals within the nisab for zakat to be due, whereas the majority do not require that and obligate zakat so long as the total reaches the nisab.</p>

<p>Wealth acquired during the middle of the haul from the same type, according to the Hanafis and Malikis, is added to the original nisab and all are zakated together at the end of the first haul. According to the Shafi‘is and Hanbalis, newly acquired livestock has its own separate haul, except for offspring and trade profit.</p>

<p>Auqash, meaning the numbers between two nisab thresholds, incur no zakat according to hadith and consensus. If livestock numbers decrease within the auqash range, that does not affect the zakat already fixed at the established nisab.</p>

<p>As for what may be taken by the collector, it is obligatory to take an average animal, not the best and not the worst, not a defective one unless all are like that, not a pregnant one or one that has just given birth, and not a breeding male unless all are males or the texts explicitly allow it, as in the case of a tabi‘ among cattle. If the required age category is not found, then the system of compensation adjustment (jubran) applies in camels, by moving one or two levels up or down and paying the difference with two sheep or twenty dirhams according to the details of the madhhab. With cattle and sheep, jubran does not apply according to the Hanbalis because there is no text establishing it.</p>
    `
  },
  {
    title: "Zakat on Minerals and Ancient Buried Treasur",
    body: `
     <div class="fiqh-image">
  <img src="assets/images/tambang.png" alt="Zakat Illustration">
</div>

<p>The jurists differed regarding the definition of minerals, ancient buried treasure, or treasure troves, as well as the kinds of minerals on which zakat is due and the amount due on each type of mineral and buried treasure.</p>

<p>According to the Hanafis, minerals are the same as ancient buried treasure. According to the majority of scholars, however, they are different. The minerals on which zakat is due are gold and silver according to the Malikis and Shafi‘is, and, according to the Hanafis, every substance that can be shaped by fire. According to the Hanbalis, this includes all solid and liquid minerals.</p>

<p>As for minerals, their zakat is one-fifth according to the Hanafis, and 2.5% according to the Shafi‘is, Malikis, and Hanbalis. As for ancient buried treasure, its due is one-fifth by the agreement of the scholars. This will become clear through the following details.</p>

<p>It should be noted that, according to the majority of scholars, what is due on minerals is zakat, whereas according to the Hanafis it is treated like war booty (ghanimah). As for ancient buried treasure, according to the majority it is treated as ghanimah for the public interest, while according to the Shafi‘is it is distributed to the recipients of zakat.</p>

<p>With regard to minerals, reaching the nisab is a condition according to the agreement of the scholars. In the case of ancient buried treasure, reaching the nisab is not required according to the majority, whereas according to the Shafi‘is it is required.</p>

<p>Minerals and ancient buried treasure, even if they are of gold and silver, are treated as distinct categories because they are connected to special rulings, such as whether haul is required and the percentage to be given to those entitled.</p>

<p><strong>The Hanafi Madhhab</strong></p>

<p>According to the Hanafi school, minerals, ancient remains, or treasure troves all have the same meaning: all wealth buried beneath the earth.</p>

<p>However, minerals are what Allah Almighty created within the earth at the time He created it, whereas ancient buried treasure or treasure troves are wealth buried by the work of disbelievers.</p>

<p>Minerals are of three types:</p>

<p>First, solid substances that can melt and be shaped by fire, such as gold, silver, iron, copper, lead, and mercury. These are the ones on which zakat is due, namely one-fifth, even if they have not reached the nisab.</p>

<p>Second, solid substances that cannot melt and cannot be shaped by fire, such as lime, arsenic, and other stones.</p>

<p>Third, liquid substances, not solid, such as asphalt and petroleum.</p>

<p>Zakat is due only on the first category, whether it is found in kharaji land or ‘ushri land. The one-fifth is distributed to those entitled to receive shares of war booty.</p>

<p>Their proof is the statement of Allah Almighty: “And know that whatever you acquire as spoils of war, then indeed one-fifth of it is for Allah...” (al-Anfal: 41).</p>

<p>Minerals are treated like ghanimah because previously they were in lands under the possession of disbelievers, and the Muslims came to possess them by force.</p>

<p>As for the Sunnah, it is the saying of the Prophet Muhammad ﷺ: “Injuries caused by animals are without liability, wells are without liability, mines are without liability, and on buried treasure there is one-fifth.”</p>

<p>Buried treasure includes both minerals and treasure troves, whether they are from the creation of Allah or the work of people.</p>

<p>As for analogy, minerals are analogized to pre-Islamic treasure because both carry the meaning of ghanimah, and therefore one-fifth becomes obligatory.</p>

<p>What remains after the one-fifth, if it is found in owned land, belongs to the owner of the land. If it is found in land owned by no one, such as deserts and mountains, then it belongs to the discoverer.</p>

<p>The one-fifth on buried treasure is due if there is a sign of Jahiliyyah, such as idols, crosses, and the like. If there is an Islamic sign, such as the shahadah or the name of a Muslim ruler, then it is considered lost property (luqatah), and no one-fifth is due on it.</p>

<p>Likewise, according to Abu Hanifah, one-fifth is not due if minerals or buried treasure are found in state-owned land, because they are regarded as part of the land formed within it, and no war-based acquisition applies to them.</p>

<p>Abu Hanifah’s two students said that one-fifth is due, because of the general wording of the hadith: “And on buried treasure there is one-fifth,” without distinguishing between land and territory, whereas Abu Hanifah did distinguish between them.</p>

<p>No zakat is due on the latter two categories of minerals—those not shaped by fire and those that are liquid—except mercury, because it resembles lead.</p>

<p>No zakat is due on turquoise found in mountains because of the Prophet’s statement: “There is no one-fifth due on stones.”</p>

<p>No zakat is due on jewels, ambergris, sea animals, or anything brought forth from the sea as adornment, even if it be gold in the form of treasure, because there is no forcible acquisition involved and thus no ghanimah, unless it is prepared for trade.</p>

<p><strong>The Ruling of Treasure Troves (Ancient Buried Treasure)</strong></p>

<p>As for treasure troves or ancient buried treasure, one-fifth is due if they are found in land belonging to no one, based on the hadith mentioned above.</p>

<p>The same ruling applies to everything found beneath the ground, such as weapons, tools, garments, and the like, because such items are treated like ghanimah and hold the same status as gold and silver.</p>

<p>Whoever enters Dar al-Harb under a pledge of safety and then finds treasure in someone’s house must return it, so as not to commit betrayal, because whatever is inside a house is considered the private property of its owner.</p>

<p>If he does not return it and brings it into Dar al-Islam, then he has acquired it in an unlawful manner and must give it away in charity.</p>

<p>If he finds it in the open desert of Dar al-Harb, then it belongs to the finder, because it is not the private property of anyone and does not involve betrayal.</p>

<p><strong>The Maliki Madhhab on Minerals and Ancient Buried Treasure</strong></p>

<p>According to the Maliki school, minerals are not the same as ancient buried treasure. Minerals are things created by Allah Almighty in the earth, whether gold, silver, or other substances such as copper, lead, sulfur, and the like, and they must be extracted and refined.</p>

<p>In terms of ownership, minerals have three situations:</p>

<p>First, if the mineral is found in unowned land, then it belongs to the ruler, who may assign it to any Muslim or place it in the Bayt al-Mal for the public interest, not for himself personally.</p>

<p>Second, if the mineral is found in land privately owned by someone, then according to the stronger opinion it still belongs to the ruler, not to the owner of the land, although there is another opinion that it belongs to the landowner.</p>

<p>Third, if the mineral is found in land owned by unspecified persons, such as land acquired by force or by treaty, then land acquired by force belongs to the ruler, whereas treaty land belongs to its owners so long as they remain non-Muslim. If they embrace Islam, then its matter returns to the ruler.</p>

<p>In summary, the general ruling is that minerals belong to the ruler, except in treaty land so long as its inhabitants remain non-Muslim.</p>

<p>The zakat on minerals according to the Malikis is 2.5% if the nisab is reached, with the conditions of Islam and freedom as in other zakat obligations, and haul is not required. Its zakat is paid immediately, like crops.</p>

<p>The only minerals on which zakat is due are gold and silver, not other minerals such as copper, lead, mercury, and the like, unless they are prepared for trade.</p>

<p>The difference between the Malikis and the Hanafis is whether minerals are included under rikaz. The Hanafis include them, so one-fifth is due, whereas the Malikis do not include them, so the due is 2.5%.</p>

<p>If a mineral is extracted a second time, it is combined with the first extraction so long as it comes from the same vein. If together they reach the nisab, zakat is due, even if they were extracted at different times. One vein is not combined with another, just as one mineral source is not combined with another.</p>

<p>An exception is the <em>nadrah</em>, meaning a piece of pure gold or silver that can easily be separated from the earth without significant processing. In that case, one-fifth is due even if it is below the nisab, and it is distributed like ghanimah for the public interest, similar to the Hanafi position on metals that can be melted by fire.</p>

<p><strong>Ancient Buried Treasure According to the Malikis</strong></p>

<p>As for ancient buried treasure according to the Malikis, it is a Jahiliyyah hoard, whether of gold, silver, or otherwise. If there is doubt whether it is from Jahiliyyah or not, it is treated as Jahiliyyah treasure.</p>

<p>Its ownership depends on where it is found.</p>

<p>If it is found in desert land and it is a Jahiliyyah hoard, then it belongs to the finder.</p>

<p>If it is found in someone’s land, then it belongs to the original owner of the land—the one who first reclaimed it or inherited it—not to the finder or the latest buyer, unless the original seller is known.</p>

<p>If it is found in conquered land, then it belongs to the finder.</p>

<p>If it is found in treaty land, then it belongs to the finder.</p>

<p>All this applies so long as there is no Islamic sign on it. If there is an Islamic sign, then it is treated as lost property and must be announced for one year.</p>

<p>The due on ancient buried treasure according to the Malikis is one-fifth in all cases, whether it be gold, silver, or otherwise, whether found by a Muslim or non-Muslim, and it is distributed for the public interest.</p>

<p>If extracting it requires substantial expense, then the due is 2.5% and it is distributed to the recipients of zakat.</p>

<p>Reaching the nisab is not a condition in buried treasure according to them.</p>

<p>What remains after the due is paid belongs to the finder, except if it is found in someone else’s land, in which case it follows the ownership of that land.</p>

<p>There is no due on what the sea throws out, such as ambergris, jewels, coral, and fish, and it belongs to the finder without zakat, unless it is known to be from a Jahiliyyah hoard, in which case one-fifth is due.</p>

<p>If it is known to belong to a Muslim or a dhimmi, then it is treated as lost property.</p>

<p><strong>The Shafi‘i Madhhab on Minerals and Ancient Buried Treasure</strong></p>

<p>According to the Shafi‘i school, minerals are not the same as ancient buried treasure. Minerals are things extracted from a place in the earth created by Allah Almighty, and this applies only to gold and silver, in line with the Maliki view.</p>

<p>Minerals are subject to zakat at 2.5% if they are gold or silver and reach the nisab, not if they are other things such as rubies, aquamarine, copper, iron, and the like, unless they are intended for trade.</p>

<p>Whether the mineral is found in open land or in land owned by a free Muslim, the zakat obligation still applies because of the generality of the evidences concerning zakat.</p>

<p>Reaching the nisab is required, just as in the other schools, but haul is not required in this madhhab, because haul is a condition for the completion of growth, while minerals are considered self-generating and therefore resemble crops and fruits.</p>

<p>Different extractions of the same mineral may be combined to complete the nisab if they are of the same kind and the work is continuous.</p>

<p>It is also required that the place of extraction be the same. If the place differs, they are not combined because that usually indicates the start of a new operation.</p>

<p>If the work is interrupted بسبب an excuse such as repairing tools, illness, or some other cause, then the later extraction is still combined with the earlier one even if a long time passes, because this does not indicate abandonment of the work.</p>

<p>If the interruption occurs without excuse, then they are not combined.</p>

<p>The second extraction is combined with the first, and it may also be combined with other wealth in completing the nisab.</p>

<p>Its zakat is paid after it is melted and purified. If it is given before purification, that does not fulfill the obligation.</p>

<p><strong>Ancient Buried Treasure According to the Shafi‘is</strong></p>

<p>As for ancient buried treasure according to the Shafi‘is, it is a hoard of the people of Jahiliyyah.</p>

<p>One-fifth is due on it, as established in the Hanafi school as well, with the conditions of zakat such as freedom, Islam, and reaching the nisab.</p>

<p>The treasure must be gold or silver that can be coined or melted.</p>

<p>Haul is not required, and it is distributed like zakat according to the well-known opinion.</p>

<p>The proof for the one-fifth is the hadith: “On buried treasure there is one-fifth.”</p>

<p>If the found item is not a Jahiliyyah hoard but belongs to the Islamic era because of the presence of an Islamic sign or because its origin is unknown, then it is considered the property of its owner or his heirs if known.</p>

<p>If the owner is unknown, then it is announced for one year like lost property.</p>

<p>If it is found in someone’s land and the owner claims it, then he is entitled to it without needing an oath.</p>

<p>If he does not claim it, then it is referred back to previous owners until it reaches the first person who reclaimed the land.</p>

<p>If it is found in a mosque or on a public road, then it is treated as lost property because it may belong to an unknown Muslim.</p>

<p>If there is a dispute between seller and buyer, or tenant and owner, regarding ownership of the buried treasure, then the person in possession of the property is believed with an oath, just as in disputes over household goods.</p>

<p><strong>The Hanbali Madhhab on Minerals and Ancient Buried Treasure</strong></p>

<p>According to the Hanbali school, minerals are not the same as ancient buried treasure. Minerals are anything taken from the earth that Allah Almighty created within it, and which is not itself part of the earth, whether solid or liquid.</p>

<p>The ownership of minerals follows the ownership of the land in which they are found, because they are treated as part of the land. Therefore, whatever is found in someone’s land belongs to the owner of the land. If it is found in dead land, then the first person who works it has more right to it; if he abandons it, then someone else may take it.</p>

<p>As for liquid minerals such as oil and arsenic, they are permissible resources, but it is not allowed to enter another person’s land without permission.</p>

<p>The minerals on which zakat is due are everything that emerges from the earth and was created within it, whether gold, silver, iron, lead, copper, mercury, rubies, aquamarine, crystal, agate, arsenic, asphalt, crude oil, sulfur, and the like.</p>

<p>If it reaches the nisab—namely twenty mithqals of gold or two hundred dirhams of silver, or their equivalent—then 2.5% is due immediately upon extraction. Haul is not required because it is acquired at once, like crops and fruits.</p>

<p>The proof is the statement of Allah in al-Baqarah 267 about spending from what is brought forth from the earth. Its nisab follows the nisab of gold and silver. Haul is not required for minerals because they are not wealth awaiting annual growth.</p>

<p>If a mineral is extracted through several diggings and the work is still ongoing, then the extractions are combined to complete the nisab. If the work is abandoned, then it is considered interrupted and is not combined, except if the interruption is due to an excuse such as illness or tool repair.</p>

<p>One type is not combined with another except gold and silver, which may complete each other’s nisab.</p>

<p><strong>Ancient Buried Treasure According to the Hanbalis</strong></p>

<p>As for ancient buried treasure according to the Hanbalis, it is a Jahiliyyah hoard—that is, the wealth of disbelievers acquired during the Islamic era, whether small or large.</p>

<p>One-fifth is due on it based on the hadith: “Mines are without liability, and on buried treasure there is one-fifth.”</p>

<p>The one-fifth is distributed for the public interest like fay’ according to the strongest opinion in the madhhab, while the remainder belongs to the finder if no owner claims it.</p>

<p>If it is found in Dar al-Harb and can only be seized through military force, then it becomes war booty. If it can be taken without warfare, then it belongs to the finder, just as if it were found in dead land among the Muslims.</p>

<p>Ancient buried treasure on which one-fifth is due includes every form of wealth, such as gold, silver, iron, lead, copper, vessels, and the like, based on the general wording of the hadith regarding rikaz.</p>

<p>One-fifth is due from every finder, whether Muslim, dhimmi, free, slave, adult, child, sane, or insane, according to the majority of scholars. The Shafi‘is require the normal conditions of zakat.</p>

<p>If the treasure contains Islamic signs, such as Qur’anic verses, the name of the Prophet, or the name of an Islamic ruler, then it is treated as lost property and must be announced for one year.</p>

<p>There is no zakat on things extracted from the sea, such as jewels, coral, ambergris, and fish, because there is no evidence making it obligatory, and because neither the Prophet ﷺ nor the caliphs ever took zakat from such sea products.</p>
    `
  },
   {
    title: "Zakat Distribution (Tawzi‘ al-Zakah)",
    body: `
      <p><strong>The Categories Entitled to Receive Zakat (Ashnaf al-Zakat)</strong></p>

  <p>Allah Almighty has restricted those entitled to receive zakat in Surah al-Tawbah, verse 60: the poor (faqir), the needy (miskin), zakat workers, those whose hearts are to be reconciled, slaves (riqab), debtors (gharim), those in the cause of Allah, and the stranded traveler (ibn al-sabil). The verse states that zakat is only for these categories as an obligation from Allah. The word <em>innama</em> in the verse indicates restriction, so zakat may not be given to anyone besides these eight categories. The hadith of the Prophet ﷺ to Mu‘adh ibn Jabal when he sent him to Yemen also explains that zakat is taken from their wealthy and returned to their poor. This hadith is evidence that zakat is to be distributed to those entitled to it, and it is a basis for the Maliki school and others in holding that zakat is valid even if given to one category only.</p>

  <p>The Shafi‘i scholars hold that obligatory zakat, whether zakat al-fitr or zakat on wealth, must be distributed among the eight categories if possible, because the verse uses the letter <em>lam</em> indicating ownership and the conjunction <em>waw</em> indicating inclusion of all. If the imam distributes it, then it is divided into eight shares, with the zakat workers given priority because their share is considered compensation for their labor. If the owner distributes it himself and not all categories are present, then it is given to those who are present. They recommend that each category be given to at least three persons because the plural form indicates at least three. However, the majority of scholars—the Hanafis, Malikis, and Hanbalis—permit zakat to be given to one category only, and even to one person from that category. They argue that the verse merely restricts who is eligible, not that it requires equal distribution among all of them.</p>

  <p>The eight categories are explained as follows. The faqir is someone who has neither wealth nor work that is sufficient for his needs, and who has no spouse or relative providing for him, such that his needs are far from being met. The miskin is someone who has some income or work, but it is still insufficient for his needs. According to the Shafi‘is and Hanbalis, the faqir is in a worse condition than the miskin, because the faqir does not possess even half of what he needs, while the miskin has more than half but still does not have enough. Their evidence includes Allah’s statement in Surah al-Kahf, verse 79, concerning the boat belonging to the poor, as well as the Prophet’s supplication asking to live in a state of need and to seek refuge from destitution. According to the Hanafis and Malikis, however, the miskin is in a worse condition than the faqir, based on Surah al-Balad, verse 16.</p>

  <p>The zakat worker (‘amil) is the person appointed to collect and distribute zakat. He must be upright, knowledgeable in the fiqh of zakat, able to write and calculate, and trustworthy. He may receive zakat as compensation for his work even if he is rich. The mu’allaf are those whose hearts are to be reconciled, whether they are Muslims with weak faith or non-Muslims whose conversion is hoped for or whose harm is feared. The Prophet ﷺ gave zakat shares to Abu Sufyan, Safwan ibn Umayyah, and others in order to soften their hearts. The Hanafis and Malikis held that the share of the mu’allaf has ceased because Islam has become strong, whereas the majority hold that this share remains whenever a need exists.</p>

  <p>The category of riqab refers to slaves under contract (mukatab) who are trying to purchase their freedom and do not possess sufficient wealth, or according to the Malikis and Hanbalis, it may also be used to buy slaves and free them. The gharim is the person burdened by debt and unable to repay it, whether the debt was for lawful personal needs or incurred in reconciling others. <em>Fi سبيل الله</em>, according to the majority, refers to fighters striving in the cause of Allah who do not have a regular salary. Some Hanafis include seekers of religious knowledge in this category, and some Hanbalis include Hajj under it. Ibn al-sabil is the traveler who has run out of provisions on a lawful journey and cannot reach his destination except with assistance, even if he is wealthy in his homeland.</p>

  <p>The majority of scholars agree that zakat may not be given for the construction of mosques, bridges, roads, irrigation works, burial shrouds, or other public acts of worship not specifically mentioned in the verse. Some Hanafis, however, expanded the meaning of <em>fi sabilillah</em> to include all forms of goodness and devotion. As for the amount to be given, the Shafi‘is and Hanbalis permit giving the poor and needy enough to satisfy their needs, even capital for work if needed, whereas the Malikis limit it to what suffices for one year. The zakat worker is given according to his labor, the debtor according to his debt, and the stranded traveler according to the needs of his journey.</p>

  <p>Zakat is not valid if given to someone who is not entitled to it. If it is given because someone was thought to be poor and then turns out to be rich or non-Muslim, then according to the Malikis, Shafi‘is, and the preferred Hanbali view, the zakat obligation has not been discharged and it must be retrieved if possible. Zakat must be given to Muslims, except in the case of the mu’allaf according to the Malikis and Hanbalis. According to the majority, it may not be given to Banu Hashim, based on the hadith that zakat is the impurities of people’s wealth and is not lawful for the family of Muhammad ﷺ. Nor may it be given to those whom the payer is obliged to support, such as parents, children, and wife, because the benefit returns to himself. But it may be given to other relatives, and indeed that is more virtuous because it earns both the reward of charity and the reward of maintaining kinship ties.</p>

  <p>According to the Hanafis, a rich person is one who possesses a nisab in excess of basic needs. According to the Malikis, it is one who has enough for a year. According to the Shafi‘is, it is one whose needs are generally covered for his lifetime. According to the Hanbalis, it is one who possesses fifty dirhams, or its equivalent in gold, or has ongoing sufficient means. A person capable of working is not entitled to zakat unless he devotes himself to sacred knowledge and cannot combine earning with study.</p>

  <p>Zakat may not be given directly to a slave, a minor, or an insane person except through their guardian. According to the majority, it may not be given to a non-Muslim, although Abu Hanifah allowed voluntary charity other than zakat to a dhimmi. It should not be given to someone outside the region where the zakat was collected unless there is a valid interest. Therefore, the recipient of zakat must fulfill the conditions of being Muslim—except for the mu’allaf according to some—must not be from Banu Hashim according to the majority, must not be someone whom the zakat payer is obligated to support, must not be rich, and must belong to one of the eight categories specified by Allah Almighty in the Qur’an.</p>

  <p><strong>The Ruling on Transferring Zakat, the Time of Payment, and the Etiquette of Distribution</strong></p>

  <p>The scholars differed regarding the ruling on transferring zakat from one region to another. In principle, zakat is to be distributed among the poor and needy of the region in which it was collected. This is based on the hadith of Mu‘adh ibn Jabal when he was sent to Yemen, in which the Prophet ﷺ said that zakat is taken from their wealthy and given to their poor. The phrase “their poor” indicates that zakat should be distributed in the same locality.</p>

  <p>According to the Hanafis, transferring zakat to another region is disliked if there are still people in the original region who are entitled to receive it. However, it may be transferred if there are relatives in the other region who are more in need, or if the need there is more urgent, or if there is a greater public interest. If it is transferred while there were more deserving people in the original region, then it is still valid, though disliked.</p>

  <p>According to the Malikis, zakat may not be transferred from the region where the wealth is located beyond the travel distance of qasr (about two marhalahs), unless there is no one entitled to it in that region. If it is nevertheless transferred without a valid reason, then according to some reports it must be repeated, because this is regarded as contrary to the prescribed rule.</p>

  <p>According to the Shafi‘is, zakat may not be transferred from the region where the wealth is located if there are still eligible recipients there. If it is transferred while eligible recipients remain, then the transfer is invalid and it must be redone. But if there are no recipients at all, then it must be sent to the nearest region.</p>

  <p>According to the Hanbalis, transferring zakat is disliked if there is no need, but it is still valid. If there is a need, such as relatives who are more deserving or a greater public interest, then it is not disliked.</p>

  <p>Zakat must be paid immediately once its conditions are fulfilled, such as reaching the nisab and completing the haul. It is not permissible to delay its distribution without excuse. If someone delays distributing zakat while able to pay it and the wealth is later destroyed, then he is still responsible for the zakat because of his negligence. However, if the delay is for the sake of waiting for a more deserving recipient or to seek someone more in need, then it is permissible so long as the delay is not excessive.</p>

  <p>The majority of scholars permit the early payment of zakat before the haul is complete, provided that the nisab has already been reached, based on the report that the Prophet ﷺ accepted zakat from al-‘Abbas before its due time. But it is not permissible to pay it before reaching the nisab, because the cause of the obligation does not yet exist. As for delaying payment after it becomes due without a valid excuse, that is forbidden, because zakat is the right of others that has become obligatory to discharge.</p>

  <p>Regarding payment of zakat in monetary value (<em>al-qimah</em>), the scholars differed. The Hanafis allow paying zakat in cash value, because the purpose of zakat is to meet the needs of the poor and monetary value may be more beneficial. The majority—Malikis, Shafi‘is, and Hanbalis—do not permit replacing zakat with monetary value except in cases of necessity or clear public interest, because the Prophet ﷺ specified certain forms in livestock and agricultural zakat.</p>

  <p>It is recommended for the zakat payer to conceal his zakat so as to be more sincere and to avoid showing off, based on Allah’s statement in Surah al-Baqarah, verse 271. But if making it public serves a benefit, such as encouraging others, then that too is good. It is recommended to give priority to poor relatives, because that combines the reward of charity with the reward of maintaining family ties. It is not permissible to remind people of one’s generosity or hurt the feelings of the recipient, because that can nullify the reward.</p>
    `
  },
   {
    title: "References",
    body: `

  <p>Az-Zuhaili, Wahbah. <em>Al-Fiqh al-Islami wa Adillatuh</em>. 10 vols. Damascus: Dar al-Fikr, 1985.</p>

  <p>Ibn al-Humam, Kamal al-Din. <em>Fath al-Qadir</em>. Beirut: Dar al-Fikr, n.d.</p>

  <p>An-Nawawi, Yahya ibn Sharaf. <em>Al-Majmu‘ Sharh al-Muhadhdhab</em>. Beirut: Dar al-Fikr, n.d.</p>

  <p>Ibn Qudamah, Muwaffaq al-Din. <em>Al-Mughni</em>. Beirut: Dar al-Kutub al-‘Ilmiyyah, 1994.</p>

  <p>Ad-Dasuqi, Muhammad ibn Ahmad. <em>Hashiyah ad-Dasuqi ‘ala ash-Sharh al-Kabir</em>. Beirut: Dar al-Fikr, n.d.</p>

  <p>Al-Kasani, ‘Ala’ al-Din. <em>Bada’i‘ as-Sana’i‘ fi Tartib ash-Shara’i‘</em>. Beirut: Dar al-Kutub al-‘Ilmiyyah, 1986.</p>

  <p>Al-Marghinani, Burhan al-Din. <em>Al-Hidayah fi Sharh Bidayat al-Mubtadi</em>. Beirut: Dar Ihya’ at-Turath al-‘Arabi, n.d.</p>
    `
  }

],
        ctaTitle: "Pay Your Zakat Now",
        ctaBody: "Calculate your zakat easily and distribute it through trusted institutions.",
        ctaButtons: ["Start Calculating", "Pay via BAZNAS"],
        footer: ["About", "FAQ", "Contact", "Privacy Policy", "Disclaimer"],
        footerCopy: "(c) 2026 Islamic Literacy Portal - All rights reserved."
      },
      ar: {
        pageTitle: "شرح الزكاة | بوابة الثقافة الإسلامية",
        brand: "بوابة الثقافة الإسلامية",
        nav: ["الرئيسية", "حاسبة الزكاة"],
        heading: "ملخص أنواع الزكاة",
        tableHead: ["نوع الزكاة", "وعاء الزكاة", "النصاب", "المقدار", "وقت الأداء", "ملاحظات فقهية"],
        fiqhTitle: "شرح فقهي موجز للزكاة",
        rows: [
          ["زكاة الفطر", "قوت البلد", "صاع واحد", "صاع للفرد", "قبل صلاة العيد", "واجبة على المسلم القادر."],
          ["زكاة الذهب", "الذهب المدخر", "85 جراما", "2.5%", "بعد حول", "تجب ببلوغ النصاب وتمام الحول."],
          ["زكاة الأسهم", "الأسهم والصكوك", "قيمة 85 جرام ذهب", "2.5%", "بعد حول", "الأسهم المتداولة تتبع زكاة التجارة."],
          ["زكاة الفضة", "الفضة المدخرة", "595 جراما", "2.5%", "بعد حول", "النصاب الكلاسيكي 200 درهم."],
          ["زكاة الدخل", "الراتب والدخل", "85 جرام ذهب سنويا", "2.5%", "شهريا أو سنويا", "اجتهاد معاصر بالقياس على زكاة المال."],
          ["زكاة التجارة", "أموال التجارة", "قيمة 85 جرام ذهب", "2.5%", "كل حول", "تحسب من صافي أموال التجارة بعد خصم الديون الحالة."],
          ["زكاة الزروع", "المحصول", "خمسة أوسق", "5% أو 10%", "وقت الحصاد", "العشر للري الطبيعي ونصف العشر للري بالكلفة."],
          ["زكاة الأنعام", "الإبل والبقر والغنم", "بحسب النوع", "حسب الجداول", "بعد حول", "تجب في السائمة إذا بلغت النصاب."],
          ["زكاة الركاز", "الكنز المدفون", "لا نصاب", "20%", "عند العثور", "لقوله: وفي الركاز الخمس."],
          ["زكاة المعادن", "المعادن المستخرجة", "لا يشترط الحول", "2.5% أو 20%", "عند الاستخراج", "الجمهور على 2.5% وبعض الأقوال على 20%."]
        ],
        cards: [
         {
    title: "مقدمة الزكاة",
    body: `
  <p><strong>أ. تعريف الزكاة</strong></p>

  <p>الزكاة في اللغة هي النماء والزيادة. وكان العرب يقولون: زكا الزرع إذا نما وزاد. ويقال أيضًا: زكت النفقة إذا بورك فيها. وقد تُستعمل الزكاة بمعنى الطهارة. قال الله سبحانه وتعالى: «قَدْ أَفْلَحَ مَنْ زَكَّاهَا» (الشمس: 9)، وقال: «قَدْ أَفْلَحَ مَنْ تَزَكَّى» (الأعلى: 14). كما يُستعمل مشتق الزكاة بمعنى المدح، قال الله تعالى: «فَلَا تُزَكُّوا أَنْفُسَكُمْ» (النجم: 32). وتُستعمل أيضًا بمعنى الصلاح، فيقال: رجل زكي، أي كثير الخير، ورجل من قوم أزكياء، أي من قوم صالحين. ويقال: زكّى القاضي الشهود، أي بيّن فضلهم في الخير.</p>

  <p>والمال الذي يُخرج في الشرع يسمى زكاة لأن الزكاة تنمّي المال المخرج وتدفع عنه الآفات. قال الله تعالى: «وَآتُوا الزَّكَاةَ» (البقرة: 43). وهذه المعاني اللغوية تظهر في قوله تعالى: «خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِمْ بِهَا» (التوبة: 103). فالزكاة تطهر مُخرجها من الذنوب، وتنمّي أجره وماله.</p>

  <p>والزكاة في الشرع هي حق واجب في المال. وقد عرّفها المالكية بأنها إخراج جزء مخصوص من مال مخصوص بلغ النصاب لمستحق مخصوص إذا تم الملك والحول، إلا في المعدن والزروع والركاز. وعرّفها الحنفية بأنها تمليك جزء مخصوص من مال مخصوص لشخص مخصوص عيّنه الشرع خالصًا لله تعالى. وعبارة «تمليك» تخرج مجرد الإطعام بلا نقل ملكية. وعرّفها الشافعية بأنها اسم لما يخرج من مال أو بدن إلى جهة مخصوصة. وعرّفها الحنابلة بأنها حق واجب في مال مخصوص لطائفة مخصوصة في وقت مخصوص.</p>

  <p>والطائفة المخصوصة هي الأصناف الثمانية المذكورة في قوله تعالى: «إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ...» (التوبة: 60). والوقت المخصوص هو تمام الحول في بهيمة الأنعام والنقود وعروض التجارة، واشتداد الحب في الحبوب، وبدو صلاح الثمر في الثمار، وحصول الوجوب في العسل والمعادن، وغروب شمس ليلة عيد الفطر في زكاة الفطر.</p>

  <p><strong>ب. حكمة الزكاة</strong></p>

  <p>التفاوت بين الناس في الرزق أمر واقع يحتاج في الشريعة إلى معالجة. قال الله سبحانه وتعالى: «وَاللَّهُ فَضَّلَ بَعْضَكُمْ عَلَىٰ بَعْضٍ فِي الرِّزْقِ» (النحل: 71). وقد أوجب الله على الأغنياء أن يؤدوا الحق المقرر للفقراء. قال الله تعالى: «وَفِي أَمْوَالِهِمْ حَقٌّ لِّلسَّائِلِ وَالْمَحْرُومِ» (الذاريات: 19).</p>

  <p>وفرض الزكاة هو الوسيلة الأساسية لمعالجة التفاوت وتحقيق التضامن الاجتماعي في الإسلام. ومن حكم الزكاة حماية المال من أيدي المذنبين. وقد قال رسول الله صلى الله عليه وسلم: «حصّنوا أموالكم بالزكاة، وداووا مرضاكم بالصدقة، وأعدّوا الدعاء للبلاء». والزكاة تعين الفقراء والمساكين، وتهديهم إلى حياة كريمة. وهي تحمي المجتمع من داء الفقر، وتحفظ الدولة من الضعف. وقد ورد عن النبي صلى الله عليه وسلم أن الله فرض على الأغنياء قدرًا من المال يكفي الفقراء، وأن الفقير لا يتألم إلا بسبب تقصير الأغنياء.</p>

  <p>والزكاة كذلك تطهر النفس من داء البخل، وتعود المؤمن على الكرم، وتدفعه إلى المشاركة في الواجبات الاجتماعية مثل إعانة الدولة، وتجهيز الجيوش، ومساعدة الفقراء، وأداء النذور والكفارات، وسائر وجوه البر كالوقف والأضاحي وصدقات التطوع والهبات. وكل ذلك ينمّي روح التضامن الاجتماعي والأخوة في المجتمع. والزكاة أيضًا صورة من صور الشكر على نعمة المال.</p>

  <p><strong>ج. فرضية الزكاة</strong></p>

  <p>الزكاة ركن من أركان الإسلام الخمسة، وقد فرضت في المدينة في شهر شوال من السنة الثانية للهجرة بعد صيام رمضان وزكاة الفطر. وقد قُرنت الزكاة بالصلاة في مواضع كثيرة من القرآن الكريم دلالة على أهميتها. وأدلة وجوب الزكاة هي القرآن والسنة والإجماع.</p>

  <p>قال الله تعالى: «وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ» (البقرة: 43)، وقال: «خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً» (التوبة: 103)، وقال: «وَآتُوا حَقَّهُ يَوْمَ حَصَادِهِ» (الأنعام: 141). وقال النبي صلى الله عليه وسلم: «بني الإسلام على خمس...» وذكر منها إيتاء الزكاة. وقال أيضًا لمعاذ حين بعثه إلى اليمن إن الله فرض صدقة تؤخذ من أغنيائهم فترد على فقرائهم.</p>

  <p>وقد أجمع المسلمون على وجوب الزكاة. واتفق الصحابة على قتال الممتنعين عن أدائها. فمن أنكر وجوبها كفر وارتد، إلا إذا كان جاهلًا بها كحديث عهد بإسلام أو نشأ بعيدًا عن المسلمين.</p>

  <p><strong>د. عقوبة من امتنع عن الزكاة</strong></p>

  <p>من امتنع عن أداء الزكاة فله عقوبة في الآخرة وفي الدنيا. قال الله تعالى: «وَالَّذِينَ يَكْنِزُونَ الذَّهَبَ وَالْفِضَّةَ وَلَا يُنفِقُونَهَا فِي سَبِيلِ اللَّهِ فَبَشِّرْهُم بِعَذَابٍ أَلِيمٍ...» (التوبة: 34–35).</p>

  <p>وقال النبي صلى الله عليه وسلم إن المال الذي لا تؤدى زكاته يتحول يوم القيامة إلى حيّة تطوق صاحبه. وفي رواية أخرى أن أصحاب الذهب والفضة الذين لا يؤدون زكاتها يُكوون بها في نار جهنم.</p>

  <p>وأما العقوبة الدنيوية، فإن الزكاة تؤخذ قهرًا، بل ويُقاتَل قوم إذا امتنعوا عن أدائها. وقد قال أبو بكر الصديق رضي الله عنه إنه سيقاتل من فرّق بين الصلاة والزكاة.</p>

  <p><strong>2. سبب الزكاة وشروطها وأركانها</strong></p>

  <p>قال الحنفية إن سبب الزكاة هو ملك نصاب نامٍ، ولو كان نموه تقديريًا، بشرط تمام الحول القمري لا الشمسي، وألا يكون على صاحبه دين يطالب به، وأن يكون المال زائدًا عن حاجاته الأصلية. فالسبب والشرط متعلقان بوجود المال. فمن لم يملك نصابًا فلا زكاة عليه. ولذلك لا زكاة في الوقف لعدم الملك، ولا في المال الذي يملكه العدو في دياره. والنصاب هو المقدار الذي جعله الشرع علامة على وجوب الزكاة، مثل مائتي درهم أو عشرين دينارًا.</p>

  <p>ولا تجب الزكاة في المال الذي لم يُقبض بعد لعدم تمام الملك. ولا تجب في الحاجات الأصلية كاللباس، والمسكن، وأثاث المنزل، والمركب، والسلاح، والكتب، وآلات المهنة إذا لم تُنوَ للتجارة. ولا زكاة في المال الضائع، أو الساقط في البحر، أو المغصوب بلا بينة، أو المدفون الذي نُسي مكانه، أو الوديعة المنسية، أو الدين الذي أُنكر بلا بينة حتى يثبت. ودليل ذلك الحديث: «لا زكاة في الضمار» أي المال الغائب الذي لا يُرجى رجوعه.</p>

  <p>ولا زكاة في المال الذي لم يتم عليه الحول. ولا زكاة في الجواهر واللؤلؤ والياقوت والزبرجد والمرجان، إلا إذا كانت للتجارة. وجمهور العلماء لا يوجبون الزكاة في بهيمة الأنعام المعلوفة أو المستخدمة في العمل، إلا عند المالكية.</p>

  <p>وركن الزكاة هو إخراج جزء من النصاب بقطع الملك عنه، وتسليمه إلى الفقير أو إلى من ينوب عنه كالإمام أو العامل.</p>

  <p><strong>شروط وجوب الزكاة</strong></p>

  <p>تجب الزكاة على الحر المسلم البالغ العاقل إذا ملك نصابًا ملكًا تامًا، وتم عليه الحول.</p>

  <p><strong>الحرية</strong></p>
  <p>لا تجب الزكاة على العبد لأنه لا يملك مالًا. ويرى جمهور العلماء أن الزكاة تجب على سيده. وقال المالكية: لا زكاة على العبد ولا على سيده.</p>

  <p><strong>الإسلام</strong></p>
  <p>لا تجب الزكاة على الكافر بالإجماع. وذهب الشافعية إلى وجوب الزكاة في مال المرتد قبل ردته. وأسقطها أبو حنيفة عنه. وتؤخذ من الكفار العشور في صور معينة بحسب تفصيل المذاهب.</p>

  <p><strong>البلوغ والعقل</strong></p>
  <p>اعتبر الحنفية البلوغ والعقل شرطًا، بينما لم يشترطهما جمهور العلماء، فتصح الزكاة في مال الصبي والمجنون، ويخرجها الولي عنهما.</p>

  <p><strong>أن يكون المال من الأموال الزكوية النامية</strong></p>
  <p>وهي الذهب والفضة، والنقود الورقية، والمعادن، والركاز، وعروض التجارة، والزروع، والثمار، وبهيمة الأنعام. ولا زكاة في غير المال النامي إلا إذا كان للتجارة.</p>

  <p><strong>بلوغ النصاب</strong></p>
  <p>فنصاب الذهب عشرون مثقالًا، ونصاب الفضة مائتا درهم، ونصاب الحبوب والثمار خمسة أوسق، ونصاب الغنم أربعون، والإبل خمس، والبقر ثلاثون.</p>

  <p><strong>الملك التام</strong></p>
  <p>اشترط الحنفية الملك الأصلي واليد، واشترط المالكية الملك مع القدرة على التصرف، واشترط الشافعية الملك التام وإمكان التصرف، واشترط الحنابلة كذلك الملك مع حرية التصرف.</p>

  <p><strong>تمام الحول</strong></p>
  <p>اتفق العلماء على اشتراط الحول في الذهب والفضة وبهيمة الأنعام وعروض التجارة. ولا يُشترط في الزروع والثمار والمعادن والركاز. واشترط الحنفية وجود النصاب كاملًا في أول الحول وآخره، بينما اشترط الجمهور استمراره طوال الحول.</p>

  <p><strong>عدم الدين</strong></p>
  <p>اشترط الحنفية والحنابلة أن الدين قد يمنع الزكاة في صور مفصلة. وفرّق المالكية بين زكاة المال وزكاة الزروع. وذهب الشافعية إلى أن الدين لا يمنع الزكاة.</p>

  <p><strong>الزيادة على الحاجات الأصلية</strong></p>
  <p>اشترط الحنفية أن يكون المال الزكوي زائدًا عن الحاجات الأصلية كالنفقة، والمسكن، واللباس، وآلات العمل، وكتب أهل العلم.</p>

  <p><strong>شروط صحة الزكاة</strong></p>

  <p><strong>النية</strong></p>
  <p>اتفق العلماء على أنها شرط. ومحلها القلب. ولا بد من التمييز بين الزكاة وبين الصدقة المطلقة. ويجوز تقديم النية في حدود معينة بحسب تفصيل المذاهب.</p>

  <p><strong>التمليك</strong></p>
  <p>لا بد من دفع الزكاة إلى المستحق على وجه نقل الملك. فلا يكفي مجرد الإطعام من غير تمليك.</p>

  <p>وأضاف المالكية شروطًا أخرى: أن تخرج بعد وجوبها، وأن تدفع إلى من يستحقها، وأن تكون من جنس المال الواجب فيه الزكاة.</p>

  <p><strong>3. وقت وجوب الزكاة وأدائها</strong></p>

  <p>تجب الزكاة فور تحقق شروطها. فلا يجوز تأخيرها بلا عذر. فإن قدر على أدائها وأخرها أثم.</p>

  <p>فتؤدى زكاة الذهب والفضة والتجارة والأنعام بعد تمام الحول. وتؤدى زكاة الزروع والثمار عند الحصاد بلا اشتراط الحول. وتؤدى زكاة العسل والمعدن عند الحصول عليه. وتجب زكاة الفطر بغروب شمس ليلة عيد الفطر.</p>

  <p>وقد جوّز جمهور العلماء تعجيل الزكاة بعد ملك النصاب، استنادًا إلى حديث العباس رضي الله عنه حين قدم زكاته قبل وقتها. ولم يجز المالكية والظاهرية ذلك.</p>

  <p><strong>4. سقوط وجوب الزكاة</strong></p>

  <p>ذهب الحنفية إلى أن المال إذا تلف بعد وجوب الزكاة سقطت الزكاة، إلا إذا كان التلف بسبب تفريط. وذهب جمهور العلماء إلى أن الزكاة لا تسقط، بل تبقى في ذمة المالك.</p>

  <p>وعند المالكية تفصيل خاص في زكاة الأنعام. وقد ذكر ابن رشد خمسة أقوال في الزكاة التي فُصلت ثم ضاعت: هل لا تُضمن مطلقًا، أو تُضمن مطلقًا، أو تُضمن مع التفريط دون غيره.</p>

  <p>وقد اختلف الفقهاء في سقوط الزكاة بعد وجوبها وتلف المال. فقال الحنفية: إذا تلف المال بعد وجوب الزكاة سقطت، كما تسقط زكاة العشر وخراج الأرض. وعللوا ذلك بأن وجوب الزكاة متعلق بالنصاب تحقيقًا للتيسير، وأن الزكاة إنما تجب مع وجود القدرة الميسِّرة، أي استمرار سهولة الأداء إلى وقت التنفيذ. فإذا تلف المال سقط الواجب، سواء قدر صاحبه على الأداء أم لم يقدر.</p>

  <p>والشرع علّق الوجوب على القدرة الميسِّرة. وما عُلّق على هذه القدرة لا يثبت بدونها. والقدرة الميسرة هنا هي قابلية المال للنماء، لا مجرد وجود النصاب. ولا تسقط الزكاة إذا استُهلك المال مع عدم هذه القدرة بسبب التعدي. وإذا تلف بعض المال سقط من الزكاة بقدره، مراعاةً للجزء مع الكل.</p>

  <p>وأما زكاة الفطر ونفقة الحج، فلا تسقط بتلف المال بعد الوجوب، كما لا يبطل النكاح بموت الشهود. وسبب الفرق أن الزكاة متعلقة بنماء المال، فاشترطت فيها القدرة الميسرة تخفيفًا على الناس، لأن الإنسان لا يكلّف إلا بما يقدر عليه. أما زكاة الفطر ونفقة الحج فليستا متعلقتين بالنماء، بل تجبان في الذمة، ولذلك تشترط فيهما القدرة الممكنة، أي ما تتحقق به إمكانية الأداء.</p>

  <p>وينبغي التنبه إلى أن تلف المال بعد إعارته أو تأجيره أو استبدال عروض التجارة بعروض تجارة أخرى يعد تلفًا لا يضمن معه صاحب المال الزكاة. أما إذا استبدل عروض التجارة بغير عروض التجارة، أو استبدل بهيمة الأنعام بأنعام غير سائمة، فهذا يعد استهلاكًا فيضمن زكاته.</p>

  <p>ويرى جمهور العلماء أن المال إذا تلف بعد وجوب الزكاة فإن الزكاة لا تسقط، بل تبقى في ذمة صاحبه. فإمكان الأداء شرط في الذمة لا في أصل الوجوب. ومن ثبتت عليه فريضة لا تبرأ ذمته بالعجز عن الأداء، كما هو الحال في زكاة الفطر والحج وديون الآدميين.</p>

  <p>فالزكاة حق معين في مال المالك. فإذا تلف المال قبل أن يصل إلى مستحقه لم تبرأ ذمة المالك، كما في دين الآدمي. وإذا فرز الإنسان قدرًا من المال للزكاة ونوى أنه زكاة ثم تلف، بقي ذلك في ذمته ولم تسقط الزكاة، سواء أكان قادرًا على إخراجها أم لا.</p>

  <p>واستثنى المالكية زكاة الأنعام، لأن وجوبها عندهم يتأكد بخروج الساعي وقت تمام الحول. فإذا هلكت الأنعام قبل ذلك لم تضمن الزكاة.</p>

  <p>وذكر ابن رشد خمسة أقوال فيمن أخرج الزكاة ثم ضاعت، كأن تُسرق أو تحترق: الأول أنها لا تُضمن مطلقًا. والثاني أنها تُضمن مطلقًا. والثالث أنها تُضمن مع التفريط دون غيره، وهو المشهور في مذهب مالك. والرابع أنها تُضمن مع التفريط، وإن لم يفرط زكّى الباقي، وهو قول أبي ثور والشافعي. والخامس أن المفقود يحسب من الجميع، فيشترك فيه الفقراء ومالك المال بحسب أنصبائهم من الباقي.</p>

    `
  },
  {
    title: "زكاة الفطر",
    body: `
     <div class="fiqh-image">
  <img src="assets/images/fitri.png" alt="صورة توضيحية للزكاة">
</div>

<p>وفيها خمسة مباحث:</p>
<p>1. مشروعية زكاة الفطر، وحكمها، ومن يُؤمر بأدائها.</p>
<p>2. وقت وجوب زكاة الفطر وحكم تعجيلها وتأخيرها.</p>
<p>3. جنس الواجب فيها: صفته ومقداره.</p>
<p>4. ما يُستحب وما يجوز في زكاة الفطر.</p>
<p>5. الجهات التي تُصرف إليها زكاة الفطر.</p>

<p><strong>1. مشروعية زكاة الفطر وحكمها ومن يؤمر بأدائها</strong></p>

<p>شُرعت زكاة الفطر في السنة الثانية للهجرة، وهي السنة التي فُرض فيها صيام رمضان، قبل الزكاة. ومن أدلة وجوبها:</p>

<p>خبر ابن عمر، كما رواه الجماعة إلا ابن ماجه: «فرض رسول الله صلى الله عليه وسلم زكاة الفطر من رمضان صاعًا من تمر، أو صاعًا من شعير، على كل حر أو عبد، ذكر أو أنثى، من المسلمين». والصاع يساوي قدحين وثلثًا بالمكيال المصري المعاصر، وكان قديمًا يساوي قدحين، أو ثمنية من مُدّ دمشق، المعروفة باسم «الثمنية». وهو يساوي نحو 2751 غرامًا، وعند الحنفية 3800 غرام. وفي هذا الخبر دليل على أن الإسلام شرط في وجوب زكاة الفطر، فلا تجب على الكفار.</p>

<p>وخبر أبي سعيد رضي الله عنه: «كنا نخرج زكاة الفطر، إذ كان فينا رسول الله صلى الله عليه وسلم، صاعًا من طعام، أو صاعًا من تمر، أو صاعًا من شعير، أو صاعًا من زبيب، أو صاعًا من أقط، فلم أزل أخرجه كما كنت أخرجه». والمقصود بالطعام هنا الأرز.</p>

<p>وخبر ابن عباس رضي الله عنهما: «فرض رسول الله صلى الله عليه وسلم زكاة الفطر طهرة للصائم من اللغو والرفث، وطعمة للمساكين، فمن أداها قبل الصلاة فهي زكاة مقبولة، ومن أداها بعد الصلاة فهي صدقة من الصدقات». وفيه دليل على أن زكاة الفطر تُعطى للمساكين، لا لسائر أصناف مستحقي الزكاة.</p>

<p>وخبر عبد الله بن ثعلبة: «أن رسول الله صلى الله عليه وسلم خطب قبل يوم الفطر بيوم أو يومين، فقال: أدوا صاعًا من بُرٍّ، أو صاعًا من تمر، أو صاعًا من أرز، عن كل حر أو عبد، صغير أو كبير».</p>

<p>فهذه الأخبار تدل على أن مقدار زكاة الفطر هو صاع من القمح أو الأرز أو التمر. وقد خص بعض العلماء هذه الأخبار بأحاديث أخرى تدل على الاكتفاء بنصف صاع من القمح. ومن ذلك حديث ابن عباس الذي رواه الحاكم مرفوعًا بلفظ: «زكاة الفطر مُدّان من قمح». وروى الترمذي نحوه من حديث عمرو بن شعيب عن أبيه عن جده مرفوعًا، وغيرهم.</p>

<p>وحكمتها: جبر نقص الصيام، وإغناء الفقراء عن السؤال يوم عيد الفطر. وقال وكيع بن الجراح: «زكاة الفطر لرمضان كسجود السهو للصلاة، تجبر نقصان الصوم كما يجبر السجود نقصان الصلاة». وفي الحديث: «أغنوهم عن الطواف في هذا اليوم»، أي أغنوا الفقراء عن السؤال يوم العيد.</p>

<p>وحكمها: أنها واجبة على كل مسلم حر قادر على إخراجها في وقتها، وذلك لما ورد من الأوامر في هذه الأحاديث. وقال ابن المنذر: «أجمع أهل العلم على أن زكاة الفطر فرض». وقال إسحاق: «وجوب زكاة الفطر إجماع من أهل العلم».</p>

<p>وقال بعض علماء الحنفية: الواجبات في الإسلام سبعة، وهي: زكاة الفطر، والنفقة على الإخوة، وصلاة الوتر، والأضحية، والعمرة، وخدمة الوالدين، وطاعة الزوجة لزوجها. وهناك واجبات أخرى أيضًا مثل صلاة الجماعة، وصلاة العيدين، وغير ذلك.</p>

<p>ومن تجب عليه زكاة الفطر عند الحنفية: كل مسلم حر، صغيرًا كان أو كبيرًا، ذكرًا أو أنثى، عاقلًا أو مجنونًا، إذا كان يملك نصابًا زائدًا عن حاجاته الأصلية؛ كالمسكن، واللباس، وأثاث البيت، والدابة، والسلاح، والخادم، وحاجات عياله، ودينه. ويجب على الجد أن يخرج زكاة الفطر عن أولاد ابنه الفقراء إذا فقدوا أباهم، لا عن أولاد بنته.</p>

<p>ولوجوب زكاة الفطر ثلاثة شروط: الإسلام، والحرية، وملك نصاب زائد عن الحاجات الأصلية. أما الشرطان الأولان فدليلهما الأحاديث السابقة. وأما اشتراط النصاب فلقول النبي صلى الله عليه وسلم: «لا صدقة إلا عن ظهر غنى». والغنى يُقدَّر بالنصاب لأن الشرع قدّره به، وهو المال الزائد عن الحاجات الأصلية كما سبق، لأن ما تدعو إليه الحاجة الأصلية يُعد كالمعدوم.</p>

<p>ويؤدي زكاة الفطر من وجبت عليه عن نفسه، وعن أولاده الصغار، والمعتوه، والمجنون، والفقير، وكذلك عن عبيده الذين يستخدمهم للخدمة لا للتجارة. ويؤدي السيد المسلم زكاة الفطر عن عبده الكافر، لأن السبب قد تحقق، والسيد من أهل الوجوب.</p>

<p>ولا يجب على الإنسان أن يخرج زكاة الفطر عن أبيه وأمه، وإن كانا من أقاربه، لأنه لا ولاية له عليهما كما لا ولاية له على أولاده الكبار. وكذلك لا يجب عليه أن يؤديها عن إخوته الصغار ولا عن سائر أقاربه، وإن كانوا من عياله. كما لا يجب عليه أن يؤديها عن زوجته وأولاده الكبار، وإن كانوا من عائلته. لكن لو أداها عنهم أو عن زوجته من غير أمرهم، لم يلزمهم إخراجها مرة أخرى.</p>

<p>ولا يجب على الرجل أن يؤدي زكاة الفطر عن زوجته، لضعف حق الولاية والنفقة فيها، إذ ليست ولايته عليها إلا في حقوق النكاح، ولا ينفق عليها إلا النفقة الدورية دون غيرها كالعلاج. والأصل العام عندهم أن زكاة الفطر تتعلق بالولاية والنفقة، فمن كان تحت ولايته ونفقته وجب أن يخرج عنه، وإلا فلا.</p>

<p>وقال الجمهور: زكاة الفطر واجبة على الحر، صغيرًا كان أو كبيرًا، ذكرًا أو أنثى، من المسلمين، كما قال الحنفية. وعلى هذا، لا تجب على الكافر. إلا أن الشافعية والمالكية قالوا في الأصح: إن الكافر يخرج زكاة الفطر عن عبده المسلم وقريبه المسلم.</p>

<p>وعند المالكية والشافعية لا تجب على العبد، لا عن نفسه ولا عن غيره، لأنه لا يملك. أما الحنابلة فقالوا بوجوبها على العبد أيضًا لعموم الحديث: «فرض رسول الله صلى الله عليه وسلم زكاة الفطر على الحر والعبد، والذكر والأنثى من المسلمين».</p>

<p><strong>2. وقت وجوب زكاة الفطر وحكم تعجيلها وتأخيرها</strong></p>

<p>للفقهاء قولان في وقت وجوب زكاة الفطر وما يتعلق به.</p>

<p>قال الحنفية: تجب زكاة الفطر بطلوع فجر يوم عيد الفطر، لأن الزكاة أضيفت إلى الفطر، وهذه الإضافة تفيد الاختصاص، والاختصاص بيوم العيد لا بليلته، لأن الفطر ضد الصوم، وهو يكون في اليوم لا في الليل، إذ الصوم في ذلك اليوم محرم. فمن مات قبل طلوع الفجر فلا زكاة فطر عليه، ومن أسلم أو وُلد بعد طلوع الفجر فلا زكاة فطر عليه.</p>

<p>وتصح زكاة الفطر عندهم معجلة ومؤخرة، فيجوز تقديمها بعد دخول رمضان قبل وقت وجوبها وهو يوم العيد، ويجوز أيضًا تأخيرها. ويجوز تقديمها لأن سبب وجوبها قد وُجد، فصارت كزكاة المال بعد وجود النصاب. ولا فرق في ذلك بين وقت وآخر.</p>

<p>وأما جواز إخراجها بعد يوم عيد الفطر، فلأنها عبادة مالية معقولة المعنى، فلا يسقط الواجب فيها إلا بالأداء، كسائر الزكوات.</p>

<p>وخلاصة مذهبهم: يجوز تقديم زكاة الفطر قبل يوم العيد، بل ولو قبل دخول رمضان عند ظاهر الرواية، لكن المفتى به اشتراط دخول رمضان، فلا يجوز إخراجها قبل رمضان. وإذا أخرها بعد العيد وجب عليه إخراجها، لأن الواجب لا يسقط.</p>

<p>وقال جمهور الفقهاء: تجب زكاة الفطر بغروب شمس ليلة عيد الفطر، أي أول ليلة من ليالي العيد. لأن زكاة الفطر في الأحاديث السابقة أضيفت إلى الفطر من صيام رمضان، فكان ابتداء الوجوب عند غروب الشمس، لأن الإضافة هنا للاختصاص.</p>

<p>وأول فطر يتحقق في جميع رمضان، ولا يجب بعده صيام، هو ما كان بعد غروب شمس ليلة العيد، إذ ينتهي رمضان بغروب الشمس. وسبب الخلاف بين الجمهور والحنفية: هل زكاة الفطر عبادة مرتبطة بيوم العيد أم بانتهاء شهر رمضان، لأن ليلة العيد ليست من رمضان.</p>

<p>فمن مات بعد غروب الشمس وجبت عليه زكاة الفطر. أما من وُلد أو أسلم بعد غروب الشمس، أو كان وقت الوجوب لا يملك مالًا ثم ملكه بعد ذلك، فلا تجب عليه زكاة الفطر عند الجمهور لعدم وجود سبب الوجوب، بينما تجب عليه عند الحنفية.</p>

<p>وعند الجمهور، لا يسقط وجوب زكاة الفطر بالموت ولا بغيره، بل تبقى في ذمة من وجبت عليه حتى يؤديها.</p>

<p>أما تعجيلها، فعند الشافعية يجوز تقديم زكاة الفطر من أول يوم من رمضان، لأن وجوبها متعلق بسببين: صوم رمضان والفطر منه، فإذا وُجد أحد السببين جاز التقديم، كما يجوز تعجيل زكاة المال بعد ملك النصاب وقبل الحول.</p>

<p>ولا يجوز تقديم زكاة الفطر قبل رمضان، لأنه يكون تقديمًا لها قبل وجود سببيها، فلا يجوز، كما لا يجوز تقديم زكاة المال قبل النصاب والحول.</p>

<p>وعند المالكية والحنابلة يجوز تقديمها يومًا أو يومين قبل عيد الفطر، لا أكثر من ذلك، لقول ابن عمر: «كانوا يعطون قبل الفطر بيوم أو يومين». ولا يصح قبل ذلك، لأن المقصود من إغناء الفقراء يوم العيد لا يتحقق، كما قال النبي صلى الله عليه وسلم: «أغنوهم عن السؤال في هذا اليوم». وهذا بخلاف زكاة المال.</p>

<p><strong>تأخير زكاة الفطر إلى ما بعد صلاة العيد</strong></p>

<p>قال الشافعية: يُندب ألا تُؤخر زكاة الفطر إلى ما بعد صلاة العيد، لأنه ورد الأمر بإخراجها قبل خروج الناس إلى الصلاة، كما في الصحيحين.</p>

<p>فإن أُخرت، استُحب إخراجها في أول النهار إلى مستحقيها. ويحرم تأخيرها إلى ما بعد صلاة العيد بلا عذر، كعدم المال أو عدم وجود المستحقين، لأن المعنى المقصود من مشروعيتها وهو إغناء الفقراء عن السؤال يوم العيد لا يتحقق بذلك.</p>

<p>ولو أخرها من غير عذر فقد أثم، ووجب عليه قضاؤها فورًا، لأن وقتها قد فات بتأخيرها بلا عذر. أما تأخير زكاة المال بعد القدرة على أدائها فيعد أداءً لا قضاءً. والفرق أن زكاة الفطر لها وقت محدود كالصلاة.</p>

<p>والحنابلة يوافقون الشافعية في أن آخر وقت زكاة الفطر هو غروب شمس يوم عيد الفطر، استنادًا إلى الحديث: «أغنوهم عن السؤال في هذا اليوم».</p>

<p>فمن أخر زكاة الفطر عن يوم العيد أثم لتأخير الواجب عن وقته ومخالفة الأمر، وعليه القضاء، لأنها عبادة لا تسقط بخروج الوقت كالصلاة. وأفضل وقت إخراجها يوم العيد قبل الصلاة، في موضع لا تؤدى فيه صلاة العيد.</p>

<p>وقال المالكية: يجوز إخراج زكاة الفطر بعد صلاة العيد في يوم عيد الفطر، ولا تسقط بخروج الوقت، بل تبقى في ذمة من وجبت عليه أبدًا حتى يؤديها، كسائر الواجبات. ويأثم إذا أخرها بعد يوم العيد مع القدرة. أما إذا فات وقتها لعجزه عن إخراجها، سقط عنه الوجوب.</p>

<p><strong>3. جنس الواجب: صفته ومقداره</strong></p>

<p>قال الحنفية: الواجب في زكاة الفطر يخرج من أربعة أشياء: القمح، والأرز، والتمر، والزبيب. ومقداره نصف صاع من القمح، أو صاع من الأرز أو التمر أو الزبيب. والصاع عند أبي حنيفة ومحمد بن الحسن هو ثمانية أرطال عراقية، والرطل العراقي يساوي 130 درهمًا، أي نحو 3800 غرام. واستدلوا بأن النبي صلى الله عليه وسلم كان يتوضأ بمد قدره رطلان، ويغتسل بصاع قدره ثمانية أرطال. وكذلك كان الصاع عند عمر رضي الله عنه، وهو أصغر من صاع بني هاشم، وكان المسلمون يستعملون صاع بني هاشم.</p>

<p>ودليلهم في تقدير زكاة الفطر بصاع أو نصف صاع، حديث ثعلبة بن صعير العذري، أنه قال: «خطبنا رسول الله صلى الله عليه وسلم فقال: أدوا عن كل حر وعبد نصف صاع من بُرّ، أو صاعًا من تمر، أو صاعًا من أرز».</p>

<p><strong>إخراج زكاة الفطر بالقيمة</strong></p>

<p>ويرى الحنفية جواز إخراج زكاة الفطر بالقيمة، من الدراهم أو الدنانير أو النقود أو العروض أو غير ذلك، لأن المقصود الحقيقي هو إغناء الفقير عن السؤال، واستدلوا بقول النبي صلى الله عليه وسلم: «أغنوهم عن السؤال في مثل هذا اليوم».</p>

<p>وهذا الإغناء يتحقق بدفع القيمة، بل قد يكون ذلك أتم وأنفع، لأنه أقرب إلى قضاء حاجات الفقير. فتبين أن الحديث مشتمل على علة، وهي الإغناء.</p>

<p>وقال جمهور العلماء: تؤدى زكاة الفطر من الحبوب والثمار التي تُعد قوتًا، بمقدار صاع واحد. وتفصيل أقوالهم كما يلي:</p>

<p>يرى المالكية أن زكاة الفطر تخرج من غالب قوت أهل البلد، من تسعة أشياء: القمح، والأرز، والسلت، والذرة، والدخن، والتمر، والزبيب، والأقط. فيخرج من غالب قوت البلد المتوسط.</p>

<p>ويرى الشافعية أن زكاة الفطر تخرج من غالب قوت البلد أو المحل، لأن ذلك يختلف باختلاف البلدان. والمعتبر غالب قوت السنة. ويجوز إخراج الأعلى بدل الأدنى، ولا يجوز العكس. والأصح أن التفاضل يكون بحسب زيادة الاقتيات لا بحسب السعر. فالقمح أفضل من التمر والأرز، والتمر أفضل من الزبيب. ولا يجوز أن يخرج عن الشخص الواحد صاع ملفق من جنسين.</p>

<p>ولو كان في بلد ما أقوات متعددة يصعب تعيين الأغلب منها، فالأفضل إخراج أجودها. والواجب أن يكون الخارج حبًا جيدًا، ولا يجزئ إخراج ما أكلته الديدان أو كان معيبًا، وإن كان صالحًا للأكل. ومقداره صاع، وهو على الأصح 685 و5/7 درهم، أو 5 و7/3 أرطال بغدادية، و4.75 رطل و7 أواق مصرية.</p>

<p>ويقرر الحنابلة وجوب إخراج ما ورد به النص من القمح والتمر والزبيب والأقط. فإن عدمت هذه الأقوات جاز إخراج كل قوت من الحبوب أو الثمار. ولا يجوز إخراجها من اللحم أو اللبن.</p>

<p>والظاهر في المذهب الحنبلي أنه لا يجوز العدول عن الأنواع المنصوصة مع القدرة عليها، سواء أكانت قوت البلد أم لا. ويجوز إخراج الدقيق، ولا يجوز إخراج الخبز في زكاة الفطر.</p>

<p>ويجوز للإنسان أن يخرج زكاة الفطر من أي نوع ورد في النص، ولو لم يكن هو قوته أو لم يكن قوت أكثر أهل بلده.</p>

<p>ومقدارها صاع عراقي، وهو أربع حفنات بكفي رجل معتدل، لأنه المكيال المعمول به في زمن النبي صلى الله عليه وسلم. وقد سبق أن الجمهور يقدرونه بنحو 2751 غرامًا، وبعضهم بنحو 2176 غرامًا، وهو الذي يعتمد في تقدير خمسة أوسق.</p>

<p>ودليل الجمهور هو الأحاديث السابقة، وهي أصح من الأحاديث التي استدل بها الحنفية. ومنها حديث أبي سعيد الخدري: «كنا نخرج زكاة الفطر على عهد رسول الله صلى الله عليه وسلم صاعًا من طعام، أو صاعًا من شعير، أو صاعًا من تمر، أو صاعًا من زبيب، أو صاعًا من أقط».</p>

<p>وروى الدارقطني عن مالك بن أنس أن صاع النبي صلى الله عليه وسلم كان خمسة أرطال وثلثًا بالعراقي.</p>

<p>أما إخراج زكاة الفطر بقيمة هذه الأطعمة، فلا يجوز عند الجمهور، ومن أخرج القيمة لم يجزئه ذلك. واستدلوا بقول عمر بن الخطاب رضي الله عنه: «فرض رسول الله صلى الله عليه وسلم زكاة الفطر صاعًا من تمر وصاعًا من شعير». فمن عدل عن ذلك فقد ترك الواجب.</p>

<p><strong>4. ما يُسن وما يجوز في زكاة الفطر</strong></p>

<p>اتفق الفقهاء على استحباب إخراج زكاة الفطر يوم عيد الفطر بعد طلوع الفجر وقبل صلاة العيد، لحديث ابن عمر: «أن النبي صلى الله عليه وسلم أمر بزكاة الفطر أن تؤدى قبل خروج الناس إلى الصلاة». وكذلك لحديث ابن عباس: «من أداها قبل الصلاة فهي زكاة مقبولة، ومن أداها بعد الصلاة فهي صدقة من الصدقات». وقبول الزكاة والصدقة مرده إلى مشيئة الله تعالى.</p>

<p>غير أن أكثر الفقهاء يرون أن تقديم زكاة الفطر قبل صلاة العيد مستحب فقط، وأنها تصح إلى آخر يوم العيد. فمن أخرها إلى ما بعد الصلاة فقد ترك الأفضل، لأن المقصود منها إغناء الفقراء عن السؤال في ذلك اليوم، كما في الحديث: «أغنوهم عن السؤال في هذا اليوم».</p>

<p>فإذا أُخرت لم يتحقق المقصود كاملًا، لا سيما بعد الصلاة. ولهذا دل ذلك على أن تأخيرها بعد الصلاة مكروه كراهة تنزيه عند بعضهم، وأن الأمر بإخراجها قبل الصلاة للاستحباب. ومع ذلك فإن من تعمد تأخيرها يأثم، كما يأثم من أخرج الصلاة عن وقتها عمدًا.</p>

<p>وذكر المالكية أنه يُستحب أن يخرج الإنسان زكاة الفطر من أجود قوته الذي هو قوت بلده، ويُستحب أيضًا ألا يزيد على صاع، بل الزيادة مكروهة، لأن ما زاد على المقدار الشرعي يكون بدعة. وقد تكون البدعة مفسدة وقد تكون مكروهة. وتكره الزيادة إذا تحققت، فإن لم تتحقق جاز الزيادة لإزالة الشك.</p>

<p><strong>5. الجهات التي تُصرف إليها زكاة الفطر</strong></p>

<p>اتفق الفقهاء على أن مستحقي زكاة الفطر هم مستحقو الزكوات الواجبة الأخرى، لأن زكاة الفطر زكاة، فمصارفها كمصارف الزكاة الأخرى. ولأنها من الصدقات فهي داخلة في قوله تعالى:</p>

<p>«إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا وَالْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِي الرِّقَابِ وَالْغَارِمِينَ وَفِي سَبِيلِ اللَّهِ وَابْنِ السَّبِيلِ فَرِيضَةً مِنَ اللَّهِ ۗ وَاللَّهُ عَلِيمٌ حَكِيمٌ» (التوبة: 60).</p>

<p>ولا يجوز دفعها لمن لا يجوز له أخذ زكاة المال. فعند الجمهور، وهم المالكية والشافعية والحنابلة، لا يجوز دفعها إلى الذمي، لأنها زكاة، فلا تصرف إلى غير المسلمين كسائر زكاة المال. ولا خلاف بين أهل العلم في أن زكاة المال لا تدفع إلى غير المسلمين. وقال ابن المنذر: «أجمع أهل العلم على أنه لا يجزئ دفع زكاة المال إلى ذمي».</p>

<p>وقال الحنفية: زكاة الفطر كغيرها من الزكوات في مصارفها وأحكامها، إلا في مسألة جواز دفعها إلى الذمي، فإنه مكروه عندهم، ولا تسقط بهلاك المال. لكن الفتوى عندهم على قول أبي يوسف: أنه لا يجوز دفعها إلى الذمي، كزكاة المال، استنادًا إلى الحديث: «تؤخذ من أغنيائهم وترد على فقرائهم» أي من المسلمين إلى فقرائهم.</p>

<p>وبناء على ذلك، فإن زكاة الفطر تُعطى باتفاق الفقهاء لكل فقير مسلم حر، غير هاشمي، صيانة لهم عن أوساخ أموال الناس وشرفًا لهم. لكن في هذا العصر قيل بجواز إعطائها لبني هاشم لعدم وجود نصيب لهم من بيت المال.</p>

<p>وإذا لم يقدر الإنسان إلا على إخراج بعض صاع، أو بعض ما وجب عليه من زكاة الفطر، أو كان عليه أكثر من فطرة ولم يقدر إلا على بعضها، فإنه يخرج ما استطاع مع المحافظة على زكاة الفطر بحسب قدرته. ويبدأ بنفسه، ثم بمن تلزمه نفقته.</p>

<p>وعند الجمهور، يُقدَّم من تلزمه نفقته ممن بعد نفسه الزوجة، لقوة وجوب نفقتها. والظاهر عند المالكية والحنابلة تقديم الأب على الولد. ودليل هذا الترتيب قول النبي صلى الله عليه وسلم: «ابدأ بنفسك ثم بمن تعول». ولأن زكاة الفطر مبناها على النفقة، فكما يبدأ الإنسان بنفسه في النفقة، يبدأ بنفسه في زكاة الفطر.</p>

<p>وعند الشافعية يبدأ بنفسه، ثم بزوجته، ثم بابنه الصغير، ثم بأبيه، ثم بجده، ثم بابنه الكبير. واستدلوا بحديث مسلم: «ابدأ بنفسك فتصدق عليها، فإن فضل شيء فلأهلك، فإن فضل عن أهلك شيء فلذي قرابتك».</p>

<p>ويجوز للإنسان أن يعطي زكاة الفطر لأقاربه الذين يجوز دفع زكاة المال إليهم. ولا يجوز دفعها إلى الغني، ولا إلى من تلزمه نفقته، ولا إلى من لا يجوز له أخذ زكاة المال. ويجوز دفعها إلى الأصناف الثمانية المذكورة في آية التوبة، لأنها صدقة فتشبه زكاة المال.</p>

<p>والظاهر من مذهب الشافعي وجوب توزيع زكاة الفطر على الأصناف الثمانية. لكن في ذلك مشقة، ولذلك اختار بعض الشافعية جواز دفعها إلى صنف واحد فقط، ولا بأس بالأخذ بهذا القول في زماننا، كما قال الباجوري. وقال بعضهم: «لو كان الشافعي حيًا اليوم لأفتى بهذا».</p>

<p>ويجوز عند الفقهاء دفع صاع واحد إلى جماعة من المساكين يقتسمونه. ويجوز عند غير الشافعي دفع عدة أصواع إلى فقير واحد، كما يجوز أن يدفع كل إنسان زكاة فطره إلى فقير واحد أو إلى عدة فقراء. والمقصود أن الجمهور يجيزون جمع صدقات جماعة لفقير واحد. ولا خلاف بين الفقهاء في جواز إعطاء زكاة شخص واحد لجماعة، لأنه قد دفعها إلى مستحقيها فبرئت ذمته، كما لو دفعها إلى شخص واحد.</p>

<p>وأما إعطاء صدقات جماعة لشخص واحد، فإن الشافعي يوجب تفريقها على ستة أصناف، ويعطى من كل صنف ثلاثة أشخاص كما هو مذكور في مصارف الزكاة. والراجح هو قول الجمهور، لأن ذلك صدقة لغير معين، فيجوز أن يأخذها شخص واحد من أكثر من مزكٍّ.</p>
    `
  },
  {
    title: "زكاة المعادن (الذهب والفضة والنقود الورقية)",
    body: `
      <div class="fiqh-image">
  <img src="assets/images/logam.png" alt="صورة توضيحية للزكاة">
</div>

<p>اتفق الفقهاء على وجوب الزكاة في المعادن، سواء كانت سبائك، أو مضروبة، أو أواني، أو حليًّا عند الحنفية، وذلك لما سبق من أدلة القرآن الكريم، والسنة، والإجماع على وجوب الزكاة فيها على وجه العموم. وهنا نبحث المسائل الآتية.</p>

<p><strong>أولًا: النصاب والمقدار الواجب إخراجه</strong></p>

<p>نصاب الذهب عشرون مثقالًا أو دينارًا. وهذا يعادل تقريبًا أربع عشرة ليرة ذهبية عثمانية، أو خمس عشرة ليرة ذهبية فرنسية، أو اثنتي عشرة ليرة إنجليزية، ويعادل بالمثقال العراقي نحو مائة غرام تقريبًا، وبالمثقال الأجنبي 96 غرامًا، وعند جمهور العلماء 23/25 × 91 غرامًا.</p>

<p>والفرق بين نوعي المثقال (0.2) سببه أن المثقال الأجنبي يساوي 4.8 غرامات، والمثقال العراقي 5 غرامات. والأحوط أن يُعتمد الأقل، وهو مقدار 85 غرامًا، مع اعتبار الدرهم العربي (2.976 غرامًا) أولى بالاعتماد.</p>

<p>ونصاب الفضة مائتا درهم، وتساوي عند الحنفية نحو 700 غرام تقريبًا، وعند جمهور العلماء نحو 642 غرامًا تقريبًا، وأدق الأقوال 595 غرامًا.</p>

<p>وعند جمهور العلماء، إلا الشافعية، يُضم أحد النقدين إلى الآخر في تكميل النصاب، فيُضم الذهب إلى الفضة والفضة إلى الذهب بالقيمة. فمن كان عنده مائة درهم وخمسة مثاقيل تساوي مائة، وجبت عليه الزكاة، لأن المقصود والزكاة فيهما واحد، فكأنهما جنس واحد.</p>

<p>أما الشافعية فقالوا: لا يُضم الذهب إلى الفضة ولا الفضة إلى الذهب، كما لا يُضم الإبل إلى البقر. وإنما يُستكمل نصاب النوع بنوع آخر من جنسه، وإن اختلفا من حيث الجودة والرداءة.</p>

<p>والقول الأول هو الذي ينبغي العمل به اليوم في شأن النقود الورقية، لأن ضم أحد النوعين إلى الآخر صار متعينًا وضروريًا.</p>

<p><strong>سعر الصرف وتقدير النصاب</strong></p>

<p>يجب تقدير نصاب الزكاة في كل زمان بحسب القوة الشرائية للنقود الحديثة، وبحسب أسعار الذهب والفضة في كل سنة، وفي كل بلد، وقت إخراج الزكاة، لأن ذلك قد صار متغيرًا غير ثابت.</p>

<p>وقد حدد الشرع مقدارين متعادلين: إما عشرين دينارًا (مثقالًا)، وإما مائتي درهم. وكانا في الأصل شيئًا واحدًا متقاربين في القيمة.</p>

<p>وكذلك ينبغي مراعاة النصاب في هذا العصر كما قرره الشرع في أصله، دون الالتفات إلى الفروق الطارئة اليوم بين أسعار الذهب والفضة.</p>

<p>والنقود الورقية، في أرجح الأقوال، تُقدَّر بقيمة الذهب، لأن الذهب هو الأصل في التعامل، ولأن تمثيل قيمة النقود إنما يكون بالذهب، ولأن المثقال في زمن النبي صلى الله عليه وسلم وعند أهل مكة كان أصل العملة، وهو أيضًا أصل في تقدير الديات.</p>

<p>فينبغي سؤال الصرافين عن سعر الذهب بالعملة المحلية الجارية في كل بلد. فمثلًا: الجنيه المصري كان في وقت من الأوقات يعادل 2.5587 غرامًا من الذهب، والغرام الواحد من الذهب في بعض الأزمنة يساوي نحو 500 ليرة سورية، أما غرام الفضة فيساوي نحو عشر ليرات سورية.</p>

<p>وقد ذهب كثير من العلماء المعاصرين إلى تقدير النقود بسعر الفضة مراعاةً لمصلحة الفقراء، لأن ذلك أنفع لهم. وقد اختار الدكتور وهبة الزحيلي هذا القول، لأن الفتوى تُبنى على ما هو أنفع للفقراء.</p>

<p><strong>أحكام صرف الزكاة</strong></p>

<p>وينبغي التنبه إلى أن دفع الزكاة إلى المؤسسات الاجتماعية لا بد أن يُنقل فيه مال الزكاة إلى مستحقيه. فلا يجوز للمسؤولين في المؤسسة أن يشتروا طعامًا أو لباسًا أو نحو ذلك من أموال الزكاة المعطاة للفقراء، لأنهم غير مأذونين في هذا التصرف.</p>

<p>وكذلك لا يجوز للمؤسسات العلمية الشرعية أن تشتري شيئًا، ككتب أو غيرها، من أموال الزكاة.</p>

<p>بل يجب أن تحصل المؤسسة على تفويض أو وكالة من طلبة العلم أو المستحقين، لتصرف أموال الزكاة في حاجاتهم من طعام، وشراب، وكتب، وورق، وغير ذلك، لأن تمليك الزكاة للمستحقين شرط أساسي.</p>

<p>ثم إن المستحق هو الذي يتصرف فيها بما يحقق مصلحته. فلا يجوز للمؤسسة أن تنشئ بنفسها مباني أو مختبرات من مال الزكاة لينتفع بها المستحقون، لأنه لا وكالة لها منهم في هذا الباب.</p>

<p>لكن عند الضرورة يجوز إنشاء مراكز صحية، أو توزيع الأدوية على الفقراء مثلًا، بشرط ألا تُجعل على صفة الوقف، حتى يجوز بيعها وصرف ثمنها في المستحقين.</p>

<p><strong>مقدار الزكاة</strong></p>

<p>المقدار الواجب في الذهب والفضة هو 2.5%. فمن كان عنده مائتا درهم، وحال عليها الحول، ففيها خمسة دراهم. وفي كل عشرين مثقالًا من الذهب نصف دينار.</p>

<p>ودليل ذلك الأحاديث الواردة عن النبي صلى الله عليه وسلم، ومنها حديث علي رضي الله عنه عن النبي صلى الله عليه وسلم أنه قال:</p>

<p>«إذا كانت لك مائتا درهم، وحال عليها الحول، ففيها خمسة دراهم، وليس عليك شيء في الذهب حتى يكون لك عشرون دينارًا، فإذا كانت لك عشرون دينارًا، وحال عليها الحول، ففيها نصف دينار».</p>

<p>ومنها حديث أبي سعيد الخدري رضي الله عنه:</p>

<p>«ليس فيما دون خمسة أوسق من التمر صدقة، وليس فيما دون خمس أواق من الورِق صدقة، وليس فيما دون خمس ذود من الإبل صدقة».</p>

<p>وفي رواية البخاري: «في الرقة ربع العشر».</p>

<p>ويُخرج زكاة الذهب من الذهب، وزكاة الفضة من الفضة. فإذا أراد شخص أن يخرج عن الفضة ذهبًا أو عن الذهب فضة، جاز ذلك عند المالكية في حالتين. والإخراج بالقيمة هو المشهور عندهم، أما الشافعية فلا يجيزونه.</p>

<p><strong>ثانيًا: ما دون النصاب وما زاد عليه</strong></p>

<p>قد عُلم بالإجماع أن الزكاة تجب في الذهب إذا بلغ عشرين مثقالًا (دينارًا)، وقيمته مائتا درهم. فأما ما نقص عن عشرين مثقالًا فلا زكاة فيه، إلا إذا كُمِّل بالفضة أو بعروض التجارة.</p>

<p>واتفق العلماء على أن ما نقص عن عشرين مثقالًا، ولم يبلغ مائتي درهم، فلا زكاة فيه لعدم بلوغه النصاب.</p>

<p>وقال رسول الله صلى الله عليه وسلم: «ليس فيما دون عشرين مثقالًا من الذهب، ولا فيما دون مائتي درهم صدقة».</p>

<p>وأما الزائد على النصاب، فعند أبي حنيفة لا تجب فيه الزكاة حتى يبلغ أربعين درهمًا، فيكون فيه درهم واحد، ثم في كل أربعين درهمًا درهم. ولا شيء فيما بينهما. وكذلك لا زكاة في زيادة الدنانير حتى تبلغ أربعة دنانير.</p>

<p>وقال صاحباه وأكثر الفقهاء: ما زاد على المائتين ففيه الزكاة بحسابه، ولو كان الزيادة يسيرة، لقول النبي صلى الله عليه وسلم: «هاتوا ربع العشر، من كل أربعين درهمًا درهمًا، وليس عليكم شيء حتى تتم مائتان، فإذا كانت مائتي درهم ففيها خمسة دراهم، فما زاد فبحساب ذلك».</p>

<p>وهذا هو الذي يقبله العقل.</p>

<p><strong>ثالثًا: حكم المغشوش (المال المختلط)</strong></p>

<p>والمغشوش هو ما خُلط بما هو أدنى منه قيمة، كالذهب المخلوط بالفضة، أو الفضة المخلوطة بالنحاس.</p>

<p>وللفقهاء في زكاة هذا المال ثلاثة أقوال:</p>

<p>قال الحنفية: ما كان أكثره فضة عُدَّ فضة، وما كان أكثره ذهبًا عُدَّ ذهبًا. فإن كان الغالب على الذهب أو الفضة شيء آخر، صار حكمه حكم عروض التجارة، فلا بد أن تبلغ قيمته نصابًا مع نية التجارة، كغيره من الأموال، إلا إذا كان في ذلك المخلوط فضة خالصة تبلغ نصابًا.</p>

<p>وقال المالكية: العبرة برواجه في السوق. فتجب الزكاة في المال التام الوزن، وفي المال المختلط، وفي الناقص وزنًا إذا كان كل واحد منهما رائجًا في السوق كرواج التام. فإن لم يَرُج، اعتبر الخالص منه بعد تقدير تصفيته.</p>

<p>وقال الشافعية والحنابلة: لا زكاة في المال المختلط أصلًا إلا إذا بلغ الخالص منه نصابًا كاملًا. فمن ملك ذهبًا أو فضة مخلوطين بغيرهما، فلا زكاة فيهما حتى يبلغ الخالص منهما نصاب الذهب أو الفضة.</p>

<p>فإن لم يُعرف مقدار الذهب أو الفضة في المال، وشك هل بلغ النصاب أم لا، عُمِل بالأحوط، فيُخرج من الذهب أو الفضة ما يتيقن به براءة الذمة، أو يُمَيَّز أحدهما عن الآخر بالنار لمعرفة المقدار الحقيقي، ثم تُخرج الزكاة، حتى تسقط الفريضة بيقين.</p>

<p>فإذا اختلط إناء من ذهب بإناء من فضة، ثم أُذيبا وصُنِع منهما إناء واحد وزنه ألف درهم، وكان أحد المعدنين ستمائة والآخر أربعمائة، وصاحبه لا يدري أيهما الأكثر، فإنه يزكي الذهب والفضة بحسب الفرض، ويأخذ بالأكثر احتياطًا. ولا يجوز أن يقدره كله ذهبًا، لأن أحد النوعين لا يجزئ عن الآخر، وإن كان أحدهما أعلى قيمة، إلا إذا فُصل بينهما بالنار. وذلك يتحقق بصهر القدر اليسير إذا تساوت أجزاؤه.</p>
    `
  },
  {
    title: "زكاة الحلي",
    body: `

<div class="fiqh-image">
  <img src="assets/images/perhiasan.png" alt="صورة توضيحية للزكاة">
</div>

<p>اتفق الفقهاء على وجوب الزكاة في الذهب والفضة كما سبق بيانه في المسكوك وغيره، مثل الذهب السبائك، والذهب غير المصوغ، والأواني، والحلي المحرم كحلي الرجال إلا خاتم الفضة، والآلات المستعملة وزينة البيوت. ولا تجب الزكاة في غير الذهب والفضة كالدُّرّ والجواهر والياقوت.</p>

<p>والحلي الذي تجب فيه الزكاة عند المالكية هو ما اتُّخذ للتجارة بالإجماع. ويُعتبر في الحلي الوزن لا قيمة الصياغة. وكذلك الأواني والمباخر المعدة للتجارة، ومكاحل الكحل وأدواته ولو كانت للنساء، وكذلك ما اتُّخذ للادخار أو للذكرى لا للاستعمال.</p>

<p>وحلي النساء إذا انكسر فله خمس حالات: الأولى أن ينكسر بحيث لا يُرجى إعادته إلى حالته إلا بإذابته؛ الثانية أن ينكسر مع نية عدم إصلاحه؛ الثالثة أن ينكسر مع نية إصلاحه؛ الرابعة أن ينكسر من غير نية إصلاح ولا ترك إصلاح؛ الخامسة أن لا ينكسر مع نية عدم إصلاحه.</p>

<p>ولا تجب الزكاة في الحلي إذا جُعل للإجارة سواء كان مالكه رجلًا أو امرأة. وكذلك لا زكاة في الحلي المباح للنساء كالأسورة والحلي، ولا في الحلي المباح للرجال كقبضة السيف المعد للجهاد، وخاتم الفضة، والأنف والسن الصناعيين، وزينة المصحف والسيف. وكذلك ما أُعد لمن يجوز له استعماله كالزوجة أو البنت الموجودة بالفعل والصالحة للزينة. أما إذا أُعد لمن سيوجد أو لمن لا يصلح للزينة لصغر سنه فتجب فيه الزكاة.</p>

<p>أما الحلي الذي تجب فيه الزكاة عند الشافعية فهو ما قُصد به الادخار والكنز، والأواني، وحلي النساء الذي يستعمله الرجال للزينة، وحلي الرجال الذي تستعمله النساء للزينة، والذهب المغصوب المصوغ حليًا، وكذلك حلي النساء المسرف فيه إذا بلغ مائتي مثقال تقريبًا أي نحو 850 غرامًا، وكذلك ما كان استعماله مكروهًا قياسًا على المحرم مثل شد الأواني الكبيرة للحاجة أو الصغيرة للزينة.</p>

<p>وقد ورد في كتاب إعانة الطالبين أن الذهب والفضة بلا إسراف حلال للنساء والأطفال بالإجماع، مثل الأساور والخلخال والقلائد، ولا زكاة فيها. أما إذا بلغ الإسراف حدًا كبيرًا فلا يحل منها شيء، مثل خلخالين وزن كل واحد منهما مائتا مثقال، ففي هذه الحالة تجب الزكاة. وقد أخذ تقدير مائتي مثقال من روايات الصحابة.</p>

<p>وتجب الزكاة أيضًا في أصح الأقوال في حلي النساء إذا فسد بحيث يمنع من استعماله ويحتاج إلى صهر وإعادة تشكيل.</p>

<p>والأصح أنه لا زكاة في الحلي المباح للنساء مثل الخلاخيل والأساور ونحوها، لأنه معد للاستعمال المباح فصار كالحيوان المعد للعمل.</p>

<p>أما الحلي الذي تجب فيه الزكاة عند الحنابلة فهو ما اتُّخذ للتجارة، والحلي المحرم على النساء إذا لم يكن لهن حق استعماله، مثل حلي الرجال المحرم استعماله كزينة السيوف والأحزمة والخلاخيل وخواتم الذهب وزينة دواب الركوب وزينة الخيل مثل اللجام والسرج وقلائد الكلاب وزينة المرايا والأمشاط وأدوات الكحل والمراوح وأواني الشرب وأوعية الطيب والمجامر والمعلقات والمصابيح والأواني وزينة كتب العلم بخلاف المصحف، وزينة الدواة والأقلام، وكل ما أُعد للإجارة أو المهنة أو الادخار أو النفقة عند الحاجة أو ما لم يُقصد به شيء.</p>

<p>وكذلك حلي النساء إذا فسد واحتاج إلى إعادة تشكيل. أما إذا لم يحتج إلى تشكيل ونُوي إصلاحه فلا زكاة فيه. وكذلك لا زكاة فيما إذا لم يمنع الكسر من استعماله، إلا إذا نُوي إتلافه وصهره ففي هذه الحالة تجب الزكاة لأن المرأة نوت عدم استعماله.</p>

<p>ولا زكاة في حلي النساء في ظاهر المذهب إذا كان مما يُلبس أو يُعار، ولا في الحلي الذي يستعمله الرجال المحرم عليهم إذا جعلوه لإعارته للنساء أو العكس.</p>

<p>وخلاصة الأمر أن جمهور العلماء لا يوجبون الزكاة في حلي النساء المعتاد، لقول النبي ﷺ: «ليس في الحلي زكاة». وهو قول ابن عمر وعائشة وأسماء بنت أبي بكر. وذلك لأن الحلي معد للاستعمال المباح، فلا زكاة فيه كالحيوان المعد للعمل أو الملابس الشخصية. كما أن الزكاة إنما تجب في المال النامي المستثمر، والحلي المباح ليس كذلك. أما إذا اتُّخذ للادخار أو كان فيه إسراف ظاهر أو استعمله الرجال للزينة أو استعمل في الأواني والهدايا والتماثيل ونحو ذلك فتجب فيه الزكاة.</p>

<p>أما الحنفية فيرون وجوب الزكاة في حلي الرجال والنساء سواء كان سبائك أو مصوغًا أو أواني أو غير ذلك، لأن الذهب والفضة من الأموال النامية. ودليل نمائها أنها معدة للتجارة بطبيعتها، بخلاف الثياب، لأن الذهب والفضة خُلِقا أثمانًا للأشياء، فيجب على مالكهما إخراج الزكاة فيهما على كل حال.</p>

<p>ويؤيد رأيهم حديث النبي ﷺ حين قال لامرأة في يدها سواران من ذهب: «أتؤدين زكاة هذا؟» قالت: لا. قال: «أيسرك أن يسورك الله بهما سوارين من نار؟»</p>

<p>والمعتبر في نصاب الحلي عند غير الشافعية هو الوزن لا القيمة. فإذا كان الحلي يساوي مائتي درهم لكن وزنه أقل من ذلك فلا زكاة فيه، أما إذا بلغ وزنه مائتي درهم فتجب فيه الزكاة ولو كانت قيمته أقل، لقول النبي ﷺ: «ليس فيما دون خمس أواقٍ من الورق صدقة».</p>

<p>لكن الحنابلة استثنوا ما إذا كان الحلي للتجارة، فإنه يُقوَّم. فإذا بلغت قيمته نصاب الذهب أو الفضة وجبت فيه الزكاة لأن الزكاة حينئذ تتعلق بالقيمة. أما الذهب والفضة غير المعدَّين للتجارة فزكاتهما في عينهِما، ويُعتبر بلوغ النصاب بالوزن أو القيمة. وللمالك أن يختار بين إخراج 2.5٪ من الحلي نفسه أو دفع ما يعادلها من الذهب أو الفضة.</p>

<p>وإذا كان في الحلي لؤلؤ أو ماس مرصع فإن الزكاة تكون في الذهب أو الفضة دون اللؤلؤ، لأن اللؤلؤ لا زكاة فيه عند أحد من العلماء. أما إذا كان الحلي للتجارة فإنه يُقوَّم مع اللؤلؤ لأن اللؤلؤ إذا كان للتجارة تجب فيه الزكاة بالقيمة.</p>

<p>أما الشافعية فيقولون: إذا وجبت الزكاة في الحلي وكانت القيمة والوزن مختلفين فالعبرة بالقيمة لا الوزن. أما في الأشياء المحرمة لذاتها كأواني الذهب والفضة فالعبرة بالوزن لا القيمة. فإذا كان الحلي يزن مائتي درهم وقيمته ثلاثمائة درهم خُيّر المالك بين إخراج 2.5٪ من الحلي نفسه أو دفع خمسة دراهم ونصف قيمتها نقدًا. ولا يجوز كسره لإخراج الزكاة لأن ذلك يضر بالمالك وبالمستحقين.</p>

    `
  },
  {
    title: "زكاة الديون",
    body: `
      <div class="fiqh-image">
  <img src="assets/images/utang.png" alt="صورة توضيحية للزكاة">
</div>

<p>المال الذي يبلغ النصاب ويكون دينًا لشخص في ذمة غيره، إذا حال عليه الحول، تجب فيه الزكاة وفق الشروط المفصلة في المذاهب الفقهية.</p>

<p>قال الحنفية إن الديون عند الإمام أبي حنيفة ثلاثة أنواع: قوي، ومتوسط، وضعيف.</p>

<p>فالقوي هو ما كان بدل دين عن مال تجارة مثل ثمن البضائع، إذا كان في ذمة شخص معترف بالدين ولو كان مفلسًا، أو منكرًا لكن عليه بينة. فهذا الدين تجب زكاته إذا قبضه صاحبه عن السنوات الماضية. فكلما قبض أربعين درهمًا وجب فيه درهم واحد، لأن ما دون خمس النصاب معفو عنه.</p>

<p>أما الدين المتوسط فهو بدل مال ليس للتجارة مثل ثمن بيت السكن أو الملابس المحتاجة. فلا تجب الزكاة فيه حتى يقبض صاحبه نصابًا كاملًا (مائتي درهم)، فإذا قبضه زكاه عن السنوات الماضية.</p>

<p>وأما الدين الضعيف فهو بدل ما ليس بمال، مثل المهر والميراث والوصية وعوض الخلع والصلح عن دم العمد والدية. فلا زكاة فيه حتى يقبضه صاحبه ويحول عليه الحول بعد القبض.</p>

<p>والخلاصة أن الزكاة واجبة في جميع أنواع الديون المذكورة، لكن أداؤها يكون عند القبض: في الدين القوي عند قبض خمس النصاب، وفي الدين المتوسط والضعيف عند قبض النصاب كاملًا.</p>

<p>أما صاحبا أبي حنيفة فقالا إن جميع الديون سواء وهي قوية، وتجب فيها الزكاة قبل القبض إلا الدية، فلا تجب فيها الزكاة حتى تُقبض ويمضي عليها حول.</p>

<p>وقال المالكية إن الديون ثلاثة أنواع:</p>

<p>الأول: دين يحتاج إلى حول بعد القبض مثل دين الميراث والهبة والوقف والصدقة والمهر والخلع والدية، فلا زكاة فيه حتى يقبضه صاحبه ويحول عليه الحول.</p>

<p>الثاني: دين تجب فيه الزكاة لعام واحد فقط، وهو الدين الخالص ودين التجارة.</p>

<p>الثالث: دين التاجر الذي يدير أمواله بيعًا وشراءً، فإذا كان أصل الدين تجارة فإنه يزكيه كل سنة مع ما عنده من أموال.</p>

<p>وقال الشافعية إن صاحب الدين يزكي دينه عن السنوات الماضية إذا تمكن من قبضه وكان من الدراهم أو الدنانير أو عروض التجارة.</p>

<p>أما الحنابلة فيرون وجوب الزكاة في الدين سواء كان حالًا أو مؤجلًا، وسواء كان المدين قادرًا أو معسرًا أو منكرًا، لكن لا يجب إخراج الزكاة إلا بعد قبضه فيؤدي زكاته فورًا عن السنوات الماضية.</p>

<p>والخلاصة أن الدين إذا كان مرجو السداد فإن صاحبه يزكيه عند جمهور الفقهاء. أما إذا كان على معسر أو منكر أو مماطل فلا زكاة فيه عند كثير من العلماء حتى يُقبض.</p>

<p>أما الوديعة فحكمها كحكم المال الموجود بيد صاحبه، لأن المودَع عنده وكيل في الحفظ، ويده كيد المالك، ولذلك يجب على المالك زكاتها عن السنوات الماضية.</p>

<p>وأما الضمان النقدي (التأمين المالي) الذي يدفعه المستأجر لصاحب العقار، فالزكاة فيه على مالكه الأصلي لا على المؤجر، إذا توفرت شروط الزكاة.</p>

</div>
    `
  },
  {
    title: "زكاة النقود الورقية",
    body: `
      <div class="fiqh-image">
  <img src="assets/images/uang.png" alt="صورة توضيحية للزكاة">
</div>

<p>النقود الورقية والنقود المعدنية هي التي جُعلت وسيلةً للتعامل بدلًا من الذهب والفضة. وتُعتبر هذه النقود في حكم الحوالة البنكية التي تلتزم بها المصارف المركزية للدولة بما يعادل الذهب، من الرصيد الذهبي المحفوظ الذي يمكن أن يغطي العملة المتداولة. غير أن أكثر الدول منعت التعامل بالذهب، فلم يعد جائزًا سحب الرصيد المعادل لكل ورقة نقدية أو قطعة معدنية مصنوعة من خليط بعض المعادن كالنحاس والبرونز ونحو ذلك، حفاظًا على الرصيد الذهبي الموجود في خزائن الدولة.</p>

<p>ولما كان هذا النظام قد ظهر حديثًا بعد الحرب العالمية الأولى، فإن فقهاءنا السابقين لم يتكلموا عنه. وقد بحث فقهاء العصر في حكم زكاة النقود الورقية، وقرر جمهور الفقهاء من الحنفية والمالكية والشافعية وجوب الزكاة فيها، لأن هذه النقود إما أن تكون في حكم الدين القوي الذي في ذمة خزينة الدولة، أو في حكم الشيكات والحوَالات البنكية التي تمثل ديونًا على المصارف.</p>

<p>أما أتباع المذهب الحنبلي فلم يروا وجوب الزكاة في النقود الورقية حتى تُبدَّل فعلًا بالذهب أو الفضة، قياسًا على قبض الدين.</p>

<p>والصحيح وجوب الزكاة في النقود؛ لأنها أصبحت أداةً للأثمان وقيم السلع، في حين مُنع التعامل بالذهب. ولم تعد أي دولة تبيح سحب الرصيد المقابل لأي نوع من أنواع الأوراق النقدية. ولا يصح قياس هذه النقود على الدَّين، لأن الدَّين لا ينتفع به صاحبه، أعني الدائن، ولهذا لم يوجب الفقهاء زكاته إلا بعد قبضه لاحتمال عدم تحصيله.</p>

<p>أما هذه النقود فإن حاملها ينتفع بها بالفعل كما ينتفع بالذهب الذي يُتخذ قيمةً للأشياء، وهو مالك لها حقيقةً. ولذلك فليس صحيحًا القول بوجود خلاف معتبر في زكاة هذه النقود، والقول بعدم وجوب الزكاة فيها لا شك أنه اجتهاد غير صواب، لأنه يؤدي في نتيجته الواضحة إلى إسقاط الزكاة عن أهم أنواع الأموال الزكوية وأعظمها شأنًا.</p>

<p>وعليه، فإن النقود الورقية تجب زكاتها قطعًا، وتُعامل معاملة الدَّين الحالّ على مليءٍ قادر على السداد، كما قرره الشافعية، وتجب فيها زكاة مقدارها 2.5٪.</p>

<p>ونصابها — كما سبق بيانه — يُقدَّر بحسب نصاب الذهب الذي حدده الشرع، وهو عشرون دينارًا أو مثقالًا. وقد اخترنا تقديره بوزن الذهب 85 غرامًا، والفضة 595 غرامًا، اعتمادًا على الدرهم العربي الذي يساوي 2.975 غرامًا. والأصح تقدير النصاب بالذهب، لأنه الذي يعادل نصاب بهيمة الأنعام من الإبل والبقر والغنم، ولارتفاع مستوى المعيشة وغلاء الحاجات.</p>

<p>ومع أن كثيرًا من العلماء المعاصرين يرون تقدير النصاب بالفضة لأنه أنفع للفقراء وأحوط في الدين، ولأن نصاب الذهب محل اتفاق العلماء وثابت في السنة الصحيحة، إلا أن الاعتبار بالذهب يبقى أرجح عند طائفة من أهل العلم. وقد كان هذا النصاب في الماضي يعادل نحو ستة وعشرين ريالًا مصريًا وتسعة وثلث قروش، أو نحو خمسين ريالًا سعوديًا أو إماراتيًا، أو نحو ستين أو خمسة وخمسين روبية في باكستان والهند.</p>

<p>ولا تجب الزكاة في النقود الورقية إلا إذا بلغت النصاب الشرعي، وحال عليها الحول، وكانت خالية من الديون المستغرقة. وهذا هو مقتضى الحق والعدل. وزاد الحنفية شرطًا آخر، وهو أن يكون النصاب زائدًا عن الحاجات الأصلية للمالك مثل النفقة واللباس وأجرة المسكن وأدوات الحرب.</p>

<p><strong>تفصيل آراء العلماء في زكاة أسهم الشركات</strong></p>

<p>سبب هذا البحث هو ظهور التعامل بالأسهم والسندات. فالناس لا يزالون حريصين على تحصيل الأرباح وابتغاء فضل الله عن طريق التجارة الفردية أو الخاصة أو الجماعية أو العامة، عملًا بتوجيهات الشريعة واستجابةً للفطرة في تنمية المال واستثماره حتى لا تأكله الصدقة مع مرور السنين. فالزكاة قد تستغرق أصل المال بمرور الأعوام إذا لم يُستثمر.</p>

<p>ورأس المال الخاص كثيرًا ما لا يكفي — غالبًا — لتمويل المشروعات الكبرى من المصانع والزراعة والتجارة الواسعة التي تحتاج إلى رؤوس أموال ضخمة، كما هو الحال في الشركات المساهمة التي تتطلب أموالًا كثيرة لإنشائها. ولهذا ظهر في العصر الحديث أسلوب تجزئة رأس المال الكبير فيما يسمى بالأسهم التي طُرحت في الحياة الاقتصادية، ويكتتب فيها مئات أو آلاف الأشخاص.</p>

<p>وقد تحتاج الشركات القائمة أحيانًا إلى الاقتراض من الأفراد، فتستعمل ما يسمى بالسندات مقابل فائدة محددة مقررة.</p>

<p>وكل من الأسهم والسندات يسمى في الاصطلاح الاقتصادي الحديث "الأوراق المالية"، وهي متداولة بين عامة الناس، إما عن طريق الإعلان في الصحف اليومية، وإما في سوق مخصوص يسمى سوق الأوراق المالية أو البورصة.</p>

<p>ومنذ ظهور الشركات المساهمة في الربع الثاني من القرن العشرين أخذ الناس يتساءلون عن حكم التعامل بالأسهم والسندات من حيث الحل والحرمة، وعن حكم الزكاة الواجبة فيها، ومن هو الملزم بإخراجها. وقد صدرت عن العلماء المعاصرين فتاوى متقاربة في إباحة التعامل بالأسهم وتحريم السندات لما تشتمل عليه من الربا بسبب الفائدة المقررة على مبلغ الدين المكتوب فيها.</p>

<p>وقد اختلفوا في نسبة الزكاة الواجبة: هل هي 2.5٪ أم العشر؟ كما اختلفوا فيمن يجب عليه إخراج زكاة الأسهم: أهو مالك السهم أم الشركة نفسها؟ لكنهم اتفقوا على وجوب الزكاة في الأسهم والسندات إذا بلغت قيمتها النصاب الشرعي، وإن كانت السندات مختلطة بالحرام بسبب الربا أو فساد العمل؛ لأن الحرام العارض لا يمنع وجوب الزكاة، بل لا سبيل للتخلص من المال الحرام إلا بصرفه في وجوه البر.</p>

<p><strong>تعريف الأسهم والسندات</strong></p>

<p>السهم هو صك متساوي القيمة، غير قابل للتجزئة، قابل للتداول، ويمثل حقوق المساهمين في الشركات المشتركة في رأس المال.</p>

<p>والسهم يمثل جزءًا من رأس مال الشركة، وصاحبه هو المساهم. وللأسهم خصائص منها:</p>

<p>أ. أن الأسهم متساوية في قيمتها الاسمية، فلا يجوز إصدار أسهم بقيم مختلفة. والقيمة الاسمية هي القيمة التي يصدر بها السهم، والتي يحددها القانون بنسبة معينة، كما في بعض الدول مثل الإمارات حيث تكون درهمًا أو مائة درهم. وهذه القيمة تختلف عن القيمة التجارية والقيمة الحقيقية. فالقيمة الاسمية هي المكتوبة في الصك والتي يُحسب بها مجموع رأس مال الشركة. أما القيمة التجارية فهي قيمة السهم في السوق أو البورصة، وهي متغيرة بحسب العرض والطلب، وظروف السوق، وسمعة الشركة، وضماناتها المالية. وأما القيمة الحقيقية فهي قيمة المال الذي يمثله السهم لو صُفِّيت الشركة وقُسمت أصولها على عدد الأسهم.</p>

<p>ب. أن السهم غير قابل للتجزئة، بمعنى أنه لا يمكن أن ينقسم إلى أجزاء في مواجهة الشركة إذا تعدد ملاكه.</p>

<p>ج. أن السهم قابل للتداول العام، أي يمكن انتقال ملكيته من شخص إلى آخر بطرق التداول المعروفة دون حاجة إلى أمر من الشركة نفسها.</p>

<p>فإذا كان السهم اسميًا كان تداوله بطريق التظهير، وإذا كان لحامله كان تداوله بالمناولة والتسليم.</p>

<p>وتشترط أكثر القوانين أن تكون الأسهم اسمية، وبعضها يجيز إصدار أسهم لحاملها بشروط خاصة.</p>

<p>وخلاصة ذلك أن الأسهم تمثل حصصًا في شركة الأموال.</p>

<p>أما السند فهو صك مالي قابل للتداول، يخول من كُتب باسمه أن يستحق مبلغًا من المال أقرضه، على أن يُرد إليه أصل الدين مع فائدة محددة عند الأجل. وبعبارة أخرى، فالسند هو التزام كتابي بدين لصاحبه في تاريخ معين مقابل فائدة محددة سلفًا.</p>

<p>والسند يشبه السهم من حيث وجود القيمة الاسمية، ومن حيث قابليته للتداول، ومن حيث عدم قابليته للتجزئة.</p>

<p>لكن الفرق الجوهري بين السهم والسند هو أن السهم يمثل حصة في الشركة، فصاحبه شريك فيها. أما السند فيمثل دينًا على الشركة أو على الدولة، فحامله دائن لا شريك.</p>

<p>وبناءً على ذلك فإن صاحب السهم لا يحصل على ربح إلا إذا ربحت الشركة، أما حامل السند فإنه يأخذ فائدة ثابتة كل سنة سواء ربحت الشركة أم خسرت.</p>

<p>وغالبًا ما يذكر اسم صاحب السهم لضمان رقابة الدولة على المساهمين، أما السند فقد يكون باسم صاحبه أو لحامله.</p>

<p>وهذا الرأي يتفق مع ما قررته المذاهب الأربعة من أنه لا زكاة في المصانع والمباني الاستثمارية نفسها، وإنما الزكاة في أرباحها السنوية إذا بلغت النصاب الشرعي وحال عليها الحول. وهذا هو الرأي الذي أخذ به مجمع الفقه الإسلامي بجدة في دورته الثانية سنة 1406هـ / 1985م.</p>

<p>وقد قرر فقهاء المذاهب أنه لا زكاة في الأسلحة المستعملة، ولا في كتب العلماء، ولا في أدوات المهنة، لأنها معدة للحاجات الأصلية وليست نامية بذاتها. وسبب الزكاة هو ملك النصاب النامي بالفعل أو بالقوة.</p>

<p>وفي كتاب <em>المعيار المعرب</em> لأبي العباس الونشريسي سُئل عن الصناع الذين مر عليهم الحول وفي أيديهم من مصنوعاتهم ما لو قُوِّم وضُمَّ إلى ما عندهم من النقد لبلغ النصاب: هل يجب عليهم تقويمه وإخراج زكاته؟</p>

<p>فأجاب بأن الحكم هو أن الصناع يزكون ما حال عليه الحول من النقد الذي بأيديهم إذا بلغ نصابًا، ولا يلزمهم تقويم ما صنعوه وانتظار الحول لقيمته، لأنه من كسب العمل الذي لا يتحصل إلا عند البيع. أما المواد التي اشتروها للتجارة كالجلود والخشب والحديد ونحوها فإنها تُقوَّم وتزكّى.</p>

<p>وهذه فتوى واضحة جدًا، وفيها تيسير ظاهر على أصحاب الصناعات كصناع الأحذية والأثاث والخزائن الحديدية ونحوهم.</p>

<p>وقد أيّد الدكتور وهبة الزحيلي رأي الشيخ عبد الرحمن عيسى، مع التنبيه إلى وجوب الزكاة على الشركات الصناعية إذا كانت منتجاتها سلعًا معدة للبيع أو التصدير بعد خصم قيمة الآلات والمباني. فالمطبعة مثلًا تزكي ما تنتجه في نهاية السنة من أوراق وكتب تملكها، كما تزكي الأرباح الناتجة من أجور الطباعة، بعد خصم قيمة آلات الطباعة والتجليد ونحوها مما يدخل في رأس المال الثابت.</p>

<p>لكن الأستاذ الدكتور يوسف القرضاوي خالف هذا الرأي، ورأى وجوب الزكاة في جميع أسهم الشركات، سواء كانت صناعية أم تجارية. وقال إن التفريق بين النوعين لا ينسجم مع عدالة الشريعة التي لا تفرق بين متماثلين.</p>

<p>ثم رجح الرأي الثاني، وهو رأي الشيخ محمد أبو زهرة ومن وافقه، القائل بعدم التفريق بين نوعي الأسهم بحسب نوع الشركة، ورأى أن هذا أيسر للأفراد وأسهل في الحساب.</p>

<p>ثم قال: "أما إذا وجدت دولة إسلامية تريد جمع الزكاة من الشركات، فلعل رأي الدكتور وهبة الزحيلي في ترجيح الرأي الأول — وهو رأي الشيخ عيسى — يكون أولى وأرجح." والله أعلم.</p>

<p><strong>2. رأي الأستاذ عبد الوهاب خلاف وعبد الرحمن حسن ومحمد أبو زهرة</strong></p>

<p>يرى هؤلاء الأساتذة أن الأسهم والسندات — أي الأوراق المالية — إذا اتُّخذت للتجارة فإنها تصبح من عروض التجارة التي تجب فيها زكاة التجارة، أي بنسبة 2.5٪. فتكون زكاتها 2.5٪ من الأصل والنماء، كما قرره جمهور الفقهاء.</p>

<p>وقد رجح الدكتور القرضاوي هذا الرأي وقال: "لعل هذا الرأي والفتوى أقرب لمراعاة حال الأفراد من الرأي الأول، لأن كل مساهم يعلم عدد أسهمه، ويعلم ربحه السنوي، فيستطيع أن يزكيه بسهولة. بخلاف الرأي الأول الذي يفرق بين أسهم الشركات الصناعية والتجارية، فيؤخذ من بعضها الزكاة من الدخل، ومن بعضها من قيمة السهم مع الربح، وفي ذلك شيء من التعقيد على عامة الناس."</p>

<p>غير أن الدكتور وهبة الزحيلي يرى أن الرأي الأول هو الموافق لما قرره الفقه، وهو الذي جرى العمل عليه منذ ظهور الشركات المساهمة وانتشارها في الأربعينيات، ولا يرى فيه تعقيدًا. فالمسلم يعلم أن الآلات الصناعية لا زكاة فيها، فإذا استثمر ماله في أسهم شركة صناعية فإنه يخصم ما يقابل قيمة الآلات، وإذا استثمره في أسهم شركة تجارية فإنه يزكيها زكاة عروض التجارة.</p>

<p>وكان للأستاذ محمد أبو زهرة رأي قديم مفصل ذُكر في ندوة الدراسات الاجتماعية بجامعة الدول العربية بدمشق سنة 1952م، كما أُعلن في المؤتمر الثاني لمجمع البحوث الإسلامية سنة 1965م.</p>

<p>ومضمونه أن الأسهم والسندات إذا اتخذت للمضاربة والبيع والشراء في سوق الأوراق المالية فإنها تعامل معاملة عروض التجارة، فتقوَّم في أول السنة وفي آخرها، ويزكى رأس المال والربح بنسبة 2.5٪ إذا بلغ النصاب.</p>

<p>أما إذا كانت بقصد الاستثمار وتنمية المال لا بقصد المضاربة والبيع والشراء، وإنما لاقتناء أرباحها السنوية، فإن زكاة الشركة تكفي عن زكاة المساهمين، فلا تجب عليهم زكاة مستقلة.</p>

<p>وهذا الرأي ينظر إلى الأسهم من جهة نية مالكها: هل قصد بها التجارة أو الاستثمار؟ وهو رأي كان مناسبًا في وقت كانت الشركات نفسها تزكي أموالها أو تسأل عن كيفية زكاتها.</p>

<p>غير أن الدكتور وهبة الزحيلي لا يرى الحاجة إلى هذا التفصيل، لأن المقصود من شراء الأسهم في الأصل واحد، وهو التجارة والربح، فتزكى زكاة عروض التجارة.</p>

<p><strong>3. فتوى الهيئة الشرعية لبنك فيصل الإسلامي السوداني</strong></p>

<p>جاء في الفتوى رقم 17 الصادرة عن الهيئة الشرعية لبنك فيصل الإسلامي السوداني — من غير طلب فتوى من جهة معينة — ما يلي:</p>

<p>قررت الهيئة — بناءً على رأي جمهور أعضائها — أن البنك يخرج زكاة أسهمه على النحو الآتي:</p>

<p>يخرج البنك زكاة الأسهم عند تمام الحول بنسبة 2.5٪ من المال المدفوع، أي من قيمة الأسهم مضافًا إليها قيمة عروض التجارة الخاصة بها. ولا زكاة في الأصول الثابتة، وإنما في الأرباح المتصلة بالأسهم.</p>

<p>فإذا اشترى البنك عقارات بأموال الأسهم للتجارة بيعًا وشراءً، زكاها زكاة عروض التجارة، أي يضيف قيمتها إلى الأموال النقدية. أما إذا اشترى العقارات للإيجار، فإنه يزكيها كزكاة الأصول بإخراج 10٪ من أجرتها عند القبض.</p>

<p>وإذا دفع البنك بعض أموال الأسهم للعاملين فيه مضاربةً، فإنه يزكي رأس المال الذي سُلِّم للمضارب مع نصيب الربح.</p>

<p>وإذا كان على البنك ديون تجارية حالة من أموال الأسهم، وله كذلك ديون على غيره، فإنه يضم ديونه المرجوة السداد إلى ماله، ثم يخصم ما عليه من ديون ويزكي الباقي. وإذا زادت ديون البنك على ما له من ديون، خصم الزائد من المال الموجود لديه ثم زكى ما بقي. وإذا كانت له ديون تجارية مؤجلة مرجوة الأداء، فإنها تقوم وتزكى بقيمتها الحالية.</p>

<p>وإذا كان للبنك ديون مرجوة الأداء، فإنه يزكيها كما يزكي النقد الموجود.</p>

<p>وسُئل عن أصحاب الأسهم الصغيرة التي لا تبلغ نصابًا: هل تجب زكاتها إذا ضُمت إلى غيرها؟ فإن قيل لا تجب عليهم الزكاة لعدم بلوغ ملك كل منهم نصابًا، فإن قيمة هذه الأسهم تُستبعد من مجموع الأسهم المزكاة.</p>

<p>وهذه الأصول في الجملة توافق القول بأن الأسهم تزكى زكاة عروض التجارة، لكنها تختلف عنه في بعض التفصيلات، إذ جعلت العبرة بالقيمة الحقيقية — أي الاسمية — لا بالقيمة السوقية كما يقول من يعاملها معاملة عروض التجارة، لأن القيمة السوقية تقديرية، بينما القيمة الحقيقية تمثل الواقع، ولا يصح العدول إلى التقدير مع إمكان معرفة الحقيقة. وكذلك العقارات المستثمرة جعلت زكاتها من أجرتها لا من قيمتها، لأنها في حقيقتها ليست عروض تجارة.</p>

<p>ومن الواضح أن ما دُفع من القسط الأول من الأسهم قد حال عليه الحول ووجبت فيه الزكاة، وعلى البنك إخراجها وفق الأصول المذكورة. وإذا تعذر تطبيق هذه القواعد تطبيقًا كاملًا في الوقت الحاضر، جاز للبنك أن يخرج 2.5٪ من المبالغ المدفوعة في القسط الأول بعد خصم قيمة الأدوات الثابتة والأسهم التي لم تبلغ النصاب، إلى أن يتيسر تطبيق النظام كاملًا مستقبلًا.</p>

<p>وهذا المخرج المؤقت لا يختلف كثيرًا عن القول بأن الأسهم من عروض التجارة التي تؤخذ زكاتها من قيمتها السوقية مع الأرباح بعد خصم قيمة الأدوات الثابتة، إلا في جهتين: الأولى اعتبار القيمة الاسمية لا السوقية، والثانية عدم إضافة الأرباح لعدم معرفتها حينئذ، وعدم خصم النفقات وإن عُرفت، لأن الأصل أن تُغطى النفقات من الربح لا من رأس المال، ما دام الربح غير معتبر في الحساب. والله أعلم.</p>

<p>ومع أن الدكتور وهبة الزحيلي أيد هذه الفتوى في الجملة، إلا أنه خالفها في أمور: أولها أن العقارات المستثمرة تزكى من أرباحها بنسبة 2.5٪ لا بنسبة العشر من الأجرة عند القبض، وذلك بعد تمام الحول مع بقاء العين في يد المالك أو البنك. وثانيها أن الأسهم الموجودة في الشركات تزكى كمالين مختلطين، ولو لم تبلغ حصة بعض المساهمين النصاب الشرعي. وثالثها أن الأسهم تُقوَّم بالقيمة السوقية المعروفة في البورصة لا بالقيمة الاسمية وحدها، إذ قد تزيد القيمة السوقية أضعافًا كثيرة. ورابعها أن الأرباح إذا أمكن معرفتها تُضم إلى قيمة الأسهم الزكوية، لأن كل شركة تضع في نهاية السنة ميزانية شاملة تبين فيها رأس المال والأصول والخصوم والأرباح والديون.</p>

<p><strong>مقدار الزكاة الواجبة في الأسهم</strong></p>

<p>الأسهم — كما تقدم — تزكى زكاة عروض التجارة، ولذلك فإن المقدار الواجب فيها هو 2.5٪ من الأصل والنماء أو الربح.</p>

<p>ولما كنا لا نأخذ بالتفصيل المنقول عن الأستاذ أبي زهرة، مع التمسك برأي الشيخ عبد الرحمن عيسى في التفريق بين الأسهم التجارية والصناعية، فإن ما ذكره أبو زهرة من أن زكاة الأسهم التجارية 2.5٪، وزكاة الأسهم الاستثمارية 10٪ كالزكاة على الأصول الثابتة، لا يوافق ما عليه الفقهاء في المشهور من أن نسبة الزكاة في عروض التجارة هي 2.5٪.</p>

<p>وعليه فإن جعل زكاة الأسهم الاستثمارية 10٪ ليس هو المعتمد فقهيًا، ولا موجب للتفريق بين أسهم التجارة وأسهم الاستثمار، ولا سيما أن أبا زهرة نفسه لم يذكر هذا التفصيل في رأيه الأخير، بل اكتفى بالقول بوجوب زكاة الأسهم زكاة عروض التجارة.</p>

<p>وخلاصة الأمر أن زكاة الأسهم والسندات واجبة بنسبة 2.5٪ من قيمتها التجارية مع أرباحها في نهاية كل سنة، أما الأصول الثابتة من الأرباح الصافية فلا تزكى بنسبة 10٪.</p>

<p><strong>من الذي تجب عليه زكاة الأسهم؟</strong></p>

<p>يرى الأستاذ أبو زهرة ومن تبعه أن ما يؤخذ من الأسهم والسندات بالنسبة لمن يتعامل بها في الشركة ليس هو ما يؤخذ من الشركة نفسها؛ لأن زكاة الشركات تنظر إلى المال من حيث نموه بالإنتاج ونحوه، أما الأسهم بالنسبة للتاجر فيها فهي مال نامٍ من جهة كونها عروض تجارة.</p>

<p>وقد انتقد الدكتور القرضاوي هذا الازدواج لأنه يؤدي إلى فرض الزكاة على الأسهم نفسها مرتين: مرة باعتبار صاحبها مساهمًا، ومرة باعتباره تاجرًا، فيؤخذ 2.5٪ من قيمة الأسهم وأرباحها، ثم يؤخذ العشر من أرباح الشركة أو دخلها. والصواب عنده الاكتفاء بأحد الأمرين: إما زكاة قيمة السهم وربحه بنسبة 2.5٪، أو زكاة دخل الشركة وأرباحها بنسبة العشر من الربح الصافي، تجنبًا للازدواج والتكرار.</p>

<p>أما الدكتور وهبة الزحيلي فيرى أن زكاة الأسهم تكون بنسبة 2.5٪ من الأصول الزكوية مع الأرباح السنوية. وتُقوَّم الأسهم كما تُقوَّم عروض التجارة في نهاية كل سنة بحسب سعرها في السوق وقت إخراج الزكاة لا بحسب سعر الشراء. وتُضم الأسهم بعضها إلى بعض في التقييم ولو اختلفت أنواعها بين التجارة والإنتاج، بعد خصم قيمة وسائل الإنتاج.</p>

<p>والشركات هي التي تخرج زكاة جميع الأسهم، لأن الشركة ذات شخصية اعتبارية مستقلة، وهي نائبة عن المساهمين.</p>

<p>ولما كانت الزكاة تتعلق بالمال نفسه، فإنها تجب على الشخصية الاعتبارية، ولا يُشترط فيها التكليف الذي أصله البلوغ والعقل. ويقاس ذلك على زكاة السائمة في مذهب الشافعي الذي يرى تأثير الخلطة في الأنعام وغيرها، وهو أيضًا قول المالكية والحنابلة في باب زكاة الأنعام، عملًا بعموم الحديث الصحيح: «لا يُجمع بين متفرق ولا يُفرّق بين مجتمع خشية الصدقة».</p>

<p>ولأن السهم يعبر عن قيمة مالية أو مقدار من المال، فهو مال تجب فيه الزكاة، فتؤثر فيه الخلطة كما تؤثر في الماشية. وكذلك لأن المالين يكونان كالمال الواحد في نفقات التخزين والحفظ والبيع ونحوها. والأموال الزكوية الأخرى كالنقدين والحبوب والثمار وعروض التجارة تقاس على الأنعام من هذه الجهة.</p>

<p>وعلى هذا فلا يُعفى أحد من المساهمين في الشركات المساهمة من زكاة أسهمه ولو كان لا يملك إلا سهمًا واحدًا. وتخرج الزكاة من صافي رأس مال الشركة النامي وربحه بنسبة 2.5٪. أما الأصول الثابتة كالأراضي والمباني والآلات ونحوها فلا تدخل في الحساب، لأن السهم يمثل حصةً في رأس المال الصافي المكوَّن من الأموال والأصول المتداولة من نقد وبضائع.</p>

<p>وأما القول بأن زكاة الأسهم تكون كزكاة الأصول الثابتة بنسبة 10٪ من الربح فهو قول ضعيف لا يعرف عن فقهائنا المتقدمين.</p>

<p>ثم إن في إلزام الشركة المساهمة بإخراج زكاة جميع الأسهم مصلحة ظاهرة للفقراء.</p>

<p>وخلاصة رأي الدكتور وهبة الزحيلي أن زكاة الأسهم في الشركات تكون بحسب قيمتها التجارية المعلنة في السوق، لا بحسب قيمتها الاسمية فقط. فإن كانت الشركة تجارية زُكيت الأسهم زكاة عروض التجارة بنسبة 2.5٪. وإن كانت الشركة صناعية محضة لا تتاجر ولا تنتج سلعًا للتجارة فلا زكاة في الأسهم من هذه الجهة. أما إذا كانت الشركة تنتج سلعًا تجارية، كالشركات المصنعة للثلاجات مثلًا، فإن أسهمها تزكى بعد خصم ما يقابل قيمة الآلات الصناعية والمباني. وتتولى الشركة نفسها تقدير الزكاة لجميع الأسهم، لا أصحاب الأسهم فرادى. وعند توزيع الزكاة يمكن للشركة أن تسلم زكاة كل مساهم إليه ليقوم هو بدفعها إلى الفقراء. والله أعلم.</p>
    `
  },
  {
    title: "زكاة الدخل",
    body: `
      <div class="fiqh-image">
  <img src="assets/images/gaji.png" alt="صورة توضيحية للزكاة">
</div>

<p><strong>زكاة المباني والمصانع والدخل والمهن الحرة</strong></p>

<p>إن البحث في زكاة المباني والمصانع والأعمال والمهن الحرة يُعَدّ امتدادًا للبحث في زكاة النقود، ولا سيما بعد بيان حكم زكاة الأسهم والسندات. وقد خُصِّص هذا الجزء لبحث زكاة الدخل الذي يحصل عليه الإنسان من تأجير المباني والمصانع ووسائل النقل، وكذلك من الوظائف والمهن الحرة. وفي هذا العصر لم يعد رأس المال يُستعمل في الاستثمار في الأراضي الزراعية أو التجارة فقط، بل يُستعمل أيضًا في إنشاء المباني المؤجرة، وإقامة المصانع للإنتاج، وتجهيز وسائل النقل كالطائرات والسفن والسيارات، وكذلك في تربية الأبقار والدواجن. وهذه الصور كلها تشترك في صفة واحدة، وهي أن الزكاة لا تجب في عينها نفسها (أي في أصولها الثابتة)، وإنما تجب في الإيراد أو الربح الصافي الناتج عنها.</p>

<p>ومع أن جمهور الفقهاء المتقدمين لم يصرحوا بوجوب الزكاة في مثل هذه الإيرادات، وقالوا بعدم وجوب الزكاة في دار السكن وأثاث البيت وأدوات العمل ودواب الركوب، إلا أن هناك رأيًا يرى أهمية إيجاب الزكاة في الغلة الناتجة عن هذه الأصول المنتجة. ويستند هذا إلى وجود علة الزكاة، وهي النماء والزيادة. فالحكم الشرعي يدور مع علته وجودًا وعدمًا، كما أن من حكم تشريع الزكاة تطهير مال المالك وتزكيته، وإدخال السرور على المحتاجين، والمساهمة في مكافحة الفقر الذي تهتم به المؤسسات والمنظمات المختلفة في العالم.</p>

<p>وقد قرر مؤتمر علماء الإسلام الثاني ومؤتمر البحوث الإسلامية الثاني سنة 1385هـ / 1965م أن المال النامي الذي لا يوجد فيه نص خاص، ولا قول فقهي قديم يوجب الزكاة في عينه، لا تجب الزكاة في ذاته كالمباني المؤجرة والمصانع والطائرات ونحوها، وإنما تجب الزكاة في ربحه الصافي إذا بلغ النصاب وحال عليه الحول. ومقدار زكاته 2.5٪ من الربح الصافي في نهاية السنة، كزكاة التجارة وزكاة النقود. وفي الشركات لا يُنظر إلى مجموع أرباح الشركة جماعيًا، بل إلى النصيب الذي يخص كل مالك أو كل وحدة استثمارية. وهذا القرار ينسجم مع ما رُوي عن الإمام أحمد من أن الأشياء التي تدرّ ربحًا ماليًا تجب فيها الزكاة، كما يوافق رأي بعض المالكية الذين أوجبوا الزكاة في الأشياء المربحة. وكذلك ذهب ابن عقيل الحنبلي والهادوية من الزيدية إلى أن الأشياء التي تدرّ دخلًا، ومن ذلك العقارات المؤجرة وكل ما أُعِدّ للإجارة، تجب فيها الزكاة كل سنة كزكاة عروض التجارة.</p>

<p>أما زكاة الأعمال والمهن الحرة، فإن الأعمال منها ما هو حر غير مرتبط بالدولة، كالطبيب والمهندس المعماري والمحامي والخياط والنجار وسائر أصحاب المهن الحرة، ومنها ما هو مرتبط بمؤسسات الدولة أو الشركات العامة والخاصة، حيث يتقاضى الموظف راتبًا شهريًا. والدخل الذي يحصل عليه صاحب المهنة الحرة أو الموظف له بحث فقهي خاص. فقد قررت المذاهب الأربعة أنه لا زكاة في الربح حتى يبلغ النصاب ويحُول عليه الحول. لكن غير الشافعية قالوا بوجوب الزكاة في المال المدخر كله، وإن حصل بعضه قبل تمام الحول بقليل، ما دام الأصل قد بلغ النصاب. وهناك أيضًا من قال بوجوب إخراج الزكاة من الربح فور الحصول عليه وإن لم يحل عليه الحول، كما نُقل عن بعض الصحابة كابن عباس وابن مسعود ومعاوية، وعن بعض التابعين كالزهري والحسن البصري ومكحول، وكذلك عن عمر بن عبد العزيز والباقر والصادق والناصر وداود الظاهري.</p>

<p>ومقدار زكاة الدخل هو 2.5٪ استنادًا إلى عموم الأدلة الموجبة للزكاة في النقود. وسواء بلغ هذا الدخل حولًا، أو أُخرجت زكاته عند قبضه على رأي من يجيز ذلك، فالمقدار يبقى 2.5٪. فإذا أخرج المسلم زكاة دخله عند قبضه، فلا يلزمه أن يخرجها مرة أخرى عند تمام الحول على المال نفسه. وبهذا يكون صاحب الدخل المستمر في حكم المزارع الذي يخرج زكاة الزروع والثمار عند الحصاد وبعد التصفية.</p>

 
    `
  },
  {
    title: "زكاة عروض التجارة",
    body: `
      <div class="fiqh-image">
    <img src="assets/images/dagang.png" alt="صورة توضيحية للزكاة">
  </div>
  

  <p>المقصود بعروض التجارة هو ما يسمى في العربية بالعُروض، جمع عَرَض، وهي الأموال الدنيوية غير الذهب والفضة المضروبين، من السلع والعقارات وأنواع الحيوانات والنباتات والملابس وغيرها مما أُعِدّ للتجارة.</p>

  <p>وعند المالكية يدخل في ذلك أيضًا الحلي المعدّ للتجارة. فالعقار الذي يجعله مالكه محل بيع وشراء حكمه حكم عروض التجارة وتجب فيه الزكاة كزكاة التجارة. أما العقار الذي يُسكن فيه أو يُستخدم لمزاولة العمل كالمتجر والمصنع، فلا زكاة فيه.</p>

  <p><strong>شروط زكاة عروض التجارة</strong></p>

  <p>اشترط الفقهاء لجواز زكاة عروض التجارة شروطًا عدة، ومن الشروط المتفق عليها: بلوغ النصاب، وتمام الحول، ووجود نية التجارة.</p>

  <p>ونصابها يتبع نصاب الذهب والفضة المضروبين. وتُقوَّم السلع بحسب سعرها في البلد الذي توجد فيه، فإن كانت في موضع ناءٍ قُوِّمت بحسب أقرب بلد.</p>

  <p>وفرق المالكية بين التاجر المحتكر والتاجر المدير. فالمحتكر لا تجب عليه الزكاة حتى يبيع سلعته، ثم يزكيها لسنة واحدة فقط. أما المدير الذي يدير تجارته باستمرار، فعليه أن يقوِّمها كل سنة ويخرج زكاتها إذا بلغت النصاب.</p>

  <p>ويرى جمهور العلماء أن المحتكر والمدير حكمهما واحد، وهو أنه إذا تم الحول قُوِّمت السلع وأُخرجت زكاتها. أما المالكية فأوجبوا الزكاة على المدير ولو لم تتم مدة الحول على عين السلعة نفسها، مراعاةً للمصلحة حتى لا تسقط الزكاة.</p>

  <p><strong>حساب الحول</strong></p>

  <p>يُحسب الحول من وقت تملك المال. ويرى الحنفية والمالكية أن المعتبر هو أول الحول وآخره، لا وسطه. ويرى الشافعية أن العبرة ببلوغ النصاب في آخر الحول. أما الحنابلة فيشترطون وجود النصاب طوال الحول.</p>

  <p><strong>نية التجارة</strong></p>

  <p>يجب أن تكون نية التجارة موجودة عند التملك أو عند العقد. وعند الحنفية لا تكفي النية وحدها، بل لا بد من اقترانها بفعل واقعي. ويشترط جمهور العلماء أن يكون التملك بطريق المعاوضة كالبَيع، لا بطريق الإرث أو الهبة.</p>

  <p>وأضاف الشافعية أن النية يجب أن تتجدد في كل معاملة إلى أن ينفد رأس المال. فإذا نُوي بالمال الاستعمال، انقطع الحول. كما اشترطوا ألا يتحول جميع المال في أثناء الحول إلى نقد دون النصاب.</p>

  <p><strong>التقويم ومقدار الزكاة</strong></p>

  <p>تُقوَّم عروض التجارة في آخر السنة بحسب قيمتها السوقية حينئذ، لا بحسب سعر شرائها. وتُجمع السلع المختلفة الأنواع في التقييم. وزكاتها 2.5٪ من قيمتها، وذلك بالإجماع.</p>

  <p>ومن أدلتها قول الله تعالى في سورة البقرة الآية 267، والأحاديث الواردة في وجوب زكاة التجارة.</p>

  <p>وطريقة التقويم عند جمهور العلماء تكون بما هو أنفع للفقراء، سواء أكان بالذهب أم بالفضة. أما الشافعية فيقوِّمون بحسب النقد الذي استُعمل عند الشراء.</p>

  <p>ويجيز الحنفية إخراج الزكاة من عين السلع أو من قيمتها. أما جمهور العلماء فيرون أن الإخراج يكون من القيمة.</p>

  <p><strong>الربح ونماء المال</strong></p>

  <p>أما ضم الربح والنماء، فقد اتفق العلماء على أن ربح التجارة يُضم إلى رأس المال ويزكى معه عند تمام الحول.</p>

  <p>والحنفية يضمون أيضًا المال المكتسب بغير التجارة كالإرث. أما المالكية والشافعية فلا يضمونه إلى المال التجاري في حول واحد، بل يبتدئون له حولًا جديدًا. والحنابلة يوافقون الشافعية في ذلك، لكنهم يشترطون أن يكون الأصل قد بلغ النصاب.</p>

  <p><strong>تفصيلات إضافية عند المالكية</strong></p>

  <p>يرى المالكية أن التاجر المحتكر لا يزكي إلا عند البيع ولسنة واحدة، أما التاجر المدير فعليه التقويم والإخراج كل سنة.</p>

  <p>والديون المرجوة الأداء تُضم إلى المال وتزكى، أما الديون المتعسرة فلا زكاة فيها حتى تُقبض، ثم تُزكى لسنة واحدة فقط.</p>

  <p><strong>الزكاة في شركة المضاربة</strong></p>

  <p>في شركة المضاربة يرى أبو حنيفة أن رب المال والعامل يزكي كل واحد منهما نصيبه كل سنة دون انتظار القسمة.</p>

  <p>ويرى الحنابلة أن رب المال يزكي رأس المال والربح، أما العامل فيزكي نصيبه بعد القسمة، ويبدأ حوله من وقت القسمة.</p>

  <p>ويرى الشافعية أن رب المال يزكي رأس المال والربح، والعامل يزكي نصيبه من وقت ظهور الربح لأنه صار مستحقًا له.</p>

  <p>أما المالكية فيرون أن رب المال يزكي رأس المال والربح كل سنة، بينما العامل يزكي نصيبه بعد القسمة ولسنة واحدة فقط.</p>

  <p><strong>زكاة التجارة وتفاصيلها العملية</strong></p>

  <p>وفي التطبيق العملي، يجب على كل تاجر في نهاية الحول أن يحصي جميع عروض التجارة التي يملكها، ويقوِّمها بسعر السوق آنذاك، ثم يضم إليها ما عنده من النقد والذهب والفضة والديون المرجوة. وبعد خصم الديون الحالة، فإن بلغ الباقي النصاب وجبت الزكاة بنسبة 2.5٪.</p>

  <p>أما أدوات المتجر والرفوف والموازين ووسائل النقل التشغيلية وآلات الإنتاج وأدوات العمل، فلا تدخل في عروض التجارة ولا تُقوَّم للزكاة، لأنها ليست معدة للبيع، وإنما لخدمة النشاط التجاري.</p>

  <p><strong>تغيّر النية في التجارة</strong></p>

  <p>إذا اشترى التاجر سلعة بنية التجارة ثم غيّر نيته في أثناء الحول إلى الاستعمال الشخصي، فإن الحول ينقطع عند جمهور العلماء، ولا تُعد تلك السلعة بعد ذلك من عروض التجارة. وإذا عاد بعد ذلك فنوى بيعها، ابتدأ لها حولًا جديدًا من وقت النية الجديدة.</p>

  <p>وعلى العكس، إذا ملك شخص سلعة للاستعمال ثم نوى بعد ذلك جعلها للتجارة، فإن جمهور العلماء لا يعدّونها من عروض التجارة إلا إذا وقع عقد جديد أو نشاط تجاري حقيقي.</p>

  <p><strong>تغير قيمة النصاب أثناء الحول</strong></p>

  <p>إذا بلغت قيمة عروض التجارة النصاب في أول الحول، ثم نقصت في أثناء السنة عن النصاب، ثم عادت فبلغته في آخر الحول، فالزكاة واجبة عند الحنفية والمالكية لأن العبرة بأول الحول وآخره. أما الشافعية فيكتفون بوجود النصاب في آخر الحول. والحنابلة أشد في هذا، إذ يشترطون دوام النصاب طوال الحول إلا في النقص اليسير الذي لا يعتد به.</p>

  <p><strong>الأرباح ونمو رأس المال</strong></p>

  <p>الأرباح التي تتحقق خلال السنة، ولو حصلت قبل تمام الحول بقليل، تُضم إلى رأس المال وتزكى معه، لأنها نماء للأصل. وهذا يدل على أن زكاة التجارة تُنظر فيها إلى مجموع الثروة التجارية في نهاية المدة، لا إلى رأس المال الأول فقط.</p>

  <p><strong>الزكاة في المضاربة عمليًا</strong></p>

  <p>في التطبيق العملي للمضاربة، إذا استمر المشروع دون قسمة أرباح، فإن بعض المذاهب يرى أن العامل لا تجب عليه الزكاة في نصيبه حتى يُقسم فعلًا ويملكه ملكًا تامًا، أما رب المال فيزكي كامل رأس المال ونصيبه من الربح لأن المال ما زال في حكم سلطانه.</p>

  <p>وإذا وقعت خسارة بعد تمام الحول، فالزكاة التي أُخرجت صحيحة؛ لأن الوجوب يتعلق بحال المال وقت تمام الحول، لا بما يطرأ بعده.</p>

  <p>وبهذا يتبين أن زكاة التجارة تمتاز بخصائص خاصة مقارنة بغيرها من أنواع الزكاة، لأنها مرتبطة بالنية والنشاط التجاري ودوران رأس المال. ومبدؤها العام حفظ حق الفقراء في المال النامي المتولد من النشاط الاقتصادي.</p>

  <p><strong>ضم رأس المال والربح والمال الآخر في زكاة التجارة</strong></p>

  <p>اتفق الفقهاء على أن ربح التجارة يتبع رأس المال في الحول ويضم إليه في نهاية السنة. فلو بدأ الإنسان تجارته برأس مال معين ثم ربح قبل تمام الحول، فإن رأس المال والربح يزكيان معًا عند تمام الحول بنسبة 2.5٪ إذا بلغ المجموع النصاب. ولا يُنشئ الربح حولًا جديدًا لأنه نماء للأصل.</p>

  <p>وقد وسع الحنفية هذا الضم فأدخلوا فيه المال الحاصل أثناء الحول ولو لم يكن من التجارة، كالهبة والإرث، ما دام من الجنس نفسه وفي الحول نفسه. لأنهم يرون أن الزيادة تتبع الأصل.</p>

  <p>أما المالكية ففرقوا بين ربح التجارة وبين المال الوارد من غير التجارة. فربح التجارة يُضم إلى رأس المال ويتبعه في الحول، أما المال المكتسب بالإرث أو الهبة أو الهدية فلا يضم، بل يستأنف له حول مستقل.</p>

  <p>ويرى الشافعية أيضًا أن الربح وما نتج عن النماء، كأولاد السائمة أو ثمار الأشجار المعدة للبيع، يُضم إلى الأصل ويتبع حوله. أما المال غير الناتج عن التجارة فلا يضم ويكون له حول مستقل.</p>

  <p>والحنابلة قريبون من الشافعية، إلا أنهم يشترطون أن يكون الأصل قد بلغ النصاب حتى تتبعه الزيادة في الحول.</p>

  <p><strong>الديون في زكاة التجارة</strong></p>

  <p>الديون الناشئة عن المعاملات التجارية لها حكم خاص. فإذا كانت على موسر مرجو الأداء، ضُمَّت إلى رأس المال وزُكيت كل سنة. أما إذا كانت على معسر أو غير مرجوة، فلا زكاة فيها حتى تُقبض فعلًا، فإذا قُبضت أوجب جمهور العلماء زكاتها لسنة واحدة.</p>

  <p>وعند المالكية تُضم ديون التاجر المدير إلى ماله وتزكى كل سنة إذا كانت مرجوة. فإن كانت غير مرجوة، فلا تُزكى حتى تُقبض ثم تُزكى لسنة واحدة فقط.</p>

  <p><strong>الفرق بين عروض التجارة والأصول الثابتة</strong></p>

  <p>كل ما نُوي به البيع والشراء يدخل في عروض التجارة. أما الأصول الثابتة كالمباني التجارية والمخازن ووسائل النقل والآلات والرفوف وواجهات العرض والموازين وأدوات العمل، فلا تدخل في الزكاة لأنها ليست معدة للبيع. لكن إذا اشترى الإنسان مبنى أو مركبة بنية إعادة البيع، صارت من عروض التجارة ووجبت فيها الزكاة بحسب قيمتها.</p>

  <p><strong>فرع: تغير النية في التجارة</strong></p>

  <p>إذا اشترى الإنسان شيئًا من غير نية التجارة، ثم نوى بيعه بعد ذلك، فإن جمهور العلماء لا يعدونه من عروض التجارة إلا إذا حصل نشاط تجاري حقيقي أو عقد جديد. أما إذا اشترى شيئًا بنية التجارة ثم غير نيته إلى الاستعمال الشخصي، انقطع الحول وصارت السلعة غير زكوية من جهة التجارة.</p>

  <p><strong>زكاة الشركة والمضاربة</strong></p>

  <p>في المضاربة يزكي رب المال رأس المال ونصيبه من الربح لأنه مالكه. أما العامل فيزكي نصيبه من الربح بعد القسمة عند بعض المذاهب، وعند آخرين يبدأ حوله من وقت ظهور الربح لأنه صار ذا حق فيه وإن لم يُقبض بعد.</p>

  <p>وإذا وقعت خسارة بعد تمام الحول، فالزكاة السابقة لا تبطل؛ لأن الوجوب بُني على حال المال عند تمام الحول لا على ما بعده.</p>

  <p><strong>وقت وجوب زكاة التجارة</strong></p>

  <p>وقت وجوب زكاة التجارة هو تمام الحول من حين تملك مال التجارة البالغ للنصاب. والمعتمد في ذلك آخر الحول، فحين يتم العام يجب على التاجر أن يحسب مجموع قيمة عروضه الموجودة في ذلك اليوم، لا بحسب ما كان عليه المال في جميع أيام السنة.</p>

  <p>فإن بلغ المال النصاب في أول الحول، ثم نقص أثناء السنة، ثم عاد فبلغ النصاب في آخرها، فالزكاة واجبة عند الحنفية والمالكية لأن العبرة بأول الحول وآخره. أما الشافعية فيكتفون بحال آخر الحول، بينما الحنابلة يشترطون استمرار النصاب طوال الحول إلا في النقص اليسير.</p>

  <p>وإذا بدأ الإنسان التجارة برأس مال دون النصاب، ثم زاد أثناء الحول حتى بلغ النصاب، فإن الحول يبدأ من وقت بلوغه النصاب عند جمهور العلماء.</p>

  <p><strong>تلف عروض التجارة أو انخفاض قيمتها</strong></p>

  <p>إذا تلفت السلع التجارية أو انخفض سعرها قبل نهاية الحول حتى لم تعد تبلغ النصاب، فلا زكاة فيها عند جمهور العلماء لأن النصاب لم يتحقق في آخر الحول.</p>

  <p>لكن إذا انخفضت قيمتها في أثناء السنة ثم عادت فارتفعت حتى بلغت النصاب عند نهاية الحول، فالزكاة واجبة لأن العبرة بحال آخر الحول.</p>

  <p>ويكون التقييم بحسب سعر السوق وقت إخراج الزكاة، لا بحسب سعر الشراء، ولا بحسب أعلى سعر مرت به السلعة أثناء السنة.</p>

  <p><strong>زكاة الشركات الحديثة</strong></p>

  <p>في سياق الشركات الحديثة، فإن جميع البضائع المعدة للبيع تدخل في عروض التجارة. كما تدخل في حساب الزكاة النقود الموجودة في الشركة، وأرصدة الحسابات، والديون الجارية المرجوة التحصيل، والأرباح غير الموزعة.</p>

  <p>أما الأصول الثابتة كالمباني الإدارية، وآلات الإنتاج، والسيارات التشغيلية، والحواسيب، والمعدات، فلا تدخل في وعاء الزكاة لأنها ليست معدة للبيع. لكن العوائد المتحصلة من استعمالها تدخل في الأموال الزكوية إذا اختلطت برأس مال الشركة.</p>

  <p>وإذا كانت الشركة على صورة مساهمة أو شراكة، فإن كل مساهم يزكي حصته بحسب نسبة ملكه، إلا إذا كانت الشركة قد أخرجت الزكاة عن جميع المساهمين.</p>

  <p><strong>الديون في زكاة التجارة</strong></p>

  <p>الديون الحالة الواجبة السداد يجوز خصمها من المال التجاري قبل حساب الزكاة عند جمهور العلماء. فيحسب التاجر قيمة بضائعه ونقوده، ثم يخصم ما عليه من ديون حالّة، فإذا بلغ الباقي النصاب وجبت الزكاة.</p>

  <p>أما الديون طويلة الأجل التي لم يحل وقتها، ففيها خلاف، وبعض العلماء لا يجيزون خصم إلا القسط الذي يحل في تلك السنة.</p>

  <p><strong>تنوع السلع واختلاطها</strong></p>

  <p>السلع التجارية المختلفة الأنواع تُجمع كلها في التقييم النهائي عند تمام الحول. فلو كان عند التاجر ملابس وأطعمة وأجهزة إلكترونية ومواد بناء، جُمعت قيمتها كلها لأنها تدخل في باب التجارة.</p>

  <p>وكذلك تُجمع أرباح السلع المختلفة لأنها كلها من جنس التجارة.</p>

  <p><strong>التغيرات الحادة في الأسعار</strong></p>

  <p>إذا وقع تضخم أو تغير كبير في قيمة العملة، فإن التقييم يبقى على أساس سعر السوق وقت إخراج الزكاة، حفاظًا على حق الفقراء حتى يظل متوازنًا مع الواقع الاقتصادي الفعلي.</p>

    `
  },
  {
    title: "زكاة الزروع والثمار (زكاة النبات أو ما يخرج من الأرض)",
   body: `
   <div class="fiqh-image">
<img src="assets/images/padi.png" alt="صورة توضيحية للزكاة">
</div>

<p>يشمل هذا البحث فرضية زكاة الزروع والثمار، وسبب فرضها، وشروطها، وما الذي تجب فيه الزكاة، والنصاب الموجب لها، والمقدار الواجب إخراجه وصفته، ووقت الوجوب والإخراج، وما الذي يُضم بعضه إلى بعض، وزكاة الثمار الموقوفة، وزكاة الأرض المستأجرة، وزكاة أرض الخراج والعشر، وحكم العسل، وكذلك أسباب سقوط زكاة الزروع والثمار.</p>

<p>وزكاة الزروع والثمار واجبة بالقرآن والسنة والإجماع والمعقول. فمن أدلة القرآن قول الله تعالى: "...وَآتُوا حَقَّهُ يَوْمَ حَصَادِهِ" (سورة الأنعام: 141). وقد فسر ابن عباس "حقه" بالزكاة المفروضة، وهي العشر أو نصف العشر. وقال الله تعالى أيضًا: "يَا أَيُّهَا الَّذِينَ آمَنُوا أَنْفِقُوا مِنْ طَيِّبَاتِ مَا كَسَبْتُمْ وَمِمَّا أَخْرَجْنَا لَكُمْ مِنَ الْأَرْضِ" (سورة البقرة: 267). وسُمّيت الزكاة نفقة في قوله تعالى: "وَالَّذِينَ يَكْنِزُونَ الذَّهَبَ وَالْفِضَّةَ وَلَا يُنْفِقُونَهَا فِي سَبِيلِ اللَّهِ..." (سورة التوبة: 34).</p>

<p>وأما الدليل من السنة فهو قول النبي ﷺ: "فِيمَا سَقَتِ السَّمَاءُ وَالْعُيُونُ أَوْ كَانَ عَثَرِيًّا الْعُشْرُ، وَفِيمَا سُقِيَ بِالنَّضْحِ نِصْفُ الْعُشْرِ". وفي رواية أخرى: "فِيمَا سَقَتِ الْأَنْهَارُ وَالْغَيْمُ الْعُشْرُ، وَفِيمَا سُقِيَ بِالسَّاقِيَةِ نِصْفُ الْعُشْرِ". وقد أجمع المسلمون على وجوب العشر في الناتج الزراعي. ومن جهة المعقول، فإن إخراج العشر شكرٌ لنعمة الله ووسيلة لمساعدة الفقراء.</p>

<p>وسبب فرض هذه الزكاة هو خروج الناتج من الأرض. فإذا لم يخرج منها شيء فلا وجوب. وإذا تلف الزرع قبل نضجه بسبب مرض، فلا زكاة في الأرض العشرية، ولا خراج في الأرض الخراجية، لأن النماء لم يتحقق. وتجب زكاة الزرع إذا اشتد الحب، وتجب زكاة الثمر إذا بدا صلاحه ونضج، ولو في بعض ثمار ذلك النوع.</p>

<p>ومن شروطها شروط عامة مثل الإسلام والبلوغ والعقل عند بعض المذاهب. فالحنفية لا يوجبون الزكاة في مال الصبي والمجنون إلا في حاصل أرض الإسلام، لأن فيه معنى المؤونة والوظيفة. ويشترطون أن تكون الأرض عشرية، وأن يكون الخارج منها حاصلًا، وأن يكون النبات مما يُقصد به نماء الأرض. وأبو حنيفة لا يشترط النصاب، فتجب الزكاة عنده في القليل والكثير.</p>

<p>أما المالكية فيشترطون أن يكون الخارج حبًا أو ثمرًا معينًا كالتمر والزبيب والزيتون، وأن يبلغ النصاب خمسة أوسق (نحو 653 كجم تقريبًا). فلا زكاة عندهم في التفاح والرمان والخضروات. والشافعية يشترطون أن يكون الخارج قوتًا مدخرًا كالحنطة والأرز والشعير والتمر والزبيب، وأن يبلغ خمسة أوسق، وأن يكون مملوكًا لمالك معين. فلا زكاة عندهم في الخضروات والثمار التي لا تُدخر. والحنابلة يشترطون أن يكون الخارج مما يُكال ويُدخر ويجف، وأن يبلغ خمسة أوسق، وأن يكون مملوكًا لمسلم حر وقت وجوب الزكاة، وهو وقت اشتداد الحب أو بدو صلاح الثمر.</p>

<p>وفيما يجب فيه الزكاة، يرى أبو حنيفة أن كل ما يخرج من الأرض تجب فيه الزكاة قليلًا كان أو كثيرًا، إلا الحطب والقصب الفارسي والتبن ونحو ذلك مما لا يُقصد به نماء الأرض. واستدل بحديث: "فِيمَا أَخْرَجَتِ الْأَرْضُ الْعُشْرُ". وأما جمهور العلماء فيرون أن الزكاة لا تجب إلا فيما كان قوتًا مدخرًا. وذكر المالكية نحو عشرين نوعًا من الحبوب والثمار كالحنطة والشعير والأرز والعدس والبقول والسمسم والزيتون والتمر والزبيب. وحصر الشافعية الوجوب في الأقوات المدخرة. وأوجب الحنابلة الزكاة في كل حب مكيل مدخر، ومن ذلك بعض البقول وبعض الثمار المجففة كالتمر والزبيب.</p>

<p>وأما الزيتون، فالمشهور في القول الجديد للشافعية، وهو أيضًا المعتمد عند الحنابلة، أنه لا زكاة فيه، بينما أوجبها فيه أبو حنيفة والمالكية. ونصاب الزيتون عند المالكية خمسة أوسق.</p>

<p>وأما العسل، فقد أوجب الحنفية والحنابلة فيه العشر، واشترط الحنابلة له نصابًا وهو عشرة أفراق. واستدلوا بحديث أبي سيارة: "يا رسول الله، إن لي نحلًا"، فقال: "أَدِّ عُشْرَهُ". وروي أيضًا أن النبي ﷺ أخذ العشر من العسل. أما المالكية والشافعية فلا يوجبونه، لعدم ثبوت حديث صحيح صريح عندهم، ولأن العسل يشبه اللبن الذي لا زكاة فيه. واعتبره أبو عبيد من باب الندب لا الفرض.</p>

<p>وفي النصاب، لا يشترط أبو حنيفة النصاب ويوجب الزكاة في القليل والكثير لعموم الآيات والأحاديث. أما الجمهور فيشترطون خمسة أوسق، استدلالًا بحديث: "لَيْسَ فِيمَا دُونَ خَمْسَةِ أَوْسُقٍ صَدَقَةٌ"، وعدّوه مخصصًا لعموم الأدلة الأخرى.</p>

<p>ومقدار الزكاة هو العشر (10٪) فيما سُقي بغير مؤونة، ونصف العشر (5٪) فيما سُقي بمؤونة. ولا تخصم تكاليف الزراعة من الزكاة عند أبي حنيفة. وتخرج الزكاة وقت الحصاد.</p>

<p>وقد استحب الجمهور الخرص في التمر والعنب قبل الحصاد، استنادًا إلى الأحاديث الواردة في إرسال النبي ﷺ من يقدّر الخارج. وروى عتاب بن أسيد أن النبي ﷺ أمر بخرص العنب كما يُخرص النخل ثم تؤخذ زكاته زبيبًا. واستحب الشافعية والحنابلة أن يُترك الثلث أو الربع تيسيرًا على المالك، لحديث سهل بن أبي حثمة: "إِذَا خَرَصْتُمْ فَخُذُوا وَدَعُوا الثُّلُثَ، فَإِنْ لَمْ تَدَعُوا الثُّلُثَ فَدَعُوا الرُّبُعَ". أما الحنفية والمالكية فلا يشترطون ترك هذا القدر.</p>

<p>وإذا تلف المحصول قبل حصاده بغير تفريط، سقطت الزكاة لفوات محل الوجوب. فإن أتلفه غير المالك ضمنه. وإن أكله المالك ضمن زكاته. وعند الحنفية تسقط الزكاة بالردة، وتسقط بالموت بلا وصية، إلا إذا كان الخارج باقيًا فيؤخذ من ذلك المال.</p>

<p><strong>وقت وجوب زكاة الزروع والثمار وتفصيله</strong></p>

<p>وقت وجوب زكاة الزروع والثمار عند جمهور العلماء هو حين يشتد الحب ويصلح للادخار، وحين يبدو صلاح الثمر وينضج. وهذا هو وقت تعلّق الوجوب. أما وقت إخراج الزكاة فهو عند الحصاد، وبعد التجفيف والتنقية من التبن والقشر. ويدل على ذلك قوله تعالى: "وَآتُوا حَقَّهُ يَوْمَ حَصَادِهِ" (سورة الأنعام: 141)، أي إن وقت الإخراج هو وقت الحصاد. إلا أن الزكاة لا تجب إلا في الحب اليابس المكيل، فإذا أخرجها الإنسان قبل التجفيف، ثم ظهر بعد الجفاف أن الواجب أقل أو أكثر، وجب عليه التكميل إن نقص، وصارت الزيادة صدقة.</p>

<p>ولا يُضم مختلف الأنواع من الزروع والثمار إلى بعضه لتكميل النصاب عند جمهور العلماء. فالحنطة لا تضم إلى الشعير، والتمر لا يضم إلى العنب. أما النوع الواحد وإن اختلفت جودته فيضم بعضه إلى بعض، كتمر العجوة مع غيره من التمر، أو أنواع الحنطة المختلفة، لأنها كلها من جنس واحد. والمالكية والحنابلة يعتبرون اتحاد الجنس أساسًا للضم، وكذلك الشافعية. أما الحنفية، لما كانوا لا يشترطون النصاب أصلًا، فلا يظهر عندهم أثر كبير لهذه المسألة.</p>

<p>وإذا كان للإنسان بساتين متعددة في أماكن متفرقة، وكان الخارج منها من جنس واحد وحصاده في موسم واحد، ضُمّ بعضه إلى بعض في حساب النصاب. أما إذا اختلف الموسم وطال الزمن بحيث عُدَّ في عرف الزراعة موسمًا جديدًا، فلا يُضم. وما دام في موسم حصاد واحد فيعدّ مالًا واحدًا.</p>

<p>وأما زكاة الثمر أو الزرع الموقوف، فإن كان الوقف على جهة عامة كالمسجد أو الجسر أو الفقراء من غير تمليك لأشخاص معينين، فلا زكاة فيه عند الشافعية والحنابلة، لعدم وجود مالك معين. وإن كان الوقف على أشخاص معينين، وجبت الزكاة في حصصهم إذا بلغت النصاب. ويفصّل المالكية بأن الخارج إذا كان في يد أشخاص معينين وصار ملكًا لهم حكمًا، وجبت الزكاة عليهم.</p>

<p>وتختلف زكاة الأرض المؤجرة بين زكاة الخارج وزكاة الأجرة. فإذا أجر الإنسان أرضه لمزارع على سبيل المزارعة، فالزكاة على صاحب الخارج بحسب نصيبه. فإن كان لمالك الأرض جزء من المحصول، زكّى نصيبه إن بلغ النصاب. وإذا أُجّرت الأرض بأجرة ثابتة من نقد أو عين، كانت زكاة الخارج على الزارع لأنه مالك الزرع، أما أجرة الأرض التي يأخذها المالك فهي مال نقدي تجب فيه زكاة المال إذا بلغ النصاب وحال عليه الحول.</p>

<p>وفي الأرض الخراجية والعشرية، فرّق الحنفية بين الأرض العشرية، وهي أرض المسلمين التي يؤخذ من خارجها العشر، وبين الأرض الخراجية، وهي الأرض التي يؤخذ عليها خراج ثابت. ويرون أن الزكاة والخراج لا يجتمعان في أرض واحدة، فالأرض الخراجية لا يجب فيها عشر لأنها قد شُغلت بالخراج. أما جمهور العلماء فيجيزون اجتماع الزكاة في الخارج مع الخراج في الأرض، لأن الخراج حق متعلق بالأرض، والزكاة حق متعلق بالخارج، فلكل منهما سبب مستقل ومحل مستقل.</p>

<p>فإذا لم تُزرع الأرض العشرية مع القدرة على زراعتها، فلا زكاة لعدم وجود الخارج. أما الأرض الخراجية، فإن الخراج يبقى واجبًا فيها بحسب نظامه لأنه متعلق بالأرض نفسها لا بالمحصول.</p>

<p>وأما عامل العشر، ففي زمن النبي ﷺ والخلفاء الراشدين كانت الدولة ترسل من يقدّر الخارج ويقبض زكاة الزروع. وكانوا يأخذون بالقدر المشروع، ولا يجوز لهم أخذ أجود المال، لقول النبي ﷺ: "إِيَّاكُمْ وَكَرَائِمَ أَمْوَالِهِمْ"، وفيه النهي عن الظلم في الجباية.</p>

<p>وإذا تلف الخارج قبل الحصاد بسبب آفة سماوية بغير تفريط من المالك، سقطت الزكاة لفوات محل الوجوب. وإذا تلف بعد تعلّق الزكاة وقبل الأداء بغير تفريط، سقطت أيضًا عند الجمهور، لأنه لم يستقر في الذمة بعد. أما إذا تلف بتفريط من المالك، فإنه يضمن الزكاة. وإذا سُرق المحصول من غير تفريط في حفظه، فلا زكاة في القدر المسروق.</p>

<p>وإذا ادعى المالك تلف الخارج، فقوله مقبول مع يمينه عند الشافعية إذا كان الأمر محتملًا. والحنابلة يقبلون قوله بلا يمين إذا وجدت قرينة قوية، أما إذا كان ذلك مخالفًا للعادة فلا يُقبل.</p>

<p>وزكاة الزروع لا يشترط لها الحول، لأنها من زكاة الناتج المباشر. ولذلك تخرج الزكاة عند كل حصاد، ولو تعدد الحصاد في السنة الواحدة. فكل حصاد له حكمه المستقل. وهذا يختلف عن زكاة الأموال والأنعام التي يشترط لها الحول.</p>

<p>فإذا حصد الإنسان زرعه قبل نضجه فرارًا من الزكاة، فإن كان ذلك بعد ظهور أمارات الوجوب، فالزكاة واجبة عند الجمهور. أما إذا كان قبل ظهور السبب، فلا زكاة لعدم تحقق سبب الوجوب.</p>

<p>وإذا جفّ الخارج وكيل ثم تبين أنه دون النصاب، فلا زكاة فيه عند الجمهور. أما عند أبي حنيفة فتجب الزكاة ولو كان قليلًا. وإذا كان الخارج قد قُدِّر أولًا على أنه يبلغ النصاب ثم نقص بعد التجفيف، فالعبرة بالمقدار النهائي بعد الجفاف.</p>

<p>وأما العسل، فكما سبق، أوجب الحنفية والحنابلة فيه العشر إذا بلغ النصاب عند الحنابلة، اعتمادًا على الأحاديث الواردة في ذلك. أما المالكية والشافعية فلم يوجبوه لعدم وجود دليل صحيح صريح عندهم.</p>

<p><strong>بيان مذهب الشافعية في زكاة الزروع والثمار</strong></p>

<p>يقرر مذهب الشافعية أن زكاة الزروع لا تجب إلا في النبات الذي استوفى شرطين أساسيين: الأول أن يكون قوتًا معتادًا في حال الاختيار لا في حال الضرورة، والثاني أن يكون من جنس ما يزرعه الناس عادة. فإن لم يكن قوتًا كالخضروات، أو لم يكن من جنس المزروعات الآدمية كالنبات البري، فلا زكاة فيه.</p>

<p>والمقصود بكونه "مما يزرعه الناس" ليس اشتراط قصد الزراعة في كل فرد، بل المقصود أن يكون نوعه في الأصل مما يُستزرع. فلو سقط الحب فنبت بنفسه ثم بلغ النصاب، وجبت زكاته لأن نوعه من المزروعات.</p>

<p>والقوت المقصود هو القوت في حال السعة والعادة، لا ما يُؤكل عند الضرورة فقط. ولذلك فإن الحبوب مثل الترمس والكتان والسمسم والكمون وسائر أنواع الخضروات ليست من الأقوات عند جمهور الشافعية، فلا زكاة فيها.</p>

<p>ولا تجب زكاة الزروع إلا إذا بلغت النصاب، وهو خمسة أوسق بعد التصفية من التبن والشوائب. فإن نقصت عن خمسة أوسق فلا زكاة، وإن زادت احتسبت الزيادة كلها في الوعاء الزكوي.</p>

<p>وأما قشور الحبوب في حساب النصاب، فقد قسمها فقهاء الشافعية إلى ثلاثة أقسام: قشر لا يؤكل ولا يُعد من وعاء التخزين فلا يدخل في النصاب، وقشر يؤكل فيدخل في النصاب، وقشر يبقى مع الادخار لكنه لا يؤكل فلا يدخل في النصاب على المعتمد.</p>

<p>والأرز والعَلَس إذا كانا في قشرهما الأعلى اشترط فيهما أن يبلغا عشرة أوسق، لأن الصافي بعد التقشير يقارب خمسة أوسق. أما إذا كانا مقشورين، فيكفي خمسة أوسق.</p>

<p>ومقدار الزكاة هو العشر إذا كان السقي بلا مؤونة كالمطر والنهر، ونصف العشر إذا كان بآلة ومؤونة. وإذا اختلط الأمران، أُخذ بالحساب على قدر الغالب.</p>

<p>ولا تضم الأنواع المختلفة من النبات في حساب النصاب. فالحنطة لا تضم إلى الشعير، والتمر لا يضم إلى الزبيب. أما ما كان من جنس واحد، وإن اختلفت جودته، فيضم بعضه إلى بعض.</p>

<p>وتجب الزكاة بعد اشتداد الحب وتكوّنه، ولا تجب قبل ذلك. ولا تؤخذ زكاة الحب إلا بعد تنقيته من قشره الأعلى، كما لا تؤخذ زكاة الثمر إلا بعد جفافه.</p>

<p>وتكاليف الزراعة والحصاد والتجفيف وسائر نفقات الإنتاج على المالك، ولا تخصم من الزكاة. فالزكاة تؤخذ من الناتج الصافي.</p>

<p>وإذا كانت الأرض مؤجرة، فإن العشر يكون على الزارع لا على مالك الأرض. وإذا كانت الأرض معارة، فالزكاة كذلك على المستعير الزارع.</p>

<p>وفي مذهب الشافعية لا يسقط الخراجُ الزكاةَ، بل قد يجتمعان لاختلاف سببهما: فالخراج بسبب الأرض، والزكاة بسبب الزرع.</p>

<p>وزرع الذمي لا زكاة فيه لأن الإسلام شرط في الزكاة. وإذا كان الوقف عامًا، فلا زكاة في غلته. أما إذا كان الوقف خاصًا بأشخاص معينين، وجبت الزكاة عليهم إذا بلغ الخارج النصاب.</p>

<p>وبعد إخراج الزكاة وقت الحصاد، لا تجب زكاة سنوية على المحصول المدخر من الجهة نفسها، لأن كل حصاد له حسابه المستقل.</p>
`
  },
  {
    title: "زكاة الحيوانات أو الأنعام",
    body: `
      <div class="fiqh-image">
  <img src="assets/images/sapi.png" alt="صورة توضيحية للزكاة">
</div>

<p>زكاة الحيوان أو بهيمة الأنعام تشمل البحث في مشروعيتها، وشروطها، وأنواعها، ونصاب كل نوع منها، وحكم اختلاط الأنعام، وهل الزكاة واجبة في العين أو في الذمة، وحكم إخراجها بالقيمة، وضم الأنواع المختلفة، وحكم الأولاد والنماء التابع للأمهات، والمال المستفاد في أثناء الحول، والزكاة في النصاب دون الأوقاص، وما الذي يأخذه الساعي. وقد ثبتت فرضية زكاة الأنعام في سنة النبي ﷺ من خلال عدة أحاديث صحيحة وحسنة. وأشهرها حديث أبي بكر رضي الله عنه الذي اشتمل على مقادير زكاة الإبل وأنصبتها، ومقادير زكاة بهيمة الأنعام وأنصبتها، وكيفية زكاة المال المختلط، ونوع المأخوذ في الزكاة وهو الوسط لا الهرمة ولا المعيبة ولا الذكر إلا إذا رضي به المصدّق، وكذلك بيان زكاة الفضة وهي ربع العشر. والحديث الثاني هو حديث معاذ رضي الله عنه الذي اشتمل على نصاب زكاة البقر. وقد اتفق العلماء على فرضية الزكاة في بهيمة الأنعام، وهي الإبل والبقر والغنم الأهلية، دون الخيل والرقيق والبغال والحمير. وأوجب أبو حنيفة الزكاة في الخيل، بينما لم يوجبها صاحباه، والفتوى على قولهما.</p>

<p>واشترط الفقهاء خمسة أمور في وجوب زكاة الأنعام. أولها: أن تكون الأنعام من الإبل أو البقر أو الغنم الأهلية، لا من الحيوانات الوحشية. أما المتولد من الأهلي والوحشي، فمذهب الشافعية والمالكية أنه لا زكاة فيه، لعدم ورود النص، ولأنه لا يسمى غنمًا على وجه الكمال. أما الحنابلة فأوجبوا فيه الزكاة، والحنفية اعتبروا جانب الأم، فإن كانت الأم أهلية وجبت الزكاة. والثاني: أن تبلغ النصاب الشرعي كما بينته السنة. والثالث: أن يكتمل الحول في ملك تام غير منقطع، فإذا انقطع النصاب ثم عاد، استؤنف الحول من جديد. وأولاد الأنعام تتبع أمهاتها في الحول. والرابع: أن تكون سائمة عند جمهور الفقهاء سوى المالكية، أي ترعى في المباح أكثر السنة بقصد الدر والنسل أو التسمين. فإذا كانت تعلف أكثر السنة فلا زكاة فيها عند الجمهور، بينما المالكية يوجبون الزكاة فيها سواء كانت سائمة أو معلوفة، لعموم الأحاديث.</p>

<p>ولا تجب زكاة الإبل في أقل من خمس بالإجماع والحديث. ففي خمس من الإبل شاة واحدة، وفي عشر شاتان، وفي خمس عشرة ثلاث شياه، وفي عشرين أربع شياه، وفي خمس وعشرين إلى خمس وثلاثين بنت مخاض، وفي ست وثلاثين إلى خمس وأربعين بنت لبون، وفي ست وأربعين إلى ستين حِقَّة، وفي إحدى وستين إلى خمس وسبعين جَذَعة، وفي ست وسبعين إلى تسعين بنتا لبون، وفي إحدى وتسعين إلى مائة وعشرين حِقَّتان. وفي مائة وإحدى وعشرين إلى مائة وتسع وعشرين عند الجمهور ثلاث بنات لبون. وما زاد على مائة وعشرين ففي كل أربعين بنت لبون، وفي كل خمسين حِقَّة. أما الحنفية فيستأنفون الحساب بعد مائة وعشرين، ويفصلون الواجب بعد ذلك بطريقة أخرى، ويجيزون دفع القيمة. وبين كل فريضتين أوقاص لا زكاة فيها.</p>

<p>وتجب زكاة البقر في ثلاثين تبيع أو تبيعة، وفي أربعين مُسِنَّة، ثم في كل ثلاثين تبيع، وفي كل أربعين مسنة. والجاموس كالبقر في الحكم. ولا تجب الزكاة في أقل من ثلاثين. والجمهور لا يوجبون الزكاة في البقر غير السائمة، والمالكية يوجبونها. أما زكاة الغنم فتجب في أربعين إلى مائة وعشرين شاة واحدة، وفي مائة وإحدى وعشرين إلى مائتين شاتان، وفي مائتين وواحدة إلى ثلاثمائة وتسع وتسعين ثلاث شياه، وفي أربعمائة أربع شياه، ثم في كل مائة شاة واحدة. ولا يجوز جمع المتفرق ولا تفريق المجتمع خشية الصدقة. ولا تؤخذ الهرمة ولا المعيبة ولا الذكر إلا إذا رضي بذلك الساعي.</p>

<p>ولا زكاة في البغال والحمير إلا إذا كانت للتجارة، وذلك بالإجماع. وأما الخيل، فأوجب أبو حنيفة الزكاة فيها إذا كانت سائمة، دينارًا عن كل فرس أو بالقيمة، بينما الجمهور لا يوجبونها، لحديث: "ليس على المسلم في عبده ولا فرسه صدقة".</p>

<p>وأما الخلطة، فعند جمهور الفقهاء تؤثر في زكاة الأنعام، فتجعل المالين كالمال الواحد بشروط معينة، مثل اتحاد المرعى، والمشرب، والفحل، وعدم قصد الفرار من الزكاة. أما الحنفية فلا يعتبرون الخلطة مؤثرة. وإذا أخذت الزكاة من أحد المالين المختلطين، رجع على شريكه بقدر حصته.</p>

<p>وأما هل الزكاة واجبة في العين أو في الذمة، فالحنفية والمالكية والشافعي في قوله الجديد يقولون: إنها واجبة في العين، فإذا تلف المال قبل الأداء سقطت الزكاة. أما الحنابلة فيرون أنها واجبة في الذمة، فلا تسقط بتلف المال، بل تبقى واجبة. وأما دفع الزكاة بالقيمة، فالحنفية يجيزونه لأن المقصود من الزكاة إغناء الفقير، وهذا يتحقق بالقيمة. والجمهور لا يجيزونه لأن النص حدد أنواعًا معينة، والزكاة عبادة توقيفية. والشافعية أجازوا ذلك في بعض الصور، كالجبران وزكاة التجارة.</p>

<p>وأما ضم الأنواع المختلفة، فيجوز ضم الضأن إلى المعز، والبقر إلى الجاموس، لأنها من جنس واحد. وأولاد الأنعام تتبع الأمهات في الحول عند الأئمة الأربعة إجماعًا. ويرى أبو حنيفة أن السخال لا تجب فيها الزكاة إلا إذا كانت مع كبار، بينما الجمهور يوجبون الزكاة فيها إذا بلغت النصاب. وأما المال المستفاد في أثناء الحول، فالحنفية والمالكية يضمون ما استفيد إلى النصاب الأول ويزكى معه في آخر الحول، أما الشافعية والحنابلة فيبدؤون له حولًا جديدًا.</p>

<p>والأوقاص، وهي ما بين النصابين، لا زكاة فيها بنص الحديث. والساعي يأخذ الوسط، فلا يأخذ خيار المال ولا شراره، ولا المعيب، ولا الحامل، ولا ما وضعت حديثًا، إلا إذا كان المال كله كذلك أو رضي المالك. ويجري الجبران في الإبل إذا لم يوجد السن الواجب، فينتقل إلى الأعلى أو الأدنى مع دفع الفرق بشاتين أو عشرين درهمًا، بحسب تفصيل المذاهب.</p>

<p><strong>الخلطة في زكاة بهيمة الأنعام وتفصيلها</strong></p>

<p>الخلطة في بهيمة الأنعام عند جمهور العلماء تؤثر في وجوب الزكاة، سواء من جهة التخفيف أو التشديد. فإذا كان لرجلين أو أكثر ماشية من جنس واحد، وكانت مختلطة مع تحقق شروط الخلطة، وهي اتحاد المرعى، والمشرب، والفحل، والراعي، والمبيت، واستمرار ذلك حولًا كاملًا، فإن أموالهم تعامل معاملة المال الواحد في حساب الزكاة. ولذلك، إذا كان لكل واحد منهم أربعون شاة ثم خلطاها، بقي الواجب شاة واحدة، لكن لو كان لكل واحد منهما مائة وواحدة من الغنم ثم جمعاها، فقد تجب عليهما ثلاث شياه لأن الجميع يعامل معاملة المال الواحد. إلا أن المالكية يشترطون أن يكون لكل شريك نصاب كامل في نفسه قبل أن تؤثر الخلطة. فإذا كان مجموع المالين نصابًا واحدًا فقط، وكان نصيب كل واحد منهما أقل من النصاب، فلا زكاة عند المالكية.</p>

<p>وقد قسم الشافعية والحنابلة الخلطة إلى قسمين: خلطة أعيان، وهي الشركة الحقيقية في نفس الحيوانات من غير تمييز حصصها، وخلطة أوصاف، وهي أن يكون لكل واحد حيوانه الخاص، لكن يجمع بينها في المرافق المذكورة من المرعى والمشرب والفحل والراعي ونحو ذلك. وفي الحالتين، ما دامت الشروط متحققة، وكان المالكون ممن تجب عليهم الزكاة من الإسلام والحرية وملك النصاب وتمام الحول، فإن المال يعامل معاملة المال الواحد. ولا يشترط قصد الخلطة لأثرها في الزكاة، لأن الحكم متعلق بواقع الاشتراك وتخفيف المؤونة، لا بالنية.</p>

<p>وأما الخلطة في غير بهيمة الأنعام، كالنقود والحبوب والثمار وعروض التجارة، فالحنابلة لا يرون لها أثرًا، لأن حديث النهي عن الجمع والتفريق خشية الصدقة خاص بالأنعام. أما الشافعية في القول الجديد فقد وسعوا أثر الخلطة إلى غير الأنعام تمسكًا بعموم لفظ الحديث.</p>

<p>وفيما يأخذه الساعي من المال المختلط، إذا أخذ الزكاة من أحد الشركاء، رجع على شريكه الآخر بنسبة حصته. وإذا وقع نزاع في القيمة، فالقول قول من يطالب بالرجوع مع يمينه، لأنه بمنزلة الغارم.</p>

<p>وأما هل الزكاة تتعلق بالعين أو بالذمة، فالحنفية والمالكية والشافعي في القول الجديد يرون أنها تتعلق بالعين، فإذا تلف المال من غير تفريط قبل الأداء سقطت الزكاة. أما إذا تلف بتفريط أو استهلك بعد الوجوب، وجب ضمانها لأنه صار كالأمانة المفرَّط فيها. والحنابلة يرون أن الزكاة واجبة في الذمة، فلا تسقط بتلف المال بعد تمام الحول.</p>

<p>وأما دفع الزكاة بالقيمة، فالحنفية يجيزونه مطلقًا في زكاة الأنعام، والزروع، وزكاة الفطر، والكفارات فيما عدا العتق، والنذور. واحتجوا بأن الواجب هو معنى المال، لا صورته المعينة، وأن المقصود من الزكاة سد حاجة الفقير، وهذا يتحقق بالقيمة. كما استدلوا ببعض الآثار عن الصحابة، كعمر رضي الله عنه. وأما جمهور العلماء فلا يجيزون إخراج القيمة إلا في حالات محدودة، لأن الزكاة عبادة محددة بالنص، فلا يجوز نقلها عن النوع المنصوص عليه. واستثنى الشافعية بعض الصور كزكاة التجارة والجبران وبعض الحالات الإدارية.</p>

<p>وفي ضم الأنواع المختلفة، لا خلاف بين العلماء في ضم الضأن إلى المعز، والبقر إلى الجاموس، والإبل العربية إلى غيرها، لأنها أجناس متقاربة تدخل تحت نوع واحد. وفي الإخراج، أجاز الجمهور أن يخرج من أي نوع ما دام متقارب القيمة، بينما كان الشافعية أشد نظرًا إلى تفاوت القيم.</p>

<p>وأولاد الأنعام تتبع الأمهات في الحول بإجماع الأئمة الأربعة. فإذا ولدت الماشية قبل تمام الحول، وكان الأصل قد بلغ النصاب، دخل الأولاد مع الأمهات في الزكاة. أما إذا ولدت بعد تمام الحول، استؤنف لها حول جديد. وأما السخال، فيرى أبو حنيفة ومحمد أنه لا زكاة فيها وحدها حتى يكون معها كبار، بينما الجمهور لا يشترطون ذلك، ويوجبون الزكاة إذا بلغ العدد النصاب.</p>

<p>وأما المال المستفاد في أثناء الحول من جنس المال الأول، فالحنفية والمالكية يضمونه إلى النصاب الأول ويزكونه معه في آخر الحول، بينما يرى الشافعية والحنابلة أن المال الجديد يستأنف له حول جديد، إلا في أولاد الماشية وربح التجارة.</p>

<p>والأوقاص، وهي ما بين النصابين، لا زكاة فيها بالنص والإجماع. وإذا نقص المال في مقدار الوقص، لم يؤثر ذلك في أصل الفريضة الثابتة.</p>

<p>وأما ما يأخذه الساعي، فالواجب عليه أن يأخذ الوسط، فلا يأخذ الخيار ولا الرديء، ولا المعيب إلا إذا كان المال كله كذلك، ولا الحامل، ولا التي وضعت قريبًا، ولا الفحل إلا إذا كان المال كله فحولًا أو دل النص على جوازه، كما في التبيع من البقر. وإذا لم يوجد السن الواجب في الإبل، عمل بنظام الجبران، فيرتفع أو ينزل سنًا أو سنين مع دفع شاتين أو عشرين درهمًا بحسب تفصيل المذاهب. أما في البقر والغنم، فلا جبران عند الحنابلة لعدم ورود النص به.</p>
    `
  },
  {
    title: "زكاة المعادن والركاز",
    body: `
      <div class="fiqh-image">
  <img src="assets/images/tambang.png" alt="صورة توضيحية للزكاة">
</div>

<p>اختلف الفقهاء في معنى المعدن والركاز والكنز، كما اختلفوا في أنواع المعادن التي تجب فيها الزكاة، وفي مقدار الزكاة الواجبة في كل نوع من المعادن والركاز.</p>

<p>فالمعدن عند الحنفية داخل في معنى الركاز، بينما فرّق جمهور العلماء بينهما. والمعادن التي تجب فيها الزكاة هي الذهب والفضة عند المالكية والشافعية، وكل ما ينطبع بالنار عند الحنفية. ويشمل ذلك عند الحنابلة جميع أنواع المعادن الجامدة والسائلة.</p>

<p>أما المعادن فزكاتها الخمس عند الحنفية، وربع العشر عند الشافعية والمالكية والحنابلة. وأما الركاز فزكاته الخمس باتفاق العلماء، كما سيتضح في التفصيل الآتي.</p>

<p>وينبغي أن يعلم أن الواجب في المعادن عند جمهور العلماء هو زكاة، أما عند الحنفية فهو من باب الغنيمة. وأما الواجب في الركاز فعند جمهور العلماء هو من قبيل الغنيمة يصرف في المصالح العامة، وعند الشافعية يصرف إلى مصارف الزكاة.</p>

<p>وفي المعادن يشترط بلوغ النصاب باتفاق العلماء. أما الركاز فلا يشترط فيه النصاب عند جمهور العلماء، بينما اشترطه الشافعية.</p>

<p>والمعدن والركاز، وإن كانا قد يكونان من الذهب والفضة، إلا أنهما يعدّان نوعين مستقلين لما يتعلق بهما من أحكام خاصة، كاشتراط الحول، ونسبة ما يدفع إلى المستحقين.</p>

<p><strong>مذهب الحنفية</strong></p>

<p>عند الحنفية، المعدن والركاز والكنز ألفاظ متقاربة المعنى، وهي تدل على كل مال مدفون تحت الأرض.</p>

<p>غير أن المعدن هو ما خلقه الله تعالى في الأرض حين خلقها، أما الركاز أو الكنز فهو مال دُفن بفعل الكفار.</p>

<p>والمعادن ثلاثة أنواع:</p>

<p>الأول: جامد يذوب وينطبع بالنار، كالذهب والفضة والحديد والنحاس والرصاص والزئبق. وهذا هو الذي تجب فيه الزكاة، ومقدارها الخمس، ولو لم يبلغ نصابًا.</p>

<p>الثاني: جامد لا يذوب ولا ينطبع بالنار، كالجص والزرنيخ وسائر الحجارة.</p>

<p>الثالث: سائل غير جامد، كالزفت والنفط.</p>

<p>ولا تجب الزكاة إلا في النوع الأول، سواء وُجد في أرض خراجية أو عشرية. ويصرف الخمس إلى من يستحقه من مصارف خمس الغنيمة.</p>

<p>ودليلهم قوله تعالى: "وَاعْلَمُوا أَنَّمَا غَنِمْتُمْ مِنْ شَيْءٍ فَأَنَّ لِلَّهِ خُمُسَهُ..." (الأنفال: 41).</p>

<p>وعدّوا المعدن من الغنيمة، لأن موضعه كان في الأصل في يد الكفار، ثم استولى عليه المسلمون قهرًا.</p>

<p>وأما من السنة فقول النبي ﷺ: "العجماء جبار، والبئر جبار، والمعدن جبار، وفي الركاز الخمس".</p>

<p>والركاز عندهم يشمل المعدن والكنز، سواء كان من خلق الله تعالى أو من فعل العباد.</p>

<p>وأما القياس فهو قياس المعدن على كنز الجاهلية، بجامع معنى الغنيمة في كل منهما، فلذلك وجب فيه الخمس.</p>

<p>وأما ما زاد على الخمس، فإن كان في أرض مملوكة فهو لصاحب الأرض، وإن وجد في أرض لا مالك لها كالفيافي والجبال فهو لواجده.</p>

<p>ووجوب الخمس في الركاز مشروط بوجود علامة الجاهلية، كالصنم والصليب ونحو ذلك. فإن كانت عليه علامة الإسلام، كالشهادتين أو اسم سلطان مسلم، فهو من اللقطة، ولا يجب فيه الخمس.</p>

<p>وكذلك لا يجب الخمس عند أبي حنيفة إذا وجد المعدن أو الركاز في دار مملوكة، لأنه جزء من الأرض المتكون فيها، ولم تتحقق فيه مؤونة الاستيلاء العام.</p>

<p>أما صاحباه أبو يوسف ومحمد فقالا بوجوب الخمس لعموم الحديث: "وفي الركاز الخمس"، من غير تفريق بين الأرض والدار، إلا أن أبا حنيفة فرّق بينهما.</p>

<p>ولا زكاة في النوعين الأخيرين من المعادن، وهما ما لا ينطبع بالنار وما كان سائلاً، إلا الزئبق السائل، لأنه عندهم في حكم ما ينطبع.</p>

<p>ولا زكاة كذلك في الفيروزج الموجود في الجبال، لقول النبي ﷺ: "لا خمس في الحجر".</p>

<p>ولا تجب الزكاة في الجواهر والعنبر وحيوان البحر، وكل ما يخرج من البحر من حلي، ولو كان ذهبًا في صورة كنز، لأنه لا يتحقق فيه معنى القهر والغنيمة، إلا إذا أعد للتجارة.</p>

<p><strong>حكم الكنز (الركاز)</strong></p>

<p>أما الكنز أو الركاز، فيجب فيه الخمس إذا وجد في أرض لا مالك لها، لحديث النبي ﷺ المذكور.</p>

<p>ويُلحق به كل ما كان تحت الأرض من سلاح، وأدوات، وملابس، ونحوها، لأنه في حكم الغنيمة، وحكمه حكم الذهب والفضة.</p>

<p>ومن دخل دار الحرب بأمان، ثم وجد ركازًا في بيت أحدهم، وجب عليه رده إليه، صيانة من الخيانة، لأن ما في البيت ملك خاص لصاحبه.</p>

<p>فإن لم يرده، وحمله إلى دار الإسلام، ملكه بطريق خبيث، ووجب عليه التصدق به.</p>

<p>أما إن وجده في صحراء دار الحرب، فهو لواجده، لأنه ليس ملكًا خاصًا لأحد، فلا يعد ذلك خيانة.</p>

<p><strong>مذهب المالكية في المعادن والركاز</strong></p>

<p>عند المالكية، المعدن غير الركاز. فالمعدن هو ما خلقه الله تعالى في الأرض من ذهب أو فضة أو غيرهما، كالنحاس والرصاص والكبريت، مما يحتاج إلى استخراج وتصفية.</p>

<p>وفي ملكية المعدن ثلاث حالات:</p>

<p>الأولى: إذا كان المعدن في أرض لا مالك لها، فهو للإمام، وله أن يعطيه لمن شاء من المسلمين، أو يجعله في بيت المال للمصالح العامة، لا لنفسه.</p>

<p>الثانية: إذا كان المعدن في أرض مملوكة لشخص معين، فالمعتمد أنه أيضًا للإمام، وليس لمالك الأرض، وإن كان هناك قول بأنه لمالك الأرض.</p>

<p>الثالثة: إذا كان المعدن في أرض مملوكة لغير معين، كالأرض المفتوحة عنوة أو صلحًا، فالأرض المفتوحة عنوة تكون للإمام، أما أرض الصلح فهي لأهلها ما داموا على كفرهم، فإن أسلموا عاد أمرها إلى الإمام.</p>

<p>وخلاصة الأمر أن حكم المعدن عند المالكية أنه للإمام مطلقًا، إلا في أرض الصلح ما دام أهلها على كفرهم.</p>

<p>وزكاة المعدن عند المالكية هي ربع العشر (2.5%) إذا بلغ النصاب، بشرط الإسلام والحرية كما في سائر الزكوات، ولا يشترط فيها الحول، بل تؤدى عند استخراجه كزكاة الزرع.</p>

<p>والمعدن الذي تجب فيه الزكاة عندهم هو الذهب والفضة فقط، لا غيرهما من المعادن كالنحاس والرصاص والزئبق، إلا إذا كانت معدّة للتجارة.</p>

<p>والفرق بين المالكية والحنفية أن الحنفية أدخلوا المعدن في حكم الركاز، فأوجبوا فيه الخمس، أما المالكية فلم يدخلوه فيه، فجعلوا زكاته ربع العشر.</p>

<p>وإذا استخرج المعدن مرة ثانية، ضم إلى الأول إذا كان من عرق واحد. فإذا بلغ الجميع النصاب وجبت الزكاة، ولو استخرج في أوقات مختلفة. أما العرق الواحد فلا يضم إلى عرق آخر، كما لا يضم معدن إلى معدن آخر.</p>

<p>واستثنوا من ذلك النُّدْرَة، وهي القطعة الخالصة من الذهب أو الفضة التي تنفصل من التراب بسهولة، من غير كلفة تصفية كبيرة. فهذه فيها الخمس ولو لم تبلغ النصاب، وتصرف في المصالح العامة كالغنيمة، موافقة في ذلك لمذهب الحنفية فيما ينطبع بالنار.</p>

<p><strong>الركاز عند المالكية</strong></p>

<p>أما الركاز عند المالكية فهو دفين الجاهلية من ذهب أو فضة أو غيرهما. وإذا شك في كونه جاهليًا أو غير جاهلي، حُمل على الجاهلية.</p>

<p>وحكم ملكيته يختلف باختلاف موضع وجوده.</p>

<p>فإن وجد في الصحراء، وكان من دفين الجاهلية، فهو لواجده.</p>

<p>وإن وجد في أرض يملكها شخص، فهو لصاحب الأرض الأول الذي أحياها أو ورثها، لا لواجده ولا للمشتري الأخير، إلا إذا عُرف البائع الأول.</p>

<p>وإن وجد في أرض فتحت عنوة، فهو لواجده.</p>

<p>وإن وجد في أرض فتحت صلحًا، فهو أيضًا لواجده.</p>

<p>وكل ذلك إذا لم تكن عليه علامة الإسلام، فإن كانت عليه علامة الإسلام، فهو لقطة تعرف سنة.</p>

<p>وزكاة الركاز عند المالكية هي الخمس مطلقًا، سواء كان ذهبًا أو فضة أو غيرهما، وسواء وجده مسلم أو غير مسلم، ويصرف في المصالح العامة.</p>

<p>فإن كان استخراجه يحتاج إلى مؤونة كبيرة، كانت زكاته ربع العشر، وتصرف إلى مستحقي الزكاة.</p>

<p>ولا يشترط النصاب في الركاز عندهم.</p>

<p>وما بقي بعد إخراج الواجب فهو لواجده، إلا إذا وجد في أرض مملوكة لغيره، فيتبع ملكية تلك الأرض.</p>

<p>ولا شيء فيما يلفظه البحر، كالعنبر والجواهر والمرجان والسمك، بل يكون لواجده من غير زكاة، إلا إذا علم أنه من دفين الجاهلية، فيجب فيه الخمس.</p>

<p>فإن علم أنه ملك لمسلم أو ذمي، كان لقطة.</p>

<p><strong>مذهب الشافعية في المعادن والركاز</strong></p>

<p>عند الشافعية، المعدن غير الركاز. فالمعدن هو ما أخرجه الله تعالى من موضع خلقه في الأرض، ويختص عندهم بالذهب والفضة، كما هو مذهب المالكية.</p>

<p>فتجب الزكاة في المعدن إذا كان ذهبًا أو فضة، وبلغ النصاب، ومقدارها ربع العشر (2.5%)، ولا تجب في غيرهما كالياقوت والزبرجد والنحاس والحديد ونحو ذلك، إلا إذا كان للتجارة.</p>

<p>وسواء كان المعدن في أرض مباحة أو في أرض يملكها مسلم حر، فإن الزكاة واجبة فيه لعموم أدلة الزكاة.</p>

<p>ويشترط فيه بلوغ النصاب، كما هو قول الأئمة، ولا يشترط الحول، لأن الحول إنما يشترط في الأموال التي يُنتظر فيها تمام النماء، أما المعدن فإنه ينمو بنفسه، فأشبه الزرع والثمر.</p>

<p>ويضم بعض ما يخرج من المعدن إلى بعض في تكميل النصاب إذا كان من جنس واحد، وكان العمل فيه متتابعًا.</p>

<p>ويشترط أيضًا اتحاد مكان العمل، فإن اختلف المكان لم يضم، لأن ذلك يدل عادة على ابتداء عمل جديد.</p>

<p>فإن انقطع العمل لعذر، كإصلاح الآلة أو المرض أو نحو ذلك، ثم عاد إليه، ضم بعضه إلى بعض ولو طال الزمن، لأنه لا يدل على الإعراض عن العمل.</p>

<p>أما إذا انقطع من غير عذر، فلا يضم.</p>

<p>ويضم الخارج الثاني إلى الأول، كما يضم إلى مال آخر لتكميل النصاب.</p>

<p>ولا يجزئ إخراج زكاته إلا بعد إذابته وتنقيته. فإن أخرجها قبل ذلك لم يجزئه.</p>

<p><strong>الركاز عند الشافعية</strong></p>

<p>أما الركاز عند الشافعية فهو دفين الجاهلية.</p>

<p>وفيه الخمس، كما هو عند الحنفية، لكن بشروط الزكاة من الحرية والإسلام وبلوغ النصاب.</p>

<p>ويشترط أن يكون من الذهب أو الفضة مما يقبل الضرب والصياغة.</p>

<p>ولا يشترط فيه الحول، ويصرف عند المشهور في مصارف الزكاة.</p>

<p>ودليل وجوب الخمس فيه حديث النبي ﷺ: "وفي الركاز الخمس".</p>

<p>فإن لم يكن المدفون من دفين الجاهلية، بل كان من زمن الإسلام لوجود علامة الإسلام عليه، أو جهل أصله، فإنه يحمل على كونه مالًا لصاحبه أو لورثته إن عرفوا.</p>

<p>فإن لم يعرف صاحبه، عُرّف سنة كحكم اللقطة.</p>

<p>وإن وجد في أرض مملوكة لشخص، فإن ادعاه صاحب الأرض أخذه بلا يمين.</p>

<p>فإن لم يدعه، رجع إلى المالك الذي قبله، وهكذا حتى ينتهي إلى أول من أحيا تلك الأرض.</p>

<p>وإن وجد في مسجد أو طريق عام، كان لقطة، لاحتمال كونه مال مسلم مجهول.</p>

<p>وإذا وقع نزاع بين البائع والمشتري، أو بين المستأجر والمالك، في ملكية الركاز، فالقول قول من هو بيده مع يمينه، كما في النزاع في متاع الدار.</p>

<p><strong>مذهب الحنابلة في المعادن والركاز</strong></p>

<p>عند الحنابلة، المعدن غير الركاز. فالمعدن هو ما أخذ من الأرض مما خلقه الله تعالى فيها، وليس من جنس ترابها نفسه، سواء كان جامدًا أو سائلًا.</p>

<p>وملكية المعدن تتبع ملكية الأرض التي هو فيها، لأنه يعد جزءًا منها. فما وجد في أرض شخص فهو له. وإن وجد في أرض موات، كان أحق به من سبق إلى العمل فيه، فإن تركه جاز لغيره أخذه.</p>

<p>أما المعادن السائلة كالنفط والزرنيخ فهي مباحة في الأصل، لكن لا يجوز دخول أرض الغير لاستخراجها إلا بإذنه.</p>

<p>والمعادن التي تجب فيها الزكاة عند الحنابلة هي جميع ما يخرج من الأرض مما خلقه الله تعالى فيها، من ذهب، وفضة، وحديد، ورصاص، ونحاس، وزئبق، وياقوت، وزبرجد، وبلور، وعقيق، وزرنيخ، وقار، ونفط، وكبريت، وغير ذلك.</p>

<p>فإذا بلغت النصاب، وهو عشرون مثقالًا من الذهب أو مائتا درهم من الفضة أو ما يعادل ذلك، وجبت فيها الزكاة فورًا عند استخراجها، ومقدارها ربع العشر (2.5%). ولا يشترط لها الحول، لأنها مال مستفاد دفعة واحدة، فأشبهت الزروع والثمار.</p>

<p>ودليلهم قوله تعالى في سورة البقرة: "وَمِمَّا أَخْرَجْنَا لَكُمْ مِنَ الْأَرْضِ"، ونصابها يقاس على نصاب الذهب والفضة. ولا يشترط لها الحول لأنها ليست مالًا ينتظر فيه نماء السنين.</p>

<p>وإذا استخرج المعدن على دفعات متتابعة، وكان العمل لا يزال قائمًا، ضم بعضه إلى بعض لتكميل النصاب. أما إذا ترك العمل، عُدّ ذلك انقطاعًا، فلا يضم، إلا إذا كان الانقطاع لعذر، كمرض أو إصلاح آلة.</p>

<p>ولا يضم نوع إلى نوع آخر، إلا الذهب والفضة فإن أحدهما يكمل الآخر عندهم.</p>

<p><strong>الركاز عند الحنابلة</strong></p>

<p>أما الركاز عند الحنابلة فهو دفين الجاهلية، أي مال الكفار المدفون الذي وُجد في الإسلام، قليلًا كان أو كثيرًا.</p>

<p>وفيه الخمس، لحديث النبي ﷺ: "والمعدن جبار، وفي الركاز الخمس".</p>

<p>ويصرف الخمس في المصالح العامة كالفَيْء، على المعتمد في المذهب، وما بقي بعده فهو لواجده إذا لم يدعه مالك.</p>

<p>فإن وجد في دار الحرب، ولم يمكن أخذه إلا بجيش، كان غنيمة. وإن أمكن أخذه من غير حرب، كان لواجده، كما لو وجد في موات المسلمين.</p>

<p>والركاز الذي يجب فيه الخمس يشمل كل أنواع المال، كذهب، وفضة، وحديد، ورصاص، ونحاس، وآنية، وغير ذلك، لعموم الحديث في الركاز.</p>

<p>والخمس واجب على كل واجد، مسلمًا كان أو ذميًا، حرًا أو عبدًا، بالغًا أو صبيًا، عاقلًا أو مجنونًا عند جمهور العلماء. أما الشافعية فاشترطوا فيه شروط الزكاة.</p>

<p>فإن كانت على الركاز علامة من علامات الإسلام، كآية من القرآن، أو اسم النبي ﷺ، أو اسم سلطان مسلم، فهو لقطة تعرف سنة.</p>

<p>ولا تجب الزكاة فيما يخرج من البحر، كالجواهر والمرجان والعنبر والسمك، لعدم الدليل الموجب لذلك، ولأن النبي ﷺ والخلفاء من بعده لم يأخذوا الزكاة من خارج البحر.</p>
`
  },
 {
  title: "توزيع الزكاة",
  body: `

<p><strong>الأصناف المستحقة للزكاة</strong></p>

<p>لقد حصر الله سبحانه وتعالى المستحقين للزكاة في قوله تعالى في سورة التوبة الآية 60، وهم: الفقراء، والمساكين، والعاملون عليها، والمؤلفة قلوبهم، وفي الرقاب، والغارمون، وفي سبيل الله، وابن السبيل. وقد دل لفظ <em>إنما</em> في الآية الكريمة على الحصر، فلا يجوز صرف الزكاة إلى غير هذه الأصناف الثمانية.</p>

<p>كما جاء في حديث النبي ﷺ لمعاذ بن جبل رضي الله عنه حين بعثه إلى اليمن، أنه قال: تؤخذ من أغنيائهم فترد على فقرائهم. وهذا يدل على أن الزكاة تصرف إلى المستحقين، وهو أيضًا أصل عند المالكية وغيرهم في جواز صرف الزكاة إلى صنف واحد.</p>

<p>ويرى فقهاء الشافعية أن الزكاة الواجبة، سواء كانت زكاة الفطر أو زكاة المال، ينبغي توزيعها على الأصناف الثمانية إذا أمكن ذلك؛ لأن الآية تضمنت لام التمليك الدالة على الاستحقاق، وواو التشريك الدالة على المشاركة. فإذا كان الذي يقسمها الإمام، قسمها إلى ثمانية أسهم، ويبدأ بالعاملين عليها لأن نصيبهم يكون بمنزلة الأجرة على عملهم.</p>

<p>أما إذا قسمها المالك بنفسه ولم توجد جميع الأصناف، فإنه يعطيها لمن وجد منهم. وقد استحب الشافعية أن لا يقل ما يعطى لكل صنف عن ثلاثة أشخاص، لأن أقل الجمع ثلاثة.</p>

<p>أما جمهور العلماء من الحنفية والمالكية والحنابلة فيجيزون دفع الزكاة إلى صنف واحد فقط، بل إلى شخص واحد من أحد الأصناف، محتجين بأن الآية إنما بيّنت المستحقين، ولم توجب التسوية بينهم.</p>

<p>وبيان هذه الأصناف الثمانية كالآتي: الفقير هو الذي لا يملك مالًا ولا كسبًا يكفيه، وليس له من ينفق عليه، وتبقى حاجته بعيدة عن الكفاية. أما المسكين فهو الذي له كسب أو دخل، لكنه لا يكفيه.</p>

<p>وعند الشافعية والحنابلة، الفقير أشد حاجة من المسكين؛ لأن الفقير لا يجد نصف كفايته، بينما المسكين يجد أكثر من النصف ولكنه لا يبلغ حد الكفاية. ومن أدلتهم قوله تعالى في سورة الكهف: "أَمَّا السَّفِينَةُ فَكَانَتْ لِمَسَاكِينَ".</p>

<p>أما عند الحنفية والمالكية فالمسكين أشد حالًا من الفقير، استدلالًا بقوله تعالى: "أَوْ مِسْكِينًا ذَا مَتْرَبَةٍ".</p>

<p>والعاملون عليها هم الذين يتولون جمع الزكاة وتوزيعها، ويشترط فيهم العدالة، ومعرفة فقه الزكاة، والقدرة على الكتابة والحساب، والأمانة. ويجوز أن يأخذوا من الزكاة أجرة على عملهم ولو كانوا أغنياء.</p>

<p>والمؤلفة قلوبهم هم الذين يعطون لتأليف قلوبهم، سواء كانوا من المسلمين ضعيفي الإيمان، أو من غير المسلمين الذين يرجى إسلامهم أو يخشى شرهم. وقد أعطى النبي ﷺ من الزكاة أبا سفيان وصفوان بن أمية وغيرهما لتأليف قلوبهم.</p>

<p>ويرى الحنفية والمالكية أن سهم المؤلفة قد سقط بعد قوة الإسلام، بينما يرى جمهور العلماء بقاءه عند الحاجة.</p>

<p>وأما الرقاب فهم المكاتبون الذين يسعون لتحرير أنفسهم ولا يجدون ما يكفيهم، كما يدخل في ذلك عند المالكية والحنابلة شراء العبيد وعتقهم.</p>

<p>والغارم هو من أثقلته الديون وعجز عن سدادها، سواء كانت لحاجة شخصية مباحة أو لإصلاح ذات البين.</p>

<p>أما <em>في سبيل الله</em> فعند الجمهور هم المجاهدون في سبيل الله الذين لا رزق ثابت لهم. وقد وسع بعض الحنفية هذا المفهوم فأدخلوا فيه طلبة العلم، كما أدخل بعض الحنابلة الحج في هذا الباب.</p>

<p>وأما ابن السبيل فهو المسافر المنقطع في سفر طاعة، الذي لا يجد ما يبلغه مقصده، ولو كان غنيًا في بلده.</p>

<p>واتفق جمهور العلماء على أنه لا يجوز صرف الزكاة في بناء المساجد أو الجسور أو الطرق أو مشاريع الري أو أكفان الموتى أو سائر المصالح العامة التي لم تذكر في الآية.</p>

<p>غير أن بعض الحنفية وسعوا معنى <em>في سبيل الله</em> ليشمل سائر وجوه الخير والطاعات.</p>

<p>أما مقدار ما يعطى من الزكاة، فإن الشافعية والحنابلة يجيزون إعطاء الفقير والمسكين ما يكفيهما كفاية تامة، بل ويجوز إعطاؤهما رأس مال يتكسبان به إن احتاجا إليه.</p>

<p>أما المالكية فيقيدون ذلك بكفاية سنة واحدة. ويعطى العامل بقدر عمله، والغارم بقدر دينه، وابن السبيل بقدر ما يحتاج إليه في سفره.</p>

<p>ولا تصح الزكاة إذا دفعت إلى غير مستحقها. فإذا أعطيت لمن ظنه المزكي فقيرًا ثم ظهر أنه غني أو كافر، فإنها عند المالكية والشافعية، وعند الراجح من مذهب الحنابلة، لا تجزئ وتبقى في ذمة المزكي.</p>

<p>ولا يجوز دفع الزكاة إلى بني هاشم عند الجمهور، لحديث النبي ﷺ: إن الصدقة لا تحل لآل محمد.</p>

<p>كما لا يجوز دفعها إلى من تلزم المزكي نفقتهم، كالأبوين والأولاد والزوجة، لأن نفعها يعود إليه.</p>

<p>أما الأقارب الذين لا تجب عليه نفقتهم، فيجوز إعطاؤهم، بل ذلك أولى لما فيه من أجر الصدقة وصلة الرحم.</p>

<p><strong>حكم نقل الزكاة ووقت أدائها</strong></p>

<p>اختلف العلماء في حكم نقل الزكاة من بلد إلى بلد. والأصل أن توزع الزكاة على فقراء البلد الذي جمعت فيه، لما جاء في حديث معاذ بن جبل رضي الله عنه حين بعثه النبي ﷺ إلى اليمن.</p>

<p>فعند الحنفية يكره نقل الزكاة إلى بلد آخر إذا كان في البلد الأصلي من يستحقها، إلا إذا كان في البلد الآخر أقارب أشد حاجة أو كانت الحاجة هناك أعظم.</p>

<p>وعند المالكية لا يجوز نقل الزكاة إلى بلد آخر بمسافة القصر إلا إذا لم يوجد مستحق في البلد.</p>

<p>وعند الشافعية لا يجوز نقل الزكاة مع وجود مستحقين في البلد، فإن نقلها لم تصح.</p>

<p>أما عند الحنابلة فيكره نقلها بغير حاجة، لكنها تصح.</p>

<p>ويجب إخراج الزكاة فور تحقق شروطها من بلوغ النصاب وتمام الحول، ولا يجوز تأخيرها بلا عذر.</p>

<p>ويجوز تعجيل الزكاة قبل تمام الحول إذا بلغ المال النصاب، لما ورد أن النبي ﷺ أخذ زكاة العباس قبل حولها.</p>

<p>ويستحب للمزكي إخفاء زكاته ليكون أقرب إلى الإخلاص وأبعد عن الرياء، لقوله تعالى: "وَإِنْ تُخْفُوهَا وَتُؤْتُوهَا الْفُقَرَاءَ فَهُوَ خَيْرٌ لَكُمْ".</p>

<p>كما يستحب تقديم الأقارب الفقراء، لما في ذلك من أجر الصدقة وصلة الرحم، ويحرم المنّ والأذى في الصدقة لأنه يبطل ثوابها.</p>

`
},
   {
    title: "المراجع",
    body: `

<p>الزحيلي، وهبة. <em>الفقه الإسلامي وأدلته</em>. 10 مجلدات. دمشق: دار الفكر، 1985.</p>

<p>ابن الهمام، كمال الدين. <em>فتح القدير</em>. بيروت: دار الفكر، بدون تاريخ.</p>

<p>النووي، يحيى بن شرف. <em>المجموع شرح المهذب</em>. بيروت: دار الفكر، بدون تاريخ.</p>

<p>ابن قدامة، موفق الدين. <em>المغني</em>. بيروت: دار الكتب العلمية، 1994.</p>

<p>الدسوقي، محمد بن أحمد. <em>حاشية الدسوقي على الشرح الكبير</em>. بيروت: دار الفكر، بدون تاريخ.</p>

<p>الكاساني، علاء الدين. <em>بدائع الصنائع في ترتيب الشرائع</em>. بيروت: دار الكتب العلمية، 1986.</p>

<p>المرغيناني، برهان الدين. <em>الهداية في شرح بداية المبتدي</em>. بيروت: دار إحياء التراث العربي، بدون تاريخ.</p>
    `
  }
  
        ],
        ctaTitle: "أدّ زكاتك الآن",
        ctaBody: "احسب زكاتك بسهولة ووزعها عبر الجهات الرسمية الموثوقة.",
        ctaButtons: ["ابدأ الحساب", "الدفع عبر BAZNAS"],
        footer: ["من نحن", "الأسئلة الشائعة", "تواصل", "سياسة الخصوصية", "إخلاء المسؤولية"],
        footerCopy: "(c) 2026 بوابة الثقافة الإسلامية - جميع الحقوق محفوظة."
      }
    }
  };

  normalizeTextTree(text.zakat.ar);
  normalizeTextTree(text.zakatInfo.ar);


  function getLang() {
    const saved = localStorage.getItem("siteLang") || "id";
    return LANGS.includes(saved) ? saved : "id";
  }

  function applyText(selector, value) {
    const node = document.querySelector(selector);
    if (node && value != null) node.textContent = value;
  }

  function applyTexts(selector, values = []) {
    const nodes = document.querySelectorAll(selector);
    values.forEach((value, idx) => {
      if (nodes[idx] && value != null) nodes[idx].textContent = value;
    });
  }

  function setLabelByInputId(inputId, value) {
    const input = document.getElementById(inputId);
    if (!input || value == null) return;
    let node = input.previousElementSibling;
    while (node && node.tagName !== "LABEL") node = node.previousElementSibling;
    if (node) node.textContent = value;
  }

  function setCheckLabel(inputId, value) {
    const label = document.querySelector(`label[for="${inputId}"]`);
    if (label && value != null) label.textContent = value;
  }

  function setSelectOptions(selectId, optionMap = {}) {
    const select = document.getElementById(selectId);
    if (!select) return;
    Object.entries(optionMap).forEach(([value, textValue]) => {
      const option = select.querySelector(`option[value="${value}"]`);
      if (option && textValue != null) option.textContent = textValue;
    });
  }

  function applyZakatForm(pack) {
    const labels = pack.labels || {};
    Object.entries(labels).forEach(([id, label]) => setLabelByInputId(id, label));
    Object.entries(pack.checks || {}).forEach(([id, label]) => setCheckLabel(id, label));
    Object.entries(pack.options || {}).forEach(([selectId, optionMap]) => setSelectOptions(selectId, optionMap));
    Object.entries(pack.placeholders || {}).forEach(([id, placeholder]) => {
      const input = document.getElementById(id);
      if (input) input.placeholder = placeholder;
    });

    applyText(".checkbox-label", pack.jewelryCheck);

    // Judul bagian investasi & properti sewa di tab maal
    const maalHeadings = document.querySelectorAll("#tab-maal .box-section h4");
    if (maalHeadings[0] && pack.sectionInvestment) {
      maalHeadings[0].textContent = pack.sectionInvestment;
    }
    if (maalHeadings[1] && pack.sectionRent) {
      maalHeadings[1].textContent = pack.sectionRent;
    }

    applyText("#tab-peternakan h4", pack.sectionLivestock);
    applyText(".zakat-settings h2", pack.sectionNisab);

    const rikazNoteEl = document.querySelector("#tab-rikaz p");
    if (rikazNoteEl && pack.rikazNote) {
      rikazNoteEl.textContent = pack.rikazNote;
    }
  }

  function applyZakat(lang) {
    const pack = text.zakat[lang] || text.zakat.id;
    document.title = pack.pageTitle;

    applyText(".main-navbar .logo span", pack.brand);
    applyTexts(".main-navbar .nav-links a", pack.nav);
    applyText(".zakat-hero h1", pack.heroTitle);
    applyText(".zakat-hero .hero-text p", pack.heroBody);
    applyTexts(".hero-buttons a", pack.heroButtons);
    applyTexts(".zakat-stats .stat-box p", pack.stats);
    applyText(".zakat-mazhab h2", pack.calcTitle);
    applyText(".zakat-mazhab label", pack.chooseMazhab);
    applyTexts(".zakat-info-cards .info-card h3", pack.infoTitles);
    applyTexts(".zakat-info-cards .info-card p", pack.infoBodies);
    applyText(".admin-btn", pack.adminBtn);
    applyTexts(".zakat-tabs .tab-btn", pack.tabs);
    applyText(".zakat-btn", pack.calcButton);

    const disclaimerBox = document.querySelector(".disclaimer-box");
    if (disclaimerBox && pack.disclaimerHtml) {
      disclaimerBox.innerHTML = pack.disclaimerHtml;
    }

    applyText(".pay-btn", pack.payBaznas);
    const historyHeadings = document.querySelectorAll(".zakat-history h3");
    if (historyHeadings[0]) historyHeadings[0].textContent = pack.yearlyHistory;
    if (historyHeadings[1]) historyHeadings[1].textContent = pack.monthlyHistory;
    applyText("#ternakModal .modal-content h3", pack.modalTitle);
    applyText(".zakat-cta h2", pack.ctaTitle);
    applyText(".zakat-cta p", pack.ctaBody);
    applyTexts(".zakat-cta .cta-buttons a", pack.ctaButtons);
    applyTexts(".site-footer .footer-links a", pack.footer);
    applyText(".site-footer .footer-copy", pack.footerCopy);

    const chartHeading = document.querySelector("#livestockChart")?.previousElementSibling;
    if (chartHeading) chartHeading.textContent = pack.livestockChartTitle;

    const greeting = document.querySelector("#user-logged-in p");
    if (greeting && greeting.firstChild) greeting.firstChild.nodeValue = `${pack.greeting} `;
    applyText("#user-logged-in button", pack.logout);
    applyZakatForm(pack);
  }

  function captureZakatInfoOriginal() {
    if (state.zakatInfoOriginal) return;
    state.zakatInfoOriginal = {
      rows: Array.from(document.querySelectorAll(".zakat-table tbody tr")).map((row) =>
        Array.from(row.querySelectorAll("td")).map((cell) => cell.innerHTML)
      ),
      fiqhHtml: document.querySelector(".fiqh-container")?.innerHTML || ""
    };
  }

  function renderRows(rowsData = []) {
    const rows = document.querySelectorAll(".zakat-table tbody tr");
    rows.forEach((row, rowIndex) => {
      const data = rowsData[rowIndex] || [];
      const cells = row.querySelectorAll("td");
      cells.forEach((cell, idx) => {
        if (data[idx] != null) cell.textContent = data[idx];
      });
    });
  }

  function renderCards(cards = []) {
    const container = document.querySelector(".fiqh-container");
    if (!container) return;
    if (!cards.length) {
      container.innerHTML = state.zakatInfoOriginal?.fiqhHtml || container.innerHTML;
      return;
    }
    container.innerHTML = cards.map((card) => `<div class="fiqh-card"><h3>${card.title}</h3>${card.body}</div>`).join("");
  }

  function renderFiqhHtml(html = "") {
    const container = document.querySelector(".fiqh-container");
    if (!container) return;
    container.innerHTML = html || state.zakatInfoOriginal?.fiqhHtml || container.innerHTML;
  }

  function applyZakatInfo(lang) {
    captureZakatInfoOriginal();
    const pack = text.zakatInfo[lang] || text.zakatInfo.id;

    document.title = pack.pageTitle;
    applyText(".main-navbar .logo", `📚 ${pack.brand}`);
    applyTexts(".main-navbar .nav-links a", pack.nav);
    applyText("body > h2", pack.heading);
    applyTexts(".zakat-table thead th", pack.tableHead);
    applyText(".fiqh-title", pack.fiqhTitle);
    applyText(".zakat-cta h2", pack.ctaTitle);
    applyText(".zakat-cta p", pack.ctaBody);
    applyTexts(".zakat-cta .cta-buttons a", pack.ctaButtons);
    applyTexts(".site-footer .footer-links a", pack.footer);
    applyText(".site-footer .footer-copy", pack.footerCopy);

    if (pack.rows && pack.rows.length) {
      renderRows(pack.rows);
    } else {
      renderRows(state.zakatInfoOriginal?.rows || []);
    }

    if (pack.fiqhHtml) {
      renderFiqhHtml(pack.fiqhHtml);
    } else if (pack.cards && pack.cards.length) {
      renderCards(pack.cards);
    } else {
      renderCards([]);
    }
  }

  function run() {
    const lang = getLang();
    const page = getPage();
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("rtl-ui", lang === "ar");
    if (page === "zakat.html") applyZakat(lang);
    if (page === "zakat-info.html") applyZakatInfo(lang);
  }

  function runWithRetry() {
    const page = getPage();
    const wantsZakatInfo = page === "zakat-info.html";

    let attempts = 0;
    const tick = () => {
      attempts += 1;

      if (wantsZakatInfo) {
        const ready =
          document.querySelector(".zakat-table") &&
          document.querySelector(".fiqh-container") &&
          document.querySelector("body > h2");

        if (!ready) {
          if (attempts < 25) return setTimeout(tick, 40);
          return;
        }
      }

      run();
    };

    tick();
  }

  function bindRouteChange() {
    let lastPath = window.location.pathname;
    const onRouteChange = () => {
      const nextPath = window.location.pathname;
      if (nextPath === lastPath) return;
      lastPath = nextPath;
      runWithRetry();
    };

    window.addEventListener("popstate", onRouteChange);
    window.addEventListener("hashchange", onRouteChange);

    const patchHistory = (method) => {
      const original = window.history[method];
      if (typeof original !== "function") return;
      if (original.__zakatI18nPatched) return;

      const wrapped = function (...args) {
        const result = original.apply(this, args);
        try {
          onRouteChange();
        } catch {
          // ignore
        }
        return result;
      };
      wrapped.__zakatI18nPatched = true;
      window.history[method] = wrapped;
    };

    patchHistory("pushState");
    patchHistory("replaceState");

    window.addEventListener("pageshow", runWithRetry);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      bindRouteChange();
      runWithRetry();
    });
  } else {
    bindRouteChange();
    runWithRetry();
  }
  window.addEventListener("portal-language-change", run);
  window.addEventListener("storage", (event) => {
    if (event.key === "siteLang") run();
  });
})();



