import axios from 'axios';

const BACKEND_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
const CONTACT_CONTENT_API = `${BACKEND_URL}/api/contact-content`;
const INQUIRY_API = `${BACKEND_URL}/api/inquiry`;

export const DEFAULT_CONTACT_PAGE_DATA = {
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

export const fetchLiveContactContent = async () => {
  try {
    const res = await axios.get(CONTACT_CONTENT_API, {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    if (res.data && res.data.data) {
      return res.data.data;
    }
    return DEFAULT_CONTACT_PAGE_DATA;
  } catch (error) {
    console.warn("Backend Contact Content API fallback:", error.message);
    return DEFAULT_CONTACT_PAGE_DATA;
  }
};

export const submitContactInquiry = async (inquiryData) => {
  try {
    const res = await axios.post(INQUIRY_API, {
      name: inquiryData.name,
      email: inquiryData.email,
      mobile: inquiryData.phone || inquiryData.mobile,
      location: inquiryData.company || inquiryData.location || "",
      selectedProduct: inquiryData.inquiryType || "General Contact Inquiry",
      quantity: 1,
      message: inquiryData.message,
      items: []
    });
    return res.data;
  } catch (error) {
    console.error("Submit Contact Inquiry Error:", error);
    throw error;
  }
};
