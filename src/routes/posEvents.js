import express from "express";
import { v4 as uuidv4 } from "uuid";
import prisma from "../db/client.js";

const router = express.Router();

// POST new sale (event with multiple products)
router.post("/", async (req, res) => {
  const { products } = req.body;
  // products = [{ button, weightGrams, quantity, priceApplied }, ...]

  const DEVICE_CONFIG = req.deviceConfig;

  if (!DEVICE_CONFIG || !DEVICE_CONFIG.id) {
    console.error("Device not configured! Run createDevice.js first.");
    return res.status(500).json({ error: "Device not configured" });
  }

  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ error: "Products array is required" });
  }

  try {
    // Create one event
    const event = await prisma.posEvent.create({
      data: {
        id: uuidv4(),
        deviceId: DEVICE_CONFIG.id,
        eventTime: new Date(),
        cancelled: false,
        synced: false,
      },
    });

    // Create all eventProducts
    const eventProducts = [];
    for (const p of products) {
      const product = await prisma.product.findFirst({
        where: { button: p.button },
      });

      if (!product) {
        console.warn(`⚠️ No product assigned to button ${p.button}, skipping`);
        continue;
      }

      const ep = await prisma.posEventProduct.create({
        data: {
          id: uuidv4(),
          posEventId: event.id,
          productId: product.id,
          weightGrams: p.weightGrams ?? null,
          quantity: p.quantity ?? null,
          priceApplied: p.priceApplied ?? null,
          synced: false,
        },
      });

      eventProducts.push(ep);
    }

    res.json({
      event,
      products: eventProducts,
    });
  } catch (err) {
    console.error("Failed to save event:", err);
    res.status(500).json({ error: "Failed to save event" });
  }
});

// GET unsynced events with their products
router.get("/unsynced", async (req, res) => {
  const DEVICE_CONFIG = req.deviceConfig;

  if (!DEVICE_CONFIG || !DEVICE_CONFIG.id) {
    console.error("Device not configured! Run createDevice.js first.");
    return res.status(500).json({ error: "Device not configured" });
  }

  try {
    const events = await prisma.posEvent.findMany({
      where: { synced: false, deviceId: DEVICE_CONFIG.id },
      include: { products: true },
    });
    res.json(events);
  } catch (err) {
    console.error("Failed to fetch unsynced events:", err);
    res.status(500).json({ error: "Failed to fetch unsynced events" });
  }
});

export default router;
