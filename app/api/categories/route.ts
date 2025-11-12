import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Category, { ICategory } from "@/models/Category";

export async function GET() {
  await connectDB();
  const categories = await Category.find();
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  const data : ICategory = await req.json();
  await connectDB();
  const existCategory = await Category.findOne({ name: data.name });

  if (existCategory) {
    return NextResponse.json({ error: "Category with this name already exists" }, { status: 400 });
  }
  const newCategory = await Category.create(data);
  await newCategory.save();

  return NextResponse.json(newCategory);
}
