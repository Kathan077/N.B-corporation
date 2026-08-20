import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Instagram, Twitter, Facebook, ArrowUpRight, Clock } from 'lucide-react';
import Logo from '../../common/Logo';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section bg-[#060a12] text-white pt-20 pb-12 overflow-hidden relative border-t border-slate-900/80">
      {/* Background Instrumentation */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="footer-grid" />
        <div className="footer-noise" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-14 mb-16 items-start">
          
          {/* Column 1: Brand Identity */}
          <div className="footer-col footer-brand flex flex-col">
            <div className="flex items-center mb-5">
              <Logo height={58} light={true} />
            </div>
            <p className="text-slate-400 text-sm font-normal leading-relaxed mb-6">
              Pioneering industrial excellence through technical precision, high-grade 3M adhesive tapes, and engineering solutions since 1998.
            </p>
            <div className="flex items-center gap-3 mt-auto">
              {[
                { Icon: Instagram, href: "#", label: "Instagram" },
                { Icon: Twitter,   href: "#", label: "Twitter" },
                { Icon: Facebook,  href: "#", label: "Facebook" }
              ].map(({ Icon, href, label }, i) => (
                <motion.a 
                  key={i} 
                  href={href} 
                  aria-label={label}
                  whileHover={{ y: -3, borderColor: '#DC2626', color: '#DC2626' }}
                  className="w-10 h-10 rounded-xl border border-slate-800/80 bg-slate-900/50 flex items-center justify-center text-slate-400 transition-colors shadow-sm"
                >
                  <Icon size={17} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col footer-links flex flex-col">
            <div className="footer-col-header">
              <span className="footer-col-indicator" />
              <h3 className="footer-col-title">Navigation</h3>
            </div>
            <ul className="flex flex-col gap-3.5">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Products & Catalog', path: '/product' },
                { name: 'Blog & Articles', path: '/blog' },
                { name: 'Contact & Inquiry', path: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="group inline-flex items-center gap-2.5 text-sm font-medium text-slate-400 hover:text-white transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-red-500 transition-colors" />
                    <span>{item.name}</span>
                    <ArrowUpRight size={13} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-red-500" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Communications */}
          <div className="footer-col footer-contact flex flex-col">
            <div className="footer-col-header">
              <span className="footer-col-indicator" />
              <h3 className="footer-col-title">Communications</h3>
            </div>
            <div className="flex flex-col gap-4">
              <a 
                href="tel:+919825954315" 
                className="footer-contact-card group"
              >
                <div className="footer-contact-icon">
                  <Phone size={16} />
                </div>
                <div>
                  <span className="footer-contact-tag">Direct Helpline</span>
                  <p className="footer-contact-val group-hover:text-red-500 transition-colors">+91 98259 54315</p>
                </div>
              </a>

              <a 
                href="mailto:nb2corporation@gmail.com" 
                className="footer-contact-card group"
              >
                <div className="footer-contact-icon">
                  <Mail size={16} />
                </div>
                <div>
                  <span className="footer-contact-tag">Digital Dispatch</span>
                  <p className="footer-contact-val group-hover:text-red-500 transition-colors">nb2corporation@gmail.com</p>
                </div>
              </a>

              <div className="footer-contact-card">
                <div className="footer-contact-icon text-emerald-400 border-emerald-500/20 bg-emerald-500/10">
                  <Clock size={16} />
                </div>
                <div>
                  <span className="footer-contact-tag">Operating Hours</span>
                  <p className="footer-contact-val">Mon - Sat: 9:00 AM - 7:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Tactical Headquarters */}
          <div className="footer-col footer-hq flex flex-col">
            <div className="footer-col-header">
              <span className="footer-col-indicator" />
              <h3 className="footer-col-title">Tactical HQ</h3>
            </div>
            <div className="footer-address-card">
              <div className="flex items-start gap-3.5 mb-3">
                <div className="footer-contact-icon shrink-0 mt-0.5">
                  <MapPin size={16} />
                </div>
                <div className="text-sm font-medium text-slate-300 leading-relaxed">
                  <p className="font-bold text-white mb-1">NB Corporation</p>
                  <p>G-10, 11, 12 Satkar Avenue,</p>
                  <p>Nr. Railway Crossing, NH No-08,</p>
                  <p>Opp. Starline Maruti Showroom, Naroda,</p>
                  <p>Ahmedabad, Gujarat 382340</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-3">
            <span>© {currentYear} N.B. Corporation. All Rights Reserved.</span>
            <span className="text-slate-700">|</span>
            <span className="text-slate-400">Industrial Engineering Standard</span>
          </div>
          
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-red-500 transition-colors">About</Link>
            <Link to="/product" className="hover:text-red-500 transition-colors">Products</Link>
            <Link to="/contact" className="hover:text-red-500 transition-colors">Contact</Link>
            <a href="#" className="hover:text-red-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-red-500 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
