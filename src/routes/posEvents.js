import express from "express";
import { v4 as uuidv4 } from "uuid";
import prisma from "../db/client.js";

const router = express.Router();

// POST new button press
router.post("/", async (req, res) => {
  const { button, weightGrams, quantity, priceApplied } = req.body;
  const DEVICE_CONFIG = req.deviceConfig;

  if (!DEVICE_CONFIG || !DEVICE_CONFIG.id) {
    console.error("Device not configured! Run createDevice.js first.");
    return res.status(500).json({ error: "Device not configured" });
  }

  try {
    // Find product assigned to this button
    const product = await prisma.product.findFirst({
      where: { deviceId: DEVICE_CONFIG.id, button },
    });

    if (!product) {
      return res.status(404).json({
        error: `No product assigned to button ${button}`,
      });
    }

    const event = await prisma.posEvent.create({
      data: {
        id: uuidv4(),
        deviceId: DEVICE_CONFIG.id,
        productId: product.id,
        weightGrams,
        quantity,
        priceApplied,
        eventTime: new Date(),
        synced: false,
      },
    });

    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save event" });
  }
});

// GET unsynced events
router.get("/unsynced", async (req, res) => {
  const DEVICE_CONFIG = req.deviceConfig;

  if (!DEVICE_CONFIG || !DEVICE_CONFIG.id) {
    console.error("Device not configured! Run createDevice.js first.");
    return res.status(500).json({ error: "Device not configured" });
  }

  try {
    const events = await prisma.posEvent.findMany({
      where: { synced: false, deviceId: DEVICE_CONFIG.id },
    });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch unsynced events" });
  }
});

export default router;
