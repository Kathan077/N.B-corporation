const mongoose = require("mongoose");

const defaultAboutData = {
  topBanner: {
    badge: "AUTHORISED 3M DISTRIBUTOR",
    tagline: "ESTABLISHED IN 2006 (NARODA, AHMEDABAD)",
    motto: "INNOVATION · INTEGRITY · EXCELLENCE",
    isActive: true
  },
  hero: {
    watermark: "N.B.",
    badge: "Excellence with Experience",
    title: "About Us",
    subtitle: "NB Corporation",
    description1: "Established in 2006 in Naroda, Ahmedabad (Gujarat), NB Corporation is a reputed manufacturer, converter, and authorised distributor of high-quality adhesive tapes and polyurethane (PU) sealants.",
    description2: "With nearly two decades of industry expertise, we are your one-stop adhesive partner for bonding, sealing, insulation, safety, and surface protection across Indian industries.",
    imageUrl: "https://images.pexels.com/photos/11479977/pexels-photo-11479977.jpeg",
    sealTag: "OFFICIAL PARTNER",
    sealTitle: "3M™ AUTHORISED",
    sealSubtitle: "Science. Applied to Life.™",
    profileTag: "Company Profile",
    profileHeading: "Precision Converter & Manufacturer",
    profileText: "Delivering application-specific adhesive tapes, PU sealants, and industrial surface solutions across India.",
    primaryCtaText: "Explore Products",
    primaryCtaLink: "#brochure-overview",
    secondaryCtaText: "Contact Headquarters",
    secondaryCtaLink: "#contact-info",
    isActive: true
  },
  stats: {
    isActive: true,
    items: [
      { id: "stat-1", label: "Years of Experience", value: "20+", detail: "Established in 2006", icon: "Award", order: 1, isActive: true },
      { id: "stat-2", label: "Authorised Distributor", value: "3M™", detail: "Science. Applied to Life.™", icon: "ShieldCheck", order: 2, isActive: true },
      { id: "stat-3", label: "Clients Served", value: "1,000+", detail: "Across Pan-India Industries", icon: "Users", order: 3, isActive: true },
      { id: "stat-4", label: "Products Supplied", value: "40,000+", detail: "Converted & Custom Slit", icon: "Boxes", order: 4, isActive: true }
    ]
  },
  story: {
    eyebrow: "Company Overview",
    heading: "Who We Are & What We Do",
    storyTitle: "Two Decades of Excellence (Est. 2006)",
    storyText: "NB Corporation, established in 2006 in Naroda, Ahmedabad (Gujarat), is a reputed manufacturer, converter, and distributor of high-quality adhesive tapes and polyurethane (PU) sealants. With nearly two decades of industry expertise, we have earned a strong position in the Indian market by consistently delivering innovative, reliable, and application-specific adhesive solutions to various industrial sectors.",
    storySubtext: "Driven by precision engineering, customer satisfaction, and stringent quality standards, we offer a wide and diverse range of products that cater to the evolving needs of modern industries. Whether you need bonding, sealing, insulation, safety, or surface protection—NB Corporation is your one-stop adhesive partner.",
    feature1Title: "Custom Slitting & Converting",
    feature1Text: "Tailored widths from 10mm to 1200mm master rolls.",
    feature2Title: "Pan-India Industrial Logistics",
    feature2Text: "Rapid dispatch for zero production downtime.",
    missionTitle: "Our Mission",
    missionText: "To provide high-quality 3M™ adhesive tape solutions that enhance industrial processes through stronger bonding, faster assembly, and consistent performance across every application.",
    visionTitle: "Our Vision",
    visionText: "To be India’s most trusted and innovative provider of adhesive tape and sealant solutions, contributing to the success of our clients through technology, customization, and service excellence.",
    isActive: true
  },
  industries: {
    eyebrow: "Comprehensive Applications",
    heading: "Industries We Power",
    subheading: "Providing application-engineered 3M™ solutions tailored for critical sectors across manufacturing, safety, healthcare, and infrastructure.",
    isActive: true,
    items: [
      {
        id: "construction",
        name: "Construction & Architecture",
        icon: "Building2",
        borderColor: "border-amber-500/30",
        items: [
          "Sun control window films (PR 70)",
          "VHB structural bonding tape",
          "Waterproofing sealants",
          "Masking tapes for painting"
        ],
        order: 1,
        isActive: true
      },
      {
        id: "automotive",
        name: "Automotive",
        icon: "Wrench",
        borderColor: "border-blue-500/30",
        items: [
          "Safety reflective film",
          "Paint protection films",
          "Body panel bonding tapes",
          "Cubitron abrasives for finishing",
          "Meguiar's car care products",
          "Acoustic noise dampening"
        ],
        order: 2,
        isActive: true
      },
      {
        id: "industrial",
        name: "Industrial & Manufacturing",
        icon: "Factory",
        borderColor: "border-red-500/30",
        items: [
          "Filament & masking tapes",
          "Adhesives & sealants",
          "Anodizing & electroplating tape",
          "Filtration products",
          "Advanced ceramics"
        ],
        order: 3,
        isActive: true
      },
      {
        id: "healthcare",
        name: "Healthcare",
        icon: "HeartPulse",
        borderColor: "border-emerald-500/30",
        items: [
          "Tegaderm wound dressings",
          "Littmann stethoscopes",
          "Nexcare bandages",
          "Surgical drapes & tapes",
          "Sterilisation indicators"
        ],
        order: 4,
        isActive: true
      },
      {
        id: "electronics",
        name: "Electrical & Electronics",
        icon: "Zap",
        borderColor: "border-violet-500/30",
        items: [
          "Insulation & splicing tapes",
          "VHB tape for display bonding",
          "EMI/EMC shielding solutions",
          "Thermal management films",
          "Antistatic additives"
        ],
        order: 5,
        isActive: true
      },
      {
        id: "home_office",
        name: "Home & Office",
        icon: "Home",
        borderColor: "border-indigo-500/30",
        items: [
          "Post-it notes & organizers",
          "Command damage-free strips",
          "Scotch tape & dispensers",
          "Window privacy films",
          "Scotch-Brite cleaning pads"
        ],
        order: 6,
        isActive: true
      },
      {
        id: "aerospace",
        name: "Aerospace & Defence",
        icon: "Plane",
        borderColor: "border-sky-500/30",
        items: [
          "Nextel ceramic fabrics",
          "High-temp insulation films",
          "Structural adhesives",
          "Lightweight composite parts",
          "Tube seals for furnaces"
        ],
        order: 7,
        isActive: true
      },
      {
        id: "safety",
        name: "Safety & Security",
        icon: "ShieldAlert",
        borderColor: "border-yellow-500/30",
        items: [
          "N95 & P100 respirators",
          "Peltor hearing protection",
          "Speedglas welding helmets",
          "Safety eyewear",
          "Fall protection harnesses"
        ],
        order: 8,
        isActive: true
      },
      {
        id: "energy",
        name: "Energy & Environment",
        icon: "Sun",
        borderColor: "border-green-500/30",
        items: [
          "Solar module adhesives",
          "Wind blade bonding tapes",
          "Solar control window films",
          "Thermal insulation products",
          "Energy-efficient coatings"
        ],
        order: 9,
        isActive: true
      }
    ]
  },
  categories: {
    eyebrow: "Product Portfolio",
    heading: "21 Core Product Categories",
    subheading: "Detailed at a glance in the official NB Corporation product brochure.",
    isActive: true,
    items: [
      { id: "cat-01", num: "01", name: "Floor Marking Tapes", desc: "Heavy-duty 3M 764, 766, 767, 971 vinyl tapes for 5S/6S lean factory logistics.", order: 1, isActive: true },
      { id: "cat-02", num: "02", name: "Filament Tape", desc: "Glass-yarn reinforced heavy-duty bundling and strapping tapes (3M 897, 898).", order: 2, isActive: true },
      { id: "cat-03", num: "03", name: "UHMW Tape", desc: "Polyethylene slide & abrasion resistant tape (3M 5423) for conveyor rails.", order: 3, isActive: true },
      { id: "cat-04", num: "04", name: "Reclosable Fastener (Dual Lock)", desc: "3M Dual Lock SJ 3550 stem reclosable fasteners—5x stronger than hook & loop.", order: 4, isActive: true },
      { id: "cat-05", num: "05", name: "Adhesive Promoters", desc: "Surface primers for maximum tape adhesion on plastic, metal & glass.", order: 5, isActive: true },
      { id: "cat-06", num: "06", name: "Aluminium Foil Tape", desc: "Thermal conductivity, moisture barrier & heat reflective foil tape solutions.", order: 6, isActive: true },
      { id: "cat-07", num: "07", name: "Duct Tape", desc: "High-tack waterproof cloth duct tapes for sealing, patching & industrial wrapping.", order: 7, isActive: true },
      { id: "cat-08", num: "08", name: "Masking Tape", desc: "Precision high-temperature automotive & industrial painting masking tapes.", order: 8, isActive: true },
      { id: "cat-09", num: "09", name: "UPVC Tape", desc: "Heavy-duty unplasticized PVC sealing tape for bag closing & pipe protection.", order: 9, isActive: true },
      { id: "cat-10", num: "10", name: "Transparent Film Tape", desc: "Optically clear pressure sensitive film tapes for electronic & print packaging.", order: 10, isActive: true },
      { id: "cat-11", num: "11", name: "EST Tape Waterproofing", desc: "Elastomeric self-adhesive sealing tape for structural waterproofing seams.", order: 11, isActive: true },
      { id: "cat-12", num: "12", name: "Anti Skid Tapes", desc: "Safety-Walk slip-resistant treads for stairs, walkways & heavy machinery.", order: 12, isActive: true },
      { id: "cat-13", num: "13", name: "PU Sealant 600 ml", desc: "High-performance polyurethane expansion joint & windshield adhesive sealants.", order: 13, isActive: true },
      { id: "cat-14", num: "14", name: "Epoxy & Structural Adhesive", desc: "Dual-component high-strength structural epoxies replacing rivets & welds.", order: 14, isActive: true },
      { id: "cat-15", num: "15", name: "Applicators", desc: "3M Lane Marking M1 applicators & manual/pneumatic sealant guns.", order: 15, isActive: true },
      { id: "cat-16", num: "16", name: "Aerosol Spray", desc: "Spray 77, 90 high-strength contact adhesives & industrial cleaners.", order: 16, isActive: true },
      { id: "cat-17", num: "17", name: "Thin Bonding Tapes", desc: "Double-coated tissue, PET, and transfer tapes for electronic device assembly.", order: 17, isActive: true },
      { id: "cat-18", num: "18", name: "Cleaning Products", desc: "Scotch-Brite industrial hand pads, degreasers & surface maintenance tools.", order: 18, isActive: true },
      { id: "cat-19", num: "19", name: "VHB Tapes", desc: "3M Very High Bond acrylic foam tapes for permanent structural bonding.", order: 19, isActive: true },
      { id: "cat-20", num: "20", name: "Retro Reflective Tapes", desc: "3M Engineer Grade prismatic sheeting & vehicle safety microprismatic tape.", order: 20, isActive: true },
      { id: "cat-21", num: "21", name: "Protection Films", desc: "Dusted & Frosted Crystal glass finishes, Ceramic CA35/CA80 & Prestige solar films.", order: 21, isActive: true }
    ]
  },
  pillars: {
    eyebrow: "Operating Standard",
    heading: "Our Strategic Pillars",
    isActive: true,
    items: [
      { id: "pillar-1", num: "01", title: "PERFORMANCE EXCELLENCE", text: "We deliver high-performance 3M™ adhesive tape solutions that meet stringent industrial standards, ensuring maximum strength and durability in every application.", order: 1, isActive: true },
      { id: "pillar-2", num: "02", title: "STRATEGIC PARTNERSHIP", text: "We work closely with clients to understand technical requirements, offering custom slitting, conversion, and application-tailored adhesive engineering.", order: 2, isActive: true },
      { id: "pillar-3", num: "03", title: "INNOVATION-DRIVEN", text: "By leveraging advanced 3M™ technologies, we offer modern bonding solutions that eliminate rivets, screws, and welds for faster assembly.", order: 3, isActive: true },
      { id: "pillar-4", num: "04", title: "RELIABLE SUPPLY & SUPPORT", text: "We guarantee quick dispatch and dependable inventory support from our Naroda distribution hub to maintain seamless factory operations.", order: 4, isActive: true },
      { id: "pillar-5", num: "05", title: "APPLICATION EXPERTISE", text: "With nearly two decades of industry mastery, we guide engineering teams in choosing exact adhesive specifications for demanding environments.", order: 5, isActive: true },
      { id: "pillar-6", num: "06", title: "QUALITY ASSURANCE", text: "Every batch supplied is backed by authentic 3M™ standards, ensuring total compliance, safety, and long-lasting material integrity.", order: 6, isActive: true }
    ]
  },
  values: {
    eyebrow: "Foundation",
    heading: "Our Core Values",
    subheading: "The uncompromising principles guiding NB Corporation since 2006 in delivering excellence, integrity, and innovative adhesive solutions.",
    isActive: true,
    items: [
      { id: "val-1", num: "01", title: "QUALITY COMMITMENT", text: "We supply 100% genuine 3M™ certified solutions guaranteeing unmatched bond strength, UV resistance, and longevity.", order: 1, isActive: true },
      { id: "val-2", num: "02", title: "CUSTOMER FOCUS", text: "Client satisfaction drives our operations—providing precise material dimensions, custom converting, and expert technical consultations.", order: 2, isActive: true },
      { id: "val-3", num: "03", title: "INNOVATION & TECHNOLOGY", text: "We introduce cutting-edge microprismatic, nano-ceramic, and VHB acrylic technologies to advance manufacturing capabilities.", order: 3, isActive: true },
      { id: "val-4", num: "04", title: "INTEGRITY & RELIABILITY", text: "Ethical trade practices, transparent pricing, and unwavering reliability form the foundation of our two-decade market trust.", order: 4, isActive: true }
    ]
  },
  contact: {
    addressTitle: "Corporate Office & Warehouse",
    address: "G-10, 11, 12 SATKAR AVENUE, NR. RAILWAY CROSSING, NH NO-08, Opp. Starline Maruti Showroom, Naroda, Ahmedabad, Gujarat 382340",
    phonesTitle: "Direct Hotlines",
    phones: ["+91 98259 54315", "+91 98251 54315", "+91 99040 44315"],
    emailTitle: "Digital Correspondence",
    email: "nb2corporation@gmail.com",
    website: "www.nbcorporation.net",
    websiteUrl: "http://www.nbcorporation.net",
    isActive: true
  }
};

const StatItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  label: { type: String, required: true },
  value: { type: String, required: true },
  detail: { type: String, default: "" },
  icon: { type: String, default: "Award" },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { _id: false });

const IndustryItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  icon: { type: String, default: "Factory" },
  borderColor: { type: String, default: "border-red-500/30" },
  items: [{ type: String }],
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { _id: false });

const CategoryItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  num: { type: String, default: "01" },
  name: { type: String, required: true },
  desc: { type: String, required: true },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { _id: false });

const PillarItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  num: { type: String, default: "01" },
  title: { type: String, required: true },
  text: { type: String, required: true },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { _id: false });

const ValueItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  num: { type: String, default: "01" },
  title: { type: String, required: true },
  text: { type: String, required: true },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { _id: false });

const AboutContentSchema = new mongoose.Schema({
  topBanner: {
    badge: { type: String, default: "AUTHORISED 3M DISTRIBUTOR" },
    tagline: { type: String, default: "ESTABLISHED IN 2006 (NARODA, AHMEDABAD)" },
    motto: { type: String, default: "INNOVATION · INTEGRITY · EXCELLENCE" },
    isActive: { type: Boolean, default: true }
  },
  hero: {
    watermark: { type: String, default: "N.B." },
    badge: { type: String, default: "Excellence with Experience" },
    title: { type: String, default: "About Us" },
    subtitle: { type: String, default: "NB Corporation" },
    description1: { type: String, default: "" },
    description2: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    sealTag: { type: String, default: "OFFICIAL PARTNER" },
    sealTitle: { type: String, default: "3M™ AUTHORISED" },
    sealSubtitle: { type: String, default: "Science. Applied to Life.™" },
    profileTag: { type: String, default: "Company Profile" },
    profileHeading: { type: String, default: "Precision Converter & Manufacturer" },
    profileText: { type: String, default: "" },
    primaryCtaText: { type: String, default: "Explore Products" },
    primaryCtaLink: { type: String, default: "#brochure-overview" },
    secondaryCtaText: { type: String, default: "Contact Headquarters" },
    secondaryCtaLink: { type: String, default: "#contact-info" },
    isActive: { type: Boolean, default: true }
  },
  stats: {
    isActive: { type: Boolean, default: true },
    items: [StatItemSchema]
  },
  story: {
    eyebrow: { type: String, default: "Company Overview" },
    heading: { type: String, default: "Who We Are & What We Do" },
    storyTitle: { type: String, default: "Two Decades of Excellence (Est. 2006)" },
    storyText: { type: String, default: "" },
    storySubtext: { type: String, default: "" },
    feature1Title: { type: String, default: "Custom Slitting & Converting" },
    feature1Text: { type: String, default: "Tailored widths from 10mm to 1200mm master rolls." },
    feature2Title: { type: String, default: "Pan-India Industrial Logistics" },
    feature2Text: { type: String, default: "Rapid dispatch for zero production downtime." },
    missionTitle: { type: String, default: "Our Mission" },
    missionText: { type: String, default: "" },
    visionTitle: { type: String, default: "Our Vision" },
    visionText: { type: String, default: "" },
    isActive: { type: Boolean, default: true }
  },
  industries: {
    eyebrow: { type: String, default: "Comprehensive Applications" },
    heading: { type: String, default: "Industries We Power" },
    subheading: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    items: [IndustryItemSchema]
  },
  categories: {
    eyebrow: { type: String, default: "Product Portfolio" },
    heading: { type: String, default: "21 Core Product Categories" },
    subheading: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    items: [CategoryItemSchema]
  },
  pillars: {
    eyebrow: { type: String, default: "Operating Standard" },
    heading: { type: String, default: "Our Strategic Pillars" },
    isActive: { type: Boolean, default: true },
    items: [PillarItemSchema]
  },
  values: {
    eyebrow: { type: String, default: "Foundation" },
    heading: { type: String, default: "Our Core Values" },
    subheading: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    items: [ValueItemSchema]
  },
  contact: {
    addressTitle: { type: String, default: "Corporate Office & Warehouse" },
    address: { type: String, default: "" },
    phonesTitle: { type: String, default: "Direct Hotlines" },
    phones: [{ type: String }],
    emailTitle: { type: String, default: "Digital Correspondence" },
    email: { type: String, default: "" },
    website: { type: String, default: "" },
    websiteUrl: { type: String, default: "" },
    isActive: { type: Boolean, default: true }
  }
}, {
  timestamps: true
});

const AboutContent = mongoose.model("AboutContent", AboutContentSchema);

module.exports = {
  AboutContent,
  defaultAboutData
};
