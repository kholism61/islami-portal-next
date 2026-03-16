export type Mazhab = "syafii" | "hanafi" | "maliki" | "hanbali";

export type ZakatMaalInput = {
  cash: number;
  savings: number;
  gold: number;
  sukuk: number;
  reksadana: number;
  crypto: number;
  sewaIncome: number;
  sewaExpense: number;
  receivable: number;
  receivableType: "kuat" | "lemah";
  debt: number;
  goldPrice: number;
  haul: boolean;
};

export type ZakatIncomeInput = {
  salary: number;
  expenses: number;
  goldPrice: number;
  method: "haul" | "monthly";
  haul: boolean;
};

export type ZakatFitrahInput = {
  count: number;
  ricePrice: number;
  mazhab: Mazhab;
};

export function rupiah(value: number) {
  const rounded = Math.round(Number(value || 0));
  return `Rp${rounded.toLocaleString("id-ID")}`;
}

export function nisabMaal(goldPrice: number) {
  return Number(goldPrice || 0) * 85;
}

export function calculateZakatMaal(input: ZakatMaalInput) {
  const goldPrice = Number(input.goldPrice || 0) || 1_000_000;
  const nisab = nisabMaal(goldPrice);

  const receivableAdj = input.receivableType === "kuat" ? Number(input.receivable || 0) : 0;
  const sewaNet = Number(input.sewaIncome || 0) - Number(input.sewaExpense || 0);

  const assets =
    Number(input.cash || 0) +
    Number(input.savings || 0) +
    Number(input.gold || 0) +
    Number(input.sukuk || 0) +
    Number(input.reksadana || 0) +
    Number(input.crypto || 0) +
    Number(sewaNet || 0) +
    Number(receivableAdj || 0);

  const net = assets - Number(input.debt || 0);
  const zakat = net >= nisab && input.haul ? net * 0.025 : 0;

  return { nisab, assets, net, zakat };
}

export function calculateZakatIncome(input: ZakatIncomeInput) {
  const goldPrice = Number(input.goldPrice || 0) || 1_000_000;
  const nisab = nisabMaal(goldPrice);

  const salaryNet = Number(input.salary || 0) - Number(input.expenses || 0);

  let zakat = 0;
  let appliedNisab = nisab;

  if (input.method === "haul") {
    appliedNisab = nisab;
    zakat = salaryNet >= nisab && input.haul ? salaryNet * 0.025 : 0;
  } else {
    appliedNisab = nisab / 12;
    zakat = salaryNet >= appliedNisab ? salaryNet * 0.025 : 0;
  }

  return { nisab: appliedNisab, salaryNet, zakat };
}

export function calculateZakatFitrah(input: ZakatFitrahInput) {
  const totalKg = Number(input.count || 0) * 2.5;
  const zakatMoney = totalKg * Number(input.ricePrice || 0);
  const note = input.mazhab === "hanafi"
    ? "Mazhab Hanafi membolehkan zakat fitrah dengan uang."
    : "Umumnya zakat fitrah ditunaikan dalam bentuk makanan pokok; nilai rupiah ini sebagai estimasi.";

  return { totalKg, zakatMoney, note };
}
