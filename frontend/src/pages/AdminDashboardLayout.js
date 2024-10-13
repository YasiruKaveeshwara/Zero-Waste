// src/pages/AdminDashboardLayout.js
import React from "react";
import AdminSidebar from "../components/AdminSidebar";

const AdminDashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className="flex-1 p-10 text-gray-900">{children}</div>
    </div>
  );
};

export default AdminDashboardLayout;
