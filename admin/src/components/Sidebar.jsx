import React from 'react';
import {
  Home, Layout, Shield, Layers, Cpu, Quote,
  Package, Globe2, TrendingUp, ExternalLink,
  Sparkles, CheckCircle2, AlertCircle, Info,
  Award, BookOpen, Factory, Boxes, Phone, ShoppingBag, FileText, Zap,
  HelpCircle, Inbox, MessageSquare, PhoneCall, X
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

export const CONTACT_SECTIONS = [
  { id: 'contactHero', name: 'Contact Info & Hero', icon: Layout },
  { id: 'contactFaqs', name: 'FAQ Questions & Answers', icon: HelpCircle },
  { id: 'contactInquiries', name: 'Customer Inquiries & RFQs', icon: Inbox },
];

const MODULES = [
  { id: 'home', name: 'Home Page', desc: 'Landing & Showcase', icon: Home },
  { id: 'about', name: 'About Page', desc: 'Story & Mission', icon: Info },
  { id: 'products', name: 'Products Catalog', desc: '3M Industrial Items', icon: Package },
  { id: 'blogs', name: 'Blog & Insights', desc: 'Articles & Stream', icon: BookOpen },
  { id: 'contact', name: 'Contact & RFQs', desc: 'Inquiries & FAQs', icon: PhoneCall },
];

const Sidebar = ({
  isOpen = false,
  onClose,
  activePage = 'home',
  onSelectPage,
  activeTab,
  onSelectTab,
  isOnline,
  unsavedChanges,
  productsCount = 0,
  blogsCount = 0,
  inquiriesCount = 0
}) => {
  let currentSections = HOME_SECTIONS;
  if (activePage === 'about') currentSections = ABOUT_SECTIONS;
  if (activePage === 'products') currentSections = PRODUCT_SECTIONS;
  if (activePage === 'blogs') currentSections = BLOG_SECTIONS;
  if (activePage === 'contact') currentSections = CONTACT_SECTIONS;

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
  } else if (activePage === 'contact') {
    viewLiveLink = "http://localhost:5173/contact";
    liveLabel = "Contact";
  }

  const getModuleBadge = (modId) => {
    if (modId === 'home') return `${HOME_SECTIONS.length} Sec`;
    if (modId === 'about') return `${ABOUT_SECTIONS.length} Sec`;
    if (modId === 'products') return `${productsCount}`;
    if (modId === 'blogs') return `${blogsCount}`;
    if (modId === 'contact') return `${inquiriesCount} RFQ`;
    return '';
  };

  const handleSelectModule = (id) => {
    onSelectPage(id);
    if (window.innerWidth < 1024 && onClose) {
      onClose();
    }
  };

  const handleSelectSubTab = (id) => {
    onSelectTab(id);
    if (window.innerWidth < 1024 && onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-80 max-w-[85vw] bg-[#070B12] border-r border-slate-800/80 flex flex-col justify-between shrink-0 overflow-y-auto no-scrollbar transition-transform duration-300 ease-in-out selection:bg-red-500/20 ${
          isOpen ? 'translate-x-0 shadow-2xl shadow-black' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-4">
          {/* Brand Header */}
          <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-slate-950/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative p-1.5 bg-white rounded-xl shadow-md shrink-0">
                  <img
                    src="/nb_logo.png"
                    alt="NB Corporation"
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <h1 className="text-sm font-black text-white tracking-wider uppercase leading-tight truncate">
                    NB Corp
                  </h1>
                  <span className="text-[10px] font-mono font-bold text-red-500 tracking-widest uppercase block">
                    Admin Console
                  </span>
                </div>
              </div>

              {/* Close Button for Mobile */}
              <button
                type="button"
                onClick={onClose}
                className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 cursor-pointer"
                title="Close Navigation"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex items-center justify-between mt-3 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px]">
              <span className="text-slate-400 font-medium">Backend Connection:</span>
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                <span className={`font-mono font-bold ${isOnline ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {isOnline ? 'Live DB' : 'Offline'}
                </span>
              </div>
            </div>
          </div>

          {/* Primary Modules Selector */}
          <div className="px-3.5 space-y-1.5">
            <div className="px-2 text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center justify-between">
              <span>Management Modules</span>
              <span className="text-[9px] text-slate-600 font-mono">5 Core</span>
            </div>

            <div className="space-y-1">
              {MODULES.map((mod) => {
                const Icon = mod.icon;
                const isSelected = activePage === mod.id;
                const badge = getModuleBadge(mod.id);

                return (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => handleSelectModule(mod.id)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all group cursor-pointer border ${
                      isSelected
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white border-red-500 shadow-md shadow-red-950/60 font-bold'
                        : 'bg-slate-900/40 text-slate-400 border-slate-800/60 hover:text-white hover:bg-slate-850 hover:border-slate-700 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-950 text-slate-400 group-hover:text-white group-hover:bg-slate-800'
                        }`}
                      >
                        <Icon size={16} />
                      </div>
                      <div className="text-left truncate">
                        <div className="text-xs leading-none tracking-tight">{mod.name}</div>
                        <div
                          className={`text-[10px] font-normal leading-tight mt-1 truncate ${
                            isSelected ? 'text-red-100' : 'text-slate-500 group-hover:text-slate-400'
                          }`}
                        >
                          {mod.desc}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-md shrink-0 font-bold ${
                        isSelected
                          ? 'bg-red-950/60 text-white border border-red-400/40'
                          : 'bg-slate-950 text-slate-500 border border-slate-800 group-hover:text-slate-300'
                      }`}
                    >
                      {badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sub-Section Items for Currently Selected Module */}
          <div className="px-3.5 pt-2 space-y-1.5">
            <div className="px-2 text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center justify-between">
              <span>
                {activePage === 'about'
                  ? 'About Sections'
                  : activePage === 'products'
                  ? 'Catalog Management'
                  : activePage === 'blogs'
                  ? 'Blog Sections'
                  : activePage === 'contact'
                  ? 'Contact Sections'
                  : 'Home Sections'}
              </span>
              <span className="text-[9px] text-red-400 font-mono bg-red-950/60 border border-red-500/20 px-1.5 py-0.5 rounded">
                {currentSections.length} Tabs
              </span>
            </div>

            <div className="space-y-0.5 bg-slate-950/70 border border-slate-800/80 rounded-2xl p-1.5">
              {currentSections.map((sec, idx) => {
                const Icon = sec.icon;
                const isActive = activeTab === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => handleSelectSubTab(sec.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group cursor-pointer ${
                      isActive
                        ? 'bg-red-600/15 text-white border border-red-500/40 shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900/60 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className={`text-[10px] font-mono font-bold w-4 text-center shrink-0 ${isActive ? 'text-red-500' : 'text-slate-600 group-hover:text-slate-400'}`}>
                        {idx + 1}
                      </span>
                      <Icon size={14} className={isActive ? 'text-red-500 shrink-0' : 'text-slate-500 group-hover:text-slate-300 shrink-0'} />
                      <span className="truncate">{sec.name}</span>
                    </div>

                    {isActive ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-sm shadow-red-500" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Quick Actions */}
        <div className="p-4 border-t border-slate-800/80 space-y-2.5 bg-slate-950/30">
          {unsavedChanges && (
            <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 text-[11px] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
              <span className="font-bold truncate">Unsaved changes pending</span>
            </div>
          )}

          <a
            href={viewLiveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 text-slate-200 hover:text-white text-xs font-bold transition-all group cursor-pointer shadow-sm"
          >
            <div className="flex items-center gap-2">
              <ExternalLink size={14} className="text-red-500 group-hover:scale-110 transition-transform" />
              <span>Open {liveLabel} Page</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
              :5173
            </span>
          </a>

          <div className="flex items-center justify-between px-1 text-[10px] text-slate-500 font-mono">
            <span>NB Corp CMS</span>
            <span>v1.2.0</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
