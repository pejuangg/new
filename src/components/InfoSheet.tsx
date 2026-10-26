import React from 'react';
import { OPEN_HOUR, CLOSE_HOUR, ADMIN_WHATSAPP, ADMIN_TELEGRAM_PROOF } from '../data/products';
import { Clock, Shield, Sparkles, MessageSquare, QrCode, Building2, Smartphone } from 'lucide-react';

interface InfoSheetProps {
  onClose: () => void;
  onOpenPrivacy?: () => void;
  onOpenSnk?: () => void;
}

export const InfoSheet: React.FC<InfoSheetProps> = ({ onClose, onOpenPrivacy, onOpenSnk }) => {
  const now = new Date();
  const h = (now.getUTCHours() + 7) % 24;
  const m = now.getUTCMinutes();
  const isOpen = (h >= 10 && h <= 23) || (h === 0 && m <= 30);

  return (
    <div className="pb-10">
      {/* Header */}
      <div className="px-5 pt-7 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--muted)' }}>
          Profile &amp; Operational Info
        </p>
        <h2 className="font-display text-5xl leading-[0.88] mt-1" style={{ color: 'var(--fg)' }}>
          Info Toko <br />
          <span style={{ color: 'var(--lime)' }}>REGARM-MART</span>
        </h2>
      </div>

      <div className="px-5 py-5 space-y-4">
        {/* Status Card */}
        <div
          className="p-4 border rounded-xs flex items-center justify-between"
          style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
        >
          <div>
            <span
              className="sticker mb-1 inline-block"
              style={{
                background: isOpen ? 'var(--lime)' : 'var(--red)',
                color: isOpen ? 'var(--ink)' : '#fff'
              }}
            >
              ● {isOpen ? 'STORE BUKA' : 'STORE TUTUP'}
            </span>
            <p className="font-mono text-xs font-bold" style={{ color: 'var(--fg)' }}>
              Jam Kerja: 10.00 – 00.30 WIB
            </p>
            <p className="font-mono text-[10px] text-[#a09c8d]">
              Estimasi Pengerjaan: 1–30 Menit setelah bukti transfer dikirim.
            </p>
          </div>
          <Clock className="w-8 h-8 text-[#d4f534] opacity-80" />
        </div>

        {/* About Summary */}
        <div className="space-y-1.5 font-mono text-xs leading-relaxed" style={{ color: 'var(--fg)' }}>
          <p className="font-bold uppercase tracking-wider text-cyan-400">
            ✺ Trusted Premium Store Since 2023
          </p>
          <p className="text-[#a09c8d] text-[11px]">
            REGARM-MART adalah penyedia akun premium digital resmi untuk kebutuhan hiburan, produktivitas, musik, desain, dan pendidikan (Netflix, Spotify, Canva Pro, YouTube Premium, ChatGPT Plus, CapCut, dan 36+ aplikasi lainnya).
          </p>
        </div>

        {/* Official Payment Methods */}
        <div className="space-y-2 border-t pt-3" style={{ borderColor: 'var(--border)' }}>
          <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#a09c8d]">
            Metode Pembayaran Resmi (Hanya 3):
          </p>
          <div className="space-y-1.5">
            <div className="p-2.5 border rounded-xs flex items-center gap-2.5" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
              <QrCode className="w-4 h-4 text-[#d4f534]" />
              <div className="font-mono text-[11px]">
                <span className="font-bold text-[#f2eee3]">QRIS All Payment</span>
                <span className="text-[#a09c8d] block text-[9.5px]">GoPay, OVO, DANA, ShopeePay &amp; Semua m-Banking (BCA/Mandiri/BRI/BNI)</span>
              </div>
            </div>
            <div className="p-2.5 border rounded-xs flex items-center gap-2.5" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
              <Building2 className="w-4 h-4 text-cyan-400" />
              <div className="font-mono text-[11px]">
                <span className="font-bold text-[#f2eee3]">SeaBank: 9019 4821 7361</span>
                <span className="text-[#a09c8d] block text-[9.5px]">a.n REGARM DIGITAL STORE (Bebas Biaya Transfer)</span>
              </div>
            </div>
            <div className="p-2.5 border rounded-xs flex items-center gap-2.5" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <div className="font-mono text-[11px]">
                <span className="font-bold text-[#f2eee3]">GoPay: 0895-3256-27342</span>
                <span className="text-[#a09c8d] block text-[9.5px]">a.n REGARM MART (Instan Masuk)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="p-3 border rounded-xs font-mono text-[10.5px] leading-relaxed bg-amber-400/10 border-amber-400/30 text-amber-300">
          <b>Catatan Penting:</b> Website ini adalah sistem katalog &amp; generator format pemesanan otomatis. Seluruh transaksi pembayaran dan pengiriman data akun diproses secara personal dan aman oleh Admin melalui WhatsApp.
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          {onOpenPrivacy && (
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="border p-2.5 font-mono text-[10px] font-bold uppercase text-left rounded-xs hover:bg-white/5 transition-colors"
              style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
            >
              Kebijakan Privasi →
            </button>
          )}
          {onOpenSnk && (
            <button
              type="button"
              onClick={onOpenSnk}
              className="border p-2.5 font-mono text-[10px] font-bold uppercase text-left rounded-xs hover:bg-white/5 transition-colors"
              style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
            >
              Aturan Garansi 🛡 →
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <a
            href={`https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent('Halo Admin REGARM-MART, saya mau tanya info produk / cara order! ⚡')}`}
            target="_blank"
            rel="noreferrer"
            className="brutal flex items-center justify-between px-4 py-3 cursor-pointer"
            style={{ background: 'var(--lime)', color: 'var(--ink)' }}
          >
            <span className="font-display text-xl">Chat WhatsApp Admin</span>
            <MessageSquare className="w-5 h-5" />
          </a>
          <a
            href={ADMIN_TELEGRAM_PROOF}
            target="_blank"
            rel="noreferrer"
            className="border flex items-center justify-between px-4 py-3 font-mono text-xs font-bold uppercase rounded-xs hover:bg-white/5"
            style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
          >
            <span>300+ Bukti Transaksi Real</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </div>
  );
};
