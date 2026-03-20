window.SMART_FIQH_CONFIG = {
  meta: {
    pageTitle: { id: "Smart Fiqh Haid", en: "Smart Fiqh Menstruation", ar: "الفقه الذكي للحيض" },
    heroTitle: { id: "Smart Fiqh Haid", en: "Smart Fiqh Menstruation", ar: "الفقه الذكي للحيض" },
    heroDesc: {
      id: "Analisis fiqh haid, istihadhah, dan nifas dengan alur Ya/Tidak yang ringkas untuk keputusan ibadah harian.",
      en: "A concise Yes/No flow for menstruation, istihada, and nifas rulings for daily worship decisions.",
      ar: "مسار نعم/لا مختصر لأحكام الحيض والاستحاضة والنفاس لقرارات العبادة اليومية."
    },
    engineTitle: { id: "AI Fiqh Analyzer: Haid", en: "AI Fiqh Analyzer: Menstruation", ar: "محلل الفقه الذكي: الحيض" },
    resultTitle: { id: "Hasil Hukum", en: "Ruling Result", ar: "نتيجة الحكم" },
    labelStatus: { id: "Status:", en: "Status:", ar: "الحالة:" },
    labelObligation: { id: "Kewajiban:", en: "Obligation:", ar: "الواجب:" },
    labelExplanation: { id: "Penjelasan:", en: "Explanation:", ar: "الشرح:" },
    labelReference: { id: "Landasan:", en: "Reference:", ar: "الدليل:" },
    yesText: { id: "Ya", en: "Yes", ar: "نعم" },
    noText: { id: "Tidak", en: "No", ar: "لا" },
    resetText: { id: "Mulai Ulang", en: "Restart", ar: "ابدأ من جديد" },
    stepPrefix: { id: "Langkah", en: "Step", ar: "الخطوة" },
    fiqhNoteTitle: { id: "Penjelasan Fiqh Tambahan", en: "Additional Fiqh Notes", ar: "ملاحظات فقهية إضافية" },
    fiqhNoteBody: {
      id: "Modul ini menyajikan keputusan cepat berbasis alur. Untuk kasus medis atau rincian mazhab, tetap rujuk ahli fiqh.",
      en: "This module provides a quick structured flow. For medical cases or madhhab-level details, consult a qualified scholar.",
      ar: "هذه الوحدة تقدم مسارا سريعا منظما، ومع الحالات الطبية أو التفاصيل المذهبية يرجع إلى أهل الفقه."
    },
    smartMethodTitle: { id: "Metode Smart Analyzer", en: "Smart Analyzer Method", ar: "منهج المحلل الذكي" },
    smartMethodBody: {
      id: "Pertanyaan dibangun untuk memetakan status darah dan dampaknya terhadap ibadah.",
      en: "Questions are built to classify bleeding status and its impact on worship.",
      ar: "بنيت الأسئلة لتصنيف حال الدم وأثره على العبادة."
    },
    smartMethodPoint1: {
      id: "1) Tashawwur: identifikasi apakah darah berkaitan dengan haid, nifas, atau istihadhah.",
      en: "1) Conception: identify whether bleeding relates to menstruation, nifas, or istihada.",
      ar: "1) التصور: تحديد هل الدم حيض أم نفاس أم استحاضة."
    },
    smartMethodPoint2: {
      id: "2) Takyif Fiqhi: cek rentang masa, adat, dan ciri yang relevan.",
      en: "2) Fiqh classification: check duration, habit, and relevant indicators.",
      ar: "2) التكييف الفقهي: النظر في المدة والعادة والقرائن."
    },
    smartMethodPoint3: {
      id: "3) Tanzil: tampilkan status ibadah dan kewajiban lanjutan secara ringkas.",
      en: "3) Application: show worship status and follow-up duty concisely.",
      ar: "3) التنزيل: إظهار حكم العبادة والواجبات اللاحقة باختصار."
    },
    aiPanelTitle: { id: "AI Insight Modern", en: "Modern AI Insight", ar: "رؤية ذكية حديثة" },
    aiSummaryLabel: { id: "Ringkasan", en: "Summary", ar: "الخلاصة" },
    aiReasoningLabel: { id: "Analisis", en: "Analysis", ar: "التحليل" },
    aiRiskLabel: { id: "Catatan Risiko", en: "Risk Note", ar: "تنبيه المخاطر" },
    aiAdviceLabel: { id: "Saran Praktis", en: "Practical Advice", ar: "نصيحة عملية" },
    aiEvidenceLabel: { id: "Ibarah Fiqh", en: "Fiqh Phrase", ar: "العبارة الفقهية" },
    aiSourceLabel: { id: "Dalil Ringkas", en: "Brief Proof", ar: "الدليل المختصر" },
    noteBadge: { id: "Panduan Ringkas", en: "Quick Guide", ar: "دليل مختصر" },
    methodBadge: { id: "Metode Sistem", en: "System Method", ar: "منهج النظام" },
    smartFooterCopy: {
      id: "© 2026 Portal Literasi Islam - Smart Fiqh Haid",
      en: "© 2026 Islamic Literacy Portal - Smart Fiqh Menstruation",
      ar: "© 2026 بوابة الثقافة الإسلامية - الفقه الذكي للحيض"
    }
  },
  flow: {
    start: "q1",
    nodes: {
      q1: {
        text: {
          id: "Apakah Anda sedang melihat darah yang keluar dari kemaluan dalam konteks perempuan (bukan luka luar), sehingga perlu diklasifikasikan secara fiqh?",
          en: "Are you seeing bleeding in the female context (not an external wound), so it needs fiqh classification?",
          ar: "هل ترين دما في سياق المرأة (ليس جرحا خارجيا) يحتاج إلى تصنيف فقهي؟"
        },
        yes: "q2",
        no: "r_not_case"
      },
      q2: {
        text: {
          id: "Apakah darah itu terjadi setelah melahirkan (nifas) atau berkaitan langsung dengan proses kelahiran?",
          en: "Is the bleeding after childbirth (nifas) or directly related to delivery?",
          ar: "هل الدم بعد الولادة (نفاس) أو مرتبط مباشرة بالولادة؟"
        },
        yes: "r_nifas",
        no: "q3"
      },
      q3: {
        text: {
          id: "Apakah darah tersebut muncul pada kebiasaan haid Anda (waktu/lamanya) atau memiliki indikasi kuat sebagai haid?",
          en: "Does the bleeding match your usual menstruation habit (timing/duration) or strongly indicate menstruation?",
          ar: "هل يوافق الدم عادتك في الحيض (الوقت/المدة) أو يغلب على الظن أنه حيض؟"
        },
        yes: "r_haid",
        no: "r_istihadhah"
      }
    },
    results: {
      r_not_case: {
        status: { id: "Tidak masuk kasus haid/nifas", en: "Not a menstruation/nifas case", ar: "ليست مسألة حيض/نفاس" },
        obligation: { id: "Pastikan sumber darah (mis. luka luar) dan kebersihan sebelum ibadah", en: "Confirm bleeding source (e.g., external wound) and cleanliness before worship", ar: "تأكدي من مصدر الدم (كجرح خارجي) والطهارة قبل العبادة" },
        explanation: { id: "Jika darah bukan dari konteks yang dibahas, modul ini tidak dapat mengklasifikasikan. Pastikan najis dibersihkan sesuai kemampuan.", en: "If the bleeding is outside this scope, this module cannot classify it. Ensure impurity is cleaned as able.", ar: "إذا كان الدم خارج هذا الباب فلا يمكن تصنيفه هنا، ويجب إزالة النجاسة بحسب الاستطاعة." },
        reference: { id: "Bab thaharah dan najis", en: "Purification and impurity chapters", ar: "أبواب الطهارة والنجاسة" }
      },
      r_nifas: {
        status: { id: "Nifas", en: "Nifas", ar: "نفاس" },
        obligation: { id: "Tidak sah shalat dan puasa; lakukan qadha puasa setelah suci", en: "Prayer/fasting invalid; make up fasting after purity", ar: "لا تصح الصلاة والصوم؛ وتقضي الصوم بعد الطهر" },
        explanation: { id: "Darah setelah melahirkan termasuk nifas. Konsekuensi ibadah mengikuti hukum nifas.", en: "Postpartum bleeding is classified as nifas. Worship consequences follow nifas rulings.", ar: "دم ما بعد الولادة نفاس، وتترتب عليه أحكام النفاس." },
        reference: { id: "Hadis Aisyah tentang qadha puasa", en: "Aishah hadith about making up fasting", ar: "حديث عائشة في قضاء الصوم" }
      },
      r_haid: {
        status: { id: "Haid", en: "Menstruation", ar: "حيض" },
        obligation: { id: "Tidak sah shalat dan puasa; lakukan qadha puasa setelah suci", en: "Prayer/fasting invalid; make up fasting after purity", ar: "لا تصح الصلاة والصوم؛ وتقضي الصوم بعد الطهر" },
        explanation: { id: "Jika darah sesuai indikator haid, maka statusnya haid dan berpengaruh pada ibadah.", en: "If bleeding matches menstruation indicators, it is classified as menstruation and affects worship.", ar: "إذا وافق الدم قرائن الحيض حكم بأنه حيض وترتبت أحكامه." },
        reference: { id: "Bab haid dalam fiqh", en: "Chapters on menstruation", ar: "أبواب الحيض" }
      },
      r_istihadhah: {
        status: { id: "Istihadhah (bukan haid)", en: "Istihada (not menstruation)", ar: "استحاضة (ليست حيضا)" },
        obligation: { id: "Shalat tetap wajib; ikuti tata cara bersuci bagi istihadhah", en: "Prayer remains obligatory; follow purification rules for istihada", ar: "الصلاة واجبة؛ وتعمل بأحكام الطهارة للمستحاضة" },
        explanation: { id: "Jika tidak memenuhi indikator haid/nifas, maka diperlakukan sebagai istihadhah dengan rincian thaharah sesuai mazhab.", en: "If it does not meet menstruation/nifas indicators, it is treated as istihada with purification details per madhhab.", ar: "إذا لم يثبت كونه حيضا ولا نفاسا فهو استحاضة، ولها أحكام طهارة تفصيلية." },
        reference: { id: "Bab istihadhah dalam fiqh", en: "Chapters on istihada", ar: "أبواب الاستحاضة" }
      }
    }
  },
  resultDetails: {
    r_nifas: {
      ibarah: { id: "النفساء كالحائض", en: "Postpartum is like menstruation", ar: "النفساء كالحائض" },
      evidenceText: { id: "Dasar umum: nifas mengikuti hukum haid pada banyak konsekuensi ibadah.", en: "General basis: nifas follows menstruation in many worship consequences.", ar: "الأصل أن النفاس يجري مجرى الحيض في كثير من أحكام العبادة." },
      ai: {
        summary: { id: "Status nifas: shalat tidak dilakukan sampai suci; puasa diqadha.", en: "Nifas: pause prayer until purity; make up fasting.", ar: "النفاس: تترك الصلاة حتى تطهر وتقضي الصوم." },
        reasoning: { id: "Nifas meniadakan sahnya shalat/puasa selama darah masih ada.", en: "Nifas prevents validity of prayer/fasting while bleeding continues.", ar: "النفاس يمنع صحة الصلاة والصوم مع استمرار الدم." },
        risk: { id: "Pastikan benar-benar suci sebelum kembali ibadah yang mensyaratkan thaharah.", en: "Ensure true purity before resuming worship requiring purification.", ar: "تحققي من الطهر قبل الرجوع للعبادات المشروطة بالطهارة." },
        advice: { id: "Catat hari puasa yang tertinggal untuk qadha.", en: "Track missed fasting days for makeup.", ar: "سجلي أيام الصوم الفائتة للقضاء." }
      }
    },
    r_haid: {
      ibarah: { id: "الحائض لا تصلي ولا تصوم وتقضي الصوم", en: "Menstruating women do not pray/fast and make up fasting", ar: "الحائض لا تصلي ولا تصوم وتقضي الصوم" },
      evidenceText: { id: "Hadis Aisyah: diperintah qadha puasa dan tidak qadha shalat.", en: "Aishah hadith: make up fasting, not prayer.", ar: "حديث عائشة: تؤمر بقضاء الصوم ولا تؤمر بقضاء الصلاة." },
      ai: {
        summary: { id: "Jika haid: shalat/puasa tidak sah hingga suci.", en: "If menstruation: prayer/fasting invalid until purity.", ar: "إذا كان حيضا: لا تصح الصلاة والصوم حتى الطهر." },
        reasoning: { id: "Ini terkait syarat sah ibadah selama haid.", en: "This relates to worship validity conditions during menstruation.", ar: "هذا متعلق بشرط صحة العبادة زمن الحيض." },
        risk: { id: "Jangan memaksakan puasa saat haid karena tidak sah.", en: "Do not force fasting during menstruation because it is invalid.", ar: "لا تتكلفي الصوم زمن الحيض لأنه غير صحيح." },
        advice: { id: "Setelah suci, qadha puasa sesuai kemampuan.", en: "After purity, make up fasting as able.", ar: "بعد الطهر تقضين الصوم بحسب الاستطاعة." }
      }
    },
    r_istihadhah: {
      ibarah: { id: "المستحاضة تتوضأ لكل صلاة بعد دخول وقتها", en: "Istihada woman performs wudu for each prayer after time begins", ar: "المستحاضة تتوضأ لكل صلاة بعد دخول وقتها" },
      evidenceText: { id: "Rincian istihadhah luas; gunakan panduan mazhab yang kamu ikuti.", en: "Istihada has detailed rulings; follow your madhhab guidance.", ar: "للاستحاضة تفاصيل كثيرة؛ فاتبعي ما عليه مذهبك." },
      ai: {
        summary: { id: "Shalat tetap wajib dengan tata cara thaharah khusus.", en: "Prayer remains obligatory with special purification.", ar: "الصلاة واجبة مع طهارة مخصوصة." },
        reasoning: { id: "Istihadhah tidak menghalangi kewajiban shalat, tetapi mengubah tata cara bersuci.", en: "Istihada does not remove the duty of prayer but changes purification procedure.", ar: "الاستحاضة لا تسقط الصلاة لكنها تغير كيفية الطهارة." },
        risk: { id: "Kesalahan klasifikasi bisa mengubah kewajiban ibadah.", en: "Misclassification may change worship duties.", ar: "الخطأ في التصنيف قد يغير الواجبات." },
        advice: { id: "Jika ragu berat atau kasus medis, konsultasikan.", en: "If heavily uncertain or medical, consult.", ar: "إن اشتد الشك أو وجدت حالة طبية فاستفتي." }
      }
    }
  }
};
