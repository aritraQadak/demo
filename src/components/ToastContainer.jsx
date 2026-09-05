import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useSeller } from '../context/SellerContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useSeller();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-white rounded-xl shadow-lg border border-gray-200/90 p-3.5 flex items-start gap-3 animate-in slide-in-from-bottom-3 duration-200"
        >
          {toast.type === 'success' && (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          )}
          {toast.type === 'error' && (
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          )}
          {toast.type === 'info' && (
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          )}

          <div className="flex-1 text-xs text-gray-800 font-medium leading-snug">
            {toast.message}
          </div>

          <button
            type="button"
            onClick={() => removeToast(toast.id)}
            className="text-gray-400 hover:text-gray-700 p-0.5 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
