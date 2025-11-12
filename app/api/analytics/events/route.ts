// app/api/analytics/events/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Analytics from "@/models/User.analytics";

export async function POST(req: Request) {
  await connectDB();

  const { type, userId, meta } = await req.json();
  const ip = (req.headers.get("x-forwarded-for") || "unknown").split(",")[0];

  if (!type) {
    return NextResponse.json({ error: "Missing type" }, { status: 400 });
  }

  await Analytics.create({
    type,
    userId: userId || null,
    ip,
    meta: meta || {},
  });

  return NextResponse.json({ success: true });
}
