import React from 'react';
import { motion, useTransform } from 'framer-motion';
import abrasiveSheet from '../../../assets/abrasivesheet.avif';

const HeroBackground = ({ smoothMouseX, smoothMouseY, smoothCursorX, smoothCursorY, watermarkY }) => {
  return (
    <div className="absolute inset-0 z-0">
      <div className="hero-background-image">
        <iframe 
          className="hero-video-bg"
          src="https://www.youtube.com/embed/pcPo05-xO70?autoplay=1&mute=1&loop=1&playlist=pcPo05-xO70&controls=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1" 
          title="3M™ Electrical Tapes Product Family" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" 
          allowFullScreen
        ></iframe>
        <img src={abrasiveSheet} alt="Industrial Background" className="hero-fallback-img" />
        <div className="hero-image-overlay" />
      </div>
      <div className="hero-noise" />
      
      {/* Optimized Spotlight Layer */}
      <motion.div 
        className="hero-flashlight"
        style={{ x: smoothCursorX, y: smoothCursorY }}
      />
      
      {/* Removed hero-master-grid for cleaner video focus */}
      
      {/* Technical Floating Elements */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          style={{ 
            x: useTransform(smoothMouseX, v => v * (i + 1) * 0.4), 
            y: useTransform(smoothMouseY, v => v * (i + 1) * 0.4),
            top: `${25 + i * 18}%`, 
            left: `${15 + i * 18}%`,
            width: `${120 + i * 30}px`,
            height: `${120 + i * 30}px`,
            willChange: 'transform'
          }}
          animate={{ rotate: i * 90 }}
          className="absolute p-4 border border-slate-200/20 rounded-lg opacity-[0.04] hidden lg:block"
        />
      ))}
    </div>

  );
};

export default HeroBackground;
