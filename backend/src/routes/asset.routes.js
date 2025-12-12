import express from "express";
import {
  createAssetController,
  getAllAssetsController,
  getAssetByIdController,
  updateAssetController,
  deleteAssetController,
  addVulnerabilityController,
} from "../controller/asset.controller.js";

const router = express.Router();

router.post("/", 
    createAssetController);
router.get("/", 
    getAllAssetsController);
router.get("/:id", 
    getAssetByIdController);
router.put("/:id", 
    updateAssetController);
router.delete("/:id", 
    deleteAssetController);
router.post("/:assetId/vulnerability", 
    addVulnerabilityController);

export default router;
