// app/api/clients/login/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { signToken } from "@/lib/auth";
import { logAction } from "@/lib/logAction";

export async function POST(req: Request) {
  await connectDB();
  const { email, password } = await req.json();

  if (!email || !password) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = signToken({ id: String(user._id), role: user.role });

  await logAction("auth:login", { userId: String(user._id), meta: { email: user.email } });

  return NextResponse.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
}
