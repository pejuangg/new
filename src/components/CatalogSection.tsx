import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { CoverCard } from './CoverCard';

interface CatalogSectionProps {
  products: Product[];
  favorites: string[];
  initialQuery?: string;
  onSelectProduct: (product: Product) => void;
  onToggleFavorite: (e: React.MouseEvent, productId: string) => void;
}

const CATEGORIES = [
  { id: 'Semua', label: 'Semua' },
  { id: 'Streaming', label: 'Streaming' },
  { id: 'Editing', label: 'Editing' },
  { id: 'Education & AI', label: 'Education & AI' },
  { id: 'Music', label: 'Music' },
  { id: 'Other', label: 'Other' }
];

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  favorites,
  initialQuery = '',
  onSelectProduct,
  onToggleFavorite
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCat, setSelectedCat] = useState('Semua');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'name'>('popular');

  React.useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  const filtered = useMemo(() => {
    const list = products.filter((x) => {
      let matchCat = false;
      if (selectedCat === 'Semua') matchCat = true;
      else if (selectedCat === 'Music') matchCat = x.category === 'Music';
      else if (selectedCat === 'Streaming') matchCat = x.category === 'Streaming';
      else if (selectedCat === 'Editing') matchCat = x.category === 'Editing';
      else if (selectedCat === 'Education & AI') matchCat = x.category === 'Education & AI' || (x.category as any) === 'Education';
      else if (selectedCat === 'Other') matchCat = x.category === 'Other';
      else matchCat = x.category.toLowerCase().includes(selectedCat.toLowerCase());

      const q = query.toLowerCase().trim();
      const matchSearch =
        !q ||
        x.name.toLowerCase().includes(q) ||
        x.description.toLowerCase().includes(q) ||
        (x.tagline && x.tagline.toLowerCase().includes(q)) ||
        x.pakets.some((p) => p.name.toLowerCase().includes(q));

      return matchCat && matchSearch;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.minPrice - b.minPrice);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.minPrice - a.minPrice);
    }
    if (sortBy === 'name') {
      return [...list].sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [products, query, selectedCat, sortBy]);

  const getCategoryCount = (catId: string) => {
    if (catId === 'Semua') return products.length;
    return products.filter((p) => {
      if (catId === 'Music') return p.category === 'Music';
      if (catId === 'Streaming') return p.category === 'Streaming';
      if (catId === 'Editing') return p.category === 'Editing';
      if (catId === 'Education & AI') return p.category === 'Education & AI' || (p.category as any) === 'Education';
      if (catId === 'Other') return p.category === 'Other';
      return p.category.toLowerCase().includes(catId.toLowerCase());
    }).length;
  };

  return (
    <div className="px-5 pt-5 pb-8 max-w-md mx-auto relative z-10">
      {/* Kicker */}
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--muted)' }}>
          Katalog Lengkap · {products.length} Judul Aplikasi
        </p>
        <span className="font-mono text-[10px] text-[#d4f534] font-bold">
          Aktif 100%
        </span>
      </div>

      {/* Massive Title */}
      <h2 className="font-display text-7xl text-[#f2eee3] leading-[0.85] mt-1 mb-4">
        Katalog
      </h2>

      {/* Sticky Search & Filter Bar */}
      <div
        className="sticky top-[61px] z-20 -mx-5 space-y-3 px-5 py-3 backdrop-blur-md"
        style={{ backgroundColor: 'rgba(17, 19, 23, 0.95)' }}
      >
        <div className="flex items-center gap-2 border-b-2 pb-2" style={{ borderColor: 'var(--fg)' }}>
          <span className="font-display text-xl select-none" style={{ color: 'var(--lime)' }}>
            ⌕
          </span>
          <input
            id="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="CARI APLIKASI (NETFLIX, SPOTIFY, CANVA...)"
            className="w-full bg-transparent font-mono text-sm font-bold uppercase outline-none placeholder:text-slate-500"
            style={{ color: 'var(--fg)' }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="font-mono text-xs text-slate-400 hover:text-white px-1"
            >
              ✕
            </button>
          )}
        </div>

        {/* Categories Pills with item counts */}
        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 scrollbar-none">
          {CATEGORIES.map((c) => {
            const isActive = selectedCat === c.id;
            const count = getCategoryCount(c.id);
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCat(c.id)}
                className="shrink-0 border px-3 py-1.5 font-mono text-[11px] font-bold uppercase transition-colors cursor-pointer flex items-center gap-1.5"
                style={{
                  borderColor: isActive ? 'var(--lime)' : 'rgba(242, 238, 227, 0.35)',
                  backgroundColor: isActive ? 'var(--lime)' : 'transparent',
                  color: isActive ? 'var(--ink)' : 'var(--fg)'
                }}
              >
                <span>{c.label}</span>
                <span
                  className="text-[9px] px-1 py-0.2 rounded-xs"
                  style={{
                    backgroundColor: isActive ? 'var(--ink)' : 'rgba(255,255,255,0.1)',
                    color: isActive ? 'var(--lime)' : 'var(--fg)'
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Result counter & Sorting Row */}
      <div className="flex items-center justify-between my-3 text-[11px] font-mono text-[#a09c8d]">
        <span><b>{filtered.length}</b> dari {products.length} aplikasi</span>
        
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-[#f2eee3]/60 hidden xs:inline">Urut:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#191c23] border px-2 py-1 text-[10px] font-mono font-bold uppercase rounded-xs outline-none cursor-pointer text-[#d4f534]"
            style={{ borderColor: 'var(--border)' }}
          >
            <option value="popular">Terpopuler ★</option>
            <option value="price-asc">Harga Termurah</option>
            <option value="price-desc">Harga Tertinggi</option>
            <option value="name">Nama A-Z</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center space-y-4">
          <div className="paper relative p-6 pt-8 rotate-[-1.5deg] text-[#26282e]">
            <span className="tape -top-1 left-1/2 -translate-x-1/2"></span>
            <p className="font-display text-3xl">Tidak ditemukan.</p>
            <p className="mt-2 text-sm">
              Tidak ada aplikasi dengan kata kunci "{query}".
            </p>
          </div>
          <button
            onClick={() => {
              setQuery('');
              setSelectedCat('Semua');
            }}
            className="brutal w-full py-3.5 font-display text-xl cursor-pointer"
            style={{ background: 'var(--lime)', color: 'var(--ink)' }}
          >
            Reset Pencarian →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((prod, idx) => (
            <CoverCard
              key={prod.id}
              product={prod}
              index={idx}
              isFavorite={favorites.includes(prod.id)}
              onSelect={onSelectProduct}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};
