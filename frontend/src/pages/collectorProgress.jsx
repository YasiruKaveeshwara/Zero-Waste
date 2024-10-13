import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaExclamationTriangle } from 'react-icons/fa'; // Import report icon

const CollectorProgress = () => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("today"); // Default filter is today
  const [message, setMessage] = useState("");
  const [expandedRequests, setExpandedRequests] = useState({}); // State to track which requests are expanded

  // Fetch collection requests based on filter
  useEffect(() => {
    fetchRequests();
    const interval = setInterval(fetchRequests, 5000); // Polling every 5 seconds for real-time updates
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [filter]);

  const fetchRequests = () => {
    const token = localStorage.getItem("authToken"); // Ensure token is retrieved
    if (!token) {
      setMessage("You are not authenticated. Please log in.");
      return;
    }

    axios
      .get(`http://localhost:3050/api/collector/requests?filter=${filter}`, {
        headers: { Authorization: `Bearer ${token}` }, // Token sent in Authorization header
      })
      .then((response) => {
        const sortedRequests = response.data.sort((a, b) => {
          if (a.status === 'pending' && b.status === 'collected') return -1;
          if (a.status === 'collected' && b.status === 'pending') return 1;
          return 0;
        });
        setRequests(sortedRequests);
      })
      .catch((error) => {
        setMessage("Error fetching requests or unauthorized access.");
        console.error(error);
      });
  };

  // Handle checkbox toggle (Mark request as collected or not)
  const handleCollectedToggle = (requestId, isCollected) => {
    const token = localStorage.getItem("authToken");
    const endpoint = isCollected ? 'collected' : 'pending'; // Change endpoint based on collected status
    axios
      .put(`http://localhost:3050/api/collector/requests/${requestId}/${endpoint}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setMessage(`Request status updated to ${isCollected ? "collected" : "pending"}!`);
        fetchRequests(); // Refresh the list after status update
      })
      .catch((error) => {
        setMessage("Error updating request status.");
      });
  };

  // Handle request expansion and collapsing
  const toggleExpand = (requestId) => {
    setExpandedRequests((prev) => ({
      ...prev,
      [requestId]: !prev[requestId], // Toggle expansion state for the request
    }));
  };

  // Handle reporting issue (Redirect to issue reporting page or log issue)
  const handleReportIssue = (requestId) => {
    alert(`Report issue for request ${requestId}`); // You can implement issue reporting here
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-700 text-center mb-6">Collector Progress</h1>

      {/* Message Notification */}
      {message && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg mb-4">
          {message}
        </div>
      )}

      {/* Filter by Days */}
      <div className="mb-6">
        <label className="text-gray-700 font-semibold">Filter by Day:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="ml-4 px-4 py-2 border rounded-lg text-gray-600">
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {/* Collection Requests List */}
      {requests.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {requests.map((request) => (
            <div key={request._id} className="bg-white p-4 rounded-lg shadow-lg">
              <div className="flex justify-between items-center">
                {/* Resident Name and Address */}
                <div className="flex-grow" onClick={() => toggleExpand(request._id)} style={{ cursor: 'pointer' }}>
                  <p className="font-bold text-green-700">Resident: {request.resident?.residentName}</p> {/* Using populated resident data */}
                  <p className="text-gray-600">Address: {request.resident?.address}</p> {/* Using populated resident data */}
                </div>

                {/* Checkbox and Report Issue Button */}
                <div className="flex items-center space-x-4">
                  {request.status === 'collected' ? (
                    <>
                      <span className="text-green-600 font-bold">Collected</span>
                      <input
                        type="checkbox"
                        checked={true}
                        disabled
                        className="w-5 h-5"
                      />
                    </>
                  ) : (
                    <input
                      type="checkbox"
                      checked={request.status === 'collected'}
                      onChange={(e) => handleCollectedToggle(request._id, e.target.checked)}
                      className="w-5 h-5"
                    />
                  )}
                  <button
                    onClick={() => handleReportIssue(request._id)}
                    className="text-red-600 hover:text-red-800">
                    <FaExclamationTriangle />
                  </button>
                </div>
              </div>

              {/* Expandable Details */}
              {expandedRequests[request._id] && (
                <div className="mt-4 p-4 border-t border-gray-200">
                  <p className="text-gray-600">Waste Type: {request.wasteType}</p>
                  <p className="text-gray-600">Quantity: {request.quantity}</p>
                  <p className="text-gray-600">Collection Date: {new Date(request.collectionDate).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">No requests found for {filter}.</p>
      )}
    </div>
  );
};

export default CollectorProgress;
