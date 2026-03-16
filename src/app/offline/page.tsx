import type { Metadata } from "next";

import OfflineClient from "@/components/core/OfflineClient";

export const metadata: Metadata = {
  title: "Offline | Portal Literasi Islam",
  description: "Artikel yang disimpan untuk dibaca offline.",
};

export default function OfflinePage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <OfflineClient />
    </main>
  );
}
