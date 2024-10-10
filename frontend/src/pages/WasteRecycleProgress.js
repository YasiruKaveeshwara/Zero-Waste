import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarIcon from '../components/sidebar/SidebarIcon';
import Header from '../components/header/Header';
import Footer from '../components/Footer';
import './WasteRecycleProgress.css';

// Import waste type icons
import MetalIcon from '../images/metal.png';
import PaperIcon from '../images/paper.jpeg';
import PlasticIcon from '../images/plastic.jpeg';
import OrganicIcon from '../images/organic.jpg';
import GlassIcon from '../images/glass.jpeg';
import ElectronicsIcon from '../images/electronics.png';
import TextileIcon from '../images/textile.jpg';
import WoodIcon from '../images/wood.jpg';
import HazardousIcon from '../images/hazardous.jpeg';

const WasteRecycleProgress = () => {
  const [wasteData, setWasteData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch waste data from the backend
    const fetchWasteData = async () => {
      try {
        const response = await axios.get('http://localhost:3050/api/auth/waste/progress', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = response.data;
        // Process the fetched data
        const processedData = processWasteData(data);
        setWasteData(processedData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Error fetching waste data');
        setLoading(false);
      }
    };

    fetchWasteData();
  }, []);

  // Function to process the fetched waste data and calculate quantities and percentages
  const processWasteData = (data) => {
    // Define initial waste types and their icons
    const wasteTypes = [
      { type: 'Metal', icon: MetalIcon, color: '#FFD700' },
      { type: 'Paper', icon: PaperIcon, color: '#FF1493' },
      { type: 'Plastic', icon: PlasticIcon, color: '#1E90FF' },
      { type: 'Organic', icon: OrganicIcon, color: '#32CD32' },
      { type: 'Glass', icon: GlassIcon, color: '#FF6347' },
      { type: 'Electronics', icon: ElectronicsIcon, color: '#4B0082' },
      { type: 'Wood', icon: WoodIcon, color: '#8B4513' },
      { type: 'Hazardous', icon: HazardousIcon, color: '#DC143C' },
    ];

    // Calculate the total quantity of all waste types combined
    const totalQuantity = data.reduce((total, waste) => total + parseInt(waste.quantity), 0);

    // Map through each waste type and calculate its total quantity and percentage
    return wasteTypes.map((wasteType) => {
      const totalForType = data
        .filter((waste) => waste.wasteType === wasteType.type)
        .reduce((total, waste) => total + parseInt(waste.quantity), 0);

      const percentage = totalQuantity > 0 ? Math.round((totalForType / totalQuantity) * 100) : 0;

      return {
        ...wasteType,
        percentage,
        quantity: `${totalForType} kg`,
      };
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  const totalQuantity = wasteData.reduce((total, waste) => total + parseInt(waste.quantity), 0);

  return (
    <div className="waste-progress-container">
      <SidebarIcon />
      <div className="main-content">
        <Header />
        <div className="progress-section">
          <h2>Waste Recycling Progress</h2>
          <p>Track the progress of our waste collection and recycling efforts. Below is a detailed summary of each type of waste we collect and recycle, along with their respective quantities and progress percentages.</p>
          <div className="progress-cards">
            {wasteData.map((waste, index) => (
              <div key={index} className="progress-card">
                <div className="waste-icon">
                  <img src={waste.icon} alt={`${waste.type} icon`} />
                </div>
                <h3>{waste.type}</h3>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar"
                    style={{ width: `${waste.percentage}%`, backgroundColor: waste.color }}
                  ></div>
                </div>
                <p>{waste.percentage}% collected</p>
                <p>Total Quantity: {waste.quantity}</p>
              </div>
            ))}
          </div>
          <div className="total-quantity">
            <h3>Total Quantity Collected: {totalQuantity} kg</h3>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default WasteRecycleProgress;
