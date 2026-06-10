# Skills Section — Saturation Audit Checklist

Use during Phase 1. Mark each item **Yes / No / Partial** and cite evidence (file:line or screenshot description).

## Content density

| #   | Check                     | Saturated when…                                          |
| --- | ------------------------- | -------------------------------------------------------- |
| 1   | Total visible skill count | > 35 items across all categories                         |
| 2   | Items per category        | Any category > 8 without grouping                        |
| 3   | Category count            | > 5 categories with equal prominence                     |
| 4   | Redundancy                | Same tech in multiple categories (e.g. Liquid + Shopify) |
| 5   | Low-signal items          | Legacy/rare tech competing with core stack               |
| 6   | Certifications bleed      | Cert names duplicated in skills arrays                   |

## Visual hierarchy

| #   | Check                    | Saturated when…                                |
| --- | ------------------------ | ---------------------------------------------- |
| 7   | Primary stack visibility | React/Next/TS not visually dominant            |
| 8   | Category differentiation | All `h2 text-lg` + identical list style        |
| 9   | List pattern             | `list-disc` + `py-2` on every item             |
| 10  | Vertical rhythm          | Categories feel stacked without breathing room |
| 11  | Scan path                | Eye must scroll before seeing backend/CMS      |
| 12  | Contrast hierarchy       | Category title ≈ skill item in weight/size     |

## Layout & responsive

| #   | Check               | Saturated when…                            |
| --- | ------------------- | ------------------------------------------ |
| 13  | Mobile column       | Long single-column bullet scroll           |
| 14  | Grid balance        | One column heavy, other sparse             |
| 15  | Horizontal overflow | Chips/labels clip on narrow viewports      |
| 16  | Alignment           | Inconsistent left margins (`ml-5` bullets) |

## Recruiter outcomes (qualitative)

Answer in one sentence each:

1. **3-second test:** What stack is this person? (If unclear → hierarchy failure)
2. **Role fit:** Frontend vs Full Stack obvious?
3. **Fatigue:** Would a recruiter skim or skip this section?

## Recommended chip patterns

### Primary stack (hero row)

```tsx
<div
  className="flex flex-wrap gap-2"
  role="list"
  aria-label="Primary technologies"
>
  {primarySkills.map((skill) => (
    <span
      key={skill}
      role="listitem"
      className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-sm font-medium"
    >
      {skill}
    </span>
  ))}
</div>
```

### Category group (secondary)

```tsx
<div className="space-y-2">
  <h3 className="text-sm font-semibold uppercase tracking-wide opacity-80">
    {title}
  </h3>
  <div className="flex flex-wrap gap-1.5" role="list">
    {items.map((item) => (
      <span
        key={item}
        role="listitem"
        className="rounded-md bg-muted/50 px-2.5 py-1 text-xs"
      >
        {item}
      </span>
    ))}
  </div>
</div>
```

### Overflow (avoid on CV)

Do **not** use `+N more` labels on a resume. Prefer compact chips at `text-xs` with `gap-1.5` flex-wrap, or content curation in JSON. If a category exceeds ~10 items, merge related entries in `buildSkillsDisplay` instead of hiding them.

## Category merge map (this project)

| Current key (`portfolio.json`) | Suggested group                         |
| ------------------------------ | --------------------------------------- |
| `languages`                    | Core Frontend (+ promote top 4 to hero) |
| `frameworks` + `databases`     | Backend & Data                          |
| `cmsEcommerce`                 | CMS & Commerce                          |
| `toolsPlatforms` + `aiTools`   | Tooling & Workflow                      |
| `others`                       | Fold into nearest group or collapse     |

## Done criteria summary

- ≤ 5 category groups visible
- ≤ 8 chips per group (or collapsed)
- Primary stack row above the grid
- No bullet lists for skills
- Mobile: no excessive scroll length vs Experience section
