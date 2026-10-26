import React, { useState } from 'react';
import { OrderItem } from '../types';
import { ADMIN_WHATSAPP } from '../data/products';
import { Search, ShieldAlert, ReceiptText } from 'lucide-react';

interface OrdersSectionProps {
  orders: OrderItem[];
  onGoToCatalog: () => void;
  onViewInvoice: (order: OrderItem) => void;
  onClearHistory: () => void;
}

export const OrdersSection: React.FC<OrdersSectionProps> = ({
  orders,
  onGoToCatalog,
  onViewInvoice,
  onClearHistory
}) => {
  const [searchKey, setSearchKey] = useState('');

  const formatRupiah = (num: number) => 'Rp ' + num.toLocaleString('id-ID');

  const filteredOrders = orders.filter((o) => {
    if (!searchKey.trim()) return true;
    const query = searchKey.toLowerCase().trim();
    return (
      o.orderNumber.toLowerCase().includes(query) ||
      o.product.name.toLowerCase().includes(query) ||
      o.customerWhatsApp.includes(query) ||
      o.paket.name.toLowerCase().includes(query)
    );
  });

  return (
    <div className="px-5 pt-5 pb-8 max-w-md mx-auto relative z-10">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--muted)' }}>
          Riwayat &amp; Cek Garansi
        </p>
        {orders.length > 0 && (
          <button
            onClick={onClearHistory}
            className="font-mono text-[9px] uppercase tracking-wider text-rose-400 hover:underline"
          >
            Bersihkan
          </button>
        )}
      </div>

      <h2 className="font-display text-7xl text-[#f2eee3] leading-[0.85] mt-1 mb-4">
        Riwayat
      </h2>

      {/* Search Input for Order ID */}
      <div className="mb-4">
        <div className="flex items-center gap-2 border-b-2 pb-2" style={{ borderColor: 'var(--fg)' }}>
          <Search className="w-4 h-4 text-[#d4f534]" />
          <input
            type="text"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            placeholder="Cari Order ID (RGM-...) / Produk..."
            className="w-full bg-transparent font-mono text-xs font-bold uppercase outline-none placeholder:text-slate-500"
            style={{ color: 'var(--fg)' }}
          />
          {searchKey && (
            <button
              onClick={() => setSearchKey('')}
              className="font-mono text-xs text-slate-400 hover:text-white px-1"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Quick Warranty Assistance Callout */}
      <div
        className="p-3 border rounded-xs mb-4 flex items-center justify-between gap-2"
        style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
      >
        <div className="flex items-center gap-2 text-xs">
          <ShieldAlert className="w-4 h-4 text-[#d4f534] shrink-0" />
          <span className="font-mono text-[10px] text-[#f2eee3]">
            Akun bermasalah / kena reset?
          </span>
        </div>
        <a
          href={`https://wa.me/${ADMIN_WHATSAPP}?text=Halo%20Admin%20REGARM-MART,%20saya%20mau%20klaim%20garansi%20pesanan%20saya`}
          target="_blank"
          rel="noreferrer"
          className="sticker text-[8px] uppercase tracking-wider shrink-0"
          style={{ background: 'var(--lime)', color: 'var(--ink)' }}
        >
          Klaim Garansi WA
        </a>
      </div>

      {orders.length === 0 ? (
        <div className="py-8">
          <div className="paper relative p-6 pt-8 text-[#26282e] shadow-xl rotate-[-1deg]">
            <span className="tape -top-1 left-1/2 -translate-x-1/2"></span>
            <p className="font-display text-3xl">Masih kosong.</p>
            <p className="mt-2 text-sm leading-relaxed">
              Belum ada pesanan yang tercatat dari perangkat ini. Setiap order yang Anda buat otomatis tersimpan di sini.
            </p>
          </div>
          <button
            type="button"
            onClick={onGoToCatalog}
            className="brutal mt-8 w-full py-4 font-display text-2xl cursor-pointer"
            style={{ background: 'var(--lime)', color: 'var(--ink)' }}
          >
            Mulai Belanja →
          </button>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="py-8 text-center font-mono text-xs text-[#a09c8d]">
          Tidak ditemukan order dengan kata kunci "{searchKey}".
        </div>
      ) : (
        <ul className="divide-y border-y" style={{ borderColor: 'rgba(242,238,227,.25)' }}>
          {filteredOrders.map((o) => {
            const dateFormatted = new Date(o.createdAt).toLocaleDateString('id-ID');
            const reorderText = encodeURIComponent(
              `Halo Admin REGARM-MART ⚡, saya mau order lagi / perpanjang:\n\n• Produk: ${o.product.name} — ${o.paket.name}\n• Total: ${formatRupiah(o.totalPrice)}\n• ID Sebelumnya: ${o.orderNumber}\n\nMohon dibantu ya min!`
            );
            const klaimText = encodeURIComponent(
              `☆ ✪ FORMAT KLAIM GARANSI ✪\n` +
              `ミ Nama aplikasi : ${o.product.name}\n` +
              `ミ Email: ${o.customerEmail || '-'}\n` +
              `ミ Password: (isi password akun)\n` +
              `ミ Plan: ${o.paket.name}\n` +
              `ミ Profil + pin: \n` +
              `ミ Problem/masalah: kendala akun / butuh reset\n` +
              `ミ Tanggal order: ${dateFormatted} (ID: ${o.orderNumber})\n` +
              `ミ Durasi order: ${o.paket.duration}\n` +
              `ミ Sisa hari: `
            );

            return (
              <li
                key={o.id}
                className="py-4 space-y-2.5"
                style={{ borderColor: 'var(--border)' }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-display text-2xl leading-none text-[#f2eee3]">{o.product.name}</p>
                      <span className="sticker px-1 py-0 text-[7px]" style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--lime)' }}>
                        {o.status}
                      </span>
                    </div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: 'var(--muted)' }}>
                      {o.paket.name} · {dateFormatted} · {formatRupiah(o.totalPrice)}
                    </p>
                    <button
                      type="button"
                      onClick={() => onViewInvoice(o)}
                      className="font-mono text-[9.5px] uppercase text-[#d4f534] hover:underline flex items-center gap-1 pt-0.5 cursor-pointer"
                    >
                      <ReceiptText className="w-3 h-3" />
                      <span>Buka Bukti Tagihan ({o.orderNumber}) →</span>
                    </button>
                  </div>

                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <a
                      href={`https://wa.me/${ADMIN_WHATSAPP}?text=${reorderText}`}
                      target="_blank"
                      rel="noreferrer"
                      className="sticker text-center transition-transform active:scale-95"
                      style={{ background: 'var(--lime)', color: 'var(--ink)' }}
                    >
                      Order lagi ↻
                    </a>
                    <a
                      href={`https://wa.me/${ADMIN_WHATSAPP}?text=${klaimText}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-[9px] font-bold text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded-xs hover:bg-rose-500/10 transition-colors"
                    >
                      Klaim Garansi 🛡
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
