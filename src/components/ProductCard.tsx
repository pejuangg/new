import React from 'react';
import { Product } from '../types';
import { AppLogo } from './AppLogo';
import { ShieldCheck, ChevronRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const tagColor = {
    TERLARIS: 'bg-cyan-400 text-slate-950 font-black shadow-cyan-400/30 shadow-sm',
    HOT: 'bg-sky-400 text-slate-950 font-black shadow-sky-400/30 shadow-sm',
    PROMO: 'bg-emerald-400 text-slate-950 font-black shadow-emerald-400/30 shadow-sm',
    BARU: 'bg-purple-400 text-slate-950 font-black shadow-purple-400/30 shadow-sm',
    HEMAT: 'bg-amber-400 text-slate-950 font-black shadow-amber-400/30 shadow-sm'
  }[product.tag || 'HOT'];

  return (
    <div
      onClick={() => onSelect(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(product);
        }
      }}
      className="group relative bg-[#131b2a]/80 hover:bg-[#192437] border border-cyan-400/15 hover:border-cyan-400/50 rounded-2xl p-3.5 sm:p-4 flex flex-col items-center text-center cursor-pointer transition-all duration-200 hover:-translate-y-1 shadow-lg shadow-black/30 hover:shadow-cyan-950/40"
    >
      {/* Product Tag */}
      {product.tag && (
        <div className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[9px] uppercase tracking-wider ${tagColor}`}>
          {product.tag}
        </div>
      )}

      {/* Package Count Indicator */}
      <div className="absolute top-2.5 right-2.5 text-[9.5px] font-semibold text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded-md border border-slate-700/50">
        {product.pakets.length} Paket
      </div>

      {/* App Logo */}
      <div className="mt-3 mb-2.5">
        <AppLogo
          name={product.name}
          domain={product.iconDomain}
          accentColor={product.accentColor}
          size="md"
        />
      </div>

      {/* App Name */}
      <h3 className="font-bold text-[13.5px] sm:text-sm text-slate-100 group-hover:text-cyan-300 transition-colors leading-snug line-clamp-1 mb-1">
        {product.name}
      </h3>

      {/* Guarantee & Category note */}
      <div className="flex items-center gap-1 text-[10.5px] text-slate-400 font-medium mb-2.5">
        <ShieldCheck className="w-3 h-3 text-cyan-400" />
        <span className="truncate">{product.warrantyPeriod}</span>
      </div>

      {/* Price Section */}
      <div className="mt-auto w-full pt-1">
        <div className="text-[10px] text-slate-400 font-semibold">Mulai dari</div>
        <div className="font-jetbrains text-[13.5px] sm:text-sm font-bold text-cyan-300 mb-2.5">
          {product.minPriceFormatted}
        </div>

        {/* Action Button */}
        <button
          type="button"
          className="w-full py-1.5 px-2 rounded-xl bg-slate-800/80 group-hover:bg-cyan-500 text-slate-200 group-hover:text-slate-950 border border-cyan-400/20 group-hover:border-cyan-400 text-[11px] font-bold tracking-wide transition-all duration-200 flex items-center justify-center gap-1 shadow-sm"
        >
          <span>PILIH PAKET</span>
          <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
};
