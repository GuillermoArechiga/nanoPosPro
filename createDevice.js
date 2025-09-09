import crypto from "crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get owner from command line args
const args = process.argv.slice(2); // skip node & script path
let ownerArg = null;

args.forEach((arg) => {
  if (arg.startsWith("owner=")) {
    ownerArg = arg.split("=")[1];
  }
});

async function main() {
  // Check if a device already exists in the local DB
  const existingDevice = await prisma.device.findFirst();

  if (existingDevice) {
    console.log("Device already exists:", existingDevice);
    process.exit(0);
  }

  // Generate a new device ID (UUID)
  const deviceId = crypto.randomUUID();

  // Create device in local DB with empty label/location
  const device = await prisma.device.create({
    data: {
      id: deviceId,
      label: "",
      location: "",
      firmwareVersion: "v1.0.0",
      isOnline: true,
      synced: false,
      owner: ownerArg || null, // use the CLI argument if provided
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