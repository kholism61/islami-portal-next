function hitungQadha(){

let hariPuasa = parseInt(document.getElementById("hariPuasa").value);

/* VALIDASI */

if(!hariPuasa){
alert("Masukkan jumlah hari puasa");
return;
}

if(hariPuasa <= 0){
alert("Jumlah hari harus lebih dari 0");
return;
}

if(hariPuasa > 30){
alert("Jumlah hari tidak boleh lebih dari 30");
return;
}

/* HITUNG */

animateValue("hasilHari",0,hariPuasa,500);
animateValue("estimasiHari",0,hariPuasa,500);

}

function animateValue(id,start,end,duration){

let obj=document.getElementById(id);

let range=end-start;

let current=start;

let increment=end>start?1:-1;

let stepTime=Math.abs(Math.floor(duration/range));

let timer=setInterval(function(){

current+=increment;

obj.innerHTML=current;

if(current==end){

clearInterval(timer);

}

},stepTime);

}

function resetQadha(){

document.getElementById("hariPuasa").value = "";

document.getElementById("hasilHari").innerText = 0;

document.getElementById("estimasiHari").innerText = 0;

}


function shareWhatsApp(){

let hari = document.getElementById("hasilHari").innerText;

let text = `Saya memiliki ${hari} hari qadha puasa yang harus diganti. Dihitung menggunakan Kalkulator Fiqh di Portal Literasi Islam.`;

let url = `https://wa.me/?text=${encodeURIComponent(text)}`;

window.open(url);

}
