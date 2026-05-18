import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Mail, Phone, MapPin, Send, Terminal,
  Activity, ArrowRight, Globe, CheckCircle
} from 'lucide-react';
import Footer from '../components/layout/Footer/Footer';
import './Contact.css';

const ContactNode = ({ icon, label, value, id, status = "ONLINE" }) => (
  <motion.div whileHover={{ y: -4 }} className="contact-node-card group">
    <div className="node-bracket tl" />
    <div className="node-bracket br" />

    <div className="node-header">
      <div className="node-status-row">
        <div className={`node-dot ${status === "ONLINE" ? "online" : ""}`} />
        <span className="node-status-text">{status} // {id}</span>
      </div>
      <Terminal size={11} className="node-terminal-icon" />
    </div>

    <div className="node-icon-wrapper">
      <span className="node-icon">{icon}</span>
    </div>

    <h4 className="node-label">{label}</h4>
    <p className="node-value">{value}</p>

    <div className="node-footer">
      <span className="node-footer-text">Vector_Direction: INBOUND</span>
      <ArrowRight size={13} className="node-arrow" />
    </div>
  </motion.div>
);

const Contact = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setFormState(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="contact-page" ref={containerRef}>


      {/* HUD corners — decorative only */}
      <div className="page-hud-elements" aria-hidden>
        <div className="corner-mark top-l" /><div className="corner-mark top-r" />
        <div className="corner-mark bottom-l" /><div className="corner-mark bottom-r" />
        <div className="side-label-v left">TERMINAL // NB_CORP_UPLINK</div>
        <div className="side-label-v right">STATUS: ENCRYPTED_CONNECTION</div>
      </div>

      {/* ── Hero ── */}
      <section className="contact-hero">
        <motion.div style={{ y, opacity }} className="hero-technical-bg">
          {/* Removed blueprint-grid */}
          <div className="scan-line-v" />
        </motion.div>
        <div className="hero-content">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <div className="hero-badge">
              <Activity size={12} />
              <span>Vector Selection Terminal</span>
            </div>
            <h1 className="hero-title">
              Contact<br />
              <span className="hero-title-outline">Us</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── Node Cards ── */}
      <section className="nodes-section">
        <div className="nodes-inner">
          <div className="nodes-grid">
            <ContactNode id="NODE_ALPHA" label="Satellite Data"   value="nb2corporation@gmail.com" icon={<Mail   size={26} />} />
            <ContactNode id="NODE_BETA"  label="Direct Uplink"    value="+91 98259 54315"    icon={<Phone  size={26} />} />
            <ContactNode id="NODE_GAMMA" label="Command Center"   value="Ahmedabad, Gujarat"   icon={<MapPin size={26} />} />
          </div>
        </div>
      </section>

      {/* ── Form Section ── */}
      <section className="form-section">
        <div className="form-section-inner">

          {/* Left info */}
          <div className="form-info-col">
            <h2 className="form-heading">
              Request<br />
              <span className="form-heading-outline">Transmission</span>
            </h2>
            <p className="form-subtext">
              Initiate a secure data transmission to our command center.
              Our engineers will process your request through elite vetting protocols.
            </p>

            <div className="form-meta-list">
              <div className="form-meta-item">
                <div className="form-meta-icon-box"><Globe size={17} /></div>
                <div>
                  <div className="form-meta-label">Global Protocol</div>
                  <div className="form-meta-value">AVAILABLE // 24_7_365</div>
                </div>
              </div>
              <div className="form-meta-item">
                <div className="form-meta-icon-box"><Send size={17} /></div>
                <div>
                  <div className="form-meta-label">Response Latency</div>
                  <div className="form-meta-value">EST_TIME: &lt; 24h</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="form-col">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="uplink-form-container"
            >
              <div className="form-corner-dec tl" />
              <div className="form-corner-dec br" />
              <div className="form-id-tag">
                <span className="form-id-dot" />
                FORM_ID: 0x882_TERMINAL_QX
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="success-state"
                >
                  <CheckCircle size={42} className="success-icon" />
                  <div>
                    <p className="success-label">TRANSMISSION SUCCESSFUL</p>
                    <h3 className="success-title">Message Received</h3>
                    <p className="success-sub">Our command center will respond within 24h.</p>
                  </div>
                  <button
                    onClick={() => { setSubmitted(false); setFormState({ name: '', email: '', subject: '', message: '' }); }}
                    className="reset-btn"
                  >
                    ↩ RESET_TERMINAL
                  </button>
                </motion.div>
              ) : (
                <form className="uplink-form" onSubmit={handleSubmit}>
                  <div className="form-row-2col">
                    <div className="input-group">
                      <div className="input-status-tag">STAGE_1</div>
                      <label htmlFor="name">AGENT_ID / NAME</label>
                      <input id="name" name="name" type="text" placeholder="Full name..." value={formState.name} onChange={handleChange} required />
                      <div className="input-bracket" />
                    </div>
                    <div className="input-group">
                      <div className="input-status-tag">STAGE_2</div>
                      <label htmlFor="email">UPLINK / EMAIL</label>
                      <input id="email" name="email" type="email" placeholder="Email address..." value={formState.email} onChange={handleChange} required />
                      <div className="input-bracket" />
                    </div>
                  </div>

                  <div className="input-group">
                    <div className="input-status-tag">STAGE_3</div>
                    <label htmlFor="subject">VECTOR / SUBJECT</label>
                    <input id="subject" name="subject" type="text" placeholder="Subject..." value={formState.subject} onChange={handleChange} />
                    <div className="input-bracket" />
                  </div>

                  <div className="input-group">
                    <div className="input-status-tag">STAGE_4</div>
                    <label htmlFor="message">MESSAGE / DETAILS</label>
                    <textarea id="message" name="message" rows="4" placeholder="Your message..." value={formState.message} onChange={handleChange} required />
                    <div className="input-bracket" />
                  </div>

                  <div className="submit-wrap">
                    <button type="submit" disabled={submitting} className="submit-btn">
                      {submitting
                        ? <span className="submit-btn-text">TRANSMITTING...</span>
                        : <><span className="submit-btn-text">INITIATE UPLINK</span><Send size={16} className="submit-btn-icon" /></>
                      }
                    </button>
                    <div className="secure-row">
                      <div className="secure-line" />
                      <span className="secure-text">Secure Transmission</span>
                      <div className="secure-line" />
                    </div>
                  </div>
                </form>
              )}
            </motion.div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;