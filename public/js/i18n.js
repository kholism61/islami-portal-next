(() => {
  const STORAGE_KEY = "siteLang";
  const LEGACY_STORAGE_KEYS = ["siteLang", "lang"];
  const DEFAULT_LANG = "id";
  const SUPPORTED_LANGS = ["id", "en", "ar"];
  const currentPage = (window.location.pathname.split("/").pop() || "index.html").replace(/\.html$/i, "").toLowerCase();

  const translations = {
    id: {
      common: {
        lang_switch_label: "Pilih bahasa",
        nav_home: "Beranda",
        nav_admin: "Admin",
        sign_in: "Sign In",
        sign_up: "Sign Up",
        logout: "Log Out",
        role_admin: "admin",
        role_member: "member"
      },
      index: {
        page_title: "Portal Literasi Islam | Mimbar Ilmu untuk Umat",
        quick_about_title: "Tentang",
        quick_about_sub: "Profil & visi portal",
        quick_faq_title: "FAQ",
        quick_faq_sub: "Pertanyaan umum",
        quick_donate_title: "Donasi",
        quick_donate_sub: "Dukung dakwah ilmiah",
        quick_contact_title: "Kontak",
        quick_contact_sub: "Masukan & diskusi",
        quick_ramadan_title: "Jadwal Imsakiyah",
        quick_ramadan_sub: "Imsak & Berbuka",
        online_status: "🌐 Online",
        site_name: "Portal Literasi Islam",
        hero_title: "Portal Literasi Islam",
        hero_subtitle: "Ruang kajian Islam yang membahas fiqh, hadis, dan pemikiran keislaman dalam konteks zaman modern secara ilmiah dan mendalam.",
        hero_tagline: "Portal kajian Islam berbasis literatur, analisis ilmiah, dan refleksi pemikiran kontemporer",
        hero_cta_primary: "📖 Mulai Membaca",
        hero_cta_secondary: "⭐ Artikel Pilihan",
        hero_featured_label: "🔥 Artikel Pilihan:",
        loading: "Memuat...",
        offline_articles_stat: "Artikel Offline",
        welcome_title: "Selamat Datang di <span>Portal Literasi Islam</span>",
        welcome_desc: "Portal Literasi Islam merupakan ruang kajian Islam yang menyajikan pembahasan fiqh, hadis, pemikiran Islam, serta isu-isu kontemporer dengan pendekatan <strong>ilmiah, berimbang, dan bertanggung jawab</strong>.",
        topic_1: "ilmu syariah",
        topic_2: "Hadis",
        topic_3: "Pemikiran Islam",
        topic_4: "Islam & Negara",
        sidebar_all: "Semua Artikel",
        sidebar_sharia: "Ilmu Syariah",
        sidebar_fiqh: "Fiqh",
        sidebar_fiqh_ibadah: "Fiqh Ibadah",
        sidebar_fiqh_muamalah: "Fiqh Muamalah",
        sidebar_ushul_fiqh: "Ushul Fiqh",
        sidebar_maqasid: "Maqashid Syariah",
        sidebar_hadith: "Hadis",
        sidebar_thought: "Pemikiran Islam",
        sidebar_worship: "Ibadah",
        sidebar_quran: "Al-Qur’an & Tafsir",
        sidebar_state: "Islam & Negara",
        sidebar_education: "Pendidikan & Bahasa Arab",
        sidebar_challenges: "Islam & Tantangan Zaman",
        sidebar_ramadan: "Ramadhan di Al-Azhar",
        sidebar_kalam: "Ilmu Kalam",
        sidebar_tasawuf: "Tasawuf",
        sidebar_sirah: "Sirah Nabawiyah",
        sidebar_psychology: "Psikologi",
        sidebar_mawaris: "Kalkulator Mawaris",
        sidebar_women: "Fiqh Wanita",
        sidebar_offline: "Artikel Offline",
        sidebar_hadith_mustalah: "Mustolah Hadis",
        sidebar_hadith_ulumul: "Ulumul Hadis",
        sidebar_hadith_syamail: "Syama'il",
        sidebar_thought_classic: "Klasik",
        sidebar_thought_modern: "Modern",
        sidebar_worship_shalat: "Shalat",
        sidebar_worship_puasa: "Puasa",
        sidebar_worship_zakat: "Zakat & Sedekah",
        sidebar_worship_haji: "Haji & Umrah",
        sidebar_worship_dzikir: "Doa & Dzikir",
        sidebar_worship_fadilah: "Fadilah Ibadah",
        sidebar_quran_ayat: "Tafsir Ayat",
        sidebar_quran_surah: "Tafsir Surah",
        sidebar_quran_thematic: "Tafsir Tematik",
        sidebar_quran_ulumul: "Ulumul Qur’an",
        sidebar_quran_fadilah: "Fadilah Al-Qur’an",
        sidebar_state_politics: "Politik Islam",
        sidebar_state_khilafah: "Khilafah",
        sidebar_state_sharia: "Negara & Syariah",
        sidebar_edu_innovation: "Inovasi Pembelajaran",
        sidebar_edu_material: "Pengembangan Bahan Ajar",
        sidebar_edu_management: "Manajemen Pendidikan",
        sidebar_edu_early: "Pendidikan Anak Usia Dini",
        sidebar_edu_tradition: "Tradisi Keilmuan Islam",
        sidebar_challenges_digital: "Etika Digital",
        sidebar_challenges_global: "Politik Global",
        sidebar_challenges_gender: "Gender & Keadilan",
        sidebar_challenges_economy: "Ekonomi Syariah Modern",
        sidebar_ramadan_notes: "Catatan Ramadhan",
        sidebar_ramadan_history: "Sejarah Al-Azhar",
        sidebar_ramadan_reflection: "Tadabbur & Refleksi",
        sidebar_kalam_aqidah: "Akidah Islam",
        sidebar_kalam_classic: "Kalam Klasik",
        sidebar_kalam_modern: "Kalam Modern",
        sidebar_tasawuf_akhlaq: "Akhlak & Tazkiyah",
        sidebar_tasawuf_tarekat: "Tasawuf & Tarekat",
        sidebar_sirah_makkiyah: "Periode Makkiyah",
        sidebar_sirah_madaniyah: "Periode Madaniyah",
        sidebar_psychology_nafs: "Konsep Nafs dalam Islam",
        sidebar_psychology_ibadah: "Psikologi Ibadah",
        sidebar_psychology_tazkiyah: "Tazkiyatun Nafs",
        sidebar_psychology_social: "Psikologi Sosial",
        sidebar_psychology_education: "Psikologi Pendidikan",
        sidebar_psychology_mental: "Kesehatan Mental",
        search_placeholder: "Cari artikel berdasarkan judul…",
        continue_reading: "📖 Lanjutkan Membaca",
        reading_stats: "📊 Statistik Membaca",
        stat_articles: "Artikel Dibaca",
        stat_minutes: "Menit Membaca",
        stat_last: "Terakhir Dibaca",
        prayer_imsak: "Imsak",
        prayer_fajr: "Subuh",
        prayer_maghrib: "Maghrib",
        prayer_today_title: "🕌 Waktu Sholat Hari Ini <span id=\"prayer-status\" class=\"prayer-status\"></span>",
        prayer_next_label: "Menuju waktu sholat berikutnya",
        prayer_progress_to: "Menuju",
        azan_active: "🔔 Azan Aktif",
        azan_tolerance: "Toleransi Azan",
        azan_on_time: "Tepat waktu",
        azan_1_minute: "1 menit",
        azan_2_minutes: "2 menit",
        azan_3_minutes: "3 menit",
        azan_5_minutes: "5 menit",
        notifications_label: "Notifikasi",
        enable_notifications: "🔔 Aktifkan Notifikasi",
        azan_volume: "Volume Azan",
        muezzin_voice: "Suara Muadzin",
        muezzin_mishary: "Mishary Rashid",
        muezzin_makkah: "Masjidil Haram",
        muezzin_madinah: "Masjid Nabawi",
        muezzin_egypt: "Mesir",
        detecting_location: "Mendeteksi lokasi...",
        open_quran_btn: "📖 Baca Qur'an",
        open_hadith_btn: "📜 Baca Hadis",
        value_science_title: "Landasan Keilmuan",
        value_science_body: "Setiap tulisan disusun dengan rujukan literatur dan metodologi yang dapat dipertanggungjawabkan secara akademik.",
        value_context_title: "Konteks Kontemporer",
        value_context_body: "Islam dibahas dalam relasinya dengan realitas sosial, politik, dan intelektual masa kini secara proporsional.",
        author_name: "Muhammad Nurcholis",
        author_cred: "Mahasiswa Syariah wa Qanun — Universitas Al-Azhar, Kairo",
        author_desc: "Menekuni kajian fiqh, pemikiran Islam, dan isu keislaman kontemporer dengan pendekatan literatur klasik dan analisis akademik.",
        author_btn: "Profil Lengkap →",
        featured_cta: "Baca Artikel →",
        latest_articles_title: "Artikel Terbaru",
        latest_articles_subtitle: "Kumpulan artikel terbaru seputar fiqh, hadis, pemikiran Islam, dan isu kontemporer.",
        download_category: "📥 Download kategori ini",
        empty_state: "😕 Artikel tidak ditemukan",
        popular_title: "Artikel Populer",
        popular_subtitle: "Artikel yang banyak dibaca dan direkomendasikan.",
        tools_title: "Tools Keislaman",
        tools_sub: "Gunakan berbagai kalkulator fiqh untuk membantu ibadah dan memahami hukum Islam secara praktis.",
        tool_zakat: "Kalkulator Zakat",
        tool_mawaris: "Kalkulator Mawaris",
        tool_women: "Fiqh Wanita",
        tool_kaffarah: "Kaffarah & Fidyah",
        tool_smart_title: "Smart Fiqh:",
        tool_smart_desc: "Panduan fiqh interaktif untuk membantu memahami hukum ibadah secara cepat.",
        categories_title: "Kategori",
        categories_sub: "Jelajahi berbagai topik keilmuan Islam yang tersedia di portal ini.",
        offline_section_title: "Artikel Offline",
        see_all: "Lihat Semua",
        zakat_card_title: "Kalkulator Zakat",
        zakat_card_body: "Hitung zakat fitrah dan maal dengan mudah",
        prefooter_about_title: "Portal Literasi Islam",
        prefooter_about_body: "Portal kajian Islam yang menghadirkan analisis ilmiah, pemikiran kritis, dan dialog keislaman dalam konteks modern.",
        prefooter_main_title: "Kajian Utama",
        prefooter_main_1: "Fiqh & Ushul Fiqh",
        prefooter_main_2: "Hadis & Studi Sanad",
        prefooter_main_3: "Pemikiran Islam",
        prefooter_main_4: "Islam & Negara",
        prefooter_main_5: "Isu Kontemporer",
        prefooter_features_title: "Fitur",
        prefooter_feature_1: "Artikel Pilihan",
        prefooter_feature_2: "Bookmark Artikel",
        prefooter_feature_3: "Pencarian Cerdas",
        prefooter_feature_4: "Mode Baca",
        prefooter_feature_5: "Multi Bahasa",
        prefooter_note_title: "Catatan",
        prefooter_note_body: "Seluruh konten disajikan untuk tujuan edukasi dan kajian ilmiah, bukan sebagai fatwa atau klaim kebenaran tunggal.",
        footer_about: "Tentang",
        footer_faq: "FAQ",
        footer_contact: "Kontak",
        footer_privacy: "Privacy Policy",
        footer_disclaimer: "Disclaimer",
        footer_copy: "© 2026 Portal Literasi Islam – Seluruh hak cipta dilindungi.",
        tasbih_title: "🧿 Tasbih Digital",
        tasbih_translation: "Maha Suci Allah",
        tasbih_press: "Tekan",
        tasbih_reset: "Reset",
        qibla_title: "🧭 Arah Kiblat",
        detecting: "Mendeteksi...",
        offline_notice: "⚠️ Anda sedang offline. Hanya artikel yang sudah diunduh yang bisa dibaca.",
        quran_title: "📖 Baca Al-Qur'an",
        hadith_title: "📜 Koleksi Hadis",
        load_button: "Load",
        read_more: "Baca selengkapnya",
        articles_count_label: "artikel",
        qari_mishary: "Mishary Rashid",
        qari_sudais: "Abdul Rahman Al-Sudais",
        qari_maher: "Maher Al-Muaiqly"
      },
      signin: {
        page_title: "Sign In | Portal Literasi Islam",
        brand_subtitle: "Masuk ke portal literasi & dashboard admin",
        eyebrow: "Portal Login",
        hero_heading: "Masuk ke <span>portal</span> literasi Islam.",
        hero_body: "Halaman ini disiapkan untuk akses editor, tim konten, dan admin dengan alur login yang cepat, aman, dan profesional.",
        info_1: "Dashboard admin modern untuk memantau akun dan aktivitas portal.",
        info_2: "Support member biasa dan admin dengan role otomatis.",
        info_3: "Tetap bisa membaca data zakat, donasi, bookmark, dan histori lokal.",
        helper_1_title: "Akses portal",
        helper_1_body: "Gunakan akun yang sudah terdaftar untuk masuk ke area portal sesuai role Anda.",
        helper_2_title: "Redirect cerdas",
        helper_2_body: "Admin diarahkan ke dashboard, member diarahkan kembali ke portal.",
        form_title: "Sign In",
        form_subtext: "Masuk dengan email dan kata sandi akun portal Anda.",
        email_label: "Email",
        email_placeholder: "nama@domain.com",
        password_label: "Password",
        password_placeholder: "Masukkan password",
        form_note: "Jika sebelumnya Anda memakai login lama di browser ini, sistem akan menyelaraskan session secara otomatis.",
        submit: "Masuk ke portal",
        alt: "Belum punya akun? Sign Up",
        footer_text: "Ingin mengelola proyek? Gunakan email admin atau buat akun tim terlebih dahulu.",
        footer_link: "",
        denied_message: "Akun Anda belum memiliki hak akses admin.",
        session_active: "Session aktif terdeteksi untuk {{email}}. Anda tetap bisa login dengan akun lain dari form ini.",
        signin_success: "Login berhasil. Mengarahkan ke halaman berikutnya..."
      },
      signup: {
        page_title: "Sign Up | Portal Literasi Islam",
        brand_name: "Portal Literasi Islam",
        brand_subtitle: "Daftar akun portal untuk pembaca, editor, dan admin",
        eyebrow: "Portal Membership",
        hero_heading: "Bangun akun <span>portal modern</span> untuk dakwah literasi.",
        hero_body: "Form Sign Up ini dibuat ringan dan profesional agar onboarding pembaca serta tim portal berjalan lebih cepat dan nyaman.",
        feature_1: "Akun member cocok untuk pembaca, relawan, dan kontributor.",
        feature_2: "Email admin akan otomatis mendapat akses dashboard admin.",
        feature_3: "Session tetap sinkron dengan struktur localStorage yang lama.",
        helper_1_title: "Email admin yang dikenali",
        helper_1_body: "nurcholism51@gmail.com",
        helper_2_title: "Saran penggunaan",
        helper_2_body: "Pakai akun admin untuk pengelolaan, akun member untuk uji portal pengguna.",
        form_title: "Sign Up",
        form_subtext: "Buat akun baru dan sistem akan langsung menyiapkan session portal Anda.",
        name_label: "Nama Lengkap",
        name_placeholder: "Nama Anda",
        email_label: "Email",
        email_placeholder: "nama@domain.com",
        password_label: "Password",
        password_placeholder: "Minimal 6 karakter",
        confirm_label: "Konfirmasi Password",
        confirm_placeholder: "Ulangi password",
        form_note: "Role akun akan otomatis menjadi <b>admin</b> jika email termasuk daftar admin portal, selain itu menjadi <b>member</b>.",
        submit: "Buat akun sekarang",
        alt: "Sudah punya akun? Sign In",
        footer_text: "Setelah pendaftaran berhasil, Anda akan langsung diarahkan ke halaman yang sesuai dengan role akun.",
        footer_link: "Masuk ke akun yang sudah ada",
        session_active: "Session aktif terdeteksi untuk {{email}}. Anda tetap bisa membuat akun baru dari form ini.",
        signup_success: "Akun berhasil dibuat sebagai {{role}}. Mengarahkan..."
      }
    },
    en: {
      common: {
        lang_switch_label: "Choose language",
        nav_home: "Home",
        nav_admin: "Admin",
        sign_in: "Sign In",
        sign_up: "Sign Up",
        logout: "Log Out",
        role_admin: "admin",
        role_member: "member"
      },
      index: {
        page_title: "Islamic Literacy Portal | A Knowledge Pulpit for the Ummah",
        quick_about_title: "About",
        quick_about_sub: "Portal profile & vision",
        quick_faq_title: "FAQ",
        quick_faq_sub: "Common questions",
        quick_donate_title: "Donate",
        quick_donate_sub: "Support scholarly da'wah",
        quick_contact_title: "Contact",
        quick_contact_sub: "Feedback & discussion",
        quick_ramadan_title: "Ramadan Schedule",
        quick_ramadan_sub: "Imsak & Iftar",
        online_status: "🌐 Online",
        site_name: "Islamic Literacy Portal",
        hero_title: "Islamic Literacy Portal",
        hero_subtitle: "A space for Islamic studies covering fiqh, hadith, and Islamic thought in the context of the modern age with scholarly depth.",
        hero_tagline: "An Islamic knowledge portal rooted in literature, scholarly analysis, and contemporary reflection",
        hero_cta_primary: "📖 Start Reading",
        hero_cta_secondary: "⭐ Featured Article",
        hero_featured_label: "🔥 Featured:",
        loading: "Loading...",
        offline_articles_stat: "Offline Articles",
        welcome_title: "Welcome to <span>Islamic Literacy Portal</span>",
        welcome_desc: "The Islamic Literacy Portal is a space for Islamic learning that presents fiqh, hadith, Islamic thought, and contemporary issues through a <strong>scholarly, balanced, and responsible</strong> approach.",
        topic_1: "sharia studies",
        topic_2: "Hadith",
        topic_3: "Islamic Thought",
        topic_4: "Islam & State",
        sidebar_all: "All Articles",
        sidebar_sharia: "Sharia Sciences",
        sidebar_fiqh: "Fiqh",
        sidebar_fiqh_ibadah: "Worship Fiqh",
        sidebar_fiqh_muamalah: "Muamalah Fiqh",
        sidebar_ushul_fiqh: "Usul al-Fiqh",
        sidebar_maqasid: "Maqasid al-Shariah",
        sidebar_hadith: "Hadith",
        sidebar_thought: "Islamic Thought",
        sidebar_worship: "Worship",
        sidebar_quran: "Qur'an & Tafsir",
        sidebar_state: "Islam & State",
        sidebar_education: "Education & Arabic",
        sidebar_challenges: "Islam & Modern Challenges",
        sidebar_ramadan: "Ramadan at Al-Azhar",
        sidebar_kalam: "Ilm al-Kalam",
        sidebar_tasawuf: "Tasawuf",
        sidebar_sirah: "Prophetic Biography",
        sidebar_psychology: "Psychology",
        sidebar_mawaris: "Inheritance Calculator",
        sidebar_women: "Women's Fiqh",
        sidebar_offline: "Offline Articles",
        sidebar_hadith_mustalah: "Hadith Terminology",
        sidebar_hadith_ulumul: "Hadith Sciences",
        sidebar_hadith_syamail: "Shama'il",
        sidebar_thought_classic: "Classical",
        sidebar_thought_modern: "Modern",
        sidebar_worship_shalat: "Prayer",
        sidebar_worship_puasa: "Fasting",
        sidebar_worship_zakat: "Zakat & Charity",
        sidebar_worship_haji: "Hajj & Umrah",
        sidebar_worship_dzikir: "Supplication & Dhikr",
        sidebar_worship_fadilah: "Virtues of Worship",
        sidebar_quran_ayat: "Verse Tafsir",
        sidebar_quran_surah: "Surah Tafsir",
        sidebar_quran_thematic: "Thematic Tafsir",
        sidebar_quran_ulumul: "Qur'anic Sciences",
        sidebar_quran_fadilah: "Virtues of the Qur'an",
        sidebar_state_politics: "Islamic Politics",
        sidebar_state_khilafah: "Caliphate",
        sidebar_state_sharia: "State & Sharia",
        sidebar_edu_innovation: "Learning Innovation",
        sidebar_edu_material: "Curriculum Development",
        sidebar_edu_management: "Education Management",
        sidebar_edu_early: "Early Childhood Education",
        sidebar_edu_tradition: "Islamic Scholarly Tradition",
        sidebar_challenges_digital: "Digital Ethics",
        sidebar_challenges_global: "Global Politics",
        sidebar_challenges_gender: "Gender & Justice",
        sidebar_challenges_economy: "Modern Sharia Economics",
        sidebar_ramadan_notes: "Ramadan Notes",
        sidebar_ramadan_history: "History of Al-Azhar",
        sidebar_ramadan_reflection: "Tadabbur & Reflection",
        sidebar_kalam_aqidah: "Islamic Creed",
        sidebar_kalam_classic: "Classical Kalam",
        sidebar_kalam_modern: "Modern Kalam",
        sidebar_tasawuf_akhlaq: "Ethics & Tazkiyah",
        sidebar_tasawuf_tarekat: "Tasawuf & Tariqa",
        sidebar_sirah_makkiyah: "Makki Period",
        sidebar_sirah_madaniyah: "Madani Period",
        sidebar_psychology_nafs: "Concept of Nafs in Islam",
        sidebar_psychology_ibadah: "Psychology of Worship",
        sidebar_psychology_tazkiyah: "Tazkiyatun Nafs",
        sidebar_psychology_social: "Social Psychology",
        sidebar_psychology_education: "Educational Psychology",
        sidebar_psychology_mental: "Mental Health",
        search_placeholder: "Search articles by title…",
        continue_reading: "📖 Continue Reading",
        reading_stats: "📊 Reading Stats",
        stat_articles: "Articles Read",
        stat_minutes: "Reading Minutes",
        stat_last: "Last Read",
        prayer_imsak: "Imsak",
        prayer_fajr: "Fajr",
        prayer_maghrib: "Maghrib",
        prayer_today_title: "🕌 Today's Prayer Times <span id=\"prayer-status\" class=\"prayer-status\"></span>",
        prayer_next_label: "Until the next prayer time",
        prayer_progress_to: "Until",
        azan_active: "🔔 Azan Active",
        azan_tolerance: "Adhan Tolerance",
        azan_on_time: "On time",
        azan_1_minute: "1 minute",
        azan_2_minutes: "2 minutes",
        azan_3_minutes: "3 minutes",
        azan_5_minutes: "5 minutes",
        notifications_label: "Notifications",
        enable_notifications: "🔔 Enable Notifications",
        azan_volume: "Adhan Volume",
        muezzin_voice: "Muezzin Voice",
        muezzin_mishary: "Mishary Rashid",
        muezzin_makkah: "Masjid al-Haram",
        muezzin_madinah: "Al-Masjid an-Nabawi",
        muezzin_egypt: "Egypt",
        detecting_location: "Detecting location...",
        open_quran_btn: "📖 Read Qur'an",
        open_hadith_btn: "📜 Read Hadith",
        value_science_title: "Scholarly Foundation",
        value_science_body: "Every article is written with references and methodology that can be academically accounted for.",
        value_context_title: "Contemporary Context",
        value_context_body: "Islam is discussed in relation to today’s social, political, and intellectual realities in a proportional way.",
        author_name: "Muhammad Nurcholis",
        author_cred: "Student of Sharia and Law — Al-Azhar University, Cairo",
        author_desc: "Focused on fiqh, Islamic thought, and contemporary Muslim issues through classical literature and academic analysis.",
        author_btn: "Full Profile →",
        featured_cta: "Read Article →",
        latest_articles_title: "Latest Articles",
        latest_articles_subtitle: "A collection of the newest articles on fiqh, hadith, Islamic thought, and contemporary issues.",
        download_category: "📥 Download this category",
        empty_state: "😕 No articles found",
        popular_title: "Popular Articles",
        popular_subtitle: "Articles that are widely read and recommended.",
        tools_title: "Islamic Tools",
        tools_sub: "Use practical fiqh calculators to support worship and understand Islamic rulings more easily.",
        tool_zakat: "Zakat Calculator",
        tool_mawaris: "Inheritance Calculator",
        tool_women: "Women's Fiqh",
        tool_kaffarah: "Kaffarah & Fidyah",
        tool_smart_title: "Smart Fiqh:",
        tool_smart_desc: "An interactive fiqh guide to help you understand acts of worship quickly.",
        categories_title: "Categories",
        categories_sub: "Explore the Islamic knowledge topics available on this portal.",
        offline_section_title: "Offline Articles",
        see_all: "See All",
        zakat_card_title: "Zakat Calculator",
        zakat_card_body: "Calculate zakat al-fitr and zakat al-mal easily",
        prefooter_about_title: "Islamic Literacy Portal",
        prefooter_about_body: "An Islamic study portal offering scholarly analysis, critical thought, and Islamic dialogue in a modern context.",
        prefooter_main_title: "Main Studies",
        prefooter_main_1: "Fiqh & Usul al-Fiqh",
        prefooter_main_2: "Hadith & Isnād Studies",
        prefooter_main_3: "Islamic Thought",
        prefooter_main_4: "Islam & State",
        prefooter_main_5: "Contemporary Issues",
        prefooter_features_title: "Features",
        prefooter_feature_1: "Featured Articles",
        prefooter_feature_2: "Article Bookmarks",
        prefooter_feature_3: "Smart Search",
        prefooter_feature_4: "Reading Mode",
        prefooter_feature_5: "Multi-language",
        prefooter_note_title: "Note",
        prefooter_note_body: "All content is presented for education and scholarly study, not as a fatwa or an exclusive claim to truth.",
        footer_about: "About",
        footer_faq: "FAQ",
        footer_contact: "Contact",
        footer_privacy: "Privacy Policy",
        footer_disclaimer: "Disclaimer",
        footer_copy: "© 2026 Islamic Literacy Portal – All rights reserved.",
        tasbih_title: "🧿 Digital Tasbih",
        tasbih_translation: "Glory be to Allah",
        tasbih_press: "Count",
        tasbih_reset: "Reset",
        qibla_title: "🧭 Qibla Direction",
        detecting: "Detecting...",
        offline_notice: "⚠️ You are offline. Only downloaded articles are available.",
        quran_title: "📖 Read the Qur'an",
        hadith_title: "📜 Hadith Collection",
        load_button: "Load",
        read_more: "Read more",
        articles_count_label: "articles",
        qari_mishary: "Mishary Rashid",
        qari_sudais: "Abdul Rahman Al-Sudais",
        qari_maher: "Maher Al-Muaiqly"
      },
      signin: {
        page_title: "Sign In | Portal Literasi Islam",
        brand_subtitle: "Access the literacy portal and admin dashboard",
        eyebrow: "Portal Access",
        hero_heading: "Enter the <span>literacy portal</span>.",
        hero_body: "This page is prepared for editors, content team members, and admins with a fast, secure, and professional sign-in flow.",
        info_1: "A modern admin dashboard to monitor accounts and portal activity.",
        info_2: "Supports regular members and admins with automatic roles.",
        info_3: "Still compatible with local zakat, donation, bookmark, and reading history data.",
        helper_1_title: "Portal access",
        helper_1_body: "Use a registered account to enter the portal area according to your role.",
        helper_2_title: "Smart redirect",
        helper_2_body: "Admins are sent to the dashboard, members are redirected back to the portal.",
        form_title: "Sign In",
        form_subtext: "Sign in with the email and password stored in this portal.",
        email_label: "Email",
        email_placeholder: "name@domain.com",
        password_label: "Password",
        password_placeholder: "Enter your password",
        form_note: "If you previously used the old login in this browser, the system will align the session automatically.",
        submit: "Enter the portal",
        alt: "Need an account? Sign Up",
        footer_text: "Need to manage the project? Use an admin email or create a team account first.",
        footer_link: "",
        denied_message: "Your account does not have admin access.",
        session_active: "An active session was detected for {{email}}. You can still sign in with another account using this form.",
        signin_success: "Login successful. Redirecting to the next page..."
      },
      signup: {
        page_title: "Sign Up | Islamic Literacy Portal",
        brand_name: "Islamic Literacy Portal",
        brand_subtitle: "Register a portal account for readers, editors, and admins",
        eyebrow: "Portal Membership",
        hero_heading: "Build a <span>modern portal</span> account for literacy da'wah.",
        hero_body: "This Sign Up form is optimized to keep onboarding simple and professional for both readers and portal team members.",
        feature_1: "Member accounts are suitable for readers, volunteers, and contributors.",
        feature_2: "Admin emails automatically get access to the admin dashboard.",
        feature_3: "Sessions stay aligned with the legacy localStorage structure.",
        helper_1_title: "Recognized admin email",
        helper_1_body: "nurcholism51@gmail.com",
        helper_2_title: "Suggested usage",
        helper_2_body: "Use an admin account for management and a member account for user-side portal testing.",
        form_title: "Sign Up",
        form_subtext: "Create a new account and the system will immediately prepare your portal session.",
        name_label: "Full Name",
        name_placeholder: "Your name",
        email_label: "Email",
        email_placeholder: "name@domain.com",
        password_label: "Password",
        password_placeholder: "Minimum 6 characters",
        confirm_label: "Confirm Password",
        confirm_placeholder: "Repeat password",
        form_note: "The account role will automatically become <b>admin</b> if the email is in the portal admin list; otherwise it becomes <b>member</b>.",
        submit: "Create account now",
        alt: "Already have an account? Sign In",
        footer_text: "After registration succeeds, you will be directed to the page that matches your account role.",
        footer_link: "Sign in to an existing account",
        session_active: "An active session was detected for {{email}}. You can still create a new account with this form.",
        signup_success: "Account created successfully as {{role}}. Redirecting..."
      }
    },
    ar: {
      common: {
        lang_switch_label: "اختر اللغة",
        nav_home: "الرئيسية",
        nav_admin: "الإدارة",
        sign_in: "تسجيل الدخول",
        sign_up: "إنشاء حساب",
        logout: "تسجيل الخروج",
        role_admin: "مشرف",
        role_member: "مستخدم"
      },
      index: {
        page_title: "بوابة الثقافة الإسلامية | منبر العلم للأمة",
        quick_about_title: "من نحن",
        quick_about_sub: "نبذة ورؤية البوابة",
        quick_faq_title: "الأسئلة الشائعة",
        quick_faq_sub: "أسئلة عامة",
        quick_donate_title: "تبرع",
        quick_donate_sub: "ادعم الدعوة العلمية",
        quick_contact_title: "تواصل",
        quick_contact_sub: "ملاحظات ونقاش",
        quick_ramadan_title: "جدول الإمساكية",
        quick_ramadan_sub: "الإمساك والإفطار",
        online_status: "🌐 متصل",
        site_name: "بوابة الثقافة الإسلامية",
        hero_title: "بوابة الثقافة الإسلامية",
        hero_subtitle: "مساحة للدراسات الإسلامية تناقش الفقه والحديث والفكر الإسلامي في سياق العصر بأسلوب علمي معمق.",
        hero_tagline: "بوابة معرفية إسلامية تقوم على المصادر والتحليل العلمي وتأملات الفكر المعاصر",
        hero_cta_primary: "📖 ابدأ القراءة",
        hero_cta_secondary: "⭐ المقال المميز",
        hero_featured_label: "🔥 المقال المميز:",
        loading: "جاري التحميل...",
        offline_articles_stat: "مقالات دون اتصال",
        welcome_title: "مرحبًا بكم في <span>بوابة الثقافة الإسلامية</span>",
        welcome_desc: "بوابة الثقافة الإسلامية مساحة معرفية تقدم الفقه والحديث والفكر الإسلامي والقضايا المعاصرة بمنهج <strong>علمي ومتوازن ومسؤول</strong>.",
        topic_1: "العلوم الشرعية",
        topic_2: "الحديث",
        topic_3: "الفكر الإسلامي",
        topic_4: "الإسلام والدولة",
        sidebar_all: "جميع المقالات",
        sidebar_sharia: "العلوم الشرعية",
        sidebar_fiqh: "الفقه",
        sidebar_fiqh_ibadah: "فقه العبادات",
        sidebar_fiqh_muamalah: "فقه المعاملات",
        sidebar_ushul_fiqh: "أصول الفقه",
        sidebar_maqasid: "مقاصد الشريعة",
        sidebar_hadith: "الحديث",
        sidebar_thought: "الفكر الإسلامي",
        sidebar_worship: "العبادات",
        sidebar_quran: "القرآن والتفسير",
        sidebar_state: "الإسلام والدولة",
        sidebar_education: "التعليم واللغة العربية",
        sidebar_challenges: "الإسلام وتحديات العصر",
        sidebar_ramadan: "رمضان في الأزهر",
        sidebar_kalam: "علم الكلام",
        sidebar_tasawuf: "التصوف",
        sidebar_sirah: "السيرة النبوية",
        sidebar_psychology: "علم النفس",
        sidebar_mawaris: "حاسبة المواريث",
        sidebar_women: "فقه المرأة",
        sidebar_offline: "المقالات دون اتصال",
        sidebar_hadith_mustalah: "مصطلح الحديث",
        sidebar_hadith_ulumul: "علوم الحديث",
        sidebar_hadith_syamail: "الشمائل",
        sidebar_thought_classic: "كلاسيكي",
        sidebar_thought_modern: "حديث",
        sidebar_worship_shalat: "الصلاة",
        sidebar_worship_puasa: "الصيام",
        sidebar_worship_zakat: "الزكاة والصدقة",
        sidebar_worship_haji: "الحج والعمرة",
        sidebar_worship_dzikir: "الدعاء والذكر",
        sidebar_worship_fadilah: "فضائل العبادة",
        sidebar_quran_ayat: "تفسير الآيات",
        sidebar_quran_surah: "تفسير السور",
        sidebar_quran_thematic: "التفسير الموضوعي",
        sidebar_quran_ulumul: "علوم القرآن",
        sidebar_quran_fadilah: "فضائل القرآن",
        sidebar_state_politics: "السياسة الإسلامية",
        sidebar_state_khilafah: "الخلافة",
        sidebar_state_sharia: "الدولة والشريعة",
        sidebar_edu_innovation: "تطوير التعلم",
        sidebar_edu_material: "تطوير المواد التعليمية",
        sidebar_edu_management: "إدارة التعليم",
        sidebar_edu_early: "تعليم الطفولة المبكرة",
        sidebar_edu_tradition: "التراث العلمي الإسلامي",
        sidebar_challenges_digital: "أخلاقيات رقمية",
        sidebar_challenges_global: "السياسة العالمية",
        sidebar_challenges_gender: "الجندر والعدالة",
        sidebar_challenges_economy: "الاقتصاد الشرعي الحديث",
        sidebar_ramadan_notes: "مذكرات رمضان",
        sidebar_ramadan_history: "تاريخ الأزهر",
        sidebar_ramadan_reflection: "تدبر وتأمل",
        sidebar_kalam_aqidah: "العقيدة الإسلامية",
        sidebar_kalam_classic: "الكلام الكلاسيكي",
        sidebar_kalam_modern: "الكلام الحديث",
        sidebar_tasawuf_akhlaq: "الأخلاق والتزكية",
        sidebar_tasawuf_tarekat: "التصوف والطريقة",
        sidebar_sirah_makkiyah: "المرحلة المكية",
        sidebar_sirah_madaniyah: "المرحلة المدنية",
        sidebar_psychology_nafs: "مفهوم النفس في الإسلام",
        sidebar_psychology_ibadah: "علم نفس العبادة",
        sidebar_psychology_tazkiyah: "تزكية النفس",
        sidebar_psychology_social: "علم النفس الاجتماعي",
        sidebar_psychology_education: "علم النفس التربوي",
        sidebar_psychology_mental: "الصحة النفسية",
        search_placeholder: "ابحث عن المقالات حسب العنوان…",
        continue_reading: "📖 تابع القراءة",
        reading_stats: "📊 إحصاءات القراءة",
        stat_articles: "المقالات المقروءة",
        stat_minutes: "دقائق القراءة",
        stat_last: "آخر قراءة",
        prayer_imsak: "الإمساك",
        prayer_fajr: "الفجر",
        prayer_maghrib: "المغرب",
        prayer_today_title: "🕌 أوقات الصلاة اليوم <span id=\"prayer-status\" class=\"prayer-status\"></span>",
        prayer_next_label: "حتى موعد الصلاة التالية",
        prayer_progress_to: "حتى",
        azan_active: "🔔 الأذان مفعّل",
        azan_tolerance: "سماحية الأذان",
        azan_on_time: "في الوقت المحدد",
        azan_1_minute: "دقيقة واحدة",
        azan_2_minutes: "دقيقتان",
        azan_3_minutes: "3 دقائق",
        azan_5_minutes: "5 دقائق",
        notifications_label: "الإشعارات",
        enable_notifications: "🔔 تفعيل الإشعارات",
        azan_volume: "مستوى الأذان",
        muezzin_voice: "صوت المؤذن",
        muezzin_mishary: "مشاري راشد",
        muezzin_makkah: "المسجد الحرام",
        muezzin_madinah: "المسجد النبوي",
        muezzin_egypt: "مصر",
        detecting_location: "جارٍ تحديد الموقع...",
        open_quran_btn: "📖 اقرأ القرآن",
        open_hadith_btn: "📜 اقرأ الحديث",
        value_science_title: "الأساس العلمي",
        value_science_body: "تُكتب كل مادة بالاعتماد على مراجع ومنهجية يمكن الدفاع عنها أكاديميًا.",
        value_context_title: "السياق المعاصر",
        value_context_body: "يُناقش الإسلام في علاقته بالواقع الاجتماعي والسياسي والفكري المعاصر بصورة متوازنة.",
        author_name: "محمد نور خالص",
        author_cred: "طالب الشريعة والقانون — جامعة الأزهر بالقاهرة",
        author_desc: "يهتم بدراسات الفقه والفكر الإسلامي والقضايا الإسلامية المعاصرة من خلال التراث والتحليل الأكاديمي.",
        author_btn: "الملف الكامل ←",
        featured_cta: "اقرأ المقال ←",
        latest_articles_title: "أحدث المقالات",
        latest_articles_subtitle: "مجموعة من أحدث المقالات حول الفقه والحديث والفكر الإسلامي والقضايا المعاصرة.",
        download_category: "📥 نزّل هذه الفئة",
        empty_state: "😕 لم يتم العثور على مقالات",
        popular_title: "المقالات الشائعة",
        popular_subtitle: "مقالات كثيرة القراءة وموصى بها.",
        tools_title: "أدوات إسلامية",
        tools_sub: "استخدم حاسبات فقهية عملية للمساعدة في العبادة وفهم الأحكام بسهولة.",
        tool_zakat: "حاسبة الزكاة",
        tool_mawaris: "حاسبة المواريث",
        tool_women: "فقه المرأة",
        tool_kaffarah: "الكفارة والفدية",
        tool_smart_title: "الفقه الذكي:",
        tool_smart_desc: "دليل فقهي تفاعلي يساعدك على فهم أحكام العبادة بسرعة.",
        categories_title: "التصنيفات",
        categories_sub: "استكشف موضوعات المعرفة الإسلامية المتاحة في هذه البوابة.",
        offline_section_title: "مقالات دون اتصال",
        see_all: "عرض الكل",
        zakat_card_title: "حاسبة الزكاة",
        zakat_card_body: "احسب زكاة الفطر وزكاة المال بسهولة",
        prefooter_about_title: "بوابة الثقافة الإسلامية",
        prefooter_about_body: "بوابة للدراسات الإسلامية تقدم التحليل العلمي والفكر النقدي والحوار الإسلامي في سياق حديث.",
        prefooter_main_title: "المجالات الرئيسة",
        prefooter_main_1: "الفقه وأصول الفقه",
        prefooter_main_2: "الحديث ودراسات الإسناد",
        prefooter_main_3: "الفكر الإسلامي",
        prefooter_main_4: "الإسلام والدولة",
        prefooter_main_5: "القضايا المعاصرة",
        prefooter_features_title: "الميزات",
        prefooter_feature_1: "المقالات المميزة",
        prefooter_feature_2: "حفظ المقالات",
        prefooter_feature_3: "بحث ذكي",
        prefooter_feature_4: "وضع القراءة",
        prefooter_feature_5: "متعدد اللغات",
        prefooter_note_title: "تنبيه",
        prefooter_note_body: "جميع المواد تُقدَّم لأغراض تعليمية ودراسات علمية، وليست فتوى أو ادعاءً للحقيقة المطلقة.",
        footer_about: "حول الموقع",
        footer_faq: "الأسئلة الشائعة",
        footer_contact: "تواصل",
        footer_privacy: "سياسة الخصوصية",
        footer_disclaimer: "إخلاء المسؤولية",
        footer_copy: "© 2026 بوابة الثقافة الإسلامية – جميع الحقوق محفوظة.",
        tasbih_title: "🧿 مسبحة رقمية",
        tasbih_translation: "سبحان الله",
        tasbih_press: "اضغط",
        tasbih_reset: "إعادة ضبط",
        qibla_title: "🧭 اتجاه القبلة",
        detecting: "جارٍ التحديد...",
        offline_notice: "⚠️ أنت غير متصل الآن. لا يمكن قراءة إلا المقالات التي تم تنزيلها.",
        quran_title: "📖 اقرأ القرآن",
        hadith_title: "📜 مجموعة الأحاديث",
        load_button: "تحميل",
        read_more: "اقرأ المزيد",
        articles_count_label: "مقالة",
        qari_mishary: "مشاري راشد العفاسي",
        qari_sudais: "عبد الرحمن السديس",
        qari_maher: "ماهر المعيقلي"
      },
      signin: {
        page_title: "تسجيل الدخول | بوابة الثقافة الإسلامية",
        brand_subtitle: "الدخول إلى البوابة ولوحة الإدارة",
        eyebrow: "الوصول إلى البوابة",
        hero_heading: "ادخل إلى <span>بوابة المعرفة</span> الإسلامية.",
        hero_body: "هذه الصفحة مخصّصة للمحررين وفريق المحتوى والمشرفين مع تجربة دخول سريعة وآمنة واحترافية.",
        info_1: "لوحة إدارة حديثة لمتابعة الحسابات ونشاط البوابة.",
        info_2: "دعم للمستخدمين العاديين والمشرفين مع تحديد الدور تلقائيًا.",
        info_3: "تبقى بيانات الزكاة والتبرعات والعلامات المرجعية وسجل القراءة المحلي متاحة.",
        helper_1_title: "الوصول إلى البوابة",
        helper_1_body: "استخدم حسابًا مسجلًا للدخول إلى منطقة البوابة حسب صلاحيتك.",
        helper_2_title: "تحويل ذكي",
        helper_2_body: "يُوجَّه المشرف إلى لوحة التحكم، ويُعاد المستخدم العادي إلى البوابة.",
        form_title: "تسجيل الدخول",
        form_subtext: "سجّل الدخول بالبريد الإلكتروني وكلمة المرور المحفوظين في هذه البوابة.",
        email_label: "البريد الإلكتروني",
        email_placeholder: "name@domain.com",
        password_label: "كلمة المرور",
        password_placeholder: "أدخل كلمة المرور",
        form_note: "إذا كنت قد استخدمت نظام الدخول القديم في هذا المتصفح من قبل، فسيقوم النظام بمواءمة الجلسة تلقائيًا.",
        submit: "الدخول إلى البوابة",
        alt: "ليس لديك حساب؟ أنشئ حسابًا",
        footer_text: "تريد إدارة المشروع؟ استخدم بريد المشرف أو أنشئ حساب فريق أولًا.",
        footer_link: "",
        denied_message: "حسابك لا يملك صلاحية الإدارة.",
        session_active: "تم اكتشاف جلسة نشطة للحساب {{email}}. لا يزال بإمكانك تسجيل الدخول بحساب آخر من خلال هذا النموذج.",
        signin_success: "تم تسجيل الدخول بنجاح. يجري تحويلك إلى الصفحة التالية..."
      },
      signup: {
        page_title: "إنشاء حساب | بوابة الثقافة الإسلامية",
        brand_name: "بوابة الثقافة الإسلامية",
        brand_subtitle: "سجّل حساب البوابة للقراء والمحررين والمشرفين",
        eyebrow: "انضم إلى البوابة",
        hero_heading: "أنشئ حساب <span>بوابة حديثة</span> لدعوة المعرفة.",
        hero_body: "تم تحسين نموذج إنشاء الحساب ليكون احترافيًا وسهلًا، بحيث يتم الانضمام إلى البوابة بسرعة للمستخدمين وفريق العمل.",
        feature_1: "حساب العضو مناسب للقراء والمتطوعين والمساهمين.",
        feature_2: "يحصل بريد المشرف تلقائيًا على صلاحية لوحة الإدارة.",
        feature_3: "تبقى الجلسة متوافقة مع بنية localStorage القديمة.",
        helper_1_title: "بريد المشرف المعتمد",
        helper_1_body: "nurcholism51@gmail.com",
        helper_2_title: "اقتراح الاستخدام",
        helper_2_body: "استخدم حساب المشرف للإدارة، وحساب العضو لاختبار تجربة المستخدم.",
        form_title: "إنشاء حساب",
        form_subtext: "أنشئ حسابًا جديدًا وسيقوم النظام فورًا بإعداد جلستك داخل البوابة.",
        name_label: "الاسم الكامل",
        name_placeholder: "اسمك",
        email_label: "البريد الإلكتروني",
        email_placeholder: "name@domain.com",
        password_label: "كلمة المرور",
        password_placeholder: "6 أحرف على الأقل",
        confirm_label: "تأكيد كلمة المرور",
        confirm_placeholder: "أعد إدخال كلمة المرور",
        form_note: "سيتحوّل الدور تلقائيًا إلى <b>مشرف</b> إذا كان البريد ضمن قائمة مشرفي البوابة، وإلا فسيكون <b>مستخدمًا</b>.",
        submit: "أنشئ الحساب الآن",
        alt: "لديك حساب بالفعل؟ سجل الدخول",
        footer_text: "بعد نجاح التسجيل، سيتم توجيهك مباشرة إلى الصفحة المناسبة لدور حسابك.",
        footer_link: "الدخول إلى حساب موجود",
        session_active: "تم اكتشاف جلسة نشطة للحساب {{email}}. لا يزال بإمكانك إنشاء حساب جديد من خلال هذا النموذج.",
        signup_success: "تم إنشاء الحساب بنجاح بصفة {{role}}. يجري التحويل..."
      }
    }
  };

  const authErrorMap = {
    "Nama minimal 3 karakter.": {
      en: "Name must be at least 3 characters.",
      ar: "يجب أن يتكون الاسم من 3 أحرف على الأقل."
    },
    "Email belum valid.": {
      en: "The email address is not valid yet.",
      ar: "عنوان البريد الإلكتروني غير صالح."
    },
    "Password minimal 6 karakter.": {
      en: "Password must be at least 6 characters.",
      ar: "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل."
    },
    "Konfirmasi password tidak cocok.": {
      en: "Password confirmation does not match.",
      ar: "تأكيد كلمة المرور غير مطابق."
    },
    "Email sudah terdaftar. Silakan sign in.": {
      en: "This email is already registered. Please sign in.",
      ar: "هذا البريد مسجل بالفعل. يرجى تسجيل الدخول."
    },
    "Email dan password wajib diisi.": {
      en: "Email and password are required.",
      ar: "البريد الإلكتروني وكلمة المرور مطلوبان."
    },
    "Akun tidak ditemukan. Silakan sign up terlebih dahulu.": {
      en: "Account not found. Please sign up first.",
      ar: "لم يتم العثور على الحساب. يرجى إنشاء حساب أولًا."
    },
    "Akun lama belum punya password. Daftarkan ulang email ini lewat sign up.": {
      en: "This legacy account does not have a password yet. Please register this email again through sign up.",
      ar: "هذا الحساب القديم لا يملك كلمة مرور بعد. يرجى تسجيل هذا البريد مرة أخرى عبر إنشاء حساب."
    },
    "Password yang Anda masukkan salah.": {
      en: "The password you entered is incorrect.",
      ar: "كلمة المرور التي أدخلتها غير صحيحة."
    }
  };

  const pageBindings = {
    index: [
      { selector: ".quick-menu .quick-card:nth-child(1) strong", key: "quick_about_title" },
      { selector: ".quick-menu .quick-card:nth-child(1) small", key: "quick_about_sub" },
      { selector: ".quick-menu .quick-card:nth-child(2) strong", key: "quick_faq_title" },
      { selector: ".quick-menu .quick-card:nth-child(2) small", key: "quick_faq_sub" },
      { selector: ".quick-menu .quick-card:nth-child(3) strong", key: "quick_donate_title" },
      { selector: ".quick-menu .quick-card:nth-child(3) small", key: "quick_donate_sub" },
      { selector: ".quick-menu .quick-card:nth-child(4) strong", key: "quick_contact_title" },
      { selector: ".quick-menu .quick-card:nth-child(4) small", key: "quick_contact_sub" },
      { selector: ".quick-menu .quick-card:nth-child(5) strong", key: "quick_ramadan_title" },
      { selector: ".quick-menu .quick-card:nth-child(5) small", key: "quick_ramadan_sub" },
      { selector: "#offline-indicator", key: "online_status" },
      { selector: ".logo", key: "site_name" },
      { selector: ".sidebar-menu > li.single-item:nth-child(1) .text", key: "sidebar_all" },
      { selector: ".sidebar-menu > li.has-children:nth-child(2) > .sidebar-toggle .text", key: "sidebar_sharia" },
      { selector: ".sidebar-menu > li.has-children:nth-child(2) > ul.submenu > li.has-children:nth-child(1) > .sidebar-toggle .text", key: "sidebar_fiqh" },
      { selector: "a[data-filter='fiqhibadah'] .text", key: "sidebar_fiqh_ibadah" },
      { selector: "a[data-filter='fiqhmuamalah'] .text", key: "sidebar_fiqh_muamalah" },
      { selector: ".sidebar-menu > li.has-children:nth-child(2) > ul.submenu > li.has-children:nth-child(2) > .sidebar-toggle .text", key: "sidebar_ushul_fiqh" },
      { selector: "a[data-filter='maqashidsyariah'] .text", key: "sidebar_maqasid" },
      { selector: ".sidebar-menu > li.has-children:nth-child(3) > .sidebar-toggle .text", key: "sidebar_hadith" },
      { selector: ".sidebar-menu > li.has-children:nth-child(4) > .sidebar-toggle .text", key: "sidebar_thought" },
      { selector: ".sidebar-menu > li.has-children:nth-child(5) > .sidebar-toggle .text", key: "sidebar_worship" },
      { selector: ".sidebar-menu > li.has-children:nth-child(6) > .sidebar-toggle .text", key: "sidebar_quran" },
      { selector: ".sidebar-menu > li.has-children:nth-child(7) > .sidebar-toggle .text", key: "sidebar_state" },
      { selector: ".sidebar-menu > li.has-children:nth-child(8) > .sidebar-toggle .text", key: "sidebar_education" },
      { selector: ".sidebar-menu > li.has-children:nth-child(9) > .sidebar-toggle .text", key: "sidebar_challenges" },
      { selector: ".sidebar-menu > li.has-children:nth-child(10) > .sidebar-toggle .text", key: "sidebar_ramadan" },
      { selector: ".sidebar-menu > li.has-children:nth-child(11) > .sidebar-toggle .text", key: "sidebar_kalam" },
      { selector: ".sidebar-menu > li.has-children:nth-child(12) > .sidebar-toggle .text", key: "sidebar_tasawuf" },
      { selector: ".sidebar-menu > li.has-children:nth-child(13) > .sidebar-toggle .text", key: "sidebar_sirah" },
      { selector: ".sidebar-menu > li.has-children:nth-child(14) > .sidebar-toggle .text", key: "sidebar_psychology" },
      { selector: ".sidebar-menu > li.single-item:nth-child(15) .text", key: "sidebar_mawaris" },
      { selector: ".sidebar-menu > li.single-item:nth-child(16) .text", key: "sidebar_women" },
      { selector: ".sidebar-menu > li.single-item:nth-child(17) .text", key: "sidebar_offline" },
      { selector: "a[data-filter='hadis-mustolah']", key: "sidebar_hadith_mustalah" },
      { selector: "a[data-filter='hadis-ulumul']", key: "sidebar_hadith_ulumul" },
      { selector: "a[data-filter=\"syama'il\"]", key: "sidebar_hadith_syamail" },
      { selector: "a[data-filter='pemikiran-klasik']", key: "sidebar_thought_classic" },
      { selector: "a[data-filter='pemikiran-modern']", key: "sidebar_thought_modern" },
      { selector: "a[data-filter='ibadah-shalat']", key: "sidebar_worship_shalat" },
      { selector: "a[data-filter='ibadah-puasa']", key: "sidebar_worship_puasa" },
      { selector: "a[data-filter='ibadah-zakat']", key: "sidebar_worship_zakat" },
      { selector: "a[data-filter='ibadah-haji']", key: "sidebar_worship_haji" },
      { selector: "a[data-filter='ibadah-dzikir']", key: "sidebar_worship_dzikir" },
      { selector: "a[data-filter='ibadah-fadilah']", key: "sidebar_worship_fadilah" },
      { selector: "a[data-filter='quran-tafsir-ayat']", key: "sidebar_quran_ayat" },
      { selector: "a[data-filter='quran-tafsir-surah']", key: "sidebar_quran_surah" },
      { selector: "a[data-filter='quran-tematik']", key: "sidebar_quran_thematic" },
      { selector: "a[data-filter='quran-ulumul']", key: "sidebar_quran_ulumul" },
      { selector: "a[data-filter='quran-fadilah']", key: "sidebar_quran_fadilah" },
      { selector: "a[data-filter='politik']", key: "sidebar_state_politics" },
      { selector: "a[data-filter='khilafah']", key: "sidebar_state_khilafah" },
      { selector: "a[data-filter='negara']", key: "sidebar_state_sharia" },
      { selector: "a[data-filter='bahasa-arab']", key: "sidebar_edu_innovation" },
      { selector: "a[data-filter='pengembangan-bahan-ajar']", key: "sidebar_edu_material" },
      { selector: "a[data-filter='manajemen-pendidikan']", key: "sidebar_edu_management" },
      { selector: "a[data-filter='pendidikan-anak-usia-dini']", key: "sidebar_edu_early" },
      { selector: "a[data-filter='tradisi-keilmuan']", key: "sidebar_edu_tradition" },
      { selector: "a[data-filter='etika-digital']", key: "sidebar_challenges_digital" },
      { selector: "a[data-filter='politik-global']", key: "sidebar_challenges_global" },
      { selector: "a[data-filter='gender']", key: "sidebar_challenges_gender" },
      { selector: "a[data-filter='ekonomi-modern']", key: "sidebar_challenges_economy" },
      { selector: "a[data-filter='catatan-ramadhan']", key: "sidebar_ramadan_notes" },
      { selector: "a[data-filter='sejarah-azhar']", key: "sidebar_ramadan_history" },
      { selector: "a[data-filter='tadabbur']", key: "sidebar_ramadan_reflection" },
      { selector: "a[data-filter='kalam-akidah']", key: "sidebar_kalam_aqidah" },
      { selector: "a[data-filter='kalam-klasik']", key: "sidebar_kalam_classic" },
      { selector: "a[data-filter='kalam-modern']", key: "sidebar_kalam_modern" },
      { selector: "a[data-filter='tasawuf-akhlak']", key: "sidebar_tasawuf_akhlaq" },
      { selector: "a[data-filter='tasawuf-tarekat']", key: "sidebar_tasawuf_tarekat" },
      { selector: "a[data-filter='sirah-makkiyah']", key: "sidebar_sirah_makkiyah" },
      { selector: "a[data-filter='sirah-madaniyah']", key: "sidebar_sirah_madaniyah" },
      { selector: "a[data-filter='nafs-dalam-islam']", key: "sidebar_psychology_nafs" },
      { selector: "a[data-filter='psikologi-ibadah']", key: "sidebar_psychology_ibadah" },
      { selector: "a[data-filter='tazkiyatun-nafs']", key: "sidebar_psychology_tazkiyah" },
      { selector: "a[data-filter='psikologi-sosial']", key: "sidebar_psychology_social" },
      { selector: "a[data-filter='psikologi-pendidikan']", key: "sidebar_psychology_education" },
      { selector: "a[data-filter='kesehatan-mental']", key: "sidebar_psychology_mental" },
      { selector: ".hero-title", key: "hero_title" },
      { selector: "#hero-subtitle", key: "hero_subtitle" },
      { selector: ".hero-tagline", key: "hero_tagline" },
      { selector: ".hero-cta .btn-primary", key: "hero_cta_primary" },
      { selector: ".hero-cta .btn-secondary", key: "hero_cta_secondary" },
      { selector: "#signInBtn", key: "sign_in" },
      { selector: "#signUpBtn", key: "sign_up" },
      { selector: "#logoutBtn", key: "logout" },
      { selector: "#hero-featured-label", key: "hero_featured_label" },
      { selector: "#hero-featured-title", key: "loading" },
      { selector: ".home-stats .stat-card small", key: "offline_articles_stat" },
      { selector: ".welcome-title", key: "welcome_title", html: true },
      { selector: ".welcome-desc", key: "welcome_desc", html: true },
      { selector: ".welcome-topics span:nth-child(1)", key: "topic_1" },
      { selector: ".welcome-topics span:nth-child(2)", key: "topic_2" },
      { selector: ".welcome-topics span:nth-child(3)", key: "topic_3" },
      { selector: ".welcome-topics span:nth-child(4)", key: "topic_4" },
      { selector: "#searchInput", key: "search_placeholder", attr: "placeholder" },
      { selector: "#last-reading h2", key: "continue_reading" },
      { selector: "#reader-stats h3", key: "reading_stats" },
      { selector: ".stats-grid .stat-box:nth-child(1) p", key: "stat_articles" },
      { selector: ".stats-grid .stat-box:nth-child(2) p", key: "stat_minutes" },
      { selector: ".stats-grid .stat-box:nth-child(3) p", key: "stat_last" },
      { selector: ".home-prayer-widget .widget-card > div:nth-child(1) small", key: "prayer_imsak" },
      { selector: ".home-prayer-widget .widget-card > div:nth-child(2) small", key: "prayer_fajr" },
      { selector: ".home-prayer-widget .widget-card > div:nth-child(3) small", key: "prayer_maghrib" },
      { selector: ".prayer-title", key: "prayer_today_title", html: true },
      { selector: "#next-prayer", key: "prayer_next_label" },
      { selector: "#progress-prayer-name", key: "prayer_progress_to" },
      { selector: "#azan-toggle", key: "azan_active" },
      { selector: "label[for='azanTolerance']", key: "azan_tolerance" },
      { selector: "#azanTolerance option[value='0']", key: "azan_on_time" },
      { selector: "#azanTolerance option[value='1']", key: "azan_1_minute" },
      { selector: "#azanTolerance option[value='2']", key: "azan_2_minutes" },
      { selector: "#azanTolerance option[value='3']", key: "azan_3_minutes" },
      { selector: "#azanTolerance option[value='5']", key: "azan_5_minutes" },
      { selector: "label[for='notif-toggle']", key: "notifications_label" },
      { selector: "#notif-toggle", key: "enable_notifications" },
      { selector: "label[for='azan-volume']", key: "azan_volume" },
      { selector: "label[for='muadzin-select']", key: "muezzin_voice" },
      { selector: "#muadzin-select option[value='mishary']", key: "muezzin_mishary" },
      { selector: "#muadzin-select option[value='makkah']", key: "muezzin_makkah" },
      { selector: "#muadzin-select option[value='madinah']", key: "muezzin_madinah" },
      { selector: "#muadzin-select option[value='egypt']", key: "muezzin_egypt" },
      { selector: "#prayer-city", key: "detecting_location" },
      { selector: "#open-quran", key: "open_quran_btn" },
      { selector: "#open-hadith", key: "open_hadith_btn" },
      { selector: ".intro-values .value-item:nth-child(1) h3", key: "value_science_title" },
      { selector: ".intro-values .value-item:nth-child(1) p", key: "value_science_body" },
      { selector: ".intro-values .value-item:nth-child(2) h3", key: "value_context_title" },
      { selector: ".intro-values .value-item:nth-child(2) p", key: "value_context_body" },
      { selector: ".author-name", key: "author_name" },
      { selector: ".author-cred", key: "author_cred" },
      { selector: ".author-desc", key: "author_desc" },
      { selector: ".author-btn", key: "author_btn" },
      { selector: ".featured-cta", key: "featured_cta" },
      { selector: "#articles .section-header h2", key: "latest_articles_title" },
      { selector: "#articles .section-subtitle", key: "latest_articles_subtitle" },
      { selector: "#download-category", key: "download_category" },
      { selector: "#empty-state", key: "empty_state" },
      { selector: "#popular-title-text", key: "popular_title" },
      { selector: ".popular-section .section-header .section-subtitle", key: "popular_subtitle" },
      { selector: "#tools-title-text", key: "tools_title" },
      { selector: ".tools-sub", key: "tools_sub" },
      { selector: ".tools-grid .tool-card:nth-child(1) h3", key: "tool_zakat" },
      { selector: ".tools-grid .tool-card:nth-child(2) h3", key: "tool_mawaris" },
      { selector: ".tools-grid .tool-card:nth-child(3) h3", key: "tool_women" },
      { selector: ".tools-grid .tool-card:nth-child(4) h3", key: "tool_kaffarah" },
      { selector: ".smart-fiqh-card .smart-content h3", key: "tool_smart_title" },
      { selector: ".smart-fiqh-card .smart-content p", key: "tool_smart_desc" },
      { selector: "#categories-title-text", key: "categories_title" },
      { selector: ".categories-home .section-sub", key: "categories_sub" },
      { selector: "#offline-title-text", key: "offline_section_title" },
      { selector: "#offline-section .see-all", key: "see_all" },
      { selector: ".zakat-card h3", key: "zakat_card_title" },
      { selector: ".zakat-card p", key: "zakat_card_body" },
      { selector: ".prefooter-col:nth-child(1) h4", key: "prefooter_about_title" },
      { selector: ".prefooter-col:nth-child(1) p", key: "prefooter_about_body" },
      { selector: ".prefooter-col:nth-child(2) h4", key: "prefooter_main_title" },
      { selector: ".prefooter-col:nth-child(2) li:nth-child(1) a", key: "prefooter_main_1" },
      { selector: ".prefooter-col:nth-child(2) li:nth-child(2) a", key: "prefooter_main_2" },
      { selector: ".prefooter-col:nth-child(2) li:nth-child(3) a", key: "prefooter_main_3" },
      { selector: ".prefooter-col:nth-child(2) li:nth-child(4) a", key: "prefooter_main_4" },
      { selector: ".prefooter-col:nth-child(2) li:nth-child(5) a", key: "prefooter_main_5" },
      { selector: ".prefooter-col:nth-child(3) h4", key: "prefooter_features_title" },
      { selector: ".prefooter-col:nth-child(3) li:nth-child(1)", key: "prefooter_feature_1" },
      { selector: ".prefooter-col:nth-child(3) li:nth-child(2)", key: "prefooter_feature_2" },
      { selector: ".prefooter-col:nth-child(3) li:nth-child(3)", key: "prefooter_feature_3" },
      { selector: ".prefooter-col:nth-child(3) li:nth-child(4)", key: "prefooter_feature_4" },
      { selector: ".prefooter-col:nth-child(3) li:nth-child(5)", key: "prefooter_feature_5" },
      { selector: ".prefooter-col:nth-child(4) h4", key: "prefooter_note_title" },
      { selector: ".prefooter-note", key: "prefooter_note_body" },
      { selector: ".footer-links a:nth-child(1)", key: "footer_about" },
      { selector: ".footer-links a:nth-child(2)", key: "footer_faq" },
      { selector: ".footer-links a:nth-child(3)", key: "footer_contact" },
      { selector: ".footer-links a:nth-child(4)", key: "footer_privacy" },
      { selector: ".footer-links a:nth-child(5)", key: "footer_disclaimer" },
      { selector: ".footer-copy", key: "footer_copy" },
      { selector: "#tasbihPopup h3", key: "tasbih_title" },
      { selector: "#tasbihTranslation", key: "tasbih_translation" },
      { selector: "#tasbihBtn", key: "tasbih_press" },
      { selector: "#resetTasbih", key: "tasbih_reset" },
      { selector: "#kiblatPopup h3", key: "qibla_title" },
      { selector: "#kiblatDegree", key: "detecting" },
      { selector: "#offline-toast", key: "offline_notice" },
      { selector: ".quran-header h2", key: "quran_title" },
      { selector: "#quran-body .loading", key: "loading" },
      { selector: "#hadith-popup .popup-header h2", key: "hadith_title" },
      { selector: "#load-hadith", key: "load_button" },
      { selector: "#qari-select option[value='mishary']", key: "qari_mishary" },
      { selector: "#qari-select option[value='sudais']", key: "qari_sudais" },
      { selector: "#qari-select option[value='maher']", key: "qari_maher" }
    ],
    signin: [
      { selector: ".brand-link small", key: "brand_subtitle" },
      { selector: ".auth-topbar nav a:nth-child(1)", key: "nav_home" },
      { selector: ".auth-topbar nav a:nth-child(2)", key: "sign_up" },
      { selector: ".auth-topbar nav a:nth-child(3)", key: "nav_admin" },
      { selector: ".eyebrow", key: "eyebrow" },
      { selector: ".auth-side h1", key: "hero_heading", html: true },
      { selector: ".auth-side > p", key: "hero_body" },
      { selector: ".info-list li:nth-child(1)", key: "info_1" },
      { selector: ".info-list li:nth-child(2)", key: "info_2" },
      { selector: ".info-list li:nth-child(3)", key: "info_3" },
      { selector: ".helper-card:nth-child(1) strong", key: "helper_1_title" },
      { selector: ".helper-card:nth-child(1) p", key: "helper_1_body" },
      { selector: ".helper-card:nth-child(2) strong", key: "helper_2_title" },
      { selector: ".helper-card:nth-child(2) p", key: "helper_2_body" },
      { selector: ".auth-card h2", key: "form_title" },
      { selector: ".auth-subtext", key: "form_subtext" },
      { selector: "label[for='signinEmail']", key: "email_label" },
      { selector: "#signinEmail", key: "email_placeholder", attr: "placeholder" },
      { selector: "label[for='signinPassword']", key: "password_label" },
      { selector: "#signinPassword", key: "password_placeholder", attr: "placeholder" },
      { selector: ".form-note", key: "form_note" },
      { selector: ".submit-btn", key: "submit" },
      { selector: ".alt-btn", key: "alt" },
      { selector: ".auth-footer p", key: "footer_text" },
      { selector: ".auth-footer .footer-link", key: "footer_link" }
    ],
    signup: [
      { selector: ".brand-link strong", key: "brand_name" },
      { selector: ".brand-link small", key: "brand_subtitle" },
      { selector: ".auth-topbar nav a:nth-child(1)", key: "nav_home" },
      { selector: ".auth-topbar nav a:nth-child(2)", key: "sign_in" },
      { selector: ".auth-topbar nav a:nth-child(3)", key: "nav_admin" },
      { selector: ".eyebrow", key: "eyebrow" },
      { selector: ".auth-side h1", key: "hero_heading", html: true },
      { selector: ".auth-side > p", key: "hero_body" },
      { selector: ".feature-list li:nth-child(1)", key: "feature_1" },
      { selector: ".feature-list li:nth-child(2)", key: "feature_2" },
      { selector: ".feature-list li:nth-child(3)", key: "feature_3" },
      { selector: ".default-card:nth-child(1) strong", key: "helper_1_title" },
      { selector: ".default-card:nth-child(1) p", key: "helper_1_body" },
      { selector: ".default-card:nth-child(2) strong", key: "helper_2_title" },
      { selector: ".default-card:nth-child(2) p", key: "helper_2_body" },
      { selector: ".auth-card h2", key: "form_title" },
      { selector: ".auth-subtext", key: "form_subtext" },
      { selector: "label[for='signupName']", key: "name_label" },
      { selector: "#signupName", key: "name_placeholder", attr: "placeholder" },
      { selector: "label[for='signupEmail']", key: "email_label" },
      { selector: "#signupEmail", key: "email_placeholder", attr: "placeholder" },
      { selector: "label[for='signupPassword']", key: "password_label" },
      { selector: "#signupPassword", key: "password_placeholder", attr: "placeholder" },
      { selector: "label[for='signupConfirmPassword']", key: "confirm_label" },
      { selector: "#signupConfirmPassword", key: "confirm_placeholder", attr: "placeholder" },
      { selector: ".form-note", key: "form_note", html: true },
      { selector: ".submit-btn", key: "submit" },
      { selector: ".alt-btn", key: "alt" },
      { selector: ".auth-footer p", key: "footer_text" },
      { selector: ".auth-footer .footer-link", key: "footer_link" }
    ]
  };

  function getStoredLang() {
    for (const key of LEGACY_STORAGE_KEYS) {
      const stored = window.localStorage.getItem(key);
      if (SUPPORTED_LANGS.includes(stored)) {
        return stored;
      }
    }

    return DEFAULT_LANG;
  }

  function resolveTranslation(lang, pageName, key) {
    const langPack = translations[lang] || translations[DEFAULT_LANG];
    return (langPack[pageName] && langPack[pageName][key]) || (langPack.common && langPack.common[key]) || null;
  }

  function interpolate(value, params) {
    return String(value).replace(/\{\{\s*(\w+)\s*\}\}/g, (_, token) => {
      return Object.prototype.hasOwnProperty.call(params || {}, token) ? params[token] : "";
    });
  }

  function t(key, params = {}, pageName = currentPage, lang = getStoredLang()) {
    const raw = resolveTranslation(lang, pageName, key)
      || resolveTranslation(DEFAULT_LANG, pageName, key)
      || resolveTranslation(lang, "common", key)
      || resolveTranslation(DEFAULT_LANG, "common", key)
      || key;

    return interpolate(raw, params);
  }

  function applyBinding(binding, lang) {
    const value = t(binding.key, {}, currentPage, lang);
    document.querySelectorAll(binding.selector).forEach((node) => {
      if (binding.attr) {
        node.setAttribute(binding.attr, value);
        return;
      }

      if (binding.html) {
        node.innerHTML = value;
        return;
      }

      node.textContent = value;
    });
  }

  function applyDocumentLanguage(lang) {
    const isArabic = lang === "ar";
    document.documentElement.lang = lang;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    if (document.body) {
      document.body.classList.toggle("rtl-ui", isArabic);
    }

    const translatedTitle = resolveTranslation(lang, currentPage, "page_title") || resolveTranslation(DEFAULT_LANG, currentPage, "page_title");
    if (translatedTitle) {
      document.title = translatedTitle;
    }

    const langBtn = document.getElementById("langBtn");
    if (langBtn) {
      langBtn.innerHTML = `<span class="lang-btn-icon">🌐</span><span class="lang-btn-code">${lang.toUpperCase()}</span>`;
      langBtn.setAttribute("aria-label", t("lang_switch_label", {}, currentPage, lang));
    }

    document.querySelectorAll("[data-set-lang]").forEach((button) => {
      button.classList.toggle("active", button.getAttribute("data-set-lang") === lang);
    });
  }

  function getIndexText(key, lang = getStoredLang()) {
    return t(key, {}, "index", lang);
  }

  let reapplyTimers = [];

  function scheduleReapply(lang = getStoredLang()) {
    reapplyTimers.forEach((timer) => window.clearTimeout(timer));
    reapplyTimers = [];

    [0, 120, 400, 900, 1800].forEach((delay) => {
      const timer = window.setTimeout(() => {
        applyPageTranslations(lang);
      }, delay);
      reapplyTimers.push(timer);
    });
  }

  function applyIndexRuntimeTranslations(lang = getStoredLang()) {
    if (currentPage !== "index") return;

    const readMoreText = getIndexText("read_more", lang);
    document.querySelectorAll(".read-more").forEach((node) => {
      const raw = String(node.textContent || "").trim();
      if (!raw || raw === "read_more" || raw === "read-more" || raw.includes("read_more") || raw.includes("read-more")) {
        node.textContent = readMoreText;
      }
    });

    const countLabel = getIndexText("articles_count_label", lang);
    document.querySelectorAll(".category-card .cat-content span").forEach((node) => {
      const raw = String(node.textContent || "").trim();
      const match = raw.match(/^(\d+)\s+(articles_count_label|artikel|articles|مقالة)$/i);
      if (match) {
        node.textContent = `${match[1]} ${countLabel}`;
      }
    });
  }

  function applyPageTranslations(lang = getStoredLang()) {
    applyDocumentLanguage(lang);
    (pageBindings[currentPage] || []).forEach((binding) => applyBinding(binding, lang));
    applyIndexRuntimeTranslations(lang);
  }

  function setupDropdown() {
    const langBtn = document.getElementById("langBtn");
    const langDropdown = document.getElementById("langDropdown");

    if (langBtn && langDropdown) {
      langBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        langDropdown.classList.toggle("active");
      });

      document.addEventListener("click", (event) => {
        if (!langDropdown.contains(event.target)) {
          langDropdown.classList.remove("active");
        }
      });
    }
  }

  function setupLanguageButtons() {
    document.querySelectorAll("[data-set-lang]").forEach((button) => {
      if (button.dataset.langBound === "true") return;
      button.dataset.langBound = "true";

      button.addEventListener("click", (event) => {
        event.preventDefault();
        const nextLang = button.getAttribute("data-set-lang");
        if (!nextLang) return;

        setLang(nextLang);

        const langDropdown = document.getElementById("langDropdown");
        if (langDropdown) {
          langDropdown.classList.remove("active");
        }
      });
    });
  }

  function setLang(lang) {
    const nextLang = SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;
    LEGACY_STORAGE_KEYS.forEach((key) => window.localStorage.setItem(key, nextLang));
    applyPageTranslations(nextLang);
    scheduleReapply(nextLang);
    window.dispatchEvent(new CustomEvent("portal-language-change", {
      detail: { lang: nextLang }
    }));
  }

  function translateAuthError(message, lang = getStoredLang()) {
    const mapped = authErrorMap[message];
    if (!mapped) {
      return message;
    }

    return mapped[lang] || mapped.en || message;
  }

  window.PortalI18n = {
    getCurrentLang: getStoredLang,
    setLang,
    t: (key, params = {}) => t(key, params),
    translateAuthError,
    apply: applyPageTranslations
  };

  window.setLang = setLang;

  function init() {
    setupDropdown();
    setupLanguageButtons();
    const lang = getStoredLang();
    applyPageTranslations(lang);
    scheduleReapply(lang);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  function setupProdCleanLinks() {
    const host = window.location.hostname;
    const isLocalDev = host === "localhost" || host === "127.0.0.1";
    if (isLocalDev) return;

    const rewriteHref = (href) => {
      if (!href || typeof href !== "string") return href;
      const trimmed = href.trim();

      if (
        !trimmed ||
        trimmed.startsWith("#") ||
        trimmed.startsWith("mailto:") ||
        trimmed.startsWith("tel:") ||
        trimmed.startsWith("javascript:") ||
        trimmed.startsWith("http://") ||
        trimmed.startsWith("https://")
      ) {
        return href;
      }

      if (trimmed.startsWith("assets/") || trimmed.startsWith("css/") || trimmed.startsWith("js/")) {
        return href;
      }

      const [pathPart, hashPart] = trimmed.split("#");
      const [pathOnly, queryPart] = pathPart.split("?");
      if (!pathOnly) return href;

      if (!/\.html$/i.test(pathOnly)) {
        return href;
      }

      const normalizedPathOnly = pathOnly.replace(/\\/g, "/");
      const cleanedPathOnly = normalizedPathOnly.replace(/\.html$/i, "");
      const finalPathOnly = /(^|\/)index$/i.test(cleanedPathOnly) ? "/" : cleanedPathOnly;

      return `${finalPathOnly}${queryPart ? `?${queryPart}` : ""}${hashPart ? `#${hashPart}` : ""}`;
    };

    const rewriteAnchors = (root = document) => {
      root.querySelectorAll("a[href]").forEach((a) => {
        if (a.dataset.prodHrefRewritten === "true") return;
        const original = a.getAttribute("href");
        const next = rewriteHref(original);
        if (next !== original) {
          a.setAttribute("href", next);
          a.dataset.prodHrefRewritten = "true";
        }
      });
    };

    rewriteAnchors(document);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches?.("a[href]")) {
            rewriteAnchors(node.parentElement || document);
            return;
          }
          rewriteAnchors(node);
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  function setupDevFallbackLinks() {
    const host = window.location.hostname;
    const isLocalDev = host === "localhost" || host === "127.0.0.1";
    if (!isLocalDev) return;

    const rewriteHref = (href) => {
      if (!href || typeof href !== "string") return href;
      const trimmed = href.trim();

      if (
        !trimmed ||
        trimmed.startsWith("#") ||
        trimmed.startsWith("mailto:") ||
        trimmed.startsWith("tel:") ||
        trimmed.startsWith("javascript:") ||
        trimmed.startsWith("http://") ||
        trimmed.startsWith("https://")
      ) {
        return href;
      }

      // keep assets untouched
      if (trimmed.startsWith("assets/") || trimmed.startsWith("css/") || trimmed.startsWith("js/")) {
        return href;
      }

      const [pathPart, hashPart] = trimmed.split("#");
      const [pathOnly, queryPart] = pathPart.split("?");

      const normalizedPath = pathOnly.startsWith("/") ? pathOnly : `/${pathOnly}`;
      if (normalizedPath === "/") return href;

      const lastSeg = normalizedPath.split("/").filter(Boolean).pop() || "";
      if (!lastSeg) return href;
      if (lastSeg.includes(".")) return href; // already has extension

      const rewritten = `${pathOnly}.html${queryPart ? `?${queryPart}` : ""}${hashPart ? `#${hashPart}` : ""}`;
      return rewritten;
    };

    const rewriteAnchors = (root = document) => {
      root.querySelectorAll("a[href]").forEach((a) => {
        if (a.dataset.devHrefRewritten === "true") return;
        const original = a.getAttribute("href");
        const next = rewriteHref(original);
        if (next !== original) {
          a.setAttribute("href", next);
          a.dataset.devHrefRewritten = "true";
        }
      });
    };

    rewriteAnchors(document);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches?.("a[href]")) {
            rewriteAnchors(node.parentElement || document);
            return;
          }
          rewriteAnchors(node);
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  function setupProdCleanLinks() {
    const host = window.location.hostname;
    const isLocalDev = host === "localhost" || host === "127.0.0.1";
    if (isLocalDev) return;

    const rewriteHref = (href) => {
      if (!href || typeof href !== "string") return href;
      const trimmed = href.trim();

      if (
        !trimmed ||
        trimmed.startsWith("#") ||
        trimmed.startsWith("mailto:") ||
        trimmed.startsWith("tel:") ||
        trimmed.startsWith("javascript:") ||
        trimmed.startsWith("http://") ||
        trimmed.startsWith("https://")
      ) {
        return href;
      }

      if (trimmed.startsWith("assets/") || trimmed.startsWith("css/") || trimmed.startsWith("js/")) {
        return href;
      }

      const [pathPart, hashPart] = trimmed.split("#");
      const [pathOnly, queryPart] = pathPart.split("?");
      if (!pathOnly) return href;

      if (!/\.html$/i.test(pathOnly)) {
        return href;
      }

      const normalizedPathOnly = pathOnly.replace(/\\/g, "/");
      const cleanedPathOnly = normalizedPathOnly.replace(/\.html$/i, "");
      const finalPathOnly = /(^|\/)index$/i.test(cleanedPathOnly) ? "/" : cleanedPathOnly;

      return `${finalPathOnly}${queryPart ? `?${queryPart}` : ""}${hashPart ? `#${hashPart}` : ""}`;
    };

    const rewriteAnchors = (root = document) => {
      root.querySelectorAll("a[href]").forEach((a) => {
        if (a.dataset.prodHrefRewritten === "true") return;
        const original = a.getAttribute("href");
        const next = rewriteHref(original);
        if (next !== original) {
          a.setAttribute("href", next);
          a.dataset.prodHrefRewritten = "true";
        }
      });
    };

    rewriteAnchors(document);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches?.("a[href]")) {
            rewriteAnchors(node.parentElement || document);
            return;
          }
          rewriteAnchors(node);
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }
})();







