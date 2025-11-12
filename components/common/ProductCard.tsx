"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export interface ProductCardProps {
  image: string;
  price: string;
  label: string;
  id: string;
  stock: number;
  description: string;
  reviews?: { user: string; comment: string; rating: number }[];
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  price,
  label,
  id,
}) => {
  const route = useRouter();
  const navigate = route.push;

  const [loading, setLoading] = React.useState(false);
  return (
    <div
      className="border rounded-lg shadow-sm hover:shadow-md transition overflow-hidden bg-white"
      onClick={() => navigate(`/product/${id}`)}
    >
      <Image
        src={image}
        alt={label}
        width={300}
        height={300}
        className="w-full h-60 object-cover hover:scale-105 transition duration-300"
      />
      <div className="p-4">
        <div className="mb-4 flex items-center justify-around">
          <h3 className="text-lg font-medium text-gray-800 mb-2">{label}</h3>
          <p className="text-gray-700 font-semibold mb-2">Frw {price}</p>
        </div>
        <button
          className="bg-purple-700 cursor-pointer hover:bg-purple-800 text-white px-4 py-2 rounded-md text-sm transition flex justify-center items-center mx-auto"
          onClick={(e) => {
            e.stopPropagation();
            setLoading(true);
            navigate(`/product/${id}`);
          }}
        >
          {loading ? (
            <>
            <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div> 
            <span className="ml-2">Shopping...</span>
            </>

          ) : (
            "Shop Now"
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
