import React from "react";
import ProductCard, { ProductCardProps } from "../common/ProductCard";

interface CategorySectionProps {
  title: string;
  products: ProductCardProps[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ title, products }) => {
  return (
    <section className="py-10 px-5 md:px-16">
      <h2 className="text-2xl font-semibold mb-6 text-[#2C2C2C]">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((item, index) => (
          <ProductCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
