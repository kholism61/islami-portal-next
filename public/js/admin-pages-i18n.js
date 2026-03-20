(() => {
  const LANGS = ["id", "en", "ar"];
  const rawPage = (window.location.pathname.split("/").pop() || "").toLowerCase();
  const page = rawPage.endsWith(".html") ? rawPage : (rawPage ? `${rawPage}.html` : rawPage);

  const data = {
    id: {
      admin: {
        title: "Dashboard Admin Zakat",
        brand: "Zakat Portal",
        nav: ["Beranda", "Kalkulator Zakat", "Donasi", "Tentang", "Admin"],
        heading: "Dashboard Zakat",
        filter: ["Semua Kategori", "Zakat", "Donasi", "Fitrah"],
        actions: ["Export Excel", "Export PDF", "Reset Data"],
        stats: ["Total Pengguna", "Total Zakat"],
        historyTitle: "Riwayat Zakat",
        tableHead: ["Nama", "Jenis", "Jumlah", "Tanggal"],
        chartTitle: "Grafik Zakat Bulanan",
        cards: ["Total Zakat", "Total Transaksi", "Total User"],
        dateLabel: ["Dari:", "Sampai:"],
        applyBtn: "Terapkan",
        footerTitle: "Zakat Portal",
        footerBody: "Platform kalkulator dan pengelolaan zakat modern untuk memudahkan umat menunaikan kewajiban.",
        footerMenu: "Menu",
        footerNav: ["Beranda", "Kalkulator", "Donasi", "Tentang"],
        footerContact: "Kontak",
        contactLines: ["Email: nurcholism51@gmail.com", "WhatsApp: +62 821-2430-5278"],
        footerCopy: "(c) 2026 Zakat Portal. All rights reserved."
      },
      portal: {
        title: "Admin Portal Literasi Islam",
        brand: "Portal Literasi Islam",
        brandSub: "Modern knowledge workspace",
        nav: ["Beranda", "Smart Fiqh", "Kalkulator Zakat", "Sign In"],
        sessionLabel: "Admin aktif",
        logout: "Keluar",
        eyebrow: "Dashboard Admin",
        heroTitle: "Dashboard administrasi dan pengelolaan Portal Literasi Islam.",
        heroBody: "Halaman ini merupakan panel administrasi untuk pengelolaan akun pengguna, pemantauan aktivitas zakat dan donasi, serta peninjauan ringkasan data interaksi pembaca dari seluruh modul dan layanan portal.",
        heroActions: ["Tambah akun tim", "Kembali ke portal"],
        panelTitle: "Ringkasan sistem",
        panelPoints: [
          "Sistem autentikasi lokal untuk manajemen akun portal",
          "Pengaturan hak akses berbasis peran untuk admin dan member",
          "Kompatibel dengan data historis yang tersimpan di browser"
        ],
        panelMeta: ["Terdaftar", "Transaksi"],
        statLabels: ["Total Pengguna", "Total Admin", "Riwayat Transaksi", "Total Nominal"],
        statDesc: [
          "Akun yang tersimpan pada sistem portal.",
          "Admin yang dapat membuka dashboard ini.",
          "Gabungan data zakat, donasi, dan histori terkait.",
          "Akumulasi nominal yang tercatat di browser ini."
        ],
        sectionKicker: [
          "Manajemen akun",
          "Aktivitas portal",
          "Distribusi konten",
          "Akses cepat",
          "Audit auth"
        ],
        sectionTitle: [
          "Pengguna terbaru",
          "Transaksi terbaru",
          "Aktivitas per kategori",
          "Kelola area penting",
          "Aktivitas login terakhir"
        ],
        sectionBtn: ["Export users", "Reset analytics"],
        quickLinks: ["Smart Fiqh", "Jadwal Imsakiyah", "Bookmark", "Kontak"],
        usersHead: ["Nama", "Email", "Role", "Bergabung"],
        trxHead: ["Nama", "Kategori", "Nominal", "Tanggal"]
      },

      signin: {
        eyebrow: "Portal Login",
        heroTitle: 'Masuk ke <span>portal</span> literasi Islam.',
        desc: "Halaman ini merupakan gerbang autentikasi menuju Portal Literasi Islam. Setelah login, pengguna dapat mengakses editor konten, dashboard pengelolaan, serta berbagai tools utama yang tersedia di dalam portal.",
        forgotEmail: "Lupa password? Kirim email ke admin",
        forgotWhatsapp: "Lupa password? Chat WhatsApp admin",
        bullets: [
          "Akses ke berbagai tools portal seperti Smart Fiqh, kalkulator zakat, dan modul literasi Islam.",
          "Dashboard pengelolaan untuk editor, kontributor, dan tim internal portal.",
          "Sistem akun dengan role otomatis untuk admin, editor, dan member sesuai kebutuhan akses.",
          "Sinkronisasi data lokal seperti bookmark, riwayat membaca, dan aktivitas portal yang tersimpan di browser."
        ],
        helperOneTitle: "Akses portal",
        helperOneBody: "Gunakan akun yang sudah terdaftar untuk masuk ke area portal dan menggunakan fitur sesuai hak akses akun Anda.",
        helperTwoTitle: "Navigasi cerdas",
        helperTwoBody: "Setelah login, sistem akan mengarahkan pengguna ke halaman yang paling relevan, baik ke area kerja, dashboard, maupun kembali ke portal utama."
      },
      runtime: {
        loginRequired: "Silakan login dulu",
        accessDenied: "Akses ditolak",
        fallbackUser: "User",
        fallbackType: "Zakat",
        chartTotal: "Total Zakat",
        chartYearly: "Zakat Tahunan",
        noData: "Tidak ada data.",
        csvHeader: "Nama,Jenis,Jumlah,Tanggal",
        csvFile: "laporan-zakat.csv",
        confirmResetData: "Yakin ingin menghapus semua data zakat?",
        resetDone: "Data berhasil dihapus",
        localUserEmail: "pengguna@portal.local",
        fallbackDonor: "Donatur",
        fallbackDonationType: "Donasi",
        fallbackCategory: "Lainnya",
        catBookmark: "Bookmark",
        catOffline: "Offline",
        catReading: "Progres Bacaan",
        emptyUsers: "Belum ada akun tersimpan.",
        emptyTransactions: "Belum ada transaksi lokal yang tersimpan.",
        emptyCategories: "Belum ada kategori aktivitas yang bisa ditampilkan.",
        activitySuffix: "aktivitas",
        emptyAudit: "Belum ada log autentikasi. Aktivitas sign in dan sign up akan muncul di sini.",
        noEmail: "tanpa email",
        userSuffix: "akun",
        trxSuffix: "aktivitas",
        exportUsersHeader: "Nama,Email,Role,Tanggal Bergabung",
        exportUsersFile: "portal-users.csv",
        confirmResetAnalytics: "Reset analytics lokal di browser ini?",
        roleAdmin: "Admin",
        roleMember: "Member",
        roleEditor: "Editor",
        auditSignin: "Masuk ke portal",
        auditSignup: "Membuat akun baru",
        auditSignout: "Keluar dari portal",
        portalWord: "portal",
        errorNameMin: "Nama minimal 3 karakter.",
        errorInvalidEmail: "Email belum valid.",
        errorPasswordMin: "Password minimal 6 karakter.",
        errorPasswordMismatch: "Konfirmasi password tidak cocok.",
        errorEmailExists: "Email sudah terdaftar. Silakan sign in.",
        errorLoginRequired: "Email dan password wajib diisi.",
        errorAccountNotFound: "Akun tidak ditemukan. Silakan sign up terlebih dahulu.",
        errorNoPassword: "Akun lama belum punya password. Daftarkan ulang email ini lewat sign up.",
        errorWrongPassword: "Password yang Anda masukkan salah."
      }
    },
    en: {
      admin: {
        title: "Zakat Admin Dashboard",
        brand: "Zakat Portal",
        nav: ["Home", "Zakat Calculator", "Donate", "About", "Admin"],
        heading: "Zakat Dashboard",
        filter: ["All Categories", "Zakat", "Donation", "Fitrah"],
        actions: ["Export Excel", "Export PDF", "Reset Data"],
        stats: ["Total Users", "Total Zakat"],
        historyTitle: "Zakat History",
        tableHead: ["Name", "Type", "Amount", "Date"],
        chartTitle: "Monthly Zakat Chart",
        cards: ["Total Zakat", "Total Transactions", "Total Users"],
        dateLabel: ["From:", "To:"],
        applyBtn: "Apply",
        footerTitle: "Zakat Portal",
        footerBody: "A modern zakat calculator and management platform to help Muslims fulfill their obligations.",
        footerMenu: "Menu",
        footerNav: ["Home", "Calculator", "Donate", "About"],
        footerContact: "Contact",
        contactLines: ["Email: nurcholism51@gmail.com", "WhatsApp: +62 821-2430-5278"],
        footerCopy: "(c) 2026 Zakat Portal. All rights reserved."
      },
      portal: {
        title: "Islamic Literacy Portal Admin",
        brand: "Islamic Literacy Portal",
        brandSub: "Modern knowledge workspace",
        nav: ["Home", "Smart Fiqh", "Zakat Calculator", "Sign In"],
        sessionLabel: "Active admin",
        logout: "Log Out",
        eyebrow: "Admin Dashboard",
        heroTitle: "Administrative and management dashboard for the Islamic Literacy Portal.",
        heroBody: "This page functions as an administrative panel for managing user accounts, monitoring zakat and donation activity, and reviewing reader interaction data across the portal’s modules and services.",
        heroActions: ["Add team account", "Back to portal"],
        panelTitle: "System summary",
        panelPoints: [
          "Local authentication system for portal account management",
          "Role-based access settings for admins and members",
          "Compatible with historical data stored in the browser"
        ],
        panelMeta: ["Registered", "Transactions"],
        statLabels: ["Total Users", "Total Admins", "Transaction History", "Total Amount"],
        statDesc: [
          "Accounts stored in this portal system.",
          "Admins who can access this dashboard.",
          "Combined data from zakat, donation, and related histories.",
          "Total amount recorded in this browser."
        ],
        sectionKicker: ["Account management", "Portal activity", "Content distribution", "Quick access", "Auth audit"],
        sectionTitle: ["Recent users", "Recent transactions", "Activity by category", "Manage key areas", "Latest login activity"],
        sectionBtn: ["Export users", "Reset analytics"],
        quickLinks: ["Smart Fiqh", "Ramadan Schedule", "Bookmarks", "Contact"],
        usersHead: ["Name", "Email", "Role", "Joined"],
        trxHead: ["Name", "Category", "Amount", "Date"]
      },

      signin: {
        eyebrow: "Portal Login",
        heroTitle: 'Sign in to the Islamic literacy <span>portal</span>.',
        desc: "This page serves as the authentication gateway to the Islamic Literacy Portal. After signing in, users can access the content editor, management dashboard, and the main tools available across the portal.",
        forgotEmail: "Forgot your password? Email the admin",
        forgotWhatsapp: "Forgot your password? Chat the admin on WhatsApp",
        bullets: [
          "Access key portal tools such as Smart Fiqh, the zakat calculator, and Islamic literacy modules.",
          "Management dashboard for editors, contributors, and the internal portal team.",
          "Role-based accounts for admins, editors, and members according to access needs.",
          "Local synchronization for bookmarks, reading history, and portal activity stored in the browser."
        ],
        helperOneTitle: "Portal access",
        helperOneBody: "Use a registered account to enter the portal area and access features according to your account permissions.",
        helperTwoTitle: "Smart navigation",
        helperTwoBody: "After signing in, the system directs users to the most relevant page, whether it is the workspace, dashboard, or the main portal."
      },
      runtime: {
        loginRequired: "Please sign in first.",
        accessDenied: "Access denied.",
        fallbackUser: "User",
        fallbackType: "Zakat",
        chartTotal: "Total Zakat",
        chartYearly: "Yearly Zakat",
        noData: "No data available.",
        csvHeader: "Name,Type,Amount,Date",
        csvFile: "zakat-report.csv",
        confirmResetData: "Are you sure you want to delete all zakat data?",
        resetDone: "Data deleted successfully.",
        localUserEmail: "user@portal.local",
        fallbackDonor: "Donor",
        fallbackDonationType: "Donation",
        fallbackCategory: "Other",
        catBookmark: "Bookmarks",
        catOffline: "Offline",
        catReading: "Progres Bacaan",
        emptyUsers: "No stored accounts yet.",
        emptyTransactions: "No local transactions stored yet.",
        emptyCategories: "No activity categories to display yet.",
        activitySuffix: "activities",
        emptyAudit: "No authentication logs yet. Sign in and sign up activity will appear here.",
        noEmail: "no email",
        userSuffix: "accounts",
        trxSuffix: "activities",
        exportUsersHeader: "Name,Email,Role,Joined Date",
        exportUsersFile: "portal-users.csv",
        confirmResetAnalytics: "Reset local analytics in this browser?",
        roleAdmin: "Admin",
        roleMember: "Member",
        roleEditor: "Editor",
        auditSignin: "Signed in to the portal",
        auditSignup: "Created a new account",
        auditSignout: "Signed out from the portal",
        portalWord: "portal",
        errorNameMin: "Name must be at least 3 characters.",
        errorInvalidEmail: "Invalid email address.",
        errorPasswordMin: "Password must be at least 6 characters.",
        errorPasswordMismatch: "Password confirmation does not match.",
        errorEmailExists: "Email is already registered. Please sign in.",
        errorLoginRequired: "Email and password are required.",
        errorAccountNotFound: "Account not found. Please sign up first.",
        errorNoPassword: "This older account has no password yet. Please sign up again with this email.",
        errorWrongPassword: "Incorrect password."
      }
    },
    ar: {
      admin: {
        title: "لوحة تحكم الزكاة للإدارة",
        brand: "بوابة الزكاة",
        nav: ["الرئيسية", "حاسبة الزكاة", "التبرع", "من نحن", "الإدارة"],
        heading: "لوحة الزكاة",
        filter: ["كل الفئات", "زكاة", "تبرع", "زكاة الفطر"],
        actions: ["تصدير Excel", "تصدير PDF", "إعادة ضبط البيانات"],
        stats: ["إجمالي المستخدمين", "إجمالي الزكاة"],
        historyTitle: "سجل الزكاة",
        tableHead: ["الاسم", "النوع", "المبلغ", "التاريخ"],
        chartTitle: "مخطط الزكاة الشهري",
        cards: ["إجمالي الزكاة", "إجمالي المعاملات", "إجمالي المستخدمين"],
        dateLabel: ["من:", "إلى:"],
        applyBtn: "تطبيق",
        footerTitle: "بوابة الزكاة",
        footerBody: "منصة حديثة لحساب وإدارة الزكاة لتسهيل أداء هذه العبادة.",
        footerMenu: "القائمة",
        footerNav: ["الرئيسية", "الحاسبة", "التبرع", "من نحن"],
        footerContact: "اتصل بنا",
        contactLines: ["البريد الإلكتروني: nurcholism51@gmail.com", "واتساب: +62 821-2430-5278"],
        footerCopy: "(c) 2026 بوابة الزكاة. جميع الحقوق محفوظة."
      },
      portal: {
        title: "إدارة بوابة الثقافة الإسلامية",
        brand: "بوابة الثقافة الإسلامية",
        brandSub: "مساحة معرفة حديثة",
        nav: ["الرئيسية", "الفقه الذكي", "حاسبة الزكاة", "تسجيل الدخول"],
        sessionLabel: "مدير نشط",
        logout: "تسجيل الخروج",
        eyebrow: "لوحة الإدارة",
        heroTitle: "لوحة الإدارة وإدارة النظام لبوابة الثقافة الإسلامية.",
        heroBody: "تمثل هذه الصفحة لوحة إدارة مخصصة لإدارة حسابات المستخدمين ومتابعة نشاط الزكاة والتبرعات ومراجعة بيانات تفاعل القراء عبر وحدات البوابة وخدماتها المختلفة.",
        heroActions: ["إضافة حساب فريق", "العودة إلى البوابة"],
        panelTitle: "ملخص النظام",
        panelPoints: [
          "نظام مصادقة محلي لإدارة حسابات البوابة",
          "إعدادات صلاحيات مبنية على الأدوار للمديرين والأعضاء",
          "متوافق مع البيانات التاريخية المخزنة في المتصفح"
        ],
        panelMeta: ["المسجلون", "المعاملات"],
        statLabels: ["إجمالي المستخدمين", "إجمالي المدراء", "سجل المعاملات", "إجمالي المبلغ"],
        statDesc: [
          "الحسابات المحفوظة في نظام البوابة.",
          "المدراء المسموح لهم بالدخول إلى هذه اللوحة.",
          "بيانات الزكاة والتبرعات والسجلات المرتبطة.",
          "إجمالي المبالغ المسجلة في هذا المتصفح."
        ],
        sectionKicker: [
          "إدارة الحسابات",
          "نشاط البوابة",
          "توزيع المحتوى",
          "وصول سريع",
          "تدقيق المصادقة"
        ],
        sectionTitle: [
          "أحدث المستخدمين",
          "أحدث المعاملات",
          "النشاط حسب الفئة",
          "إدارة المناطق المهمة",
          "آخر نشاط تسجيل دخول"
        ],
        sectionBtn: ["تصدير المستخدمين", "إعادة ضبط التحليلات"],
        quickLinks: ["الفقه الذكي", "جدول الإمساكية", "المحفوظات", "اتصل بنا"],
        usersHead: ["الاسم", "البريد", "الدور", "تاريخ الانضمام"],
        trxHead: ["الاسم", "الفئة", "المبلغ", "التاريخ"]
      },

      signin: {
        eyebrow: "تسجيل الدخول إلى البوابة",
        heroTitle: 'تسجيل الدخول إلى <span>بوابة</span> الثقافة الإسلامية.',
        desc: "تمثل هذه الصفحة بوابة التحقق للدخول إلى بوابة الثقافة الإسلامية. بعد تسجيل الدخول يمكن للمستخدم الوصول إلى محرر المحتوى ولوحة الإدارة ومختلف الأدوات الرئيسة المتاحة داخل البوابة.",
        forgotEmail: "هل نسيت كلمة المرور؟ أرسل بريدًا إلى المدير",
        forgotWhatsapp: "هل نسيت كلمة المرور؟ تواصل مع المدير عبر واتساب",
        bullets: [
          "الوصول إلى أدوات البوابة الأساسية مثل الفقه الذكي وحاسبة الزكاة ووحدات الثقافة الإسلامية.",
          "لوحة إدارة للمحررين والمساهمين والفريق الداخلي للبوابة.",
          "نظام حسابات يعتمد على الأدوار للمديرين والمحررين والأعضاء بحسب مستوى الصلاحية.",
          "مزامنة البيانات المحلية مثل الإشارات المرجعية وسجل القراءة ونشاط البوابة المخزن في المتصفح."
        ],
        helperOneTitle: "الوصول إلى البوابة",
        helperOneBody: "استخدم حسابًا مسجلًا للدخول إلى مساحة البوابة والاستفادة من الميزات وفقًا لصلاحيات حسابك.",
        helperTwoTitle: "تنقل ذكي",
        helperTwoBody: "بعد تسجيل الدخول، يوجّه النظام المستخدم إلى الصفحة الأنسب، سواء كانت مساحة العمل أو لوحة الإدارة أو البوابة الرئيسة."
      },
      runtime: {
        loginRequired: "يرجى تسجيل الدخول أولًا.",
        accessDenied: "تم رفض الوصول.",
        fallbackUser: "مستخدم",
        fallbackType: "زكاة",
        chartTotal: "إجمالي الزكاة",
        chartYearly: "الزكاة السنوية",
        noData: "لا توجد بيانات.",
        csvHeader: "الاسم,النوع,المبلغ,التاريخ",
        csvFile: "zakat-report.csv",
        confirmResetData: "هل أنت متأكد من حذف جميع بيانات الزكاة؟",
        resetDone: "تم حذف البيانات بنجاح.",
        localUserEmail: "user@portal.local",
        fallbackDonor: "متبرع",
        fallbackDonationType: "تبرع",
        fallbackCategory: "أخرى",
        catBookmark: "المحفوظات",
        catOffline: "غير متصل",
        catReading: "تقدم القراءة",
        emptyUsers: "لا توجد حسابات محفوظة بعد.",
        emptyTransactions: "لا توجد معاملات محلية محفوظة بعد.",
        emptyCategories: "لا توجد فئات نشاط للعرض بعد.",
        activitySuffix: "نشاط",
        emptyAudit: "لا توجد سجلات مصادقة بعد. سيظهر نشاط تسجيل الدخول وإنشاء الحساب هنا.",
        noEmail: "بلا بريد",
        userSuffix: "حسابات",
        trxSuffix: "أنشطة",
        exportUsersHeader: "الاسم,البريد,الدور,تاريخ الانضمام",
        exportUsersFile: "portal-users.csv",
        confirmResetAnalytics: "إعادة ضبط تحليلات المتصفح المحلية؟",
        roleAdmin: "مدير",
        roleMember: "عضو",
        roleEditor: "محرر",
        auditSignin: "سجل الدخول إلى البوابة",
        auditSignup: "أنشأ حسابًا جديدًا",
        auditSignout: "سجل الخروج من البوابة",
        portalWord: "البوابة",
        errorNameMin: "يجب أن يكون الاسم 3 أحرف على الأقل.",
        errorInvalidEmail: "البريد الإلكتروني غير صالح.",
        errorPasswordMin: "يجب أن تكون كلمة المرور 6 أحرف على الأقل.",
        errorPasswordMismatch: "تأكيد كلمة المرور غير متطابق.",
        errorEmailExists: "البريد الإلكتروني مسجل بالفعل. يرجى تسجيل الدخول.",
        errorLoginRequired: "البريد الإلكتروني وكلمة المرور مطلوبان.",
        errorAccountNotFound: "الحساب غير موجود. يرجى إنشاء حساب أولًا.",
        errorNoPassword: "هذا الحساب القديم لا يحتوي على كلمة مرور بعد. يرجى إنشاء الحساب بهذا البريد مرة أخرى.",
        errorWrongPassword: "كلمة المرور التي أدخلتها غير صحيحة."
      }
    }
  };

  function getLang() {
    const saved = localStorage.getItem("siteLang") || "id";
    return LANGS.includes(saved) ? saved : "id";
  }

  function getValue(path, lang) {
    const src = data[lang] || data.id;
    return path.split(".").reduce((acc, key) => (acc && acc[key] != null ? acc[key] : null), src);
  }

  function t(path, params = {}, lang = getLang()) {
    const raw = getValue(path, lang) ?? getValue(path, "id") ?? path;
    if (typeof raw !== "string") return raw;
    return raw.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => params[key] ?? "");
  }

  function formatCurrency(amount, lang = getLang()) {
    const locale = lang === "id" ? "id-ID" : "en-US";
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(Number(amount || 0));
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

  function applyAdmin(lang) {
    document.title = t("admin.title", {}, lang);
    applyText(".logo-text", t("admin.brand", {}, lang));
    applyTexts(".nav-menu a", t("admin.nav", {}, lang));
    applyText(".admin-header h1", t("admin.heading", {}, lang));
    applyTexts("#filter-type option", t("admin.filter", {}, lang));
    applyTexts(".admin-actions button", t("admin.actions", {}, lang));
    applyTexts(".admin-stats .stat p", t("admin.stats", {}, lang));
    applyText("body > h2", t("admin.historyTitle", {}, lang));
    applyTexts("table thead th", t("admin.tableHead", {}, lang));
    applyText(".admin-chart h3", t("admin.chartTitle", {}, lang));
    applyTexts(".stat-card span", t("admin.cards", {}, lang));
    applyTexts(".admin-filters label", t("admin.dateLabel", {}, lang));
    applyText(".admin-filters .filter-btn", t("admin.applyBtn", {}, lang));
    applyText(".main-footer .footer-col:nth-child(1) h3", t("admin.footerTitle", {}, lang));
    applyText(".main-footer .footer-col:nth-child(1) p", t("admin.footerBody", {}, lang));
    applyText(".main-footer .footer-col:nth-child(2) h4", t("admin.footerMenu", {}, lang));
    applyTexts(".main-footer .footer-col:nth-child(2) li a", t("admin.footerNav", {}, lang));
    applyText(".main-footer .footer-col:nth-child(3) h4", t("admin.footerContact", {}, lang));
    applyTexts(".main-footer .footer-col:nth-child(3) p", t("admin.contactLines", {}, lang));
    applyText(".main-footer .footer-bottom", t("admin.footerCopy", {}, lang));
  }

  function applyPortal(lang) {
    document.title = t("portal.title", {}, lang);
    applyText(".brand-mark strong", t("portal.brand", {}, lang));
    applyText(".brand-mark small", t("portal.brandSub", {}, lang));
    applyTexts(".topbar-nav a", t("portal.nav", {}, lang));
    applyText(".session-label", t("portal.sessionLabel", {}, lang));
    applyText("#logoutButton", t("portal.logout", {}, lang));
    applyText(".hero-copy .eyebrow", t("portal.eyebrow", {}, lang));
    applyText(".hero-copy h1", t("portal.heroTitle", {}, lang));
    applyText(".hero-copy .hero-text", t("portal.heroBody", {}, lang));
    applyTexts(".hero-actions a", t("portal.heroActions", {}, lang));
    applyText(".hero-panel h2", t("portal.panelTitle", {}, lang));
    applyTexts(".hero-points li", t("portal.panelPoints", {}, lang));
    applyTexts(".hero-meta span", t("portal.panelMeta", {}, lang));
    applyTexts(".stats-grid .stat-label", t("portal.statLabels", {}, lang));
    applyTexts(".stats-grid .stat-card p", t("portal.statDesc", {}, lang));
    applyTexts(".panel-grid .panel-kicker", t("portal.sectionKicker", {}, lang).slice(0, 2));
    applyTexts(".panel-grid h2", t("portal.sectionTitle", {}, lang).slice(0, 2));
    applyTexts(".panel-grid .tiny-btn", t("portal.sectionBtn", {}, lang));
    applyTexts(".panel-grid .admin-panel:nth-child(1) .data-table thead th", t("portal.usersHead", {}, lang));
    applyTexts(".panel-grid .admin-panel:nth-child(2) .data-table thead th", t("portal.trxHead", {}, lang));
    applyTexts(".insight-grid .panel-kicker", t("portal.sectionKicker", {}, lang).slice(2));
    applyTexts(".insight-grid h2", t("portal.sectionTitle", {}, lang).slice(2));
    applyTexts(".quick-links a", t("portal.quickLinks", {}, lang));
  }


  function applySignin(lang) {
    document.title = `Sign In | ${t("portal.brand", {}, lang)}`;
    applyText(".brand-link strong", t("portal.brand", {}, lang));
    applyText(".brand-link small", t("signin.eyebrow", {}, lang));
    applyTexts(".auth-topbar-actions nav a", t("portal.nav", {}, lang).map((item, idx) => idx === 3 ? t("portal.nav", {}, lang)[3] : item).slice(0, 3).concat(["Admin"]));
    applyText("#signinEyebrow", t("signin.eyebrow", {}, lang));
    const heroTitle = document.getElementById("signinHeroTitle");
    if (heroTitle) heroTitle.innerHTML = t("signin.heroTitle", {}, lang);
    applyText("#signinHeroDesc", t("signin.desc", {}, lang));
    const bullets = t("signin.bullets", {}, lang);
    const infoList = document.getElementById("signinInfoList");
    if (infoList && Array.isArray(bullets)) {
      infoList.innerHTML = bullets.map((item) => `<li>${item}</li>`).join("");
    }
    applyText("#signinHelperOneTitle", t("signin.helperOneTitle", {}, lang));
    applyText("#signinHelperOneBody", t("signin.helperOneBody", {}, lang));
    applyText("#signinHelperTwoTitle", t("signin.helperTwoTitle", {}, lang));
    applyText("#signinHelperTwoBody", t("signin.helperTwoBody", {}, lang));
    applyText("#signinForgotEmail", t("signin.forgotEmail", {}, lang));
    applyText("#signinForgotWhatsapp", t("signin.forgotWhatsapp", {}, lang));
  }

  function applySignup(lang) {
    applyText(".brand-link strong", t("portal.brand", {}, lang));
    applyText(".auth-topbar-actions nav a:nth-child(1)", t("portal.nav", {}, lang)[0]);

    const existingLink = document.getElementById("signupExistingAccountLink");
    if (existingLink) {
      existingLink.textContent = t("signup.existingAccount", {}, lang);
    }
  }

  function run() {
    const lang = getLang();
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    if (page === "admin.html") applyAdmin(lang);
    if (page === "portal-admin.html") applyPortal(lang);
    if (page === "signin.html") applySignin(lang);
    if (page === "signup.html") applySignup(lang);
  }

  window.PortalAdminI18n = { getLang, t, formatCurrency };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
  window.addEventListener("portal-language-change", run);
  window.addEventListener("storage", (event) => {
    if (event.key === "siteLang") run();
  });
})();
