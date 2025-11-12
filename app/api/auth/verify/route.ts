// app/api/auth/verify/route.ts
import { NextResponse } from "next/server";
import { getTokenFromReq, verifyToken } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req: Request) {
  await connectDB();

  const token = getTokenFromReq(req);
  if (!token) return NextResponse.json({ valid: false }, { status: 401 });

  const decoded = verifyToken(token);
  if (!decoded) return NextResponse.json({ valid: false }, { status: 401 });

  const user = await User.findById(decoded.id).select("-password");
  if (!user) return NextResponse.json({ valid: false }, { status: 404 });

  return NextResponse.json({ valid: true, user });
}
