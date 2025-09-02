import express from "express";
import prisma from "./src/db/client.js";
import posEventsRouter from "./src/routes/posEvents.js";
import categoriesRouter from "./src/routes/categories.js";
import productsRouter from "./src/routes/products.js";
import { startSync } from "./src/sync/index.js";
import { loadDeviceConfig } from "./src/utils/deviceConfig.js";

const app = express();
app.use(express.json());

// Routes
app.use("/pos-events", posEventsRouter);
app.use("/categories", categoriesRouter);
app.use("/products", productsRouter);

// Health check endpoint
app.get("/health", async (req, res) => {
  try {
    const devices = await prisma.device.findMany();
    const config = loadDeviceConfig();

    res.json({
      status: "ok",
      dbDevicesCount: devices.length,
      dbDevices: devices,
      configDeviceId: config.deviceId,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// Start server after connecting to Prisma
const PORT = 3000;

async function startServer() {
  try {
    await prisma.$connect();
    console.log("Prisma connected successfully.");

    app.listen(PORT, () => {
      console.log(`Device backend running on http://localhost:${PORT}`);
      startSync();
    });
  } catch (err) {
    console.error("Failed to connect Prisma:", err);
    process.exit(1);
  }
}

startServer();
