import React, { useState, useMemo } from 'react';
import { 
  BookOpen, Search, Plus, Edit2, Trash2, X, Check, 
  Filter, Eye, ExternalLink, RefreshCw, 
  ChevronLeft, ChevronRight, Image as ImageIcon, Sparkles, Tag, CheckCircle2,
  Calendar, User, Clock, FileText, Layout
} from 'lucide-react';
import { getImageUrl } from '../../utils/imageUtils';

const BLOG_CATEGORIES = [
  "INDUSTRIAL TAPES",
  "ABRASIVES & FINISHING",
  "ADHESIVES & INSULATION",
  "GENERAL INDUSTRY"
];

const BlogManager = ({ 
  posts = [], 
  onAddPost, 
  onUpdatePost, 
  onDeletePost,
  onRefresh
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [modalTab, setModalTab] = useState('meta'); // 'meta' | 'sections'

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    category: BLOG_CATEGORIES[0],
    excerpt: '',
    author: 'Kathan Patel',
    role: 'Technical Solutions Lead, N.B. Corp',
    date: 'MAR 22, 2026',
    readTime: '8 MIN',
    views: '1.2K',
    image: '/assets/blog_tapes.png',
    summary: '',
    sections: [
      { heading: 'Overview & Problem Statement', body: 'Detailed description of the engineering context...' }
    ],
    featured: false,
    isActive: true
  });

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Search
      const searchMatch = !searchTerm.trim() || 
        (post.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.category || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.excerpt || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.author || '').toLowerCase().includes(searchTerm.toLowerCase());

      // Category
      const catMatch = selectedCategory === 'ALL' || post.category?.toUpperCase() === selectedCategory;

      // Status
      const statusMatch = selectedStatus === 'all' || 
        (selectedStatus === 'active' && post.isActive !== false) ||
        (selectedStatus === 'hidden' && post.isActive === false);

      return searchMatch && catMatch && statusMatch;
    });
  }, [posts, searchTerm, selectedCategory, selectedStatus]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage) || 1;
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPosts.slice(start, start + itemsPerPage);
  }, [filteredPosts, currentPage]);

  const openAddModal = () => {
    setEditingPost(null);
    setFormData({
      id: `article-${Date.now()}`,
      title: '',
      category: BLOG_CATEGORIES[0],
      excerpt: '',
      author: 'Kathan Patel',
      role: 'Technical Solutions Lead, N.B. Corp',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase(),
      readTime: '6 MIN',
      views: '0',
      image: '/assets/blog_tapes.png',
      summary: '',
      sections: [
        { heading: 'Introduction & Industrial Scope', body: '' },
        { heading: 'Technical Implementation & Best Practices', body: '' }
      ],
      featured: false,
      isActive: true
    });
    setModalTab('meta');
    setIsModalOpen(true);
  };

  const openEditModal = (post) => {
    setEditingPost(post);
    setFormData({
      ...post,
      sections: Array.isArray(post.sections) ? [...post.sections] : []
    });
    setModalTab('meta');
    setIsModalOpen(true);
  };

  const handleSavePost = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingPost) {
      await onUpdatePost(editingPost.id, formData);
    } else {
      await onAddPost(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete article "${title}"?`)) {
      onDeletePost(id);
    }
  };

  const handleToggleActive = (post) => {
    onUpdatePost(post.id, {
      ...post,
      isActive: post.isActive === false ? true : false
    });
  };

  // Section modifiers
  const handleAddSection = () => {
    setFormData({
      ...formData,
      sections: [
        ...formData.sections,
        { heading: '', body: '' }
      ]
    });
  };

  const handleRemoveSection = (index) => {
    const updated = formData.sections.filter((_, i) => i !== index);
    setFormData({ ...formData, sections: updated });
  };

  const handleSectionChange = (index, field, value) => {
    const updated = [...formData.sections];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, sections: updated });
  };

  return (
    <div className="space-y-6">
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Articles</span>
            <div className="text-2xl font-black text-white mt-1">{posts.length}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-500/20 text-red-400 flex items-center justify-center">
            <BookOpen size={20} />
          </div>
        </div>

        <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Published Live</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">
              {posts.filter(p => p.isActive !== false).length}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <CheckCircle2 size={20} />
          </div>
        </div>

        <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Topics & Categories</span>
            <div className="text-2xl font-black text-white mt-1">{BLOG_CATEGORIES.length}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
            <Tag size={20} />
          </div>
        </div>

        <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Filtered Count</span>
            <div className="text-2xl font-black text-amber-400 mt-1">{filteredPosts.length}</div>
          </div>
          <button
            type="button"
            onClick={openAddModal}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg shadow-red-950/50 cursor-pointer"
          >
            <Plus size={15} /> Write Article
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search size={15} className="text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles by title, author, category..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')} 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Category Select */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold hidden sm:inline">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2.5 outline-none focus:border-red-500 max-w-xs"
            >
              <option value="ALL">All Categories ({posts.length})</option>
              {BLOG_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Status Select */}
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2.5 outline-none focus:border-red-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active Only</option>
            <option value="hidden">Hidden Only</option>
          </select>

          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              className="p-2.5 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Refresh Articles"
            >
              <RefreshCw size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Article</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Author & Role</th>
                <th className="py-3.5 px-4">Date & Read Time</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {paginatedPosts.length > 0 ? (
                paginatedPosts.map((post) => (
                  <tr 
                    key={post.id} 
                    className="hover:bg-slate-850/50 transition-colors group"
                  >
                    {/* Article & Thumbnail */}
                    <td className="py-3 px-4 max-w-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden shrink-0">
                          {post.image ? (
                            <img
                              src={getImageUrl(post.image)}
                              alt={post.title}
                              className="w-full h-full object-cover"
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                          ) : (
                            <BookOpen size={18} className="text-slate-600" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1">
                            {post.title}
                          </div>
                          <div className="text-[11px] text-slate-400 font-normal line-clamp-1">
                            {post.excerpt}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 text-slate-300">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[10px] font-mono font-bold uppercase text-red-400">
                        {post.category}
                      </span>
                    </td>

                    {/* Author */}
                    <td className="py-3 px-4 text-slate-300">
                      <div className="font-semibold text-white">{post.author}</div>
                      <div className="text-[10px] text-slate-500 line-clamp-1">{post.role}</div>
                    </td>

                    {/* Date & Read Time */}
                    <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                      <div>{post.date}</div>
                      <div className="text-[10px] text-slate-500">{post.readTime} • {post.views || '0'} views</div>
                    </td>

                    {/* Status Toggle */}
                    <td className="py-3 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleActive(post)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                          post.isActive !== false
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30'
                            : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${post.isActive !== false ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                        {post.isActive !== false ? 'Active' : 'Hidden'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`http://localhost:5173/blog/${post.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                          title="View on live blog"
                        >
                          <ExternalLink size={14} />
                        </a>
                        <button
                          type="button"
                          onClick={() => openEditModal(post)}
                          className="p-1.5 text-slate-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                          title="Edit Article"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(post.id, post.title)}
                          className="p-1.5 text-slate-300 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                          title="Delete Article"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No articles found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredPosts.length)} of {filteredPosts.length} entries
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="p-2 rounded-xl border border-slate-800 hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft size={15} />
            </button>
            <span className="font-mono text-white px-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="p-2 rounded-xl border border-slate-800 hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Write / Edit Article Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-6 bg-black/85 backdrop-blur-md flex items-center justify-center">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-5 sm:p-7 shadow-2xl animate-scale-up max-h-[90vh] flex flex-col my-auto overflow-hidden">
            {/* Modal Header */}
            <div className="shrink-0 space-y-3 pb-3 border-b border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-lg shrink-0">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">
                      {editingPost ? 'Edit Blog Article' : 'Write New Blog Article'}
                    </h4>
                    <p className="text-xs text-slate-400">
                      Publish technical articles, application insights, and industrial case studies.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Subtabs */}
              <div className="flex items-center gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                <button
                  type="button"
                  onClick={() => setModalTab('meta')}
                  className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                    modalTab === 'meta' ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  1. Article Details & Cover
                </button>
                <button
                  type="button"
                  onClick={() => setModalTab('sections')}
                  className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                    modalTab === 'sections' ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  2. Content Sections ({formData.sections.length})
                </button>
              </div>
            </div>

            <form onSubmit={handleSavePost} className="flex-1 flex flex-col min-h-0 overflow-hidden">
              <div className="flex-1 overflow-y-auto pr-1 py-3 space-y-4">
                {/* Tab 1: Meta */}
                {modalTab === 'meta' && (
                  <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Article Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. 3M™ High-Performance Industrial Tapes Guide"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2.5 text-xs text-white font-bold outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Category Classification *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2 text-xs text-white outline-none"
                      >
                        {BLOG_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Custom Article Slug / URL ID
                      </label>
                      <input
                        type="text"
                        value={formData.id}
                        onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                        placeholder="e.g. 3m-vhb-industrial-tapes-guide"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2 text-xs text-white font-mono outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Author Name
                      </label>
                      <input
                        type="text"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        placeholder="e.g. Kathan Patel"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2 text-xs text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Publication Date
                      </label>
                      <input
                        type="text"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        placeholder="e.g. MAR 22, 2026"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2 text-xs text-white outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Read Time
                      </label>
                      <input
                        type="text"
                        value={formData.readTime}
                        onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                        placeholder="e.g. 8 MIN"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2 text-xs text-white outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                      <span>Cover Image URL / Path</span>
                      <span className="text-[10px] text-slate-500 font-mono">/assets/blog_tapes.png or URL</span>
                    </label>
                    <div className="flex gap-3 items-center">
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="/assets/blog_tapes.png or https://..."
                        className="flex-1 bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2 text-xs text-white font-mono outline-none"
                      />
                      {formData.image && (
                        <div className="w-12 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden shrink-0">
                          <img
                            src={getImageUrl(formData.image)}
                            alt="Cover preview"
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Short Excerpt (Displayed on Catalog Cards)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      placeholder="Brief 1-2 sentence overview of the article..."
                      className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl p-3 text-xs text-white outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Executive Summary (Displayed in Article Detail Header)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.summary}
                      onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                      placeholder="Full executive summary paragraph..."
                      className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl p-3 text-xs text-white outline-none resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Tab 2: Content Sections */}
              {modalTab === 'sections' && (
                <div className="space-y-4 animate-fade-in max-h-96 overflow-y-auto pr-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300">
                      Article Sections ({formData.sections.length})
                    </span>
                    <button
                      type="button"
                      onClick={handleAddSection}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus size={13} /> Add Paragraph Section
                    </button>
                  </div>

                  {formData.sections.map((sec, idx) => (
                    <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono font-bold text-red-400">
                          Section #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSection(idx)}
                          className="text-slate-500 hover:text-rose-400 p-1"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div>
                        <input
                          type="text"
                          value={sec.heading}
                          onChange={(e) => handleSectionChange(idx, 'heading', e.target.value)}
                          placeholder="Section Heading (e.g. Why 3M VHB Tapes Outperform Mechanical Fasteners)"
                          className="w-full bg-slate-900 border border-slate-800 focus:border-red-500 rounded-xl px-3 py-2 text-xs text-white font-bold outline-none"
                        />
                      </div>

                      <div>
                        <textarea
                          rows={4}
                          value={sec.body}
                          onChange={(e) => handleSectionChange(idx, 'body', e.target.value)}
                          placeholder="Detailed section body text and engineering insights..."
                          className="w-full bg-slate-900 border border-slate-800 focus:border-red-500 rounded-xl p-3 text-xs text-slate-200 outline-none resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

              {/* Status Toggle & Pinned Modal Footer */}
              <div className="shrink-0 pt-3 border-t border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="postActive"
                    checked={formData.isActive !== false}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded bg-slate-950 border-slate-800 text-red-600 focus:ring-red-500 w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="postActive" className="text-xs text-slate-300 font-medium cursor-pointer">
                    Publish article live on the blog
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white transition-colors flex items-center gap-2 shadow-lg shadow-red-950/50 cursor-pointer"
                  >
                    <Check size={14} />
                    {editingPost ? 'Save Changes' : 'Publish Article'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManager;
