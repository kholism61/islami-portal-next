
(function(){
  function txt(id, en, ar){ return { id, en, ar }; }
  function detail(ibarah, evidenceText, summary, reasoning, risk, advice){
    return {
      ibarah: ibarah,
      evidenceText: evidenceText,
      ai: { summary, reasoning, risk, advice }
    };
  }

  window.SMART_FIQH_CONFIG = {
    meta: {
      pageTitle: txt("Smart Fiqh Shalat Lengkap", "Smart Fiqh Prayer Complete", "الفقه الذكي للصلاة الكامل"),
      heroTitle: txt("Smart Fiqh Shalat Lengkap", "Smart Fiqh Prayer Complete", "الفقه الذكي للصلاة الكامل"),
      heroDesc: txt(
        "Panduan fiqh shalat yang lebih panjang, modern, dan konsisten untuk 3 bahasa. Modul ini mencakup syarat wajib, syarat sah, thaharah, najis, aurat, kiblat, qadha, shalat Jumat, safar, qashar, jamak, imam-makmum, masbuq, rukun, sunnah ab'adh, uzur medis, serta kondisi darurat di kendaraan dengan analisis fiqh dan dalil ringkas.",
        "A longer, more modern, and fully consistent 3-language prayer fiqh guide. This module covers legal obligation, validity conditions, purification, impurities, covering awrah, qibla, make-up prayer, Jumu'ah, travel, qasr, jam', imam-following, latecomer prayer, pillars, emphasized sunnahs, medical excuses, and emergency prayer in vehicles with concise fiqh analysis and proof-texts.",
        "دليل أطول وأحدث وأكثر اتساقا لفقه الصلاة بثلاث لغات. تشمل هذه الوحدة شروط الوجوب وشروط الصحة والطهارة والنجاسة وستر العورة والقبلة والقضاء والجمعة والسفر والقصر والجمع وأحكام الإمام والمأموم والمسبوق والأركان وسنن الأبعاض والأعذار الطبية وصلاة حال الاضطرار في المركبة مع تحليل فقهي ودلائل مختصرة."
      ),
      engineTitle: txt("AI Fiqh Analyzer: Shalat", "AI Fiqh Analyzer: Prayer", "محلل الفقه الذكي: الصلاة"),
      resultTitle: txt("Hasil Hukum", "Ruling Result", "نتيجة الحكم"),
      labelStatus: txt("Status:", "Status:", "الحالة:"),
      labelObligation: txt("Kewajiban:", "Obligation:", "الواجب:"),
      labelExplanation: txt("Penjelasan:", "Explanation:", "الشرح:"),
      labelReference: txt("Landasan:", "Reference:", "الدليل:"),
      resetText: txt("Mulai Ulang", "Restart", "ابدأ من جديد"),
      yesText: txt("Ya", "Yes", "نعم"),
      noText: txt("Tidak", "No", "لا"),
      stepPrefix: txt("Langkah", "Step", "الخطوة"),
      fiqhNoteTitle: txt("Penjelasan Fiqh Tambahan", "Additional Fiqh Notes", "ملاحظات فقهية إضافية"),
      fiqhNoteBody: txt(
        "Modul ini tidak hanya mengejar sah atau batal, tetapi juga membantu membedakan mana yang termasuk syarat, rukun, wajib praktis, sunnah penyempurna, dan rukhsah ketika ada uzur. Untuk kasus yang sangat rinci seperti perbedaan rincian mazhab, shalat di ICU, operasi besar, jamaah Jumat di tempat terbatas, atau akumulasi qadha bertahun-tahun, tetap disarankan merujuk kepada guru fiqh atau mufti yang terpercaya.",
        "This module does not only chase validity or invalidity. It also helps distinguish conditions, pillars, practical obligations, completing sunnahs, and lawful concessions in hardship. For highly specific cases such as madhhab-level disputes, ICU prayer, major surgery, restricted Jumu'ah arrangements, or many years of accumulated missed prayers, consultation with a trusted scholar or mufti remains recommended.",
        "لا تقتصر هذه الوحدة على بيان الصحة والبطلان فقط، بل تعين أيضا على التفريق بين الشرط والركن والواجب العملي والسنة المكملة والرخصة عند وجود العذر. أما المسائل الدقيقة جدا كخلافات المذاهب التفصيلية أو الصلاة في العناية المركزة أو بعد العمليات الكبرى أو الجمعة في الأماكن المقيدة أو تراكم القضاء لسنوات، فينبغي فيها الرجوع إلى أهل الفقه والفتوى."
      ),
      smartMethodTitle: txt("Metode Smart Analyzer", "Smart Analyzer Method", "منهج المحلل الذكي"),
      smartMethodBody: txt(
        "Alur analisis dibangun bertahap agar keputusan shalat tidak tergesa-gesa dan tetap mudah dipahami pengguna awam maupun penuntut ilmu.",
        "The analytical flow is built step by step so prayer rulings are not rushed and remain understandable for both lay users and students of knowledge.",
        "بُني مسار التحليل على مراحل حتى لا يكون الحكم على الصلاة متعجلا، ويبقى مفهوما للعامة وطلاب العلم."
      ),
      smartMethodPoint1: txt(
        "1) Tashawwur: identifikasi jenis kasus, apakah shalat biasa, qadha, Jumat, safar, sakit, atau keadaan darurat.",
        "1) Tashawwur: identify the case type—regular prayer, make-up prayer, Jumu'ah, travel, illness, or emergency.",
        "1) التصور: تحديد نوع الحالة؛ هل هي صلاة معتادة أو قضاء أو جمعة أو سفر أو مرض أو حالة اضطرار."
      ),
      smartMethodPoint2: txt(
        "2) Takyif Fiqhi: cek syarat wajib, syarat sah, rukun, dan rukhsah yang relevan sebelum mengeluarkan hasil.",
        "2) Fiqh classification: check legal obligation, validity conditions, pillars, and any relevant concessions before issuing a result.",
        "2) التكييف الفقهي: فحص شروط الوجوب وشروط الصحة والأركان والرخص المتعلقة قبل استخراج النتيجة."
      ),
      smartMethodPoint3: txt(
        "3) Tanzil: keluarkan status hukum, prioritas tindakan, dalil ringkas, serta catatan risiko bila pengguna salah memahami kasusnya.",
        "3) Tanzil: produce the legal status, action priority, concise proof-text, and a risk note if the user may be misunderstanding the case.",
        "3) التنزيل: استخراج الحكم العملي وأولوية الإجراء والدليل المختصر والتنبيه على المخاطر إن أسيء فهم الحالة."
      ),
      smartFooterCopy: txt(
        "© 2026 Portal Literasi Islam - Smart Fiqh Shalat Lengkap",
        "© 2026 Islamic Literacy Portal - Smart Fiqh Prayer Complete",
        "© 2026 بوابة الثقافة الإسلامية - الفقه الذكي للصلاة الكامل"
      ),
      aiPanelTitle: txt("AI Insight Modern", "Modern AI Insight", "الرؤية الذكية الحديثة"),
      aiSummaryLabel: txt("Ringkasan", "Summary", "الخلاصة"),
      aiReasoningLabel: txt("Analisis", "Analysis", "التحليل"),
      aiRiskLabel: txt("Catatan Risiko", "Risk Note", "تنبيه المخاطر"),
      aiAdviceLabel: txt("Saran Praktis", "Practical Advice", "النصيحة العملية"),
      aiEvidenceLabel: txt("Ibarah Fiqh", "Fiqh Phrase", "العبارة الفقهية"),
      aiSourceLabel: txt("Dalil Ringkas", "Brief Proof", "الدليل المختصر"),
      noteBadge: txt("Panduan Lengkap", "Complete Guide", "دليل كامل"),
      methodBadge: txt("Metode Sistem", "System Method", "منهج النظام")
    },

    flow: {
      start: "q1",
      nodes: {
        q1: {
          text: txt(
            "Apakah Anda termasuk orang yang terkena kewajiban shalat, yaitu Muslim, berakal, dan telah masuk beban taklif menurut keadaan Anda, sehingga pembahasan ini memang berlaku sebagai hukum shalat yang mengikat?",
            "Are you among those legally obligated to pray—namely a Muslim of sound mind who has entered legal accountability—so that the prayer rulings discussed here are actually binding upon you?",
            "هل أنت ممن تجب عليهم الصلاة، بأن تكون مسلما عاقلا وقد دخلت في حد التكليف، بحيث تكون هذه الأحكام لازمة لك فعلا؟"
          ),
          yes: "q2",
          no: "r_not_obligated"
        },
        q2: {
          text: txt(
            "Apakah waktu shalat fardhu yang ingin Anda kerjakan sudah benar-benar masuk, mengingat shalat fardhu tidak sah dikerjakan sebelum waktunya walaupun niat dan gerakannya sudah lengkap?",
            "Has the time of the obligatory prayer you intend to perform actually begun, given that a fard prayer is invalid before its appointed time even if the intention and movements are otherwise complete?",
            "هل دخل وقت الصلاة المفروضة التي تريد أداءها دخولا محققا، مع أن الفرض لا يصح قبل وقته ولو اكتملت النية والأفعال؟"
          ),
          yes: "q3",
          no: "r_wait_time"
        },
        q3: {
          text: txt(
            "Apakah kasus Anda saat ini berkaitan dengan shalat qadha karena sebelumnya ada shalat yang tertinggal akibat tidur, lupa, atau penundaan yang harus segera dibereskan menurut rincian fiqh?",
            "Is your current case related to make-up prayer because an earlier obligatory prayer was missed due to sleep, forgetfulness, or delay that now needs to be addressed according to fiqh detail?",
            "هل تتعلق حالتك الآن بصلاة قضاء، لأن صلاة مفروضة سابقة فاتت بنوم أو نسيان أو تأخير يحتاج إلى تدارك بحسب التفصيل الفقهي؟"
          ),
          yes: "q4",
          no: "q5"
        },
        q4: {
          text: txt(
            "Apakah jika Anda mendahulukan qadha sekarang maka shalat fardhu yang sedang masuk waktunya dikhawatirkan ikut keluar waktu atau rusak tertib yang lebih kuat dalam kondisi Anda?",
            "If you start with the make-up prayer now, do you fear that the currently due prayer will leave its time or that a stronger order of priority would be harmed in your case?",
            "هل إذا بدأت بالقضاء الآن تخشى أن تخرج الصلاة الحاضرة عن وقتها أو يختل الترتيب الأهم في حالتك؟"
          ),
          yes: "r_present_then_qadha",
          no: "r_qadha_first"
        },
        q5: {
          text: txt(
            "Apakah Anda sudah suci dari hadas kecil atau besar dengan wudhu, mandi wajib, atau penggantinya yang sah, sehingga syarat thaharah untuk shalat telah terpenuhi secara benar?",
            "Have you purified yourself from minor or major ritual impurity through wudu, obligatory ghusl, or a valid substitute, so that the condition of ritual purification is correctly fulfilled?",
            "هل تطهرت من الحدث الأصغر أو الأكبر بالوضوء أو الغسل أو ببدله الصحيح، بحيث تحقق شرط الطهارة للصلاة على الوجه الصحيح؟"
          ),
          yes: "q7",
          no: "q6"
        },
        q6: {
          text: txt(
            "Apakah air tersedia, suci, dan aman dipakai tanpa menimbulkan bahaya nyata, luka yang memburuk, infeksi, atau gangguan medis yang masuk akal menurut kondisi Anda?",
            "Is water available, pure, and safe to use without causing real harm, worsening wounds, infection, or medically reasonable danger in your condition?",
            "هل الماء موجود وطهور وآمن الاستعمال من غير ضرر ظاهر أو زيادة جرح أو عدوى أو خطر طبي معتبر في حالتك؟"
          ),
          yes: "r_purify_first",
          no: "r_tayammum"
        },
        q7: {
          text: txt(
            "Apakah badan, pakaian, dan tempat shalat Anda telah bersih dari najis yang dapat dihilangkan menurut kemampuan, sehingga tidak ada penghalang sah dari sisi kebersihan lahiriah?",
            "Are your body, clothing, and prayer place free from removable impurity according to your ability, so that no external impurity blocks the validity of prayer?",
            "هل بدنك وثوبك وموضع صلاتك طاهر من النجاسة التي يمكن إزالتها بحسب الاستطاعة، بحيث لا يبقى مانع ظاهر من صحة الصلاة؟"
          ),
          yes: "q8",
          no: "r_remove_najis"
        },
        q8: {
          text: txt(
            "Apakah aurat yang wajib ditutup dalam shalat telah tertutup dengan baik tanpa terbuka yang membatalkan, sesuai hukum laki-laki atau perempuan dalam mazhab yang Anda ikuti?",
            "Is the required awrah in prayer properly covered without invalidating exposure, according to the law for a man or woman in the school you follow?",
            "هل سُترت العورة الواجبة في الصلاة سترا صحيحا من غير انكشاف مبطل، بحسب حكم الرجل أو المرأة في المذهب المتبع؟"
          ),
          yes: "q9",
          no: "r_cover_awrah"
        },
        q9: {
          text: txt(
            "Apakah Anda mampu menghadap kiblat, atau minimal sudah melakukan ijtihad dan usaha yang layak untuk menentukan arah yang paling kuat ketika kepastian sulit dicapai?",
            "Can you face the qibla, or at least have you made a serious effort to determine the strongest likely direction when certainty is hard to achieve?",
            "هل تستطيع استقبال القبلة، أو على الأقل قد بذلت تحريا معتبرا لتحديد الجهة الأرجح عندما يتعذر اليقين؟"
          ),
          yes: "q10",
          no: "r_qibla_ijtihad"
        },
        q10: {
          text: txt(
            "Apakah shalat yang sedang Anda bahas adalah shalat Jumat, bukan shalat Zuhur biasa, sehingga perlu diperiksa syarat-syarat khusus Jumat terlebih dahulu?",
            "Is the prayer you are currently asking about the Friday prayer rather than an ordinary Dhuhr prayer, so that the special conditions of Jumu'ah must be checked first?",
            "هل الصلاة التي تسأل عنها الآن هي صلاة الجمعة لا صلاة الظهر المعتادة، بحيث يلزم فحص شروط الجمعة الخاصة أولا؟"
          ),
          yes: "q11",
          no: "q12"
        },
        q11: {
          text: txt(
            "Apakah syarat pokok shalat Jumat telah terpenuhi dalam situasi Anda, seperti adanya jamaah yang sah menurut rincian yang diikuti, khutbah, serta keadaan yang membolehkan pelaksanaan Jumat?",
            "Are the core conditions of Jumu'ah fulfilled in your situation, such as a legally valid congregation according to the followed detail, the khutbah, and circumstances that permit the Friday prayer to be held?",
            "هل تحققت الشروط الأساسية لصلاة الجمعة في حالتك، من جماعة معتبرة على التفصيل المتبع وخطبتين وحال يجيز إقامة الجمعة؟"
          ),
          yes: "r_jumuah_valid",
          no: "r_dhuhr_instead"
        },
        q12: {
          text: txt(
            "Apakah Anda mampu berdiri dalam shalat fardhu tanpa bahaya besar, pingsan, atau bertambah parahnya sakit, mengingat berdiri adalah rukun bagi yang mampu?",
            "Can you stand in the obligatory prayer without serious harm, fainting, or worsening illness, given that standing is a pillar for one who is able?",
            "هل تستطيع القيام في الفرض من غير ضرر شديد أو إغماء أو زيادة مرض، مع أن القيام ركن للقادر؟"
          ),
          yes: "q13",
          no: "r_pray_by_ability"
        },
        q13: {
          text: txt(
            "Apakah Anda sedang dalam safar yang memenuhi syarat rukhsah, seperti jarak yang معتبر dan belum berniat menetap dengan niat yang memutus hukum safar?",
            "Are you in travel that fulfills the conditions for legal concession, such as a qualifying distance and no settled intention that would cancel travel status?",
            "هل أنت في سفر مستكمل لشروط الرخصة، كالمسافة المعتبرة وعدم نية إقامة تقطع حكم السفر؟"
          ),
          yes: "q14",
          no: "q15"
        },
        q14: {
          text: txt(
            "Apakah Anda membutuhkan qashar atau jamak karena kondisi safar, kesulitan nyata, atau pengaturan perjalanan yang dibenarkan syariat, bukan sekadar karena ingin serba praktis tanpa alasan yang cukup?",
            "Do you need qasr or jam' because of travel conditions, real hardship, or scheduling recognized by the law, rather than merely wanting convenience without sufficient reason?",
            "هل تحتاج إلى القصر أو الجمع بسبب حال السفر أو المشقة الظاهرة أو ترتيب معتبر شرعا، لا لمجرد طلب السهولة بلا سبب كاف؟"
          ),
          yes: "r_travel_concession",
          no: "q15"
        },
        q15: {
          text: txt(
            "Apakah Anda sedang shalat berjamaah sebagai makmum atau datang terlambat sehingga perlu memperhatikan hukum mengikuti imam, tertib gerakan, dan kemungkinan status masbuq?",
            "Are you praying in congregation as a follower or joining late, so that the rulings of following the imam, movement order, and possible latecomer status must be considered?",
            "هل تصلي جماعة مأموما أو حضرت متأخرا، بحيث يلزم اعتبار أحكام متابعة الإمام وترتيب الأفعال واحتمال كونك مسبوقا؟"
          ),
          yes: "q16",
          no: "q17"
        },
        q16: {
          text: txt(
            "Apakah Anda benar-benar tertinggal satu rakaat atau lebih dari imam sehingga setelah salam imam Anda wajib menyempurnakan rakaat yang belum Anda dapatkan?",
            "Did you actually miss one or more rak'ahs behind the imam so that after the imam’s salam you must complete the rak'ahs you did not catch?",
            "هل فاتتك ركعة أو أكثر مع الإمام فعلا، بحيث يجب عليك بعد سلام الإمام إتمام ما لم تدركه من الركعات؟"
          ),
          yes: "r_masbuq",
          no: "r_follow_imam"
        },
        q17: {
          text: txt(
            "Apakah Anda ragu atau yakin telah meninggalkan rukun shalat seperti takbiratul ihram, Al-Fatihah, ruku, i'tidal, sujud, duduk akhir, atau salam?",
            "Do you suspect or know that you omitted a prayer pillar such as the opening takbir, al-Fatihah, bowing, rising, prostration, final sitting, or salam?",
            "هل تشك أو تتيقن أنك تركت ركنا من أركان الصلاة كتكبيرة الإحرام أو الفاتحة أو الركوع أو الاعتدال أو السجود أو الجلوس الأخير أو السلام؟"
          ),
          yes: "r_repeat_prayer",
          no: "q18"
        },
        q18: {
          text: txt(
            "Apakah yang tertinggal hanya sunnah ab'adh seperti tasyahhud awal, qunut pada tempatnya, atau shalawat tertentu yang jika terlewat tidak membatalkan asal shalat?",
            "Was what you omitted only an emphasized sunnah such as the first tashahhud, qunut in its proper place, or a comparable element whose omission does not invalidate the prayer itself?",
            "هل المتروك مجرد سنة من سنن الأبعاض كالتشهد الأول أو القنوت في موضعه أو ما شابهه مما لا يبطل أصل الصلاة بتركه؟"
          ),
          yes: "r_sujud_sahwi",
          no: "q19"
        },
        q19: {
          text: txt(
            "Apakah Anda berada dalam keadaan darurat seperti di kendaraan yang tidak mungkin berhenti, ancaman bahaya, atau situasi medis/keamanan yang memaksa bentuk shalat berubah dari keadaan normal?",
            "Are you in an emergency such as being in a vehicle that cannot stop, facing danger, or being in a medical/security situation that forces prayer to differ from the normal form?",
            "هل أنت في حال اضطرار، كوجودك في مركبة لا يمكن إيقافها، أو خوف خطر، أو ظرف طبي أو أمني يفرض تغير هيئة الصلاة عن حالها المعتاد؟"
          ),
          yes: "r_vehicle_emergency",
          no: "r_normal_complete"
        }
      },

      results: {
        r_not_obligated: {
          status: txt("Belum terkena kewajiban penuh", "Not yet under full obligation", "لم يثبت الوجوب الكامل"),
          obligation: txt("Pelajari shalat dan siapkan pembiasaan ibadah", "Learn prayer and build worship habit", "يتعلم الصلاة ويتهيأ للعبادة"),
          explanation: txt(
            "Analisis fiqh: kewajiban shalat yang mengikat mensyaratkan adanya Islam, akal, dan taklif. Jika salah satu unsur pokok belum ada, pembicaraan beralih dari beban hukum penuh menjadi pendidikan, pembiasaan, atau pembinaan. Ini penting agar seseorang tidak dibebani dengan redaksi hukum yang salah sasaran.",
            "Fiqh analysis: binding prayer obligation requires Islam, sound mind, and legal accountability. If one of those core elements is absent, the discussion shifts from full legal duty to education, training, and nurturing. This distinction matters so that legal language is not wrongly imposed on the wrong subject.",
            "التحليل الفقهي: الوجوب الملزم للصلاة يشترط الإسلام والعقل والتكليف. فإذا فقد واحد من هذه الأصول انتقل الكلام من الإلزام الكامل إلى التعليم والتعويد والتربية، حتى لا يوضع الحكم في غير محله."
          ),
          reference: txt("Bab syarat wajib shalat", "Chapter on legal obligation of prayer", "باب شروط وجوب الصلاة")
        },
        r_wait_time: {
          status: txt("Belum masuk waktu", "Prayer time has not entered", "لم يدخل الوقت"),
          obligation: txt("Tunggu sampai waktu sah dimulai", "Wait until the valid time begins", "ينتظر حتى يدخل الوقت الصحيح"),
          explanation: txt(
            "Analisis fiqh: waktu adalah syarat sah yang sangat mendasar. Shalat fardhu sebelum waktunya tidak berubah menjadi sah hanya karena niatnya baik atau dilakukan dengan khusyuk. Disiplin waktu justru termasuk tanda penghormatan terhadap ibadah dan struktur syariat.",
            "Fiqh analysis: time is one of the most fundamental validity conditions. An obligatory prayer performed before its time does not become valid merely because the intention was sincere or the prayer felt devotional. Respecting the appointed time is itself part of honoring worship and legal order.",
            "التحليل الفقهي: الوقت من أهم شروط صحة الصلاة. فالصلاة المفروضة قبل وقتها لا تصير صحيحة بمجرد حسن النية أو حضور القلب، بل احترام الوقت نفسه من تعظيم العبادة ونظام الشريعة."
          ),
          reference: txt("QS An-Nisa: 103", "Qur'an 4:103", "النساء: 103")
        },
        r_present_then_qadha: {
          status: txt("Dahulukan shalat حاضر", "Prioritize the current due prayer", "تقدم الصلاة الحاضرة"),
          obligation: txt("Kerjakan shalat yang hampir habis waktunya lalu qadha setelahnya", "Perform the currently due prayer first, then make up the missed one", "تصلي الحاضرة التي يخشى خروج وقتها ثم تقضي بعدها"),
          explanation: txt(
            "Analisis fiqh: qadha itu penting, tetapi menjaga agar shalat yang sedang hadir tidak ikut keluar waktu bisa lebih mendesak dalam kondisi tertentu. Maka tertib ditimbang bersama risiko terlewatnya waktu. Pendekatan ini menjaga dua sisi sekaligus: tidak meremehkan qadha, tetapi juga tidak mengorbankan shalat hadir yang waktunya sempit.",
            "Fiqh analysis: make-up prayer matters greatly, but preserving the currently due prayer from leaving its time can become more urgent in certain cases. Thus sequence is weighed together with the risk of time expiration. This approach protects both sides: it does not belittle make-up prayer, yet it also does not sacrifice the present prayer whose time has become tight.",
            "التحليل الفقهي: القضاء مهم، لكن حفظ الصلاة الحاضرة من خروج الوقت قد يكون أوجب في بعض الأحوال. فيوازن حينئذ بين الترتيب وبين خطر فوات الوقت، محافظة على الصلاة الحاضرة مع عدم إهمال القضاء."
          ),
          reference: txt("Bab qadha dan tertib shalat", "Chapter on make-up prayer and order", "باب القضاء والترتيب في الصلاة")
        },
        r_qadha_first: {
          status: txt("Segera qadha shalat yang tertinggal", "Make up the missed prayer promptly", "يبادر بقضاء الفائتة"),
          obligation: txt("Qadha terlebih dahulu bila tidak mengorbankan waktu الصلاة الحاضرة", "Make up the missed prayer first when that does not sacrifice the current prayer time", "يبدأ بقضاء الفائتة إذا لم يضر بوقت الحاضرة"),
          explanation: txt(
            "Analisis fiqh: shalat yang tertinggal tidak boleh diremehkan. Jika ada ruang aman dan tidak dikhawatirkan shalat yang sekarang keluar waktu, maka qadha dapat didahulukan agar tanggungan ibadah segera berkurang. Ini membentuk adab penting dalam fiqh: utang ibadah tidak dibiasakan ditunda tanpa alasan.",
            "Fiqh analysis: a missed prayer may not be treated lightly. If there is safe room and no fear that the current prayer will leave its time, the make-up prayer may be prioritized so the burden of owed worship is reduced immediately. This cultivates an important legal ethic: debts of worship should not be delayed without cause.",
            "التحليل الفقهي: الصلاة الفائتة لا يستهان بها، فإذا وُجد سعة ولم يُخش فوات الحاضرة أمكن البدء بالقضاء حتى يخف دين العبادة سريعا. وهذا من أدب الشريعة في عدم تعويد النفس على تأخير ما وجب."
          ),
          reference: txt("Hadis: من نسي صلاة فليصلها إذا ذكرها", "Hadith: Whoever forgets a prayer should pray it when remembered", "حديث: من نسي صلاة فليصلها إذا ذكرها")
        },
        r_purify_first: {
          status: txt("Bersuci terlebih dahulu", "Purify first", "يتطهر أولا"),
          obligation: txt("Lakukan wudhu atau mandi wajib sebelum shalat", "Perform wudu or ghusl before prayer", "يتوضأ أو يغتسل قبل الصلاة"),
          explanation: txt(
            "Analisis fiqh: thaharah dari hadas adalah gerbang utama sahnya shalat. Selama air tersedia dan aman, kewajiban kembali kepada wudhu atau mandi sesuai kebutuhan. Dari sisi pendidikan ibadah, ini menanamkan bahwa persiapan sebelum shalat bukan formalitas, tetapi bagian dari penghormatan terhadap perjumpaan dengan Allah.",
            "Fiqh analysis: purification from ritual impurity is one of the primary gates to prayer validity. As long as water is available and safe, the duty returns to wudu or ghusl as needed. Spiritually, this teaches that preparation before prayer is not a formality but part of honoring one’s meeting with Allah.",
            "التحليل الفقهي: الطهارة من الحدث من أعظم أبواب صحة الصلاة، فمع وجود الماء وأمن الضرر يجب الوضوء أو الغسل بحسب الحال. وفي ذلك تربية على أن التهيؤ للصلاة ليس شكلا فارغا، بل هو من تعظيم الوقوف بين يدي الله."
          ),
          reference: txt("QS Al-Ma'idah: 6", "Qur'an 5:6", "المائدة: 6")
        },
        r_tayammum: {
          status: txt("Boleh tayammum", "Tayammum is allowed", "يجوز التيمم"),
          obligation: txt("Bertayammum lalu shalat tepat waktu", "Perform tayammum and pray on time", "يتيمم ثم يصلي في الوقت"),
          explanation: txt(
            "Analisis fiqh: ketika air tidak ada atau penggunaannya membahayakan, syariat tidak menutup pintu ibadah. Tayammum adalah pengganti yang sah agar waktu shalat tetap terjaga. Dalam pendekatan modern, ini sangat relevan untuk pasien luka, risiko infeksi, keterbatasan perawatan, atau kondisi lapangan yang menyulitkan penggunaan air.",
            "Fiqh analysis: when water is unavailable or its use is harmful, the law does not close the door of worship. Tayammum becomes a valid substitute so that prayer time is still preserved. In a modern setting this is highly relevant for wound care, infection risk, treatment limitations, or field conditions that make water use unsafe.",
            "التحليل الفقهي: عند فقد الماء أو ضرر استعماله لا تُغلق الشريعة باب العبادة، بل يشرع التيمم بديلا صحيحا محافظة على وقت الصلاة. وهذا ظاهر الأهمية في الجروح وخطر العدوى والقيود العلاجية والظروف الميدانية."
          ),
          reference: txt("QS Al-Ma'idah: 6 dan kaidah الضرر يزال", "Qur'an 5:6 and the maxim 'harm must be removed'", "المائدة: 6 وقاعدة الضرر يزال")
        },
        r_remove_najis: {
          status: txt("Hilangkan najis terlebih dahulu", "Remove impurity first", "تزال النجاسة أولا"),
          obligation: txt("Sucikan badan, pakaian, atau tempat shalat", "Purify the body, clothes, or prayer place", "يطهر البدن أو الثوب أو مكان الصلاة"),
          explanation: txt(
            "Analisis fiqh: najis yang bisa dihilangkan tidak boleh dibiarkan padahal mampu membersihkannya. Kesucian lahiriah menjadi bagian dari kehormatan shalat. Namun jika ada keadaan sangat terbatas dan penghilangan najis tidak memungkinkan kecuali dengan kesulitan luar biasa, rincian uzur perlu dilihat lebih teliti.",
            "Fiqh analysis: removable impurity may not be left in place when one is able to cleanse it. Outward purity forms part of the honor of prayer. Yet if there is a highly constrained situation and impurity cannot be removed except with extraordinary hardship, the excuse must be reviewed with more detail.",
            "التحليل الفقهي: النجاسة التي يمكن إزالتها لا تترك مع القدرة، لأن الطهارة الظاهرة من تعظيم الصلاة. لكن إذا وُجد عذر شديد وتعذر الإزالة إلا بمشقة خارجة عن المعتاد، فالتفصيل يرجع إلى باب الأعذار."
          ),
          reference: txt("Bab thaharah dan إزالة النجاسة", "Chapter on purification and impurity removal", "باب الطهارة وإزالة النجاسة")
        },
        r_cover_awrah: {
          status: txt("Tutup aurat dengan benar", "Cover the awrah correctly", "تستر العورة على الوجه الصحيح"),
          obligation: txt("Perbaiki pakaian atau penutup sebelum shalat", "Correct the clothing or covering before prayer", "يصلح اللباس أو الستر قبل الصلاة"),
          explanation: txt(
            "Analisis fiqh: menutup aurat adalah syarat sah yang tidak boleh diremehkan. Banyak orang fokus pada bacaan, tetapi lupa bahwa sahnya shalat juga terkait keadaan badan dan pakaian. Karena itu, memastikan penutupan aurat sebelum takbiratul ihram adalah langkah praktis yang sangat penting.",
            "Fiqh analysis: covering the awrah is a validity condition that cannot be taken lightly. Many people focus on recitation while forgetting that prayer validity also depends on bodily and clothing conditions. Therefore, checking awrah coverage before the opening takbir is a very important practical step.",
            "التحليل الفقهي: ستر العورة شرط صحة لا يجوز التساهل فيه. فكثير من الناس يعتني بالقراءة وينسى أن صحة الصلاة تتعلق أيضا بحال البدن واللباس، ولذا كان التأكد من الستر قبل التكبير خطوة عملية بالغة الأهمية."
          ),
          reference: txt("QS Al-A'raf: 31 dan bab ستر العورة", "Qur'an 7:31 and the chapter on covering awrah", "الأعراف: 31 وباب ستر العورة")
        },
        r_qibla_ijtihad: {
          status: txt("Shalat dengan ijtihad arah kiblat", "Pray according to best qibla effort", "يصلي باجتهاد جهة القبلة"),
          obligation: txt("Lakukan usaha terbaik lalu shalat", "Make the best effort, then pray", "يتحرى ثم يصلي"),
          explanation: txt(
            "Analisis fiqh: kewajiban asal adalah menghadap kiblat. Namun ketika kepastian tidak mudah dicapai, syariat memerintahkan usaha yang layak, bukan kemustahilan. Ini mengajarkan keseimbangan antara ketelitian dan kemudahan: arah dicari sebaik mungkin, lalu ibadah tetap dijalankan tanpa was-was berlebihan.",
            "Fiqh analysis: the original duty is to face the qibla. Yet when certainty cannot be easily reached, the law demands reasonable effort, not impossibility. This teaches a balance between precision and ease: determine direction as best as possible, then proceed without obsessive doubt.",
            "التحليل الفقهي: الأصل وجوب استقبال القبلة، لكن عند تعذر اليقين لا تكلف الشريعة بالمحال، بل تأمر بتحر معتبر. وفي هذا جمع بين طلب الدقة ورفع الحرج، فيتحرى المصلي ثم يمضي ولا يفتح على نفسه باب الوسواس."
          ),
          reference: txt("Bab القبلة في فقه الصلاة", "Chapter on qibla in prayer jurisprudence", "باب القبلة في فقه الصلاة")
        },
        r_jumuah_valid: {
          status: txt("Shalat Jumat berlaku", "Jumu'ah applies", "تنعقد صلاة الجمعة"),
          obligation: txt("Tunaikan Jumat dengan syaratnya", "Perform Jumu'ah with its conditions", "تؤدى الجمعة بشروطها"),
          explanation: txt(
            "Analisis fiqh: Jumat memiliki syarat tambahan dibanding Zuhur biasa, seperti unsur jamaah dan khutbah. Bila syarat-syaratnya terpenuhi, maka ibadah diarahkan kepada Jumat, bukan kembali ke Zuhur biasa. Ini menunjukkan bahwa fiqh shalat tidak hanya menilai gerakan, tetapi juga konteks sosial dan institusional ibadah.",
            "Fiqh analysis: Friday prayer carries additional conditions beyond ordinary Dhuhr, including congregation and khutbah. When those conditions are fulfilled, the duty is directed to Jumu'ah rather than reverting to ordinary Dhuhr. This shows that prayer law concerns not only movements but also the social and institutional context of worship.",
            "التحليل الفقهي: الجمعة لها شروط زائدة على الظهر المعتاد، كالجماعة والخطبة، فإذا تحققت توجه الواجب إلى الجمعة لا إلى الظهر. وفي هذا بيان أن فقه الصلاة لا ينظر إلى الأفعال فقط، بل إلى السياق التعبدي والاجتماعي أيضا."
          ),
          reference: txt("QS Al-Jumu'ah: 9 dan bab صلاة الجمعة", "Qur'an 62:9 and the chapter on Friday prayer", "الجمعة: 9 وباب صلاة الجمعة")
        },
        r_dhuhr_instead: {
          status: txt("Kembali ke shalat Zuhur", "Revert to Dhuhr prayer", "يرجع إلى صلاة الظهر"),
          obligation: txt("Kerjakan Zuhur bila Jumat tidak terpenuhi", "Perform Dhuhr if Jumu'ah conditions are not fulfilled", "يصلي الظهر إذا لم تتحقق شروط الجمعة"),
          explanation: txt(
            "Analisis fiqh: tidak setiap situasi yang disebut 'Jumat' otomatis sah sebagai Jumat. Bila syarat pokoknya tidak terpenuhi, kewajiban tidak gugur, tetapi kembali kepada Zuhur. Ini penting agar semangat berjamaah tidak membuat seseorang mengira sebuah bentuk ibadah sah padahal fondasinya belum lengkap.",
            "Fiqh analysis: not every gathering labeled 'Friday' is automatically a valid Jumu'ah prayer. If its core conditions are not met, the duty does not disappear; it returns to Dhuhr. This is important so that enthusiasm for congregational worship does not lead someone to assume validity without the required foundation.",
            "التحليل الفقهي: ليس كل ما سمي جمعة يكون جمعة صحيحة، فإذا لم تتحقق شروطها الأساسية لم يسقط الواجب، بل عاد إلى الظهر. وهذا مهم حتى لا يحمل الحماس للجماعة على توهم الصحة بلا أساس مكتمل."
          ),
          reference: txt("Bab syarat Jumat dan بدلية الظهر", "Chapter on Jumu'ah conditions and Dhuhr substitution", "باب شروط الجمعة وبدلية الظهر")
        },
        r_pray_by_ability: {
          status: txt("Shalat sesuai kemampuan", "Pray according to ability", "يصلي بحسب الاستطاعة"),
          obligation: txt("Boleh duduk, berbaring, atau isyarat sesuai uzur", "One may sit, lie down, or use gestures according to the excuse", "يجوز أن يصلي قاعدا أو مضطجعا أو بالإيماء بحسب العذر"),
          explanation: txt(
            "Analisis fiqh: ketidakmampuan berdiri tidak menggugurkan shalat. Yang berubah adalah bentuk pelaksanaannya. Dalam konteks medis modern, ini sangat penting untuk pasien pascaoperasi, gangguan sendi, kelelahan ekstrem, atau kondisi yang berisiko jika dipaksa berdiri. Syariat menjaga ibadah tanpa menabrak batas keselamatan tubuh.",
            "Fiqh analysis: inability to stand does not cancel prayer. What changes is its mode of performance. In modern medical contexts this is crucial for post-operative patients, joint disorders, extreme fatigue, or any condition where standing is unsafe. The law preserves worship without violating bodily safety.",
            "التحليل الفقهي: العجز عن القيام لا يسقط الصلاة، وإنما يغير صورتها. وهذا مهم جدا في السياق الطبي المعاصر كحال ما بعد الجراحة أو أمراض المفاصل أو الإرهاق الشديد أو كل حالة يضر معها القيام. فالشريعة تحفظ العبادة من غير إهدار لسلامة البدن."
          ),
          reference: txt("Hadis عمران بن حصين", "Hadith of Imran ibn Husayn", "حديث عمران بن حصين")
        },
        r_travel_concession: {
          status: txt("Rukhsah safar berlaku", "Travel concession applies", "تجري رخصة السفر"),
          obligation: txt("Boleh qashar atau jamak sesuai syaratnya", "You may shorten or combine prayers under the legal conditions", "يجوز القصر أو الجمع بشروطه"),
          explanation: txt(
            "Analisis fiqh: musafir yang memenuhi syarat diberi keluasan dalam bentuk qashar dan pada kondisi tertentu jamak. Tujuannya bukan meremehkan shalat, tetapi menjaga kesinambungan ibadah dalam perjalanan. Yang penting ialah memastikan safarnya memang معتبر dan rukhsah dipakai pada batas yang dibenarkan, bukan dijadikan kebiasaan tanpa kebutuhan.",
            "Fiqh analysis: a traveler who meets the conditions is granted room for qasr and, in certain circumstances, jam'. The goal is not to cheapen prayer but to preserve continuity of worship while traveling. What matters is that the travel is legally recognized and that the concession is used within valid limits rather than as a habit without need.",
            "التحليل الفقهي: المسافر المستوفي للشروط وسع له في القصر، وفي بعض الأحوال في الجمع، وليس المقصود التخفف من شأن الصلاة، بل حفظ دوامها في حال السفر. والمهم أن يكون السفر معتبرا شرعا وأن تستعمل الرخصة في حدودها الصحيحة."
          ),
          reference: txt("QS An-Nisa: 101 dan bab صلاة المسافر", "Qur'an 4:101 and the chapter on traveler prayer", "النساء: 101 وباب صلاة المسافر")
        },
        r_follow_imam: {
          status: txt("Ikuti imam dengan tertib", "Follow the imam in proper order", "يتابع الإمام على الوجه الصحيح"),
          obligation: txt("Jangan mendahului imam dan jaga sinkron gerakan", "Do not precede the imam and keep movement order", "لا يسبق الإمام ويحفظ ترتيب المتابعة"),
          explanation: txt(
            "Analisis fiqh: berjamaah memiliki adab dan aturan sendiri. Makmum tidak dibenarkan mendahului imam atau memutus keteraturan gerakan tanpa alasan. Fiqh jamaah melatih disiplin, kerendahan hati, dan keteraturan ibadah bersama, bukan sekadar banyaknya orang yang berkumpul.",
            "Fiqh analysis: congregational prayer has its own etiquette and rules. A follower may not go ahead of the imam or break the ordered sequence without reason. The fiqh of congregation trains discipline, humility, and coordinated worship—not merely physical gathering.",
            "التحليل الفقهي: للجماعة آداب وأحكام تخصها، فلا يشرع للمأموم أن يسبق إمامه أو يخل بنظام المتابعة بغير سبب. وفقه الجماعة يربي على الانضباط والتواضع وانتظام العبادة المشتركة، لا على مجرد كثرة المجتمعين."
          ),
          reference: txt("Hadis: إنما جعل الإمام ليؤتم به", "Hadith: The imam is appointed to be followed", "حديث: إنما جعل الإمام ليؤتم به")
        },
        r_masbuq: {
          status: txt("Anda berstatus masbuq", "You are a latecomer follower", "أنت مسبوق"),
          obligation: txt("Ikuti imam lalu sempurnakan rakaat yang tertinggal setelah salam", "Follow the imam, then complete the missed rak'ahs after his salam", "يتابع الإمام ثم يتم ما فاته بعد سلامه"),
          explanation: txt(
            "Analisis fiqh: masbuq tidak memulai shalat sendirian di tengah jamaah tanpa aturan. Ia masuk mengikuti imam pada keadaan yang didapatkannya, lalu menyempurnakan rakaat yang tertinggal setelah imam salam. Di sinilah penting memahami hitungan rakaat dan posisi tasyahhud agar tidak bingung saat melanjutkan.",
            "Fiqh analysis: a latecomer does not independently construct a separate prayer in the middle of congregation without order. He joins the imam in the state he finds him and then completes the missed rak'ahs after the imam's salam. This is why understanding rak'ah counting and tashahhud placement matters.",
            "التحليل الفقهي: المسبوق لا يستأنف صلاة مستقلة وسط الجماعة على غير ترتيب، بل يدخل مع الإمام على الحال التي يجده عليها ثم يقضي ما فاته بعد سلامه. وهنا تظهر أهمية فهم عدد الركعات ومواضع التشهد حتى لا يقع الاضطراب."
          ),
          reference: txt("Bab أحكام المسبوق", "Chapter on rulings of the latecomer in prayer", "باب أحكام المسبوق")
        },
        r_repeat_prayer: {
          status: txt("Shalat perlu diulang atau dikembalikan ke rukunnya", "The prayer must be repeated or returned to the omitted pillar", "تحتاج الصلاة إلى إعادة أو عود إلى الركن"),
          obligation: txt("Perbaiki rukun yang hilang; bila tidak mungkin, ulangi shalat", "Restore the omitted pillar; if that is no longer possible, repeat the prayer", "يستدرك الركن المتروك فإن تعذر أعاد الصلاة"),
          explanation: txt(
            "Analisis fiqh: rukun shalat bukan hiasan tambahan, tetapi struktur inti yang membangun hakikat shalat. Karena itu, kehilangan rukun tidak cukup ditutup dengan sujud sahwi saja. Pendidikan fiqh pada titik ini sangat penting agar orang mampu membedakan mana kekurangan inti dan mana kekurangan penyempurna.",
            "Fiqh analysis: the pillars of prayer are not decorative extras; they are the core structure that constitutes the prayer itself. Therefore, the loss of a pillar is not patched merely by sujud sahwi. Fiqh education at this point is crucial so people can distinguish between essential deficiency and supplementary deficiency.",
            "التحليل الفقهي: أركان الصلاة ليست زيادات شكلية، بل هي البناء الأصلي الذي تقوم به حقيقة الصلاة، ولذلك لا يجبر ترك الركن بمجرد سجود السهو. وهنا تظهر أهمية التعليم الفقهي في التفريق بين الخلل الأصلي والخلل التكميلي."
          ),
          reference: txt("Hadis المسيء صلاته dan bab أركان الصلاة", "Hadith of the man who prayed badly and the chapter on prayer pillars", "حديث المسيء صلاته وباب أركان الصلاة")
        },
        r_sujud_sahwi: {
          status: txt("Disunnahkan sujud sahwi", "Sujud sahwi is recommended", "يسن سجود السهو"),
          obligation: txt("Lakukan sujud sahwi untuk kekurangan sunnah ab'adh", "Perform sujud sahwi for omission of emphasized sunnahs", "يسجد للسهو عند فوات سنة من سنن الأبعاض"),
          explanation: txt(
            "Analisis fiqh: jika yang tertinggal hanyalah sunnah ab'adh, shalat pada asalnya tetap sah, namun disunnahkan sujud sahwi sebagai bentuk penutup kekurangan. Ini menunjukkan keluwesan syariat: bukan semua kelalaian di dalam shalat berujung pada pengulangan total. Ada tingkat-tingkat hukum yang perlu dibedakan dengan baik.",
            "Fiqh analysis: if what was omitted was only an emphasized sunnah, the prayer remains valid in principle, yet sujud sahwi is recommended to mend the deficiency. This demonstrates the flexibility of the law: not every lapse in prayer leads to a full repetition. Different levels of legal effect must be distinguished carefully.",
            "التحليل الفقهي: إذا كان المتروك سنة من سنن الأبعاض فالأصل أن الصلاة صحيحة، ويشرع سجود السهو جبرا للنقص. وفي هذا بيان ليسر الشريعة، فليس كل خلل داخل الصلاة يقتضي الإعادة الكاملة، بل تختلف الآثار باختلاف رتبة المتروك."
          ),
          reference: txt("Hadis-hadis sujud sahwi", "Hadiths on sujud sahwi", "أحاديث سجود السهو")
        },
        r_vehicle_emergency: {
          status: txt("Shalat darurat dengan penyesuaian", "Emergency prayer with adaptation", "صلاة اضطرار مع التكيف"),
          obligation: txt("Kerjakan semampunya sambil menjaga waktu dan keselamatan", "Pray as able while preserving time and safety", "يصلي بحسب وسعه مع حفظ الوقت والسلامة"),
          explanation: txt(
            "Analisis fiqh: dalam keadaan darurat, bentuk shalat dapat menyesuaikan kemampuan nyata, termasuk di kendaraan yang sulit berhenti, situasi keamanan, atau kondisi medis yang membatasi gerakan. Prinsipnya bukan mempermudah tanpa aturan, tetapi menjaga dua maqasid sekaligus: tidak meninggalkan shalat dan tidak menjerumuskan diri kepada bahaya yang berat.",
            "Fiqh analysis: in emergencies, the form of prayer may adapt to actual ability, including while in a vehicle that cannot stop, in a security threat, or in a medical state limiting movement. The principle is not unregulated convenience but preserving two aims together: not abandoning prayer and not exposing oneself to severe harm.",
            "التحليل الفقهي: عند الاضطرار قد تتكيف هيئة الصلاة بحسب القدرة الواقعية، كحال المركبة التي يتعذر إيقافها أو ظرف الخوف أو المانع الطبي. والمقصود ليس التسهيل المنفلت، بل حفظ مقصدين معا: عدم ترك الصلاة وعدم تعريض النفس للضرر الشديد."
          ),
          reference: txt("Kaidah المشقة تجلب التيسير dan الضرورات تقدر بقدرها", "Maxims: hardship brings facilitation, and necessity is measured by its extent", "قاعدتا المشقة تجلب التيسير والضرورات تقدر بقدرها")
        },
        r_normal_complete: {
          status: txt("Shalat sah pada hukum asal", "Prayer is valid on its original ruling", "الصلاة صحيحة على حكمها الأصلي"),
          obligation: txt("Kerjakan dengan rukun, tuma'ninah, dan sunnah penyempurna", "Perform it with pillars, tranquility, and completing sunnahs", "يؤديها بالأركان والطمأنينة والسنن المكملة"),
          explanation: txt(
            "Analisis fiqh: ketika syarat wajib, syarat sah, dan rukun pokok telah terpenuhi, sementara tidak ada uzur yang mengubah bentuk pelaksanaan, maka shalat berjalan di atas hukum asalnya. Namun kesempurnaan shalat tidak berhenti pada sah-batal. Ia juga menuntut thuma'ninah, khusyuk, menjaga bacaan, adab jamaah bila ada, serta perhatian pada sunnah yang menyempurnakan.",
            "Fiqh analysis: when legal obligation, validity conditions, and core pillars are fulfilled, and no excuse changes the form of performance, prayer proceeds on its original ruling. Yet prayer excellence does not stop at validity versus invalidity. It also requires tranquility, humility, sound recitation, congregational etiquette when relevant, and care for the sunnahs that beautify completion.",
            "التحليل الفقهي: إذا توفرت شروط الوجوب والصحة والأركان الأصلية، ولم يوجد عذر يغير هيئة الأداء، جرت الصلاة على حكمها الأصلي. لكن كمال الصلاة لا يقف عند الصحة والبطلان، بل يشمل الطمأنينة والخشوع وحسن القراءة وآداب الجماعة والعناية بالسنن المكملة."
          ),
          reference: txt("QS Al-Mu'minun: 1-2 dan hadis المسيء صلاته", "Qur'an 23:1-2 and the hadith of the man who prayed badly", "المؤمنون: 1-2 وحديث المسيء صلاته")
        }
      }
    },

    resultDetails: {
      r_not_obligated: detail(
        txt("إذا انتفى التكليف انتفى الإلزام الكامل", "If legal accountability is absent, full obligation is absent", "إذا انتفى التكليف انتفى الإلزام الكامل"),
        txt("Prinsip umum taklif dalam usul fiqh.", "General principle of legal accountability in usul al-fiqh.", "الأصل العام في باب التكليف."),
        txt("Belum masuk pembebanan penuh.", "Full legal burden does not yet apply.", "لم يثبت التكليف الكامل بعد."),
        txt("Fokus utamanya pendidikan dan pembiasaan, bukan membebani dengan tuntutan yang belum mengikat.", "The priority is instruction and training, not imposing a duty that is not yet fully binding.", "المقصود هنا التعليم والتعويد لا الإلزام الكامل."),
        txt("Risikonya adalah salah memahami siapa yang benar-benar terkena hukum wajib.", "The risk is misunderstanding who is actually bound by obligatory rulings.", "الخطر هو الخلط بين من لزمه الحكم ومن لم يلزمه."),
        txt("Pelajari dasar-dasar shalat, syarat, dan adabnya secara bertahap.", "Learn the basics of prayer, its conditions, and etiquette step by step.", "يتعلم أساسيات الصلاة وشروطها وآدابها بالتدرج.")
      ),
      r_wait_time: detail(
        txt("الوقت شرط صحة", "Time is a condition of validity", "الوقت شرط صحة"),
        txt("QS An-Nisa: 103 menegaskan bahwa shalat memiliki waktu yang ditetapkan.", "Qur'an 4:103 affirms that prayers have appointed times.", "النساء: 103 تدل على أن للصلاة أوقاتا محددة."),
        txt("Shalat belum sah sebelum waktunya.", "The prayer is not valid before its time.", "الصلاة لا تصح قبل وقتها."),
        txt("Masalah utamanya bukan niat, tetapi syarat waktu yang belum terpenuhi.", "The issue is not intention but the unfulfilled condition of time.", "المشكلة ليست في النية بل في عدم تحقق شرط الوقت."),
        txt("Risikonya adalah merasa sudah shalat padahal ibadah belum sah.", "The risk is assuming the prayer was done while it remains invalid.", "الخطر هو اعتقاد أداء الصلاة مع عدم صحتها."),
        txt("Tunggu masuk waktu dengan yakin atau pakai jadwal tepercaya.", "Wait for the time with certainty or use a trustworthy schedule.", "ينتظر حتى يتيقن الوقت أو يعتمد تقويما موثوقا.")
      ),
      r_present_then_qadha: detail(
        txt("الحاضرة إذا ضاق وقتها قدمت", "The present prayer is prioritized when its time becomes tight", "الحاضرة إذا ضاق وقتها قدمت"),
        txt("Dalil qadha dan penjagaan waktu digabung dalam penilaian prioritas.", "Texts on make-up prayer and guarding the time are combined in priority assessment.", "يُجمع بين أدلة القضاء وحفظ الوقت في ترتيب الأولوية."),
        txt("Dahulukan shalat yang hampir habis waktunya.", "Prioritize the prayer whose time is about to expire.", "تقدم الصلاة التي يوشك وقتها على الانتهاء."),
        txt("Ini menjaga agar tidak lahir dua masalah sekaligus: fa'itah lama dan hadir yang ikut terlewat.", "This prevents creating two problems at once: an old missed prayer and a present one that also becomes missed.", "هذا يمنع اجتماع فائتتين: قديمة وحاضرة."),
        txt("Risikonya adalah salah urut hingga صلاة الحاضر keluar وقتها.", "The risk is misordering things until the current prayer leaves its time.", "الخطر أن يختل الترتيب حتى تخرج الحاضرة عن وقتها."),
        txt("Segera qadha setelah selesai shalat hadir.", "Make up the missed prayer immediately after the present one.", "يبادر بالقضاء بعد الفراغ من الحاضرة.")
      ),
      r_qadha_first: detail(
        txt("الفائتة دين في الذمة", "A missed prayer is a debt upon the soul", "الفائتة دين في الذمة"),
        txt("Hadith on making up forgotten prayers establishes prompt recovery.", "حديث قضاء الفائتة عند التذكر يدل على المبادرة.", "الحديث يدل على المبادرة بقضاء الفائتة عند التذكر."),
        txt("Qadha segera lebih hati-hati.", "Prompt make-up is the safer course.", "المبادرة بالقضاء أحوط."),
        txt("Selama shalat hadir tidak terancam keluar waktu, utang ibadah layak segera dibereskan.", "As long as the present prayer is not at risk of leaving its time, the debt of worship should be settled quickly.", "ما لم يخف خروج وقت الحاضرة فالمبادرة بالقضاء أولى."),
        txt("Risikonya adalah menunda qadha terus-menerus tanpa alasan.", "The risk is endlessly delaying make-up prayer without reason.", "الخطر هو التسويف في القضاء بلا عذر."),
        txt("Buat catatan shalat yang tertinggal agar tertib pelunasannya.", "Keep a record of missed prayers to settle them in an orderly way.", "يضع جدولا للفوائت حتى يقضيها بانتظام.")
      ),
      r_purify_first: detail(
        txt("لا صلاة بغير طهور", "No prayer without purification", "لا صلاة بغير طهور"),
        txt("Purification is explicitly established in Qur'an 5:6 and hadith.", "الطهارة ثابتة بالنص في المائدة وحديث الطهور.", "الطهارة ثابتة بنص المائدة وحديث الطهور."),
        txt("Thaharah adalah fondasi shalat.", "Purification is foundational to prayer.", "الطهارة أساس الصلاة."),
        txt("Tanpa wudhu atau ghusl yang sah, shalat tidak berdiri di atas fondasi yang benar.", "Without valid wudu or ghusl, the prayer lacks a valid foundation.", "بدون وضوء أو غسل صحيح لا تقوم الصلاة على أصل صحيح."),
        txt("Risikonya adalah sibuk pada gerakan sementara syarat utama belum ada.", "The risk is focusing on movements while a primary condition is absent.", "الخطر هو الاشتغال بالأفعال مع فقد شرط أصلي."),
        txt("Periksa hadas, najis, dan niat bersuci sebelum takbir.", "Check impurity, cleanliness, and purification intention before takbir.", "يتحقق من الحدث والنجاسة وقصد الطهارة قبل التكبير.")
      ),
      r_tayammum: detail(
        txt("البدل يقوم مقام المبدل عند العذر", "A valid substitute takes the place of the original in hardship", "البدل يقوم مقام المبدل عند العذر"),
        txt("Qur'an 5:6 legislates tayammum when water is absent or harmful.", "الآية في المائدة شرعت التيمم عند فقد الماء أو الضرر.", "آية المائدة شرعت التيمم عند فقد الماء أو الضرر."),
        txt("Rukhsah tayammum menjaga ibadah dan keselamatan.", "Tayammum protects both worship and safety.", "رخصة التيمم تحفظ العبادة والسلامة."),
        txt("Ini solusi fiqh yang serius, bukan opsi kedua yang remeh.", "This is a serious legal solution, not a trivial second option.", "هذا حل فقهي معتبر لا خيار شكلي."),
        txt("Risikonya adalah menolak rukhsah padahal الحاجة معتبرة أو التوسع فيها بلا سبب.", "The risk is either refusing the concession when needed or overusing it without cause.", "الخطر هو ترك الرخصة مع الحاجة أو التوسع فيها بلا سبب."),
        txt("Gunakan debu suci atau media tayammum yang sah menurut rincian mazhab Anda.", "Use valid clean earth or tayammum medium according to your school’s detail.", "يستعمل صعيدا طاهرا أو ما يصح التيمم به على تفصيل المذهب.")
      ),
      r_remove_najis: detail(
        txt("إزالة النجاسة شرط معتبر", "Removing impurity is a recognized condition", "إزالة النجاسة شرط معتبر"),
        txt("Classical fiqh treats bodily, clothing, and place purity as part of valid prayer.", "الفقه يربط طهارة البدن والثوب والمكان بصحة الصلاة.", "الفقه يربط صحة الصلاة بطهارة البدن والثوب والمكان."),
        txt("Najis yang mampu dibersihkan tidak boleh diabaikan.", "Removable impurity should not be ignored.", "النجاسة القابلة للإزالة لا تهمل."),
        txt("Langkah sederhana membersihkan najis sering kali lebih penting daripada memperindah suara bacaan.", "Sometimes the simple act of cleaning impurity is more urgent than beautifying recitation.", "قد تكون إزالة النجاسة أسبق من تحسين القراءة."),
        txt("Risikonya adalah mengira ibadah sah padahal penghalang lahiriahnya masih ada.", "The risk is assuming validity while an outward blocker remains.", "الخطر هو توهم الصحة مع بقاء المانع الظاهر."),
        txt("Siapkan pakaian dan tempat shalat yang bersih jika Anda sering berpindah tempat.", "Prepare clean clothing and a clean prayer space, especially if you move often.", "يهيئ ثوبا ومكانا طاهرين خاصة عند كثرة التنقل.")
      ),
      r_cover_awrah: detail(
        txt("ستر العورة شرط", "Covering the awrah is a condition", "ستر العورة شرط"),
        txt("The jurists classify proper covering as a validity condition for prayer.", "الفقهاء يعدون ستر العورة من شروط صحة الصلاة.", "الفقهاء يعدون ستر العورة من شروط صحة الصلاة."),
        txt("Perbaiki penutupan aurat sebelum memulai.", "Correct the covering before beginning.", "يصحح الستر قبل البدء."),
        txt("Ini bagian dari adab dan syarat sekaligus.", "It is both etiquette and legal condition.", "وهو من الأدب والشرط معا."),
        txt("Risikonya adalah fokus pada bacaan tetapi lalai pada syarat awal.", "The risk is focusing on recitation while neglecting a preliminary condition.", "الخطر هو الاشتغال بالقراءة مع إهمال الشرط الأول."),
        txt("Periksa pakaian longgar, kaus kaki, mukena, atau penutup kepala sebelum takbir.", "Check garments, socks, prayer garments, or head covering before takbir.", "يتحقق من اللباس والغطاء قبل التكبير.")
      ),
      r_qibla_ijtihad: detail(
        txt("الاجتهاد يقوم مقام اليقين عند تعذره", "Reasoned effort substitutes for certainty when certainty is unavailable", "الاجتهاد يقوم مقام اليقين عند تعذره"),
        txt("The law requires best effort toward qibla when certainty is unavailable.", "تطلب الشريعة التحري للقبلة عند تعذر اليقين.", "تطلب الشريعة التحري للقبلة عند تعذر اليقين."),
        txt("Ijtihad yang sungguh-sungguh sudah cukup untuk melanjutkan ibadah.", "Sincere effort is enough to proceed with worship.", "التحري الجاد يكفي للمضي في العبادة."),
        txt("Syariat tidak membangun beban di atas kemustahilan.", "The law does not build duty upon impossibility.", "الشريعة لا تبني التكليف على المستحيل."),
        txt("Risikonya adalah waswas berkepanjangan yang justru menunda الصلاة.", "The risk is obsessive doubt that keeps delaying prayer.", "الخطر هو الوسواس الذي يؤخر الصلاة."),
        txt("Pakai kompas, aplikasi, atau petunjuk setempat yang tepercaya.", "Use a compass, a trusted app, or reliable local indicators.", "يستعين بالبوصلة أو التطبيق أو الأمارات الموثوقة.")
      ),
      r_jumuah_valid: detail(
        txt("إذا صحت الجمعة سقط الظهر", "When Jumu'ah is valid, Dhuhr falls away", "إذا صحت الجمعة سقط الظهر"),
        txt("Qur'an 62:9 and fiqh chapters on Jumu'ah support the distinct obligation of Friday prayer.", "الجمعة:9 وأبواب الجمعة تدل على تميز حكمها.", "الجمعة:9 وأبواب الجمعة تدل على تميز حكمها."),
        txt("Jumat menggantikan Zuhur bila syaratnya sah.", "Valid Jumu'ah replaces Dhuhr.", "الجمعة الصحيحة تقوم مقام الظهر."),
        txt("Konteks jamaah dan khutbah menjadi bagian inti dari hukum Jumat.", "Congregation and khutbah are central to the Friday ruling.", "الجماعة والخطبة جزء مركزي من حكم الجمعة."),
        txt("Risikonya adalah menyamakan semua pertemuan dengan Jumat yang sah.", "The risk is treating every gathering as if it were a valid Jumu'ah.", "الخطر هو جعل كل اجتماع في حكم الجمعة الصحيحة."),
        txt("Pastikan syarat lokal dan rincian mazhab dipahami sebelum pelaksanaan.", "Make sure local conditions and school detail are understood before holding it.", "يتحقق من الشروط المحلية وتفصيل المذهب قبل الإقامة.")
      ),
      r_dhuhr_instead: detail(
        txt("إذا بطلت الجمعة رجع إلى الظهر", "If Jumu'ah is not valid, one returns to Dhuhr", "إذا بطلت الجمعة رجع إلى الظهر"),
        txt("The substitute obligation reverts to Dhuhr when Jumu'ah conditions are absent.", "عند فقد شروط الجمعة يعود الواجب إلى الظهر.", "عند فقد شروط الجمعة يعود الواجب إلى الظهر."),
        txt("Kewajiban tidak gugur, tetapi berubah bentuknya.", "The obligation does not disappear; it changes form.", "الواجب لا يسقط بل يتغير شكله."),
        txt("Ini menjaga kehormatan ibadah dari klaim sah tanpa fondasi.", "This protects worship from claims of validity without foundation.", "وهذا يحفظ العبادة من دعوى الصحة بلا أساس."),
        txt("Risikonya adalah merasa telah menunaikan Jumat padahal syaratnya belum ada.", "The risk is assuming one performed Jumu'ah while its conditions were absent.", "الخطر هو ظن أداء الجمعة مع فقد شروطها."),
        txt("Segera niatkan Zuhur dan kerjakan dengan tenang.", "Promptly intend Dhuhr and perform it calmly.", "يبادر إلى الظهر ويؤديها بطمأنينة.")
      ),
      r_pray_by_ability: detail(
        txt("الميسور لا يسقط بالمعسور", "What can be done is not dropped because of what cannot be done", "الميسور لا يسقط بالمعسور"),
        txt("The hadith of Imran ibn Husayn grounds prayer according to ability.", "حديث عمران بن حصين أصل في الصلاة على حسب القدرة.", "حديث عمران بن حصين أصل في الصلاة بحسب القدرة."),
        txt("Kewajiban shalat tetap ada, bentuknya yang menyesuaikan.", "The duty remains; only the form adapts.", "الواجب باق وإنما تتكيف الهيئة."),
        txt("Fiqh memberi ruang tanpa menghapus inti ibadah.", "Fiqh makes room without removing the core act of worship.", "الفقه يوسع من غير إسقاط لأصل العبادة."),
        txt("Risikonya adalah memaksa diri hingga membahayakan tubuh atau meninggalkan shalat sama sekali.", "The risk is either forcing the body into harm or abandoning prayer entirely.", "الخطر إما إضرار البدن أو ترك الصلاة بالكلية."),
        txt("Konsultasikan posisi paling aman jika Anda dalam perawatan medis.", "If you are under medical care, determine the safest prayer posture with guidance.", "يحدد الهيئة الأسلم خاصة في الظروف العلاجية.")
      ),
      r_travel_concession: detail(
        txt("الرخصة تستعمل عند سببها", "A concession is used when its cause exists", "الرخصة تستعمل عند سببها"),
        txt("Travel concession is grounded in Qur'an 4:101 and traveler prayer fiqh.", "رخصة السفر أصلها القرآن وفقه صلاة المسافر.", "رخصة السفر أصلها القرآن وفقه صلاة المسافر."),
        txt("Qashar dan jamak adalah kemudahan syar'i, bukan pengurangan nilai ibadah.", "Qasr and jam' are legal facilitation, not a reduction in the value of worship.", "القصر والجمع تيسير شرعي لا تنقيص لقيمة العبادة."),
        txt("Menerima rukhsah saat sebabnya ada merupakan bagian dari mengikuti syariat.", "Accepting a concession when its cause exists is part of following the law.", "الأخذ بالرخصة عند سببها من اتباع الشريعة."),
        txt("Risikonya adalah memakai rukhsah di luar batas safar yang sah.", "The risk is using the concession outside legally valid travel.", "الخطر هو استعمال الرخصة خارج السفر المعتبر."),
        txt("Pastikan status safar, jarak, dan niat menetap dipahami sebelum memutuskan.", "Verify travel status, distance, and residence intention before deciding.", "يتحقق من حكم السفر والمسافة ونية الإقامة قبل العمل.")
      ),
      r_follow_imam: detail(
        txt("الإمام ليؤتم به", "The imam is there to be followed", "الإمام ليؤتم به"),
        txt("The hadith on following the imam is the core textual basis.", "الحديث في متابعة الإمام هو الأصل في الباب.", "الحديث في متابعة الإمام هو الأصل في الباب."),
        txt("Jaga keteraturan jamaah.", "Maintain the order of congregation.", "يحفظ نظام الجماعة."),
        txt("Shalat berjamaah mendidik kebersamaan dan disiplin ibadah.", "Congregational prayer trains shared discipline and devotional order.", "الجماعة تربي على الانضباط ووحدة العبادة."),
        txt("Risikonya adalah mendahului imam atau kacau dalam perpindahan gerakan.", "The risk is preceding the imam or disordering the transitions.", "الخطر هو سبق الإمام أو فساد ترتيب الانتقال."),
        txt("Ikuti perpindahan imam dengan tenang, bukan terburu-buru.", "Follow the imam’s transitions calmly rather than hastily.", "يتابع انتقالات الإمام بهدوء دون عجلة.")
      ),
      r_masbuq: detail(
        txt("ما أدركه المسبوق مع الإمام فهو أول صلاته", "What the latecomer catches with the imam counts as the beginning of his prayer", "ما أدركه المسبوق مع الإمام فهو أول صلاته"),
        txt("Classical chapters on the latecomer explain how to complete missed rak'ahs.", "أبواب المسبوق تشرح كيفية إتمام ما فاته.", "أبواب المسبوق تبين كيفية إتمام ما فاته."),
        txt("Masuk jamaah tetap sah walau terlambat, tetapi ada tata cara lanjutannya.", "Joining late remains valid, but there is a defined method for completion.", "إدراك الجماعة مع التأخر صحيح لكن له طريقة في الإتمام."),
        txt("Kunci praktiknya adalah memahami apa yang dihitung bersama imam dan apa yang disempurnakan setelah salam.", "The practical key is knowing what counts with the imam and what is completed afterward.", "المهم أن يفهم ما يحسب له مع الإمام وما يتمه بعد السلام."),
        txt("Risikonya adalah bingung jumlah rakaat lalu salah tasyahhud atau salam.", "The risk is confusion over rak'ah count, causing mistakes in tashahhud or salam.", "الخطر هو الاضطراب في عدد الركعات وما يترتب عليه من خطأ في التشهد أو السلام."),
        txt("Hitung rakaat sejak takbir masuk jamaah dan perhatikan posisi imam saat Anda datang.", "Count from the moment you join and note the imam’s position when you enter.", "يحسب الركعات من لحظة الدخول وينتبه إلى حال الإمام عند الإدراك.")
      ),
      r_repeat_prayer: detail(
        txt("الركن لا يجبره السهو وحده", "A pillar is not mended by forgetfulness prostration alone", "الركن لا يجبره السهو وحده"),
        txt("The hadith of the man who prayed badly highlights the necessity of pillars and tranquility.", "حديث المسيء صلاته يدل على لزوم الأركان والطمأنينة.", "حديث المسيء صلاته يدل على لزوم الأركان والطمأنينة."),
        txt("Rukun yang hilang harus diperbaiki secara serius.", "A missing pillar requires serious correction.", "الركن المتروك يحتاج إلى استدراك جاد."),
        txt("Ini bukan kekurangan hiasan, tetapi kekurangan struktur inti ibadah.", "This is not a decorative deficiency but a structural one.", "هذا ليس نقصا تكميليا بل خلل في أصل البناء."),
        txt("Risikonya adalah mengira semua kesalahan cukup ditutup dengan sujud sahwi.", "The risk is assuming every mistake can be patched by sujud sahwi.", "الخطر هو ظن أن كل خلل يجبر بسجود السهو."),
        txt("Pelajari daftar rukun shalat secara khusus dan hafalkan urutannya.", "Study the prayer pillars specifically and memorize their order.", "يتعلم أركان الصلاة على وجه خاص ويحفظ ترتيبها.")
      ),
      r_sujud_sahwi: detail(
        txt("السنة إذا فاتت لا تبطل الأصل", "A missed sunnah does not invalidate the foundation", "السنة إذا فاتت لا تبطل الأصل"),
        txt("Hadiths of sujud sahwi show the remedy for certain non-pillar omissions.", "أحاديث السهو تدل على جبر بعض ما ليس بركن.", "أحاديث السهو تدل على جبر بعض ما ليس بركـن."),
        txt("Shalat tetap sah, lalu ditutup dengan sujud sahwi bila sesuai.", "The prayer remains valid, then is mended with sujud sahwi where applicable.", "الصلاة صحيحة ثم تجبر بسجود السهو عند محله."),
        txt("Penting memahami hierarki hukum: tidak semua yang tertinggal sama nilainya.", "It is crucial to understand legal hierarchy: not every omission has the same weight.", "المهم فهم مراتب الأحكام، فليس كل متروك سواء."),
        txt("Risikonya adalah mengulang shalat tanpa perlu atau sebaliknya meremehkan rukun.", "The risk is either repeating prayer unnecessarily or, conversely, trivializing pillars.", "الخطر إما الإعادة بغير حاجة أو التهوين من شأن الأركان."),
        txt("Bedakan rukun, sunnah ab'adh, dan sunnah hai'at saat belajar fiqh shalat.", "Distinguish pillars, emphasized sunnahs, and minor sunnahs when studying prayer fiqh.", "يفرق بين الأركان وسنن الأبعاض وسنن الهيئات عند تعلم الفقه.")
      ),
      r_vehicle_emergency: detail(
        txt("الضرورات تقدر بقدرها", "Necessities are measured according to their extent", "الضرورات تقدر بقدرها"),
        txt("Legal maxims on hardship and necessity frame emergency prayer adaptation.", "القواعد الفقهية في المشقة والضرورة تؤطر هذا الباب.", "القواعد الفقهية في المشقة والضرورة تؤطر هذا الباب."),
        txt("Darurat diakui, tetapi ukurannya tidak boleh dilebihkan.", "Emergency is recognized, but its scope must not be exaggerated.", "الضرورة معتبرة لكن لا يجوز توسيعها بغير حق."),
        txt("Tujuan fiqh di sini ialah menjaga waktu shalat dan keselamatan sekaligus.", "The juristic aim here is to preserve both prayer time and safety.", "المقصود هنا حفظ الوقت والسلامة معا."),
        txt("Risikonya adalah memakai alasan darurat padahal sebenarnya masih ada cara normal yang aman.", "The risk is claiming emergency while a normal safe method still exists.", "الخطر هو ادعاء الاضطرار مع إمكان الأداء المعتاد بأمان."),
        txt("Evaluasi apakah benar-benar tidak mungkin turun, berhenti, atau menata kondisi lebih baik.", "Evaluate honestly whether stopping, getting down, or arranging a better condition is truly impossible.", "يتحقق بصدق من تعذر التوقف أو النزول أو تحسين الحال.")
      ),
      r_normal_complete: detail(
        txt("إذا استكملت الشروط والأركان صحت الصلاة", "When the conditions and pillars are complete, the prayer is valid", "إذا استكملت الشروط والأركان صحت الصلاة"),
        txt("Qur'an 23:1-2 and the prophetic teaching on prayer quality support complete performance.", "المؤمنون 1-2 والتعليم النبوي في صفة الصلاة يدلان على كمال الأداء.", "المؤمنون 1-2 والتعليم النبوي في صفة الصلاة يدلان على كمال الأداء."),
        txt("Kasus Anda berada di jalur hukum asal yang normal.", "Your case remains on the normal original legal path.", "حالتك جارية على الحكم الأصلي المعتاد."),
        txt("Tahap berikutnya bukan sekadar sah, tetapi memperindah kualitas shalat.", "The next concern is not merely validity but beautifying prayer quality.", "المرحلة التالية ليست مجرد الصحة بل تحسين جودة الصلاة."),
        txt("Risikonya adalah puas dengan minimal sah lalu melupakan thuma'ninah, khusyuk, dan sunnah penyempurna.", "The risk is being satisfied with bare validity while neglecting tranquility, humility, and completing sunnahs.", "الخطر هو الاكتفاء بأدنى الصحة مع نسيان الطمأنينة والخشوع والسنن."),
        txt("Jaga thuma'ninah, bacaan, dan adab hati agar shalat tidak hanya sah tetapi juga hidup.", "Preserve tranquility, recitation, and inward etiquette so the prayer is not only valid but alive.", "يحافظ على الطمأنينة وحسن القراءة وأدب القلب حتى لا تكون الصلاة صحيحة فقط بل حيّة.")
      )
    }
  };
})();
