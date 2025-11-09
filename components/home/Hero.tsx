import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero: React.FC = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center"
      style={{ backgroundImage: "url('/assets/images/gif/women-store-hero.gif')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/2 bg-opacity-30"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl px-6 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Discover Your Perfect Style with{" "}
          <span className="text-purple-400">Chic Couture Trends</span>
        </h1>
        <p className="text-lg md:text-xl mb-6 font-light">
          From everyday essentials to statement outfits — redefine your style  with elegance and confidence.
        </p>
        <div className="flex justify-center space-x-4 mt-6">
          <Link href="/collection">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md shadow-md transition">
              Shop Collection
            </button>
          </Link>
          <Link href="/about">
            <button className="bg-white text-purple-700 border border-purple-700 px-6 py-3 rounded-md hover:bg-purple-100 transition">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
