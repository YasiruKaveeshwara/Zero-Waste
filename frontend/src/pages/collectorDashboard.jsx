import React from "react";

const CollectorDashboard = () => {
  return (
    <div className="container p-4 mx-auto">
      {/* Welcome Message */}
      <h1 className="mb-6 text-4xl font-bold text-green-700">Collector Dashboard</h1>

      {/* Dashboard Overview Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Routes Overview */}
        <div className="p-6 bg-green-100 rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold">Today Schedule</h2>
          <p className="text-green-700">
            You have 3 active routes assigned for today.
          </p>
          <button className="px-4 py-2 mt-4 text-white bg-green-600 rounded-full hover:bg-green-700" onClick={() => window.location.href = "/collector/schedule"}>
            View Schedule
          </button>
        </div>

          <div className="p-6 bg-green-100 rounded-lg shadow-lg">
            <h2 className="mb-4 text-2xl font-semibold">Collection Progress</h2>
            <p className="text-green-700">You have collected 70% of today’s waste.</p>
            <button className="px-4 py-2 mt-4 text-white bg-green-600 rounded-full hover:bg-green-700" onClick={() => window.location.href = "/collector/progress"}>
              View Progress
            </button>
          </div>

        <div className="p-6 bg-green-100 rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold">Notifications</h2>
          <p className="text-green-700">You have 2 new notifications.</p>
          <button className="px-4 py-2 mt-4 text-white bg-green-600 rounded-full hover:bg-green-700">
            View Notifications
          </button>
        </div>
      </div>

      {/* Routes Table */}
      <div className="mt-8">
        <h2 className="mb-4 text-3xl font-bold text-green-700">Today’s Routes</h2>
        <table className="min-w-full overflow-hidden bg-white rounded-lg shadow-md">
          <thead className="text-white bg-green-600">
            <tr>
              <th className="w-1/3 px-4 py-3 text-sm font-semibold text-left uppercase">Route</th>
              <th className="w-1/3 px-4 py-3 text-sm font-semibold text-left uppercase">Status</th>
              <th className="w-1/3 px-4 py-3 text-sm font-semibold text-left uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-green-50">
              <td className="w-1/3 px-4 py-3 text-left">Route A</td>
              <td className="w-1/3 px-4 py-3 text-left">In Progress</td>
              <td className="w-1/3 px-4 py-3 text-left">
                <button className="px-4 py-2 text-white bg-green-600 rounded-full hover:bg-green-700">
                  View Details
                </button>
              </td>
            </tr>
            <tr className="bg-white">
              <td className="w-1/3 px-4 py-3 text-left">Route B</td>
              <td className="w-1/3 px-4 py-3 text-left">Not Started</td>
              <td className="w-1/3 px-4 py-3 text-left">
                <button className="px-4 py-2 text-white bg-green-600 rounded-full hover:bg-green-700">
                  Start Route
                </button>
              </td>
            </tr>
            <tr className="bg-green-50">
              <td className="w-1/3 px-4 py-3 text-left">Route C</td>
              <td className="w-1/3 px-4 py-3 text-left">Completed</td>
              <td className="w-1/3 px-4 py-3 text-left">
                <button className="px-4 py-2 text-white bg-gray-400 rounded-full cursor-not-allowed" disabled>
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
