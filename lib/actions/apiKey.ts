/** @format */
"use server";
import crypto from "crypto";

export async function generateApiKey() {
  return crypto.randomBytes(15).toString("hex");
}

export async function hashKey(key: string) {
  return crypto.createHash("sha256").update(key).digest("hex");
}
