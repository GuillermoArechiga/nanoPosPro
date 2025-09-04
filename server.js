import express from "express";
import prisma from "./src/db/client.js";
import posEventsRouter from "./src/routes/posEvents.js";
import categoriesRouter from "./src/routes/categories.js";
import productsRouter from "./src/routes/products.js";
import { startSync } from "./src/sync/index.js";
import { loadDeviceConfig } from "./src/utils/deviceConfig.js";

const app = express();
app.use(express.json());

async function initializeDeviceConfig() {
  const deviceConfig = await loadDeviceConfig();
  if (!deviceConfig?.id) {
    console.error("Device not configured! Run createDevice.js first.");
    process.exit(1);
  }

  app.locals.deviceConfig = deviceConfig;
}

app.use((req, res, next) => {
  req.deviceConfig = app.locals.deviceConfig;
  next();
});

// Routes
app.use("/pos-events", posEventsRouter);
app.use("/categories", categoriesRouter);
app.use("/products", productsRouter);

// Start server
const PORT = 3000;
async function startServer() {
  try {
    await prisma.$connect();
    console.log("Prisma connected successfully.");

    await initializeDeviceConfig();

    app.listen(PORT, () => {
      console.log(`Device backend running on http://localhost:${PORT}`);
      startSync();
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
