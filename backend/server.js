import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./config/db-config.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";

// App Config
const app = express();
const port = process.env.PORT || 4500;
connectDb();

// Middlewares
app.use(express.json());
app.use(cors());

// API Endpoints
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Welcome back to our API...");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
