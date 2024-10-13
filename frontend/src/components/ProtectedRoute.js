// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Check if token exists

  if (!token) {
    return <Navigate to="/admin-login" />;
  }

  return children;
};

export default ProtectedRoute;