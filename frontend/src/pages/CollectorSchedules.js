import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import AdminDashboardLayout from "./AdminDashboardLayout";

const CollectorSchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3050/api/schedule/getAll"
        ); // Ensure this matches your backend route
        setSchedules(res.data);
      } catch (error) {
        console.error("Error fetching schedules:", error);
        setError("Failed to load schedules."); // Set error message if API fails
      }
    };
    fetchSchedules();
  }, []);

  return (
    <AdminDashboardLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Collector Schedules</h1>
        <Link
          to="/create-schedule" // Link to CreateSchedule page
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Add Schedule
        </Link>
      </div>

      {/* Show error if it exists */}
      {error && <p className="text-red-500">{error}</p>}

      {schedules.length === 0 ? (
        <p>No schedules found.</p>
      ) : (
        <ul className="space-y-4">
          {schedules.map((schedule) => (
            <li
              key={schedule._id}
              className="p-4 bg-gray-100 rounded-lg shadow-md"
            >
              <p>
                <strong>Collector:</strong>{" "}
                {schedule.collector
                  ? schedule.collector.name
                  : "Unknown Collector"}
              </p>
              <p>
                <strong>Center:</strong>{" "}
                {schedule.center ? schedule.center.name : "Unknown Center"}
              </p>
              <p>
                <strong>Vehicle:</strong>{" "}
                {schedule.vehicle ? schedule.vehicle.name : "Unknown Vehicle"}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {schedule.date
                  ? new Date(schedule.date).toLocaleDateString()
                  : "Unknown Date"}
              </p>
              <p>
                <strong>Time:</strong> {schedule.time || "Unknown Time"}
              </p>
              <p>
                <strong>Status:</strong> {schedule.status || "Unknown Status"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </AdminDashboardLayout>
  );
};

export default CollectorSchedules;
