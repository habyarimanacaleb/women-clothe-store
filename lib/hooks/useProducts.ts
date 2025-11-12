"use client";

import { useEffect, useState } from "react";
import { IProduct } from "@/models/Products";

interface UseProductsReturn {
  products: IProduct[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  addProduct: (product: Partial<IProduct>) => Promise<void>;
  updateProduct: (id: string, data: Partial<IProduct>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

export const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Partial<IProduct>) => {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (!res.ok) throw new Error("Failed to add product");
      await fetchProducts();
    } catch (err) {
      setError("Error adding product");
    }
  };

  const updateProduct = async (id: string, data: Partial<IProduct>) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update product");
      await fetchProducts();
    } catch (err) {
      setError("Error updating product");
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");
      await fetchProducts();
    } catch (err) {
      setError("Error deleting product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, fetchProducts, addProduct, updateProduct, deleteProduct };
};
