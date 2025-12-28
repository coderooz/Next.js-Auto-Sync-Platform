/**
 * @format
 * @coderooz
 * @description Server action for api related actions.
 * @filePath lib/action/apiKey.ts
 */

"use server";
import crypto from "crypto";
import { Types } from "mongoose";
import ApiKeyModel from "@/model/Apikey";
import { connectToDatabase } from "@/lib/db";

export async function generateApiKey(): Promise<string> {
  return crypto.randomBytes(15).toString("hex");
}

export async function hashKey(key: string) {
  return crypto.createHash("sha256").update(key).digest("hex");
}

export async function createProjectApi(
  projectId: Types.ObjectId
): Promise<string | null> {
  await connectToDatabase();

  if (!projectId) return null;

  const apiKey = await generateApiKey();

  const data = await ApiKeyModel.create({
    apiKey: apiKey,
    projectId: projectId,
  });

  if (!data) return null;
  return apiKey;
}

export async function getContentByApiKey(
  apiKey: string
): Promise<Types.ObjectId | null> {
  if (!apiKey) return null;

  await connectToDatabase();

  const apiKeyDoc = await ApiKeyModel.findOne({ apiKey })
    .select("projectId")
    .lean();

  if (!apiKeyDoc) return null;

  return apiKeyDoc.projectId;
}
