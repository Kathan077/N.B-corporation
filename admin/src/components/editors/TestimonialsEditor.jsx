import React, { useState } from 'react';
import { Quote, Plus, Edit2, Trash2, ArrowUp, ArrowDown, X, Check, Star } from 'lucide-react';

const TestimonialsEditor = ({ data, onChange }) => {
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    client: '',
    author: '',
    review: '',
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
      id: `TRK-${Math.floor(10 + Math.random() * 90)}`,
      client: '',
      author: '',
      review: '',
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
    if (!formData.client.trim() || !formData.review.trim()) return;

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
    if (window.confirm('Are you sure you want to delete this testimonial review?')) {
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
      {/* Header & Active Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900/60 border border-slate-800 rounded-2xl">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Quote size={18} className="text-red-500" />
            Testimonials Section Manager
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage verified client reviews, company badges, and testimonials.
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

      {/* Title Config */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-red-400">
          Section Title & Watermark
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Eyebrow Tag
            </label>
            <input
              type="text"
              value={data.eyebrow || ''}
              onChange={(e) => handleHeaderChange('eyebrow', e.target.value)}
              placeholder="e.g. Testimonials"
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
              placeholder="e.g. Proud Moments"
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
              onChange={(e) => handleHeaderChange('highlight', e.target.value)}
              placeholder="e.g. Happy Clients"
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Watermark Background
            </label>
            <input
              type="text"
              value={data.watermark || ''}
              onChange={(e) => handleHeaderChange('watermark', e.target.value)}
              placeholder="e.g. LEGACY"
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white font-mono uppercase outline-none"
            />
          </div>
        </div>
      </div>

      {/* Cards List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white">
              Client Testimonials ({data.items?.length || 0})
            </h4>
            <p className="text-xs text-slate-400">
              Manage quotes and client endorsements.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors shadow-lg shadow-red-950/40"
          >
            <Plus size={15} /> Add Testimonial
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(data.items || []).map((item, index) => (
            <div
              key={item.id}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between relative overflow-hidden ${
                item.isActive !== false
                  ? 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  : 'bg-slate-950/40 border-slate-900 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold text-red-400 bg-red-950/50 border border-red-500/30 px-2 py-0.5 rounded">
                    TRK_ID_{item.id}
                  </span>
                </div>

                <p className="text-xs text-slate-300 italic mb-5 line-clamp-4 leading-relaxed">
                  "{item.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 font-bold text-xs flex items-center justify-center">
                    {item.client ? item.client.charAt(0) : 'C'}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white leading-none mb-1">
                      {item.author}
                    </h5>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {item.client}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => toggleItemActive(item.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      item.isActive !== false ? 'text-emerald-400 hover:bg-emerald-500/10' : 'text-slate-500'
                    }`}
                    title={item.isActive !== false ? 'Active' : 'Hidden'}
                  >
                    <span className={`w-2 h-2 rounded-full inline-block ${item.isActive !== false ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                  </button>

                  <button
                    type="button"
                    onClick={() => openEditModal(item)}
                    className="p-1.5 text-slate-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Edit Review"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-1.5 text-slate-300 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                    title="Delete Review"
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
                <Quote size={16} className="text-red-500" />
                {editingItem ? 'Edit Testimonial' : 'Add New Testimonial'}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Client / Company Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="e.g. STP Limited"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Author / Reviewer Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="e.g. Sarita Koul"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Tracking Code / ID
                </label>
                <input
                  type="text"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  placeholder="e.g. STP-01"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white font-mono outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Testimonial Quote
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  placeholder="Write the client endorsement quote..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl p-4 text-sm text-white outline-none resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="testimonialActive"
                  checked={formData.isActive !== false}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded bg-slate-950 border-slate-800 text-red-600 focus:ring-red-500 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="testimonialActive" className="text-xs text-slate-300 font-medium cursor-pointer">
                  Display this testimonial on the frontend
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
                  {editingItem ? 'Update Testimonial' : 'Create Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialsEditor;
