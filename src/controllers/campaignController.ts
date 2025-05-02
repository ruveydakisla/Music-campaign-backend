import express, { Request, Response } from "express";
import { InsertCampaign, SelectCampaign } from "../db/schema";
import { errorResponse, successResponse } from "../helpers/responseFormatter";
import {
  createCampaign,
  deleteCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
} from "../services/campaignService";

const campaignController = express.Router();
//POST -> create
campaignController.post("", async (req: Request, res: Response) => {
  try {
    const newCampaign = await createCampaign(req.body);
    res.status(201).json(successResponse<InsertCampaign>(newCampaign));
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json(
        errorResponse(`An error occurred while creating the campaign:${error}`)
      );
  }
});
//GET -> get all
campaignController.get("", async (req: Request, res: Response) => {
  try {
    const campaigns = await getAllCampaigns();
    res.status(200).json(successResponse<SelectCampaign[]>(campaigns));
  } catch (error) {
    res
      .status(500)
      .json(
        errorResponse(`An error occurred while retrieving campaigns:${error}`)
      );
  }
});
//GET -> get by id
campaignController.get(
  "/:id",
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const campaign = await getCampaignById(Number(id));
      if (campaign) {
        res.status(200).json(successResponse<SelectCampaign>(campaign));
      } else {
        res.status(404).json(errorResponse(`Campaign not found.`));
      }
    } catch (error) {
      res
        .status(500)
        .json(
          errorResponse(
            `An error occurred while fetching the campaign:${error}`
          )
        );
    }
  }
);
//PUT ->update by id
campaignController.put(
  "/:id",
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const updatedCampaign = await updateCampaign(Number(id), req.body);
      if (updatedCampaign) {
        res.status(200).json(successResponse<SelectCampaign>(updatedCampaign));
      } else {
        res.status(404).json(errorResponse("Campaign not found."));
      }
    } catch (error) {
      res
        .status(500)
        .json(
          errorResponse(
            `An error occurred while updating the campaign:${error}`
          )
        );
    }
  }
);
//DELETE ->delete by id
campaignController.delete(
  "/:id",
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const isDeleted = await deleteCampaign(Number(id));
      if (isDeleted) {
        res
          .status(200)
          .json(successResponse({ message: "Campaign deleted successfuly" }));
      } else {
        res.status(404).json(errorResponse("Campaign not found."));
      }
    } catch (error) {
      res
        .status(500)
        .json(
          errorResponse(
            `An error occurred while deleting the campaign:${error}`
          )
        );
    }
  }
);

export default campaignController;
