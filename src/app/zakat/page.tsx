import type { Metadata } from "next";

import ZakatCalculator from "@/components/zakat/ZakatCalculator";

export const metadata: Metadata = {
  title: "Hitung Zakat | Portal Literasi Islam",
  description: "Kalkulator zakat maal, penghasilan, dan fitrah. Versi Next.js (React).",
};

export default function ZakatPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <ZakatCalculator />
    </main>
  );
}
