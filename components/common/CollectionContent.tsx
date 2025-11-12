"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "@/components/common/ProductCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useCategories } from "@/lib/hooks/useCategory";
import { IProduct } from "@/models/Products";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";

const CollectionContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);

  const { categories, loading: categoriesLoading } = useCategories();

  // Fetch products based on category
  const fetchProducts = async (category: string) => {
    try {
      setLoading(true);
      let url = "/api/products";
      if (category !== "All") {
        url = `/api/products/category?category=${encodeURIComponent(category)}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
      setVisibleCount(8);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const categoryQuery = searchParams.get("category") || "All";

  useEffect(() => {
    setSelectedCategory(categoryQuery);
  }, [categoryQuery]);

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const filteredProducts = products
    .filter((product) =>
      product.label.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, visibleCount)
    .map((product, index) => ({
      ...product,
      id: String(product.sku || product._id || `product-${index}`),
    }));

  const fetchMoreProducts = () => setVisibleCount((prev) => prev + 4);

  if (categoriesLoading || loading) {
    return (
      <div className="flex items-center justify-center h-screen space-x-2 text-gray-500">
        <div className="w-8 h-8 animate-spin rounded-full border-2 border-t-transparent border-purple-900"></div>
        <span>Loading collection...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-36 pb-8">
      <div className="flex flex-col md:flex-row items-center justify-between my-12">
        <h1 className="text-4xl font-normal mb-4 md:mb-0">Our Collection</h1>
        <input
          type="text"
          placeholder="Search products..."
          className="border rounded-md px-4 py-2 w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          key="All"
          className={`px-4 py-2 rounded-md font-medium hover:shadow transition-all cursor-pointer duration-500 ease-in-out ${
            selectedCategory === "All"
              ? "bg-purple-800 text-white"
              : "bg-gray-50 text-gray-800"
          }`}
          onClick={() => setSelectedCategory("All")}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={String(cat._id)}
            className={`px-4 py-2 rounded-md font-medium hover:shadow transition-all cursor-pointer duration-500 ease-in-out ${
              selectedCategory === cat.name
                ? "bg-purple-600 text-white"
                : "bg-gray-50 text-gray-800"
            }`}
            onClick={() => setSelectedCategory(cat.name)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500 py-6">No products found.</p>
          <button
            onClick={() => router.push("/")}
            className="flex items-center border cursor-pointer border-gray-400 py-2 px-3 rounded-lg hover:bg-purple-500 hover:text-white transition duration-500 ease-in-out mx-auto"
          >
            <FaArrowLeft size={20} className="mr-3 animate-pulse" />
            Back to home
          </button>
        </div>
      ) : (
        <InfiniteScroll
          dataLength={filteredProducts.length}
          next={fetchMoreProducts}
          hasMore={filteredProducts.length < products.length}
          loader={
            <h4 className="text-center mt-4">Loading more products...</h4>
          }
          endMessage={
            <p className="text-center mt-4">You have seen all products!</p>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default CollectionContent;
