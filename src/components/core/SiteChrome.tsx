"use client";

import { usePathname } from "next/navigation";

import SiteFooter from "@/components/SiteFooter";
import SiteNavbar from "@/components/SiteNavbar";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/") {
    return <>{children}</>;
  }

  return (
    <>
      <SiteNavbar />
      {children}
      <SiteFooter />
    </>
  );
}
