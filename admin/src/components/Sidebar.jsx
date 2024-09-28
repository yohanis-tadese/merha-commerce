import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-[#FBFBFB] text-[#515151] w-52 min-h-screen p-4 border-r border-gray-300">
      <ul className="space-y-4">
        <li>
          <NavLink
            to="/add-item"
            className="block p-2 rounded hover:bg-[#F2F3FF] transition duration-200"
          >
            Add Items
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/list-items"
            className="block p-2 rounded hover:bg-[#F2F3FF] transition duration-200"
          >
            List Items
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/orders"
            className="block p-2 rounded hover:bg-[#F2F3FF] transition duration-200"
          >
            Orders
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
