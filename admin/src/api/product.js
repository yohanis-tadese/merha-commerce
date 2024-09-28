import axios from "axios";
import { backendUrl } from "./BackendURL";

// Function to create a new product
export const createProduct = async (productData, token) => {
  try {
    // Use FormData to handle file uploads and other fields
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("category", productData.category);
    formData.append("subCategory", productData.subCategory);
    formData.append("sizes", JSON.stringify(productData.sizes));
    formData.append("bestseller", productData.bestseller);

    // Append images if any
    if (productData.images && productData.images.length > 0) {
      productData.images.forEach((image) => {
        formData.append(`images`, image);
      });
    }

    // Send a POST request to the backend API
    const response = await axios.post(`${backendUrl}/products`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something wrond. please try again.");
    }
  }
};

// Function to get all products
export const getAllProducts = async (token) => {
  try {
    const response = await axios.get(`${backendUrl}/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Respo", response.data);

    return response.data;
  } catch (error) {
    if (
      error.response ||
      error.response.status === 401 ||
      error.response.status === 404
    ) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

// Function to delete a product
export const deleteProduct = async (productId, token) => {
  try {
    const response = await axios.delete(`${backendUrl}/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};
