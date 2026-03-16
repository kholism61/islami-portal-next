function hitungSuci(){

const endInput = document.getElementById("haidEnd").value;

if(!endInput){
alert("Masukkan tanggal selesai haid");
return;
}

const end = new Date(endInput);

const minSuci = new Date(end);
minSuci.setDate(minSuci.getDate() + 15);

const today = new Date();

let status = "";
let remaining = Math.ceil((minSuci - today) / (1000*60*60*24));

if(today < minSuci){

status =
"Masih dalam masa suci minimal. Tersisa "+remaining+" hari.";

}else{

status =
"Masa suci minimal telah terpenuhi. Jika keluar darah sekarang bisa dihukumi haid.";

}

generateTimeline(end,minSuci);

document.getElementById("result").innerHTML = `
<h3>Hasil Perhitungan</h3>

<p><b>Selesai Haid:</b> ${end.toLocaleDateString()}</p>

<p><b>Masa Suci Minimal:</b> 15 hari</p>

<p><b>Boleh Haid Lagi Mulai:</b> ${minSuci.toLocaleDateString()}</p>

<hr>

<p><b>Status Saat Ini:</b> ${status}</p>

<h4>Timeline Masa Suci</h4>

<div class="timeline" id="timeline"></div>

<p>

Dalam mazhab Syafi'i masa suci minimal antara dua haid adalah 15 hari.
Jika darah keluar sebelum itu maka dihukumi istihadhah.

</p>
`;

generateTimeline(end,minSuci);
generateFiqhCalendar(end);
document.getElementById("result")
.scrollIntoView({behavior:"smooth"});

}

function generateTimeline(start,end){

const timeline = document.getElementById("timeline");

timeline.innerHTML="";

for(let i=0;i<16;i++){

let d = new Date(start);
d.setDate(start.getDate()+i);

const div = document.createElement("div");

div.className="timeline-day";

div.innerText=d.getDate()+"/"+(d.getMonth()+1);

if(i < 15){

div.classList.add("suci");

}else{

div.classList.add("boleh-haid");

}

timeline.appendChild(div);

}

}

function generateFiqhCalendar(start){

const cal = document.getElementById("fiqhCalendar");

if(!cal) return;

cal.innerHTML = "";

/* header hari */

const days = ["Min","Sen","Sel","Rab","Kam","Jum","Sab"];

days.forEach(d=>{
const div=document.createElement("div");
div.className="cal-head";
div.innerText=d;
cal.appendChild(div);
});

let first=new Date(start);
first.setDate(1);

let startDay=first.getDay();

for(let i=0;i<startDay;i++){
const empty=document.createElement("div");
cal.appendChild(empty);
}

const today=new Date();

let maxDays=new Date(
start.getFullYear(),
start.getMonth()+1,
0
).getDate();

for(let i=1;i<=maxDays;i++){

let d=new Date(start.getFullYear(),start.getMonth(),i);

const div=document.createElement("div");

div.className="cal-day";

div.innerText=i;

/* masa suci 15 hari */

let endHaid=new Date(start);
let suciEnd=new Date(start);
suciEnd.setDate(start.getDate()+15);

if(d>=endHaid && d<suciEnd){

div.classList.add("suci");

}

if(d>=suciEnd){

div.classList.add("boleh");

}

if(
d.getDate()===today.getDate() &&
d.getMonth()===today.getMonth() &&
d.getFullYear()===today.getFullYear()
){
div.classList.add("today");
}

cal.appendChild(div);

}

}