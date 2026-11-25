# Portfolio recruiter upgrade

Feature document (ODD). Engram mirror: `odd/portfolio-recruiter-upgrade/tasks`.

## Objective

Make https://james-gamboa.vercel.app attractive to recruiters and technically excellent: SEO + GEO ready, fast, accessible, secure, and with a code quality baseline. Lighthouse must reach at least 90 in Performance, Accessibility, Best Practices and SEO (mobile and desktop, /en and /es).

## Problem

The portfolio is the main asset for job applications but has not been audited for recruiter UX, search/AI visibility, image weight, security tooling or code quality.

## Scope (requested by the owner, 2026-11-24)

1. Recruiter appeal: clear value proposition above the fold, CTA (contact, CV download ES/EN, LinkedIn, GitHub), real client work first.
2. SEO checklist (robots, sitemap, canonical, noindex, status codes, HTTPS/single host, SSR, architecture, hreflang).
3. Performance and UX (Core Web Vitals, images, mobile-first, accessibility).
4. On-page (titles, descriptions, H1/H2/H3, intent, OG/Twitter, favicon/manifest).
5. Structured data (schema.org).
6. GEO (AI crawlers in robots.txt, llms.txt, quotable content, consistent entity, E-E-A-T, HTML not trapped in JS/PDF).
7. Measurement (GA4/Search Console/Bing setup guidance, AI referral segmentation, consent banner).
8. Image guide compliance (`Guía de imágenes web.md`).
9. Security scripts in package.json (audit, signatures, lockfile, secrets, SAST, validate).
10. Code quality review report (bugs, duplication, complexity, tests, design, tech debt) with prioritized top 5.
11. Lighthouse >= 90 in every category.

## Constraints

- Owner-facing facts only: never invent metrics, clients, testimonials or roles.
- Do not break the existing i18n (/en, /es) or the project data in `lib/utils/data/*.json`.
- Work on a branch; no push/merge without the owner's OK.
- Some items need owner accounts (Search Console, Bing, GA4): prepare code and steps, mark as owner action.

## Tasks

Baseline
- [x] P0 Audit current state + Lighthouse baseline (live /en, /es, mobile + desktop).

Recruiter appeal
- [x] P1 Hero: role, location/remote, one-line value proposition, primary CTAs (contact, CV ES/EN, LinkedIn, GitHub).
- [x] P2 Client work first: real client projects highlighted over practice projects; project cards with role, stack, link.
- [x] P3 Experience/timeline and certifications (Anthropic Academy etc.) visible in HTML.

SEO
- [x] S1 robots.txt (no important routes blocked, points to sitemap) + AI crawler decisions.
- [x] S2 sitemap.xml with canonical 200 indexable URLs, both locales, hreflang alternates.
- [x] S3 Canonical per page, no chains/contradictions; no leftover noindex.
- [x] S4 hreflang es / en + x-default.
- [ ] S5 HTTPS + single host verified; no internal 404 or redirect chains.
- [x] S6 SSR/SSG: served HTML contains content and links.
- [x] S7 Clean architecture: click depth <= 3, clean URLs.

On-page
- [x] O1 Unique title (50–60 chars) and meta description per page and locale.
- [x] O2 One H1, coherent H2/H3.
- [x] O3 Open Graph + Twitter Cards with 1200x630 og:image per locale.
- [x] O4 Favicon set, apple-touch-icon, web manifest.

Structured data
- [x] D1 JSON-LD: Person (sameAs LinkedIn/GitHub), WebSite, ProfilePage; projects as CreativeWork/ItemList where it fits. Validate.

GEO
- [x] G1 llms.txt with summary and key links.
- [x] G2 Quotable content: TL;DR at top, clear facts, FAQ section for recruiters.
- [x] G3 Consistent entity (same name/headline/description as LinkedIn, GitHub README, CV).
- [x] G4 E-E-A-T: about section with bio, real cases, visible last-updated date.

Performance and images
- [x] I1 Images to WebP/AVIF within the guide's weight/width limits; descriptive lowercase-hyphen names.
- [x] I2 width/height or aspect-ratio everywhere; srcset/sizes (next/image).
- [x] I3 LCP image: no lazy, fetchpriority high; lazy + decoding async below the fold.
- [x] I4 Remove external image hosting where possible (postimg.cc) or configure it properly.
- [x] I5 Core Web Vitals targets: LCP < 2.5 s, INP < 200 ms, CLS < 0.1 (mobile).
- [x] I6 Accessibility: alt, contrast, heading hierarchy, focus states, landmarks.

Measurement
- [x] M1 Analytics hook (GA4 or Vercel Analytics) with conversion events (CV download, contact, LinkedIn click) — owner provides IDs.
- [x] M2 AI referral segmentation notes (chatgpt.com, perplexity.ai, gemini, copilot).
- [x] M3 Consent banner only if analytics needs it; must not hurt LCP/CLS.
- [ ] M4 Owner checklist: Search Console + Bing Webmaster verification and sitemap submission.

Security
- [x] X1 package.json scripts: typecheck, audit:prod, audit:node, audit:signatures, audit:lockfile, audit:secrets, audit:secrets:staged, audit:sast, validate (adapted to pnpm where needed).
- [x] X2 Security headers (CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, frame-ancestors).
- [x] X3 Run the scripts and record results; fix high findings.

Code quality
- [ ] Q1 Senior code-quality review report (bugs, duplication, complexity, tests, design, debt) with file:line, severity and top 5 actions.
- [ ] Q2 Apply the top quick wins from Q1.

Verification
- [ ] V1 Lighthouse >= 90 in all four categories (mobile + desktop, /en + /es) on a production build/preview.
- [ ] V2 Rich Results / Schema validation, sitemap and robots checks.

## Checks

- `pnpm build` passes.
- Lighthouse (mobile + desktop) per locale.
- Security scripts output recorded.

## Progress

- 2026-11-24: document created.
- P0 done. Baseline Lighthouse (live): en mobile 82/91/100/92, es mobile 79/91/100/92, en desktop 59/91/100/92 (CLS 0.222, intermittent), es desktop 92/91/100/92. Key gaps: robots/sitemap 500, html lang hardcoded en, 12 H1, no canonical/hreflang/OG/JSON-LD, no CV download, /edit public, unoptimized images (postimg + 1600px JPGs), only HSTS header.
- X1 done (adapted to pnpm + JS project): audit:prod, audit:node, audit:lockfile (pnpm frozen lockfile check; lockfile-lint does not support pnpm), audit:secrets(+staged), audit:sast, validate. No `typecheck` (no TypeScript) and no `audit:signatures` (npm-only). Results: gitleaks no leaks (41 commits); prod audit 41 vulns (3 critical, 18 high) -> after upgrading next 15.5.29, postcss, autoprefixer, sharp 0.35.5 + pnpm overrides: 5 (2 low, 3 moderate). Node pin 22.22.3 vulnerable -> volta 22.23.4. `pnpm build` passes. Commit dd5577c. semgrep not installed yet (X3).
- Batch 1 (S1-S7, O1-O4, D1, G1, I6, X2, edit route) delegated to a writer.
- Owner decision (2026-11-24): publish the CV PDFs for download as they are (phone and email included). Use the Full Stack variants (`CV/Variantes/CV-James_Guevara-FullStack.pdf` es, `James_Guevara_CV-FullStack.pdf` en).
- Batch 1 done (commits f7e5167..286b17c): robots/sitemap 200 with AI bot rules, html lang per locale, metadata/canonical/hreflang/OG/Twitter, OG image, icons (favicon 258KB -> 1.6KB), manifest, JSON-LD (WebSite/ProfilePage/Person), llms.txt, single H1 + landmarks + contrast/target fixes, CSP + security headers, /edit dev-only, dead API removed, canonical resume URLs /en/resume and /es/curriculum-vitae. Local production Lighthouse: en mobile 100/100/100/100, es mobile 86-87/100/100/100 (LCP 4.0 s), en desktop 98/100/100/100, es desktop 98/100/100/100. S5 (live HTTPS/host/redirects) to re-verify after deploy. Parent spot check: pnpm build passed.
- Batch 2 done (commits 41ff1e9..d87e80d): recruiter hero with Download CV (es/en PDFs in public/cv), Contact, LinkedIn, GitHub; client work (13) before practice projects (21); experience + education + certifications on home; About TL;DR + 6-question recruiter FAQ with FAQPage JSON-LD; llms.txt refreshed; footer "Last updated"; 34 project images self-hosted as WebP (<=148 KB, 4:3, max 1280 px), postimg removed from config and CSP; hero entrance CSS-only, motion engine deferred to idle (home first-load JS 212 KB -> 160 KB); @vercel/analytics with cv_download/contact_click/linkedin_click/github_click events (only on Vercel). Local production Lighthouse: 100/100/100/100 for en/es mobile and desktop (mobile LCP 1.1 s, CLS <= 0.028). Parent spot check: pnpm build passed; screenshots of /en desktop and /es mobile reviewed.
- Open note: on 1440x900 desktop the hero CTAs sit at the fold edge; consider tightening hero type scale.
- To confirm with owner: "Portafolio Inmobiliario" counted as client work.
- X3 done: semgrep 1.x installed via pip (not on PATH: add C:\Users\jjgue\AppData\Roaming\Python\Python314\Scripts). First scan 14 findings: 12 in agent tooling folders (.agents/.claude, excluded via .semgrepignore), 2 reviewed false positives (JSON-LD escaped "<"; static regexes on repo data) suppressed with justification. Rescan: 0 findings. Commit 6073e26.
- M2 (owner notes): segment AI referrals in analytics by referrer hosts chatgpt.com, perplexity.ai, gemini.google.com, copilot.microsoft.com.
- M4 (owner actions after deploy): enable Web Analytics in Vercel; verify the site in Google Search Console and Bing Webmaster Tools and submit https://james-gamboa.vercel.app/sitemap.xml.
- Q1 code-quality review running (read-only, report to docs/code-quality-review.md).
- TDD: not applicable (no test runner in this project); checks are build, HTTP checks on a production server and Lighthouse.
