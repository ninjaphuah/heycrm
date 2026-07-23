# HeyCRM v0.1.0

First public HeyCRM release — AGPL-3.0 fork of Twenty `twenty/v2.22.0`.

## What’s included

- Pinned upstream: **Twenty v2.22.0**
- Product rebrand: **HeyCRM** (titles, login welcome, meta tags, docs)
- **Env-driven branding** feature:
  - `PRODUCT_NAME` (default `HeyCRM`)
  - `PRODUCT_LOGO_URL` (optional)
  - Exposed to the front via client-config REST payload
- Open-source compliance docs: `LICENSE`, `NOTICE`, `docs/ENTERPRISE.md`, `CONTRIBUTING.md`

## Not included / not claimed as AGPL

- Files marked `/* @license Enterprise */` remain under Twenty’s commercial license.
- No Twenty trademark endorsement.
- Internal Nx package names still use `twenty-*` for easier upstream merges.

## Self-host quickstart

```bash
cd packages/twenty-docker
cp .env.example .env
# set APP_SECRET / ENCRYPTION_KEY, SERVER_URL, PRODUCT_NAME=HeyCRM
docker compose up -d
```

Open the URL in `SERVER_URL`. Confirm the sign-in page shows **HeyCRM**.

## Upgrade / sync

Merge future Twenty release tags; re-apply branding conflicts in
`packages/twenty-front/src/modules/heycrm/` and root docs.
