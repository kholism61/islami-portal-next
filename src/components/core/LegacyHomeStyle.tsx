"use client";

import { usePathname } from "next/navigation";

export default function LegacyHomeStyle() {
  const pathname = usePathname();
  if (pathname !== "/") return null;

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&family=Amiri&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />
      <link rel="stylesheet" href="/legacy/style.css" />
      <script src="/legacy/home.js" defer />
    </>
  );
}
