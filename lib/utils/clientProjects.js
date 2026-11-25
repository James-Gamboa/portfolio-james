// Real client work, in display order. Titles are identical in both locales.
// Everything else in the portfolio data is a practice or personal project.
const CLIENT_PROJECT_TITLES = [
  "Avenida Escazu",
  "Escazu Village",
  "Plaza Tempo",
  "C3 Cariari Corporate Center",
  "Savia",
  "Aleste",
  "Lincoln Plaza",
  "Torre Universal",
  "La Laguna",
  "Portafolio Inmobiliario",
  "Fresh Market",
  "Novus ERP",
  "PolkaCR",
  "Contraluz",
];

/** Split projects into client work (curated order) and everything else. */
export function splitProjects(projects = []) {
  const rank = (title) => CLIENT_PROJECT_TITLES.indexOf(title);
  const client = projects
    .filter((project) => rank(project.title) !== -1)
    .sort((a, b) => rank(a.title) - rank(b.title));
  const other = projects.filter((project) => rank(project.title) === -1);
  return { client, other };
}

/** How many client projects get the large featured treatment. */
export const FEATURED_COUNT = 3;

/** Top client projects (curated order) as featured; the rest go in the grid. */
export function pickFeatured(client = [], count = FEATURED_COUNT) {
  return { featured: client.slice(0, count), rest: client.slice(count) };
}

/** Bare hostname of a project URL ("" when missing or invalid). */
export function projectHost(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}
