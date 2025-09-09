import fetch from "node-fetch";
import prisma from "../db/client.js";
import { loadDeviceConfig } from "../utils/deviceConfig.js";
import { AMPLIFY_API_URL, API_HEADERS } from "./config.js";
import { createPosEvent, createPosEventProduct } from "../graphql/mutations.js";

export async function syncPosEvents() {
  try {
    const DEVICE_CONFIG = await loadDeviceConfig();
    if (!DEVICE_CONFIG?.id) {
      console.error("Device config missing! Run createDevice.js first.");
      process.exit(1);
    }

    const unsyncedEvents = await prisma.posEvent.findMany({
      where: { synced: false, deviceId: DEVICE_CONFIG.id },
    });

    let syncedCount = 0;

    for (const event of unsyncedEvents) {
      const input = {
        id: event.id,
        deviceId: event.deviceId,
        eventTime: event.eventTime.toISOString(),
        cancelled: event.cancelled,
        synced: false,
      };

      const res = await fetch(AMPLIFY_API_URL, {
        method: "POST",
        headers: API_HEADERS,
        body: JSON.stringify({ query: createPosEvent, variables: { input } }),
      });

      const json = await res.json();

      if (json && !json.errors && json.data?.createPosEvent) {
        await prisma.posEvent.update({
          where: { id: event.id },
          data: { synced: true },
        });
        syncedCount++;
        console.log(`Synced POS event: ${event.id}`);
      } else {
        console.error(
          "Failed to sync POS event:",
          event.id,
          json?.errors || "No data returned"
        );
      }
    }

    console.log(`✅ Total POS events synced: ${syncedCount}`);
  } catch (err) {
    console.error("Error syncing POS events:", err);
  }
}

export async function syncPosEventProducts() {
  try {
    // Only products from events that are already synced but products not synced
    const unsyncedProducts = await prisma.posEventProduct.findMany({
      where: {
        event: { synced: true },
        synced: false, // you’ll need a `synced` field on PosEventProduct
      },
    });

    let syncedCount = 0;

    for (const product of unsyncedProducts) {
      const input = {
        id: product.id,
        posEventId: product.posEventId,
        productId: product.productId,
        weightGrams: product.weightGrams ?? null,
        quantity: product.quantity ?? null,
        priceApplied: product.priceApplied ?? null,
        synced: false,
      };

      const res = await fetch(AMPLIFY_API_URL, {
        method: "POST",
        headers: API_HEADERS,
        body: JSON.stringify({
          query: createPosEventProduct,
          variables: { input },
        }),
      });

      const json = await res.json();

      if (json && !json.errors && json.data?.createPosEventProduct) {
        await prisma.posEventProduct.update({
          where: { id: product.id },
          data: { synced: true },
        });
        syncedCount++;
        console.log(
          `Synced product ${product.productId} (event ${product.posEventId})`
        );
      } else {
        console.error(
          `Failed to sync product ${product.productId} for event ${product.posEventId}:`,
          json?.errors || "No data returned"
        );
      }
    }

    console.log(`✅ Total POS event products synced: ${syncedCount}`);
  } catch (err) {
    console.error("Error syncing POS event products:", err);
  }
}
