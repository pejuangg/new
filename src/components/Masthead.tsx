import React from 'react';
import { OPEN_HOUR, CLOSE_HOUR } from '../data/products';
import { Sun, Moon, Info } from 'lucide-react';

interface MastheadProps {
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
  onGoHome: () => void;
  onOpenCover: () => void;
  onOpenInfo?: () => void;
}

export const Masthead: React.FC<MastheadProps> = ({
  theme = 'dark',
  onToggleTheme,
  onGoHome,
  onOpenCover,
  onOpenInfo
}) => {
  const now = new Date();
  const h = (now.getUTCHours() + 7) % 24;
  const m = now.getUTCMinutes();
  const isOpen = (h >= 10 && h <= 23) || (h === 0 && m <= 30);
  const dateStr = now.toLocaleDateString('id-ID', { month: 'short', year: 'numeric', timeZone: 'Asia/Jakarta' }).toUpperCase();

  return (
    <header
      className="sticky top-0 z-30 border-b backdrop-blur-md"
      style={{
        borderColor: 'var(--border)',
        backgroundColor: 'var(--card)'
      }}
    >
      <div className="flex items-center justify-between px-5 py-3 max-w-md mx-auto">
        <button
          type="button"
          onClick={onGoHome}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
        >
          <div className="h-9 w-9 rounded-full border-2 overflow-hidden bg-black flex items-center justify-center border-[#f2eee3] shadow-sm">
            <img
              src="https://regarmz.shop/ava.png"
              alt="Logo REGARM-MART"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/bottts/svg?seed=REGARM';
              }}
              className="h-full w-full object-cover grayscale contrast-125"
            />
          </div>
          <div>
            <p className="font-display text-xl tracking-tight transition-colors" style={{ color: 'var(--fg)' }}>
              Regarm<span style={{ color: 'var(--lime)' }}>-</span>Mart
            </p>
            <p
              className="font-mono text-[9px] font-bold uppercase tracking-[0.2em]"
              style={{ color: 'var(--muted)' }}
            >
              Digital Store · {dateStr}
            </p>
          </div>
        </button>

        <div className="flex items-center gap-2">
          {/* Theme switcher */}
          {onToggleTheme && (
            <button
              type="button"
              onClick={onToggleTheme}
              className="p-1.5 rounded-full border flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95"
              style={{ borderColor: 'var(--border)', background: 'var(--card)', color: 'var(--fg)' }}
              title={`Ganti tema (${theme === 'dark' ? 'Terang' : 'Gelap'})`}
              aria-label="Toggle tema gelap/terang"
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
              )}
            </button>
          )}

          {/* Info Modal Button */}
          {onOpenInfo && (
            <button
              type="button"
              onClick={onOpenInfo}
              className="p-1.5 rounded-full border flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95"
              style={{ borderColor: 'var(--border)', background: 'var(--card)', color: 'var(--fg)' }}
              title="Info Toko & Jam Buka"
              aria-label="Buka info toko"
            >
              <Info className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          )}

          {/* Cover Issue Button */}
          <button
            type="button"
            onClick={onOpenCover}
            className="font-mono text-[9px] font-bold uppercase px-2 py-1 border rounded-xs transition-colors hover:bg-white/5 cursor-pointer"
            style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
            title="Buka Cover Majalah"
          >
            Cover
          </button>

          {/* Store status dot */}
          <span
            className="h-3 w-3 rounded-full border-2 inline-block transition-colors"
            style={{
              borderColor: 'var(--fg)',
              backgroundColor: isOpen ? 'var(--lime)' : 'var(--red)'
            }}
            title={isOpen ? 'Store Buka (Proses 1-30 menit)' : 'Store Tutup (Buka 10.00 WIB)'}
            aria-label="Status toko"
          />
        </div>
      </div>
    </header>
  );
};
