import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarIcon from "../components/sidebar/SidebarIcon";
import Header from "../components/header/Header";
import Footer from "../components/Footer";
import "../components/sidebar/styles.css"; // Ensure styles are included
import "./wasteHistory.css"; // Keep the custom styles for the waste history page

export default function WasteHistory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [wasteData, setWasteData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch waste data from the backend
  const fetchWasteData = async () => {
    setLoading(true);
    try {
      // Replace the URL with your backend API endpoint
      const response = await axios.get("http://localhost:3050/api/auth/waste/history", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust based on how you store the token
        },
      });
      setWasteData(response.data);
    } catch (err) {
      setError("Failed to fetch waste data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWasteData(); // Fetch data when the component mounts
  }, []);

  const filteredData = wasteData.filter((entry) =>
    entry.wasteType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="waste-history-container">
      <SidebarIcon />
      <div className="main-content">
        <Header />
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by waste type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
        </div>
        <div className="table-container">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <table className="waste-history-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Type of Waste</th>
                  <th>Quantity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((entry, index) => (
                    <tr key={index}>
                      <td>{new Date(entry.collectionDate).toLocaleDateString()}</td>
                      <td>{entry.collectionTime}</td>
                      <td>{entry.wasteType}</td>
                      <td>{entry.quantity}</td>
                      <td className={`status ${entry.status.toLowerCase()}`}>{entry.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-data">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
