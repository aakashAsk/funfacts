import mongoose, { Schema, model, models } from "mongoose";

// Define the Fact schema
const FactSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    categories: { type: [String], required: true }, 
    userId: { type: String, required: true },
    image: { type: String }, 
    likesCount: { type: String, default: 0 }, 
  },
  { timestamps: true }
);

// Export the Fact model (avoid redefining the model if it already exists)
export const Fact = models.Fact || model("Fact", FactSchema);
