import React, { useState } from 'react';
import { Shield, Sparkles, Plus, Edit2, Trash2, X, Check } from 'lucide-react';

const AboutPillarsValuesEditor = ({ 
  pillarsData = {}, 
  valuesData = {}, 
  onUpdatePillars, 
  onUpdateValues 
}) => {
  const [editingPillar, setEditingPillar] = useState(null);
  const [isPillarModalOpen, setIsPillarModalOpen] = useState(false);
  const [pillarForm, setPillarForm] = useState({ id: '', num: '', title: '', text: '', isActive: true });

  const [editingValue, setEditingValue] = useState(null);
  const [isValueModalOpen, setIsValueModalOpen] = useState(false);
  const [valueForm, setValueForm] = useState({ id: '', num: '', title: '', text: '', isActive: true });

  // Pillars CRUD
  const openAddPillar = () => {
    const nextNum = String((pillarsData.items?.length || 0) + 1).padStart(2, '0');
    setEditingPillar(null);
    setPillarForm({ id: `pillar-${Date.now()}`, num: nextNum, title: '', text: '', isActive: true });
    setIsPillarModalOpen(true);
  };

  const openEditPillar = (item) => {
    setEditingPillar(item);
    setPillarForm({ ...item });
    setIsPillarModalOpen(true);
  };

  const handleSavePillar = (e) => {
    e.preventDefault();
    if (!pillarForm.title.trim()) return;

    let items = [...(pillarsData.items || [])];
    if (editingPillar) {
      items = items.map((it) => (it.id === editingPillar.id ? { ...pillarForm } : it));
    } else {
      items.push({ ...pillarForm, order: items.length + 1 });
    }
    onUpdatePillars({ ...pillarsData, items });
    setIsPillarModalOpen(false);
  };

  const handleDeletePillar = (id) => {
    if (window.confirm('Delete this strategic pillar?')) {
      const items = (pillarsData.items || []).filter((it) => it.id !== id);
      onUpdatePillars({ ...pillarsData, items });
    }
  };

  // Values CRUD
  const openAddValue = () => {
    const nextNum = String((valuesData.items?.length || 0) + 1).padStart(2, '0');
    setEditingValue(null);
    setValueForm({ id: `val-${Date.now()}`, num: nextNum, title: '', text: '', isActive: true });
    setIsValueModalOpen(true);
  };

  const openEditValue = (item) => {
    setEditingValue(item);
    setValueForm({ ...item });
    setIsValueModalOpen(true);
  };

  const handleSaveValue = (e) => {
    e.preventDefault();
    if (!valueForm.title.trim()) return;

    let items = [...(valuesData.items || [])];
    if (editingValue) {
      items = items.map((it) => (it.id === editingValue.id ? { ...valueForm } : it));
    } else {
      items.push({ ...valueForm, order: items.length + 1 });
    }
    onUpdateValues({ ...valuesData, items });
    setIsValueModalOpen(false);
  };

  const handleDeleteValue = (id) => {
    if (window.confirm('Delete this core value card?')) {
      const items = (valuesData.items || []).filter((it) => it.id !== id);
      onUpdateValues({ ...valuesData, items });
    }
  };

  return (
    <div className="space-y-8">
      {/* Strategic Pillars Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900/60 border border-slate-800 rounded-2xl">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Shield size={18} className="text-red-500" />
              Strategic Pillars ({pillarsData.items?.length || 0})
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Performance Excellence, Strategic Partnership, Innovation, Reliable Supply, etc.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddPillar}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-lg shadow-red-950/40"
          >
            <Plus size={15} /> Add Pillar
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(pillarsData.items || []).map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 font-mono font-bold text-xs mb-4">
                  {item.num}
                </div>
                <h5 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">
                  {item.title}
                </h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.text}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-end gap-1.5">
                <button
                  type="button"
                  onClick={() => openEditPillar(item)}
                  className="p-1.5 text-slate-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                  title="Edit Pillar"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeletePillar(item.id)}
                  className="p-1.5 text-slate-300 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                  title="Delete Pillar"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Values Section */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900/60 border border-slate-800 rounded-2xl">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles size={18} className="text-red-500" />
              Core Values ({valuesData.items?.length || 0})
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Quality Commitment, Customer Focus, Innovation & Technology, Integrity & Reliability.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddValue}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-lg shadow-red-950/40"
          >
            <Plus size={15} /> Add Value
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(valuesData.items || []).map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="text-2xl font-black text-red-500 font-mono mb-2">
                  {item.num}
                </div>
                <h5 className="text-base font-bold text-white mb-2">
                  {item.title}
                </h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.text}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-end gap-1.5">
                <button
                  type="button"
                  onClick={() => openEditValue(item)}
                  className="p-1.5 text-slate-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                  title="Edit Value"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteValue(item.id)}
                  className="p-1.5 text-slate-300 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                  title="Delete Value"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pillar Modal */}
      {isPillarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white">
                {editingPillar ? 'Edit Strategic Pillar' : 'Add Strategic Pillar'}
              </h4>
              <button onClick={() => setIsPillarModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSavePillar} className="space-y-4">
              <div className="grid grid-cols-4 gap-3">
                <div className="col-span-1">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Number</label>
                  <input
                    type="text"
                    required
                    value={pillarForm.num}
                    onChange={(e) => setPillarForm({ ...pillarForm, num: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3 py-2 text-xs text-white text-center font-mono outline-none"
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Pillar Title</label>
                  <input
                    type="text"
                    required
                    value={pillarForm.title}
                    onChange={(e) => setPillarForm({ ...pillarForm, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Description</label>
                <textarea
                  rows={4}
                  required
                  value={pillarForm.text}
                  onChange={(e) => setPillarForm({ ...pillarForm, text: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl p-3 text-xs text-white outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => setIsPillarModalOpen(false)} className="px-4 py-2 text-xs text-slate-400 hover:text-white">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold">
                  Save Pillar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Value Modal */}
      {isValueModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white">
                {editingValue ? 'Edit Core Value' : 'Add Core Value'}
              </h4>
              <button onClick={() => setIsValueModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveValue} className="space-y-4">
              <div className="grid grid-cols-4 gap-3">
                <div className="col-span-1">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Number</label>
                  <input
                    type="text"
                    required
                    value={valueForm.num}
                    onChange={(e) => setValueForm({ ...valueForm, num: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3 py-2 text-xs text-white text-center font-mono outline-none"
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Value Title</label>
                  <input
                    type="text"
                    required
                    value={valueForm.title}
                    onChange={(e) => setValueForm({ ...valueForm, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Description</label>
                <textarea
                  rows={4}
                  required
                  value={valueForm.text}
                  onChange={(e) => setValueForm({ ...valueForm, text: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl p-3 text-xs text-white outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => setIsValueModalOpen(false)} className="px-4 py-2 text-xs text-slate-400 hover:text-white">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold">
                  Save Value
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPillarsValuesEditor;
