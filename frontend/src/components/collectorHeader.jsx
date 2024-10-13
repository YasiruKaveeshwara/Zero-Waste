import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../images/leaf.png";
import { AuthContext } from "../context/AuthContext";
import QrScanner from "react-qr-scanner"; // Import the QR scanner
import "./collectorHeader.css";

const CollectorHeader = () => {
  const { currentUser } = React.useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleScan = (data) => {
    if (data) {
      setScanResult(data.text); // Set scan result
      setIsModalOpen(false); // Close modal after successful scan
      alert(`QR Code scanned: ${data.text}`); // Handle the scanned data
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <header className='bg-white text-green-700 p-4 shadow-md'>
      <div className='container mx-auto flex justify-between items-center'>
        {/* Logo/Branding */}
        <div className='flex items-center'>
          <img src={Logo} alt='App Logo' className='h-10 mr-3' />
          <h1 className='text-2xl font-bold'>Zero Waste Collector</h1>
        </div>

        {/* Navigation Links */}
        <nav className='hidden md:flex space-x-6'>
          <Link to='/collector/dashboard' className='hover:text-green-300 transition duration-300'>
            Dashboard
          </Link>
          <Link to='/collector/routes' className='hover:text-green-300 transition duration-300'>
            Routes
          </Link>
          <Link to='/collector/notifications' className='hover:text-green-300 transition duration-300'>
            Notifications
          </Link>
          <Link to='/collector/profile' className='hover:text-green-300 transition duration-300'>
            Profile
          </Link>
        </nav>

        {/* User Info, QR Button, and Logout */}
        <div className='flex items-center space-x-4'>
          <button
            onClick={() => setIsModalOpen(true)}
            className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300'>
            Scan QR
          </button>

          {currentUser ? (
            <span className='hidden md:inline'>Welcome, {currentUser.name}!</span>
          ) : (
            <span className='hidden md:inline'>Welcome, Collector!</span>
          )}

          <button
            onClick={() => {
              // Add logout logic here
            }}
            className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300'>
            Logout
          </button>
        </div>
      </div>

      {/* QR Code Scanner Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-green-200 p-4 rounded-lg shadow-lg w-[400px] h-[400px] bg-opacity-40">
          <h2 className="text-lg font-bold mb-4 text-center text-white">Scan QR Code</h2>
      
          <div className="relative w-[300px] h-[300px] mx-auto border-4 border-white rounded-lg overflow-hidden">
            {/* QR Code Scanner */}
            <div className="w-[300px] h-[300px] overflow-hidden">
              <QrScanner
                delay={300}
                style={{ width: "300px", height: "300px", objectFit: "cover" }}  // Ensures the video is cropped
                onError={handleError}
                onScan={handleScan}
              />
            </div>
      
            {/* Scanner Animation Line */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute w-full h-1 bg-white animate-scan-line" />
            </div>
          </div>
      
          <button
            onClick={() => setIsModalOpen(false)}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
      
      
      )}
    </header>
  );
};

export default CollectorHeader;
