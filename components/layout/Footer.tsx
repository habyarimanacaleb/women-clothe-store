import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaFacebook, FaTwitter, FaTiktok } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#EADBC8] text-[#040605] mt-20 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div>
          <Link href="/">
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="/assets/logo.svg"
                alt="Chic Couture Trends logo"
                width={60}
                height={60}
              />
              <span className="text-xl font-semibold text-purple-700">
                Chic Couture Trends
              </span>
            </div>
          </Link>
          <p className="text-sm text-gray-700 leading-relaxed">
            Redefining women’s fashion with elegance, confidence, and comfort —
            from college chic to mature sophistication.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3 text-purple-700">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-800">
            <li>
              <Link href="/" className="hover:text-purple-700 transition">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/collection"
                className="hover:text-purple-700 transition"
              >
                Collection
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-purple-700 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-purple-700 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold text-lg mb-3 text-purple-700">
            Newsletter
          </h3>
          <p className="text-sm text-gray-700 mb-4">
            Get exclusive updates and early access to new collections.
          </p>
          <form className="flex items-center border border-gray-300 rounded-md overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="grow px-3 py-2 text-sm outline-none bg-white"
            />
            <button
              type="submit"
              className="bg-purple-700 hover:bg-purple-800 text-white text-sm px-4 py-2 transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold text-lg mb-3 text-purple-700">
            Follow Us
          </h3>
          <div className="flex space-x-4 text-purple-700 text-2xl">
            <Link href="https://instagram.com" target="_blank">
              <FaInstagram className="hover:text-purple-900 transition" />
            </Link>
            <Link href="https://facebook.com" target="_blank">
              <FaFacebook className="hover:text-purple-900 transition" />
            </Link>
            <Link href="https://twitter.com" target="_blank">
              <FaTwitter className="hover:text-purple-900 transition" />
            </Link>
            <Link href="https://tiktok.com" target="_blank">
              <FaTiktok className="hover:text-purple-900 transition" />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[#D9C4B0] text-center py-4 text-sm text-gray-800 border-t border-gray-200">
        © {new Date().getFullYear()} Chic Couture Trends. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
