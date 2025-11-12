// @ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Products";
import { isValidObjectId } from "mongoose";

interface Params {
  params: { id: string };
}

// GET product by SKU (or _id if needed)
export async function GET(req: NextRequest, { params }: Params) {
  await connectDB();
  const { id } = params;

  // You can choose to find by SKU or _id
  const product = await Product.findOne({ sku: id }) || 
                  (isValidObjectId(id) && await Product.findById(id));
  
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json(product);
}

// UPDATE product by MongoDB _id
export async function PUT(req: NextRequest, { params }: Params) {
  await connectDB();
  const { id } = params;
  const data = await req.json();

  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }

  const updated = await Product.findByIdAndUpdate(id, data, { new: true });
  if (!updated) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json(updated);
}

// DELETE product by MongoDB _id
export async function DELETE(req: NextRequest, { params }: Params) {
  await connectDB();
  const { id } = params;

  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }

  const deleted = await Product.findByIdAndDelete(id);
  if (!deleted) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Deleted successfully" });
}
