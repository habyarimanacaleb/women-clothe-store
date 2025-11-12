// app/admin/dashboard/page.tsx
"use client";

import React from "react";
import DashboardLayout from "@/components/admin/DashboardLayout";
import ProductStats from "@/components/admin/ProductStats"; // We'll create this
import ClientStats from "@/components/admin/ClientStats";
import WebsiteAnalytics from "@/components/admin/WebsiteAnalytics";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProductStats />
        <ClientStats />
        <WebsiteAnalytics />
      </div>
    </DashboardLayout>
  );
}
