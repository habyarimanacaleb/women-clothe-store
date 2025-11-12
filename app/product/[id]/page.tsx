"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import React from "react";
import { Star, User } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import { useProducts } from "@/lib/hooks/useProducts";
import PayWithMomoButton from "@/components/common/MoMoPayButton";
import { useRouter } from "next/navigation";

const ProductDetailPage = () => {
  const { id } = useParams();
  const router = useRouter()
  const [loading, setLoading] = React.useState(false);
  const [reviewData, setReviewData] = React.useState({ user: "", comment: "", rating: 0 });
const { products } = useProducts();
// get single product by id
  const product = products.find((item) => item.sku === id);
  if (!product) {
    return <div className="pt-40 text-center">Product not found.</div>;
  }

  const openWhatsApp = () => {
    const message = `Hello! I'm interested in buying "${product.label}" priced at Frw ${product.price}. Is it available?`;
    window.open(
      `https://wa.me/250786015225?text=${encodeURIComponent(message)}`
    );
  };
  //pay with momo
  // handle payment with momo
  const handleMomoPy = ()=>{
    router.push('/pay/momo')
  }

  const handleReviewSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!reviewData.user || !reviewData.comment || reviewData.rating === 0) {
      toast.error("Please fill in all review fields.");
      return;
    }
    setLoading(true);
    // Simulate review submission process
    setTimeout(() => {
      setLoading(false);
      toast.success("Review submitted successfully!");
        // Clear form
        setReviewData({ user: "", comment: "", rating: 0 });
    }, 2000);
  };


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="py-4"></div>
      <div className="min-h-screen bg-gray-50 py-12 px-5 mt-12 md:px-20 flex flex-col md:flex-row gap-10">
        {/* Image Section */}
        <div className="md:w-1/2">
          <Image
            src={product.image}
            alt={product.label}
            width={500}
            height={500}
            className="rounded-lg shadow-md object-cover w-full h-[500px]"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-4">
            {/* Additional images or thumbnails can be added here if available */}
            {[1, 2, 3, 4].map((num) => (
              <Image
                key={num}
                src={product.image}
                alt={`${product.label} ${num}`}
                width={200}
                height={200}
                className="inline-block rounded-lg shadow-md object-cover m-2"
              />
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="md:w-1/2 space-y-5">
          <h1 className="text-3xl font-semibold text-gray-800">
            {product.label}
          </h1>
          <p className="text-purple-700 text-2xl font-bold">
            Frw {product.price}
          </p>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
          <p className="text-sm text-gray-500">
            <strong>Stock:</strong>{" "}
            {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
          </p>

          <div className="flex flex-col items-center justify-center space-y-4">
          <button
            onClick={openWhatsApp}
            className="bg-green-600 flex items-center space-x-4 hover:bg-green-700 text-white px-6 py-3 rounded-md transition"
          >
            <BsWhatsapp size={28} />
            <span>Buy via WhatsApp</span>
          </button>
          <div className="flex space-x-4 items-center justify-center">
            <span>OR</span>
          </div>
            <PayWithMomoButton amount={product.price} productName={product.label} />
          </div>

          {/* Reviews */}
          {product.reviews && product.reviews.length > 0 && (
            <div className="mt-6 border-t border-gray-200 pt-4">
              <h2 className="text-lg font-semibold mb-3 text-gray-800">
                Customer Reviews
              </h2>
              {product.reviews.map((review, i) => (
                <div key={i} className="mb-3">
                  <p className="flex items-center gap-2 mb-1">
                    <User
                      size={32}
                      className="text-gray-800 font-bold border border-purple-500 rounded-full"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-700">
                        {review.user}
                      </span>
                      <span className="flex text-yellow-500">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={16} fill="gold" />
                        ))}
                      </span>
                    </div>
                  </p>
                  <p className="text-gray-600 text-sm mb-2">{review.comment}</p>
                </div>
              ))}
            </div>
          )}

          {product.reviews.length === 0 && (
            <div className="mt-6 border-t border-gray-200 pt-4">
              <h2 className="text-lg font-semibold mb-3 text-gray-800">
                Customer Reviews
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                No reviews yet. Be the first to review this product!
              </p>
            </div>
          )}

          {/*Add you review here*/}
          <div className="mt-6 border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Add Your Review
            </h2>
            <form className="flex flex-col space-y-4" onSubmit={handleReviewSubmit}>
            <input
              type="text"
              className="w-full border rounded-md p-2 mb-2 focus-within:border-purple-600 focus-visible:border-purple-600"
              placeholder="Your Name"
            />
            <div className="flex flex-col">
                <label className="block mb-1 font-medium text-gray-700">Rating:</label>
                <select
                  className="w-full border rounded-md p-2 focus-within:border-purple-600 focus-visible:border-purple-600"
                    value={reviewData.rating}
                    onChange={(e) => setReviewData({ ...reviewData, rating: parseInt(e.target.value) })}
                >
                  <option value={0}>Select Rating</option>
                  <option value={1}>1 - Poor</option>
                  <option value={2}>2 - Fair</option>
                  <option value={3}>3 - Good</option>
                  <option value={4}>4 - Very Good</option>
                  <option value={5}>5 - Excellent</option>
                </select>
            </div>
            <textarea
              className="w-full border rounded-md p-2 mb-2 focus-within:border-purple-600 focus-visible:border-purple-600"
              rows={4}
              placeholder="Write your review here..."
            ></textarea>
            <button className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-md transition">
              {loading ? "Submitting..." : "Submit Review"}
            </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
