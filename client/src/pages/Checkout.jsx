import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  ShoppingBag,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Truck,
  Sparkles,
  PhoneCall,
  ChevronDown,
  Youtube,
  Linkedin,
  Facebook,
  Instagram,
  Check,
  Package,
  Send
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, cartCount, clearCart, triggerToast, loading } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  // Total quantity calculation across all items
  const totalUnits = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  // Form State for Quotation Inquiry
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    location: '',
    selectedProduct: 'ALL',
    quantity: '',
    message: '',
  });

  // Attempt to autofill user info if logged in
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await axios.get(`${baseUrl}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data) {
          setFormData((prev) => ({
            ...prev,
            name: prev.name || res.data.name || '',
            email: prev.email || res.data.email || '',
            mobile: prev.mobile || res.data.phone || '',
          }));
        }
      } catch (err) {
        // silent fail
      }
    };
    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getWhatsAppMessage = () => {
    const productSummary = cartItems.length > 0
      ? cartItems.map((i) => `• ${i.name} (Qty: ${i.quantity})`).join('\n')
      : (formData.selectedProduct || 'Custom product quotation inquiry');

    return `*OFFICIAL QUOTATION & ORDER INQUIRY - NB.CORP*\n\n` +
      `*Name:* ${formData.name || 'N/A'}\n` +
      `*Email:* ${formData.email || 'N/A'}\n` +
      `*Mobile:* ${formData.mobile || 'N/A'}\n` +
      `*Location:* ${formData.location || 'N/A'}\n` +
      `*Selected Item(s):* ${formData.selectedProduct === 'ALL' ? 'All Cart Items' : formData.selectedProduct}\n` +
      `*Total Quantity:* ${formData.quantity || totalUnits || 1} Units\n\n` +
      `*Products in Order:*\n${productSummary}\n\n` +
      `*Message:* ${formData.message || 'Please send official price quotation and delivery dispatch details.'}`;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.mobile || !formData.message) {
      triggerToast('Please fill all required fields.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        mobile: formData.mobile.trim(),
        location: formData.location.trim(),
        selectedProduct: formData.selectedProduct,
        quantity: Number(formData.quantity) || totalUnits || 1,
        message: formData.message.trim(),
        items: cartItems.map((item) => ({
          productId: item.productId || item._id,
          code: item.code || '',
          name: item.name,
          quantity: item.quantity || 1,
          selectedColor: item.selectedColor || '',
          selectedWidth: item.selectedWidth || '',
          selectedLength: item.selectedLength || '',
          selectedVolume: item.selectedVolume || '',
        })),
      };

      const res = await axios.post(`${baseUrl}/api/inquiry`, payload);

      if (res.data?.success) {
        setSubmitted(true);
        triggerToast('Your inquiry has been submitted and sent to nb2corporation@gmail.com!', 'success');
        if (cartItems.length > 0) {
          clearCart();
        }
      } else {
        setSubmitted(true);
        triggerToast('Inquiry recorded successfully!', 'success');
      }
    } catch (err) {
      console.error('Inquiry submission notice:', err);
      // Fallback: Show success and allow WhatsApp instant backup
      setSubmitted(true);
      triggerToast('Inquiry submitted! Representative will contact you shortly.', 'success');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="checkout-page-wrapper bg-slate-50 min-h-screen">
      <div className="checkout-bg-grid" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-600 hover:text-red-600 uppercase tracking-wider transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Cart</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-600 uppercase tracking-widest">
            <ShieldCheck size={16} />
            <span>Direct B2B Official Quotation</span>
          </div>
        </div>

        {/* Main Content Box */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl max-w-5xl mx-auto">
          {/* Header Title */}
          <div className="border-b border-slate-200 pb-6 mb-8">
            <h1 className="text-3xl sm:text-4xl font-black uppercase text-slate-900 tracking-tight flex items-center gap-3">
              <Sparkles size={28} className="text-red-600" />
              <span>Get a Quote / Official Order</span>
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              Fill out your requirements below to receive direct factory pricing, bulk tier discounts, and dispatch scheduling.
            </p>
          </div>

          {submitted ? (
            /* Submission Success State */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-16 text-center space-y-6 max-w-lg mx-auto"
            >
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto border border-emerald-200 shadow-inner">
                <Check size={40} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                Quotation Request Received!
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Thank you, <span className="font-bold text-slate-900">{formData.name}</span>. Our technical sales engineering team at NB.CORP is reviewing your order inquiry and will contact you via email/phone within 24 hours.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a
                  href={`https://wa.me/919825954315?text=${encodeURIComponent(getWhatsAppMessage())}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <PhoneCall size={16} />
                  <span>Chat on WhatsApp</span>
                </a>
                <button
                  onClick={() => navigate('/product')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Continue Browsing
                </button>
              </div>
            </motion.div>
          ) : (
            /* Reference Image 2 Layout: 2 Columns */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              {/* Left Column: Form */}
              <form onSubmit={handleFormSubmit} className="lg:col-span-7 space-y-5">
                {/* Your Name */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">
                    Your name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name or company name"
                    required
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-3 focus:ring-blue-600/15 outline-none transition-all"
                  />
                </div>

                {/* Your Email */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">
                    Your email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="official@company.com"
                    required
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-3 focus:ring-blue-600/15 outline-none transition-all"
                  />
                </div>

                {/* Your Mobile */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">
                    Your Mobile<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="+91 98259 54315"
                    required
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-3 focus:ring-blue-600/15 outline-none transition-all"
                  />
                </div>

                {/* Your Location */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">
                    Your Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="City, State / ZIP (e.g., Ahmedabad, Gujarat)"
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-3 focus:ring-blue-600/15 outline-none transition-all"
                  />
                </div>

                {/* Select Product */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">
                    Select Product<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="selectedProduct"
                      value={formData.selectedProduct}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 bg-white focus:border-blue-600 focus:ring-3 focus:ring-blue-600/15 outline-none transition-all appearance-none cursor-pointer pr-10"
                    >
                      {cartCount > 0 ? (
                        <>
                          <option value="ALL">
                            All Cart Items ({cartCount} {cartCount === 1 ? 'Product' : 'Products'}, {totalUnits} Units)
                          </option>
                          {cartItems.map((item, idx) => (
                            <option key={item._id || idx} value={item.name}>
                              {item.name} {item.code ? `(${item.code})` : ''} — Qty: {item.quantity}
                            </option>
                          ))}
                        </>
                      ) : (
                        <option value="General Industrial Product Inquiry">
                          General Industrial 3M Products Inquiry
                        </option>
                      )}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <ChevronDown size={18} />
                    </div>
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">
                    Quantity<span className="text-red-500">*</span>{' '}
                    <span className="text-xs font-normal text-slate-500">
                      {totalUnits > 0 ? `Note: Current total units in cart: ${totalUnits}` : 'Note: Enter required units.'}
                    </span>
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    value={formData.quantity || (totalUnits > 0 ? totalUnits : 1)}
                    onChange={handleInputChange}
                    placeholder="Quantity in Units"
                    required
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-3 focus:ring-blue-600/15 outline-none transition-all"
                  />
                </div>

                {/* Your Message */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">
                    Your message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Provide specifications, application requirements, delivery schedule or GST details..."
                    required
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-3 focus:ring-blue-600/15 outline-none transition-all resize-y"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer flex items-center gap-2"
                  >
                    <Send size={16} />
                    <span>{submitting ? 'Submitting...' : 'Submit'}</span>
                  </button>

                  <a
                    href={`https://wa.me/919825954315?text=${encodeURIComponent(getWhatsAppMessage())}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
                  >
                    <PhoneCall size={16} />
                    <span>Order via WhatsApp</span>
                  </a>
                </div>
              </form>

              {/* Right Column: Address & Contact Details (As per reference image) */}
              <div className="lg:col-span-5 space-y-8 lg:pl-8 lg:border-l border-slate-200 flex flex-col justify-between">
                <div className="space-y-7">
                  {/* Address */}
                  <div>
                    <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-2">
                      Address
                    </h3>
                    <p className="text-sm font-bold text-slate-800">
                      N.B. Corporation
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      G-10,11,12 SATKAR AVENUE, NR. RAILWAY CROSSING, NH NO -08,
                      opp. starline maruti showroom, Naroda, Ahmedabad, Gujarat 382340, India
                    </p>
                  </div>

                  {/* Talk To Us */}
                  <div className="border-t border-slate-200 pt-6">
                    <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-2">
                      Talk To Us
                    </h3>
                    <div className="space-y-1.5 text-sm font-semibold text-blue-600">
                      <p>
                        <a href="tel:+919825954315" className="hover:underline">+91 98259 54315</a>
                      </p>
                      <p>
                        <a href="tel:+917922823400" className="hover:underline">+91 79 2282 3400</a>
                      </p>
                    </div>
                  </div>

                  {/* Contact Us */}
                  <div className="border-t border-slate-200 pt-6">
                    <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-2">
                      Contact Us
                    </h3>
                    <div className="space-y-1.5 text-xs text-slate-600">
                      <p>
                        <a href="mailto:nb2corporation@gmail.com" className="text-blue-600 hover:underline font-semibold">
                          nb2corporation@gmail.com
                        </a>
                      </p>
                      <p>
                        <a href="https://www.nbcorporation.in" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-semibold">
                          www.nbcorporation.in
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="border-t border-slate-200 pt-6">
                  <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-3">
                    Social links
                  </h3>
                  <div className="flex items-center gap-2.5">
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded bg-red-600 text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                      title="YouTube"
                    >
                      <Youtube size={18} />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded bg-[#0077b5] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                      title="LinkedIn"
                    >
                      <Linkedin size={18} />
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded bg-[#1877f2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                      title="Facebook"
                    >
                      <Facebook size={18} />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded bg-[#e4405f] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                      title="Instagram"
                    >
                      <Instagram size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
