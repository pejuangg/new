import React, { useState } from 'react';
import { FAQ_LIST } from '../data/testimonials';
import { ADMIN_WHATSAPP } from '../data/products';
import { X, HelpCircle, ChevronDown, ShieldCheck, Zap } from 'lucide-react';

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FaqModal: React.FC<FaqModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

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
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-anton text-base tracking-wide text-white">
                PANDUAN GARANSI &amp; FAQ
              </h3>
              <p className="text-[11px] text-slate-400">
                Informasi jenis akun, klaim garansi, dan jam kerja
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

        {/* Accordion content */}
        <div className="p-4 overflow-y-auto space-y-2 flex-1">
          {FAQ_LIST.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-800 rounded-xl overflow-hidden bg-[#131b2a]/60"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-3 text-left flex items-center justify-between gap-2 hover:bg-[#192437] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-800/40 uppercase">
                      {faq.category}
                    </span>
                    <span className="text-xs font-bold text-white">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-cyan-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="p-3 pt-0 text-xs text-slate-300 leading-relaxed whitespace-pre-line border-t border-slate-800/60 bg-slate-900/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#131b2a] border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">Butuh bantuan lain?</span>
          <a
            href={`https://wa.me/${ADMIN_WHATSAPP}?text=Halo%20Admin%20REGARM-MART,%20saya%20mau%20tanya%20garansi`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1 transition-colors"
          >
            <Zap className="w-3.5 h-3.5 fill-slate-950" />
            <span>Chat Admin WA</span>
          </a>
        </div>
      </div>
    </div>
  );
};
