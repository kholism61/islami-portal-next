"use client";

import { useEffect } from "react";

import { ensureAccessGuardRuntime } from "@/legacy/accessGuardRuntime";
import { ensureCommonBrandI18nRuntime } from "@/legacy/commonBrandI18nRuntime";
import { ensureNavActiveRuntime } from "@/legacy/navActiveRuntime";
import { ensureStaticPagesI18nRuntime } from "@/legacy/staticPagesI18nRuntime";

export default function StaticPagesRuntimeLoader({ includeNavActive = true }: { includeNavActive?: boolean }) {
  useEffect(() => {
    void (async () => {
      try {
        if (includeNavActive) {
          await ensureNavActiveRuntime();
        }
        await ensureCommonBrandI18nRuntime();
        await ensureStaticPagesI18nRuntime();
        await ensureAccessGuardRuntime();
      } catch (error) {
        console.error("Failed to initialize static pages runtimes.", error);
      }
    })();
  }, []);

  return null;
}
