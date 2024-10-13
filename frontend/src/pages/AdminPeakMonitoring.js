// src/pages/AdminPeakMonitoring.js
import React from "react";
import AdminDashboardLayout from "../pages/AdminDashboardLayout";

const AdminPeakMonitoring = () => {
  return (
    <AdminDashboardLayout>
      <h1 className="text-2xl font-bold">Admin Peak Monitoring</h1>
      {/* Add your peak monitoring content here */}
      <div className="mt-6">{/* Peak monitoring charts and data */}</div>
    </AdminDashboardLayout>
  );
};

export default AdminPeakMonitoring;
