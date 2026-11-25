import { SITE_URL } from "@/lib/seo";

// The portfolio wants maximum visibility, so search and AI crawlers are
// allowed explicitly. Listing them keeps that decision documented and
// prevents a future "*" rule from silently blocking them.
const SEARCH_AND_AI_BOTS = [
  "OAI-SearchBot",
  "GPTBot",
  "PerplexityBot",
  "ClaudeBot",
  "Google-Extended",
  "CCBot",
];

export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: SEARCH_AND_AI_BOTS, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
