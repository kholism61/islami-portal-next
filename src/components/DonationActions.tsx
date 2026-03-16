"use client";

import { useState } from "react";

export default function DonationActions() {
  const [qrisOpen, setQrisOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  async function copyText(value: string, key: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      window.setTimeout(() => setCopied(null), 1500);
    } catch {
      setCopied(null);
    }
  }

  const bankNumber = "1830006850027";

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <h3 className="text-base font-extrabold">💳 Informasi Donasi</h3>

        <div className="mt-4 rounded-2xl bg-zinc-50 p-4">
          <p className="text-sm font-bold text-zinc-900">Transfer Bank</p>
          <p className="mt-1 text-sm text-zinc-700">Bank Mandiri</p>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white px-4 py-2 text-sm font-extrabold tracking-wide text-zinc-900 shadow-sm">
              {bankNumber}
            </span>
            <button
              type="button"
              onClick={() => copyText(bankNumber, "bank")}
              className="rounded-full bg-zinc-900 px-4 py-2 text-xs font-bold text-white hover:bg-zinc-800"
            >
              {copied === "bank" ? "Tersalin" : "📋 Salin"}
            </button>
          </div>

          <p className="mt-3 text-sm text-zinc-700">a.n. MUHAMMAD NURCHOLIS</p>
        </div>

        <button
          type="button"
          onClick={() => setQrisOpen((prev) => !prev)}
          className="mt-4 flex w-full items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-left text-sm font-bold text-zinc-900 hover:bg-zinc-50"
        >
          <span>📱 Donasi via QRIS</span>
          <span aria-hidden className="text-lg">
            {qrisOpen ? "−" : "+"}
          </span>
        </button>

        {qrisOpen ? (
          <div className="mt-3 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4">
            <img
              src="/assets/images/qris.png"
              alt="QRIS Donasi Portal Literasi Islam"
              className="mx-auto w-full max-w-xs rounded-xl"
            />
            <p className="mt-3 text-center text-sm text-zinc-600">
              Scan QRIS menggunakan e-wallet atau mobile banking Anda.
            </p>
          </div>
        ) : null}

        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            { label: "$5", href: "https://www.paypal.com/ncp/payment/CUEW253D7GJSC" },
            { label: "$10", href: "https://www.paypal.com/ncp/payment/CUEW253D7GJSC" },
            { label: "$25", href: "https://www.paypal.com/ncp/payment/CUEW253D7GJSC" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center rounded-2xl border border-zinc-200 bg-white px-3 py-3 text-sm font-extrabold text-zinc-900 hover:bg-zinc-50"
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href="https://www.paypal.com/ncp/payment/CUEW253D7GJSC"
          target="_blank"
          rel="noreferrer"
          className="mt-4 flex items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 text-sm font-extrabold text-white hover:bg-blue-700"
        >
          🌍 Donasi Internasional via PayPal
        </a>

        <p className="mt-2 text-center text-xs text-zinc-500">🔒 Secure payment powered by PayPal</p>

        <div className="mt-5 rounded-2xl bg-zinc-50 p-4">
          <p className="text-sm font-bold text-zinc-900">Kontak Konfirmasi</p>
          <p className="mt-1 text-sm text-zinc-700">Email: nurcholism51@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
