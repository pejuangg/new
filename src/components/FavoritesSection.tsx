import React from 'react';
import { Product } from '../types';
import { CoverCard } from './CoverCard';

interface FavoritesSectionProps {
  products: Product[];
  favorites: string[];
  onSelectProduct: (product: Product) => void;
  onToggleFavorite: (e: React.MouseEvent, productId: string) => void;
  onGoToCatalog: () => void;
}

export const FavoritesSection: React.FC<FavoritesSectionProps> = ({
  products,
  favorites,
  onSelectProduct,
  onToggleFavorite,
  onGoToCatalog
}) => {
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  if (favoriteProducts.length === 0) {
    return (
      <div className="px-5 pt-5 pb-8 max-w-md mx-auto">
        <h2 className="font-display text-7xl text-[#f2eee3]">Favorit</h2>
        <div className="paper relative mt-8 rotate-[-1.5deg] p-6 pt-8 text-[#26282e] shadow-xl">
          <span className="tape -top-1 left-1/2 -translate-x-1/2"></span>
          <p className="font-display text-3xl">Masih kosong.</p>
          <p className="mt-2 text-sm">
            Belum ada aplikasi yang disimpan. Buka katalog lalu tekan tanda ★ di pojok kanan kartu produk.
          </p>
        </div>
        <button
          type="button"
          onClick={onGoToCatalog}
          className="brutal mt-8 w-full py-4 font-display text-2xl cursor-pointer"
          style={{ background: 'var(--lime)', color: 'var(--ink)' }}
        >
          Buka Katalog →
        </button>
      </div>
    );
  }

  return (
    <div className="px-5 pt-5 pb-8 max-w-md mx-auto">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--muted)' }}>
        Koleksi pribadimu · {favoriteProducts.length} item
      </p>
      <h2 className="font-display text-7xl text-[#f2eee3] leading-[0.85] mt-1 mb-4">
        Favorit
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {favoriteProducts.map((prod, idx) => (
          <CoverCard
            key={prod.id}
            product={prod}
            index={idx}
            isFavorite={true}
            onSelect={onSelectProduct}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};
