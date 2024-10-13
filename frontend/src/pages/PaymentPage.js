import React, { useState } from 'react';
import axios from 'axios';
import SidebarIcon from '../components/sidebar/SidebarIcon';
import Header from '../components/header/Header';
import Footer from '../components/Footer.js';
import './PaymentPage.css';

function PaymentPage() {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    wasteType: 'Plastic',
    quantity: 50, // Example data, ideally should be fetched
    amount: 25, // Example amount
    cardHolderName: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!paymentDetails.cardHolderName) {
      newErrors.cardHolderName = 'Cardholder name is required';
    }
    if (!paymentDetails.cardNumber || paymentDetails.cardNumber.length !== 12) {
      newErrors.cardNumber = 'Card number must be 12 digits';
    }
    if (!paymentDetails.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    }
    if (!paymentDetails.cvc || paymentDetails.cvc.length !== 3) {
      newErrors.cvc = 'CVC must be 3 digits';
    }
    return newErrors;
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await axios.post('http://localhost:3050/api/payment/process', {
        residentId: '603d9b2e1c2b9c1a24f12b34', // Replace with actual resident ID
        ...paymentDetails,
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Payment error:', error);
      alert('Failed to process payment.');
    }
  };

  return (
    <div className="payment-page-container">
      <SidebarIcon />
      <div className="main-content-payment">
        <Header />
        <div className="payment-content">
          <h2>Waste Collection Payment</h2>
          <table className="payment-table">
            <tbody>
              <tr>
                <td>Waste Type:</td>
                <td>{paymentDetails.wasteType}</td>
              </tr>
              <tr>
                <td>Quantity (kg):</td>
                <td>{paymentDetails.quantity}</td>
              </tr>
              <tr>
                <td>Amount to Pay ($):</td>
                <td>{paymentDetails.amount}</td>
              </tr>
            </tbody>
          </table>
          <button
            className="pay-button"
            onClick={() => setShowPaymentForm(true)}
          >
            Pay ${paymentDetails.amount}
          </button>

          {showPaymentForm && (
            <form className="payment-form" onSubmit={handlePaymentSubmit}>
              <h3>Enter Payment Details</h3>
              <div className="form-group">
                <label>Cardholder Name</label>
                <input
                  type="text"
                  name="cardHolderName"
                  value={paymentDetails.cardHolderName}
                  onChange={handleInputChange}
                  required
                />
                {errors.cardHolderName && <p className="error">{errors.cardHolderName}</p>}
              </div>
              <div className="form-group">
                <label>Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentDetails.cardNumber}
                  onChange={handleInputChange}
                  maxLength="12"
                  required
                />
                {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}
              </div>
              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={paymentDetails.expiryDate}
                  onChange={handleInputChange}
                  required
                  placeholder="MM/YY"
                />
                {errors.expiryDate && <p className="error">{errors.expiryDate}</p>}
              </div>
              <div className="form-group">
                <label>CVC</label>
                <input
                  type="text"
                  name="cvc"
                  value={paymentDetails.cvc}
                  onChange={handleInputChange}
                  maxLength="3"
                  required
                />
                {errors.cvc && <p className="error">{errors.cvc}</p>}
              </div>
              <button type="submit" className="submit-payment">
                Submit Payment
              </button>
            </form>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default PaymentPage;
