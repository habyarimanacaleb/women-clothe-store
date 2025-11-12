import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  image: string;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  image: { type: String, required: true },
});

export default mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);
