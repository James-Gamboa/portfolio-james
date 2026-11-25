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

/** Links shown in the desktop header nav, in display order. */
export function buildDesktopNavLinks({ lang, dict, email, showResume = true }) {
  const resumeRoute = lang === "es" ? "curriculum-vitae" : "resume";
  return [
    {
      href: sectionHref(lang, dict, "work"),
      label: dict?.nav?.projects || "Projects",
    },
    { href: sectionHref(lang, dict, "about"), label: dict?.nav?.about || "About" },
    ...(showResume
      ? [
          {
            href: `/${lang}/${resumeRoute}`,
            label: dict?.nav?.resume || "Resume",
          },
        ]
      : []),
    { href: email, label: dict?.nav?.contact || "Contact", isMail: true },
  ];
}
