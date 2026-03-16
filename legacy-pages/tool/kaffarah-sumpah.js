function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

function hitungSumpah() {
  const jumlah = parseInt(document.getElementById("jumlahSumpah").value, 10) || 0;
  const harga = parseInt(document.getElementById("hargaSumpah").value, 10) || 0;

  if (jumlah === 0) {
    document.getElementById("hasilSumpah").innerText = "Masukkan jumlah sumpah.";
    return;
  }

  const orangMiskin = jumlah * 10;
  const total = orangMiskin * harga;

  document.getElementById("statSumpah").innerText = jumlah;
  document.getElementById("statMiskin").innerText = orangMiskin;

  const hasil = `
Total Kaffarah

${jumlah} sumpah

10 orang miskin × ${jumlah}

= ${orangMiskin} orang miskin

Estimasi biaya

${orangMiskin} × ${formatRupiah(harga)}

= ${formatRupiah(total)}

Alternatif kaffarah

Puasa 3 hari
`;

  document.getElementById("hasilSumpah").innerText = hasil;

  const analisis = `
Orang ini melanggar sumpah sebanyak ${jumlah} kali.

Menurut fiqh:

1. Memberi makan 10 orang miskin
2. Memberi pakaian 10 orang miskin
3. Memerdekakan budak

Jika tidak mampu:

Puasa 3 hari.

Dalil:

لَا يُؤَاخِذُكُمُ اللَّهُ بِاللَّغْوِ فِي أَيْمَانِكُمْ
وَلَٰكِنْ يُؤَاخِذُكُمْ بِمَا عَقَّدتُّمُ الْأَيْمَانَ

(QS Al-Maidah: 89)
`;

  document.getElementById("analisisSumpah").innerText = analisis;
}

function setHargaSumpah(harga) {
  document.getElementById("hargaSumpah").value = harga;
  hitungSumpah();
}

function resetSumpah() {
  document.getElementById("jumlahSumpah").value = "";
  document.getElementById("hargaSumpah").value = "";

  document.getElementById("statSumpah").innerText = 0;
  document.getElementById("statMiskin").innerText = 0;

  document.getElementById("hasilSumpah").innerText = "Hasil perhitungan akan muncul di sini.";
  document.getElementById("analisisSumpah").innerText = "Analisis akan muncul setelah perhitungan.";
}

function copyHasil() {
  const text = document.getElementById("hasilSumpah").innerText;
  navigator.clipboard.writeText(text);
  alert("Hasil berhasil disalin");
}

function shareWA() {
  const text = document.getElementById("hasilSumpah").innerText;
  const url = "https://wa.me/?text=" + encodeURIComponent(text);
  window.open(url, "_blank");
}
