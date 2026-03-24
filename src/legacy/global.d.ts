import type { PortalI18n } from "@/legacy/portalI18n";

declare global {
  interface Window {
    PortalI18n?: PortalI18n;
    setLang?: (lang: "id" | "en" | "ar") => void;
    SITE_LANGS?: Array<"id" | "en" | "ar">;
    __PORTAL_ARTICLE_STORE_CACHE__?: Map<string, unknown>;
    __PORTAL_ARTICLE_STORE__?: unknown;
  }
}

export {};
