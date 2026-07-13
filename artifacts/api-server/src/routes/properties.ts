import { Router, type IRouter } from "express";
import { and, desc, eq, lte } from "drizzle-orm";
import {
  db,
  propertiesTable,
  insertPropertySchema,
  propertyBaseSchema,
  assertBairroInZona,
  type Property,
} from "@workspace/db";
import {
  ListPropertiesQueryParams,
  ListPropertiesResponse,
  CreatePropertyBody,
  CreatePropertyResponse,
  GetPropertyParams,
  GetPropertyResponse,
  UpdatePropertyParams,
  UpdatePropertyBody,
  UpdatePropertyResponse,
  DeletePropertyParams,
} from "@workspace/api-zod";

export function serializeProperty(row: Property) {
  return {
    ...row,
    price: Number(row.price),
    areaM2: Number(row.areaM2),
  };
}

const router: IRouter = Router();

router.get("/properties", async (req, res): Promise<void> => {
  const query = ListPropertiesQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }

  const { zona, neighborhood, maxPrice, propertyType } = query.data;
  const conditions = [];
  if (zona) conditions.push(eq(propertiesTable.zona, zona));
  if (neighborhood)
    conditions.push(eq(propertiesTable.neighborhood, neighborhood));
  if (maxPrice !== undefined)
    conditions.push(lte(propertiesTable.price, maxPrice.toString()));
  if (propertyType)
    conditions.push(eq(propertiesTable.propertyType, propertyType));

  const rows = await db
    .select()
    .from(propertiesTable)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(desc(propertiesTable.createdAt));

  res.json(ListPropertiesResponse.parse(rows.map(serializeProperty)));
});

router.post("/properties", async (req, res): Promise<void> => {
  const parsedBody = CreatePropertyBody.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(400).json({ error: parsedBody.error.message });
    return;
  }

  const parsedValues = insertPropertySchema.safeParse(parsedBody.data);
  if (!parsedValues.success) {
    res.status(400).json({ error: parsedValues.error.message });
    return;
  }
  const values = parsedValues.data;

  const [property] = await db
    .insert(propertiesTable)
    .values({
      ...values,
      price: values.price.toString(),
      areaM2: values.areaM2.toString(),
    })
    .returning();

  res.status(201).json(CreatePropertyResponse.parse(serializeProperty(property)));
});

router.get("/properties/:id", async (req, res): Promise<void> => {
  const params = GetPropertyParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [property] = await db
    .select()
    .from(propertiesTable)
    .where(eq(propertiesTable.id, params.data.id));

  if (!property) {
    res.status(404).json({ error: "Property not found" });
    return;
  }

  res.json(GetPropertyResponse.parse(serializeProperty(property)));
});

router.patch("/properties/:id", async (req, res): Promise<void> => {
  const params = UpdatePropertyParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsedBody = UpdatePropertyBody.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(400).json({ error: parsedBody.error.message });
    return;
  }

  const updateValues = propertyBaseSchema.partial().parse(parsedBody.data);

  if (updateValues.zona !== undefined || updateValues.neighborhood !== undefined) {
    const [existing] = await db
      .select()
      .from(propertiesTable)
      .where(eq(propertiesTable.id, params.data.id));
    if (!existing) {
      res.status(404).json({ error: "Property not found" });
      return;
    }
    const merged = {
      zona: updateValues.zona ?? existing.zona,
      neighborhood: updateValues.neighborhood ?? existing.neighborhood,
    };
    if (!assertBairroInZona(merged)) {
      res.status(400).json({
        error: "O bairro selecionado não pertence à zona escolhida",
      });
      return;
    }
  }

  const { price, areaM2, ...rest } = updateValues;

  const setValues: Record<string, unknown> = { ...rest };
  if (price !== undefined) setValues.price = price.toString();
  if (areaM2 !== undefined) setValues.areaM2 = areaM2.toString();

  const [property] = await db
    .update(propertiesTable)
    .set(setValues)
    .where(eq(propertiesTable.id, params.data.id))
    .returning();

  if (!property) {
    res.status(404).json({ error: "Property not found" });
    return;
  }

  res.json(UpdatePropertyResponse.parse(serializeProperty(property)));
});

router.delete("/properties/:id", async (req, res): Promise<void> => {
  const params = DeletePropertyParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [property] = await db
    .delete(propertiesTable)
    .where(eq(propertiesTable.id, params.data.id))
    .returning();

  if (!property) {
    res.status(404).json({ error: "Property not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;
