import React, { useState } from 'react';
import { Product } from '../types';
import { CoverCard } from './CoverCard';
import { OPEN_HOUR, CLOSE_HOUR, ADMIN_WHATSAPP } from '../data/products';
import { ShieldCheck, Sparkles, MessageSquare, Search, Sun, Moon, Info, Lock } from 'lucide-react';

interface HomeCoverSectionProps {
  products: Product[];
  favorites: string[];
  favoritesCount: number;
  ordersCount: number;
  cartCount?: number;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onGoToCatalog: (initialSearch?: string) => void;
  onGoToFavorites: () => void;
  onGoToOrders: () => void;
  onOpenCart?: () => void;
  onOpenContact: () => void;
  onOpenReviews: () => void;
  onOpenFaq: () => void;
  onOpenSnk?: () => void;
  onOpenInfo?: () => void;
  onOpenPrivacy?: () => void;
  onSelectProduct: (product: Product) => void;
  onToggleFavorite: (e: React.MouseEvent, productId: string) => void;
}

export const HomeCoverSection: React.FC<HomeCoverSectionProps> = ({
  products,
  favorites,
  favoritesCount,
  ordersCount,
  cartCount = 0,
  theme,
  onToggleTheme,
  onGoToCatalog,
  onGoToFavorites,
  onGoToOrders,
  onOpenCart,
  onOpenContact,
  onOpenReviews,
  onOpenFaq,
  onOpenSnk,
  onOpenInfo,
  onOpenPrivacy,
  onSelectProduct,
  onToggleFavorite
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const now = new Date();
  const h = (now.getUTCHours() + 7) % 24;
  const m = now.getUTCMinutes();
  const isOpen = (h >= 10 && h <= 23) || (h === 0 && m <= 30);
  const greet = h < 11 ? 'Selamat pagi' : h < 15 ? 'Selamat siang' : h < 18 ? 'Selamat sore' : 'Selamat malam';

  // Curated 6 Hot Picks / Spoiler for Home screen
  const hotSpoilerIds = ['netflix', 'spotify', 'canva', 'youtube', 'chatgpt', 'capcut'];
  const spoilerProducts = products.filter((p) => hotSpoilerIds.includes(p.id) || p.tag === 'TERLARIS').slice(0, 6);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onGoToCatalog(searchQuery.trim());
    } else {
      onGoToCatalog();
    }
  };

  return (
    <div className="space-y-5 px-5 pt-4 pb-12 max-w-md mx-auto relative z-10">
      {/* Top Greeting & Status & Theme Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--muted)' }}>
            {greet}, buyer ✺
          </p>
          <p className="text-[10.5px] font-mono font-bold text-cyan-400">
            Jam Buka • 10.00 – 00.30 WIB
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Theme Switcher Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-1.5 rounded-full border flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95"
            style={{ borderColor: 'var(--border)', background: 'var(--card)', color: 'var(--fg)' }}
            title={`Ubah ke Tema ${theme === 'dark' ? 'Terang (Koran Paper)' : 'Gelap (Dark Zine)'}`}
            aria-label="Toggle tema gelap / terang"
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
            )}
          </button>

          {/* Store status badge */}
          <span
            className="sticker"
            style={{
              background: isOpen ? 'var(--lime)' : 'var(--red)',
              color: isOpen ? 'var(--ink)' : '#fff'
            }}
          >
            ● {isOpen ? 'Buka · 1–30 mnt' : 'Tutup · buka 10.00 WIB'}
          </span>
        </div>
      </div>

      {/* Marquee Ticker */}
      <div className="overflow-hidden border -mx-5 py-1.5 px-2 bg-[#d4f534] text-[#131519]">
        <div className="marquee flex w-max whitespace-nowrap font-display text-sm font-black tracking-wider">
          <span>TRUSTED SINCE 2023 ✺ 42 APLIKASI ✺ 270+ PAKET RESMI ✺ GARANSI PENUH ✺ PROSES 1-30 MENIT ✺ ORDER VIA WHATSAPP ✺ &nbsp;</span>
          <span>TRUSTED SINCE 2023 ✺ 42 APLIKASI ✺ 270+ PAKET RESMI ✺ GARANSI PENUH ✺ PROSES 1-30 MENIT ✺ ORDER VIA WHATSAPP ✺ &nbsp;</span>
        </div>
      </div>

      {/* Quick Search to Catalog */}
      <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 border-2 px-3 py-2.5 shadow-md" style={{ borderColor: 'var(--fg)', background: 'var(--card)' }}>
        <span className="font-display text-xl select-none" style={{ color: 'var(--lime)' }}>
          ⌕
        </span>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="CARI NETFLIX, SPOTIFY, CANVA..."
          className="w-full bg-transparent font-mono text-xs font-bold uppercase outline-none placeholder:text-slate-500"
          style={{ color: 'var(--fg)' }}
        />
        <button
          type="submit"
          className="sticker cursor-pointer"
          style={{ background: 'var(--lime)', color: 'var(--ink)' }}
        >
          Cari ↵
        </button>
      </form>

      {/* Cart Quick Banner (Visible when cart has items) */}
      {cartCount > 0 && onOpenCart && (
        <button
          type="button"
          onClick={onOpenCart}
          className="brutal w-full p-3.5 flex items-center justify-between cursor-pointer"
          style={{ background: 'var(--lime)', color: 'var(--ink)' }}
        >
          <div className="flex items-center gap-2">
            <span className="font-display text-xl">🛒 Keranjang Belanja</span>
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-black/20">
              {cartCount} item
            </span>
          </div>
          <span className="font-mono text-xs font-bold uppercase">Lihat &amp; Checkout →</span>
        </button>
      )}

      {/* Hero Cover Story Card -> Directs to Full Catalog */}
      <button
        type="button"
        onClick={() => onGoToCatalog()}
        className="cover halftone brutal block w-full p-5 text-left cursor-pointer group"
        style={{ background: 'var(--card)' }}
      >
        <div className="flex items-start justify-between">
          <span className="sticker" style={{ background: 'var(--lime)', color: 'var(--ink)' }}>
            Edisi Lengkap Nº 042
          </span>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--muted)' }}>
            Total 42 Aplikasi
          </p>
        </div>

        <h2 className="mt-6 font-display text-[17vw] leading-[0.82] sm:text-[76px]" style={{ color: 'var(--fg)' }}>
          Buka<br />
          <span className="outline-text">Katalog</span>
        </h2>

        <p className="font-mono text-xs mt-2 uppercase font-bold" style={{ color: 'var(--muted)' }}>
          Semua 42 aplikasi &amp; 270+ pilihan paket tersedia di menu Katalog
        </p>

        <div className="mt-5 flex items-end justify-between gap-4">
          <div className="flex -space-x-3">
            {spoilerProducts.slice(0, 5).map((x, i) => (
              <span
                key={x.id}
                className="grid h-12 w-12 place-items-center rounded-sm border-2 overflow-hidden shadow-md"
                style={{
                  background: x.brandColor || x.accentColor,
                  borderColor: 'var(--fg)',
                  transform: `rotate(${(i - 2) * 5}deg)`
                }}
              >
                <img
                  src={`https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${x.iconDomain}&size=64`}
                  alt={x.name}
                  className="h-6 w-6 object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </span>
            ))}
          </div>
          <span className="font-display text-4xl transition-transform group-hover:translate-x-2" style={{ color: 'var(--lime)' }}>
            Lihat 42 Apps →
          </span>
        </div>
      </button>

      {/* 2x2 Bento Grid: Favorites & Order History */}
      <div className="grid grid-cols-2 gap-3.5">
        <button
          type="button"
          onClick={onGoToFavorites}
          className="paper relative aspect-square p-4 pt-6 text-left transition-transform active:scale-95 flex flex-col cursor-pointer shadow-lg"
        >
          <span className="tape -top-1 left-1/2 -translate-x-1/2 rotate-[3deg]"></span>
          <p className="font-display text-6xl text-[#26282e]">
            {String(favoritesCount).padStart(2, '0')}
          </p>
          <p className="mt-auto font-display text-2xl text-[#26282e]">
            Favorit<br />Saya
          </p>
          <p className="font-mono text-[10px] font-bold uppercase text-[#26282e]/80">
            {favoritesCount > 0 ? `${favoritesCount} tersimpan ★` : 'Belum ada ★'}
          </p>
        </button>

        <button
          type="button"
          onClick={onGoToOrders}
          className="cover relative flex aspect-square flex-col p-4 text-left transition-transform active:scale-95 cursor-pointer shadow-lg"
          style={{ background: 'var(--lime)', color: 'var(--ink)' }}
        >
          <p className="font-display text-6xl">
            {String(ordersCount).padStart(2, '0')}
          </p>
          <p className="mt-auto font-display text-2xl">
            Riwayat<br />Order
          </p>
          <p className="font-mono text-[10px] font-bold uppercase">
            Cek Invoice ↻
          </p>
        </button>
      </div>

      {/* 4-Way Bento Menu: Admin Chat, Reviews, Info Toko, Aturan & Garansi */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <button
          type="button"
          onClick={onOpenContact}
          className="cover flex flex-col justify-between p-3 text-left cursor-pointer group min-h-[85px]"
          style={{ background: 'var(--card)' }}
        >
          <span className="font-display text-base leading-tight" style={{ color: 'var(--fg)' }}>
            Admin<br />Chat
          </span>
          <span className="font-display text-lg transition-transform group-hover:translate-x-0.5" style={{ color: 'var(--lime)' }}>
            ↗
          </span>
        </button>

        <button
          type="button"
          onClick={onOpenReviews}
          className="cover flex flex-col justify-between p-3 text-left cursor-pointer group min-h-[85px]"
          style={{ background: 'var(--card)' }}
        >
          <span className="font-display text-base leading-tight" style={{ color: 'var(--fg)' }}>
            Live<br />Notes
          </span>
          <span className="font-display text-lg transition-transform group-hover:scale-110" style={{ color: 'var(--lime)' }}>
            ✎
          </span>
        </button>

        <button
          type="button"
          onClick={onOpenInfo}
          className="cover flex flex-col justify-between p-3 text-left cursor-pointer group min-h-[85px]"
          style={{ background: 'var(--card)' }}
        >
          <span className="font-display text-base leading-tight text-cyan-400">
            Info<br />Toko
          </span>
          <span className="font-display text-lg text-cyan-400">
            ℹ
          </span>
        </button>

        <button
          type="button"
          onClick={onOpenSnk}
          className="cover flex flex-col justify-between p-3 text-left cursor-pointer group min-h-[85px]"
          style={{ background: 'var(--card)' }}
        >
          <span className="font-display text-base leading-tight text-[#d4f534]">
            Aturan &amp;<br />Garansi
          </span>
          <span className="font-display text-lg" style={{ color: 'var(--lime)' }}>
            🛡
          </span>
        </button>
      </div>

      {/* Spoiler / Hot Picks Section (Clean 4-6 cards only) */}
      <section className="pt-2">
        <div className="mb-3 flex items-end justify-between border-b pb-2" style={{ borderColor: 'var(--border)' }}>
          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
              Petunjuk &amp; Spoiler Populer
            </p>
            <h3 className="font-display text-3xl" style={{ color: 'var(--fg)' }}>
              Hot Picks
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onGoToCatalog()}
            className="font-mono text-[10px] font-bold uppercase tracking-wider cursor-pointer hover:underline"
            style={{ color: 'var(--lime)' }}
          >
            Buka Katalog ({products.length}) →
          </button>
        </div>

        {/* 6 Curated cards only in 2 columns */}
        <div className="grid grid-cols-2 gap-3">
          {spoilerProducts.map((p, i) => (
            <CoverCard
              key={p.id}
              product={p}
              index={i}
              isFavorite={favorites.includes(p.id)}
              onSelect={onSelectProduct}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>

        {/* Big Banner CTA to Catalog */}
        <div className="mt-4">
          <button
            type="button"
            onClick={() => onGoToCatalog()}
            className="brutal group w-full p-4 flex items-center justify-between cursor-pointer"
            style={{ background: 'var(--lime)', color: 'var(--ink)' }}
          >
            <div className="text-left">
              <p className="font-display text-2xl leading-none">Buka Katalog Lengkap</p>
              <p className="font-mono text-[10.5px] font-bold uppercase mt-1">
                Jelajahi 42 Aplikasi &amp; 270+ Paket Resmi
              </p>
            </div>
            <span className="font-display text-3xl transition-transform group-hover:translate-x-1.5">
              →
            </span>
          </button>
        </div>
      </section>

      {/* Order dalam 3 Langkah */}
      <section className="paper relative p-5 pt-7 text-[#26282e] shadow-xl">
        <span className="tape -top-1 left-6 -rotate-6"></span>
        <h3 className="font-display text-3xl text-[#26282e]">Order dalam 3 langkah</h3>
        <ol className="mt-4 grid grid-cols-3 gap-3">
          {[
            ['01', 'Pilih paket di katalog'],
            ['02', 'Lengkapi form order'],
            ['03', 'Kirim format ke WA']
          ].map(([n, t]) => (
            <li key={n} className="border-t-2 pt-2 border-[#26282e]">
              <p className="font-display text-3xl">{n}</p>
              <p className="text-[11px] font-bold leading-tight mt-1">{t}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ & Garansi Strip */}
      <button
        type="button"
        onClick={onOpenFaq}
        className="flex w-full items-center justify-between border-y py-3.5 cursor-pointer group"
        style={{ borderColor: 'var(--border)' }}
      >
        <span className="font-display text-2xl transition-colors group-hover:text-[#d4f534]" style={{ color: 'var(--fg)' }}>
          FAQ &amp; Tanya Jawab
        </span>
        <span className="font-display text-2xl transition-transform group-hover:rotate-45" style={{ color: 'var(--lime)' }}>
          +
        </span>
      </button>

      {/* NOTED DI BAWAH: Web Order Disclaimer Box (User explicitly requested this!) */}
      <div
        className="p-4 border rounded-xs font-mono space-y-2 shadow-lg"
        style={{
          borderColor: 'rgba(212, 245, 52, 0.4)',
          background: 'rgba(19, 21, 25, 0.85)'
        }}
      >
        <div className="flex items-center gap-2 text-[#d4f534]">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span className="font-bold text-xs uppercase tracking-wider">
            Catatan Penting Pemesanan (Disclaimer)
          </span>
        </div>
        <p className="text-[10.5px] leading-relaxed text-[#f2eee3]/90">
          Website ini berfungsi sebagai <b>katalog digital &amp; media pembuatan format pesanan resmi REGARM-MART</b>. Seluruh pembayaran uang dan pengiriman akun diproses secara personal, aman, dan bergaransi oleh Admin melalui WhatsApp.
        </p>
      </div>

      {/* Footer Navigation & Legal Links */}
      <footer className="pt-2 pb-6 border-t space-y-3" style={{ borderColor: 'var(--border)' }}>
        <div className="flex flex-wrap items-center justify-center gap-4 text-[10.5px] font-mono uppercase font-bold" style={{ color: 'var(--muted)' }}>
          <button
            type="button"
            onClick={onOpenPrivacy}
            className="hover:underline cursor-pointer flex items-center gap-1"
            style={{ color: 'var(--fg)' }}
          >
            <Lock className="w-3 h-3 text-cyan-400" />
            <span>Kebijakan Privasi</span>
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={onOpenInfo}
            className="hover:underline cursor-pointer flex items-center gap-1"
            style={{ color: 'var(--fg)' }}
          >
            <Info className="w-3 h-3 text-[#d4f534]" />
            <span>Info Toko</span>
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={onToggleTheme}
            className="hover:underline cursor-pointer flex items-center gap-1"
            style={{ color: 'var(--fg)' }}
          >
            {theme === 'dark' ? '☀️ Mode Terang' : '🌙 Mode Gelap'}
          </button>
        </div>

        <p className="text-center font-mono text-[9.5px] uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
          REGARM-MART STORE · EST. 2023 · ALL RIGHTS RESERVED
        </p>
      </footer>
    </div>
  );
};
