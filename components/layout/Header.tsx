"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const categories = [
    "Dresses",
    "Tops & Shirts",
    "Trousers & Sets",
    "Summer Wear",
    "Outerwear",
    "Streetwear",
    "Traditional & Modest",
    "Accessories",
  ];

  return (
    <header className="fixed top-0 z-50 w-full bg-[#EADBC8] shadow-md backdrop-blur-sm">
      <div className="flex items-center justify-between px-5 md:px-12 py-3">
        
        {/* 🪞 Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/">
            <Image
              src="/assets/logo.svg"
              height={65}
              width={85}
              alt="Chic Couture Logo"
              className="cursor-pointer"
            />
          </Link>
          <span className="text-2xl font-bold text-purple-700">
            Chic Couture Trends
          </span>
        </div>

        {/* 📱 Mobile Menu Toggle */}
        <button
          className="md:hidden flex flex-col space-y-1 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`h-0.5 w-6 bg-black transition-transform duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-black transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-black transition-transform duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>

        {/* 💎 Desktop Navbar */}
        <nav className="hidden md:flex items-center space-x-6 text-[#040605] font-light">
          {/* Category Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center gap-1 border border-gray-300 bg-white px-4 py-2 text-[#040605] font-light rounded-md shadow-sm hover:bg-gray-100 focus:outline-none"
            >
              Categories
              <svg
                className="w-5 h-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 animate-fadeIn">
                <div className="py-1">
                  {categories.map((cat) => (
                    <Link
                      key={cat}
                      href={`/collection`}
                      className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition"
                      onClick={() => setIsOpen(false)}
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Search Bar */}
          <form className="hidden lg:flex items-center bg-transparent border border-gray-300 rounded-md px-3 py-1 w-64">
            <Image
              src="/assets/icons/Search.svg"
              alt="Search icon"
              width={18}
              height={18}
            />
            <input
              type="text"
              placeholder="Search for products..."
              className="ml-2 w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
            />
          </form>

          {/* Nav Links */}
          <Link href="/collection" className="hover:text-purple-700 transition text-lg">
            Collection
          </Link>
          <Link href="/about" className="hover:text-purple-700 transition text-lg">
            About
          </Link>

          {/* Sign In */}
          <Link href="/register">
            <button className="py-1 px-4 border-2 border-purple-700 text-[#040605] rounded-md hover:bg-purple-700 hover:text-white transition duration-300">
              Sign In
            </button>
          </Link>

          {/* Cart */}
          <div
            role="button"
            aria-label="Shopping cart"
            className="relative hover:scale-110 transition"
          >
            <Image
              alt="shopping cart"
              src="/assets/icons/Shopping-cart.svg"
              width={24}
              height={24}
            />
            <span className="absolute -top-2 -right-2 bg-purple-700 text-white text-xs rounded-full px-1.5">
              {""}
            </span>
          </div>
        </nav>
      </div>

      {/* 📱 Mobile Menu Overlay */}
      {menuOpen && (
        <div className="md:hidden bg-[#EADBC8] border-t border-gray-200 shadow-inner animate-fadeIn flex flex-col px-6 py-4 space-y-3">
          <Link
            href="/collection"
            className="text-lg text-[#040605] hover:text-purple-700"
            onClick={() => setMenuOpen(false)}
          >
            Collection
          </Link>
          <Link
            href="/about"
            className="text-lg text-[#040605] hover:text-purple-700"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>

          {/* Mobile Category Menu */}
          <div className="flex flex-col border-t border-gray-300 pt-3">
            <h3 className="font-semibold text-[#040605] mb-2">Categories</h3>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/collection`}
                className="text-gray-700 hover:text-purple-700 py-1"
                onClick={() => setMenuOpen(false)}
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Sign In + Cart */}
          <div className="flex items-center justify-between border-t border-gray-300 pt-3">
            <Link href="/register">
            <button className="py-1 px-4 border-2 border-purple-700 text-[#040605] rounded-md hover:bg-purple-700 hover:text-white transition duration-300">
              Sign In
            </button>
          </Link>
            <div role="button" aria-label="Shopping cart" className="relative">
              <Image
                alt="shopping cart"
                src="/assets/icons/Shopping-cart.svg"
                width={28}
                height={28}
              />
              <span className="absolute -top-2 -right-2 bg-purple-700 text-white text-xs rounded-full px-1.5">
                {""}
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
