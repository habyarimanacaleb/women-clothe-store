// components/admin/Sidebar.tsx
"use client";

import React from "react";
import Link from "next/link";
import { FaBox, FaUsers, FaChartLine, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "@/lib/context/AuthContext";

export default function Sidebar() {
  const { logout } = useAuth();
  return (
    <aside className="w-64 bg-white shadow flex flex-col">
      <div className="p-6 text-xl font-bold text-gray-800">Admin Panel</div>
      <nav className="flex-1 px-4 space-y-2">
        <Link href="/admin/products" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
          <FaBox /> Products
        </Link>
        <Link href="/admin/clients" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
          <FaUsers /> Clients
        </Link>
        <Link href="/admin/analytics" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
          <FaChartLine /> Analytics
        </Link>
        <div onClick={logout}  className="flex items-center gap-2 p-2 rounded hover:bg-red-100 text-red-600">
          <FaSignOutAlt /> Logout
        </div>
      </nav>
    </aside>
  );
}
