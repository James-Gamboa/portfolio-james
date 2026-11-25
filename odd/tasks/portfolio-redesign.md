# Portfolio redesign for recruiters

Feature document (ODD). Engram mirror: `odd/portfolio-redesign/tasks`.

## Objective

Redesign https://james-gamboa.vercel.app so a recruiter understands who James is, what he builds and how to contact him within a few seconds, with a distinctive but professional visual identity. Then rewrite the repository README with fresh screenshots.

## Why

Owner authorized a redesign (2026-11-25) if the current design is plain or unattractive for recruiters. Assessment of the current design: text-only hero on flat black with an oversized "Hello" line, no at-a-glance credentials, generic "James Portfolio" text logo, no visible CV button in the nav, flat visual hierarchy between client work and practice work, plain lists for experience and certifications.

## Scope

- Visual identity: keep dark theme; brand accent from the existing pink-to-blue gradient (OG image, GitHub profile README); refined type scale; the owner's serif JG logo in the header.
- Hero: concise headline, value proposition, location/remote, primary CTA Download CV + Contact, secondary LinkedIn/GitHub; at-a-glance facts strip from real data (no invented numbers).
- Featured client work: top 3 client projects as larger cards; remaining client projects in the grid; practice projects visually secondary.
- Experience timeline, education and certifications with clearer rhythm; skills grouped as chips.
- Nav: logo, section links, persistent "CV" button; mobile menu kept working.
- Footer with contact CTA.
- README rewrite with new screenshots, badges, Lighthouse table, stack, architecture, scripts, quality section.

## Constraints

- Facts only from repo data, CV and confirmed owner facts. No testimonials, no invented metrics.
- Keep i18n (en/es), SEO metadata, JSON-LD, single H1, landmarks, CSP (no third-party fonts/scripts; use next/font self-hosted).
- Lighthouse must stay >= 90 in all categories (currently 100); keep LCP text-based and not hidden by JS animation; CLS < 0.1.
- Keep the owner's original JG logo and the dark theme.
- Strict TDD for unit-testable logic (runner: `pnpm test`, Vitest). Visual changes verified by screenshots and Lighthouse.
- Branch only; owner merges.

## Tasks

- [x] R1 Design tokens: accent gradient, colors, spacing, type scale (Tailwind config + globals). Evidence: commit 030a180; ink/content/brand tokens, Instrument Serif via next/font + Hind, fluid display/title scale; 67 tests green.
- [x] R2 Header: JG logo, section links, CV button; mobile menu parity. Evidence: floating sticky header, public/jg-logo.png (inverted from app/apple-icon.png), buildDesktopNavLinks (RED 4 failed -> GREEN 71); mobile menu anchors/lang switch verified en+es.
- [x] R3 Hero redesign + facts strip. Evidence: buildHeroFacts/buildHeroHeading (RED suite failed to load, then 2 failed -> GREEN 80); client count derived from clientProjects (14).
- [x] R4 Featured client projects (top 3) + client grid + secondary practice section. Evidence: pickFeatured/projectHost (RED 5+3 failed -> GREEN 88); FeaturedWorkCard, WorkCard, PracticeCard; image quality fixed to 75 (next.config qualities).
- [x] R5 Experience timeline, education/certifications, skills chips. Evidence: buildExperienceTimeline/splitCertification (RED suite failed -> GREEN 96); Anthropic Academy highlighted card; skills section on home.
- [x] R6 Contact/footer CTA. Evidence: footer panel with email, CV, LinkedIn, GitHub, last-updated kept; services/FAQ restyled.
- [x] R7 Verification: tests, build, Playwright screenshots (desktop/mobile, en/es), Lighthouse >= 90 x4. Evidence: pnpm test 96 passed; pnpm build ok; Lighthouse en/es mobile 95/99 perf, desktop 100, a11y/BP/SEO 100 everywhere; CLS <= 0.034; one h1; JSON-LD parses; mobile menu OK.
- [ ] R8 README rewrite with new screenshots.

## Progress

- 2026-11-25: document created; redesign delegated to a single writer.
- 2026-11-25: R1-R7 done on feat/redesign; R8 (README) pending, not part of this writer.
- 2026-11-25: owner REJECTED the pink-to-blue gradient, near-black palette and Instrument Serif/Hind typography. Owner chose option C: navy `#0a0f1c` surfaces, single sky-blue accent (`#38bdf8` text, `#0ea5e9` filled buttons with `#04121c` text), one family (Plus Jakarta Sans via next/font, weights 400/600/800). Gradient removed everywhere; OG image, manifest and viewport theme color updated. Commit `style: navy and sky-blue palette with Plus Jakarta Sans`. Contrast on navy: content 15:1, muted 7.7:1, subtle 6.9:1, sky 9.3:1, button text 7:1 (AA).
- 2026-11-25: navbar bug (header vanished when the language selector opened). Root cause: Radix DropdownMenu modal mode locks scroll with `body{overflow:hidden;position:relative}`, which makes `<body>` the scroll container; the sticky header goes out with the scrolled page (repro: scrollY 1200 -> header top -721 at 1440x900). Fix: `modal={false}` (commit `fix(nav): keep the header visible...`). Mobile: the dropdown rendered under the full-screen menu (z-110), fixed with `z-[120]` (commit `fix(nav): render the language dropdown above the mobile menu`). Not unit-testable (browser layout), verified with Playwright.
- 2026-11-25: Plaza Tempo now links to https://www.plazatempo.com/{en,es} (both 200), llms.txt updated. RED: 1 failed/96 passed -> GREEN 97 passed. Commit `fix(projects): link Plaza Tempo to its production domain`.
- 2026-11-25: practice list uses centered flex-wrap so incomplete last row is centered. Commit `style(projects): balance the practice list last row`.
- Evidence (option C): pnpm test 97 passed; pnpm build ok; Lighthouse local prod en/es mobile+desktop 100/100/100/100 (mobile LCP 1.1 s, CLS <= 0.01); header stays visible with selector open in en/es at 1440x900 and 390x844; one h1; JSON-LD parses; 0 console errors.
