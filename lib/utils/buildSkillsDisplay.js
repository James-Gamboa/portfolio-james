const DEFAULT_PRIMARY_STACK = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
];

const SHOPIFY_LIQUID = "Shopify Liquid";

const dedupeItems = (items) => {
  const seen = new Set();
  const result = [];

  for (const item of items) {
    if (!item || seen.has(item)) {
      continue;
    }

    seen.add(item);
    result.push(item);
  }

  return result;
};

const normalizeCmsItems = (items = []) => {
  const hasShopify = items.some(
    (item) => item === "Shopify" || item === SHOPIFY_LIQUID,
  );
  const filtered = items.filter((item) => item !== SHOPIFY_LIQUID);

  if (!hasShopify) {
    return filtered;
  }

  if (filtered.includes("Shopify")) {
    return filtered;
  }

  return ["Shopify", ...filtered];
};

const normalizeDatabaseItems = (items = []) => {
  const hasMysql = items.includes("MySQL");
  return items.filter((item) => !(item === "SQL" && hasMysql));
};

const excludePrimary = (items = [], primaryStack) => {
  const primarySet = new Set(primaryStack);
  return items.filter((item) => !primarySet.has(item));
};

export const buildSkillsDisplay = (resume, dict) => {
  const primaryStack = resume?.primaryStack?.length
    ? resume.primaryStack
    : DEFAULT_PRIMARY_STACK;

  const groups = [
    {
      key: "coreFrontend",
      title:
        dict?.resume?.coreFrontend || dict?.resume?.languages || "Frontend",
      items: excludePrimary(resume?.languages, primaryStack),
    },
    {
      key: "backendData",
      title: dict?.resume?.backendData || "Backend & Data",
      items: excludePrimary(
        dedupeItems([
          ...(resume?.frameworks ?? []),
          ...normalizeDatabaseItems(resume?.databases ?? []),
        ]),
        primaryStack,
      ),
    },
    {
      key: "cmsCommerce",
      title:
        dict?.resume?.cmsCommerce ||
        dict?.resume?.cmsEcommerce ||
        "CMS & Commerce",
      items: normalizeCmsItems(resume?.cmsEcommerce ?? []),
    },
    {
      key: "toolingWorkflow",
      title: dict?.resume?.toolingWorkflow || "Tooling & Workflow",
      items: dedupeItems([
        ...(resume?.toolsPlatforms ?? []),
        ...(resume?.aiTools ?? []),
        ...(resume?.others ?? []),
      ]),
    },
  ].filter((group) => group.items.length > 0);

  return { primaryStack, groups };
};
