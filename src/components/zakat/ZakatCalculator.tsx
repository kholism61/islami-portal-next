"use client";

import { useMemo, useState } from "react";

import type { Mazhab } from "@/lib/zakat";
import {
  calculateZakatFitrah,
  calculateZakatIncome,
  calculateZakatMaal,
  rupiah,
} from "@/lib/zakat";

type TabKey = "maal" | "penghasilan" | "fitrah";

const maalNumberKeys = [
  "cash",
  "savings",
  "gold",
  "receivable",
  "debt",
  "sukuk",
  "reksadana",
  "crypto",
  "sewaIncome",
  "sewaExpense",
] as const;

type MaalNumberKey = (typeof maalNumberKeys)[number];
type IncomeMethod = "haul" | "monthly";

function numberValue(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function ZakatCalculator() {
  const [tab, setTab] = useState<TabKey>("maal");
  const [mazhab, setMazhab] = useState<Mazhab>("syafii");

  const [goldPrice, setGoldPrice] = useState(1_000_000);

  const [maal, setMaal] = useState({
    cash: 0,
    savings: 0,
    gold: 0,
    sukuk: 0,
    reksadana: 0,
    crypto: 0,
    sewaIncome: 0,
    sewaExpense: 0,
    receivable: 0,
    receivableType: "kuat" as "kuat" | "lemah",
    debt: 0,
    haul: false,
  });

  const [income, setIncome] = useState({
    salary: 0,
    expenses: 0,
    method: "haul" as IncomeMethod,
    haul: false,
  });

  const [fitrah, setFitrah] = useState({
    count: 1,
    ricePrice: 0,
  });

  const maalResult = useMemo(() => {
    return calculateZakatMaal({
      ...maal,
      goldPrice,
    });
  }, [maal, goldPrice]);

  const incomeResult = useMemo(() => {
    return calculateZakatIncome({
      ...income,
      goldPrice,
    });
  }, [income, goldPrice]);

  const fitrahResult = useMemo(() => {
    return calculateZakatFitrah({
      ...fitrah,
      mazhab,
    });
  }, [fitrah, mazhab]);

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">Kalkulator Zakat</h1>
          <p className="mt-2 text-sm leading-7 text-zinc-600">
            Versi React (Next.js). Rumus mengikuti implementasi di web static.
          </p>
        </div>

        <div className="grid gap-3">
          <label className="text-xs font-bold text-zinc-700">Mazhab</label>
          <select
            value={mazhab}
            onChange={(e) => setMazhab(e.target.value as Mazhab)}
            className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-900"
          >
            <option value="syafii">Syafi’i (umum di Indonesia)</option>
            <option value="hanafi">Hanafi</option>
            <option value="maliki">Maliki</option>
            <option value="hanbali">Hanbali</option>
          </select>
        </div>
      </div>

      <div className="mt-6 grid gap-4 rounded-3xl bg-zinc-50 p-4 sm:grid-cols-2 sm:p-6">
        <div>
          <label className="text-xs font-bold text-zinc-700">Harga emas per gram (Rp)</label>
          <input
            type="number"
            value={goldPrice}
            onChange={(e) => setGoldPrice(numberValue(e.target.value))}
            className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold"
            placeholder="1000000"
          />
          <p className="mt-2 text-xs text-zinc-600">Nisab zakat maal = 85 gram emas.</p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white px-4 py-4">
          <p className="text-xs font-bold text-zinc-700">Nisab (estimasi)</p>
          <p className="mt-1 text-lg font-extrabold text-zinc-900">{rupiah(maalResult.nisab)}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {([
          { key: "maal", label: "Zakat Maal" },
          { key: "penghasilan", label: "Penghasilan" },
          { key: "fitrah", label: "Zakat Fitrah" },
        ] as const).map((item) => {
          const active = tab === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setTab(item.key)}
              className={`rounded-full px-4 py-2 text-xs font-extrabold transition ${
                active
                  ? "bg-zinc-900 text-white"
                  : "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {tab === "maal" ? (
        <div className="mt-8 grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {maalNumberKeys.map((key) => {
                const labelMap: Record<string, string> = {
                  cash: "Uang tunai",
                  savings: "Tabungan",
                  gold: "Emas (nilai rupiah)",
                  receivable: "Piutang",
                  debt: "Hutang jatuh tempo",
                  sukuk: "Nilai Sukuk",
                  reksadana: "Reksa Dana Syariah",
                  crypto: "Aset Digital (Crypto)",
                  sewaIncome: "Pendapatan sewa (1 tahun)",
                  sewaExpense: "Biaya sewa/operasional",
                };

                return (
                  <label key={key} className="grid gap-2">
                    <span className="text-xs font-bold text-zinc-700">{labelMap[key]}</span>
                    <input
                      type="number"
                      value={maal[key as MaalNumberKey]}
                      onChange={(e) =>
                        setMaal((prev) => ({
                          ...prev,
                          [key]: numberValue(e.target.value),
                        }))
                      }
                      className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold"
                      placeholder="0"
                    />
                  </label>
                );
              })}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 text-sm font-semibold text-zinc-700">
              <input
                type="checkbox"
                checked={maal.haul}
                onChange={(e) => setMaal((prev) => ({ ...prev, haul: e.target.checked }))}
              />
              Sudah haul (1 tahun)
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-bold text-zinc-700">Jenis Piutang</span>
              <select
                value={maal.receivableType}
                onChange={(e) =>
                  setMaal((prev) => ({ ...prev, receivableType: e.target.value as "kuat" | "lemah" }))
                }
                className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold"
              >
                <option value="kuat">Kuat (utang dagang / lancar)</option>
                <option value="lemah">Lemah / belum pasti</option>
              </select>
            </label>
          </div>

          <div className="grid gap-3 rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
            <p className="text-sm font-extrabold text-zinc-900">Hasil Zakat Maal</p>
            <div className="grid gap-2 text-sm text-zinc-700">
              <div className="flex items-center justify-between gap-4">
                <span>Total aset</span>
                <span className="font-extrabold text-zinc-900">{rupiah(maalResult.assets)}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Harta bersih</span>
                <span className="font-extrabold text-zinc-900">{rupiah(maalResult.net)}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Zakat (2.5%)</span>
                <span className="font-extrabold text-zinc-900">{rupiah(maalResult.zakat)}</span>
              </div>
            </div>
            {maalResult.zakat === 0 ? (
              <p className="text-xs text-zinc-600">
                Tidak wajib jika belum mencapai nisab atau belum haul.
              </p>
            ) : null}
          </div>
        </div>
      ) : null}

      {tab === "penghasilan" ? (
        <div className="mt-8 grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-xs font-bold text-zinc-700">Pendapatan</span>
              <input
                type="number"
                value={income.salary}
                onChange={(e) => setIncome((prev) => ({ ...prev, salary: numberValue(e.target.value) }))}
                className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold"
                placeholder="0"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-bold text-zinc-700">Pengeluaran</span>
              <input
                type="number"
                value={income.expenses}
                onChange={(e) => setIncome((prev) => ({ ...prev, expenses: numberValue(e.target.value) }))}
                className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold"
                placeholder="0"
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-xs font-bold text-zinc-700">Metode</span>
              <select
                value={income.method}
                onChange={(e) => setIncome((prev) => ({ ...prev, method: e.target.value as IncomeMethod }))}
                className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold"
              >
                <option value="haul">Tahunan (haul)</option>
                <option value="monthly">Bulanan</option>
              </select>
            </label>

            {income.method === "haul" ? (
              <label className="flex items-center gap-2 text-sm font-semibold text-zinc-700">
                <input
                  type="checkbox"
                  checked={income.haul}
                  onChange={(e) => setIncome((prev) => ({ ...prev, haul: e.target.checked }))}
                />
                Sudah haul (1 tahun)
              </label>
            ) : (
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-4 text-xs text-zinc-600">
                Metode bulanan tidak mensyaratkan haul.
              </div>
            )}
          </div>

          <div className="grid gap-3 rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
            <p className="text-sm font-extrabold text-zinc-900">Hasil Zakat Penghasilan</p>
            <div className="grid gap-2 text-sm text-zinc-700">
              <div className="flex items-center justify-between gap-4">
                <span>Penghasilan bersih</span>
                <span className="font-extrabold text-zinc-900">{rupiah(incomeResult.salaryNet)}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Nisab</span>
                <span className="font-extrabold text-zinc-900">{rupiah(incomeResult.nisab)}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Zakat (2.5%)</span>
                <span className="font-extrabold text-zinc-900">{rupiah(incomeResult.zakat)}</span>
              </div>
            </div>
            {incomeResult.zakat === 0 ? (
              <p className="text-xs text-zinc-600">Tidak wajib jika belum mencapai nisab atau belum haul.</p>
            ) : null}
          </div>
        </div>
      ) : null}

      {tab === "fitrah" ? (
        <div className="mt-8 grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-xs font-bold text-zinc-700">Jumlah jiwa</span>
              <input
                type="number"
                value={fitrah.count}
                onChange={(e) => setFitrah((prev) => ({ ...prev, count: numberValue(e.target.value) }))}
                className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold"
                placeholder="1"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-bold text-zinc-700">Harga beras per kg (Rp)</span>
              <input
                type="number"
                value={fitrah.ricePrice}
                onChange={(e) => setFitrah((prev) => ({ ...prev, ricePrice: numberValue(e.target.value) }))}
                className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold"
                placeholder="0"
              />
            </label>
          </div>

          <div className="grid gap-3 rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
            <p className="text-sm font-extrabold text-zinc-900">Hasil Zakat Fitrah</p>
            <div className="grid gap-2 text-sm text-zinc-700">
              <div className="flex items-center justify-between gap-4">
                <span>Total beras</span>
                <span className="font-extrabold text-zinc-900">{fitrahResult.totalKg.toFixed(2)} kg</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Estimasi nilai</span>
                <span className="font-extrabold text-zinc-900">{rupiah(fitrahResult.zakatMoney)}</span>
              </div>
            </div>
            <p className="text-xs text-zinc-600">{fitrahResult.note}</p>
          </div>
        </div>
      ) : null}

      <p className="mt-8 text-xs leading-6 text-zinc-500">
        Catatan: ini adalah kalkulator edukasi. Untuk keputusan fiqh dan penyaluran, rujuk ulama/lembaga zakat resmi.
      </p>
    </section>
  );
}
