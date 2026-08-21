import React from 'react';
import { Layout, Sparkles, Image as ImageIcon, ShieldCheck } from 'lucide-react';

const AboutBannerHeroEditor = ({ topBanner = {}, hero = {}, onUpdateTopBanner, onUpdateHero }) => {
  return (
    <div className="space-y-8">
      {/* Top Banner Tagline */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck size={16} className="text-red-500" />
              Top Announcement Banner
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              The top strip visible above the navigation on the About Us page.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onUpdateTopBanner({ ...topBanner, isActive: !topBanner.isActive })}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              topBanner.isActive !== false
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            {topBanner.isActive !== false ? 'Banner Active' : 'Banner Hidden'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Badge Label
            </label>
            <input
              type="text"
              value={topBanner.badge || ''}
              onChange={(e) => onUpdateTopBanner({ ...topBanner, badge: e.target.value })}
              placeholder="e.g. AUTHORISED 3M DISTRIBUTOR"
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Establishment Tagline
            </label>
            <input
              type="text"
              value={topBanner.tagline || ''}
              onChange={(e) => onUpdateTopBanner({ ...topBanner, tagline: e.target.value })}
              placeholder="e.g. ESTABLISHED IN 2006 (NARODA, AHMEDABAD)"
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Brand Motto
            </label>
            <input
              type="text"
              value={topBanner.motto || ''}
              onChange={(e) => onUpdateTopBanner({ ...topBanner, motto: e.target.value })}
              placeholder="e.g. INNOVATION · INTEGRITY · EXCELLENCE"
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
            />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Layout size={16} className="text-red-500" />
              About Hero Section & Narrative
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Main About Us heading, company intro paragraphs, and warehouse photo.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onUpdateHero({ ...hero, isActive: !hero.isActive })}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              hero.isActive !== false
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            {hero.isActive !== false ? 'Hero Active' : 'Hero Hidden'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Top Pill Badge
            </label>
            <input
              type="text"
              value={hero.badge || ''}
              onChange={(e) => onUpdateHero({ ...hero, badge: e.target.value })}
              placeholder="e.g. Excellence with Experience"
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Main Heading Title
            </label>
            <input
              type="text"
              value={hero.title || ''}
              onChange={(e) => onUpdateHero({ ...hero, title: e.target.value })}
              placeholder="e.g. About Us"
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Company Name (Red Subtitle)
            </label>
            <input
              type="text"
              value={hero.subtitle || ''}
              onChange={(e) => onUpdateHero({ ...hero, subtitle: e.target.value })}
              placeholder="e.g. NB Corporation"
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Intro Paragraph 1 (Lead Story)
            </label>
            <textarea
              rows={3}
              value={hero.description1 || ''}
              onChange={(e) => onUpdateHero({ ...hero, description1: e.target.value })}
              placeholder="Established in 2006 in Naroda, Ahmedabad..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl p-4 text-sm text-white outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Intro Paragraph 2 (Product Scope)
            </label>
            <textarea
              rows={3}
              value={hero.description2 || ''}
              onChange={(e) => onUpdateHero({ ...hero, description2: e.target.value })}
              placeholder="With nearly two decades of industry expertise..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl p-4 text-sm text-white outline-none resize-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <ImageIcon size={14} className="text-red-400" />
              Featured Warehouse / Team Image URL
            </label>
            <input
              type="text"
              value={hero.imageUrl || ''}
              onChange={(e) => onUpdateHero({ ...hero, imageUrl: e.target.value })}
              placeholder="https://images.pexels.com/..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white font-mono outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Giant Background Outline Text
            </label>
            <input
              type="text"
              value={hero.watermark || ''}
              onChange={(e) => onUpdateHero({ ...hero, watermark: e.target.value })}
              placeholder="e.g. N.B."
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white font-mono outline-none"
            />
          </div>
        </div>

        {/* Seal Badge overlay on image */}
        <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold uppercase tracking-wider text-red-400">
            Image Overlay Badge & Seal
          </h5>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Seal Top Tag
              </label>
              <input
                type="text"
                value={hero.sealTag || ''}
                onChange={(e) => onUpdateHero({ ...hero, sealTag: e.target.value })}
                placeholder="e.g. OFFICIAL PARTNER"
                className="w-full bg-slate-900 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2 text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Seal Title
              </label>
              <input
                type="text"
                value={hero.sealTitle || ''}
                onChange={(e) => onUpdateHero({ ...hero, sealTitle: e.target.value })}
                placeholder="e.g. 3M™ AUTHORISED"
                className="w-full bg-slate-900 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2 text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Seal Subtitle
              </label>
              <input
                type="text"
                value={hero.sealSubtitle || ''}
                onChange={(e) => onUpdateHero({ ...hero, sealSubtitle: e.target.value })}
                placeholder="e.g. Science. Applied to Life.™"
                className="w-full bg-slate-900 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2 text-xs text-white outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutBannerHeroEditor;
