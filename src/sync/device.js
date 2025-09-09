import fetch from "node-fetch";
import prisma from "../db/client.js";
import { loadDeviceConfig } from "../utils/deviceConfig.js";
import { AMPLIFY_API_URL, API_HEADERS } from "./config.js";
import { createDevice, updateDevice } from "../graphql/mutations.js";
import { getDevice } from "../graphql/queries.js";

export async function syncDeviceInfo() {
  try {
    const DEVICE_CONFIG = await loadDeviceConfig();
    const localDevice = await prisma.device.findUnique({
      where: { id: DEVICE_CONFIG.id },
    });

    if (!localDevice) {
      console.error("Local device not found in DB.");
      return;
    }

    // Fetch device from cloud
    const checkRes = await fetch(AMPLIFY_API_URL, {
      method: "POST",
      headers: API_HEADERS,
      body: JSON.stringify({
        query: getDevice,
        variables: { id: localDevice.id },
      }),
    });

    const checkJson = await checkRes.json();
    const cloudDevice = checkJson.data?.getDevice;

    if (!cloudDevice) {
      // Device exists locally but not in cloud → create in cloud
      const createRes = await fetch(AMPLIFY_API_URL, {
        method: "POST",
        headers: API_HEADERS,
        body: JSON.stringify({
          query: createDevice,
          variables: {
            input: {
              id: localDevice.id,
              label: localDevice.label,
              location: localDevice.location,
              firmwareVersion: localDevice.firmwareVersion,
              isOnline: localDevice.isOnline,
              synced: true,
              owner: localDevice.owner,
            },
          },
        }),
      });

      const createJson = await createRes.json();

      if (!createJson.errors) {
        await prisma.device.update({
          where: { id: localDevice.id },
          data: { synced: true },
        });
        console.log("Device created & synced successfully:", localDevice.id);
      } else {
        console.error("Failed to create device in cloud:", createJson.errors);
      }

      return;
    }

    // Device exists locally and in cloud
    if (localDevice.synced && cloudDevice.synced) {
      console.log(
        "Device already synced in both local and cloud, skipping update."
      );
      return;
    }

    if (!cloudDevice.synced) {
      // Cloud not synced → update local device to match cloud
      const updatedLocal = await prisma.device.update({
        where: { id: localDevice.id },
        data: {
          label: cloudDevice.label,
          location: cloudDevice.location,
          firmwareVersion: cloudDevice.firmwareVersion,
          isOnline: cloudDevice.isOnline,
          owner: cloudDevice.owner || "toAssign",
          synced: true,
        },
      });

      console.log("Local device updated to match cloud:", updatedLocal.id);

      // Update cloud to set synced=true
      const updateRes = await fetch(AMPLIFY_API_URL, {
        method: "POST",
        headers: API_HEADERS,
        body: JSON.stringify({
          query: updateDevice,
          variables: { input: { id: updatedLocal.id, synced: true } },
        }),
      });

      const updateJson = await updateRes.json();
      if (!updateJson.errors) {
        console.log(
          "Cloud synced status updated to true for device:",
          updatedLocal.id
        );
      } else {
        console.error(
          "Failed to update cloud synced status:",
          updateJson.errors
        );
      }

      return;
    }

    console.log("Device state checked, no further action needed.");
  } catch (err) {
    console.error("Error syncing device:", err);
  }
}
