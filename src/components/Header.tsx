import React from 'react';
import { Zap, ShieldCheck, Clock, MessageSquare, ReceiptText } from 'lucide-react';
import { ADMIN_WHATSAPP } from '../data/products';

interface HeaderProps {
  onOpenOrderTracker: () => void;
  onOpenTestimonials: () => void;
  onOpenFaq: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenOrderTracker,
  onOpenTestimonials,
  onOpenFaq
}) => {
  return (
    <header className="w-full bg-[#131b2a]/80 backdrop-blur-md border border-cyan-400/20 rounded-2xl p-3.5 sm:p-4 shadow-xl shadow-black/40 relative z-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-700 flex items-center justify-center p-0.5 border border-cyan-300 shadow-md shadow-cyan-500/20">
              <div className="w-full h-full bg-[#0b0f17] rounded-[10px] flex items-center justify-center">
                <span className="font-anton text-cyan-300 text-xl tracking-wider">R</span>
                <Zap className="w-3.5 h-3.5 text-cyan-400 absolute -top-1 -right-1 fill-cyan-400" />
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400"></span>
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="font-anton text-xl tracking-wide text-white flex items-center gap-1.5 drop-shadow-sm">
                REGARM-MART <span className="text-cyan-400 text-lg">⚡</span>
              </h1>
              <span className="hidden xs:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-950/70 text-cyan-300 border border-cyan-500/30">
                VERIFIED STORE
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
              <span className="flex items-center gap-1.5 text-cyan-300 font-semibold text-[11.5px]">
                <Clock className="w-3 h-3 text-cyan-400" />
                Buka • 10.00 – 00.30 WIB
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                Fast Response 3-10 Menit
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions & Trust Stats */}
        <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-cyan-950/50">
          <div className="flex items-center gap-1.5">
            <button
              onClick={onOpenOrderTracker}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 hover:text-cyan-200 border border-cyan-500/25 text-[11px] font-semibold transition-all duration-150 active:scale-95"
              title="Cek Status Order dan Riwayat Akun"
            >
              <ReceiptText className="w-3.5 h-3.5" />
              <span>Cek Order</span>
            </button>

            <button
              onClick={onOpenTestimonials}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/60 text-[11px] font-semibold transition-all duration-150 active:scale-95"
              title="Lihat Bukti Transaksi & Ulasan Pembeli"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Testimoni</span>
            </button>

            <button
              onClick={onOpenFaq}
              className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/60 text-[11px] font-semibold transition-all duration-150 active:scale-95"
              title="Panduan Garansi & Tanya Jawab"
            >
              <span>Garansi & FAQ</span>
            </button>
          </div>

          <div className="text-right pl-2 sm:border-l border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Trusted Since</div>
            <div className="font-jetbrains font-bold text-xs text-cyan-300">2023</div>
          </div>
        </div>
      </div>
    </header>
  );
};
