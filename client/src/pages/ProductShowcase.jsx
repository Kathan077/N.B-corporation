import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, X, Eye, FileText, Download, CheckCircle2, 
  ArrowRight, ShieldCheck, Sparkles, PhoneCall, Info, Layers, Package, ShoppingBag, Plus, Minus
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Footer from '../components/layout/Footer/Footer';
import { MAIN_CATEGORIES, SUB_CATEGORIES, PRODUCTS, INDUSTRIES } from '../data/productsData';
import { getImageUrl } from '../utils/imageUtils';
import { useCart } from '../context/CartContext';
import './ProductShowcase.css';

// ── CATALOG PRODUCT CARD COMPONENT WITH PROFESSIONAL UI/UX ──
const CatalogProductCard = ({ product, idx, navigate, handleInquire }) => {
  const { addToCart, updateQuantity, getCartItem, loading } = useCart();
  const [imgError, setImgError] = useState(false);

  const cartItem = getCartItem(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: (idx % 8) * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-3xl bg-white border border-slate-200/90 hover:border-red-500/50 p-4 sm:p-5 flex flex-col justify-between shadow-xs hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-300 product-card-light overflow-hidden h-full w-full"
    >
      <div className="flex flex-col flex-1 justify-between">
        {/* Product HD Image Container */}
        <div 
          onClick={() => navigate(`/product/${product.id}`)}
          className="relative h-48 sm:h-56 mb-3 sm:mb-4 bg-slate-50 rounded-2xl p-3 sm:p-4 flex items-center justify-center overflow-hidden border border-slate-100 group-hover:border-red-200 transition-colors cursor-pointer shrink-0"
        >
          {/* Top Badges */}
          <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-red-600 text-white font-mono font-bold text-[10px] px-2.5 py-0.5 rounded-md shadow-xs z-10">
            3M {product.code}
          </div>

          {!product.image || imgError ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100/60 rounded-xl border border-slate-200/50 text-slate-400">
              <Package size={32} className="stroke-[1.5] text-slate-300 mb-1.5" />
              <span className="text-[11px] font-mono font-bold text-slate-400">3M {product.code}</span>
              <span className="text-[10px] text-slate-400 font-medium">Image Blank</span>
            </div>
          ) : (
            <img 
              src={getImageUrl(product.image)} 
              alt={product.name} 
              className="w-full h-full object-contain mx-auto my-auto block group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          )}

          {/* Quick Action Overlay */}
          <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center backdrop-blur-xs">
            <span className="px-4 py-2 rounded-xl bg-white text-slate-900 font-black text-xs flex items-center gap-2 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <Eye size={14} className="text-red-600" /> View Details & Specs
            </span>
          </div>
        </div>

        {/* Category Tag */}
        <div className="flex items-center justify-between mb-1.5 shrink-0 gap-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-600 flex items-center gap-1 truncate max-w-[70%]">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
            <span className="truncate">{product.category}</span>
          </span>
          {product.thickness && (
            <span className="text-[10px] font-mono font-bold text-slate-500 shrink-0">
              {product.thickness}
            </span>
          )}
        </div>

        {/* Verbatim Brochure Title Slot (Equalized grid height) */}
        <div className="min-h-[2.5rem] sm:min-h-[3rem] flex items-start mb-1">
          <h3 
            onClick={() => navigate(`/product/${product.id}`)}
            className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug cursor-pointer uppercase tracking-tight"
            title={product.name}
          >
            {product.name}
          </h3>
        </div>

        {/* Subtitle Slot */}
        <div className="min-h-[1.25rem] flex items-center mb-1.5 sm:mb-2">
          <p className="text-[11px] sm:text-xs text-red-600 font-bold truncate font-mono">{product.subtitle}</p>
        </div>

        {/* Description Slot */}
        <div className="min-h-[2.25rem] sm:min-h-[2.5rem] flex items-start mb-3 sm:mb-4">
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
            {product.description}
          </p>
        </div>
      </div>

      {/* Card Actions (Anchored at bottom) */}
      <div className="grid grid-cols-3 gap-1.5 pt-3 border-t border-slate-100 shrink-0 items-center">
        {cartItem ? (
          <div 
            onClick={(e) => e.stopPropagation()}
            className="col-span-1 inline-flex items-center justify-between bg-red-600 border border-red-500 rounded-xl p-0.5 shadow-md shadow-red-600/30 w-full"
          >
            <button
              type="button"
              disabled={loading}
              onClick={(e) => {
                e.stopPropagation();
                updateQuantity(cartItem._id, cartItem.quantity - 1);
              }}
              className="w-6 h-6 rounded-lg bg-red-700 hover:bg-red-800 text-white font-black flex items-center justify-center transition-colors cursor-pointer shrink-0"
              title="Decrease quantity"
            >
              <Minus size={11} />
            </button>

            <span className="font-mono font-black text-xs text-white text-center select-none truncate px-0.5">
              {cartItem.quantity}
            </span>

            <button
              type="button"
              disabled={loading}
              onClick={(e) => {
                e.stopPropagation();
                updateQuantity(cartItem._id, cartItem.quantity + 1);
              }}
              className="w-6 h-6 rounded-lg bg-red-700 hover:bg-red-800 text-white font-black flex items-center justify-center transition-colors cursor-pointer shrink-0"
              title="Increase quantity"
            >
              <Plus size={11} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1);
            }}
            className="col-span-1 py-2 px-1 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-[11px] flex items-center justify-center gap-1 transition-all duration-300 shadow-xs shadow-red-600/20 active:scale-95 cursor-pointer truncate"
          >
            <ShoppingBag size={13} className="shrink-0" />
            <span className="truncate">Cart</span>
          </button>
        )}

        <button
          onClick={() => navigate(`/product/${product.id}`)}
          className="col-span-1 py-2 px-1 rounded-xl bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-700 font-extrabold text-[11px] flex items-center justify-center gap-1 transition-all duration-300 cursor-pointer truncate"
        >
          <Eye size={12} className="shrink-0" />
          <span className="truncate">Details</span>
        </button>

        <button
          onClick={() => handleInquire(product)}
          className="col-span-1 py-2 px-1 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-extrabold text-[11px] flex items-center justify-center gap-1 transition-all duration-300 cursor-pointer truncate"
          title="Get Instant Quotation"
        >
          <span className="truncate">Inquire</span>
        </button>
      </div>
    </motion.div>
  );
};

const ModalProductGallery = ({ product }) => {
  const galleryList = useMemo(() => {
    if (!product) return [];
    const list = [];
    if (product.image) list.push(product.image);
    if (product.images && Array.isArray(product.images)) {
      product.images.forEach((img) => {
        if (img && !list.includes(img)) list.push(img);
      });
    }
    if (product.colors && Array.isArray(product.colors)) {
      product.colors.forEach((c) => {
        if (c.image && !list.includes(c.image)) list.push(c.image);
      });
    }
    return list;
  }, [product]);

  const [activeIdx, setActiveIdx] = useState(0);
  const [modalImgErr, setModalImgErr] = useState(false);

  const currentSrc = galleryList[activeIdx] || product.image;

  return (
    <div className="md:col-span-1 flex flex-col gap-2">
      <div className="h-56 rounded-2xl bg-slate-50 border border-slate-200 p-3 flex items-center justify-center overflow-hidden relative">
        {!currentSrc || modalImgErr ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100/60 rounded-xl text-slate-400">
            <Package size={32} className="stroke-[1.5] text-slate-300 mb-1" />
            <span className="text-[11px] font-mono font-bold text-slate-400">3M {product.code}</span>
            <span className="text-[10px] text-slate-400 font-medium">Image Blank</span>
          </div>
        ) : (
          <img 
            src={getImageUrl(currentSrc)} 
            alt={product.name} 
            className="w-full h-full object-contain"
            onError={() => setModalImgErr(true)}
          />
        )}
      </div>

      {galleryList.length > 1 && (
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {galleryList.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveIdx(idx);
                setModalImgErr(false);
              }}
              className={`w-11 h-11 rounded-lg border p-0.5 bg-white shrink-0 cursor-pointer transition-all ${
                idx === activeIdx ? 'border-red-600 ring-2 ring-red-600 scale-105 shadow-sm' : 'border-slate-200 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={getImageUrl(img)} alt="" className="w-full h-full object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ProductShowcase = () => {
  const navigate = useNavigate();
  const { cartCount, cartTotal } = useCart();
  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get('search') || '';

  const [activeMainCategory, setActiveMainCategory] = useState('all');
  const [activeSubCategory, setActiveSubCategory] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [selectedProduct, setSelectedProduct] = useState(null);

  React.useEffect(() => {
    if (urlSearch) {
      setSearchQuery(urlSearch);
    }
  }, [urlSearch]);

  // Available Subcategories based on selected Main Category Folder
  const availableSubCategories = useMemo(() => {
    if (activeMainCategory === 'all') {
      return SUB_CATEGORIES;
    }
    return SUB_CATEGORIES.filter((sub) => sub.mainCategoryId === activeMainCategory);
  }, [activeMainCategory]);

  const handleMainCategoryChange = (mainId) => {
    setActiveMainCategory(mainId);
    setActiveSubCategory('all');
  };

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Main Category Folder Filter
      const matchMain = activeMainCategory === 'all' || p.mainCategoryId === activeMainCategory;

      // Subcategory Filter
      const matchSub = activeSubCategory === 'all' || p.subCategoryId === activeSubCategory || p.categoryId === activeSubCategory;

      // Industry Filter
      const matchIndustry =
        selectedIndustry === 'All Industries' ||
        (p.industries && p.industries.includes(selectedIndustry));

      // Search Query
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.subtitle && p.subtitle.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.backing && p.backing.toLowerCase().includes(q)) ||
        (p.applications && p.applications.some((app) => app.toLowerCase().includes(q)));

      return matchMain && matchSub && matchIndustry && matchSearch;
    });
  }, [activeMainCategory, activeSubCategory, selectedIndustry, searchQuery]);

  const activeMainObj = MAIN_CATEGORIES.find((m) => m.id === activeMainCategory) || MAIN_CATEGORIES[0];
  const activeSubObj = SUB_CATEGORIES.find((s) => s.id === activeSubCategory);

  const handleInquire = (product) => {
    navigate(`/contact?subject=Inquiry for ${encodeURIComponent(product.name)} (${product.code})`);
  };

  return (
    <div className="product-showcase-page bg-slate-50 text-slate-900 min-h-screen w-full max-w-full overflow-x-hidden">
      {/* ── HERO SECTION ── */}
      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-16 bg-gradient-to-b from-red-50/60 via-slate-50 to-white border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 opacity-40 pointer-events-none select-none overflow-hidden">
          <div className="hud-grid-pattern-light" />
        </div>

        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-40 bg-red-400/10 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 sm:gap-8 mb-8 sm:mb-10">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-red-50 border border-red-200 mb-4 sm:mb-5 shadow-xs"
              >
                <ShieldCheck size={16} className="text-red-600 shrink-0" />
                <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider sm:tracking-widest text-red-700">
                  Authorized 3M Distributor Catalog
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-900 leading-tight mb-3 sm:mb-4 break-words"
              >
                Product <span className="text-red-600 italic">Catalog</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-slate-600 text-xs sm:text-sm md:text-base font-normal leading-relaxed"
              >
                Explore NB Corporation’s official 3M Authorised Distributor product catalog featuring {PRODUCTS.length} high-performance engineered adhesives, tapes, films, sealants, and safety solutions across {MAIN_CATEGORIES.length - 1} main category folders and {SUB_CATEGORIES.length} sub-categories.
              </motion.p>
            </div>

            {/* Quick Stats & PDF Download */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 sm:flex sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-4 w-full lg:w-auto"
            >
              <div className="px-3 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-white border border-slate-200 shadow-xs text-center flex-1 sm:flex-initial">
                <span className="block text-lg sm:text-2xl font-black text-slate-900">{PRODUCTS.length}</span>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-500">Products</span>
              </div>
              <div className="px-3 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-white border border-slate-200 shadow-xs text-center flex-1 sm:flex-initial">
                <span className="block text-lg sm:text-2xl font-black text-red-600">{MAIN_CATEGORIES.length - 1}</span>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-500">Category Folders</span>
              </div>
              <a
                href="/NB Corporation Brochure_260720_152747.pdf"
                target="_blank"
                rel="noreferrer"
                className="col-span-2 sm:col-span-1 inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-red-600/20 group w-full sm:w-auto text-center"
              >
                <FileText size={16} className="shrink-0" />
                <span>Download Brochure</span>
                <Download size={14} className="group-hover:translate-y-0.5 transition-transform shrink-0" />
              </a>
            </motion.div>
          </div>

          {/* ── SEARCH & INDUSTRY FILTERS BAR ── */}
          <div className="p-3 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-lg shadow-slate-200/50 w-full overflow-hidden">
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2.5 sm:gap-4">
              {/* Search Bar */}
              <div className="relative flex-1 min-w-0">
                <Search size={17} className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by code (e.g. 5952, 467MP), name, specs..."
                  className="w-full pl-9 sm:pl-11 pr-9 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-red-600 focus:bg-white transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              {/* Industry Filter Dropdown */}
              <div className="relative w-full md:w-auto md:min-w-[200px] shrink-0">
                <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700">
                  <Filter size={15} className="text-red-600 shrink-0" />
                  <select
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="bg-transparent text-slate-900 font-medium focus:outline-none w-full cursor-pointer text-xs sm:text-sm truncate"
                  >
                    {INDUSTRIES.map((ind) => (
                      <option key={ind} value={ind} className="bg-white text-slate-900">
                        {ind}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* ── TIER 1: MAIN CATEGORY FOLDER TABS ── */}
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-1.5 px-0.5 sm:hidden">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <Layers size={11} className="text-red-600" /> Categories
                </span>
                <span className="text-[9px] font-mono text-slate-400">Swipe ➔</span>
              </div>
              <div className="overflow-x-auto no-scrollbar scroll-smooth -mx-3 px-3 sm:-mx-5 sm:px-5 py-0.5">
                <div className="flex items-center gap-2 min-w-max">
                  {MAIN_CATEGORIES.map((main) => {
                    const isActive = activeMainCategory === main.id;
                    return (
                      <button
                        key={main.id}
                        onClick={() => handleMainCategoryChange(main.id)}
                        className={`whitespace-nowrap flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                          isActive
                            ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20 border border-slate-900'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80'
                        }`}
                      >
                        <Layers size={13} className={isActive ? 'text-red-400 shrink-0' : 'text-slate-400 shrink-0'} />
                        <span>{main.name}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                            isActive ? 'bg-red-600 text-white font-extrabold' : 'bg-slate-200/80 text-slate-600'
                          }`}
                        >
                          {main.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── TIER 2: SUB-CATEGORY PILL FILTERS ── */}
            <div className="mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t border-slate-100/80">
              <div className="flex items-center justify-between mb-1.5 px-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <Filter size={11} className="text-red-600" /> Subcategories
                </span>
                <span className="text-[9px] font-mono text-slate-400">
                  {availableSubCategories.length + 1} Available
                </span>
              </div>
              <div className="overflow-x-auto no-scrollbar scroll-smooth -mx-3 px-3 sm:-mx-5 sm:px-5 py-0.5">
                <div className="flex items-center gap-1.5 min-w-max">
                  <button
                    onClick={() => setActiveSubCategory('all')}
                    className={`whitespace-nowrap px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                      activeSubCategory === 'all'
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    All Subcategories
                  </button>
                  {availableSubCategories.map((sub) => {
                    const isActive = activeSubCategory === sub.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => setActiveSubCategory(sub.id)}
                        className={`whitespace-nowrap flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                          isActive
                            ? 'bg-red-600 text-white shadow-xs'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        <span>{sub.name}</span>
                        <span className={`text-[10px] opacity-80 ${isActive ? 'text-white' : 'text-slate-400'}`}>
                          ({sub.count})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATALOG RESULTS SECTION ── */}
      <section className="py-8 sm:py-14 container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 pb-4 border-b border-slate-200">
          <div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <h2 className="text-lg sm:text-xl font-extrabold uppercase tracking-tight text-slate-900">
                {activeMainObj.name}
              </h2>
              {activeSubObj && (
                <span className="text-xs sm:text-sm font-bold text-red-600 flex items-center gap-1">
                  <ArrowRight size={14} /> {activeSubObj.name}
                </span>
              )}
              <span className="text-[10px] sm:text-xs px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-red-50 text-red-600 font-bold border border-red-200">
                {filteredProducts.length} Products
              </span>
            </div>
            {selectedIndustry !== 'All Industries' && (
              <p className="text-xs text-slate-500 mt-1 font-medium">Industry Filter: {selectedIndustry}</p>
            )}
          </div>

          {(activeMainCategory !== 'all' || activeSubCategory !== 'all' || selectedIndustry !== 'All Industries' || searchQuery) && (
            <button
              onClick={() => {
                setActiveMainCategory('all');
                setActiveSubCategory('all');
                setSelectedIndustry('All Industries');
                setSearchQuery('');
              }}
              className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <X size={14} /> Clear All Filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 items-stretch">
            {filteredProducts.map((product, idx) => (
              <CatalogProductCard
                key={product.id}
                product={product}
                idx={idx}
                navigate={navigate}
                handleInquire={handleInquire}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 sm:py-20 text-center rounded-3xl bg-white border border-slate-200 shadow-sm px-4">
            <Info size={44} className="mx-auto text-slate-400 mb-3" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">No Matching Products Found</h3>
            <p className="text-slate-500 text-xs mb-5 max-w-md mx-auto">
              We couldn't find any products matching your active filters. Try adjusting your category or search query.
            </p>
            <button
              onClick={() => {
                setActiveMainCategory('all');
                setActiveSubCategory('all');
                setSelectedIndustry('All Industries');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-red-700 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* ── TECHNICAL SPECIFICATION MODAL ── */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[3000] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl rounded-3xl bg-white border border-slate-200 p-4 sm:p-8 shadow-2xl text-slate-900 z-10 my-4 sm:my-8 max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Modal Header */}
              <div className="mb-5 sm:mb-6 pr-8 sm:pr-10">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                  <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-md bg-red-50 text-red-700 font-mono font-bold text-xs border border-red-200">
                    Product Code: 3M {selectedProduct.code}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">{selectedProduct.category}</span>
                </div>

                <h2 className="text-xl sm:text-3xl font-black text-slate-900 leading-tight">
                  {selectedProduct.name}
                </h2>
                <p className="text-xs sm:text-sm text-red-600 font-semibold mt-1">{selectedProduct.subtitle}</p>
              </div>

              {/* Product Image & Description Flex Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-5 sm:mb-6">
                <ModalProductGallery product={selectedProduct} />
                <div className="md:col-span-2 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed flex flex-col justify-center">
                  <p>{selectedProduct.description}</p>
                </div>
              </div>

              {/* Full Specs Table */}
              <div className="mb-5 sm:mb-6">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-2">
                  <Layers size={14} className="text-red-600" />
                  <span>Technical Datasheet Specifications</span>
                </h4>

                <div className="rounded-2xl border border-slate-200 overflow-x-auto text-xs bg-white">
                  <table className="w-full text-left border-collapse min-w-[320px]">
                    <tbody>
                      {selectedProduct.backing && (
                        <tr className="border-b border-slate-100 bg-slate-50/60">
                          <td className="py-3 px-4 font-bold text-slate-500 w-1/3">Backing / Carrier</td>
                          <td className="py-3 px-4 text-slate-800">{selectedProduct.backing}</td>
                        </tr>
                      )}
                      {selectedProduct.adhesive && (
                        <tr className="border-b border-slate-100">
                          <td className="py-3 px-4 font-bold text-slate-500">Adhesive Type</td>
                          <td className="py-3 px-4 text-slate-800">{selectedProduct.adhesive}</td>
                        </tr>
                      )}
                      {selectedProduct.thickness && (
                        <tr className="border-b border-slate-100 bg-slate-50/60">
                          <td className="py-3 px-4 font-bold text-slate-500">Total Thickness</td>
                          <td className="py-3 px-4 text-slate-900 font-mono font-bold">
                            {selectedProduct.thickness}
                          </td>
                        </tr>
                      )}
                      {selectedProduct.dimensions && (
                        <tr className="border-b border-slate-100">
                          <td className="py-3 px-4 font-bold text-slate-500">Standard Roll Dimensions</td>
                          <td className="py-3 px-4 text-slate-800">{selectedProduct.dimensions}</td>
                        </tr>
                      )}
                      {selectedProduct.tempRange && (
                        <tr className="border-b border-slate-100 bg-slate-50/60">
                          <td className="py-3 px-4 font-bold text-slate-500">Temperature Resistance</td>
                          <td className="py-3 px-4 text-slate-800">{selectedProduct.tempRange}</td>
                        </tr>
                      )}
                      {selectedProduct.certifications && (
                        <tr className="border-b border-slate-100">
                          <td className="py-3 px-4 font-bold text-slate-500">Certifications & Standards</td>
                          <td className="py-3 px-4 text-emerald-700 font-semibold">
                            {selectedProduct.certifications}
                          </td>
                        </tr>
                      )}
                      {selectedProduct.reflectiveTech && (
                        <tr className="border-b border-slate-100 bg-slate-50/60">
                          <td className="py-3 px-4 font-bold text-slate-500">Reflective Optics</td>
                          <td className="py-3 px-4 text-slate-800">{selectedProduct.reflectiveTech}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Target Applications List */}
              {selectedProduct.applications && selectedProduct.applications.length > 0 && (
                <div className="mb-5 sm:mb-6">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2.5 flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-red-600" />
                    <span>Recommended Industrial Applications</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {selectedProduct.applications.map((app, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-red-50 text-red-700 text-xs font-semibold border border-red-200/70"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Footer CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pt-4 sm:pt-5 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <ShieldCheck size={16} className="text-red-600 shrink-0" />
                  <span>NB Corporation • 3M Authorised Distributor</span>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="flex-1 sm:flex-none py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-colors"
                  >
                    Close Sheet
                  </button>
                  <button
                    onClick={() => {
                      const prod = selectedProduct;
                      setSelectedProduct(null);
                      handleInquire(prod);
                    }}
                    className="flex-1 sm:flex-none py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md shadow-red-600/20"
                  >
                    <PhoneCall size={14} />
                    <span>Request Quotation</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── FLOATING VIEW CART ACTION (Right Edge) ── */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 80, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="fixed right-4 sm:right-6 bottom-6 sm:bottom-8 z-40"
          >
            <button
              onClick={() => navigate('/cart')}
              className="group flex items-center gap-3.5 bg-slate-900/95 hover:bg-red-600 text-white pl-3.5 sm:pl-4 pr-4 sm:pr-5 py-3 sm:py-3.5 rounded-full shadow-2xl shadow-slate-950/40 border border-slate-700/60 hover:border-red-500 backdrop-blur-xl transition-all duration-300 active:scale-95 cursor-pointer hover:shadow-red-600/30"
              title="View your shopping cart"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-red-600 group-hover:bg-white text-white group-hover:text-red-600 flex items-center justify-center transition-colors duration-300 shadow-md">
                  <ShoppingBag size={18} />
                </div>
                <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-950 text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-xs border-2 border-slate-900 group-hover:border-red-600 transition-colors">
                  {cartCount}
                </span>
              </div>

              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-black uppercase tracking-wider">View Cart</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
                <span className="text-[11px] text-slate-400 group-hover:text-red-100 font-medium">
                  {cartCount} {cartCount === 1 ? 'item' : 'items'} added
                </span>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default ProductShowcase;
