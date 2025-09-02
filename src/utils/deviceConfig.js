import fs from "fs";
import path from "path";

const CONFIG_FILE = path.resolve("src/utils/deviceConfig.json");

export function loadDeviceConfig() {
  if (!fs.existsSync(CONFIG_FILE)) {
    console.error("Device config not found! Run createDevice.js first.");
    process.exit(1);
  }

  const raw = fs.readFileSync(CONFIG_FILE, "utf-8");
  const config = JSON.parse(raw);

  if (!config.deviceId) {
    console.error("Device config invalid! Missing deviceId.");
    process.exit(1);
  }

  return config;
}