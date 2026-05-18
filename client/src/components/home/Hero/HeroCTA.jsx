import React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Settings } from 'lucide-react';

// Static utility components inside for cleaner extraction
const useMagneticEffect = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 150, damping: 15 });
    const springY = useSpring(y, { stiffness: 150, damping: 15 });
  
    const handleMouseMove = (e) => {
      const { clientX, clientY, currentTarget } = e;
      const { left, top, width, height } = currentTarget.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      x.set((clientX - centerX) * 0.35);
      y.set((clientY - centerY) * 0.35);
    };
  
    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };
  
    return { springX, springY, handleMouseMove, handleMouseLeave };
};

const MagneticButton = ({ children, className }) => {
    const { springX, springY, handleMouseMove, handleMouseLeave } = useMagneticEffect();
    return (
      <motion.button
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: springX, y: springY }}
        className={className}
      >
        {children}
      </motion.button>
    );
};

const HeroCTA = ({ itemVariants }) => {
  return (
    <motion.div 
      variants={itemVariants}
      className="flex flex-col sm:flex-row items-center justify-center gap-12 mb-32"
    >
      <MagneticButton className="hero-cta-btn primary group">
        <span className="btn-skew-bg" />
        <span className="btn-content flex items-center gap-4 py-6 px-12">
     
          <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-500" />
        </span>
        <div className="btn-metadata">UNIT_ACCESS_ID: 0x92FA</div>
      </MagneticButton>

      <MagneticButton className="hero-cta-btn secondary group">
        <span className="btn-skew-bg" />
        <span className="btn-content flex items-center gap-4 py-6 px-12 text-slate-950">
          <span className="font-black text-xs tracking-[0.3em] uppercase">TECHNICAL_SPEC</span>
          <Settings size={20} className="animate-spin-slow" />
        </span>
        <div className="btn-metadata text-slate-400">DB_STATUS: SYNCHRONIZED</div>
      </MagneticButton>
    </motion.div>
  );
};

export default HeroCTA;
export { MagneticButton }; // Export for shared use
