/**
 * Anchor for a home-page section, using the locale-specific id declared in the
 * dictionary (`sections.work` is "trabajo" in Spanish, for example).
 */
export function sectionHref(lang, dict, key) {
  return `/${lang}#${dict?.sections?.[key] || key}`;
}

/** Links shown in the mobile menu, in display order. */
export function buildMobileNavLinks({ lang, dict, email }) {
  return [
    { href: `/${lang}`, label: dict?.nav?.home || "Home" },
    { href: sectionHref(lang, dict, "about"), label: dict?.nav?.about || "About" },
    {
      href: sectionHref(lang, dict, "work"),
      label: dict?.nav?.projects || "Projects",
    },
    {
      href: email,
      label: dict?.nav?.contact || "Contact",
      isMail: true,
    },
  ];
}
