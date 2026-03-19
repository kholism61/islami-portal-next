let currentMonth = null;
let currentYear = null;
let startDateGlobal = null;
let haidGlobal = 0;
let istihadhahGlobal = 0;

let predictedDates = [];

function hitung(){

  let historyData =
JSON.parse(localStorage.getItem("haid_history")) || [];

  const hasil = document.getElementById("hasil");

  const startValue = document.getElementById("start").value;
  const endValue   = document.getElementById("end").value;
  const type       = document.getElementById("type").value;
  const habit      = parseInt(document.getElementById("habit").value);
  const mumayyiz   = document.getElementById("mumayyiz").checked;
  const strongDays = parseInt(document.getElementById("strongDays").value);

  if(!startValue || !endValue){
    hasil.innerHTML = "Tanggal belum lengkap.";
    return;
  }

  // ===============================
// VALIDASI MINIMAL SUCI 15 HARI
// ===============================
 const s = startValue.split("-");
  const e = endValue.split("-");

  const start = new Date(Number(s[0]), Number(s[1]) - 1, Number(s[2]));
  const end   = new Date(Number(e[0]), Number(e[1]) - 1, Number(e[2]));

  start.setHours(0,0,0,0);
end.setHours(0,0,0,0);

const prevEndValue = document.getElementById("prevEnd").value;

if(prevEndValue){

  const p = prevEndValue.split("-");
  const prevEnd = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));

  const diffSuci = Math.floor((start - prevEnd) / (1000*60*60*24));

  if(diffSuci < 15){
    hasil.innerHTML = `
      <strong>Status:</strong> Belum mencapai minimal suci 15 hari.<br><br>
      Jarak suci: ${diffSuci} hari<br>
      Minimal suci: 15 hari<br><br>
      ➜ Darah ini dihitung lanjutan istihadhah.
    `;
    return;
  }
}

  const totalDays = Math.floor((end - start) / (1000*60*60*24)) + 1;

  if(totalDays < 1){
    hasil.innerHTML = "Tanggal tidak valid.";
    return;
  }

  let haid = 0;
  let istihadhah = 0;
  let status = "";
  let mandi = "";
  let sholat = "";

  // =============================
  // MUBTADI’AH MUMAYYIZAH
  // =============================

  if(type === "mubtadiah" && mumayyiz){

    if(!strongDays || strongDays < 1){
      hasil.innerHTML = "Masukkan jumlah hari darah kuat.";
      return;
    }

    if(strongDays >= 1 && strongDays <= 15 && strongDays <= totalDays){

      haid = strongDays;
      istihadhah = totalDays - strongDays;

      status = "Mubtadi’ah Mumayyizah → Darah kuat dihitung haid.";
      mandi = "Setelah darah kuat selesai.";
      sholat = "Wajib sholat setelah darah kuat selesai.";

    } else {

      // kembali ke hukum umum
      haid = totalDays > 15 ? 15 : totalDays;
      istihadhah = totalDays > 15 ? totalDays - 15 : 0;

      status = "Tamyiz tidak sah → kembali ke hukum maksimal 15 hari.";
      mandi = "Setelah hari ke-15 atau darah berhenti.";
      sholat = "Wajib sholat setelah masa haid selesai.";
    }
  }

  // =============================
  // MUBTADI’AH BIASA
  // =============================

  else if(type === "mubtadiah"){

    if(totalDays <= 15){
      haid = totalDays;
      status = "Haid sah.";
      mandi = "Setelah darah berhenti.";
      sholat = "Tidak boleh sholat.";
    } else {
      haid = 15;
      istihadhah = totalDays - 15;
      status = "Melebihi 15 hari → 15 hari haid, sisanya istihadhah.";
      mandi = "Setelah hari ke-15.";
      sholat = "Wajib sholat setelah hari ke-15.";
    }
  }

  // =============================
  // MU’TADAH
  // =============================

  else if(type === "mu'tadah"){

    if(!habit || habit < 1 || habit > 15){
      hasil.innerHTML = "Isi kebiasaan 1–15 hari.";
      return;
    }

    if(totalDays <= habit){
  haid = totalDays;
  istihadhah = 0;
}else{
  haid = habit;
  istihadhah = totalDays - habit;
}

    status = "Mu’tadah → kembali ke kebiasaan.";
    mandi = "Setelah hari kebiasaan selesai.";
    sholat = "Wajib sholat setelah hari kebiasaan.";
  }

  // =============================
  // MUSTAHADHAH
  // =============================

  else if(type === "mustahadhah"){

    if(!habit || habit < 1 || habit > 15){
      hasil.innerHTML = "Isi kebiasaan sebelumnya 1–15 hari.";
      return;
    }

    if(totalDays <= habit){
  haid = totalDays;
  istihadhah = 0;
}else{
  haid = habit;
  istihadhah = totalDays - habit;
}

    status = "Mustahadhah → kembali ke kebiasaan.";
    mandi = "Setelah hari kebiasaan selesai.";
    sholat = "Wajib sholat setelah hari kebiasaan.";
  }

  hasil.innerHTML = `
    <strong>Status:</strong> ${status}<br><br>
    Total Darah: ${totalDays} hari<br>
    Haid: ${haid} hari<br>
    Istihadhah: ${istihadhah} hari<br><br>
    Wajib Mandi: ${mandi}<br>
    Status Sholat: ${sholat}
  `;

 analyzeFiqh(historyData, haid, istihadhah);

 const bloodColor =
document.getElementById("bloodColor").value;

const aiResult =
fiqhAIEngine(historyData, haid, istihadhah, habit, bloodColor, type);

document.getElementById("aiType").innerText =
aiResult.type;

document.getElementById("aiHukum").innerText =
aiResult.hukum;

// hitung rata-rata haid
let avgHaid = haid;

if(historyData.length > 0){

avgHaid =
historyData.reduce((s,h)=>s+h.haid,0)
/ historyData.length;

}

// generate fatwa
const fatwa =
generateFatwa(type, haid, istihadhah, avgHaid);

document.getElementById("fatwaText").innerText =
fatwa;

  // ===============================
// PREDIKSI HAID BERIKUTNYA
// ===============================

const cycleLength = 28;

const nextDate = new Date(start);
nextDate.setDate(start.getDate() + cycleLength);
const hijri =
gregorianToHijri(nextDate);

document.getElementById("hijriDate").innerText =
hijri.day + " " +
hijriMonths[hijri.month-1] +
" " +
hijri.year + " H";

document.getElementById("nextCycle").innerText =
"Perkiraan siklus berikutnya: " +
(nextDate.getMonth()+1) + "/" +
nextDate.getDate() + "/" +
nextDate.getFullYear();


// ===== PREDIKSI DURASI HAID =====

if(historyData.length > 0){

let avgHaid =
historyData.reduce((s,h)=>s+h.haid,0)
/ historyData.length;

document.getElementById("predDurasi")
.innerText = Math.round(avgHaid) + " hari";

}


// ===============================


generatePredictions(start);
renderPredictions(start);
renderCalendar(start, haid, istihadhah);
renderFiqhTimeline(haid, istihadhah);

startDateGlobal = start;
currentMonth = start.getMonth();
currentYear = start.getFullYear();
haidGlobal = haid;
istihadhahGlobal = istihadhah;

document.getElementById("avgHaid").innerText = haid + " hari";

document.getElementById("cycle").innerText =
(haid + istihadhah) + " hari";

if(historyData.length > 0){

const total =
historyData.reduce((sum,h)=>sum + h.haid,0);

const avg = Math.round(total / historyData.length);

document.getElementById("avgCycle").innerText =
avg + " hari";

}

const aiBox = document.getElementById("aiAnalysis");

let analysis = "";

if(haid < 3){
analysis =
"Durasi haid sangat pendek. Dalam fiqh Syafi'i minimal haid adalah 1 hari 1 malam.";
}

else if(haid >=3 && haid <=7){
analysis =
"Durasi haid normal menurut kebiasaan mayoritas wanita.";
}

else if(haid >7 && haid <=12){
analysis =
"Durasi haid cukup panjang namun masih dalam batas umum.";
}

if(haid >12){
analysis =
"Durasi haid panjang. Perlu memastikan tidak mendekati batas maksimal 15 hari.";
}

if(haid >= 13){
analysis += "<br>⚠ Haid mendekati batas maksimal 15 hari.";
}

/* ============================= */
/* ANALISIS POLA SIKLUS */
/* ============================= */

// ambil data history dulu
let history = JSON.parse(localStorage.getItem("haid_history")) || [];

if(history.length > 0){

const durations = history.map(h => h.haid);

const avg =
durations.reduce((a,b)=>a+b,0) / durations.length;

document.getElementById("avgCycle").innerText =
Math.round(avg) + " hari";

}

// ===== STABILITAS SIKLUS =====

let durations = history.map(h => h.haid);

let avg =
durations.reduce((a,b)=>a+b,0) / durations.length;

let variance =
durations.reduce((s,d)=>s+Math.pow(d-avg,2),0)
/ durations.length;

let deviasi = Math.sqrt(variance);

let statusCycle =
deviasi <= 2 ? "Stabil" : "Tidak Stabil";

document.getElementById("cycleStatus")
.innerText = statusCycle;

if(history.length >=3){

  const durations = history.map(h=>h.haid);

const max = Math.max(...durations);
const min = Math.min(...durations);

if(max - min > 5){
analysis += "<br>Siklus haid tampak tidak stabil.";
}

if(istihadhah >= 10){
analysis += "<br>Istihadhah cukup panjang, perlu perhatian.";
}

  let last = history[history.length-1].haid;

  let avg =
  history.reduce((s,h)=>s+h.haid,0)
/ history.length;

  if(Math.abs(last-avg) > 4){
    analysis += "<br>Pola haid berbeda dari kebiasaan.";
  }

}

if(history.length >=5){

analysis +=
"<br>Sistem memiliki cukup data untuk analisis pola siklus.";

}

if(haid >= 13){

analysis +=
"<br>⚠ Haid mendekati batas maksimal fiqh Syafi'i (15 hari).";

}

if(istihadhah >= 10){

analysis +=
"<br>⚠ Istihadhah cukup panjang.";

}

if(statusCycle === "Tidak Stabil"){

analysis +=
"<br>⚠ Siklus haid tidak stabil.";

}

aiBox.innerHTML =
"<b>Analisis Sistem:</b><br>" + analysis;

// ===============================
// TIMELINE REAL CALENDAR ALIGN
// ===============================

const timeline = document.getElementById("timeline");
timeline.innerHTML = "";

// Dapatkan hari dalam minggu (0 = Minggu)
const startDayOfWeek = start.getDay();

// Tambah box kosong sebelum hari pertama
for(let i = 0; i < startDayOfWeek; i++){
  const emptyBox = document.createElement("div");
  timeline.appendChild(emptyBox);
}

// Render hari darah
for(let i = 0; i < totalDays; i++){

  const box = document.createElement("div");
  box.classList.add("day-box");

  // Clone tanggal awal
  const currentDate = new Date(start);
  currentDate.setDate(start.getDate() + i);

  const tanggal = currentDate.getDate();

  // Highlight today
  const today = new Date();
  today.setHours(0,0,0,0);
  currentDate.setHours(0,0,0,0);

  if(currentDate.getTime() === today.getTime()){
    box.classList.add("today");
  }

  if(i < haid){
    box.classList.add("haid");
  } 
  else if(i < haid + istihadhah){
    box.classList.add("istihadhah");
  } 
  else{
    box.classList.add("suci");
  }

  box.innerText = tanggal;
  timeline.appendChild(box);
}

document.getElementById("calendar")
.scrollIntoView({behavior:"smooth"});

history = JSON.parse(localStorage.getItem("haid_history")) || [];

// ===== STATISTIK SIKLUS =====
if(history.length > 0){

const durations = history.map(h=>h.haid);

document.getElementById("minCycle").innerText =
Math.min(...durations) + " hari";

document.getElementById("maxCycle").innerText =
Math.max(...durations) + " hari";

const suci =
history.map(h => (28 - h.haid));

const avgSuci =
suci.reduce((a,b)=>a+b,0)/suci.length;

document.getElementById("avgSuci").innerText =
Math.round(avgSuci) + " hari";

}


history.push({
  start:startValue,
  end:endValue,
  haid,
  istihadhah
});

if(history.length > 20){
  history.shift();
}

localStorage.setItem("haid_history", JSON.stringify(history));
renderChart();
renderHistory();

}

const color =
document.getElementById("bloodColor").value;

let tamyiz = "";

if(color == "dark"){

tamyiz = "Darah kuat (ciri haid)";

}

else if(color == "normal"){

tamyiz = "Kemungkinan haid";

}

else{

tamyiz = "Ciri istihadhah";

}

document.getElementById("bloodStatus")
.innerText = tamyiz;

window.addEventListener("load", function(){
  const data = localStorage.getItem("haid_last");
  if(data){
    const parsed = JSON.parse(data);
    console.log("Riwayat terakhir:", parsed);
  }
});

function renderCalendar(start, haid, istihadhah){

  const calendar = document.getElementById("calendar");
  calendar.innerHTML = "";

  const year = start.getFullYear();
  const month = start.getMonth();
  const monthNames = [
"Januari","Februari","Maret","April","Mei","Juni",
"Juli","Agustus","September","Oktober","November","Desember"
];

document.getElementById("monthTitle").innerText =
monthNames[month] + " " + year;

  const firstDay = new Date(year, month, 1);
  const lastDay  = new Date(year, month + 1, 0);

  const startDayOfWeek = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  for(let i=0;i<startDayOfWeek;i++){
    const empty=document.createElement("div");
    calendar.appendChild(empty);
  }

  for(let d=1; d<=daysInMonth; d++){

    const box=document.createElement("div");
box.classList.add("day");

box.style.animationDelay = (calendar.children.length * 0.03) + "s";

    const currentDate=new Date(year,month,d);

    const diff=Math.floor((currentDate-start)/(1000*60*60*24));

    box.innerHTML = `
      <div>${d}</div>
      <small>${
        diff>=0 && diff<haid ? "Haid" :
        diff>=haid && diff<haid+istihadhah ? "Istih." :
        ""
      }</small>
    `;

    if(diff>=0 && diff<haid){
      box.classList.add("haid");
    }
    else if(diff>=haid && diff<haid+istihadhah){
      box.classList.add("istihadhah");
    }
   else{
  box.classList.add("suci");
  box.innerHTML = `
  <div>${d}</div>
  <small>Suci</small>
  `;
}

    const today=new Date();
    today.setHours(0,0,0,0);
    currentDate.setHours(0,0,0,0);

    if(today.getTime()===currentDate.getTime()){
      box.classList.add("today");
    }

    predictedDates.forEach(p => {

if(
p.getFullYear() === currentDate.getFullYear() &&
p.getMonth() === currentDate.getMonth() &&
p.getDate() === currentDate.getDate()
){

box.classList.add("prediction");

}

});

    calendar.appendChild(box);
  }

}

document.getElementById("prevMonth").onclick = function(){

  currentMonth--;

  if(currentMonth < 0){
    currentMonth = 11;
    currentYear--;
  }

  const newStart = new Date(currentYear, currentMonth, startDateGlobal.getDate());

  renderCalendar(newStart, haidGlobal, istihadhahGlobal);
}

document.getElementById("nextMonth").onclick = function(){

  currentMonth++;

  if(currentMonth > 11){
    currentMonth = 0;
    currentYear++;
  }

  const newStart = new Date(currentYear, currentMonth, startDateGlobal.getDate());

  renderCalendar(newStart, haidGlobal, istihadhahGlobal);
}

function renderChart(){

const lang = localStorage.getItem("siteLang") || "id";

if(typeof Chart === "undefined"){
  return;
}

const chartLang = {
  id: "Durasi Haid",
  en: "Menstruation Duration",
  ar: "مدة الحيض"
};

const cycleLabel = {
  id: "Siklus",
  en: "Cycle",
  ar: "الدورة"
};

const history = JSON.parse(localStorage.getItem("haid_history")) || [];

const labels = history.map((h,i)=> cycleLabel[lang] + " " + (i+1));
const data = history.map(h=>h.haid);

const canvas = document.getElementById("cycleChart");
if(!canvas) return;

const ctx = canvas.getContext("2d");

if(window.cycleChart && typeof window.cycleChart.destroy === "function"){
window.cycleChart.destroy();
}

window.cycleChart = new Chart(ctx,{
type:'line',
data:{
labels:labels,
datasets:[{
label: chartLang[lang],
data:data,
borderColor:"#ff9c4d",
borderWidth:3,
pointRadius:5,
pointHoverRadius:7,
pointBackgroundColor:"#ffb36a",
backgroundColor:"rgba(255,120,80,0.2)",
tension:0.4
}]
},
options:{
responsive:true,
interaction:{
mode:'index',
intersect:false
},
plugins:{
legend:{display:true}
}
}
});
}


function renderHistory(){

const history = JSON.parse(localStorage.getItem("haid_history")) || [];
const list = document.getElementById("historyList");

list.innerHTML="";

history.slice(-5).reverse().forEach(h=>{

const li = document.createElement("li");

li.innerText =
h.start + " → " +
h.end + " | Haid: " +
h.haid + " hari";

list.appendChild(li);

});

}

renderHistory();

function exportData(){

const data =
localStorage.getItem("haid_history");

const blob =
new Blob([data],{type:"application/json"});

const a=document.createElement("a");

a.href=URL.createObjectURL(blob);
a.download="haid-history.json";

a.click();

}

function generatePredictions(startDate){

predictedDates = [];

const cycleLength = 28;

for(let i=1;i<=12;i++){

const next = new Date(startDate);
next.setDate(startDate.getDate() + (cycleLength*i));

predictedDates.push(next);

}

}

function resetHistory(){

localStorage.removeItem("haid_history");

location.reload();

}

function analyzeFiqh(history, haid, istihadhah){

const habitInput =
parseInt(document.getElementById("habit").value);

let type = "";
let habit = "-";
let bloodStatus = "";
let rule = "";

if(history.length < 2){

type = "Mubtada'ah (pertama haid)";
habit = "Belum ada kebiasaan";

}else{

let avg =
history.reduce((s,h)=>s+h.haid,0)
/ history.length;

habit = habitInput + " hari";

type = "Mu'tadah (punya kebiasaan)";

if(history.length >= 3){

type += " (punya pola siklus)";

}

}

const cycleLength = 28;
const suci = cycleLength - haid;

if(suci < 15){

bloodStatus =
"Istihadhah (belum mencapai minimal suci 15 hari)";

}

else if(istihadhah > 0){

bloodStatus = "Haid + Istihadhah";

}

else{

bloodStatus = "Haid";

}

if(istihadhah > 0){

rule =
"Hari pertama sampai ke-15 haid, selebihnya istihadhah.";

}else{

rule =
"Semua darah dihukumi haid.";

}

const color =
document.getElementById("bloodColor").value;

let tamyiz = "";

if(color == "dark"){

tamyiz = "Darah kuat (ciri haid)";

}

else if(color == "normal"){

tamyiz = "Kemungkinan haid";

}

else{

tamyiz = "Ciri istihadhah";

}

const autoType =
detectWomanType(history, color);

document.getElementById("fiqhType").innerText =
type;

document.getElementById("habitHaid").innerText =
habit > 0 ? habit + " hari" : "Belum ada kebiasaan";

document.getElementById("bloodStatus").innerText =
bloodStatus + " (" + tamyiz + ")";

document.getElementById("fiqhRule").innerText = rule;

document.getElementById("fiqhSource").innerText =
"Referensi: Kifayatul Akhyar - Bab Al-Haid";

}

function detectWomanType(history, bloodColor){

let type = "";

if(history.length < 2){

type = "Mubtadi'ah";

}

else{

let durations = history.map(h => h.haid);

let max = Math.max(...durations);
let min = Math.min(...durations);

if(max - min <= 2){

type = "Mu'tadah (punya kebiasaan)";

}
else{

type = "Mutahayyirah (siklus tidak stabil)";

}

}

if(bloodColor == "dark"){

type += " + Mumayyizah";

}

return type;

}

function renderFiqhTimeline(haid, istihadhah){

const box = document.getElementById("fiqhTimeline");

if(!box) return;

box.innerHTML="";

for(let i=1;i<=30;i++){

const d=document.createElement("div");
d.classList.add("timeline-box");

if(i<=haid){

d.classList.add("timeline-haid");
d.innerHTML=i+"<br>Haid";

}
else if(i<=haid+istihadhah){

d.classList.add("timeline-istihadhah");
d.innerHTML=i+"<br>Istih.";

}
else{

d.classList.add("timeline-suci");
d.innerHTML=i+"<br>Suci";

}

box.appendChild(d);

}

}

function renderPredictions(start){

const list=document.getElementById("predictionList");

if(!list) return;

list.innerHTML="";

const cycle=28;

for(let i=1;i<=6;i++){

const d=new Date(start);

d.setDate(start.getDate()+(cycle*i));

const li=document.createElement("li");

li.innerText=
d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear();

list.appendChild(li);

}

}

function gregorianToHijri(date){

let day = date.getDate();
let month = date.getMonth()+1;
let year = date.getFullYear();

let jd =
Math.floor((1461*(year+4800+Math.floor((month-14)/12)))/4)
+
Math.floor((367*(month-2-12*Math.floor((month-14)/12)))/12)
-
Math.floor((3*Math.floor((year+4900+Math.floor((month-14)/12))/100))/4)
+
day-32075;

let l = jd - 1948440 + 10632;

let n = Math.floor((l-1)/10631);

l = l - 10631*n + 354;

let j =
(Math.floor((10985-l)/5316))*
(Math.floor((50*l)/17719))+
(Math.floor(l/5670))*
(Math.floor((43*l)/15238));

l =
l -
(Math.floor((30-j)/15))*
(Math.floor((17719*j)/50))-
(Math.floor(j/16))*
(Math.floor((15238*j)/43))+
29;

let m = Math.floor((24*l)/709);

let d = l - Math.floor((709*m)/24);

let y = 30*n + j - 30;

return {
day:d,
month:m,
year:y
};

}

const hijriMonths=[
"Muharram",
"Safar",
"Rabiul Awal",
"Rabiul Akhir",
"Jumadil Awal",
"Jumadil Akhir",
"Rajab",
"Sya'ban",
"Ramadhan",
"Syawal",
"Dzulqa'dah",
"Dzulhijjah"
];

function generateFatwa(type, haid, istihadhah, avgHaid){

let habit =
parseInt(document.getElementById("habit").value) || 0;

let text = "";

text += "Berdasarkan data yang dimasukkan, ";

if(type === "mu'tadah"){

text +=
"wanita ini tergolong mu'tadah (memiliki kebiasaan haid). ";

text +=
"Kebiasaan haid wanita ini adalah "
+ habit +
" hari. ";

}

else if(type === "mubtadiah"){

text +=
"wanita ini tergolong mubtadi'ah (pertama kali mengalami haid). ";

}

else if(type === "mustahadhah"){

text +=
"wanita ini mengalami istihadhah dan kembali kepada kebiasaan haidnya. ";

}

if(istihadhah > 0){

text +=
"Darah selama "
+ haid +
" hari dihukumi haid. ";

text +=
"Sedangkan darah setelahnya selama "
+ istihadhah +
" hari dihukumi istihadhah. ";

}

else{

text +=
"Seluruh darah selama "
+ haid +
" hari dihukumi haid. ";

}

text +=
"Menurut mazhab Syafi'i batas maksimal haid adalah 15 hari. ";

text +=
"Apabila darah melebihi 15 hari maka selebihnya dihukumi istihadhah. ";

text +=
"Referensi: Kifayatul Akhyar, Bab Al-Haid.";

return text;

}

function fiqhAIEngine(history, haid, istihadhah, habit, bloodColor, type){

let womanType = "";
let hukum = "";
let result = {};

// =================
// DETEKSI TYPE
// =================

if(type === "mubtadiah"){
womanType = "Mubtadi'ah";
}

else if(type === "mu'tadah"){
womanType = "Mu'tadah";
}

else if(type === "mustahadhah"){
womanType = "Mustahadhah";
}

/* ========================= */
/* DETEKSI JENIS WANITA */
/* ========================= */

if(history.length < 2){

womanType = "Mubtadi'ah";

}

else{

const durations = history.map(h => h.haid);

const max = Math.max(...durations);
const min = Math.min(...durations);

if(max - min <= 2){

womanType = "Mu'tadah";

}else{

womanType = "Mutahayyirah";

}

}

/* ========================= */
/* DETEKSI TAMYIZ */
/* ========================= */

if(bloodColor === "dark"){

womanType += " + Mumayyizah";

}

/* ========================= */
/* PENENTUAN HUKUM */
/* ========================= */

if(istihadhah > 0){

hukum =
"Sebagian darah dihukumi haid dan selebihnya istihadhah.";

}else{

hukum =
"Seluruh darah dihukumi haid.";

}

/* ========================= */

result.type = womanType;
result.hukum = hukum;

return result;

}

