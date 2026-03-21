import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = path.join(process.cwd(), "content", "articles");

function normalizeSlugKey(value = "") {
  return String(value || "")
    .replace(/\u00a0/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
    .replace(/\-+/g, "-")
    .replace(/^\-+|\-+$/g, "");
}

const categoryMap = {
  "ilmu syariah": "ilmusyariah",
  "ilmu-syariah": "ilmusyariah",
  ilmusyariah: "ilmusyariah",
  "islamic law": "ilmusyariah",
  "sharia sciences": "ilmusyariah",
  "الفقه الإسلامي": "ilmusyariah",
  "العلوم الشرعية": "ilmusyariah",

  hadis: "hadis",
  hadith: "hadis",
  "الحديث": "hadis",

  ibadah: "ibadah",
  worship: "ibadah",
  "العبادة": "ibadah",

  "qur'an": "quran",
  quran: "quran",
  "القرآن": "quran",

  tasawuf: "tasawuf",
  "التصوف": "tasawuf",

  pemikiran: "pemikiran",
  thought: "pemikiran",
  "الفكر": "pemikiran",

  politik: "politik",
  politics: "politik",
  "السياسة": "politik",

  ramadhan: "ramadhan",
  ramadan: "ramadhan",
  "رمضان": "ramadhan",

  keilmuan: "keilmuan",
  knowledge: "keilmuan",
  "المعرفة": "keilmuan",
};

const subcategoryMap = {
  "ushul fiqh": "ushulfiqh",
  "usul al-fiqh": "ushulfiqh",
  "أصول الفقه": "ushulfiqh",

  "mustalah al-hadith": "hadis-mustolah",
  "mustolah al-hadith": "hadis-mustolah",
  "مصطلح الحديث": "hadis-mustolah",
  "hadis-mustolah": "hadis-mustolah",

  "ulumul hadis": "hadis-ulumul",
  "hadis-ulumul": "hadis-ulumul",

  "syama'il": "syamail",
  syamail: "syamail",
  "shama'il": "syamail",
  shamail: "syamail",
  "الشمائل": "syamail",

  "ramadan-notes": "catatan-ramadhan",
  "catatan-ramadhan": "catatan-ramadhan",
  "مذكرات رمضان": "catatan-ramadhan",

  "azhar-history": "sejarah-azhar",
  "sejarah-azhar": "sejarah-azhar",
  "تاريخ الأزهر": "sejarah-azhar",

  tafsir: "quran-tafsir-surah",
  "التفسير": "quran-tafsir-surah",
};

const tagMap = {
  "maqashid syariah": "maqashidsyariah",
  "maqasid syariah": "maqashidsyariah",
  maqashidsyariah: "maqashidsyariah",
  "مقاصد الشريعة": "maqashidsyariah",
  ramadhan: "ramadhan",
};

function mapValue(raw, map) {
  const v = String(raw || "").trim();
  if (!v) return "";
  if (Object.prototype.hasOwnProperty.call(map, v)) return map[v];
  const lower = v.toLowerCase();
  if (Object.prototype.hasOwnProperty.call(map, lower)) return map[lower];
  const slug = normalizeSlugKey(v);
  if (Object.prototype.hasOwnProperty.call(map, slug)) return map[slug];
  return null;
}

function listLangDirs(root) {
  if (!fs.existsSync(root)) return [];
  return fs
    .readdirSync(root)
    .filter((d) => fs.statSync(path.join(root, d)).isDirectory());
}

function listMarkdownFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.toLowerCase().endsWith(".md"));
}

function inc(map, key) {
  const next = (map.get(key) || 0) + 1;
  map.set(key, next);
}

function printTop(map, title) {
  const items = [...map.entries()].sort((a, b) => b[1] - a[1]);
  if (!items.length) return;
  console.log(`\nUNMAPPED ${title}`);
  for (const [k, v] of items.slice(0, 50)) {
    console.log(`${v}x\t${k}`);
  }
}

const langs = listLangDirs(ROOT);
if (!langs.length) {
  console.error("No language folders found under content/articles");
  process.exitCode = 1;
} else {
  let scanned = 0;
  let changed = 0;

  const unmapped = {
    category: new Map(),
    subcategory: new Map(),
    tag: new Map(),
  };

  for (const lang of langs) {
    const dir = path.join(ROOT, lang);
    const files = listMarkdownFiles(dir);

    for (const file of files) {
      const full = path.join(dir, file);
      const src = fs.readFileSync(full, "utf8");
      const parsed = matter(src);
      const data = parsed.data || {};

      const mappedCategory = mapValue(data.category, categoryMap);
      const mappedSubcategory = mapValue(data.subcategory, subcategoryMap);
      const mappedTag = mapValue(data.tag, tagMap);

      if (data.category && mappedCategory === null) inc(unmapped.category, String(data.category));
      if (data.subcategory && mappedSubcategory === null) inc(unmapped.subcategory, String(data.subcategory));
      if (data.tag && mappedTag === null) inc(unmapped.tag, String(data.tag));

      data.category = mappedCategory ?? normalizeSlugKey(data.category);
      data.subcategory = mappedSubcategory ?? normalizeSlugKey(data.subcategory);
      data.tag = mappedTag ?? normalizeSlugKey(data.tag);

      const out = matter.stringify(parsed.content || "", data);
      scanned += 1;

      if (out !== src) {
        fs.writeFileSync(full, out, "utf8");
        changed += 1;
      }
    }
  }

  console.log("Scanned:", scanned);
  console.log("Changed:", changed);

  printTop(unmapped.category, "CATEGORY");
  printTop(unmapped.subcategory, "SUBCATEGORY");
  printTop(unmapped.tag, "TAG");
}
