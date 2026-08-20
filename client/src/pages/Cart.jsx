import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  CheckCircle2,
  AlertCircle,
  Truck,
  RotateCcw,
  Package,
  Sparkles,
  X,
  CreditCard,
  PhoneCall
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getImageUrl } from '../utils/imageUtils';
import './Cart.css';

const Cart = () => {
  const { cartItems, cartCount, cartTotal, updateQuantity, removeFromCart, clearCart, triggerToast, loading } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const navigate = useNavigate();

  // Coupon handling logic
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const cleanCode = couponCode.trim().toUpperCase();
    if (cleanCode === 'NBCORP10') {
      setDiscount(0.10); // 10% off
      setCouponApplied(true);
      triggerToast('Coupon NBCORP10 applied! 10% Discount applied.', 'success');
    } else if (cleanCode === 'PROMAX') {
      setDiscount(0.15); // 15% off
      setCouponApplied(true);
      triggerToast('PROMAX Coupon applied! 15% Discount applied.', 'success');
    } else {
      triggerToast('Invalid coupon code. Try NBCORP10 or PROMAX', 'error');
    }
  };

  const handleRemoveCoupon = () => {
    setDiscount(0);
    setCouponApplied(false);
    setCouponCode('');
    triggerToast('Coupon removed.', 'info');
  };

  // Pricing calculations
  const discountAmount = cartTotal * discount;
  const subtotalAfterDiscount = cartTotal - discountAmount;
  const gstTax = subtotalAfterDiscount * 0.18; // 18% GST for industrial supply
  const shippingFee = cartTotal > 5000 || cartItems.length === 0 ? 0 : 250;
  const grandTotal = subtotalAfterDiscount + gstTax + shippingFee;

  return (
    <div className="cart-page-wrapper bg-slate-50 min-h-screen">
      <div className="cart-bg-grid" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Breadcrumb & Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-600 uppercase tracking-widest mb-2">
              <ShoppingBag size={14} />
              <span>Direct Factory Ordering System</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
              <span>Your Cart</span>
              <span className="text-sm font-mono font-bold bg-red-50 text-red-600 border border-red-200 px-3 py-1 rounded-full">
                {cartCount} {cartCount === 1 ? 'Item' : 'Items'}
              </span>
            </h1>
          </div>

          {cartItems.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={clearCart}
                disabled={loading}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 border border-slate-200 hover:border-red-200 text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <RotateCcw size={14} />
                <span>Clear Cart</span>
              </button>

              <Link
                to="/product"
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md"
              >
                <Plus size={14} />
                <span>Add More Items</span>
              </Link>
            </div>
          )}
        </div>

        {/* 🛒 EMPTY CART STATE */}
        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-slate-200 shadow-xl rounded-3xl p-10 sm:p-16 text-center max-w-2xl mx-auto my-12"
          >
            <div className="w-24 h-24 rounded-3xl bg-slate-50 border border-slate-200 text-slate-400 mx-auto flex items-center justify-center mb-6 shadow-inner">
              <ShoppingBag size={48} className="stroke-[1.5]" />
            </div>

            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-3">
              Your Industrial Cart is Empty
            </h2>

            <p className="text-sm text-slate-500 max-w-md mx-auto mb-8 font-medium leading-relaxed">
              No products have been added yet. Browse our official 3M catalog for tapes, adhesives, abrasives, and personal safety equipment.
            </p>

            <Link
              to="/product"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-widest shadow-xl shadow-red-600/30 transition-all hover:scale-105"
            >
              <span>Explore 3M Catalog</span>
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        ) : (
          /* 🛒 CART CONTENT GRID */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Items List */}
            <div className="lg:col-span-8 space-y-4">
              <AnimatePresence>
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item._id || `${item.productId}-${index}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white border border-slate-200 shadow-sm hover:shadow-md rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 transition-all"
                  >
                    {/* Item Image & Meta */}
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-50 border border-slate-200 p-2 flex items-center justify-center shrink-0 overflow-hidden relative">
                        {item.image ? (
                          <img
                            src={getImageUrl(item.image)}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <Package size={24} className="text-slate-400" />
                        )}
                        {item.code && (
                          <span className="cart-badge-chip absolute top-1 left-1">
                            3M {item.code}
                          </span>
                        )}
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold text-red-600 uppercase tracking-widest block">
                          Industrial Grade • 3M Official
                        </span>

                        <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                          {item.name}
                        </h3>

                        {/* Selected Variants */}
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          {item.selectedColor && (
                            <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 font-bold">
                              Color: {item.selectedColor}
                            </span>
                          )}
                          {item.selectedWidth && (
                            <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 font-bold">
                              Size: {item.selectedWidth}
                            </span>
                          )}
                          {item.selectedLength && (
                            <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 font-bold">
                              Length: {item.selectedLength}
                            </span>
                          )}
                          {item.selectedVolume && (
                            <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 font-bold">
                              Volume: {item.selectedVolume}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quantity Controls & Price */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0">
                      {/* Quantity Controller */}
                      <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-xl p-1">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          disabled={item.quantity <= 1 || loading}
                          className="cart-qty-btn"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>

                        <span className="w-8 text-center font-mono font-bold text-xs text-slate-900">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          disabled={loading}
                          className="cart-qty-btn"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Item Total Price */}
                      <div className="text-right">
                        <span className="text-xs text-slate-400 font-mono block">
                          ₹{item.price ? item.price.toLocaleString('en-IN') : 'Quote'} / unit
                        </span>
                        <span className="text-base font-black text-slate-900 font-mono">
                          ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item._id)}
                        disabled={loading}
                        className="p-2.5 rounded-xl bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-200 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Right Summary Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Order Summary Card */}
              <div className="bg-white border border-slate-200 shadow-xl rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <h2 className="text-base font-black uppercase text-slate-900 tracking-wide flex items-center gap-2">
                    <ShieldCheck size={18} className="text-red-600" />
                    <span>Order Summary</span>
                  </h2>
                </div>



                {/* Calculation Rows */}
                <div className="space-y-3 text-xs border-t border-slate-200 pt-4">
                  <div className="flex items-center justify-between text-slate-600 font-medium">
                    <span>Subtotal</span>
                    <span className="font-mono text-slate-900 font-bold">
                      ₹{cartTotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {couponApplied && (
                    <div className="flex items-center justify-between text-emerald-600 font-medium">
                      <span>Discount ({discount * 100}%)</span>
                      <span className="font-mono font-bold">
                        -₹{discountAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-slate-600 font-medium">
                    <span className="flex items-center gap-1">
                      <span>GST / Industrial Tax (18%)</span>
                    </span>
                    <span className="font-mono text-slate-900 font-bold">
                      ₹{gstTax.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Truck size={14} className="text-red-600" />
                      <span>Factory Express Shipping</span>
                    </span>
                    <span className="font-mono font-bold text-emerald-600">
                      {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-base">
                    <span className="font-black uppercase text-slate-900 tracking-wide">
                      Grand Total
                    </span>
                    <span className="font-black font-mono text-red-600 text-xl">
                      ₹{grandTotal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={() => setShowCheckoutModal(true)}
                  className="w-full py-4 px-6 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 shadow-xl shadow-red-600/30 hover:scale-[1.02] cursor-pointer"
                >
                  <CreditCard size={16} />
                  <span>Proceed to Official Order</span>
                  <ArrowRight size={16} />
                </button>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-3 pt-2 text-[10px] text-slate-500 font-bold border-t border-slate-200">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                    <span>3M Certified Direct</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Truck size={14} className="text-red-600 shrink-0" />
                    <span>Dispatch within 24h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 🚀 CHECKOUT CONFIRMATION MODAL */}
      <AnimatePresence>
        {showCheckoutModal && (
          <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-900"
            >
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 border border-red-200 flex items-center justify-center">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase text-slate-900">
                    Official Quotation & Order
                  </h3>
                  <span className="text-[10px] font-mono text-slate-500">
                    NB.CORP Elite Engineering Supply
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-600">
                  <span>Total Items:</span>
                  <span className="text-slate-900 font-bold">{cartCount}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estimated Total:</span>
                  <span className="text-red-600 font-bold text-sm">
                    ₹{grandTotal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Our sales team will directly verify your organization details and send official tax invoice & dispatch documentation.
              </p>

              <div className="flex items-center gap-3">
                <a
                  href={`https://wa.me/919825954315?text=Hello%20NB.CORP,%20I%20would%20like%20to%20place%20an%20order%20for%20${cartCount}%20items%20totaling%20₹${Math.round(grandTotal)}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <PhoneCall size={16} />
                  <span>Order via WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    setShowCheckoutModal(false);
                    triggerToast('Order inquiry received! Representative will call shortly.', 'success');
                  }}
                  className="py-3.5 px-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md"
                >
                  Confirm Order
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cart;
