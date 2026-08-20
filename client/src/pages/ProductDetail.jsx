import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronRight, ShieldCheck, FileText, Download, PhoneCall, ArrowRight,
  Layers, CheckCircle2, AlertCircle, Info, Sparkles, HelpCircle, Eye, ArrowLeft,
  Check, Package, ChevronLeft, Images, X, ShoppingBag, Plus, Minus
} from 'lucide-react';
import Footer from '../components/layout/Footer/Footer';
import { PRODUCTS, CATEGORIES } from '../data/productsData';
import { getImageUrl } from '../utils/imageUtils';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const RelatedCard = ({ rel, navigate }) => {
  const [imgErr, setImgErr] = useState(false);
  return (
    <div
      onClick={() => navigate(`/product/${rel.id}`)}
      className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-red-500/40 transition-all duration-300 shadow-sm hover:shadow-xl cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="w-full h-44 mb-3 rounded-xl bg-slate-50 p-3 flex items-center justify-center border border-slate-100 overflow-hidden relative">
          {!rel.image || imgErr ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100/80 rounded-lg text-slate-400 border border-slate-200/50">
              <Package size={28} className="stroke-[1.5] text-slate-300 mb-1" />
              <span className="text-[10px] font-mono font-bold text-slate-400">3M {rel.code}</span>
              <span className="text-[9px] text-slate-400 font-medium">Image Blank</span>
            </div>
          ) : (
            <img
              src={getImageUrl(rel.image)}
              alt={rel.name}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              onError={() => setImgErr(true)}
            />
          )}
        </div>
        <span className="text-[10px] font-mono font-bold text-red-600 block mb-1">3M {rel.code}</span>
        <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug mb-1">
          {rel.name}
        </h4>
        <p className="text-[11px] text-slate-500 line-clamp-2 font-normal mb-3">{rel.subtitle}</p>
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-red-600">
        <span>View Details</span>
        <ArrowRight size={12} />
      </div>
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find product by id or code
  const product = useMemo(() => {
    if (!id) return PRODUCTS[0];
    const found = PRODUCTS.find(
      (p) => p.id === id || p.code.toLowerCase() === id.toLowerCase() || p.id.toLowerCase() === id.toLowerCase()
    );
    return found || PRODUCTS[0];
  }, [id]);

  // State for selected variants
  const [selectedColor, setSelectedColor] = useState(() => {
    return product?.colors && product.colors.length > 0 ? product.colors[0] : null;
  });

  const [selectedWidth, setSelectedWidth] = useState(() => {
    return product?.widths && product.widths.length > 0 ? product.widths[0] : null;
  });

  const [selectedLength, setSelectedLength] = useState(() => {
    return product?.lengths && product.lengths.length > 0 ? product.lengths[0] : null;
  });

  const [selectedVolume, setSelectedVolume] = useState(() => {
    return product?.volumes && product.volumes.length > 0 ? product.volumes[0] : null;
  });

  const { addToCart, updateQuantity, getCartItem, loading: cartLoading } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageError, setImageError] = useState(false);

  const cartOptions = useMemo(() => ({
    color: selectedColor ? selectedColor.name : '',
    width: selectedWidth || '',
    length: selectedLength || '',
    volume: selectedVolume || ''
  }), [selectedColor, selectedWidth, selectedLength, selectedVolume]);

  const cartItem = getCartItem(product?.id, cartOptions);

  // Collect all valid images for Gallery View
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

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Sync active image if selectedColor changes
  useEffect(() => {
    if (selectedColor?.image) {
      const idx = galleryList.indexOf(selectedColor.image);
      if (idx !== -1) {
        setActiveImageIndex(idx);
      }
    }
  }, [selectedColor, galleryList]);

  // Reset state if product changes
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors && product.colors.length > 0 ? product.colors[0] : null);
      setSelectedWidth(product.widths && product.widths.length > 0 ? product.widths[0] : null);
      setSelectedLength(product.lengths && product.lengths.length > 0 ? product.lengths[0] : null);
      setSelectedVolume(product.volumes && product.volumes.length > 0 ? product.volumes[0] : null);
      setActiveImageIndex(0);
      setImageError(false);
      window.scrollTo(0, 0);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen pt-36 pb-20 bg-slate-50 text-slate-900 flex flex-col items-center justify-center">
        <AlertCircle size={48} className="text-red-600 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
        <p className="text-slate-500 mb-6">The requested product could not be located in our 3M catalog.</p>
        <Link to="/product" className="px-6 py-3 rounded-xl bg-red-600 text-white font-bold text-xs uppercase tracking-wider">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const currentImageSrc = galleryList[activeImageIndex] || selectedColor?.image || product.image;

  const handleNextImage = (e) => {
    e.stopPropagation();
    if (galleryList.length > 1) {
      setActiveImageIndex((prev) => (prev + 1) % galleryList.length);
      setImageError(false);
    }
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    if (galleryList.length > 1) {
      setActiveImageIndex((prev) => (prev - 1 + galleryList.length) % galleryList.length);
      setImageError(false);
    }
  };

  // Related Products
  const relatedProducts = PRODUCTS.filter(
    (p) => p.categoryId === product.categoryId && p.id !== product.id
  ).slice(0, 4);

  // Inquire Action with Pre-filled URL parameters
  const handleInquire = () => {
    const colorText = selectedColor ? ` | Color: ${selectedColor.name}` : '';
    const widthText = selectedWidth ? ` | Size/Width: ${selectedWidth}` : '';
    const lengthText = selectedLength ? ` | Length: ${selectedLength}` : '';
    const volumeText = selectedVolume ? ` | Volume: ${selectedVolume}` : '';

    const variantDetails = `${colorText}${widthText}${lengthText}${volumeText}`;
    const subject = encodeURIComponent(`Quotation Request for ${product.name} (${product.code})${variantDetails}`);
    
    navigate(`/contact?subject=${subject}`);
  };

  const handleAddToCart = async () => {
    const options = {
      color: selectedColor ? selectedColor.name : '',
      width: selectedWidth || '',
      length: selectedLength || '',
      volume: selectedVolume || ''
    };
    await addToCart(product, quantity, options);
  };

  return (
    <div className="product-detail-page bg-slate-50 text-slate-900 min-h-screen">
      {/* ── BREADCRUMBS BAR ── */}
      <section className="pt-28 pb-4 bg-white border-b border-slate-200">
        <div className="container mx-auto px-6">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 overflow-x-auto no-scrollbar py-1">
            <Link to="/" className="hover:text-red-600 transition-colors flex items-center gap-1">
              Home
            </Link>
            <ChevronRight size={14} className="text-slate-400 shrink-0" />
            <Link to="/product" className="hover:text-red-600 transition-colors">
              Product Catalog
            </Link>
            <ChevronRight size={14} className="text-slate-400 shrink-0" />
            <span className="text-slate-700 font-bold truncate max-w-[160px] sm:max-w-xs">{product.category}</span>
            <ChevronRight size={14} className="text-slate-400 shrink-0" />
            <span className="text-red-600 font-extrabold truncate">{product.code}</span>
          </nav>
        </div>
      </section>

      {/* ── MAIN PRODUCT HERO SECTION ── */}
      <section className="py-10 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* ── LEFT COLUMN: HD GALLERY & QUICK SPEC PILLS (5 Cols) ── */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-6">
              {/* Main Image Container */}
              <div className="relative rounded-3xl bg-white border border-slate-200 p-6 shadow-sm overflow-hidden group">
                {/* Header Badges */}
                <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 font-mono font-black text-xs shadow-xs">
                    3M {product.code}
                  </span>
                  
                  {galleryList.length > 1 && (
                    <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white font-mono font-extrabold text-[11px] shadow-sm flex items-center gap-1.5">
                      <Images size={12} className="text-red-400" />
                      <span>{activeImageIndex + 1} of {galleryList.length} Photos</span>
                    </span>
                  )}
                </div>

                <div 
                  onClick={() => currentImageSrc && !imageError && setIsZoomed(true)}
                  className="w-full h-80 sm:h-96 flex items-center justify-center cursor-pointer relative"
                >
                  {!currentImageSrc || imageError ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100/70 rounded-2xl border border-slate-200/60 p-6 text-center">
                      <div className="w-16 h-16 rounded-2xl bg-white shadow-xs border border-slate-200 flex items-center justify-center mb-3">
                        <Package size={32} className="text-slate-400 stroke-[1.5]" />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-600 uppercase tracking-wider">3M {product.code}</span>
                      <span className="text-[11px] text-slate-400 font-semibold mt-1">Image Blank</span>
                    </div>
                  ) : (
                    <>
                      <img
                        src={getImageUrl(currentImageSrc)}
                        alt={`${product.name} - Photo ${activeImageIndex + 1}`}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        onError={() => setImageError(true)}
                      />

                      {/* Next / Prev Gallery Navigation Arrows */}
                      {galleryList.length > 1 && (
                        <>
                          <button
                            onClick={handlePrevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/95 shadow-md border border-slate-200 text-slate-800 hover:bg-red-600 hover:text-white flex items-center justify-center transition-all z-20 cursor-pointer hover:scale-110"
                            title="Previous Photo"
                          >
                            <ChevronLeft size={20} />
                          </button>
                          <button
                            onClick={handleNextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/95 shadow-md border border-slate-200 text-slate-800 hover:bg-red-600 hover:text-white flex items-center justify-center transition-all z-20 cursor-pointer hover:scale-110"
                            title="Next Photo"
                          >
                            <ChevronRight size={20} />
                          </button>
                        </>
                      )}

                      <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-slate-900/75 text-white text-[11px] font-bold backdrop-blur-md flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                        <Eye size={13} /> Click to Expand
                      </div>
                    </>
                  )}
                </div>

                {/* ── THUMBNAIL GALLERY STRIP ── */}
                {galleryList.length > 1 && (
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2.5 flex items-center gap-1.5">
                      <Images size={12} className="text-red-600" />
                      <span>Product Photo Gallery ({galleryList.length})</span>
                    </span>

                    <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
                      {galleryList.map((img, idx) => {
                        const isActive = idx === activeImageIndex;
                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              setActiveImageIndex(idx);
                              setImageError(false);
                            }}
                            className={`relative w-16 h-16 rounded-2xl border p-1 shrink-0 bg-slate-50 transition-all cursor-pointer overflow-hidden ${
                              isActive
                                ? 'border-red-600 ring-2 ring-red-600 ring-offset-1 scale-105 shadow-md'
                                : 'border-slate-200 opacity-60 hover:opacity-100 hover:border-slate-400'
                            }`}
                          >
                            <img
                              src={getImageUrl(img)}
                              alt={`Thumbnail ${idx + 1}`}
                              className="w-full h-full object-contain"
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Spec Highlights */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <ShieldCheck size={15} className="text-red-600" />
                  <span>Verified 3M Parameters</span>
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  {product.thickness && (
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="block text-[10px] text-slate-400 font-bold uppercase">Thickness</span>
                      <span className="font-extrabold text-slate-900 font-mono">{product.thickness}</span>
                    </div>
                  )}
                  {product.tempRange && (
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="block text-[10px] text-slate-400 font-bold uppercase">Temp Resistance</span>
                      <span className="font-bold text-slate-800">{product.tempRange}</span>
                    </div>
                  )}
                  {product.backing && (
                    <div className="col-span-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="block text-[10px] text-slate-400 font-bold uppercase">Backing / Carrier</span>
                      <span className="font-medium text-slate-800 leading-snug">{product.backing}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: DETAILS, VARIANT SELECTORS & CTA (7 Cols) ── */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              {/* Distributor Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 mb-3">
                <ShieldCheck size={14} className="text-red-600" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-red-700">
                  Authorised 3M Industrial Distributor Line
                </span>
              </div>

              {/* Title & Subtitle */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight uppercase tracking-tight mb-2">
                {product.name}
              </h1>
              <p className="text-sm sm:text-base font-bold text-red-600 mb-4">{product.subtitle}</p>

              {/* Short Description */}
              <p className="text-sm text-slate-600 leading-relaxed font-normal bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                {product.description}
              </p>
            </div>

            {/* ── INTERACTIVE COLOR VARIANT SELECTOR ── */}
            {product.colors && product.colors.length > 0 && (
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-600" />
                    <span>Select Color / Pattern Variant</span>
                  </label>
                  {selectedColor && (
                    <span className="text-xs font-extrabold text-red-600 bg-red-50 px-2.5 py-0.5 rounded-md border border-red-200">
                      {selectedColor.name}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  {product.colors.map((col, idx) => {
                    const isSelected = selectedColor?.name === col.name;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(col)}
                        className={`group relative flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-red-600 ring-offset-2'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-400 hover:bg-slate-100'
                        }`}
                      >
                        {/* Swatch Circle */}
                        <span
                          className={`w-4 h-4 rounded-full border border-slate-300 shadow-inner flex items-center justify-center shrink-0 ${
                            col.striped ? 'bg-gradient-to-r' : ''
                          }`}
                          style={{
                            backgroundColor: col.hex,
                            backgroundImage: col.striped
                              ? `linear-gradient(135deg, ${col.hex} 50%, ${col.secondaryHex || '#000000'} 50%)`
                              : undefined
                          }}
                        >
                          {isSelected && <Check size={10} className={col.hex === '#ffffff' ? 'text-slate-900' : 'text-white'} />}
                        </span>

                        <span>{col.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── INTERACTIVE WIDTH / SIZE VARIANT SELECTOR ── */}
            {product.widths && product.widths.length > 0 && (
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-600" />
                    <span>Select Size / Width Option</span>
                  </label>
                  {selectedWidth && (
                    <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">
                      {selectedWidth}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  {product.widths.map((w, idx) => {
                    const isSelected = selectedWidth === w;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedWidth(w)}
                        className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-600/20'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                        }`}
                      >
                        {w}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── ROLL LENGTH / VOLUME SELECTOR (IF APPLICABLE) ── */}
            {((product.lengths && product.lengths.length > 0) || (product.volumes && product.volumes.length > 0)) && (
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-600" />
                  <span>Packaging & Quantity Format</span>
                </label>

                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  {product.lengths?.map((len, idx) => {
                    const isSelected = selectedLength === len;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedLength(len)}
                        className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {len}
                      </button>
                    );
                  })}

                  {product.volumes?.map((vol, idx) => {
                    const isSelected = selectedVolume === vol;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedVolume(vol)}
                        className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {vol}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── ACTION BUTTONS & QUOTATION CTA ── */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 text-white shadow-xl space-y-5">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold block mb-1">
                    Direct Factory Supply • Wholesale Rates
                  </span>
                  <h3 className="text-lg font-black uppercase text-white">Get Official Price Quotation</h3>
                </div>

                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <CheckCircle2 size={16} /> Ready Stock in Ahmedabad
                </div>
              </div>

              {/* Quantity Selector & Add to Cart */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-slate-800">
                {cartItem ? (
                  <div className="w-full p-2.5 rounded-2xl bg-red-950/40 border border-red-500/30 flex items-center justify-between gap-4">
                    <span className="text-xs font-mono font-bold text-red-300 pl-2">
                      In Your Cart:
                    </span>

                    <div className="flex items-center gap-3 bg-red-600 border border-red-500 rounded-xl p-1 shadow-md shadow-red-600/30">
                      <button
                        type="button"
                        disabled={cartLoading}
                        onClick={() => updateQuantity(cartItem._id, cartItem.quantity - 1)}
                        className="w-8 h-8 rounded-lg bg-red-700 hover:bg-red-800 text-white font-black flex items-center justify-center transition-colors cursor-pointer"
                        title="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="px-3 font-mono font-black text-sm text-white min-w-[24px] text-center select-none">
                        {cartItem.quantity}
                      </span>

                      <button
                        type="button"
                        disabled={cartLoading}
                        onClick={() => updateQuantity(cartItem._id, cartItem.quantity + 1)}
                        className="w-8 h-8 rounded-lg bg-red-700 hover:bg-red-800 text-white font-black flex items-center justify-center transition-colors cursor-pointer"
                        title="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-1.5 w-full sm:w-auto justify-between">
                      <button
                        onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                        disabled={quantity <= 1}
                        className="w-9 h-9 rounded-xl bg-slate-700 hover:bg-red-600 text-white font-black flex items-center justify-center transition-colors disabled:opacity-30 disabled:hover:bg-slate-700 cursor-pointer"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center font-mono font-bold text-sm text-white">{quantity}</span>
                      <button
                        onClick={() => setQuantity((prev) => prev + 1)}
                        className="w-9 h-9 rounded-xl bg-slate-700 hover:bg-red-600 text-white font-black flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all duration-300 shadow-xl shadow-red-600/40 cursor-pointer group"
                    >
                      <ShoppingBag size={18} />
                      <span>Add To Cart</span>
                    </button>
                  </>
                )}
              </div>

              {/* Primary Action Button */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={handleInquire}
                  className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-red-600/30 cursor-pointer group"
                >
                  <PhoneCall size={16} />
                  <span>Request Instant Quotation</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="/NB Corporation Brochure_260720_152747.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto py-4 px-5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors border border-white/15 cursor-pointer"
                >
                  <FileText size={16} />
                  <span>Brochure PDF</span>
                  <Download size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TABBED TECHNICAL INFORMATION SECTION ── */}
      <section className="py-14 container mx-auto px-6">
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
          {/* Tab Navigation Headers */}
          <div className="flex items-center gap-3 border-b border-slate-200 pb-4 overflow-x-auto no-scrollbar mb-8">
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-5 py-3 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'specs'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              <Layers size={16} /> Technical Datasheet
            </button>

            <button
              onClick={() => setActiveTab('applications')}
              className={`px-5 py-3 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'applications'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              <CheckCircle2 size={16} /> Applications & Industries
            </button>

            <button
              onClick={() => setActiveTab('prep')}
              className={`px-5 py-3 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'prep'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              <Sparkles size={16} /> 3M Application Guide
            </button>
          </div>

          {/* TAB 1: TECHNICAL DATASHEET TABLE */}
          {activeTab === 'specs' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold uppercase tracking-tight text-slate-900">
                  Full 3M Official Datasheet Specifications
                </h3>
                <span className="text-xs text-slate-500 font-mono font-semibold">Catalog Code: 3M {product.code}</span>
              </div>

              <div className="rounded-2xl border border-slate-200 overflow-hidden text-xs bg-white">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    {product.technicalSpecs &&
                      Object.entries(product.technicalSpecs).map(([key, value], idx) => (
                        <tr
                          key={key}
                          className={`border-b border-slate-100 ${idx % 2 === 0 ? 'bg-slate-50/70' : 'bg-white'}`}
                        >
                          <td className="py-3.5 px-5 font-extrabold text-slate-600 w-1/3 sm:w-1/4 uppercase tracking-wider text-[11px]">
                            {key}
                          </td>
                          <td className="py-3.5 px-5 text-slate-800 font-medium leading-relaxed">{value}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* TAB 2: APPLICATIONS & INDUSTRIES */}
          {activeTab === 'applications' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-red-600" />
                  <span>Recommended Industrial Applications</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {product.applications?.map((app, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-3 shadow-xs"
                    >
                      <span className="w-2 h-2 rounded-full bg-red-600 shrink-0" />
                      <span>{app}</span>
                    </div>
                  ))}
                </div>
              </div>

              {product.industries && product.industries.length > 0 && (
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                    <ShieldCheck size={16} className="text-red-600" />
                    <span>Target Industry Sectors</span>
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {product.industries.map((ind, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 rounded-xl bg-red-50 text-red-700 font-extrabold text-xs border border-red-200"
                      >
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 3: 3M SURFACE PREP GUIDE */}
          {activeTab === 'prep' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <h3 className="text-base font-extrabold uppercase tracking-tight text-slate-900 flex items-center gap-2">
                <Sparkles size={18} className="text-red-600" />
                <span>3M Official Surface Preparation & Application Instructions</span>
              </h3>

              <div className="space-y-4">
                {product.surfacePrep?.map((step, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                    <span className="w-7 h-7 rounded-full bg-red-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-sm">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed pt-0.5">{step}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── RELATED PRODUCTS CAROUSEL / GRID ── */}
      {relatedProducts.length > 0 && (
        <section className="py-14 container mx-auto px-6 border-t border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[11px] font-bold text-red-600 uppercase tracking-widest block mb-1">
                Explore More
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
                Related {product.category} Solutions
              </h2>
            </div>

            <Link
              to="/product"
              className="text-xs font-extrabold text-red-600 hover:text-red-700 flex items-center gap-1.5 transition-colors"
            >
              <span>View All Category Items</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <RelatedCard key={rel.id} rel={rel} navigate={navigate} />
            ))}
          </div>
        </section>
      )}

      {/* ── IMAGE ZOOM MODAL GALLERY ── */}
      {isZoomed && currentImageSrc && !imageError && (
        <div 
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 z-[4000] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-white p-6 sm:p-8 rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center z-30 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="relative w-full h-[65vh] flex items-center justify-center">
              <img 
                src={getImageUrl(currentImageSrc)} 
                alt={product.name} 
                className="max-w-full max-h-[60vh] object-contain"
              />

              {galleryList.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/80 text-white hover:bg-red-600 flex items-center justify-center transition-colors shadow-lg z-20 cursor-pointer"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/80 text-white hover:bg-red-600 flex items-center justify-center transition-colors shadow-lg z-20 cursor-pointer"
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              )}
            </div>

            {galleryList.length > 1 && (
              <div className="mt-4 flex items-center gap-2 overflow-x-auto p-1 max-w-full no-scrollbar">
                {galleryList.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-14 rounded-xl border p-1 bg-slate-50 transition-all cursor-pointer shrink-0 ${
                      idx === activeImageIndex ? 'border-red-600 ring-2 ring-red-600 scale-105 shadow-md' : 'border-slate-200 opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={getImageUrl(img)} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProductDetail;
