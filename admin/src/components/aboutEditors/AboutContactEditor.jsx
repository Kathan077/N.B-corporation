import React, { useState } from 'react';
import { MapPin, Phone, Mail, Globe, Plus, Trash2 } from 'lucide-react';

const AboutContactEditor = ({ data = {}, onChange }) => {
  const [newPhone, setNewPhone] = useState('');

  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const handleAddPhone = (e) => {
    e.preventDefault();
    if (!newPhone.trim()) return;
    const phones = [...(data.phones || []), newPhone.trim()];
    handleChange('phones', phones);
    setNewPhone('');
  };

  const handleDeletePhone = (index) => {
    const phones = (data.phones || []).filter((_, i) => i !== index);
    handleChange('phones', phones);
  };

  return (
    <div className="space-y-6">
      {/* Header & Active Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900/60 border border-slate-800 rounded-2xl">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <MapPin size={18} className="text-red-500" />
            Headquarters & Contact Details Strip
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure the Naroda, Ahmedabad address, direct hotlines, email, and website link.
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Address Box */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-400 mb-4">
              <MapPin size={16} /> Office & Warehouse Address
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Card Title</label>
              <input
                type="text"
                value={data.addressTitle || 'Corporate Office & Warehouse'}
                onChange={(e) => handleChange('addressTitle', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2 text-xs text-white outline-none mb-3"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Complete Address</label>
              <textarea
                rows={4}
                value={data.address || ''}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="G-10, 11, 12 SATKAR AVENUE..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl p-3.5 text-xs text-white outline-none resize-none leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Hotlines */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-400 mb-4">
              <Phone size={16} /> Direct Phone Hotlines
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Card Title</label>
              <input
                type="text"
                value={data.phonesTitle || 'Direct Hotlines'}
                onChange={(e) => handleChange('phonesTitle', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2 text-xs text-white outline-none mb-3"
              />
            </div>

            <form onSubmit={handleAddPhone} className="flex gap-2 mb-3">
              <input
                type="text"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                placeholder="+91 98259 54315"
                className="flex-1 bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3 py-1.5 text-xs text-white outline-none"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                <Plus size={14} />
              </button>
            </form>

            <div className="space-y-2">
              {(data.phones || []).map((phone, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-slate-950 border border-slate-800 rounded-lg text-xs">
                  <span className="font-mono text-white">{phone}</span>
                  <button
                    type="button"
                    onClick={() => handleDeletePhone(idx)}
                    className="text-slate-400 hover:text-rose-400 p-1"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Email & Web */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-400 mb-4">
              <Mail size={16} /> Digital Correspondence
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Card Title</label>
              <input
                type="text"
                value={data.emailTitle || 'Digital Correspondence'}
                onChange={(e) => handleChange('emailTitle', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2 text-xs text-white outline-none mb-3"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
              <input
                type="email"
                value={data.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="nb2corporation@gmail.com"
                className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2 text-xs text-white outline-none mb-3 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Website Link URL</label>
              <input
                type="text"
                value={data.websiteUrl || ''}
                onChange={(e) => handleChange('websiteUrl', e.target.value)}
                placeholder="http://www.nbcorporation.net"
                className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2 text-xs text-white outline-none font-mono"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutContactEditor;
