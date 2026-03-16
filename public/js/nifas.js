function hitungNifas(){

const birthInput =
document.getElementById("birthDate").value;

if(!birthInput){
alert("Masukkan tanggal melahirkan");
return;
}

const start = new Date(birthInput);

let end = new Date(start);

end.setDate(end.getDate()+60);

document.getElementById("mulai")
.innerText = start.toLocaleDateString();

document.getElementById("akhir")
.innerText = end.toLocaleDateString();

const today = new Date();

if(today < start){

document.getElementById("status")
.innerText = "Belum melahirkan";

}
else if(today > end){

document.getElementById("status")
.innerText = "Masa nifas maksimal telah selesai";

}
else{

const passed =
Math.floor((today-start)/(1000*60*60*24));

const remaining =
Math.floor((end-today)/(1000*60*60*24));

const progress = (passed / 60) * 100;

document.getElementById("nifasBar").style.width =
progress + "%";

document.getElementById("status")
.innerText =
"Hari ke "+passed+" | Sisa "+remaining+" hari";

}

generateTimeline(start,end);
document.getElementById("result").scrollIntoView({
behavior:"smooth"
});

}

function generateTimeline(start,end){

const timeline =
document.getElementById("timeline");

timeline.innerHTML="";

const days =
Math.floor((end-start)/(1000*60*60*24));

for(let i=0;i<=days;i++){

let d = new Date(start);

d.setDate(d.getDate()+i);

const div =
document.createElement("div");

div.className="timeline-day";

if(i < 40){
div.classList.add("nifas-normal");
}
else{
div.classList.add("nifas-max");
}

div.innerText =
d.getDate()+"/"+(d.getMonth()+1);

const today = new Date();

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

window.addEventListener("scroll",function(){

const nav = document.querySelector(".navbar");

if(window.scrollY > 20){

nav.style.boxShadow="0 5px 20px rgba(0,0,0,.4)";

}
else{

nav.style.boxShadow="none";

}

});