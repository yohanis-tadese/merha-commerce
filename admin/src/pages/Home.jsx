import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard!</h1>
      <p className="text-xl mb-6">
        Manage your items and orders from the dashboard below:
      </p>

      <div className="flex justify-center space-x-4">
        <Link
          to="/add-item"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Add Item
        </Link>
        <Link
          to="/list-items"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          List Items
        </Link>
        <Link
          to="/orders"
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-700"
        >
          Orders
        </Link>
      </div>
    </div>
  );
};

export default Home;
