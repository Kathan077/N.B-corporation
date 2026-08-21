import React from 'react';
import { Save, RotateCcw, Loader2 } from 'lucide-react';

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
  catalog: 'Full 3M™ Product Catalog & Inventory'
};

const Header = ({ 
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

  return (
    <header className="sticky top-0 z-30 bg-[#070A10]/90 backdrop-blur-md border-b border-slate-800/80 px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-0.5">
          <span className="text-red-500 font-mono font-bold uppercase">
            {moduleName}
          </span>
          <span>/</span>
          <span className="text-slate-200 capitalize">{activeTab}</span>
        </div>
        <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
          {TAB_TITLES[activeTab] || 'Catalog & Section Editor'}
        </h2>
      </div>

      {activePage !== 'products' && (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onReset}
            className="px-4 py-2.5 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-850 text-slate-400 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
            title="Reset to factory default content"
          >
            <RotateCcw size={14} />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>

          <button
            type="button"
            disabled={isSaving}
            onClick={onSave}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-2 transition-all shadow-lg cursor-pointer ${
              unsavedChanges
                ? 'bg-red-600 hover:bg-red-700 shadow-red-950/60 animate-pulse'
                : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-950/60'
            }`}
          >
            {isSaving ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <Save size={14} />
                <span>{unsavedChanges ? 'Save Changes' : 'All Saved'}</span>
              </>
            )}
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
