import { motion, useScroll, useTransform } from 'framer-motion';
import './Team.css';
import teamHeroImg from '../../../assets/pexels-pixabay-236705.jpg';

const TeamMember = ({ name, role, id, expertise, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -10, rotateX: 5, rotateY: -2 }}
      className="team-card group"
    >
      <div className="team-card-inner">
        {/* Technical Top Bar */}
        <div className="card-header">
          <span className="member-id">ARCH_{id}</span>
          <div className="status-indicator">
            <span className="pulse-dot" />
            LIVE_STATUS
          </div>
        </div>

        {/* Profile Visual Placeholder (Minimalist/Industrial) */}
        <div className="profile-visual">
          <div className="visual-circle">
            <div className="inner-ring" />
            <div className="scan-line" />
            <span className="visual-initial">{name.charAt(0)}</span>
          </div>
          
          {/* Decorative Corner Accents */}
          <div className="corner top-l" />
          <div className="corner bottom-r" />
        </div>

        {/* Member Info */}
        <div className="member-info">
          <h3 className="member-name">{name}</h3>
          <p className="member-role">{role}</p>
        </div>

        {/* Technical Specs Footer */}
        <div className="card-footer">
          <div className="specs-grid">
            <div className="spec-item">
              <span className="spec-label">Expertise</span>
              <div className="spec-bar-wrapper">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${expertise}%` }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="spec-bar" 
                />
              </div>
            </div>
            <div className="spec-item">
              <span className="spec-label">Level</span>
              <span className="spec-value">MASTER_V.8</span>
            </div>
          </div>
        </div>

        {/* Interactive Overlay Effects */}
        <div className="card-glow" />
        <div className="hologram-effect" />
      </div>
    </motion.div>
  );
};

const Team = () => {
  const teamMembers = [
    { id: "001", name: "Vikram Sharma", role: "Chief Technical Architect", expertise: 95 },
    { id: "002", name: "Nitin Bajaj", role: "Strategic Operations Director", expertise: 98 },
    { id: "003", name: "Ananya Gupta", role: "Industrial Design Head", expertise: 92 },
    { id: "004", name: "Rahul Verma", role: "Supply Chain Integrator", expertise: 89 }
  ];

  return (
    <section className="team-section relative overflow-hidden bg-white">
      {/* Visionary Hero Split-Screen Entrance */}
      <div className="visionary-hero relative h-[70vh] md:h-[90vh] w-full overflow-hidden flex items-center">
        {/* Left: Industrial Image with Parallax */}
        <div className="absolute inset-0 w-full h-full z-0">
          <motion.div 
            initial={{ scale: 1.2, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="w-full h-full bg-cover bg-center brightness-[0.8] contrast-[1.1]"
            style={{ backgroundImage: `url(${teamHeroImg})` }}
          />
          {/* Subtle Industrial Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 via-transparent to-transparent" />
        </div>

        {/* Diagonal Wave/Split Overlay - Managed in CSS */}
        <div className="diagonal-overlay" />

        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 h-full items-center">
          <div className="hidden lg:block" /> {/* Spacer for Left Side */}
          
          {/* Content on Right (Brand Color Side) */}
          <div className="lg:pl-24 py-20 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
              className="visionary-content text-white"
            >
              <div className="flex items-center gap-4 mb-10 overflow-hidden">
                <motion.div 
                  initial={{ x: -100 }}
                  whileInView={{ x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="w-12 h-[2px] bg-white" 
                />
                <span className="text-[10px] font-black uppercase tracking-[0.8em]">Industrial DNA</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.8] tracking-tight mb-10">
                N.B. <br /> 
                <span className="text-white/90">Corporation</span>
              </h1>
              
              <div className="max-w-md border-l-4 border-white pl-8 py-2">
                <h3 className="text-xl md:text-2xl font-black uppercase mb-6 leading-tight">
                  Innovating To Meet <br /> Tomorrow's Technical Challenges
                </h3>
                <p className="text-white/80 text-sm md:text-base font-medium leading-relaxed mb-10 uppercase tracking-wide">
                  We're continually working to redefine the way industry interacts with futuristic precision engineering.
                </p>
                
                <motion.button
                  whileHover={{ backgroundColor: "#fff", color: "#000", scale: 1.05 }}
                  className="px-12 py-5 border-2 border-white text-white font-bold uppercase tracking-[0.3em] text-xs transition-all duration-500"
                >
                  Explore The Vision
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Team Content Below */}
      <div className="py-32 relative">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <div className="grid-overlay" />
          <div className="coordinate-system">
            <div className="coord x-axis" />
            <div className="coord y-axis" />
          </div>
        </div>

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
                     <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-red">Team</span>
                   </motion.div>
                   
                   <motion.h2 
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 uppercase leading-[0.95] tracking-tighter"
                   >
                     Proud Moments <br /> 
                     <span className="text-brand-red italic">Happy Clients</span>
                   </motion.h2>
                 </div>
               </div>
       

          {/* Team Grid */}
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <TeamMember key={member.id} {...member} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Industrial Watermark */}
      <div className="absolute -bottom-20 -left-10 select-none pointer-events-none opacity-[0.02]">
        <h2 className="text-[25vw] font-black leading-none uppercase tracking-tighter text-slate-950">
          VISION
        </h2>
      </div>
    </section>
  );
};

export default Team;
