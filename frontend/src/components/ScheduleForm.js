import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ScheduleForm = () => {
  const [collectors, setCollectors] = useState([]);
  const [centers, setCenters] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [formData, setFormData] = useState({
    collectorId: "",
    centerId: "",
    vehicleId: "",
    date: "",
    time: "",
    selectedRequests: [], // Store selected requests
  });
  const [filteredRequests, setFilteredRequests] = useState([]); // State for filtered requests
  const [error, setError] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();

  // Fetch collectors
  useEffect(() => {
    const fetchCollectors = async () => {
      try {
        const collectorsRes = await axios.get(
          "http://localhost:3050/api/collector"
        );
        setCollectors(collectorsRes.data);
      } catch (err) {
        setError("Failed to fetch collectors.");
        console.error("Error fetching collectors:", err);
      }
    };
    fetchCollectors();
  }, []);

  // Fetch centers
  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const centersRes = await axios.get("http://localhost:3050/api/centers");
        setCenters(centersRes.data);
      } catch (err) {
        setError("Failed to fetch centers.");
        console.error("Error fetching centers:", err);
      }
    };
    fetchCenters();
  }, []);

  // Fetch vehicles based on selected center
  useEffect(() => {
    const fetchVehicles = async () => {
      if (formData.centerId) {
        try {
          const vehiclesRes = await axios.get(
            `http://localhost:3050/api/vehicles/getVehicles/${formData.centerId}`
          );
          setVehicles(vehiclesRes.data);
        } catch (err) {
          setError("Failed to fetch vehicles.");
          console.error("Error fetching vehicles:", err);
        }
      }
    };
    fetchVehicles();
  }, [formData.centerId]);

  // Fetch all pending requests for the selected center
  useEffect(() => {
    const fetchPendingRequests = async () => {
      if (formData.centerId) {
        try {
          const response = await axios.get(
            `http://localhost:3050/api/requests/byCenter/${formData.centerId}`
          );
          console.log(response.data)
          setPendingRequests(response.data); // Store all pending requests for the center
        } catch (err) {
          setError("Failed to fetch pending requests.");
          console.error("Error fetching pending requests:", err);
        }
      }
    };
    fetchPendingRequests();
  }, [formData.centerId]);

  // Filter requests based on the selected date
  useEffect(() => {
    if (formData.date && pendingRequests.length > 0) {
      const selectedDate = new Date(formData.date).toISOString().split("T")[0]; // Format the date to 'YYYY-MM-DD'
      const filtered = pendingRequests.filter((request) => {
        const requestDate = new Date(request.collectionDate)
          .toISOString()
          .split("T")[0]; // Format request date to 'YYYY-MM-DD'
        return requestDate === selectedDate; // Compare only the date part (ignoring time)
      });
      console.log(filtered)
      setFilteredRequests(filtered); // Set the filtered requests
    }
  }, [formData.date, pendingRequests]);

  // Handle checkbox change for request selection
  const handleRequestSelection = (e, requestId) => {
    if (e.target.checked) {
      setFormData({
        ...formData,
        selectedRequests: [...formData.selectedRequests, requestId],
      });
    } else {
      setFormData({
        ...formData,
        selectedRequests: formData.selectedRequests.filter(
          (id) => id !== requestId
        ),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3050/api/schedule/create", formData);
      setShowSuccessPopup(true);
    } catch (error) {
      setError("Failed to create schedule.");
      console.error("Error creating schedule:", error);
    }
  };

  const handlePopupClose = () => {
    setShowSuccessPopup(false);
    navigate("/schedulePage");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-4xl font-bold mb-6 text-green-600 text-center">
        Create Schedule
      </h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Center Selection */}
      <div className="mb-6">
        <label className="block mb-2 text-xl font-semibold text-gray-700">
          Select Collection Center
        </label>
        <select
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-green-500"
          onChange={(e) =>
            setFormData({ ...formData, centerId: e.target.value })
          }
        >
          <option>Select Center</option>
          {centers.map((center) => (
            <option key={center._id} value={center._id}>
              {center.name}
            </option>
          ))}
        </select>
      </div>

      {/* Collector Selection */}
      <div className="mb-6">
        <label className="block mb-2 text-xl font-semibold text-gray-700">
          Select Garbage Collector
        </label>
        <select
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-green-500"
          onChange={(e) =>
            setFormData({ ...formData, collectorId: e.target.value })
          }
        >
          <option>Select Collector</option>
          {collectors.map((collector) => (
            <option key={collector._id} value={collector._id}>
              {collector.name}
            </option>
          ))}
        </select>
      </div>

      {/* Vehicle Selection */}
      <div className="mb-6">
        <label className="block mb-2 text-xl font-semibold text-gray-700">
          Select Vehicle
        </label>
        <select
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-green-500"
          onChange={(e) =>
            setFormData({ ...formData, vehicleId: e.target.value })
          }
        >
          <option>Select Vehicle</option>
          {vehicles.map((vehicle) => (
            <option key={vehicle._id} value={vehicle._id}>
              {vehicle.name} ({vehicle.licensePlate})
            </option>
          ))}
        </select>
      </div>

      {/* Date Selection */}
      <div className="mb-6">
        <label className="block mb-2 text-xl font-semibold text-gray-700">
          Date
        </label>
        <input
          type="date"
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-green-500"
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
      </div>

      {/* Time Selection */}
      <div className="mb-6">
        <label className="block mb-2 text-xl font-semibold text-gray-700">
          Time
        </label>
        <input
          type="time"
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-green-500"
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
        />
      </div>

      {/* Display Filtered Requests with Checkboxes */}
      {filteredRequests.length > 0 && (
        <div className="mt-6">
          <h3 className="text-2xl font-bold text-gray-800">
            Filtered Pending Waste Requests
          </h3>
          <div className="grid grid-cols-1 gap-6 mt-4">
            {filteredRequests.map((request) => (
              <div
                key={request._id}
                className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center justify-between"
              >
                <div>
                  <p>
                    <strong>Resident:</strong> {request.resident.residentName}
                  </p>
                  <p>
                    <strong>Waste Type:</strong> {request.wasteType}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {request.quantity}
                  </p>
                  <p>
                    <strong>Collection Time:</strong> {request.collectionTime}
                  </p>
                </div>
                <input
                  type="checkbox"
                  onChange={(e) => handleRequestSelection(e, request._id)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out shadow-md font-bold text-lg"
      >
        Create Schedule
      </button>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold mb-4 text-green-600">
              Schedule Created Successfully!
            </h3>
            <button
              onClick={handlePopupClose}
              className="bg-green-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 ease-in-out font-bold"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleForm;
