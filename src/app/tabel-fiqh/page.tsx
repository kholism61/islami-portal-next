import Head from "next/head";
import Link from "next/link";
import Script from "next/script";

export default function TabelFiqhPage() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Tabel Fiqh Mawaris</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/css/metodologi.css" />
      </Head>

      <nav className="top-nav">
        <div className="nav-container">
          <div className="logo">
            <Link href="/">Portal Literasi Islam</Link>
          </div>

          <div className="nav-links">
            <Link href="/">Beranda</Link>
            <Link href="/tools/mawaris">Hitung Mawaris</Link>
            <Link href="/tabel-fiqh">Tabel Fiqh</Link>
            <Link href="/metodologi">Metodologi</Link>
          </div>
        </div>
      </nav>

      <header className="page-header">
        <h1>Tabel Fiqh Pembagian Waris</h1>
        <p>Ringkasan bagian ahli waris berdasarkan Jumhur</p>
      </header>

      <section className="fiqh-table-section">
        <h2 className="table-title">
          DAFTAR KEMUNGKINAN AHLI WARIS DALAM MENDAPATKAN HARTA WARIS
        </h2>

        <div className="table-wrapper">
          <table className="fiqh-table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>No</th>
                <th>Bagian</th>
                <th>Keterangan</th>
              </tr>
            </thead>

            <tbody>
              {/* ANAK PEREMPUAN */}
              <tr>
                <td rowSpan={3}>Anak Perempuan</td>
                <td>1</td>
                <td>1/2</td>
                <td>Bila sendirian, tidak ada anak laki-laki</td>
              </tr>
              <tr>
                <td>2</td>
                <td>2/3</td>
                <td>Bila dua orang atau lebih, tidak ada anak laki-laki</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Ashabah</td>
                <td>
                  Bersama anak laki-laki (laki-laki dua bagian perempuan)
                </td>
              </tr>

              {/* CUCU PEREMPUAN */}
              <tr>
                <td rowSpan={5}>Cucu Perempuan dari Anak Laki-laki</td>
                <td>1</td>
                <td>1/2</td>
                <td>
                  Sendirian, tidak ada anak perempuan atau yang
                  mengashabahkan
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>2/3</td>
                <td>Dua orang atau lebih, tidak ada anak perempuan</td>
              </tr>
              <tr>
                <td>3</td>
                <td>1/6</td>
                <td>Bersama satu anak perempuan (penyempurna 2/3)</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Ashabah</td>
                <td>Bersama cucu laki-laki sederajat</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Mahjub</td>
                <td>Terhalang oleh anak laki-laki</td>
              </tr>

              {/* SAUDARA PEREMPUAN SEKANDUNG */}
              <tr>
                <td rowSpan={5}>Saudara Perempuan Sekandung</td>
                <td>1</td>
                <td>1/2</td>
                <td>Sendirian, tidak ada anak, ayah, atau cucu</td>
              </tr>
              <tr>
                <td>2</td>
                <td>2/3</td>
                <td>Dua orang atau lebih, tidak ada penghalang</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Ashabah</td>
                <td>Bersama saudara laki-laki sekandung</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Ashabah ma&apos;al ghair</td>
                <td>Bersama anak perempuan</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Mahjub</td>
                <td>Terhalang oleh anak laki-laki atau ayah</td>
              </tr>

              {/* SAUDARA PEREMPUAN SEBAPAK */}
              <tr>
                <td rowSpan={7}>Saudara Perempuan Sebapak</td>
                <td>1</td>
                <td>1/2</td>
                <td>
                  Sendirian, tidak ada anak, cucu, ayah, atau saudara
                  sekandung
                </td>
              </tr>

              <tr>
                <td>2</td>
                <td>2/3</td>
                <td>Dua orang atau lebih, tidak ada penghalang</td>
              </tr>

              <tr>
                <td>3</td>
                <td>1/6</td>
                <td>
                  Bersama satu saudara perempuan sekandung (penyempurna 2/3)
                </td>
              </tr>

              <tr>
                <td>4</td>
                <td>Ashabah</td>
                <td>Bersama saudara laki-laki sebapak</td>
              </tr>

              <tr>
                <td>5</td>
                <td>Ashabah ma&apos;al ghair</td>
                <td>Bersama anak perempuan atau cucu perempuan</td>
              </tr>

              <tr>
                <td>6</td>
                <td>Mahjub</td>
                <td>
                  Terhalang oleh anak laki-laki, ayah, atau saudara laki-laki
                  sekandung
                </td>
              </tr>

              <tr>
                <td>7</td>
                <td>Mahjub</td>
                <td>
                  Terhalang oleh dua saudara perempuan sekandung yang telah
                  mengambil 2/3
                </td>
              </tr>

              {/* SAUDARA SEIBU */}
              <tr>
                <td rowSpan={3}>Saudara Laki-laki / Perempuan Seibu</td>
                <td>1</td>
                <td>1/6</td>
                <td>Sendirian, tidak ada anak atau ayah</td>
              </tr>

              <tr>
                <td>2</td>
                <td>1/3</td>
                <td>Dua orang atau lebih, tidak ada anak atau ayah</td>
              </tr>

              <tr>
                <td>3</td>
                <td>Mahjub</td>
                <td>
                  Terhalang oleh anak, cucu laki-laki, ayah, atau kakek
                </td>
              </tr>

              {/* IBU */}
              <tr>
                <td rowSpan={3}>Ibu</td>
                <td>1</td>
                <td>1/6</td>
                <td>Ada anak atau dua saudara</td>
              </tr>
              <tr>
                <td>2</td>
                <td>1/3</td>
                <td>Tidak ada anak dan tidak ada dua saudara</td>
              </tr>
              <tr>
                <td>3</td>
                <td>1/3 Sisa</td>
                <td>Kasus Gharawain (bersama ayah &amp; suami/istri)</td>
              </tr>

              {/* AYAH */}
              <tr>
                <td rowSpan={3}>Ayah</td>
                <td>1</td>
                <td>1/6</td>
                <td>Ada anak laki-laki</td>
              </tr>
              <tr>
                <td>2</td>
                <td>1/6 + Sisa</td>
                <td>Ada anak perempuan</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Ashabah</td>
                <td>Tidak ada anak</td>
              </tr>

              {/* SUAMI */}
              <tr>
                <td rowSpan={2}>Suami</td>
                <td>1</td>
                <td>1/2</td>
                <td>Tidak ada anak</td>
              </tr>
              <tr>
                <td>2</td>
                <td>1/4</td>
                <td>Ada anak</td>
              </tr>

              {/* ISTRI */}
              <tr>
                <td rowSpan={2}>Istri</td>
                <td>1</td>
                <td>1/4</td>
                <td>Tidak ada anak</td>
              </tr>
              <tr>
                <td>2</td>
                <td>1/8</td>
                <td>Ada anak</td>
              </tr>

              {/* KAKEK */}
              <tr>
                <td rowSpan={3}>Kakek</td>
                <td>1</td>
                <td>1/6</td>
                <td>Bersama anak laki-laki atau cucu laki-laki</td>
              </tr>
              <tr>
                <td>2</td>
                <td>1/6 + Sisa</td>
                <td>Bersama anak perempuan</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Ashabah</td>
                <td>Tidak ada anak</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <footer className="simple-footer">
        © 2026 Portal Literasi Islam – Seluruh hak cipta dilindungi.
      </footer>

      <Script src="/js/mawaris-pages-i18n.js" strategy="afterInteractive" />
      <Script src="/js/auth.js" strategy="afterInteractive" />
      <Script src="/js/access-guard.js" strategy="afterInteractive" />
    </>
  );
}