import Image from "next/image";
import React from "react";

export interface ProductCardProps {
  image: string;
  price: string;
  label: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, price, label }) => {
  return (
    <div className="border rounded-lg shadow-sm hover:shadow-md transition overflow-hidden bg-white">
      <Image
        src={image}
        alt={label}
        width={300}
        height={300}
        className="w-full h-60 object-cover"
      />
      <div className="p-4 text-center">
        <p className="text-gray-700 font-semibold mb-2">Frw {price}</p>
        <button className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-md text-sm transition">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
