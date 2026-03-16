window.SMART_FIQH_CONFIG = {
  meta: {
    pageTitle: {
      id: "Smart Fiqh Thaharah",
      en: "Smart Fiqh Purification",
      ar: "الفقه الذكي للطهارة"
    },
    heroTitle: {
      id: "Smart Fiqh Thaharah",
      en: "Smart Fiqh Purification",
      ar: "الفقه الذكي للطهارة"
    },
    heroDesc: {
      id: "Panduan fiqh thaharah yang lebih lengkap untuk wudhu, mandi wajib, tayammum, najis, jenis-jenis najis, uzur medis, luka/perban, keraguan dalam bersuci, dan adab menjaga kesucian ibadah dengan alur Ya/Tidak yang ringkas namun berbobot.",
      en: "A more complete purification guide covering wudu, ghusl, tayammum, najasa, types of impurity, medical excuses, wounds/bandages, doubts in purification, and practical purity rulings through a concise but substantial Yes/No flow.",
      ar: "دليل أكثر شمولا في فقه الطهارة يشمل الوضوء والغسل والتيمم والنجاسة وأنواعها والأعذار الطبية وأحكام الجروح والجبائر والشك في الطهارة وآداب صيانة العبادة، عبر مسار نعم/لا مختصر لكنه غني بالمضمون."
    },
    engineTitle: {
      id: "Mesin Hukum Thaharah Lengkap",
      en: "Complete Purification Ruling Engine",
      ar: "محرك أحكام الطهارة الكامل"
    }
  },
  flow: {
    start: "q1",
    nodes: {
      q1: {
        text: {
          id: "Apakah Anda sedang menghadapi kebutuhan bersuci karena hadas besar, seperti junub, selesai haid, selesai nifas, atau sebab lain yang mewajibkan mandi?",
          en: "Do you need purification due to major ritual impurity, such as janabah, the end of menstruation, the end of nifas, or another cause requiring ghusl?",
          ar: "هل تحتاج إلى الطهارة بسبب حدث أكبر، كالجَنابة أو انقطاع الحيض أو انقطاع النفاس أو سبب آخر يوجب الغسل؟"
        },
        yes: "q2",
        no: "q5"
      },
      q2: {
        text: {
          id: "Apakah air tersedia, suci, dan aman digunakan tanpa menimbulkan bahaya nyata bagi tubuh, luka, atau pengobatan yang sedang dijalani?",
          en: "Is water available, pure, and safe to use without causing real harm to your body, wounds, or ongoing treatment?",
          ar: "هل الماء موجود وطاهر وآمن للاستعمال من غير ضرر ظاهر على البدن أو الجرح أو العلاج القائم؟"
        },
        yes: "q3",
        no: "q4"
      },
      q3: {
        text: {
          id: "Apakah Anda mampu meratakan air ke seluruh badan serta berniat mengangkat hadas besar, tanpa ada penghalang yang menghalangi sampainya air ke kulit?",
          en: "Can you spread water over the whole body and intend to remove major impurity, with no barrier preventing water from reaching the skin?",
          ar: "هل تستطيع تعميم الماء على جميع البدن مع نية رفع الحدث الأكبر، من غير حائل يمنع وصول الماء إلى البشرة؟"
        },
        yes: "r_ghusl_complete",
        no: "r_remove_barrier_ghusl"
      },
      q4: {
        text: {
          id: "Apakah ada luka, perban, operasi, atau kondisi medis yang menyebabkan sebagian anggota tidak boleh terkena air sama sekali?",
          en: "Do you have wounds, bandages, surgery, or a medical condition that prevents some body parts from being exposed to water at all?",
          ar: "هل عندك جرح أو جبيرة أو عملية أو حالة طبية تمنع وصول الماء إلى بعض الأعضاء مطلقا؟"
        },
        yes: "r_jabirah_major",
        no: "r_tayammum_major"
      },
      q5: {
        text: {
          id: "Jika bukan hadas besar, apakah Anda sedang menghadapi hadas kecil seperti buang angin, buang air, tidur nyenyak, atau sebab lain yang membatalkan wudhu?",
          en: "If it is not major impurity, are you dealing with minor impurity such as passing wind, relieving yourself, deep sleep, or another nullifier of wudu?",
          ar: "إذا لم يكن حدثا أكبر، فهل أنت في حدث أصغر كنقض الوضوء بخروج الريح أو البول أو الغائط أو النوم المستغرق أو غير ذلك من النواقض؟"
        },
        yes: "q6",
        no: "q9"
      },
      q6: {
        text: {
          id: "Apakah air tersedia, suci, dan aman untuk dipakai berwudhu tanpa menambah rasa sakit atau memperlambat penyembuhan?",
          en: "Is water available, pure, and safe for wudu without worsening pain or delaying healing?",
          ar: "هل الماء موجود وطاهر وآمن للوضوء من غير زيادة في الألم أو تأخير للشفاء؟"
        },
        yes: "q7",
        no: "q8"
      },
      q7: {
        text: {
          id: "Apakah tidak ada penghalang pada anggota wudhu—seperti cat tebal, lapisan anti-air, atau bahan lain—yang menghalangi sampainya air ke kulit?",
          en: "Is there no barrier on the wudu limbs—such as thick paint, waterproof coating, or another substance—that blocks water from reaching the skin?",
          ar: "هل لا يوجد على أعضاء الوضوء حائل كطلاء كثيف أو طبقة عازلة للماء أو مادة أخرى تمنع وصول الماء إلى البشرة؟"
        },
        yes: "r_wudhu_complete",
        no: "r_remove_barrier_wudhu"
      },
      q8: {
        text: {
          id: "Apakah ketidakmampuan memakai air hanya sementara, sehingga tayammum dibutuhkan untuk menjaga ibadah pada waktunya?",
          en: "Is the inability to use water only temporary, so that tayammum is needed to preserve worship in its time?",
          ar: "هل العجز عن استعمال الماء مؤقت، فيشرع التيمم للمحافظة على العبادة في وقتها؟"
        },
        yes: "r_tayammum_minor",
        no: "r_medical_excuse"
      },
      q9: {
        text: {
          id: "Apakah masalah Anda sekarang terkait najis pada badan, pakaian, tempat shalat, alas kaki, atau benda yang bersentuhan dengan ibadah?",
          en: "Is your current issue about impurity on the body, clothing, prayer place, footwear, or objects connected to worship?",
          ar: "هل مشكلتك الآن متعلقة بالنجاسة على البدن أو الثوب أو مكان الصلاة أو الحذاء أو الأشياء المتصلة بالعبادة؟"
        },
        yes: "q10",
        no: "q14"
      },
      q10: {
        text: {
          id: "Apakah najis itu termasuk najis ringan yang biasa berkaitan dengan bayi laki-laki yang belum makan selain susu, sehingga cara penyuciannya lebih ringan?",
          en: "Is the impurity a light impurity, commonly related to a baby boy who has not eaten food besides milk, so that its purification is lighter?",
          ar: "هل هذه النجاسة من النجاسة المخففة، كنجاسة بول الغلام الذي لم يطعم غير اللبن، بحيث تكون طريقة تطهيرها أخف؟"
        },
        yes: "r_najis_light",
        no: "q11"
      },
      q11: {
        text: {
          id: "Apakah najis itu termasuk najis berat seperti anjing atau babi, atau sesuatu yang jelas berasal dari salah satunya?",
          en: "Is the impurity a severe impurity such as dog or pig, or something clearly originating from either of them?",
          ar: "هل النجاسة من النجاسة المغلظة كالكلب أو الخنزير أو ما تولد منهما أو تفرع عنهما بوضوح؟"
        },
        yes: "r_najis_heavy",
        no: "q12"
      },
      q12: {
        text: {
          id: "Apakah najis itu masih tampak sifatnya, seperti warna, bau, atau rasa, dan masih mungkin dihilangkan dengan pencucian yang memadai?",
          en: "Do the impurity's traces—such as color, smell, or taste—still remain, and can they still be removed through proper washing?",
          ar: "هل بقيت أوصاف النجاسة كاللون أو الرائحة أو الطعم، ويمكن إزالتها بالغسل المعتاد؟"
        },
        yes: "r_najis_medium",
        no: "r_trace_excused"
      },
      q13: {
        text: {
          id: "Apakah Anda terus-menerus terkena hadas atau najis karena uzur berkepanjangan seperti inkontinensia, luka yang terus mengalir, atau kondisi medis serupa?",
          en: "Do you constantly experience impurity due to a continuing excuse such as incontinence, ongoing bleeding, or a similar medical condition?",
          ar: "هل يصيبك الحدث أو النجاسة باستمرار لعذر دائم كسلس البول أو الجرح السائل أو حالة طبية مشابهة؟"
        },
        yes: "r_continuous_excuse",
        no: "r_already_pure"
      },
      q14: {
        text: {
          id: "Apakah Anda hanya ragu apakah wudhu batal atau apakah benar ada najis, sementara tidak ada kepastian yang jelas?",
          en: "Are you only doubtful whether your wudu was broken or whether impurity is truly present, without clear certainty?",
          ar: "هل أنت مجرد شاك في انتقاض الوضوء أو في وجود النجاسة من غير يقين واضح؟"
        },
        yes: "r_certainty_rule",
        no: "q13"
      }
    },
    results: {
      r_ghusl_complete: {
        status: {
          id: "Wajib mandi wajib secara sempurna",
          en: "Complete ghusl is obligatory",
          ar: "يجب الغسل الكامل"
        },
        obligation: {
          id: "Berniat mengangkat hadas besar, hilangkan najis bila ada, lalu ratakan air ke seluruh badan termasuk lipatan yang tampak",
          en: "Intend to remove major impurity, remove najasa if present, then spread water over the entire body including visible folds",
          ar: "ينوي رفع الحدث الأكبر ويزيل النجاسة إن وجدت ثم يعمم الماء على جميع البدن وما ظهر من الثنيات"
        },
        explanation: {
          id: "Dalam hadas besar, wudhu saja tidak cukup. Yang dituntut adalah mandi wajib yang sah, dengan niat, sampainya air ke seluruh badan, dan memastikan tidak ada penghalang seperti cat tebal, lem, atau bahan tahan air. Secara fiqh, ini penting untuk keabsahan shalat, thawaf, dan ibadah lain yang mensyaratkan thaharah. Secara praktis modern, pemeriksaan area tersembunyi, sela-sela jari, bawah rambut yang dapat dijangkau, dan bagian tubuh yang tertutup lapisan kosmetik atau medis perlu diperhatikan agar mandi benar-benar sah.",
          en: "In major impurity, wudu alone is insufficient. Valid ghusl requires intention, water reaching the entire body, and ensuring that no barrier such as thick paint, glue, or waterproof material blocks the skin. Juristically, this is essential for the validity of prayer, tawaf, and other acts requiring ritual purity. In modern practice, one should carefully check hidden areas, spaces between fingers, reachable hair roots, and body parts covered by cosmetic or medical layers so the ghusl is truly valid.",
          ar: "في الحدث الأكبر لا يكفي الوضوء وحده، بل لا بد من غسل صحيح تشتمل صحته على النية ووصول الماء إلى جميع البدن والتأكد من عدم وجود حائل كطلاء كثيف أو لاصق أو مادة عازلة. وهذا مهم فقهيا لصحة الصلاة والطواف وسائر العبادات المشروطة بالطهارة. ومن الناحية العملية الحديثة ينبغي تفقد المواضع الخفية وما بين الأصابع وأصول الشعر التي يمكن إيصال الماء إليها والمواضع التي عليها طبقات تجميلية أو علاجية حتى يكون الغسل صحيحا حقا."
        },
        reference: {
          id: "QS Al-Ma'idah: 6; bab ghusl dan thaharah dalam fiqh Syafi'i",
          en: "Qur'an 5:6; ghusl and purification chapters in Shafi'i fiqh",
          ar: "المائدة: 6؛ أبواب الغسل والطهارة في الفقه الشافعي"
        }
      },
      r_remove_barrier_ghusl: {
        status: {
          id: "Hilangkan penghalang terlebih dahulu",
          en: "Remove the barrier first",
          ar: "يزال الحائل أولا"
        },
        obligation: {
          id: "Lepas bahan yang menghalangi air lalu ulangi mandi wajib dengan benar",
          en: "Remove anything blocking water then repeat the ghusl properly",
          ar: "يزيل ما يمنع وصول الماء ثم يعيد الغسل على وجه صحيح"
        },
        explanation: {
          id: "Jika ada penghalang yang mencegah sampainya air ke kulit, mandi wajib belum sempurna. Penghalang dapat berupa kutek tebal, lapisan kosmetik kedap, plester non-medis yang tidak diperlukan, lem, cat, atau bahan lain yang menutup kulit. Setelah penghalang dihilangkan, mandi perlu diulang atau disempurnakan pada bagian yang belum terkena air. Prinsipnya adalah air harus sampai ke anggota yang wajib dibasuh sesuai kemampuan nyata.",
          en: "If a barrier prevents water from reaching the skin, the ghusl is incomplete. Such barriers may include thick nail polish, waterproof cosmetics, unnecessary adhesive covering, glue, paint, or other layers sealing the skin. Once the barrier is removed, the ghusl must be repeated or completed over the parts that did not receive water. The principle is that water must actually reach the limbs that are required to be washed.",
          ar: "إذا وجد حائل يمنع وصول الماء إلى البشرة لم يصح الغسل على وجهه الكامل. ومن ذلك طلاء الأظافر السميك والمواد التجميلية العازلة واللاصق غير الضروري والغراء والطلاء ونحوها. فإذا أزيل الحائل وجب استدراك الغسل أو إعادته على المواضع التي لم يصلها الماء، لأن الأصل أن يصل الماء حقيقة إلى المواضع الواجبة."
        },
        reference: {
          id: "Kaidah وصول الماء إلى البشرة; bab rukun ghusl",
          en: "Principle of water reaching the skin; chapters on the pillars of ghusl",
          ar: "قاعدة وصول الماء إلى البشرة؛ أبواب أركان الغسل"
        }
      },
      r_jabirah_major: {
        status: {
          id: "Gunakan rukhsah jabirah pada hadas besar",
          en: "Use the bandage concession for major impurity",
          ar: "تعمل برخصة الجبيرة في الحدث الأكبر"
        },
        obligation: {
          id: "Basuh bagian yang aman, usap jabirah yang dibutuhkan, dan tambahkan tayammum bila kondisi menuntut menurut pendapat fiqh yang diikuti",
          en: "Wash the safe parts, wipe the needed bandage, and add tayammum if the legal view you follow requires it",
          ar: "يغسل الأجزاء السليمة ويمسح الجبيرة المحتاج إليها ويضيف التيمم عند الحاجة بحسب القول الفقهي المعتمد"
        },
        explanation: {
          id: "Pada luka, operasi, gips, atau perban yang tidak boleh terkena air, syariat memberi keringanan. Bagian yang aman tetap dibasuh, sedangkan bagian yang tertutup dan benar-benar membutuhkan perlindungan diperlakukan dengan hukum jabirah. Dalam praktik modern, keputusan dokter tepercaya tentang bahaya air sangat relevan. Karena rincian jabirah memiliki cabang pendapat, kasus yang rumit tetap baik dikonsultasikan agar urutan wudhu/ghusl, usapan, dan tayammumnya sesuai mazhab yang dipakai.",
          en: "For wounds, surgery sites, casts, or bandages that must not be exposed to water, the law gives concession. Safe areas are still washed, while protected areas genuinely needing cover follow the rulings of bandage wiping. In modern practice, the assessment of a reliable doctor about the harm of water is highly relevant. Since bandage rulings have detailed branches, complex cases are best reviewed so the order of washing, wiping, and tayammum matches the school being followed.",
          ar: "في الجروح والعمليات والجبس والضمادات التي يضرها الماء جاءت الشريعة بالتيسير. فيغسل الموضع السليم، وأما الموضع المستور المحتاج إلى الستر حقيقة فيعامل بأحكام الجبيرة. وفي التطبيق الطبي الحديث يكون لتقرير الطبيب الموثوق أثر معتبر في تقدير الضرر. ولما كانت مسائل الجبيرة ذات تفصيل وفروع، فالأحسن في الصور المركبة الرجوع إلى من يضبط المذهب حتى يقع الغسل أو الوضوء والمسح والتيمم على وجه صحيح."
        },
        reference: {
          id: "Bab jabirah dalam fiqh thaharah; kaidah al-masyaqqah tajlibut taisir",
          en: "Bandage chapters in purification fiqh; hardship brings facilitation",
          ar: "باب الجبيرة في فقه الطهارة؛ المشقة تجلب التيسير"
        }
      },
      r_tayammum_major: {
        status: {
          id: "Tayammum menggantikan mandi wajib untuk sementara",
          en: "Tayammum temporarily replaces ghusl",
          ar: "التيمم بدل مؤقت عن الغسل"
        },
        obligation: {
          id: "Lakukan tayammum yang sah dengan niat, menggunakan media yang memenuhi syarat, lalu kerjakan ibadah pada waktunya",
          en: "Perform valid tayammum with intention on a valid medium, then perform worship in its proper time",
          ar: "يتيمم تيمما صحيحا مع النية وعلى صعيد معتبر ثم يؤدي العبادة في وقتها"
        },
        explanation: {
          id: "Ketika air tidak ada atau membahayakan secara nyata, tayammum menjadi pengganti sementara untuk mengangkat penghalang ibadah pada hadas besar. Ini bukan meremehkan mandi wajib, tetapi bentuk rahmat syariat agar ibadah tidak tertinggal. Dalam fiqh, tayammum hanya berlaku selama uzur masih ada. Jika air telah tersedia dan aman dipakai kembali, maka hukum kembali kepada asalnya, yakni bersuci dengan air.",
          en: "When water is unavailable or genuinely harmful, tayammum serves as a temporary substitute that removes the worship barrier of major impurity. This is not a neglect of ghusl, but a form of legal mercy so worship is not lost. In fiqh, tayammum only applies while the excuse remains. Once water becomes available and safe again, the original ruling returns, namely purification with water.",
          ar: "عند فقد الماء أو تحقق الضرر باستعماله يكون التيمم بدلا مؤقتا يرفع مانع العبادة في الحدث الأكبر. وليس هذا إهمالا للغسل، بل هو من رحمة الشريعة حتى لا تفوت العبادة. وفي الفقه لا يعمل بالتيمم إلا ما دام العذر قائما، فإذا وجد الماء وأمن الضرر رجع الحكم إلى أصله وهو التطهر بالماء."
        },
        reference: {
          id: "QS Al-Ma'idah: 6; bab tayammum",
          en: "Qur'an 5:6; chapters on tayammum",
          ar: "المائدة: 6؛ أبواب التيمم"
        }
      },
      r_wudhu_complete: {
        status: {
          id: "Wajib berwudhu dengan rukun lengkap",
          en: "Valid wudu with complete pillars is required",
          ar: "يجب وضوء صحيح بأركانه"
        },
        obligation: {
          id: "Niat, basuh wajah, kedua tangan sampai siku, usap sebagian kepala, basuh kaki sampai mata kaki, dan tertib menurut mazhab Syafi'i",
          en: "Intention, wash the face, both arms to the elbows, wipe part of the head, wash the feet to the ankles, and observe proper order according to the Shafi'i school",
          ar: "النية وغسل الوجه واليدين إلى المرفقين ومسح بعض الرأس وغسل الرجلين إلى الكعبين والترتيب على مذهب الشافعية"
        },
        explanation: {
          id: "Hadas kecil disucikan dengan wudhu yang sah. Selain menjaga rukun, penting juga memperhatikan sampainya air, hilangnya penghalang, serta kebiasaan tergesa-gesa yang membuat sela jari, tumit, atau ujung anggota terlewat. Dalam penerapan modern, krim tebal, kosmetik tahan air, atau perlindungan kulit tertentu perlu diperiksa. Sunnah-sunnah seperti membaca basmalah, berkumur, istinsyaq, mendahulukan yang kanan, dan menggosok anggota akan menyempurnakan kualitas ibadah walaupun pembahasan sah-tidak sah tetap kembali kepada rukun dan syarat.",
          en: "Minor impurity is removed by valid wudu. Beyond preserving the pillars, one must ensure that water truly reaches the limbs, barriers are absent, and haste does not leave the spaces between fingers, heels, or limb edges dry. In modern practice, thick creams, waterproof cosmetics, or skin-protection layers should be checked. Sunnahs such as saying basmalah, rinsing the mouth and nose, starting with the right side, and rubbing the limbs perfect the worship, though legal validity still depends on the pillars and conditions.",
          ar: "يرتفع الحدث الأصغر بوضوء صحيح. ولا يكفي حفظ الأركان في الجملة، بل لا بد من التأكد من وصول الماء وعدم وجود الحائل وترك العجلة التي قد تجعل ما بين الأصابع أو العقبين أو أطراف الأعضاء بلا غسل. وفي التطبيق الحديث ينبغي التنبه إلى الكريمات السميكة والمواد التجميلية العازلة وطبقات الحماية الجلدية. وأما السنن كبسم الله والمضمضة والاستنشاق والتيامن والدلك فهي تكمل الطهارة وتحسن العبادة، مع بقاء الحكم بصحة الوضوء مبنيا على الأركان والشروط."
        },
        reference: {
          id: "QS Al-Ma'idah: 6; bab faraidhul wudhu dan sunanul wudhu",
          en: "Qur'an 5:6; chapters on the pillars and sunnahs of wudu",
          ar: "المائدة: 6؛ أبواب فرائض الوضوء وسننه"
        }
      },
      r_remove_barrier_wudhu: {
        status: {
          id: "Hilangkan penghalang sebelum wudhu",
          en: "Remove the barrier before wudu",
          ar: "يزال الحائل قبل الوضوء"
        },
        obligation: {
          id: "Bersihkan atau lepas bahan yang menutup anggota wudhu agar air benar-benar sampai",
          en: "Clean or remove anything covering the wudu limbs so water truly reaches them",
          ar: "ينظف أو يزيل ما يغطي أعضاء الوضوء حتى يصل الماء إليها حقيقة"
        },
        explanation: {
          id: "Wudhu tidak sempurna jika air terhalang dari kulit oleh lapisan yang tebal dan kedap. Karena itu, bahan seperti cat, lem, kosmetik anti-air, atau pelapis lain yang membentuk penghalang perlu diangkat terlebih dahulu. Bila sebagian anggota sudah dibasuh lalu baru diketahui ada penghalang, maka bagian yang terhalang harus disempurnakan sesuai urutan yang dituntut. Sikap teliti di sini sangat penting karena banyak orang merasa sudah berwudhu padahal air belum mengenai anggota secara nyata.",
          en: "Wudu is incomplete when water is blocked from the skin by a thick, sealed layer. Therefore, substances such as paint, glue, waterproof cosmetics, or other coatings forming a barrier must be removed first. If some limbs were already washed and the barrier is only discovered later, the affected parts must be completed in a way that respects the required order. Carefulness here is essential because many people assume they made wudu while water never actually reached the limb.",
          ar: "لا يكتمل الوضوء إذا منع الحائل وصول الماء إلى البشرة. ولهذا يجب إزالة ما كان من طلاء أو غراء أو مواد تجميل عازلة أو غير ذلك مما يشكل طبقة مانعة. فإن غسل بعض الأعضاء ثم تبين بعد ذلك وجود الحائل، وجب استدراك الموضع بما يراعي الترتيب المطلوب. والتحرز هنا مهم لأن كثيرا من الناس يظن صحة وضوئه مع أن الماء لم يصل إلى العضو حقيقة."
        },
        reference: {
          id: "Bab syarat sampainya air pada anggota wudhu",
          en: "Chapters on the condition that water reach the limbs of wudu",
          ar: "باب اشتراط وصول الماء إلى أعضاء الوضوء"
        }
      },
      r_tayammum_minor: {
        status: {
          id: "Tayammum menggantikan wudhu",
          en: "Tayammum replaces wudu",
          ar: "التيمم بدل عن الوضوء"
        },
        obligation: {
          id: "Gunakan tayammum yang sah saat air tidak ada atau berbahaya, lalu tunaikan ibadah sesuai waktunya",
          en: "Use valid tayammum when water is unavailable or harmful, then perform worship in its due time",
          ar: "يستعمل التيمم الصحيح عند فقد الماء أو الضرر باستعماله ثم يؤدي العبادة في وقتها"
        },
        explanation: {
          id: "Syariat thaharah tidak dimaksudkan untuk memberatkan. Karena itu, ketika air tidak tersedia atau terbukti berbahaya bagi kesehatan, tayammum menjadi pengganti yang sah untuk hadas kecil. Namun tayammum tetap memiliki syarat: niat, media yang sah, dan dilakukan sesuai tata caranya. Ia bukan kebiasaan permanen selama air dan kemampuan memakai air sebenarnya tersedia, melainkan rukhsah yang terikat pada uzur.",
          en: "The law of purification is not meant to create undue burden. Thus, when water is unavailable or proven harmful to health, tayammum becomes a valid substitute for minor impurity. Yet tayammum still has conditions: intention, a valid medium, and correct procedure. It is not a permanent habit when water and the ability to use it are truly available, but a concession tied to a real excuse.",
          ar: "لم تشرع الطهارة للتعسير، ولذلك إذا فقد الماء أو ثبت الضرر باستعماله صار التيمم بدلا صحيحا عن الحدث الأصغر. ومع هذا فالتيمم له شروطه من النية والصعيد المعتبر والهيئة المشروعة. فهو ليس عادة دائمة مع وجود الماء والقدرة على استعماله، بل هو رخصة مرتبطة بالعذر الحقيقي."
        },
        reference: {
          id: "QS Al-Ma'idah: 6; bab tayammum dan rukhsah",
          en: "Qur'an 5:6; chapters on tayammum and legal concessions",
          ar: "المائدة: 6؛ أبواب التيمم والرخص"
        }
      },
      r_medical_excuse: {
        status: {
          id: "Uzur medis perlu pengaturan thaharah khusus",
          en: "Medical excuse requires a tailored purification approach",
          ar: "العذر الطبي يحتاج تنظيما خاصا للطهارة"
        },
        obligation: {
          id: "Ambil rukhsah yang tepat, pertahankan semampunya, dan sesuaikan ibadah dengan kemampuan nyata",
          en: "Take the proper concession, preserve purity as much as possible, and adapt worship to real ability",
          ar: "يؤخذ بالرخصة المناسبة ويحافظ على الطهارة بقدر الاستطاعة وتكيف العبادة بحسب القدرة الحقيقية"
        },
        explanation: {
          id: "Sebagian kondisi medis tidak sederhana: ada yang melarang air hanya pada waktu tertentu, ada yang menuntut kebersihan ekstra, dan ada pula yang menyebabkan hadas terus berulang. Dalam keadaan seperti ini, fiqh memberi jalur praktis agar ibadah tidak ditinggalkan namun juga tidak membahayakan tubuh. Prinsip umum yang bekerja adalah menjaga kemampuan, menolak bahaya, dan memakai rukhsah secara proporsional. Kasus medis yang kompleks sebaiknya dibingkai dengan keterangan tenaga kesehatan dan bimbingan fiqh yang terpercaya.",
          en: "Some medical situations are not simple: some prohibit water only at certain times, some require extra hygiene, and others cause repeated impurity. In such cases, fiqh provides practical pathways so worship is not abandoned while the body is not harmed. The governing principles are preserving ability, preventing harm, and using concessions proportionately. Complex medical cases are best handled with both medical guidance and reliable fiqh direction.",
          ar: "بعض الحالات الطبية ليست بسيطة؛ فمنها ما يمنع الماء في أوقات معينة، ومنها ما يحتاج إلى عناية صحية خاصة، ومنها ما يسبب تكرر الحدث. وفي مثل هذا يفتح الفقه مسالك عملية حتى لا تترك العبادة ولا يتضرر الجسد. والأصول الحاكمة هنا هي مراعاة القدرة ودفع الضرر واستعمال الرخصة بقدرها. والحالات الطبية المركبة يحسن فيها الجمع بين توجيه الطبيب الموثوق والتوجيه الفقهي المعتمد."
        },
        reference: {
          id: "Kaidah la darar wa la dirar; al-masyaqqah tajlibut taisir",
          en: "No harm principle; hardship brings facilitation",
          ar: "قاعدة لا ضرر ولا ضرار؛ المشقة تجلب التيسير"
        }
      },
      r_najis_light: {
        status: {
          id: "Najis ringan disucikan dengan cara yang lebih ringan",
          en: "Light impurity is purified by a lighter method",
          ar: "النجاسة المخففة تطهر بطريقة أخف"
        },
        obligation: {
          id: "Cukup percikkan air pada tempat yang terkena sesuai ketentuan fiqh ketika syaratnya benar-benar terpenuhi",
          en: "Sprinkle water over the affected area when the legal conditions are truly met",
          ar: "يكفي نضح الماء على الموضع إذا تحققت شروط هذا الحكم شرعا"
        },
        explanation: {
          id: "Dalam fiqh Syafi'i, ada kategori najis yang diperlakukan lebih ringan, seperti urine bayi laki-laki yang belum mengonsumsi makanan selain susu. Cara penyuciannya cukup dengan memercikkan air pada area terkena, bukan mencuci seperti najis biasa. Namun rukhsah ini tidak boleh diperluas tanpa syarat; bila karakter kasusnya berbeda, hukum kembali ke najis mutawassithah atau kategori lain yang sesuai.",
          en: "In Shafi'i fiqh, some impurities are treated more lightly, such as the urine of a baby boy who has not consumed food other than milk. Purification here is by sprinkling water over the area rather than washing it like ordinary impurity. Yet this concession must not be expanded beyond its conditions; if the case differs, the ruling returns to medium impurity or another relevant category.",
          ar: "في الفقه الشافعي توجد نجاسة تعامل معاملة أخف، مثل بول الغلام الذي لم يطعم غير اللبن. ويكفي في تطهيره النضح على الموضع ولا يشترط الغسل كغيره من النجاسات. لكن هذه الرخصة لا تتوسع بغير شرطها، فإذا اختلفت صورة المسألة رجع الحكم إلى النجاسة المتوسطة أو إلى ما يناسبها من الأقسام."
        },
        reference: {
          id: "Bab najis mukhaffafah",
          en: "Chapter on light impurity",
          ar: "باب النجاسة المخففة"
        }
      },
      r_najis_heavy: {
        status: {
          id: "Najis berat memerlukan penyucian khusus",
          en: "Severe impurity requires special purification",
          ar: "النجاسة المغلظة تحتاج إلى تطهير خاص"
        },
        obligation: {
          id: "Bersihkan sesuai hukum najis mughallazhah, termasuk pencucian berulang dengan salah satunya bercampur tanah atau penggantinya yang memenuhi ketentuan mazhab",
          en: "Clean according to the ruling of severe impurity, including repeated washing with one washing involving earth or its qualified substitute according to the school",
          ar: "يطهر وفق حكم النجاسة المغلظة بالغسل المتكرر وإحداها بالتراب أو ما يقوم مقامه على مقتضى المذهب"
        },
        explanation: {
          id: "Najis yang berkaitan dengan anjing dan babi memiliki perlakuan lebih berat dalam fiqh. Penyuciannya tidak cukup dengan sekali cuci biasa, tetapi mengikuti tata cara khusus yang lebih ketat. Dalam konteks modern, sabun atau pembersih boleh membantu menghilangkan kotoran, tetapi ketentuan fiqh tentang unsur tanah atau penggantinya tetap harus diperhatikan sesuai pendapat yang dipegang. Ketelitian di sini penting agar pakaian, lantai, atau peralatan ibadah benar-benar kembali suci.",
          en: "Impurity related to dogs and pigs is treated more strictly in fiqh. Its purification is not satisfied by an ordinary single wash, but follows a special legal method. In modern settings, soap or cleaning agents may help remove the dirt, yet the juristic requirement involving earth or its substitute must still be observed according to the view followed. Precision here matters so that clothing, floors, or worship tools truly return to purity.",
          ar: "النجاسة المتعلقة بالكلب والخنزير أشد حكما في الفقه، فلا يكفي فيها غسل عادي واحد، بل تتبع فيها طريقة مخصوصة أشد احتياطا. وفي التطبيقات الحديثة قد يستعان بالصابون والمنظفات لإزالة العين، لكن يبقى الحكم الفقهي المتعلق بالتراب أو بديله المعتبر على ما تقرره الجهة الفقهية المتبعة. والدقة هنا مهمة حتى تعود الثياب والأرضيات وأدوات العبادة إلى الطهارة حقيقة."
        },
        reference: {
          id: "Bab najis mughallazhah",
          en: "Chapter on severe impurity",
          ar: "باب النجاسة المغلظة"
        }
      },
      r_najis_medium: {
        status: {
          id: "Najis sedang harus dihilangkan sampai hilang sifatnya",
          en: "Medium impurity must be removed until its traces disappear",
          ar: "النجاسة المتوسطة تزال حتى تزول أوصافها"
        },
        obligation: {
          id: "Cuci area yang terkena sampai hilang warna, bau, atau rasa najis sesuai kemampuan wajar",
          en: "Wash the affected area until the impurity's color, smell, or taste disappears as far as reasonably possible",
          ar: "يغسل الموضع حتى تزول أوصاف النجاسة من لون أو ريح أو طعم بحسب الاستطاعة المعتادة"
        },
        explanation: {
          id: "Mayoritas kasus najis sehari-hari masuk ke najis mutawassithah, seperti darah, urine, kotoran, atau najis lain yang tidak termasuk kategori ringan dan berat. Kaidah dasarnya adalah menghilangkan عين النجاسة dan sifat-sifatnya dengan air. Bila setelah usaha wajar masih tersisa bekas yang sangat sulit hilang, maka penilaiannya kembali kepada tingkat kesulitan yang diakui fiqh. Pendekatan ini seimbang antara menjaga kesucian ibadah dan menghindari waswas berlebihan.",
          en: "Most daily impurity cases fall under medium impurity, such as blood, urine, feces, or other impurities that are neither light nor severe. The basic rule is to remove the substance of impurity and its traces with water. If, after reasonable effort, a trace remains that is very difficult to remove, its treatment returns to the level of hardship recognized in fiqh. This approach balances ritual cleanliness with avoidance of unhealthy obsessive doubts.",
          ar: "أكثر صور النجاسة اليومية تدخل في النجاسة المتوسطة، كالدم والبول والغائط ونحو ذلك مما ليس من المخفف ولا من المغلظ. والأصل فيها إزالة عين النجاسة وأوصافها بالماء. فإذا بقي بعد الجهد المعتاد أثر يعسر إزالته جدا، فالحكم فيه يرجع إلى مقدار المشقة المعتبرة في الفقه. وهذا المسلك يجمع بين صيانة العبادة من النجاسة وبين دفع الوسوسة المذمومة."
        },
        reference: {
          id: "Bab najis mutawassithah dan izalatun najasah",
          en: "Chapters on medium impurity and removing impurity",
          ar: "باب النجاسة المتوسطة وإزالة النجاسة"
        }
      },
      r_trace_excused: {
        status: {
          id: "Sisa jejak yang sangat sulit dapat dimaafkan",
          en: "A trace that is extremely difficult to remove may be excused",
          ar: "الأثر الذي يعسر جدا إزالته قد يعفى عنه"
        },
        obligation: {
          id: "Lakukan pembersihan semaksimal yang wajar, lalu jangan terjebak waswas setelah kadar yang dituntut syariat terpenuhi",
          en: "Clean as far as reasonably possible, then avoid obsessive doubt once the required legal standard has been met",
          ar: "يفعل ما في وسعه من التنظيف المعتاد ثم يترك الوسوسة بعد حصول القدر المطلوب شرعا"
        },
        explanation: {
          id: "Fiqh membedakan antara sisa najis yang masih nyata dan jejak yang sangat sulit dihilangkan setelah pembersihan wajar. Pada keadaan kedua, syariat tidak bermaksud membebani manusia dengan tuntutan yang tidak realistis. Maka ukuran yang dipakai adalah usaha yang layak, bukan perfeksionisme yang melahirkan waswas. Ini penting terutama pada kain, lantai, peralatan medis, atau benda yang secara praktis sulit dibersihkan sampai tingkat sempurna mutlak.",
          en: "Fiqh distinguishes between an impurity that is still clearly present and a trace that remains only after reasonable cleaning and is extremely difficult to remove. In the latter case, the law does not intend to burden people with unrealistic demands. The measure is reasonable effort, not perfectionism leading to obsession. This is especially important for fabrics, floors, medical tools, or objects that are practically difficult to restore to absolute perfection.",
          ar: "يفرق الفقه بين النجاسة الظاهرة الباقية وبين الأثر الذي لا يبقى إلا بعد تنظيف معتاد ويعسر جدا إزالته. ففي الحالة الثانية لا تقصد الشريعة تكليف الناس بما لا يطاق عادة. فالمعتبر هو بذل الجهد المعتاد، لا التكلف الذي يولد الوسوسة. وهذا مهم خاصة في الأقمشة والأرضيات والأدوات الطبية والأشياء التي يصعب عمليا تنظيفها إلى حد الكمال المطلق."
        },
        reference: {
          id: "Kaidah المشقة تجلب التيسير dalam bab najis",
          en: "The maxim hardship brings facilitation in impurity rulings",
          ar: "قاعدة المشقة تجلب التيسير في باب النجاسات"
        }
      },
      r_certainty_rule: {
        status: {
          id: "Pegang hukum asal: suci sampai ada kepastian sebaliknya",
          en: "Hold to the original rule: purity remains until certainty proves otherwise",
          ar: "الأصل بقاء الطهارة حتى يثبت خلافها يقينا"
        },
        obligation: {
          id: "Jangan membatalkan wudhu atau menganggap najis hanya karena keraguan semata",
          en: "Do not invalidate your wudu or treat something as impure based on mere doubt",
          ar: "لا تنقض وضوءك ولا تحكم بالنجاسة لمجرد الشك"
        },
        explanation: {
          id: "Salah satu kaidah terbesar dalam thaharah adalah bahwa keyakinan tidak hilang karena keraguan. Orang yang yakin sudah suci tidak wajib mengulang bersuci hanya karena merasa-rasa atau kemungkinan yang lemah. Kaidah ini sangat penting untuk menutup pintu waswas yang sering merusak kekhusyukan dan membebani kehidupan sehari-hari. Kecuali ada kepastian yang jelas, hukum asal tetap dipertahankan.",
          en: "One of the greatest maxims in purification is that certainty is not removed by doubt. A person who is sure that he or she is in purity is not required to repeat purification merely because of sensations or weak possibilities. This rule is vital for closing the door of obsessive doubt that harms devotion and burdens daily life. Unless clear certainty appears, the original state remains.",
          ar: "من أعظم قواعد الطهارة أن اليقين لا يزول بالشك. فمن تيقن الطهارة لا يلزمه إعادة التطهر لمجرد الأوهام أو الاحتمالات الضعيفة. وهذه القاعدة مهمة جدا في سد باب الوسوسة التي تفسد الخشوع وتثقل الحياة اليومية. وما لم يظهر يقين واضح، فالأصل يبقى على حاله."
        },
        reference: {
          id: "Kaidah al-yaqin la yazulu bisy-syakk",
          en: "The maxim certainty is not removed by doubt",
          ar: "قاعدة اليقين لا يزول بالشك"
        }
      },
      r_continuous_excuse: {
        status: {
          id: "Uzur berkelanjutan memiliki tata cara khusus",
          en: "A continuing excuse has a special legal method",
          ar: "للعذر المستمر طريقة خاصة"
        },
        obligation: {
          id: "Bersuci setelah masuk waktu sesuai kemampuan, jaga kebersihan semaksimal mungkin, lalu segera tunaikan ibadah",
          en: "Purify yourself after the prayer time enters as much as possible, maintain cleanliness as best you can, then perform the worship promptly",
          ar: "يتطهر بعد دخول الوقت بقدر استطاعته ويحافظ على النظافة ما أمكن ثم يبادر إلى العبادة"
        },
        explanation: {
          id: "Bagi orang yang mengalami uzur terus-menerus seperti سلس البول, luka yang mengalir, atau kondisi lain yang menyulitkan penjagaan thaharah secara normal, fiqh memberi tata cara khusus. Tujuannya agar ibadah tidak gugur hanya karena sesuatu yang sulit dikendalikan. Umumnya seseorang diperintahkan membersihkan semampunya, menjaga penahan atau pelindung yang diperlukan, lalu bersuci setelah masuk waktu dan bersegera melaksanakan ibadah. Pendekatan ini memadukan disiplin syariat dengan belas kasih terhadap kondisi nyata manusia.",
          en: "For a person suffering from a continuing excuse such as incontinence, ongoing bleeding, or another condition that makes normal purity control difficult, fiqh provides a special method. The purpose is that worship is not lost because of something beyond ordinary control. Typically, one is instructed to clean as much as possible, use the needed pad or protection, then purify after the prayer time begins and proceed promptly to worship. This approach combines legal discipline with mercy toward real human conditions.",
          ar: "من ابتلي بعذر مستمر كسلس البول أو الجرح السائل أو غير ذلك مما يشق معه حفظ الطهارة على الوجه المعتاد، فإن الفقه يضع له طريقة خاصة حتى لا تسقط عنه العبادة بسبب ما لا يملك دفعه عادة. وغالبا يؤمر بأن ينظف الموضع بقدر الإمكان ويتخذ ما يلزم من حافظ أو ساتر ثم يتطهر بعد دخول الوقت ويعجل بالعبادة. وهذا المسلك يجمع بين ضبط الشريعة والرحمة بأحوال الناس الواقعية."
        },
        reference: {
          id: "Bab da'imul hadats; kaidah al-masyaqqah tajlibut taisir",
          en: "Chapters on continuous impurity; hardship brings facilitation",
          ar: "باب دائم الحدث؛ المشقة تجلب التيسير"
        }
      },
      r_already_pure: {
        status: {
          id: "Hukum asal Anda tetap suci",
          en: "Your original state remains pure",
          ar: "الأصل بقاء طهارتك"
        },
        obligation: {
          id: "Lanjutkan ibadah dan jaga adab kebersihan serta kehati-hatian yang wajar",
          en: "Continue worship while maintaining cleanliness and reasonable care",
          ar: "استمر في العبادة مع المحافظة على النظافة والاحتياط المعتدل"
        },
        explanation: {
          id: "Jika tidak ada hadas yang nyata, tidak ada najis yang terbukti, dan tidak ada sebab syar'i yang mengubah keadaan, maka hukum asal adalah suci. Ini memberi ketenangan dalam ibadah dan mencegah seseorang terlalu sibuk memeriksa hal-hal kecil tanpa dasar yang kuat. Thaharah bukan hanya soal teknis air dan najis, tetapi juga tentang keseimbangan antara kehati-hatian dan ketenangan hati.",
          en: "If there is no actual impurity, no proven najasa, and no legal cause changing the state, then the original rule is purity. This brings calmness to worship and prevents a person from becoming overly occupied with tiny details without sound basis. Purification is not only about water and impurity technically, but also about balancing care with inward composure.",
          ar: "إذا لم يوجد حدث متيقن ولا نجاسة ثابتة ولا سبب شرعي يغير الحال، فالأصل هو الطهارة. وهذا يورث الطمأنينة في العبادة ويمنع الإنسان من الاشتغال المفرط بالتفاصيل الصغيرة بلا مستند قوي. والطهارة ليست مسألة فنية في الماء والنجاسة فحسب، بل هي أيضا توازن بين الاحتياط وسكون القلب."
        },
        reference: {
          id: "Kaidah al-ashlu baqa' ma kana 'ala ma kana",
          en: "The maxim that the original state remains as it was",
          ar: "قاعدة الأصل بقاء ما كان على ما كان"
        }
      }
    }
  }
};
