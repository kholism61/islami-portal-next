/**
 * Muamalah Syariah - 5 Tools + 3 Bahasa (ID, EN, AR)
 * Bagi Hasil, Murabahah, Wasiat, Hibah, Akad Checker
 */
(function () {
  const LANGS = { id: "id", en: "en", ar: "ar" };
  let currentLang = localStorage.getItem("muamalahLang") || "id";

  const T = {
    id: {
      nav_home: "Beranda", nav_zakat: "Zakat", nav_mawaris: "Mawaris",
      hero_title: "Muamalah Syariah",
      hero_desc: "Kalkulator dan panduan akad syariah berdasarkan prinsip fiqih muamalah yang disepakati ulama.",
      btn_calc: "Hitung", btn_reset: "Reset",
      tool1_title: "Kalkulator Bagi Hasil Syariah",
      tool1_modal: "Total Modal (Rp)", tool1_profit: "Total Keuntungan (Rp)", tool1_type: "Jenis Akad",
      tool1_mudharabah: "Mudharabah", tool1_musyarakah: "Musyarakah",
      tool1_nisbah_owner: "Nisbah Pemilik Modal (%)", tool1_nisbah_worker: "Nisbah Pengelola / Mitra (%)",
      tool1_result_owner: "Bagian Pemilik Modal", tool1_result_worker: "Bagian Pengelola/Mitra",
      tool1_note_profit: "Dalam mudharabah/musyarakah, keuntungan dibagi sesuai nisbah. Kerugian ditanggung sesuai porsi modal (musyarakah) atau oleh pemilik modal (mudharabah) jika bukan kelalaian pengelola.",
      tool1_note_loss: "Kerugian dibebankan kepada pemilik modal (mudharabah) atau sesuai porsi modal (musyarakah).",
      tool2_title: "Kalkulator Murabahah",
      tool2_cost: "Harga Pokok (Rp)", tool2_margin: "Margin (%)", tool2_tenor: "Tenor Cicilan (bulan)",
      tool2_selling: "Harga Jual Akhir", tool2_installment: "Cicilan per Bulan",
      tool2_note: "Murabahah: jual beli dengan margin yang disepakati. Penjual membeli barang lalu menjual dengan markup. Pembayaran boleh dicicil. Akad harus transparan mengenai harga pokok dan margin.",
      tool3_title: "Kalkulator Wasiat",
      tool3_wealth: "Total Harta (Rp)", tool3_value: "Nilai Wasiat (Rp)",
      tool3_max: "Batas Maksimal Wasiat (1/3)", tool3_status: "Status",
      tool3_valid: "Sah — tidak melebihi sepertiga", tool3_exceed: "Melebihi batas — dibatasi 1/3",
      tool3_remaining: "Sisa Harta (setelah wasiat)",
      tool3_note: "Wasiat maksimal sepertiga harta berdasarkan hadis Ibnu Abbas (HR. Bukhari): \"الثُلُثُ وَالثُلُثُ كَثِيرٌ\". Wasiat hanya berlaku setelah wafat, dan tidak boleh untuk ahli waris jika jumhur sepakat melarang.",
      tool4_title: "Kalkulator Hibah Sederhana",
      tool4_wealth: "Total Harta (Rp)", tool4_value: "Nilai Hibah (Rp)",
      tool4_remaining: "Sisa Harta",
      tool4_note: "Hibah (hadiah) berbeda dengan wasiat: hibah berlaku saat hidup, tidak dibatasi 1/3, dan pemindahan kepemilikan langsung. Waris hanya berlaku setelah wafat dan terikat hukum faraid. Hibah untuk ahli waris saat hidup dibolehkan dengan syarat adil atau seizin ahli waris lain.",
      tool5_title: "Checker Akad Syariah", tool5_select: "Pilih Jenis Akad", tool5_choose: "-- Pilih Akad --",
      akad_mudharabah: "Mudharabah", akad_musyarakah: "Musyarakah", akad_murabahah: "Murabahah",
      akad_ijarah: "Ijarah", akad_salam: "Salam", akad_istishna: "Istishna",
      akad_wadiah: "Wadiah", akad_hibah: "Hibah", akad_wasiat: "Wasiat",
      akad_req: "Syarat dan Rukun", akad_fiqh: "Catatan Fiqh",
      footer_portal: "Portal Literasi Islam", footer_desc: "Kajian Islam berbasis literatur dan analisis ilmiah.",
      footer_tools: "Tools", footer_zakat: "Kalkulator Zakat", footer_mawaris: "Kalkulator Mawaris", footer_muamalah: "Muamalah Syariah",
      footer_note: "Catatan", footer_disclaimer: "Kalkulator ini bersifat bantuan edukasi. Konsultasi dengan ahlinya untuk keputusan final.",
      footer_about: "Tentang", footer_contact: "Kontak", footer_faq: "FAQ",
      footer_copy: "© 2026 Portal Literasi Islam",
      brand_portal: "Portal Literasi Islam",
      nav_label: "Menu",
      err_required: "Isi semua field yang wajib.", err_positive: "Nilai harus positif.", err_nisbah: "Total nisbah harus 100%.", err_hibah_exceed: "Hibah melebihi total harta."
    },
    en: {
      nav_home: "Home", nav_zakat: "Zakat", nav_mawaris: "Mawaris",
      hero_title: "Islamic Muamalah",
      hero_desc: "Syariah-compliant calculators and contract guides based on principles agreed upon by scholars.",
      btn_calc: "Calculate", btn_reset: "Reset",
      tool1_title: "Syariah Profit-Sharing Calculator",
      tool1_modal: "Total Capital (Rp)", tool1_profit: "Total Profit (Rp)", tool1_type: "Contract Type",
      tool1_mudharabah: "Mudharabah", tool1_musyarakah: "Musharakah",
      tool1_nisbah_owner: "Capital Owner Share (%)", tool1_nisbah_worker: "Manager/Partner Share (%)",
      tool1_result_owner: "Capital Owner Share", tool1_result_worker: "Manager/Partner Share",
      tool1_note_profit: "In mudharabah/musharakah, profit is split per agreed ratio. Loss is borne by the capital owner (mudharabah) or by partners proportionally to capital (musharakah).",
      tool1_note_loss: "Loss is borne by the capital owner (mudharabah) or in proportion to capital (musharakah).",
      tool2_title: "Murabahah Calculator",
      tool2_cost: "Cost Price (Rp)", tool2_margin: "Margin (%)", tool2_tenor: "Tenor (months)",
      tool2_selling: "Final Selling Price", tool2_installment: "Monthly Installment",
      tool2_note: "Murabahah: cost-plus sale. The seller acquires the asset then sells at an agreed margin. Installment is permitted. The contract must disclose cost and margin transparently.",
      tool3_title: "Bequest (Wasiat) Calculator",
      tool3_wealth: "Total Wealth (Rp)", tool3_value: "Bequest Value (Rp)",
      tool3_max: "Maximum Bequest (1/3)", tool3_status: "Status",
      tool3_valid: "Valid — within one-third limit", tool3_exceed: "Exceeds limit — capped at 1/3",
      tool3_remaining: "Remaining Wealth",
      tool3_note: "Bequest is capped at one-third of the estate per the hadith of Ibn Abbas (Bukhari): \"A third, and a third is much.\" Bequest takes effect upon death. Bequeathing to heirs is disputed among scholars.",
      tool4_title: "Simple Gift (Hibah) Calculator",
      tool4_wealth: "Total Wealth (Rp)", tool4_value: "Gift Value (Rp)",
      tool4_remaining: "Remaining Wealth",
      tool4_note: "Hibah (gift) differs from bequest: it takes effect during life, is not limited to one-third, and transfers ownership immediately. Inheritance applies only after death and follows faraid rules.",
      tool5_title: "Syariah Contract Checker", tool5_select: "Select Contract Type", tool5_choose: "-- Select --",
      akad_mudharabah: "Mudharabah", akad_musyarakah: "Musharakah", akad_murabahah: "Murabahah",
      akad_ijarah: "Ijarah", akad_salam: "Salam", akad_istishna: "Istishna",
      akad_wadiah: "Wadiah", akad_hibah: "Hibah", akad_wasiat: "Bequest",
      akad_req: "Requirements and Pillars", akad_fiqh: "Fiqh Notes",
      footer_portal: "Islamic Literacy Portal", footer_desc: "Islamic scholarship based on literature and academic analysis.",
      footer_tools: "Tools", footer_zakat: "Zakat Calculator", footer_mawaris: "Mawaris Calculator", footer_muamalah: "Muamalah",
      footer_note: "Note", footer_disclaimer: "These tools are for educational purposes. Consult a qualified scholar for final decisions.",
      footer_about: "About", footer_contact: "Contact", footer_faq: "FAQ",
      footer_copy: "© 2026 Islamic Literacy Portal",
      brand_portal: "Islamic Literacy Portal",
      nav_label: "Menu",
      err_required: "Fill all required fields.", err_positive: "Value must be positive.", err_nisbah: "Total ratio must be 100%.", err_hibah_exceed: "Gift exceeds total wealth."
    },
    ar: {
      nav_home: "الرئيسية", nav_zakat: "الزكاة", nav_mawaris: "المواريث",
      hero_title: "المعاملات الشرعية",
      hero_desc: "حاسبات ومرشدات عقود شرعية مبنية على مبادئ متفق عليها بين العلماء.",
      btn_calc: "احسب", btn_reset: "إعادة",
      tool1_title: "حاسبة تقسيم الأرباح الشرعية",
      tool1_modal: "إجمالي رأس المال", tool1_profit: "إجمالي الربح", tool1_type: "نوع العقد",
      tool1_mudharabah: "المضاربة", tool1_musyarakah: "المشاركة",
      tool1_nisbah_owner: "نسبة صاحب المال (%)", tool1_nisbah_worker: "نسبة المضارب/الشريك (%)",
      tool1_result_owner: "حصة صاحب المال", tool1_result_worker: "حصة المضارب/الشريك",
      tool1_note_profit: "في المضاربة والمشاركة يُقسَم الربح حسب النسبة. الخسارة تُحمّل على رب المال (مضاربة) أو حسب نسبة رأس المال (مشاركة).",
      tool1_note_loss: "الخسارة على رب المال (مضاربة) أو بنسبة رأس المال (مشاركة).",
      tool2_title: "حاسبة المرابحة",
      tool2_cost: "سعر التكلفة", tool2_margin: "هامش الربح (%)", tool2_tenor: "مدة التقسيط (شهر)",
      tool2_selling: "سعر البيع النهائي", tool2_installment: "القسط الشهري",
      tool2_note: "المرابحة: بيع بربح معلوم. البائع يشتري السلعة ثم يبيعها بهامش متفق عليه. التقسيط جائز. يجب الإفصاح عن التكلفة والربح.",
      tool3_title: "حاسبة الوصية",
      tool3_wealth: "إجمالي المال", tool3_value: "قيمة الوصية",
      tool3_max: "حد الوصية الأقصى (الثلث)", tool3_status: "الحالة",
      tool3_valid: "صحيحة — لا تتجاوز الثلث", tool3_exceed: "تجاوز الحد — تُخصَص الثلث فقط",
      tool3_remaining: "المال المتبقي",
      tool3_note: "الوصية لا تتجاوز ثلث التركة لحديث ابن عباس (البخاري): الثلث والثلث كثير. الوصية تنفذ بعد الوفاة. الوصية للوارث فيها خلاف.",
      tool4_title: "حاسبة الهبة البسيطة",
      tool4_wealth: "إجمالي المال", tool4_value: "قيمة الهبة",
      tool4_remaining: "المال المتبقي",
      tool4_note: "الهبة تختلف عن الوصية: تنفذ في الحياة، ولا حد للثلث، والتمليك فوري. الميراث بعد الوفاة فقط ويتبع الفرائض.",
      tool5_title: "مدقق العقود الشرعية", tool5_select: "اختر نوع العقد", tool5_choose: "-- اختر --",
      akad_mudharabah: "المضاربة", akad_musyarakah: "المشاركة", akad_murabahah: "المرابحة",
      akad_ijarah: "الإجارة", akad_salam: "السلم", akad_istishna: "الاستصناع",
      akad_wadiah: "الوديعة", akad_hibah: "الهبة", akad_wasiat: "الوصية",
      akad_req: "الشروط والأركان", akad_fiqh: "ملاحظات فقهية",
      footer_portal: "بوابة الثقافة الإسلامية", footer_desc: "دراسات إسلامية مبنية على الأدب والتحليل العلمي.",
      footer_tools: "الأدوات", footer_zakat: "حاسبة الزكاة", footer_mawaris: "حاسبة المواريث", footer_muamalah: "المعاملات",
      footer_note: "ملاحظة", footer_disclaimer: "هذه الأدوات للتعليم فقط. استشر المختص للقرار النهائي.",
      footer_about: "عن البوابة", footer_contact: "اتصل", footer_faq: "الأسئلة",
      footer_copy: "© 2026 بوابة الثقافة الإسلامية",
      brand_portal: "بوابة الثقافة الإسلامية",
      nav_label: "القائمة",
      err_required: "املأ جميع الحقول.", err_positive: "القيمة يجب أن تكون موجبة.", err_nisbah: "مجموع النسب يجب أن يكون 100%.", err_hibah_exceed: "الهبة تتجاوز إجمالي المال."
    }
  };

  const AKAD_DATA = {
    mudharabah: {
      id: { req: "Pemilik modal menyediakan modal 100%; pengelola menyediakan tenaga. Nisbah keuntungan disepakati di awal. Kerugian ditanggung pemilik modal kecuali kelalaian pengelola.", fiqh: "Landasan: QS. Al-Muzammil: 20. Jumhur membolehkan. Modal harus tunai dan jelas. Akad bisa qabdh (serah terima) atau tidak tergantung mazhab." },
      en: { req: "Capital owner provides 100% capital; manager provides labor. Profit ratio agreed upfront. Loss borne by capital owner except manager's negligence.", fiqh: "Based on Q73:20. Majority permits. Capital must be liquid and specified. Handover (qabdh) may be required per school." },
      ar: { req: "رب المال يقدم المال كاملاً؛ المضارب يقدم العمل. نسبة الربح متفق عليها. الخسارة على رب المال إلا في التقصير.", fiqh: "استناداً إلى المزمل:20. الجمهور يجيز. رأس المال نقدي وواضح." }
    },
    musyarakah: {
      id: { req: "Kedua pihak menyertakan modal. Nisbah keuntungan boleh tidak sama dengan nisbah modal (dengan syarat). Kerugian proporsional dengan modal.", fiqh: "Syirkah 'inan. Profit-sharing boleh beda dari capital ratio bila disepakati. Rugi selalu sesuai porsi modal." },
      en: { req: "Both partners contribute capital. Profit ratio may differ from capital ratio (by agreement). Loss is proportional to capital.", fiqh: "Syirkah 'inan. Profit share may differ from capital ratio if agreed. Loss always follows capital share." },
      ar: { req: "الشريكان يقدمان رأس المال. نسبة الربح قد تختلف عن نسبة رأس المال بالاتفاق. الخسارة بنسبة رأس المال.", fiqh: "شركة عنان. القسمة ربما تختلف عن رأس المال بالرضا. الخسارة دائماً بنسبة رأس المال." }
    },
    murabahah: {
      id: { req: "Harga pokok dan margin harus jelas. Barang harus dimiliki penjual sebelum dijual. Boleh cicilan dengan skema yang transparan.", fiqh: "Bai' bi thaman ajil. Tidak boleh menggabungkan dengan qardh secara langsung. Barang harus ada dan mampu diserahkan." },
      en: { req: "Cost and margin must be disclosed. Seller must own the asset before sale. Installment allowed with transparent terms.", fiqh: "Bai' bi thaman ajil. Cannot combine with qardh directly. Asset must exist and be deliverable." },
      ar: { req: "التكلفة والربح معلومان. البائع يملك السلعة قبل البيع. التقسيط جائز بشروط واضحة.", fiqh: "بيع بثمن آجل. لا يدمج مع القرض مباشرة. السلعة موجودة وقابلة للتسليم." }
    },
    ijarah: {
      id: { req: "Manfaat benda atau jasa disewakan. Ujrah (sewa) jelas dan disepakati. Obyek harus halal dan bisa diserahkan.", fiqh: "Sewa menyewa manfaat. Tidak ada pemindahan kepemilikan. Ijarah muntahiyah bit tamlik (akhirnya jual) ada khilaf." },
      en: { req: "Usufruct or service is leased. Rent (ujrah) is clear and agreed. Object must be halal and deliverable.", fiqh: "Lease of usufruct. No transfer of ownership. Ijarah muntahiyah bit tamlik is debated." },
      ar: { req: "منفعة العين أو العمل مؤجرة. الأجرة واضحة ومتفق عليها. العين حلال وقابلة للتسليم.", fiqh: "إجارة المنفعة. لا نقل للملكية. إجارة منتهية بالتمليك فيها خلاف." }
    },
    salam: {
      id: { req: "Pembayaran di muka penuh; penyerahan barang di kemudian hari. Spesifikasi barang jelas. Tidak untuk emas/perak tunai.", fiqh: "Bai' as-salam. Harus ada jaminan (rahn) atau kriteria ketat. Barang generik dan bisa dideskripsikan." },
      en: { req: "Full advance payment; delivery later. Commodity specs clear. Not for gold/silver as cash.", fiqh: "Bai' as-salam. Collateral or strict criteria. Generic, describable commodity." },
      ar: { req: "الدفع كاملاً مقدماً؛ التسليم لاحقاً. مواصفات السلعة واضحة. لا للذهب والفضة نقداً.", fiqh: "بيع السلم. رهن أو ضوابط صارمة. سلعة ذات صنف يمكن وصفه." }
    },
    istishna: {
      id: { req: "Pesan barang yang akan dibuat. Spesifikasi dan harga disepakati. Boleh pembayaran bertahap.", fiqh: "استصناع. Lebih lentur dari salam. Barang dibuat sesuai pesanan. Pembayaran bisa di muka, cicil, atau akhir." },
      en: { req: "Order goods to be manufactured. Specs and price agreed. Payment may be staged.", fiqh: "Istishna. More flexible than salam. Custom manufacture. Payment upfront, installments, or upon delivery." },
      ar: { req: "طلب صناعة سلعة. المواصفات والسعر متفق عليه. الدفع قد يكون مرحلياً.", fiqh: "الاستصناع. أيسر من السلم. السلعة تُصنَع حسب الطلب." }
    },
    wadiah: {
      id: { req: "Penitip menitipkan harta; penerima titipan menjaga. Wadiah yad amanah (trust) tidak boleh memanfaatkan. Wadiah yad dhamanah (guarantee) boleh dengan syarat.", fiqh: "الوديعة. اليد أمانة لا تضمن. اليد ضمانة تضمن. في المصارف غالباً الضمانة لتعويض خسارة." },
      en: { req: "Depositor deposits; custodian safeguards. Wadiah yad amanah: no use of funds. Wadiah yad dhamanah: liability with conditions.", fiqh: "Wadiah. Amanah hand: no liability. Dhamanah hand: liable. Banks often use dhamanah." },
      ar: { req: "المودع يودع؛ المستودع يحفظ. الوديعة يد أمانة لا تستخدم. يد ضمانة بشرط.", fiqh: "الوديعة. اليد أمانة لا ضمان. اليد ضمانة بضمان." }
    },
    hibah: {
      id: { req: "Pemindahan kepemilikan tanpa ganti rugi. Tidak ada batas wajib. Ijab qabul disyaratkan. Serah terima disepakati ulama.", fiqh: "الهبة. لا حد للثلث. تمليك بلا عوض. الهبة لوارث فيها خلاف؛ كراهية عند الشافعية." },
      en: { req: "Transfer of ownership without consideration. No mandatory limit. Offer and acceptance required. Delivery debated.", fiqh: "Hibah. No third limit. Gratuitous transfer. Hibah to heir is disputed; discouraged by Shafi'i." },
      ar: { req: "نقل الملكية بلا عوض. لا حد واجب. الإيجاب والقبول شرط. التسليم مختلف فيه.", fiqh: "الهبة. لا ثلث واجب. تمليك مجاني. الهبة للوارث فيها خلاف." }
    },
    wasiat: {
      id: { req: "Maksimal sepertiga harta. Tidak boleh untuk ahli waris (jumhur). Berlaku setelah wafat. Harus tertulis atau disaksikan.", fiqh: "الوصية. الثلث حد أقصى. الوصية للوارث عند الجمهور لا تصح. تنفذ بعد الموت." },
      en: { req: "Maximum one-third of estate. Cannot favor heirs (majority view). Effective upon death. Must be written or witnessed.", fiqh: "Bequest. One-third cap. Bequest to heir invalid per majority. Executed after death." },
      ar: { req: "الحد الأقصى ثلث المال. لا للوارث عند الجمهور. تنفذ بعد الوفاة. مكتوبة أو مشهودة.", fiqh: "الوصية. الثلث حد. الوصية للوارث عند الجمهور باطلة." }
    }
  };

  function t(key) {
    return T[currentLang]?.[key] ?? T.id[key] ?? key;
  }

  function fmtNum(n) {
    return new Intl.NumberFormat(currentLang === "ar" ? "ar-EG" : currentLang === "en" ? "en-US" : "id-ID").format(n);
  }

  function applyLang() {
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("rtl-ui", currentLang === "ar");
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      if (key && t(key)) el.textContent = t(key);
    });
    document.querySelectorAll("option[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      if (key && t(key)) el.textContent = t(key);
    });
    document.documentElement.lang = currentLang === "ar" ? "ar" : currentLang;
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("rtl-ui", currentLang === "ar");
    localStorage.setItem("muamalahLang", currentLang);
  }

  function showResult(elId, html, isError = false) {
    const el = document.getElementById(elId);
    if (!el) return;
    el.innerHTML = html;
    el.classList.add("visible");
    el.classList.toggle("error", isError);
  }

  function hideResult(elId) {
    const el = document.getElementById(elId);
    if (el) {
      el.classList.remove("visible", "error");
      el.innerHTML = "";
    }
  }

  // Tool 1: Bagi Hasil
  function calcBagihasil() {
    const modal = parseFloat(document.getElementById("bagihasil-modal")?.value) || 0;
    const profit = parseFloat(document.getElementById("bagihasil-profit")?.value) || 0;
    const nisbahOwner = parseFloat(document.getElementById("bagihasil-nisbah-owner")?.value) || 0;
    const nisbahWorker = parseFloat(document.getElementById("bagihasil-nisbah-worker")?.value) || 0;

    if (modal <= 0 || profit < 0) {
      showResult("bagihasil-result", `<p class="muamalah-result-note">${t("err_positive")}</p>`, true);
      return;
    }
    const totalNisbah = nisbahOwner + nisbahWorker;
    if (Math.abs(totalNisbah - 100) > 0.01) {
      showResult("bagihasil-result", `<p class="muamalah-result-note">${t("err_nisbah")}</p>`, true);
      return;
    }

    const shareOwner = (profit * nisbahOwner) / 100;
    const shareWorker = (profit * nisbahWorker) / 100;

    const html = `
      <h3>${t("tool1_title")}</h3>
      <div class="muamalah-result-row">
        <span>${t("tool1_result_owner")}</span>
        <span class="muamalah-result-value">Rp ${fmtNum(Math.round(shareOwner))}</span>
      </div>
      <div class="muamalah-result-row">
        <span>${t("tool1_result_worker")}</span>
        <span class="muamalah-result-value">Rp ${fmtNum(Math.round(shareWorker))}</span>
      </div>
      <p class="muamalah-result-note">${profit >= 0 ? t("tool1_note_profit") : t("tool1_note_loss")}</p>
    `;
    showResult("bagihasil-result", html);
  }

  function resetBagihasil() {
    document.getElementById("bagihasil-modal").value = "";
    document.getElementById("bagihasil-profit").value = "";
    document.getElementById("bagihasil-nisbah-owner").value = "60";
    document.getElementById("bagihasil-nisbah-worker").value = "40";
    hideResult("bagihasil-result");
  }

  // Tool 2: Murabahah
  function calcMurabahah() {
    const cost = parseFloat(document.getElementById("murabahah-cost")?.value) || 0;
    const margin = parseFloat(document.getElementById("murabahah-margin")?.value) || 0;
    const tenor = parseFloat(document.getElementById("murabahah-tenor")?.value) || 0;

    if (cost <= 0 || tenor < 1) {
      showResult("murabahah-result", `<p class="muamalah-result-note">${t("err_positive")}</p>`, true);
      return;
    }

    const selling = cost * (1 + margin / 100);
    const installment = selling / tenor;

    const html = `
      <h3>${t("tool2_title")}</h3>
      <div class="muamalah-result-row">
        <span>${t("tool2_selling")}</span>
        <span class="muamalah-result-value">Rp ${fmtNum(Math.round(selling))}</span>
      </div>
      <div class="muamalah-result-row">
        <span>${t("tool2_installment")}</span>
        <span class="muamalah-result-value">Rp ${fmtNum(Math.round(installment))}</span>
      </div>
      <p class="muamalah-result-note">${t("tool2_note")}</p>
    `;
    showResult("murabahah-result", html);
  }

  function resetMurabahah() {
    document.getElementById("murabahah-cost").value = "";
    document.getElementById("murabahah-margin").value = "10";
    document.getElementById("murabahah-tenor").value = "12";
    hideResult("murabahah-result");
  }

  // Tool 3: Wasiat
  function calcWasiat() {
    const wealth = parseFloat(document.getElementById("wasiat-wealth")?.value) || 0;
    const value = parseFloat(document.getElementById("wasiat-value")?.value) || 0;

    if (wealth <= 0) {
      showResult("wasiat-result", `<p class="muamalah-result-note">${t("err_positive")}</p>`, true);
      return;
    }

    const maxThird = wealth / 3;
    const valid = value <= maxThird;
    const effectiveWasiat = valid ? value : maxThird;
    const remaining = wealth - effectiveWasiat;

    const html = `
      <h3>${t("tool3_title")}</h3>
      <div class="muamalah-result-row">
        <span>${t("tool3_max")}</span>
        <span class="muamalah-result-value">Rp ${fmtNum(Math.round(maxThird))}</span>
      </div>
      <div class="muamalah-result-row">
        <span>${t("tool3_status")}</span>
        <span class="muamalah-result-value">${valid ? t("tool3_valid") : t("tool3_exceed")}</span>
      </div>
      <div class="muamalah-result-row">
        <span>${t("tool3_remaining")}</span>
        <span class="muamalah-result-value">Rp ${fmtNum(Math.round(remaining))}</span>
      </div>
      <p class="muamalah-result-note">${t("tool3_note")}</p>
    `;
    showResult("wasiat-result", html);
  }

  function resetWasiat() {
    document.getElementById("wasiat-wealth").value = "";
    document.getElementById("wasiat-value").value = "";
    hideResult("wasiat-result");
  }

  // Tool 4: Hibah
  function calcHibah() {
    const wealth = parseFloat(document.getElementById("hibah-wealth")?.value) || 0;
    const value = parseFloat(document.getElementById("hibah-value")?.value) || 0;

    if (wealth <= 0) {
      showResult("hibah-result", `<p class="muamalah-result-note">${t("err_positive")}</p>`, true);
      return;
    }
    if (value > wealth) {
      showResult("hibah-result", `<p class="muamalah-result-note">${t("err_hibah_exceed")}</p>`, true);
      return;
    }

    const remaining = wealth - value;

    const html = `
      <h3>${t("tool4_title")}</h3>
      <div class="muamalah-result-row">
        <span>${t("tool4_remaining")}</span>
        <span class="muamalah-result-value">Rp ${fmtNum(Math.round(remaining))}</span>
      </div>
      <p class="muamalah-result-note">${t("tool4_note")}</p>
    `;
    showResult("hibah-result", html);
  }

  function resetHibah() {
    document.getElementById("hibah-wealth").value = "";
    document.getElementById("hibah-value").value = "";
    hideResult("hibah-result");
  }

  // Tool 5: Akad Checker
  function showAkad() {
    const val = document.getElementById("akad-type")?.value;
    const content = document.getElementById("akad-content");
    if (!content) return;

    if (!val || !AKAD_DATA[val]) {
      content.style.display = "none";
      content.innerHTML = "";
      return;
    }

    const data = AKAD_DATA[val][currentLang] || AKAD_DATA[val].id;
    content.innerHTML = `
      <h4>${t("akad_req")}</h4>
      <p>${data.req}</p>
      <h4>${t("akad_fiqh")}</h4>
      <p>${data.fiqh}</p>
    `;
    content.style.display = "block";
  }

  function init() {
    currentLang = localStorage.getItem("muamalahLang") || "id";
    applyLang();

    document.querySelectorAll(".muamalah-lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentLang = btn.dataset.lang || "id";
        document.querySelectorAll(".muamalah-lang-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        applyLang();
        showAkad();
      });
    });

    document.getElementById("bagihasil-calc")?.addEventListener("click", calcBagihasil);
    document.getElementById("bagihasil-reset")?.addEventListener("click", resetBagihasil);
    document.getElementById("murabahah-calc")?.addEventListener("click", calcMurabahah);
    document.getElementById("murabahah-reset")?.addEventListener("click", resetMurabahah);
    document.getElementById("wasiat-calc")?.addEventListener("click", calcWasiat);
    document.getElementById("wasiat-reset")?.addEventListener("click", resetWasiat);
    document.getElementById("hibah-calc")?.addEventListener("click", calcHibah);
    document.getElementById("hibah-reset")?.addEventListener("click", resetHibah);
    document.getElementById("akad-type")?.addEventListener("change", showAkad);

    document.querySelectorAll(".muamalah-lang-btn").forEach((b) => {
      b.classList.toggle("active", b.dataset.lang === currentLang);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
