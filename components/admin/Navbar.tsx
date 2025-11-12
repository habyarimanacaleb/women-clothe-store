// components/admin/Navbar.tsx
"use client";

import React from "react";

export default function Navbar() {
  return (
    <header className="bg-white shadow flex items-center justify-between p-4">
      <h1 className="text-xl font-semibold text-gray-700">Dashboard</h1>
      <div className="flex items-center gap-4">
        <div className="text-gray-600">Admin Name</div>
        {/* Optionally add profile picture or settings icon */}
      </div>
    </header>
  );
}
