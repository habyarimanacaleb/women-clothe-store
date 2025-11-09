// components/CategoryShowcase.tsx
"use client";

import Image from "next/image";

const categories = [
  { name: "Dresses", img: "/assets/images/category-youth-C4gUNjqm.jpg" },
  {
    name: "Complete Sets",
    img: "/assets/images/bernd-dittrich-HvLvBLfHdgs-unsplash.jpg",
  },
  {
    name: "Summer Collection",
    img: "/assets/images/category-youth-C4gUNjqm.jpg",
  },
  { name: "Casual Wear", img: "/assets/images/category-women-CwbBwS-K.jpg" },
  {
    name: "Party & Night Out",
    img: "/assets/images/bernd-dittrich-HvLvBLfHdgs-unsplash.jpg",
  },
  {
    name: "Office & Formal",
    img: "/assets/images/category-youth-C4gUNjqm.jpg",
  },
];

export default function CategoryShowcase() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-2xl font-semibold mb-8 text-gray-800">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="group cursor-pointer rounded-2xl bg-white shadow hover:shadow-lg transition p-3"
            >
              <div className="relative w-full h-40 overflow-hidden rounded-xl">
                <Image
                  src={cat.img}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <p className="mt-3 text-sm font-medium text-gray-700 group-hover:text-purple-700">
                {cat.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
