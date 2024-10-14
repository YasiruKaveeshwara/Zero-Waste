import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaExclamationTriangle } from "react-icons/fa"; // Import report icon

const CollectorProgress = () => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("today"); // Default filter is today
  const [message, setMessage] = useState("");
  const [expandedRequests, setExpandedRequests] = useState({}); // State to track which requests are expanded
  const [isReportModalOpen, setIsReportModalOpen] = useState(false); // State to manage report modal visibility
  const [selectedRequestId, setSelectedRequestId] = useState(null); // Track the request ID for reporting
  const [issueDescription, setIssueDescription] = useState(""); // Track the issue description

  const clearMessageAfterTimeout = () => {
    setTimeout(() => {
      setMessage("");
    }, 2000); // 2 seconds timer
  };

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
      clearMessageAfterTimeout();
      return;
    }

    axios
      .get(`http://localhost:3050/api/collector/requests?filter=${filter}`, {
        headers: { Authorization: `Bearer ${token}` }, // Token sent in Authorization header
      })
      .then((response) => {
        const sortedRequests = response.data.sort((a, b) => {
          if (a.status === "pending" && b.status === "collected") return -1;
          if (a.status === "collected" && b.status === "pending") return 1;
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
    const endpoint = isCollected ? "collected" : "pending"; // Change endpoint based on collected status
    axios
      .put(
        `http://localhost:3050/api/collector/requests/${requestId}/${endpoint}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setMessage(`Request status updated to ${isCollected ? "collected" : "pending"}!`);
        clearMessageAfterTimeout();
        fetchRequests(); // Refresh the list after status update
      })
      .catch((error) => {
        setMessage("Error updating request status.");
        clearMessageAfterTimeout();
      });
  };

  // Handle request expansion and collapsing
  const toggleExpand = (requestId) => {
    setExpandedRequests((prev) => ({
      ...prev,
      [requestId]: !prev[requestId], // Toggle expansion state for the request
    }));
  };

  // Handle reporting issue (Open the modal to report an issue)
  const handleReportIssue = (requestId) => {
    setSelectedRequestId(requestId); // Store the request ID
    setIsReportModalOpen(true); // Open the report modal
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsReportModalOpen(false);
    setIssueDescription(""); // Clear the issue description
  };

  const handleSubmitReport = (requestId, issueDescription) => {
    const token = localStorage.getItem("authToken");
  
    if (!requestId || !issueDescription) {
      setMessage("Request ID and issue description are required.");
      return;
    }
  
    axios
      .post(
        `http://localhost:3050/api/issues/report`,
        {
          requestId,
          issueDescription,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setMessage("Issue reported successfully!");
        clearMessageAfterTimeout();
        setIsReportModalOpen(false); // Close the modal
        setIssueDescription(""); // Clear the issue description
      })
      .catch((error) => {
        console.error("Error reporting issue:", error.response);
        setMessage(error.response?.data?.message || "Error reporting issue.");
        clearMessageAfterTimeout();
      });
  };
  

  return (
    <div className='container p-6 mx-auto'>
      <h1 className='mb-6 text-3xl font-bold text-center text-green-700'>Collector Progress</h1>

      {/* Message Notification */}
      {message && <div className='px-4 py-2 mb-4 text-green-700 bg-green-100 rounded-lg'>{message}</div>}

      {/* Filter by Days */}
      <div className='mx-10 mb-6'>
        <label className='font-semibold text-gray-700'>Filter by Day:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className='px-4 py-2 ml-4 text-gray-600 border rounded-lg'>
          <option value='today'>Today</option>
          <option value='yesterday'>Yesterday</option>
          <option value='week'>This Week</option>
          <option value='month'>This Month</option>
          <option value='upcoming'>Upcoming</option>
        </select>
      </div>

      {/* Collection Requests List */}
      {requests.length > 0 ? (
        <div className='grid grid-cols-1 gap-6 mx-10'>
          {requests.map((request) => (
            <div key={request._id} className='p-4 bg-white rounded-lg shadow-lg'>
              <div className='flex items-center justify-between'>
                {/* Resident Name, Waste Type, and Quantity in a horizontal row */}
                <div className='flex-grow' onClick={() => toggleExpand(request._id)} style={{ cursor: "pointer" }}>
                  <p className='inline-block font-bold text-green-700'>Resident: {request.resident?.residentName}</p>{" "}
                  {/* Using populated resident data */}
                  <p className='inline-block ml-6 text-gray-600'>Waste Type: {request.wasteType}</p>
                  <p className='inline-block ml-6 text-gray-600'>Quantity: {request.quantity}</p>
                </div>

                {/* Checkbox and Report Issue Button */}
                <div className='flex items-center space-x-4'>
                  {request.status === "collected" ? (
                    <>
                      <span className='font-bold text-green-600'>Collected</span>
                      <input type='checkbox' checked={true} disabled className='w-5 h-5' />
                    </>
                  ) : (
                    <input
                      type='checkbox'
                      checked={request.status === "collected"}
                      onChange={(e) => handleCollectedToggle(request._id, e.target.checked)}
                      className='w-5 h-5'
                    />
                  )}
                  <button onClick={() => handleReportIssue(request._id)} className='text-red-600 hover:text-red-800'>
                    <FaExclamationTriangle />
                  </button>
                </div>
              </div>

              {/* Expandable Details */}
              {expandedRequests[request._id] && (
                <div className='p-4 mt-4 border-t border-gray-200'>
                  <p className='text-gray-600'>Scheduled Collection Date: {request.collectionDate}</p>
                  <p className='text-gray-600'>Scheduled Collection Time: {request.collectionTime}</p> {/* Collection Time */}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className='text-center text-gray-600'>No requests found for {filter}.</p>
      )}

      {/* Report Issue Modal */}
      {isReportModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75'>
          <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-lg'>
            <h2 className='mb-4 text-xl font-bold text-center'>Report Issue</h2>
            <textarea
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              className='w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
              rows='4'
              placeholder='Describe the issue here...'></textarea>
            <div className='flex justify-end mt-4'>
              <button
                onClick={() => handleSubmitReport(selectedRequestId, issueDescription)} // Pass the requestId and issueDescription
                className='px-4 py-2 mr-2 text-white bg-green-500 rounded-lg hover:bg-green-600'>
                Submit
              </button>

              <button onClick={handleCloseModal} className='px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600'>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectorProgress;
