import { eq } from "drizzle-orm";
import { db } from "../db/index"; 
import { campaignTable, InsertCampaign, SelectCampaign } from "../db/schema"; 

// create
export const createCampaign = async (
  campaign: InsertCampaign
): Promise<InsertCampaign> => {
  const [newCampaign] = await db
    .insert(campaignTable)
    .values(campaign)
    .returning();
  return newCampaign;
};

// get all
export const getAllCampaigns = async (): Promise<SelectCampaign[]> => {
  const campaigns = await db.select().from(campaignTable);
  return campaigns;
};

// get by id
export const getCampaignById = async (
  id: number
): Promise<SelectCampaign | null> => {
  const campaign = await db
    .select()
    .from(campaignTable)
    .where(eq(campaignTable.id, id))
    .limit(1);
  return campaign.length ? campaign[0] : null;
};

// update
export const updateCampaign = async (
  id: number,
  updatedData: Partial<InsertCampaign>
): Promise<SelectCampaign | null> => {
  const [updatedCampaign] = await db
    .update(campaignTable)
    .set(updatedData)
    .where(eq(campaignTable.id, id))
    .returning();
  return updatedCampaign || null;
};

//delete
export const deleteCampaign = async (id: number): Promise<boolean> => {
  const result = await db
    .delete(campaignTable)
    .where(eq(campaignTable.id, id))
    .returning();
  return result.length > 0;
};
