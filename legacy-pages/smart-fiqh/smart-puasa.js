function cekFiqh(){

let sakit=document.getElementById("sakit").value
let safar=document.getElementById("safar").value
let haid=document.getElementById("haid").value
let lansia=document.getElementById("lansia").value
let hamil=document.getElementById("hamil").value
let menyusui=document.getElementById("menyusui").value
let makan=document.getElementById("makan").value
let jima=document.getElementById("jima").value

let status=""
let kewajiban=""
let penjelasan=""
let dalil=""

if(jima==="ya"){

status="Puasa batal"
kewajiban="Qadha + Kaffarah"

penjelasan="Hubungan suami istri di siang hari Ramadhan membatalkan puasa dan mewajibkan kaffarah."

dalil="Hadits Abu Hurairah: Seorang lelaki berkata kepada Nabi ﷺ 'Aku celaka karena menggauli istriku di siang Ramadhan.' (HR Bukhari & Muslim)"

}

else if(makan==="ya"){

status="Puasa batal"
kewajiban="Qadha"

penjelasan="Makan atau minum dengan sengaja membatalkan puasa."

dalil="Dan makan minumlah hingga jelas bagimu benang putih dari benang hitam (fajar). (QS Al-Baqarah 187)"

}

else if(haid==="ya"){

status="Tidak boleh berpuasa"
kewajiban="Qadha setelah Ramadhan"

penjelasan="Wanita haid atau nifas tidak sah berpuasa dan wajib mengganti setelah suci."

dalil="Kami diperintahkan mengqadha puasa dan tidak diperintahkan mengqadha shalat. (HR Muslim)"

}

else if(lansia==="ya"){

status="Tidak wajib puasa"

kewajiban="Fidyah"

penjelasan="Orang tua yang tidak mampu berpuasa boleh menggantinya dengan fidyah."

dalil="Dan bagi orang yang berat menjalankannya wajib membayar fidyah memberi makan orang miskin. (QS Al-Baqarah 184)"

}

else if(hamil==="ya" || menyusui==="ya"){

status="Boleh tidak berpuasa"

kewajiban="Qadha (sebagian ulama menambah fidyah)"

penjelasan="Wanita hamil atau menyusui boleh tidak berpuasa jika khawatir pada dirinya atau anaknya."

dalil="Sesungguhnya Allah menggugurkan puasa bagi musafir dan bagi wanita hamil serta menyusui. (HR Abu Dawud)"

}

else if(sakit==="ya" || safar==="ya"){

status="Boleh tidak berpuasa"

kewajiban="Qadha"

penjelasan="Orang sakit atau musafir boleh berbuka dan mengganti di hari lain."

dalil="Barang siapa sakit atau dalam perjalanan maka wajib mengganti pada hari lain. (QS Al-Baqarah 184)"

}

else{

status="Puasa sah dan wajib dilanjutkan"

kewajiban="Tidak ada"

penjelasan="Tidak ada uzur syar'i yang membolehkan berbuka."

dalil="Wahai orang-orang beriman diwajibkan atas kamu berpuasa. (QS Al-Baqarah 183)"

}

document.getElementById("statusPuasa").innerText=status
document.getElementById("kewajibanPuasa").innerText=kewajiban
document.getElementById("penjelasanFiqh").innerText=penjelasan
document.getElementById("dalilAyat").innerText=dalil

}

let step=0

let questions=[

"Apakah Anda haid atau nifas?",

"Apakah Anda sakit?",

"Apakah Anda sedang safar?",

"Apakah Anda sengaja makan atau minum?"

]

let answers={}

function showQuestion(){

document.getElementById("questionText").innerText=questions[step]

let progress=(step/questions.length)*100

document.getElementById("progress").style.width=progress+"%"

}

showQuestion()

function answer(val){

answers[step]=val

step++

if(step<questions.length){

showQuestion()

}else{

showResult()

}

}

function showResult(){

document.getElementById("questionBox").style.display="none"

document.getElementById("resultBox").style.display="block"

let result=""

if(answers[0]=="ya"){

result="Tidak boleh berpuasa. Wajib qadha setelah Ramadhan."

}

else if(answers[3]=="ya"){

result="Puasa batal. Wajib qadha."

}

else if(answers[1]=="ya" || answers[2]=="ya"){

result="Boleh tidak berpuasa. Wajib qadha."

}

else{

result="Puasa sah dan wajib dilanjutkan."

}

document.getElementById("resultText").innerText=result

}