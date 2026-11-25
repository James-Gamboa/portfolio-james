# Code quality review: portfolio-james

Branch `feat/recruiter-upgrade`. Scope: quality and maintainability only (security is covered by pnpm audit, gitleaks and semgrep). Read-only analysis; the only file written is this report.

Method: read every file in `app/`, `lib/`, `hooks/`, `animations/`, `middleware.js`, `next.config.js`, the home/resume components, providers and dictionaries; verified dependency and module usage with ripgrep; ran `jscpd` (15 clones, 2.24% duplicated lines, mostly lockfile); executed `getProjectMeta` against both data files and diffed the en/es dictionaries and data (keys are identical in both). Items marked "to verify" were inferred from code or framework docs and not reproduced at runtime.

## Summary

| Severity | Count |
|---|---|
| High | 4 |
| Medium | 20 |
| Low | 10 |
| Total | 34 |

## Findings table

Sorted by severity, then by impact on the critical parts (i18n/nav, project cards, motion, SEO, resume). Details and code quotes for each ID are in the next section.

| ID | File and line | Category | Severity | Problem | Suggestion |
|---|---|---|---|---|---|
| Q01 | components/atoms/HamburgerMenu/HamburgerMenu.jsx:32-36 | Bug | High | Mobile menu anchors are hardcoded `#about` and `#projects`, but section ids come from the dictionary (`work`/`about` in EN, `trabajo`/`sobre-mi` in ES). `#projects` exists in neither locale; `#about` is broken in ES. | Build the hrefs from `dict.sections` (as `Header` does) and share one `sectionHref(lang, key)` helper. |
| Q02 | lib/utils/getProjectMeta.js:123-160 | Bug | High | Project category is inferred by regex over translated prose, so it differs by locale (Biccas: product in EN, webPlatform in ES; Dalio, Audiophile also differ). 31 of 34 projects have no explicit `category`. Substring `erp` also matches words like "enterprise". | Put `category` (a key) on every project in both JSON files, or key it by `id`; keep the regex only as a dev-time check. |
| Q03 | components/atoms/HamburgerMenu/HamburgerMenu.jsx:20-28,135-146; components/atoms/LanguageSelector/LanguageSelector.jsx:45-59 | Bug / race | High | Nav widgets fetch the dictionary on the client in an effect, although the server already passes `dict` to `Header`. Until the fetch resolves the hamburger button is `disabled`; if both imports fail it never enables. LanguageSelector fetches a dict it never uses. | Pass `dict` and `lang` as props from `Header`; delete both client fetches and the `disabled` placeholder. |
| Q04 | repo-wide (no test runner in package.json) | Tests | High | No tests and no test script. Pure, high-risk logic (locale matching, SEO/JSON-LD, project meta, skills display, scroll restore) is unguarded, and en/es parity is only checked by hand. | Add Vitest plus a Playwright smoke; see "Recommended test set". |
| Q05 | components/providers/MotionProvider.jsx:167-172,180-190 | Race | Medium | `requestAnimationFrame` in the main effect is never cancelled. `usePrefersReducedMotion` starts `false`, so reduced-motion users first get Lenis and a pending rAF, then the effect re-runs; the stale rAF still fires `setupScrollReveals()` and `setIsReady(true)` after cleanup. Same in StrictMode/unmount. | Keep the rAF id, `cancelAnimationFrame` in cleanup, and guard with a `cancelled` flag. Initialize the reduced-motion state synchronously (`useSyncExternalStore`). |
| Q06 | components/providers/MotionProvider.jsx:88-107 | Bug | Medium | When Lenis is absent (mobile "lite" mode) a numeric target is a silent no-op and element targets ignore `offset`. Scroll restore after a language switch loops 16 frames on mobile; the hash scroll with `offset: -80` lands under the header. | In the no-Lenis branch handle numbers (`window.scrollTo`) and apply `offset` like the reduced-motion branch; extract one `scrollNative(target, offset, behavior)` helper. |
| Q07 | components/providers/MotionProvider.jsx:111-191 | Bug (to verify) | Medium | Reveals are set up once; the effect depends only on `reducedMotion`, not on the route. After client navigation home to resume (same `[lang]` layout, provider persists) new `[data-reveal]` nodes are not registered and `ScrollTrigger.refresh()` is not called. `pathname` is only a dependency of the restore effect. | Re-run `setupScrollReveals` and `refresh` on `pathname` change (or use `useGSAP` with `scope` per page). Verify in browser. |
| Q08 | components/templates/HomeTemplate/page.jsx:1,15-30,52 | Design / perf | Medium | Whole home page is a client component for scroll handlers that `Header` never receives (`Header` takes only `{ dict, data }`). `useRef`, `useScrollTo`, `workRef`, `aboutRef` are dead, yet they force every organism and the full `data` JSON into the client bundle and RSC payload. | Remove `"use client"`, the refs and the handlers; keep client only in Header/WorkCard leafs that need it. |
| Q09 | components/organisms/Header/page.jsx:21-65 | Design / dup | Medium | Two full `<header>` trees (mobile + desktop) are always in the DOM, so `LanguageSelector` mounts twice (three times with the menu portal) and there are two banner landmarks. Email and event name are hardcoded (`mailto:jjguevarag@gmail.com`, `trackEvent="contact_click"`) instead of `data.socials`/`EVENTS`. | One `<header>` with responsive classes; take email from `data.socials`; use `EVENTS.contact`. |
| Q10 | middleware.js:5; lib/seo.js:3,10-13; lib/constants/languages.js; LanguageSelector.jsx:61,89-92; Header.jsx:53; ExperienceSection.jsx:7; app/[lang]/error.jsx:24; opengraph-image.jsx:15-17 | Duplication | Medium | Locale list and resume slugs are defined in about eight places. `PAGE_PATHS`/`pagePath()` already exist in `lib/seo.js` but Header, ExperienceSection and LanguageSelector re-implement the `curriculum-vitae`/`resume` rule. Adding a locale or renaming a slug touches many files. | Make `lib/seo.js` (or a new `lib/i18n.js`) the single source; import `LOCALES`, `pagePath` and `isLocale` everywhere, including middleware. |
| Q11 | next.config.js:51-57 vs middleware.js:39-41 | Design (to verify) | Medium | `redirects()` sends `/`, `/resume`, `/curriculum-vitae` permanently to a fixed locale. Next applies config redirects before middleware, so Accept-Language negotiation never runs for the main entry points, and the 308s are cached by browsers. | Confirm with `curl -I -H "Accept-Language: es" /`; if confirmed, drop the `/` redirect and let middleware negotiate (307), or document that EN is always the default. |
| Q12 | app/[lang]/not-found.jsx:16-44; app/[lang]/error.jsx:16-43; app/[lang]/page.jsx:8-11; resume/page.jsx:6-9; curriculum-vitae/page.jsx:6-9; edit/page.jsx:16-18 | Duplication / bug | Medium | `loadDictionary` is copy-pasted six times. `not-found` and `error` render `null` until a client effect loads the dictionary, so the 404 body is empty in the served HTML. The two files are 33 lines of clone (jscpd). | Use the existing `getDictionary` in `components/lib/dictionaries.js` (currently unused) in server components; pass `dict` to a shared `ErrorView` client component. |
| Q13 | components/ui/* (22 of 25 files unused) | Dead code | Medium | Only `badge`, `button`, `dropdown-menu` are imported. The other files import 15 `@radix-ui/*` packages that are not in package.json (`accordion`, `avatar`, `checkbox`, `dialog`, `popover`, `progress`, `radio-group`, `select`, `separator`, `slider`, `switch`, `tabs`, `toast`, `toggle`, `tooltip`). Importing any of them breaks the build. | Delete unused shadcn files, `components/hooks/use-toast.js`, and the accordion keyframes in tailwind.config.js:66-87. |
| Q14 | package.json:34,41,48,51,53-58,62 | Tech debt | Medium | No imports found for `styled-components`, `react-datepicker`, `gray-matter`, `remark`, `remark-html`, `parse-numeric-range`, `react-textarea-autosize`, `@headlessui/react`. `react-markdown` and `react-syntax-highlighter` are only used by the dead `ContentSection`; `uuid` only by the dev `EditTemplate`; `@gsap/react` only via an unused `useGSAP` re-export. | Remove them with `pnpm remove`; re-run build and audit. |
| Q15 | animations/index.jsx; lib/constants/languages.js; components/molecules/ContentSection/page.jsx + styles/markdown.css; hooks/useScrollTo.js; components/lib/dictionaries.js:10-18; jsconfig.json:8,11 | Dead code | Medium | No importers: `animations/`, `lib/constants/languages.js`, `ContentSection` (and `styles/markdown.css` it needs), `getDictionaryClient`, aliases `@/animations` and `@/api` (no `lib/api`). Dictionary keys `hero`, `about`, `common`, `sectionIds` are unused (only `not-found` reads `dict.hero.title`). | Delete, or wire them in; add `knip` or `ts-prune` to find these automatically. |
| Q16 | components/templates/EditTemplate/page.jsx:23,144; ResumeTemplate/page.jsx:28 | Bug / dead | Medium | The dev editor posts to `/api/portfolio`, but `app/api` does not exist. The link in `ResumeTemplate` is `/Edit` (capital E; the route is `/[lang]/edit`). It renders `<Header isBlog>` which ignores both the prop and a missing `dict`. State is mutated in place (`copyProjects[projectIndex] = ...`). | Delete the editor (JSON edited in git), or implement the route and fix the link; drop `uuid`. |
| Q17 | app/[lang]/resume/page.jsx; app/[lang]/curriculum-vitae/page.jsx; ResumeTemplate:15-22 | Duplication / SEO | Medium | The two pages are byte-identical (jscpd: 33 lines). `showResume === false` returns `<div>Resume not available</div>` with HTTP 200 while the page stays in the sitemap (soft 404). | Create one `renderResumePage` / shared module and re-export; call `notFound()` when `showResume` is false and filter it in `sitemap.js`. |
| Q18 | components/templates/ResumeTemplate/page.jsx (203 lines) | Complexity | Medium | One component with about eight inline conditional sections, an `Array.isArray(education)` branch that duplicates its JSX, English fallbacks (`"About Me"`, `"Experience"`...) bypassing i18n, and `"use client"` without hooks. | Split into `ResumeHeader`, `ResumeEducation`, `ResumeList` sections; normalize `education` to an array once; drop client directive and fallbacks (dictionaries have key parity). |
| Q19 | components/atoms/HamburgerMenu/HamburgerMenu.jsx (235 lines) | Complexity / a11y | Medium | Mixes dictionary loading, hash tracking, scroll lock (manual body styles), Escape handling, focus, and rendering. `role="menu"`/`menuitem` is used for navigation links, there is no focus trap although `aria-modal="true"`, and on close it calls `window.scrollTo(0, scrollY)`, fighting the navigation it just triggered. | Extract `useBodyScrollLock`, `useHash`; use a `<dialog>` or plain nav list without `role="menu"`; skip restoring scroll when a link was clicked. |
| Q20 | lib/utils/getProjectMeta.js (186 lines); lib/utils/clientProjects.js:3-17 | Design | Medium | One module holds tag rules, priority list, category regex, localized labels (duplicating dictionary strings), Tailwind accent classes and image positions. Client projects are identified by display title strings, so renaming a title in JSON silently moves a card out of the client list. | Split into `projectTags.js`, `projectCategory.js`, `projectTheme.js`; use `id` or an `isClient: true` flag in the data; take labels from the dictionary. |
| Q21 | components/organisms/ProjectsSection/page.jsx:70-117; components/molecules/WorkCard/page.jsx:1 | Duplication / perf | Medium | The client and other groups repeat the same `<ul>` and `WorkCard` props block. `WorkCard` and `ProjectsSection` are client components with no state, so `getProjectMeta`, with its regex tables, ships to the browser. | Extract `ProjectGrid({ projects, offset })`; make both server components (neither needs client state). |
| Q22 | lib/utils/data.js:1-23; app/[lang]/page.jsx:32-34 | Naming / dup | Medium | `getPortfolioDataSync` returns a Promise (misnamed) and duplicates `getPortfolioData`; the home page wraps it with `.catch` while the resume page relies on the other function's try/catch. The `else` branch treats any non-`es` value as English. | One `getPortfolioData(lang)` with a locale-to-loader map; remove the Sync variant. |
| Q23 | components/** layout | Design (atomic) | Medium | Files named `page.jsx` inside `components/` read like routes. `LanguageSelector` and `HamburgerMenu` (state, routing, data fetching, portal) are atoms by folder but organisms by behavior; `SkillsSection` is under molecules. Three button systems coexist: `atoms/Button`, `ui/button`, `atoms/CtaLink`. Two hooks folders (`/hooks`, `components/hooks`) and two utils (`components/lib/utils.js`, `lib/utils`). | Rename to `ComponentName.jsx` (as LanguageSelector already does), move stateful widgets to organisms, converge on one button, merge folders. |
| Q24 | components/providers/ClientMotionBoundary.jsx:6-21,66-73 | Bug | Medium | Until the engine loads, `reducedMotion` is `false` and `nativeScrollTo` always uses `behavior: "smooth"`, so users with `prefers-reduced-motion` get smooth scroll during the first seconds. | Read the media query in `nativeScrollTo` (`matchMedia(...).matches ? "auto" : "smooth"`). |
| Q25 | components/molecules/ServiceCard/page.jsx:1-6,13-17,22-23 | Bug / debt | Low | `// @ts-nocheck` in a JS project; `mounted` state is only used to interpolate `${mounted && "hover:bg-slate-800"}`, which renders the literal class `undefined` (then `hover:bg-slate-800`); lorem ipsum fallback in production code; `key={index}` at the call site. | Use a static `hover:bg-slate-800`, drop state and the fallback text; key by `service.title`. |
| Q26 | components/atoms/Socials/page.jsx:6,13 | Bug | Low | `className` has no default, so the template literal emits the class `undefined`; the `lang` prop is unused; the fallback text is English only; `key={index}`. | Use `cn(...)`, remove `lang`, key by `social.title`. |
| Q27 | components/atoms/LanguageSelector/LanguageSelector.jsx:19-20,43,74,114 | Bug / debt | Low | Duplicate `<rect ... y="12">` line; `currentLanguage` is `undefined` if the first path segment is not `en`/`es`, so `currentLanguage.flag` would throw (to verify, middleware normally prevents it); language switch drops the URL hash. | Delete the duplicate; derive from `LOCALES` and fall back to default; carry `window.location.hash`. |
| Q28 | lib/utils/localeScroll.js:17-23 | Robustness | Low | `sessionStorage` is read/written without try/catch (throws in blocked-storage contexts); a saved value is left behind if navigation does not complete and is applied on a later fresh load. | Wrap in try/catch and store a timestamp with the value. |
| Q29 | lib/jsonLd.js:14-24,26-43; lib/seo.js:40-43,97-99 | Maintainability | Low | Education (`ALUMNI_OF`) and the CMS filter list are hardcoded instead of coming from the data; `LOCATION` is identical for both locales; `String.fromCharCode(92)` obscures a plain `"\\u003c"`; city parsed with `split(",")[0]`. | Move to the data files / dictionaries; write the escape literally with a comment. |
| Q30 | app/sitemap.js:14-19; app/manifest.js:3-6; app/[lang]/opengraph-image.jsx:4,15-17; lib/seo.js:6 | SEO/consistency | Low | No `lastModified` in sitemap entries; manifest strings and `start_url: "/en"` hardcoded; OG image `alt` is English for both locales and `generateStaticParams` duplicates `LOCALES`; `OG_LOCALES.es` is `es_CR` while `languages.js` says `es-ES`. | Reuse `LOCALES` and `ROLE_HEADLINE`; add `lastModified`; pick one Spanish locale. |
| Q31 | components/organisms/Footer/page.jsx:18-32; next.config.js:37 | Debt | Low | `if (!dict)` branch is unreachable (dict is always passed) and duplicates the markup; the "Last updated" label shows the build time, so it changes on every deploy even with no content change. | Remove the branch; label it "Built on" or use a content date. |
| Q32 | lib/motion/constants.js:3,5,7,14-17; portfolio*.json:6; Hero/page.jsx:19 | Debt | Low | Unused: `MOTION.easeHero`, `duration.fast/slow`, `hero.*`; data field `darkMode`; `headerTaglineFour` is read but absent from the data. | Remove or populate. |
| Q33 | package.json:38,49,60 | Config | Low | `autoprefixer`, `postcss`, `tailwindcss` are runtime `dependencies` though they are build-only. | Move to `devDependencies`. |
| Q34 | app/[lang]/error.jsx:58 | UX | Low | `{error.message || dict.error.message}` shows raw exception text to visitors (Next masks it in production, so mainly dev noise). | Show only the dictionary message; log the error digest. |

## Details and evidence

### Q01 Mobile menu anchors do not match section ids (High)

`HamburgerMenu.jsx`:

```js
{ href: `/${currentLang}#about`, label: dict?.nav?.about || "About" },
{
  href: `/${currentLang}#projects`,
  label: dict?.nav?.projects || "Projects",
},
```

Ids rendered by the page (`HomeTemplate/page.jsx:33,52`) and desktop links (`Header/page.jsx:43,47`):

```jsx
<div id={dict?.sections?.about || "about"} />
<div id={dict?.sections?.work || "work"} ref={workRef} />
href={`/${currentLang}#${dict?.sections?.work || "work"}`}
```

`es.json` lines 10-13: `"work": "trabajo", "about": "sobre-mi"`. Result: `#projects` never matches; `#about` fails in ES. `isActive` has the same hardcoded assumption.

### Q02 Category depends on locale and on loose regex (High)

```js
const categoryKey = project.category ?? resolveCategoryKey(text);
...
if (/real estate|inmobili|erp|corporate center|village|plaza|avenida|savia|aleste|novus|portafolio/i.test(text)) return "realEstate";
```

Run against the data: `Biccas` is `product` (EN) and `webPlatform` (ES); `Dalio | Digital Agency` is `product` vs `webPlatform`; `Audiophile Ecommerce` is `ecommerce` vs `experiment` ("Audiophile Comercio Electrónico"). Only `Torre Universal`, `Fresh Market`, `Steam Women` carry an explicit category (31 of 34 missing). `erp` has no word boundary.

### Q03 Client-side dictionary fetch in navigation (High)

```js
React.useEffect(() => {
  import(`@/components/lib/dictionaries/${currentLang}.json`)
    .then((module) => setDict(module.default))
    ...
if (!dict) {
  return (<button aria-label="Open navigation menu" ... disabled>
```

`LanguageSelector.jsx` sets `dict` (line 41, 51, 53) and never reads it. `Header` already receives `dict` from the server page.

### Q04 No tests (High)

`package.json` scripts: `dev, build, start, audit:*, validate`. No test runner, no test files (outside `node_modules`). `validate` only builds.

### Q05 Uncancelled rAF in the motion engine (Medium)

```js
requestAnimationFrame(() => {
  cleanupReveals = setupScrollReveals();
  ScrollTrigger.refresh();
  isReadyRef.current = true;
  setIsReady(true);
});
...
return () => { ... cleanupReveals(); ... setIsReady(false); };
```

The cleanup runs `cleanupReveals()` while it is still the initial no-op; the pending frame later assigns the real cleanup that nobody calls. `usePrefersReducedMotion` initial state is `false` (`hooks/usePrefersReducedMotion.js:8`), so this happens for every reduced-motion visitor (CSS `[data-motion="reduced"]` hides the symptom with `opacity: 1 !important`).

### Q06 `scrollTo` is a no-op without Lenis (Medium)

```js
const lenis = lenisRef.current;
if (!lenis) {
  if (element instanceof Element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return;
}
```

`resolveScrollTarget(number)` returns the number, so nothing happens. Lenis is created only when `!isMobile` (line 130). The restore loop at lines 203-222 then runs 16 times and gives up.

### Q07 Reveals registered once (Medium, to verify)

Effect deps are `[reducedMotion]` (line 191). `ClientMotionBoundary` and `MotionProvider` live in `app/[lang]/layout.jsx`, so they persist across `/en` to `/en/resume`.

### Q08 Home template is client-only for dead handlers (Medium)

```jsx
"use client";
...
const { scrollTo } = useScrollTo();
const workRef = useRef(null);
...
<Header handleWorkScroll={() => scrollTo(workRef, { offset: -80 })} ... />
```

`const Header = ({ dict, data }) =>` ignores both handlers.

### Q09 Duplicated header (Medium)

```jsx
<header className="... laptop:hidden mt-5 gap-2"> ... <LanguageSelector /> <HamburgerMenu /> ...
<header className="mt-10 hidden ... laptop:flex"> ... <LanguageSelector />
...
<Button href="mailto:jjguevarag@gmail.com" trackEvent="contact_click">
```

### Q10 Locale and slug duplication (Medium)

```js
const locales = ["en", "es"];                                   // middleware.js:5
export const LOCALES = ["en", "es"];                            // lib/seo.js:3
const resumePath = lang === "es" ? "curriculum-vitae" : "resume"; // ExperienceSection:7
`/${currentLang}/${currentLang === "es" ? "curriculum-vitae" : "resume"}` // Header:53
if (segments[2] === "curriculum-vitae" && langCode === "en") ... // LanguageSelector:89
```

`pagePath(lang, "resume")` in `lib/seo.js:15` already encodes this.

### Q11 Redirect order (Medium, to verify)

```js
{ source: "/", destination: "/en", permanent: true },
{ source: "/resume", destination: "/en/resume", permanent: true },
```

versus `getLocale(request)` in middleware. Next documents the order headers, redirects, then middleware.

### Q12 Dictionary loader copies and blank 404 HTML (Medium)

```js
if (!dict) {
  return null; // No renderizar nada hasta que se cargue el diccionario
}
```

(`not-found.jsx:42-44`, `error.jsx:42-44`). `getDictionary` at `components/lib/dictionaries.js:6` has no callers.

### Q13 Dead shadcn components and missing packages (Medium)

Importers outside `components/ui`: `WorkCard` (badge), `LanguageSelector` (button, dropdown-menu). Example of an uninstalled import: `components/ui/accordion.jsx:4` `import * as AccordionPrimitive from "@radix-ui/react-accordion";`. `node_modules/@radix-ui` contains only `react-dropdown-menu` and `react-slot`.

### Q14 Unused dependencies (Medium)

```json
"gray-matter": "^4.0.3", "parse-numeric-range": "^1.3.0", "react-datepicker": "^4.8.0",
"react-textarea-autosize": "^8.3.4", "remark": "^14.0.2", "remark-html": "^15.0.1",
"styled-components": "^5.3.5", "@headlessui/react": "^1.6.6"
```

Zero matches for each in `app components hooks lib animations styles` and config files. `styled-components` coexisting with Tailwind is the obsolete pattern you suspected: it is not even imported.

### Q15 Dead modules (Medium)

```js
export const stagger = (target, fromVars, toVars) => {   // animations/index.jsx, no importer
export const SUPPORTED_LANGUAGES = [ ...                 // lib/constants/languages.js, no importer
export const getDictionaryClient = async (locale) => {   // dictionaries.js:10, no caller
```

### Q16 Editor tool is broken or dead (Medium)

```js
fetch("/api/portfolio", { method: "POST", ...
<Link href="/Edit">
<Header isBlog></Header>
let copyProjects = data.projects;  copyProjects[projectIndex] = { ...editProject };
```

### Q17 Duplicate resume pages and soft 404 (Medium)

```jsx
if (!data.showResume) {
  return <div>Resume not available</div>;
}
```

`sitemap.js` lists `resume` for every locale regardless of `showResume`.

### Q18 ResumeTemplate (Medium)

```jsx
{Array.isArray(data.resume.education) ? ( data.resume.education.map(...) ) : ( <div className="mt-2"> ... )}
{dict?.resume?.about || "About Me"}
```

Both data files already use arrays for `education`.

### Q19 HamburgerMenu (Medium)

```jsx
role="dialog" aria-modal="true" ...
<nav role="menu" aria-label="Mobile navigation"
...
window.scrollTo(0, scrollY);   // in the scroll-lock cleanup
```

Hardcoded English `aria-label`s ("Open navigation menu", "Mobile navigation") also bypass i18n.

### Q20 getProjectMeta and clientProjects (Medium)

```js
const CATEGORY_LABELS = { en: { webPlatform: "Web Platform", ... }, es: { ... } };   // lines 54-73
export const CARD_ACCENTS = [ { ring: "group-hover:shadow-[...]", ... } ];          // line 75
const CLIENT_PROJECT_TITLES = ["Avenida Escazu", "Escazu Village", ...];            // clientProjects.js:3
```

Titles are the same in both locales today (the comment says so), which is why it works.

### Q21 Projects section duplication (Medium)

Lines 70-87 and 98-115 differ only by the list and `index`. `WorkCard` has `"use client"` but no hooks.

### Q22 data.js (Medium)

```js
export function getPortfolioDataSync(locale) {
  if (locale === "es") { return import("@/data/portfolio-es.json").then((data) => data.default);
```

### Q23 Atomic design drift (Medium)

Observed structure: `atoms/{Button,CtaLink,Socials,SkillChip,LanguageSelector,HamburgerMenu}`, `molecules/{WorkCard,ServiceCard,ProjectResume,FeaturedProjectCard,SkillsSection,...}`, `organisms/*`, `templates/*`. `BaseTemplate` is `({ children }) => children` (no-op wrapper).

### Q24 nativeScrollTo (Medium)

```js
const initialMotion = { reducedMotion: false, isReady: false };
window.scrollTo({ top, behavior: "smooth" });
```

### Q25-Q34 (Low)

Q25 `${mounted && "hover:bg-slate-800"}` (ServiceCard:16). Q26 `` `${className} flex flex-wrap ...` `` (Socials:13). Q27 lines 19-20 are the same `<rect width="20" height="3" y="12" fill="#AA151B" />`. Q28 `sessionStorage.setItem(...)` unguarded (localeScroll:19). Q29 `String.fromCharCode(92) + "u003c"`. Q30 `start_url: "/en"`. Q31 `if (!dict) { return (<div ...>Let's talk business`. Q32 `easeHero: "power4.out"`. Q33 `"autoprefixer": "^10.7.0"` under `dependencies`. Q34 `{error.message || dict.error.message}`.

## What is already good (keep)

- Server-side i18n routing with `dynamicParams = false`, a single `buildPageMetadata`, hreflang alternates, and a sitemap derived from the same `PAGE_PATHS`; JSON-LD built from the same dictionary text the page shows.
- Motion engine is lazy-loaded on idle and the hero animation is CSS-only for LCP; `[data-reveal]` stays visible without JS.
- `analytics.trackEvent` is a safe wrapper; en/es dictionaries and data files have identical key sets (verified).

## Recommended test set

Runner: **Vitest** (ESM-native, no Babel config, supports the `@/` aliases via `resolve.alias` copied from jsconfig). Add `@testing-library/react` + `jsdom` only for the two component tests. Add **Playwright** for one smoke file. Install as devDependencies (not done here).

Smallest high-value set (about 8 files, mostly pure functions):

1. `lib/seo.test.js`: `pagePath/pageUrl/languageAlternates` (resume is `/en/resume` and `/es/curriculum-vitae`), `isLocale`, `buildPageMetadata` canonical and `x-default`, `serializeJsonLd` escapes `<`.
2. `lib/jsonLd.test.js`: graph contains WebSite/ProfilePage/Person, FAQPage only when `faq.length`, `sameAs` only from LinkedIn/GitHub.
3. `lib/utils/getProjectMeta.test.js` plus a data-driven test: for every project the category key is identical in `portfolio.json` and `portfolio-es.json` (would have caught Q02), tags non-empty, ids unique.
4. `lib/utils/clientProjects.test.js`: every `CLIENT_PROJECT_TITLES` entry exists in both data files; order is preserved.
5. `lib/utils/buildSkillsDisplay.test.js`, `parseTechnologies.test.js`: Shopify/Liquid normalization, SQL/MySQL, primary-stack exclusion.
6. `parity.test.js`: en/es dictionaries and en/es data have identical key trees (script already written during this review) and every `dict.*` key used in components exists.
7. `middleware.test.js`: export `getLocale`; cases: `es-CR,es;q=0.9`, `*`, malformed header, missing header; paths with a dot are skipped; `/foo` redirects to `/en/foo`.
8. `app/sitemap` / `robots` snapshot tests (also catches Q17 if `showResume` is respected).
9. Playwright smoke (`@smoke`): `/` redirects to `/en`; `/es/curriculum-vitae` renders; `/en/curriculum-vitae` redirects to `/en/resume`; mobile viewport: open menu, click each link, section is scrolled into view (guards Q01); unknown path returns 404 with visible text (guards Q12).

## Top 5 actions (effort vs benefit)

1. **Fix the mobile menu and remove client dictionary fetches** (Q01, Q03, Q09 partly). Effort: small (about 1-2 hours). Pass `dict`/`lang` from `Header`, build anchors from `dict.sections`, delete the `disabled` placeholder and the unused fetch in LanguageSelector. Benefit: fixes a user-visible navigation bug on mobile and removes two race conditions.
2. **Delete dead code and unused dependencies** (Q13, Q14, Q15, Q16, Q33). Effort: small, low risk (`pnpm remove` plus deleting about 25 files; re-run build). Benefit: smaller install and audit surface, removes the missing-radix landmine and the obsolete styled-components/react-datepicker/uuid/remark stack, and the confusing broken editor.
3. **Add Vitest with the pure-logic and parity tests** (Q04), starting with tests 1, 3, 4, 6 and 7 above. Effort: small-medium (half a day). Benefit: first safety net for i18n, SEO and project data; the parity and category tests lock in fixes 1 and 4.
4. **Make project category explicit and locale-independent** (Q02, Q20). Effort: small (add `category` to 31 entries x 2 files or compute from `id`; optionally add `isClient`). Benefit: consistent cards in both locales and no regex surprises; simplifies `getProjectMeta`.
5. **Harden the motion engine** (Q05, Q06, Q07, Q24). Effort: small-medium. Cancel the rAF on cleanup, read reduced-motion synchronously, make `scrollTo` work without Lenis (numbers and offset), re-register reveals on route change, honor reduced motion in `nativeScrollTo`. Benefit: removes real races and the mobile scroll-restore no-op in the part of the app that is hardest to debug.

Next in line: centralize locales and resume slugs (Q10, Q11), share the resume page and `loadDictionary` (Q12, Q17, Q22), and turn `HomeTemplate` into a server component (Q08).
