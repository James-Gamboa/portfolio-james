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
