import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartData: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
    minimize: false, // keep empty objects in the document when saved
  }
);

const User = mongoose.model("User", userSchema);

export default User;
