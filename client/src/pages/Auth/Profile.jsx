import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, ShieldCheck, Activity, Terminal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }

    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    axios
      .get(`${baseUrl}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => { setUser(res.data); setLoading(false); })
      .catch(() => { localStorage.removeItem('token'); navigate('/login'); });
  }, [navigate]);

  if (loading) {
    return <div className="auth-loading">Initializing Personnel Data...</div>;
  }

  return (
    <div className="auth-page">
      <div className="auth-hero-bg">
        <div className="auth-scan-line" />
      </div>
      <div className="auth-bg-grid" aria-hidden="true" />

      <span className="auth-side-label left">PROFILE_ACCESS // GRANTED</span>
      <span className="auth-side-label right">VERIFICATION_STATUS // VERIFIED</span>

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

        {/* Avatar & Name */}
        <div className="profile-avatar-wrap">
          <div className="profile-avatar">
            <User size={38} />
            <div className="profile-level-badge">LVL_3</div>
          </div>
          <h1 className="module-title">{user.name}</h1>
          <p className="module-subtitle">Authorized Personnel Account</p>
        </div>

        {/* Info Blocks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* ID */}
          <div className="profile-info-block">
            <label>Identity_ID</label>
            <p className="profile-info-value profile-info-value--mono">
              USR_{user._id?.slice(-8).toUpperCase()}
            </p>
            <div className="profile-verified-icon">
              <ShieldCheck size={20} color="#4ade80" />
            </div>
          </div>

          {/* Email + Mobile grid */}
          <div className="profile-grid">
            <div className="profile-info-block">
              <label>
                <Mail size={10} />
                Email_Address
              </label>
              <p className="profile-info-value">{user.email}</p>
            </div>

            <div className="profile-info-block">
              <label>
                <Phone size={10} />
                Contact_Mobile
              </label>
              <p className="profile-info-value">+91 {user.mobile}</p>
            </div>
          </div>
        </div>

        {/* Return button */}
        <div className="profile-actions">
          <button onClick={() => navigate('/')} className="auth-btn-skew">
            <div className="btn-skew-bg" style={{ background: 'rgba(220,38,38,0.18)' }} />
            <div className="btn-content">
              <span>Return to Dashboard</span>
            </div>
          </button>
        </div>

        <div className="auth-status-strip" aria-hidden="true">
          <Activity size={12} />
          <span>Secure Session: {new Date().toLocaleTimeString()}</span>
          <Terminal size={12} />
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;