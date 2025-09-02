import fetch from "node-fetch";
import prisma from "../db/client.js";
import { loadDeviceConfig } from "../utils/deviceConfig.js";
import { AMPLIFY_API_URL, API_HEADERS } from "./config.js";
import { listProducts } from "../graphql/queries.js";
import { updateProduct } from "../graphql/mutations.js";

const DEVICE_CONFIG = loadDeviceConfig();

if (!DEVICE_CONFIG?.deviceId) {
  console.error("Device not configured! Run createDevice.js first.");
  process.exit(1);
}

export async function syncProducts() {
  try {
    const deviceId = DEVICE_CONFIG.deviceId;

    // Fetch cloud products
    const res = await fetch(AMPLIFY_API_URL, {
      method: "POST",
      headers: API_HEADERS,
      body: JSON.stringify({
        query: listProducts,
        variables: { filter: { deviceId: { eq: deviceId } }, limit: 1000 },
      }),
    });

    const json = await res.json();
    const cloudProducts = json.data?.listProducts?.items || [];

    let createdCount = 0;
    let updatedCount = 0;
    let alreadySyncedCount = 0;

    for (const cloudProd of cloudProducts) {
      const { __typename, ...cleanProd } = cloudProd;

      const existing = await prisma.product.findUnique({
        where: { id: cleanProd.id },
      });

      // Cloud product is new (not in local)
      if (!existing) {
        await prisma.product.create({
          data: {
            ...cleanProd,
            button: cleanProd.button || "BTN1",
            synced: true,
          }, // mark synced locally
        });
        createdCount++;
        continue;
      }

      // Cloud product has changes (synced=false) or local outdated
      if (!cleanProd.synced) {
        await prisma.product.update({
          where: { id: cleanProd.id },
          data: {
            ...cleanProd,
            button: cleanProd.button || "BTN1",
            synced: true,
          }, // update local and mark synced
        });

        // Update cloud to mark synced=true
        await fetch(AMPLIFY_API_URL, {
          method: "POST",
          headers: API_HEADERS,
          body: JSON.stringify({
            query: updateProduct,
            variables: { input: { id: cleanProd.id, synced: true } },
          }),
        });

        updatedCount++;
        continue;
      }

      // Product already synced, no changes
      alreadySyncedCount++;
    }

    console.log(
      `Products synced: total=${cloudProducts.length}, created=${createdCount}, updated=${updatedCount}, alreadySynced=${alreadySyncedCount}`
    );
  } catch (err) {
    console.error("Error syncing products:", err);
  }
}
