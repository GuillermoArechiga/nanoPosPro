import fetch from "node-fetch";
import prisma from "../db/client.js";
import { loadDeviceConfig } from "../utils/deviceConfig.js";
import { AMPLIFY_API_URL, API_HEADERS } from "./config.js";
import { createPosEvent } from "../graphql/mutations.js";

const DEVICE_CONFIG = loadDeviceConfig();

if (!DEVICE_CONFIG?.deviceId) {
  console.error("Device config missing! Run createDevice.js first.");
  process.exit(1);
}

export async function syncPosEvents() {
  try {
    // Only unsynced local events
    const unsyncedEvents = await prisma.posEvent.findMany({
      where: { synced: false, deviceId: DEVICE_CONFIG.deviceId },
    });

    let syncedCount = 0;

    for (const event of unsyncedEvents) {
      // Always include `synced: false` when sending to cloud
      const input = {
        id: event.id,
        deviceId: event.deviceId,
        productId: event.productId,        
        weightGrams: event.weightGrams ?? 0,
        quantity: event.quantity ?? 0,
        priceApplied: event.priceApplied ?? 0,
        eventTime: event.eventTime.toISOString(),
        synced: false,
      };

      // Send event to cloud
      const res = await fetch(AMPLIFY_API_URL, {
        method: "POST",
        headers: API_HEADERS,
        body: JSON.stringify({ query: createPosEvent, variables: { input } }),
      });

      const json = await res.json();

      if (json && !json.errors && json.data?.createPosEvent) {
        // Mark as synced locally
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

    console.log(`Total POS events synced: ${syncedCount}`);
  } catch (err) {
    console.error("Error syncing POS events:", err);
  }
}