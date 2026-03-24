"use client";

import { useEffect } from "react";

import { ensureKontakRuntime } from "@/legacy/kontakRuntime";
import { ensureNavActiveRuntime } from "@/legacy/navActiveRuntime";

export default function KontakRuntimeLoader() {
  useEffect(() => {
    void (async () => {
      try {
        await ensureKontakRuntime();
        await ensureNavActiveRuntime();
      } catch (error) {
        console.error("Failed to initialize Kontak runtimes.", error);
      }
    })();
  }, []);

  return null;
}
