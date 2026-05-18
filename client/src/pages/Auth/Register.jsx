import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldPlus, User, Mail, Phone, Activity, Terminal, UserPlus } from 'lucide-react';
import axios from 'axios';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, mobile } = formData;
    
    if (name.trim().length < 3) {
      setError('Name must be at least 3 characters.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!/^\d{10}$/.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-hero-bg">
        <div className="auth-scan-line" />
      </div>
      <div className="auth-bg-grid" aria-hidden="true" />

      <span className="auth-side-label left">REGISTRATION_PROTOCOL // NEW_ENTRY</span>
      <span className="auth-side-label right">DATA_VALIDATION // ACTIVE</span>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="security-module"
      >
        <div className="module-bracket-auth tl" />
        <div className="module-bracket-auth tr" />
        <div className="module-bracket-auth bl" />
        <div className="module-bracket-auth br" />

        {/* Header */}
        <div className="module-header">
          <div className="status-bar-auth">
            <div className="status-dot-auth active" />
            <div className="status-dot-auth" />
            <div className="status-dot-auth" />
          </div>

          <div className="module-brand-strip">
            <ShieldPlus size={17} className="brand-strip-icon" />
            <span className="brand-strip-text">Identity Setup Terminal</span>
          </div>

          <h1 className="module-title">Register</h1>
          <p className="module-subtitle">Enroll Personnel Data</p>
        </div>

        {/* Notifications */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="auth-notify error"
          >
            Protocol Error: {error}
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="auth-notify success"
          >
            Identity Registered. Initializing Login...
          </motion.div>
        )}

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <label>Personnel_Name / Username</label>
            <div className="relative">
              <span className="absolute"><User size={14} /></span>
              <input
                type="text"
                placeholder="Enter full name..."
                value={formData.name}
                onChange={handleChange('name')}
                required
              />
              <div className="input-focus-line" />
            </div>
          </div>

          <div className="auth-input-group">
            <label>Personnel_Email / Contact</label>
            <div className="relative">
              <span className="absolute"><Mail size={14} /></span>
              <input
                type="email"
                placeholder="Enter email address..."
                value={formData.email}
                onChange={handleChange('email')}
                required
              />
              <div className="input-focus-line" />
            </div>
          </div>

          <div className="auth-input-group">
            <label>Personnel_Contact / Mobile</label>
            <div className="relative">
              <span className="absolute"><Phone size={14} /></span>
              <input
                type="tel"
                placeholder="Enter 10-digit mobile number..."
                value={formData.mobile}
                onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
                maxLength={10}
                required
              />
              <div className="input-focus-line" />
            </div>
          </div>

          <div className="auth-btn-container">
            <button type="submit" disabled={loading || success} className="auth-btn-skew">
              <div className="btn-skew-bg" />
              <div className="btn-content">
                <span>{loading ? 'Processing...' : 'Register Identity'}</span>
                <UserPlus size={15} />
              </div>
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="auth-footer-links">
          <Link to="/login" className="auth-link">
            Already Enrolled? <span>Access Terminal</span>
          </Link>
        </div>

        <div className="auth-status-strip" aria-hidden="true">
       
        </div>
      </motion.div>
    </div>
  );
};

export default Register;