"use client";

import React, { useState, useEffect } from "react";
import ProductManagement from "@/components/admin/ProductManager";
import { useProducts } from "@/lib/hooks/useProducts";
import { useCategories } from "@/lib/hooks/useCategory";

export default function AdminProductPage() {
  const { products, fetchProducts, loading: productsLoading } = useProducts();
  const { categories, loading: categoriesLoading } = useCategories();

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (selectedCategory === "All") {
      fetchProducts(); 
    } else {
      fetchProducts();
    }
  }, [selectedCategory]);

  if (productsLoading || categoriesLoading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading products...
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 pb-6 mt-40">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-md px-4 py-2 w-full md:w-1/3"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          key="All"
          className={`px-4 py-2 rounded-md font-medium ${
            selectedCategory === "All"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setSelectedCategory("All")}
        >
          All
        </button>
        {categories.map((cat,i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded-md font-medium ${
              selectedCategory === cat.name
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setSelectedCategory(cat.name)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Product Management Table / Grid */}
      <ProductManagement />
    </div>
  );
}
