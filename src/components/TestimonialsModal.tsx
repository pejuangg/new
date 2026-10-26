import React from 'react';
import { TESTIMONIALS } from '../data/testimonials';
import { ADMIN_TELEGRAM } from '../data/products';
import { X, Star, ShieldCheck, ExternalLink, MessageCircle } from 'lucide-react';

interface TestimonialsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TestimonialsModal: React.FC<TestimonialsModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg bg-[#0f1523] border border-cyan-400/25 rounded-2xl max-h-[88vh] flex flex-col overflow-hidden shadow-2xl shadow-cyan-950/70">
        {/* Header */}
        <div className="p-4 bg-[#131b2a] border-b border-cyan-400/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-anton text-base tracking-wide text-white">
                BUKTI TRANSAKSI &amp; TESTIMONI
              </h3>
              <p className="text-[11px] text-slate-400">
                100% Real Pembeli &amp; Bukti Kirim Akun
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Rating summary bar */}
        <div className="p-4 bg-gradient-to-r from-cyan-950/60 to-slate-900 border-b border-cyan-400/15 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="font-jetbrains font-bold text-sm text-white">5.0 / 5.0</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Berdasarkan 5.200+ Transaksi sejak 2023
            </p>
          </div>

          <a
            href={ADMIN_TELEGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Telegram Bukti</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Testimonials List */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-3.5 rounded-xl bg-[#131b2a]/70 border border-slate-800 hover:border-cyan-400/30 transition-all flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-cyan-900/60 border border-cyan-400/40 flex items-center justify-center text-xs font-bold text-cyan-300">
                    {t.customerName.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      <span>{t.customerName}</span>
                      {t.verified && (
                        <ShieldCheck className="w-3 h-3 text-cyan-400 fill-cyan-400/20" />
                      )}
                    </div>
                    <div className="text-[10px] text-cyan-300 font-medium">
                      {t.productName}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex text-amber-400 justify-end">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[9.5px] text-slate-500">{t.date}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/60">
                "{t.comment}"
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#131b2a] border-t border-slate-800 text-center">
          <p className="text-[11px] text-slate-400">
            Lebih dari ribuan bukti chat &amp; feedback realtime bisa dilihat di channel Telegram{' '}
            <a
              href={ADMIN_TELEGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-300 underline font-semibold hover:text-cyan-200"
            >
              @jejakbeli
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
