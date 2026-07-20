import React, { useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  Users, 
  Boxes, 
  Factory, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  Target, 
  Eye, 
  Sparkles, 
  Wrench, 
  HeartPulse, 
  Zap, 
  Home as HomeIcon, 
  Plane, 
  Sun, 
  ShieldAlert, 
  ExternalLink,
  ChevronRight,
  Search,
  Check
} from 'lucide-react';
import Footer from '../components/layout/Footer/Footer';

const About = () => {
  const containerRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  // Hero Scroll Progress
  const { scrollYProgress: heroScroll } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y2 = useTransform(heroScroll, [0, 1], [0, -100]);
  const scaleImage = useTransform(heroScroll, [0, 1], [1, 1.15]);

  // Statistics from Brochure (Page 2) - Fixed overflow by putting 3M™ as value & Authorised Distributor as label
  const stats = [
    { label: "Years of Experience", value: "20+", detail: "Established in 2006", icon: Award },
    { label: "Authorised Distributor", value: "3M™", detail: "Science. Applied to Life.™", icon: ShieldCheck },
    { label: "Clients Served", value: "1,000+", detail: "Across Pan-India Industries", icon: Users },
    { label: "Products Supplied", value: "40,000+", detail: "Converted & Custom Slit", icon: Boxes },
  ];

  // 9 Industries We Power (Brochure Page 4)
  const industries = [
    {
      id: "construction",
      name: "Construction & Architecture",
      icon: Building2,
      borderColor: "border-amber-500/30",
      items: [
        "Sun control window films (PR 70)",
        "VHB structural bonding tape",
        "Waterproofing sealants",
        "Masking tapes for painting"
      ]
    },
    {
      id: "automotive",
      name: "Automotive",
      icon: Wrench,
      borderColor: "border-blue-500/30",
      items: [
        "Safety reflective film",
        "Paint protection films",
        "Body panel bonding tapes",
        "Cubitron abrasives for finishing",
        "Meguiar's car care products",
        "Acoustic noise dampening"
      ]
    },
    {
      id: "industrial",
      name: "Industrial & Manufacturing",
      icon: Factory,
      borderColor: "border-red-500/30",
      items: [
        "Filament & masking tapes",
        "Adhesives & sealants",
        "Anodizing & electroplating tape",
        "Filtration products",
        "Advanced ceramics"
      ]
    },
    {
      id: "healthcare",
      name: "Healthcare",
      icon: HeartPulse,
      borderColor: "border-emerald-500/30",
      items: [
        "Tegaderm wound dressings",
        "Littmann stethoscopes",
        "Nexcare bandages",
        "Surgical drapes & tapes",
        "Sterilisation indicators"
      ]
    },
    {
      id: "electronics",
      name: "Electrical & Electronics",
      icon: Zap,
      borderColor: "border-violet-500/30",
      items: [
        "Insulation & splicing tapes",
        "VHB tape for display bonding",
        "EMI/EMC shielding solutions",
        "Thermal management films",
        "Antistatic additives"
      ]
    },
    {
      id: "home_office",
      name: "Home & Office",
      icon: HomeIcon,
      borderColor: "border-indigo-500/30",
      items: [
        "Post-it notes & organizers",
        "Command damage-free strips",
        "Scotch tape & dispensers",
        "Window privacy films",
        "Scotch-Brite cleaning pads"
      ]
    },
    {
      id: "aerospace",
      name: "Aerospace & Defence",
      icon: Plane,
      borderColor: "border-sky-500/30",
      items: [
        "Nextel ceramic fabrics",
        "High-temp insulation films",
        "Structural adhesives",
        "Lightweight composite parts",
        "Tube seals for furnaces"
      ]
    },
    {
      id: "safety",
      name: "Safety & Security",
      icon: ShieldAlert,
      borderColor: "border-yellow-500/30",
      items: [
        "N95 & P100 respirators",
        "Peltor hearing protection",
        "Speedglas welding helmets",
        "Safety eyewear",
        "Fall protection harnesses"
      ]
    },
    {
      id: "energy",
      name: "Energy & Environment",
      icon: Sun,
      borderColor: "border-green-500/30",
      items: [
        "Solar module adhesives",
        "Wind blade bonding tapes",
        "Solar control window films",
        "Thermal insulation products",
        "Energy-efficient coatings"
      ]
    }
  ];

  // 21 Product Categories Overview (Brochure Page 3)
  const categories = [
    { num: "01", name: "Floor Marking Tapes", desc: "Heavy-duty 3M 764, 766, 767, 971 vinyl tapes for 5S/6S lean factory logistics." },
    { num: "02", name: "Filament Tape", desc: "Glass-yarn reinforced heavy-duty bundling and strapping tapes (3M 897, 898)." },
    { num: "03", name: "UHMW Tape", desc: "Polyethylene slide & abrasion resistant tape (3M 5423) for conveyor rails." },
    { num: "04", name: "Reclosable Fastener (Dual Lock)", desc: "3M Dual Lock SJ 3550 stem reclosable fasteners—5x stronger than hook & loop." },
    { num: "05", name: "Adhesive Promoters", desc: "Surface primers for maximum tape adhesion on plastic, metal & glass." },
    { num: "06", name: "Aluminium Foil Tape", desc: "Thermal conductivity, moisture barrier & heat reflective foil tape solutions." },
    { num: "07", name: "Duct Tape", desc: "High-tack waterproof cloth duct tapes for sealing, patching & industrial wrapping." },
    { num: "08", name: "Masking Tape", desc: "Precision high-temperature automotive & industrial painting masking tapes." },
    { num: "09", name: "UPVC Tape", desc: "Heavy-duty unplasticized PVC sealing tape for bag closing & pipe protection." },
    { num: "10", name: "Transparent Film Tape", desc: "Optically clear pressure sensitive film tapes for electronic & print packaging." },
    { num: "11", name: "EST Tape Waterproofing", desc: "Elastomeric self-adhesive sealing tape for structural waterproofing seams." },
    { num: "12", name: "Anti Skid Tapes", desc: "Safety-Walk slip-resistant treads for stairs, walkways & heavy machinery." },
    { num: "13", name: "PU Sealant 600 ml", desc: "High-performance polyurethane expansion joint & windshield adhesive sealants." },
    { num: "14", name: "Epoxy & Structural Adhesive", desc: "Dual-component high-strength structural epoxies replacing rivets & welds." },
    { num: "15", name: "Applicators", desc: "3M Lane Marking M1 applicators & manual/pneumatic sealant guns." },
    { num: "16", name: "Aerosol Spray", desc: "Spray 77, 90 high-strength contact adhesives & industrial cleaners." },
    { num: "17", name: "Thin Bonding Tapes", desc: "Double-coated tissue, PET, and transfer tapes for electronic device assembly." },
    { num: "18", name: "Cleaning Products", desc: "Scotch-Brite industrial hand pads, degreasers & surface maintenance tools." },
    { num: "19", name: "VHB Tapes", desc: "3M Very High Bond acrylic foam tapes for permanent structural bonding." },
    { num: "20", name: "Retro Reflective Tapes", desc: "3M Engineer Grade prismatic sheeting & vehicle safety microprismatic tape." },
    { num: "21", name: "Protection Films", desc: "Dusted & Frosted Crystal glass finishes, Ceramic CA35/CA80 & Prestige solar films." }
  ];

  // Core Pillars (Brochure Page 2 mission)
  const pillars = [
    { title: "PERFORMANCE EXCELLENCE", text: "We deliver high-performance 3M™ adhesive tape solutions that meet stringent industrial standards, ensuring maximum strength and durability in every application." },
    { title: "STRATEGIC PARTNERSHIP", text: "We work closely with clients to understand technical requirements, offering custom slitting, conversion, and application-tailored adhesive engineering." },
    { title: "INNOVATION-DRIVEN", text: "By leveraging advanced 3M™ technologies, we offer modern bonding solutions that eliminate rivets, screws, and welds for faster assembly." },
    { title: "RELIABLE SUPPLY & SUPPORT", text: "We guarantee quick dispatch and dependable inventory support from our Naroda distribution hub to maintain seamless factory operations." },
    { title: "APPLICATION EXPERTISE", text: "With nearly two decades of industry mastery, we guide engineering teams in choosing exact adhesive specifications for demanding environments." },
    { title: "QUALITY ASSURANCE", text: "Every batch supplied is backed by authentic 3M™ standards, ensuring total compliance, safety, and long-lasting material integrity." }
  ];

  // Core Values (Brochure Tagline: Innovation. Integrity. Excellence.)
  const values = [
    { num: "01", title: "QUALITY COMMITMENT", text: "We supply 100% genuine 3M™ certified solutions guaranteeing unmatched bond strength, UV resistance, and longevity." },
    { num: "02", title: "CUSTOMER FOCUS", text: "Client satisfaction drives our operations—providing precise material dimensions, custom converting, and expert technical consultations." },
    { num: "03", title: "INNOVATION & TECHNOLOGY", text: "We introduce cutting-edge microprismatic, nano-ceramic, and VHB acrylic technologies to advance manufacturing capabilities." },
    { num: "04", title: "INTEGRITY & RELIABILITY", text: "Ethical trade practices, transparent pricing, and unwavering reliability form the foundation of our two-decade market trust." }
  ];

  // Filtered categories based on search input
  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) return categories;
    const term = searchTerm.toLowerCase();
    return categories.filter(c => 
      c.name.toLowerCase().includes(term) || 
      c.desc.toLowerCase().includes(term) ||
      c.num.includes(term)
    );
  }, [searchTerm]);

  return (
    <main ref={containerRef} className="bg-white font-sans selection:bg-brand-red selection:text-white overflow-hidden relative">
      
      {/* Top Banner Tagline */}
      <div className="bg-slate-950 text-white text-xs md:text-sm py-2.5 px-4 text-center font-mono border-b border-white/10 flex flex-wrap items-center justify-center gap-3 md:gap-8 pt-24 md:pt-28">
        <span className="flex items-center gap-1.5 text-brand-red font-bold">
          <ShieldCheck className="w-4 h-4" /> AUTHORISED 3M DISTRIBUTOR
        </span>
        <span className="hidden md:inline text-gray-600">•</span>
        <span className="text-gray-300">ESTABLISHED IN 2006 (NARODA, AHMEDABAD)</span>
        <span className="hidden md:inline text-gray-600">•</span>
        <span className="text-amber-400 font-medium">INNOVATION · INTEGRITY · EXCELLENCE</span>
      </div>

      {/* Hero Section Container */}
      <section className="relative w-full min-h-[85vh] py-12 lg:py-20 flex flex-col lg:flex-row items-center justify-between z-10">
        
        {/* Left Content Area */}
        <div className="w-full lg:w-[50%] px-6 md:px-12 lg:px-20 h-full flex flex-col justify-center relative z-20">
          
          <div className="relative">
            {/* Outline Text Background */}
            <motion.div 
              className="absolute -top-10 md:-top-16 left-0 text-[4.5rem] sm:text-[6.5rem] md:text-[9rem] lg:text-[11rem] font-serif leading-none tracking-tighter text-transparent z-[-1] select-none pointer-events-none opacity-40"
              style={{ 
                WebkitTextStroke: '2px rgba(220,38,38,0.15)',
                y: y2
              }}
            >
              N.B.
            </motion.div>

            <motion.div className="inline-flex items-center gap-2 bg-brand-soft border border-brand-red/20 px-3.5 py-1.5 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-brand-red" />
              <span className="text-xs md:text-sm font-bold text-brand-red tracking-wider uppercase">
                Excellence with Experience
              </span>
            </motion.div>

            <motion.div className="overflow-hidden">
              <motion.h1 
                initial={{ y: "100%", rotateZ: 3 }}
                animate={{ y: 0, rotateZ: 0 }}
                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[3.2rem] sm:text-[4.8rem] md:text-[6rem] lg:text-[7rem] font-black leading-[0.9] tracking-tighter text-gray-900 uppercase"
              >
                About Us
              </motion.h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-4 text-lg sm:text-xl md:text-2xl font-bold text-brand-red uppercase tracking-wide"
            >
              NB Corporation
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="mt-6 max-w-xl relative border-l-4 border-brand-red pl-5 sm:pl-6"
          >
            <p className="text-base sm:text-lg text-gray-700 font-normal leading-relaxed">
              Established in 2006 in Naroda, Ahmedabad (Gujarat), <strong className="text-gray-900 font-semibold">NB Corporation</strong> is a reputed manufacturer, converter, and authorised distributor of high-quality adhesive tapes and polyurethane (PU) sealants.
            </p>
            <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
              With nearly two decades of industry expertise, we are your one-stop adhesive partner for bonding, sealing, insulation, safety, and surface protection across Indian industries.
            </p>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a 
              href="#brochure-overview" 
              className="bg-brand-red hover:bg-brand-dark text-white px-7 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-red-500/25 flex items-center gap-2"
            >
              <span>Explore Products</span>
              <ChevronRight className="w-4 h-4" />
            </a>
            <a 
              href="#contact-info" 
              className="border border-gray-300 hover:border-gray-900 text-gray-800 px-7 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all flex items-center gap-2"
            >
              <span>Contact Headquarters</span>
            </a>
          </motion.div>
        </div>

        {/* Right side Image & Visual Showcase */}
        <div className="w-full lg:w-[48%] mt-12 lg:mt-0 px-6 lg:px-12 relative z-10">
          <div className="relative w-full h-[420px] sm:h-[500px] lg:h-[580px] rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
            <motion.img 
              style={{ scale: scaleImage }}
              src="https://images.pexels.com/photos/11479977/pexels-photo-11479977.jpeg" 
              alt="NB Corporation Team & Warehouse" 
              className="w-full h-full object-cover filter brightness-95 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

            {/* Authorised Distributor Seal Badge */}
            <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/40 max-w-[200px] text-center">
              <div className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">OFFICIAL PARTNER</div>
              <div className="text-xl font-black text-brand-red tracking-tight mt-0.5">3M™ AUTHORISED</div>
              <div className="text-[11px] text-gray-700 font-medium">Science. Applied to Life.™</div>
            </div>

            {/* Bottom Overlay Card */}
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white">
              <div className="text-xs font-mono text-brand-red uppercase font-bold tracking-widest mb-1">Company Profile</div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Precision Converter & Manufacturer</h3>
              <p className="text-xs sm:text-sm text-gray-200 mt-1 line-clamp-2">
                Delivering application-specific adhesive tapes, PU sealants, and industrial surface solutions across India.
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* Key Highlights Metrics Grid (Brochure Page 2) - Fixed Overflow UI */}
      <section className="relative w-full py-12 lg:py-16 bg-slate-950 text-white border-y border-white/10 z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] transition-all group overflow-hidden flex flex-col justify-between"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand-red/20 border border-brand-red/40 flex items-center justify-center text-brand-red mb-4 group-hover:scale-110 transition-transform flex-shrink-0">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-4xl lg:text-4xl xl:text-5xl font-black text-white tracking-tight break-words truncate">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm lg:text-base font-bold text-gray-200 mt-1.5 leading-snug">
                      {stat.label}
                    </div>
                    <div className="text-[11px] sm:text-xs text-gray-400 font-mono mt-1 truncate">
                      {stat.detail}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Corporate Overview & Story Section (Brochure Page 2 Verbatim) */}
      <section className="relative w-full py-20 bg-white z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center mb-16"
          >
            <span className="text-xs sm:text-sm font-bold tracking-[0.4em] text-brand-red uppercase mb-3">Company Overview</span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight uppercase">
              Who We Are & What We Do
            </h2>
            <div className="w-20 h-1 bg-brand-red mt-6 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Left Narrative Box */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 text-gray-700 text-base sm:text-lg leading-relaxed"
            >
              <div className="bg-brand-soft border-l-4 border-brand-red p-6 rounded-r-2xl">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Two Decades of Excellence (Est. 2006)</h3>
                <p className="text-gray-700">
                  <strong className="text-gray-900">NB Corporation</strong>, established in 2006 in Naroda, Ahmedabad (Gujarat), is a reputed manufacturer, converter, and distributor of high-quality adhesive tapes and polyurethane (PU) sealants. With nearly two decades of industry expertise, we have earned a strong position in the Indian market by consistently delivering innovative, reliable, and application-specific adhesive solutions to various industrial sectors.
                </p>
              </div>

              <p>
                Driven by precision engineering, customer satisfaction, and stringent quality standards, we offer a wide and diverse range of products that cater to the evolving needs of modern industries. Whether you need bonding, sealing, insulation, safety, or surface protection—<strong className="text-gray-900">NB Corporation is your one-stop adhesive partner.</strong>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Custom Slitting & Converting</h4>
                    <p className="text-xs text-gray-600">Tailored widths from 10mm to 1200mm master rolls.</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Pan-India Industrial Logistics</h4>
                    <p className="text-xs text-gray-600">Rapid dispatch for zero production downtime.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Cards: Mission & Vision */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Mission Card */}
              <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden group shadow-xl">
                <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-white/10 transition-colors pointer-events-none select-none">
                  <Target className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 bg-brand-red/20 border border-brand-red/40 px-3 py-1 rounded-full text-brand-red text-xs font-bold uppercase tracking-widest mb-4">
                    <Target className="w-3.5 h-3.5" /> Mission Statement
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black mb-3">Our Mission</h3>
                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                    "To provide high-quality 3M™ adhesive tape solutions that enhance industrial processes through stronger bonding, faster assembly, and consistent performance across every application."
                  </p>
                </div>
              </div>

              {/* Vision Card */}
              <div className="bg-gradient-to-br from-brand-red to-brand-dark text-white p-8 rounded-3xl relative overflow-hidden group shadow-xl">
                <div className="absolute top-0 right-0 p-8 text-white/10 group-hover:text-white/20 transition-colors pointer-events-none select-none">
                  <Eye className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-4">
                    <Eye className="w-3.5 h-3.5" /> Vision Statement
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black mb-3">Our Vision</h3>
                  <p className="text-gray-100 text-base sm:text-lg leading-relaxed">
                    "To be India’s most trusted and innovative provider of adhesive tape and sealant solutions, contributing to the success of our clients through technology, customization, and service excellence."
                  </p>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* Industries We Power (Brochure Page 4) */}
      <section className="relative w-full py-20 bg-slate-950 text-white z-20 overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-red/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-red/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-xs sm:text-sm font-bold tracking-[0.4em] text-brand-red uppercase mb-3">Comprehensive Applications</span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase">
              Industries We Power
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mt-4">
              Providing application-engineered 3M™ solutions tailored for critical sectors across manufacturing, safety, healthcare, and infrastructure.
            </p>
          </motion.div>

          {/* Industry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {industries.map((ind, idx) => {
              const Icon = ind.icon;
              return (
                <motion.div
                  key={ind.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                  className={`p-6 sm:p-8 rounded-3xl bg-white/[0.02] border ${ind.borderColor} hover:bg-white/[0.05] transition-all duration-300 group flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-colors duration-300 flex-shrink-0">
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                      <span className="text-xs font-mono text-gray-500 uppercase">Sector 0{idx + 1}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-brand-red transition-colors">
                      {ind.name}
                    </h3>

                    <ul className="space-y-2.5">
                      {ind.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="text-xs sm:text-sm text-gray-300 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-red mt-1.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400 font-mono">
                    <span>3M™ Certified Portfolio</span>
                    <ChevronRight className="w-4 h-4 text-brand-red group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 21 Product Categories Overview at a Glance (Brochure Page 3) */}
      <section id="brochure-overview" className="relative w-full py-20 bg-gray-50 text-gray-900 z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <span className="text-xs sm:text-sm font-bold tracking-[0.4em] text-brand-red uppercase mb-3">Product Portfolio</span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase">
              21 Core Product Categories
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mt-3">
              Detailed at a glance in the official NB Corporation product brochure.
            </p>

            {/* Interactive Search Bar for 21 Categories */}
            <div className="mt-8 max-w-md mx-auto relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Search categories (e.g. VHB, Masking, Sealant)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white rounded-full border border-gray-300 shadow-sm focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 text-sm font-medium transition-all"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-gray-700 bg-gray-100 rounded-full w-5 h-5 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat, idx) => (
                <motion.div 
                  key={cat.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (idx % 6) * 0.05 }}
                  className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-brand-red/40 transition-all flex gap-4 items-start group"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-mono font-bold text-sm flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red transition-colors">
                    {cat.num}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg group-hover:text-brand-red transition-colors">
                      {cat.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-gray-500 font-medium">
                No product categories match "{searchTerm}". Try another keyword like "tape" or "film".
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Strategic Mission Pillars Grid */}
      <section className="relative w-full py-20 bg-slate-950 text-white z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-xs sm:text-sm font-bold tracking-[0.4em] text-brand-red uppercase mb-3">Operating Standard</span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase">
              Our Strategic Pillars
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-brand-red/20 border border-brand-red/40 flex items-center justify-center text-brand-red mb-6 font-mono font-bold text-xs">
                  0{idx + 1}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-red transition-colors uppercase tracking-wide">
                  {pillar.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {pillar.text}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Core Values Section */}
      <section className="relative w-full py-20 bg-white text-gray-900 z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            
            <div className="w-full lg:w-[35%]">
              <span className="text-xs sm:text-sm font-bold tracking-[0.4em] text-brand-red uppercase mb-3 block">Foundation</span>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tight uppercase text-gray-900">
                Our Core <br /> <span className="text-brand-red">Values</span>
              </h2>
              <p className="mt-6 text-gray-600 text-base leading-relaxed">
                The uncompromising principles guiding NB Corporation since 2006 in delivering excellence, integrity, and innovative adhesive solutions.
              </p>
            </div>

            <div className="w-full lg:w-[65%] grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((val, idx) => (
                <div key={idx} className="p-8 rounded-3xl bg-gray-50 border border-gray-200 hover:shadow-lg transition-all">
                  <div className="text-3xl font-black text-brand-red font-mono mb-2">{val.num}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{val.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{val.text}</p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* Official Headquarters & Contact Info (Brochure Page 60) */}
      <section id="contact-info" className="relative w-full py-16 bg-slate-950 text-white border-t border-white/10 z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            {/* Address */}
            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-red/20 border border-brand-red/40 flex items-center justify-center text-brand-red flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-1">Corporate Office & Warehouse</h4>
                <p className="text-sm font-medium text-gray-200 leading-relaxed">
                  G-10, 11, 12 SATKAR AVENUE, NR. RAILWAY CROSSING, NH NO-08, Opp. Starline Maruti Showroom, Naroda, Ahmedabad, Gujarat 382340
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-red/20 border border-brand-red/40 flex items-center justify-center text-brand-red flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-1">Direct Hotlines</h4>
                <div className="space-y-1 text-sm font-bold text-white">
                  <div>+91 98259 54315</div>
                  <div>+91 98251 54315</div>
                  <div>+91 99040 44315</div>
                </div>
              </div>
            </div>

            {/* Email & Web */}
            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-red/20 border border-brand-red/40 flex items-center justify-center text-brand-red flex-shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-1">Digital Correspondence</h4>
                <p className="text-sm font-bold text-white mb-2">nb2corporation@gmail.com</p>
                <a 
                  href="http://www.nbcorporation.net" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-brand-red hover:underline font-mono"
                >
                  <span>www.nbcorporation.net</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
