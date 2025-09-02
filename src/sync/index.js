import { syncProducts } from "./products.js";
import { syncCategories } from "./categories.js";
import { syncDeviceInfo } from "./device.js";
import { syncPosEvents } from "./events.js";

export async function syncAll() {
  console.log("Starting full sync...");
  try {
    await syncDeviceInfo();
    await syncCategories();
    await syncProducts();
    await syncPosEvents();
    console.log("Full sync completed successfully.");
  } catch (err) {
    console.error("Error during full sync:", err);
  }
}

export function startSync(intervalMs = 60_000) {
  // Initial sync
  syncAll();

  // Repeat every interval
  setInterval(syncAll, intervalMs);
}