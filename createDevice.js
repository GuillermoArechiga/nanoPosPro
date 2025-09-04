import crypto from "crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Check if a device already exists in the local DB
  const existingDevice = await prisma.device.findFirst();

  if (existingDevice) {
    console.log("Device already exists:", existingDevice);
    process.exit(0);
  }

  // Generate a new device ID (UUID)
  const deviceId = crypto.randomUUID();

  // Create device in local DB with empty label/location (cloud will update later)
  const device = await prisma.device.create({
    data: {
      id: deviceId,
      label: "",
      location: "",
      firmware: "v1.0.0",
      isOnline: true,
      synced: false,
    },
  });

  console.log("Device created successfully:", device);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
