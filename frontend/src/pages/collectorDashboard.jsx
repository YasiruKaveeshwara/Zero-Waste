import React from "react";

const CollectorDashboard = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Welcome Message */}
      <h1 className="text-4xl font-bold text-green-700 mb-6">Collector Dashboard</h1>

      {/* Dashboard Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Routes Overview */}
        <div className="bg-green-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Assigned Routes</h2>
          <p className="text-green-700">
            You have 3 active routes assigned for today.
          </p>
          <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700">
            View Routes
          </button>
        </div>

        {/* Collection Progress */}
        <div className="bg-green-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Collection Progress</h2>
          <p className="text-green-700">You have collected 70% of today’s waste.</p>
          <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700">
            View Progress
          </button>
        </div>

        {/* Notifications */}
        <div className="bg-green-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
          <p className="text-green-700">You have 2 new notifications.</p>
          <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700">
            View Notifications
          </button>
        </div>
      </div>

      {/* Routes Table */}
      <div className="mt-8">
        <h2 className="text-3xl font-bold text-green-700 mb-4">Today’s Routes</h2>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Route</th>
              <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Status</th>
              <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-green-50">
              <td className="w-1/3 text-left py-3 px-4">Route A</td>
              <td className="w-1/3 text-left py-3 px-4">In Progress</td>
              <td className="w-1/3 text-left py-3 px-4">
                <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700">
                  View Details
                </button>
              </td>
            </tr>
            <tr className="bg-white">
              <td className="w-1/3 text-left py-3 px-4">Route B</td>
              <td className="w-1/3 text-left py-3 px-4">Not Started</td>
              <td className="w-1/3 text-left py-3 px-4">
                <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700">
                  Start Route
                </button>
              </td>
            </tr>
            <tr className="bg-green-50">
              <td className="w-1/3 text-left py-3 px-4">Route C</td>
              <td className="w-1/3 text-left py-3 px-4">Completed</td>
              <td className="w-1/3 text-left py-3 px-4">
                <button className="bg-gray-400 text-white px-4 py-2 rounded-full cursor-not-allowed" disabled>
                  Completed
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CollectorDashboard;
