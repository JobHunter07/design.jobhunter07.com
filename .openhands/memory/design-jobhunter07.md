# design.jobhunter07.com — detailed notes

A Next.js + Storybook design system. Storybook is the deployed artifact
(GitHub Pages, custom domain `design.jobhunter07.com`); the Next app is mostly
the create-next-app default.

## Verify everything with these four commands
- `npx tsc --noEmit` — typecheck
- `npx eslint` — lint
- `npx next build` — Next production build
- `npm run build-storybook` — the deployed artifact; also `npx vitest run`
  (Storybook's Vitest project, 22 tests) and `npx playwright test` (1 visual test).

`npm ci` is reproducible and is what CI runs.

## TypeScript is pinned to 6.0.x on purpose (2026-11-19)
- **Do not "upgrade" to TypeScript 7.** `typescript-eslint`, which
  `eslint-config-next` depends on, declares `typescript: ">=4.8.4 <6.1.0"` and
  **throws at config load** on TS 7 (`typescript-eslint does not support TS 7.0`),
  so `npm run lint` dies before linting a single file. TS 7 is the native-port
  rewrite; typescript-eslint support is tracked in their issue #10940.
- `tsc --noEmit` itself works fine on TS 7 — only ESLint breaks. That asymmetry
  makes the failure look like an ESLint bug; it is a peer-range constraint.
- `@types/node` stays on 24 to match the Node runtime. npm reports 26 as "latest"
  but those types describe APIs Node 24 does not have.

## Storybook 10 import paths
- `@storybook/preview-api` **no longer exists**. Preview hooks (`useGlobals`,
  `useArgs`, `useChannel`, …) come from **`storybook/preview-api`**.
- Storybook APIs are imported from `@storybook/nextjs-vite` in this repo, not
  `@storybook/react` (which is only a transitive dependency).

## Preview hooks must be called in the story render body
`useGlobals()` throws `Storybook preview hooks can only be called inside
decorators and story functions` if called from:
- a `parameters.docs.page` renderer, or
- a child component rendered by the story.

Both still render in the static build, so `build-storybook` passes and only the
**Vitest storybook project catches it**. Put the hook directly in
`render: function Render() { ... }` and pass the result down as a prop
(see `src/stories/ThemePalette.stories.tsx`).

## ESLint must ignore `storybook-static/`
`eslint-config-next`'s default ignores cover `.next/`, `out/`, `build/` but not
`storybook-static/`. Because that directory only exists after a Storybook build,
the breakage is intermittent: linting it produced 276 errors from bundled JS.
`eslint.config.mjs` now lists `storybook-static/**` in `globalIgnores`.

## Playwright visual baselines are per-platform
`playwright/jobhunter-home.spec.ts` screenshots the home story. Baselines are
keyed by platform (`-chromium-win32.png`, `-chromium-linux.png`). The repo only
had a **win32** baseline while CI is Ubuntu, so the test either failed with
"snapshot doesn't exist" or — with `--update-snapshots` — silently wrote a fresh
one and "passed". A `-chromium-linux.png` baseline now exists.
Windows and Linux renders differ in height (1169 vs 1194 px) because of font
metrics, so one baseline cannot serve both.

## Toolchain notes
- Node 24 (CI was pinned to 20; Vitest 5 needs >=22.12, ESLint 10 needs >=20.19).
- Vite 8 is Rolldown-based; Storybook prints a harmless
  `[MODULE_LEVEL_DIRECTIVE]` warning about `"use client"` in `next/dist/client/script.js`.
- `npm install` must regenerate `package-lock.json` when a major bumps
  (e.g. vitest 4 -> 5); a stale lockfile fails with ERESOLVE on peer ranges.
- `npm install` prints "install scripts blocked" for esbuild/sharp/unrs-resolver.
  Builds still work; esbuild's postinstall only matters if its binary is missing.
- The sandbox has no `chrome` channel for Playwright MCP; use the `playwright`
  npm package directly (`npx playwright install chromium`).
- Throwaway `.mjs` scripts importing project deps must live in the project dir;
  ESM will not resolve them from `/tmp`.

## GitHub Pages was serving a Jekyll README, not Storybook (2026-11-19)
- **Symptom**: the deploy workflow went green on every push, yet
  `https://design.jobhunter07.com/` rendered the repo `README.md` and
  `/iframe.html` returned **404**, `/index.json` **503**. Storybook had never
  been published, despite months of "successful" deploys.
- **Cause**: `GET /repos/{o}/{r}/pages` reported `build_type: legacy`,
  `source: {branch: main, path: /}`. Pages was in "Deploy from a branch" mode,
  so GitHub ran its **own Jekyll build** on each push, racing the repo's
  `actions/deploy-pages` artifact. Whichever finished last won; the Jekyll build
  renders `README.md` as the homepage and has no `iframe.html`.
- **Proven, not assumed**: re-running only the legacy `pages build and
  deployment` run reverted the site (iframe 404 -> 503, Jekyll marker returned);
  re-dispatching `deploy-storybook.yml` restored it. Two `github-pages`
  deployments are created per push, which is the tell.
- **Fix is manual and cannot be automated from CI**: Settings -> Pages -> Source
  = "GitHub Actions". `PUT/PATCH /pages` returns
  `Resource not accessible by integration` for `GITHUB_TOKEN` and
  `Resource not accessible by personal access token` for the sandbox PAT —
  both lack Pages admin scope. Reading `/pages` works, writing does not.
- **Guards added**: `verify-pages-config.yml` fails if `build_type != workflow`;
  a "Smoke-test the deployed site" step in the deploy job asserts
  `index.json` and `iframe.html` return 200 and reports the story count.
- **Verifying a deploy**: never trust the green check. `curl -s
  https://design.jobhunter07.com/index.json | jq '.entries|length'` must be 25.
- `deploy-pages` intermittently fails with `No artifacts named "github-pages"
  were found` even though `upload-artifact` succeeded; re-running fixes it.
- Tokens: `GITHUB_TOKEN` is a `ghu_` GitHub App user token (no OAuth scopes);
  `$Github_Super_Token` authenticates as the owner but still cannot write Pages.
- **CDN caches the 404s for ~2.5 min after a bad deploy.** After a legacy
  Jekyll build overwrites the site, GitHub's Fastly cache keeps serving
  `404` for `/index.json` and `/iframe.html` (and `200` for the Jekyll `/`)
  with `x-origin-cache: HIT` until the entry expires (observed ~150 s, `age`
  header climbs then resets). So a *correct* redeploy can look broken for
  minutes, and the deploy job's own smoke test may pass while the public URL
  still 404s. Poll `age` until it drops to ~0 before believing a probe.
  `?cb=<random>` does NOT bypass it — the cache key ignores the query string.

## Pages fix confirmed + how to read the story count (2026-11-19)
- **Owner flipped Settings -> Pages -> Source to "GitHub Actions"**; verified via
  API `build_type: workflow`, `https_cert: approved`, `https_enforced: true`,
  cname intact. `verify-pages-config.yml` now passes (was red by design).
- **Story count is not a constant — do not hard-code 25.** A local build at
  `4c533eb` had 25 entries; the live site reported 63. That was NOT stale or
  foreign content: commit `4a38d5d` ("Add One-and-Done Matching components")
  landed on `main` afterwards, adding `src/components/one-and-done/*` and
  `src/stories/one-and-done/*` (~2,690 lines). Rebuilding locally at `4a38d5d`
  gave exactly 63, matching live. **Always compare `curl index.json | jq
  '.entries|length'` against a fresh local `npm run build-storybook`, never
  against a remembered number.**
- Checks at `4a38d5d`: tsc clean, eslint clean, storybook build clean, vitest
  **28 files / 60 tests** passing (was 15/22 before the one-and-done commit),
  six stories render-verified in production with 0 console errors and 0 failed
  requests.
- `npx playwright install chromium` is needed again after a `npm ci`/version
  bump; the cached headless shell path changes with the Playwright version.

## Deploy failure on the preview port (2026-11-19)
- Deploy runs #19 (`751be61`, port commit) and #20 (`869cb46`, story cleanup)
  both FAILED at "Deploy to GitHub Pages" (actions/deploy-pages@v4):
  `No artifacts named "github-pages" were found` + `Fetching artifact metadata
  failed`, even though "Upload artifact" passed and the 5.4 MB artifact is
  listed. Build itself passed. Same known trap as above — re-running fixes it.
- Live site still served the `4a38d5d` build until a deploy succeeds.
- Re-triggered by a docs-only commit (this note) on 2026-11-19.
