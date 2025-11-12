"use client";

import React, { useEffect, useState } from "react";
import StatCard from "./StatCard";
import { FaUsers } from "react-icons/fa";

interface Client {
  name: string;
  email: string;
  role: string;
}

export default function ClientStats() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("/api/clients", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        const data = await res.json();
        console.log("Clients data:", data);

        // ✅ Ensure the response is an array before setting state
        if (Array.isArray(data)) {
          setClients(data);
        } else {
          console.warn("Unexpected response:", data);
          setClients([]);
        }
      } catch (err) {
        console.error("Error fetching clients:", err);
        setClients([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const totalClients = clients.length;
  const totalAdmins = clients.filter((c) => c.role === "admin").length;

  return loading ? (
    <div className="animate-pulse space-y-2">
      <div className="h-24 bg-gray-200 rounded-xl"></div>
    </div>
  ) : (
    <div className="grid grid-cols-1 gap-4">
      <StatCard title="Total Clients" value={totalClients} icon={<FaUsers />} />
      <StatCard title="Total Admins" value={totalAdmins} />
    </div>
  );
}
