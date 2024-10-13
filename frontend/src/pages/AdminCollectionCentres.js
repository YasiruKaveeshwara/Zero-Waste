import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminDashboardLayout from "../pages/AdminDashboardLayout";
import AdminAddCentreForm from "../components/AdminAddCentreForm";

const AdminCollectionCentres = () => {
  const [centres, setCentres] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false); // State to control form visibility
  const [error, setError] = useState("");
  const [editCenter, setEditCenter] = useState(null); // State to hold the center being edited

  useEffect(() => {
    fetchCentres();
  }, []);

  const fetchCentres = async () => {
    try {
      const response = await axios.get("http://localhost:3050/api/centers");
      setCentres(response.data);
    } catch (error) {
      setError("Failed to fetch collection centres.");
    }
  };

  const handleCenterAdded = (newCenter) => {
    if (editCenter) {
      // Update the existing center in the list
      setCentres(
        centres.map((centre) =>
          centre._id === newCenter._id ? newCenter : centre
        )
      );
    } else {
      // Add new center to the list
      setCentres([...centres, newCenter]);
    }

    setIsFormVisible(false); // Hide form after center is added/edited
    setEditCenter(null); // Clear the edit state
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3050/api/centers/${id}`);
      setCentres(centres.filter((centre) => centre._id !== id)); // Remove deleted center from the list
    } catch (error) {
      setError("Failed to delete collection centre.");
    }
  };

  const handleEdit = (centre) => {
    setEditCenter(centre); // Set the center to be edited
    setIsFormVisible(true); // Show the form for editing
  };

  // Render status with green dot for active and red dot for inactive
  const renderStatus = (status) => (
    <span className="flex items-center">
      <span
        className={`inline-block w-2 h-2 mr-2 rounded-full ${
          status === "active" ? "bg-green-500" : "bg-red-500"
        }`}
      ></span>
      {status}
    </span>
  );

  return (
    <AdminDashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Collection Centres</h1>
      {error && <div className="text-red-600">{error}</div>}

      <div className="mt-6">
        <button
          onClick={() => {
            setIsFormVisible(true);
            setEditCenter(null); // Reset the edit state for adding new center
          }} // Show the form for adding a new center
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Add Collection Centre
        </button>

        {centres.length === 0 ? (
          <p className="mt-4">No collection centres available.</p>
        ) : (
          <table className="min-w-full table-auto mt-4">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Capacity</th>
                <th className="px-4 py-2">Operating Hours</th>
                <th className="px-4 py-2">Trucks</th>
                <th className="px-4 py-2">Staff</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {centres.map((centre) => (
                <tr key={centre._id} className="border-t">
                  <td className="px-4 py-2">{centre.name}</td>
                  <td className="px-4 py-2">{centre.location}</td>
                  <td className="px-4 py-2">{centre.capacity}</td>
                  <td className="px-4 py-2">{centre.operatingHours}</td>
                  <td className="px-4 py-2">{centre.resources.trucks}</td>
                  <td className="px-4 py-2">{centre.resources.staff}</td>
                  <td className="px-4 py-2">
                    {renderStatus(centre.status)}
                  </td>{" "}
                  {/* Updated */}
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleEdit(centre)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(centre._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Inline Form for Adding/Editing Collection Center */}
        {isFormVisible && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
              <div className="flex justify-end">
                <button
                  onClick={() => setIsFormVisible(false)} // Hide form on close
                  className="text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>
              <AdminAddCentreForm
                onCenterAdded={handleCenterAdded}
                editCenter={editCenter} // Pass the center to be edited to the form
              />
            </div>
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminCollectionCentres;
