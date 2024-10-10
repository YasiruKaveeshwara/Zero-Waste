import React from 'react';
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
  const wasteData = [
    { type: 'Metal', percentage: 80, quantity: '800 kg', color: '#FFD700', icon: MetalIcon },
    { type: 'Paper', percentage: 20, quantity: '200 kg', color: '#FF1493', icon: PaperIcon },
    { type: 'Plastic', percentage: 50, quantity: '500 kg', color: '#1E90FF', icon: PlasticIcon },
    { type: 'Organic', percentage: 60, quantity: '600 kg', color: '#32CD32', icon: OrganicIcon },
    { type: 'Glass', percentage: 40, quantity: '400 kg', color: '#FF6347', icon: GlassIcon },
    { type: 'Electronics', percentage: 70, quantity: '300 kg', color: '#4B0082', icon: ElectronicsIcon },
    { type: 'Wood', percentage: 35, quantity: '350 kg', color: '#8B4513', icon: WoodIcon },
    { type: 'Hazardous', percentage: 15, quantity: '150 kg', color: '#DC143C', icon: HazardousIcon },
  ];

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
