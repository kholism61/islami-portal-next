(function () {
  const LANGS = ["id", "en", "ar"];
  const rawPage = (window.location.pathname.split("/").pop() || "").toLowerCase();
  const page = rawPage.endsWith(".html") ? rawPage : (rawPage ? `${rawPage}.html` : rawPage);

  const data = {
    faq: {
      id: {
        title: "FAQ",
        lead: "Pertanyaan umum seputar tujuan, metodologi, dan pengelolaan Portal Literasi Islam.",
        q: [
          "Apa tujuan Portal Literasi Islam?",
          "Apakah tulisan di sini merupakan fatwa?",
          "Siapa yang mengelola website ini?",
          "Apakah pembaca boleh memberi masukan?"
        ],
        a: [
          "Portal ini menghadirkan kajian Islam berbasis keilmuan, metodologi jelas, dan adab akademik.",
          "Tidak. Seluruh tulisan adalah bahan kajian ilmiah, bukan fatwa resmi.",
          "Website ini dikelola Muhammad Nurcholis, mahasiswa Syariah wa Qanun Universitas Al-Azhar, Kairo.",
          "Sangat boleh. Masukan dapat disampaikan lewat halaman Kontak dan media sosial."
        ],
        update:
          "<strong>Pemberitahuan Pembaruan Situs:</strong><br><br>Jika tampilan atau isi website tidak berubah setelah pembaruan, lakukan langkah berikut:<ul><li><strong>Di HP:</strong> Hapus cache dan cookie browser, lalu buka kembali situs.</li><li><strong>Di laptop/komputer (Windows):</strong> Tekan <strong>Ctrl + Shift + R</strong> untuk hard refresh.</li></ul>Website ini menggunakan teknologi <strong>PWA</strong> sehingga browser kadang menampilkan versi tersimpan."
      },
      en: {
        title: "FAQ",
        lead: "Frequently asked questions about the goals, methodology, and management of the Islamic Literacy Portal.",
        q: [
          "What is the goal of the Islamic Literacy Portal?",
          "Are the writings here fatwas?",
          "Who manages this website?",
          "Can readers provide feedback?"
        ],
        a: [
          "This portal presents Islamic studies grounded in scholarship, clear methodology, and academic ethics.",
          "No. All writings are for scholarly study and reflection, not official fatwas.",
          "This website is managed by Muhammad Nurcholis, a Sharia and Law student at Al-Azhar University, Cairo.",
          "Absolutely. Feedback is welcome through the Contact page and social media."
        ],
        update:
          "<strong>Site Update Notice:</strong><br><br>If the website layout or content does not change after an update, do the following:<ul><li><strong>On mobile:</strong> Clear browser cache and cookies, then reopen the site.</li><li><strong>On laptop/desktop (Windows):</strong> Press <strong>Ctrl + Shift + R</strong> for a hard refresh.</li></ul>This website uses <strong>PWA</strong> technology, so browsers may show cached versions."
      },
      ar: {
        title: "الأسئلة الشائعة",
        lead: "أسئلة شائعة حول أهداف ومنهجية وإدارة بوابة الثقافة الإسلامية.",
        q: [
          "ما هدف بوابة الثقافة الإسلامية؟",
          "هل المقالات هنا فتاوى؟",
          "من يدير هذا الموقع؟",
          "هل يمكن للقراء إرسال الملاحظات؟"
        ],
        a: [
          "تهدف البوابة إلى تقديم دراسات إسلامية بمنهج علمي واضح وأدب أكاديمي مسؤول.",
          "لا. المحتوى للدراسة والتأمل العلمي وليس فتوى رسمية.",
          "يدير الموقع محمد نور خالص، طالب الشريعة والقانون بجامعة الأزهر بالقاهرة.",
          "نعم، يمكن إرسال الملاحظات عبر صفحة التواصل ووسائل التواصل المتاحة."
        ],
        update:
          "<strong>تنبيه تحديث الموقع:</strong><br><br>إذا لم يتغير الشكل أو المحتوى بعد التحديث، يرجى تنفيذ الآتي:<ul><li><strong>على الهاتف:</strong> امسح ذاكرة التخزين المؤقت وملفات الارتباط ثم أعد فتح الموقع.</li><li><strong>على الكمبيوتر (ويندوز):</strong> اضغط <strong>Ctrl + Shift + R</strong> لتحديث قسري.</li></ul>يستخدم الموقع تقنية <strong>PWA</strong> لذلك قد يعرض المتصفح نسخة مخزنة مؤقتًا."
      }
    },

    kontak: {
      id: {
        title: "Kontak, Diskusi & Masukan",
        lead: "Portal Literasi Islam terbuka untuk diskusi ilmiah, kritik konstruktif, dan masukan akademik.",
        h3: ["Email Resmi", "WhatsApp", "Instagram", "Catatan Penting"],
        p: [
          "Untuk diskusi ilmiah, koreksi tulisan, atau komunikasi formal terkait konten.",
          "Untuk diskusi singkat, klarifikasi cepat, atau pertanyaan non-formal.",
          "Untuk informasi publik, pembaruan konten, dan interaksi umum."
        ],
        wa: "Chat via WhatsApp",
        notes: [
          "Masukan diharapkan disampaikan dengan adab dan argumentasi yang jelas.",
          "Perbedaan pendapat adalah bagian dari tradisi keilmuan Islam.",
          "Seluruh konten di situs ini bersifat kajian dan refleksi ilmiah.",
          "Website ini tidak dimaksudkan sebagai fatwa atau klaim kebenaran tunggal."
        ]
      },
      en: {
        title: "Contact, Discussion & Feedback",
        lead: "The Islamic Literacy Portal welcomes scholarly discussion, constructive criticism, and academic feedback.",
        h3: ["Official Email", "WhatsApp", "Instagram", "Important Notes"],
        p: [
          "For scholarly discussion, article corrections, or formal communication regarding content.",
          "For short discussion, quick clarification, or informal questions.",
          "For public updates, content announcements, and general interaction."
        ],
        wa: "Chat via WhatsApp",
        notes: [
          "Feedback should be delivered with good manners and clear arguments.",
          "Differences of opinion are part of Islamic scholarly tradition.",
          "All content on this site is intended for scholarly study and reflection.",
          "This website is not an official fatwa and not an absolute truth claim."
        ]
      },
      ar: {
        title: "التواصل والنقاش والملاحظات",
        lead: "ترحب بوابة الثقافة الإسلامية بالنقاش العلمي والنقد البنّاء والملاحظات الأكاديمية.",
        h3: ["البريد الرسمي", "واتساب", "إنستغرام", "ملاحظات مهمة"],
        p: [
          "للنقاش العلمي أو تصحيح المقالات أو التواصل الرسمي المتعلق بالمحتوى.",
          "لنقاشات قصيرة وتوضيحات سريعة أو أسئلة غير رسمية.",
          "للتحديثات العامة ونشر المحتوى والتفاعل."
        ],
        wa: "تواصل عبر واتساب",
        notes: [
          "يرجى تقديم الملاحظات بأدب وحجج واضحة.",
          "اختلاف الآراء جزء من تقاليد العلم الإسلامي.",
          "جميع محتويات الموقع للدراسة والتأمل العلمي.",
          "هذا الموقع ليس فتوى رسمية ولا ادعاءً للحقيقة المطلقة."
        ]
      }
    },

    donasi: {
      id: {
        tag: "Dukungan Dakwah Digital",
        hero: "Bersama Membangun <br><span>Literasi Keislaman Berkualitas</span>",
        body: "Dukungan Anda membantu Portal Literasi Islam menghadirkan kajian ilmiah dan edukasi digital gratis untuk masyarakat.",
        hi: ["📘 Pengembangan Kajian Ilmiah", "🛠️ Infrastruktur Website", "💻 Edukasi Digital Islam"],
        box: "Informasi Donasi",
        bank: "Transfer Bank",
        copy: "Salin",
        qris: "Donasi via QRIS",
        qrisText: "Scan QRIS menggunakan e-wallet atau mobile banking Anda.",
        paypal: "Donasi Internasional via PayPal",
        secure: "Secure payment powered by PayPal",
        confirm: "Kontak Konfirmasi"
      },
      en: {
        tag: "Digital Da'wah Support",
        hero: "Building Together <br><span>Quality Islamic Literacy</span>",
        body: "Your support helps the Islamic Literacy Portal provide scholarly studies and free digital Islamic education.",
        hi: ["📘 Scholarly Content Development", "🛠️ Website Infrastructure", "💻 Islamic Digital Education"],
        box: "Donation Information",
        bank: "Bank Transfer",
        copy: "Copy",
        qris: "Donate via QRIS",
        qrisText: "Scan QRIS with your e-wallet or mobile banking app.",
        paypal: "International Donation via PayPal",
        secure: "Secure payment powered by PayPal",
        confirm: "Confirmation Contact"
      },
      ar: {
        tag: "دعم الدعوة الرقمية",
        hero: "معًا نبني <br><span>ثقافة إسلامية عالية الجودة</span>",
        body: "يساعد دعمكم بوابة الثقافة الإسلامية على تقديم دراسات علمية وتعليم رقمي مجاني للمجتمع.",
        hi: ["📘 تطوير المحتوى العلمي", "🛠️ البنية التقنية للموقع", "💻 التعليم الرقمي الإسلامي"],
        box: "معلومات التبرع",
        bank: "تحويل بنكي",
        copy: "نسخ",
        qris: "التبرع عبر QRIS",
        qrisText: "امسح رمز QRIS باستخدام المحفظة الإلكترونية أو تطبيق البنك.",
        paypal: "تبرع دولي عبر PayPal",
        secure: "دفع آمن عبر PayPal",
        confirm: "جهة تأكيد التبرع"
      }
    },

    about: {
      id: {
        title: "Tentang Portal Literasi Islam",
        lead:
          "Portal Literasi Islam merupakan ruang kajian Islam yang berupaya menghadirkan diskursus keagamaan secara ilmiah, berimbang, dan bertanggung jawab secara akademik. Portal ini dibangun sebagai sarana berbagi pengetahuan, refleksi, dan pemikiran keislaman yang berlandaskan sumber-sumber otoritatif serta tradisi keilmuan Islam yang mapan. Di tengah arus informasi yang cepat dan seringkali dangkal, Portal Literasi Islam berupaya menghadirkan konten yang tidak hanya informatif, tetapi juga argumentatif, metodologis, dan berakar pada literatur klasik maupun kontemporer. Setiap tulisan disusun dengan pendekatan ilmiah, memperhatikan konteks, serta menjaga adab keilmuan dalam perbedaan pendapat.",
        h3: ["Landasan dan Tujuan", "Visi", "Misi", "Nilai-Nilai Dasar", "Ruang Lingkup Kajian"],
        p: [
          "Website ini hadir sebagai respons atas kebutuhan ruang diskusi keislaman yang tidak berhenti pada slogan atau narasi populer semata, tetapi berangkat dari metodologi, literatur, serta etika intelektual. Portal Literasi Islam bertujuan untuk:",
          "Sebagai bagian dari tradisi keilmuan Islam yang moderat dan terbuka, portal ini berupaya menempatkan diskursus Islam secara proporsional, baik dalam ranah fikih, pemikiran, tasawuf, maupun isu-isu keislaman kontemporer.",
          "Menjadi portal kajian keislaman yang berlandaskan tradisi ilmiah, moderat, dan berwibawa dalam menyajikan pemikiran Islam yang rasional, berimbang, dan bertanggung jawab.",
          "Portal Literasi Islam berpegang pada beberapa prinsip utama:",
          "Portal ini berfokus pada beberapa bidang utama:"
        ],
        ul1: [
          "Menyebarkan pemahaman Islam berbasis ilmu dan literatur otoritatif.",
          "Menjadi ruang refleksi dan diskusi yang sehat, rasional, dan beradab.",
          "Menghubungkan khazanah klasik Islam dengan realitas kontemporer.",
          "Menyajikan kajian yang moderat, proporsional, dan kontekstual."
        ],
        misi: [
          "Menyajikan kajian Islam berbasis sumber otoritatif dan metodologi ilmiah.",
          "Menghidupkan tradisi literasi dan diskusi keilmuan.",
          "Menjembatani khazanah ulama klasik dengan kebutuhan umat modern.",
          "Menghadirkan pemikiran Islam yang moderat, inklusif, dan kontekstual.",
          "Menjadi referensi bacaan yang kredibel bagi pelajar, mahasiswa, dan masyarakat umum."
        ],
        valuesTitle: ["Ilmiah", "Moderat", "Beradab", "Kontekstual", "Bertanggung Jawab"],
        valuesSub: [
          "Setiap tulisan berlandaskan dalil, literatur, dan argumentasi yang jelas.",
          "Menghindari sikap ekstrem, provokatif, atau simplifikasi menyesatkan.",
          "Menjaga etika perbedaan pendapat serta menghormati khazanah ulama.",
          "Mengaitkan ajaran Islam dengan realitas sosial dan tantangan zaman.",
          "Konten disusun dengan kesadaran dampak sosial dan intelektual."
        ],
        ul2: [
          "Fikih dan Ushul Fikih",
          "Ilmu Hadis dan Ulumul Hadis",
          "Tafsir dan Ulumul Qur'an",
          "Sejarah dan Peradaban Islam",
          "Pemikiran Islam Klasik dan Kontemporer",
          "Isu-isu Keislaman Modern"
        ],
        quote: "Seluruh tulisan disajikan sebagai bahan refleksi dan kajian ilmiah, bukan sebagai fatwa atau klaim kebenaran tunggal.",
        author: "Muhammad Nurcholis",
        role: "Alumni Madrasah Saulatiyah, Makkah Al-Mukarramah<br>Mahasiswa Syariah wa Qanun<br>Universitas Al-Azhar, Kairo",
        tags: ["Fiqh", "Pemikiran Islam", "Isu Kontemporer"]
      },
      en: {
        title: "About The Islamic Literacy Portal",
        lead:
          "The Islamic Literacy Portal is a platform for Islamic studies that seeks to present religious discourse in a scholarly, balanced, and academically responsible manner. This portal is established as a medium for sharing knowledge, reflection, and Islamic intellectual thought grounded in authoritative sources and well-established traditions of Islamic scholarship. Amid the rapid flow of information that is often superficial, the Islamic Literacy Portal strives to provide content that is not only informative but also argumentative, methodological, and rooted in both classical and contemporary literature. Each article is written using a scholarly approach, taking context into account while maintaining academic ethics and respect in addressing differences of opinion.",
        h3: ["Foundation and Objectives", "Vision", "Mission", "Core Values", "Scope of Study"],
        p: [
          "This website was established in response to the need for a space of Islamic discourse that does not merely stop at slogans or popular narratives, but is grounded in methodology, scholarly literature, and intellectual ethics. The Islamic Literacy Portal aims to:",
          "As part of a moderate and open Islamic scholarly tradition, this portal seeks to position Islamic discourse proportionally across fiqh, Islamic thought, tasawuf, and contemporary Muslim issues.",
          "To become an Islamic knowledge portal grounded in scholarly tradition, moderation, and credibility in presenting rational, balanced, and responsible Islamic thought.",
          "The Islamic Literacy Portal is built upon the following core principles:",
          "This portal focuses on several key areas:"
        ],
        ul1: [
          "Spread Islamic understanding based on knowledge and authoritative references.",
          "Provide a healthy, rational, and ethical space for reflection and discussion.",
          "Connect classical Islamic heritage with contemporary realities.",
          "Present moderate, proportional, and contextual studies."
        ],
        misi: [
          "Present Islamic studies based on authoritative sources and scholarly methodology.",
          "Revive literacy and scholarly discussion traditions.",
          "Bridge classical scholarship with modern community needs.",
          "Present moderate, inclusive, and contextual Islamic thought.",
          "Serve as a credible reading reference for students and the public."
        ],
        valuesTitle: ["Scholarly", "Moderate", "Ethical", "Contextual", "Responsible"],
        valuesSub: [
          "Every article is based on clear evidence and references.",
          "Avoids extreme, provocative, or misleading simplifications.",
          "Maintains ethics in disagreement and respect for scholarly heritage.",
          "Links Islamic teachings to social realities and modern challenges.",
          "Content is prepared with awareness of social and intellectual impact."
        ],
        ul2: [
          "Fiqh and Usul al-Fiqh",
          "Hadith Studies and Ulum al-Hadith",
          "Tafsir and Ulum al-Qur'an",
          "Islamic History and Civilization",
          "Classical and Contemporary Islamic Thought",
          "Modern Islamic Issues"
        ],
        quote: "All writings are provided as scholarly reflection and study material, not as fatwas or exclusive truth claims.",
        author: "Muhammad Nurcholis",
        role: "Alumnus of Madrasah Saulatiyah, Makkah Al-Mukarramah<br>Student of Sharia and Law<br>Al-Azhar University, Cairo",
        tags: ["Fiqh", "Islamic Thought", "Contemporary Issues"]
      },
      ar: {
        title: "حول بوابة الثقافة الإسلامية",
lead:
  "بوابة الثقافة الإسلامية هي فضاء علمي يعنى بالدراسات الإسلامية، ويسعى إلى تقديم الخطاب الديني بصورة علمية متوازنة ومسؤولة أكاديميًا. وقد أُنشئت هذه البوابة لتكون وسيلة لتبادل المعرفة والتأملات والأفكار الإسلامية، اعتمادًا على المصادر الموثوقة وعلى تقاليد العلم الإسلامي الراسخة. وفي ظل التدفق السريع للمعلومات التي كثيرًا ما تكون سطحية، تسعى بوابة الثقافة الإسلامية إلى تقديم محتوى لا يقتصر على كونه معلوماتيًا فحسب، بل يكون أيضًا قائمًا على الحجة والمنهجية، ومستندًا إلى الأدبيات الإسلامية الكلاسيكية والمعاصرة. وتُكتب كل المقالات وفق منهج علمي يراعي السياق ويحافظ على آداب البحث العلمي في التعامل مع اختلاف الآراء.",

h3: ["الأسس والأهداف", "الرؤية", "الرسالة", "القيم الأساسية", "مجالات الدراسة"],

p: [
  "جاء إنشاء هذا الموقع استجابةً للحاجة إلى فضاءٍ للنقاش الإسلامي لا يقتصر على الشعارات أو السرديات الشائعة فحسب، بل ينطلق من منهجية علمية، ومصادر معرفية رصينة، وأخلاقيات فكرية راسخة. وتهدف بوابة الثقافة الإسلامية إلى:",
  "وبوصفها جزءًا من تقاليد العلم الإسلامي المعتدل والمنفتح، تسعى البوابة إلى طرح الخطاب الإسلامي بصورة متوازنة في مجالات الفقه والفكر والتصوف والقضايا الإسلامية المعاصرة.",
  "أن تكون بوابةً معرفيةً إسلاميةً راسخةً في المنهج العلمي، معتدلةً وموثوقةً في تقديم فكر إسلامي عقلاني ومتوازن ومسؤول.",
  "ترتكز بوابة الثقافة الإسلامية على مجموعة من المبادئ الأساسية:",
  "تركز البوابة على عدد من المجالات العلمية الرئيسة:"
],

ul1: [
  "نشر الفهم الإسلامي القائم على العلم والمصادر الموثوقة.",
  "توفير مساحة للتأمل والنقاش العلمي الرصين والمتزن.",
  "ربط التراث الإسلامي الكلاسيكي بواقع العصر المعاصر.",
  "تقديم دراسات إسلامية معتدلة ومتوازنة ومراعية للسياق."
],

misi: [
  "تقديم دراسات إسلامية قائمة على المصادر الموثوقة والمنهجية العلمية.",
  "إحياء تقاليد القراءة والنقاش العلمي في المجال الإسلامي.",
  "بناء جسر معرفي بين تراث العلماء الكلاسيكي واحتياجات المجتمع المعاصر.",
  "تقديم الفكر الإسلامي بصيغة معتدلة وشاملة ومواكبة للواقع.",
  "أن تكون مرجعًا معرفيًا موثوقًا للطلاب والباحثين والجمهور العام."
],

valuesTitle: ["علمية", "اعتدال", "أدب علمي", "مواكبة للواقع", "مسؤولية"],

valuesSub: [
  "كل مقال يستند إلى أدلة شرعية ومراجع علمية وحجج واضحة.",
  "تجنب الخطاب المتطرف أو الاستفزازي أو التبسيط المضلل.",
  "الحفاظ على أخلاقيات الاختلاف واحترام تراث العلماء.",
  "ربط تعاليم الإسلام بالواقع الاجتماعي وتحديات العصر.",
  "إعداد المحتوى بوعي لمسؤوليته الاجتماعية والفكرية."
],

ul2: [
  "الفقه وأصول الفقه",
  "علم الحديث وعلوم الحديث",
  "التفسير وعلوم القرآن",
  "التاريخ والحضارة الإسلامية",
  "الفكر الإسلامي الكلاسيكي والمعاصر",
  "القضايا الإسلامية المعاصرة"
],
        quote: "جميع المقالات تُقدَّم للتأمل والدراسة العلمية، وليست فتاوى أو ادعاءات للحقيقة المطلقة.",
        author: "محمد نور خالص",
        role: "خريج مدرسة الصولتية بمكة المكرمة<br>طالب الشريعة والقانون<br>جامعة الأزهر، القاهرة",
        tags: ["فقه", "فكر إسلامي", "قضايا معاصرة"]
      }
    },

    disclaimer: {
      id: {
        backTop: "← Beranda",
        backBottom: "← Kembali ke Beranda",
        h1: "Disclaimer",
        intro: "Seluruh konten di Portal Literasi Islam disajikan untuk tujuan edukasi, kajian ilmiah, dan pengembangan wawasan keislaman.",
        h2: ["Bukan Fatwa Resmi", "Sumber dan Referensi", "Tanggung Jawab Penggunaan Informasi", "Tautan Eksternal"],
        p: [
          "Artikel yang dimuat bukan fatwa resmi atau keputusan hukum final. Pembaca disarankan merujuk ulama dan otoritas keagamaan setempat untuk keputusan hukum.",
          "Kami berusaha menyajikan konten dari sumber ilmiah yang dapat dipertanggungjawabkan, namun kemungkinan kesalahan penulisan atau pembaruan informasi tetap dapat terjadi.",
          "Segala tindakan pembaca berdasarkan informasi dari situs ini menjadi tanggung jawab pribadi pembaca.",
          "Situs ini dapat memuat tautan eksternal sebagai referensi. Kami tidak bertanggung jawab atas konten di luar situs ini."
        ]
      },
      en: {
        backTop: "← Home",
        backBottom: "← Back to Home",
        h1: "Disclaimer",
        intro: "All content on the Islamic Literacy Portal is provided for educational purposes and scholarly study.",
        h2: ["Not an Official Fatwa", "Sources and References", "Responsibility for Information Use", "External Links"],
        p: [
          "Published articles are not official fatwas or final legal rulings. Readers should consult qualified scholars and local religious authorities for legal decisions.",
          "We strive to present content based on academically reliable sources, but writing errors or updates may still occur.",
          "Any action taken based on information from this site is the reader's personal responsibility.",
          "This site may contain external links for reference. We are not responsible for content outside this site."
        ]
      },
      ar: {
        backTop: "← الرئيسية",
        backBottom: "← العودة إلى الرئيسية",
        h1: "إخلاء المسؤولية",
        intro: "جميع المحتويات في بوابة الثقافة الإسلامية مقدمة لأغراض تعليمية ودراسات علمية.",
        h2: ["ليست فتوى رسمية", "المصادر والمراجع", "مسؤولية استخدام المعلومات", "الروابط الخارجية"],
        p: [
          "المقالات المنشورة ليست فتاوى رسمية ولا أحكامًا نهائية. يُنصح القارئ بالرجوع إلى العلماء والجهات الدينية المعتمدة لاتخاذ الأحكام العملية.",
          "نسعى لتقديم محتوى مبني على مصادر علمية موثوقة، ومع ذلك قد تقع أخطاء أو تحديثات للمعلومات.",
          "أي تصرف بناءً على معلومات هذا الموقع هو مسؤولية القارئ الشخصية.",
          "قد يتضمن الموقع روابط خارجية للمرجعية، ولسنا مسؤولين عن محتواها."
        ]
      }
    },

    privacy: {
      id: {
        backTop: "← Beranda",
        backBottom: "← Kembali ke Beranda",
        h1: "Kebijakan Privasi",
        intro: "Halaman ini menjelaskan bagaimana data pengguna digunakan di situs ini.",
        h2: ["1. Informasi yang Dikumpulkan", "2. Penggunaan Data"],
        p2: ["Kami dapat mengumpulkan data seperti:", "Data digunakan untuk:"],
        ul1: ["Alamat IP", "Jenis perangkat", "Halaman yang dikunjungi"],
        ul2: ["Analisis trafik situs", "Peningkatan kualitas konten", "Layanan iklan seperti Google AdSense"]
      },
      en: {
        backTop: "← Home",
        backBottom: "← Back to Home",
        h1: "Privacy Policy",
        intro: "This page explains how user data is used on this website.",
        h2: ["1. Information We Collect", "2. How Data Is Used"],
        p2: ["We may collect data such as:", "Data is used for:"],
        ul1: ["IP address", "Device type", "Visited pages"],
        ul2: ["Website traffic analysis", "Content quality improvement", "Advertising services such as Google AdSense"]
      },
      ar: {
        backTop: "← الرئيسية",
        backBottom: "← العودة إلى الرئيسية",
        h1: "سياسة الخصوصية",
        intro: "توضح هذه الصفحة كيفية استخدام بيانات المستخدم في هذا الموقع.",
        h2: ["1. المعلومات التي نجمعها", "2. استخدام البيانات"],
        p2: ["قد نقوم بجمع بيانات مثل:", "تُستخدم البيانات من أجل:"],
        ul1: ["عنوان IP", "نوع الجهاز", "الصفحات التي تمت زيارتها"],
        ul2: ["تحليل حركة الموقع", "تحسين جودة المحتوى", "خدمات إعلانية مثل Google AdSense"]
      }
    },

    ramadhan: {
      id: {
        logo: "Jadwal Ramadhan",
        nav: ["Beranda", "Ramadhan", "Bookmark"],
        hero: "Ramadhan Mubarak",
        sub: "Bulan penuh berkah, ampunan, dan rahmat.",
        load: "Memuat...",
        loadHijri: "Memuat tanggal hijriyah...",
        btn1: "Lihat Jadwal Hari Ini",
        btn2: "Aktifkan Notifikasi",
        doa: "Doa Hari Ini",
        doaLoad: "Memuat doa...",
        section: "Jadwal Ramadhan",
        city: "Mendeteksi lokasi...",
        month: "Jadwal Ramadhan 1 Bulan",
        qibla: "Arah Kiblat",
        qiblaLoad: "Mendeteksi...",
        heads: ["Hari", "Tanggal", "Imsak", "Subuh", "Maghrib"],
        row: "Memuat jadwal...",
        cards: ["Imsak", "Subuh", "Berbuka (Maghrib)"]
      },
      en: {
        logo: "Ramadan Schedule",
        nav: ["Home", "Ramadan", "Bookmark"],
        hero: "Ramadan Mubarak",
        sub: "A month full of blessings, mercy, and forgiveness.",
        load: "Loading...",
        loadHijri: "Loading Hijri date...",
        btn1: "View Today's Schedule",
        btn2: "Enable Notifications",
        doa: "Today's Prayer",
        doaLoad: "Loading prayer...",
        section: "Ramadan Schedule",
        city: "Detecting location...",
        month: "1-Month Ramadan Schedule",
        qibla: "Qibla Direction",
        qiblaLoad: "Detecting...",
        heads: ["Day", "Date", "Imsak", "Fajr", "Maghrib"],
        row: "Loading schedule...",
        cards: ["Imsak", "Fajr", "Iftar (Maghrib)"]
      },
      ar: {
        logo: "جدول رمضان",
        nav: ["الرئيسية", "رمضان", "المحفوظات"],
        hero: "رمضان مبارك",
        sub: "شهر مليء بالبركة والمغفرة والرحمة.",
        load: "جارٍ التحميل...",
        loadHijri: "جارٍ تحميل التاريخ الهجري...",
        btn1: "عرض جدول اليوم",
        btn2: "تفعيل الإشعارات",
        doa: "دعاء اليوم",
        doaLoad: "جارٍ تحميل الدعاء...",
        section: "جدول رمضان",
        city: "جارٍ تحديد الموقع...",
        month: "جدول رمضان لشهر كامل",
        qibla: "اتجاه القبلة",
        qiblaLoad: "جارٍ التحديد...",
        heads: ["اليوم", "التاريخ", "الإمساك", "الفجر", "المغرب"],
        row: "جارٍ تحميل الجدول...",
        cards: ["الإمساك", "الفجر", "الإفطار (المغرب)"]
      }
    }
  };

  function getLang() {
    const saved = window.PortalI18n?.getCurrentLang?.() || localStorage.getItem("siteLang") || "id";
    return LANGS.includes(saved) ? saved : "id";
  }

  function pick(section, lang) {
    return (data[section] && (data[section][lang] || data[section].id)) || null;
  }

  function text(selector, value) {
    const el = document.querySelector(selector);
    if (el && value != null) el.textContent = value;
  }

  function html(selector, value) {
    const el = document.querySelector(selector);
    if (el && value != null) el.innerHTML = value;
  }

  function texts(selector, values) {
    const nodes = document.querySelectorAll(selector);
    values.forEach((value, i) => {
      if (nodes[i]) nodes[i].textContent = value;
    });
  }

  function setPageDirection(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }

  function applyFaq(lang) {
    const p = pick("faq", lang);
    if (!p) return;

    text(".page-title", p.title);
    text(".page-lead", p.lead);

    const questions = document.querySelectorAll(".faq-item .faq-question");
    p.q.forEach((q, i) => {
      if (questions[i]) questions[i].innerHTML = `${q}<span class="faq-icon">+</span>`;
    });

    texts(".faq-item .faq-answer", p.a);
    html(".faq-update-info", p.update);
  }

  function applyKontak(lang) {
    const p = pick("kontak", lang);
    if (!p) return;

    text(".page-title", p.title);
    text(".page-lead", p.lead);
    texts(".contact-card h3", p.h3.slice(0, 3));
    texts(".contact-card p", p.p);
    text(".contact-card:nth-child(2) .contact-link", p.wa);
    text(".contact-note h3", p.h3[3]);
    texts(".contact-note li", p.notes);
  }

  function applyDonasi(lang) {
    const p = pick("donasi", lang);
    if (!p) return;

    text(".donation-tag", p.tag);
    html(".donation-hero h1", p.hero);
    text(".donation-hero p", p.body);
    texts(".donation-highlights .highlight", p.hi);
    text(".donation-box h3", p.box);
    text(".donation-info strong", p.bank);
    text(".copy-btn", p.copy);
    text(".qris-toggle span:first-child", p.qris);
    text(".qris-text", p.qrisText);
    text(".paypal-btn", p.paypal);
    text(".donation-note", p.secure);
    text(".donation-info:last-of-type strong", p.confirm);
  }

  function applyAbout(lang) {
    const p = pick("about", lang);
    if (!p) return;

    text(".page-title", p.title);
    text(".page-lead", p.lead);
    texts(".about-section h3", p.h3);
    texts(".about-section > p", p.p);
    texts(".about-section > ul:first-of-type li", p.ul1);
    texts(".about-section > ol:first-of-type li", p.misi);

    const valueLis = document.querySelectorAll(".about-section > ol:nth-of-type(2) li");
    p.valuesTitle.forEach((title, i) => {
      if (valueLis[i]) {
        valueLis[i].innerHTML = `${title}<br><span class="sub-text">${p.valuesSub[i] || ""}</span>`;
      }
    });

    texts(".about-section > ul:last-of-type li", p.ul2);
    text(".about-note blockquote", p.quote);
    text(".author-info h3", p.author);
    html(".author-role", p.role);
    texts(".author-tags span", p.tags);
  }

  function applyDisclaimer(lang) {
    const p = pick("disclaimer", lang);
    if (!p) return;

    text(".legal-back", p.backTop);
    text(".page-back", p.backBottom);
    text(".page-container h1", p.h1);

    const ps = document.querySelectorAll(".page-container > p");
    if (ps[0]) ps[0].textContent = p.intro;

    texts(".page-container > h2", p.h2);
    p.p.forEach((val, i) => {
      if (ps[i + 1]) ps[i + 1].textContent = val;
    });
  }

  function applyPrivacy(lang) {
    const p = pick("privacy", lang);
    if (!p) return;

    text(".legal-back", p.backTop);
    text(".page-back", p.backBottom);
    text(".page-container h1", p.h1);

    const ps = document.querySelectorAll(".page-container > p");
    if (ps[0]) ps[0].textContent = p.intro;
    if (ps[1]) ps[1].textContent = p.p2[0];
    if (ps[2]) ps[2].textContent = p.p2[1];

    texts(".page-container > h2", p.h2);
    texts(".page-container > ul:nth-of-type(1) li", p.ul1);
    texts(".page-container > ul:nth-of-type(2) li", p.ul2);
  }

  function applyRamadhan(lang) {
    const p = pick("ramadhan", lang);
    if (!p) return;

    text(".ramadhan-navbar .logo span", p.logo);
    texts(".ramadhan-navbar .nav-links a", p.nav);
    text(".ramadhan-hero h1", p.hero);
    text(".hero-sub", p.sub);
    text("#hero-countdown", p.load);
    text("#hijriDate", p.loadHijri);
    text(".hero-btn.primary", p.btn1);
    text("#notifyBtn", p.btn2);
    text(".doa-harian-box h3", p.doa);
    text(".ramadhan-box h1", p.section);
    text("#ramadhan-city", p.city);
    text(".ramadhan-table-box h2", p.month);
    text(".qibla-box h3", p.qibla);
    text("#qiblaDirection", p.qiblaLoad);
    texts(".ramadhan-table thead th", p.heads);
    text("#ramadhan-table-body td[colspan='5']", p.row);
    texts(".ramadhan-card h3", p.cards);
  }

  function run() {
    const lang = getLang();
    setPageDirection(lang);

    if (page === "faq.html") applyFaq(lang);
    if (page === "kontak.html") applyKontak(lang);
    if (page === "donasi.html") applyDonasi(lang);
    if (page === "about.html") applyAbout(lang);
    if (page === "disclaimer.html") applyDisclaimer(lang);
    if (page === "privacy.html") applyPrivacy(lang);
    if (page === "ramadhan.html") applyRamadhan(lang);
  }

  function bindScrollToTop() {
    const scrollBtn = document.getElementById("scrollToTopBtn");
    if (!scrollBtn) return;

    let lastScrollY = window.scrollY;

    function handleScroll() {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;

      if (currentScrollY > 320 && isScrollingDown) {
        scrollBtn.classList.add("show");
      } else if (currentScrollY < 220 || currentScrollY < lastScrollY) {
        scrollBtn.classList.remove("show");
      }

      lastScrollY = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });

    handleScroll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      run();
      bindScrollToTop();
    });
  } else {
    run();
    bindScrollToTop();
  }
  window.addEventListener("portal-language-change", run);
  window.addEventListener("storage", (e) => {
    if (e.key === "siteLang") run();
  });
})();
