import React from 'react';
import { Layout, Sparkles } from 'lucide-react';

const HeroEditor = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      {/* Section Header & Active Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900/60 border border-slate-800 rounded-2xl">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layout size={18} className="text-red-500" />
            Hero Section Configuration
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure the main banner headline, highlight styling, subtitle, and CTA actions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-400">Section Status:</span>
          <button
            type="button"
            onClick={() => handleChange('isActive', !data.isActive)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              data.isActive
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-sm'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${data.isActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
            {data.isActive ? 'Active on Frontend' : 'Hidden'}
          </button>
        </div>
      </div>

      {/* Main Full-Width Form */}
      <div className="space-y-6">
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
            <Sparkles size={14} /> Headline & Typography
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Main Heading Text
              </label>
              <input
                type="text"
                value={data.heading || ''}
                onChange={(e) => handleChange('heading', e.target.value)}
                placeholder="e.g. Absolute"
                className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl px-4 py-2.5 text-sm text-white transition-all outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Highlight Word / Phrase (Red Italic)
              </label>
              <input
                type="text"
                value={data.highlight || ''}
                onChange={(e) => handleChange('highlight', e.target.value)}
                placeholder="e.g. Precision"
                className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl px-4 py-2.5 text-sm text-white transition-all outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Badge / Tagline
              </label>
              <input
                type="text"
                value={data.badge || ''}
                onChange={(e) => handleChange('badge', e.target.value)}
                placeholder="e.g. 3M Authorized Industrial Converter & Distributor"
                className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white transition-all outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Background Giant Watermark Text
              </label>
              <input
                type="text"
                value={data.watermark || ''}
                onChange={(e) => handleChange('watermark', e.target.value)}
                placeholder="e.g. PRECISION"
                className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white font-mono uppercase transition-all outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Subtitle Description
            </label>
            <textarea
              rows={3}
              value={data.subtitle || ''}
              onChange={(e) => handleChange('subtitle', e.target.value)}
              placeholder="Detailed description under the headline..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl p-4 text-sm text-white transition-all outline-none resize-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-red-400">
            Call to Action Buttons
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Primary Button Text
              </label>
              <input
                type="text"
                value={data.primaryCtaText || ''}
                onChange={(e) => handleChange('primaryCtaText', e.target.value)}
                placeholder="e.g. Explore Catalog"
                className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Primary Button Link
              </label>
              <input
                type="text"
                value={data.primaryCtaLink || ''}
                onChange={(e) => handleChange('primaryCtaLink', e.target.value)}
                placeholder="e.g. /products"
                className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white font-mono outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Secondary Button Text
              </label>
              <input
                type="text"
                value={data.secondaryCtaText || ''}
                onChange={(e) => handleChange('secondaryCtaText', e.target.value)}
                placeholder="e.g. Request Quote"
                className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Secondary Button Link
              </label>
              <input
                type="text"
                value={data.secondaryCtaLink || ''}
                onChange={(e) => handleChange('secondaryCtaLink', e.target.value)}
                placeholder="e.g. /contact"
                className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white font-mono outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroEditor;
