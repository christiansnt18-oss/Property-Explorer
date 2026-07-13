---
name: Drizzle numeric columns return strings
description: pg driver serializes numeric/decimal columns as strings; API responses validated with Zod number schemas will fail unless coerced.
---

When a Drizzle table uses a Postgres `numeric` column (e.g. `price`, `areaM2`), rows read back via `db.select()`/`.returning()` have that field as a `string`, not a `number` — this is standard `pg` driver behavior for numeric/decimal types (avoids float precision loss).

**Why:** If the OpenAPI-generated Zod response schema types that field as `number`, calling `.parse()` on the raw row throws a `ZodError` (`invalid_type: expected number, received string`), which surfaces as a 500 on every route that returns the row (list, get, create, update, and any aggregate/derived endpoint that reuses the same row shape).

**How to apply:** Any handler that returns a DB row containing a numeric column must explicitly coerce it (e.g. `Number(row.price)`) before passing it to the response Zod schema's `.parse()`. Centralize this in one serializer function and reuse it across all routes that return that row shape (list/get/create/update and any dashboard/aggregate endpoint returning the same entity) — don't duplicate the coercion inline in every handler.
