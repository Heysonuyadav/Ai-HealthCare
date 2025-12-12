// models/asset.model.js
import mongoose from "mongoose";

// Define the schema for an asset
const assetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["Server", "Application", "Database", "Network Device", "Other"],
      default: "Application",
    },
    ipAddress: {
      type: String,
      trim: true,
    },
    owner: {
      type: String,
      trim: true,
    },
    department: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Under Maintenance"],
      default: "Active",
    },
    lastScanDate: {
      type: Date,
    },
    vulnerabilities: [
      {
        cveId: { type: String },
        severity: { type: String },
        description: { type: String },
        publishedDate: { type: Date },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

const assetModel = mongoose.model("Asset", assetSchema);

export default assetModel;
