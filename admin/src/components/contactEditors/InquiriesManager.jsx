import React, { useState, useMemo } from 'react';
import { 
  Inbox, Search, Filter, RefreshCw, Eye, Trash2, 
  CheckCircle2, Clock, Mail, Phone, MapPin, 
  Package, ChevronLeft, ChevronRight, X, User,
  Calendar, FileText, Check, AlertCircle, MessageSquare
} from 'lucide-react';

const STATUS_CONFIG = {
  NEW: { label: 'New Request', bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  CONTACTED: { label: 'Contacted', bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
  QUOTED: { label: 'Quoted', bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
  CLOSED: { label: 'Closed', bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-500/30' },
};

const InquiriesManager = ({
  inquiries = [],
  onUpdateInquiry,
  onDeleteInquiry,
  onRefresh
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filtered inquiries
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchStatus = statusFilter === 'ALL' || inq.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchStatus;

      const matchSearch =
        (inq.name && inq.name.toLowerCase().includes(q)) ||
        (inq.email && inq.email.toLowerCase().includes(q)) ||
        (inq.mobile && inq.mobile.toLowerCase().includes(q)) ||
        (inq.location && inq.location.toLowerCase().includes(q)) ||
        (inq.message && inq.message.toLowerCase().includes(q)) ||
        (inq.selectedProduct && inq.selectedProduct.toLowerCase().includes(q));

      return matchStatus && matchSearch;
    });
  }, [inquiries, searchQuery, statusFilter]);

  // Metrics
  const metrics = useMemo(() => {
    const total = inquiries.length;
    const newCount = inquiries.filter(i => i.status === 'NEW' || !i.status).length;
    const quotedCount = inquiries.filter(i => i.status === 'QUOTED' || i.status === 'CONTACTED').length;
    const closedCount = inquiries.filter(i => i.status === 'CLOSED').length;
    return { total, newCount, quotedCount, closedCount };
  }, [inquiries]);

  // Pagination
  const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage) || 1;
  const paginatedInquiries = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredInquiries.slice(start, start + itemsPerPage);
  }, [filteredInquiries, currentPage]);

  const handleStatusChange = async (id, newStatus) => {
    if (onUpdateInquiry) {
      await onUpdateInquiry(id, { status: newStatus });
      if (selectedInquiry && selectedInquiry._id === id) {
        setSelectedInquiry(prev => ({ ...prev, status: newStatus }));
      }
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete inquiry from '${name}'?`)) {
      if (onDeleteInquiry) {
        onDeleteInquiry(id);
        if (selectedInquiry && selectedInquiry._id === id) {
          setSelectedInquiry(null);
        }
      }
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Recent';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      {/* ── KPI METRICS BAR ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">Total Inquiries</span>
            <div className="text-2xl font-black text-white mt-1">{metrics.total}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-500/20 text-red-500 flex items-center justify-center">
            <Inbox size={20} />
          </div>
        </div>

        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase">New Inquiries</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">{metrics.newCount}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Clock size={20} />
          </div>
        </div>

        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono font-bold text-purple-400 uppercase">Quoted / In Progress</span>
            <div className="text-2xl font-black text-purple-400 mt-1">{metrics.quotedCount}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
            <FileText size={20} />
          </div>
        </div>

        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">Closed / Resolved</span>
            <div className="text-2xl font-black text-slate-300 mt-1">{metrics.closedCount}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-800 text-slate-400 flex items-center justify-center">
            <CheckCircle2 size={20} />
          </div>
        </div>
      </div>

      {/* ── TOOLBAR: SEARCH & FILTER ── */}
      <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            placeholder="Search by customer name, email, mobile, location, or requirements..."
            className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3 py-2 text-xs text-white outline-none cursor-pointer"
            >
              <option value="ALL">All Status ({inquiries.length})</option>
              <option value="NEW">New Requests ({metrics.newCount})</option>
              <option value="CONTACTED">Contacted</option>
              <option value="QUOTED">Quoted</option>
              <option value="CLOSED">Closed ({metrics.closedCount})</option>
            </select>
          </div>

          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              className="p-2.5 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Refresh Inquiries"
            >
              <RefreshCw size={15} />
            </button>
          )}
        </div>
      </div>

      {/* ── INQUIRIES TABLE ── */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Customer Name & Contact</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Requirement / Items</th>
                <th className="py-3.5 px-4">Date & Time</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {paginatedInquiries.length > 0 ? (
                paginatedInquiries.map((inq) => {
                  const statusInfo = STATUS_CONFIG[inq.status] || STATUS_CONFIG.NEW;
                  const hasItems = Array.isArray(inq.items) && inq.items.length > 0;

                  return (
                    <tr 
                      key={inq._id} 
                      className="hover:bg-slate-850/50 transition-colors group cursor-pointer"
                      onClick={() => setSelectedInquiry(inq)}
                    >
                      {/* Customer Info */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-white group-hover:text-red-400 transition-colors">
                          {inq.name}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                          <span>{inq.email}</span>
                          <span>•</span>
                          <span className="font-mono text-slate-300">{inq.mobile}</span>
                        </div>
                      </td>

                      {/* Location */}
                      <td className="py-3 px-4 text-slate-300">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={13} className="text-slate-500 shrink-0" />
                          <span className="truncate max-w-[120px]">{inq.location || 'Not Specified'}</span>
                        </div>
                      </td>

                      {/* Requirement */}
                      <td className="py-3 px-4 max-w-xs">
                        <div className="font-medium text-slate-200 truncate">
                          {hasItems ? `${inq.items.length} Product(s) Requested` : inq.selectedProduct || 'General Inquiry'}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate line-clamp-1">
                          {inq.message}
                        </div>
                      </td>

                      {/* Date */}
                      <td className="py-3 px-4 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                        {formatDate(inq.createdAt)}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase border ${statusInfo.bg} ${statusInfo.text} ${statusInfo.border}`}>
                          {statusInfo.label}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedInquiry(inq)}
                            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                            title="View Full Inquiry Details"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(inq._id, inq.name)}
                            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors"
                            title="Delete Inquiry"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400">
                    <Inbox size={36} className="mx-auto mb-2 opacity-30" />
                    <p className="text-xs font-semibold">No inquiries found matching current filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <div>
            Showing <span className="text-white font-mono">{paginatedInquiries.length}</span> of{' '}
            <span className="text-white font-mono">{filteredInquiries.length}</span> entries
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

      {/* ── INQUIRY DETAIL MODAL ── */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-6 bg-black/85 backdrop-blur-md flex items-center justify-center">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl animate-scale-up max-h-[90vh] flex flex-col my-auto overflow-hidden">
            {/* Modal Header */}
            <div className="shrink-0 flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-lg shrink-0">
                  <User size={20} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">
                    Inquiry from {selectedInquiry.name}
                  </h4>
                  <p className="text-xs text-slate-400 font-mono">
                    Received: {formatDate(selectedInquiry.createdAt)}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto pr-1 py-4 space-y-5 text-xs">
              {/* Customer Contact Box */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                <div className="text-[10px] font-mono font-bold text-red-400 uppercase">Customer Information</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Full Name:</span>
                    <span className="font-bold text-white text-sm">{selectedInquiry.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Location / City:</span>
                    <span className="font-medium text-slate-200">{selectedInquiry.location || 'Not Provided'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Email Address:</span>
                    <a href={`mailto:${selectedInquiry.email}`} className="text-blue-400 hover:underline font-medium">
                      {selectedInquiry.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Phone / WhatsApp:</span>
                    <a href={`tel:${selectedInquiry.mobile}`} className="text-emerald-400 hover:underline font-mono font-medium">
                      {selectedInquiry.mobile}
                    </a>
                  </div>
                </div>
              </div>

              {/* Requested Products Breakdown */}
              {Array.isArray(selectedInquiry.items) && selectedInquiry.items.length > 0 && (
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                  <div className="text-[10px] font-mono font-bold text-blue-400 uppercase">
                    Requested Products ({selectedInquiry.items.length})
                  </div>
                  <div className="space-y-2">
                    {selectedInquiry.items.map((item, idx) => (
                      <div key={idx} className="p-3 bg-slate-900 border border-slate-800/80 rounded-xl flex items-center justify-between">
                        <div>
                          <div className="font-bold text-white">{item.name} {item.code ? `(3M™ ${item.code})` : ''}</div>
                          <div className="text-[11px] text-slate-400">
                            {[
                              item.selectedColor ? `Color: ${item.selectedColor}` : '',
                              item.selectedWidth ? `Width: ${item.selectedWidth}` : '',
                              item.selectedLength ? `Length: ${item.selectedLength}` : '',
                              item.selectedVolume ? `Volume: ${item.selectedVolume}` : ''
                            ].filter(Boolean).join(' • ') || 'Standard Specification'}
                          </div>
                        </div>
                        <div className="text-red-400 font-mono font-bold text-xs bg-red-950/40 border border-red-500/20 px-2.5 py-1 rounded-lg">
                          Qty: {item.quantity || 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Requirement Message */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <div className="text-[10px] font-mono font-bold text-purple-400 uppercase">Customer Message / RFQ Specs</div>
                <div className="p-3 bg-slate-900 border border-slate-800/60 rounded-xl text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Status Update Control */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-bold text-white block">Update CRM Processing Status</span>
                  <span className="text-[10px] text-slate-400">Track client communication and quotation progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedInquiry.status || 'NEW'}
                    onChange={(e) => handleStatusChange(selectedInquiry._id, e.target.value)}
                    className="bg-slate-900 border border-slate-700 focus:border-red-500 rounded-xl px-3 py-2 text-xs font-bold text-white outline-none cursor-pointer"
                  >
                    <option value="NEW">🟢 New Request</option>
                    <option value="CONTACTED">🔵 Contacted</option>
                    <option value="QUOTED">🟣 Quoted</option>
                    <option value="CLOSED">⚪ Closed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="shrink-0 pt-3 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selectedInquiry.email}`}
                  className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Mail size={13} /> Reply Email
                </a>
                <a
                  href={`tel:${selectedInquiry.mobile}`}
                  className="px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Phone size={13} /> Call Customer
                </a>
              </div>

              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InquiriesManager;
