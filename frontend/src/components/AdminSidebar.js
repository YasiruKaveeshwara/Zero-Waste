import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBuilding,
  FaChartLine,
  FaClipboardList, // Import the schedule icon
  FaSignOutAlt,
} from "react-icons/fa"; // Import icons from react-icons

const AdminSidebar = () => {
  const navigate = useNavigate(); // For redirecting after logout

  const handleLogout = () => {
    // Clear the user from localStorage (you can add auth logic here if needed)
    localStorage.removeItem("user");

    // Redirect to the home page after logout
    navigate("/");
  };

  return (
    <div className="w-64 bg-gray-800 text-white h-screen flex flex-col justify-between p-4">
      <div>
        <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
        <ul>
          <li className="mb-2">
            <Link
              to="/admin-dashboard"
              className="flex items-center hover:underline"
            >
              <FaTachometerAlt className="mr-2" />
              Dashboard
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/admin-centres"
              className="flex items-center hover:underline"
            >
              <FaBuilding className="mr-2" />
              Collection Centres
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/admin-peak-monitoring"
              className="flex items-center hover:underline"
            >
              <FaChartLine className="mr-2" />
              Peak Monitoring
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/collector-schedules"
              className="flex items-center hover:underline"
            >
              <FaClipboardList className="mr-2" />
              Schedules
            </Link>
          </li>
        </ul>
      </div>

      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
