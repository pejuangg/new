import React from 'react';
import { OrderItem } from '../types';
import { ADMIN_WHATSAPP } from '../data/products';
import { 
  X, 
  Copy, 
  Printer, 
  Building2,
  Clock
} from 'lucide-react';

interface InvoiceModalProps {
  order: OrderItem | null;
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  order,
  isOpen,
  onClose,
  onShowToast
}) => {
  if (!isOpen || !order) return null;

  const formatRupiah = (num: number) => {
    return 'Rp ' + num.toLocaleString('id-ID');
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    onShowToast(`${label} disalin!`, 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  const waPaymentConfirmUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(
    `Halo Admin REGARM-MART! Saya sudah transfer untuk pesanan:\n\n` +
    `*ORDER ID: ${order.orderNumber}*\n` +
    `• Produk: ${order.product.name} - ${order.paket.name}\n` +
    `• Nominal: ${formatRupiah(order.totalPrice)}\n` +
    `• Metode: ${order.paymentMethod.name}\n\n` +
    `Berikut bukti pembayarannya, mohon diproses ya min! ⚡`
  )}`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        className="w-full max-w-md max-h-[90vh] overflow-y-auto border-t-2 sm:border-2 sm:rounded-sm flex flex-col shadow-2xl animate-in fade-in duration-150 print:max-h-none print:shadow-none print:border-none print:bg-white print:text-black"
        style={{
          borderColor: 'var(--fg)',
          backgroundColor: 'var(--popover)',
          color: 'var(--fg)'
        }}
      >
        {/* Invoice Header */}
        <div
          className="p-4 border-b flex items-center justify-between"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)' }}
        >
          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--muted)' }}>
              Official Receipt
            </p>
            <h3 className="font-display text-2xl text-[#f2eee3]">
              Invoice Tagihan
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 text-slate-400 hover:text-white rounded transition-colors print:hidden"
              title="Cetak Invoice"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="sticker cursor-pointer print:hidden"
              style={{ background: 'var(--fg)', color: 'var(--bg)' }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Invoice Body */}
        <div className="p-5 space-y-4">
          {/* Order ID Banner */}
          <div
            className="p-3 border flex items-center justify-between"
            style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
          >
            <div>
              <div className="font-mono text-[9px] uppercase tracking-wider text-[#a09c8d]">
                Order ID
              </div>
              <div className="font-mono font-bold text-sm text-[#d4f534] flex items-center gap-1.5">
                <span>{order.orderNumber}</span>
                <button
                  onClick={() => handleCopy(order.orderNumber, 'Order ID')}
                  className="text-slate-400 hover:text-white"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </div>
            </div>
            <span
              className="sticker"
              style={{ background: 'var(--lime)', color: 'var(--ink)' }}
            >
              {order.status}
            </span>
          </div>

          {/* Product Info */}
          <div
            className="p-4 border space-y-2"
            style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
          >
            <div className="flex justify-between items-start pb-2 border-b" style={{ borderColor: 'var(--border)' }}>
              <div>
                <h4 className="font-display text-2xl text-[#f2eee3] leading-none">
                  {order.product.name}
                </h4>
                <p className="font-mono text-xs text-[#d4f534] mt-0.5 font-bold">
                  {order.paket.name}
                </p>
                <p className="font-mono text-[10px] text-[#a09c8d]">
                  Durasi: {order.paket.duration} · Garansi {order.paket.warranty}
                </p>
              </div>
              <div className="text-right font-display text-xl text-[#f2eee3]">
                {formatRupiah(order.paket.price)}
              </div>
            </div>

            {order.discountAmount > 0 && (
              <div className="flex justify-between font-mono text-xs text-[#d4f534]">
                <span>Diskon ({order.voucherCode}):</span>
                <span>-{formatRupiah(order.discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between items-baseline pt-2 border-t font-bold" style={{ borderColor: 'var(--border)' }}>
              <span className="font-mono text-xs uppercase text-[#a09c8d]">Total Transfer:</span>
              <span className="font-display text-2xl" style={{ color: 'var(--lime)' }}>
                {formatRupiah(order.totalPrice)}
              </span>
            </div>
          </div>

          {/* Payment Method Instructions */}
          <div
            className="p-4 border space-y-3"
            style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase flex items-center gap-1.5 text-[#f2eee3]">
                <Building2 className="w-4 h-4 text-[#d4f534]" />
                {order.paymentMethod.name}
              </span>
              <span className="font-mono text-[9px] uppercase text-[#d4f534]">
                Bebas Admin
              </span>
            </div>

            {order.paymentMethod.category === 'qris' ? (
              <div className="flex flex-col items-center p-3 bg-white rounded-xs text-center space-y-2">
                <div className="text-[9px] font-black font-mono text-black tracking-widest uppercase">
                  QRIS ALL PAYMENT · REGARM-MART
                </div>
                {/* SVG QR Code */}
                <svg className="w-32 h-32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100" height="100" fill="white" />
                  <rect x="10" y="10" width="25" height="25" fill="black" />
                  <rect x="15" y="15" width="15" height="15" fill="white" />
                  <rect x="18" y="18" width="9" height="9" fill="black" />
                  <rect x="65" y="10" width="25" height="25" fill="black" />
                  <rect x="70" y="15" width="15" height="15" fill="white" />
                  <rect x="73" y="18" width="9" height="9" fill="black" />
                  <rect x="10" y="65" width="25" height="25" fill="black" />
                  <rect x="15" y="70" width="15" height="15" fill="white" />
                  <rect x="18" y="73" width="9" height="9" fill="black" />
                  <rect x="42" y="12" width="6" height="6" fill="black" />
                  <rect x="50" y="20" width="6" height="6" fill="black" />
                  <rect x="42" y="28" width="6" height="6" fill="black" />
                  <rect x="25" y="45" width="8" height="8" fill="black" />
                  <rect x="45" y="45" width="10" height="10" fill="#131519" />
                  <rect x="65" y="45" width="6" height="6" fill="black" />
                  <rect x="78" y="55" width="8" height="8" fill="black" />
                  <rect x="45" y="65" width="8" height="8" fill="black" />
                  <rect x="60" y="75" width="10" height="10" fill="black" />
                  <rect x="80" y="80" width="8" height="8" fill="black" />
                </svg>
                <div className="font-mono text-[8px] font-bold text-slate-700">
                  Scan dengan GoPay, DANA, OVO, ShopeePay, BCA, Livin, dll.
                </div>
              </div>
            ) : (
              <div
                className="p-3 border flex items-center justify-between"
                style={{ borderColor: 'var(--border)', background: 'var(--popover)' }}
              >
                <div>
                  <div className="font-mono text-[9px] uppercase text-[#a09c8d]">
                    Nomor Tujuan / Rekening
                  </div>
                  <div className="font-mono font-bold text-base text-[#d4f534]">
                    {order.paymentMethod.accountNumber}
                  </div>
                  {order.paymentMethod.accountHolder && (
                    <div className="font-mono text-[10px] text-[#f2eee3]">
                      a.n {order.paymentMethod.accountHolder}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(order.paymentMethod.accountNumber || '', 'Nomor Rekening')}
                  className="sticker cursor-pointer"
                  style={{ background: 'var(--lime)', color: 'var(--ink)' }}
                >
                  Salin
                </button>
              </div>
            )}

            <div className="font-mono text-[10px] text-[#a09c8d] space-y-1">
              <div className="flex items-center gap-1 text-[#f2eee3] font-bold">
                <Clock className="w-3 h-3 text-[#d4f534]" />
                <span>Petunjuk Selesai:</span>
              </div>
              <ul className="list-disc pl-4 space-y-0.5">
                <li>Transfer sejumlah: <b className="text-[#d4f534]">{formatRupiah(order.totalPrice)}</b></li>
                <li>Tekan tombol di bawah untuk kirim bukti ke WhatsApp Admin</li>
                <li>Akun dikirim admin dalam 1–30 menit</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Invoice Actions */}
        <div
          className="p-4 border-t flex flex-col gap-2 print:hidden"
          style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
        >
          <a
            href={waPaymentConfirmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="brutal w-full py-3 text-center font-display text-xl cursor-pointer"
            style={{ background: 'var(--lime)', color: 'var(--ink)' }}
          >
            Kirim Bukti ke WA Admin →
          </a>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[#a09c8d] hover:text-white"
          >
            Tutup Invoice
          </button>
        </div>
      </div>
    </div>
  );
};
