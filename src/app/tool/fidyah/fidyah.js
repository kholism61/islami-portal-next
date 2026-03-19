function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

function hitungFidyah() {
  const hari = parseInt(document.getElementById("hariFidyah").value, 10) || 0;
  const harga = parseInt(document.getElementById("hargaFidyah").value, 10) || 0;
  const metode = document.getElementById("metodeFidyah").value;

  if (hari === 0) {
    document.getElementById("hasilFidyah").innerText = "Masukkan jumlah hari puasa.";
    return;
  }

  let hasil = "";
  let analisis = "";
  const total = hari * harga;
  const totalBeras = (hari * 0.75).toFixed(2);

  if (metode === "uang") {
    hasil = `
Total Fidyah

${hari} hari × ${formatRupiah(harga)}

= ${formatRupiah(total)}
`;

    analisis = `
Orang ini meninggalkan puasa ${hari} hari.

Menurut mazhab Syafi'i, fidyah adalah memberi makan
satu orang miskin untuk setiap hari puasa yang ditinggalkan.

Total orang miskin yang harus diberi makan:
${hari} orang.

Estimasi biaya fidyah:
${formatRupiah(total)}.
`;
  }

  if (metode === "beras") {
    hasil = `
Total Fidyah Beras

${hari} hari × 0.75 kg

= ${totalBeras} kg beras
`;

    analisis = `
Orang ini meninggalkan puasa ${hari} hari.

Fidyah dibayarkan dalam bentuk makanan pokok
sebanyak 1 mud (~0.75 kg) untuk setiap hari puasa.

Total fidyah beras yang harus dikeluarkan:
${totalBeras} kg beras.

Ini setara memberi makan ${hari} orang miskin.
`;
  }

  document.getElementById("hasilFidyah").innerText = hasil;
  document.getElementById("analisisFidyah").innerText = analisis;

  const fiqh = `
Menurut Mazhab Syafi'i,
fidyah adalah memberi makan satu orang miskin
untuk setiap hari puasa yang ditinggalkan.
`;

  document.getElementById("fiqhFidyah").innerText = fiqh;

  document.getElementById("statHari").innerText = hari;
  document.getElementById("statTotal").innerText = total;
}

document.getElementById("hariFidyah").addEventListener("input", hitungFidyah);
document.getElementById("hargaFidyah").addEventListener("input", hitungFidyah);
document.getElementById("metodeFidyah").addEventListener("change", hitungFidyah);

function setHarga(harga) {
  document.getElementById("hargaFidyah").value = harga;
  hitungFidyah();
}

function resetFidyah() {
  document.getElementById("hariFidyah").value = "";
  document.getElementById("hargaFidyah").value = "";
  document.getElementById("hasilFidyah").innerText = "Hasil perhitungan akan muncul di sini.";
  document.getElementById("analisisFidyah").innerText = "Analisis akan muncul setelah perhitungan.";
  document.getElementById("fiqhFidyah").innerText = "Penjelasan fiqh akan muncul di sini.";
  document.getElementById("statHari").innerText = 0;
  document.getElementById("statTotal").innerText = 0;
}
