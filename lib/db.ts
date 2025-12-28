/** @format */
// @/lib/mongodb.ts
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;
if (!MONGO_URI) throw new Error("❌ MONGO_URI is not defined in environment");

declare global {
  // For hot reload in dev (avoid creating multiple connections)
  // eslint-disable-next-line no-var
  var _mongooseConnection: typeof mongoose | null | undefined;
}

/**
 * Ensures a stable, singleton MongoDB connection across API routes.
 * Handles reconnects, buffering, and production optimization.
 */
export async function connectToDatabase() {
  if (global._mongooseConnection && mongoose.connection.readyState === 1) {
    // ✅ Already connected
    return mongoose.connection;
  }

  if (mongoose.connection.readyState === 2) {
    // 🕐 Connection in progress — wait until open
    await new Promise<void>((resolve, reject) => {
      mongoose.connection.once("connected", resolve);
      mongoose.connection.once("error", reject);
    });
    return mongoose.connection;
  }

  try {
    console.log("[MongoDB] Connecting...");

    const connection = await mongoose.connect(MONGO_URI, {
      dbName: process.env.MONGO_DB_NAME || undefined,
      autoIndex: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      retryWrites: true,
      bufferCommands: false, // 🚫 prevents query buffering
    });

    global._mongooseConnection = mongoose;

    console.log("[MongoDB] Connected:", connection.connection.host);
    return connection.connection;
  } catch (err) {
    console.error("[MongoDB] Connection error:", err);
    throw new Error("Failed to connect to MongoDB");
  }
}

/**
 * Helper to ensure DB is ready before queries.
 */
export async function ensureDbReady() {
  if (mongoose.connection.readyState !== 1) {
    await connectToDatabase();
  }
  return mongoose.connection.readyState === 1;
}
