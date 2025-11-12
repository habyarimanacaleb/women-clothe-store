// lib/logAction.ts
import Analytics from "@/models/User.analytics";
import { connectDB } from "@/lib/mongodb";

export async function logAction(type: string, opts: { userId?: string | null; ip?: string | null; meta?: any } = {}) {
  try {
    await connectDB();
    await Analytics.create({ type, userId: opts.userId ?? null, ip: opts.ip ?? null, meta: opts.meta ?? {} });
  } catch (err) {
    // don't block user flow if logging fails; optionally console.error
    console.error("logAction error:", err);
  }
}
