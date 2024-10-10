import React from "react";
import SidebarIcon from "../components/sidebar/SidebarIcon";
import Header from "../components/header/Header";
import "../components/sidebar/styles.css"; // Ensure styles are included
import "./home.css";
import CardView from "../components/CardView"; // Import the CardView component
import Footer from "../components/Footer.js"; // Importing the Footer component

// Sample images for testimonials
import User1 from "../images/user1.jpg";
import User2 from "../images/user2.jpg";

// Sample icons for services
import RecyclingIcon from "../images/recycle-right.png";
import EcoFriendlyIcon from "../images/footprint.jpg";
import CollectionIcon from "../images/landfill.jpg";

// Sample image for the section below services
import ServicesImage from "../images/greenn.png";

export default function Home() {
  return (
    <div className="home-container">
      <SidebarIcon />
      <div className="main-content">
        <Header />
        <div className="cards-section">
          <CardView />
        </div>
        <div className="services-section">
          <h2>Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <img src={RecyclingIcon} alt="Recycling Solutions" className="service-icon" />
              <h3>Recycling Solutions</h3>
              <p>We provide efficient recycling services to reduce waste and repurpose materials.</p>
            </div>
            <div className="service-card">
              <img src={EcoFriendlyIcon} alt="Eco-Friendly Practices" className="service-icon" />
              <h3>Eco-Friendly Practices</h3>
              <p>All our processes are designed to be environmentally friendly and sustainable.</p>
            </div>
            <div className="service-card">
              <img src={CollectionIcon} alt="On-Demand Collection" className="service-icon" />
              <h3>On-Demand Collection</h3>
              <p>Request waste collection services at your convenience through our easy-to-use platform.</p>
            </div>
          </div>
          {/* Image below services */}
          <div className="services-image-container">
            <img src={ServicesImage} alt="Services Overview" className="services-image" />
          </div>
        </div>
      
        <div className="cta-section">
          <h2>Ready to Make a Difference?</h2>
          <p>Join us today and contribute to a cleaner and greener environment. Get started now!</p>
          <button className="cta-button">Get Started</button>
        </div>
        <div className="testimonials-section">
          <h2>What Our Clients Say</h2>
          <div className="testimonials-container">
            <div className="testimonial-card">
              <div className="testimonial-content">
                "Eco Waste Management has completely transformed our approach to waste disposal. Highly recommend!"
              </div>
              <div className="testimonial-author">
                <img src={User1} alt="User" />
                <p>Sarah J., Business Owner</p>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                "Their commitment to sustainability and the environment is truly impressive."
              </div>
              <div className="testimonial-author">
                <img src={User2} alt="User" />
                <p>John D., Eco Enthusiast</p>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                "Their commitment to sustainability and the environment is truly impressive."
              </div>
              <div className="testimonial-author">
                <img src={User1} alt="User" />
                <p>John D., Eco Enthusiast</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
