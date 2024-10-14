import React, { useState, useEffect } from "react";
import axios from "axios";

const ScheduleForm = () => {
  const [collectors, setCollectors] = useState([]);
  const [centers, setCenters] = useState([]);
  const [vehicles, setVehicles] = useState([]); // State for vehicles
  const [formData, setFormData] = useState({
    collectorId: "",
    centerId: "",
    vehicleId: "", // Field for selected vehicle
    date: "",
    time: "",
  });
  const [error, setError] = useState(null);

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
          // Convert formData.centerId to a string before passing it in the query
          const vehiclesRes = await axios.get(
            `http://localhost:3050/api/vehicles/getVehicles/${formData.centerId.toString()}`
          );
          setVehicles(vehiclesRes.data);
        } catch (err) {
          setError("Failed to fetch vehicles.");
          console.error("Error fetching vehicles:", err);
        }
      }
    };
    fetchVehicles();
  }, [formData.centerId]); // Fetch when centerId changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3050/api/schedule/create", formData);
      alert("Schedule Created Successfully");
    } catch (error) {
      setError("Failed to create schedule.");
      console.error("Error creating schedule:", error);
    }
  };

  return (
    <form className="bg-white p-6 shadow-md" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Create Schedule</h2>

      {/* Show error message if there's an error */}
      {/* {error && <div className="text-red-500 mb-4">{error}</div>} */}

      {/* Select Collection Center */}
      <div className="mb-4">
        <label className="block mb-2">Select Collection Center</label>
        <select
          className="w-full p-2 border"
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

      {/* Select Garbage Collector */}
      <div className="mb-4">
        <label className="block mb-2">Select Garbage Collector</label>
        <select
          className="w-full p-2 border"
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

      {/* Select Vehicle */}
      <div className="mb-4">
        <label className="block mb-2">Select Vehicle</label>
        <select
          className="w-full p-2 border"
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

      {/* Select Date */}
      <div className="mb-4">
        <label className="block mb-2">Date</label>
        <input
          type="date"
          className="w-full p-2 border"
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
      </div>

      {/* Select Time */}
      <div className="mb-4">
        <label className="block mb-2">Time</label>
        <input
          type="time"
          className="w-full p-2 border"
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-green-500 text-white p-2 w-full hover:bg-green-600"
      >
        Create Schedule
      </button>
    </form>
  );
};

export default ScheduleForm;
