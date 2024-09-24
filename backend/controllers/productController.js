import cloudinary from "../config/cloudinary-config.js";
import upload from "../config/multer-config.js";
import Product from "../models/productModel.js";

// Middleware for handling multiple uploads (1 cover + up to 3 images)
const uploadProductImages = upload.fields([{ name: "images", maxCount: 3 }]);

// Create a new product with image uploads
const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
      date,
    } = req.body;

    const parsedSizes = JSON.parse(sizes);

    // Store uploaded image URLs
    const imagesUrl = [];

    // Upload additional images to Cloudinary
    if (req.files.images) {
      // Create an array of promises for each upload
      const uploadPromises = req.files.images.map((file) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "products",
              transformation: { width: 500, height: 500, crop: "limit" },
            },
            (error, result) => {
              if (error) {
                return reject(error);
              }
              resolve(result.secure_url);
            }
          );

          stream.end(file.buffer);
        });
      });

      // Wait for all uploads to complete
      imagesUrl.push(...(await Promise.all(uploadPromises)));
    }

    // Create a new product with the uploaded image URLs
    const newProduct = new Product({
      name,
      description,
      price,
      images: imagesUrl,
      category,
      subCategory,
      sizes: parsedSizes,
      bestseller,
      date,
    });

    const product = await newProduct.save();

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating product",
      error: error.message,
    });
  }
};

// Get all products
const getProducts = async (req, res) => {};

// Get a single product by ID
const getProductById = async (req, res) => {};

// Update a product by ID
const updateProduct = async (req, res) => {};

// Delete a product by ID
const deleteProduct = async (req, res) => {};

export {
  uploadProductImages,
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
