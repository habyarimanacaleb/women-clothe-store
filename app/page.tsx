import React from "react";
import Hero from "@/components/home/Hero";
import CategorySection from "@/components/home/CategorySection";
import Footer from "@/components/layout/Footer";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import UserFlow from "@/components/home/UserFlow";

const Home: React.FC = () => {
  const collegeProducts = [
    { image: "/assets/images/category-youth-C4gUNjqm.jpg", price: "12,000", label: "Dress" },
    { image: "/assets/images/category-youth-C4gUNjqm.jpg", price: "22,000", label: "Casual Outfit" },
    { image: "/assets/images/category-youth-C4gUNjqm.jpg", price: "19,000", label: "Summer Dress" },
    { image: "/assets/images/category-youth-C4gUNjqm.jpg", price: "25,000", label: "Chic Top" },
  ];

  const workingWomen = [
    { image: "/assets/images/bernd-dittrich-HvLvBLfHdgs-unsplash.jpg", price: "45,000", label: "Formal Suit" },
    { image: "/assets/images/bernd-dittrich-HvLvBLfHdgs-unsplash.jpg", price: "22,000", label: "Office Wear" },
    { image: "/assets/images/bernd-dittrich-HvLvBLfHdgs-unsplash.jpg", price: "32,000", label: "Blouse Set" },
    { image: "/assets/images/bernd-dittrich-HvLvBLfHdgs-unsplash.jpg", price: "40,000", label: "Work Dress" },
  ];

  const matureWomen = [
    { image: "/assets/images/category-women-CwbBwS-K.jpg", price: "17,000", label: "Elegant Dress" },
    { image: "/assets/images/category-women-CwbBwS-K.jpg", price: "15,000", label: "Cultural Dress" },
    { image: "/assets/images/category-women-CwbBwS-K.jpg", price: "32,000", label: "Traditional Set" },
    { image: "/assets/images/category-women-CwbBwS-K.jpg", price: "28,000", label: "African Print" },
  ];

  return (
    <>
    <main>
      <Hero />
      <CategorySection title="College & Early Career" products={collegeProducts} />
      <CategorySection title="Working Women & Moms" products={workingWomen} />
      <CategorySection title="Mature Women" products={matureWomen} />
      <CategoryShowcase />
      <UserFlow />
    </main>
    <Footer />
    </>
  );
};

export default Home;
