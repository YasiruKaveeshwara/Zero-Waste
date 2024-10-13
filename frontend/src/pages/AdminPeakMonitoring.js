import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import AdminDashboardLayout from "../pages/AdminDashboardLayout";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminPeakMonitoring = () => {
  const [peakPeriods, setPeakPeriods] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPeakPeriods();
  }, []);

  const fetchPeakPeriods = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3050/api/centers/peak-monitoring"
      );
      setPeakPeriods(response.data);
    } catch (error) {
      setError("Failed to fetch peak collection periods.");
    }
  };

  // Prepare the data for the chart grouped by date and time
  const datesTimes = peakPeriods.map(
    (period) => `${period.date} ${period.time}`
  ); // Combine date and time for x-axis
  const counts = peakPeriods.map((period) => period.count); // Collection counts

  const data = {
    labels: datesTimes, // x-axis (date + time)
    datasets: [
      {
        label: "Collection Count",
        data: counts, // y-axis (collection counts)
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: "Peak Collection Monitoring (Last 3 Days)"
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date and Time"
        },
        ticks: {
          maxTicksLimit: 15 // Control how many ticks are displayed on the x-axis
        }
      },
      y: {
        title: {
          display: true,
          text: "Collection Count"
        }
      }
    }
  };

  return (
    <AdminDashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Peak Collection Monitoring</h1>
      {error && <div className="text-red-600">{error}</div>}
      {peakPeriods.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <div className="mt-6">
          {/* Render the Line Chart */}
          <Line data={data} options={options} />
        </div>
      )}
    </AdminDashboardLayout>
  );
};

export default AdminPeakMonitoring;
