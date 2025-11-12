// components/admin/DashboardLayout.tsx
"use client";

import React, { ReactNode } from "react";
import Sidebar from "@/components/admin/Sidebar"; 
import Navbar from "@/components/admin/Navbar";   

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex mt-32 h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
