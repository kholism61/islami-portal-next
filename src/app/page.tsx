import Script from "next/script";
import type { Metadata, Viewport } from "next";
import HomePageClientNoSSR from "@/components/core/HomePageClientNoSSR";

export const metadata: Metadata = {
  metadataBase: new URL("https://islami-portal-next.vercel.app"),
  title: "Portal Literasi Islam | Mimbar Ilmu untuk Umat",
  description:
    "Portal Literasi Islam adalah mimbar ilmu untuk umat, menghadirkan kajian fiqih, sejarah, pemikiran Islam, dan literasi keislaman secara ilmiah, moderat, dan mudah dipahami.",
  keywords: [
    "kajian islam",
    "fiqh",
    "hadis",
    "pemikiran islam",
    "artikel islam",
    "ilmu islam",
  ],
  authors: [{ name: "Portal Literasi Islam" }],
  alternates: {
    canonical: "https://islami-portal-next.vercel.app/",
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    title: "Portal Literasi Islam | Mimbar Ilmu untuk Umat",
    description:
      "Portal kajian Islam berbasis literatur ilmiah, membahas fiqih, hadis, dan pemikiran Islam secara mendalam.",
    url: "https://islami-portal-next.vercel.app/",
    images: ["/assets/images/preview.jpg"],
    siteName: "Portal Literasi Islam",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portal Literasi Islam",
    description:
      "Mimbar Ilmu untuk Umat. Kajian fiqih, hadis, dan pemikiran Islam.",
    images: ["/assets/images/preview.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#1e3a8a",
};

export default function HomePage() {
  return (
    <>
      <Script id="schema-website" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Portal Literasi Islam",
            "url": "https://islami-portal-next.vercel.app/",
            "description": "Portal kajian Islam berbasis literatur ilmiah.",
            "inLanguage": "id",
            "publisher": {
              "@type": "Organization",
              "name": "Portal Literasi Islam",
              "logo": {
                "@type": "ImageObject",
                "url": "https://islami-portal-next.vercel.app/assets/images/logo.png"
              }
            }
          }
        `}
      </Script>

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-FD9932Y04M"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-FD9932Y04M');
        `}
      </Script>

      <HomePageClientNoSSR />
    </>
  );
}