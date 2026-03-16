import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import SiteFooter from "@/components/SiteFooter";
import SiteNavbar from "@/components/SiteNavbar";

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
        <SiteNavbar />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
