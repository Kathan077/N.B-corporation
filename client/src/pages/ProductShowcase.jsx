import React from 'react';
import Footer from '../components/layout/Footer/Footer';
import './ProductShowcase.css';

const ProductShowcase = () => {
  return (
    <div className="product-showcase-page">

      <div className="min-h-screen pt-40 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-9xl font-black text-slate-100 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 -z-10 uppercase select-none">Product</h1>
          <h2 className="text-6xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Elite Gallery</h2>
          <p className="text-xl text-brand-red font-bold uppercase tracking-[0.5em]">Restoring Tech Protocols...</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductShowcase;
