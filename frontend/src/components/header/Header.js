import React from "react";
import "./headerStyles.css";
import notificationIcon from "../../images/notification.png";
import menuIcon from "../../images/menus.png"; // Importing the menu icon

// Constants for routes
const ROUTES = {
  home: "/resident-home",
  about: "/resident-history",
  contact: "#contact",
};

const Header = ({ toggleSidebar }) => {
  return (
    <div className="header">
      {/* Menu icon at the left corner */}
      <img
        src={menuIcon}
        alt="Menu"
        className="menu-icon"
        onClick={toggleSidebar} // Optional: toggle sidebar on click
      />

      <div className="logo-and-nav">
        {/* Navigation links */}
        <nav className="navbar">
          <a href={ROUTES.home} className="nav-link">Home</a>
          <a href={ROUTES.about} className="nav-link">About</a>
          <a href={ROUTES.contact} className="nav-link">Contact Us</a>
        </nav>
      </div>

      {/* Notification and Welcome message */}
      <div className="icons">
        <h3>Welcome!</h3>
        <img
          src={notificationIcon}
          alt="Notification"
          className="notification-icon"
        />
      </div>
    </div>
  );
};

export default Header;
