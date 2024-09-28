import { useEffect, useState, useContext } from "react";
import { getAllProducts, deleteProduct } from "../api/product";
import { AuthContext } from "../context/authContext";
import Toast from "../components/Toast";
import CustomModal from "../components/CustomModal";
import { assets } from "../assets/assets";

const ProductsList = () => {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const product = await getAllProducts(token);
        setProducts(product.data);
      } catch (error) {
        setError(error.message);
        Toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [token]);

  const handleDelete = async () => {
    try {
      await deleteProduct(selectedProduct._id, token);
      setProducts(
        products.filter((product) => product._id !== selectedProduct._id)
      );
      Toast.success("Product deleted successfully!");
    } catch (error) {
      setError(error.message);
      Toast.error("Failed to delete product!");
    }
    setModalIsOpen(false);
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-6">Products List</h1>

      {loading ? (
        <div className="text-center my-4">Loading products...</div>
      ) : (
        <>
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-3 py-2 border border-gray-300">Image</th>
                <th className="px-4 py-2 border border-gray-300">Name</th>
                <th className="px-4 py-2 border border-gray-300">Category</th>
                <th className="px-4 py-2 border border-gray-300">
                  Description
                </th>
                <th className="px-4 py-2 border border-gray-300">Price</th>
                <th className="px-4 py-2 border border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border border-gray-300">
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="h-14 w-14 object-cover"
                    />
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {product.name}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {product.category}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {product.description}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    ${product.price}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 text-center">
                    <button
                      className="text-white rounded-lg w-6"
                      onClick={() => openModal(product)}
                    >
                      <img src={assets.delete_icone} alt="delete" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <CustomModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            title="Delete Confirmation"
            message={`Are you sure you want to delete ${selectedProduct?.name}?`}
            onConfirm={handleDelete}
          />
        </>
      )}
    </div>
  );
};

export default ProductsList;
