import React, { useState } from 'react';
import { Product, Paket, PaymentMethod, OrderItem, Voucher } from '../types';
import { PAYMENT_METHODS } from '../data/paymentMethods';
import { ADMIN_WHATSAPP, VOUCHERS } from '../data/products';
import { 
  Check, 
  Copy, 
  Zap, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Smartphone,
  Tag,
  CheckCircle2,
  Building2,
  ShoppingCart
} from 'lucide-react';
import confetti from 'canvas-confetti';

import { CartItem } from '../types';

interface ProductSheetProps {
  product: Product;
  isFavorite: boolean;
  onClose: () => void;
  onToggleFavorite: (productId: string) => void;
  onOrderPlaced: (order: OrderItem) => void;
  onOpenInvoice: (order: OrderItem) => void;
  onAddToCart?: (item: CartItem) => void;
  onShowToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

export const ProductSheet: React.FC<ProductSheetProps> = ({
  product,
  isFavorite,
  onClose,
  onToggleFavorite,
  onOrderPlaced,
  onOpenInvoice,
  onAddToCart,
  onShowToast
}) => {
  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number>(0);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(PAYMENT_METHODS[0]);
  const [customerWA, setCustomerWA] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [voucherInput, setVoucherInput] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);

  // YouTube Seller Option (+Rp5.000)
  const isYoutube = product.name.toLowerCase().includes('youtube') || product.id === 'youtube';
  const [youtubeOption, setYoutubeOption] = useState<'normal' | 'seller'>('normal');
  const youtubeExtra = isYoutube && youtubeOption === 'seller' ? 5000 : 0;

  const selectedPaket: Paket = product.pakets[selectedPlanIndex] || product.pakets[0];

  const formatRupiah = (num: number) => 'Rp ' + num.toLocaleString('id-ID');
  const formatK = (num: number) => Math.round(num / 1000) + 'K';

  // Calculate prices
  const basePrice = (selectedPaket ? selectedPaket.price : 0) + youtubeExtra;
  let discount = 0;
  if (appliedVoucher) {
    if (appliedVoucher.discountType === 'fixed') {
      discount = appliedVoucher.discountValue;
    } else {
      discount = Math.round((basePrice * appliedVoucher.discountValue) / 100);
    }
    discount = Math.min(discount, basePrice);
  }
  const finalPrice = Math.max(0, basePrice - discount);

  const handleApplyVoucher = (codeToApply?: string) => {
    const code = (codeToApply || voucherInput).trim().toUpperCase();
    if (!code) return;
    const found = VOUCHERS.find((v) => v.code === code);
    if (!found) {
      onShowToast('Kode voucher tidak ditemukan!', 'error');
      return;
    }
    if (found.minSpend && basePrice < found.minSpend) {
      onShowToast(`Minimal belanja ${formatRupiah(found.minSpend)} untuk voucher ini`, 'error');
      return;
    }
    setAppliedVoucher(found);
    setVoucherInput(found.code);
    onShowToast(`Voucher ${found.code} berhasil dipasang!`, 'success');
  };

  const createOrder = (): OrderItem => {
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const orderNumber = `RGM-${Date.now().toString().slice(-4)}${randomHex}`;

    return {
      id: orderNumber,
      orderNumber,
      product,
      paket: selectedPaket,
      paymentMethod: selectedPayment,
      customerWhatsApp: customerWA.trim() || 'Pembeli via WhatsApp',
      customerEmail: customerEmail.trim() || undefined,
      customerNotes: customerNotes.trim() || undefined,
      voucherCode: appliedVoucher?.code,
      discountAmount: discount,
      totalPrice: finalPrice,
      createdAt: new Date().toISOString(),
      status: 'Menunggu Pembayaran'
    };
  };

  const handleBuyNow = () => {
    const order = createOrder();
    onOrderPlaced(order);

    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.8 }
      });
    } catch (_) {}

    const ytInfo = isYoutube ? `\n• Opsi YouTube: ${youtubeOption === 'seller' ? 'Akun Seller (+Rp5.000)' : 'Akun Pembeli (Normal)'}` : '';
    const emailInfo = customerEmail.trim() ? `\n• Email Customer: ${customerEmail.trim()}` : '';
    const notesInfo = customerNotes.trim() ? `\n• Catatan: ${customerNotes.trim()}` : '';
    const discountText = discount > 0 ? `\n• Diskon: -${formatRupiah(discount)} (${appliedVoucher?.code})` : '';

    const waText = encodeURIComponent(
      `Halo Admin REGARM-MART ⚡, saya mau order paket langganan:\n\n` +
      `*ORDER ID: ${order.orderNumber}*\n` +
      `• Produk: *${product.name}*\n` +
      `• Paket: ${selectedPaket.name}\n` +
      `• Tipe Akun: ${selectedPaket.accountType} (${selectedPaket.duration})\n` +
      `• Garansi: ${selectedPaket.warranty}\n` +
      `• Harga: ${formatRupiah(selectedPaket.price + youtubeExtra)}` +
      `${ytInfo}` +
      `${discountText}\n` +
      `• *TOTAL TRANSFER: ${formatRupiah(finalPrice)}*\n` +
      `• Metode Pembayaran: ${selectedPayment.name}\n` +
      `• No. WA Customer: ${customerWA.trim() || '-'}` +
      `${emailInfo}` +
      `${notesInfo}\n\n` +
      `Mohon diproses akunnya ya min! Terima kasih. 🙏`
    );

    window.open(`https://wa.me/${ADMIN_WHATSAPP}?text=${waText}`, '_blank', 'noreferrer,noopener');
    onShowToast('Membuka WhatsApp Admin...', 'success');
  };

  const handleCopyOrderFormat = () => {
    const order = createOrder();
    onOrderPlaced(order);
    const ytText = isYoutube ? ` (${youtubeOption === 'seller' ? 'Akun Seller +5K' : 'Akun Pembeli'})` : '';
    const text = (
      `Halo Admin REGARM-MART ⚡, saya mau order:\n\n` +
      `• Produk: ${product.name} - ${selectedPaket.name}${ytText}\n` +
      `• Total: ${formatRupiah(finalPrice)}\n` +
      `• Metode: ${selectedPayment.name}\n` +
      `• Order ID: ${order.orderNumber}`
    );
    navigator.clipboard.writeText(text);
    onShowToast('Format order berhasil disalin ke clipboard!', 'success');
  };

  const handleAddToCartClick = () => {
    if (!onAddToCart) return;
    const cartItem: CartItem = {
      id: `${product.id}-${selectedPaket.id}-${isYoutube ? youtubeOption : 'default'}-${Date.now()}`,
      app: product.name,
      nama: selectedPaket.name,
      harga: formatRupiah(finalPrice),
      priceNumeric: finalPrice,
      yt: isYoutube ? (youtubeOption === 'seller' ? 'Akun Seller (+Rp5.000)' : 'Akun Pembeli (Normal)') : undefined,
      q: 1
    };
    onAddToCart(cartItem);
    try {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.85 } });
    } catch (_) {}
  };

  const handleOpenDigitalInvoice = () => {
    const order = createOrder();
    onOrderPlaced(order);
    onOpenInvoice(order);
  };

  const iconUrl = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${product.iconDomain}&size=128`;

  return (
    <div className="pb-10">
      {/* Magazine Cover Header */}
      <div
        className="relative overflow-hidden px-5 pb-6 pt-12"
        style={{
          backgroundColor: product.brandColor || '#22252b',
          color: product.inkColor || '#f2eee3'
        }}
      >
        <img
          src={iconUrl}
          alt=""
          className="pointer-events-none absolute -right-8 -top-4 h-52 w-52 -rotate-12 opacity-20 grayscale"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className="flex items-center justify-between z-10 relative">
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest opacity-80">
            {product.category} · {product.tag || 'PRO'}
          </p>
          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-black/30 backdrop-blur-sm">
            {product.pakets.length} Pilihan Durasi
          </span>
        </div>
        <h2 className="mt-2 font-display text-7xl leading-[0.82] break-words z-10 relative">
          {product.name}
        </h2>
        <p className="mt-3 font-mono text-xs font-bold uppercase opacity-90 max-w-[85%] z-10 relative">
          {product.tagline || product.description}
        </p>

        <div className="mt-4 pt-3 border-t flex items-center justify-between z-10 relative text-[11px] font-mono opacity-85" style={{ borderColor: 'currentColor' }}>
          <span>Login: {product.loginMethod}</span>
          <span>{product.warrantyPeriod}</span>
        </div>
      </div>

      {/* Sheet Content */}
      <div className="space-y-5 p-5">
        {/* Step 1: Semua Pilihan Paket & Durasi */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-1.5" style={{ color: 'var(--muted)' }}>
              <span className="w-4 h-4 rounded-full bg-[#d4f534] text-[#131519] font-black text-[9px] flex items-center justify-center">
                1
              </span>
              PILIH PAKET &amp; DURASI ({product.pakets.length} PILIHAN)
            </label>

            <button
              type="button"
              onClick={() => onToggleFavorite(product.id)}
              className="sticker cursor-pointer transition-colors"
              style={{
                background: isFavorite ? 'var(--lime)' : 'var(--card)',
                color: isFavorite ? 'var(--ink)' : 'var(--fg)'
              }}
            >
              {isFavorite ? '★ Tersimpan' : '☆ Simpan'}
            </button>
          </div>

          {/* Grid of ALL package plans with exact pricing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {product.pakets.map((pl, i) => {
              const isSelected = selectedPlanIndex === i;
              return (
                <div
                  key={pl.id}
                  onClick={() => setSelectedPlanIndex(i)}
                  className="cover plan-btn p-3 text-left cursor-pointer transition-all"
                  style={{
                    background: isSelected ? 'var(--lime)' : 'var(--card)',
                    color: isSelected ? 'var(--ink)' : 'var(--fg)',
                    borderColor: isSelected ? 'var(--lime)' : 'var(--border)'
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-wider">
                      {pl.duration}
                    </span>
                    <div className="flex items-center gap-1">
                      <span
                        className="text-[8px] font-mono px-1.5 py-0.2 rounded font-bold uppercase"
                        style={{
                          background: isSelected ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.08)',
                          color: isSelected ? 'var(--ink)' : 'var(--lime)'
                        }}
                      >
                        {pl.accountType}
                      </span>
                      {pl.isPopular && (
                        <span
                          className="sticker px-1.5 py-0 text-[7px]"
                          style={{
                            background: isSelected ? 'var(--ink)' : 'var(--lime)',
                            color: isSelected ? 'var(--lime)' : 'var(--ink)'
                          }}
                        >
                          Best
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="font-bold text-xs leading-snug pr-2 line-clamp-1">
                    {pl.name}
                  </div>

                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="font-display text-2xl leading-none">
                      {formatRupiah(pl.price)}
                    </span>
                    {pl.originalPrice && (
                      <span className="font-mono text-[9px] line-through opacity-60">
                        {pl.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="mt-1.5 pt-1.5 border-t text-[9.5px] font-mono flex items-center justify-between opacity-85" style={{ borderColor: 'currentColor' }}>
                    <span>Garansi: {pl.warranty}</span>
                    <span className="font-bold">{isSelected ? '✓ Terpilih' : 'Pilih'}</span>
                  </div>

                  {isSelected && pl.features && pl.features.length > 0 && (
                    <div className="mt-2 pt-2 border-t text-[9.5px] space-y-0.5" style={{ borderColor: 'currentColor' }}>
                      {pl.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-1">
                          <CheckCircle2 className="w-2.5 h-2.5 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* YouTube Account Type Selector (Akun Pembeli vs Akun Seller +Rp5.000) */}
          {isYoutube && (
            <div className="p-3 border rounded-xs space-y-2 mt-3" style={{ borderColor: 'var(--lime)', background: 'rgba(212, 245, 52, 0.05)' }}>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#d4f534]">
                  Opsi Akun YouTube:
                </span>
                <span className="text-[9px] font-mono text-[#f2eee3]/70">
                  {youtubeOption === 'seller' ? '+Rp 5.000 (Akun Seller)' : 'Normal (Email Pembeli)'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setYoutubeOption('normal')}
                  className="p-2.5 border text-left font-mono text-[10.5px] cursor-pointer transition-all rounded-xs"
                  style={{
                    borderColor: youtubeOption === 'normal' ? 'var(--lime)' : 'var(--border)',
                    backgroundColor: youtubeOption === 'normal' ? 'var(--lime)' : 'var(--card)',
                    color: youtubeOption === 'normal' ? 'var(--ink)' : 'var(--fg)',
                    fontWeight: youtubeOption === 'normal' ? 'bold' : 'normal'
                  }}
                >
                  <p className="font-bold">Akun Pembeli</p>
                  <p className="text-[9px] opacity-80 mt-0.5">Pakai email sendiri (Normal)</p>
                </button>

                <button
                  type="button"
                  onClick={() => setYoutubeOption('seller')}
                  className="p-2.5 border text-left font-mono text-[10.5px] cursor-pointer transition-all rounded-xs"
                  style={{
                    borderColor: youtubeOption === 'seller' ? 'var(--lime)' : 'var(--border)',
                    backgroundColor: youtubeOption === 'seller' ? 'var(--lime)' : 'var(--card)',
                    color: youtubeOption === 'seller' ? 'var(--ink)' : 'var(--fg)',
                    fontWeight: youtubeOption === 'seller' ? 'bold' : 'normal'
                  }}
                >
                  <p className="font-bold flex items-center justify-between">
                    <span>Akun Seller</span>
                    <span className="text-[9px] bg-black/20 px-1 rounded">+5K</span>
                  </p>
                  <p className="text-[9px] opacity-80 mt-0.5">Disediakan seller langsung</p>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Step 2: Semua Metode Pembayaran (Directly Visible) */}
        <div className="space-y-2.5 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
          <label className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-1.5" style={{ color: 'var(--muted)' }}>
            <span className="w-4 h-4 rounded-full bg-[#d4f534] text-[#131519] font-black text-[9px] flex items-center justify-center">
              2
            </span>
            PILIH METODE PEMBAYARAN
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PAYMENT_METHODS.map((pm) => {
              const isSelected = selectedPayment.id === pm.id;
              return (
                <button
                  key={pm.id}
                  type="button"
                  onClick={() => setSelectedPayment(pm)}
                  className="p-2.5 border text-left rounded-xs transition-all cursor-pointer"
                  style={{
                    borderColor: isSelected ? 'var(--lime)' : 'var(--border)',
                    backgroundColor: isSelected ? 'var(--lime)' : 'var(--card)',
                    color: isSelected ? 'var(--ink)' : 'var(--fg)'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10.5px] font-bold uppercase">
                      {pm.name}
                    </span>
                    {isSelected && <Check className="w-3 h-3 text-[#131519]" />}
                  </div>
                  <span className="text-[8.5px] font-mono opacity-80 block mt-0.5">
                    {pm.badge || 'Bebas Admin'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Payment Account Details Box */}
          <div
            className="p-3 border rounded-xs text-xs space-y-1.5"
            style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
          >
            <div className="flex items-center justify-between text-[#f2eee3]">
              <span className="font-mono font-bold text-xs flex items-center gap-1 text-[#d4f534]">
                <Building2 className="w-3.5 h-3.5" />
                {selectedPayment.name}
              </span>
              {selectedPayment.accountNumber && (
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(selectedPayment.accountNumber || '');
                    onShowToast(`Nomor ${selectedPayment.name} disalin!`, 'success');
                  }}
                  className="sticker cursor-pointer"
                  style={{ background: 'var(--lime)', color: 'var(--ink)' }}
                >
                  Salin No/Rek
                </button>
              )}
            </div>

            {selectedPayment.accountNumber ? (
              <div className="font-mono font-bold text-sm text-[#f2eee3] tracking-wider">
                {selectedPayment.accountNumber}
                {selectedPayment.accountHolder && (
                  <span className="text-xs font-normal text-[#a09c8d] ml-2">
                    (a.n {selectedPayment.accountHolder})
                  </span>
                )}
              </div>
            ) : (
              <p className="font-mono text-[10px] text-[#a09c8d]">
                Bisa bayar dari semua e-wallet (GoPay, OVO, DANA, ShopeePay) &amp; m-Banking (BCA, Mandiri, BRI, BNI) tanpa biaya admin.
              </p>
            )}
          </div>
        </div>

        {/* Step 3: Informasi WhatsApp & Catatan */}
        <div className="space-y-2.5 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
          <label className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-1.5" style={{ color: 'var(--muted)' }}>
            <span className="w-4 h-4 rounded-full bg-[#d4f534] text-[#131519] font-black text-[9px] flex items-center justify-center">
              3
            </span>
            DATA PEMESAN &amp; CATATAN
          </label>

          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[10px] font-mono text-[#a09c8d] mb-1">
                <span>Nomor WhatsApp Aktif *</span>
                <span>Untuk konfirmasi pengiriman akun</span>
              </div>
              <div className="relative">
                <Smartphone className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#d4f534]" />
                <input
                  type="tel"
                  value={customerWA}
                  onChange={(e) => setCustomerWA(e.target.value)}
                  placeholder="Contoh: 0895325627342"
                  className="w-full bg-[#111317] border p-2 pl-9 text-xs font-mono outline-none text-[#f2eee3] rounded-xs"
                  style={{ borderColor: 'var(--border)' }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] font-mono text-[#a09c8d] block mb-1">
                  Email Akun Anda (Opsional)
                </span>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="Untuk Canva/Spotify/YT Invite"
                  className="w-full bg-[#111317] border p-2 text-xs font-mono outline-none text-[#f2eee3] rounded-xs"
                  style={{ borderColor: 'var(--border)' }}
                />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#a09c8d] block mb-1">
                  Catatan Tambahan (Opsional)
                </span>
                <input
                  type="text"
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  placeholder="cth: Request PIN profil 1234"
                  className="w-full bg-[#111317] border p-2 text-xs font-mono outline-none text-[#f2eee3] rounded-xs"
                  style={{ borderColor: 'var(--border)' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Step 4: Voucher Promo */}
        <div
          className="p-3 border rounded-xs space-y-2"
          style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
        >
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono font-bold text-[#f2eee3] flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#d4f534]" />
              KODE VOUCHER PROMO
            </span>
            <span className="font-mono text-[9px] text-[#d4f534]">
              Klik untuk pasang:
            </span>
          </div>

          {/* Quick voucher chips */}
          <div className="flex flex-wrap gap-1.5">
            {VOUCHERS.map((v) => (
              <button
                key={v.code}
                type="button"
                onClick={() => handleApplyVoucher(v.code)}
                className="font-mono text-[9px] px-2 py-0.5 border rounded-xs uppercase tracking-wider transition-colors cursor-pointer"
                style={{
                  borderColor: appliedVoucher?.code === v.code ? 'var(--lime)' : 'var(--border)',
                  backgroundColor: appliedVoucher?.code === v.code ? 'var(--lime)' : 'transparent',
                  color: appliedVoucher?.code === v.code ? 'var(--ink)' : 'var(--fg)'
                }}
              >
                {v.code} ({v.discountType === 'fixed' ? `-${formatK(v.discountValue)}` : `-${v.discountValue}%`})
              </button>
            ))}
          </div>

          <div className="flex gap-1.5 pt-1">
            <input
              type="text"
              value={voucherInput}
              onChange={(e) => setVoucherInput(e.target.value.toUpperCase())}
              placeholder="KODE PROMO LAINNYA"
              className="flex-1 bg-[#111317] border p-1.5 text-xs font-mono uppercase outline-none text-[#f2eee3]"
              style={{ borderColor: 'var(--border)' }}
            />
            <button
              type="button"
              onClick={() => handleApplyVoucher()}
              className="px-3 py-1.5 font-mono text-xs font-bold uppercase cursor-pointer"
              style={{ background: 'var(--lime)', color: 'var(--ink)' }}
            >
              Gunakan
            </button>
          </div>

          {appliedVoucher && (
            <div className="flex justify-between items-center text-[10px] font-mono text-[#d4f534] pt-1">
              <span>✓ Voucher "{appliedVoucher.code}" aktif: -{formatRupiah(discount)}</span>
              <button
                onClick={() => {
                  setAppliedVoucher(null);
                  setVoucherInput('');
                }}
                className="text-rose-400 hover:underline"
              >
                Hapus
              </button>
            </div>
          )}
        </div>

        {/* Step 5: Ringkasan Total Tagihan */}
        <div
          className="p-4 border rounded-xs space-y-1.5"
          style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
        >
          <div className="flex justify-between text-xs font-mono text-[#a09c8d]">
            <span>Harga Normal ({selectedPaket.name}):</span>
            <span>{formatRupiah(basePrice)}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-xs font-mono text-[#d4f534]">
              <span>Potongan Diskon Promo ({appliedVoucher?.code}):</span>
              <span>-{formatRupiah(discount)}</span>
            </div>
          )}

          <div className="flex justify-between items-baseline pt-2 border-t font-bold" style={{ borderColor: 'var(--border)' }}>
            <span className="font-mono text-xs uppercase text-[#a09c8d]">Total Transfer:</span>
            <span className="font-display text-3xl" style={{ color: 'var(--lime)' }}>
              {formatRupiah(finalPrice)}
            </span>
          </div>
        </div>

        {/* Step 6: Semua Tombol Aksi */}
        <div className="space-y-2 pt-1">
          {/* Primary Action Button: WhatsApp Order */}
          <button
            type="button"
            onClick={handleBuyNow}
            className="brutal flex w-full items-center justify-between px-6 py-4 cursor-pointer"
            style={{ background: 'var(--lime)', color: 'var(--ink)' }}
          >
            <span className="font-display text-2xl flex items-center gap-2">
              <Zap className="w-5 h-5 fill-current" />
              Order via WhatsApp Admin
            </span>
            <span className="font-display text-2xl">{formatRupiah(finalPrice)} →</span>
          </button>

          {/* Add to Cart Button */}
          {onAddToCart && (
            <button
              type="button"
              onClick={handleAddToCartClick}
              className="border-2 w-full py-3 px-4 font-mono text-xs font-bold uppercase transition-colors hover:bg-white/5 cursor-pointer flex items-center justify-center gap-2"
              style={{ borderColor: 'var(--fg)', color: 'var(--fg)' }}
            >
              <ShoppingCart className="w-4 h-4 text-[#d4f534]" />
              <span>+ Tambah ke Keranjang Belanja</span>
            </button>
          )}

          {/* Secondary Action Options: Copy Format & View Digital Invoice */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleCopyOrderFormat}
              className="border py-2.5 px-3 font-mono text-[10.5px] font-bold uppercase text-center transition-colors hover:bg-white/5 cursor-pointer flex items-center justify-center gap-1.5"
              style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
            >
              <Copy className="w-3.5 h-3.5 text-[#d4f534]" />
              <span>Salin Format Order</span>
            </button>

            <button
              type="button"
              onClick={handleOpenDigitalInvoice}
              className="border py-2.5 px-3 font-mono text-[10.5px] font-bold uppercase text-center transition-colors hover:bg-white/5 cursor-pointer flex items-center justify-center gap-1.5"
              style={{ borderColor: 'var(--lime)', color: 'var(--lime)' }}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Invoice Digital (QRIS)</span>
            </button>
          </div>
        </div>

        {/* Footer Guarantee Note */}
        <p className="text-center font-mono text-[10px] uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
          Garansi 100% Replace Penuh Sesuai Durasi · Proses 1–30 Menit
        </p>
      </div>
    </div>
  );
};
