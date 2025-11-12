// app/api/clients/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { signToken } from "@/lib/auth";
import { logAction } from "@/lib/logAction";

export async function POST(req: Request) {
  await connectDB();
  const { name, email, password, phone } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) return NextResponse.json({ error: "Email already registered" }, { status: 409 });

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password: hashed,
    phone,
    role: "user",
  });

  const token = signToken({ id: String(user._id), role: user.role });

  // log registration
  await logAction("auth:register", { userId: String(user._id), meta: { email: user.email } });

  return NextResponse.json({ token, user: { id: String(user._id), name: user.name, email: user.email, role: user.role } }, { status: 201 });
}
