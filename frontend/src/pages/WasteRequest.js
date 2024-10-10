import React, { useState } from "react";
import axios from "axios";
import SidebarIcon from "../components/sidebar/SidebarIcon";
import Header from "../components/header/Header";
import Footer from "../components/Footer.js";
import "../components/sidebar/styles.css";
import "./wasteRequest.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Bin from "../images/types.png";
import Carbon from "../images/footprint.jpg";
import Recycling from "../images/recycle-right.png";
import Landfill from "../images/landfill.jpg";

export default function WasteRequest({ onRequestCreated }) {
  const [wasteType, setWasteType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [collectionDate, setCollectionDate] = useState(null);
  const [collectionTime, setCollectionTime] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post(
        "http://localhost:3050/api/auth/waste/request",
        {
          wasteType,
          quantity,
          collectionDate,
          collectionTime,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response.data);
      setSuccessMessage("Waste request created successfully!");

      // Reset the form fields
      setWasteType("");
      setQuantity("");
      setCollectionDate(null);
      setCollectionTime("");

      // Call the function to update the waste history data
      if (onRequestCreated) {
        onRequestCreated();
      }
    } catch (err) {
      setError("Error creating waste request. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="waste-request-container">
      <SidebarIcon />
      <div className="main-content-request">
        <Header />
        <div className="banner-section">
          <h1>Eco-Friendly Waste Management</h1>
          <p>Make a difference by managing your waste responsibly and contributing to a cleaner environment.</p>
        </div>
        <div className="content-wrapper">
          <div className="form-container">
            <h2>Request Waste Collection</h2>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form onSubmit={handleFormSubmit} className="waste-request-form">
              <div className="form-group">
                <label htmlFor="wasteType">Type of Waste</label>
                <input
                  type="text"
                  id="wasteType"
                  value={wasteType}
                  onChange={(e) => setWasteType(e.target.value)}
                  placeholder="Enter waste type (e.g., Plastic, Organic)"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="text"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter quantity (e.g., 50 kg)"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="collectionDate">Preferred Collection Date</label>
                <DatePicker
                  selected={collectionDate}
                  onChange={(date) => setCollectionDate(date)}
                  dateFormat="MMMM d, yyyy"
                  className="date-picker-input"
                  placeholderText="Select a date"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="collectionTime">Preferred Collection Time</label>
                <input
                  type="time"
                  id="collectionTime"
                  value={collectionTime}
                  onChange={(e) => setCollectionTime(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <button type="submit" className="submit-button">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
          <div className="image-container">
            <img src={Bin} alt="Waste Management" className="waste-image" />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
