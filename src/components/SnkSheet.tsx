import React from 'react';
import { SNK_ORDER_ITEMS, SNK_KLAIM_ITEMS } from '../data/mainDatabase';
import { ShieldCheck, Copy, AlertTriangle } from 'lucide-react';

interface SnkSheetProps {
  onClose: () => void;
  onShowToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

export const SnkSheet: React.FC<SnkSheetProps> = ({ onClose, onShowToast }) => {
  const formatText = `☆ ✪ FORMAT KLAIM GARANSI ✪\nミ Nama aplikasi :\nミ Email:\nミ Password:\nミ ‌Plan:\nミ Profil + pin:\nミ Problem/masalah:\nミ ‌Tanggal order:\nミ Durasi order:\nミ Sisa hari:`;

  const handleCopyFormat = () => {
    navigator.clipboard.writeText(formatText);
    onShowToast('Format klaim garansi disalin!', 'success');
  };

  return (
    <div className="pb-8">
      {/* Header */}
      <div className="px-5 pt-6">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--muted)' }}>
          Aturan Toko &amp; Garansi
        </p>
        <h2 className="font-display text-5xl text-[#f2eee3] leading-[0.85] mt-1">
          Ketentuan &amp; Garansi
        </h2>
      </div>

      <div className="space-y-4 p-5">
        {/* Ketentuan Order */}
        <div
          className="p-4 border rounded-xs space-y-2"
          style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
        >
          <div className="flex items-center gap-2 font-display text-xl text-[#d4f534] border-b pb-2" style={{ borderColor: 'var(--border)' }}>
            <AlertTriangle className="w-5 h-5 text-[#d4f534]" />
            <span>KETENTUAN ORDER</span>
          </div>
          <div className="space-y-1.5 text-xs font-mono text-[#f2eee3] opacity-90 pt-1">
            {SNK_ORDER_ITEMS.map((item, idx) => (
              <p key={idx} className="leading-relaxed">
                ㈥ {item}
              </p>
            ))}
          </div>
        </div>

        {/* Klaim Garansi */}
        <div
          className="p-4 border rounded-xs space-y-3"
          style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
        >
          <div className="flex items-center gap-2 font-display text-xl text-[#d4f534] border-b pb-2" style={{ borderColor: 'var(--border)' }}>
            <ShieldCheck className="w-5 h-5 text-[#d4f534]" />
            <span>KLAIM GARANSI</span>
          </div>

          <div className="p-3 border rounded-xs font-mono text-xs bg-[#111317] text-[#d4f534] space-y-0.5 leading-relaxed" style={{ borderColor: 'var(--border)' }}>
            <p className="font-bold text-center mb-1 text-[#f2eee3]">☆ ✪ FORMAT KLAIM GARANSI ✪</p>
            <p>ミ Nama aplikasi : </p>
            <p>ミ Email: </p>
            <p>ミ Password:</p>
            <p>ミ ‌Plan: 1u/2u/semi/privat/dll </p>
            <p>ミ Profil + pin (jika ada):</p>
            <p>ミ Problem/masalah:</p>
            <p>ミ ‌Tanggal order: </p>
            <p>ミ Durasi order: </p>
            <p>ミ Sisa hari:</p>
          </div>

          <button
            type="button"
            onClick={handleCopyFormat}
            className="brutal w-full py-3 font-mono text-xs font-bold uppercase cursor-pointer flex items-center justify-center gap-2"
            style={{ background: 'var(--lime)', color: 'var(--ink)' }}
          >
            <Copy className="w-4 h-4" />
            <span>Salin Format Klaim Garansi</span>
          </button>

          <div className="pt-2 border-t text-[11px] font-mono text-[#a09c8d] space-y-1" style={{ borderColor: 'var(--border)' }}>
            <p className="font-bold text-[#f2eee3]">Syarat Klaim:</p>
            {SNK_KLAIM_ITEMS.map((item, idx) => (
              <p key={idx}>❖ {item}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
