import fetch from "node-fetch";
import prisma from "../db/client.js";
import { loadDeviceConfig } from "../utils/deviceConfig.js";
import { AMPLIFY_API_URL, API_HEADERS } from "./config.js";
import { createDevice, updateDevice } from "../graphql/mutations.js";
import { getDevice } from "../graphql/queries.js";

const DEVICE_CONFIG = loadDeviceConfig();

export async function syncDeviceInfo() {
  const localDevice = await prisma.device.findUnique({
    where: { id: DEVICE_CONFIG.deviceId },
  });

  if (!localDevice) {
    console.error("Local device not found in DB.");
    return;
  }

  // If already synced, skip
  if (localDevice.synced) {
    console.log("Device already synced, skipping cloud update.");
    return;
  }

  // Check if device exists in cloud
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

  const mutation = cloudDevice ? updateDevice : createDevice;

  const res = await fetch(AMPLIFY_API_URL, {
    method: "POST",
    headers: API_HEADERS,
    body: JSON.stringify({
      query: mutation,
      variables: {
        input: {
          id: localDevice.id,
          label: localDevice.label,
          location: localDevice.location,
          firmwareVersion: localDevice.firmware,
          isOnline: localDevice.isOnline,
          synced: true,
        },
      },
    }),
  });

  const json = await res.json();

  if (!json.errors) {
    // Mark as synced locally
    await prisma.device.update({
      where: { id: localDevice.id },
      data: { synced: true },
    });
    console.log("Device synced successfully:", localDevice.id);
  } else {
    console.error("Failed to sync device:", json.errors);
  }
}
