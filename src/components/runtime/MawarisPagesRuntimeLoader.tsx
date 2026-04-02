"use client";

import { useEffect } from "react";

import { ensureMawarisPagesI18nRuntime } from "@/legacy/mawarisPagesI18nRuntime";

export default function MawarisPagesRuntimeLoader() {
  useEffect(() => {
    void (async () => {
      try {
        await ensureMawarisPagesI18nRuntime();
      } catch (error) {
        console.error("Failed to initialize mawaris pages runtimes.", error);
      }
    })();
  }, []);

  return null;
}
