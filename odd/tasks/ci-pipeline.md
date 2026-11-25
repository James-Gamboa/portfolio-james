# Feature: ci-pipeline

## Objective
Apply the CI/CD best practices from `cicd-buenas-practicas.md` to this portfolio, adapted
to GitHub Actions + Vercel, using only tools the project already uses.

## Context
- Next.js 15.5 (JS), pnpm 10.28.2 (`packageManager`), Node pinned by Volta 22.23.5 / engines >=22.6.
- Scripts already present: `test` (vitest), `audit:prod`, `audit:node`, `audit:lockfile`,
  `audit:secrets` (gitleaks), `audit:sast` (semgrep), `validate`, `build`.
- No `.github/` at all. Vercel deploys via its Git integration (previews per PR) — CI must not deploy.

## Decisions
- Omit (not used / not applicable): Bitbucket, Docker/images/cosign/SBOM, Heroku, AWS/Azure/CDN,
  `output: standalone`, multi-instance, IaC/GitOps/DB, canary/blue-green (Vercel atomic deploys),
  monorepo, E2E/DAST/load, coverage gates, ESLint/Prettier/TypeScript, CodeQL (semgrep already used).

## Scope (authorized)
- `.github/workflows/ci.yml`: PR + push to main; `permissions: contents: read`; concurrency
  cancel-in-progress; `timeout-minutes` per job; actions pinned by full commit SHA (with version comment);
  pnpm/action-setup + setup-node `node-version-file: package.json` + `cache: pnpm`; `pnpm install --frozen-lockfile`.
  Parallel jobs: test, build (with `.next/cache` cache), audit (prod audit + lockfile), secrets (gitleaks,
  full history), sast (existing semgrep config), forbidden-files gate (public/ and build output must not
  contain `.env*`, `CLAUDE.md`, `.git`, `*.pem`, source maps).
- `.github/workflows/post-deploy-smoke.yml`: on Vercel `deployment_status` success; URL via env;
  sensitive paths (`/.env`, `/.git/config`, `/CLAUDE.md`, `/package.json`) must return 404, home 200.
- `.github/dependabot.yml`: npm + github-actions, weekly, cooldown, grouped minor/patch.
- `.github/CODEOWNERS`, `.github/pull_request_template.md`.
- `pnpm-workspace.yaml` `minimumReleaseAge` (supply-chain delay) if compatible with pnpm 10.28.
- `.env.example` (only if env vars are actually read), `.gitignore` hardening for local agent files.
- README section: pipeline overview + GitHub UI settings checklist (branch protection, required checks,
  secret scanning + push protection, read-only GITHUB_TOKEN).

## Tasks
- [ ] C1 CI workflow (test, build, audit, secrets, sast, forbidden-files)
- [ ] C2 Post-deploy smoke workflow
- [ ] C3 Dependabot, CODEOWNERS, PR template
- [ ] C4 pnpm minimumReleaseAge, .env.example, .gitignore
- [ ] C5 README pipeline docs + UI settings checklist
- [ ] C6 Checks: actionlint (if available) or YAML parse, `pnpm test`, `pnpm build`, local run of each CI command

## Checks
TDD: no TDD mode configured for this repo; ordinary functional checks.
Runner: `pnpm test` (vitest). Plus `pnpm build`, and each CI command run locally.

## Progress
- Created 2026-11-25 on branch `ci/pipeline` from `origin/main`.
