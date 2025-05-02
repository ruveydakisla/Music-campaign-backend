import { date, integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const campaignTable = pgTable("campaigns", {
  id: serial("id").primaryKey(),
  campaignTitle: text("campaignTitle").notNull(),
  brandName: text("brandName").notNull(),
  startDate: date("startDate"),
  endDate: date("endDate"),
  budget: integer("budget"),
  imageUrl: text("imageUrl"),
  campaignDescription: text("campaignDescription"),
});

export type InsertCampaign = typeof campaignTable.$inferInsert;
export type SelectCampaign = typeof campaignTable.$inferSelect;
