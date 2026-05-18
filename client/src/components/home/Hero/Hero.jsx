import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import HeroBackground from './HeroBackground';
import './Hero.css';

const Hero = () => {
  const containerRef = useRef(null);
  
  // High-performance motion values for mouse interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Smooth springs for fluid motion
  const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 40, damping: 25 });
  const smoothCursorX = useSpring(cursorX, { stiffness: 400, damping: 30, mass: 0.5 });
  const smoothCursorY = useSpring(cursorY, { stiffness: 400, damping: 30, mass: 0.5 });

  useEffect(() => {
    let ticking = false;
    const handleGlobalMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      // Update Cursor position (centered)
      cursorX.set(clientX - window.innerWidth / 2);
      cursorY.set(clientY - window.innerHeight / 2);

      if (!ticking) {
        window.requestAnimationFrame(() => {
          mouseX.set((clientX / window.innerWidth - 0.5) * 40);
          mouseY.set((clientY / window.innerHeight - 0.5) * 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [mouseX, mouseY, cursorX, cursorY]);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const watermarkY = useTransform(smoothMouseY, (v) => v * -0.8);

  return (
    <section ref={containerRef} className="relative min-h-[115vh] flex items-center justify-center overflow-hidden bg-slate-950 pt-32 pb-20">
      <HeroBackground 
        smoothMouseX={smoothMouseX}
        smoothMouseY={smoothMouseY}
        smoothCursorX={smoothCursorX}
        smoothCursorY={smoothCursorY}
        watermarkY={watermarkY}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {/* Content removed as requested - only background remains active */}
        </motion.div>
      </div>


      {/* Decorative Scan Lines */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden opacity-[0.03]">
        <div className="h-px w-full bg-slate-900 absolute top-1/4 animate-scan-h" />
        <div className="h-px w-full bg-slate-900 absolute top-3/4 animate-scan-h-slow" />
      </div>
    </section>
  );
};

export default Hero;
