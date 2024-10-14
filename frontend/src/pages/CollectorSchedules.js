import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminDashboardLayout from "./AdminDashboardLayout";

const CollectorSchedules = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      const res = await axios.get("/api/schedules");
      setSchedules(res.data);
    };
    fetchSchedules();
  }, []);

  return (
    <AdminDashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Collector Schedules</h1>
      {schedules.length === 0 ? (
        <p>No schedules found.</p>
      ) : (
        <ul className="space-y-4">
          {schedules.map((schedule) => (
            <li key={schedule._id} className="p-4 bg-gray-100 rounded-lg shadow-md">
              <p><strong>Collector:</strong> {schedule.collector.name}</p>
              <p><strong>Center:</strong> {schedule.center.name}</p>
              <p><strong>Date:</strong> {new Date(schedule.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {schedule.time}</p>
              <p><strong>Status:</strong> {schedule.status}</p>
            </li>
          ))}
        </ul>
      )}
    </AdminDashboardLayout>
  );
};

export default CollectorSchedules;
