import fetch from "node-fetch";
import prisma from "../db/client.js";
import { loadDeviceConfig } from "../utils/deviceConfig.js";
import { AMPLIFY_API_URL, API_HEADERS } from "./config.js";
import { listProducts } from "../graphql/queries.js";
import { updateProduct } from "../graphql/mutations.js";

export async function syncProducts() {
  try {
    const deviceConfig = await loadDeviceConfig();
    const ownerId = deviceConfig?.owner;
    if (!ownerId) {
      console.error("Device ownerId is not defined in device config.");
      return;
    }

    // Fetch only unsynced cloud products for this device
    const res = await fetch(AMPLIFY_API_URL, {
      method: "POST",
      headers: API_HEADERS,
      body: JSON.stringify({
        query: listProducts,
        variables: {
          filter: {
            owner: { eq: ownerId },
            synced: { eq: false },
          },
          limit: 1000,
        },
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
        const created = await prisma.product.create({
          data: {
            ...cleanProd,
            synced: true,
          },
        });

        // Immediately mark cloud product as synced
        await fetch(AMPLIFY_API_URL, {
          method: "POST",
          headers: API_HEADERS,
          body: JSON.stringify({
            query: updateProduct,
            variables: { input: { id: created.id, synced: true } },
          }),
        });

        createdCount++;
        continue;
      }

      // Cloud product has changes (unsynced) or local outdated
      if (!cleanProd.synced) {
        await prisma.product.update({
          where: { id: cleanProd.id },
          data: {
            ...cleanProd,
            synced: true,
          },
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

      alreadySyncedCount++;
    }

    console.log(
      `Products synced: total=${cloudProducts.length}, created=${createdCount}, updated=${updatedCount}, alreadySynced=${alreadySyncedCount}`
    );
  } catch (err) {
    console.error("Error syncing products:", err);
  }
}
