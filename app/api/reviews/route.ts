import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Products";

export async function POST(req: Request) {
  const { productId, user, comment, rating } = await req.json();

  await connectDB();
  const product = await Product.findById(productId);
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

  product.reviews.push({ user, comment, rating });
  await product.save();

  return NextResponse.json({ message: "Review added", product });
}
