# Deployment

`design.jobhunter07.com` is the built Storybook, published to GitHub Pages by
`.github/workflows/deploy-storybook.yml` on every push to `main`.

## Required repository setting

Settings -> Pages -> Build and deployment -> **Source must be "GitHub Actions"**.

The workflow publishes with `actions/deploy-pages`, which only works when Pages
is in `build_type: workflow`. If Pages is left on the legacy "Deploy from a
branch" mode (`build_type: legacy`, branch `main` / `/`), GitHub runs its own
Jekyll build on every push. Both deployments then race for the same site, and
whichever finishes last wins. Because the Jekyll build renders the repository
`README.md` as the homepage, the site can appear to "deploy successfully" while
actually serving the README and returning 404 for every Storybook asset.

This cannot be fixed from CI: the Pages settings endpoint needs admin REST
access that `GITHUB_TOKEN` does not have, and the OAuth/PAT tokens available in
the agent sandbox are rejected with `Resource not accessible by integration`.
It is a one-time manual toggle.

`.github/workflows/verify-pages-config.yml` fails if the setting regresses.

## How to confirm a deploy actually worked

Do not trust a green workflow. Check that Storybook assets are served:

```bash
curl -s https://design.jobhunter07.com/index.json | jq '.entries | length'   # expect 25
curl -s -o /dev/null -w '%{http_code}\n' https://design.jobhunter07.com/iframe.html  # expect 200
```

If `/index.json` returns 404 or `/iframe.html` returns 503, the legacy Jekyll
build won the race. Fix the Pages source, then re-run the workflow:

```bash
gh workflow run deploy-storybook.yml --ref main
```

`deploy-pages` occasionally fails with `No artifacts named "github-pages" were
found` even though the upload step succeeded. That is transient; re-running the
workflow fixes it.

## Verifying a local build

```bash
npm ci
npm run build-storybook
npx http-server storybook-static -p 12000
```
