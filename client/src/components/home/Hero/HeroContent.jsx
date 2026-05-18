import React from 'react';
import { motion } from 'framer-motion';

const HeroContent = ({ itemVariants }) => {
  return (
    <div className="text-center mb-16 relative">
      <div className="relative z-10 w-full">
        <motion.h2 
          variants={itemVariants}
          className="text-4xl xs:text-5xl sm:text-7xl lg:text-[9rem] font-black text-brand-dark uppercase leading-[0.95] md:leading-[0.85] tracking-tighter mb-10 break-words"
        >
          Absolute <br /> 
          <span className="text-brand-red italic relative inline-block">
            Precision
            <motion.span 
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 1, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-1 sm:bottom-4 left-0 h-[0.1em] bg-brand-red/10 -z-10"
            />
          </span>
        </motion.h2>

        <motion.div variants={itemVariants} className="flex justify-center mb-16">
     
        </motion.div>
      </div>
    </div>
  );
};

export default HeroContent;
