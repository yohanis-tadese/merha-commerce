// Create a new product
const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      image,
      category,
      subCategory,
      sizes,
      bestseller,
      date,
    } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      image,
      category,
      subCategory,
      sizes,
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
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
