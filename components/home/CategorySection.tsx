"use client";

import React from "react";
import Slider from "react-slick";
import ProductCard, { ProductCardProps } from "../common/ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CategorySectionProps {
  title: string;
  products: ProductCardProps[];
}


const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-purple-700 text-white rounded-full p-2 cursor-pointer hover:bg-purple-800 transition"
    onClick={onClick}
  >
    <ChevronRight size={22} />
  </div>
);

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-purple-700 text-white rounded-full p-2 cursor-pointer hover:bg-purple-800 transition"
    onClick={onClick}
  >
    <ChevronLeft size={22} />
  </div>
);

const CategorySection: React.FC<CategorySectionProps> = ({ title, products }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
     nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <section className="py-10 px-5 md:px-16">
      <h2 className="text-2xl font-semibold mb-6 text-[#2C2C2C]">{title}</h2>
      <div className="relative">
        <Slider {...settings}>
          {products.map((item, index) => (
            <div key={index} className="px-2">
              <ProductCard {...item} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default CategorySection;
