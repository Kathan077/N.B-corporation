import React from 'react';
import { Package } from 'lucide-react';

const FeaturedProductsEditor = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      {/* Header & Active Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900/60 border border-slate-800 rounded-2xl">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Package size={18} className="text-red-500" />
            Featured 3M Products Section
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure the section title, authorized banner, and catalog showcase button.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleChange('isActive', !data.isActive)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              data.isActive
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${data.isActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
            {data.isActive ? 'Section Active' : 'Section Hidden'}
          </button>
        </div>
      </div>

      {/* Main Full-Width Form */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
        <h4 className="text-xs font-bold uppercase tracking-wider text-red-400">
          Section Title & Labels
        </h4>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Top Badge Text
          </label>
          <input
            type="text"
            value={data.eyebrow || ''}
            onChange={(e) => handleChange('eyebrow', e.target.value)}
            placeholder="e.g. Official 3M Authorised Lineup"
            className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Heading Title
            </label>
            <input
              type="text"
              value={data.heading || ''}
              onChange={(e) => handleChange('heading', e.target.value)}
              placeholder="e.g. Featured"
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Accent Text (Red Italic)
            </label>
            <input
              type="text"
              value={data.highlight || ''}
              onChange={(e) => handleChange('highlight', e.target.value)}
              placeholder="e.g. 3M Solutions"
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Catalog Button Text
            </label>
            <input
              type="text"
              value={data.buttonText || ''}
              onChange={(e) => handleChange('buttonText', e.target.value)}
              placeholder="e.g. View Full Catalog"
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Max Display Count
            </label>
            <input
              type="number"
              min="1"
              max="24"
              value={data.maxCount || 8}
              onChange={(e) => handleChange('maxCount', parseInt(e.target.value) || 8)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white font-mono outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductsEditor;
