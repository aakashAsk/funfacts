import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI; // Set this in .env file

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env file");
}

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "Facthub", // Change this to your actual DB name
    });
    console.log("📌 MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
  }
};
