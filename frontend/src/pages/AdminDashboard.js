import React from "react";
import AdminDashboardLayout from "./AdminDashboardLayout";

const AdminDashboard = () => {
  return (
    <AdminDashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-xl font-bold">Create Schedule</h2>
          <p>Schedule garbage collectors for assigned centers.</p>
          <a
            href="/schedule"
            className="text-green-600 hover:underline mt-4 inline-block"
          >
            Go to Scheduling
          </a>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-xl font-bold">View Collector Schedules</h2>
          <p>View schedules for all garbage collectors.</p>
          <a
            href="/collector-schedules"
            className="text-green-600 hover:underline mt-4 inline-block"
          >
            View Schedules
          </a>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminDashboard;
