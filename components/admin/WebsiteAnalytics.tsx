// components/admin/WebsiteAnalytics.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import StatCard from "./StatCard";
import { FaChartLine, FaWhatsapp } from "react-icons/fa";

interface AnalyticsData {
  date: string;
  visits: number;
  whatsappClicks: number;
}

interface Summary {
  totalVisits: number;
  totalClicks: number;
}

export default function WebsiteAnalytics() {
  const [data, setData] = useState<AnalyticsData[]>([]);
  const [summary, setSummary] = useState<Summary>({ totalVisits: 0, totalClicks: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("/api/analytics", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.error("Failed to fetch analytics:", res.statusText);
          return;
        }

        const json = await res.json();

        // ✅ Handle both old and new API structures
        const analyticsData = Array.isArray(json)
          ? json
          : json.chartData || [];

        const summaryData = json.summary || {
          totalVisits: 0,
          totalClicks: 0,
        };

        setData(analyticsData);
        setSummary(summaryData);

        console.log("Analytics data:", analyticsData);
        console.log("Summary data:", summaryData);
      } catch (err) {
        console.error("Error fetching analytics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <div className="animate-pulse h-64 bg-gray-200 rounded-xl"></div>;
  }

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="bg-white p-4 rounded-xl shadow text-gray-500">
        No analytics data available.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 🔹 Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard
          title="Total Visits"
          value={summary.totalVisits}
          icon={<FaChartLine />}
        />
        <StatCard
          title="WhatsApp Clicks"
          value={summary.totalClicks}
          icon={<FaWhatsapp />}
        />
      </div>

      {/* 🔹 Chart Section */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-gray-700 font-semibold mb-4">Website Analytics</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="visits" stroke="#6366F1" name="Visits" />
            <Line
              type="monotone"
              dataKey="whatsappClicks"
              stroke="#EC4899"
              name="WhatsApp Clicks"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
