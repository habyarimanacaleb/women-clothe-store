"use client";

import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";
import UploadImage from "@/components/common/UploadImage";

interface Product {
  _id?: string;
  name: string;
  price: number;
  stock: number;
  image: string;
  description: string;
}

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Product>({
    name: "",
    price: 0,
    stock: 0,
    image: "",
    description: "",
  });

  // Fetch products
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete product");
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Open modal for edit or add
  const openModal = (product?: Product) => {
    setEditingProduct(product || null);
    setFormData(
      product || { name: "", price: 0, stock: 0, image: "", description: "" }
    );
    setModalOpen(true);
  };

  // Handle form change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  // Handle image upload
  const handleImageUpload = (url: string) => {
    setFormData((prev) => ({ ...prev, image: url }));
  };

  // Save product (create or update)
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const method = editingProduct ? "PUT" : "POST";
      const url = editingProduct
        ? `/api/products/${editingProduct._id}`
        : "/api/products";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save product");

      fetchProducts();
      setModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
        <div className="h-48 bg-gray-200 rounded-xl"></div>
        <div className="h-48 bg-gray-200 rounded-xl"></div>
        <div className="h-48 bg-gray-200 rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Add Product Button */}
      <div className="flex justify-end">
        <button
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={() => openModal()}
        >
          <FaPlus /> Add Product
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow p-4 flex flex-col"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-48 w-full object-cover rounded"
            />
            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            <p className="text-gray-500 mt-1">{product.description}</p>
            <p className="mt-1 font-semibold">Price: RWF {product.price}</p>
            <p className="mt-1 text-sm text-gray-600">Stock: {product.stock}</p>

            <div className="mt-3 flex justify-end gap-2">
              <button
                onClick={() => openModal(product)}
                className="text-blue-500 hover:text-blue-700 flex items-center border px-2 rounded-sm"
              >
                <FaEdit className="mr-1"/>
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id!)}
                className="text-red-500 hover:text-red-700 flex items-center border px-2 rounded-sm"
              >
                <FaTrash className="mr-1"/>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setModalOpen(false)}
            >
              <FaTimes />
            </button>

            <h2 className="text-xl font-semibold mb-4">
              {editingProduct ? "Edit Product" : "Add Product"}
            </h2>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                name="name"
                placeholder="Product Name / label"
                value={formData.name}
                onChange={handleChange}
                className="border px-3 py-2 rounded"
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className="border px-3 py-2 rounded"
              />
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={formData.stock}
                onChange={handleChange}
                className="border px-3 py-2 rounded"
              />

              {/* Cloudinary Upload */}
              <UploadImage key={formData.image} onUpload={handleImageUpload} />

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="border px-3 py-2 rounded"
              />
            </div>

            <button
              onClick={handleSave}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
