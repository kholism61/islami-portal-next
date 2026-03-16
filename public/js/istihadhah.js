function hitungIstihadhah(){

const start = document.getElementById("startDate").value;
let habit = parseInt(document.getElementById("habit").value);
if(habit > 15){

alert("Masa haid maksimal dalam fiqh adalah 15 hari");

return;

}

if(habit < 1){

alert("Minimal haid adalah 1 hari");

return;

}

const mode = document.getElementById("mode").value;
const stop = document.getElementById("stopDate").value;

if(!start || !habit){
alert("Isi semua data");
return;
}

if(habit < 1){
alert("Minimal haid adalah 1 hari");
return;
}

if(habit > 15){
alert("Masa haid maksimal adalah 15 hari");
return;
}

let startDate = new Date(start);
let stopDate = stop ? new Date(stop) : null;
if(stopDate && stopDate < startDate){

alert("Tanggal berhenti darah tidak boleh sebelum mulai darah");

return;

}

if(mode === "mumayyizah"){

habit = 7;

}

else if(mode === "mutahayyirah"){

habit = 6;

}

let haidEnd = new Date(startDate);
haidEnd.setDate(haidEnd.getDate() + habit - 1);

let maxHaidEnd = new Date(startDate);
maxHaidEnd.setDate(maxHaidEnd.getDate() + 14);

let istihadhahStart = new Date(haidEnd);
istihadhahStart.setDate(istihadhahStart.getDate() + 1);

generateTimeline(startDate, habit, stopDate);

let result = `
<div class="result-box">

<h3>Hasil Perhitungan</h3>

<p><b>Mulai Darah:</b> ${startDate.toLocaleDateString()}</p>

<p><b>Masa Haid (sesuai kebiasaan):</b>
${startDate.toLocaleDateString()} - ${haidEnd.toLocaleDateString()}
</p>

${stopDate && stopDate <= haidEnd
? "<p><b>Darah berhenti dalam masa haid</b></p>"
: "<p><b>Setelah itu dihukumi Istihadhah</b></p>"
}

<p>
Wanita tetap wajib shalat dan wudhu setiap waktu shalat
</p>

<hr>

<p>
Dalam mazhab Syafi'i wanita yang mengalami darah terus menerus
kembali kepada kebiasaan haidnya.
</p>

`;

if(stopDate && stopDate > maxHaidEnd){

result += `<p><b>Maksimal haid adalah 15 hari, selebihnya dihukumi istihadhah.</b></p>`;

}

result += `
<p>
<b>Kaidah fiqh:</b><br>
• Minimal haid: 1 hari 1 malam<br>
• Maksimal haid: 15 hari<br>
• Minimal suci antara dua haid: 15 hari
</p>
`;

result += `</div>`;

document.getElementById("resultCard").innerHTML = result;

const box = document.querySelector(".result-box");

setTimeout(()=>{
box.classList.add("show");
},50);

document.getElementById("resultCard").scrollIntoView({
behavior:"smooth",
block:"start"
});

}

function generateTimeline(startDate, haidDays, stopDate){

const timeline = document.getElementById("timeline");

timeline.innerHTML = "";

let firstDay = new Date(startDate);
firstDay.setDate(1);

let startWeekday = firstDay.getDay();

for(let i=0;i<startWeekday;i++){

const empty = document.createElement("div");
timeline.appendChild(empty);

}

const today = new Date();

let year = startDate.getFullYear();
let month = startDate.getMonth();

let maxDays = new Date(year, month + 1, 0).getDate();

for(let i=0;i<maxDays;i++){

let d = new Date(startDate);

d.setDate(d.getDate()+i);

const div = document.createElement("div");

div.className="day";

div.innerText=d.getDate();

if(i < haidDays){

div.classList.add("haid");

}

else if(stopDate){

div.classList.add("istihadhah");

}

else{

div.classList.add("suci");

}

if(
d.getDate()===today.getDate() &&
d.getMonth()===today.getMonth() &&
d.getFullYear()===today.getFullYear()
){

div.classList.add("today");

}

div.style.animationDelay = i * 0.03 + "s";
timeline.appendChild(div);

}

}

