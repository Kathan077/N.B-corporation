import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Footer from '../components/layout/Footer/Footer';


const About = () => {
  const containerRef = useRef(null);
  
  // Hero Scroll Progress
  const { scrollYProgress: heroScroll } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(heroScroll, [0, 1], [0, 200]);
  const y2 = useTransform(heroScroll, [0, 1], [0, -100]);
  const scaleImage = useTransform(heroScroll, [0, 1], [1, 1.15]);

  return (
    <main ref={containerRef} className="bg-white font-sans selection:bg-brand-red selection:text-white overflow-hidden relative">


      {/* Hero Section Container */}
      <section className="relative w-full min-h-[100vh] pt-32 pb-20 flex flex-col lg:flex-row items-center justify-between z-10">
        
        {/* Left Content Area */}
        <div className="w-full lg:w-[45%] px-6 md:px-12 lg:px-20 h-full flex flex-col justify-center relative z-20 pb-20 lg:pb-0">
          
          <div className="relative mt-20 lg:mt-0">
            {/* Outline Text */}
            <motion.div 
              className="absolute -top-8 md:-top-20 left-4 text-[4.5rem] sm:text-[6.5rem] md:text-[10rem] lg:text-[14rem] font-serif leading-none tracking-tighter text-transparent z-[-1]"
              style={{ 
                WebkitTextStroke: '2px rgba(0,0,0,0.05)',
                y: y2
              }}
            >
              N.B
            </motion.div>

            <motion.div className="overflow-hidden">
              <motion.h1 
                initial={{ y: "100%", rotateZ: 5 }}
                animate={{ y: 0, rotateZ: 0 }}
                transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[10rem] font-black leading-[0.8] tracking-tighter text-gray-900 uppercase"
              >
                About
              </motion.h1>
            </motion.div>
            
            <motion.div className="overflow-hidden flex items-baseline gap-2 sm:gap-4 md:gap-8">
              <motion.h1 
                initial={{ y: "100%", rotateZ: 5 }}
                animate={{ y: 0, rotateZ: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[10rem] font-black leading-[0.8] tracking-tighter text-gray-900 uppercase ml-6 sm:ml-12 md:ml-32"
              >
                Us
              </motion.h1>
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 1, type: "spring" }}
                className="w-4 h-4 md:w-8 md:h-8 bg-brand-red rounded-full self-end mb-2 sm:mb-4 md:mb-8"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="mt-12 lg:mt-24 ml-4 lg:ml-8 max-w-sm relative"
          >
            {/* Red Accent Line */}
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
              className="absolute -left-8 md:-left-12 top-2 origin-left w-6 md:w-8 h-[2px] bg-brand-red"
            />
            <p className="text-xl md:text-2xl text-black-600 font-medium leading-relaxed">
              We are an elite collective defining the <span className="text-brand-red font-bold">future of industry</span> with pro-level solutions.
            </p>
          </motion.div>
        </div>

        {/* Right side background image & red panel */}
        <div className="absolute top-0 right-0 w-full lg:w-[65%] h-full z-0 overflow-hidden flex">
          
          {/* Animated Red Overlay Block */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 right-0 w-full h-full bg-brand-red origin-right z-10"
            style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}
          />

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute inset-0 w-full h-full z-20 p-4 md:p-8 lg:p-12 pl-0 lg:pl-[10%] pt-20 lg:pt-32 pb-4 lg:pb-12"
          >
             <motion.div
                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                animate={{ clipPath: 'inset(0% 0 0 0)' }}
                transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full relative overflow-hidden group shadow-2xl"
             >
                <motion.img 
                  style={{ scale: scaleImage }}
                  src="https://images.pexels.com/photos/11479977/pexels-photo-11479977.jpeg" 
                  alt="Team" 
                  className="w-full h-full  transition-transform duration-[2s] group-hover:scale-105 filter grayscale-[30%] contrast-125"
                />
                <div className="absolute inset-0 bg-brand-dark/20 mix-blend-multiply transition-colors duration-700 group-hover:bg-brand-red/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
             </motion.div>
          </motion.div>

        </div>
      </section>

      {/* Company Overview Section */}
      <section className="relative w-full py-32 bg-white z-20">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 relative">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center mb-16 lg:mb-24"
          >
            <h2 className="text-sm md:text-base font-bold tracking-[0.4em] md:tracking-[0.8em] text-brand-red uppercase mb-4">Identity</h2>
            <h3 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 tracking-tighter uppercase whitespace-normal sm:whitespace-nowrap">
              Absolute <br className="sm:hidden" /> Dominance
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-center">
             
             {/* Left Text Detail */}
             <div className="flex flex-col gap-10 md:gap-12">
               <motion.p 
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 0.8 }}
                 className="text-xl sm:text-2xl md:text-4xl text-gray-800 font-medium leading-relaxed"
               >
    N.B Corporation stands as a trusted supplier of advanced 3M™ industrial adhesive solutions, delivering superior bonding performance, reliability, and efficiency across diverse industries
               </motion.p>
               
               <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 0.8, delay: 0.2 }}
                 className="flex flex-col gap-8 border-l-4 border-brand-red pl-6 sm:pl-8"
               >
                 <div>
                   <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 uppercase tracking-wide">Mission</h4>
                   <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                    To provide high-quality 3M™ adhesive tape solutions that enhance industrial processes through stronger bonding, faster assembly, and consistent performance across every application.
                   </p>
                 </div>
                 <div>
                   <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 uppercase tracking-wide">Vision</h4>
                   <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  To be India’s most trusted and innovative provider of adhesive tape and sealant solutions, contributing to the success of our clients through technology, customization, and service excellence.
                   </p>
                 </div>
               </motion.div>
             </div>

             {/* Right Floating Image Container */}
             <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full rounded-3xl overflow-hidden shadow-2xl"
             >
                <img 
                  src="https://lh3.googleusercontent.com/p/AF1QipPWC08WyatnH6sRtwrr1VmrfUj69FiizK5XA38=s1360-w1360-h1020-rw" 
                  alt="Industrial Setup"
                  className="w-full h-full object-cover filter grayscale"
                />
                
                {/* Red Glare Overlay */}
                <div className="absolute inset-0 bg-brand-red/20 mix-blend-multiply" />
                
                {/* Animated Diagonal Red Stripe */}
                <motion.div 
                  initial={{ rotate: -45, y: -200, opacity: 0 }}
                  whileInView={{ rotate: -45, y: 1000, opacity: 0.3 }}
                  viewport={{ once: false }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 5 }}
                  className="absolute -top-[50%] -left-[50%] w-[200%] h-32 bg-white/40 blur-3xl z-10"
                />

                {/* Stat Box overlay */}
              
             </motion.div>

          </div>
        </div>
      </section>

      {/* "Our Mission" Checklist Section */}
      <section className="relative w-full py-32 bg-slate-950 z-20 overflow-hidden">
        
        {/* Deep Red Radial Glows */}
        <div className="absolute top-[-20%] right-[-10%] w-[80%] md:w-[50%] h-[50%] bg-brand-red/10 blur-[100px] md:blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[80%] md:w-[50%] h-[50%] bg-brand-red/10 blur-[100px] md:blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center mb-16 md:mb-24"
          >
            <h2 className="text-xs sm:text-sm md:text-base font-bold tracking-[0.3em] md:tracking-[0.4em] text-brand-red uppercase mb-4">The Core</h2>
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase">
              Our Mission
            </h3>
            <div className="w-16 md:w-20 h-[2px] bg-gradient-to-r from-transparent via-brand-red to-transparent mt-6 md:mt-8"></div>
          </motion.div>

          {/* Premium Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
            
            {[
              { title: "PERFORMANCE EXCELLENCE", text: "We are committed to delivering high-performance 3M™ adhesive tape solutions that meet the highest industrial standards, ensuring strength, durability, and consistent results in every application." },
            
              { title: "STRATEGIC PARTNERSHIP", text: "We work closely with our clients to understand their requirements and provide tailored adhesive solutions that improve efficiency and enhance overall productivity." },
              { title: "INNOVATION-DRIVEN SOLUTIONS", text: "By leveraging advanced 3M™ technologies, we offer modern bonding solutions that replace traditional methods and support faster, smarter manufacturing processes." },
              { title: "RELIABLE SUPPLY & SUPPORT", text: "We ensure timely delivery and dependable service, helping businesses maintain smooth operations without compromise on quality or performance." },
              { title: "APPLICATION EXPERTISE", text: "With deep industry knowledge, we guide our clients in selecting the right adhesive solutions for their specific applications across multiple sectors." },
              { title: "CONSISTENT QUALITY ASSURANCE", text: "Every product we supply is backed by trusted 3M™ standards, ensuring long-lasting performance, safety, and reliability in demanding environments." },
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ y: -5 }}
                className="group relative bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-all duration-500 rounded-[1.5rem] p-6 sm:p-8 md:p-10 overflow-hidden flex flex-col justify-start"
              >
                {/* Hover Top Red Edge */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-x-0 group-hover:scale-x-100 transform origin-center" />

                <div className="flex items-start gap-4 sm:gap-6 relative z-10">
                  {/* Glowing Icon Wrapper */}
                  <div className="relative mt-1 flex-shrink-0">
                    <div className="absolute inset-0 bg-brand-red/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand-red/10 border border-brand-red/30 flex items-center justify-center group-hover:bg-brand-red/20 transition-colors duration-500">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div>
                    {item.title && (
                      <h4 className="text-lg sm:text-xl font-bold text-white mb-2 uppercase tracking-wide group-hover:text-brand-red transition-colors duration-300">
                        {item.title}
                      </h4>
                    )}
                    <p className={`text-gray-400 text-base sm:text-lg leading-relaxed ${!item.title && 'mt-1'} group-hover:text-gray-300 transition-colors duration-300`}>
                      {item.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* Our Values Section - Red/White Premium Theme */}
      <section className="relative w-full py-24 md:py-48 bg-gray-50 z-20 overflow-hidden">
        {/* Animated Background Text */}
        <motion.div 
          initial={{ x: "0%" }}
          whileInView={{ x: "-20%" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-20 left-0 w-max whitespace-nowrap opacity-[0.03] pointer-events-none select-none z-0"
        >
          <h1 className="text-[6rem] sm:text-[9rem] md:text-[12rem] lg:text-[20rem] font-black text-brand-dark uppercase leading-none">Values • Standard • Code •</h1>
        </motion.div>

        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Left Sticky Header */}
          <div className="w-full lg:w-[40%]">
            <div className="relative xl:sticky xl:top-40">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h2 className="text-brand-red font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase mb-6 md:mb-8 flex items-center gap-2 md:gap-4 text-xs sm:text-sm md:text-base">
                  <span className="w-8 sm:w-12 h-[2px] bg-brand-red"></span>
                  The Foundation
                </h2>
                <h3 className="text-[4rem] sm:text-[5rem] md:text-[7rem] lg:text-[8rem] font-black leading-[0.8] tracking-tighter uppercase mb-2">
                  <span className="text-gray-900 block mb-2 text-left">Our</span>
                  <span className="text-brand-red block text-left">Values</span>
                </h3>
                
                <div className="mt-8 md:mt-12 border-l-4 border-gray-200 pl-4 sm:pl-6 md:pl-8 py-2">
                  <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-medium leading-relaxed max-w-md">
                    The uncompromising principles that dictate our every action, ensuring absolute dominance in execution and strategy.
                  </p>
                </div>
                
                <div className="mt-12 md:mt-20 hidden lg:flex items-center gap-4 text-gray-400">
                  <span className="w-12 h-[1px] bg-gray-300"></span>
                  <p className="text-xs font-bold uppercase tracking-widest">Scroll to explore</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Scrolling Content (The Values 2x2 Staggered Grid) */}
          <div className="w-full lg:w-[60%] grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {[
              { num: "01", title: "QUALITY COMMITMENT", text: "We deliver only trusted 3M™ adhesive solutions that ensure superior bonding strength, durability, and long-term performance." },
              { num: "02", title: "CUSTOMER FOCUS", text: "We prioritize our clients by providing tailored solutions that meet their exact industrial requirements and improve efficiency." },
              { num: "03", title: "INNOVATION", text: "We embrace advanced adhesive technologies to offer modern, efficient alternatives to traditional bonding methods." },
              { num: "04", title: "RELIABILITY", text: "We ensure consistent product quality, timely delivery, and dependable support across every project and application." }
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px", amount: 0.1 }}
                transition={{ duration: 0.8, delay: (idx % 2) * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={`group bg-white p-6 sm:p-8 xl:p-10 rounded-[1.5rem] md:rounded-[2rem] shadow-xl hover:shadow-[0_30px_60px_-15px_rgba(220,38,38,0.15)] hover:-translate-y-2 transition-all duration-500 relative overflow-hidden flex flex-col ${
                  idx % 2 !== 0 ? 'md:mt-16 lg:mt-24' : 'md:mb-16 lg:mb-24 -mt-0'
                }`}
              >
                {/* Number Background */}
                <div className="absolute right-4 sm:right-8 top-4 sm:top-8 text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-black text-gray-50 opacity-80 group-hover:text-brand-soft group-hover:-translate-y-4 group-hover:translate-x-4 transition-all duration-700 pointer-events-none select-none z-0">
                  {value.num}
                </div>

                <div className="relative z-10">
                  {/* Animated Red Divider */}
                  <div className="w-16 h-1 bg-gray-100 mb-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-brand-red transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                  </div>

                  <h4 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight group-hover:text-brand-red transition-colors duration-300">
                    {value.title}
                  </h4>
                  
                  <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-lg group-hover:text-gray-900 transition-colors duration-300">
                    {value.text}
                  </p>

                  <div className="mt-12 flex items-center gap-3 text-brand-red font-bold uppercase tracking-widest text-sm translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="w-6 h-[2px] bg-brand-red"></span>
                    Learn More
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
        </div>
      </section>


      <Footer />
    </main>
  );
};

export default About;
