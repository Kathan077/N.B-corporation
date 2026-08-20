import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, UserPlus, LogIn, X, Menu, Phone, Mail, Instagram, Twitter, Facebook, ShoppingCart, Search, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { PRODUCTS } from '../../../data/productsData';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const matchingProducts = useMemo(() => {
    if (!searchQuery || searchQuery.trim().length < 1) return [];
    const q = searchQuery.toLowerCase().trim();
    return PRODUCTS.filter((p) => {
      const titleMatch = (p.name || p.title || '').toLowerCase().includes(q);
      const codeMatch = (p.code || p.sku || '').toLowerCase().includes(q);
      const catMatch = (p.category || p.mainCategory || '').toLowerCase().includes(q);
      const subCatMatch = (p.subCategory || p.subCategoryName || '').toLowerCase().includes(q);
      const descMatch = (p.description || p.tagline || '').toLowerCase().includes(q);
      return titleMatch || codeMatch || catMatch || subCatMatch || descMatch;
    }).slice(0, 6);
  }, [searchQuery]);

  const totalMatchCount = useMemo(() => {
    if (!searchQuery || searchQuery.trim().length < 1) return 0;
    const q = searchQuery.toLowerCase().trim();
    return PRODUCTS.filter((p) => {
      const titleMatch = (p.name || p.title || '').toLowerCase().includes(q);
      const codeMatch = (p.code || p.sku || '').toLowerCase().includes(q);
      const catMatch = (p.category || p.mainCategory || '').toLowerCase().includes(q);
      const subCatMatch = (p.subCategory || p.subCategoryName || '').toLowerCase().includes(q);
      const descMatch = (p.description || p.tagline || '').toLowerCase().includes(q);
      return titleMatch || codeMatch || catMatch || subCatMatch || descMatch;
    }).length;
  }, [searchQuery]);

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
                  <Link to="/profile" className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200/80 transition-all group/user">
                    <div className="w-6 h-6 rounded-full bg-red-600/10 text-red-600 flex items-center justify-center font-bold shrink-0">
                      <User size={13} />
                    </div>
                    <div className="flex flex-col text-left leading-none max-w-[130px]">
                      <span className="text-xs font-semibold text-slate-800 truncate group-hover/user:text-red-600 transition-colors">
                        {user.name}
                      </span>
                      <span className="text-[9px] font-medium text-slate-500 mt-0.5">My Profile</span>
                    </div>
                  </Link>
                  <button onClick={handleLogout} className="nav-icon-btn">
                    <LogIn size={18} className="text-slate-600 rotate-180" />
                    <span className="hidden lg:inline text-xs font-bold uppercase text-slate-600 ml-1">Logout</span>
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
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="search-row-secondary"
              >
                <div className="search-row-inner">
                  <div className="search-row-container">
                    <Search size={18} className="search-row-icon" />
                    <input
                      autoFocus
                      type="text"
                      placeholder="Search 3M tapes, abrasives, adhesives, safety gear..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="search-row-input"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="text-xs font-semibold text-slate-400 hover:text-white px-2 py-1 bg-slate-800/60 rounded-md transition-colors mr-1"
                      >
                        Clear
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="search-row-close"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Pro Live Search Results Overlay */}
                  {searchQuery.trim().length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.25 }}
                      className="search-results-overlay"
                    >
                      {matchingProducts.length > 0 ? (
                        <>
                          <div className="search-results-header">
                            <span className="search-results-title flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-300">
                              <Search size={13} className="text-red-500" /> Matching 3M Products
                            </span>
                            <span className="search-results-badge text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-red-600/20 text-red-400 border border-red-500/30">
                              {totalMatchCount} Available
                            </span>
                          </div>

                          <div className="search-results-list">
                            {matchingProducts.map((prod) => {
                              const prodImg = prod.image || (prod.images && prod.images[0]) || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300';
                              return (
                                <div
                                  key={prod.id}
                                  onClick={() => {
                                    setIsSearchOpen(false);
                                    setSearchQuery('');
                                    navigate(`/product/${prod.id}`);
                                  }}
                                  className="search-result-item group"
                                >
                                  <div className="search-result-img-box">
                                    <img
                                      src={prodImg}
                                      alt={prod.name || prod.title}
                                      className="search-result-img"
                                      onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300';
                                      }}
                                    />
                                  </div>
                                  <div className="search-result-info">
                                    <div className="flex items-center gap-2 mb-0.5">
                                      <span className="search-result-cat">{prod.category || prod.mainCategory || '3M Industrial'}</span>
                                      {prod.code && <span className="search-result-code">SKU: {prod.code}</span>}
                                    </div>
                                    <h4 className="search-result-title">{prod.name || prod.title}</h4>
                                    <p className="search-result-desc">
                                      {prod.tagline || prod.description || 'Engineered high-performance 3M industrial solution.'}
                                    </p>
                                  </div>
                                  <div className="search-result-action">
                                    <span className="search-view-btn">
                                      View <ArrowRight size={13} />
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          <div className="search-results-footer">
                            <button
                              onClick={() => {
                                const q = searchQuery;
                                setIsSearchOpen(false);
                                setSearchQuery('');
                                navigate(`/products?search=${encodeURIComponent(q)}`);
                              }}
                              className="search-view-all-btn"
                            >
                              <span>View All {totalMatchCount} Products in Catalog</span>
                              <ArrowRight size={14} />
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="search-no-results">
                          <div className="search-no-icon">
                            <Search size={22} className="text-slate-400" />
                          </div>
                          <h4 className="text-sm font-bold text-slate-200 mb-1">
                            No 3M products found for "{searchQuery}"
                          </h4>
                          <p className="text-xs text-slate-400 mb-3">
                            Try searching for these popular industrial product categories:
                          </p>
                          <div className="search-tags-row">
                            {['VHB Tapes', 'Masking Tapes', 'Abrasives', 'Electrical Tapes', 'Adhesives'].map((tag) => (
                              <button
                                key={tag}
                                type="button"
                                onClick={() => setSearchQuery(tag)}
                                className="search-tag-chip"
                              >
                                {tag}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

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
                          <span className="drawer-user-label">My Account</span>
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