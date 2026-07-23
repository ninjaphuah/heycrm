# Publishing HeyCRM as open source

## Checklist before making the GitHub repo public

1. Confirm `LICENSE` (AGPL-3.0 + Enterprise exclusion) and `NOTICE` are present.
2. Read [docs/ENTERPRISE.md](../docs/ENTERPRISE.md) — do not market Enterprise-marked files as AGPL.
3. Push branch `heycrm-v0.1.0` (or `main`) and tag `v0.1.0-heycrm`.
4. Repo description example: `HeyCRM — AGPL-3.0 CRM fork of Twenty with env-driven branding`.
5. Topics: `crm`, `agpl`, `typescript`, `nestjs`, `react`, `opensource`.

## Suggested remote setup

```bash
git remote rename origin upstream-twenty   # if still pointing at twentyhq
git remote add origin git@github.com:<your-org>/heycrm.git
git push -u origin heycrm-v0.1.0
git tag -a v0.1.0-heycrm -m "HeyCRM v0.1.0"
git push origin v0.1.0-heycrm
```

Keep `upstream` for syncing:

```bash
git remote add upstream https://github.com/twentyhq/twenty.git
```
