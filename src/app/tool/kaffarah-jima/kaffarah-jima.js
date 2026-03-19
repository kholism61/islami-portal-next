function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

function hitungKaffarah() {
  const jumlah = parseInt(document.getElementById("jumlahJima").value, 10) || 0;
  const harga = parseInt(document.getElementById("hargaKaffarah").value, 10) || 0;

  if (jumlah === 0) {
    document.getElementById("hasilKaffarah").innerText = "Masukkan jumlah pelanggaran.";
    return;
  }

  const orangMiskin = jumlah * 60;
  const hariPuasa = jumlah * 60;
  const total = orangMiskin * harga;

  animateValue("statPelanggaran", 0, jumlah, 500);
  animateValue("statMiskin", 0, orangMiskin, 500);

  document.getElementById("totalPelanggaran").innerText = jumlah;
  document.getElementById("totalMiskin").innerText = orangMiskin;

  const hasil = `
Total Kaffarah

${jumlah} pelanggaran

60 orang miskin × ${jumlah}

= ${orangMiskin} orang miskin

Estimasi biaya

${orangMiskin} × ${formatRupiah(harga)}

= ${formatRupiah(total)}

Alternatif kaffarah

Puasa 2 bulan berturut
= ${hariPuasa} hari
`;

  document.getElementById("hasilKaffarah").innerText = hasil;

  let analisis = `
Orang ini melakukan pelanggaran jima di siang hari Ramadhan
sebanyak ${jumlah} kali.

Menurut fiqh, kaffarahnya adalah:

1. Memerdekakan budak
2. Jika tidak mampu -> puasa 2 bulan berturut-turut
3. Jika tidak mampu -> memberi makan 60 orang miskin

Jika memilih memberi makan:

Total orang miskin:
${orangMiskin} orang

Estimasi biaya:
${formatRupiah(total)}

Dalil:

Hadits Abu Hurairah:
Seorang lelaki datang kepada Nabi ﷺ dan berkata
"Aku celaka."

Nabi bertanya:
"Apa yang membuatmu celaka?"

Ia menjawab:
"Aku menggauli istriku di siang hari Ramadhan."

(HR Bukhari dan Muslim)

Dalil Qur'an:

فَمَن لَمْ يَجِدْ فَصِيَامُ شَهْرَيْنِ مُتَتَابِعَيْنِ
فَمَن لَمْ يَسْتَطِعْ فَإِطْعَامُ سِتِّينَ مِسْكِينًا

(QS Al-Mujadilah: 4)
`;

  if (jumlah > 1) {
    analisis += `
Catatan:
Mayoritas ulama menyatakan setiap pelanggaran
memiliki kaffarah tersendiri.
`;
  }

  document.getElementById("analisisKaffarah").innerText = analisis;
}

document.getElementById("jumlahJima").addEventListener("input", hitungKaffarah);
document.getElementById("hargaKaffarah").addEventListener("input", hitungKaffarah);

function setHarga(harga, buttonEl) {
  document.getElementById("hargaKaffarah").value = harga;

  document.querySelectorAll(".harga-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  if (buttonEl) {
    buttonEl.classList.add("active");
  }

  hitungKaffarah();
}

function resetKaffarah() {
  document.getElementById("jumlahJima").value = "";
  document.getElementById("hargaKaffarah").value = "";
  document.getElementById("statPelanggaran").innerText = 0;
  document.getElementById("statMiskin").innerText = 0;

  document.getElementById("hasilKaffarah").innerText = "Hasil perhitungan akan muncul di sini.";
  document.getElementById("analisisKaffarah").innerText = "Analisis akan muncul setelah perhitungan.";
}

function animateValue(id, start, end, duration) {
  if (start === end) {
    document.getElementById(id).innerText = end;
    return;
  }

  const range = end - start;
  let current = start;
  const increment = end > start ? 1 : -1;
  const stepTime = Math.max(10, Math.abs(Math.floor(duration / Math.abs(range))));
  const obj = document.getElementById(id);

  const timer = setInterval(() => {
    current += increment;
    obj.innerText = current;

    if (current === end) {
      clearInterval(timer);
    }
  }, stepTime);
}

function copyHasil() {
  const text = document.getElementById("hasilKaffarah").innerText;
  navigator.clipboard.writeText(text);
  alert("Hasil berhasil disalin");
}

function shareWhatsapp() {
  const hasil = document.getElementById("hasilKaffarah").innerText;
  const url = "https://wa.me/?text=" + encodeURIComponent(hasil);
  window.open(url, "_blank");
}
