"use client";

import { useState } from "react";
import { IReview } from "@/models/Products";

interface UseReviewsReturn {
  addReview: (productId: string, review: IReview) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useReviews = (): UseReviewsReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addReview = async (productId: string, review: IReview) => {
    try {
      setLoading(true);
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, ...review }),
      });
      if (!res.ok) throw new Error("Failed to add review");
    } catch (err) {
      setError("Error submitting review");
    } finally {
      setLoading(false);
    }
  };

  return { addReview, loading, error };
};
