import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in transition-all">
      <div className={`flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl border backdrop-blur-md ${
        isSuccess 
          ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-100 shadow-emerald-950/50' 
          : isError 
            ? 'bg-rose-950/90 border-rose-500/40 text-rose-100 shadow-rose-950/50' 
            : 'bg-slate-900/90 border-slate-700 text-slate-100 shadow-black/50'
      }`}>
        {isSuccess && <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />}
        {isError && <AlertCircle size={20} className="text-rose-400 shrink-0" />}
        {!isSuccess && !isError && <Info size={20} className="text-blue-400 shrink-0" />}
        
        <div className="text-sm font-medium pr-2">
          {toast.message}
        </div>

        <button 
          onClick={onClose} 
          className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors ml-2"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
