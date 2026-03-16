import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import LegacyHomeStyle from "@/components/core/LegacyHomeStyle";
import ServiceWorkerRegister from "@/components/core/ServiceWorkerRegister";
import SiteChrome from "@/components/core/SiteChrome";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portal Literasi Islam",
  description: "Portal kajian Islam berbasis literatur ilmiah.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/assets/icons/icon-192.png",
    apple: "/assets/icons/icon-192.png"
  }
};

export const viewport: Viewport = {
  themeColor: "#0b2c5f"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-zinc-50 antialiased`}
      >
        <ServiceWorkerRegister />
        <LegacyHomeStyle />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
