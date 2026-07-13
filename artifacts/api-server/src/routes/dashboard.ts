import { Router, type IRouter } from "express";
import { desc, sql } from "drizzle-orm";
import { db, propertiesTable } from "@workspace/db";
import {
  GetDashboardSummaryResponse,
  GetRecentPropertiesQueryParams,
  GetRecentPropertiesResponse,
  GetPropertyCountsByTypeResponse,
  GetPropertyCountsByZoneResponse,
} from "@workspace/api-zod";
import { serializeProperty } from "./properties";

const router: IRouter = Router();

router.get("/dashboard/summary", async (_req, res): Promise<void> => {
  const [row] = await db
    .select({
      totalProperties: sql<number>`count(*)::int`,
      availableForRent: sql<number>`count(*) filter (where ${propertiesTable.status} = 'disponivel')::int`,
      averageRent: sql<number>`coalesce(avg(${propertiesTable.price}), 0)::float`,
      capturedThisMonth: sql<number>`count(*) filter (where date_trunc('month', ${propertiesTable.createdAt}) = date_trunc('month', now()))::int`,
    })
    .from(propertiesTable);

  res.json(
    GetDashboardSummaryResponse.parse(
      row ?? {
        totalProperties: 0,
        availableForRent: 0,
        averageRent: 0,
        capturedThisMonth: 0,
      },
    ),
  );
});

router.get("/dashboard/recent-properties", async (req, res): Promise<void> => {
  const query = GetRecentPropertiesQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }

  const limit = query.data.limit ?? 5;

  const rows = await db
    .select()
    .from(propertiesTable)
    .orderBy(desc(propertiesTable.createdAt))
    .limit(limit);

  res.json(GetRecentPropertiesResponse.parse(rows.map(serializeProperty)));
});

router.get("/dashboard/by-type", async (_req, res): Promise<void> => {
  const rows = await db
    .select({
      propertyType: propertiesTable.propertyType,
      count: sql<number>`count(*)::int`,
    })
    .from(propertiesTable)
    .groupBy(propertiesTable.propertyType)
    .orderBy(desc(sql`count(*)`));

  res.json(GetPropertyCountsByTypeResponse.parse(rows));
});

router.get("/dashboard/by-zone", async (_req, res): Promise<void> => {
  const rows = await db
    .select({
      zona: propertiesTable.zona,
      count: sql<number>`count(*)::int`,
    })
    .from(propertiesTable)
    .groupBy(propertiesTable.zona)
    .orderBy(desc(sql`count(*)`));

  res.json(GetPropertyCountsByZoneResponse.parse(rows));
});

export default router;
