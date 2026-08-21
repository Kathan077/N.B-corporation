import React from 'react';
import {
  Home, Layout, Shield, Layers, Cpu, Quote,
  Package, Globe2, TrendingUp, ExternalLink,
  Sparkles, CheckCircle2, AlertCircle, Info,
  Award, BookOpen, Factory, Boxes, Phone, ShoppingBag, FileText, Zap
} from 'lucide-react';

export const HOME_SECTIONS = [
  { id: 'hero', name: 'Hero Banner', icon: Layout },
  { id: 'principles', name: 'Our Principles', icon: Shield },
  { id: 'whyChooseUs', name: 'Why Choose Us', icon: Layers },
  { id: 'applications', name: 'Applications', icon: Cpu },
  { id: 'testimonials', name: 'Testimonials', icon: Quote },
  { id: 'featuredProducts', name: 'Featured 3M', icon: Package },
  { id: 'brands', name: 'Industries Served', icon: Globe2 },
  { id: 'impact', name: 'Impact & Goals', icon: TrendingUp },
];

export const ABOUT_SECTIONS = [
  { id: 'aboutHero', name: 'Banner & Hero', icon: Layout },
  { id: 'aboutStats', name: 'Key Highlights', icon: Award },
  { id: 'aboutStory', name: 'Story, Mission & Vision', icon: BookOpen },
  { id: 'aboutIndustries', name: 'Industries We Power', icon: Factory },
  { id: 'aboutCategories', name: '21 Product Categories', icon: Boxes },
  { id: 'aboutPillarsValues', name: 'Pillars & Values', icon: Sparkles },
  { id: 'aboutContact', name: 'Headquarters & Contact', icon: Phone },
];

export const PRODUCT_SECTIONS = [
  { id: 'catalog', name: 'Full Product Catalog', icon: Package },
];

export const BLOG_SECTIONS = [
  { id: 'blogHero', name: 'Blog Hero Section', icon: Layout },
  { id: 'blogSlider', name: 'Live Stream Slider', icon: Zap },
  { id: 'blogPosts', name: 'All Blog Articles', icon: BookOpen },
];

const Sidebar = ({
  activePage = 'home',
  onSelectPage,
  activeTab,
  onSelectTab,
  isOnline,
  unsavedChanges,
  productsCount = 0,
  blogsCount = 0
}) => {
  let currentSections = HOME_SECTIONS;
  if (activePage === 'about') currentSections = ABOUT_SECTIONS;
  if (activePage === 'products') currentSections = PRODUCT_SECTIONS;
  if (activePage === 'blogs') currentSections = BLOG_SECTIONS;

  let viewLiveLink = "http://localhost:5173";
  let liveLabel = "Home";
  if (activePage === 'about') {
    viewLiveLink = "http://localhost:5173/about";
    liveLabel = "About";
  } else if (activePage === 'products') {
    viewLiveLink = "http://localhost:5173/product";
    liveLabel = "Products";
  } else if (activePage === 'blogs') {
    viewLiveLink = "http://localhost:5173/blog";
    liveLabel = "Blog";
  }

  let countBadge = `${currentSections.length} Sections`;
  if (activePage === 'products') countBadge = `${productsCount} Items`;
  if (activePage === 'blogs') countBadge = `${blogsCount} Articles`;

  return (
    <aside className="w-72 bg-[#080C14] border-r border-slate-800/80 flex flex-col justify-between shrink-0 h-screen sticky top-0 overflow-y-auto">
      {/* Brand Header */}
      <div>
        <div className="p-6 border-b border-slate-800/80">
          <div className="flex items-center gap-3 mb-2">
            <img
              src="/nb_logo.png"
              alt="NB Corporation"
              className="h-10 w-auto object-contain bg-white rounded-lg p-1 shadow"
            />
            <div>
              <h1 className="text-sm font-black text-white tracking-wider uppercase leading-tight">
                NB Corp
              </h1>
              <span className="text-[10px] font-mono font-bold text-red-500 tracking-widest uppercase">
                Admin Panel
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px]">
            <span className="text-slate-400 font-medium">Backend Status:</span>
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span className={`font-semibold ${isOnline ? 'text-emerald-400' : 'text-amber-400'}`}>
                {isOnline ? 'Live DB' : 'Local Mock'}
              </span>
            </div>
          </div>
        </div>

        {/* 4-Way Page Switcher */}
        <div className="p-4 pb-2">
          <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-2 px-1">
            Active Management Module
          </div>
          <div className="grid grid-cols-4 gap-1 p-1 bg-slate-950 border border-slate-800/80 rounded-xl">
            <button
              type="button"
              onClick={() => onSelectPage('home')}
              className={`flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${activePage === 'home'
                  ? 'bg-red-600 text-white shadow-md shadow-red-950/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
            >
              <Home size={13} />
              <span>Home</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectPage('about')}
              className={`flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${activePage === 'about'
                  ? 'bg-red-600 text-white shadow-md shadow-red-950/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
            >
              <Info size={13} />
              <span>About</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectPage('products')}
              className={`flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${activePage === 'products'
                  ? 'bg-red-600 text-white shadow-md shadow-red-950/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
            >
              <Package size={13} />
              <span>Products</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectPage('blogs')}
              className={`flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${activePage === 'blogs'
                  ? 'bg-red-600 text-white shadow-md shadow-red-950/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
            >
              <BookOpen size={13} />
              <span>Blogs</span>
            </button>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="p-4 pt-1 space-y-1">
          <div className="px-3 py-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-500 flex items-center justify-between">
            <span>
              {activePage === 'about' ? 'About Sections' : (activePage === 'products' ? 'Product Catalog' : (activePage === 'blogs' ? 'Blog Management' : 'Home Sections'))}
            </span>
            <span className="bg-red-950/80 border border-red-500/30 text-red-400 text-[9px] px-1.5 py-0.5 rounded font-mono">
              {countBadge}
            </span>
          </div>

          <div className="space-y-1">
            {currentSections.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeTab === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => onSelectTab(sec.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group cursor-pointer ${isActive
                      ? 'bg-red-600/15 text-white border border-red-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} className={isActive ? 'text-red-500' : 'text-slate-500 group-hover:text-slate-300'} />
                    <span>{sec.name}</span>
                  </div>

                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer quick action */}
      <div className="p-4 border-t border-slate-800/80 space-y-3">
        {unsavedChanges && (
          <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 text-[11px] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
            <span>Unsaved edits pending</span>
          </div>
        )}

        <a
          href={viewLiveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-all group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <ExternalLink size={14} className="text-red-500" />
            <span>View {liveLabel} Live</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">:5173</span>
        </a>

        <div className="text-center text-[10px] text-slate-500 font-mono">
          v1.0 • NB Corp CMS
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
