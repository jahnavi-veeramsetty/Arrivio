import mongoose from "mongoose";

const citySchema = new mongoose.Schema(
  {
    name: String,
    slug: String,
    description: String,
    startingPrice: Number,
    image: String,
    totalUnits: Number,
    isActive: Boolean
  },
  { timestamps: true }
);

export default mongoose.model("City", citySchema);
