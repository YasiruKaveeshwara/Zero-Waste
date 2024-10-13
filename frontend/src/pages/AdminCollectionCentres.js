// src/pages/AdminCollectionCentres.js
import React, { useState, useEffect } from "react";
import AdminDashboardLayout from "../pages/AdminDashboardLayout"; // Import the layout

const AdminCollectionCentres = () => {
  const [centres, setCentres] = useState([]);

  useEffect(() => {
    // Fetch centres data from the API
    // Example: axios.get('/api/centres').then(response => setCentres(response.data));
  }, []);

  return (
    <AdminDashboardLayout>
      <h1 className="text-2xl font-bold">Admin Collection Centres</h1>
      <div className="mt-6">
        {/* Render centres data here */}
        <ul>
          {centres.map((centre) => (
            <li key={centre.id}>{centre.name}</li>
          ))}
        </ul>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminCollectionCentres;
