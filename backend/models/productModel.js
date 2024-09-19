import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: [
      {
        type: String,
        required: true,
      },
    ],
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    sizes: [
      {
        type: String,
        required: true,
      },
    ],
    bestseller: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Indexing for commonly queried fields
productSchema.index({ name: 1, category: 1 });

const Product = mongoose.model("Product", productSchema);

export default Product;
