import fs from "fs";
import path from "path";
import crypto from "crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const CONFIG_FILE = path.resolve("./src/utils/deviceConfig.json");

async function main() {
  // Check if device config already exists
  if (fs.existsSync(CONFIG_FILE)) {
    const existingConfig = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8"));
    console.log("Device already exists:", existingConfig);
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

  // Save device ID to local config
  const config = {
    deviceId: device.id,
  };

  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
  console.log("Device created successfully:", config);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
