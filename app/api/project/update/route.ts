/** @format */

import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import ProjectModel from "@/model/Project";
import ApiKeyModel from "@/model/Apikey";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const apiKey = req.headers.get("x-api-key");
    if (!apiKey) {
      return NextResponse.json({ error: "API key missing" }, { status: 401 });
    }

    const keyDoc = await ApiKeyModel.findOne({ apiKey });
    if (!keyDoc) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 403 });
    }

    const { content, githubLink } = await req.json();

    const updated = await ProjectModel.findByIdAndUpdate(
      keyDoc.projectId,
      {
        ...(content && { content }),
        ...(githubLink && { githubLink }),
        lastUpdated: new Date(),
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
