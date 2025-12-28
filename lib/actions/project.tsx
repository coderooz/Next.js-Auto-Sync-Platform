/**
 * @format
 * @coderooz
 * @description Server action for project related actions.
 * @filePath lib/action/project.ts
 */

"use server";

import { connectToDatabase } from "@/lib/db";
import ProjectModel, { ProjectModelProps } from "@/model/Project";
import { createProjectApi, getContentByApiKey } from "./apiKey";

export interface InsertProjectProps {
  title?: string;
  content?: string;
}

export async function insertProject({
  title,
  content,
}: InsertProjectProps): Promise<string | null> {
  await connectToDatabase();

  const data: ProjectModelProps = await ProjectModel.create({
    name: title,
    content,
  });

  if (!data) return null;

  const apiKey = await createProjectApi(data._id);
  if (!apiKey) return null;
  return apiKey;
}

export async function updateProject(
  apiKey: string,
  params: InsertProjectProps
): Promise<boolean> {
  const projectId = await getContentByApiKey(apiKey);
  if (!projectId) return false;
  const task = await ProjectModel.findByIdAndUpdate(projectId, params);
  if (!task) return false;
  return true;
}

export async function getAllProjects() {
  await connectToDatabase();

  const projects = await ProjectModel.find({})
    .select("name slug githubLink")
    .sort({ createdAt: -1 })
    .lean();

  return projects;
}

export async function getProjectBySlug(slug: string) {
  await connectToDatabase();

  const project = await ProjectModel.findOne({ slug }).lean();
  return project;
}
