import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ShieldCheck, Cpu, Globe2, TrendingUp } from 'lucide-react';
import abrasiveSheet from '../../../assets/abrasivesheet.avif';
import './WhyChooseUs.css';

const FeatureItem = ({ icon: Icon, text, index }) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.4 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    className="choice-feature-item group"
  >
    <div className="choice-icon-outer">
      <div className="choice-chevron-reveal" />
      <ChevronRight className="choice-chevron" size={18} />
    </div>
    <span className="choice-feature-text underline-offset-4 group-hover:underline decoration-brand-red/30 transition-all">
      {text}
    </span>
  </motion.div>
);

const WhyChooseUs = () => {
  const features = [
    "Strong, durable bonding with trusted 3M™ technology",
    "Faster assembly with clean, efficient application",
    "Ideal for multiple surfaces and industrial uses",
    "Consistent performance in extreme conditions"
  ];

  return (
    <section className="why-choose-section relative overflow-hidden bg-white py-24 sm:py-32">
      {/* Background Graphic Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -z-10 pointer-events-none" />
      <div className="choice-grid-pattern" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Side: Cinematic Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="choice-visual-container relative"
          >
            <div className="choice-image-frame overflow-hidden rounded-3xl shadow-2xl relative">
              <motion.img 
                src={'https://scapaindustrial.com/wp-content/uploads/2025/03/Scapa_675x450_Images_ParnterwithUs.jpg'} 
                alt="Industrial Mastery" 
                className="w-full h-full object-cover choice-main-image"
                initial={{ scale: 1.2 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
              <div className="choice-image-overlay" />
              
              {/* Floating Content on Image */}
            
              
            </div>

            {/* Decorative Blueprint Elements */}
            <div className="choice-blueprint-ring" />
            <div className="choice-blueprint-line" />
          </motion.div>

          {/* Right Side: Content Suite */}
          <div className="choice-content">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-px bg-slate-900" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">
                Operational Supremacy
              </span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-dark uppercase leading-[0.9] tracking-tighter mb-8"
            >
              Why <br /> 
              <span className="text-brand-red italic relative">
                Choose Us
                <div className="absolute -bottom-1 right-0 w-1/3 h-[0.1em] bg-brand-red/20 -z-10" />
              </span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-brand-slate text-sm font-medium leading-relaxed mb-10 max-w-lg border-l-2 border-slate-100 pl-8"
            >
      
With over 18 years of experience, NB Corporation has earned a reputation for delivering reliable, application-specific adhesive solutions with timely delivery and responsive support. Whether you're a small business or a large industrial enterprise, we aim to be your long-term adhesive partner by offering products that enhance efficiency, safety, and performance.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
              {features.map((feature, i) => (
                <FeatureItem key={i} text={feature} index={i} />
              ))}
            </div>

            {/* Metrics Tag */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-16 flex items-center gap-6"
            >
              
            </motion.div>
          </div>
        </div>
      </div>

      {/* Extreme Visual Accent */}
      <div className="absolute -bottom-10 -left-10 select-none pointer-events-none opacity-[0.02]">
        <h2 className="text-[25vw] font-black leading-none uppercase tracking-tighter text-slate-900">
          MASTERY
        </h2>
      </div>
    </section>
  );
};

export default WhyChooseUs;
