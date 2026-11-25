import { splitProjects } from "@/utils/clientProjects";

// Owner facts that are not stored per project: first freelance year and the
// headline stack (kept short on purpose for the at-a-glance strip).
const FREELANCE_SINCE = "2024";
const CORE_STACK = ["Next.js", "React", "TypeScript", "Strapi", "Shopify"];

/**
 * Facts shown right under the hero. The client count is computed from the
 * client list, never hardcoded, so it follows the data.
 */
export function buildHeroFacts({ projects = [], dict }) {
  const facts = dict?.home?.facts ?? {};
  return [
    {
      key: "clients",
      value: String(splitProjects(projects).client.length),
      label: facts.clients,
    },
    { key: "since", value: FREELANCE_SINCE, label: facts.since },
    { key: "stack", value: CORE_STACK.join(" · "), label: facts.stack },
    {
      key: "languages",
      value: facts.languagesValue,
      label: facts.languages,
    },
  ];
}

/**
 * Splits the hero tagline lines into greeting, name and role so the name can
 * be the visual focus while the H1 keeps the original text.
 */
export function buildHeroHeading(data) {
  const lines = [
    data.headerTaglineOne,
    data.headerTaglineTwo,
    data.headerTaglineThree,
    data.headerTaglineFour,
  ].filter(Boolean);
  const role = lines.length > 1 ? lines[lines.length - 1] : "";
  const head = (lines.length > 1 ? lines.slice(0, -1) : lines).join(" ");
  // data.name is the resume title ("Resume James ..."); the person is in resume.
  const person = data.resume?.name ?? data.name;
  const at = person ? head.indexOf(person) : -1;

  if (at === -1) return { greeting: "", name: head, role };
  return {
    greeting: head.slice(0, at).trim(),
    name: person,
    role,
  };
}
