import React, { useState, useEffect } from 'react';
import HeroEditor from '../components/editors/HeroEditor';
import PrinciplesEditor from '../components/editors/PrinciplesEditor';
import WhyChooseUsEditor from '../components/editors/WhyChooseUsEditor';
import ApplicationsEditor from '../components/editors/ApplicationsEditor';
import TestimonialsEditor from '../components/editors/TestimonialsEditor';
import FeaturedProductsEditor from '../components/editors/FeaturedProductsEditor';
import BrandsEditor from '../components/editors/BrandsEditor';
import ImpactEditor from '../components/editors/ImpactEditor';
import { 
  fetchHomeContent, 
  saveFullHomeContent, 
  resetHomeToDefault, 
  DEFAULT_HOME_DATA 
} from '../services/api';
import { 
  Layout, Shield, Layers, Cpu, Quote, 
  Package, Globe2, TrendingUp, Sparkles, CheckCircle2 
} from 'lucide-react';

const TABS = [
  { id: 'hero', name: 'Hero Banner', icon: Layout },
  { id: 'principles', name: 'Principles', icon: Shield },
  { id: 'whyChooseUs', name: 'Why Choose Us', icon: Layers },
  { id: 'applications', name: 'Applications', icon: Cpu },
  { id: 'testimonials', name: 'Testimonials', icon: Quote },
  { id: 'featuredProducts', name: 'Featured 3M', icon: Package },
  { id: 'brands', name: 'Industries Served', icon: Globe2 },
  { id: 'impact', name: 'Impact & Goals', icon: TrendingUp },
];

const HomeManager = ({ 
  activeTab, 
  setActiveTab, 
  onShowToast, 
  setIsOnline, 
  setUnsavedChanges 
}) => {
  const [content, setContent] = useState(DEFAULT_HOME_DATA);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Load content from backend
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchHomeContent();
      setContent(data);
      setIsOnline(true);
    } catch (err) {
      console.error('Error fetching home content:', err);
      setContent(DEFAULT_HOME_DATA);
      setIsOnline(false);
    } finally {
      setLoading(false);
      setHasChanges(false);
      setUnsavedChanges(false);
    }
  };

  const handleSectionUpdate = (sectionKey, updatedSectionData) => {
    setContent((prev) => ({
      ...prev,
      [sectionKey]: updatedSectionData
    }));
    setHasChanges(true);
    setUnsavedChanges(true);
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      await saveFullHomeContent(content);
      setHasChanges(false);
      setUnsavedChanges(false);
      onShowToast({
        type: 'success',
        message: 'Home section updated successfully!'
      });
    } catch (err) {
      onShowToast({
        type: 'error',
        message: 'Failed to save to server: ' + (err.response?.data?.msg || err.message)
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm('Reset all Home Section content back to official factory defaults?')) {
      return;
    }
    setIsSaving(true);
    try {
      await resetHomeToDefault();
      setContent(DEFAULT_HOME_DATA);
      setHasChanges(false);
      setUnsavedChanges(false);
      onShowToast({
        type: 'info',
        message: 'Home section reset to default content.'
      });
    } catch (err) {
      setContent(DEFAULT_HOME_DATA);
      setHasChanges(false);
      setUnsavedChanges(false);
      onShowToast({
        type: 'info',
        message: 'Reset locally to default content.'
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-semibold text-slate-400 font-mono">
          Loading Home Section Content...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Sub-tabs Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800/80 no-scrollbar">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-red-600 text-white shadow-lg shadow-red-950/60'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-850 border border-slate-800'
              }`}
            >
              <Icon size={14} />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Sub-section Editor View */}
      <div className="transition-all duration-300">
        {activeTab === 'hero' && (
          <HeroEditor
            data={content.hero || DEFAULT_HOME_DATA.hero}
            onChange={(data) => handleSectionUpdate('hero', data)}
          />
        )}

        {activeTab === 'principles' && (
          <PrinciplesEditor
            data={content.principles || DEFAULT_HOME_DATA.principles}
            onChange={(data) => handleSectionUpdate('principles', data)}
          />
        )}

        {activeTab === 'whyChooseUs' && (
          <WhyChooseUsEditor
            data={content.whyChooseUs || DEFAULT_HOME_DATA.whyChooseUs}
            onChange={(data) => handleSectionUpdate('whyChooseUs', data)}
          />
        )}

        {activeTab === 'applications' && (
          <ApplicationsEditor
            data={content.applications || DEFAULT_HOME_DATA.applications}
            onChange={(data) => handleSectionUpdate('applications', data)}
          />
        )}

        {activeTab === 'testimonials' && (
          <TestimonialsEditor
            data={content.testimonials || DEFAULT_HOME_DATA.testimonials}
            onChange={(data) => handleSectionUpdate('testimonials', data)}
          />
        )}

        {activeTab === 'featuredProducts' && (
          <FeaturedProductsEditor
            data={content.featuredProducts || DEFAULT_HOME_DATA.featuredProducts}
            onChange={(data) => handleSectionUpdate('featuredProducts', data)}
          />
        )}

        {activeTab === 'brands' && (
          <BrandsEditor
            data={content.brands || DEFAULT_HOME_DATA.brands}
            onChange={(data) => handleSectionUpdate('brands', data)}
          />
        )}

        {activeTab === 'impact' && (
          <ImpactEditor
            data={content.impact || DEFAULT_HOME_DATA.impact}
            onChange={(data) => handleSectionUpdate('impact', data)}
          />
        )}
      </div>

      {/* Floating Save Trigger for long pages */}
      {hasChanges && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 bg-slate-900/95 border border-red-500/40 backdrop-blur-xl px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-4 animate-bounce-in">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-xs font-bold text-white">You have unsaved changes</span>
          </div>

          <button
            type="button"
            disabled={isSaving}
            onClick={handleSaveAll}
            className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            {isSaving ? 'Saving...' : 'Save Now'}
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeManager;
