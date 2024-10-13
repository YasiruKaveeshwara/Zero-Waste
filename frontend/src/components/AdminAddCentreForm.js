import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminAddCentreForm = ({ onCenterAdded, editCenter }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [operatingHours, setOperatingHours] = useState("");
  const [trucks, setTrucks] = useState(0);
  const [staff, setStaff] = useState(0);
  const [status, setStatus] = useState("active");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Populate the form fields if editing a center
    if (editCenter) {
      setName(editCenter.name);
      setLocation(editCenter.location);
      setCapacity(editCenter.capacity);
      setOperatingHours(editCenter.operatingHours);
      setTrucks(editCenter.resources.trucks);
      setStaff(editCenter.resources.staff);
      setStatus(editCenter.status);
    }
  }, [editCenter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const centerData = {
      name,
      location,
      capacity,
      operatingHours,
      resources: { trucks, staff },
      peakHours: editCenter?.peakHours || [], // Keep existing peakHours when editing
      status
    };

    try {
      let response;
      if (editCenter) {
        // Update the existing center
        response = await axios.put(
          `http://localhost:3050/api/centers/${editCenter._id}`,
          centerData
        );
      } else {
        // Add new center
        response = await axios.post(
          "http://localhost:3050/api/centers",
          centerData
        );
      }

      onCenterAdded(response.data); // Call the callback with the newly added/edited center data
    } catch (error) {
      setError("Failed to add/update collection centre.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">
        {editCenter ? "Edit Collection Centre" : "Add Collection Centre"}
      </h2>
      {error && <div className="text-red-600">{error}</div>}

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Capacity</label>
        <input
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Operating Hours</label>
        <input
          type="text"
          value={operatingHours}
          onChange={(e) => setOperatingHours(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Number of Trucks</label>
        <input
          type="number"
          value={trucks}
          onChange={(e) => setTrucks(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Number of Staff</label>
        <input
          type="number"
          value={staff}
          onChange={(e) => setStaff(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <button
        type="submit"
        className={`bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 ${
          loading ? "opacity-50" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Saving..." : editCenter ? "Update Centre" : "Add Centre"}
      </button>
    </form>
  );
};

export default AdminAddCentreForm;
