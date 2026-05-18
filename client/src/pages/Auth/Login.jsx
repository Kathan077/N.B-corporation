import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Phone, Lock, Activity, Terminal, ArrowRight, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import './Auth.css';

const Login = () => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/send-otp', { mobile });
      setStep(2);
      alert(`TESTING MODE: Your OTP is ${res.data.otp}`);
      setOtp(res.data.otp); // Auto-fill for convenience
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to send OTP. Is the number registered?');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(otp)) {
      setError('Please enter a valid 6-digit OTP.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', { mobile, otp });
      localStorage.setItem('token', res.data.token);
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new Event('auth-change'));
      setTimeout(() => navigate('/'), 500);
    } catch (err) {
      setError(err.response?.data?.msg || 'Invalid OTP');
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

      <span className="auth-side-label left">SECURITY_PROTOCOL // L3_ACCESS</span>
      <span className="auth-side-label right">ENCRYPTION_STATUS // ACTIVE</span>

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
            <div className={`status-dot-auth ${step >= 1 ? 'active' : ''}`} />
            <div className={`status-dot-auth ${step >= 2 ? 'active' : ''}`} />
            <div className="status-dot-auth" />
          </div>

          <div className="module-brand-strip">
            <ShieldCheck size={17} className="brand-strip-icon" />
            <span className="brand-strip-text">Auth Access Terminal</span>
          </div>

          <h1 className="module-title">{step === 1 ? 'Initialize' : 'Verify'}</h1>
          <p className="module-subtitle">
            {step === 1 ? 'Provide Personnel Identity' : 'Enter Decryption Key'}
          </p>
        </div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="auth-notify error"
          >
            Access Denied: {error}
          </motion.div>
        )}

        {/* Steps */}
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.form
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="auth-form"
              onSubmit={handleSendOtp}
            >
              <div className="auth-input-group">
                <label>Personnel_Contact / Mobile</label>
                <div className="relative">
                  <span className="absolute">
                    <Phone size={14} />
                  </span>
                  <input
                    type="tel"
                    placeholder="Enter 10-digit mobile number..."
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    maxLength={10}
                    required
                  />
                  <div className="input-focus-line" />
                </div>
              </div>

              <div className="auth-btn-container">
                <button type="submit" disabled={loading} className="auth-btn-skew">
                  <div className="btn-skew-bg" />
                  <div className="btn-content">
                    <span>{loading ? 'Requesting...' : 'Request Access'}</span>
                    <ArrowRight size={15} />
                  </div>
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.form
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="auth-form"
              onSubmit={handleVerifyOtp}
            >
              <div className="auth-input-group">
                <label>Decryption_Key / OTP</label>
                <div className="relative">
                  <span className="absolute">
                    <Lock size={14} />
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Enter 6-digit OTP..."
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    style={{ textAlign: 'center', letterSpacing: '0.7em', fontWeight: 900 }}
                  />
                  <div className="input-focus-line" />
                </div>
                <p className="otp-hint">
                  Sent to +91 {mobile.slice(-4).padStart(mobile.length, '*')}
                </p>
              </div>

              <div className="auth-btn-container">
                <button type="submit" disabled={loading} className="auth-btn-skew">
                  <div className="btn-skew-bg" />
                  <div className="btn-content">
                    <span>{loading ? 'Verifying...' : 'Authorize Access'}</span>
                    <CheckCircle2 size={15} />
                  </div>
                </button>
                <button type="button" onClick={() => setStep(1)} className="auth-btn-ghost">
                  Change Number
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="auth-footer-links">
          <Link to="/register" className="auth-link">
            New Personnel? <span>Register Identity</span>
          </Link>
        </div>

        <div className="auth-status-strip" aria-hidden="true">
     
        </div>
      </motion.div>
    </div>
  );
};

export default Login;