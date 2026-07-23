# HeyCRM

**HeyCRM** is an open-source CRM forked from [Twenty](https://github.com/twentyhq/twenty) ([twenty.com](https://twenty.com/)).

It keeps Twenty’s NestJS + React stack and AGPL-3.0 license, with HeyCRM product branding and an env-driven white-label feature.

> HeyCRM is **not** affiliated with or endorsed by Twenty.com, PBC. See [NOTICE](./NOTICE).

## License

- **AGPL-3.0** for the open-source product (same as most of Twenty).
- Files marked `/* @license Enterprise */` are **not** AGPL — see [docs/ENTERPRISE.md](./docs/ENTERPRISE.md).
- Full text: [LICENSE](./LICENSE). Attribution: [NOTICE](./NOTICE).

If you run a modified network service based on this code, AGPL-3.0 requires you to offer corresponding source to users.

## Upstream pin

Based on Twenty tag **`twenty/v2.22.0`**.

## Features (v0.1)

Everything Twenty community edition provides at this pin, plus:

| Feature | Description |
|---|---|
| HeyCRM rebrand | Login, page titles, HTML meta, docs |
| `PRODUCT_NAME` | Env override for the product display name (default `HeyCRM`) |
| `PRODUCT_LOGO_URL` | Optional logo URL for branding surfaces |
| Google Contacts import | Settings → Accounts → account menu → Import Google Contacts (People API; requires reconnect for contacts.readonly) |

## Quick start (Docker)

```bash
cd packages/twenty-docker
cp .env.example .env
# Generate secrets, set SERVER_URL
# Optional branding:
# PRODUCT_NAME=HeyCRM
# PRODUCT_LOGO_URL=https://example.com/logo.png
docker compose up -d
```

> **Note:** The default Compose file still pulls `twentycrm/twenty` images for a fast community boot.
> HeyCRM branding + `PRODUCT_*` env vars apply when you run/build from **this** source tree
> (`yarn` + `nx start`, or your own image built from this fork). See [CONTRIBUTING.md](./CONTRIBUTING.md).

See [Twenty self-host docs](https://docs.twenty.com/developers/self-host/self-host) for production hardening.

## Branding

Front helper: `packages/twenty-front/src/modules/heycrm/branding.ts`

Server config variables (also listed in `packages/twenty-docker/.env.example`):

```env
PRODUCT_NAME=HeyCRM
PRODUCT_LOGO_URL=
PRODUCT_FAVICON_URL=
```

Values are exposed to the SPA through the client-config API.

## Development

See [CONTRIBUTING.md](./CONTRIBUTING.md). Package folders remain named `twenty-*` on purpose so merges from upstream stay practical.

Local ports (avoid HeyBen `3000` / HeyOffice `3001` / HRMS `3010`):

| Service | URL |
|---|---|
| API (`twenty-server`) | http://localhost:3020 |
| UI (`twenty-front`) | http://localhost:3021 |

### SaaS / multi-workspace

Enabled by default in `packages/twenty-server/.env.example`:

```bash
IS_MULTIWORKSPACE_ENABLED=true
DEFAULT_SUBDOMAIN=app
IS_WORKSPACE_CREATION_LIMITED_TO_SERVER_ADMINS=false
```

- **Local:** open http://localhost:3021 (or `http://app.localhost:3021` after restart). Create a new workspace from sign-up.
- **Production:** set the same env on server + worker, point `SERVER_URL` / `FRONTEND_URL` at your domain, and add DNS `*.your-domain.com` → your host. Users sign up at `https://app.your-domain.com`.

## Release notes

[RELEASE_NOTES_v0.1.0.md](./RELEASE_NOTES_v0.1.0.md)
