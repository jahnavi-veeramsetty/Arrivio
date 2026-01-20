import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    citySlug: {
      type: String,
      required: true,
      lowercase: true,
    },

    price: {
      type: Number,
      required: true,
    },

    rating: {
      type: Number,
      default: 4.5,
    },

    image: {
      type: String,
      required: true,
    },

    furnished: {
      type: Boolean,
      default: false,
    },

    parking: {
      type: Boolean,
      default: false,
    },

    wifi: {
      type: Boolean,
      default: true,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
