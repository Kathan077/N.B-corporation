const mongoose = require("mongoose");

const FaqItemSchema = new mongoose.Schema({
  q: { type: String, default: "" },
  a: { type: String, default: "" }
}, { _id: false });

const ValuePerkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  icon: { type: String, default: "Wrench" }
}, { _id: false });

const ContactContentSchema = new mongoose.Schema({
  hero: {
    badge: { type: String, default: "CONNECT WITH OUR INDUSTRIAL SPECIALISTS" },
    heading: { type: String, default: "Let's Engineer Your Solution Together" },
    headingAccent: { type: String, default: "Solution Together" },
    subheading: { type: String, default: "Whether you need custom slit tapes, high-performance 3M™ abrasives, or a competitive volume quote, our application engineers are ready to assist you." }
  },
  cards: {
    phone: {
      tag: { type: String, default: "DIRECT HOTLINE" },
      value: { type: String, default: "+91 98259 54315" },
      desc: { type: String, default: "Mon – Sat: 9:00 AM – 7:00 PM IST" },
      action: { type: String, default: "Call Directly" },
      link: { type: String, default: "tel:+919825954315" }
    },
    email: {
      tag: { type: String, default: "OFFICIAL EMAIL" },
      value: { type: String, default: "nb2corporation@gmail.com" },
      desc: { type: String, default: "Fast response within 4–12 business hours" },
      action: { type: String, default: "Send Email" },
      link: { type: String, default: "mailto:nb2corporation@gmail.com" }
    },
    location: {
      tag: { type: String, default: "CENTRAL FACILITY" },
      value: { type: String, default: "Ahmedabad, Gujarat" },
      desc: { type: String, default: "Headquarters & Conversion Facility" },
      action: { type: String, default: "Get Directions" },
      link: { type: String, default: "https://maps.google.com/?q=Ahmedabad,Gujarat,India" }
    }
  },
  valueSection: {
    badge: { type: String, default: "EXCELLENCE WITH EXPERIENCE" },
    heading: { type: String, default: "Partner with Certified 3M™ Industrial Leaders" },
    headingAccent: { type: String, default: "3M™ Industrial Leaders" },
    subheading: { type: String, default: "Since 2006, N.B. Corporation has empowered over 1,000+ manufacturing facilities across India with state-of-the-art adhesive and abrasive solutions." },
    hoursWeekdays: { type: String, default: "9:00 AM – 7:00 PM (IST)" },
    hoursSunday: { type: String, default: "Closed (Emergency support via Email)" },
    perks: [ValuePerkSchema]
  },
  faqs: [FaqItemSchema]
}, {
  timestamps: true
});

const DEFAULT_CONTACT_CONTENT = {
  hero: {
    badge: "CONNECT WITH OUR INDUSTRIAL SPECIALISTS",
    heading: "Let's Engineer Your Solution Together",
    headingAccent: "Solution Together",
    subheading: "Whether you need custom slit tapes, high-performance 3M™ abrasives, or a competitive volume quote, our application engineers are ready to assist you."
  },
  cards: {
    phone: {
      tag: "DIRECT HOTLINE",
      value: "+91 98259 54315",
      desc: "Mon – Sat: 9:00 AM – 7:00 PM IST",
      action: "Call Directly",
      link: "tel:+919825954315"
    },
    email: {
      tag: "OFFICIAL EMAIL",
      value: "nb2corporation@gmail.com",
      desc: "Fast response within 4–12 business hours",
      action: "Send Email",
      link: "mailto:nb2corporation@gmail.com"
    },
    location: {
      tag: "CENTRAL FACILITY",
      value: "Ahmedabad, Gujarat",
      desc: "Headquarters & Conversion Facility",
      action: "Get Directions",
      link: "https://maps.google.com/?q=Ahmedabad,Gujarat,India"
    }
  },
  valueSection: {
    badge: "EXCELLENCE WITH EXPERIENCE",
    heading: "Partner with Certified 3M™ Industrial Leaders",
    headingAccent: "3M™ Industrial Leaders",
    subheading: "Since 2006, N.B. Corporation has empowered over 1,000+ manufacturing facilities across India with state-of-the-art adhesive and abrasive solutions.",
    hoursWeekdays: "9:00 AM – 7:00 PM (IST)",
    hoursSunday: "Closed (Emergency support via Email)",
    perks: [
      {
        title: "Technical Application Consulting",
        desc: "On-site technical evaluation to ensure the ideal tape & abrasive grade for your exact substrates.",
        icon: "Wrench"
      },
      {
        title: "100% Genuine 3M™ Certified",
        desc: "Authorized distributor backing with official batch warranties and technical datasheets.",
        icon: "ShieldCheck"
      },
      {
        title: "Fast RFQ & Sample Dispatches",
        desc: "Rapid quote turnarounds and trial samples dispatched directly to your manufacturing plant.",
        icon: "FileText"
      }
    ]
  },
  faqs: [
    {
      q: "Can I request product samples for testing on our production line?",
      a: "Yes, absolutely! We provide technical samples of 3M™ VHB tapes, abrasive discs, and adhesives so your engineering team can validate bond strength and surface finish before placing volume orders."
    },
    {
      q: "Do you offer custom slitting and die-cutting services?",
      a: "Yes. We operate advanced precision slitting and die-cutting machinery to convert tape rolls to any custom width (from 3mm upwards) or bespoke shape according to your engineering drawings."
    },
    {
      q: "What is the typical turnaround time for orders and RFQs?",
      a: "Standard inquiries and quotes are processed within 4–12 business hours. In-stock products are dispatched within 24–48 hours across our pan-India logistics network."
    },
    {
      q: "Are all products genuine and certified by 3M™?",
      a: "As an Authorized 3M™ Industrial Distributor & Converter with 20+ years of industry leadership, 100% of our products are certified, traceable, and backed by full manufacturer warranties and technical datasheets."
    }
  ]
};

const ContactContent = mongoose.model("ContactContent", ContactContentSchema);

module.exports = {
  ContactContent,
  DEFAULT_CONTACT_CONTENT
};
