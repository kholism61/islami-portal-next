import type { PortalI18n } from "@/legacy/portalI18n";
import type { PortalAdminI18n } from "@/legacy/adminI18nRuntime";

declare global {
  interface Window {
    PortalI18n?: PortalI18n;
    PortalAdminI18n?: PortalAdminI18n;
    setLang?: (lang: "id" | "en" | "ar") => void;
    SITE_LANGS?: Array<"id" | "en" | "ar">;
    __PORTAL_ARTICLE_STORE_CACHE__?: Map<string, unknown>;
    __PORTAL_ARTICLE_STORE__?: unknown;

    L?: unknown;

    Chart?: unknown;
    __zakatLangSwitchBound?: boolean;

    syncArticleChrome?: () => void;
    updateBookmarkBadge?: () => void;
    getLocalizedCategory?: (category: string, lang?: string) => string;
    getCategoryIcon?: (name: string) => string;

    __tocClickHandler?: (event: Event) => void;
    __tocScrollHandler?: () => void;
    __tocResizeHandler?: () => void;
    __tocDocumentClickHandler?: (event: Event) => void;
    __tocToggleHandler?: (event: Event) => void;
    __tocScrollTicking?: boolean;
    __portalHomeFeaturedTimer?: number | null;
    __portalHomeCategories?: unknown;
    __PORTAL_AUTO_SCROLL_DONE__?: boolean;
  }
}

export {};
