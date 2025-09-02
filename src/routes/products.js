import express from "express";
import prisma from "../db/client.js";
import { loadDeviceConfig } from "../utils/deviceConfig.js";

const DEVICE_CONFIG = loadDeviceConfig();

const router = express.Router();

// Ensure device is configured
if (!DEVICE_CONFIG || !DEVICE_CONFIG.deviceId) {
  console.error("Device not configured! Run createDevice.js first.");
  process.exit(1);
}

// GET local products for current device (not deleted)
router.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        deviceId: DEVICE_CONFIG.deviceId,
        isDeleted: false,
      },
      orderBy: { name: "asc" }, // optional, order by name
    });

    res.json(products);
  } catch (err) {
    console.error("Failed to fetch local products:", err);
    res.status(500).json({ error: "Failed to fetch local products" });
  }
});

export default router;