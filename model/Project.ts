/**
 * @format
 * @coderooz
 * @description Mongodb project collections schema.
 * @filePath model/Project.ts
 */

import mongoose, { Document, Schema, Model } from "mongoose";

export interface ProjectModelProps extends Document {
  slug: string;
  name: string;
  content: string;
  githubLink: string;
  lastUpdated: Date;
  createdAt: Date;
}

const ProjectSchema = new Schema<ProjectModelProps>(
  {
    slug: {
      type: Schema.Types.String,
      unique: true,
      index: true,
    },
    name: {
      type: Schema.Types.String,
      default: "",
      trim: true,
      require: true,
      index: true,
    },
    content: {
      type: Schema.Types.String,
      default: "",
    },
    githubLink: {
      type: Schema.Types.String,
    },
    lastUpdated: {
      type: Schema.Types.Date,
    },
    createdAt: {
      type: Schema.Types.Date,
      default: Date.now,
      immutable: true,
    },
  },
  {
    timestamps: true,
  }
);

// Generate slug automatically if not provided
ProjectSchema.pre("validate", async function () {
  const doc = this as mongoose.Document & {
    slug?: string;
    name?: string;
  };

  if (!doc.name || (!doc.isModified("name") && doc.slug)) {
    return;
  }

  const baseSlug = doc.name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  let uniqueSlug = baseSlug;
  let counter = 1;

  const Project = mongoose.model("Project");

  while (
    await Project.exists({
      slug: uniqueSlug,
      _id: { $ne: doc._id },
    })
  ) {
    uniqueSlug = `${baseSlug}-${counter++}`;
  }

  doc.slug = uniqueSlug;
});

// adds or updates lastUpdated automatically
ProjectSchema.pre("save", function () {
  this.lastUpdated = new Date();
});

export default (mongoose.models.Project as Model<ProjectModelProps>) ||
  mongoose.model<ProjectModelProps>("Project", ProjectSchema);
