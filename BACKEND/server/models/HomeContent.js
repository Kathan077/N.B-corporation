const mongoose = require("mongoose");

const defaultHomeData = {
  hero: {
    heading: "Absolute",
    highlight: "Precision",
    subtitle: "High-performance industrial adhesive tapes engineered for critical manufacturing and bonding applications.",
    watermark: "PRECISION",
    badge: "3M Authorized Industrial Converter & Distributor",
    primaryCtaText: "Explore Catalog",
    primaryCtaLink: "/products",
    secondaryCtaText: "Request Quote",
    secondaryCtaLink: "/contact",
    isActive: true
  },
  principles: {
    eyebrow: "OUR PILLARS",
    title: "The Principles",
    highlight: "That Define Mastery",
    watermark: "SYSTEMS",
    isActive: true,
    items: [
      {
        id: "principle-1",
        icon: "Shield",
        title: "UNCOMPROMISING PRODUCT QUALITY",
        description: "We supply high-performance industrial tapes engineered to meet the most demanding bonding, sealing, and mounting requirements. Every product is designed to deliver superior adhesion, durability, and long-term reliability across critical industrial applications.",
        order: 1,
        isActive: true
      },
      {
        id: "principle-2",
        icon: "Target",
        title: "PRECISION-DRIVEN PERFORMANCE",
        description: "Our adhesive solutions are developed with a focus on micron-level accuracy, ensuring flawless bonding across a wide range of materials including metal, glass, plastics, and composites — enabling cleaner finishes, reduced rework, and enhanced manufacturing efficiency.",
        order: 2,
        isActive: true
      },
      {
        id: "principle-3",
        icon: "Zap",
        title: "NEXT-GENERATION ADHESIVE TECHNOLOGY",
        description: "By integrating advanced bonding technologies, we offer modern alternatives to traditional fastening methods such as screws, rivets, and welding — enhancing structural integrity while enabling lightweight designs and faster assembly.",
        order: 3,
        isActive: true
      },
      {
        id: "principle-4",
        icon: "Globe",
        title: "SUSTAINABLE INDUSTRIAL SOLUTIONS",
        description: "We are committed to delivering environmentally responsible adhesive systems that help reduce material waste, energy consumption, and production complexity — supporting cleaner manufacturing practices without compromising performance.",
        order: 4,
        isActive: true
      },
      {
        id: "principle-5",
        icon: "Users",
        title: "Built with your goals in mind.",
        description: "We believe in building strong partnerships by understanding each client's unique application requirements. Our team works closely to deliver customized tape solutions that optimize performance, reduce costs, and improve operational efficiency.",
        order: 5,
        isActive: true
      },
      {
        id: "principle-6",
        icon: "Award",
        title: "TRUSTED INDUSTRIAL RELIABILITY",
        description: "Trusted across automotive, electronics, construction, and signage industries — our tapes withstand extreme temperatures, moisture, and stress conditions, delivering dependable strength, safety, and longevity where it matters most.",
        order: 6,
        isActive: true
      }
    ]
  },
  whyChooseUs: {
    eyebrow: "Operational Supremacy",
    title: "Why",
    highlight: "Choose Us",
    description: "With over 18 years of experience, NB Corporation has earned a reputation for delivering reliable, application-specific adhesive solutions with timely delivery and responsive support. Whether you're a small business or a large industrial enterprise, we aim to be your long-term adhesive partner by offering products that enhance efficiency, safety, and performance.",
    imageUrl: "https://scapaindustrial.com/wp-content/uploads/2025/03/Scapa_675x450_Images_ParnterwithUs.jpg",
    watermark: "MASTERY",
    features: [
      "Strong, durable bonding with trusted 3M™ technology",
      "Faster assembly with clean, efficient application",
      "Ideal for multiple surfaces and industrial uses",
      "Consistent performance in extreme conditions"
    ],
    isActive: true
  },
  applications: {
    eyebrow: "Choose Your Use-case",
    title: "Industrial Products for Your",
    highlight: "Application",
    isActive: true,
    items: [
      {
        id: "app-1",
        title: "Manufacturing & MRO",
        points: [
          "3M VHB bonding tapes",
          "Double-sided mounting tapes",
          "MRO supplies & Consumables",
          "Floor marking & safety tapes"
        ],
        icon: "Factory",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
        order: 1,
        isActive: true
      },
      {
        id: "app-2",
        title: "Electronics & Appliances",
        points: [
          "3M VHB & epoxy bonding",
          "Double-sided tapes",
          "Thermal interface materials",
          "Electronic assembly adhesives"
        ],
        icon: "Cpu",
        image: "https://image.made-in-china.com/202f0j00wsVbWrNlrioT/Industrial-Double-Sided-Acrylic-Foam-Tape-for-Automotive-Home-Appliances-Electronics.webp",
        order: 2,
        isActive: true
      },
      {
        id: "app-3",
        title: "Construction & Interiors",
        points: [
          "3M VHB structural bonding",
          "Double-sided technical tapes",
          "Electrical insulation tapes",
          "Clear bonding tapes"
        ],
        icon: "HardHat",
        image: "https://www.strouse.com/hubfs/My%20project-1%20-%202023-06-22T074140.956.jpg",
        order: 3,
        isActive: true
      },
      {
        id: "app-4",
        title: "Transportation & Aerospace",
        points: [
          "Aviation component bonding",
          "Electric vehicle solutions",
          "Mass transit infrastructure",
          "Maritime technical supplies"
        ],
        icon: "Truck",
        image: "https://images.unsplash.com/photo-1519074069444-1ba4ea16e6f6?auto=format&fit=crop&w=800&q=80",
        order: 4,
        isActive: true
      }
    ]
  },
  testimonials: {
    eyebrow: "Testimonials",
    heading: "Proud Moments",
    highlight: "Happy Clients",
    watermark: "LEGACY",
    isActive: true,
    items: [
      {
        id: "STP-01",
        client: "STP Limited",
        author: "Sarita Koul",
        review: "Our company has been in business with Tack Innovations for over 1 year and I can attest to the level of service quality that they offer at an affordable price. We firmly believe your company benefits from doing business — you are very important and integral to our own success.",
        order: 1,
        isActive: true
      },
      {
        id: "CEL-02",
        client: "Central Electronics Limited",
        author: "Sarita Koul",
        review: "Central Electronics Limited, Ghaziabad, has been procuring supplies for at least 6 years, and we can attest to the commendable level of service quality they provide at an affordable price.",
        order: 2,
        isActive: true
      },
      {
        id: "FAL-03",
        client: "Falcon Intl",
        author: "Gaurav Singh",
        review: "Your success shines through in providing material and product support for silicone, quick-paced arrangement of materials with technical data and MSDS, and prompt support in handling pricing issues when they arise.",
        order: 3,
        isActive: true
      },
      {
        id: "IFB-04",
        client: "IFB",
        author: "Author Name",
        review: "Dealer for various automotive products. We anticipate a long-term relationship with support in technical expertise and quality materials. We look forward to a continued partnership and wish you the best in the future.",
        order: 4,
        isActive: true
      }
    ]
  },
  featuredProducts: {
    eyebrow: "Official 3M Authorised Lineup",
    heading: "Featured",
    highlight: "3M Solutions",
    buttonText: "View Full Catalog",
    maxCount: 8,
    customProductIds: [],
    isActive: true
  },
  brands: {
    title: "Industries",
    highlight: "Served",
    watermark: "PARTNERS",
    isActive: true,
    items: [
      { id: "LT-01", name: "LARSEN & TOUBRO", code: "LT-01", order: 1, isActive: true },
      { id: "AI-02", name: "AIR INDIA", code: "AI-02", order: 2, isActive: true },
      { id: "SM-03", name: "SAMSUNG", code: "SM-03", order: 3, isActive: true },
      { id: "VV-04", name: "VVDN", code: "VV-04", order: 4, isActive: true },
      { id: "SGS-05", name: "SGS", code: "SGS-05", order: 5, isActive: true },
      { id: "UF-06", name: "UFLEX", code: "UF-06", order: 6, isActive: true },
      { id: "IFB-07", name: "IFB", code: "IFB-07", order: 7, isActive: true },
      { id: "PX-08", name: "POLYPLEX", code: "PX-08", order: 8, isActive: true }
    ]
  },
  impact: {
    tagline: "We Can Help You",
    statement: "we aim to reduce production costs by {cost} and increase efficiency by {efficiency} while simultaneously improving product quality and lifespan by {quality}.",
    costReduction: "20%",
    efficiencyIncrease: "30%",
    qualityIncrease: "40%",
    buttonText: "Contact Now",
    buttonLink: "/contact",
    isActive: true
  }
};

const PrincipleItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  icon: { type: String, default: "Shield" },
  title: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { _id: false });

const ApplicationItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  points: [{ type: String }],
  icon: { type: String, default: "Factory" },
  image: { type: String, default: "" },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { _id: false });

const TestimonialItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  client: { type: String, required: true },
  author: { type: String, required: true },
  review: { type: String, required: true },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { _id: false });

const BrandItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  code: { type: String, default: "" },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { _id: false });

const HomeContentSchema = new mongoose.Schema({
  hero: {
    heading: { type: String, default: "Absolute" },
    highlight: { type: String, default: "Precision" },
    subtitle: { type: String, default: "" },
    watermark: { type: String, default: "PRECISION" },
    badge: { type: String, default: "" },
    primaryCtaText: { type: String, default: "Explore Catalog" },
    primaryCtaLink: { type: String, default: "/products" },
    secondaryCtaText: { type: String, default: "Contact Us" },
    secondaryCtaLink: { type: String, default: "/contact" },
    isActive: { type: Boolean, default: true }
  },
  principles: {
    eyebrow: { type: String, default: "OUR PILLARS" },
    title: { type: String, default: "The Principles" },
    highlight: { type: String, default: "That Define Mastery" },
    watermark: { type: String, default: "SYSTEMS" },
    isActive: { type: Boolean, default: true },
    items: [PrincipleItemSchema]
  },
  whyChooseUs: {
    eyebrow: { type: String, default: "Operational Supremacy" },
    title: { type: String, default: "Why" },
    highlight: { type: String, default: "Choose Us" },
    description: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    watermark: { type: String, default: "MASTERY" },
    features: [{ type: String }],
    isActive: { type: Boolean, default: true }
  },
  applications: {
    eyebrow: { type: String, default: "Choose Your Use-case" },
    title: { type: String, default: "Industrial Products for Your" },
    highlight: { type: String, default: "Application" },
    isActive: { type: Boolean, default: true },
    items: [ApplicationItemSchema]
  },
  testimonials: {
    eyebrow: { type: String, default: "Testimonials" },
    heading: { type: String, default: "Proud Moments" },
    highlight: { type: String, default: "Happy Clients" },
    watermark: { type: String, default: "LEGACY" },
    isActive: { type: Boolean, default: true },
    items: [TestimonialItemSchema]
  },
  featuredProducts: {
    eyebrow: { type: String, default: "Official 3M Authorised Lineup" },
    heading: { type: String, default: "Featured" },
    highlight: { type: String, default: "3M Solutions" },
    buttonText: { type: String, default: "View Full Catalog" },
    maxCount: { type: Number, default: 8 },
    customProductIds: [{ type: String }],
    isActive: { type: Boolean, default: true }
  },
  brands: {
    title: { type: String, default: "Industries" },
    highlight: { type: String, default: "Served" },
    watermark: { type: String, default: "PARTNERS" },
    isActive: { type: Boolean, default: true },
    items: [BrandItemSchema]
  },
  impact: {
    tagline: { type: String, default: "We Can Help You" },
    statement: { type: String, default: "we aim to reduce production costs by {cost} and increase efficiency by {efficiency} while simultaneously improving product quality and lifespan by {quality}." },
    costReduction: { type: String, default: "20%" },
    efficiencyIncrease: { type: String, default: "30%" },
    qualityIncrease: { type: String, default: "40%" },
    buttonText: { type: String, default: "Contact Now" },
    buttonLink: { type: String, default: "/contact" },
    isActive: { type: Boolean, default: true }
  }
}, {
  timestamps: true
});

const HomeContent = mongoose.model("HomeContent", HomeContentSchema);

module.exports = {
  HomeContent,
  defaultHomeData
};
