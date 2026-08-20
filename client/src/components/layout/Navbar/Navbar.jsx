import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, UserPlus, LogIn, X, Menu, Phone, Mail, Instagram, Twitter, Facebook, ShoppingCart, Search } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import './Navbar.css';

const useMagneticEffect = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });
  const handleMouseMove = (e) => {
    if (window.innerWidth < 1024) return;
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set((clientX - (left + width / 2)) * 0.3);
    y.set((clientY - (top + height / 2)) * 0.3);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };
  return { springX, springY, handleMouseMove, handleMouseLeave };
};

const Navbar = () => {
  const { cartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) { if (user) setUser(null); return; }
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await axios.get(`${baseUrl}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data) setUser(res.data);
      else { localStorage.removeItem('token'); setUser(null); }
    } catch (err) {
      if (err.response && [401, 403].includes(err.response.status)) {
        localStorage.removeItem('token'); setUser(null);
      }
    }
  };

  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    fetchUser();
    const sync = () => fetchUser();
    window.addEventListener('storage', sync);
    window.addEventListener('auth-change', sync);
    const iv = setInterval(fetchUser, 5000);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', sync);
      window.removeEventListener('auth-change', sync);
      clearInterval(iv);
    };
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null); setIsOpen(false); navigate('/login');
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  const navLinks = [
    { name: 'Home',    path: '/' },
    { name: 'About',   path: '/about' },
    { name: 'Product', path: '/product' },
    { name: 'Blog',    path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const containerVars = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  };
  const itemVars = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };
  const mobileItemVars = {
    initial: { y: 40, opacity: 0 },
    animate: (i) => ({ y: 0, opacity: 1, transition: { delay: 0.2 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] } }),
    exit: { y: 20, opacity: 0, transition: { duration: 0.3 } },
  };

  const MagneticLink = ({ children, to, className }) => {
    const { springX, springY, handleMouseMove, handleMouseLeave } = useMagneticEffect();
    return (
      <motion.div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
        style={{ x: springX, y: springY }} className="flex items-center">
        <Link to={to} className={className}>{children}</Link>
      </motion.div>
    );
  };

  return (
    <>
      <div className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="top-bar-wrapper" />

        <header className="main-nav">
          <div className="nav-content">

            {/* ── LOGO ── flex-shrink: 1 so it can compress, min-width: 0 */}
            <motion.div className="nav-logo-area"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isLoaded ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <Link to="/" className="logo-link group">
                <div className="logo-icon-box">
                  <span className="logo-letter">N</span>
                  <div className="noise-overlay" />
                </div>
                <div className="logo-text-wrap">
                  <span className="logo-name">NB.CORP</span>
                  <span className="logo-tagline">Elite Engineering</span>
                </div>
              </Link>
            </motion.div>

            {/* ── DESKTOP NAV ── */}
            <motion.nav variants={containerVars} initial="initial"
              animate={isLoaded ? 'animate' : 'initial'}
              className="hidden lg:flex items-center gap-10 xl:gap-14">
              {navLinks.map((link) => (
                <motion.div key={link.name} variants={itemVars}>
                  <MagneticLink to={link.path}
                    className={`nav-item ${location.pathname === link.path ? 'text-brand-red' : ''}`}>
                    <div className="nav-link-container">
                      <div className="nav-link-text nav-text-top">{link.name}</div>
                      <div className="nav-link-text nav-text-bottom">{link.name}</div>
                    </div>
                    {location.pathname === link.path && (
                      <motion.div layoutId="activeHighlight" className="nav-active-pill"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                    )}
                  </MagneticLink>
                </motion.div>
              ))}
            </motion.nav>

            {/* ── ACTIONS — flex-shrink: 0, NEVER wrap ── */}
            <motion.div className="nav-actions"
              initial={{ opacity: 0, x: 20 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}>

              {/* Search */}
              <button onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`nav-icon-btn${isSearchOpen ? ' text-red-600' : ''}`}
                aria-label="Search">
                <Search size={20} />
              </button>

              {/* Cart */}
              <MagneticLink to="/cart" className="btn-cart-pro group">
                <div className="relative">
                  <ShoppingCart size={20}
                    className="text-slate-700 group-hover:text-brand-red transition-all duration-300" />
                  {cartCount > 0 && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} key={cartCount} className="cart-badge">
                      {cartCount}
                    </motion.span>
                  )}
                </div>
              </MagneticLink>

              {/* Auth */}
              {user ? (
                <>
                  <Link to="/profile" className="hidden lg:flex flex-col items-end group/user">
                    <span className="text-[10px] font-black text-brand-red uppercase tracking-widest">{user.name}</span>
                    <span className="text-[8px] font-bold text-slate-500 uppercase">Authorized</span>
                  </Link>
                  <button onClick={handleLogout} className="nav-icon-btn">
                    <LogIn size={18} className="text-slate-600 rotate-180" />
                    <span className="hidden lg:inline text-xs font-bold uppercase text-slate-600 ml-1">Out</span>
                  </button>
                </>
              ) : (
                <>
                  {/* Login icon — always show on mobile */}
                  <MagneticLink to="/login" className="nav-icon-btn group">
                    <LogIn size={18} className="text-slate-600 group-hover:text-brand-red" />
                    <span className="hidden lg:inline text-sm font-bold text-slate-600 group-hover:text-brand-red ml-1">Login</span>
                  </MagneticLink>

                  {/* Register button */}
                  <Link to="/register" className="btn-register-pro glow-effect">
                    <span>Register</span>
                    <UserPlus size={13} className="hidden sm:inline" />
                    <div className="noise-overlay" />
                  </Link>
                </>
              )}

              {/* ── HAMBURGER — MUST always be last child, never hidden by overflow ── */}
              <motion.button whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className="mobile-trigger-btn lg:hidden"
                aria-label="Open menu">
                <Menu size={20} />
              </motion.button>
            </motion.div>
          </div>

          {/* Secondary Search Row */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="search-row-secondary">
                <div className="search-row-inner">
                  <div className="search-row-container">
                    <Search size={18} className="search-row-icon" />
                    <input autoFocus type="text" placeholder="Search..." className="search-row-input" />
                    <button onClick={() => setIsSearchOpen(false)} className="search-row-close"><X size={18} /></button>
                  </div>
                  <div className="search-row-scanline" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      </div>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[2000] overflow-hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-xl" />
            <motion.div
              initial={{ x: '100%', clipPath: 'circle(0% at 90% 10%)' }}
              animate={{ x: 0, clipPath: 'circle(150% at 90% 10%)' }}
              exit={{ x: '100%', clipPath: 'circle(0% at 90% 10%)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mobile-drawer">

              {/* Drawer Header */}
              <div className="drawer-header">
                <Link to="/" onClick={() => setIsOpen(false)} className="logo-link group">
                  <div className="logo-icon-box" style={{ width: 40, height: 40, borderRadius: 8 }}>
                    <span className="logo-letter" style={{ fontSize: '1.1rem' }}>N</span>
                    <div className="noise-overlay" />
                  </div>
                  <div className="logo-text-wrap">
                    <span className="logo-name" style={{ fontSize: '1.1rem' }}>NB.CORP</span>
                    <span className="logo-tagline">Elite Engineering</span>
                  </div>
                </Link>
                <motion.button whileHover={{ rotate: 90 }} whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)} className="drawer-close-btn">
                  <X size={20} />
                </motion.button>
              </div>

              {/* Drawer Body */}
              <div className="drawer-body">
                <nav className="flex flex-col">
                  {navLinks.map((link, i) => (
                    <motion.div key={link.name} custom={i} variants={mobileItemVars}
                      initial="initial" animate="animate" exit="exit">
                      <Link to={link.path} onClick={() => setIsOpen(false)} className="mobile-drawer-link group">
                        <span className="mobile-drawer-text">{link.name}</span>
                        <div className="mobile-drawer-arrow"><ArrowRight size={15} /></div>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }} className="drawer-footer">

                  <div className="drawer-contact">
                    {[
                      { Icon: Phone, text: '+91 98259 54315' },
                      { Icon: Mail,  text: 'nb2corporation@gmail.com' },
                    ].map(({ Icon, text }) => (
                      <div key={text} className="drawer-contact-item">
                        <div className="drawer-contact-icon"><Icon size={16} /></div>
                        <span>{text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="drawer-socials">
                    {[Instagram, Twitter, Facebook].map((Icon, idx) => (
                      <motion.div key={idx} whileHover={{ y: -4 }} className="drawer-social-btn">
                        <Icon size={20} />
                      </motion.div>
                    ))}
                  </div>

                  <div className="drawer-auth-grid">
                    {user ? (
                      <>
                        <Link to="/profile" onClick={() => setIsOpen(false)} className="drawer-user-card">
                          <span className="drawer-user-label">ACTIVE</span>
                          <span className="drawer-user-name">{user.name}</span>
                        </Link>
                        <button onClick={handleLogout} className="drawer-logout-btn">
                          <LogIn size={16} className="rotate-180" /><span>Logout</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" onClick={() => setIsOpen(false)} className="drawer-login-btn">
                          <LogIn size={16} /><span>Login</span>
                        </Link>
                        <Link to="/register" onClick={() => setIsOpen(false)} className="drawer-register-btn">
                          <span>Register</span><UserPlus size={14} />
                        </Link>
                      </>
                    )}
                  </div>

                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => setIsOpen(false)} className="drawer-cta-btn">
                    Get a Free Quote
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;