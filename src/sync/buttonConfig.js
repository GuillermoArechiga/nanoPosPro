import fetch from "node-fetch";
import prisma from "../db/client.js";
import { loadDeviceConfig } from "../utils/deviceConfig.js";
import { AMPLIFY_API_URL, API_HEADERS } from "./config.js";
import { listButtonConfigs } from "../graphql/queries.js";
import { updateButtonConfig } from "../graphql/mutations.js";

export async function syncButtonConfigs() {
  try {
    const DEVICE_CONFIG = await loadDeviceConfig();
    const deviceId = DEVICE_CONFIG?.id;
    if (!deviceId) {
      console.error("Device id is not defined in device config.");
      return;
    }

    // Fetch unsynced button configs from cloud for this device
    const res = await fetch(AMPLIFY_API_URL, {
      method: "POST",
      headers: API_HEADERS,
      body: JSON.stringify({
        query: listButtonConfigs,
        variables: {
          filter: {
            deviceId: { eq: deviceId },
            synced: { eq: false },
          },
          limit: 1000,
        },
      }),
    });

    const json = await res.json();
    const cloudConfigs = json.data?.listButtonConfigs?.items || [];

    let createdCount = 0;
    let updatedCount = 0;
    let alreadySyncedCount = 0;

    for (const cloudCfg of cloudConfigs) {
      const { __typename, ...cleanCfg } = cloudCfg;

      const existing = await prisma.buttonConfig.findUnique({
        where: { id: cleanCfg.id },
      });

      // Convert createdAt/updatedAt strings to Date
      const createdAt = cleanCfg.createdAt
        ? new Date(cleanCfg.createdAt)
        : undefined;
      const updatedAt = cleanCfg.updatedAt
        ? new Date(cleanCfg.updatedAt)
        : undefined;

      // If not exist locally → create and mark cloud as synced
      if (!existing) {
        await prisma.buttonConfig.create({
          data: {
            id: cleanCfg.id,
            button: cleanCfg.button,
            priceTier: cleanCfg.priceTier,
            synced: true,
            owner: cleanCfg.owner || "UNKNOWN",
            createdAt,
            updatedAt,
            device: { connect: { id: cleanCfg.deviceId } },
            product: { connect: { id: cleanCfg.productId } },
          },
        });

        // Update cloud to mark synced
        await fetch(AMPLIFY_API_URL, {
          method: "POST",
          headers: API_HEADERS,
          body: JSON.stringify({
            query: updateButtonConfig,
            variables: { input: { id: cleanCfg.id, synced: true } },
          }),
        });

        createdCount++;
        continue;
      }

      // If cloud says synced=false → update local and mark cloud synced
      if (!cleanCfg.synced) {
        await prisma.buttonConfig.update({
          where: { id: cleanCfg.id },
          data: {
            button: cleanCfg.button,
            priceTier: cleanCfg.priceTier,
            synced: true,
            owner: cleanCfg.owner || "UNKNOWN",
            createdAt,
            updatedAt,
            device: { connect: { id: cleanCfg.deviceId } },
            product: { connect: { id: cleanCfg.productId } },
          },
        });

        // Update cloud to mark synced
        await fetch(AMPLIFY_API_URL, {
          method: "POST",
          headers: API_HEADERS,
          body: JSON.stringify({
            query: updateButtonConfig,
            variables: { input: { id: cleanCfg.id, synced: true } },
          }),
        });

        updatedCount++;
        continue;
      }

      alreadySyncedCount++;
    }

    console.log(
      `ButtonConfigs synced: total=${cloudConfigs.length}, created=${createdCount}, updated=${updatedCount}, alreadySynced=${alreadySyncedCount}`
    );
  } catch (err) {
    console.error("Error syncing button configs:", err);
  }
}
