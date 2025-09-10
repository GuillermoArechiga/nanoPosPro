import express from "express";
import { v4 as uuidv4 } from "uuid";
import prisma from "../db/client.js";

const router = express.Router();

// POST new sale (event with multiple products)
router.post("/", async (req, res) => {
  const { products, cancelled } = req.body;
  const DEVICE_CONFIG = req.deviceConfig;

  if (!DEVICE_CONFIG || !DEVICE_CONFIG.id) {
    console.error("Device not configured! Run createDevice.js first.");
    return res.status(500).json({ error: "Device not configured" });
  }

  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ error: "Products array is required" });
  }

  try {
    // 1️⃣ Create the main event
    const event = await prisma.posEvent.create({
      data: {
        id: uuidv4(),
        deviceId: DEVICE_CONFIG.id,
        cancelled: cancelled ?? false,
        synced: false,
        owner: DEVICE_CONFIG.owner || "UNKNOWN",
      },
    });

    const eventProducts = [];

    // 2️⃣ Loop through each product/button
    for (const p of products) {
      // Lookup ButtonConfig for this device/button
      const buttonConfig = await prisma.buttonConfig.findFirst({
        where: { button: p.button, deviceId: DEVICE_CONFIG.id },
        include: { product: true },
      });

      if (!buttonConfig || !buttonConfig.product) {
        console.warn(`⚠️ No product assigned to button ${p.button}, skipping`);
        continue;
      }

      const { product, priceTier } = buttonConfig;

      // Determine priceApplied based on priceTier
      let priceApplied = 0;
      if (priceTier === 1) priceApplied = product.price1;
      else if (priceTier === 2) priceApplied = product.price2;
      else if (priceTier === 3) priceApplied = product.price3;

      // Create the PosEventProduct
      const ep = await prisma.posEventProduct.create({
        data: {
          id: uuidv4(),
          posEventId: event.id,
          productId: product.id,
          weightGrams: p.weightGrams ?? null,
          quantity: p.quantity ?? 1,
          priceApplied,
          owner: DEVICE_CONFIG.owner || "UNKNOWN",
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

export default router;
