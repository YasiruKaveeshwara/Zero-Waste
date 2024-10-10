import React from "react";
import "./headerStyles.css";
import notificationIcon from "../../images/notification.png"; // Import the notification icon
import logo from "../../images/leaf.png"; // Import the logo

export default function Header({ toggleSidebar }) {
  return (
    <div className="header">
      <div className="logo-and-nav">
        {/* <img src={logo} alt="Logo" className="logo" /> */}
        <nav className="navbar">
          <a href="/resident-home" className="nav-link">Home</a>
          <a href="/resident-history" className="nav-link">About</a>
          <a href="#contact" className="nav-link">Contact Us</a>
        </nav>
      </div>
      
      <div className="icons">
        <h3>Welcome!</h3>
        <img src={notificationIcon} alt="Notification" className="notification-icon" />
      </div>
    </div>
  );
}
