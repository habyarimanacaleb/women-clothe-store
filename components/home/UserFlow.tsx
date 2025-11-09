"use client";

import { ShoppingBag, MessageCircle, Truck } from "lucide-react";

const steps = [
  {
    icon: ShoppingBag,
    title: "Browse & Select",
    description:
      "Explore our exclusive women’s collection — find your favorite outfit from dresses to summer sets.",
  },
  {
    icon: MessageCircle,
    title: "Order via WhatsApp",
    description:
      "Click the WhatsApp icon on your chosen product to chat directly with our store and confirm your order.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Receive your order quickly and enjoy the confidence of Chic Couture Trends style!",
  },
];

export default function UserFlow() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-2xl font-semibold mb-12 text-gray-800">
          How to Order
        </h2>

        <div className="flex flex-col md:flex-row justify-center gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center max-w-sm"
            >
              <div className="bg-purple-100 p-6 rounded-full mb-4">
                <step.icon size={40} className="text-purple-700" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
