import React, { useState, useEffect } from 'react';
import { Product, Paket, PaymentMethod, OrderItem, Voucher } from '../types';
import { PAYMENT_METHODS } from '../data/paymentMethods';
import { ADMIN_WHATSAPP, VOUCHERS } from '../data/products';
import { AppLogo } from './AppLogo';
import { 
  X, 
  Check, 
  Copy, 
  Zap, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  HelpCircle,
  Smartphone,
  CheckCircle2,
  Tag
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface OrderModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  onOpenInvoice: (order: OrderItem) => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  product,
  isOpen,
  onClose,
  onShowToast,
  onOpenInvoice
}) => {
  if (!isOpen || !product) return null;

  const [selectedPaket, setSelectedPaket] = useState<Paket>(product.pakets[0]);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(PAYMENT_METHODS[0]);
  const [customerWA, setCustomerWA] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [voucherInput, setVoucherInput] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);
  const [voucherError, setVoucherError] = useState('');

  // Reset when product changes
  useEffect(() => {
    if (product) {
      setSelectedPaket(product.pakets[0]);
      setAppliedVoucher(null);
      setVoucherInput('');
      setVoucherError('');
    }
  }, [product]);

  // Calculate prices
  const basePrice = selectedPaket ? selectedPaket.price : 0;
  let discountAmount = 0;
  if (appliedVoucher) {
    if (appliedVoucher.discountType === 'fixed') {
      discountAmount = appliedVoucher.discountValue;
    } else {
      discountAmount = Math.round((basePrice * appliedVoucher.discountValue) / 100);
    }
    // Cap discount
    discountAmount = Math.min(discountAmount, basePrice);
  }
  const finalPrice = Math.max(0, basePrice - discountAmount);

  const formatRupiah = (num: number) => {
    return 'Rp' + num.toLocaleString('id-ID');
  };

  const handleApplyVoucher = () => {
    setVoucherError('');
    const code = voucherInput.trim().toUpperCase();
    if (!code) {
      setVoucherError('Masukkan kode voucher');
      return;
    }

    const found = VOUCHERS.find((v) => v.code === code);
    if (!found) {
      setVoucherError('Kode voucher tidak valid');
      onShowToast('Kode voucher tidak ditemukan!', 'error');
      return;
    }

    if (found.minSpend && basePrice < found.minSpend) {
      setVoucherError(`Minimal belanja ${formatRupiah(found.minSpend)} untuk voucher ini`);
      onShowToast(`Minimal belanja ${formatRupiah(found.minSpend)}`, 'error');
      return;
    }

    setAppliedVoucher(found);
    onShowToast(`Voucher ${found.code} berhasil dipasang!`, 'success');
  };

  const handleRemoveVoucher = () => {
    setAppliedVoucher(null);
    setVoucherInput('');
    setVoucherError('');
  };

  // Generate order item object
  const createOrderObject = (): OrderItem => {
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const orderNumber = `RGM-${Date.now().toString().slice(-4)}${randomHex}`;

    return {
      id: orderNumber,
      orderNumber,
      product,
      paket: selectedPaket,
      paymentMethod: selectedPayment,
      customerWhatsApp: customerWA.trim(),
      customerEmail: customerEmail.trim() || undefined,
      customerNotes: customerNotes.trim() || undefined,
      voucherCode: appliedVoucher?.code,
      discountAmount,
      totalPrice: finalPrice,
      createdAt: new Date().toISOString(),
      status: 'Menunggu Pembayaran'
    };
  };

  // Save order to localStorage
  const saveOrderToStorage = (order: OrderItem) => {
    try {
      const existing = localStorage.getItem('regarm_orders');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(order);
      localStorage.setItem('regarm_orders', JSON.stringify(list.slice(0, 30)));
    } catch (e) {
      console.error('Failed to save order to localStorage', e);
    }
  };

  const generateWhatsappMessage = (order: OrderItem) => {
    const emailInfo = order.customerEmail ? `\n• Email Customer: ${order.customerEmail}` : '';
    const notesInfo = order.customerNotes ? `\n• Catatan: ${order.customerNotes}` : '';
    const discountInfo = order.discountAmount > 0 ? `\n• Diskon: -${formatRupiah(order.discountAmount)} (${order.voucherCode})` : '';

    return (
      `Halo Admin REGARM-MART ⚡, saya ingin order langganan digital:\n\n` +
      `*ORDER ID: ${order.orderNumber}*\n` +
      `• Produk: *${order.product.name}*\n` +
      `• Paket: ${order.paket.name}\n` +
      `• Tipe Akun: ${order.paket.accountType} (${order.paket.duration})\n` +
      `• Harga Normal: ${formatRupiah(order.paket.price)}` +
      `${discountInfo}\n` +
      `• *TOTAL BAYAR: ${formatRupiah(order.totalPrice)}*\n` +
      `• Metode Bayar: ${order.paymentMethod.name}\n` +
      `• No. WA Customer: ${order.customerWhatsApp}` +
      `${emailInfo}` +
      `${notesInfo}\n\n` +
      `Mohon dibantu nomor rekening / QRIS dan proses pengiriman akunnya ya admin. Terima kasih! 🙏`
    );
  };

  const handleKirimWA = () => {
    if (!customerWA.trim()) {
      onShowToast('Silakan masukkan nomor WhatsApp Anda terlebih dahulu!', 'error');
      return;
    }

    const order = createOrderObject();
    saveOrderToStorage(order);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (_) {}

    const text = encodeURIComponent(generateWhatsappMessage(order));
    const waUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${text}`;

    // Provide immediate feedback & open link safely
    onShowToast('Membuka WhatsApp Admin...', 'success');
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyOrderText = () => {
    if (!customerWA.trim()) {
      onShowToast('Masukkan nomor WhatsApp Anda agar format order lengkap!', 'error');
      return;
    }
    const order = createOrderObject();
    saveOrderToStorage(order);
    const text = generateWhatsappMessage(order);
    navigator.clipboard.writeText(text);
    onShowToast('Format pesanan berhasil disalin ke clipboard!', 'success');
  };

  const handleViewInvoice = () => {
    if (!customerWA.trim()) {
      onShowToast('Silakan masukkan nomor WhatsApp Anda terlebih dahulu!', 'error');
      return;
    }
    const order = createOrderObject();
    saveOrderToStorage(order);
    onOpenInvoice(order);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="w-full max-w-xl bg-[#0f1523] border border-cyan-400/25 sm:border-t-cyan-400 border-t-2 border-t-cyan-400 rounded-t-3xl sm:rounded-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl shadow-cyan-950/60 animate-in fade-in duration-200"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-cyan-400/15 bg-[#131b2a]/90">
          <div className="flex items-center gap-3">
            <AppLogo
              name={product.name}
              domain={product.iconDomain}
              accentColor={product.accentColor}
              size="sm"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-anton text-lg tracking-wide text-white">
                  {product.name}
                </h2>
                {product.tag && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-cyan-400 text-slate-950 uppercase">
                    {product.tag}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-1">
                {product.description}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 overflow-y-auto space-y-4">
          {/* STEP 1: PILIH PAKET */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 font-black text-[10.5px] flex items-center justify-center">
                  1
                </span>
                PILIH PAKET &amp; DURASI
              </label>
              <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-cyan-400" />
                {product.warrantyPeriod}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.pakets.map((pkt) => {
                const isSelected = selectedPaket?.id === pkt.id;
                return (
                  <div
                    key={pkt.id}
                    onClick={() => setSelectedPaket(pkt)}
                    className={`relative p-3 rounded-xl border cursor-pointer text-left transition-all duration-150 ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-500/10 shadow-md shadow-cyan-500/10'
                        : 'border-slate-800 bg-[#131b2a]/60 hover:bg-[#1a263b] hover:border-slate-700'
                    }`}
                  >
                    {pkt.isPopular && (
                      <span className="absolute top-2 right-2 px-1.5 py-0.5 text-[8.5px] font-black uppercase tracking-wider rounded bg-cyan-400 text-slate-950">
                        BEST SELLER
                      </span>
                    )}

                    <div className="font-bold text-xs text-white mb-1 pr-12">
                      {pkt.name}
                    </div>

                    <div className="flex items-baseline gap-1.5 mb-1.5">
                      <span className="font-jetbrains text-sm font-bold text-cyan-300">
                        {pkt.priceFormatted}
                      </span>
                      {pkt.originalPrice && (
                        <span className="text-[10px] text-slate-500 line-through">
                          {pkt.originalPrice}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-1">
                      <span className="text-[9px] font-semibold text-slate-300 bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700/50">
                        {pkt.duration}
                      </span>
                      <span className="text-[9px] font-semibold text-cyan-300 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">
                        Garansi {pkt.warranty}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="mt-2 pt-2 border-t border-cyan-400/20 text-[10px] text-slate-300 space-y-0.5">
                        {pkt.features.slice(0, 2).map((feat, i) => (
                          <div key={i} className="flex items-center gap-1 text-slate-300">
                            <CheckCircle2 className="w-2.5 h-2.5 text-cyan-400 shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 2: METODE PEMBAYARAN */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 font-black text-[10.5px] flex items-center justify-center">
                2
              </span>
              METODE PEMBAYARAN
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PAYMENT_METHODS.map((method) => {
                const isSelected = selectedPayment.id === method.id;
                return (
                  <div
                    key={method.id}
                    onClick={() => setSelectedPayment(method)}
                    className={`p-2.5 rounded-xl border cursor-pointer text-left transition-all duration-150 ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-500/10 shadow-sm shadow-cyan-400/20'
                        : 'border-slate-800 bg-[#131b2a]/60 hover:bg-[#1a263b] hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-white">
                        {method.name}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                    </div>
                    <span className="text-[9.5px] font-semibold text-cyan-400">
                      {method.badge || 'Bebas Admin'}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Payment Details Box */}
            <div className="p-3 rounded-xl bg-[#131b2a] border border-cyan-400/20 text-xs flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-slate-300">
                <span className="font-semibold text-cyan-300">
                  {selectedPayment.name}
                </span>
                {selectedPayment.accountNumber && (
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(selectedPayment.accountNumber || '');
                      onShowToast(`Nomor ${selectedPayment.name} berhasil disalin!`, 'success');
                    }}
                    className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-200 transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Salin No/Rek</span>
                  </button>
                )}
              </div>

              {selectedPayment.accountNumber ? (
                <div className="font-jetbrains font-bold text-sm text-white tracking-wide">
                  {selectedPayment.accountNumber}
                  {selectedPayment.accountHolder && (
                    <span className="text-xs font-normal text-slate-400 ml-2">
                      (a.n {selectedPayment.accountHolder})
                    </span>
                  )}
                </div>
              ) : (
                <p className="text-[11px] text-slate-300">
                  Bisa scan QRIS melalui GoPay, OVO, DANA, ShopeePay, BCA Mobile, Livin Mandiri, BRImo, dll tanpa potongan admin.
                </p>
              )}
            </div>
          </div>

          {/* STEP 3: DATA PEMESAN */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 font-black text-[10.5px] flex items-center justify-center">
                3
              </span>
              DATA PEMESAN &amp; CATATAN
            </label>

            <div className="space-y-2">
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-slate-300 font-semibold">Nomor WhatsApp Aktif <span className="text-cyan-400">*</span></span>
                  <span className="text-slate-500">Untuk kirim detail akun</span>
                </div>
                <div className="relative">
                  <Smartphone className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={customerWA}
                    onChange={(e) => setCustomerWA(e.target.value)}
                    placeholder="Contoh: 0895325627342"
                    className="w-full bg-[#131b2a] border border-cyan-400/20 text-white pl-9 pr-3 py-2 rounded-xl text-xs outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <div className="text-[11px] text-slate-300 font-semibold mb-1">
                    Email Anda (Opsional)
                  </div>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="Wajib untuk Spotify/Canva Invite"
                    className="w-full bg-[#131b2a] border border-cyan-400/20 text-white px-3 py-2 rounded-xl text-xs outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <div className="text-[11px] text-slate-300 font-semibold mb-1">
                    Catatan Tambahan (Opsional)
                  </div>
                  <input
                    type="text"
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    placeholder="cth: Mohon request PIN 1234"
                    className="w-full bg-[#131b2a] border border-cyan-400/20 text-white px-3 py-2 rounded-xl text-xs outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* VOUCHER & DISKON */}
          <div className="p-3 rounded-xl bg-[#131b2a]/80 border border-cyan-400/15 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-200 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-cyan-400" />
                Punya Kode Voucher Promo?
              </span>
              <span className="text-[10px] text-cyan-300 font-mono">
                Coba: REGARMHEMAT / PROMOAI
              </span>
            </div>

            {appliedVoucher ? (
              <div className="flex items-center justify-between p-2 rounded-lg bg-cyan-950/80 border border-cyan-400/40 text-xs">
                <div className="flex items-center gap-1.5 text-cyan-300 font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Voucher "{appliedVoucher.code}" aktif (-{formatRupiah(discountAmount)})</span>
                </div>
                <button
                  onClick={handleRemoveVoucher}
                  className="text-[11px] text-rose-400 hover:text-rose-300 font-bold"
                >
                  Hapus
                </button>
              </div>
            ) : (
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={voucherInput}
                  onChange={(e) => setVoucherInput(e.target.value.toUpperCase())}
                  placeholder="KODE VOUCHER"
                  className="flex-1 bg-[#0b0f17] border border-slate-700 text-white px-3 py-1.5 rounded-lg text-xs uppercase tracking-wider outline-none focus:border-cyan-400 font-mono"
                />
                <button
                  type="button"
                  onClick={handleApplyVoucher}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors"
                >
                  Gunakan
                </button>
              </div>
            )}
            {voucherError && (
              <p className="text-[11px] text-rose-400 font-medium">{voucherError}</p>
            )}
          </div>

          {/* RINGKASAN HARGA */}
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Harga Normal:</span>
              <span>{formatRupiah(basePrice)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-cyan-400 font-medium">
                <span>Diskon Promo:</span>
                <span>-{formatRupiah(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between items-baseline pt-1.5 border-t border-slate-800">
              <span className="font-bold text-white text-sm">Total Tagihan:</span>
              <span className="font-jetbrains font-bold text-lg text-cyan-300">
                {formatRupiah(finalPrice)}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="p-4 border-t border-cyan-400/15 bg-[#131b2a] flex flex-col gap-2">
          {/* Main WhatsApp Checkout Button */}
          <button
            type="button"
            onClick={handleKirimWA}
            className="w-full py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 active:scale-[0.99] text-slate-950 font-anton text-base tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/25 cursor-pointer font-bold"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>⚡ LANJUT KE WHATSAPP ADMIN</span>
          </button>

          {/* Secondary Action Options: Copy Format & View Digital Invoice */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleCopyOrderText}
              className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Copy className="w-3.5 h-3.5 text-cyan-400" />
              <span>Salin Format Order</span>
            </button>

            <button
              type="button"
              onClick={handleViewInvoice}
              className="py-2 px-3 rounded-lg bg-cyan-950/70 hover:bg-cyan-900/70 text-cyan-300 border border-cyan-500/30 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Lihat Bukti Invoice</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
