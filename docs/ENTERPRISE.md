# Enterprise-licensed code (not AGPL)

HeyCRM is an AGPL-3.0 fork of [Twenty](https://github.com/twentyhq/twenty).
Upstream uses a **dual license**:

| Marking | License | Production use |
|---|---|---|
| Default (no special header) | AGPL-3.0 | Allowed if you comply with AGPL-3.0 |
| `/* @license Enterprise */` | Twenty Commercial License | **Not allowed** without a paid Twenty Enterprise subscription |

## What HeyCRM does

- Ships the upstream tree so contributors can sync with Twenty.
- Documents that Enterprise-marked modules are **out of scope** for the free AGPL product.
- Defaults self-host docs to community/AGPL features only (`IS_BILLING_ENABLED=false`, no Enterprise entitlements).

## What you must not do

- Do **not** enable or market Enterprise-only features as part of “open source HeyCRM.”
- Do **not** remove `/* @license Enterprise */` headers or relabel those files as AGPL.
- Do **not** imply endorsement by Twenty.com, PBC.

## How to stay compliant

1. Keep the root `LICENSE` and `NOTICE` files intact.
2. Self-host with the Docker Compose setup in `packages/twenty-docker` using AGPL defaults.
3. If you need Enterprise capabilities, obtain a license from Twenty and follow their commercial terms — that path is outside HeyCRM’s AGPL distribution.

See also: [Twenty LICENSE](https://github.com/twentyhq/twenty/blob/main/LICENSE).
