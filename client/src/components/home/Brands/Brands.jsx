import React from 'react';
import { motion } from 'framer-motion';
import './Brands.css';

const defaultBrands = [
  { name: "LARSEN & TOUBRO", id: "LT-01" },
  { name: "AIR INDIA", id: "AI-02" },
  { name: "SAMSUNG", id: "SM-03" },
  { name: "VVDN", id: "VV-04" },
  { name: "SGS", id: "SGS-05" },
  { name: "UFLEX", id: "UF-06" },
  { name: "IFB", id: "IFB-07" },
  { name: "POLYPLEX", id: "PX-08" },
];

const Brands = ({ content }) => {
  const title = content?.title || 'Industries';
  const highlight = content?.highlight || 'Served';
  const watermark = content?.watermark || 'PARTNERS';
  const brands = content?.items && content.items.length > 0 
    ? content.items.filter(it => it.isActive !== false) 
    : defaultBrands;

  return (
    <section className="brands-section relative py-20 overflow-hidden bg-white">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl lg:text-4xl font-medium text-slate-900 tracking-tight"
          >
            {title} <span className="text-brand-red italic font-semibold">{highlight}</span>
          </motion.h2>
        </div>

        <div className="brands-logo-grid flex flex-wrap items-center justify-between gap-8 md:gap-12 py-8">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id || index}
              initial={{ opacity: 0, filter: "grayscale(100%) blur(5px)" }}
              whileInView={{ opacity: 1, filter: "grayscale(0%) blur(0px)" }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="brand-logo-item group"
            >
              <span className="brand-logo-text">{brand.name}</span>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom Accent Line */}
        <div className="brands-bottom-accent-container mt-16">
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="brands-bottom-line" 
          />
        </div>
      </div>

      {/* Extreme Watermark Subtle */}
      <div className="absolute -bottom-10 right-10 select-none pointer-events-none opacity-[0.01]">
        <h2 className="text-[20vw] font-black leading-none uppercase tracking-tighter text-slate-900">
          {watermark}
        </h2>
      </div>
    </section>
  );
};

export default Brands;
