/**
 * @format
 * @coderooz
 * @description Mongodb project collections schema.
 * @filePath model/Apikey.ts
 */

import mongoose, { Types, Document, Schema, Model } from "mongoose";

export interface ApiKeyModelprops extends Document {
  projectId: Types.ObjectId;
  apiKey: string;
  createdAt: Date;
}

const ApiKeySchema = new Schema<ApiKeyModelprops>(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      index: true,
      require: true,
    },
    apiKey: {
      type: Schema.Types.String,
      index: true,
      require: true,
    },
    createdAt: {
      type: Schema.Types.Date,
      default: Date.now(),
      immutable: true,
    },
  },
  {
    timestamps: true,
  }
);

const ApiKey: Model<ApiKeyModelprops> =
  mongoose.models.ApiKey ||
  mongoose.model<ApiKeyModelprops>("ApiKey", ApiKeySchema);

export default ApiKey;
