import type { Metadata } from "next";

import BookmarkClient from "@/components/core/BookmarkClient";

export const metadata: Metadata = {
  title: "Bookmark | Portal Literasi Islam",
  description: "Daftar artikel yang disimpan di bookmark.",
};

export default function BookmarkPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <BookmarkClient />
    </main>
  );
}
