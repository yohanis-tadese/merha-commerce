import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  const adminName = "Admin";

  return (
    <nav className="bg-[#FBFBFB] p-4 flex justify-between items-center border-b border-gray-300 ">
      <div className="text-[#515151] font-bold text-xl">
        <Link to="/dashboard">Meriha Commerce</Link>
      </div>

      <div className="flex items-center space-x-7">
        <span className="text-black">Welcome, {adminName}!</span>
        <button
          onClick={handleLogout}
          className="bg-[#0794C9] text-white px-6 py-2 transition duration-200 rounded-full"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
