import fetch from "node-fetch";
import prisma from "../db/client.js";
import { loadDeviceConfig } from "../utils/deviceConfig.js";
import { AMPLIFY_API_URL, API_HEADERS } from "./config.js";
import { listCategories } from "../graphql/queries.js";
import { updateCategory } from "../graphql/mutations.js";

const DEVICE_CONFIG = loadDeviceConfig();

export async function syncCategories() {
  try {
    const deviceId = DEVICE_CONFIG?.deviceId;
    if (!deviceId) {
      console.error("Device ID is not defined in device config.");
      return;
    }

    // Fetch cloud categories
    const res = await fetch(AMPLIFY_API_URL, {
      method: "POST",
      headers: API_HEADERS,
      body: JSON.stringify({
        query: listCategories,
        variables: {
          filter: { deviceId: { eq: deviceId } },
          limit: 1000,
        },
      }),
    });

    const json = await res.json();
    const cloudCategories = json.data?.listCategories?.items || [];

    let createdCount = 0;
    let updatedCount = 0;
    let alreadySyncedCount = 0;

    for (const cloudCat of cloudCategories) {
      const { __typename, ...cleanCat } = cloudCat;

      const existing = await prisma.category.findUnique({
        where: { id: cleanCat.id },
      });

      // New cloud category → create locally and mark synced
      if (!existing) {
        await prisma.category.create({
          data: { ...cleanCat, synced: true },
        });
        createdCount++;
        continue;
      }

      // Cloud category updated or unsynced → update local and mark cloud synced
      if (!cleanCat.synced) {
        await prisma.category.update({
          where: { id: cleanCat.id },
          data: { ...cleanCat, synced: true },
        });

        // Update cloud to mark synced=true
        await fetch(AMPLIFY_API_URL, {
          method: "POST",
          headers: API_HEADERS,
          body: JSON.stringify({
            query: updateCategory,
            variables: { input: { id: cleanCat.id, synced: true } },
          }),
        });

        updatedCount++;
        continue;
      }

      // Already synced
      alreadySyncedCount++;
    }

    console.log(
      `Categories synced: total=${cloudCategories.length}, created=${createdCount}, updated=${updatedCount}, alreadySynced=${alreadySyncedCount}`
    );
  } catch (err) {
    console.error("Error syncing categories:", err);
  }
}
