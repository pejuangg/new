import React, { useState } from 'react';
import { Product } from '../types';

interface CoverCardProps {
  product: Product;
  index: number;
  isFavorite: boolean;
  onSelect: (product: Product) => void;
  onToggleFavorite?: (e: React.MouseEvent, productId: string) => void;
}

export const CoverCard: React.FC<CoverCardProps> = ({
  product,
  index,
  isFavorite,
  onSelect,
  onToggleFavorite
}) => {
  const [logoError, setLogoError] = useState(false);

  const formatK = (price: number) => {
    return Math.round(price / 1000) + 'K';
  };

  const bgStyle = product.brandColor || '#22252b';
  const textStyle = product.inkColor || '#f2eee3';
  const iconUrl = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${product.iconDomain}&size=128`;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(product)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(product);
        }
      }}
      className="cover flex aspect-[3/4] w-full flex-col p-3 text-left transition-transform active:scale-[0.97] group cursor-pointer select-none"
      style={{
        backgroundColor: bgStyle,
        color: textStyle
      }}
    >
      {/* Card Header */}
      <div className="flex items-start justify-between z-10 w-full">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[9px] font-bold uppercase opacity-80">
            Nº {String(index + 1).padStart(2, '0')}
          </span>
          <span className="font-mono text-[8.5px] px-1 rounded-xs bg-black/25 opacity-90 font-bold">
            {product.pakets.length} Paket
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {product.tag && (
            <span
              className="sticker rotate-[3deg] px-1.5 py-0.5 text-[8px] tracking-wider"
              style={{ background: 'var(--fg)', color: 'var(--bg)' }}
            >
              {product.tag}
            </span>
          )}
          {onToggleFavorite && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(e, product.id);
              }}
              aria-label={isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
              className={`min-w-[28px] min-h-[28px] rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md ${
                isFavorite
                  ? 'bg-[#d4f534] text-[#131519] scale-105 ring-1 ring-black/40'
                  : 'bg-black/50 text-white hover:bg-black/80 hover:scale-110 active:scale-95'
              }`}
              title={isFavorite ? 'Tersimpan di Favorit ★' : 'Simpan ke Favorit'}
            >
              <span className="text-sm leading-none font-black">
                {isFavorite ? '★' : '☆'}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Product Name */}
      <p className="mt-2 font-display text-[32px] sm:text-[36px] leading-[0.85] break-words z-10">
        {product.name}
      </p>

      {/* Watermark Logo angled */}
      {!logoError ? (
        <img
          src={iconUrl}
          alt=""
          onError={() => setLogoError(true)}
          className="pointer-events-none absolute -bottom-4 -right-4 h-28 w-28 -rotate-12 opacity-25 grayscale group-hover:opacity-35 transition-opacity"
          referrerPolicy="no-referrer"
        />
      ) : (
        <span className="pointer-events-none absolute -bottom-3 -right-2 font-display text-8xl -rotate-12 opacity-15">
          {product.name.charAt(0)}
        </span>
      )}

      {/* Tagline / Subtitle */}
      <p className="mt-auto max-w-[80%] font-mono text-[9.5px] font-bold uppercase leading-tight opacity-90 z-10 line-clamp-2">
        {product.tagline || product.description}
      </p>

      {/* Footer Price Kicker */}
      <div
        className="mt-2 flex items-center justify-between border-t pt-2 z-10 w-full"
        style={{ borderColor: 'currentColor' }}
      >
        <span className="font-display text-sm tracking-tight">
          Rp{product.minPrice.toLocaleString('id-ID')}
        </span>
        <span className="font-mono text-[9px] font-bold uppercase flex items-center gap-0.5 opacity-90">
          Pilih →
        </span>
      </div>
    </div>
  );
};
