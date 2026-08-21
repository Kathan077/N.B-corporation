import React from 'react';
import { Layout, Sparkles, Tag, Eye, ArrowRight, BookOpen, Star, FileText } from 'lucide-react';

const BlogHeroEditor = ({ 
  heroData = {}, 
  featuredData = {}, 
  posts = [],
  onUpdateHero, 
  onUpdateFeatured 
}) => {
  const hero = {
    badge: "Industrial Knowledge Hub",
    title: "Our Blog",
    titleAccent: "Blog",
    subtitle: "Engineering insights, technical application guides, and industrial innovation updates.",
    ...heroData
  };

  const featured = {
    eyebrow: "PINNED_INTEL // EDITOR'S PICK",
    unitTag: "PRIORITY_TRANS // 0xAF92",
    selectedPostId: posts[0]?.id || "",
    ctaText: "Read Full Article",
    ...featuredData
  };

  const handleHeroChange = (field, value) => {
    onUpdateHero({
      ...hero,
      [field]: value
    });
  };

  const handleFeaturedChange = (field, value) => {
    onUpdateFeatured({
      ...featured,
      [field]: value
    });
  };

  const currentSelectedPost = posts.find(p => p.id === featured.selectedPostId) || posts[0] || {};

  return (
    <div className="space-y-8">
      {/* ── SECTION 1: Top Hero Banner ── */}
      <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-500/20 text-red-500 flex items-center justify-center">
            <Layout size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Top Blog Banner</h3>
            <p className="text-xs text-slate-400">Configure the top badge, heading, and intro description.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Top Pill Badge
            </label>
            <input
              type="text"
              value={hero.badge}
              onChange={(e) => handleHeroChange('badge', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Main Title
            </label>
            <input
              type="text"
              value={hero.title}
              onChange={(e) => handleHeroChange('title', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2.5 text-xs text-white font-bold outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Red Accent Word
            </label>
            <input
              type="text"
              value={hero.titleAccent}
              onChange={(e) => handleHeroChange('titleAccent', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2.5 text-xs text-red-400 font-bold outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Banner Subtitle Description
          </label>
          <textarea
            rows={2}
            value={hero.subtitle}
            onChange={(e) => handleHeroChange('subtitle', e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl p-3 text-xs text-white outline-none resize-none"
          />
        </div>
      </div>

      {/* ── SECTION 2: Pinned / Featured Hero Article ── */}
      <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Star size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Pinned / Featured Hero Post</h3>
              <p className="text-xs text-slate-400">Choose which article is highlighted prominently in the large top hero showcase.</p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold font-mono">
            EDITOR'S PICK
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Select Featured Article to Display *
            </label>
            <select
              value={featured.selectedPostId || currentSelectedPost.id}
              onChange={(e) => handleFeaturedChange('selectedPostId', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2.5 text-xs text-white font-bold outline-none"
            >
              {posts.map((post) => (
                <option key={post.id} value={post.id}>
                  [{post.category}] {post.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Section Eyebrow Label
            </label>
            <input
              type="text"
              value={featured.eyebrow}
              onChange={(e) => handleFeaturedChange('eyebrow', e.target.value)}
              placeholder="PINNED_INTEL // EDITOR'S PICK"
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              HUD Unit Tag on Image Corner
            </label>
            <input
              type="text"
              value={featured.unitTag}
              onChange={(e) => handleFeaturedChange('unitTag', e.target.value)}
              placeholder="PRIORITY_TRANS // 0xAF92"
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              CTA Button Text
            </label>
            <input
              type="text"
              value={featured.ctaText}
              onChange={(e) => handleFeaturedChange('ctaText', e.target.value)}
              placeholder="Read Full Article"
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2.5 text-xs text-white font-bold outline-none"
            />
          </div>
        </div>

        {/* Live Preview Card of Selected Article */}
        {currentSelectedPost && currentSelectedPost.title && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-24 h-16 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shrink-0 flex items-center justify-center">
              {currentSelectedPost.image ? (
                <img
                  src={currentSelectedPost.image}
                  alt={currentSelectedPost.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <BookOpen size={20} className="text-slate-600" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-mono font-bold text-red-400 uppercase">
                {currentSelectedPost.category}
              </span>
              <h4 className="text-xs font-bold text-white truncate">
                {currentSelectedPost.title}
              </h4>
              <p className="text-[11px] text-slate-400 line-clamp-1">
                {currentSelectedPost.excerpt}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogHeroEditor;
