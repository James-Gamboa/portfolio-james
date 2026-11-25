/** Public path of the CV PDF for a locale (files live in public/cv). */
export function cvPath(lang) {
  return `/cv/james-guevara-gamboa-cv-${lang === "es" ? "es" : "en"}.pdf`;
}
