import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Products";

export async function GET() {
  await connectDB();
  const products = await Product.find();
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  try {
      await connectDB();
    const data = await req.json();

    const existProduct = await Product.findOne({ label: data.label });

    if (existProduct) {
      return NextResponse.json({ error: "Product with this label already exists" }, { status: 400 });
    }
    const product = await Product.create(data);
    await product.save();
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
