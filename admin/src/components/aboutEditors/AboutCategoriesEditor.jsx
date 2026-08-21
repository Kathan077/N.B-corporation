import React, { useState } from 'react';
import { Boxes, Plus, Edit2, Trash2, X, Check, Search } from 'lucide-react';

const AboutCategoriesEditor = ({ data = {}, onChange }) => {
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterSearch, setFilterSearch] = useState('');
  const [formData, setFormData] = useState({
    id: '',
    num: '',
    name: '',
    desc: '',
    isActive: true
  });

  const handleHeaderChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const openAddModal = () => {
    const nextNum = String((data.items?.length || 0) + 1).padStart(2, '0');
    setEditingItem(null);
    setFormData({
      id: `cat-${Date.now()}`,
      num: nextNum,
      name: '',
      desc: '',
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
    if (!formData.name.trim()) return;

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
    if (window.confirm('Delete this product category item?')) {
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

  const filteredItems = (data.items || []).filter((it) => {
    if (!filterSearch.trim()) return true;
    const term = filterSearch.toLowerCase();
    return (
      (it.name || '').toLowerCase().includes(term) ||
      (it.desc || '').toLowerCase().includes(term) ||
      (it.num || '').includes(term)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header & Active Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900/60 border border-slate-800 rounded-2xl">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Boxes size={18} className="text-red-500" />
            21 Core Product Categories (Brochure Catalog)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure the numbered product catalog grid (Floor Marking, Filament, VHB, Epoxies, etc.).
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
              placeholder="e.g. Product Portfolio"
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
              placeholder="e.g. 21 Core Product Categories"
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
            placeholder="e.g. Detailed at a glance in the official NB Corporation product brochure."
            className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
          />
        </div>
      </div>

      {/* Cards List with Search Filter */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-white">
              Product Categories ({data.items?.length || 0})
            </h4>
            <p className="text-xs text-slate-400">
              Browse, filter, edit, or add brochure product categories.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-48 sm:w-64">
              <Search size={14} className="text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search categories..."
                value={filterSearch}
                onChange={(e) => setFilterSearch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-red-500"
              />
            </div>

            <button
              type="button"
              onClick={openAddModal}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0 shadow-lg shadow-red-950/40"
            >
              <Plus size={15} /> Add Category
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                item.isActive !== false
                  ? 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  : 'bg-slate-950/40 border-slate-900 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono font-bold text-xs flex items-center justify-center">
                    {item.num}
                  </span>
                  <span className={`text-[10px] font-semibold ${item.isActive !== false ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {item.isActive !== false ? 'Active' : 'Hidden'}
                  </span>
                </div>

                <h5 className="text-sm font-bold text-white mb-1.5 leading-snug">
                  {item.name}
                </h5>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => toggleItemActive(item.id)}
                  className="text-[11px] text-slate-400 hover:text-white cursor-pointer"
                >
                  Toggle Visibility
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => openEditModal(item)}
                    className="p-1.5 text-slate-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                    title="Edit Category"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-1.5 text-slate-300 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                    title="Delete Category"
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
                <Boxes size={16} className="text-red-500" />
                {editingItem ? 'Edit Product Category' : 'Add Product Category'}
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
              <div className="grid grid-cols-4 gap-3">
                <div className="col-span-1">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Number
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.num}
                    onChange={(e) => setFormData({ ...formData, num: e.target.value })}
                    placeholder="01"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3 py-2.5 text-sm text-white font-mono text-center outline-none"
                  />
                </div>

                <div className="col-span-3">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Category Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Floor Marking Tapes"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Category Description
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  placeholder="Heavy-duty vinyl tapes for 5S/6S lean factory logistics..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl p-4 text-xs text-white outline-none resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="catActive"
                  checked={formData.isActive !== false}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded bg-slate-950 border-slate-800 text-red-600 focus:ring-red-500 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="catActive" className="text-xs text-slate-300 font-medium cursor-pointer">
                  Display this category on the frontend
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
                  {editingItem ? 'Update Category' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutCategoriesEditor;
