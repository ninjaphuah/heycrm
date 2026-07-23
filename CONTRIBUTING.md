# Contributing to HeyCRM

Thanks for helping improve HeyCRM — an AGPL-3.0 fork of Twenty with HeyCRM branding.

## Prerequisites

- Node.js / Yarn as required by upstream Twenty (see their local setup docs)
- Docker (recommended for Postgres + Redis)
- Git

## Local development (upstream workflow)

HeyCRM keeps Twenty’s Nx monorepo layout (`twenty-front`, `twenty-server`, etc.) to stay mergeable with upstream.

```bash
# Install (from repo root)
yarn

# Copy env (ports 3020 API / 3021 UI — avoids HeyBen 3000 / HeyOffice 3001)
cp packages/twenty-server/.env.example packages/twenty-server/.env
cp packages/twenty-front/.env.example packages/twenty-front/.env
# set APP_SECRET in twenty-server/.env

# Typical package targets
yarn start
# Browser: http://localhost:3021  (API: http://localhost:3020)

# SaaS multi-workspace is on in .env.example (IS_MULTIWORKSPACE_ENABLED=true).
# Restart the server after changing that flag (env-only).
```

For a full stack via containers, see `packages/twenty-docker` and [Twenty self-host docs](https://docs.twenty.com/developers/self-host/self-host).

## Branding changes

User-facing product name/logo should go through the HeyCRM branding helpers:

- Front: `packages/twenty-front/src/modules/heycrm/branding.ts`
- Server env: `PRODUCT_NAME`, `PRODUCT_LOGO_URL` (see `packages/twenty-docker/.env.example`)

Avoid scattering hard-coded `"Twenty"` strings for product UI.

## Upstream sync

```bash
git remote add upstream https://github.com/twentyhq/twenty.git   # once
git fetch upstream --tags
git merge twenty/vX.Y.Z   # or rebase onto a release tag
```

Resolve conflicts carefully around HeyCRM branding files and `NOTICE` / `README.md`.

## License

By contributing, you agree your changes are licensed under **AGPL-3.0**.
Do not contribute code copied from Enterprise-marked Twenty files under a different license claim.
