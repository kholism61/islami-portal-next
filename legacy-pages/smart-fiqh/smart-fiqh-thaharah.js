(function () {
  const cfg = window.SMART_FIQH_CONFIG;
  if (!cfg || !cfg.flow || !cfg.flow.nodes || !cfg.flow.results) return;

  const state = {
    lang: localStorage.getItem('smartFiqhLang') || 'id',
    current: cfg.flow.start,
    step: 1,
    history: [],
    lastResultKey: null
  };

  const MAX_STEPS = 14;

  const el = {
    html: document.documentElement,
    body: document.body,
    heroBadge: document.querySelector('.hero-badge'),
    heroTitle: document.getElementById('heroTitle'),
    heroDesc: document.getElementById('heroDesc'),
    engineTitle: document.getElementById('engineTitle'),
    stepText: document.getElementById('stepText'),
    progressFill: document.getElementById('progressFill'),
    questionBox: document.getElementById('questionBox'),
    questionText: document.getElementById('questionText'),
    yesBtn: document.getElementById('yesBtn'),
    noBtn: document.getElementById('noBtn'),
    resetBtn: document.getElementById('resetBtn'),
    resultBox: document.getElementById('resultBox'),
    resultTitle: document.getElementById('resultTitle'),
    resultStatus: document.getElementById('resultStatus'),
    resultObligation: document.getElementById('resultObligation'),
    resultExplanation: document.getElementById('resultExplanation'),
    resultReference: document.getElementById('resultReference'),
    labelStatus: document.getElementById('labelStatus'),
    labelObligation: document.getElementById('labelObligation'),
    labelExplanation: document.getElementById('labelExplanation'),
    labelReference: document.getElementById('labelReference'),
    navToggle: document.getElementById('navToggle'),
    navPanel: document.getElementById('navPanel'),
    logoText: document.getElementById('logoText'),
    navHome: document.getElementById('navHome'),
    navSmart: document.getElementById('navSmart'),
    navMawaris: document.getElementById('navMawaris'),
    navZakat: document.getElementById('navZakat'),
    infoCards: Array.from(document.querySelectorAll('.info-card')),
    statCards: Array.from(document.querySelectorAll('.stat-card')),
    langButtons: Array.from(document.querySelectorAll('.lang-switch button')),
    footerText: document.querySelector('.smart-footer p'),
    sectionKicker: document.querySelector('.section-kicker')
  };

  const uiText = {
    id: {
      pageTitle: 'Smart Fiqh Thaharah | Portal Literasi Islam',
      heroBadge: 'Fiqh Decision Flow',
      sectionKicker: 'Interactive Engine',
      step: 'Langkah',
      yes: 'Ya',
      no: 'Tidak',
      reset: 'Mulai Ulang',
      resultTitle: 'Hasil Hukum',
      labelStatus: 'Status',
      labelObligation: 'Kewajiban',
      labelExplanation: 'Penjelasan',
      labelReference: 'Landasan',
      logo: 'Islami Portal',
      navHome: 'Beranda',
      navSmart: 'Smart Fiqh',
      navMawaris: 'Hitung Mawaris',
      navZakat: 'Kalkulator Zakat',
      toggleAria: 'Buka navigasi',
      stat1Label: 'Alur Pertanyaan',
      stat2Label: 'Hasil Hukum',
      stat3Label: 'Bahasa Aktif',
      info1Badge: 'Cakupan',
      info1Title: 'Ruang Lingkup Smart Thaharah',
      info1Body: 'Mencakup wudhu, mandi wajib, tayammum, penghalang sampainya air, luka dan jabirah, najis ringan, najis sedang, najis berat, sisa jejak najis yang sulit hilang, uzur medis berkepanjangan, dan kaidah penting untuk menolak waswas dalam bersuci.',
      info2Badge: 'Prinsip',
      info2Title: 'Catatan Fiqh Praktis',
      info2Body: 'Syariat menuntut ketelitian pada rukun dan syarat, namun menolak waswas, sikap berlebihan, dan beban yang tidak realistis. Air dipakai bila ada dan aman, tayammum diambil saat ada uzur, dan keyakinan tidak gugur hanya karena keraguan.',
      info3Badge: 'Arah Pakai',
      info3Title: 'Pedoman Penggunaan',
      info3Items: [
        'Jawab pertanyaan secara berurutan sesuai kondisi nyata.',
        'Gunakan hasil sebagai panduan awal yang cepat dan terstruktur.',
        'Untuk kasus medis berat atau sangat spesifik, tetap konsultasi fiqh lanjutan.'
      ],
      footer: '© 2026 Smart Fiqh Thaharah — Portal Literasi Islam'
    },
    en: {
      pageTitle: 'Smart Fiqh Purification | Islamic Literacy Portal',
      heroBadge: 'Fiqh Decision Flow',
      sectionKicker: 'Interactive Engine',
      step: 'Step',
      yes: 'Yes',
      no: 'No',
      reset: 'Restart',
      resultTitle: 'Ruling Result',
      labelStatus: 'Status',
      labelObligation: 'Required Action',
      labelExplanation: 'Explanation',
      labelReference: 'Reference',
      logo: 'Islamic Portal',
      navHome: 'Home',
      navSmart: 'Smart Fiqh',
      navMawaris: 'Inheritance Calculator',
      navZakat: 'Zakat Calculator',
      toggleAria: 'Open navigation',
      stat1Label: 'Question Paths',
      stat2Label: 'Legal Outcomes',
      stat3Label: 'Active Languages',
      info1Badge: 'Coverage',
      info1Title: 'Scope of Smart Purification',
      info1Body: 'Covers wudu, ghusl, tayammum, barriers that block water, wounds and bandages, light impurity, medium impurity, severe impurity, difficult residual traces, ongoing medical excuses, and key maxims that help prevent obsessive doubt in purification.',
      info2Badge: 'Principles',
      info2Title: 'Practical Fiqh Notes',
      info2Body: 'The law requires care regarding pillars and conditions, while rejecting obsessive doubt, excessiveness, and unrealistic burdens. Water is used when available and safe, tayammum is taken when a valid excuse exists, and certainty is not overturned by mere doubt.',
      info3Badge: 'Usage',
      info3Title: 'How to Use It',
      info3Items: [
        'Answer each question in order according to your actual condition.',
        'Use the result as a quick and structured initial guide.',
        'For severe medical or highly specific cases, consult deeper fiqh guidance.'
      ],
      footer: '© 2026 Smart Fiqh Purification — Islamic Literacy Portal'
    },
    ar: {
      pageTitle: 'الفقه الذكي للطهارة | بوابة الثقافة الإسلامية',
      heroBadge: 'مسار فقهي تفاعلي',
      sectionKicker: 'المحرك التفاعلي',
      step: 'الخطوة',
      yes: 'نعم',
      no: 'لا',
      reset: 'ابدأ من جديد',
      resultTitle: 'النتيجة الفقهية',
      labelStatus: 'الحكم',
      labelObligation: 'المطلوب',
      labelExplanation: 'الشرح',
      labelReference: 'المرجع',
      logo: 'البوابة الإسلامية',
      navHome: 'الرئيسية',
      navSmart: 'الفقه الذكي',
      navMawaris: 'حاسبة المواريث',
      navZakat: 'حاسبة الزكاة',
      toggleAria: 'فتح القائمة',
      stat1Label: 'مسارات الأسئلة',
      stat2Label: 'النتائج الفقهية',
      stat3Label: 'اللغات المتاحة',
      info1Badge: 'التغطية',
      info1Title: 'نطاق الفقه الذكي للطهارة',
      info1Body: 'يشمل الوضوء والغسل والتيمم وما يمنع وصول الماء والجروح والجبائر والنجاسة المخففة والمتوسطة والمغلظة والآثار التي يشق إزالتها والأعذار الطبية المستمرة والقواعد المهمة لدفع الوسوسة في الطهارة.',
      info2Badge: 'الأصول',
      info2Title: 'ملاحظات فقهية عملية',
      info2Body: 'تطلب الشريعة الدقة في الأركان والشروط، لكنها ترفض الوسوسة والغلو والتكليف غير الواقعي. فيستعمل الماء عند وجوده وأمن ضرره، ويلجأ إلى التيمم عند وجود العذر، ولا يزول اليقين بمجرد الشك.',
      info3Badge: 'طريقة الاستعمال',
      info3Title: 'إرشادات الاستخدام',
      info3Items: [
        'أجب عن الأسئلة بالترتيب بحسب حالتك الواقعية.',
        'استعمل النتيجة كدليل أولي سريع ومنظم.',
        'في الحالات الطبية الشديدة أو الدقيقة جدا، راجع إرشادا فقهيا أوسع.'
      ],
      footer: '© 2026 الفقه الذكي للطهارة — بوابة الثقافة الإسلامية'
    }
  };

  function t(obj) {
    if (!obj) return '';
    return obj[state.lang] || obj.id || obj.en || obj.ar || '';
  }

  function updateDirection() {
    const isArabic = state.lang === 'ar';
    el.html.lang = state.lang;
    el.html.dir = isArabic ? 'rtl' : 'ltr';
    el.body.classList.toggle('rtl-ui', isArabic);
  }

  function renderStaticUi() {
    const ui = uiText[state.lang];
    document.title = ui.pageTitle;
    el.heroBadge.textContent = ui.heroBadge;
    el.heroTitle.textContent = t(cfg.meta.heroTitle);
    el.heroDesc.textContent = t(cfg.meta.heroDesc);
    el.engineTitle.textContent = t(cfg.meta.engineTitle);
    el.sectionKicker.textContent = ui.sectionKicker;
    el.yesBtn.textContent = ui.yes;
    el.noBtn.textContent = ui.no;
    el.resetBtn.textContent = ui.reset;
    el.resultTitle.textContent = ui.resultTitle;
    el.labelStatus.textContent = ui.labelStatus;
    el.labelObligation.textContent = ui.labelObligation;
    el.labelExplanation.textContent = ui.labelExplanation;
    el.labelReference.textContent = ui.labelReference;
    el.logoText.textContent = ui.logo;
    el.navHome.textContent = ui.navHome;
    el.navSmart.textContent = ui.navSmart;
    el.navMawaris.textContent = ui.navMawaris;
    el.navZakat.textContent = ui.navZakat;
    el.navToggle.setAttribute('aria-label', ui.toggleAria);

    const statLabels = [ui.stat1Label, ui.stat2Label, ui.stat3Label];
    el.statCards.forEach((card, index) => {
      const span = card.querySelector('span');
      if (span) span.textContent = statLabels[index] || '';
    });

    const infoMap = [
      [ui.info1Badge, ui.info1Title, ui.info1Body],
      [ui.info2Badge, ui.info2Title, ui.info2Body]
    ];
    infoMap.forEach((row, index) => {
      const card = el.infoCards[index];
      if (!card) return;
      const badge = card.querySelector('.insight-badge');
      const title = card.querySelector('h3');
      const body = card.querySelector('p');
      if (badge) badge.textContent = row[0];
      if (title) title.textContent = row[1];
      if (body) body.textContent = row[2];
    });

    const usageCard = el.infoCards[2];
    if (usageCard) {
      const badge = usageCard.querySelector('.insight-badge');
      const title = usageCard.querySelector('h3');
      const list = usageCard.querySelector('.smart-method-list');
      if (badge) badge.textContent = ui.info3Badge;
      if (title) title.textContent = ui.info3Title;
      if (list) {
        list.innerHTML = ui.info3Items.map(item => `<li>${item}</li>`).join('');
      }
    }

    if (el.footerText) el.footerText.textContent = ui.footer;

    el.langButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === state.lang);
    });
  }

  function renderQuestion() {
    const node = cfg.flow.nodes[state.current];
    if (!node) return;
    state.lastResultKey = null;
    el.questionBox.style.display = 'grid';
    el.resultBox.classList.remove('show');
    el.questionText.textContent = t(node.text);
    el.stepText.textContent = `${uiText[state.lang].step} ${state.step}`;
    const progress = Math.min((state.step / MAX_STEPS) * 100, 100);
    el.progressFill.style.width = `${progress}%`;
  }

  function renderResult(resultKey) {
    const result = cfg.flow.results[resultKey];
    if (!result) return;
    state.lastResultKey = resultKey;
    el.questionBox.style.display = 'none';
    el.resultBox.classList.add('show');
    el.resultStatus.textContent = t(result.status);
    el.resultObligation.textContent = t(result.obligation);
    el.resultExplanation.textContent = t(result.explanation);
    el.resultReference.textContent = t(result.reference);
    el.stepText.textContent = `${uiText[state.lang].step} ${state.step}`;
    const progress = Math.min((state.step / MAX_STEPS) * 100, 100);
    el.progressFill.style.width = `${progress}%`;
  }

  function answer(choice) {
    const node = cfg.flow.nodes[state.current];
    if (!node) return;
    const nextKey = choice === 'yes' ? node.yes : node.no;
    if (!nextKey) return;
    state.history.push({ key: state.current, choice });
    state.step += 1;

    if (cfg.flow.results[nextKey]) {
      renderResult(nextKey);
      return;
    }

    state.current = nextKey;
    renderQuestion();
  }

  function resetFlow() {
    state.current = cfg.flow.start;
    state.step = 1;
    state.history = [];
    state.lastResultKey = null;
    renderStaticUi();
    updateDirection();
    renderQuestion();
  }

  function setLanguage(lang) {
    state.lang = ['id', 'en', 'ar'].includes(lang) ? lang : 'id';
    localStorage.setItem('smartFiqhLang', state.lang);
    renderStaticUi();
    updateDirection();
    if (el.resultBox.classList.contains('show') && state.lastResultKey) {
      renderResult(state.lastResultKey);
    } else {
      renderQuestion();
    }
  }

  el.yesBtn?.addEventListener('click', () => answer('yes'));
  el.noBtn?.addEventListener('click', () => answer('no'));
  el.resetBtn?.addEventListener('click', resetFlow);
  el.langButtons.forEach(btn => btn.addEventListener('click', () => setLanguage(btn.dataset.lang)));

  el.navToggle?.addEventListener('click', () => {
    const isOpen = el.navPanel.classList.toggle('open');
    el.navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (event) => {
    if (!el.navPanel || !el.navToggle) return;
    if (window.innerWidth > 860) return;
    const inside = el.navPanel.contains(event.target) || el.navToggle.contains(event.target);
    if (!inside) {
      el.navPanel.classList.remove('open');
      el.navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  resetFlow();
})();
