import axios from "axios";
import assetModel from "../models/Asset.model.js";

// ✅ NVD API endpoint
const NVD_API_URL = "https://services.nvd.nist.gov/rest/json/cves/2.0";

// 🧩 Function to fetch latest CVEs from NVD
export async function fetchLatestCVEs(limit = 5) {
  try {
    console.log("🔄 Fetching latest CVEs from NVD...");
    const response = await axios.get(`${NVD_API_URL}?resultsPerPage=${limit}`);
    const data = response.data.vulnerabilities || [];

    console.log(`✅ Got ${data.length} vulnerabilities from NVD.`);
    return data;
  } catch (error) {
    console.error("❌ Error fetching NVD data:", error.message);
    return [];
  }
}

// 🧩 Function to save vulnerabilities in the first asset (for demo)
export async function saveVulnerabilitiesToAsset() {
  try {
    const assets = await assetModel.find();
    if (assets.length === 0) {
      console.log("⚠️ No assets found in database.");
      return;
    }

    const vulnerabilities = await fetchLatestCVEs(5);
    const asset = assets[0]; // Just take the first asset (for simplicity)

    vulnerabilities.forEach((v) => {
      const vulnInfo = {
        cveId: v.cve.id,
        severity:
          v.cve.metrics?.cvssMetricV31?.[0]?.cvssData?.baseSeverity || "Unknown",
        description: v.cve.descriptions[0]?.value || "No description",
        publishedDate: v.cve.published,
      };

      // Avoid duplicates
      const alreadyExists = asset.vulnerabilities.some(
        (item) => item.cveId === vulnInfo.cveId
      );

      if (!alreadyExists) {
        asset.vulnerabilities.push(vulnInfo);
      }
    });

    await asset.save();
    console.log(`✅ Added ${vulnerabilities.length} new vulnerabilities to asset: ${asset.name}`);
  } catch (error) {
    console.error("❌ Error saving vulnerabilities:", error.message);
  }
}
