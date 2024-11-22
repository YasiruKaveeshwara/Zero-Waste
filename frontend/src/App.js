import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./components/forms/ResidentLoginform";
import SignupForm from "./components/forms/ResidentSignupForm";
import Home from "./pages/Home";
import Progress from "./pages/WasteRecycleProgress";
import History from "./pages/WasteHistory";
import Request from "./pages/WasteRequest";
import ResidentProfile from "./pages/ResidentProfile";
import { ResidentProvider } from "./pages/ResidentContext";
import NonRegHome from "./pages/NonRegisteredHome";
import CollectorSignUp from "./pages/collectorSignUp";
import CollectorSignIn from "./pages/collectorSignIn";
import CollectorDashboard from "./pages/collectorDashboard";
import CollectorProfile from "./pages/collectorProfile";
import CollectorRoutesLayout from "./routes/collectorRoutes"; // Layout with header for collectors
import CollectorProgress from "./pages/collectorProgress";
import CollectorSchedule from "./pages/collectorSchedule";

import { CollectorProvider } from "./context/collectorContext";

function App() {
  return (
    <BrowserRouter>
      <ResidentProvider>
        <CollectorProvider>
          {/* Include CollectorProvider here */}
          <Routes>
            {/* Public Routes */}
            <Route path='/' element={<NonRegHome />} />
            <Route path='/resident-signup' element={<SignupForm />} />
            <Route path='/resident-nonreghome' element={<NonRegHome />} />
            <Route path='/resident-login' element={<LoginForm />} />

            {/* Protected Resident Routes */}
            <Route path='/resident-home' element={<Home />} />
            <Route path='/resident-history' element={<History />} />
            <Route path='/resident-request' element={<Request />} />
            <Route path='/waste-progress' element={<Progress />} />
            <Route path='/resident-profile' element={<ResidentProfile />} />

            {/* Collector Routes */}
            <Route path='/collector-signup' element={<CollectorSignUp />} />
            <Route path='/collector-signin' element={<CollectorSignIn />} />

            {/* Collector Dashboard and Protected Routes with Header */}
            <Route path='/collector' element={<CollectorRoutesLayout />}>
              <Route path='dashboard' element={<CollectorDashboard />} />
              <Route path='profile' element={<CollectorProfile />} />
              <Route path='progress' element={<CollectorProgress />} />
              <Route path="schedule" element={<CollectorSchedule/>}/>
            </Route>
          </Routes>
        </CollectorProvider>
      </ResidentProvider>
    </BrowserRouter>
  );
}

export default App;
