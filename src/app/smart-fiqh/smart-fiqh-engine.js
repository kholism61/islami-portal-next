(function(){
  const config = window.SMART_FIQH_CONFIG;
  if(!config || !config.flow) return;

  const state = {
    lang: localStorage.getItem('siteLang') || localStorage.getItem('smartFiqhLang') || 'id',
    currentNode: config.flow.start,
    answers: [],
    totalSteps: countQuestions(config.flow.start)
  };

  const els = {
    logoText: document.getElementById('logoText'),
    navHome: document.getElementById('navHome'),
    navSmart: document.getElementById('navSmart'),
    navMawaris: document.getElementById('navMawaris'),
    navZakat: document.getElementById('navZakat'),
    heroTitle: document.getElementById('heroTitle'),
    heroDesc: document.getElementById('heroDesc'),
    engineTitle: document.getElementById('engineTitle'),
    stepText: document.getElementById('stepText'),
    progressFill: document.getElementById('progressFill'),
    questionBox: document.getElementById('questionBox'),
    questionText: document.getElementById('questionText'),
    yesBtn: document.getElementById('yesBtn'),
    noBtn: document.getElementById('noBtn'),
    resultBox: document.getElementById('resultBox'),
    resultTitle: document.getElementById('resultTitle'),
    labelStatus: document.getElementById('labelStatus'),
    labelObligation: document.getElementById('labelObligation'),
    labelExplanation: document.getElementById('labelExplanation'),
    labelReference: document.getElementById('labelReference'),
    resultStatus: document.getElementById('resultStatus'),
    resultObligation: document.getElementById('resultObligation'),
    resultExplanation: document.getElementById('resultExplanation'),
    resultReference: document.getElementById('resultReference'),
    resultIbarah: document.getElementById('resultIbarah'),
    resultEvidence: document.getElementById('resultEvidence'),
    fiqhEvidenceWrap: document.getElementById('fiqhEvidenceWrap'),
    resetBtn: document.getElementById('resetBtn'),
    fiqhNoteTitle: document.getElementById('fiqhNoteTitle'),
    fiqhNoteBody: document.getElementById('fiqhNoteBody'),
    smartMethodTitle: document.getElementById('smartMethodTitle'),
    smartMethodBody: document.getElementById('smartMethodBody'),
    smartMethodPoint1: document.getElementById('smartMethodPoint1'),
    smartMethodPoint2: document.getElementById('smartMethodPoint2'),
    smartMethodPoint3: document.getElementById('smartMethodPoint3'),
    smartFooterCopy: document.getElementById('smartFooterCopy'),
    aiPanelTitle: document.getElementById('aiPanelTitle'),
    aiSummaryLabel: document.getElementById('aiSummaryLabel'),
    aiReasoningLabel: document.getElementById('aiReasoningLabel'),
    aiRiskLabel: document.getElementById('aiRiskLabel'),
    aiAdviceLabel: document.getElementById('aiAdviceLabel'),
    aiEvidenceLabel: document.getElementById('aiEvidenceLabel'),
    aiSourceLabel: document.getElementById('aiSourceLabel'),
    aiSummary: document.getElementById('aiSummary'),
    aiReasoning: document.getElementById('aiReasoning'),
    aiRisk: document.getElementById('aiRisk'),
    aiAdvice: document.getElementById('aiAdvice'),
    noteBadge: document.getElementById('noteBadge'),
    noteBadgeSecondary: document.getElementById('noteBadgeSecondary'),
    methodBadge: document.getElementById('methodBadge')
  };

  const staticTexts = {
    logoText: { id: 'Islami Portal', en: 'Islamic Portal', ar: 'البوابة الإسلامية' },
    navHome: { id: 'Beranda', en: 'Home', ar: 'الرئيسية' },
    navSmart: { id: 'Smart Fiqh', en: 'Smart Fiqh', ar: 'الفقه الذكي' },
    navMawaris: { id: 'Hitung Mawaris', en: 'Inheritance Tool', ar: 'حاسبة المواريث' },
    navZakat: { id: 'Kalkulator Zakat', en: 'Zakat Calculator', ar: 'حاسبة الزكاة' }
  };

  function t(value){
    if(value == null) return '';
    if(typeof value === 'string') return value;
    return value[state.lang] || value.id || value.en || value.ar || '';
  }

  function countQuestions(nodeId){
    let depth = 0;
    let seen = new Set();
    let current = nodeId;
    while(current && config.flow.nodes[current] && !seen.has(current)){
      seen.add(current);
      depth += 1;
      current = config.flow.nodes[current].yes;
      if(config.flow.results[current]) break;
    }
    return Math.max(depth, 1);
  }

  function applyDirection(){
    document.body.classList.toggle('rtl-ui', state.lang === 'ar');
    document.documentElement.lang = state.lang;
    document.documentElement.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
  }

  function setText(id, value){
    if(els[id]) els[id].textContent = t(value);
  }

  function applyMeta(){
    document.title = `${t(config.meta.pageTitle)} | Portal Literasi Islam`;
    Object.keys(staticTexts).forEach((key)=>setText(key, staticTexts[key]));
    setText('heroTitle', config.meta.heroTitle);
    setText('heroDesc', config.meta.heroDesc);
    setText('engineTitle', config.meta.engineTitle);
    setText('resultTitle', config.meta.resultTitle);
    setText('labelStatus', config.meta.labelStatus);
    setText('labelObligation', config.meta.labelObligation);
    setText('labelExplanation', config.meta.labelExplanation);
    setText('labelReference', config.meta.labelReference);
    setText('resetBtn', config.meta.resetText);
    setText('yesBtn', config.meta.yesText);
    setText('noBtn', config.meta.noText);
    setText('fiqhNoteTitle', config.meta.fiqhNoteTitle);
    setText('fiqhNoteBody', config.meta.fiqhNoteBody);
    setText('smartMethodTitle', config.meta.smartMethodTitle);
    setText('smartMethodBody', config.meta.smartMethodBody);
    setText('smartMethodPoint1', config.meta.smartMethodPoint1);
    setText('smartMethodPoint2', config.meta.smartMethodPoint2);
    setText('smartMethodPoint3', config.meta.smartMethodPoint3);
    setText('smartFooterCopy', config.meta.smartFooterCopy);
    setText('aiPanelTitle', config.meta.aiPanelTitle);
    setText('aiSummaryLabel', config.meta.aiSummaryLabel);
    setText('aiReasoningLabel', config.meta.aiReasoningLabel);
    setText('aiRiskLabel', config.meta.aiRiskLabel);
    setText('aiAdviceLabel', config.meta.aiAdviceLabel);
    setText('aiEvidenceLabel', config.meta.aiEvidenceLabel);
    setText('aiSourceLabel', config.meta.aiSourceLabel);
    setText('noteBadge', config.meta.noteBadge);
    setText('noteBadgeSecondary', config.meta.noteBadge);
    setText('methodBadge', config.meta.methodBadge);
  }

  function renderStep(){
    const step = Math.min(state.answers.length + 1, state.totalSteps);
    const prefix = t(config.meta.stepPrefix || {id:'Langkah', en:'Step', ar:'الخطوة'});
    if (els.stepText) els.stepText.textContent = `${prefix} ${step}/${state.totalSteps}`;
    if (els.progressFill) els.progressFill.style.width = `${((step-1) / state.totalSteps) * 100}%`;
  }

  function renderQuestion(){
    const node = config.flow.nodes[state.currentNode];
    if(!node) return;
    renderStep();
    if(els.questionText) els.questionText.textContent = t(node.text);
    if(els.questionBox) els.questionBox.style.display = 'block';
    if(els.resultBox) {
      els.resultBox.classList.remove('show');
      els.resultBox.style.display = 'none';
    }
  }

  function renderResult(resultKey){
    const result = config.flow.results[resultKey];
    const detail = (config.resultDetails && config.resultDetails[resultKey]) || {};
    if(!result) return;
    if(els.progressFill) els.progressFill.style.width = '100%';
    if(els.stepText) els.stepText.textContent = '✓';
    if(els.questionBox) els.questionBox.style.display = 'none';
    if(els.resultBox) {
      els.resultBox.style.display = 'block';
      els.resultBox.classList.add('show');
    }
    if(els.resultStatus) els.resultStatus.textContent = t(result.status);
    if(els.resultObligation) els.resultObligation.textContent = t(result.obligation);
    if(els.resultExplanation) els.resultExplanation.textContent = t(result.explanation);
    if(els.resultReference) els.resultReference.textContent = t(result.reference);
    if(els.resultIbarah) els.resultIbarah.textContent = detail.ibarah ? t(detail.ibarah) : '';
    if(els.resultEvidence) els.resultEvidence.textContent = detail.evidenceText ? t(detail.evidenceText) : '';
    if(els.fiqhEvidenceWrap) els.fiqhEvidenceWrap.style.display = detail.ibarah ? 'block' : 'none';
    const ai = detail.ai || {};
    if(els.aiSummary) els.aiSummary.textContent = t(ai.summary);
    if(els.aiReasoning) els.aiReasoning.textContent = t(ai.reasoning);
    if(els.aiRisk) els.aiRisk.textContent = t(ai.risk);
    if(els.aiAdvice) els.aiAdvice.textContent = t(ai.advice);
  }

  function choose(answer){
    const node = config.flow.nodes[state.currentNode];
    if(!node) return;
    state.answers.push({ node: state.currentNode, answer });
    const next = node[answer];
    if(config.flow.results[next]) {
      renderResult(next);
    } else {
      state.currentNode = next;
      renderQuestion();
    }
  }

  function restart(){
    state.currentNode = config.flow.start;
    state.answers = [];
    applyMeta();
    renderQuestion();
  }

  function updateLanguageButtons(){
    document.querySelectorAll('.lang-switch button').forEach((btn)=>{
      btn.classList.toggle('active', btn.dataset.lang === state.lang);
    });
  }

  function setLanguage(lang){
    state.lang = lang;
    localStorage.setItem('siteLang', lang);
    localStorage.setItem('smartFiqhLang', lang);
    applyDirection();
    applyMeta();
    updateLanguageButtons();
    if(config.flow.results[state.currentNode]) {
      renderResult(state.currentNode);
    } else if (state.answers.length && state.answers[state.answers.length-1]) {
      const last = state.answers[state.answers.length-1];
      const node = config.flow.nodes[last.node];
      const maybeResult = node && node[last.answer];
      if (maybeResult && config.flow.results[maybeResult] && els.resultBox && els.resultBox.style.display === 'block') {
        renderResult(maybeResult);
      } else {
        renderQuestion();
      }
    } else {
      renderQuestion();
    }
  }

  document.querySelectorAll('.lang-switch button').forEach((btn)=>{
    btn.addEventListener('click', ()=>setLanguage(btn.dataset.lang));
  });
  if(els.yesBtn) els.yesBtn.addEventListener('click', ()=>choose('yes'));
  if(els.noBtn) els.noBtn.addEventListener('click', ()=>choose('no'));
  if(els.resetBtn) els.resetBtn.addEventListener('click', restart);

  applyDirection();
  applyMeta();
  updateLanguageButtons();
  renderQuestion();
})();
