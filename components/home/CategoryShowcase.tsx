"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { Suspense } from "react";
import { useCategories } from "@/lib/hooks/useCategory";

const categoryImage = [
  { img: "/assets/images/category-youth-C4gUNjqm.jpg" },
  { img: "/assets/images/bernd-dittrich-HvLvBLfHdgs-unsplash.jpg" },
  { img: "/assets/images/category-youth-C4gUNjqm.jpg" },
  { img: "/assets/images/category-women-CwbBwS-K.jpg" },
  { img: "/assets/images/bernd-dittrich-HvLvBLfHdgs-unsplash.jpg" },
  { img: "/assets/images/category-youth-C4gUNjqm.jpg" },
];

function CategoriesGrid() {
  const navigate = useRouter();
  const { categories, error, loading } = useCategories();

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (loading) return <CategorySkeleton />;

  const handleClick = (categoryName: string) => {
    // Navigate to collection page with category query
    navigate.push(`/collection?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
      {categories.map((cat, i) => (
        <div
          key={i}
          onClick={() => handleClick(cat.name)}
          className="group cursor-pointer rounded-2xl bg-white shadow hover:border border-purple-400 transition-border duration-300 p-3"
        >
          <div className="relative w-full h-40 overflow-hidden rounded-xl">
            <Image
              height={300}
              width={300}
              src={categoryImage[i % categoryImage.length].img}
              alt={cat.name}
              className="object-cover w-full h-full"
            />
          </div>
          <p className="mt-3 text-sm font-medium text-gray-700 group-hover:text-purple-700">
            {cat.name}
          </p>
        </div>
      ))}
    </div>
  );
}

function CategorySkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-2xl bg-gray-200 h-52"></div>
      ))}
    </div>
  );
}

export default function CategoryShowcase() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-2xl font-semibold mb-8 text-gray-800">
          Shop by Category
        </h2>
        <Suspense fallback={<CategorySkeleton />}>
          <CategoriesGrid />
        </Suspense>
      </div>
    </section>
  );
}
