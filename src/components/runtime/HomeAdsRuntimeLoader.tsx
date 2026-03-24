"use client";

import { useEffect } from "react";

import { ensureHomeAdsRuntime } from "@/legacy/homeAdsRuntime";

export default function HomeAdsRuntimeLoader() {
  useEffect(() => {
    void (async () => {
      try {
        await ensureHomeAdsRuntime();
      } catch (error) {
        console.error("Failed to initialize home ads runtime.", error);
      }
    })();
  }, []);

  return null;
}
