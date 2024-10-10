import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarIcon from '../components/sidebar/SidebarIcon';
import Header from '../components/header/Header';
import Footer from '../components/Footer';
import styles from './ResidentProfileForm.module.css';
import withAuth from '../hoc/withAuth';

// Icons
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaCity, FaPhone, FaLock } from 'react-icons/fa';

const ResidentProfile = () => {
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
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResidentData = async () => {
      try {
        const response = await fetch('http://localhost:3050/api/auth/resident/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setForm({
            residentName: data.residentName,
            address: data.address,
            city: data.city,
            phone: data.phone,
            email: data.email,
            password: '',
            confirmPassword: ''
          });
        } else {
          setError('Failed to fetch resident data.');
        }
      } catch (err) {
        console.error('Error fetching resident data:', err);
        setError('An error occurred while fetching resident data.');
      }
    };

    fetchResidentData();
  }, []);

  const onUpdateField = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (form.password && form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3050/api/auth/resident/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          ...form,
          password: form.password ? form.password : undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Profile updated successfully!');
        setError('');
      } else {
        setError(data.message || 'Profile update failed. Please try again.');
      }
    } catch (err) {
      console.error('Profile update error:', err);
      setError('An error occurred while updating the profile.');
    }
  };

  return (
    <div className={styles.container}>
      <SidebarIcon />
      <div className="main-content">
        <Header />
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={onSubmit}>
            <h2 className={styles.heading}>Edit Resident Profile</h2>

            <div className={styles.formRow}>
              <label className={styles.formLabel}><FaUser className={styles.icon} /> Full Name</label>
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

            <div className={styles.formRow}>
              <label className={styles.formLabel}><FaMapMarkerAlt className={styles.icon} /> Address</label>
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

            <div className={styles.formRow}>
              <label className={styles.formLabel}><FaCity className={styles.icon} /> City</label>
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

            <div className={styles.formRow}>
              <label className={styles.formLabel}><FaPhone className={styles.icon} /> Phone</label>
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

            <div className={styles.formRow}>
              <label className={styles.formLabel}><FaEnvelope className={styles.icon} /> Email</label>
              <input
                className={styles.formField}
                type="email"
                name="email"
                value={form.email}
                disabled
              />
            </div>

            <div className={styles.formRow}>
              <label className={styles.formLabel}><FaLock className={styles.icon} /> New Password</label>
              <input
                className={styles.formField}
                type="password"
                name="password"
                value={form.password}
                onChange={onUpdateField}
                placeholder="Enter new password (leave blank to keep current password)"
              />
            </div>

            <div className={styles.formRow}>
              <label className={styles.formLabel}><FaLock className={styles.icon} /> Confirm Password</label>
              <input
                className={styles.formField}
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={onUpdateField}
                placeholder="Confirm new password"
              />
            </div>

            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}

            <div className={styles.formActions}>
              <button type="submit" className={styles.formSubmitBtn}>Update Profile</button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default withAuth(ResidentProfile);
