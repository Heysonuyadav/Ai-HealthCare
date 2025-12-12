import {
    createAsset,
    findAssets,
    findOneAsset,
    updateAsset,
    deleteAsset,
    addVulnerabilityToAsset,
  } from "../dao/aaset.dao.js";
  
  // 🟢 Create a new asset
  export async function createAssetController(req, res) {
    try {
      const asset = await createAsset(req.body);
      res.status(201).json({
        message: "Asset created successfully",
        data: asset,
      });
    } catch (error) {
      res.status(400).json({ message: "Failed to create asset", error: error.message });
    }
  }
  
  // 🟢 Get all assets
  export async function getAllAssetsController(req, res) {
    try {
      const assets = await findAssets();
      res.status(200).json(assets);
    } catch (error) {
      res.status(400).json({ message: "Failed to fetch assets", error: error.message });
    }
  }
  
  // 🟢 Get single asset by ID
  export async function getAssetByIdController(req, res) {
    try {
      const asset = await findOneAsset({ _id: req.params.id });
      if (!asset) {
        return res.status(404).json({ message: "Asset not found" });
      }
      res.status(200).json(asset);
    } catch (error) {
      res.status(400).json({ message: "Failed to fetch asset", error: error.message });
    }
  }
  
  // 🟢 Update asset by ID
  export async function updateAssetController(req, res) {
    try {
      const asset = await updateAsset(req.params.id, req.body);
      if (!asset) {
        return res.status(404).json({ message: "Asset not found" });
      }
      res.status(200).json({
        message: "Asset updated successfully",
        data: asset,
      });
    } catch (error) {
      res.status(400).json({ message: "Failed to update asset", error: error.message });
    }
  }
  
  // 🟢 Delete asset by ID
  export async function deleteAssetController(req, res) {
    try {
      const asset = await deleteAsset(req.params.id);
      if (!asset) {
        return res.status(404).json({ message: "Asset not found" });
      }
      res.status(200).json({ message: "Asset deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: "Failed to delete asset", error: error.message });
    }
  }
  
  // 🟢 Add vulnerability to asset
  export async function addVulnerabilityController(req, res) {
    try {
      const { assetId } = req.params;
      const asset = await addVulnerabilityToAsset(assetId, req.body);
      res.status(200).json({
        message: "Vulnerability added successfully",
        data: asset,
      });
    } catch (error) {
      res.status(400).json({ 
        message: "Failed to add vulnerability", error: error.message });
    }
  }
  