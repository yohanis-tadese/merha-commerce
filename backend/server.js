import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./config/db.js";
import cloudinary from "./config/cloudinary.js";

// App Config
const app = express();
const port = process.env.PORT || 4500;
connectDb();
cloudinary;

// Middlewares
app.use(express.json());
app.use(cors());

// API Endpoints
app.get("/", (req, res) => {
  res.send("Welcome back to our API...");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
