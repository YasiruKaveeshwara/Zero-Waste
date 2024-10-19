import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const CollectorProfile = () => {
  const [collector, setCollector] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // State to differentiate between success and error messages
  const [showPassword, setShowPassword] = useState(false); // State for showing password

  // Toggle password visibility
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Fetch collector profile data (Read operation)
  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Retrieve the JWT token from localStorage
    axios
      .get("http://localhost:3050/api/collector/profile", {
        headers: { Authorization: `Bearer ${token}` }, // Add Authorization header
      })
      .then((response) => {
        setCollector(response.data);
      })
      .catch((error) => {
        console.error("Error fetching collector data:", error);
        setMessage(error.response?.data?.message || "Error fetching data");
        setMessageType("error");
      });
  }, []);

  // Update collector profile (Update operation)
  const handleUpdate = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken"); // Get token for update request
    axios
      .put("http://localhost:3050/api/collector/profile", collector, {
        headers: { Authorization: `Bearer ${token}` }, // Add Authorization header
      })
      .then((response) => {
        setMessage("Profile updated successfully!");
        setMessageType("success");
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        setMessage("Error updating profile.");
        setMessageType("error");
      });
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-2xl rounded-2xl max-w-lg my-10">
      <h1 className="text-3xl font-bold text-green-700 text-center mb-6">Collector Profile</h1>

      {message && (
        <div
          className={`px-4 py-3 rounded relative mb-4 ${
            messageType === "success" ? "bg-green-100 text-green-700 border border-green-400" : "bg-red-100 text-red-700 border border-red-400"
          }`}
        >
          <span className="block sm:inline">{message}</span>
        </div>
      )}

      {!isEditing ? (
        <>
          <div className="mb-6 mx-6">
            <p className="py-4">
              <strong>Name:</strong> {collector.name}
            </p>
            <p className="py-4">
              <strong>Email:</strong> {collector.email}
            </p>
            <p className="py-4">
              <strong>Phone:</strong> {collector.phone}
            </p>
          </div>

          <button onClick={() => setIsEditing(true)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full w-full mb-4">
            Edit Profile
          </button>
        </>
      ) : (
        <form onSubmit={handleUpdate} className="space-y-4 px-6 pb-6">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={collector.name}
              onChange={(e) => setCollector({ ...collector, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={collector.email}
              onChange={(e) => setCollector({ ...collector, email: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="relative">
            <label className="block text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"} // Toggle between text and password type
              name="password"
              value={collector.password}
              onChange={(e) => setCollector({ ...collector, password: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <span onClick={toggleShowPassword} className="absolute inset-y-0 right-4 top-10 cursor-pointer text-gray-500">
              {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Show eye icon */}
            </span>
          </div>

          <button type="submit" className="bg-green-500 mt-4 hover:bg-green-600 text-white px-4 py-2 rounded-full w-full">
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
};

export default CollectorProfile;
