import React from 'react';
import { motion } from 'framer-motion';
import { ChevronsRight } from 'lucide-react';
import './Impact.css';

const Impact = () => {
  return (
    <section className="impact-section py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="impact-header-line mb-4">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '40px' }}
            viewport={{ once: true }}
            className="header-accent-line"
          />
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="impact-tagline"
          >
            We Can Help You
          </motion.span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="impact-content mb-12"
        >
          <h2 className="impact-statement">
            we aim to reduce production costs by <span className="highlight-text">20%</span> and increase efficiency by <span className="highlight-text">30%</span> while simultaneously improving product quality and lifespan by <span className="highlight-text">40%</span>.
          </h2>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="contact-now-btn group"
        >
          <span className="btn-text">Contact Now</span>
          <div className="btn-icon-wrapper">
            <ChevronsRight size={20} className="icon-arrows" />
          </div>
        </motion.button>
      </div>
    </section>
  );
};

export default Impact;
