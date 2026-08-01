import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, ArrowRight, ShieldCheck, Cpu, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../../../data/productsData';
import { getImageUrl } from '../../../utils/imageUtils';
import './FeaturedProducts.css';

const ProductCard = ({ product, index, onInquire, onExplore }) => {
  const navigate = useNavigate();
  const [imgErr, setImgErr] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="product-card group relative bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-red-500/40 transition-all duration-300 h-full"
    >
      <div className="flex flex-col flex-1 justify-between">
        {/* Fixed Image Container */}
        <div 
          onClick={() => navigate(`/product/${product.id}`)}
          className="product-image-container relative h-52 mb-4 bg-slate-50 rounded-xl p-4 flex items-center justify-center overflow-hidden border border-slate-100 group-hover:border-red-200 transition-colors cursor-pointer shrink-0"
        >
          <div className="product-badge absolute top-2 left-2 bg-red-600 text-white font-mono font-bold text-[10px] px-2.5 py-0.5 rounded shadow-sm z-10">
            3M {product.code}
          </div>

          {!product.image || imgErr ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100/60 rounded-lg text-slate-400">
              <Package size={28} className="stroke-[1.5] text-slate-300 mb-1" />
              <span className="text-[10px] font-mono font-bold text-slate-400">3M {product.code}</span>
              <span className="text-[9px] text-slate-400 font-medium">Image Blank</span>
            </div>
          ) : (
            <img
              src={getImageUrl(product.image)}
              alt={product.name}
              className="w-full h-full object-contain mx-auto my-auto block group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              onError={() => setImgErr(true)}
            />
          )}
          
          {/* Quick Action Overlay */}
          <div className="product-action-overlay absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <span className="px-4 py-2 rounded-xl bg-white text-slate-900 font-extrabold text-xs flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 hover:scale-105 transition-all duration-300">
              <Eye size={14} className="text-red-600" /> View Details & Variants
            </span>
          </div>
        </div>

        <div className="product-info flex flex-col flex-1 justify-between">
          <div className="flex items-center gap-2 mb-1.5 shrink-0 h-4">
            <span className="w-5 h-px bg-red-600" />
            <div className="text-[10px] font-bold text-red-600 uppercase tracking-wider truncate max-w-[170px]">
              {product.category}
            </div>
          </div>

          {/* Verbatim Brochure Title Slot (Equalized grid height) */}
          <div className="min-h-[3.25rem] flex items-start mb-1">
            <h3 
              onClick={() => navigate(`/product/${product.id}`)}
              className="text-xs sm:text-sm font-extrabold text-slate-900 line-clamp-2 leading-snug cursor-pointer group-hover:text-red-600 transition-colors"
              title={product.name}
            >
              {product.name}
            </h3>
          </div>

          {/* Subtitle Slot */}
          <div className="min-h-[1.25rem] flex items-center mb-2">
            <p className="text-xs text-red-600 font-semibold truncate font-mono">{product.subtitle}</p>
          </div>

          {/* Description Slot */}
          <div className="min-h-[2.5rem] flex items-start mb-4">
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-normal">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      <div className="product-footer pt-3 border-t border-slate-100 flex items-center justify-between shrink-0">
        <button 
          onClick={() => navigate(`/product/${product.id}`)}
          className="text-xs font-extrabold text-slate-700 hover:text-red-600 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>Full Specs</span>
        </button>

        <button 
          onClick={() => onInquire(product)}
          className="add-to-cart-link group/btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-600 text-red-700 hover:text-white font-bold text-[11px] transition-colors cursor-pointer"
        >
          <span>Inquire</span>
          <ArrowRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 8);

  const handleInquire = (product) => {
    navigate(`/contact?subject=Inquiry for ${encodeURIComponent(product.name)} (${product.code})`);
  };

  const handleExplore = () => {
    navigate('/products');
  };

  return (
    <section className="featured-products-section py-28 bg-slate-50 relative overflow-hidden" id="products">
      {/* Background Instrumentation */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none">
        <div className="hud-grid-v" />
        <div className="hud-crosshair" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 mb-4"
            >
              <ShieldCheck size={14} className="text-red-600" />
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-red-700">
                Official 3M Authorised Lineup
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-slate-900 uppercase leading-tight tracking-tight"
            >
              Featured <span className="text-red-600 italic">3M Solutions</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center gap-3"
          >
            <button
              onClick={handleExplore}
              className="px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-red-600/20 flex items-center gap-2 cursor-pointer"
            >
              <span>View Full Catalog ({PRODUCTS.length})</span>
              <ArrowRight size={14} />
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index} 
              onInquire={handleInquire}
              onExplore={handleExplore}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 left-10 pointer-events-none opacity-[0.02]">
        <Cpu size={400} strokeWidth={0.2} />
      </div>
    </section>
  );
};

export default FeaturedProducts;
