/** @format */

import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import ProjectModel from "@/model/Project";
import { createProjectApi } from "@/lib/actions/apiKey";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const { title, content, githubLink } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const project = await ProjectModel.create({
      name: title,
      content,
      githubLink,
    });

    const apiKey = await createProjectApi(project._id);

    if (!apiKey) {
      return NextResponse.json(
        { error: "Failed to generate API key" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      projectId: project._id,
      slug: project.slug,
      apiKey, // returned ONCE
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
