"use client";

import { useEffect } from "react";

import { ensureFaqRuntime } from "@/legacy/faqRuntime";
import { ensureNavActiveRuntime } from "@/legacy/navActiveRuntime";

export default function FaqRuntimeLoader() {
  useEffect(() => {
    void (async () => {
      try {
        await ensureFaqRuntime();
        await ensureNavActiveRuntime();
      } catch (error) {
        console.error("Failed to initialize FAQ runtimes.", error);
      }
    })();
  }, []);

  return null;
}
