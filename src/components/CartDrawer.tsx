import React, { useState } from 'react';
import { CartItem, PaymentMethod, OrderItem } from '../types';
import { PAYMENT_METHODS } from '../data/paymentMethods';
import { ADMIN_WHATSAPP } from '../data/products';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  cart: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQty: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onShowToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  onOpenInvoice: (order: OrderItem) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  cart,
  isOpen,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onShowToast,
  onOpenInvoice
}) => {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(PAYMENT_METHODS[0]);
  const [customerWA, setCustomerWA] = useState(() => {
    try {
      const stored = localStorage.getItem('regarm_wa');
      return stored ? JSON.parse(stored) : '';
    } catch {
      return '';
    }
  });
  const [isRenewal, setIsRenewal] = useState(false);

  if (!isOpen) return null;

  const formatRupiah = (num: number) => 'Rp ' + num.toLocaleString('id-ID');

  const totalAmount = cart.reduce((acc, item) => {
    const extraYt = item.yt && item.yt.includes('+Rp5.000') ? 5000 : 0;
    return acc + (item.priceNumeric + extraYt) * item.q;
  }, 0);

  const handleCheckoutWA = () => {
    if (cart.length === 0) return;
    if (!customerWA.trim()) {
      onShowToast('Masukkan nomor WhatsApp Anda terlebih dahulu!', 'error');
      return;
    }

    try {
      localStorage.setItem('regarm_wa', JSON.stringify(customerWA.trim()));
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.8 } });
    } catch (_) {}

    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const orderId = `ORD-${Date.now().toString().slice(-4)}${randomHex}`;
    const now = new Date();
    const timeStr = now.toLocaleDateString('id-ID') + ' ' + now.toLocaleTimeString('id-ID').substring(0, 5);

    const lines = cart.map((i, n) => {
      const ytText = i.yt ? ` | ${i.yt}` : '';
      return `${n + 1}. ${i.app} - ${i.nama} (${i.harga})${i.q > 1 ? ` x${i.q}` : ''}${ytText}`;
    });

    const pesan = (
      `Halo Admin REGARM-MART, saya mau ${isRenewal ? 'PERPANJANG langganan' : 'konfirmasi pesanan'}!\n\n` +
      `*📝 NOTA PESANAN | ${orderId}*\n` +
      `*⏰ Waktu Order:* ${timeStr}\n` +
      `----------------------------------\n` +
      `• Item:\n${lines.join('\n')}\n` +
      `• Total: ${formatRupiah(totalAmount)}${isRenewal ? '\n• Jenis: Perpanjangan (akun/email lama: ........)' : ''}\n` +
      `• No. WhatsApp: ${customerWA.trim()}\n` +
      `• Pembayaran via: ${selectedPayment.name}\n` +
      `----------------------------------\n` +
      `Segera diproses ya min, terima kasih! ⚡`
    );

    window.open(`https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(pesan)}`, '_blank', 'noreferrer,noopener');
    onShowToast('Membuka WhatsApp Admin...', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 fade-in backdrop-blur-sm cursor-pointer"
        style={{ backgroundColor: 'rgba(17, 19, 23, 0.85)' }}
        onClick={onClose}
      />

      {/* Drawer Content */}
      <div
        role="dialog"
        aria-modal="true"
        className="sheet-up relative max-h-[90vh] w-full max-w-md overflow-y-auto border-t-2 z-10 shadow-2xl p-5"
        style={{
          borderColor: 'var(--fg)',
          backgroundColor: 'var(--popover)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b mb-4" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-[#d4f534]" />
            <h3 className="font-display text-2xl text-[#f2eee3]">
              Keranjang ({cart.reduce((a, b) => a + b.q, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="sticker cursor-pointer"
            style={{ background: 'var(--fg)', color: 'var(--bg)' }}
          >
            Tutup ✕
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <ShoppingCart className="w-12 h-12 mx-auto text-[#a09c8d]/50" />
            <p className="font-mono text-xs text-[#a09c8d]">
              Keranjang masih kosong. Pilih aplikasi di katalog lalu tekan "Tambah ke Keranjang".
            </p>
            <button
              onClick={onClose}
              className="brutal py-2.5 px-4 font-mono text-xs font-bold uppercase cursor-pointer"
              style={{ background: 'var(--lime)', color: 'var(--ink)' }}
            >
              Lihat Katalog →
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Items List */}
            <div className="space-y-2.5 max-h-[40vh] overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="p-3 border rounded-xs flex items-center justify-between gap-2"
                  style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-xs text-[#f2eee3] truncate">
                      {item.app} · {item.nama}
                    </p>
                    <p className="font-mono text-[10px] text-[#d4f534] mt-0.5">
                      {item.harga} {item.yt ? `(${item.yt})` : ''}
                    </p>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => onUpdateQty(item.id, item.q - 1)}
                      className="w-6 h-6 rounded-xs border flex items-center justify-center font-bold text-xs text-white hover:bg-white/10"
                      style={{ borderColor: 'var(--border)' }}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-mono font-bold text-xs w-4 text-center text-[#f2eee3]">
                      {item.q}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQty(item.id, item.q + 1)}
                      className="w-6 h-6 rounded-xs border flex items-center justify-center font-bold text-xs text-white hover:bg-white/10"
                      style={{ borderColor: 'var(--border)' }}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1 text-rose-400 hover:text-rose-300 ml-1"
                      title="Hapus item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Section */}
            <div
              className="p-3 border rounded-xs flex justify-between items-baseline"
              style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
            >
              <span className="font-mono text-xs font-bold uppercase text-[#a09c8d]">
                Total Pesanan:
              </span>
              <span className="font-display text-2xl" style={{ color: 'var(--lime)' }}>
                {formatRupiah(totalAmount)}
              </span>
            </div>

            {/* Renewal Checkbox */}
            <label className="flex items-start gap-2 text-xs font-mono text-[#f2eee3] cursor-pointer">
              <input
                type="checkbox"
                checked={isRenewal}
                onChange={(e) => setIsRenewal(e.target.checked)}
                className="mt-0.5 accent-[#d4f534]"
              />
              <span>Ini perpanjangan (aku sudah punya akun/langganan dari REGARM-MART)</span>
            </label>

            {/* Customer WA input */}
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-[#a09c8d] block uppercase font-bold">
                Nomor WhatsApp Anda *
              </span>
              <input
                type="tel"
                value={customerWA}
                onChange={(e) => setCustomerWA(e.target.value)}
                placeholder="Misal: 08123456789"
                className="w-full bg-[#111317] border p-2 text-xs font-mono outline-none text-[#f2eee3] rounded-xs"
                style={{ borderColor: 'var(--border)' }}
              />
            </div>

            {/* Payment Method Select */}
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-[#a09c8d] block uppercase font-bold">
                Pilihan Pembayaran
              </span>
              <select
                value={selectedPayment.id}
                onChange={(e) => {
                  const found = PAYMENT_METHODS.find(p => p.id === e.target.value);
                  if (found) setSelectedPayment(found);
                }}
                className="w-full bg-[#111317] border p-2 text-xs font-mono outline-none text-[#f2eee3] rounded-xs"
                style={{ borderColor: 'var(--border)' }}
              >
                {PAYMENT_METHODS.map((pm) => (
                  <option key={pm.id} value={pm.id}>
                    {pm.name} {pm.accountNumber ? `(${pm.accountNumber})` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleCheckoutWA}
                className="brutal flex w-full items-center justify-between px-5 py-3.5 cursor-pointer"
                style={{ background: 'var(--lime)', color: 'var(--ink)' }}
              >
                <span className="font-display text-xl flex items-center gap-2">
                  <Zap className="w-4 h-4 fill-current" />
                  Kirim Pesanan ke WhatsApp
                </span>
                <span className="font-display text-xl">{formatRupiah(totalAmount)} →</span>
              </button>

              <button
                type="button"
                onClick={onClearCart}
                className="w-full py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-rose-400 hover:underline text-center"
              >
                🗑️ Kosongkan Keranjang
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
