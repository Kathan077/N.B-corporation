import React from 'react';
import { motion } from 'framer-motion';

const METRICS = [
  { label: "Engineering Strength", value: "100%", sub: "CERTIFIED ISO_9001" },
  { label: "Active Systems", value: "2.5K+", sub: "INDUSTRIAL INVENTORY" },
  { label: "Network Coverage", value: "48+", sub: "GLOBAL LOGISTICS" },
  { label: "Technical Uptime", value: "24/7", sub: "EXPERT TELEMETRY" },
];

const HeroMetrics = ({ itemVariants }) => {
  return (
    <motion.div 
      variants={itemVariants}
      className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/10 pt-20"
    >
      {METRICS.map((metric, i) => (
        <div key={i} className="flex flex-col group cursor-crosshair relative">
          <div className="absolute -left-6 top-0 bottom-0 w-[1px] bg-white/10 group-hover:bg-brand-red transition-colors hidden md:block" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3 group-hover:text-brand-red transition-colors duration-500">
            {metric.label}
          </span>
          <span className="text-5xl font-black text-white mb-2 tabular-nums tracking-tighter">
            {metric.value}
          </span>
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-white/5 group-hover:border-white/20 pb-1 transition-all">
            {metric.sub}
          </span>
          
          {/* Subtle Industrial Accent */}
          <div className="mt-6 h-px w-0 group-hover:w-full bg-brand-red transition-all duration-700 ease-in-out" />
        </div>
      ))}
    </motion.div>
  );
};

export default HeroMetrics;
