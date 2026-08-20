import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Truck,
  RotateCcw,
  Package,
  CreditCard
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getImageUrl } from '../utils/imageUtils';
import './Cart.css';

const Cart = () => {
  const { cartItems, cartCount, updateQuantity, removeFromCart, clearCart, loading } = useCart();
  const navigate = useNavigate();

  // Total quantity calculation across all items
  const totalUnits = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <div className="cart-page-wrapper bg-slate-50 min-h-screen">
      <div className="cart-bg-grid" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-16">
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

                    {/* Quantity Controls & Action */}
                    <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0">
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

                {/* Summary Rows */}
                <div className="space-y-3 text-xs border-t border-slate-200 pt-4">
                  <div className="flex items-center justify-between text-slate-600 font-medium">
                    <span>Total Products</span>
                    <span className="font-mono text-slate-900 font-bold">
                      {cartCount} {cartCount === 1 ? 'Item' : 'Items'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600 font-medium">
                    <span>Total Units</span>
                    <span className="font-mono text-slate-900 font-bold">
                      {totalUnits} Units
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Truck size={14} className="text-red-600" />
                      <span>Factory Dispatch</span>
                    </span>
                    <span className="font-mono font-bold text-emerald-600">
                      Standard Express
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600 font-medium">
                    <span>Pricing Inquiry</span>
                    <span className="font-mono font-bold text-slate-900">
                      Direct B2B Official Quotation
                    </span>
                  </div>
                </div>

                {/* Checkout CTA -> Navigates to Next Page */}
                <button
                  onClick={() => navigate('/checkout')}
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
    </div>
  );
};

export default Cart;
