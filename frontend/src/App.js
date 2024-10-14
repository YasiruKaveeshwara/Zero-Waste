import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./components/forms/ResidentLoginform";
import SignupForm from "./components/forms/ResidentSignupForm";
import Home from "./pages/Home";
import Progress from "./pages/WasteRecycleProgress";
import History from "./pages/WasteHistory";
import Request from "./pages/WasteRequest";
import ResidentProfile from "./pages/ResidentProfile";
import { AuthContextProvider } from "./context/AuthContext";
import { ResidentProvider } from "./pages/ResidentContext";
import NonRegHome from "./pages/NonRegisteredHome";
// Admin components
import AdminLogin from "./pages/AdminLogin";
import AdminDashboardLayout from "./pages/AdminDashboardLayout";
import AdminCollectionCentres from "./pages/AdminCollectionCentres";
import AdminPeakMonitoring from "./pages/AdminPeakMonitoring";
import AdminCentreDetails from "./pages/AdminCentreDetails";
import AdminDashboard from "./pages/AdminDashboard";

import CreateSchedule from "./pages/CreateSchedule";
import SchedulePage from "./pages/SchedulePage"; // Import the SchedulePage component
import TestPage from "./pages/TestPage"; // Import the SchedulePage component
// Protected route
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <ResidentProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<NonRegHome />} />
            <Route path="/resident-signup" element={<SignupForm />} />
            <Route path="/resident-nonreghome" element={<NonRegHome />} />
            <Route path="/resident-login" element={<LoginForm />} />
            {/* Protected Routes for Residents */}
            <Route path="/resident-home" element={<Home />} />
            <Route path="/resident-history" element={<History />} />
            <Route path="/resident-request" element={<Request />} />
            <Route path="/waste-progress" element={<Progress />} />
            <Route path="/resident-profile" element={<ResidentProfile />} />
            <Route path="/collector-schedules" element={<SchedulePage />} />{" "}
            {/* Route for the Schedule Page */}
            {/* Admin Routes */}
            <Route path="/admin-login" element={<AdminLogin />} />
            {/* Protect all admin routes */}
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboardLayout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-centres"
              element={
                <ProtectedRoute>
                  <AdminCollectionCentres />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-peak-monitoring"
              element={
                <ProtectedRoute>
                  <AdminPeakMonitoring />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-centre-details"
              element={
                <ProtectedRoute>
                  <AdminCentreDetails />
                </ProtectedRoute>
              }
            />
            {/* New Admin Routes for Scheduling */}
            <Route
              path="/create-schedule"
              element={
                <ProtectedRoute>
                  <CreateSchedule />
                </ProtectedRoute>
              }
            />
          </Routes>
        </ResidentProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
