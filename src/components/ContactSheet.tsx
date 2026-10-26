import React from 'react';
import { ADMIN_WHATSAPP, ADMIN_TELEGRAM_CONTACT } from '../data/products';

interface ContactSheetProps {
  onClose: () => void;
}

export const ContactSheet: React.FC<ContactSheetProps> = ({ onClose }) => {
  const waUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent('Halo Admin REGARM-MART, saya mau tanya layanan / konsultasi akun.')}`;

  return (
    <div className="pb-8">
      <div className="px-5 pt-6">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--muted)' }}>
          Respon 1–30 menit
        </p>
        <h2 className="font-display text-6xl text-[#f2eee3] leading-[0.85] mt-1">
          Hubungi Admin
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 p-5">
        <a
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          className="brutal flex aspect-square flex-col justify-between p-4 cursor-pointer"
          style={{ background: 'var(--lime)', color: 'var(--ink)' }}
        >
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider">
            Order &amp; bayar
          </span>
          <span className="font-display text-4xl leading-[0.9]">
            Whats<br />App ↗
          </span>
        </a>

        <a
          href={ADMIN_TELEGRAM_CONTACT}
          target="_blank"
          rel="noreferrer"
          className="paper flex aspect-square flex-col justify-between p-4 cursor-pointer shadow-lg text-[#26282e]"
        >
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#26282e]/80">
            @sadraxh
          </span>
          <span className="font-display text-4xl leading-[0.9] text-[#26282e]">
            Tele<br />gram ↗
          </span>
        </a>
      </div>

      <div className="px-5 space-y-2.5">
        <a
          href="https://t.me/jejakbeli"
          target="_blank"
          rel="noreferrer"
          className="brutal w-full py-3 px-4 font-mono text-xs font-bold uppercase flex items-center justify-between cursor-pointer"
          style={{ background: 'var(--card)', color: 'var(--lime)', borderColor: 'var(--lime)' }}
        >
          <span>Channel Bukti Transaksi (Telegram)</span>
          <span>↗</span>
        </a>

        <div className="p-3.5 rounded-sm border text-xs space-y-1.5" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
          <div className="font-bold text-sm text-[#f2eee3]">Jam Operasional Regarm-Mart</div>
          <p className="text-[#a09c8d] text-[11px] leading-relaxed">
            Setiap hari: 10.00 – 00.30 WIB (Fast Response 3–10 Menit). Pemesanan di luar jam kerja akan diproses pertama di pagi hari.
          </p>
        </div>
      </div>
    </div>
  );
};
