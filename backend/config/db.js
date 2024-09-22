import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(`${process.env.DATABASE_URI}`);

    console.log("Database connected successfully");

    mongoose.connection.on("connected", () => {
      console.log("Database connected successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.error("Database connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Database disconnected");
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
};

// Export the function
export default connectDb;
