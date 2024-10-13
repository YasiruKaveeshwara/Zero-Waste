import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ResidentForgotPassword.module.css';

const API_URL = 'http://localhost:3050/api/auth/forgot-password';
const EMAIL_SENT_MSG = 'Password reset email sent. Please check your inbox.';
const ERROR_MSG = 'An error occurred. Please try again later.';

const ResidentForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onUpdateEmail = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('Please enter a valid email.');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(EMAIL_SENT_MSG);
      } else {
        setError(data.message || ERROR_MSG);
      }
    } catch (err) {
      console.error('Forgot password error:', err);
      setError(ERROR_MSG);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2 className={styles.heading}>Forgot Password</h2>
        {message && <p className={styles.success}>{message}</p>}
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
