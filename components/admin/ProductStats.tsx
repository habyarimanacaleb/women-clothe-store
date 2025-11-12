// components/admin/ProductStats.tsx
"use client";

import React, { useEffect, useState } from "react";
import StatCard from "./StatCard";
import { FaBox } from "react-icons/fa";

interface Product {
  sku: string;
  label: string;
  category: string;
  stock: number;
}

export default function ProductStats() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const totalProducts = products.length;
  const lowStock = products.filter(p => p.stock <= 5).length;

  return loading ? (
    <div className="animate-pulse space-y-2">
      <div className="h-24 bg-gray-200 rounded-xl"></div>
    </div>
  ) : (
    <div className="grid grid-cols-1 gap-4">
      <StatCard title="Total Products" value={totalProducts} icon={<FaBox />} />
      <StatCard title="Low Stock Products" value={lowStock} />
    </div>
  );
}
