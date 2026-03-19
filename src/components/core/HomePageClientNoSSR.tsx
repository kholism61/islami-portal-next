"use client";

import dynamic from "next/dynamic";

const HomePageClient = dynamic(() => import("@/components/core/HomePageClient"), { ssr: false });

export default function HomePageClientNoSSR() {
  return <HomePageClient />;
}
