import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

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
  metadataBase: new URL("https://islami-portal-next.vercel.app"),
  title: {
    default: "Portal Literasi Islam",
    template: "%s | Portal Literasi Islam",
  },
  description: "Portal kajian Islam berbasis literatur ilmiah.",
  applicationName: "Portal Literasi Islam",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/assets/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/assets/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b2c5f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ServiceWorkerRegister />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}