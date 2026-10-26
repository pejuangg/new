import React from 'react';
import { OPEN_HOUR, CLOSE_HOUR, PRODUCTS } from '../data/products';

interface MagazineWelcomeProps {
  onEnter: () => void;
}

export const MagazineWelcome: React.FC<MagazineWelcomeProps> = ({ onEnter }) => {
  const now = new Date();
  const h = (now.getUTCHours() + 7) % 24;
  const isOpen = h >= OPEN_HOUR && h < CLOSE_HOUR;
  const greet = h < 11 ? 'Selamat pagi' : h < 15 ? 'Selamat siang' : h < 18 ? 'Selamat sore' : 'Selamat malam';
  const dateStr = now.toLocaleDateString('id-ID', { month: 'short', year: 'numeric', timeZone: 'Asia/Jakarta' }).toUpperCase();

  const marqueeText = 'TRUSTED SINCE 2023 ✺ 300+ PROOF ✺ ADA HARGA ADA KUALITAS ✺ GARANSI SETIAP PAKET ✺ ORDER VIA WHATSAPP ✺ ';

  return (
    <section className="flex min-h-screen flex-col justify-between max-w-md mx-auto relative overflow-hidden bg-transparent z-10">
      {/* Top Issue Kicker */}
      <div className="flex items-center justify-between px-5 pt-6">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--muted)' }}>
          Issue Nº 042 · {dateStr}
        </p>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--muted)' }}>
          Rp — IDR
        </p>
      </div>

      {/* Main Cover Typography & Torn Paper */}
      <div className="relative flex-1 px-5 pt-5 pb-4 flex flex-col justify-center">
        <h1 className="font-display text-[25vw] leading-[0.82] sm:text-[112px]">
          <span className="block drop-in">Regarm</span>
          <span className="block drop-in" style={{ color: 'var(--lime)', animationDelay: '0.1s' }}>
            -Mart
          </span>
          <span className="outline-text block drop-in" style={{ animationDelay: '0.2s' }}>
            Store
          </span>
        </h1>

        {/* Torn Paper Sticker Note */}
        <div
          className="paper drop-in absolute right-3 top-[38%] w-44 p-4 pt-6 z-20 shadow-xl"
          style={{ '--r': '4deg', animationDelay: '0.35s' } as React.CSSProperties}
        >
          <span className="tape -top-1 left-10 -rotate-3"></span>
          <p className="font-display text-xl text-[#26282e]">Same apps. Higher possibilities.</p>
          <div className="barcode mt-3 w-24 text-[#26282e]"></div>
        </div>

        {/* Brand Avatar Lockup */}
        <div className="relative mt-7 flex items-end gap-4">
          <div
            className="relative drop-in"
            style={{ '--r': '-3deg', animationDelay: '0.45s' } as React.CSSProperties}
          >
            <div className="h-20 w-20 rounded-full border-2 overflow-hidden bg-black flex items-center justify-center border-[#f2eee3] shadow-lg">
              <img
                src="https://regarmz.shop/ava.png"
                alt="Logo REGARM-MART"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/bottts/svg?seed=REGARM';
                }}
                className="h-full w-full object-cover grayscale contrast-125"
              />
            </div>
            <span
              className="sticker wiggle absolute -bottom-2 -right-8"
              style={{ background: 'var(--fg)', color: 'var(--bg)' }}
            >
              Est. 2023
            </span>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="mt-8 grid grid-cols-3 border-y py-1" style={{ borderColor: 'rgba(242,238,227,.25)' }}>
          <div className="py-2.5">
            <p className="font-display text-3xl">{PRODUCTS.length}</p>
            <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.18em]" style={{ color: 'var(--muted)' }}>
              Aplikasi
            </p>
          </div>
          <div className="py-2.5 border-l pl-3" style={{ borderColor: 'rgba(242,238,227,.25)' }}>
            <p className="font-display text-3xl">120+</p>
            <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.18em]" style={{ color: 'var(--muted)' }}>
              Paket Aktif
            </p>
          </div>
          <div className="py-2.5 border-l pl-3" style={{ borderColor: 'rgba(242,238,227,.25)' }}>
            <p className="font-display text-3xl">300+</p>
            <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.18em]" style={{ color: 'var(--muted)' }}>
              Proof
            </p>
          </div>
        </div>

        {/* Status Line */}
        <div className="mt-4 flex items-center justify-between">
          <span
            className="sticker -rotate-2"
            style={{
              background: isOpen ? 'var(--lime)' : 'var(--red)',
              color: isOpen ? 'var(--ink)' : '#ffffff'
            }}
          >
            ● {isOpen ? 'Store buka · 1–30 mnt' : `Tutup · buka ${OPEN_HOUR}.00 WIB`}
          </span>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--muted)' }}>
            {greet}, buyer
          </p>
        </div>
      </div>

      {/* Enter Store Button */}
      <div className="px-5 pb-4 pt-2">
        <button
          type="button"
          onClick={onEnter}
          className="brutal group flex w-full items-center justify-between px-6 py-4.5 cursor-pointer shadow-2xl transition-transform active:scale-95"
          style={{ background: 'var(--lime)', color: 'var(--ink)' }}
        >
          <div className="text-left">
            <span className="font-display text-3xl block leading-tight">Buka REGARM-MART</span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider block opacity-90">
              Masuk ke Toko ({PRODUCTS.length} Aplikasi)
            </span>
          </div>
          <span className="font-display text-4xl transition-transform group-hover:translate-x-2">
            →
          </span>
        </button>
      </div>

      {/* Marquee Banner */}
      <div className="overflow-hidden py-2 select-none" style={{ background: 'var(--lime)', color: 'var(--ink)' }}>
        <div className="marquee flex w-max whitespace-nowrap font-display text-lg">
          <span>{marqueeText.repeat(2)}</span>
          <span>{marqueeText.repeat(2)}</span>
        </div>
      </div>
    </section>
  );
};
