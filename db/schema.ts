import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const leads = sqliteTable(
  "leads",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    specialization: text("specialization").notNull(),
    experience: text("experience").notNull(),
    workFormats: text("work_formats").notNull(),
    otherFormat: text("other_format"),
    brands: text("brands").notNull(),
    socialUrl: text("social_url"),
    createdAt: integer("created_at").notNull(),
  },
  (table) => [index("leads_created_at_idx").on(table.createdAt)],
);
