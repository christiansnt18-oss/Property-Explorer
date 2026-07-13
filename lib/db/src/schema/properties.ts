import {
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const propertyTypeValues = [
  "apartamento",
  "casa",
  "terreno",
  "comercial",
  "cobertura",
  "rural",
] as const;

export const propertyStatusValues = [
  "captado",
  "em_negociacao",
  "disponivel",
  "alugado",
] as const;

export const zonaValues = ["centro_menino_deus", "moinhos_floresta"] as const;

// Fixed allow-list of neighborhoods (bairros) this system may capture in,
// grouped by Zona. Porto Alegre - RS rental captures only.
export const bairrosByZona: Record<(typeof zonaValues)[number], string[]> = {
  centro_menino_deus: [
    "centro",
    "cidade_baixa",
    "farroupilha",
    "bom_fim",
    "independencia",
    "santana",
    "praia_de_belas",
    "menino_deus",
    "azenha",
    "santa_tereza",
    "medianeira",
    "santo_antonio",
  ],
  moinhos_floresta: [
    "floresta",
    "sao_geraldo",
    "higienopolis",
    "sao_joao",
    "santa_maria_goretti",
    "jardim_floresta",
    "jardim_sao_pedro",
    "humaita",
    "navegantes",
    "anchieta",
    "farrapos",
    "moinhos_de_vento",
    "auxiliadora",
    "montserrat",
    "rio_branco",
    "bela_vista",
    "santa_cecilia",
  ],
};

export const bairroValues = Object.values(bairrosByZona).flat() as [
  string,
  ...string[],
];

export const propertiesTable = pgTable("properties", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  zona: text("zona").notNull(),
  neighborhood: text("neighborhood").notNull(),
  address: text("address").notNull(),
  price: numeric("price", { precision: 12, scale: 2 }).notNull(),
  propertyType: text("property_type").notNull(),
  status: text("status").notNull().default("captado"),
  bedrooms: integer("bedrooms").notNull().default(0),
  bathrooms: integer("bathrooms").notNull().default(0),
  areaM2: numeric("area_m2", { precision: 10, scale: 2 }).notNull(),
  ownerName: text("owner_name").notNull(),
  ownerPhone: text("owner_phone").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const propertyBaseSchema = createInsertSchema(propertiesTable, {
  price: z.coerce.number().nonnegative(),
  areaM2: z.coerce.number().nonnegative(),
  propertyType: z.enum(propertyTypeValues),
  status: z.enum(propertyStatusValues),
  zona: z.enum(zonaValues),
  neighborhood: z.enum(bairroValues),
})
  .omit({ id: true, createdAt: true })
  .extend({
    title: z.string().min(1),
    address: z.string().min(1),
    ownerName: z.string().min(1),
    ownerPhone: z.string().min(1),
    notes: z.string().optional(),
  });

export function assertBairroInZona(data: { zona: string; neighborhood: string }) {
  return bairrosByZona[data.zona as (typeof zonaValues)[number]]?.includes(
    data.neighborhood,
  );
}

export const insertPropertySchema = propertyBaseSchema.refine(
  assertBairroInZona,
  {
    message: "O bairro selecionado não pertence à zona escolhida",
    path: ["neighborhood"],
  },
);

export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Property = typeof propertiesTable.$inferSelect;
