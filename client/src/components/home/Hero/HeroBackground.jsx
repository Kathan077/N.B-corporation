import React from 'react';
import { motion, useTransform } from 'framer-motion';
import abrasiveSheet from '../../../assets/abrasivesheet.avif';

const HeroBackground = ({ smoothMouseX, smoothMouseY, smoothCursorX, smoothCursorY, watermarkY }) => {
  return (
    <div className="absolute inset-0 z-0">
      <div className="hero-background-image">
        <iframe 
          className="hero-video-bg"
          src="https://www.youtube.com/embed/YI-mwsBshHE?autoplay=1&mute=1&controls=0&loop=1&playlist=YI-mwsBshHE&rel=0&playsinline=1&disablekb=1&iv_load_policy=3&modestbranding=1" 
          title="Video" 
          frameBorder="0" 
          allow="autoplay; encrypted-media" 
          tabIndex="-1"
          aria-hidden="true"
          style={{ border: "none", pointerEvents: 'none', userSelect: 'none' }}
        ></iframe>
        {/* Transparent blocker to prevent YouTube controls from showing on hover */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: 'transparent',
          pointerEvents: 'none'
        }} aria-hidden="true" />
        <img src={abrasiveSheet} alt="Industrial Background" className="hero-fallback-img" />
        <div className="hero-image-overlay" style={{ pointerEvents: 'auto' }} />
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
