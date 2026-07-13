---
name: api-client-react generated type imports
description: import generated enum/type helpers from the package root, not internal src/generated paths.
---

`@workspace/api-client-react`'s `index.ts` re-exports everything from `./generated/api` and `./generated/api.schemas` (types like `PropertyType`, `PropertyStatus`, generated hooks, query-key helpers).

**Why:** Importing from the deep path (`@workspace/api-client-react/src/generated/api.schemas`) is not resolvable by consumers — it isn't part of the package's public exports/module resolution, so `tsc` fails with "Cannot find module". This has shown up when frontend code (including design-subagent-generated code) reaches for enum types directly.

**How to apply:** Always import generated types and hooks from the package root: `import { type PropertyType, type PropertyStatus, useListProperties, ... } from "@workspace/api-client-react"`.
