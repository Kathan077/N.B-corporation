import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import Navbar from './components/layout/Navbar/Navbar';
import ScrollToTop from './components/layout/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import ProductShowcase from './pages/ProductShowcase';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Profile from './pages/Auth/Profile';

const Placeholder = ({ name }) => (
  <div className="min-h-screen pt-40 px-10 flex items-center justify-center bg-white">
    <div className="text-center">
      <h1 className="text-9xl font-black text-slate-100 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 -z-10 uppercase select-none">{name}</h1>
      <h2 className="text-6xl font-black text-slate-900 mb-6">{name} Page</h2>
      <p className="text-xl text-brand-red font-bold uppercase tracking-[0.5em]">Coming Soon . Pro Level</p>
    </div>
  </div>
);

function App() {
  return (
    <ReactLenis root>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-slate-950">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/product" element={<ProductShowcase />} />
            <Route path="/products" element={<ProductShowcase />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </ReactLenis>
  );
}

export default App;
