import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Zap, Globe, Users, Award, Factory, Cpu, HardHat, Truck, Layers, Box, CheckCircle, Star, Sparkles, Wrench, Package, Flame, Anchor, Compass } from 'lucide-react';
import './Principles.css';

const ICON_MAP = {
  Shield, Target, Zap, Globe, Users, Award,
  Factory, Cpu, HardHat, Truck, Layers, Box,
  CheckCircle, Star, Sparkles, Wrench, Package,
  Flame, Anchor, Compass
};

const PrincipleCard = ({ icon, title, description, index }) => {
  const Icon = typeof icon === 'string' ? (ICON_MAP[icon] || Shield) : (icon || Shield);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="principle-card"
    >
      <div className="card-glow" />
      <div className="scan-line" />

      <div className="card-content">
        <div className="icon-wrapper">
          <div className="icon-container">
            <Icon size={24} className="principle-icon" />
          </div>
        </div>

        <h3 className="principle-title">{title}</h3>
        <p className="principle-description">{description}</p>

        <div className="card-footer">
          <div className="footer-line" />
        </div>
      </div>
    </motion.div>
  );
};

const defaultPrinciples = [
  {
    icon: Shield,
    title: 'UNCOMPROMISING PRODUCT QUALITY',
    description:
      'We supply high-performance industrial tapes engineered to meet the most demanding bonding, sealing, and mounting requirements. Every product is designed to deliver superior adhesion, durability, and long-term reliability across critical industrial applications.',
  },
  {
    icon: Target,
    title: 'PRECISION-DRIVEN PERFORMANCE',
    description:
      'Our adhesive solutions are developed with a focus on micron-level accuracy, ensuring flawless bonding across a wide range of materials including metal, glass, plastics, and composites — enabling cleaner finishes, reduced rework, and enhanced manufacturing efficiency.',
  },
  {
    icon: Zap,
    title: 'NEXT-GENERATION ADHESIVE TECHNOLOGY',
    description:
      'By integrating advanced bonding technologies, we offer modern alternatives to traditional fastening methods such as screws, rivets, and welding — enhancing structural integrity while enabling lightweight designs and faster assembly.',
  },
  {
    icon: Globe,
    title: 'SUSTAINABLE INDUSTRIAL SOLUTIONS',
    description:
      'We are committed to delivering environmentally responsible adhesive systems that help reduce material waste, energy consumption, and production complexity — supporting cleaner manufacturing practices without compromising performance.',
  },
  {
    icon: Users,
    title: 'Built with your goals in mind.',
    description:
      'We believe in building strong partnerships by understanding each client\'s unique application requirements. Our team works closely to deliver customized tape solutions that optimize performance, reduce costs, and improve operational efficiency.',
  },
  {
    icon: Award,
    title: 'TRUSTED INDUSTRIAL RELIABILITY',
    description:
      'Trusted across automotive, electronics, construction, and signage industries — our tapes withstand extreme temperatures, moisture, and stress conditions, delivering dependable strength, safety, and longevity where it matters most.',
  },
];

const Principles = ({ content }) => {
  const title = content?.title || 'The Principles';
  const highlight = content?.highlight || 'That Define Mastery';
  const watermark = content?.watermark || 'SYSTEMS';
  
  const rawItems = content?.items && content.items.length > 0 
    ? content.items.filter(it => it.isActive !== false) 
    : defaultPrinciples;

  return (
    <section className="principles-section">
      {/* Corner accents */}
      <div className="corner corner--tr" />
      <div className="corner corner--bl" />

      {/* Background watermark */}
      <div className="watermark" aria-hidden="true">{watermark}</div>

      <div className="principles-container">
        {/* Header */}
        <motion.div
          className="principles-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="principles-heading">
            {title} <br />
            <em className="principles-heading-accent">{highlight}</em>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="principles-grid">
          {rawItems.map((principle, index) => (
            <PrincipleCard key={principle.id || index} {...principle} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Principles;