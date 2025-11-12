// app/api/analytics/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Analytics from "@/models/User.analytics";
import { getTokenFromReq, verifyToken } from "@/lib/auth";

export async function GET(req: Request) {
  await connectDB();

  // 🔒 Extract and verify token
  const token = getTokenFromReq(req);
  const decoded = token ? verifyToken(token) : null;

  if (!decoded || decoded.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 🧠 Time range for last 30 days
  const today = new Date();
  const past30Days = new Date();
  past30Days.setDate(today.getDate() - 29);

  // 🔢 Aggregate daily stats for chart
  const dailyStats = await Analytics.aggregate([
    {
      $match: { createdAt: { $gte: past30Days, $lte: today } },
    },
    {
      $group: {
        _id: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          type: "$type",
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.date": 1 } },
  ]);

  // 🧩 Transform into frontend-friendly array
  const grouped: Record<string, { visits: number; whatsappClicks: number }> = {};

  dailyStats.forEach((item) => {
    const date = item._id.date;
    if (!grouped[date]) grouped[date] = { visits: 0, whatsappClicks: 0 };

    if (item._id.type === "visit") grouped[date].visits = item.count;
    if (item._id.type === "whatsappClick")
      grouped[date].whatsappClicks = item.count;
  });

  // Convert to array for chart
  const chartData = Object.entries(grouped).map(([date, counts]) => ({
    date,
    visits: counts.visits,
    whatsappClicks: counts.whatsappClicks,
  }));

  // ✅ Return chartData only (frontend expects array)
  return NextResponse.json(chartData);
}
