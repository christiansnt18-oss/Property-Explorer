# CSL Captação

Real-estate lead-capture dashboard for a brokerage's acquisition team to track properties "captured" from owners, from first contact through negotiation to sale.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/csl-captacao run dev` — run the frontend
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)
- Frontend: React + Vite, Tailwind CSS, shadcn/radix components, wouter, react-query, react-hook-form, recharts

## Where things live

- `lib/api-spec/openapi.yaml` — source of truth for the API contract (properties + dashboard endpoints)
- `lib/db/src/schema/properties.ts` — Drizzle table, insert schema, and types for properties
- `artifacts/api-server/src/routes/properties.ts` — properties CRUD routes (includes `serializeProperty` helper)
- `artifacts/api-server/src/routes/dashboard.ts` — dashboard summary/recent/by-type/by-city aggregate routes
- `artifacts/csl-captacao/src/pages/dashboard.tsx` — dashboard overview page (`/`)
- `artifacts/csl-captacao/src/pages/properties.tsx` — full properties table with filters (`/properties`)
- `artifacts/csl-captacao/src/pages/property-form.tsx` — create/edit sheet modal
- `artifacts/csl-captacao/src/index.css` — theme tokens (red/black/white palette)

## Architecture decisions

- `price` and `areaM2` are stored as Postgres `numeric` columns, which the pg driver returns as strings. All routes that return a `Property` must pass rows through `serializeProperty()` (in `properties.ts`) to coerce them back to numbers before Zod-validating the response — otherwise responses fail schema validation with a 500.
- UI copy and formatting (dates excluded) is in Portuguese (pt-BR); prices are formatted as BRL via `formatBRL` in `src/lib/utils.ts`.
- Import `PropertyType`/`PropertyStatus` types from the `@workspace/api-client-react` package root, not from its internal `src/generated/...` path — the root re-exports them and the internal path isn't resolvable from consumers.

## Product

- Dashboard (`/`): portfolio-wide KPIs (total properties, captured this month, total VGV, average ticket), captures-by-city and by-type charts, and a recent captures list.
- Properties (`/properties`): full portfolio table filterable by city, neighborhood, property type, and max price; create/edit via a slide-out form; delete with confirmation.
- Property types: apartamento, casa, terreno, comercial, cobertura, rural. Status: captado, em_negociacao, disponivel, vendido.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- After changing `lib/api-spec/openapi.yaml`, always re-run `pnpm --filter @workspace/api-spec run codegen` before using new hooks/schemas in either the frontend or backend.
- After changing `lib/db/src/schema/*`, run `pnpm --filter @workspace/db run push` to apply it to the dev database.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
