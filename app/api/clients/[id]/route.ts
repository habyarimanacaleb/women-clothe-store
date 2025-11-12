// app/api/clients/[id]/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { verifyToken, getTokenFromReq } from "@/lib/auth";
import { logAction } from "@/lib/logAction";
import bcrypt from "bcryptjs";

async function getDecoded(req: Request) {
  const token = getTokenFromReq(req);
  if (!token) return null;
  return verifyToken(token);
}

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const decoded = await getDecoded(_ as Request);
  if (!decoded) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // admin or owner
  if (decoded.role !== "admin" && decoded.id !== id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const user = await User.findById(id).select("-password");
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(user);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const decoded = await getDecoded(req);
  if (!decoded) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (decoded.role !== "admin" && decoded.id !== id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const data = await req.json();
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  const updated = await User.findByIdAndUpdate(id, data, { new: true }).select("-password");
  await logAction("admin:user:update", { userId: decoded.id, meta: { target: id } });
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const decoded = await getDecoded(_ as Request);
  if (!decoded) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (decoded.role !== "admin" && decoded.id !== id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await User.findByIdAndDelete(id);
  await logAction("admin:user:delete", { userId: decoded.id, meta: { target: id } });

  return NextResponse.json({ ok: true, message: "Deleted" });
}
