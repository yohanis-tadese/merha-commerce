import Product from "../models/productModel.js";
import cloudinary from "../config/cloudinary.js";

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
    } = req.body;

    // Check if more than 3 images are uploaded
    if (req.files.length > 4) {
      return res.status(400).json({
        success: false,
        message: "You can upload a maximum of 4 images.",
      });
    }

    // Array to hold image URLs
    const imagesUrl = [];

    // Process uploaded images
    if (req.files) {
      for (const file of req.files) {
        // Upload each file to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(file.path, {
          folder: "products",
          transformation: [{ width: 500, height: 500, crop: "limit" }],
          public_id: `product-${Date.now()}-${file.originalname}`,
        });
        imagesUrl.push(uploadResponse.secure_url);
      }
    }

    // Create a new product object
    const productData = {
      name,
      description,
      price,
      image: imagesUrl,
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller,
      date: Date.now(),
    };

    const product = new Product(productData);

    await product.save();

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating product",
      error: error.message,
    });
  }
};

/// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    // Check if products were found
    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(`Error ⛔ ${error}`);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching products.",
      error: error.message,
    });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    // Check if product was found
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "No product found with this ID.",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.log(`Error ⛔ ${error}`);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the product.",
      error: error.message,
    });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    // Check if product was found
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "No product found with this ID.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "The product has been deleted successfully.",
    });
  } catch (error) {
    console.log(`Error ⛔ ${error}`);

    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the product.",
      error: error.message,
    });
  }
};

export {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
