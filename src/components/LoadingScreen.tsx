import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onFinished: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinished }) => {
  const [progress, setProgress] = useState(0);
  const [stepText, setStepText] = useState('MEMULAI ENGINE REGARM-MART...');

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onFinished, 250);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 25) + 10;
        if (next > 30 && next < 60) {
          setStepText('MEMUAT 42 APLIKASI & 270+ PAKET...');
        } else if (next >= 60 && next < 90) {
          setStepText('MENYIAPKAN METODE PEMBAYARAN & GARANSI...');
        } else if (next >= 90) {
          setStepText('SIAP! MEMBUKA EDISI COVER NO. 042...');
        }
        return next > 100 ? 100 : next;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onFinished]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between p-6 bg-[#111317] text-[#f2eee3] font-mono select-none">
      {/* Top Header */}
      <div className="flex justify-between items-center text-[10px] tracking-widest text-[#a09c8d]">
        <span>REGARM-MART // DIGITAL ZINE</span>
        <span>ISSUE Nº 042</span>
      </div>

      {/* Center Branding & Progress */}
      <div className="max-w-md mx-auto w-full space-y-6">
        <div className="space-y-1">
          <p className="font-display text-6xl sm:text-7xl leading-none">
            REGARM<span className="text-[#d4f534]">-</span>MART
          </p>
          <p className="text-xs uppercase tracking-widest text-[#a09c8d]">
            Digital Store Catalog • Est. 2023
          </p>
        </div>

        {/* Brutalist Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-[#d4f534]">
            <span className="truncate">{stepText}</span>
            <span>{progress}%</span>
          </div>

          <div className="h-4 w-full border-2 border-[#f2eee3] p-0.5 bg-black">
            <div
              className="h-full bg-[#d4f534] transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Specs checklist */}
        <div className="text-[10px] space-y-1 text-[#a09c8d] pt-2">
          <p className="text-emerald-400">✓ 42 Applications parsed</p>
          <p className="text-emerald-400">✓ 270+ Official packages active</p>
          <p className="text-emerald-400">✓ QRIS, SeaBank &amp; GoPay configured</p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="flex justify-between items-center text-[9px] text-[#a09c8d]">
        <span>JAKARTA, ID</span>
        <span>PROSES 1-30 MENIT BERGARANSI</span>
      </div>
    </div>
  );
};
