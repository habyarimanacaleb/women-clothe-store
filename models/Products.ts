import mongoose, { Schema, Document } from "mongoose";

export interface IReview {
  user: string;
  comment: string;
  rating: number;
}

export interface IProduct extends Document {
  sku: string;
  image: string;
  price: string;
  label: string;
  stock: number;
  description: string;
  category: string;
  reviews: IReview[];
}

const ReviewSchema = new Schema<IReview>({
  user: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true },
});

const ProductSchema = new Schema<IProduct>(
  {
    sku: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    price: { type: String, required: true },
    label: { type: String, required: true },
    stock: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    reviews: [ReviewSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);
