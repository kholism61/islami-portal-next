(function () {
  'use strict';

  const config = window.SMART_FIQH_CONFIG;
  if (!config || !config.flow || !config.flow.nodes || !config.flow.results) {
    console.error('SMART_FIQH_CONFIG is missing or invalid.');
    return;
  }

  const DEFAULT_LANG = localStorage.getItem('smartFiqhLang') || 'id';
  const LANGS = ['id', 'en', 'ar'];
  const state = {
    lang: LANGS.includes(DEFAULT_LANG) ? DEFAULT_LANG : 'id',
    currentNodeId: config.flow.start,
    history: [],
    finished: false,
    resultId: null,
    totalQuestions: 0
  };

  const el = {
    html: document.documentElement,
    body: document.body,
    pageTitle: document.querySelector('title'),
    heroTitle: document.getElementById('heroTitle'),
    heroDesc: document.getElementById('heroDesc'),
    engineTitle: document.getElementById('engineTitle'),
    questionBox: document.getElementById('questionBox'),
    questionText: document.getElementById('questionText'),
    yesBtn: document.getElementById('yesBtn'),
    noBtn: document.getElementById('noBtn'),
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
    progressFill: document.getElementById('progressFill'),
    stepText: document.getElementById('stepText'),
    resetBtn: document.getElementById('resetBtn'),
    navToggle: document.getElementById('navToggle'),
    navPanel: document.getElementById('navPanel'),
    langButtons: Array.from(document.querySelectorAll('.lang-switch [data-lang]')),
    statNumbers: Array.from(document.querySelectorAll('.hero-stats .stat-card strong')),
    statLabels: Array.from(document.querySelectorAll('.hero-stats .stat-card span')),
    insightBadges: Array.from(document.querySelectorAll('.insight-badge')),
    infoTitles: Array.from(document.querySelectorAll('.info-card h3')),
    infoBodies: Array.from(document.querySelectorAll('.info-card p')),
    infoList: document.querySelector('.smart-method-list'),
    heroBadge: document.querySelector('.hero-badge'),
    sectionKicker: document.querySelector('.section-kicker'),
    footerText: document.querySelector('.smart-footer p, .footer p')
  };

  const UI = {
    id: {
      yes: 'Ya',
      no: 'Tidak',
      reset: 'Mulai Ulang',
      resultTitle: 'Analisis Fiqh AI Smart',
      labels: {
        status: 'Status Hukum',
        obligation: 'Kewajiban Praktis',
        explanation: 'Analisis Fiqh',
        reference: 'Landasan',
        path: 'Jejak Keputusan',
        confidence: 'Kesimpulan Sistem'
      },
      heroBadge: 'Fiqh Decision Flow',
      sectionKicker: 'Interactive Engine',
      step: 'Langkah',
      completed: 'Analisis selesai',
      nav: {
        home: 'Beranda',
        smart: 'Smart Fiqh',
        mawaris: 'Hitung Mawaris',
        zakat: 'Kalkulator Zakat'
      },
      logo: 'Islami Portal',
      stats: ['14', '13', '3'],
      statLabels: ['Alur Pertanyaan', 'Hasil Hukum', 'Bahasa Aktif'],
      badges: ['Cakupan', 'Prinsip', 'Arah Pakai'],
      infoTitles: [
        'Ruang Lingkup Smart Thaharah',
        'Catatan Fiqh Praktis',
        'Pedoman Penggunaan'
      ],
      infoBodies: [
        'Mencakup wudhu, mandi wajib, tayammum, penghalang sampainya air, luka dan jabirah, najis ringan, najis sedang, najis berat, sisa jejak najis yang sulit hilang, uzur medis berkepanjangan, dan kaidah penting untuk menolak waswas dalam bersuci.',
        'Syariat menuntut ketelitian pada rukun dan syarat, namun menolak waswas, sikap berlebihan, dan beban yang tidak realistis. Air dipakai bila ada dan aman, tayammum diambil saat ada uzur, dan keyakinan tidak gugur hanya karena keraguan.'
      ],
      listItems: [
        'Jawab pertanyaan secara berurutan sesuai kondisi nyata.',
        'Gunakan hasil sebagai panduan awal yang cepat dan terstruktur.',
        'Untuk kasus medis berat atau sangat spesifik, tetap konsultasi fiqh lanjutan.'
      ],
      footer: '© 2026 Smart Fiqh Thaharah — Portal Literasi Islam',
      confidenceText: 'Keputusan dihasilkan dari alur ya/tidak berbasis fiqh thaharah Syafi’i dan audit kondisi praktis pengguna.'
    },
    en: {
      yes: 'Yes',
      no: 'No',
      reset: 'Restart',
      resultTitle: 'AI Smart Fiqh Analysis',
      labels: {
        status: 'Legal Status',
        obligation: 'Practical Duty',
        explanation: 'Fiqh Analysis',
        reference: 'Reference',
        path: 'Decision Path',
        confidence: 'System Conclusion'
      },
      heroBadge: 'Fiqh Decision Flow',
      sectionKicker: 'Interactive Engine',
      step: 'Step',
      completed: 'Analysis complete',
      nav: {
        home: 'Home',
        smart: 'Smart Fiqh',
        mawaris: 'Inheritance Calculator',
        zakat: 'Zakat Calculator'
      },
      logo: 'Islami Portal',
      stats: ['14', '13', '3'],
      statLabels: ['Question Flows', 'Ruling Results', 'Active Languages'],
      badges: ['Coverage', 'Principles', 'Usage'],
      infoTitles: [
        'Scope of Smart Purification',
        'Practical Fiqh Notes',
        'Usage Guide'
      ],
      infoBodies: [
        'Covers wudu, ghusl, tayammum, barriers preventing water reach, wounds and bandages, light impurity, medium impurity, severe impurity, hard-to-remove traces, long-term medical excuses, and major anti-waswas principles in purification.',
        'The law requires precision in pillars and conditions, while rejecting obsessive doubt, excess, and unrealistic burden. Water is used when available and safe, tayammum is taken when an excuse exists, and certainty is not removed by doubt.'
      ],
      listItems: [
        'Answer each question in sequence according to your real condition.',
        'Use the result as a quick and structured first guide.',
        'For severe medical or very specific cases, consult a trusted fiqh scholar.'
      ],
      footer: '© 2026 Smart Fiqh Purification — Islamic Literacy Portal',
      confidenceText: 'This outcome is generated from a Yes/No decision flow grounded in Shafi’i purification fiqh and audited against practical conditions.'
    },
    ar: {
      yes: 'نعم',
      no: 'لا',
      reset: 'ابدأ من جديد',
      resultTitle: 'التحليل الفقهي الذكي',
      labels: {
        status: 'الحكم',
        obligation: 'الواجب العملي',
        explanation: 'التحليل الفقهي',
        reference: 'المرجع',
        path: 'مسار القرار',
        confidence: 'خلاصة النظام'
      },
      heroBadge: 'مسار القرار الفقهي',
      sectionKicker: 'المحرك التفاعلي',
      step: 'المرحلة',
      completed: 'اكتمل التحليل',
      nav: {
        home: 'الرئيسية',
        smart: 'الفقه الذكي',
        mawaris: 'حساب المواريث',
        zakat: 'حاسبة الزكاة'
      },
      logo: 'البوابة الإسلامية',
      stats: ['14', '13', '3'],
      statLabels: ['مسارات الأسئلة', 'نتائج الأحكام', 'اللغات النشطة'],
      badges: ['النطاق', 'الأصول', 'طريقة الاستعمال'],
      infoTitles: [
        'نطاق الطهارة الذكية',
        'ملاحظات فقهية عملية',
        'دليل الاستعمال'
      ],
      infoBodies: [
        'يشمل الوضوء والغسل والتيمم والحائل المانع لوصول الماء والجروح والجبائر والنجاسة المخففة والمتوسطة والمغلظة والآثار التي يصعب إزالتها والأعذار الطبية المستمرة وقواعد دفع الوسوسة في الطهارة.',
        'الشريعة تطلب ضبط الأركان والشروط، لكنها ترفض الوسوسة والغلو والتكليف غير الواقعي. فالماء يستعمل عند وجوده وأمانه، والتيمم يؤخذ عند العذر، واليقين لا يزول بالشك.'
      ],
      listItems: [
        'أجب عن الأسئلة مرتبة بحسب حالتك الواقعية.',
        'استعمل النتيجة دليلا أوليا سريعا ومنظما.',
        'في الحالات الطبية الشديدة أو الخاصة جدا، ارجع إلى توجيه فقهي موثوق.'
      ],
      footer: '© 2026 الفقه الذكي للطهارة — بوابة الثقافة الإسلامية',
      confidenceText: 'هذه النتيجة صادرة عن مسار قرار نعم/لا مبني على فقه الطهارة الشافعي مع مراجعة الحالة العملية للمستخدم.'
    }
  };

  function injectStyles() {
    if (document.getElementById('smart-fiqh-engine-enhanced-styles')) return;
    const style = document.createElement('style');
    style.id = 'smart-fiqh-engine-enhanced-styles';
    style.textContent = `
      .result-box.show{display:block !important; animation: smartFade .35s ease;}
      @keyframes smartFade{from{opacity:0; transform:translateY(8px)}to{opacity:1; transform:none}}
      .result-box.smart-result-luxury{
        position:relative;
        overflow:hidden;
        margin-top:22px;
        padding:26px;
        border-radius:28px;
        background:
          radial-gradient(circle at top right, rgba(116,208,255,.18), transparent 28%),
          linear-gradient(180deg, rgba(9,35,73,.96), rgba(8,28,59,.94));
        border:1px solid rgba(135,205,255,.22);
        box-shadow:0 24px 60px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.04);
      }
      .result-box.smart-result-luxury::before{
        content:'';
        position:absolute; inset:0 auto auto 0; width:100%; height:1px;
        background:linear-gradient(90deg, transparent, rgba(157,221,255,.65), transparent);
        opacity:.75;
      }
      .smart-result-topbar{
        display:flex; align-items:center; justify-content:space-between; gap:12px;
        margin-bottom:18px; flex-wrap:wrap;
      }
      .smart-result-chip{
        display:inline-flex; align-items:center; gap:8px; min-height:38px; padding:0 14px;
        border-radius:999px; font-size:.88rem; font-weight:800; color:#eaf6ff;
        background:linear-gradient(180deg, rgba(74,192,255,.18), rgba(36,149,235,.12));
        border:1px solid rgba(132,209,255,.18);
      }
      .smart-result-confidence{
        color:#d4e9ff; font-size:.92rem; line-height:1.7; margin:0 0 18px;
      }
      .smart-result-grid{
        display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:16px;
      }
      .smart-result-panel{
        min-width:0; padding:18px 18px 16px; border-radius:22px;
        background:linear-gradient(180deg, rgba(10,41,85,.86), rgba(8,31,63,.82));
        border:1px solid rgba(129,199,255,.14);
        box-shadow: inset 0 1px 0 rgba(255,255,255,.03);
      }
      .smart-result-panel--wide{grid-column:1 / -1;}
      .smart-result-label{
        display:block; margin:0 0 10px; font-size:.82rem; font-weight:800;
        letter-spacing:.04em; text-transform:uppercase; color:#9ecfff;
      }
      .smart-result-value{
        margin:0; color:#f4f9ff; line-height:1.9; font-size:1rem; white-space:pre-line;
      }
      .smart-result-status{
        font-size:1.14rem; font-weight:800; color:#fff1ba;
      }
      .smart-result-path{
        display:flex; flex-wrap:wrap; gap:10px; margin-top:2px;
      }
      .smart-path-step{
        display:inline-flex; align-items:center; gap:8px; padding:10px 12px;
        border-radius:14px; background:rgba(255,255,255,.05);
        border:1px solid rgba(155,211,255,.12); color:#e9f5ff; font-size:.92rem; line-height:1.5;
      }
      .smart-path-answer{
        display:inline-flex; align-items:center; justify-content:center; min-width:34px; height:24px;
        border-radius:999px; font-size:.75rem; font-weight:800; color:#052237; background:#7dd8ff;
      }
      .smart-path-answer.no{ background: linear-gradient(90deg, #f2a2a6, #ff7d1e); color:#231104; }
      .smart-path-answer.yes{ background: linear-gradient(90deg, #46d9a8, #23bb8e); color:#07241b; }
      @media (max-width:860px){ .smart-result-grid{grid-template-columns:1fr;} }
      body.rtl-mode .smart-result-topbar, html[lang="ar"] .smart-result-topbar{direction:rtl}
      body.rtl-mode .smart-result-grid, html[lang="ar"] .smart-result-grid{direction:rtl}
    `;
    document.head.appendChild(style);
  }

  function getLangValue(value) {
    if (value == null) return '';
    if (typeof value === 'string') return value;
    return value[state.lang] || value.id || value.en || value.ar || '';
  }

  function t() {
    return UI[state.lang] || UI.id;
  }

  function sanitize(text) {
    return String(text || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function calculateQuestionDepth(startNodeId) {
    let count = 0;
    let current = startNodeId;
    const visited = new Set();
    while (current && config.flow.nodes[current] && !visited.has(current)) {
      visited.add(current);
      count += 1;
      current = config.flow.nodes[current].yes;
      if (current && config.flow.results[current]) break;
    }
    return Math.max(count, 1);
  }

  function updateBaseTexts() {
    const meta = config.meta || {};
    const tx = t();

    if (el.pageTitle) el.pageTitle.textContent = `${getLangValue(meta.pageTitle || meta.heroTitle)} | Portal Literasi Islam`;
    if (el.heroTitle) el.heroTitle.textContent = getLangValue(meta.heroTitle);
    if (el.heroDesc) el.heroDesc.textContent = getLangValue(meta.heroDesc);
    if (el.engineTitle) el.engineTitle.textContent = getLangValue(meta.engineTitle);

    if (el.yesBtn) el.yesBtn.textContent = tx.yes;
    if (el.noBtn) el.noBtn.textContent = tx.no;
    if (el.resetBtn) el.resetBtn.textContent = tx.reset;
    if (el.resultTitle) el.resultTitle.textContent = tx.resultTitle;
    if (el.labelStatus) el.labelStatus.textContent = tx.labels.status;
    if (el.labelObligation) el.labelObligation.textContent = tx.labels.obligation;
    if (el.labelExplanation) el.labelExplanation.textContent = tx.labels.explanation;
    if (el.labelReference) el.labelReference.textContent = tx.labels.reference;

    const logo = document.getElementById('logoText');
    const navHome = document.getElementById('navHome');
    const navSmart = document.getElementById('navSmart');
    const navMawaris = document.getElementById('navMawaris');
    const navZakat = document.getElementById('navZakat');
    if (logo) logo.textContent = tx.logo;
    if (navHome) navHome.textContent = tx.nav.home;
    if (navSmart) navSmart.textContent = tx.nav.smart;
    if (navMawaris) navMawaris.textContent = tx.nav.mawaris;
    if (navZakat) navZakat.textContent = tx.nav.zakat;

    if (el.heroBadge) el.heroBadge.textContent = tx.heroBadge;
    if (el.sectionKicker) el.sectionKicker.textContent = tx.sectionKicker;

    el.langButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === state.lang);
    });

    if (el.statNumbers.length >= 3) {
      el.statNumbers[0].textContent = tx.stats[0];
      el.statNumbers[1].textContent = tx.stats[1];
      el.statNumbers[2].textContent = tx.stats[2];
    }
    el.statLabels.forEach((node, i) => {
      if (tx.statLabels[i]) node.textContent = tx.statLabels[i];
    });
    el.insightBadges.forEach((node, i) => {
      if (tx.badges[i]) node.textContent = tx.badges[i];
    });
    el.infoTitles.forEach((node, i) => {
      if (tx.infoTitles[i]) node.textContent = tx.infoTitles[i];
    });
    el.infoBodies.forEach((node, i) => {
      if (tx.infoBodies[i]) node.textContent = tx.infoBodies[i];
    });
    if (el.infoList) {
      const items = tx.listItems.map(item => `<li>${sanitize(item)}</li>`).join('');
      el.infoList.innerHTML = items;
    }
    if (el.footerText) el.footerText.textContent = tx.footer;

    applyDirection();
  }

  function applyDirection() {
    const isArabic = state.lang === 'ar';
    el.html.lang = state.lang;
    el.html.dir = isArabic ? 'rtl' : 'ltr';
    el.body.classList.toggle('rtl-mode', isArabic);
  }

  function updateProgress() {
    const tx = t();
    if (state.finished) {
      if (el.stepText) el.stepText.textContent = tx.completed;
      if (el.progressFill) el.progressFill.style.width = '100%';
      return;
    }
    const currentStep = Math.max(state.history.length + 1, 1);
    const total = Math.max(state.totalQuestions, currentStep);
    const percentage = Math.min((currentStep / total) * 100, 100);
    if (el.stepText) el.stepText.textContent = `${tx.step} ${currentStep}/${total}`;
    if (el.progressFill) el.progressFill.style.width = `${percentage}%`;
  }

  function renderQuestion() {
    const node = config.flow.nodes[state.currentNodeId];
    if (!node) return;
    state.finished = false;
    state.resultId = null;

    if (el.questionText) el.questionText.textContent = getLangValue(node.text);
    if (el.questionBox) el.questionBox.style.display = '';
    if (el.resultBox) {
      el.resultBox.classList.remove('show', 'smart-result-luxury');
      el.resultBox.style.display = 'none';
      el.resultBox.innerHTML = '';
    }
    updateProgress();
  }

  function buildPathMarkup() {
    const tx = t();
    if (!state.history.length) return `<p class="smart-result-value">-</p>`;
    const items = state.history.map((entry, index) => {
      const q = config.flow.nodes[entry.nodeId];
      const question = sanitize(getLangValue(q.text));
      const answer = entry.answer === 'yes' ? tx.yes : tx.no;
      const answerClass = entry.answer === 'yes' ? 'yes' : 'no';
      return `
        <div class="smart-path-step">
          <span class="smart-path-answer ${answerClass}">${sanitize(answer)}</span>
          <span><strong>${index + 1}.</strong> ${question}</span>
        </div>`;
    }).join('');
    return `<div class="smart-result-path">${items}</div>`;
  }

  function renderResult(resultId) {
    const result = config.flow.results[resultId];
    if (!result || !el.resultBox) return;
    state.finished = true;
    state.resultId = resultId;

    const tx = t();
    const status = getLangValue(result.status);
    const obligation = getLangValue(result.obligation);
    const explanation = getLangValue(result.explanation);
    const reference = getLangValue(result.reference);

    el.resultBox.classList.add('show', 'smart-result-luxury');
    el.resultBox.style.display = 'block';
    el.resultBox.innerHTML = `
      <div class="smart-result-topbar">
        <h3 id="resultTitle">${sanitize(tx.resultTitle)}</h3>
        <span class="smart-result-chip">AI Smart Fiqh • Thaharah</span>
      </div>
      <p class="smart-result-confidence"><strong>${sanitize(tx.labels.confidence)}:</strong> ${sanitize(tx.confidenceText)}</p>
      <div class="smart-result-grid">
        <article class="smart-result-panel">
          <span class="smart-result-label">${sanitize(tx.labels.status)}</span>
          <p class="smart-result-value smart-result-status">${sanitize(status)}</p>
        </article>
        <article class="smart-result-panel">
          <span class="smart-result-label">${sanitize(tx.labels.obligation)}</span>
          <p class="smart-result-value">${sanitize(obligation)}</p>
        </article>
        <article class="smart-result-panel smart-result-panel--wide">
          <span class="smart-result-label">${sanitize(tx.labels.explanation)}</span>
          <p class="smart-result-value">${sanitize(explanation)}</p>
        </article>
        <article class="smart-result-panel smart-result-panel--wide">
          <span class="smart-result-label">${sanitize(tx.labels.reference)}</span>
          <p class="smart-result-value">${sanitize(reference)}</p>
        </article>
        <article class="smart-result-panel smart-result-panel--wide">
          <span class="smart-result-label">${sanitize(tx.labels.path)}</span>
          ${buildPathMarkup()}
        </article>
      </div>
    `;

    if (el.questionBox) el.questionBox.style.display = 'none';
    updateProgress();
  }

  function handleAnswer(answerKey) {
    if (state.finished) return;
    const node = config.flow.nodes[state.currentNodeId];
    if (!node) return;
    const nextId = node[answerKey];
    if (!nextId) return;

    state.history.push({ nodeId: state.currentNodeId, answer: answerKey });

    if (config.flow.results[nextId]) {
      renderResult(nextId);
      return;
    }

    if (config.flow.nodes[nextId]) {
      state.currentNodeId = nextId;
      renderQuestion();
    }
  }

  function resetFlow() {
    state.currentNodeId = config.flow.start;
    state.history = [];
    state.finished = false;
    state.resultId = null;
    renderQuestion();
  }

  function setLanguage(lang) {
    if (!LANGS.includes(lang)) return;
    state.lang = lang;
    localStorage.setItem('smartFiqhLang', lang);
    updateBaseTexts();
    if (state.finished && state.resultId) {
      renderResult(state.resultId);
    } else {
      renderQuestion();
    }
  }

  function bindEvents() {
    if (el.yesBtn) el.yesBtn.addEventListener('click', () => handleAnswer('yes'));
    if (el.noBtn) el.noBtn.addEventListener('click', () => handleAnswer('no'));
    if (el.resetBtn) el.resetBtn.addEventListener('click', resetFlow);

    el.langButtons.forEach(btn => {
      btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });

    if (el.navToggle && el.navPanel) {
      el.navToggle.addEventListener('click', () => {
        const isOpen = el.navPanel.classList.toggle('open');
        el.navToggle.setAttribute('aria-expanded', String(isOpen));
      });
      document.addEventListener('click', (event) => {
        if (!el.navPanel.classList.contains('open')) return;
        if (el.navPanel.contains(event.target) || el.navToggle.contains(event.target)) return;
        el.navPanel.classList.remove('open');
        el.navToggle.setAttribute('aria-expanded', 'false');
      });
    }
  }

  function init() {
    injectStyles();
    state.totalQuestions = calculateQuestionDepth(config.flow.start);
    bindEvents();
    updateBaseTexts();
    renderQuestion();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
