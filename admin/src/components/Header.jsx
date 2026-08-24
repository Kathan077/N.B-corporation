import React from 'react';
import { Save, RotateCcw, Loader2, Menu } from 'lucide-react';

const TAB_TITLES = {
  // Home
  hero: 'Hero Banner Section',
  principles: 'Company Principles (6 Pillars)',
  whyChooseUs: 'Why Choose Us (18+ Years Experience)',
  applications: 'Industrial Applications & Use Cases',
  testimonials: 'Client Reviews & Endorsements',
  featuredProducts: 'Featured 3M Product Lineup',
  brands: 'Industries & Enterprise Brands Served',
  impact: 'Cost & Efficiency Impact Goals',
  // About
  aboutHero: 'About Banner & Hero Story',
  aboutStats: 'Key Highlight Metrics (20+ Years, 40,000+ Products)',
  aboutStory: 'Corporate Overview, Mission & Vision',
  aboutIndustries: '9 Industries We Power',
  aboutCategories: '21 Core Product Categories',
  aboutPillarsValues: 'Strategic Pillars & Core Values',
  aboutContact: 'Headquarters & Direct Hotlines',
  // Products
  catalog: 'Full 3M™ Product Catalog & Inventory',
  // Blogs
  blogHero: 'Blog Hero & Featured Showcase Section',
  blogSlider: 'Live Stream Ticker & Slider Section',
  blogPosts: 'Technical Articles & Knowledge Base',
  // Contact
  contactHero: 'Contact Info, Hotlines & Facility Details',
  contactFaqs: 'Frequently Asked Questions & Answers',
  contactInquiries: 'Customer Inquiries & RFQs CRM Inbox'
};

const Header = ({
  onToggleSidebar,
  activePage = 'home',
  activeTab,
  onSave,
  onReset,
  isSaving,
  unsavedChanges
}) => {
  let moduleName = 'HOME PAGE CMS';
  if (activePage === 'about') moduleName = 'ABOUT PAGE CMS';
  if (activePage === 'products') moduleName = 'PRODUCT INVENTORY CMS';
  if (activePage === 'blogs') moduleName = 'BLOG & KNOWLEDGE CMS';
  if (activePage === 'contact') moduleName = 'CONTACT & RFQ CMS';

  const isCollectionModule = activePage === 'products' || activePage === 'blogs' || activeTab === 'contactInquiries';

  return (
    <header className="sticky top-0 z-30 bg-[#070A10]/95 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile Sidebar Hamburger Toggle */}
        <button
          type="button"
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-850 shrink-0 cursor-pointer shadow-sm"
          title="Toggle Navigation Menu"
        >
          <Menu size={18} />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 mb-0.5 truncate">
            <span className="text-red-500 font-mono font-bold uppercase truncate">
              {moduleName}
            </span>
            <span>/</span>
            <span className="text-slate-300 capitalize truncate">{activeTab}</span>
          </div>
          <h2 className="text-sm sm:text-lg font-black text-white uppercase tracking-tight truncate">
            {TAB_TITLES[activeTab] || 'Section & Content Editor'}
          </h2>
        </div>
      </div>

      {!isCollectionModule && (
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onReset}
            className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-850 text-slate-400 hover:text-white text-xs font-semibold flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer"
            title="Reset to factory default content"
          >
            <RotateCcw size={14} />
            <span className="hidden md:inline">Reset Defaults</span>
          </button>

          <button
            type="button"
            disabled={isSaving}
            onClick={onSave}
            className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 sm:gap-2 transition-all shadow-lg cursor-pointer shrink-0 ${
              unsavedChanges
                ? 'bg-red-600 hover:bg-red-700 shadow-red-950/60 animate-pulse'
                : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-950/60'
            }`}
          >
            {isSaving ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span className="hidden xs:inline">Saving...</span>
              </>
            ) : (
              <>
                <Save size={14} />
                <span>{unsavedChanges ? 'Save' : 'Saved'}</span>
              </>
            )}
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
