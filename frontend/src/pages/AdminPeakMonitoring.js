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
  const [centers, setCenters] = useState([]); // List of centers for the dropdown
  const [selectedCenter, setSelectedCenter] = useState("All"); // Default to 'All' centers
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPeakPeriods(); // Fetch peak periods data
    fetchCenters(); // Fetch centers for the dropdown
  }, []);

  // Function to fetch peak periods
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

  // Function to fetch centers
  const fetchCenters = async () => {
    try {
      const response = await axios.get("http://localhost:3050/api/centers");
      setCenters(response.data);
    } catch (error) {
      setError("Failed to fetch centers.");
    }
  };

  // Filter the peak periods based on the selected center
  const filteredPeriods =
    selectedCenter === "All"
      ? peakPeriods
      : peakPeriods.filter((period) => period.center === selectedCenter);

  // Prepare the data for the chart based on the filtered data
  const datesTimes = filteredPeriods.map(
    (period) => `${period.date} ${period.time}`
  ); // Combine date and time for x-axis
  const quantities = filteredPeriods.map((period) => period.totalQuantity); // Total quantities

  const data = {
    labels: datesTimes, // x-axis (date + time)
    datasets: [
      {
        label: `Total Waste Collected (kg) - ${selectedCenter}`,
        data: quantities, // y-axis (total quantities)
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
        text: `Peak Collection Monitoring (${selectedCenter})`
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
          text: "Total Waste Collected (kg)"
        }
      }
    }
  };

  return (
    <AdminDashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Peak Collection Monitoring</h1>
      {error && <div className="text-red-600">{error}</div>}

      {/* Dropdown to select center */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Filter by Center
        </label>
        <select
          value={selectedCenter}
          onChange={(e) => setSelectedCenter(e.target.value)} // Set the selected center
          className="border p-2 w-full"
        >
          <option value="All">All</option>
          {centers.map((center) => (
            <option key={center._id} value={center.name}>
              {center.name}
            </option>
          ))}
        </select>
      </div>

      {peakPeriods.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <div className="mt-6">
          {/* Render the Line Chart */}
          <Line data={data} options={options} />

          {/* Display peak periods in a table */}
          <table className="min-w-full table-auto mt-4">
            <thead>
              <tr>
                <th className="px-4 py-2">Center</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Total Quantity (kg)</th>
              </tr>
            </thead>
            <tbody>
              {filteredPeriods.map((period, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{period.center}</td>
                  <td className="px-4 py-2">{period.date}</td>
                  <td className="px-4 py-2">{period.time}</td>
                  <td className="px-4 py-2">{period.totalQuantity} kg</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminDashboardLayout>
  );
};

export default AdminPeakMonitoring;
