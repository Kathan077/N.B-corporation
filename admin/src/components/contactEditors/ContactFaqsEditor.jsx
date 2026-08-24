import React, { useState } from 'react';
import { HelpCircle, Plus, Trash2, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

const ContactFaqsEditor = ({
  faqsData = [],
  onUpdateFaqs
}) => {
  const faqs = Array.isArray(faqsData) && faqsData.length > 0
    ? faqsData
    : [
        {
          q: "Can I request product samples for testing on our production line?",
          a: "Yes, absolutely! We provide technical samples of 3M™ VHB tapes, abrasive discs, and adhesives so your engineering team can validate bond strength and surface finish before placing volume orders."
        },
        {
          q: "Do you offer custom slitting and die-cutting services?",
          a: "Yes. We operate advanced precision slitting and die-cutting machinery to convert tape rolls to any custom width (from 3mm upwards) or bespoke shape according to your engineering drawings."
        },
        {
          q: "What is the typical turnaround time for orders and RFQs?",
          a: "Standard inquiries and quotes are processed within 4–12 business hours. In-stock products are dispatched within 24–48 hours across our pan-India logistics network."
        },
        {
          q: "Are all products genuine and certified by 3M™?",
          a: "As an Authorized 3M™ Industrial Distributor & Converter with 20+ years of industry leadership, 100% of our products are certified, traceable, and backed by full manufacturer warranties and technical datasheets."
        }
      ];

  const handleFaqChange = (index, field, val) => {
    const updated = [...faqs];
    updated[index] = { ...updated[index], [field]: val };
    onUpdateFaqs(updated);
  };

  const handleAddFaq = () => {
    const updated = [
      {
        q: "",
        a: ""
      },
      ...faqs
    ];
    onUpdateFaqs(updated);
  };

  const handleRemoveFaq = (index) => {
    if (faqs.length <= 1) {
      alert("You must keep at least one FAQ item.");
      return;
    }
    const updated = faqs.filter((_, i) => i !== index);
    onUpdateFaqs(updated);
  };

  const handleMoveFaq = (index, direction) => {
    const newIdx = index + direction;
    if (newIdx < 0 || newIdx >= faqs.length) return;
    const updated = [...faqs];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIdx, 0, moved);
    onUpdateFaqs(updated);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
              <HelpCircle size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Frequently Asked Questions ({faqs.length})</h3>
              <p className="text-xs text-slate-400">Add, edit, reorder, or remove FAQ questions displayed at the bottom of the contact page.</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddFaq}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-red-950/50 cursor-pointer transition-colors"
          >
            <Plus size={14} /> Add New FAQ
          </button>
        </div>

        {/* FAQ Items List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-5 bg-slate-950 border border-slate-800/90 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-slate-850 border border-slate-700 text-slate-300 font-mono text-[11px] font-bold flex items-center justify-center">
                    Q{idx + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-200">Question #{idx + 1}</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => handleMoveFaq(idx, -1)}
                    className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
                    title="Move Up"
                  >
                    <ChevronUp size={16} />
                  </button>
                  <button
                    type="button"
                    disabled={idx === faqs.length - 1}
                    onClick={() => handleMoveFaq(idx, 1)}
                    className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
                    title="Move Down"
                  >
                    <ChevronDown size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveFaq(idx)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors ml-2"
                    title="Delete FAQ"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Question Text
                </label>
                <input
                  type="text"
                  value={faq.q}
                  onChange={(e) => handleFaqChange(idx, 'q', e.target.value)}
                  placeholder="e.g. Can I request product samples for testing on our production line?"
                  className="w-full bg-slate-900 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2.5 text-xs text-white font-bold outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Answer Text
                </label>
                <textarea
                  rows={3}
                  value={faq.a}
                  onChange={(e) => handleFaqChange(idx, 'a', e.target.value)}
                  placeholder="e.g. Yes, absolutely! We provide technical samples of..."
                  className="w-full bg-slate-900 border border-slate-800 focus:border-red-500 rounded-xl p-3 text-xs text-slate-300 outline-none resize-none leading-relaxed"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactFaqsEditor;
