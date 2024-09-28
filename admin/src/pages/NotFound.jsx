import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10 bg-gray-50">
      <h1 className="text-3xl font-bold text-red-600">404</h1>
      <h2 className="text-2xl mt-4">Page Not Found</h2>
      <p className="mt-1 text-gray-600">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        to="/dashboard"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
