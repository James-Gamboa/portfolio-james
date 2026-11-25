export const SITE_URL = "https://james-gamboa.vercel.app";
export const SITE_NAME = "James Guevara Gamboa";
export const LOCALES = ["en", "es"];
export const DEFAULT_LOCALE = "en";

export const OG_LOCALES = { en: "en_US", es: "es_CR" };

// One canonical path per page and locale. The other spelling is a permanent
// redirect (see next.config.js).
export const PAGE_PATHS = {
  home: { en: "", es: "" },
  resume: { en: "/resume", es: "/curriculum-vitae" },
};

export function pagePath(lang, page) {
  return `/${lang}${PAGE_PATHS[page][lang]}`;
}

export function pageUrl(lang, page) {
  return `${SITE_URL}${pagePath(lang, page)}`;
}

export function languageAlternates(page) {
  return {
    en: pagePath("en", page),
    es: pagePath("es", page),
    "x-default": pagePath(DEFAULT_LOCALE, page),
  };
}

export function isLocale(value) {
  return LOCALES.includes(value);
}
