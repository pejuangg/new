import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  sortBy: 'popular' | 'price-asc' | 'price-desc' | 'name';
  onSortChange: (sort: 'popular' | 'price-asc' | 'price-desc' | 'name') => void;
}

const CATEGORIES = [
  'Semua',
  'Streaming',
  'Editing',
  'Education & AI',
  'Music',
  'Other'
];

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange
}) => {
  return (
    <div className="w-full flex flex-col gap-2.5">
      {/* Search Input Bar */}
      <div className="relative w-full flex items-center">
        <div className="absolute left-3.5 text-cyan-400 pointer-events-none">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari Netflix, Spotify, ChatGPT, Canva Pro..."
          className="w-full bg-[#131b2a]/90 border border-cyan-400/20 text-slate-100 placeholder-slate-400 pl-10 pr-10 py-3 rounded-xl text-[13.5px] outline-none transition-all duration-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-inner"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 p-1 rounded-md text-slate-400 hover:text-white transition-colors"
            aria-label="Hapus pencarian"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Categories & Sorting Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        {/* Horizontal Scrollable Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none max-w-full">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-150 active:scale-95 ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-md shadow-cyan-500/25 border border-cyan-400'
                    : 'bg-[#131b2a]/80 text-slate-300 hover:text-white hover:bg-[#1a263b] border border-cyan-400/15'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Sort Selector */}
        <div className="flex items-center self-end sm:self-auto gap-1.5 shrink-0">
          <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
            <SlidersHorizontal className="w-3 h-3 text-cyan-400" />
            <span>Urutkan:</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as any)}
            className="bg-[#131b2a] border border-cyan-400/20 text-cyan-300 text-xs rounded-lg px-2.5 py-1.5 outline-none font-semibold cursor-pointer focus:border-cyan-400"
          >
            <option value="popular">Terpopuler</option>
            <option value="price-asc">Harga Termurah</option>
            <option value="price-desc">Harga Tertinggi</option>
            <option value="name">Nama A-Z</option>
          </select>
        </div>
      </div>
    </div>
  );
};
