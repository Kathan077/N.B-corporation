import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Instagram, Twitter, Facebook, ArrowUpRight, Clock, ShieldCheck } from 'lucide-react';
import Logo from '../../common/Logo';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section bg-slate-50 text-slate-800 pt-20 pb-12 overflow-hidden relative border-t border-slate-200">
      {/* Subtle Background Instrumentation */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.4]">
        <div className="footer-grid-light" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-14 mb-16 items-start">
          
          {/* Column 1: Brand Identity */}
          <div className="footer-col footer-brand flex flex-col">
            <div className="flex items-center mb-5">
              <Logo height={75} />
            </div>
            <p className="text-slate-600 text-sm font-normal leading-relaxed mb-6">
              Pioneering industrial excellence through technical precision, high-grade 3M adhesive tapes, and engineering solutions since 2006.
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
                  className="w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 transition-colors shadow-sm"
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
              <h3 className="footer-col-title text-slate-900">Navigation</h3>
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
                    className="group inline-flex items-center gap-2.5 text-sm font-medium text-slate-600 hover:text-red-600 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-red-600 transition-colors" />
                    <span>{item.name}</span>
                    <ArrowUpRight size={13} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-red-600" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Communications */}
          <div className="footer-col footer-contact flex flex-col">
            <div className="footer-col-header">
              <span className="footer-col-indicator" />
              <h3 className="footer-col-title text-slate-900">Communications</h3>
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
                  <p className="footer-contact-val group-hover:text-red-600 transition-colors">+91 98259 54315</p>
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
                  <p className="footer-contact-val group-hover:text-red-600 transition-colors">nb2corporation@gmail.com</p>
                </div>
              </a>

              <div className="footer-contact-card">
                <div className="footer-contact-icon text-emerald-600 border-emerald-500/20 bg-emerald-50">
                  <Clock size={16} />
                </div>
                <div>
                  <span className="footer-contact-tag">Operating Hours</span>
                  <p className="footer-contact-val">Mon - Sat: 9:00 AM - 7:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Headquarters */}
          <div className="footer-col footer-hq flex flex-col">
            <div className="footer-col-header">
              <span className="footer-col-indicator" />
              <h3 className="footer-col-title text-slate-900">Headquarters</h3>
            </div>
            <div className="footer-address-card">
              <div className="flex items-start gap-3">
                <div className="footer-contact-icon shrink-0 mt-1">
                  <MapPin size={18} />
                </div>
                <div className="text-xs font-medium text-slate-600 leading-normal space-y-1">
                  <p className="font-bold text-slate-900 text-sm flex items-center gap-1.5 mb-1">
                    <span>NB Corporation</span>
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-red-100 text-red-600 border border-red-200">HQ</span>
                  </p>
                  <p className="text-slate-600 whitespace-nowrap">G-10, 11, 12 Satkar Avenue,</p>
                  <p className="text-slate-600 whitespace-nowrap">Nr. Railway Crossing, NH No. 08,</p>
                  <p className="text-slate-600 whitespace-nowrap">Opp. Starline Maruti Showroom,</p>
                  <p className="text-slate-600 whitespace-nowrap">Naroda, Ahmedabad, Gujarat 382340</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-3">
            <span>© {currentYear} N.B. Corporation. All Rights Reserved.</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600">Industrial Engineering Standard</span>
          </div>
          
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-red-600 transition-colors">About</Link>
            <Link to="/product" className="hover:text-red-600 transition-colors">Products</Link>
            <Link to="/contact" className="hover:text-red-600 transition-colors">Contact</Link>
            <a href="#" className="hover:text-red-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-red-600 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
