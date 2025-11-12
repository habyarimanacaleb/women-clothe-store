// components/admin/StatCard.tsx
"use client";

import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

export default function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
      <div>
        <h3 className="text-sm text-gray-500">{title}</h3>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
      {icon && <div className="text-gray-400 text-3xl">{icon}</div>}
    </div>
  );
}
