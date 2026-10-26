import React, { useState } from 'react';
import { FAQ_LIST } from '../data/testimonials';

interface FaqSheetProps {
  onClose: () => void;
}

export const FaqSheet: React.FC<FaqSheetProps> = ({ onClose }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="pb-8">
      <div className="px-5 pt-6">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--muted)' }}>
          Baca sebelum order
        </p>
        <h2 className="font-display text-6xl text-[#f2eee3] leading-[0.85] mt-1">
          FAQ
        </h2>
      </div>

      <div className="mt-4 divide-y border-y" style={{ borderColor: 'rgba(242,238,227,.25)' }}>
        {FAQ_LIST.map((f, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="px-5 py-4" style={{ borderColor: 'var(--border)' }}>
              <button
                type="button"
                onClick={() => toggle(i)}
                className="flex w-full cursor-pointer list-none items-center justify-between font-display text-xl text-left"
              >
                <span>{f.question}</span>
                <span
                  className="transition-transform text-2xl font-display"
                  style={{
                    color: 'var(--lime)',
                    transform: isOpen ? 'rotate(45deg)' : 'none'
                  }}
                >
                  +
                </span>
              </button>
              {isOpen && (
                <p className="mt-2 text-xs leading-relaxed whitespace-pre-line" style={{ color: 'var(--muted)' }}>
                  {f.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
