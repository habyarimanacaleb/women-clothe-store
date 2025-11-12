// app/api/admin/stats/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Analytics from "@/models/User.analytics";
import { verifyToken, getTokenFromReq } from "@/lib/auth";

export async function GET(req: Request) {
  await connectDB();

  const token = getTokenFromReq(req);
  const decoded = token ? verifyToken(token) : null;

  if (!decoded || decoded.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [usersCount, eventsCount, visitsCount, whatsappClicks] = await Promise.all([
    User.countDocuments(),
    Analytics.countDocuments(),
    Analytics.countDocuments({ type: /visit/i }),
    Analytics.countDocuments({ type: /whatsapp/i }),
  ]);

  const dailyEvents = await Analytics.aggregate([
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  return NextResponse.json({
    usersCount,
    eventsCount,
    visitsCount,
    whatsappClicks,
    dailyEvents,
  });
}
