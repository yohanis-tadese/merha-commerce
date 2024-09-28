import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { createProduct } from "../api/product";
import { AuthContext } from "../context/authContext";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { token } = useContext(AuthContext);

  const handleImageChange = (e) => {
    if (e.target.files.length + images.length > 4) {
      setError("You can upload a maximum of 4 images.");
    } else {
      setImages([...images, ...Array.from(e.target.files)]);
      setError("");
    }
  };

  const handleSizeSelection = (size) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter((s) => s !== size));
    } else {
      setSizes([...sizes, size]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation check
    if (!name || !description || !price || !category) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    // Ensure price is a valid number
    if (isNaN(price) || parseFloat(price) <= 0) {
      setError("Price must be a valid positive number.");
      setLoading(false);
      return;
    }
    // Prepare product data
    const productData = {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
      images,
    };

    try {
      // Call the createProduct service
      await createProduct(productData, token);
      Toast.success("Product created successfully!");
      setLoading(false);
      navigate("/list-items");

      // Clear form after successful submission
      setName("");
      setDescription("");
      setPrice("");
      setCategory("Men");
      setSubCategory("Topwear");
      setSizes([]);
      setBestseller(false);
      setImages([]);
    } catch (error) {
      setError(error.message);
      Toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 shadow-md rounded">
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>
      <form className="flex flex-col items-start gap-3" onSubmit={handleSubmit}>
        {error && <div className="text-red-600">{error}</div>}

        <div>
          <p className="mb-3">Upload images (max 4)</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((index) => (
              <label key={index} htmlFor={`image${index}`}>
                <img
                  className="w-20 h-20 border object-cover"
                  src={
                    images[index - 1]
                      ? URL.createObjectURL(images[index - 1])
                      : assets.upload_area
                  }
                  alt={`image${index}`}
                />
                <input
                  type="file"
                  id={`image${index}`}
                  onChange={handleImageChange}
                  hidden
                  multiple
                  accept="image/*"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="w-full">
          <p className="mb-2">Product name</p>
          <input
            className="w-full max-w-[500px] px-3 py-2 border rounded"
            type="text"
            placeholder="Name of product"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="w-full">
          <p className="mb-2">Product description</p>
          <textarea
            className="w-full max-w-[500px] px-3 py-2 border rounded"
            placeholder="Description of product"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:gap-8">
          <div>
            <p className="mb-2">Category</p>
            <select
              className="px-3 py-2 border rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div>
            <p className="mb-2">Sub category</p>
            <select
              className="px-3 py-2 border rounded"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div>
            <p className="mb-2">Product price</p>
            <input
              className="w-full sm:w-[120px] px-3 py-2 border rounded"
              type="text"
              placeholder="100"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <div>
          <p className="mb-2">Product size</p>
          <div className="flex w-full flex-col sm:flex-row gap-3">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div
                key={size}
                onClick={() => handleSizeSelection(size)}
                className={`px-3 py-1 cursor-pointer border rounded ${
                  sizes.includes(size) ? "bg-blue-200" : "bg-gray-200"
                }`}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 mt-2">
          <input
            type="checkbox"
            id="bestseller"
            checked={bestseller}
            onChange={() => setBestseller(!bestseller)}
          />
          <label className="cursor-pointer" htmlFor="bestseller">
            Add to bestseller
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-28 bg-black text-white py-3 mt-4 rounded-lg shadow-md hover:bg-gray-800 hover:shadow-lg ${
            loading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-500 transition duration-200"
          }`}
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
};

export default Add;
