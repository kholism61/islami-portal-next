window.SMART_FIQH_CONFIG = {
  meta: {
    pageTitle: { id: "Smart Fiqh Haid", en: "Smart Fiqh Menstruation", ar: "الفقه الذكي للحيض" },
    heroTitle: { id: "Smart Fiqh Haid", en: "Smart Fiqh Menstruation", ar: "الفقه الذكي للحيض" },
    heroDesc: {
      id: "Analisis fiqh haid, istihadhah, dan nifas dengan alur Ya/Tidak yang lebih panjang, konsisten, dan modern; memadukan indikator fiqh perempuan dengan kehati-hatian medis dasar untuk keputusan ibadah harian.",
      en: "A longer, more consistent, and more modern Yes/No analysis for menstruation, istihada, and nifas, combining women's fiqh indicators with basic medical caution for daily worship decisions.",
      ar: "تحليل نعم/لا أطول وأكثر اتساقا وحداثة لمسائل الحيض والاستحاضة والنفاس، يجمع بين مؤشرات فقه المرأة والتنبه الطبي الأساسي لاتخاذ القرار التعبدي اليومي."
    },
    engineTitle: { id: "AI Fiqh Analyzer: Haid", en: "AI Fiqh Analyzer: Menstruation", ar: "محلل الفقه الذكي: الحيض" },
    fiqhNoteTitle: { id: "Penjelasan Fiqh Tambahan", en: "Additional Fiqh Notes", ar: "ملاحظات فقهية إضافية" },
    fiqhNoteBody: {
      id: "Modul ini memberi keputusan ringkas berbasis urutan pertanyaan. Untuk kasus yang panjang, darah terputus-putus, adat yang berubah total, atau kondisi medis yang rumit, tetap rujuk ustadzah, mufti, atau tenaga medis terpercaya.",
      en: "This module provides concise rulings through a structured question flow. For prolonged bleeding, interrupted bleeding, drastically changed habits, or medically complex situations, still consult a trusted scholar or clinician.",
      ar: "تعطي هذه الوحدة خلاصة حكم عبر أسئلة مرتبة. وفي حالات طول الدم أو تقطعه أو تغير العادة تغيرا كبيرا أو الإشكالات الطبية، ينبغي الرجوع إلى عالمة موثوقة أو مفتٍ أو طبيبة ثقة."
    },
    smartMethodTitle: { id: "Metode Smart Analyzer", en: "Smart Analyzer Method", ar: "منهج المحلل الذكي" },
    smartMethodBody: {
      id: "Alur dibangun dengan tiga tahap agar keputusan lebih stabil, terukur, dan mudah ditelusuri alasannya.",
      en: "The flow is built in three stages so the output stays stable, explainable, and easier to verify.",
      ar: "بُني المسار على ثلاث مراحل حتى تكون النتيجة منضبطة وقابلة للفهم وسهلة التتبع."
    },
    smartMethodPoint1: {
      id: "1) Tashawwur: identifikasi apakah darah berkaitan dengan nifas, haid baru, atau istihadhah.",
      en: "1) Tashawwur: identify whether the blood relates to nifas, a new menstruation, or istihada.",
      ar: "1) التصور: تحديد هل الدم نفاس أو حيض جديد أو استحاضة."
    },
    smartMethodPoint2: {
      id: "2) Takyif Fiqhi: cek batas 15 hari, adat haid, masa suci, dan kemungkinan tamyiz.",
      en: "2) Fiqh classification: check the 15-day limit, menstrual habit, purity interval, and possible tamyiz.",
      ar: "2) التكييف الفقهي: فحص حد الخمسة عشر يوما والعادة والطهر وإمكان التمييز."
    },
    smartMethodPoint3: {
      id: "3) Tanzil: keluarkan status hukum, implikasi ibadah, dan rujukan ringkas yang relevan.",
      en: "3) Tanzil: derive legal status, worship implications, and concise relevant references.",
      ar: "3) التنزيل: استخراج الحكم وآثاره التعبدية والمرجع المختصر المناسب."
    },
    smartFooterCopy: {
      id: "© 2026 Portal Literasi Islam - Smart Fiqh Haid",
      en: "© 2026 Islamic Literacy Portal - Smart Fiqh Menstruation",
      ar: "© 2026 بوابة الثقافة الإسلامية - الفقه الذكي للحيض"
    },
    resultTitle: { id: "Hasil Hukum", en: "Legal Result", ar: "النتيجة الفقهية" },
    labelStatus: { id: "Status:", en: "Status:", ar: "الحالة:" },
    labelObligation: { id: "Kewajiban:", en: "Obligation:", ar: "الواجب:" },
    labelExplanation: { id: "Penjelasan:", en: "Explanation:", ar: "الشرح:" },
    labelReference: { id: "Landasan:", en: "Reference:", ar: "المرجع:" },
    resetText: { id: "Mulai Ulang", en: "Restart", ar: "ابدأ من جديد" },
    stepPrefix: { id: "Langkah", en: "Step", ar: "الخطوة" },
    yesText: { id: "Ya", en: "Yes", ar: "نعم" },
    noText: { id: "Tidak", en: "No", ar: "لا" },
    aiPanelTitle: { id: "AI Insight Modern", en: "Modern AI Insight", ar: "التحليل الذكي الحديث" },
    aiSummaryLabel: { id: "Ringkasan", en: "Summary", ar: "الخلاصة" },
    aiReasoningLabel: { id: "Analisis", en: "Analysis", ar: "التحليل" },
    aiRiskLabel: { id: "Catatan Risiko", en: "Risk Note", ar: "ملاحظة المخاطر" },
    aiAdviceLabel: { id: "Saran Praktis", en: "Practical Advice", ar: "نصيحة عملية" },
    aiEvidenceLabel: { id: "Ibarah Fiqh", en: "Fiqh Phrase", ar: "العبارة الفقهية" },
    aiSourceLabel: { id: "Dalil Ringkas", en: "Concise Evidence", ar: "الدليل المختصر" },
    noteBadge: { id: "Panduan Ringkas", en: "Quick Guide", ar: "دليل مختصر" },
    methodBadge: { id: "Metode Sistem", en: "System Method", ar: "منهج النظام" }
  },
  flow: {
    start: "q1",
    nodes: {
      q1: {
        text: {
          id: "Apakah darah ini mulai keluar setelah proses melahirkan, baik langsung setelah persalinan maupun beberapa waktu sesudahnya, sehingga secara fiqh lebih dekat ke pembahasan nifas daripada haid biasa?",
          en: "Did this bleeding begin after childbirth, whether immediately after delivery or some time later, so that in fiqh it is more likely related to nifas rather than an ordinary menstrual cycle?",
          ar: "هل بدأ هذا الدم بعد الولادة، سواء مباشرة بعد الوضع أو بعده بمدة، بحيث يكون في التكييف الفقهي أقرب إلى النفاس من الحيض المعتاد؟"
        },
        yes: "r_nifas",
        no: "q2"
      },
      q2: {
        text: {
          id: "Apakah saat ini benar ada darah yang keluar dari kemaluan, bukan sekadar cairan biasa, flek samar yang belum jelas, atau keluhan medis lain yang tidak menunjukkan darah haid secara nyata?",
          en: "Is there actual vaginal bleeding at the moment, rather than ordinary discharge, very faint spotting that remains uncertain, or another medical symptom that does not clearly indicate menstrual blood?",
          ar: "هل يوجد الآن دم خارج من الفرج حقيقة، لا مجرد إفرازات معتادة أو نقط يسيرة غير واضحة أو عرض طبي آخر لا يدل بوضوح على دم الحيض؟"
        },
        yes: "q3",
        no: "r_suci"
      },
      q3: {
        text: {
          id: "Jika dihitung sejak darah mulai terlihat hingga sekarang, apakah total masa keluarnya darah telah melewati 15 hari, yaitu batas maksimal haid dalam mazhab Syafi'i yang biasanya menjadi titik pembeda antara haid dan istihadhah?",
          en: "When counted from the first day bleeding appeared until now, has the total duration gone beyond 15 days, which is the maximum limit of menstruation in the Shafi'i school and a major divider between menstruation and istihada?",
          ar: "إذا حُسبت مدة الدم من أول ظهوره إلى الآن، فهل تجاوز مجموعها خمسة عشر يوما، وهو أكثر الحيض في المذهب الشافعي والفاصل المهم بين الحيض والاستحاضة؟"
        },
        yes: "q4",
        no: "q5"
      },
      q4: {
        text: {
          id: "Apakah Anda memiliki adat haid yang cukup tetap dari siklus-siklus sebelumnya, misalnya biasanya datang pada pola waktu tertentu dan berlangsung sekitar jumlah hari yang relatif sama sehingga bisa dijadikan rujukan fiqh?",
          en: "Do you have a sufficiently stable menstrual habit from previous cycles, such as a recurring timing pattern and a roughly consistent number of days, so that it can serve as a fiqh reference point?",
          ar: "هل لك عادة حيض مستقرة إلى حد معتبر من الدورات السابقة، كأن يأتي الدم في نمط زمني معروف ويستمر غالبا عددا متقاربا من الأيام بحيث تصلح العادة مرجعا فقهيا؟"
        },
        yes: "r_istihadhah_adat",
        no: "q6"
      },
      q5: {
        text: {
          id: "Sebelum darah ini muncul, apakah masa suci sejak berhentinya darah sebelumnya telah mencapai minimal 15 hari penuh, sehingga secara fiqh memungkinkan darah yang sekarang dihitung sebagai haid baru?",
          en: "Before this bleeding appeared, did the previous pure interval from the end of the last blood episode reach at least 15 full days, so that fiqh-wise the current bleeding may count as a new menstruation?",
          ar: "قبل ظهور هذا الدم، هل بلغت مدة الطهر من انقطاع الدم السابق خمسة عشر يوما كاملة على الأقل، بحيث يمكن فقها تنزيل الدم الحالي على حيض جديد؟"
        },
        yes: "r_haid",
        no: "r_interval_short"
      },
      q6: {
        text: {
          id: "Apakah Anda dapat membedakan dengan cukup jelas antara darah yang lebih kuat dan darah yang lebih lemah—misalnya dari warna, kekentalan, bau, atau pola hari—sehingga konsep tamyiz secara fiqh masih mungkin dipakai secara meyakinkan?",
          en: "Can you clearly distinguish stronger from weaker blood—such as by color, thickness, odor, or day pattern—so that the fiqh concept of tamyiz can still be applied with reasonable confidence?",
          ar: "هل يمكنك التفريق بوضوح معتبر بين الدم الأقوى والدم الأضعف، من جهة اللون أو الثخانة أو الرائحة أو نمط الأيام، بحيث يمكن العمل بالتمييز فقها على وجه مطمئن؟"
        },
        yes: "r_istihadhah_tamyiz",
        no: "r_istihadhah_mutahayyirah"
      }
    },
    results: {
      r_nifas: {
        status: { id: "Nifas", en: "Nifas (postpartum bleeding)", ar: "نفاس" },
        obligation: { id: "Tidak shalat/puasa, lalu qadha puasa", en: "No prayer/fast, then qada fasting", ar: "تترك الصلاة والصوم ثم تقضي الصوم" },
        explanation: {
          id: "Darah setelah melahirkan dihukumi nifas pada batas maksimal mazhab. Saat nifas, shalat tidak dilakukan dan puasa diganti setelah suci.",
          en: "Postpartum blood is treated as nifas within madhhab limits. During nifas, prayer is suspended and fasting is made up after purity.",
          ar: "الدم بعد الولادة يعد نفاسا في حدوده الفقهية، فتترك الصلاة ويقضى الصوم بعد الطهر."
        },
        reference: { id: "Bab nifas fiqh Syafi'i", en: "Shafi'i fiqh chapter of nifas", ar: "باب النفاس في الفقه الشافعي" }
      },
      r_suci: {
        status: { id: "Suci", en: "Pure state", ar: "طهر" },
        obligation: { id: "Wajib shalat seperti biasa", en: "Regular prayer remains obligatory", ar: "الصلاة واجبة كالمعتاد" },
        explanation: {
          id: "Jika tidak ada darah, hukum asal adalah suci. Ibadah harian berjalan normal.",
          en: "If no bleeding exists, the default ruling is purity. Daily worship continues normally.",
          ar: "إذا لم يوجد دم فالأصل الطهارة وتستمر العبادات كالمعتاد."
        },
        reference: { id: "Kaidah istishhab", en: "Presumption of continuity", ar: "قاعدة الاستصحاب" }
      },
      r_haid: {
        status: { id: "Haid", en: "Menstruation", ar: "حيض" },
        obligation: { id: "Tinggalkan shalat/puasa, qadha puasa", en: "Suspend prayer/fast, qada fasting", ar: "تترك الصلاة والصوم وتقضي الصوم" },
        explanation: {
          id: "Jika durasi darah valid dan jarak suci terpenuhi, darah dihukumi haid. Hukum ibadah mengikuti ketentuan haid.",
          en: "If bleeding duration and purity interval are valid, blood is treated as menstruation with its legal rulings.",
          ar: "إذا صحت مدة الدم ومدة الطهر حكم بكونه حيضا وتترتب أحكامه."
        },
        reference: { id: "Kifayatul Akhyar, bab haid", en: "Kifayatul Akhyar, menstruation section", ar: "كفاية الأخيار، باب الحيض" }
      },
      r_interval_short: {
        status: { id: "Belum memenuhi syarat haid baru", en: "Not valid as new menstruation", ar: "لا يتحقق كحيض جديد" },
        obligation: { id: "Perlu rincian lanjut (seringnya istihadhah)", en: "Need detailed ruling (often istihada)", ar: "تحتاج تفصيلا وغالبا استحاضة" },
        explanation: {
          id: "Jika jeda suci kurang dari batas minimal, darah berikutnya tidak otomatis haid baru. Kembali ke kaidah adat/tamyiz.",
          en: "If pure interval is below the minimum, later bleeding is not automatically a new menstruation. Apply habit/tamyiz rules.",
          ar: "إذا قصرت مدة الطهر عن الحد الأدنى فلا يعد الدم حيضا جديدا مباشرة، بل يرجع إلى العادة أو التمييز."
        },
        reference: { id: "Fathul Qarib", en: "Fathul Qarib", ar: "فتح القريب" }
      },
      r_istihadhah_adat: {
        status: { id: "Istihadhah", en: "Istihada", ar: "استحاضة" },
        obligation: { id: "Gunakan adat haid, selebihnya istihadhah", en: "Apply menstrual habit; rest is istihada", ar: "ترجع للعادة وما زاد استحاضة" },
        explanation: {
          id: "Jika darah lebih dari 15 hari dan punya adat tetap, hari adat dihukumi haid, sisanya istihadhah; tetap wajib shalat dengan tata cara mustahadhah.",
          en: "When bleeding exceeds 15 days with fixed habit, habitual days are menstruation and the rest istihada; prayer remains obligatory with mustahada rules.",
          ar: "إذا جاوز الدم 15 يوما ومعها عادة، فأيام العادة حيض وما زاد استحاضة، وتلزمها الصلاة بأحكام المستحاضة."
        },
        reference: { id: "Tuhfatul Muhtaj", en: "Tuhfatul Muhtaj", ar: "تحفة المحتاج" }
      },
      r_istihadhah_tamyiz: {
        status: { id: "Istihadhah metode tamyiz", en: "Istihada by tamyiz", ar: "استحاضة بطريق التمييز" },
        obligation: { id: "Darah kuat jadi haid, sisanya istihadhah", en: "Strong blood = menstruation, rest istihada", ar: "الدم القوي حيض والباقي استحاضة" },
        explanation: {
          id: "Tanpa adat tetap, pembeda sifat darah dipakai selama memenuhi syarat fiqh. Ini membantu menentukan hari haid secara lebih tepat.",
          en: "Without fixed habit, blood characteristics are used when fiqh conditions are met to identify menstrual days.",
          ar: "عند عدم العادة يرجع إلى التمييز بشروطه الفقهية لتحديد أيام الحيض."
        },
        reference: { id: "Bab tamyiz dalam fiqh wanita", en: "Tamyiz discussions in female fiqh", ar: "باب التمييز في فقه النساء" }
      },
      r_istihadhah_mutahayyirah: {
        status: { id: "Istihadhah kompleks", en: "Complex istihada case", ar: "استحاضة متحيرة" },
        obligation: { id: "Ikuti kaidah mutahayyirah dan konsultasi ulama", en: "Follow mutahayyirah rules and consult scholar", ar: "تعمل بأحكام المتحيرة وتستفتي أهل العلم" },
        explanation: {
          id: "Jika tidak ada adat dan tidak ada tamyiz jelas, kasus perlu bimbingan rinci agar penetapan ibadah harian lebih aman.",
          en: "If neither habit nor clear distinction exists, detailed scholarly guidance is needed for daily worship rulings.",
          ar: "إذا فقدت العادة والتمييز الواضح احتاجت إلى تفصيل فقهي أدق لضبط أحكام العبادة."
        },
        reference: { id: "Rujukan mu'tamad mazhab", en: "Relied-upon madhhab references", ar: "المراجع المعتمدة في المذهب" }
      }
    }
  },
  resultDetails: {
    r_nifas: {
      ibarah: {
        id: "النفاس يمنع الصلاة والصوم حتى يحصل الطهر",
        en: "Nifas prevents prayer and fasting until purity returns",
        ar: "النفاس يمنع الصلاة والصوم حتى يحصل الطهر"
      },
      evidenceText: {
        id: "Hukum nifas mengikuti bab darah wanita dalam fiqh Syafi'i; puasa ditinggalkan lalu diqadha, sedangkan shalat tidak diqadha.",
        en: "Nifas follows the postpartum chapter in Shafi'i fiqh; fasting is postponed and made up later, while prayer is not made up.",
        ar: "أحكام النفاس ترجع إلى أبواب دماء النساء عند الشافعية؛ فيترك الصوم ويقضى بعد الطهر، وأما الصلاة فلا تقضى."
      },
      ai: {
        summary: {
          id: "Kasus ini paling dekat dengan nifas, sehingga fokus ibadah berpindah dari rutinitas biasa ke masa tunggu sampai benar-benar suci. Secara praktis, pengguna perlu memantau berhentinya darah, tanda suci, dan kesiapan kembali ke shalat serta puasa dengan lebih tenang dan terukur.",
          en: "This case most closely aligns with nifas, so practical focus shifts to waiting for confirmed purity before resuming normal worship. In practice, careful monitoring of bleeding cessation, signs of purity, and readiness to restart prayer and fasting becomes important.",
          ar: "هذه الصورة أقرب إلى النفاس، فيتحول التركيز العملي من العبادة المعتادة إلى انتظار الطهر المتحقق قبل الرجوع إلى الصلاة والصوم، مع مراقبة انقطاع الدم وعلامات الطهر بهدوء ودقة."
        },
        reasoning: {
          id: "Pemicu utamanya adalah keluarnya darah setelah melahirkan. Dalam alur ini, status nifas lebih kuat daripada kemungkinan haid biasa.",
          en: "The key trigger is bleeding after childbirth. In this flow, nifas has stronger priority than an ordinary menstruation classification.",
          ar: "العامل الحاسم هنا هو خروج الدم بعد الولادة، ولذلك يقدم وصف النفاس على احتمال الحيض المعتاد."
        },
        risk: {
          id: "Jika darah sangat panjang, terputus-putus, atau muncul keraguan medis, perlu pemeriksaan lebih lanjut.",
          en: "If bleeding becomes very prolonged, intermittent, or medically concerning, further review is needed. Severe pain, dizziness, fever, or unusual weakness should also raise basic medical caution alongside the fiqh assessment.",
          ar: "إذا طال الدم جدا أو تقطع أو ظهرت شبهة طبية، احتاج الأمر إلى مراجعة أوسع."
        },
        advice: {
          id: "Catat tanggal mulai, pantau berhentinya darah, lalu lanjutkan ibadah setelah yakin suci.",
          en: "Record the start date, monitor when bleeding fully stops, observe clear signs of purity, then resume worship after confirmed purity. If the physical condition feels unusual, balance fiqh documentation with appropriate medical consultation.",
          ar: "سجلي تاريخ البداية وراقبي انقطاع الدم التام، ثم عودي للعبادة بعد تحقق الطهر."
        }
      }
    },
    r_suci: {
      ibarah: {
        id: "الأصل في المرأة الطهر حتى يثبت خلافه",
        en: "The default state is purity until evidence indicates otherwise",
        ar: "الأصل في المرأة الطهر حتى يثبت خلافه"
      },
      evidenceText: {
        id: "Kaidah istishhab dipakai: hukum asal adalah suci sampai ada sebab fiqh yang jelas untuk memindahkannya.",
        en: "The principle of continuity applies: the default ruling remains purity until a clear fiqh cause changes it.",
        ar: "تعمل هنا قاعدة الاستصحاب، فالأصل بقاء الطهر حتى يوجد سبب فقهي واضح ينقله."
      },
      ai: {
        summary: {
          id: "Alur saat ini tidak menunjukkan darah yang menimbulkan status haid, istihadhah, atau nifas.",
          en: "The current flow does not indicate bleeding that would create menstruation, istihada, or nifas status.",
          ar: "المسار الحالي لا يدل على دم يثبت به حكم الحيض أو الاستحاضة أو النفاس."
        },
        reasoning: {
          id: "Karena tidak ada darah, keputusan paling aman dan stabil adalah kembali ke hukum asal: suci.",
          en: "Since no bleeding is present, the most stable ruling is to return to the default legal state: purity.",
          ar: "لعدم وجود الدم، فالنتيجة الأضبط هي الرجوع إلى الأصل وهو الطهارة."
        },
        risk: {
          id: "Risiko rendah, tetapi jika muncul bercak atau darah baru, status perlu dicek ulang.",
          en: "Risk is low, but if spotting or new bleeding appears, the ruling should be reassessed.",
          ar: "المخاطر هنا منخفضة، لكن إذا ظهرت كدرة أو دم جديد فينبغي إعادة التقييم."
        },
        advice: {
          id: "Lanjutkan ibadah normal dan gunakan modul ini lagi jika muncul perubahan kondisi.",
          en: "Continue normal worship and reuse this module if the condition changes.",
          ar: "استمري على العبادة المعتادة وأعيدي استخدام هذه الوحدة إذا تغيرت الحالة."
        }
      }
    },
    r_haid: {
      ibarah: {
        id: "إذا صحت المدة والطهر حكم بكون الدم حيضا",
        en: "When duration and purity interval are valid, the blood is treated as menstruation",
        ar: "إذا صحت المدة والطهر حكم بكون الدم حيضا"
      },
      evidenceText: {
        id: "Dalam fiqh Syafi'i, keabsahan haid sangat terkait pada durasi darah dan masa suci sebelumnya.",
        en: "In Shafi'i fiqh, valid menstruation is closely tied to bleeding duration and the previous purity interval.",
        ar: "في الفقه الشافعي يرتبط ثبوت الحيض ارتباطا واضحا بمدة الدم والطهر السابق."
      },
      ai: {
        summary: {
          id: "Data paling dekat dengan haid baru yang sah, sehingga larangan ibadah tertentu mengikuti hukum haid.",
          en: "The input most closely matches a valid new menstruation, so the relevant menstruation rulings apply. In practice, this means the episode may be treated as a standard menstrual phase unless later data significantly changes the pattern.",
          ar: "المعطيات أقرب إلى حيض جديد صحيح، فتترتب عليه أحكام الحيض المعروفة."
        },
        reasoning: {
          id: "Dua indikator utama terpenuhi: durasi darah tidak melewati batas dan masa suci sebelumnya memadai.",
          en: "Two main indicators are satisfied: bleeding does not exceed the legal limit and the prior purity interval is sufficient.",
          ar: "تحققت علامتان رئيسيتان: أن مدة الدم لم تتجاوز الحد المعتبر وأن الطهر السابق كاف."
        },
        risk: {
          id: "Jika pola darah kemudian berubah drastis atau memanjang, kasus bisa berpindah ke istihadhah.",
          en: "If the bleeding pattern later changes drastically or extends, the case may shift toward istihada. That is why ongoing tracking matters, especially when later days no longer resemble the initial pattern.",
          ar: "إذا تغير نمط الدم لاحقا أو طال كثيرا فقد ينتقل الحكم إلى الاستحاضة."
        },
        advice: {
          id: "Catat awal dan akhir darah agar siklus berikutnya lebih mudah dipetakan.",
          en: "Record the start and end dates, shifts in blood quality, and accompanying symptoms so the next cycle can be classified more accurately from both a fiqh and a basic health-monitoring perspective.",
          ar: "سجلي بداية الدم ونهايته لتسهيل تصنيف الدورة القادمة بدقة أكبر."
        }
      }
    },
    r_interval_short: {
      ibarah: {
        id: "قصر الطهر يمنع تنزيل الدم على حيض جديد مباشرة",
        en: "A short purity interval prevents immediate classification as a new menstruation",
        ar: "قصر الطهر يمنع تنزيل الدم على حيض جديد مباشرة"
      },
      evidenceText: {
        id: "Dalam masalah darah wanita, jarak suci yang kurang dari الحد الأدنى membuat kasus perlu dikembalikan pada rincian adat atau tamyiz.",
        en: "In female bleeding rulings, a purity interval below the minimum means the case must return to habit or tamyiz details.",
        ar: "في أبواب دماء النساء، إذا قصرت مدة الطهر عن الحد الأدنى رجع النظر إلى تفاصيل العادة أو التمييز."
      },
      ai: {
        summary: {
          id: "Kasus ini belum cukup kuat untuk disebut haid baru secara langsung.",
          en: "This case is not strong enough to be treated directly as a new menstruation. The short purity interval means the ruling should be slowed down and checked against prior habit or distinguishing signs before reaching a worship-sensitive conclusion.",
          ar: "هذه الصورة ليست كافية للحكم بكونها حيضا جديدا مباشرة."
        },
        reasoning: {
          id: "Masalah utamanya bukan semata ada darah, tetapi pendeknya jarak suci sebelum darah berikutnya muncul.",
          en: "The main issue is not merely the presence of blood, but the short purity interval before it reappeared.",
          ar: "الإشكال هنا ليس مجرد وجود الدم، بل قصر الطهر قبل رجوعه."
        },
        risk: {
          id: "Risiko salah klasifikasi cukup tinggi jika langsung disebut haid tanpa melihat adat atau tamyiz.",
          en: "The risk of misclassification is fairly high if it is called menstruation without checking habit or tamyiz. A rushed conclusion here can affect prayer, fasting, and personal certainty all at once.",
          ar: "احتمال الخطأ في التصنيف مرتفع نسبيا إذا سمي حيضا دون نظر في العادة أو التمييز."
        },
        advice: {
          id: "Siapkan data siklus sebelumnya karena informasi adat sangat membantu pada cabang ini.",
          en: "Prepare prior cycle data because menstrual habit is especially useful in this branch. The more organized the previous records are, the safer and steadier the practical ruling becomes.",
          ar: "هيئي بيانات الدورات السابقة لأن العادة تفيد كثيرا في هذا الفرع."
        }
      }
    },
    r_istihadhah_adat: {
      ibarah: {
        id: "إذا جاوز الدم أكثر الحيض رجعت المعتادة إلى عادتها",
        en: "When bleeding exceeds the maximum, a woman with habit returns to her habit",
        ar: "إذا جاوز الدم أكثر الحيض رجعت المعتادة إلى عادتها"
      },
      evidenceText: {
        id: "Dalam mazhab, adat yang stabil menjadi penentu utama ketika darah melampaui batas maksimal haid.",
        en: "In the madhhab, a stable menstrual habit becomes the main classifier when bleeding exceeds the maximum limit.",
        ar: "في المذهب تكون العادة المستقرة مرجعا أساسيا إذا جاوز الدم الحد الأقصى للحيض."
      },
      ai: {
        summary: {
          id: "Ini paling cocok sebagai istihadhah dengan bantuan adat haid yang sudah dikenal sebelumnya.",
          en: "This most closely fits istihada resolved through an already known menstrual habit. The stable habit functions as the strongest anchor for separating menstrual days from non-menstrual bleeding in a practical and repeatable way.",
          ar: "هذه الصورة أقرب إلى الاستحاضة التي تضبط بالعـادة السابقة المعروفة."
        },
        reasoning: {
          id: "Karena darah melebihi batas dan ada adat tetap, sistem memprioritaskan pola adat untuk memisahkan hari haid dari hari istihadhah.",
          en: "Because bleeding exceeds the limit and a fixed habit exists, the system prioritizes that habit to separate menstrual and istihada days.",
          ar: "لما جاوز الدم الحد ووجدت عادة ثابتة، قدم النظام العادة للفصل بين أيام الحيض وأيام الاستحاضة."
        },
        risk: {
          id: "Jika adat yang diingat tidak akurat, hasil praktis juga bisa bergeser.",
          en: "If the remembered habit is inaccurate, the practical ruling may also shift.",
          ar: "إذا لم تضبط العادة السابقة بدقة فقد يتأثر الحكم العملي تبعا لذلك."
        },
        advice: {
          id: "Gunakan catatan siklus atau aplikasi agar adat haid lebih mudah diverifikasi.",
          en: "Use cycle notes or an app so the menstrual habit can be verified more easily. The more reliable the old data is, the easier it becomes to separate habitual menstruation from extended non-menstrual bleeding.",
          ar: "يفيد تدوين الدورات أو استخدام تطبيق لضبط العادة والتحقق منها بسهولة."
        }
      }
    },
    r_istihadhah_tamyiz: {
      ibarah: {
        id: "عند فقد العادة يرجع إلى التمييز بشروطه",
        en: "When habit is absent, the ruling returns to tamyiz with its conditions",
        ar: "عند فقد العادة يرجع إلى التمييز بشروطه"
      },
      evidenceText: {
        id: "Tamyiz dipakai bila adat tidak ada, selama perbedaan sifat darah cukup jelas dan memenuhi syarat fiqh.",
        en: "Tamyiz is used when no fixed habit exists, provided the blood characteristics are sufficiently clear and meet fiqh conditions.",
        ar: "يعمل بالتمييز عند عدم العادة إذا ظهر اختلاف صفات الدم ووجدت شروطه الفقهية."
      },
      ai: {
        summary: {
          id: "Kasus cenderung istihadhah, tetapi masih bisa dipilah dengan metode tamyiz.",
          en: "The case leans toward istihada, yet it can still be resolved through tamyiz. This makes careful observation especially valuable, because day-by-day blood qualities may become the decisive factor in determining which days count as menstruation.",
          ar: "الحالة تميل إلى الاستحاضة، لكنها ما زالت تقبل الضبط بطريق التمييز."
        },
        reasoning: {
          id: "Karena tidak ada adat tetap, sistem beralih ke kualitas darah untuk mencari bagian yang paling layak dihukumi haid.",
          en: "Since no fixed habit exists, the system shifts to blood characteristics to identify the part most suitable for menstruation.",
          ar: "لعدم وجود عادة ثابتة، انتقل النظام إلى صفات الدم لتعيين الجزء الأليق بحكم الحيض."
        },
        risk: {
          id: "Risiko muncul bila perbedaan darah sebenarnya samar atau berubah-ubah setiap hari.",
          en: "Risk appears when the difference in blood quality is actually subtle or changes from day to day.",
          ar: "تظهر المخاطرة إذا كان اختلاف صفات الدم خفيا أو متقلبا بين الأيام."
        },
        advice: {
          id: "Catat warna, kekentalan, dan bau secara harian agar tamyiz lebih meyakinkan.",
          en: "Record color, thickness, odor, intensity, and daily changes so tamyiz becomes more reliable. This also helps when the case later needs to be explained to a scholar or a clinician.",
          ar: "يفيد تدوين اللون والثخانة والرائحة يوميا ليكون التمييز أضبط."
        }
      }
    },
    r_istihadhah_mutahayyirah: {
      ibarah: {
        id: "المتحيرة تحتاج إلى مزيد ضبط وسؤال لأهل العلم",
        en: "A confused bleeding case needs tighter regulation and scholarly consultation",
        ar: "المتحيرة تحتاج إلى مزيد ضبط وسؤال لأهل العلم"
      },
      evidenceText: {
        id: "Ketika adat tidak ada dan tamyiz tidak jelas, fiqh menganggap kasus lebih rumit dan butuh panduan lebih rinci.",
        en: "When neither habit nor clear tamyiz exists, fiqh treats the case as more complex and in need of detailed guidance.",
        ar: "إذا فقدت العادة والتمييز الواضح عُدت المسألة أعقد واحتاجت إلى توجيه أخص."
      },
      ai: {
        summary: {
          id: "Ini cabang paling kompleks karena sistem tidak memperoleh penanda adat maupun tamyiz yang cukup kuat.",
          en: "This is the most complex branch because the system lacks both a reliable habit marker and a clear tamyiz signal. From both a fiqh and practical perspective, this is the branch where extra documentation and consultation become most important.",
          ar: "هذا الفرع هو الأعقد لأن النظام لم يجد علامة عادة موثوقة ولا تمييزا واضحا كافيا."
        },
        reasoning: {
          id: "Keputusan akhir pada level lanjutan biasanya memerlukan data tambahan, pola berulang, atau pendampingan ahli.",
          en: "Advanced resolution usually requires more data, repeated patterns, or expert guidance.",
          ar: "الحسم في هذا المستوى يحتاج غالبا إلى بيانات إضافية أو نمط متكرر أو توجيه خبير."
        },
        risk: {
          id: "Risiko salah menghitung hari ibadah dan hari darah cukup tinggi bila diputuskan sendiri tanpa data rinci.",
          en: "The risk of miscounting worship days and bleeding days is fairly high if decided without detailed data.",
          ar: "احتمال الخطأ في عد أيام العبادة والدم مرتفع نسبيا إذا حكم فيه بلا بيانات مفصلة."
        },
        advice: {
          id: "Bawa catatan harian darah selama beberapa siklus saat berkonsultasi agar fatwa lebih presisi.",
          en: "Bring a day-by-day bleeding log across several cycles when consulting so the ruling becomes more precise. Details such as duration, purity intervals, and blood characteristics are often decisive in complex mutahayyirah cases.",
          ar: "خذي معك سجلا يوميا للدم عبر عدة دورات عند الاستشارة ليكون الحكم أدق."
        }
      }
    }
  }
};
