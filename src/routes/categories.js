import express from "express";
import prisma from "../db/client.js";

const router = express.Router();

// GET local categories for current device (not deleted)
router.get("/", async (req, res) => {
  try {
    const deviceConfig = req.deviceConfig;
    if (!deviceConfig || !deviceConfig.id) {
      console.error("Device not configured! Run createDevice.js first.");
      return res.status(500).json({ error: "Device not configured" });
    }

    const categories = await prisma.category.findMany({
      where: {
        owner: deviceConfig.owner,
        isDeleted: false,
      },
      orderBy: { name: "asc" },
    });

    res.json(categories);
  } catch (err) {
    console.error("Failed to fetch local categories:", err);
    res.status(500).json({ error: "Failed to fetch local categories" });
  }
});

export default router;
