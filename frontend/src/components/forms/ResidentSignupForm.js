import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ResidentSignupForm.module.css';

// Icons (You can use a library like FontAwesome or import your own icons)
import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt, FaCity, FaPhone } from 'react-icons/fa';

const ResidentSignupForm = () => {
  const [form, setForm] = useState({
    residentName: '',
    address: '',
    city: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onUpdateField = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    if (!form.residentName || !form.address || !form.city || !form.phone || !form.email) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3050/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setError('');
        navigate('/'); 
      } else {
        setError(data.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('An error occurred during signup.');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2 className={styles.heading}>Resident Signup</h2>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}><FaUser className={styles.icon}/> Full Name</label>
          <input
            className={styles.formField}
            type="text"
            name="residentName"
            value={form.residentName}
            onChange={onUpdateField}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}><FaMapMarkerAlt className={styles.icon}/> Address</label>
          <input
            className={styles.formField}
            type="text"
            name="address"
            value={form.address}
            onChange={onUpdateField}
            placeholder="Enter your address"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}><FaCity className={styles.icon}/> City</label>
          <input
            className={styles.formField}
            type="text"
            name="city"
            value={form.city}
            onChange={onUpdateField}
            placeholder="Enter your city"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}><FaPhone className={styles.icon}/> Phone</label>
          <input
            className={styles.formField}
            type="tel"
            name="phone"
            value={form.phone}
            onChange={onUpdateField}
            placeholder="Enter your phone number"
            pattern="\d{10}"
            maxLength="10"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}><FaEnvelope className={styles.icon}/> Email</label>
          <input
            className={styles.formField}
            type="email"
            name="email"
            value={form.email}
            onChange={onUpdateField}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}><FaLock className={styles.icon}/> Password</label>
          <input
            className={styles.formField}
            type="password"
            name="password"
            value={form.password}
            onChange={onUpdateField}
            placeholder="Enter your password"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}><FaLock className={styles.icon}/> Confirm Password</label>
          <input
            className={styles.formField}
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={onUpdateField}
            placeholder="Confirm your password"
            required
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.formActions}>
          <button type="submit" className={styles.formSubmitBtn}>Sign Up</button>
        </div>

        <div className={styles.registerLink}>
          <p>
            Already registered?{" "}
            <a href="/" className={styles.registerLinkText}>
              Login here
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ResidentSignupForm;
