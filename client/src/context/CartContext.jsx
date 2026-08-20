import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, LogIn, X, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [attemptedProduct, setAttemptedProduct] = useState(null);
  const [notification, setNotification] = useState(null); // { message, type }

  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const triggerToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification((prev) => (prev?.message === message ? null : prev));
    }, 4000);
  };

  // 🔄 Fetch cart items from MongoDB backend
  const fetchCart = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setCartItems([]);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(`${baseUrl}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data && Array.isArray(res.data.items)) {
        setCartItems(res.data.items);
      } else {
        setCartItems([]);
      }
    } catch (err) {
      console.error('Fetch Cart Error:', err);
      if (err.response && [401, 403].includes(err.response.status)) {
        localStorage.removeItem('token');
        setCartItems([]);
      }
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  useEffect(() => {
    fetchCart();

    const handleAuthChange = () => fetchCart();
    window.addEventListener('auth-change', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);

    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, [fetchCart]);

  // ➕ Add item to cart (Strict Auth Check)
  const addToCart = async (product, quantity = 1, options = {}) => {
    const token = localStorage.getItem('token');

    // 🔒 STRICT CHECK: Unauthenticated users CANNOT add items to cart
    if (!token) {
      setAttemptedProduct(product);
      setShowAuthModal(true);
      triggerToast('Please log in to add items to your cart!', 'warning');
      return { success: false, reason: 'unauthenticated' };
    }

    try {
      setLoading(true);
      const payload = {
        productId: product.id || product._id || product.productId,
        code: product.code || '',
        name: product.name,
        price: product.price || 0,
        image: product.image || (Array.isArray(product.images) ? product.images[0] : ''),
        selectedColor: options.color || '',
        selectedWidth: options.width || '',
        selectedLength: options.length || '',
        selectedVolume: options.volume || '',
        quantity: Number(quantity) || 1
      };

      const res = await axios.post(`${baseUrl}/api/cart/add`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data && res.data.cart && Array.isArray(res.data.cart.items)) {
        setCartItems(res.data.cart.items);
      } else {
        await fetchCart();
      }

      triggerToast(`Added "${product.name}" to cart!`, 'success');
      return { success: true };
    } catch (err) {
      console.error('Add to Cart Error:', err);
      const errorMsg = err.response?.data?.msg || 'Failed to add item to cart.';
      triggerToast(errorMsg, 'error');
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Update quantity of item in cart
  const updateQuantity = async (itemId, newQuantity) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setShowAuthModal(true);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${baseUrl}/api/cart/update`,
        { itemId, quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data && res.data.cart && Array.isArray(res.data.cart.items)) {
        setCartItems(res.data.cart.items);
      } else {
        await fetchCart();
      }
    } catch (err) {
      console.error('Update Cart Quantity Error:', err);
      triggerToast('Failed to update quantity.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // ❌ Remove item from cart
  const removeFromCart = async (itemId) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      setLoading(true);
      const res = await axios.delete(`${baseUrl}/api/cart/remove/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data && res.data.cart && Array.isArray(res.data.cart.items)) {
        setCartItems(res.data.cart.items);
      } else {
        await fetchCart();
      }
      triggerToast('Item removed from cart.', 'info');
    } catch (err) {
      console.error('Remove Cart Item Error:', err);
      triggerToast('Failed to remove item.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // 🧹 Clear entire cart
  const clearCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      setLoading(true);
      const res = await axios.delete(`${baseUrl}/api/cart/clear`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data && res.data.cart && Array.isArray(res.data.cart.items)) {
        setCartItems(res.data.cart.items);
      } else {
        setCartItems([]);
      }
      triggerToast('Cart cleared.', 'info');
    } catch (err) {
      console.error('Clear Cart Error:', err);
      triggerToast('Failed to clear cart.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Helper to find existing item in cart
  const getCartItem = useCallback(
    (productId, options = {}) => {
      if (!productId || !cartItems.length) return null;
      const pIdStr = productId.toString();
      return cartItems.find((item) => {
        if (item.productId !== pIdStr) return false;
        if (options.color && item.selectedColor !== options.color) return false;
        if (options.width && item.selectedWidth !== options.width) return false;
        if (options.length && item.selectedLength !== options.length) return false;
        if (options.volume && item.selectedVolume !== options.volume) return false;
        return true;
      });
    },
    [cartItems]
  );

  // Computed Cart Metrics
  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        loading,
        fetchCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartItem,
        triggerToast
      }}
    >
      {children}

      {/* 🔒 PRO LEVEL AUTH REQUIRED MODAL FOR GUESTS */}
      <AnimatePresence>
        {showAuthModal && (
          <AuthRequiredModal
            onClose={() => {
              setShowAuthModal(false);
              setAttemptedProduct(null);
            }}
            product={attemptedProduct}
          />
        )}
      </AnimatePresence>

      {/* 🔔 GLOBAL TOAST NOTIFICATION */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-32 sm:bottom-36 right-4 sm:right-6 z-[9999] pointer-events-auto"
          >
            <div
              className={`flex items-center gap-3 px-5 py-4 rounded-2xl border backdrop-blur-xl shadow-2xl text-xs font-extrabold uppercase tracking-wide ${
                notification.type === 'error'
                  ? 'bg-red-950/90 text-red-200 border-red-500/40'
                  : notification.type === 'warning'
                  ? 'bg-amber-950/90 text-amber-200 border-amber-500/40'
                  : 'bg-slate-900/90 text-emerald-400 border-emerald-500/40'
              }`}
            >
              {notification.type === 'warning' ? (
                <AlertTriangle size={18} className="text-amber-400 shrink-0" />
              ) : notification.type === 'error' ? (
                <AlertTriangle size={18} className="text-red-400 shrink-0" />
              ) : (
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
              )}
              <span>{notification.message}</span>
              <button
                onClick={() => setNotification(null)}
                className="ml-2 hover:opacity-75 transition-opacity cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </CartContext.Provider>
  );
};

// Subcomponent: Auth Required Modal for Guest Cart Addition
const AuthRequiredModal = ({ onClose, product }) => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    onClose();
    navigate('/login');
  };

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-center"
      >
        {/* Glow backdrop */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X size={16} />
        </button>

        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 mx-auto flex items-center justify-center mb-5 shadow-inner">
          <ShoppingBag size={30} />
        </div>

        <h3 className="text-xl font-black uppercase text-white tracking-tight mb-2">
          Login Required
        </h3>

        <p className="text-xs text-slate-300 leading-relaxed mb-6 font-medium">
          Products cannot be added to cart without login.{' '}
          {product && (
            <span className="text-red-400 font-bold block mt-1">
              Attempting to add: "{product.name}"
            </span>
          )}
          Please authorize your session to save products to your account database.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleLoginRedirect}
            className="w-full py-3.5 px-6 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-red-600/30 cursor-pointer"
          >
            <LogIn size={16} />
            <span>Proceed to Login / Register</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-3 px-6 rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer border border-slate-700/60"
          >
            Continue Browsing
          </button>
        </div>
      </motion.div>
    </div>
  );
};
