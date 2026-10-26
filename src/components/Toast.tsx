import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastData {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface ToastProps {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[999] flex flex-col gap-2 max-w-sm w-full pointer-events-none px-3">
      {toasts.map((toast) => {
        const bgStyles = {
          success: 'bg-[#131b2a] border-cyan-400 text-cyan-300 shadow-cyan-950/60',
          info: 'bg-[#131b2a] border-sky-400 text-sky-300 shadow-sky-950/60',
          error: 'bg-[#1b151a] border-rose-500 text-rose-300 shadow-rose-950/60'
        }[toast.type];

        const Icon = {
          success: CheckCircle2,
          info: Info,
          error: AlertCircle
        }[toast.type];

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3 rounded-xl border flex items-center justify-between gap-3 shadow-xl backdrop-blur-md animate-in slide-in-from-top-2 duration-150 ${bgStyles}`}
          >
            <div className="flex items-center gap-2 text-xs font-semibold">
              <Icon className="w-4 h-4 shrink-0" />
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-slate-400 hover:text-white p-0.5 rounded transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
