"use client";

import { useMemo, useState } from "react";

export type FaqItem = {
  q: string;
  a: string;
};

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const safeItems = useMemo(() => items.filter((item) => item.q && item.a), [items]);

  return (
    <div className="space-y-3">
      {safeItems.map((item, idx) => {
        const open = openIndex === idx;
        return (
          <div key={item.q} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
            <button
              type="button"
              onClick={() => setOpenIndex((prev) => (prev === idx ? null : idx))}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-sm font-bold text-zinc-900">{item.q}</span>
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 text-sm font-bold transition ${
                  open ? "bg-zinc-900 text-white" : "bg-zinc-50 text-zinc-700"
                }`}
                aria-hidden
              >
                {open ? "−" : "+"}
              </span>
            </button>

            {open ? (
              <div className="border-t border-zinc-100 px-5 py-4 text-sm leading-7 text-zinc-700">{item.a}</div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
