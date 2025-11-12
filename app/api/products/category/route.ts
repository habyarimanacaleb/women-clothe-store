// app/api/product/category/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Products";

export async function GET(req: Request) {
  await connectDB();

  try {
    const url = new URL(req.url);
    const categoryName = url.searchParams.get("category");

    if (!categoryName) {
      return NextResponse.json(
        { error: "Category query parameter is required" },
        { status: 400 }
      );
    }

    const regex = new RegExp(`^${categoryName}$`, "i");

    let products = await Product.find({
      $or: [{ category: regex }, { "category.name": regex }],
    })
      .populate({
        path: "category",
        match: { name: regex },
      })
      .sort({ createdAt: -1 });

    products = products.filter((p) => p.category !== null);

    return NextResponse.json(products);
  } catch (err) {
    console.error("Error fetching products by category:", err);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
