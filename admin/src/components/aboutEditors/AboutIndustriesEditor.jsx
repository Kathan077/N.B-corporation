import React, { useState } from 'react';
import { Factory, Plus, Edit2, Trash2, X, Check } from 'lucide-react';
import IconPicker, { DynamicIcon } from '../IconPicker';

const AboutIndustriesEditor = ({ data = {}, onChange }) => {
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    icon: 'Factory',
    borderColor: 'border-red-500/30',
    items: '',
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
      id: `ind-${Date.now()}`,
      name: '',
      icon: 'Factory',
      borderColor: 'border-red-500/30',
      items: '',
      isActive: true
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      ...item,
      items: Array.isArray(item.items) ? item.items.join('\n') : item.items || ''
    });
    setIsModalOpen(true);
  };

  const handleSaveItem = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const itemsArray = formData.items
      .split('\n')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const itemToSave = {
      ...formData,
      items: itemsArray
    };

    let updatedItems = [...(data.items || [])];

    if (editingItem) {
      updatedItems = updatedItems.map((it) => (it.id === editingItem.id ? { ...itemToSave } : it));
    } else {
      updatedItems.push({
        ...itemToSave,
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
    if (window.confirm('Delete this industry sector card?')) {
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
            <Factory size={18} className="text-red-500" />
            Industries We Power (Brochure Sectors)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure the 9 core industry sectors and their 3M solution bullet lists.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleHeaderChange('isActive', !data.isActive)}
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

      {/* Headings */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-red-400">
          Section Headings
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Eyebrow Tag
            </label>
            <input
              type="text"
              value={data.eyebrow || ''}
              onChange={(e) => handleHeaderChange('eyebrow', e.target.value)}
              placeholder="e.g. Comprehensive Applications"
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
              onChange={(e) => handleHeaderChange('heading', e.target.value)}
              placeholder="e.g. Industries We Power"
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Subheading Description
          </label>
          <input
            type="text"
            value={data.subheading || ''}
            onChange={(e) => handleHeaderChange('subheading', e.target.value)}
            placeholder="e.g. Providing application-engineered 3M™ solutions..."
            className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
          />
        </div>
      </div>

      {/* Cards List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white">
              Industry Sector Cards ({data.items?.length || 0})
            </h4>
            <p className="text-xs text-slate-400">
              Manage sectors (Construction, Automotive, Industrial, Healthcare, etc.).
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-lg shadow-red-950/40"
          >
            <Plus size={15} /> Add Industry Sector
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {(data.items || []).map((item, idx) => (
            <div
              key={item.id}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                item.isActive !== false
                  ? 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  : 'bg-slate-950/40 border-slate-900 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-600/10 border border-red-500/30 text-red-400 flex items-center justify-center">
                    <DynamicIcon name={item.icon} size={22} />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">
                    Sector 0{idx + 1}
                  </span>
                </div>

                <h5 className="text-base font-bold text-white mb-3">
                  {item.name}
                </h5>

                <ul className="space-y-1.5 mb-4">
                  {(item.items || []).map((bullet, bIdx) => (
                    <li key={bIdx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
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
                    title="Edit Sector"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-1.5 text-slate-300 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                    title="Delete Sector"
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
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Factory size={16} className="text-red-500" />
                {editingItem ? 'Edit Industry Sector' : 'Add Industry Sector'}
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
                label="Choose Sector Icon"
              />

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Sector / Industry Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Construction & Architecture"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Supplied Products (one per line)
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.items}
                  onChange={(e) => setFormData({ ...formData, items: e.target.value })}
                  placeholder="Sun control window films (PR 70)&#10;VHB structural bonding tape&#10;Waterproofing sealants"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl p-4 text-xs text-white outline-none resize-none font-mono"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="indActive"
                  checked={formData.isActive !== false}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded bg-slate-950 border-slate-800 text-red-600 focus:ring-red-500 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="indActive" className="text-xs text-slate-300 font-medium cursor-pointer">
                  Display this sector on the frontend
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
                  {editingItem ? 'Update Sector' : 'Create Sector'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutIndustriesEditor;
