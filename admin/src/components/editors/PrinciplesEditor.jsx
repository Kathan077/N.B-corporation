import React, { useState } from 'react';
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, Shield, Eye, Check, X } from 'lucide-react';
import IconPicker, { DynamicIcon } from '../IconPicker';

const PrinciplesEditor = ({ data, onChange }) => {
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    icon: 'Shield',
    title: '',
    description: '',
    isActive: true
  });

  const handleHeaderChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      id: `principle-${Date.now()}`,
      icon: 'Shield',
      title: '',
      description: '',
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
    if (!formData.title.trim()) return;

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
    if (window.confirm('Are you sure you want to delete this principle card?')) {
      const updatedItems = (data.items || []).filter((it) => it.id !== id);
      onChange({
        ...data,
        items: updatedItems
      });
    }
  };

  const moveItem = (index, direction) => {
    const items = [...(data.items || [])];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const temp = items[index];
    items[index] = items[targetIndex];
    items[targetIndex] = temp;

    // re-assign orders
    items.forEach((it, idx) => {
      it.order = idx + 1;
    });

    onChange({
      ...data,
      items
    });
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
    <div className="space-y-8">
      {/* Section Header & Active Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900/60 border border-slate-800 rounded-2xl">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Shield size={18} className="text-red-500" />
            Principles Section Manager
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage your company principles, core values, icons, and descriptions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleHeaderChange('isActive', !data.isActive)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
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

      {/* Section Headline Config */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-red-400">
          Section Titles & Header
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Section Title
            </label>
            <input
              type="text"
              value={data.title || ''}
              onChange={(e) => handleHeaderChange('title', e.target.value)}
              placeholder="e.g. The Principles"
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Highlight Accent
            </label>
            <input
              type="text"
              value={data.highlight || ''}
              onChange={(e) => handleHeaderChange('highlight', e.target.value)}
              placeholder="e.g. That Define Mastery"
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Background Watermark
            </label>
            <input
              type="text"
              value={data.watermark || ''}
              onChange={(e) => handleHeaderChange('watermark', e.target.value)}
              placeholder="e.g. SYSTEMS"
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white font-mono uppercase outline-none"
            />
          </div>
        </div>
      </div>

      {/* Principles Cards List Header + Add Button */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white">
              Principle Cards ({data.items?.length || 0})
            </h4>
            <p className="text-xs text-slate-400">
              Add, edit, reorder or toggle visibility of individual principle cards.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors shadow-lg shadow-red-950/40"
          >
            <Plus size={15} /> Add New Principle
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(data.items || []).map((item, index) => (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                item.isActive !== false
                  ? 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  : 'bg-slate-950/40 border-slate-900 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-500/20 text-red-400 flex items-center justify-center">
                    <DynamicIcon name={item.icon} size={20} />
                  </div>
                </div>

                <h5 className="text-sm font-bold text-white mb-2 leading-snug uppercase tracking-tight line-clamp-2">
                  {item.title}
                </h5>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-4">
                  {item.description}
                </p>
              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => toggleItemActive(item.id)}
                  className={`text-[11px] font-semibold flex items-center gap-1 ${
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
                    className="p-1.5 text-slate-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Edit Card"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-1.5 text-slate-300 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
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

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Shield size={16} className="text-red-500" />
                {editingItem ? 'Edit Principle Card' : 'Add New Principle Card'}
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
                label="Choose Principle Icon"
              />

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Principle Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. UNCOMPROMISING PRODUCT QUALITY"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Principle Description
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Explain the principle in detail..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl p-4 text-sm text-white outline-none resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="principleActive"
                  checked={formData.isActive !== false}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded bg-slate-950 border-slate-800 text-red-600 focus:ring-red-500 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="principleActive" className="text-xs text-slate-300 font-medium cursor-pointer">
                  Display this principle on the frontend
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
                  {editingItem ? 'Update Principle' : 'Create Principle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrinciplesEditor;
