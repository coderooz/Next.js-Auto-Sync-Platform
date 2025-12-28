/** @format */

import mongoose from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var mongooseConn: Promise<typeof mongoose> | null;
}

/**
 * Singleton MongoDB connection for Next.js (Vercel-safe)
 */
export async function connectToDatabase() {
  const MONGO_URI = process.env.MONGO_URI;

  if (!MONGO_URI) {
    throw new Error("❌ MONGO_URI is not defined");
  }

  if (global.mongooseConn) {
    return global.mongooseConn;
  }

  global.mongooseConn = mongoose.connect(MONGO_URI, {
    dbName: process.env.MONGO_DB_NAME,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    connectTimeoutMS: 10000,
    retryWrites: true,
  });

  await global.mongooseConn;
  return mongoose;
}
