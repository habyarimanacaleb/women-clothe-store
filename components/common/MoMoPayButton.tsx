"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

interface MoMoPayButtonProps {
  amount: string; 
  productName:string;
}

export default function MoMoPayButton({ amount,productName }: MoMoPayButtonProps) {
  const [isPaying, setIsPaying] = useState(false);
  const [phone, setPhone] = useState("");

  const handlePayment = async () => {
    const parsePrice = (priceStr: string) => Number(priceStr.replace(/,/g, ""));

    if (!phone) return toast.error("Enter your phone number!");

    try {
      setIsPaying(true);

      const res = await fetch("/api/momo/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount:parsePrice(amount), phoneNumber: phone }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        toast.error(`Payment failed: ${json.status || json.error}`);
        return;
      }

      if (json.status === "SUCCESSFUL") {
        toast.success("✅ Payment successful!");
      } else {
        toast.error(`Payment ${json.status.toLowerCase()}`);
      }
    } catch (err: any) {
      toast.error(err.message || "Payment failed");
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-md w-full max-w-sm">
      <h2 className="text-xl font-semibold mb-3">{`Pay ${productName} with MoMo`}</h2>

      <input
        type="tel"
        placeholder="Enter MTN number (e.g. 078xxxxxxx)"
        value={phone}
        name="phoneNumber"
        onChange={(e) => setPhone(e.target.value)}
        className="w-full border rounded-md p-2 mb-3"
      />

      <button
        onClick={handlePayment}
        disabled={isPaying}
        className="w-full bg-yellow-500 hover:bg-yellow-600 font-semibold p-2 rounded-lg transition-all border-2"
      >
        {isPaying ? "Processing..." : `Pay RWF ${amount} with MoMo`}
      </button>
    </div>
  );
}
