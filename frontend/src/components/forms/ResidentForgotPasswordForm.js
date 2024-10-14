import React, { useState } from 'react';
import styles from './ResidentForgotPassword.module.css';

// Constants for API and Messages
const API_URL = 'http://localhost:3050/api/auth/forgot-password';
const EMAIL_SENT_MSG = 'Password reset email sent. Please check your inbox.';
const ERROR_MSG = 'An error occurred. Please try again later.';
const INVALID_EMAIL_MSG = 'Please enter a valid email.';

const ResidentForgotPasswordForm = () => {
  const [email, setEmail] = useState(''); // State for email input
  const [message, setMessage] = useState(''); // State for success message
  const [error, setError] = useState(''); // State for error message

  // Update email state when input changes
  const onUpdateEmail = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Validate email input
    if (!email) {
      setError(INVALID_EMAIL_MSG);
      return;
    }

    try {
      // POST request to forgot password API
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      // Parse JSON response
      const data = await response.json();

      // Handle successful response
      if (response.ok) {
        setMessage(EMAIL_SENT_MSG);
      } else {
        // Handle API error response
        setError(data.message || ERROR_MSG);
      }
    } catch (err) {
      // Log error and show error message
      console.error('Forgot password error:', err);
      setError(ERROR_MSG);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2 className={styles.heading}>Forgot Password</h2>
        
        {/* Success Message */}
        {message && <p className={styles.success}>{message}</p>}
        
        {/* Error Message */}
        {error && <p className={styles.error}>{error}</p>}
        
        <form onSubmit={onSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>Email</label>
            <input
              id="email"
              className={styles.formField}
              type="email"
              value={email}
              onChange={onUpdateEmail}
              placeholder="Enter your Email"
              required
            />
          </div>
          
          <div className={styles.formActions}>
            <button type="submit" className={styles.formSubmitBtn}>Send Reset Link</button>
          </div>
        </form>

        <div className={styles.backLink}>
          <p>
            <a href="/resident-login" className={styles.backLinkText}>Back to Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResidentForgotPasswordForm;
