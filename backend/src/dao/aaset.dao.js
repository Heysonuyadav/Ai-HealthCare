import assetModel from "../models/Asset.model.js";

// 🟢 Create new asset
export async function createAsset(data) {
  const asset = await assetModel.create(data);
  return asset;
}

// 🟢 Find single asset (by any query)
export async function findOneAsset(query) {
  const asset = await assetModel.findOne(query);
  return asset;
}

// 🟢 Find multiple assets
export async function findAssets(query = {}) {
  const assets = await assetModel.find(query).sort({ createdAt: -1 });
  return assets;
}

// 🟢 Update asset by ID
export async function updateAsset(id, updateData) {
  const asset = await assetModel.findByIdAndUpdate(id, updateData, { new: true });
  return asset;
}

// 🟢 Delete asset by ID
export async function deleteAsset(id) {
  const asset = await assetModel.findByIdAndDelete(id);
  return asset;
}

// 🟢 Add vulnerability to a specific asset
export async function addVulnerabilityToAsset(assetId, vulnData) {
  const asset = await assetModel.findById(assetId);
  if (!asset) throw new Error("Asset not found");
  asset.vulnerabilities.push(vulnData);
  await asset.save();
  return asset;
}
