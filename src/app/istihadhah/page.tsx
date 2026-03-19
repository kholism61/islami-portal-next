import FiqhWanitaNav from "@/components/fiqh/FiqhWanitaNav";
import ScrollToTopButton from "@/components/fiqh/ScrollToTopButton";
import FiqhPageRuntime from "@/components/fiqh/FiqhPageRuntime";

export const metadata = {
  title: "Kalkulator Istihadhah",
};

export default function IstihadhahPage() {
  return (
    <>
      <link rel="stylesheet" href="/css/istihadhah.css" />
      <link rel="stylesheet" href="/css/fiqh-wanita-shared.css" />
      <FiqhWanitaNav currentPath="/istihadhah" />

      <section className="hero">
        <h1>Kalkulator Istihadhah</h1>
        <p>Menentukan darah haid dan istihadhah menurut mazhab Syafi&apos;i</p>
      </section>

      <div className="container">
        <div className="card">
          <label>Hari mulai keluar darah</label>

          <input type="date" id="startDate" />

          <label>Kebiasaan Haid (hari)</label>

          <input type="number" id="habit" placeholder="contoh: 7" />

          <label>Hari berhenti darah (opsional)</label>

          <input type="date" id="stopDate" />

          <label>Jenis Kondisi</label>

          <select id="mode">
            <option value="mutadah">Mu&apos;tadah (punya kebiasaan)</option>
            <option value="mumayyizah">Mumayyizah (bisa bedakan darah)</option>
            <option value="mutahayyirah">Mutahayyirah (bingung)</option>
          </select>

          <button id="hitungIstihadhahBtn" type="button">
            Hitung
          </button>

          <div className="result-card" id="resultCard">
            Hasil akan muncul di sini
          </div>

          <div className="fiqh-box">
            <h3>Penjelasan Fiqh</h3>

            <p>
              Dalam mazhab Syafi&apos;i jika darah keluar melebihi masa kebiasaan
              haid, maka setelah masa tersebut dihukumi istihadhah.
            </p>

            <p>
              Wanita tetap wajib shalat dan berwudhu setiap masuk waktu shalat.
            </p>
          </div>

          <div className="calendar">
            <div className="calendar-header">
              <div>Min</div>
              <div>Sen</div>
              <div>Sel</div>
              <div>Rab</div>
              <div>Kam</div>
              <div>Jum</div>
              <div>Sab</div>
            </div>

            <div className="timeline" id="timeline"></div>
          </div>

          <div className="legend">
            <span className="l-haid"></span> Haid
            <span className="l-ist"></span> Istihadhah
            <span className="l-today"></span> Hari ini
            <span className="l-suci"></span> Suci
          </div>
        </div>
      </div>

      <footer className="footer">
        <p> 2026 Portal Literasi Islam</p>
      </footer>

      <ScrollToTopButton />

      <FiqhPageRuntime page="istihadhah" />
    </>
  );
}
