import mongoose, { Schema, model, models } from "mongoose";

const CategorySchema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String }, 
    count: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Category = models.Category || model("Category", CategorySchema);
