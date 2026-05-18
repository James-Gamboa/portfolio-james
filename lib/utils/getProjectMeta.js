const MAX_AUTO_TAGS = 6;

const TAG_RULES = [
  { label: "Next.js", test: (text) => /next\.?js/i.test(text) },
  { label: "React", test: (text) => /\breact\b/i.test(text) },
  { label: "TypeScript", test: (text) => /typescript/i.test(text) },
  { label: "JavaScript", test: (text) => /\bjavascript\b/i.test(text) },
  { label: "HTML", test: (text) => /html\s*5|html5|\bhtml\b/i.test(text) },
  {
    label: "CSS",
    test: (text) =>
      /css\s*3|css modules/i.test(text) ||
      (/\bcss\b/i.test(text) && !/tailwind\s*css/i.test(text)),
  },
  { label: "Tailwind", test: (text) => /tailwind/i.test(text) },
  { label: "Shopify", test: (text) => /shopify/i.test(text) },
  { label: "GSAP", test: (text) => /\bgsap\b/i.test(text) },
  { label: "Lenis", test: (text) => /\blenis\b/i.test(text) },
  { label: "Strapi", test: (text) => /strapi/i.test(text) },
  { label: "GraphQL", test: (text) => /graphql/i.test(text) },
  { label: "Django", test: (text) => /django/i.test(text) },
  { label: "Sass", test: (text) => /\bsass\b/i.test(text) },
  { label: "Bootstrap", test: (text) => /bootstrap/i.test(text) },
  { label: "Vite", test: (text) => /\bvite\b/i.test(text) },
  { label: "PHP", test: (text) => /\bphp\b/i.test(text) },
  {
    label: "Framer Motion",
    test: (text) => /framer motion|frame motion/i.test(text),
  },
];

const TAG_PRIORITY = [
  "Next.js",
  "React",
  "TypeScript",
  "JavaScript",
  "HTML",
  "CSS",
  "Tailwind",
  "Shopify",
  "GSAP",
  "SSR",
  "Lenis",
  "Strapi",
  "GraphQL",
  "Django",
  "Sass",
  "Bootstrap",
  "Vite",
  "PHP",
  "Framer Motion",
];

const CATEGORY_LABELS = {
  en: {
    webPlatform: "Web Platform",
    realEstate: "Real Estate",
    ecommerce: "E-commerce",
    gaming: "Gaming & Media",
    communityPlatform: "Community Platform",
    product: "Product UI",
    experiment: "Experiment",
  },
  es: {
    webPlatform: "Plataforma Web",
    realEstate: "Inmobiliario",
    ecommerce: "E-commerce",
    gaming: "Gaming y Media",
    communityPlatform: "Plataforma Social",
    product: "Product UI",
    experiment: "Experimento",
  },
};

export const CARD_ACCENTS = [
  {
    ring: "group-hover:shadow-[0_0_0_1px_rgba(139,92,246,0.35)]",
    glow: "from-violet-500/25 via-fuchsia-500/10 to-transparent",
    badge: "border-violet-500/25 bg-violet-500/10 text-violet-200/90",
    dot: "bg-violet-400",
  },
  {
    ring: "group-hover:shadow-[0_0_0_1px_rgba(34,211,238,0.35)]",
    glow: "from-cyan-500/25 via-sky-500/10 to-transparent",
    badge: "border-cyan-500/25 bg-cyan-500/10 text-cyan-100/90",
    dot: "bg-cyan-400",
  },
  {
    ring: "group-hover:shadow-[0_0_0_1px_rgba(244,114,182,0.35)]",
    glow: "from-rose-500/25 via-pink-500/10 to-transparent",
    badge: "border-rose-500/25 bg-rose-500/10 text-rose-100/90",
    dot: "bg-rose-400",
  },
  {
    ring: "group-hover:shadow-[0_0_0_1px_rgba(52,211,153,0.35)]",
    glow: "from-emerald-500/25 via-teal-500/10 to-transparent",
    badge: "border-emerald-500/25 bg-emerald-500/10 text-emerald-100/90",
    dot: "bg-emerald-400",
  },
  {
    ring: "group-hover:shadow-[0_0_0_1px_rgba(251,191,36,0.35)]",
    glow: "from-amber-500/25 via-orange-500/10 to-transparent",
    badge: "border-amber-500/25 bg-amber-500/10 text-amber-100/90",
    dot: "bg-amber-400",
  },
  {
    ring: "group-hover:shadow-[0_0_0_1px_rgba(96,165,250,0.35)]",
    glow: "from-blue-500/25 via-indigo-500/10 to-transparent",
    badge: "border-blue-500/25 bg-blue-500/10 text-blue-100/90",
    dot: "bg-blue-400",
  },
];

const IMAGE_POSITIONS = [
  "object-center",
  "object-top",
  "object-[center_25%]",
  "object-bottom",
  "object-left",
  "object-[center_75%]",
];

const resolveCategoryKey = (text) => {
  if (/steam women|steam-women/i.test(text)) return "communityPlatform";
  if (/shopify|ecommerce|e-commerce|tienda/i.test(text)) return "ecommerce";
  if (/gaming|esports|rawg|jamesxp|videojuego/i.test(text)) return "gaming";
  if (/\bsteam\b/i.test(text) && !/steam women|steam-women/i.test(text))
    return "gaming";
  if (
    /real estate|inmobili|erp|corporate center|village|plaza|avenida|savia|aleste|novus|portafolio/i.test(
      text,
    )
  )
    return "realEstate";
  if (
    /pokedex|tetris|trivia|connect four|conecta|game|juego|audiophile|airbnb|clone|mentor|practice|práctica|practica/i.test(
      text,
    )
  )
    return "experiment";
  if (/landing|bank|studio|agency|designo|fylo|manage|news|events/i.test(text))
    return "product";
  return "webPlatform";
};

const sortTags = (tags) =>
  [...tags].sort((a, b) => {
    const aIndex = TAG_PRIORITY.indexOf(a);
    const bIndex = TAG_PRIORITY.indexOf(b);
    const aRank = aIndex === -1 ? TAG_PRIORITY.length : aIndex;
    const bRank = bIndex === -1 ? TAG_PRIORITY.length : bIndex;
    return aRank - bRank;
  });

export const getProjectMeta = (project, lang = "en", index = 0) => {
  const text = `${project.title} ${project.description}`.toLowerCase();
  const labels = CATEGORY_LABELS[lang] ?? CATEGORY_LABELS.en;
  const categoryKey = project.category ?? resolveCategoryKey(text);

  const explicitTags = Array.isArray(project.tags) ? project.tags : [];
  const detected = TAG_RULES.filter((rule) => rule.test(text)).map(
    (rule) => rule.label,
  );
  const hasNext =
    detected.includes("Next.js") || explicitTags.includes("Next.js");

  const merged = explicitTags.length
    ? sortTags(explicitTags)
    : sortTags([...new Set([...detected, ...(hasNext ? ["SSR"] : [])])]).slice(
        0,
        MAX_AUTO_TAGS,
      );

  const excerpt =
    project.excerpt ??
    (project.description?.length > 120
      ? `${project.description.slice(0, 117).trim()}…`
      : project.description);

  return {
    category: labels[categoryKey] ?? labels.webPlatform,
    categoryKey,
    tags: merged,
    excerpt,
    accent: CARD_ACCENTS[index % CARD_ACCENTS.length],
    imagePosition: IMAGE_POSITIONS[index % IMAGE_POSITIONS.length],
  };
};
