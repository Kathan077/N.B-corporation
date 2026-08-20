import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Search, MessageSquare, Activity,
  Layers, ShieldCheck, Terminal, ChevronRight,
  Filter, Zap, Clock, Eye, BookOpen,
  Radio, Award, Users, BarChart2
} from 'lucide-react';
import { animate } from 'framer-motion';
import Footer from '../components/layout/Footer/Footer';
import tapesImage from '../assets/3m_industrial_tapes.png';
import './Blog.css';

/* ─── DATA ─────────────────────────────────────────────── */
const CATEGORIES = ["ALL", "INNOVATION", "TECHNOLOGY", "SUSTAINABILITY", "MATERIALS", "LOGISTICS", "SAFETY"];

const POSTS = [
  {
    id: "ART-001", title: "The Future of Industrial Automation", category: "TECHNOLOGY",
    excerpt: "Exploring the next generation of robotic precision and neural manufacturing protocols that will reshape factory floors globally.",
    author: "Dr. Aris Thorne", role: "Chief Engineer", date: "MAR 22, 2026", readTime: "8 MIN", views: "12.4K",
    image: "https://sanjaytools.com/wp-content/uploads/2022/11/sanjay-tools-infra-3.jpg"
  },
  {
    id: "ART-002", title: "Sustainable Supply Chain Logistics", category: "SUSTAINABILITY",
    excerpt: "How carbon-neutral logistics are transforming the global shipping landscape through radical systemic redesign.",
    author: "Sarah Jenkins", role: "Logistics Director", date: "MAR 20, 2026", readTime: "6 MIN", views: "9.1K",
    image: "https://images.pexels.com/photos/1556691/pexels-photo-1556691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: "ART-003", title: "Advanced Material Science v2.0", category: "MATERIALS",
    excerpt: "Integrating graphene-based composites into everyday structural engineering for next-decade resilience.",
    author: "Marcus Vance", role: "Materials Lead", date: "MAR 18, 2026", readTime: "10 MIN", views: "7.8K",
    image: "https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];

const STATS = [
  { value: "50K+", label: "Monthly Readers", icon: <Users size={20} /> },
  { value: "200+", label: "Articles Published", icon: <BookOpen size={20} /> },
  { value: "94%", label: "Reader Satisfaction", icon: <Award size={20} /> },
  { value: "12+", label: "Industry Sectors", icon: <BarChart2 size={20} /> },
];



/* ─── SUB-COMPONENTS ────────────────────────────────────── */
const HudTag = ({ children, className = "" }) => (
  <span className={`hud-tag ${className}`}>{children}</span>
);

const SectionEyebrow = ({ children }) => (
  <div className="section-eyebrow">
    <span className="eyebrow-line" />
    <span>{children}</span>
  </div>
);

const AnimatedCounter = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const number = parseFloat(value);
  const suffix = value.replace(/[0-9.]/g, '');

  useEffect(() => {
    const controls = animate(0, number, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        if (number % 1 === 0) setDisplayValue(Math.round(latest));
        else setDisplayValue(latest.toFixed(1));
      }
    });
    return controls.stop;
  }, [number]);

  return <span>{displayValue}{suffix}</span>;
};

/* ─── MAIN COMPONENT ────────────────────────────────────── */
const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const filteredPosts = POSTS.filter(p => {
    const matchCat = activeCategory === "ALL" || p.category === activeCategory;
    const matchQ = !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQ;
  });

  const featuredPost = POSTS[0] || {};

  return (
    <div className="blog-page" ref={containerRef}>


      {/* ── HUD Frame ─────────────────────────────────── */}
      <div className="page-hud-elements" aria-hidden>
        <div className="corner-mark top-l" /><div className="corner-mark top-r" />
        <div className="corner-mark bottom-l" /><div className="corner-mark bottom-r" />
        <div className="side-label-v left">ARCHIVE // NB_LOG_STREAM</div>
        <div className="side-label-v right">STATUS: DATA_SYNCHRONIZED</div>
      </div>

      {/* ══════════════════════════════════════════════
          01. HERO
      ══════════════════════════════════════════════ */}
      <section className="blog-hero">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="hero-bg-layer">
          <div className="hero-img-wrap">
            <img
              src={tapesImage}
              alt="3M Industrial Tapes" 
              className="hero-bg-img"
              style={{ opacity: 0.5, filter: 'none', zIndex: 1 }}
            />
          </div>
          <div className="hero-overlay" />
          {/* Removed blueprint-grid */}
          <div className="scan-line-v" />
          {/* Diagonal accent stripe */}
          <div className="hero-stripe" />
        </motion.div>

        <div className="hero-body">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 0.2 }
              }
            }}
            className="hero-text-block"
          >
            <motion.div 
               variants={{
                 hidden: { opacity: 0, x: -20 },
                 visible: { opacity: 1, x: 0 }
               }}
               className="hero-badge"
            >
              <Radio size={11} className="hero-badge-icon" />
              <span>Industrial Intel Stream</span>
              <span className="hero-badge-live">● LIVE</span>
            </motion.div>

            <motion.h1 
               variants={{
                 hidden: { opacity: 0, y: 40 },
                 visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
               }}
               className="hero-title"
            >
              Our<br />
              <span className="hero-title-outline">Blog</span>
            </motion.h1>

            <motion.p 
               variants={{
                 hidden: { opacity: 0, y: 20 },
                 visible: { opacity: 1, y: 0 }
               }}
               className="hero-subtitle"
            >
              Cutting-edge insights from the forefront of industrial engineering, materials science, and global logistics.
            </motion.p>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="hero-stats"
          >
            {STATS.map((s, i) => (
              <motion.div 
                key={i} 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="hero-stat-item"
              >
                <span className="hero-stat-icon">{s.icon}</span>
                <div>
                  <div className="hero-stat-value">
                    <AnimatedCounter value={s.value} />
                  </div>
                  <div className="hero-stat-label">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Floating search */}
    
      </section>

      {/* ══════════════════════════════════════════════
          02. FEATURED HERO POST
      ══════════════════════════════════════════════ */}
      <section className="featured-section">
        {/* Removed blueprint-grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="featured-wrap"
        >
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="featured-img-col"
          >
            <div className="featured-img-frame">
              <HudTag className="featured-unit-tag">PRIORITY_TRANS // 0xAF92</HudTag>
              <img src={'https://sanjaytools.com/wp-content/uploads/2022/11/sanjay-tools-infra-3.jpg'} alt={featuredPost.title} className="featured-img" />
              <div className="featured-img-grad" />
              <div className="featured-img-bottom">
                <span className="featured-img-cat">{featuredPost.category}</span>
                <div className="featured-img-meta">
                  <span><Clock size={10} /> {featuredPost.readTime} READ</span>
                  <span><Eye size={10} /> {featuredPost.views}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="featured-text-col"
          >
            <SectionEyebrow>Pinned_Intel // Editor's Pick</SectionEyebrow>

            <h2 className="featured-title">{featuredPost.title}</h2>

            <p className="featured-excerpt">{featuredPost.excerpt}</p>

            <div className="featured-author-row">
              <div className="featured-author-avatar">
                <img src={`https://sanjaytools.com/wp-content/uploads/2022/11/sanjay-tools-infra-3.jpg`} alt="" />
              </div>
              <div>
                <div className="featured-author-name">{featuredPost.author}</div>
                <div className="featured-author-role">{featuredPost.role}</div>
              </div>
              <div className="featured-date-chip">
                <Activity size={10} />
                <span>{featuredPost.date}</span>
              </div>
            </div>

            <button className="featured-cta">
              <span>Access_Manuscript</span>
              <div className="featured-cta-circle">
                <ChevronRight size={18} />
              </div>
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════
          03. TICKER / LIVE STREAM BAR
      ══════════════════════════════════════════════ */}
      <div className="ticker-bar" aria-hidden>
        <div className="ticker-label">
          <Zap size={11} />
          <span>LIVE_STREAM</span>
        </div>
        <div className="ticker-track">
          <div className="ticker-inner">
            {[...POSTS, ...POSTS].map((p, i) => (
              <span key={i} className="ticker-item">
                <span className="ticker-cat">{p.category}</span>
                {p.title}
                <span className="ticker-sep">//</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          04. TRENDING SIDEBAR + FILTER + GRID
      ══════════════════════════════════════════════ */}
      <section className="main-content-section">
        <div className="main-content-wrap">

          {/* Left: grid + filter */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid-col"
          >
            {/* Filter bar */}
            <div className="filter-bar-sticky">
              <div className="filter-bar-row">
                <Filter size={13} className="filter-ico" />
                <div className="filter-pills">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
                    >
                      {cat}
                      {activeCategory === cat && (
                        <motion.div layoutId="catBar" className="pill-bar" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <div className="filter-count">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
              </div>
            </div>

            {/* Blog grid */}
            {filteredPosts.length === 0 ? (
              <div className="no-results">
                <Terminal size={28} />
                <p>NO_RESULTS_FOUND // Modify filter parameters</p>
              </div>
            ) : (
              <div className="blog-grid">
                <AnimatePresence mode="popLayout">
                  {filteredPosts.map((post, i) => (
                    <motion.article
                      layout key={post.id}
                      initial={{ opacity: 0, y: 28 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.55, delay: i * 0.07 }}
                      className="blog-card group"
                    >
                      {/* Corner brackets */}
                      <div className="card-brackets" aria-hidden>
                        <i className="cb tl"/><i className="cb tr"/>
                        <i className="cb bl"/><i className="cb br"/>
                      </div>

                      {/* Image */}
                      <div className="card-img-box">
                        <HudTag>UNIT_ID: {post.id}</HudTag>
                        <img src={post.image} alt={post.title} className="card-img" />
                        <div className="card-scan-grid" />
                        <div className="card-img-tint" />
                        {/* Hover overlay */}
                        <div className="card-img-overlay">
                          <button className="card-overlay-btn">Read Article <ArrowRight size={14} /></button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="card-body">
                        <div className="card-meta-row">
                          <span className="card-cat">{post.category}</span>
                          <div className="card-meta-right">
                            <span><Clock size={9} /> {post.readTime}</span>
                            <span><Eye size={9} /> {post.views}</span>
                          </div>
                        </div>

                        <h3 className="card-title">{post.title}</h3>
                        <p className="card-excerpt">{post.excerpt}</p>

                        <div className="card-footer">
                          <div className="card-author-row">
                            <div className="card-avatar">
                              <img src={`https://i.pravatar.cc/60?u=${post.id}`} alt="" />
                            </div>
                            <div>
                              <div className="card-author-name">{post.author}</div>
                              <div className="card-author-date">{post.date}</div>
                            </div>
                          </div>
                          <button className="card-read-btn">
                            ACCESS <ArrowRight size={13} className="card-arrow" />
                          </button>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Load more */}
            <div className="load-more-row">
              <button className="load-more-btn">
                <span className="load-more-text">Load_More_Transmissions</span>
                <div className="load-more-fill" />
              </button>
            </div>
          </motion.div>

        </div>
      </section>



      {/* ══════════════════════════════════════════════
          06. RESOURCE ARCHIVE / VAULT
      ══════════════════════════════════════════════ */}
      <section className="archive-section">
        {/* Removed blueprint-grid */}
        <div className="archive-wrap">
          <div className="archive-header">
            <div>
              <SectionEyebrow>Intelligence_Vault</SectionEyebrow>
              <h2 className="archive-title">
                Technical<br />
                <span className="archive-title-outline">Briefings</span>
              </h2>
            </div>
            <p className="archive-desc">
              Access deep-dive technical manuals, corporate whitepapers, and global engineering research curated for industry leaders.
            </p>
          </div>

          <div className="archive-grid">
            {[
              { title: "Quantum Supply Optimization", id: "B-291", type: "WHITE_PAPER", icon: <Layers size={22} />, pages: "48 pages" },
              { title: "Structural Integrity v4.0",   id: "B-442", type: "TECH_MANUAL", icon: <ShieldCheck size={22} />, pages: "112 pages" },
              { title: "High-Frequency Logistics",    id: "B-108", type: "CORE_DATA",   icon: <Activity size={22} />, pages: "36 pages" },
              { title: "Industrial AI Protocol",      id: "B-772", type: "ARCHIVE",     icon: <Terminal size={22} />, pages: "94 pages" },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="resource-card group"
              >
                <div className="rc-bracket tl" /><div className="rc-bracket br" />
                <div className="rc-id">CRC_OK // {item.id}</div>
                <div className="rc-icon-box">{item.icon}</div>
                <span className="rc-type">{item.type}</span>
                <h3 className="rc-title">{item.title}</h3>
                <div className="rc-pages">{item.pages}</div>
                <button className="rc-btn">
                  Request Access <ArrowRight size={13} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          07. NEWSLETTER — FULL DARK SECTION
      ══════════════════════════════════════════════ */}
      <section className="nl-section">
        <div className="nl-wrap">
          <div className="nl-bg-grid" />
          <div className="nl-bg-texture" />
          <div className="nl-inner">
            <div className="nl-left">
              <SectionEyebrow>Direct_Uplink</SectionEyebrow>
              <h2 className="nl-title">
                Join the<br />
                <span className="nl-title-outline">Elite Core</span>
              </h2>
              <p className="nl-sub">
                Get exclusive access to pre-market technical reports and industrial insights before they hit the stream.
              </p>
              <div className="nl-trust-badges">
                <span className="nl-badge">✓ GDPR Secure</span>
                <span className="nl-badge">✓ No Spam</span>
                <span className="nl-badge">✓ 1x Weekly</span>
              </div>
            </div>

            <div className="nl-right">
              <form className="nl-form" onSubmit={e => e.preventDefault()}>
                <div className="nl-input-wrap">
                  <input type="text" placeholder="Full Name..." className="nl-input" />
                  <div className="nl-input-bracket" />
                </div>
                <div className="nl-input-wrap">
                  <input type="email" placeholder="Professional Email..." className="nl-input" />
                  <div className="nl-input-bracket" />
                </div>
                <div className="nl-select-wrap">
                  <select className="nl-select">
                    <option value="">Select Industry...</option>
                    {CATEGORIES.filter(c => c !== "ALL").map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="nl-btn">
                  Authenticate_Uplink
                  <ArrowRight size={16} />
                </button>
                <p className="nl-note">Encrypted transmission // No spam // Unsubscribe anytime</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;