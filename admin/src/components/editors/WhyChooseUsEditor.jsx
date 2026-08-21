import React, { useState } from 'react';
import { Layers, Plus, Trash2, Edit2, Check, X, ChevronRight, Image as ImageIcon } from 'lucide-react';

const WhyChooseUsEditor = ({ data, onChange }) => {
  const [newFeatureText, setNewFeatureText] = useState('');
  const [editingFeatureIndex, setEditingFeatureIndex] = useState(null);
  const [editingFeatureText, setEditingFeatureText] = useState('');

  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const handleAddFeature = (e) => {
    e.preventDefault();
    if (!newFeatureText.trim()) return;
    const features = [...(data.features || []), newFeatureText.trim()];
    handleChange('features', features);
    setNewFeatureText('');
  };

  const handleStartEditFeature = (index) => {
    setEditingFeatureIndex(index);
    setEditingFeatureText(data.features[index]);
  };

  const handleSaveEditFeature = (index) => {
    if (!editingFeatureText.trim()) return;
    const features = [...(data.features || [])];
    features[index] = editingFeatureText.trim();
    handleChange('features', features);
    setEditingFeatureIndex(null);
    setEditingFeatureText('');
  };

  const handleDeleteFeature = (index) => {
    const features = (data.features || []).filter((_, i) => i !== index);
    handleChange('features', features);
  };

  return (
    <div className="space-y-6">
      {/* Section Header & Active Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900/60 border border-slate-800 rounded-2xl">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers size={18} className="text-red-500" />
            Why Choose Us Section Configuration
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure the 18+ years experience narrative, visual image, and bullet points.
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
      <div className="space-y-6">
        {/* Headings */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-red-400">
            Headings & Narrative
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
                placeholder="e.g. Operational Supremacy"
                className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Title
              </label>
              <input
                type="text"
                value={data.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="e.g. Why"
                className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Highlight (Red Italic)
              </label>
              <input
                type="text"
                value={data.highlight || ''}
                onChange={(e) => handleChange('highlight', e.target.value)}
                placeholder="e.g. Choose Us"
                className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Description Story
            </label>
            <textarea
              rows={4}
              value={data.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Narrative about your 18+ years experience and partnership..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl p-4 text-sm text-white outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <ImageIcon size={14} className="text-red-400" />
                Featured Image URL
              </label>
              <input
                type="text"
                value={data.imageUrl || ''}
                onChange={(e) => handleChange('imageUrl', e.target.value)}
                placeholder="https://..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white font-mono outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Background Giant Watermark
              </label>
              <input
                type="text"
                value={data.watermark || ''}
                onChange={(e) => handleChange('watermark', e.target.value)}
                placeholder="e.g. MASTERY"
                className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white font-mono uppercase outline-none"
              />
            </div>
          </div>
        </div>

        {/* Bullet Points Management */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-red-400">
              Key Features / Bullet Points ({data.features?.length || 0})
            </h4>
          </div>

          {/* Add bullet input */}
          <form onSubmit={handleAddFeature} className="flex gap-3">
            <input
              type="text"
              value={newFeatureText}
              onChange={(e) => setNewFeatureText(e.target.value)}
              placeholder="Add a new bullet point (e.g. Consistent performance in extreme conditions)..."
              className="flex-1 bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer shadow-lg shadow-red-950/40"
            >
              <Plus size={15} /> Add Point
            </button>
          </form>

          {/* List of features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {(data.features || []).map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-3 p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-xl group hover:border-slate-700 transition-all"
              >
                {editingFeatureIndex === idx ? (
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      type="text"
                      autoFocus
                      value={editingFeatureText}
                      onChange={(e) => setEditingFeatureText(e.target.value)}
                      className="flex-1 bg-slate-900 border border-red-500 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleSaveEditFeature(idx)}
                      className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg cursor-pointer"
                      title="Save"
                    >
                      <Check size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingFeatureIndex(null)}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg cursor-pointer"
                      title="Cancel"
                    >
                      <X size={13} />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2.5 flex-1 min-w-0">
                      <div className="w-6 h-6 rounded-md bg-red-600/10 text-red-500 flex items-center justify-center shrink-0">
                        <ChevronRight size={14} />
                      </div>
                      <span className="text-xs text-slate-200 truncate">{feature}</span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleStartEditFeature(idx)}
                        className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteFeature(idx)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUsEditor;
