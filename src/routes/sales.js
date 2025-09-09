import express from "express";
import { v4 as uuidv4 } from "uuid";
import prisma from "../db/client.js";

const router = express.Router();

// Temporary store for each device's current event
const currentEvents = {}; // { [deviceId]: [{ buttonConfig, weightGrams, quantity, priceApplied }] }

/**
 * POST /button/select
 * Press a product button to add it to the current event list
 */
router.post("/select", async (req, res) => {
  const { button, weightGrams, quantity, priceApplied } = req.body;
  const DEVICE_CONFIG = req.deviceConfig;

  if (!DEVICE_CONFIG?.id) return res.status(500).json({ error: "Device not configured" });

  try {
    const buttonConfig = await prisma.buttonConfig.findFirst({
      where: { deviceId: DEVICE_CONFIG.id, button },
      include: { product: true },
    });

    if (!buttonConfig) {
      return res.status(404).json({ error: `No button configured for ${button}` });
    }

    if (!currentEvents[DEVICE_CONFIG.id]) currentEvents[DEVICE_CONFIG.id] = [];

    currentEvents[DEVICE_CONFIG.id].push({
      buttonConfig,
      weightGrams: weightGrams ?? null,
      quantity: quantity ?? 1,
      priceApplied: priceApplied ?? buttonConfig.product.price1,
    });

    res.json({ message: "Product added to current event", currentList: currentEvents[DEVICE_CONFIG.id] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to select product" });
  }
});

/**
 * POST /button/confirm
 * Confirm current event → creates PosEvent and PosEventProducts
 */
router.post("/confirm", async (req, res) => {
  const DEVICE_CONFIG = req.deviceConfig;
  const products = currentEvents[DEVICE_CONFIG.id];

  if (!products || products.length === 0) {
    return res.status(400).json({ error: "No products selected for event" });
  }

  try {
    const posEvent = await prisma.posEvent.create({
      data: {
        id: uuidv4(),
        deviceId: DEVICE_CONFIG.id,
        cancelled: false,
        synced: false,
      },
    });

    for (const p of products) {
      await prisma.posEventProduct.create({
        data: {
          posEventId: posEvent.id,
          productId: p.buttonConfig.productId,
          weightGrams: p.weightGrams,
          quantity: p.quantity,
          priceApplied: p.priceApplied,
          synced: false,
        },
      });
    }

    currentEvents[DEVICE_CONFIG.id] = []; // clear temporary list
    res.json({ message: "Event confirmed", eventId: posEvent.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to confirm event" });
  }
});

/**
 * POST /button/cancel
 * Cancel current event → still saves products but marks event as cancelled
 */
router.post("/cancel", async (req, res) => {
  const DEVICE_CONFIG = req.deviceConfig;
  const products = currentEvents[DEVICE_CONFIG.id];

  if (!DEVICE_CONFIG?.id) return res.status(500).json({ error: "Device not configured" });
  if (!products || products.length === 0) return res.status(400).json({ error: "No products to cancel" });

  try {
    const posEvent = await prisma.posEvent.create({
      data: {
        id: uuidv4(),
        deviceId: DEVICE_CONFIG.id,
        cancelled: true,  // mark as cancelled
        synced: false,
      },
    });

    for (const p of products) {
      await prisma.posEventProduct.create({
        data: {
          posEventId: posEvent.id,
          productId: p.buttonConfig.productId,
          weightGrams: p.weightGrams,
          quantity: p.quantity,
          priceApplied: p.priceApplied,
          synced: false,
        },
      });
    }

    currentEvents[DEVICE_CONFIG.id] = []; // clear temporary list
    res.json({ message: "Event cancelled", eventId: posEvent.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to cancel event" });
  }
});

export default router;