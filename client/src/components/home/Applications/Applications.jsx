import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, HardHat, Factory, Truck } from 'lucide-react';
import './Applications.css';

// Using local assets where available, otherwise placeholder-style placeholders


const ApplicationCard = ({ title, points, icon: Icon, image, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="application-card group"
    >
      <div className="app-image-wrapper">
        <img src={image} alt={title} className="app-bg-image" />
        <div className="app-image-overlay" />
      </div>

      {/* Initial Bottom Bar */}
      <div className="app-bottom-bar">
        <h3 className="app-title">{title}</h3>
      </div>

      {/* Hover Reveal Content */}
      <div className="app-hover-content">
        <div className="app-hover-inner">
          <div className="app-icon-box">
            <Icon size={24} className="text-white" />
          </div>
          <h3 className="app-hover-title">{title}</h3>
          <ul className="app-points-list">
            {points.map((point, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + (i * 0.1) }}
                className="app-point"
              >
                <div className="point-dot" />
                {point}
              </motion.li>
            ))}
          </ul>
          <button className="app-learn-more">
            Learn More
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Applications = () => {
  const apps = [
    {
      title: "Manufacturing & MRO",
      points: [
        "3M VHB bonding tapes ",
        " Double-sided mounting tapes ",
        "MRO supplies & Consumables",
        "Floor marking & safety tapes"
      ],
      icon: Factory,
      image: "https://tapeuniversity.com/wp-content/uploads/2019/04/Duct-Tape-Decoded-Group.jpg" // Placeholder for electronics
    },
    {
      title: "Electronics & Appliances",
      points: [
        "3M VHB & epoxy bonding ",
        " Double-sided tapes ",
        "Thermal interface materials ",
        "Electronic assembly adhesives"
      ],
      icon: Cpu,
      image: "https://image.made-in-china.com/202f0j00wsVbWrNlrioT/Industrial-Double-Sided-Acrylic-Foam-Tape-for-Automotive-Home-Appliances-Electronics.webp" // Placeholder for electronics
    },
    {
      title: "Construction & Interiors",
      points: [
        "3M VHB structural bonding",
        "Double-sided technical tapes",
        " Electrical insulation tapes",
        "Clear bonding tapes"
      ],
      icon: HardHat,
      image: "https://www.strouse.com/hubfs/My%20project-1%20-%202023-06-22T074140.956.jpg" // Construction placeholder
    },
    {
      title: "Transportation & Aerospace",
      points: [
        "Aviation component bonding",
        "Electric vehicle solutions",
        "Mass transit infrastructure",
        "Maritime technical supplies"
      ],
      icon: Truck,
      image: "https://multimedia.3m.com/mws/media/379885J/3m-tm-r3-rapid-responsive-reliable-roll-image.jpg?width=506" // Placeholder for transportation
    }
  ];

  return (
    <section className="applications-section relative py-32 overflow-hidden bg-white" id="applications">
        <div className="container mx-auto px-6 relative z-10">
             <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
               <div>
                 <motion.div
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   className="flex items-center gap-4 mb-8"
                 >
                   <div className="w-16 h-px bg-brand-red" />
                   <span className="text-[12px] font-black uppercase tracking-[0.5em] text-brand-red">
Choose Your Use-case</span>
                 </motion.div>
                 
                 <motion.h2 
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-950 uppercase leading-[0.95] tracking-tighter"
                 >
                  Industrial Products for Your<br /> 
                   <span className="text-brand-red italic">Application</span>
                 </motion.h2>
               </div>
             </div>
     
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {apps.map((app, index) => (
            <ApplicationCard key={index} {...app} index={index} />
          ))}
        </div>
      </div>

      {/* Industrial Visual suite */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="master-grid" />
      </div>
    </section>
  );
};

export default Applications;
