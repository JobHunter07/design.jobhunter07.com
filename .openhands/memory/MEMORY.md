# design.jobhunter07.com — project memory

A Next.js + Storybook design system. Storybook is the deployed artifact
(GitHub Pages, custom domain `design.jobhunter07.com`); the Next app is mostly
the create-next-app default.

Detailed notes: **`design-jobhunter07.md`** (read it before changing build,
lint, Storybook or dependency config).

## Highest-value facts

- **Verify with four commands**: `npx tsc --noEmit`, `npx eslint`,
  `npx next build`, `npm run build-storybook`. Tests: `npx vitest run`
  (Storybook Vitest project, 22 tests) and `npx playwright test` (1 visual test).
  `npm ci` is reproducible and is what CI runs.
- **TypeScript is pinned to 6.0.x on purpose.** TS 7 makes `typescript-eslint`
  (a dependency of `eslint-config-next`) throw at config load, killing all
  linting. `tsc` itself works on TS 7, so the failure looks like an ESLint bug.
- **`@types/node` stays on 24** to match the Node runtime, though npm reports 26
  as latest.
- **Storybook 10 moved preview hooks** to `storybook/preview-api`;
  `@storybook/preview-api` no longer exists.
- **Preview hooks must be called in the story render body** — not in
  `docs.page`, not in a child component. Only the Vitest suite catches this;
  `build-storybook` passes either way.
- **ESLint must ignore `storybook-static/`**; the default ignores miss it, and
  linting build output produced 276 errors.
- **Playwright visual baselines are per-platform.** CI is Ubuntu, so a win32-only
  baseline silently "passes" by writing a new snapshot. Both baselines now exist.
- **CI runs Node 24** (Vitest 5 needs >=22.12).

## Unrelated content in this directory

`cloudtube-memory.md` is **not this project's memory**. It is a CloudTube
(github.com/Kbdavis007/CloudTube) knowledge dump that arrived with the sandbox
template. It is preserved as-is for reference; do not apply it to this repo.
