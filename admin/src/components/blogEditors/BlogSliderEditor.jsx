import React from 'react';
import { Zap, Volume2, Radio, PlayCircle, ShieldCheck } from 'lucide-react';

const BlogSliderEditor = ({ 
  tickerData = {}, 
  posts = [],
  onUpdateTicker 
}) => {
  const ticker = {
    enabled: true,
    label: "LIVE_STREAM",
    customMessage: "",
    speed: "normal",
    ...tickerData
  };

  const handleChange = (field, value) => {
    onUpdateTicker({
      ...ticker,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-500/20 text-red-500 flex items-center justify-center">
              <Zap size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Live Stream Slider / Ticker</h3>
              <p className="text-xs text-slate-400">Controls the running marquee slider bar beneath the blog hero section.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="sliderEnabled"
              checked={ticker.enabled !== false}
              onChange={(e) => handleChange('enabled', e.target.checked)}
              className="rounded bg-slate-950 border-slate-800 text-red-600 focus:ring-red-500 w-4 h-4 cursor-pointer"
            />
            <label htmlFor="sliderEnabled" className="text-xs text-slate-300 font-semibold cursor-pointer">
              Enable Live Slider
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Red Ticker Badge Label
            </label>
            <input
              type="text"
              value={ticker.label}
              onChange={(e) => handleChange('label', e.target.value)}
              placeholder="LIVE_STREAM"
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono font-bold outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Custom Announcement (Overrides Auto Stream)
            </label>
            <input
              type="text"
              value={ticker.customMessage}
              onChange={(e) => handleChange('customMessage', e.target.value)}
              placeholder="Leave empty to automatically stream all published blog article titles"
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
            />
          </div>
        </div>

        {/* Live Slider Preview */}
        <div className="pt-2">
          <label className="block text-xs font-semibold text-slate-400 mb-2">
            Live Marquee Bar Preview
          </label>
          <div className="bg-[#05080E] border border-slate-800 rounded-xl overflow-hidden flex items-center h-11 text-xs">
            <div className="bg-red-600 text-white font-mono font-bold px-3 py-2 flex items-center gap-1.5 shrink-0 text-[11px] tracking-wider">
              <Zap size={12} />
              <span>{ticker.label || 'LIVE_STREAM'}</span>
            </div>
            <div className="px-4 text-slate-300 font-mono text-[11px] truncate flex items-center gap-3">
              {ticker.customMessage ? (
                <span>{ticker.customMessage}</span>
              ) : (
                posts.slice(0, 3).map((p, i) => (
                  <span key={i} className="flex items-center gap-2">
                    <span className="text-red-400 font-bold">[{p.category}]</span>
                    <span>{p.title}</span>
                    <span className="text-slate-600">//</span>
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSliderEditor;
