import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/leaf.png";
import { CollectorContext } from "../context/collectorContext";
import QrScanner from "react-qr-scanner"; // Import the QR scanner
import "./collectorHeader.css";
import qr from "../images/qrcode.gif";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

function CollectorHeader() {
  const { currentUser, logout } = useContext(CollectorContext); // Use the logout method
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // For redirecting to login page

  const handleLogout = () => {
    logout(); // Call the logout method from CollectorContext
    navigate("/collector-signin"); // Redirect to login page
  };

  return (
    <header className='p-4 text-green-700 bg-white shadow-md'>
      <div className='container flex items-center justify-between mx-auto'>
        {/* Logo/Branding */}
        <div className='flex items-center'>
          <img src={Logo} alt='App Logo' className='h-10 mr-3' />
          <h1 className='text-2xl font-bold'>Zero Waste Collector</h1>
        </div>

        {/* Navigation Links */}
        <nav className='hidden space-x-6 md:flex'>
          <Link to='/collector/dashboard' className='transition duration-300 hover:text-green-300'>
            Dashboard
          </Link>
          <Link to='/collector/routes' className='transition duration-300 hover:text-green-300'>
            Routes
          </Link>
          <Link to='/collector/notifications' className='transition duration-300 hover:text-green-300'>
            Notifications
          </Link>
          <Link to='/collector/profile' className='transition duration-300 hover:text-green-300'>
            Profile
          </Link>
        </nav>

        {/* User Info, QR Button, and Login/Logout */}
        <div className='flex items-center space-x-4'>
          <div className='relative w-10'>
            <img src={qr} alt='' onClick={() => setIsModalOpen(true)} />
          </div>

          {currentUser ? (
            <>
              <span className='hidden md:inline'>Welcome, {currentUser.name}!</span>
              <button
                onClick={handleLogout}
                className='flex items-center px-4 py-2 text-white transition duration-300 bg-red-500 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'>
                <FaSignOutAlt className='mr-2' /> {/* Logout Icon */}
                Logout
              </button>
            </>
          ) : (
            <Link
              to='/collector-signin'
              className='flex items-center px-4 py-2 text-white transition duration-300 bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
              <FaSignInAlt className='mr-2' /> {/* Login Icon */}
              Login
            </Link>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75'>
          <div className='bg-green-600 p-4 rounded-lg shadow-lg w-[400px] h-[400px] bg-opacity-40'>
            <h2 className='mb-4 text-lg font-bold text-center text-white'>Scan QR Code</h2>

            <div className='relative w-[300px] h-[300px] mx-auto border-4 border-white rounded-lg overflow-hidden'>
              <QrScanner
                delay={300}
                style={{ width: "300px", height: "300px", objectFit: "cover" }}
                onError={console.error}
                onScan={(data) => {
                  if (data) {
                    setIsModalOpen(false);
                    navigate(`/collector/progress?residentId=${data.text}`); // Navigate with the residentId
                  }
                }}
              />
            </div>

            <button
              onClick={() => setIsModalOpen(false)}
              className='px-4 py-2 text-white bg-red-500 rounded-full hover:bg-red-600 focus:outline-none'>
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default CollectorHeader;
