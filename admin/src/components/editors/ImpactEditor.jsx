import React from 'react';
import { TrendingUp } from 'lucide-react';

const ImpactEditor = ({ data, onChange }) => {
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
            <TrendingUp size={18} className="text-red-500" />
            Impact & Metrics Section Manager
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure the bottom impact statement, percentage reduction/increase metrics, and CTA button.
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
          Impact Statement & Tagline
        </h4>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Top Tagline
          </label>
          <input
            type="text"
            value={data.tagline || ''}
            onChange={(e) => handleChange('tagline', e.target.value)}
            placeholder="e.g. We Can Help You"
            className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Cost Reduction (%)
            </label>
            <input
              type="text"
              value={data.costReduction || '20%'}
              onChange={(e) => handleChange('costReduction', e.target.value)}
              placeholder="e.g. 20%"
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white font-mono outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Efficiency Increase (%)
            </label>
            <input
              type="text"
              value={data.efficiencyIncrease || '30%'}
              onChange={(e) => handleChange('efficiencyIncrease', e.target.value)}
              placeholder="e.g. 30%"
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white font-mono outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Quality & Lifespan (%)
            </label>
            <input
              type="text"
              value={data.qualityIncrease || '40%'}
              onChange={(e) => handleChange('qualityIncrease', e.target.value)}
              placeholder="e.g. 40%"
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white font-mono outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Action Button Text
            </label>
            <input
              type="text"
              value={data.buttonText || ''}
              onChange={(e) => handleChange('buttonText', e.target.value)}
              placeholder="e.g. Contact Now"
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Action Button Link
            </label>
            <input
              type="text"
              value={data.buttonLink || ''}
              onChange={(e) => handleChange('buttonLink', e.target.value)}
              placeholder="e.g. /contact"
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white font-mono outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactEditor;
