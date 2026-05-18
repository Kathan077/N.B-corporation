import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Instagram, Twitter, Facebook, ArrowUpRight } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section bg-slate-950 text-white pt-24 pb-12 overflow-hidden relative">
      {/* Background Instrumentation */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
        <div className="footer-grid" />
        <div className="footer-noise" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Brand Identity */}
          <div className="footer-brand">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-10 h-1 bg-brand-red" />
              <h2 className="text-2xl font-black uppercase tracking-tighter">N.B. Corp</h2>
            </motion.div>
            <p className="text-slate-400 text-sm font-medium leading-relaxed mb-10 max-w-xs uppercase tracking-wide">
              Pioneering industrial excellence through technical precision and futuristic engineering solutions since 1998.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <motion.a 
                  key={i} 
                  href="#" 
                  whileHover={{ y: -5, color: '#DC2626' }}
                  className="w-10 h-10 rounded-lg border border-slate-800 flex items-center justify-center text-slate-400 transition-colors"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Nav */}
          <div className="footer-links">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-10">Navigation</h3>
            <ul className="flex flex-col gap-5">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Blog', path: '/blog' },
                { name: 'Products', path: '/product' },
                { name: 'Contact', path: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="group flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors"
                  >
                    <motion.span 
                      className="flex items-center gap-2"
                      whileHover={{ x: 10 }}
                    >
                      <span className="w-0 h-px bg-brand-red group-hover:w-4 transition-all" />
                      {item.name}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Suite */}
          <div className="footer-contact">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-10">Communications</h3>
            <div className="flex flex-col gap-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-brand-red">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="block text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Secure Line</span>
                  <p className="text-sm font-bold">+91  98259 54315</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-brand-red">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="block text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Digital Mail</span>
                  <p className="text-sm font-bold">nb2corporation@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location / HQ */}
          <div className="footer-hq">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-10">Tactical HQ</h3>
            <div className="flex items-start gap-4 pr-10">
              <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-brand-red">
                <MapPin size={18} />
              </div>
              <p className="text-sm font-bold leading-relaxed text-slate-300">
               G-10,11,12 SATKAR AVENUE <br />NR. RAILWAY CROSSINGM, NH NO -08, opp. starline maruti showroom, Naroda, Ahmedabad, Gujarat 382340
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.3em]">
              © {currentYear} N.B. Corporation // All Rights Reserved
            </span>
            <div className="h-4 w-px bg-slate-800" />
            <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.3em]">
              Precision Standard V.2.1
            </span>
          </div>
          
          <div className="flex gap-8">
            <a href="#" className="text-[8px] font-black text-slate-600 hover:text-brand-red uppercase tracking-[0.3em] transition-colors">Privacy Policy</a>
            <a href="#" className="text-[8px] font-black text-slate-600 hover:text-brand-red uppercase tracking-[0.3em] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Decorative Branding */}
      <div className="absolute top-0 right-[-10%] select-none pointer-events-none opacity-[0.02]">
        <h2 className="text-[20vw] font-black leading-none uppercase tracking-tighter text-white">
          PRECISION
        </h2>
      </div>
    </footer>
  );
};

export default Footer;
