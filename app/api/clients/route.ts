// app/api/clients/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { verifyToken, getTokenFromReq } from "@/lib/auth";
import { logAction } from "@/lib/logAction";
import bcrypt from "bcryptjs";

async function requireAdmin(req: Request) {
  const token = getTokenFromReq(req);
  if (!token) return null;
  const decoded = verifyToken(token);
  if (!decoded) return null;
  if (decoded.role !== "admin") return null;
  return decoded;
}

export async function GET(req: Request) {
  await connectDB();
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const users = await User.find({}, { password: 0 }).sort({ createdAt: -1 });
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  await connectDB();
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, email, password, role = "user", phone } = await req.json();
  if (!name || !email || !password) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) return NextResponse.json({ error: "Email already exists" }, { status: 409 });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email: email.toLowerCase(), password: hashed, role, phone });

  await logAction("admin:user:create", { userId: admin.id, meta: { createdUser: String(user._id) } });

  return NextResponse.json({ ok: true, user: { id: user._id, email: user.email, role: user.role } }, { status: 201 });
}
