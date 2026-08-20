import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Phone, MapPin, Send, Clock, CheckCircle2, 
  Sparkles, ShieldCheck, Wrench, MessageSquare, 
  Building, User, ChevronDown, HelpCircle, ArrowRight,
  Headphones, FileText, Check
} from 'lucide-react';
import Footer from '../components/layout/Footer/Footer';
import './Contact.css';

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className={`contact-faq-item ${isOpen ? 'open' : ''}`}>
    <button className="contact-faq-trigger" onClick={onClick} type="button">
      <span className="contact-faq-q">{question}</span>
      <ChevronDown className={`contact-faq-icon ${isOpen ? 'rotate-180' : ''}`} size={18} />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="contact-faq-content"
        >
          <p className="contact-faq-a">{answer}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    inquiryType: '3M Tape & Adhesives',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const inquiryTypes = [
    '3M Tape & Adhesives',
    'Abrasives & Finishing',
    'Custom Slitting & Converting',
    'Bulk RFQ / Quotation',
    'Technical Support'
  ];

  const faqs = [
    {
      q: "Can I request product samples for testing on our production line?",
      a: "Yes, absolutely! We provide technical samples of 3M™ VHB tapes, abrasive discs, and adhesives so your engineering team can validate bond strength and surface finish before placing volume orders."
    },
    {
      q: "Do you offer custom slitting and die-cutting services?",
      a: "Yes. We operate advanced precision slitting and die-cutting machinery to convert tape rolls to any custom width (from 3mm upwards) or bespoke shape according to your engineering drawings."
    },
    {
      q: "What is the typical turnaround time for orders and RFQs?",
      a: "Standard inquiries and quotes are processed within 4–12 business hours. In-stock products are dispatched within 24–48 hours across our pan-India logistics network."
    },
    {
      q: "Are all products genuine and certified by 3M™?",
      a: "As an Authorized 3M™ Industrial Distributor & Converter with 20+ years of industry leadership, 100% of our products are certified, traceable, and backed by full manufacturer warranties and technical datasheets."
    }
  ];

  const handleChange = (e) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setSubmitting(true);
    // Simulate server submission
    await new Promise(r => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      {/* ── Top Ambient Lighting ── */}
      <div className="contact-ambient-glow" />

      {/* ── 1. HERO SECTION ── */}
      <section className="contact-hero-pro">
        <div className="contact-hero-container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="contact-badge-pill"
          >
            <span className="contact-badge-dot" />
            <span>CONNECT WITH OUR INDUSTRIAL SPECIALISTS</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="contact-hero-heading"
          >
            Let's Engineer Your <span className="text-red-highlight">Solution Together</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="contact-hero-sub"
          >
            Whether you need custom slit tapes, high-performance 3M™ abrasives, or a competitive volume quote, our application engineers are ready to assist you.
          </motion.p>
        </div>
      </section>

      {/* ── 2. QUICK CONTACT CARDS ── */}
      <section className="contact-cards-section">
        <div className="contact-container">
          <div className="contact-cards-grid">
            
            {/* Phone Card */}
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="contact-info-card group"
            >
              <div className="contact-card-icon-box red">
                <Phone size={24} />
              </div>
              <div className="contact-card-content">
                <span className="contact-card-tag">DIRECT HOTLINE</span>
                <h3 className="contact-card-title">+91 98259 54315</h3>
                <p className="contact-card-desc">Mon – Sat: 9:00 AM – 7:00 PM IST</p>
              </div>
              <a href="tel:+919825954315" className="contact-card-action">
                <span>Call Directly</span>
                <ArrowRight size={15} />
              </a>
            </motion.div>

            {/* Email Card */}
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="contact-info-card group"
            >
              <div className="contact-card-icon-box dark">
                <Mail size={24} />
              </div>
              <div className="contact-card-content">
                <span className="contact-card-tag">OFFICIAL EMAIL</span>
                <h3 className="contact-card-title">nb2corporation@gmail.com</h3>
                <p className="contact-card-desc">Fast response within 4–12 business hours</p>
              </div>
              <a href="mailto:nb2corporation@gmail.com" className="contact-card-action">
                <span>Send Email</span>
                <ArrowRight size={15} />
              </a>
            </motion.div>

            {/* Location Card */}
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="contact-info-card group"
            >
              <div className="contact-card-icon-box red">
                <MapPin size={24} />
              </div>
              <div className="contact-card-content">
                <span className="contact-card-tag">CENTRAL FACILITY</span>
                <h3 className="contact-card-title">Ahmedabad, Gujarat</h3>
                <p className="contact-card-desc">Headquarters & Conversion Facility</p>
              </div>
              <a 
                href="https://maps.google.com/?q=Ahmedabad,Gujarat,India" 
                target="_blank" 
                rel="noreferrer" 
                className="contact-card-action"
              >
                <span>Get Directions</span>
                <ArrowRight size={15} />
              </a>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 3. MAIN FORM & VALUE PROPOSITION SECTION ── */}
      <section className="contact-main-section">
        <div className="contact-container">
          <div className="contact-main-grid">

            {/* Left Column: Why Partner with Us */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="contact-details-col"
            >
              <div className="contact-section-badge">
                <Sparkles size={14} className="text-red-600" />
                <span>EXCELLENCE WITH EXPERIENCE</span>
              </div>
              
              <h2 className="contact-details-heading">
                Partner with Certified <br />
                <span className="text-red-highlight">3M™ Industrial Leaders</span>
              </h2>

              <p className="contact-details-sub">
                Since 2006, N.B. Corporation has empowered over 1,000+ manufacturing facilities across India with state-of-the-art adhesive and abrasive solutions.
              </p>

              {/* Value Highlights */}
              <div className="contact-perks-list">
                <div className="contact-perk-item">
                  <div className="contact-perk-icon">
                    <Wrench size={20} />
                  </div>
                  <div>
                    <h4 className="contact-perk-title">Technical Application Consulting</h4>
                    <p className="contact-perk-desc">On-site technical evaluation to ensure the ideal tape & abrasive grade for your exact substrates.</p>
                  </div>
                </div>

                <div className="contact-perk-item">
                  <div className="contact-perk-icon">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="contact-perk-title">100% Genuine 3M™ Certified</h4>
                    <p className="contact-perk-desc">Authorized distributor backing with official batch warranties and technical datasheets.</p>
                  </div>
                </div>

                <div className="contact-perk-item">
                  <div className="contact-perk-icon">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="contact-perk-title">Fast RFQ & Sample Dispatches</h4>
                    <p className="contact-perk-desc">Rapid quote turnarounds and trial samples dispatched directly to your manufacturing plant.</p>
                  </div>
                </div>
              </div>

              {/* Working Hours Card */}
              <div className="contact-hours-card">
                <div className="flex items-center gap-3 mb-3">
                  <Clock size={20} className="text-red-600" />
                  <h4 className="font-bold text-slate-900">Operational Hours</h4>
                </div>
                <div className="contact-hours-row">
                  <span>Monday – Saturday:</span>
                  <span className="font-semibold text-slate-800">9:00 AM – 7:00 PM (IST)</span>
                </div>
                <div className="contact-hours-row">
                  <span>Sunday:</span>
                  <span className="text-slate-500 font-medium">Closed (Emergency support via Email)</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Premium Inquiry Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="contact-form-wrapper"
            >
              <div className="contact-form-card">
                <div className="contact-form-header">
                  <div className="contact-form-header-badge">QUICK INQUIRY / RFQ</div>
                  <h3 className="contact-form-title">Send Us a Message</h3>
                  <p className="contact-form-subtitle">Fill out the details below and an application specialist will contact you promptly.</p>
                </div>

                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="contact-success-box"
                  >
                    <div className="contact-success-icon-wrap">
                      <CheckCircle2 size={56} className="text-emerald-500" />
                    </div>
                    <h3 className="contact-success-title">Message Sent Successfully!</h3>
                    <p className="contact-success-desc">
                      Thank you for contacting N.B. Corporation. Our engineering team has received your request and will get back to you within 4–12 business hours.
                    </p>
                    <button 
                      onClick={() => {
                        setSubmitted(false);
                        setFormState({ name: '', email: '', phone: '', company: '', inquiryType: '3M Tape & Adhesives', message: '' });
                      }}
                      className="contact-reset-btn"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form-element">
                    
                    {/* Inquiry Type Chips */}
                    <div className="form-group-full">
                      <label className="contact-field-label">Select Requirement Type</label>
                      <div className="inquiry-chips-grid">
                        {inquiryTypes.map(type => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setFormState(p => ({ ...p, inquiryType: type }))}
                            className={`inquiry-chip ${formState.inquiryType === type ? 'active' : ''}`}
                          >
                            {formState.inquiryType === type && <Check size={13} className="mr-1 inline" />}
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="form-grid-2col">
                      {/* Name */}
                      <div className="form-field-group">
                        <label htmlFor="contact-name" className="contact-field-label">Full Name <span className="text-red-500">*</span></label>
                        <div className="contact-input-wrap">
                          <User size={18} className="contact-field-icon" />
                          <input 
                            id="contact-name"
                            type="text" 
                            name="name" 
                            placeholder="e.g. Rajesh Patel" 
                            value={formState.name}
                            onChange={handleChange}
                            required
                            className="contact-input"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="form-field-group">
                        <label htmlFor="contact-email" className="contact-field-label">Work Email <span className="text-red-500">*</span></label>
                        <div className="contact-input-wrap">
                          <Mail size={18} className="contact-field-icon" />
                          <input 
                            id="contact-email"
                            type="email" 
                            name="email" 
                            placeholder="name@company.com" 
                            value={formState.email}
                            onChange={handleChange}
                            required
                            className="contact-input"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-grid-2col">
                      {/* Phone */}
                      <div className="form-field-group">
                        <label htmlFor="contact-phone" className="contact-field-label">Phone / WhatsApp</label>
                        <div className="contact-input-wrap">
                          <Phone size={18} className="contact-field-icon" />
                          <input 
                            id="contact-phone"
                            type="tel" 
                            name="phone" 
                            placeholder="+91 98765 43210" 
                            value={formState.phone}
                            onChange={handleChange}
                            className="contact-input"
                          />
                        </div>
                      </div>

                      {/* Company */}
                      <div className="form-field-group">
                        <label htmlFor="contact-company" className="contact-field-label">Company / Organization</label>
                        <div className="contact-input-wrap">
                          <Building size={18} className="contact-field-icon" />
                          <input 
                            id="contact-company"
                            type="text" 
                            name="company" 
                            placeholder="e.g. Precision Auto Components" 
                            value={formState.company}
                            onChange={handleChange}
                            className="contact-input"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="form-field-group">
                      <label htmlFor="contact-message" className="contact-field-label">Message / Technical Specifications <span className="text-red-500">*</span></label>
                      <div className="contact-input-wrap textarea-wrap">
                        <MessageSquare size={18} className="contact-field-icon textarea-icon" />
                        <textarea 
                          id="contact-message"
                          name="message" 
                          rows="4" 
                          placeholder="Provide details such as substrate material, required tape width/thickness, application temperature, or quantity..."
                          value={formState.message}
                          onChange={handleChange}
                          required
                          className="contact-textarea"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit" 
                      disabled={submitting} 
                      className="contact-submit-btn group"
                    >
                      {submitting ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Submitting Request...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <span>Submit Technical Inquiry</span>
                          <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      )}
                    </button>

                    <div className="contact-form-footer-note">
                      <ShieldCheck size={14} className="text-slate-400" />
                      <span>Your information is strictly confidential and protected.</span>
                    </div>

                  </form>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 4. FAQ & ASSISTANCE SECTION ── */}
      <section className="contact-faq-section">
        <div className="contact-container">
          <div className="contact-faq-header text-center">
            <div className="contact-badge-pill mx-auto mb-3">
              <HelpCircle size={14} className="text-red-600" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-3">
              Common Technical & Order Queries
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Quick answers about sampling, custom tape conversions, logistics, and bulk order policies.
            </p>
          </div>

          <div className="contact-faq-grid">
            {faqs.map((faq, idx) => (
              <FAQItem 
                key={idx}
                question={faq.q}
                answer={faq.a}
                isOpen={openFaq === idx}
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;