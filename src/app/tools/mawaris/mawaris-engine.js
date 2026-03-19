// ================================
// MAWARIS ENGINE FINAL - JUMHUR
// ================================

// ================================
// CORE CALCULATION
// ================================
if (typeof window !== "undefined") {
  window.onerror = function(message) {
    console.error("GLOBAL ERROR:", message);
    alert("Terjadi kesalahan sistem. Silakan refresh.");
  };
}

function distributeAshabah(residue, config) {

  let totalUnits = 0n;

  for (let key in config) {
    totalUnits += BigInt(config[key]);
  }

  if (totalUnits === 0n) {
    return { shares: {}, remainder: residue };
  }

  const unitValue = residue / totalUnits;
  let distributed = 0n;
  let result = {};

  for (let key in config) {
    const share = unitValue * BigInt(config[key]);
    result[key] = share;
    distributed += share;
  }

  // 🔥 FIX SISA PEMBULATAN
  const remainderFix = residue - distributed;

  if (remainderFix > 0n) {
    const lastKey = Object.keys(result).pop();
    result[lastKey] += remainderFix;
  }

  return { shares: result, remainder: 0n };
}

function gcd(a, b) {
  return b === 0n ? a : gcd(b, a % b);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}


function handleDzawilArham(data, residue, method = "qarabah") {

  if (method === "qarabah") {
    return dzawilQarabah(data, residue);
  }

  if (method === "tanzil") {
    return dzawilTanzil(data, residue);
  }

  return { shares: {}, remainder: residue };
}

function dzawilQarabah(data, residue) {

 const groups = [

  // DERJAT 1 — Turunan Saudari
  [
    { key: "daughterOfFullSister", label: "Anak Saudari Kandung", priority: 3 },
    { key: "daughterOfPaternalSister", label: "Anak Saudari Seayah", priority: 2 },
    { key: "daughterOfMaternalSister", label: "Anak Saudari Seibu", priority: 1 },
  ],

  // DERJAT 2 — Bibi
  [
    { key: "auntFull", label: "Bibi Kandung", priority: 3 },
    { key: "auntPaternal", label: "Bibi Seayah", priority: 2 },
    { key: "auntMaternal", label: "Bibi Seibu", priority: 1 }
  ],

  // DERJAT 3 — Paman jalur ibu
  [
    { key: "uncleMaternal", label: "Paman Seibu", priority: 1 }
  ]
];

  for (let group of groups) {

    // Cari prioritas tertinggi yang ada
    let maxPriority = 0;

    for (let person of group) {
      if ((data[person.key] || 0) > 0) {
        if (person.priority > maxPriority) {
          maxPriority = person.priority;
        }
      }
    }

    if (maxPriority > 0) {

      const config = {};

      for (let person of group) {
        if (
          (data[person.key] || 0) > 0 &&
          person.priority === maxPriority
        ) {
         config[person.label] = BigInt(data[person.key]);
        }
      }

      return distributeAshabah(residue, config);
    }
  }

  return { shares: {}, remainder: residue };
}

function dzawilTanzil(data, residue) {

  let finalShares = {};

  // Anak Saudari Kandung → posisi Saudari Kandung
  if (data.daughterOfFullSister > 0) {

    const simulated = simulateAsOriginalHeir(
      "sisters",
      data.daughterOfFullSister,
      data,
      residue
    );

    if (simulated["Saudari Kandung"]) {
      finalShares["Anak Saudari Kandung"] =
        simulated["Saudari Kandung"];
    }
  }

  // Anak Saudari Seayah → posisi Saudari Seayah
  if (data.daughterOfPaternalSister > 0) {

    const simulated = simulateAsOriginalHeir(
      "paternalSisters",
      data.daughterOfPaternalSister,
      data,
      residue
    );

    if (simulated["Saudari Seayah"]) {
      finalShares["Anak Saudari Seayah"] =
        simulated["Saudari Seayah"];
    }
  }

  // Bibi Kandung → posisi Saudari Ayah (anggap sebagai paternalSisters)
  if (data.auntFull > 0) {

    const simulated = simulateAsOriginalHeir(
      "paternalSisters",
      data.auntFull,
      data,
      residue
    );

    if (simulated["Saudari Seayah"]) {
      finalShares["Bibi Kandung"] =
        simulated["Saudari Seayah"];
    }
  }

  // Anak Saudari Seibu → posisi Saudara Seibu
if (data.daughterOfMaternalSister > 0) {

  const simulated = simulateAsOriginalHeir(
    "maternalSiblings",
    data.daughterOfMaternalSister,
    data,
    residue
  );

  if (simulated["Saudara Seibu"]) {
    finalShares["Anak Saudari Seibu"] =
      simulated["Saudara Seibu"];
  }
}

// Bibi Seayah → posisi Saudari Seayah
if (data.auntPaternal > 0) {

  const simulated = simulateAsOriginalHeir(
    "paternalSisters",
    data.auntPaternal,
    data,
    residue
  );

  if (simulated["Saudari Seayah"]) {
    finalShares["Bibi Seayah"] =
      simulated["Saudari Seayah"];
  }
}

// Bibi Seibu → posisi Saudara Seibu
if (data.auntMaternal > 0) {

  const simulated = simulateAsOriginalHeir(
    "maternalSiblings",
    data.auntMaternal,
    data,
    residue
  );

  if (simulated["Saudara Seibu"]) {
    finalShares["Bibi Seibu"] =
      simulated["Saudara Seibu"];
  }
}

// Paman Seibu → posisi Saudara Seibu
if (data.uncleMaternal > 0) {

  const simulated = simulateAsOriginalHeir(
    "maternalSiblings",
    data.uncleMaternal,
    data,
    residue
  );

  if (simulated["Saudara Seibu"]) {
    finalShares["Paman Seibu"] =
      simulated["Saudara Seibu"];
  }
}

  if (Object.keys(finalShares).length > 0) {
    return { shares: finalShares, remainder: 0n };
  }

  return { shares: {}, remainder: residue };
}

function simulateAsOriginalHeir(originalHeirKey, count, data, residue) {

  const simulatedData = { ...data };

  simulatedData.daughterOfFullSister = 0;
  simulatedData.daughterOfPaternalSister = 0;
  simulatedData.daughterOfMaternalSister = 0;
  simulatedData.auntFull = 0;
  simulatedData.auntPaternal = 0;
  simulatedData.auntMaternal = 0;
  simulatedData.uncleMaternal = 0;

  simulatedData[originalHeirKey] = count;

  const result = calculateMawaris({
  ...simulatedData,
  total: residue,
  dzawilMethod: null
});

  // 🔥 FIX PROTECTION
  if (!result || !result.shares) {
    return {};
  }

  return result.shares;
}

function calculateMawaris(data) {
  let debugLog = [];

  // =======================
// DETEKSI SAUDARA (KHUSUS MUQASAMAH)
// =======================

const hasFullBrother = data.brothers > 0;
const hasFullSister = data.sisters > 0;
const hasPaternalBrother = data.paternalBrothers > 0;
const hasPaternalSister = data.paternalSisters > 0;

const hasSiblingForMuqasamah =
  hasFullBrother ||
  hasFullSister ||
  hasPaternalBrother ||
  hasPaternalSister;

  let isAwl = false;
let isRadd = false;
let muqasamahActive = false;

  const total = data.total;
  let fixedShares = {};
  let residue = total;

  const hasSon = data.sons > 0;
  const hasDaughter = data.daughters > 0;
  const hasChild = hasSon || hasDaughter;
  const hasGrandson = data.cucuLaki > 0;
  const hasGranddaughter = data.cucuPerempuan > 0;

  // ============================
// SISTEM HIJAB DASAR
// ============================

const blocksSiblings = data.father || hasSon;

  // ============================
  // SUAMI
  // ============================
  if (data.husband) {

  const denom = hasChild ? 4 : 2;
  const share = total / BigInt(denom);

  fixedShares.Suami = share;
  residue -= share;

  debugLog.push(
    hasChild
      ? "Suami mendapat 1/4 karena ada anak."
      : "Suami mendapat 1/2 karena tidak ada anak."
  );
}

  // ============================
  // ISTRI
  // ============================
  if (data.wives > 0) {
    const shareTotal = hasChild ? total / 8n : total / 4n;
    fixedShares.Istri = shareTotal;
    residue -= shareTotal;
  }

  
 // ============================
// IBU (dengan Umariyatain)
// ============================

if (data.mother) {

  const onlyParentsAndSpouse =
    !hasChild &&
    !data.brothers &&
    !data.sisters &&
    data.father &&
    (data.husband || data.wives > 0);

  if (onlyParentsAndSpouse) {

    // UMARIYATAIN
    let spouseShare = 0n;

    if (data.husband) {
      spouseShare = total / 2n;
    }

    if (data.wives > 0) {
      spouseShare = total / 4n;
    }

    const remainderAfterSpouse = total - spouseShare;

    const share = remainderAfterSpouse / 3n;

    fixedShares.Ibu = share;
    residue -= share;

  }
  
  else {

  const siblingCount =
    data.brothers + data.sisters + data.maternalSiblings;

  const share =
    (hasChild || siblingCount >= 2)
      ? total / 6n
      : total / 3n;

  fixedShares.Ibu = share;
  residue -= share;

  if (hasChild) {
    debugLog.push("Ibu mendapat 1/6 karena ada anak.");
  } else if (siblingCount >= 2) {
    debugLog.push("Ibu mendapat 1/6 karena ada ≥2 saudara.");
  } else {
    debugLog.push("Ibu mendapat 1/3 karena tidak ada anak dan tidak ada ≥2 saudara.");
  }

}

}

// ============================
// NENEK (JADDAH)
// ============================

if (!data.mother) {

  let nenekCount = 0;

  if (data.nenekIbu) nenekCount++;
  if (data.nenekAyah) nenekCount++;

  if (nenekCount > 0) {

    const shareTotal = total / 6n;
    const perNenek = shareTotal / BigInt(nenekCount);

    if (data.nenekIbu) {
      fixedShares["Nenek (Ibu dari Ibu)"] = perNenek;
    }

    if (data.nenekAyah) {
      fixedShares["Nenek (Ibu dari Ayah)"] = perNenek;
    }

    residue -= shareTotal;
  }
}

// =============================
// SAUDARA SEIBU
// =============================
if (
  data.maternalSiblings > 0 &&
  !data.father &&
  !(data.sons > 0 || data.daughters > 0) &&
  !hasFullBrother
) {

  // 1 orang → 1/6
  if (data.maternalSiblings === 1) {
    const share = total / 6n;
    fixedShares["Saudara Seibu"] = share;
    residue -= share;
  }

  // ≥2 orang → 1/3 total
else {
  const totalShare = total / 3n;
  fixedShares["Saudara Seibu"] = totalShare;
  residue -= totalShare;
}
}

// ======================================
// MUSYTARAKAH (AL-HIMARIYYAH)
// ======================================

if (
  data.husband &&
  data.mother &&
  data.maternalSiblings > 0 &&
  data.brothers > 0 &&
  !data.father &&
  !hasChild
) {

  // Reset bagian saudara seibu sebelumnya
  delete fixedShares["Saudara Seibu"];

  const oneThird = total / 3n;

  const totalPeople =
    BigInt(data.maternalSiblings + data.brothers);

  const perPerson = oneThird / totalPeople;

  // Saudara Seibu
  if (data.maternalSiblings > 0) {
    fixedShares["Saudara Seibu"] =
      perPerson * BigInt(data.maternalSiblings);
  }

  // Saudara Kandung Laki
  if (data.brothers > 0) {
    fixedShares["Saudara Kandung Laki"] =
      perPerson * BigInt(data.brothers);
  }

  residue = 0n;
}

  // ============================
// AYAH
// ============================
if (data.father) {

  if (hasSon) {
    // kalau ada anak laki, ayah hanya 1/6
    const share = total / 6n;
    fixedShares.Ayah = share;
    residue -= share;
  }

  else if (hasDaughter) {
    // kalau hanya anak perempuan
    const share = total / 6n;
    fixedShares.Ayah = share;
    residue -= share;
    // sisa nanti diambil sebagai ashabah
  }

  else {
    // tidak ada anak → ambil semua sisa
    fixedShares.Ayah = residue;
    residue = 0n;
  }
}

// ============================
// KAKEK (JADD SAHIH) - TAHAP 3
// ============================

if (!data.father && data.grandfather && !hasSiblingForMuqasamah) {

  // Jika ada anak laki → 1/6
  if (hasSon) {
    const share = total / 6n;
    fixedShares["Kakek"] = share;
    residue -= share;
  }

  // Jika hanya anak perempuan
  else if (hasDaughter) {
    const share = total / 6n;
    fixedShares["Kakek"] = share;
    residue -= share;
    // nanti bisa ambil sisa (ashabah)
  }

  // Tidak ada anak → ambil semua sisa
  else {
    fixedShares["Kakek"] = residue;
    residue = 0n;
  }
}

  // ============================
  // ANAK PEREMPUAN (FIXED SHARE)
  // ============================

  if (!hasSon && hasDaughter) {

  if (data.daughters === 1) {
  debugLog.push("Anak perempuan mendapat 1/2 karena tunggal.");
    const share = total / 2n;
    fixedShares["Anak Perempuan"] = share;
    residue -= share;
  }

  if (data.daughters >= 2) {
  debugLog.push("Anak perempuan mendapat 2/3 karena lebih dari satu.");
    const shareTotal = (total * 2n) / 3n;
    fixedShares["Anak Perempuan"] = shareTotal;
    residue -= shareTotal;
  }
}

  // ============================
  // ANAK-ANAK (ASHABAH)
  // ============================

 if (hasSon && residue > 0n) {

  debugLog.push(
    "Anak laki menjadi ashabah dan mengambil sisa harta."
  );

  const config = {};

  if (data.sons > 0)
    config["Anak Laki-laki"] = data.sons * 2;

  if (data.daughters > 0)
    config["Anak Perempuan"] = data.daughters;

  const result = distributeAshabah(residue, config);

  Object.assign(fixedShares, result.shares);
  residue = result.remainder;
}

// ============================
// CUCU (IBN AL-IBN)
// ============================

if (!hasSon) {

  // ======================
  // CUCU LAKI
  // ======================
 if (hasGrandson && residue > 0n) {

  const config = {};

  if (data.cucuLaki > 0)
    config["Cucu Laki"] = data.cucuLaki * 2;

  if (data.cucuPerempuan > 0)
    config["Cucu Perempuan"] = data.cucuPerempuan;

  const result = distributeAshabah(residue, config);

  Object.assign(fixedShares, result.shares);
  residue = result.remainder;
}


  // ======================
  // CUCU PEREMPUAN (FURUDH)
  // ======================
  else if (!hasGrandson && hasGranddaughter && data.daughters < 2) {

    // tidak ada anak sama sekali
    if (!hasChild) {

      if (data.cucuPerempuan === 1) {
        const share = total / 2n;
        fixedShares["Cucu Perempuan"] = share;
        residue -= share;
      }

      else if (data.cucuPerempuan >= 2) {
        const shareTotal = (total * 2n) / 3n;
        fixedShares["Cucu Perempuan"] = shareTotal;
        residue -= shareTotal;
      }

    }

    // ada satu anak perempuan → takmilah 1/6
    else if (hasDaughter && data.daughters === 1) {

      const share = total / 6n;
      fixedShares["Cucu Perempuan"] = share;
      residue -= share;
    }

  }
}

// ============================
// HITUNG ASAL MASALAH (FINAL BERSIH)
// ============================

let denominators = [];

// =====================
// FURUDH UTAMA
// =====================

// Suami
if (data.husband) {
  denominators.push(hasChild ? 4n : 2n);
}

// Istri
if (data.wives > 0) {
  denominators.push(hasChild ? 8n : 4n);
}

// Ibu
if (data.mother) {
  const siblingCount =
    data.brothers + data.sisters + data.maternalSiblings;

  denominators.push(
    (hasChild || siblingCount >= 2) ? 6n : 3n
  );
}

// Nenek
if (!data.mother && (data.nenekIbu || data.nenekAyah)) {
  denominators.push(6n);
}

// Anak perempuan (tanpa anak laki)
if (data.daughters > 0 && !hasSon) {
  denominators.push(
    data.daughters === 1 ? 2n : 3n
  );
}

// Cucu perempuan (furudh)
if (
  data.cucuPerempuan > 0 &&
  !hasSon &&
  !hasGrandson
) {

  // tak ada anak sama sekali
  if (!hasDaughter) {
    denominators.push(
      data.cucuPerempuan === 1 ? 2n : 3n
    );
  }

  // takmilah 1/6
  else if (hasDaughter && data.daughters === 1) {
    denominators.push(6n);
  }
}

// Saudara seibu
if (
  data.maternalSiblings > 0 &&
  !data.father &&
  !hasChild
) {
  denominators.push(
    data.maternalSiblings === 1 ? 6n : 3n
  );
}

// Saudari kandung (furudh saja)
if (
  !blocksSiblings &&
  !hasChild &&
  data.sisters > 0 &&
  data.brothers === 0
) {
  denominators.push(
    data.sisters === 1 ? 2n : 3n
  );
}

// Saudari seayah (furudh saja)
if (
  !data.father &&
  !hasChild &&
  data.paternalSisters > 0 &&
  data.paternalBrothers === 0 &&
  data.brothers === 0
) {
  denominators.push(
    data.paternalSisters === 1 ? 2n : 3n
  );
}

// =====================
// HITUNG KPK
// =====================

let asalMasalahNumber = 1n;

if (denominators.length > 0) {
  asalMasalahNumber = denominators[0];

  for (let i = 1; i < denominators.length; i++) {
    asalMasalahNumber =
      lcm(asalMasalahNumber, denominators[i]);
  }
}

// ======================================
// AKDARIYYAH (SPECIAL CASE - FIXED)
// ======================================

if (
  data.husband &&
  data.mother &&
  data.sisters === 1 &&
  data.grandfather &&
  !data.father &&
  !hasChild
) {

  const suamiShare = (total * 3n) / 8n;
  const ibuShare = (total * 2n) / 8n;
  const saudariShare = (total * 1n) / 8n;
  const kakekShare = (total * 2n) / 8n;

  return {
    shares: {
      "Suami": suamiShare,
      "Ibu": ibuShare,
      "Saudari Kandung": saudariShare,
      "Kakek": kakekShare
    },
    awl: false,
    radd: false,
    status: "Kasus khusus Akdariyyah.",
    asalMasalah: 8n,
    asalBeforeAwl: null,
    fractionDetail: {
      "Suami": { numerator: suamiShare, denominator: total },
      "Ibu": { numerator: ibuShare, denominator: total },
      "Saudari Kandung": { numerator: saudariShare, denominator: total },
      "Kakek": { numerator: kakekShare, denominator: total }
    },
    debug: ["Kasus Akdariyyah dieksekusi."]
  };
}

// ===================================
// MUQASAMAH KAKEK - FINAL FIQH FIXED
// ===================================

if (
  residue > 0n &&
  !data.father &&
  data.grandfather &&
  !hasSon &&
  (
    data.brothers > 0 ||
    data.sisters > 0 ||
    data.paternalBrothers > 0 ||
    data.paternalSisters > 0
  )
) {

  // Saudara kandung menghalangi seayah
  let fullBrothers = data.brothers;
  let fullSisters = data.sisters;

  let paternalBrothers =
    (fullBrothers > 0 || fullSisters > 0)
      ? 0
      : data.paternalBrothers;

  let paternalSisters =
    (fullBrothers > 0 || fullSisters > 0)
      ? 0
      : data.paternalSisters;

  let siblingUnits =
    BigInt(fullBrothers * 2 +
           fullSisters +
           paternalBrothers * 2 +
           paternalSisters);

  // 1️⃣ Opsi 1: 1/6 dari total
let oneSixth = total / 6n;

  // 2️⃣ Opsi 2: 1/3 dari sisa
  let oneThirdResidue = residue / 3n;

  // 3️⃣ Opsi 3: Muqasamah (2 unit untuk kakek)
  let muqasamahUnits = siblingUnits + 2n;
  let muqasamahShare =
    (residue * 2n) / muqasamahUnits;

  // Pilih yang terbesar
  let bestShare = oneSixth;
  let mode = "sixth";

  if (oneThirdResidue > bestShare) {
    bestShare = oneThirdResidue;
    mode = "third";
  }

  if (muqasamahShare > bestShare) {
    bestShare = muqasamahShare;
    mode = "muqasamah";
  }

  // Aktifkan pengunci
  muqasamahActive = true;

  // ======== EKSEKUSI ========

 if (mode === "muqasamah") {

  const config = {};

  config["Kakek"] = 2;

  if (fullBrothers > 0)
    config["Saudara Kandung Laki"] = fullBrothers * 2;

  if (fullSisters > 0)
    config["Saudari Kandung"] = fullSisters;

  if (paternalBrothers > 0)
    config["Saudara Seayah Laki"] = paternalBrothers * 2;

  if (paternalSisters > 0)
    config["Saudari Seayah"] = paternalSisters;

  const result = distributeAshabah(residue, config);
  Object.assign(fixedShares, result.shares);

} else {

  fixedShares["Kakek"] = bestShare;

  let newResidue = residue - bestShare;

  if (siblingUnits > 0n) {

    const config = {};

    if (fullBrothers > 0)
      config["Saudara Kandung Laki"] = fullBrothers * 2;

    if (fullSisters > 0)
      config["Saudari Kandung"] = fullSisters;

    const result = distributeAshabah(newResidue, config);
    Object.assign(fixedShares, result.shares);
  }
}

residue = 0n;
}

// ======================================
// ASHABAH MA'AL GHAIR (KITAB VERSION)
// ======================================

if (
  !data.father &&
  !data.grandfather &&
  !hasSon &&
  residue > 0n &&
  (
    hasDaughter ||
    (data.cucuPerempuan > 0 && !hasGrandson)
  )
) {

  // Saudari Kandung
  if (data.sisters > 0) {

    const share = residue;
    fixedShares["Saudari Kandung"] =
      (fixedShares["Saudari Kandung"] || 0n) + share;

    residue = 0n;
  }

  // Saudari Seayah (kalau tidak ada saudari kandung)
  else if (
    data.paternalSisters > 0 &&
    data.sisters === 0
  ) {

    const share = residue;
    fixedShares["Saudari Seayah"] =
      (fixedShares["Saudari Seayah"] || 0n) + share;

    residue = 0n;
  }
}

// ======================================
// SAUDARA KANDUNG (FINAL FIXED VERSION)
// ======================================

const hasBrother = data.brothers > 0;
const hasSister = data.sisters > 0;

if (!blocksSiblings && !hasChild && !muqasamahActive) {

  debugLog.push(
  "Saudara kandung menjadi ashabah, bagian laki-laki 2x perempuan."
);

  // 1️⃣ Ada saudara laki → ashabah
  if (hasBrother && residue > 0n) {

  let distributed = 0n; // 🔥 TAMBAHKAN INI

  const totalUnit =
    (data.brothers > 0 ? data.brothers * 2 : 0) +
    (data.sisters > 0 ? data.sisters : 0);

  const unitValue = residue / BigInt(totalUnit);

  if (data.brothers > 0) {
    const shareLaki =
      unitValue * 2n * BigInt(data.brothers);

    fixedShares["Saudara Kandung Laki"] = shareLaki;
    distributed += shareLaki;
  }

  if (data.sisters > 0) {
    const sharePerempuan =
      unitValue * BigInt(data.sisters);

    fixedShares["Saudari Kandung"] = sharePerempuan;
    distributed += sharePerempuan;
  }

  const remainderFix = residue - distributed;

  if (remainderFix > 0n) {
    if (data.brothers > 0) {
      fixedShares["Saudara Kandung Laki"] += remainderFix;
    } else if (data.sisters > 0) {
      fixedShares["Saudari Kandung"] += remainderFix;
    }
  }

  residue = 0n;
}
  // 2️⃣ Tidak ada saudara laki
  else if (!hasBrother && hasSister) {

    // 🔹 Ada anak perempuan → tashib ma'al ghair
    if (hasDaughter && residue > 0n) {

      const perSister =
        residue / BigInt(data.sisters);

      fixedShares["Saudari Kandung"] =
        perSister * BigInt(data.sisters);

      residue = 0n;
    }

    // 🔹 Furudh
    else {

      if (data.sisters === 1) {

        const share = total / 2n;
        fixedShares["Saudari Kandung"] = share;
        residue -= share;

        // 🔥 TAKMILAH 1/6
        if (data.paternalSisters > 0) {

          const takmilah = total / 6n;
          fixedShares["Saudari Seayah"] = takmilah;
          residue -= takmilah;

        }

      }

      else if (data.sisters >= 2) {

        const shareTotal = (total * 2n) / 3n;
        fixedShares["Saudari Kandung"] = shareTotal;
        residue -= shareTotal;

      }
    }
  }
}

// ======================================
// SAUDARI SEAYAH (FINAL STABLE VERSION)
// ======================================

const blockedByTwoFullSisters = data.sisters >= 2;
const blockedByFullBrother = data.brothers > 0;

if (
  !data.father &&
  !hasSon &&
  !blockedByFullBrother &&
  !blockedByTwoFullSisters &&
  !muqasamahActive
) {

  // TAKMILAH (hanya jika 1 anak perempuan)
if (
  hasDaughter &&
  data.daughters === 1 &&
  hasPaternalSister &&
  !hasFullSister &&
  !data.father &&
  !data.grandfather &&
  residue > 0n
){

    const share = total / 6n; // takmilah
    fixedShares["Saudari Seayah"] = share;
    residue -= share;
  }

  // 2️⃣ Ada saudara laki seayah → ashabah
  else if (hasPaternalBrother && residue > 0n) {

    const config = {};

    if (data.paternalBrothers > 0)
      config["Saudara Seayah Laki"] =
        data.paternalBrothers * 2;

    if (data.paternalSisters > 0)
      config["Saudari Seayah"] =
        data.paternalSisters;

    const result = distributeAshabah(residue, config);

    Object.assign(fixedShares, result.shares);
    residue = result.remainder;
  }

  // 3️⃣ Furudh normal (tidak ada anak)
  else if (
    !hasChild &&
    hasPaternalSister &&
    !hasFullSister
  ) {

    if (data.paternalSisters === 1) {

      const share = total / 2n;
      fixedShares["Saudari Seayah"] = share;
      residue -= share;

    } else if (data.paternalSisters >= 2) {

      const shareTotal = (total * 2n) / 3n;
      fixedShares["Saudari Seayah"] = shareTotal;
      residue -= shareTotal;
    }
  }
}

// ============================
// KHUSUS: AYAH JADI ASHABAH
// ============================

if (data.father && !hasSon && hasDaughter) {

  if (residue > 0n) {
    fixedShares["Ayah"] += residue;
    residue = 0n;
  }

}

// ============================
// KAKEK JADI ASHABAH
// ============================

if (!muqasamahActive && !data.father && data.grandfather && !hasSon && hasDaughter) {
  if (residue > 0n) {
    fixedShares["Kakek"] = (fixedShares["Kakek"] || 0n) + residue;
    residue = 0n;
  }
}

// ======================================
// EXTENDED ASHABAH (NASAB LEVEL LANJUT)
// ======================================

if (residue > 0n && !muqasamahActive) {

  const blocked =
    data.sons > 0 ||
    data.cucuLaki > 0 ||
    data.father ||
    data.grandfather ||
    data.brothers > 0 ||
    data.paternalBrothers > 0;

  if (!blocked) {

    const hierarchy = [

      { key: "nephewFull", label: "Anak Saudara Kandung Laki" },
      { key: "nephewPaternal", label: "Anak Saudara Seayah Laki" },

      { key: "uncleFull", label: "Paman Kandung" },
      { key: "unclePaternal", label: "Paman Seayah" },

      { key: "cousinFull", label: "Anak Paman Kandung" },
      { key: "cousinPaternal", label: "Anak Paman Seayah" }

    ];

    for (let level of hierarchy) {

      const count = data[level.key] || 0;

     if (count > 0) {

  const config = {};
  config[level.label] = count;

  const result = distributeAshabah(residue, config);

  Object.assign(fixedShares, result.shares);
  residue = 0n;
  break;
}
    }
  }
}

// ======================================
// DZAWIL ARHAM (MODULAR)
// ======================================

if (residue > 0n && !muqasamahActive) {

  const result = handleDzawilArham(
    data,
    residue,
    data.dzawilMethod
  );

  if (Object.keys(result.shares).length > 0) {
    Object.assign(fixedShares, result.shares);
    residue = result.remainder;
  }
}


// ======================================
// CEK RADD (FINAL - PROPORSIONAL)
// ======================================

if (residue > 0n && !muqasamahActive) {

  let totalEligible = 0n;

  for (let ahli in fixedShares) {

    // 🔥 Perbedaan mazhab
    if (data.mazhab === "syafii") {
      if (ahli !== "Suami" && ahli !== "Istri")
        totalEligible += fixedShares[ahli];
    } else {
      // Hanafi → semua termasuk pasangan
      totalEligible += fixedShares[ahli];
    }
  }

  if (totalEligible === 0n) {
  residue = 0n; 
} 
else {

    isRadd = true;
debugLog.push("Terjadi Radd karena masih ada sisa harta.");

    for (let ahli in fixedShares) {

  if (data.mazhab === "syafii") {
    if (ahli === "Suami" || ahli === "Istri") continue;
  }

  const originalShare = fixedShares[ahli];

  const tambahan =
    (originalShare * residue) / totalEligible;

  fixedShares[ahli] += tambahan;
}

    residue = 0n;

    // 🔥 FIX ROUNDING SETELAH RADD
    let distributedAfterRadd = 0n;

    for (let ahli in fixedShares) {
      distributedAfterRadd += fixedShares[ahli];
    }

    const remainderFix = total - distributedAfterRadd;

    if (remainderFix > 0n) {
      const lastKey = Object.keys(fixedShares).pop();
      fixedShares[lastKey] += remainderFix;
    }
  }
}

// ============================
// CEK 'AWL
// ============================

let totalDistributed = 0n;

for (let ahli in fixedShares) {
  totalDistributed += fixedShares[ahli];
}

let asalBeforeAwl = null;

if (totalDistributed > total && !muqasamahActive) {

  isAwl = true;
debugLog.push("Terjadi 'Awl karena total bagian melebihi harta.");

  asalBeforeAwl = asalMasalahNumber;

  asalMasalahNumber =
  (asalMasalahNumber * totalDistributed) / total;

  for (let ahli in fixedShares) {
  fixedShares[ahli] =
    (fixedShares[ahli] * total) / totalDistributed;
}

// 🔥 FIX ROUNDING SETELAH AWL
let distributedAfterAwl = 0n;

for (let ahli in fixedShares) {
  distributedAfterAwl += fixedShares[ahli];
}

const remainderFixAwl = total - distributedAfterAwl;

if (remainderFixAwl !== 0n) {
  const lastKey = Object.keys(fixedShares).pop();
  fixedShares[lastKey] += remainderFixAwl;
}

}

// ======================================
// BAITUL MAAL (FINAL FALLBACK)
// ======================================

if (Object.keys(fixedShares).length === 0 && residue > 0n) {
  fixedShares["Baitul Maal"] = residue;
  residue = 0n;
}

// =====================
// STATUS
// =====================

let asalMasalah;

if (isAwl) {
  asalMasalah =
    "Terjadi 'Awl (asal masalah bertambah karena total bagian melebihi harta).";
}
else if (isRadd) {
  asalMasalah =
    "Terjadi Radd (ada sisa harta yang dikembalikan).";
}
else {
  asalMasalah =
    "Asal masalah normal (tidak terjadi 'Awl atau Radd).";
}

// 🔥 FINAL HARD BALANCING (GLOBAL FIX)
let finalCheck = 0n;

for (let ahli in fixedShares) {
  finalCheck += fixedShares[ahli];
}

const finalDiff = total - finalCheck;

if (finalDiff !== 0n) {
  const lastKey = Object.keys(fixedShares).pop();
  fixedShares[lastKey] += finalDiff;
}

// ============================
// SIMPAN PECAHAN FIQH
// ============================

let fractionDetail = {};

for (let ahli in fixedShares) {
  fractionDetail[ahli] = {
    numerator: fixedShares[ahli],
    denominator: total
  };
}


return {
  shares: fixedShares,
  awl: isAwl,
  radd: isRadd,
  status: asalMasalah,
  asalMasalah: asalMasalahNumber,
  asalBeforeAwl: asalBeforeAwl,
  fractionDetail: fractionDetail,
  debug: debugLog
};
}

// ================================
// UI WRAPPER
// ================================
function hitungMawaris() {

  const btn =
    document.getElementById("hitungMawarisBtn") ||
    document.querySelector(".form-box button");

  if (!btn) {
    return;
  }

  btn.disabled = true;
  btn.innerText = "Menghitung...";

  const totalInput = document.getElementById("totalHarta").value;

  // ✅ Deklarasi dulu di luar object
  let totalValue = 0n;

try {
  totalValue = totalInput ? BigInt(totalInput) : 0n;
} catch {
  alert("Input total harus angka tanpa simbol.");
  btn.disabled = false;
  btn.innerText = "Hitung";
  return;
}

  const data = {
    total: totalValue,
    husband: document.getElementById("suami").checked,
    wives: parseInt(document.getElementById("istri").value) || 0,
    father: document.getElementById("ayah").checked,
    mother: document.getElementById("ibu").checked,
    sons: parseInt(document.getElementById("anakLaki").value) || 0,
    daughters: parseInt(document.getElementById("anakPerempuan").value) || 0,
    brothers: parseInt(document.getElementById("saudaraKandung").value) || 0,
    sisters: parseInt(document.getElementById("saudariKandung").value) || 0,
    maternalSiblings: parseInt(document.getElementById("maternalSiblings").value) || 0,
    paternalBrothers: parseInt(document.getElementById("saudaraSeayah").value) || 0,
    paternalSisters: parseInt(document.getElementById("saudariSeayah").value) || 0,
    grandfather: document.getElementById("kakek").checked,
    nenekIbu: document.getElementById("nenekIbu").checked,
    nenekAyah: document.getElementById("nenekAyah").checked,
    cucuLaki: parseInt(document.getElementById("cucuLaki").value) || 0,
    cucuPerempuan: parseInt(document.getElementById("cucuPerempuan").value) || 0,
    nephewFull: parseInt(document.getElementById("nephewFull").value) || 0,
    nephewPaternal: parseInt(document.getElementById("nephewPaternal").value) || 0,
    uncleFull: parseInt(document.getElementById("uncleFull").value) || 0,
    unclePaternal: parseInt(document.getElementById("unclePaternal").value) || 0,
    cousinFull: parseInt(document.getElementById("cousinFull").value) || 0,
    cousinPaternal: parseInt(document.getElementById("cousinPaternal").value) || 0,
    auntFull: parseInt(document.getElementById("auntFull").value) || 0,
    daughterOfFullSister: parseInt(document.getElementById("daughterOfFullSister").value) || 0,
    daughterOfPaternalSister: parseInt(document.getElementById("daughterOfPaternalSister").value) || 0,
    daughterOfMaternalSister: parseInt(document.getElementById("daughterOfMaternalSister").value) || 0,
    auntPaternal: parseInt(document.getElementById("auntPaternal").value) || 0,
    auntMaternal: parseInt(document.getElementById("auntMaternal").value) || 0,
    uncleMaternal: parseInt(document.getElementById("uncleMaternal").value) || 0,
    mazhab: document.getElementById("mazhab").value,
    dzawilMethod: document.getElementById("dzawilMethod").value
  };

  const hasAnyHeir =
  data.husband ||
  data.wives > 0 ||
  data.father ||
  data.mother ||
  data.sons > 0 ||
  data.daughters > 0 ||
  data.brothers > 0 ||
  data.sisters > 0 ||
  data.paternalBrothers > 0 ||
  data.paternalSisters > 0 ||
  data.maternalSiblings > 0 ||
  data.grandfather ||
  data.cucuLaki > 0 ||
  data.cucuPerempuan > 0 ||
  data.nephewFull > 0 ||
  data.nephewPaternal > 0 ||
  data.uncleFull > 0 ||
  data.unclePaternal > 0 ||
  data.cousinFull > 0 ||
  data.cousinPaternal > 0 ||
  data.auntFull > 0 ||
  data.auntPaternal > 0 ||
  data.auntMaternal > 0 ||
  data.uncleMaternal > 0 ||
  data.daughterOfFullSister > 0 ||
  data.daughterOfPaternalSister > 0 ||
  data.daughterOfMaternalSister > 0;

if (!hasAnyHeir) {
  alert("Minimal pilih satu ahli waris.");
  btn.disabled = false;
  btn.innerText = "Hitung";
  return;
}

  if (data.total <= 0n) {
  alert("Masukkan jumlah harta yang valid.");
  btn.disabled = false;
  btn.innerText = "Hitung";
  return;
}

  // ============================
// VALIDASI DASAR
// ============================

if (data.father && data.grandfather) {
 alert("Ayah dan Kakek tidak mungkin ada bersamaan.");
btn.disabled = false;
btn.innerText = "Hitung";
return;
}

// ============================
// VALIDASI HIJAB SAUDARA OLEH AYAH
// ============================

if (data.father) {
  if (
    data.brothers > 0 ||
    data.sisters > 0 ||
    data.paternalBrothers > 0 ||
    data.paternalSisters > 0
  ) {
    alert("Saudara terhalang karena ada Ayah.");

    data.brothers = 0;
    data.sisters = 0;
    data.paternalBrothers = 0;
    data.paternalSisters = 0;

    document.getElementById("saudaraKandung").value = 0;
    document.getElementById("saudariKandung").value = 0;
    document.getElementById("saudaraSeayah").value = 0;
    document.getElementById("saudariSeayah").value = 0;
  }
}

// ============================
// VALIDASI HIJAB NENEK OLEH IBU
// ============================

if (data.mother && (data.nenekIbu || data.nenekAyah)) {
  alert("Nenek terhalang karena ada Ibu.");

  data.nenekIbu = false;
  data.nenekAyah = false;
}

// ============================
// VALIDASI SAUDARA SEIBU
// ============================

if (
  data.maternalSiblings > 0 &&
  (
    data.father ||
    data.grandfather ||
    data.sons > 0 ||
    data.daughters > 0
  )
) {
  alert("Saudara seibu terhalang karena ada Ayah, Kakek, atau Anak.");
  data.maternalSiblings = 0;
}

// ============================
// VALIDASI HIJAB CUCU
// ============================

if (data.sons > 0 && (data.cucuLaki > 0 || data.cucuPerempuan > 0)) {
  alert("Cucu terhalang karena ada Anak Laki.");

  data.cucuLaki = 0;
  data.cucuPerempuan = 0;
}

  console.log("DATA:", data);

const resultData = calculateMawaris(data);

// 🔥 VALIDASI HASIL DI SINI
if (!resultData || Object.keys(resultData.shares).length === 0) {
  alert("Silakan pilih minimal satu ahli waris.");
  btn.disabled = false;
  btn.innerText = "Hitung";
  return;
}

const result = resultData.shares;

let totalCheck = 0n;

for (let ahli in result) {
  totalCheck += result[ahli];
}

if (totalCheck - data.total !== 0n) {
  console.error("Mismatch total:", totalCheck, data.total);
  alert("Terjadi kesalahan pembulatan internal.");
  btn.disabled = false;
  btn.innerText = "Hitung";
  return;
}

console.log("RESULT:", result);

let output = "<h3>Hasil Pembagian:</h3>";

 for (let ahli in result) {

  let nilai = result[ahli];

  // mapping jumlah orang
  const countMap = {

  // Anak
  "Anak Laki-laki": data.sons,
  "Anak Perempuan": data.daughters,

  // Saudara Kandung
  "Saudara Kandung Laki": data.brothers,
  "Saudari Kandung": data.sisters,

  // Saudara Seayah
  "Saudara Seayah Laki": data.paternalBrothers,
  "Saudari Seayah": data.paternalSisters,

  // Saudara Seibu
  "Saudara Seibu": data.maternalSiblings,

  // Cucu
  "Cucu Laki": data.cucuLaki,
  "Cucu Perempuan": data.cucuPerempuan,

  // Extended Ashabah
  "Anak Saudara Kandung Laki": data.nephewFull,
  "Anak Saudara Seayah Laki": data.nephewPaternal,
  "Paman Kandung": data.uncleFull,
  "Paman Seayah": data.unclePaternal,
  "Anak Paman Kandung": data.cousinFull,
  "Anak Paman Seayah": data.cousinPaternal,

  // Dzawil Arham
  "Anak Saudari Kandung": data.daughterOfFullSister,
  "Anak Saudari Seayah": data.daughterOfPaternalSister,
  "Anak Saudari Seibu": data.daughterOfMaternalSister,
  "Bibi Kandung": data.auntFull,
  "Bibi Seayah": data.auntPaternal,
  "Bibi Seibu": data.auntMaternal,
  "Paman Seibu": data.uncleMaternal

};

  const jumlah = countMap[ahli];

  if (jumlah && jumlah > 1) {
    const perOrang = nilai / BigInt(jumlah);
    output += `<p>${ahli} (per orang): Rp ${perOrang.toLocaleString()}</p>`;
  } else {
    output += `<p>${ahli}: Rp ${nilai.toLocaleString()}</p>`;
  }
}

if (resultData.awl) {
  output += `<p style="color:orange;"><strong>Keterangan:</strong> Terjadi 'Awl (penyesuaian proporsional karena total bagian melebihi harta).</p>`;
}

if (resultData.radd) {
  output += `<p style="color:green;"><strong>Keterangan:</strong> Terjadi Radd (sisa harta dikembalikan kepada ahli waris selain suami/istri).</p>`;
}

output += `<p style="margin-top:10px;"><strong>Status Perhitungan:</strong> ${resultData.status}</p>`;
output += `<hr><h4>Detail Akademik:</h4>`;

for (let ahli in resultData.fractionDetail) {
  const frac = resultData.fractionDetail[ahli];
  output += `<p>${ahli}: ${frac.numerator} / ${frac.denominator}</p>`;
}

if (resultData.awl) {
  output += `<p><strong>Asal Masalah:</strong> ${resultData.asalBeforeAwl} -> ${resultData.asalMasalah}</p>`;
} else {
  output += `<p><strong>Asal Masalah:</strong> ${resultData.asalMasalah}</p>`;
}
  const mode = document.getElementById("mode").value;

if (mode === "academic") {

  output += "<hr><h4>Penjelasan Fiqh Detail:</h4>";

  const fiqhSteps = buildFiqhExplanation(data, resultData);

  fiqhSteps.forEach(step => {
    output += `<p>${step}</p>`;
  });

}

setTimeout(() => {

  document.getElementById("hasil").innerHTML = output;

  const ctx = document.getElementById("chartMawaris");

  if (window.mawarisChart) {
    window.mawarisChart.destroy();
  }

  window.mawarisChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(result),
      datasets: [{
        data: Object.values(result).map(v => Number(v)),
      }]
    }
  });

  document.getElementById("hasil")
    .scrollIntoView({ behavior: "smooth" });

  btn.disabled = false;
  btn.innerText = "Hitung";

}, 200);

}

function bindNonNegativeInputs() {
  document.querySelectorAll("input[type='number']")
  .forEach(input => {
    if (input.dataset.mawarisBound === "1") {
      return;
    }

    input.dataset.mawarisBound = "1";
    input.addEventListener("input", () => {
      if (parseInt(input.value) < 0) {
        input.value = 0;
      }
    });
  });
}

function exportPDF() {

  const hasil = document.getElementById("hasil");

  if (!hasil || hasil.innerText.trim() === "") {
    alert("Klik Hitung dulu sebelum download.");
    return;
  }

  if (!window.jspdf) {
    alert("Library jsPDF tidak ditemukan.");
    return;
  }

  const doc = new window.jspdf.jsPDF();

  const lines = doc.splitTextToSize(
    hasil.innerText,
    180
  );

  doc.text(lines, 15, 20);

  doc.save("Hasil_Mawaris.pdf");
}

function compareDzawil() {

  const totalInput = document.getElementById("totalHarta").value;

  let totalValue = 0n;

  try {
    totalValue = totalInput ? BigInt(totalInput) : 0n;
  } catch {
    alert("Input total harus angka.");
    return;
  }

  const baseData = {
    ...getFormData(totalValue),
    dzawilMethod: document.getElementById("dzawilMethod").value
  };

  const qarabah = calculateMawaris({
    ...baseData,
    dzawilMethod: "qarabah"
  });

  const tanzil = calculateMawaris({
    ...baseData,
    dzawilMethod: "tanzil"
  });

  buildComparisonTable(qarabah.shares, tanzil.shares);
}

function getFormData(totalValue) {

  return {
    total: BigInt(totalValue),

    husband: document.getElementById("suami")?.checked || false,
    wives: parseInt(document.getElementById("istri")?.value) || 0,

    father: document.getElementById("ayah")?.checked || false,
    mother: document.getElementById("ibu")?.checked || false,

    sons: parseInt(document.getElementById("anakLaki")?.value) || 0,
    daughters: parseInt(document.getElementById("anakPerempuan")?.value) || 0,

    brothers: parseInt(document.getElementById("saudaraKandung")?.value) || 0,
    sisters: parseInt(document.getElementById("saudariKandung")?.value) || 0,

    paternalBrothers: parseInt(document.getElementById("saudaraSeayah")?.value) || 0,
    paternalSisters: parseInt(document.getElementById("saudariSeayah")?.value) || 0,

    maternalSiblings: parseInt(document.getElementById("maternalSiblings")?.value) || 0,

    daughterOfFullSister:
      parseInt(document.getElementById("daughterOfFullSister")?.value) || 0,

    daughterOfPaternalSister:
      parseInt(document.getElementById("daughterOfPaternalSister")?.value) || 0,

    daughterOfMaternalSister:
      parseInt(document.getElementById("daughterOfMaternalSister")?.value) || 0,

    auntFull:
      parseInt(document.getElementById("auntFull")?.value) || 0,

    auntPaternal:
      parseInt(document.getElementById("auntPaternal")?.value) || 0,

    auntMaternal:
      parseInt(document.getElementById("auntMaternal")?.value) || 0,

    uncleMaternal:
      parseInt(document.getElementById("uncleMaternal")?.value) || 0,

    mazhab: document.getElementById("mazhab")?.value || "syafii",
    dzawilMethod: document.getElementById("dzawilMethod")?.value || "qarabah"
  };
}

function buildComparisonTable(qShares, tShares) {

  const allHeirs = new Set([
    ...Object.keys(qShares),
    ...Object.keys(tShares)
  ]);

  let output = "<h3>Perbandingan Qarabah vs Tanzil</h3>";
  output += `<table border="1" style="width:100%; text-align:center; border-collapse:collapse;">`;
  output += `
    <tr>
      <th>Ahli Waris</th>
      <th>Qarabah</th>
      <th>Tanzil</th>
      <th>Selisih</th>
    </tr>
  `;

  for (let ahli of allHeirs) {

    const qVal = qShares[ahli] || 0n;
    const tVal = tShares[ahli] || 0n;

    const diff = qVal - tVal;

    output += `
      <tr>
        <td>${ahli}</td>
        <td>${qVal.toLocaleString()}</td>
        <td>${tVal.toLocaleString()}</td>
        <td>${diff.toLocaleString()}</td>
      </tr>
    `;
  }

  output += "</table>";

  document.getElementById("hasil").innerHTML = output;
}

function buildFiqhExplanation(data, resultData) {

  let explain = [];

  explain.push("1. Identifikasi Ahli Waris:");

  const heirs = Object.keys(resultData.shares);
  explain.push("Terdapat: " + heirs.join(", ") + ".");

  explain.push(" ");

  explain.push("2. Penetapan Furudh:");

  if (data.husband) {
    explain.push("Suami termasuk ahli waris furudh.");
    if (data.sons > 0 || data.daughters > 0) {
      explain.push("Karena ada anak, suami mendapat 1/4.");
    } else {
      explain.push("Karena tidak ada anak, suami mendapat 1/2.");
    }
  }

  explain.push(" ");

  explain.push("3. Pemeriksaan Sisa Harta:");

  if (resultData.radd) {
    explain.push("Terjadi Radd karena masih ada sisa harta.");
  } else if (resultData.awl) {
    explain.push("Terjadi 'Awl karena bagian melebihi harta.");
  } else {
    explain.push("Sisa harta diberikan sesuai urutan ahli waris.");
  }

  explain.push(" ");

  explain.push("4. Dzawil Arham:");

  if (
    data.daughterOfFullSister > 0 &&
    resultData.shares["Anak Saudari Kandung"]
  ) {
    explain.push(
      "Anak Saudari Kandung termasuk dzawil arham derajat pertama."
    );

    if (data.dzawilMethod === "qarabah") {
      explain.push(
        "Dengan metode Qarabah (Jumhur), derajat terdekat menerima seluruh sisa."
      );
    }

    if (data.dzawilMethod === "tanzil") {
      explain.push(
        "Dengan metode Tanzil, ia diposisikan sebagai Saudari Kandung."
      );
    }
  }

  explain.push(" ");

  explain.push("5. Kesimpulan:");

  for (let ahli in resultData.shares) {
    explain.push(
      ahli +
        " = " +
        resultData.fractionDetail[ahli].numerator +
        " / " +
        resultData.fractionDetail[ahli].denominator
    );
  }

  return explain;
}

function updateCompareButtonState() {

  const dzawilFields = [
    "daughterOfFullSister",
    "daughterOfPaternalSister",
    "daughterOfMaternalSister",
    "auntFull",
    "auntPaternal",
    "auntMaternal",
    "uncleMaternal"
  ];

  let hasDzawil = false;

  for (let id of dzawilFields) {
    const el = document.getElementById(id);
    if (el && parseInt(el.value) > 0) {
      hasDzawil = true;
      break;
    }
  }

  const btn = document.getElementById("compareBtn");

  if (btn) {
    btn.disabled = !hasDzawil;
    btn.style.opacity = hasDzawil ? "1" : "0.5";
  }
}

function bindCompareFieldListeners() {
  [
    "daughterOfFullSister",
    "daughterOfPaternalSister",
    "daughterOfMaternalSister",
    "auntFull",
    "auntPaternal",
    "auntMaternal",
    "uncleMaternal"
  ].forEach(id => {

    const el = document.getElementById(id);

    if (el && el.dataset.compareBound !== "1") {
      el.dataset.compareBound = "1";
      el.addEventListener("input", updateCompareButtonState);
    }

  });
}

function initMawarisPage() {
  bindNonNegativeInputs();
  bindCompareFieldListeners();
  updateCompareButtonState();
}

if (typeof window !== "undefined") {
  window.calculateMawaris = calculateMawaris;
  window.compareDzawil = compareDzawil;
  window.exportPDF = exportPDF;
  window.hitungMawaris = hitungMawaris;
  window.initMawarisPage = initMawarisPage;
}

export {
  calculateMawaris,
  compareDzawil,
  exportPDF,
  hitungMawaris,
  initMawarisPage
};
