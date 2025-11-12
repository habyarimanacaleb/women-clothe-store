import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Products from "../models/Products"; 
import { allProducts } from "../constant";

// Get MongoDB URI from .env
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in .env");
  process.exit(1);
}

const seedDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Database connected");

    // Remove existing products
    await Products.deleteMany();
    console.log("🧹 Old products removed");

    // Insert new products
    await Products.insertMany(allProducts);
    console.log("🌱 Products seeded successfully");

    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

// Run the seeder
seedDB();
