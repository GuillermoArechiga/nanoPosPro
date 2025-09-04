import express from "express";
import prisma from "../db/client.js";

const router = express.Router();

// GET local products for current device (not deleted)
router.get("/", async (req, res) => {
  try {
    const deviceConfig = req.deviceConfig;
    if (!deviceConfig || !deviceConfig.id) {
      return res.status(400).json({ error: "Device not configured" });
    }
    const products = await prisma.product.findMany({
      where: {
        owner: deviceConfig.owner,
        isDeleted: false,
      },
      orderBy: { name: "asc" },
    });
    res.json(products);
  } catch (err) {
    console.error("Failed to fetch local products:", err);
    res.status(500).json({ error: "Failed to fetch local products" });
  }
});

export default router;