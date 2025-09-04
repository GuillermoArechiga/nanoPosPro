import prisma from "../db/client.js";

export async function loadDeviceConfig() {
  // Fetch the single device from the local database
  const device = await prisma.device.findFirst();

  if (!device) {
    console.error(
      "No device found in local database! Run createDevice.js first."
    );
    process.exit(1);
  }

  return device; 
}
