import blogTapes from '../assets/blog_tapes.png';
import blogAbrasives from '../assets/blog_abrasives.png';
import blogAdhesives from '../assets/blog_adhesives.png';

export const CATEGORIES = ["ALL", "INDUSTRIAL TAPES", "ABRASIVES & FINISHING", "ADHESIVES & INSULATION"];

export const POSTS = [
  {
    id: "3m-vhb-industrial-tapes-guide",
    title: "3M™ High-Performance Industrial Tapes: Ultimate Application Guide",
    category: "INDUSTRIAL TAPES",
    excerpt: "Mastering VHB double-sided acrylic foam tapes, structural bonding, thermal resistance, and surface preparation for heavy manufacturing.",
    author: "Kathan Patel",
    role: "Technical Solutions Lead, N.B. Corp",
    date: "MAR 22, 2026",
    readTime: "8 MIN",
    views: "14.2K",
    image: blogTapes,
    summary: "Industrial tapes have revolutionized modern manufacturing by replacing mechanical fasteners, rivets, and spot welds. 3M™ VHB™ Tapes offer permanent structural bonding, vibration damping, and all-weather durability for metal fabrication, automotive assembly, and architectural cladding.",
    sections: [
      {
        heading: "Why 3M VHB Tapes Outperform Mechanical Fasteners",
        body: "Mechanical fasteners like screws and rivets concentrate stress at single points, leading to fatigue, galvanic corrosion, and aesthetic compromises. 3M™ VHB™ (Very High Bond) acrylic foam tapes spread dynamic and static loads continuously along the entire bonded surface. This creates an impenetrable seal against moisture, chemical exposure, and thermal expansion across dissimilar materials."
      },
      {
        heading: "Key Applications Across Indian Manufacturing",
        body: "1. Electronics & Appliance Enclosures: Invisible structural bonding for sleek bezels, display glass, and dust-tight sealings.\n2. Automotive & Commercial Transport: Panel bonding for bus bodies and trailers, reducing overall vehicle weight by up to 18%.\n3. Architectural Curtain Walls: Exterior glass-to-metal bonding engineered to withstand extreme wind loads and high monsoon humidity."
      },
      {
        heading: "Surface Preparation Standard Operating Procedure (SOP)",
        body: "Achieving maximum bond strength requires strict adherence to surface preparation: Clean surfaces with a 50:50 Isopropyl Alcohol (IPA) and water mixture. Apply pressure using a firm rubber roller (min 15 psi) to ensure 100% surface contact. Full cure strength reaches 50% after 20 minutes and 100% after 72 hours at 21°C."
      }
    ]
  },
  {
    id: "precision-abrasives-surface-finishing",
    title: "Precision Abrasives & Surface Finishing Solutions for Metal Fabrication",
    category: "ABRASIVES & FINISHING",
    excerpt: "Optimizing metal removal rates, grain selection, and surface roughness (Ra) with 3M™ Cubitron™ II abrasive discs and flap wheels.",
    author: "Rajesh Sharma",
    role: "Abrasives Specialist, N.B. Corp",
    date: "MAR 20, 2026",
    readTime: "6 MIN",
    views: "9.8K",
    image: blogAbrasives,
    summary: "Achieving uniform surface finishes while maximizing tool lifespan is a core priority for precision engineering shops. 3M Cubitron II abrasives utilize Precision-Shaped Grain (PSG) technology to slice through tough metals with less heat buildup and up to 2x longer service life.",
    sections: [
      {
        heading: "The Science of Precision-Shaped Grain (PSG)",
        body: "Unlike conventional crushed ceramic grains that gouge metal and generate excessive friction, 3M Precision-Shaped Grains continuously fracture into razor-sharp points. This self-sharpening mechanism allows operators to grind faster with significantly reduced downward pressure."
      },
      {
        heading: "Selecting the Right Grit & Disc Type for Your Application",
        body: "• Heavy Weld Removal: Cubitron II Fibre Disc 982C (36+ grit) for carbon steel.\n• Stainless Steel Deburring: Scotch-Brite™ Surface Conditioning Discs to eliminate micro-burrs without gouging base metal.\n• Fine Blending & Polishing: Flap Wheels and Unitized Discs engineered for uniform RMS finish values."
      },
      {
        heading: "Safety Protocols for High-Speed Grinding Operations",
        body: "Always inspect abrasive discs for hairline cracks prior to mounting. Ensure pneumatic or electric angle grinders operate strictly within the maximum RPM specified on the abrasive disc backing, and equip operators with 3M protective eyewear and respirators."
      }
    ]
  },
  {
    id: "structural-adhesives-electrical-insulation",
    title: "Structural Adhesives & High-Voltage Electrical Insulation Standards",
    category: "ADHESIVES & INSULATION",
    excerpt: "Ensuring dielectric strength, thermal dissipation, and flame retardancy in electrical enclosures and transformers with 3M Scotch® electrical products.",
    author: "Anita Desai",
    role: "Electrical Applications Engineer",
    date: "MAR 18, 2026",
    readTime: "10 MIN",
    views: "11.5K",
    image: blogAdhesives,
    summary: "High-voltage electrical installations demand uncompromised insulation integrity and thermal stability. 3M™ Scotch® Vinyl Electrical Tapes and Scotchcast™ Resins provide robust protection against moisture ingress, arcing, and severe temperature fluctuations.",
    sections: [
      {
        heading: "Dielectric Strength & Flame Retardancy in Industrial Panels",
        body: "Electrical insulation tapes must maintain breakdown voltage ratings exceeding 10,000 Volts per layer while resisting UV radiation and chemical splash. 3M Scotch Super 33+™ offers primary electrical insulation for cable splices up to 600V and continuous operation in temperatures ranging from -18°C to 105°C."
      },
      {
        heading: "Structural Epoxy Adhesives for High-Vibration Environments",
        body: "Where mechanical fasteners can loosen due to harmonic vibration in heavy machinery, 3M™ Scotch-Weld™ Structural Epoxies bond metals, glass, and engineering plastics with shear strength ratings surpassing 3,000 PSI."
      },
      {
        heading: "Best Practices for Cable Splicing and Terminal Sealing",
        body: "Apply self-fusing rubber tape with 50% elongation to form a moisture-tight pressure seal, followed by a protective jacket layer of premium vinyl tape wrapped with half-lap passes."
      }
    ]
  }
];
