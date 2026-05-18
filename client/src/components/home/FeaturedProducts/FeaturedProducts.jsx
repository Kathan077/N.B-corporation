import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye, ArrowRight, Cpu } from 'lucide-react';
import './FeaturedProducts.css';

// Importing real product assets
import prod1 from '../../../assets/pexels-pixabay-236705.jpg';
import prod2 from '../../../assets/4cb376_8ccea9f15bb44df0b12a694e55d9415a~mv2.avif';
import prod3 from '../../../assets/4cb376_28109531ce3642eea5d240c8943d2493~mv2.avif';
import prod4 from '../../../assets/4cb376_22d0c95fa54146c9be394409c2b76c07~mv2.avif';

const ProductCard = ({ product, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="product-card group"
    >
      <div className="product-image-container">
        <div className="product-badge">ELITE_MODEL_V2</div>
        <img src={product.image} alt={product.name} className="product-image" />
        
        {/* Quick Action Overlay */}
        <div className="product-action-overlay">
          <div className="flex gap-4">
            <button className="action-btn quick-view" title="Quick View">
              <Eye size={18} />
            </button>
            <button className="action-btn add-cart" title="Add to Cart">
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="product-info">
        <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-px bg-slate-200" />
            <div className="product-category">{product.category}</div>
        </div>
        <h3 className="product-name">{product.name}</h3>
        
        <div className="product-footer">
          <div className="price-container">
            <span className="original-price">₹{product.originalPrice}</span>
            <span className="sale-price">₹{product.salePrice}</span>
          </div>
          <button className="add-to-cart-link group/btn">
            <span className="relative z-10 text-[10px] font-black uppercase tracking-widest">Add to Cart</span>
            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center group-hover/btn:bg-brand-red group-hover/btn:text-white transition-colors">
                <ArrowRight size={10} />
            </div>
          </button>
        </div>
      </div>

      {/* Industrial Side Bar */}
      <div className="absolute top-1/2 -right-1 translate-y-[-50%] w-1 h-32 bg-slate-100 rounded-full overflow-hidden">
        <div className="w-full h-1/2 bg-brand-red group-hover:h-full transition-all duration-700" />
      </div>
    </motion.div>
  );
};

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "3M™ Safety-Walk™ Grip Tapes",
      category: "Anti-Slip Solutions",
      image: "https://multimedia.3m.com/mws/media/1861989J/anti-slip-grip-tapes.jpg",
      originalPrice: "4,500.00",
      salePrice: "3,850.00",
    },
    {
      id: 2,
      name: "3M™ Barricade Warning Tapes",
      category: "Safety & Security",
      image: "https://multimedia.3m.com/mws/media/1861957J/barricade-warning-tapes.jpg",
      originalPrice: "1,200.00",
      salePrice: "980.00",
    },
    {
      id: 3,
      name: "3M™ Bonding & Transfer Tapes",
      category: "Industrial Attachment",
      image: "https://multimedia.3m.com/mws/media/1862009J/bonding-mounting-transfer-tapes.jpg",
      originalPrice: "15,600.00",
      salePrice: "14,200.00",
    },
    {
      id: 4,
      name: "3M™ Vinyl Electrical Tapes",
      category: "Electrical Solutions",
      image: "https://multimedia.3m.com/mws/media/1861936J/electrical-tapes.jpg",
      originalPrice: "850.00",
      salePrice: "720.00",
    },
    {
      id: 5,
      name: "3M™ Plate Mounting Tapes",
      category: "Flexographic Systems",
      image: "https://multimedia.3m.com/mws/media/1861990J/flexographic-plate-mounting-tapes.jpg",
      originalPrice: "22,400.00",
      salePrice: "19,800.00",
    },
    {
      id: 6,
      name: "3M™ Double Coated Foam Tapes",
      category: "Mounting & Sealing",
      image: "https://multimedia.3m.com/mws/media/1861968J/foam-tapes.jpg",
      originalPrice: "9,200.00",
      salePrice: "8,150.00",
    },
    {
      id: 7,
      name: "3M™ Aluminum Foil Tapes",
      category: "Metal Foil Solutions",
      image: "https://multimedia.3m.com/mws/media/1861955J/foil-tapes.jpg",
      originalPrice: "6,800.00",
      salePrice: "5,920.00",
    },
    {
      id: 8,
      name: "3M™ Masking & Paper Tapes",
      category: "Surface Protection",
      image: "https://multimedia.3m.com/mws/media/1861967J/masking-paper-tapes.jpg",
      originalPrice: "3,400.00",
      salePrice: "2,850.00",
    }
  ];

  return (
    <section className="featured-products-section py-32 bg-white relative overflow-hidden" id="products">
        {/* Background Instrumentation */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] select-none">
            <div className="hud-grid-v" />
            <div className="hud-crosshair" />
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
                   <span className="text-[12px] font-black uppercase tracking-[0.5em] text-brand-red">Proprietary Assets</span>
                 </motion.div>
                 
                 <motion.h2 
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-950 uppercase leading-[0.85] tracking-tighter"
                 >
                  
Featured <br /> 
                   <span className="text-brand-red italic">Products</span>
                 </motion.h2>
               </div>
               
               <motion.div
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 className="hidden lg:block text-[10px] font-mono text-slate-300 tracking-widest leading-loose text-right"
               >
               
               </motion.div>
             </div>
     
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 featured-products-grid">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-20 left-20 pointer-events-none opacity-[0.01]">
        <Cpu size={500} strokeWidth={0.2} />
      </div>
    </section>
  );
};

export default FeaturedProducts;
