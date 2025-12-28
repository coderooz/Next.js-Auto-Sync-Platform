/** @format */

import { NextRequest, NextResponse } from "next/server";
import Project from "@/models/Project";
import crypto from "crypto";

export async function POST(req: NextResponse) {
  const apiKey = req.headers.get("x-api-key");
}
