import React from 'react';
import { Target, Eye, BookOpen, CheckCircle2 } from 'lucide-react';

const AboutStoryMissionEditor = ({ data = {}, onChange }) => {
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
            <BookOpen size={18} className="text-red-500" />
            Company Overview, Story & Mission/Vision
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure the 2006 establishment story, converting capabilities, Mission, and Vision statements.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleChange('isActive', !data.isActive)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              data.isActive !== false
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${data.isActive !== false ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
            {data.isActive !== false ? 'Section Active' : 'Section Hidden'}
          </button>
        </div>
      </div>

      {/* Main Full-Width Form */}
      <div className="space-y-6">
        {/* Story Headlines & Text */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-red-400">
            Company Story Narrative
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Eyebrow Tag
              </label>
              <input
                type="text"
                value={data.eyebrow || ''}
                onChange={(e) => handleChange('eyebrow', e.target.value)}
                placeholder="e.g. Company Overview"
                className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Heading Title
              </label>
              <input
                type="text"
                value={data.heading || ''}
                onChange={(e) => handleChange('heading', e.target.value)}
                placeholder="e.g. Who We Are & What We Do"
                className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Story Box Headline
              </label>
              <input
                type="text"
                value={data.storyTitle || ''}
                onChange={(e) => handleChange('storyTitle', e.target.value)}
                placeholder="e.g. Two Decades of Excellence (Est. 2006)"
                className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Primary Narrative Story
              </label>
              <textarea
                rows={4}
                value={data.storyText || ''}
                onChange={(e) => handleChange('storyText', e.target.value)}
                placeholder="NB Corporation, established in 2006..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl p-4 text-sm text-white outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Secondary Supporting Text
              </label>
              <textarea
                rows={4}
                value={data.storySubtext || ''}
                onChange={(e) => handleChange('storySubtext', e.target.value)}
                placeholder="Driven by precision engineering, customer satisfaction..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl p-4 text-sm text-white outline-none resize-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-red-400">Feature 1 Highlight</span>
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Title</label>
                <input
                  type="text"
                  value={data.feature1Title || ''}
                  onChange={(e) => handleChange('feature1Title', e.target.value)}
                  placeholder="e.g. Custom Slitting & Converting"
                  className="w-full bg-slate-900 border border-slate-800 focus:border-red-500 rounded-lg px-3 py-2 text-xs text-white outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Text</label>
                <input
                  type="text"
                  value={data.feature1Text || ''}
                  onChange={(e) => handleChange('feature1Text', e.target.value)}
                  placeholder="e.g. Tailored widths from 10mm to 1200mm master rolls."
                  className="w-full bg-slate-900 border border-slate-800 focus:border-red-500 rounded-lg px-3 py-2 text-xs text-white outline-none"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-red-400">Feature 2 Highlight</span>
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Title</label>
                <input
                  type="text"
                  value={data.feature2Title || ''}
                  onChange={(e) => handleChange('feature2Title', e.target.value)}
                  placeholder="e.g. Pan-India Industrial Logistics"
                  className="w-full bg-slate-900 border border-slate-800 focus:border-red-500 rounded-lg px-3 py-2 text-xs text-white outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Text</label>
                <input
                  type="text"
                  value={data.feature2Text || ''}
                  onChange={(e) => handleChange('feature2Text', e.target.value)}
                  placeholder="e.g. Rapid dispatch for zero production downtime."
                  className="w-full bg-slate-900 border border-slate-800 focus:border-red-500 rounded-lg px-3 py-2 text-xs text-white outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision Statements */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
              <Target size={15} /> Mission Statement Card
            </h4>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Mission Title</label>
              <input
                type="text"
                value={data.missionTitle || 'Our Mission'}
                onChange={(e) => handleChange('missionTitle', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Mission Text</label>
              <textarea
                rows={4}
                value={data.missionText || ''}
                onChange={(e) => handleChange('missionText', e.target.value)}
                placeholder="To provide high-quality 3M™ adhesive tape solutions..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl p-4 text-sm text-white outline-none resize-none"
              />
            </div>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
              <Eye size={15} /> Vision Statement Card
            </h4>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Vision Title</label>
              <input
                type="text"
                value={data.visionTitle || 'Our Vision'}
                onChange={(e) => handleChange('visionTitle', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Vision Text</label>
              <textarea
                rows={4}
                value={data.visionText || ''}
                onChange={(e) => handleChange('visionText', e.target.value)}
                placeholder="To be India’s most trusted and innovative provider..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl p-4 text-sm text-white outline-none resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutStoryMissionEditor;
