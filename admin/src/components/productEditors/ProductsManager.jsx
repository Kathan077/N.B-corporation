import React, { useState, useMemo } from 'react';
import { 
  Package, Search, Plus, Edit2, Trash2, X, Check, 
  Filter, Eye, EyeOff, Layers, ExternalLink, RefreshCw, 
  ChevronLeft, ChevronRight, Image as ImageIcon, Sparkles, Tag, CheckCircle2
} from 'lucide-react';
import { getImageUrl } from '../../utils/imageUtils';

const CATEGORIES_LIST = [
  "Floor Marking Tapes",
  "Filament Tape",
  "UHMW Tape",
  "Reclosable Fasteners (Dual Lock)",
  "Aluminium Foil Tape",
  "Duct Tape",
  "Masking Tape",
  "UPVC Tape",
  "Transparent Film Tape",
  "Waterproofing Sealing Tapes",
  "Adhesion Promoters (94 Primer)",
  "PU Sealant 600 ml",
  "Epoxy & Structural Adhesives",
  "Applicators & Dispensing Guns",
  "Aerosol Spray Adhesives",
  "Double Coated Tissue Tapes",
  "Adhesive Transfer Tapes",
  "Double Coated Polyester Tapes",
  "Label Materials & Overlays",
  "Standard VHB™ Acrylic Foam Tapes",
  "High Temperature GPH Tapes",
  "Structural Glazing Tapes (SGT)",
  "PE & Urethane Foam Tapes",
  "Anti-Slip Tapes (Safety-Walk™)",
  "Retro Reflective Tapes (Diamond Grade™)",
  "Decorative & Privacy Glass Finish",
  "Sun Control & Architectural Films",
  "Safety & Security Films",
  "Cleaners & Microfiber Cloths"
];

const ProductsManager = ({ 
  products = [], 
  onAddProduct, 
  onUpdateProduct, 
  onDeleteProduct,
  onRefresh
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [modalTab, setModalTab] = useState('basic'); // 'basic' | 'content' | 'specs'

  const [formData, setFormData] = useState({
    id: '',
    code: '',
    name: '',
    category: CATEGORIES_LIST[0],
    categoryId: 'floor-marking',
    subtitle: '',
    description: '',
    image: '',
    pdfPage: 1,
    features: '',
    applications: '',
    specifications: {},
    isActive: true
  });

  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Search
      const searchMatch = !searchTerm.trim() || 
        (prod.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (prod.code || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (prod.category || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (prod.description || '').toLowerCase().includes(searchTerm.toLowerCase());

      // Category
      const catMatch = selectedCategory === 'all' || prod.category === selectedCategory || prod.categoryId === selectedCategory;

      // Status
      const statusMatch = selectedStatus === 'all' || 
        (selectedStatus === 'active' && prod.isActive !== false) ||
        (selectedStatus === 'hidden' && prod.isActive === false);

      return searchMatch && catMatch && statusMatch;
    });
  }, [products, searchTerm, selectedCategory, selectedStatus]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      id: `prod-${Date.now()}`,
      code: '',
      name: '',
      category: CATEGORIES_LIST[0],
      categoryId: 'floor-marking',
      subtitle: '',
      description: '',
      image: '',
      pdfPage: 1,
      features: '',
      applications: '',
      specifications: {
        "Tape Type": "Industrial 3M™ Grade",
        "Adhesive Type": "High Tack Rubber / Acrylic",
        "Backing Material": "Premium Vinyl / Polyethylene"
      },
      isActive: true
    });
    setModalTab('basic');
    setIsModalOpen(true);
  };

  const openEditModal = (prod) => {
    setEditingProduct(prod);
    setFormData({
      ...prod,
      features: Array.isArray(prod.features) ? prod.features.join('\n') : (prod.features || ''),
      applications: Array.isArray(prod.applications) ? prod.applications.join('\n') : (prod.applications || ''),
      specifications: prod.specifications ? (typeof prod.specifications === 'object' ? { ...prod.specifications } : {}) : {}
    });
    setModalTab('basic');
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.category.trim()) return;

    const featuresArray = typeof formData.features === 'string'
      ? formData.features.split('\n').map(s => s.trim()).filter(s => s.length > 0)
      : formData.features || [];

    const applicationsArray = typeof formData.applications === 'string'
      ? formData.applications.split('\n').map(s => s.trim()).filter(s => s.length > 0)
      : formData.applications || [];

    const productPayload = {
      ...formData,
      features: featuresArray,
      applications: applicationsArray
    };

    if (editingProduct) {
      await onUpdateProduct(editingProduct.id, productPayload);
    } else {
      await onAddProduct(productPayload);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete product "${name}"?`)) {
      onDeleteProduct(id);
    }
  };

  const handleToggleActive = (prod) => {
    onUpdateProduct(prod.id, {
      ...prod,
      isActive: prod.isActive === false ? true : false
    });
  };

  const handleAddSpec = (e) => {
    e.preventDefault();
    if (!newSpecKey.trim() || !newSpecValue.trim()) return;
    setFormData({
      ...formData,
      specifications: {
        ...formData.specifications,
        [newSpecKey.trim()]: newSpecValue.trim()
      }
    });
    setNewSpecKey('');
    setNewSpecValue('');
  };

  const handleDeleteSpec = (keyToDelete) => {
    const newSpecs = { ...formData.specifications };
    delete newSpecs[keyToDelete];
    setFormData({
      ...formData,
      specifications: newSpecs
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Catalog</span>
            <div className="text-2xl font-black text-white mt-1">{products.length}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-500/20 text-red-400 flex items-center justify-center">
            <Package size={20} />
          </div>
        </div>

        <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Live</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">
              {products.filter(p => p.isActive !== false).length}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <CheckCircle2 size={20} />
          </div>
        </div>

        <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Categories</span>
            <div className="text-2xl font-black text-white mt-1">{CATEGORIES_LIST.length}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
            <Layers size={20} />
          </div>
        </div>

        <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Filtered View</span>
            <div className="text-2xl font-black text-amber-400 mt-1">{filteredProducts.length}</div>
          </div>
          <button
            type="button"
            onClick={openAddModal}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg shadow-red-950/50 cursor-pointer"
          >
            <Plus size={15} /> Add Product
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search size={15} className="text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by 3M Code, Name, Specs..."
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
              <option value="all">All Categories ({products.length})</option>
              {CATEGORIES_LIST.map((cat) => (
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
              title="Refresh Products"
            >
              <RefreshCw size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Item & Code</th>
                <th className="py-3.5 px-4">Product Name</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Dimensions / Subtitle</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((prod) => (
                  <tr 
                    key={prod.id} 
                    className="hover:bg-slate-850/50 transition-colors group"
                  >
                    {/* Code & Thumbnail */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden shrink-0">
                          {prod.image ? (
                            <img
                              src={getImageUrl(prod.image)}
                              alt={prod.name}
                              className="w-full h-full object-contain p-1"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          ) : (
                            <Package size={18} className="text-slate-600" />
                          )}
                        </div>
                        <div>
                          <span className="inline-block px-2 py-0.5 rounded bg-red-950/80 border border-red-500/30 text-red-400 font-mono font-bold text-[10px]">
                            3M {prod.code || 'CODE'}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Name */}
                    <td className="py-3 px-4 font-bold text-white max-w-xs">
                      <div className="truncate group-hover:text-red-400 transition-colors">
                        {prod.name}
                      </div>
                      <div className="text-[11px] text-slate-400 font-normal line-clamp-1">
                        {prod.description}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 text-slate-300">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px]">
                        {prod.category}
                      </span>
                    </td>

                    {/* Subtitle / Dimensions */}
                    <td className="py-3 px-4 text-slate-400 font-mono text-[11px] max-w-[200px] truncate">
                      {prod.subtitle || '—'}
                    </td>

                    {/* Status Toggle */}
                    <td className="py-3 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleActive(prod)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                          prod.isActive !== false
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30'
                            : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${prod.isActive !== false ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                        {prod.isActive !== false ? 'Active' : 'Hidden'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`http://localhost:5173/product/${prod.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                          title="View on live site"
                        >
                          <ExternalLink size={14} />
                        </a>
                        <button
                          type="button"
                          onClick={() => openEditModal(prod)}
                          className="p-1.5 text-slate-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(prod.id, prod.name)}
                          className="p-1.5 text-slate-300 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                          title="Delete Product"
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
                    No products found matching your search or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} entries
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

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-6 bg-black/85 backdrop-blur-md flex items-center justify-center">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl animate-scale-up max-h-[90vh] flex flex-col my-auto overflow-hidden">
            {/* Modal Header */}
            <div className="shrink-0 space-y-3 pb-3 border-b border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-lg shrink-0">
                    <Package size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">
                      {editingProduct ? `Edit Product: ${editingProduct.code || ''}` : 'Add New 3M Product'}
                    </h4>
                    <p className="text-xs text-slate-400">
                      Configure official specifications, high-definition image, and brochure details.
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
                  onClick={() => setModalTab('basic')}
                  className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                    modalTab === 'basic' ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  1. General & Image
                </button>
                <button
                  type="button"
                  onClick={() => setModalTab('content')}
                  className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                    modalTab === 'content' ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  2. Features & Applications
                </button>
                <button
                  type="button"
                  onClick={() => setModalTab('specs')}
                  className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                    modalTab === 'specs' ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  3. Technical Specs
                </button>
              </div>
            </div>

            <form onSubmit={handleSaveProduct} className="flex-1 flex flex-col min-h-0 overflow-hidden">
              <div className="flex-1 overflow-y-auto pr-1 py-3 space-y-4">
                {/* Tab 1: General */}
                {modalTab === 'basic' && (
                  <div className="space-y-4 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-1">
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        3M Product Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.code}
                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                        placeholder="e.g. 764 or 4910"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2 text-xs text-white font-mono font-bold outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Product Title Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. 3M™ Floor Marking Tape 764"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2 text-xs text-white outline-none"
                      />
                    </div>
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
                        {CATEGORIES_LIST.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Subtitle / Dimensions Tag
                      </label>
                      <input
                        type="text"
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        placeholder="e.g. 2 inch to 45 inch X 33Mtr • Available in 6 Colors"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2 text-xs text-white outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                      <span>Product Image URL</span>
                      <span className="text-[10px] text-slate-500 font-mono">JPG, PNG, WebP or /product/HD Images/...</span>
                    </label>
                    <div className="flex gap-3 items-center">
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="https://images.unsplash.com/... or /product/HD Images/..."
                        className="flex-1 bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2 text-xs text-white font-mono outline-none"
                      />
                      {formData.image && (
                        <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden shrink-0">
                          <img
                            src={getImageUrl(formData.image)}
                            alt="Preview"
                            className="w-full h-full object-contain p-1"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Product Overview / Description
                    </label>
                    <textarea
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Detailed engineering overview of this tape..."
                      className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl p-3 text-xs text-white outline-none resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Tab 2: Features & Applications */}
              {modalTab === 'content' && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Key Highlights & Features (one per line)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.features}
                      onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                      placeholder="High initial tack rubber adhesive&#10;Resistant to most common solvents&#10;Conformable backing"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl p-3 text-xs text-white outline-none resize-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Recommended Applications (one per line)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.applications}
                      onChange={(e) => setFormData({ ...formData, applications: e.target.value })}
                      placeholder="Lane and safety marking in factories&#10;Color coding of pipes and conduits&#10;Temporary surface protection"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl p-3 text-xs text-white outline-none resize-none font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Tab 3: Technical Specs */}
              {modalTab === 'specs' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-300">
                      Technical Specifications
                    </label>

                    <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                      {Object.entries(formData.specifications || {}).map(([key, val]) => (
                        <div key={key} className="flex items-center justify-between p-2 bg-slate-950 border border-slate-800 rounded-xl text-xs">
                          <span className="font-semibold text-red-400 w-1/3 truncate">{key}:</span>
                          <span className="text-slate-200 flex-1 truncate px-2">{val}</span>
                          <button
                            type="button"
                            onClick={() => handleDeleteSpec(key)}
                            className="text-slate-500 hover:text-rose-400 p-1"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <input
                        type="text"
                        placeholder="Spec Name (e.g. Thickness)"
                        value={newSpecKey}
                        onChange={(e) => setNewSpecKey(e.target.value)}
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Value (e.g. 0.13 mm)"
                        value={newSpecValue}
                        onChange={(e) => setNewSpecValue(e.target.value)}
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddSpec}
                        className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              )}
              </div>

              {/* Status Toggle & Pinned Modal Footer */}
              <div className="shrink-0 pt-3 border-t border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="prodActive"
                    checked={formData.isActive !== false}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded bg-slate-950 border-slate-800 text-red-600 focus:ring-red-500 w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="prodActive" className="text-xs text-slate-300 font-medium cursor-pointer">
                    Display this product on the live frontend store catalog
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
                    {editingProduct ? 'Save Changes' : 'Create Product'}
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

export default ProductsManager;
