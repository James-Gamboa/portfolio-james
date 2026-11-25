import {
  LOCATION,
  ROLE_HEADLINE,
  SITE_NAME,
  SITE_URL,
  pageUrl,
} from "@/lib/seo";

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

// Education facts come from the resume data (FWD Costa Rica, CETAV) and the
// owner's brief (INA).
const ALUMNI_OF = [
  { "@type": "EducationalOrganization", name: "FWD Costa Rica" },
  {
    "@type": "EducationalOrganization",
    name: "Centro de Tecnología y Artes Visuales (CETAV)",
  },
  {
    "@type": "EducationalOrganization",
    name: "Instituto Nacional de Aprendizaje (INA)",
  },
];

function socialUrls(data) {
  const wanted = ["linkedin", "github"];
  return (data.socials ?? [])
    .filter((social) => wanted.includes(String(social.title).toLowerCase()))
    .map((social) => social.link);
}

function knowledge(data) {
  const resume = data.resume ?? {};
  return [
    ...new Set([
      ...(resume.primaryStack ?? []),
      ...(resume.cmsEcommerce ?? []).filter((item) =>
        ["Shopify", "Strapi", "WordPress"].includes(item),
      ),
    ]),
  ];
}

/** FAQPage node from the dictionary Q&A (same text as the visible section). */
function faqPage({ url, lang, items }) {
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url,
    inLanguage: lang,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** ProfilePage + Person + WebSite + FAQPage graph for the home page. */
export function buildHomeJsonLd({ lang, data, title, description, faq = [] }) {
  const url = pageUrl(lang, "home");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: `${SITE_URL}/${lang}`,
        name: SITE_NAME,
        inLanguage: lang,
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfilePage",
        "@id": `${url}#profilepage`,
        url,
        name: title,
        description,
        inLanguage: lang,
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": PERSON_ID },
      },
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: SITE_NAME,
        jobTitle: ROLE_HEADLINE[lang],
        description,
        url,
        address: {
          "@type": "PostalAddress",
          addressLocality: LOCATION[lang].split(",")[0].trim(),
          addressCountry: "CR",
        },
        sameAs: socialUrls(data),
        knowsAbout: knowledge(data),
        knowsLanguage: ["es", "en"],
        alumniOf: ALUMNI_OF,
      },
      ...(faq.length ? [faqPage({ url, lang, items: faq })] : []),
    ],
  };
}
