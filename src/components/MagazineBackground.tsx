import React from 'react';

export const MagazineBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Technical Blueprint Grid Pattern */}
      <div className="absolute inset-0 bg-grid-tech opacity-40" />

      {/* 2. Acidic Lime & Cyber Ambient Glow Meshes */}
      <div 
        className="absolute -top-[120px] -right-[100px] w-[500px] h-[500px] rounded-full blur-[140px] opacity-25 animate-pulse-slow pointer-events-none"
        style={{ background: 'radial-gradient(circle, #d4f534 0%, transparent 70%)' }}
      />
      <div 
        className="absolute top-[40%] -left-[160px] w-[520px] h-[520px] rounded-full blur-[150px] opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)' }}
      />
      <div 
        className="absolute -bottom-[120px] right-[10%] w-[600px] h-[450px] rounded-full blur-[140px] opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #e5484d 0%, transparent 70%)' }}
      />

      {/* 3. Corner Halftone Dots Accent */}
      <div className="absolute top-0 right-0 w-64 h-64 halftone opacity-30" />
      <div className="absolute bottom-20 left-0 w-72 h-72 halftone-lime opacity-20" />

      {/* 4. Signature ZAY Typography Watermark (Angled -12deg) */}
      <div 
        className="absolute inset-[-20%] w-[140%] h-[140%] flex flex-col justify-around -rotate-12 opacity-[0.038] pointer-events-none"
        aria-hidden="true"
      >
        <div className="flex justify-around whitespace-nowrap">
          <span className="font-display text-[clamp(90px,16vw,190px)] tracking-[10px] text-transparent" style={{ WebkitTextStroke: '2px var(--lime)' }}>ZAY</span>
          <span className="font-display text-[clamp(90px,16vw,190px)] tracking-[10px] text-transparent" style={{ WebkitTextStroke: '2px var(--fg)' }}>ZAY</span>
          <span className="font-display text-[clamp(90px,16vw,190px)] tracking-[10px] text-[var(--lime)]">ZAY</span>
          <span className="font-display text-[clamp(90px,16vw,190px)] tracking-[10px] text-transparent" style={{ WebkitTextStroke: '2px var(--fg)' }}>ZAY</span>
        </div>
        <div className="flex justify-around whitespace-nowrap">
          <span className="font-display text-[clamp(90px,16vw,190px)] tracking-[10px] text-[var(--lime)]">ZAY</span>
          <span className="font-display text-[clamp(90px,16vw,190px)] tracking-[10px] text-transparent" style={{ WebkitTextStroke: '2px var(--lime)' }}>ZAY</span>
          <span className="font-display text-[clamp(90px,16vw,190px)] tracking-[10px] text-transparent" style={{ WebkitTextStroke: '2px var(--fg)' }}>ZAY</span>
          <span className="font-display text-[clamp(90px,16vw,190px)] tracking-[10px] text-[var(--fg)]">ZAY</span>
        </div>
        <div className="flex justify-around whitespace-nowrap">
          <span className="font-display text-[clamp(90px,16vw,190px)] tracking-[10px] text-transparent" style={{ WebkitTextStroke: '2px var(--fg)' }}>ZAY</span>
          <span className="font-display text-[clamp(90px,16vw,190px)] tracking-[10px] text-[var(--lime)]">ZAY</span>
          <span className="font-display text-[clamp(90px,16vw,190px)] tracking-[10px] text-transparent" style={{ WebkitTextStroke: '2px var(--lime)' }}>ZAY</span>
          <span className="font-display text-[clamp(90px,16vw,190px)] tracking-[10px] text-transparent" style={{ WebkitTextStroke: '2px var(--fg)' }}>ZAY</span>
        </div>
        <div className="flex justify-around whitespace-nowrap">
          <span className="font-display text-[clamp(90px,16vw,190px)] tracking-[10px] text-transparent" style={{ WebkitTextStroke: '2px var(--lime)' }}>ZAY</span>
          <span className="font-display text-[clamp(90px,16vw,190px)] tracking-[10px] text-transparent" style={{ WebkitTextStroke: '2px var(--fg)' }}>ZAY</span>
          <span className="font-display text-[clamp(90px,16vw,190px)] tracking-[10px] text-[var(--lime)]">ZAY</span>
          <span className="font-display text-[clamp(90px,16vw,190px)] tracking-[10px] text-transparent" style={{ WebkitTextStroke: '2px var(--fg)' }}>ZAY</span>
        </div>
      </div>

      {/* 5. Minimalist Editorial Registration Marks */}
      <div className="absolute top-4 left-4 font-mono text-[9px] text-[#ffffff]/15">
        + 042 // REGARMZ.SHOP
      </div>
      <div className="absolute top-4 right-4 font-mono text-[9px] text-[#ffffff]/15">
        [ ISO · 2023 ] +
      </div>
      <div className="absolute bottom-20 right-4 font-mono text-[9px] text-[#ffffff]/15 hidden sm:block">
        AUTHENTIC DIGITAL ESSENTIALS · JAKARTA
      </div>
    </div>
  );
};
