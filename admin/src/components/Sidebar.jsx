import React from 'react';
import { 
  Home, Layout, Shield, Layers, Cpu, Quote, 
  Package, Globe2, TrendingUp, ExternalLink, 
  Sparkles, CheckCircle2, AlertCircle
} from 'lucide-react';

const SUB_SECTIONS = [
  { id: 'hero', name: 'Hero Banner', icon: Layout },
  { id: 'principles', name: 'Our Principles', icon: Shield },
  { id: 'whyChooseUs', name: 'Why Choose Us', icon: Layers },
  { id: 'applications', name: 'Applications', icon: Cpu },
  { id: 'testimonials', name: 'Testimonials', icon: Quote },
  { id: 'featuredProducts', name: 'Featured 3M', icon: Package },
  { id: 'brands', name: 'Industries Served', icon: Globe2 },
  { id: 'impact', name: 'Impact & Goals', icon: TrendingUp },
];

const Sidebar = ({ activeTab, onSelectTab, isOnline, unsavedChanges }) => {
  return (
    <aside className="w-72 bg-[#080C14] border-r border-slate-800/80 flex flex-col justify-between shrink-0 h-screen sticky top-0">
      {/* Brand Header */}
      <div>
        <div className="p-6 border-b border-slate-800/80">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-red-950/60 border border-red-500/30">
              NB
            </div>
            <div>
              <h1 className="text-sm font-black text-white tracking-wider uppercase">
                NB Corporation
              </h1>
              <span className="text-[10px] font-mono font-bold text-red-500 tracking-widest uppercase">
                Admin Panel
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px]">
            <span className="text-slate-400 font-medium">Backend Status:</span>
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span className={`font-semibold ${isOnline ? 'text-emerald-400' : 'text-amber-400'}`}>
                {isOnline ? 'Live DB' : 'Local Mock'}
              </span>
            </div>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="p-4 space-y-1">
          <div className="px-3 py-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-500 flex items-center justify-between">
            <span>Core Sections</span>
            <span className="bg-red-950/80 border border-red-500/30 text-red-400 text-[9px] px-1.5 py-0.5 rounded font-mono">
              Home Active
            </span>
          </div>

          <div className="space-y-1">
            {SUB_SECTIONS.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeTab === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => onSelectTab(sec.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-red-600/15 text-white border border-red-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} className={isActive ? 'text-red-500' : 'text-slate-500 group-hover:text-slate-300'} />
                    <span>{sec.name}</span>
                  </div>

                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer quick action */}
      <div className="p-4 border-t border-slate-800/80 space-y-3">
        {unsavedChanges && (
          <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 text-[11px] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
            <span>Unsaved edits pending</span>
          </div>
        )}

        <a
          href="http://localhost:5173"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-all group"
        >
          <div className="flex items-center gap-2">
            <ExternalLink size={14} className="text-red-500" />
            <span>View Live Website</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">:5173</span>
        </a>

        <div className="text-center text-[10px] text-slate-500 font-mono">
          v1.0 • NB Corp CMS
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
