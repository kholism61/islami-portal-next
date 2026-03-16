function getHaidData(){

const history =
JSON.parse(localStorage.getItem("haid_history")) || [];

if(history.length === 0){
return null;
}

const avgHaid =
history.reduce((s,h)=>s+h.haid,0)/history.length;

const avgCycle =
history.reduce((s,h)=>s+(h.haid+h.istihadhah),0)/history.length;

let avgSuci = avgCycle - avgHaid;
let avgHaidFix = avgHaid;

// validasi fiqh
if(avgHaidFix > 15){
avgHaidFix = 15;
}

if(avgSuci < 15){
avgSuci = 15;
}

return {

avgHaid:Math.round(avgHaidFix),
avgSuci:Math.round(avgSuci)

};

}

function hitungQuru(start){

const data = getHaidData();

if(!data){
return null;
}

let end = new Date(start);

let suci = data.avgSuci;

if(suci < 15){
suci = 15;
}

const quruDays = suci * 3;

end.setDate(end.getDate() + quruDays);

return {

end:end,
quruDays:quruDays

};

}



function hitungIddah(){

const type = document.getElementById("iddahType").value;
const startInput = document.getElementById("startDate").value;
const haidData = getHaidData();

if(haidData){

document.getElementById("avgHaid").innerText = haidData.avgHaid;
document.getElementById("avgSuci").innerText = haidData.avgSuci;

}

if(!startInput){
alert("Masukkan tanggal mulai");
return;
}

const start = new Date(startInput);
let end = new Date(start);

let durasi="";
let fiqh="";
let dalil="";
let rules=[];

switch(type){

case "wafat":

end.setMonth(end.getMonth()+4);
end.setDate(end.getDate()+10);

durasi="4 bulan 10 hari";

fiqh="Wanita yang ditinggal wafat suaminya wajib menjalani masa iddah selama empat bulan sepuluh hari.";

dalil="QS Al-Baqarah 234";

rules=[
"Tidak boleh menikah",
"Tidak boleh berhias secara berlebihan",
"Tidak keluar rumah tanpa kebutuhan",
"Boleh dilamar secara sindiran"
];

break;


case "talak":

const quru = hitungQuru(start);

if(quru){

end = quru.end;

durasi =
"3 quru (" + quru.quruDays + " hari berdasarkan data haid)";

}else{

end.setMonth(end.getMonth()+3);

durasi="3 quru (estimasi 3 bulan)";

}

fiqh="Iddah wanita yang ditalak adalah tiga quru. Menurut mazhab Syafi'i, quru ditafsirkan sebagai masa suci di antara dua haid.";

dalil="QS Al-Baqarah ayat 228";

rules=[
"Tidak boleh menikah",
"Suami boleh rujuk jika talak raj'i",
"Boleh berhias"
];

break;


case "talakQabla":

durasi="Tidak ada iddah";

fiqh="Talak sebelum terjadi hubungan suami istri tidak mewajibkan iddah.";

dalil="QS Al-Ahzab 49";

rules=["Tidak ada masa iddah"];

break;


case "hamil":

durasi="Sampai melahirkan";

fiqh="Wanita hamil masa iddahnya sampai melahirkan.";

dalil="QS At-Thalaq 4";

rules=[
"Iddah selesai saat melahirkan"
];

break;


case "fasakh":

end.setMonth(end.getMonth()+3);

durasi="3 Quru";

fiqh="Iddah fasakh sama seperti iddah talak.";

dalil="Pendapat ulama fiqh";

rules=[
"Tidak boleh menikah selama iddah"
];

break;

}


document.getElementById("jenis").innerText=type;
document.getElementById("mulai").innerText=start.toLocaleDateString();
document.getElementById("durasi").innerText=durasi;

if(type==="hamil"||type==="talakQabla"){
document.getElementById("akhir").innerText=durasi;
}
else{
document.getElementById("akhir").innerText=end.toLocaleDateString();
}


const today=new Date();

if(today<start){
document.getElementById("status").innerText="Belum mulai";
}
else if(today>end){
document.getElementById("status").innerText="Iddah selesai";
}
else{

const passed=Math.floor((today-start)/(1000*60*60*24));
const remaining=Math.floor((end-today)/(1000*60*60*24));

document.getElementById("status").innerText =
"Sedang menjalani masa iddah (hari ke "+passed+
") | tersisa "+remaining+" hari";


const progress = (passed / (passed+remaining)) * 100;

document.getElementById("iddahBar").style.width =
progress + "%";

}


document.getElementById("fiqhText").innerText=fiqh;
document.getElementById("dalil").innerText=dalil;



const ruleList=document.getElementById("rules");
ruleList.innerHTML="";

rules.forEach(r=>{
const li=document.createElement("li");
li.textContent=r;
ruleList.appendChild(li);
});



if(type!=="hamil" && type!=="talakQabla"){
generateTimeline(start,end);
}

document.getElementById("result").scrollIntoView({
behavior:"smooth"
});

}



function generateTimeline(start,end){

const timeline = document.getElementById("timeline");
timeline.innerHTML = "";

// hitung total hari iddah
const days = Math.floor((end - start) / (1000*60*60*24));

const quruLength = Math.floor(days/3);

const today = new Date();

for(let i=0;i<=days;i++){

let d = new Date(start);
d.setDate(d.getDate()+i);

const div = document.createElement("div");
div.className="timeline-day";

div.innerText = d.getDate()+"/"+(d.getMonth()+1);

// pembagian quru
if(i < quruLength){
div.classList.add("quru1");
}
else if(i < quruLength*2){
div.classList.add("quru2");
}
else{
div.classList.add("quru3");
}

// highlight hari ini
if(
d.getDate() === today.getDate() &&
d.getMonth() === today.getMonth() &&
d.getFullYear() === today.getFullYear()
){
div.classList.add("today");
}

timeline.appendChild(div);

}

}