import React, { useState } from 'react';
import { Award, Plus, Edit2, Trash2, X, Check, ShieldCheck, Users, Boxes } from 'lucide-react';
import IconPicker, { DynamicIcon } from '../IconPicker';

const AboutStatsEditor = ({ data = {}, onChange }) => {
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    value: '',
    label: '',
    detail: '',
    icon: 'Award',
    isActive: true
  });

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      id: `stat-${Date.now()}`,
      value: '',
      label: '',
      detail: '',
      icon: 'Award',
      isActive: true
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleSaveItem = (e) => {
    e.preventDefault();
    if (!formData.value.trim() || !formData.label.trim()) return;

    let updatedItems = [...(data.items || [])];

    if (editingItem) {
      updatedItems = updatedItems.map((it) => (it.id === editingItem.id ? { ...formData } : it));
    } else {
      updatedItems.push({
        ...formData,
        order: updatedItems.length + 1
      });
    }

    onChange({
      ...data,
      items: updatedItems
    });
    setIsModalOpen(false);
  };

  const handleDeleteItem = (id) => {
    if (window.confirm('Delete this key highlight metric card?')) {
      const updatedItems = (data.items || []).filter((it) => it.id !== id);
      onChange({
        ...data,
        items: updatedItems
      });
    }
  };

  const toggleItemActive = (id) => {
    const updatedItems = (data.items || []).map((it) => {
      if (it.id === id) {
        return { ...it, isActive: !it.isActive };
      }
      return it;
    });
    onChange({
      ...data,
      items: updatedItems
    });
  };

  return (
    <div className="space-y-6">
      {/* Header & Active Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900/60 border border-slate-800 rounded-2xl">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Award size={18} className="text-red-500" />
            Key Statistics & Highlights Strip
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage the highlight metric cards shown under the hero section.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onChange({ ...data, isActive: !data.isActive })}
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

      {/* Cards List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white">
              Highlight Cards ({data.items?.length || 0})
            </h4>
            <p className="text-xs text-slate-400">
              Numbers, credentials, client count, and product count.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-lg shadow-red-950/40"
          >
            <Plus size={15} /> Add Stat Card
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(data.items || []).map((item) => (
            <div
              key={item.id}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                item.isActive !== false
                  ? 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  : 'bg-slate-950/40 border-slate-900 opacity-60'
              }`}
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-red-600/15 border border-red-500/30 text-red-400 flex items-center justify-center mb-4">
                  <DynamicIcon name={item.icon} size={20} />
                </div>

                <div className="text-3xl font-black text-white tracking-tight mb-1">
                  {item.value}
                </div>

                <h5 className="text-sm font-bold text-slate-200 mb-1">
                  {item.label}
                </h5>

                <p className="text-xs text-slate-400 font-mono">
                  {item.detail}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => toggleItemActive(item.id)}
                  className={`text-[11px] font-semibold flex items-center gap-1 cursor-pointer ${
                    item.isActive !== false ? 'text-emerald-400' : 'text-slate-500'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${item.isActive !== false ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                  {item.isActive !== false ? 'Active' : 'Hidden'}
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => openEditModal(item)}
                    className="p-1.5 text-slate-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                    title="Edit Card"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-1.5 text-slate-300 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                    title="Delete Card"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Award size={16} className="text-red-500" />
                {editingItem ? 'Edit Stat Card' : 'Add Stat Card'}
              </h4>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="space-y-4">
              <IconPicker
                selected={formData.icon}
                onChange={(icon) => setFormData({ ...formData, icon })}
                label="Choose Stat Icon"
              />

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Big Stat Value
                </label>
                <input
                  type="text"
                  required
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  placeholder="e.g. 20+ or 3M™ or 1,000+"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white font-bold outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Stat Label Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  placeholder="e.g. Years of Experience"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Detail / Subtitle Text
                </label>
                <input
                  type="text"
                  value={formData.detail}
                  onChange={(e) => setFormData({ ...formData, detail: e.target.value })}
                  placeholder="e.g. Established in 2006"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="statActive"
                  checked={formData.isActive !== false}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded bg-slate-950 border-slate-800 text-red-600 focus:ring-red-500 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="statActive" className="text-xs text-slate-300 font-medium cursor-pointer">
                  Display this stat on the frontend
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white transition-colors flex items-center gap-1.5 shadow-lg shadow-red-950/40"
                >
                  <Check size={14} />
                  {editingItem ? 'Update Stat' : 'Create Stat'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutStatsEditor;
