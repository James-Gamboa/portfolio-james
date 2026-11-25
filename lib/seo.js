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

export const ROLE_HEADLINE = {
  en: "Frontend & Full Stack Developer",
  es: "Desarrollador Frontend y Full Stack",
};

export const LOCATION = {
  en: "Heredia, Costa Rica",
  es: "Heredia, Costa Rica",
};

/**
 * Shared per-page metadata: canonical, hreflang alternates, Open Graph and
 * Twitter card. The og:image comes from app/[lang]/opengraph-image.jsx.
 */
export function buildPageMetadata({
  lang,
  page,
  title,
  description,
  type = "website",
}) {
  const path = pagePath(lang, page);
  const otherLang = lang === "en" ? "es" : "en";
  const images = [
    {
      url: `/${lang}/opengraph-image`,
      width: 1200,
      height: 630,
      alt: `${SITE_NAME} - ${ROLE_HEADLINE[lang]}`,
    },
  ];

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: path,
      languages: languageAlternates(page),
    },
    openGraph: {
      type,
      url: path,
      siteName: SITE_NAME,
      title,
      description,
      locale: OG_LOCALES[lang],
      alternateLocale: [OG_LOCALES[otherLang]],
      images,
      ...(type === "profile"
        ? { firstName: "James", lastName: "Guevara Gamboa" }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}

/** Serialize JSON-LD safely for inline <script> usage. */
export function serializeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, String.fromCharCode(92) + "u003c");
}
