import React from 'react';
import { ShieldCheck, Lock, EyeOff, CheckCircle } from 'lucide-react';

interface PrivacySheetProps {
  onClose: () => void;
}

export const PrivacySheet: React.FC<PrivacySheetProps> = ({ onClose }) => {
  return (
    <div className="pb-10">
      {/* Header */}
      <div className="px-5 pt-7 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--muted)' }}>
          Keamanan &amp; Data Pribadi
        </p>
        <h2 className="font-display text-5xl leading-[0.88] mt-1" style={{ color: 'var(--fg)' }}>
          Kebijakan <br />
          <span style={{ color: 'var(--lime)' }}>Privasi</span>
        </h2>
      </div>

      <div className="px-5 py-5 space-y-4">
        {/* Intro Banner */}
        <div className="p-4 border rounded-xs" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
          <div className="flex items-center gap-2 mb-1.5" style={{ color: 'var(--lime)' }}>
            <ShieldCheck className="w-5 h-5" />
            <span className="font-display text-xl">100% Aman &amp; Terpercaya</span>
          </div>
          <p className="font-mono text-xs leading-relaxed" style={{ color: 'var(--fg)' }}>
            REGARM-MART menjamin privasi setiap buyer. Informasi transaksi Anda diperlakukan dengan standar kerahasiaan ketat.
          </p>
        </div>

        {/* Section 1 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-cyan-400" />
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--fg)' }}>
              1. Penggunaan Data Pembeli
            </h3>
          </div>
          <p className="font-mono text-[11px] leading-relaxed text-[#a09c8d]">
            Nomor WhatsApp dan alamat email yang Anda masukkan dalam formulir pemesanan semata-mata digunakan untuk:
          </p>
          <ul className="space-y-1.5 font-mono text-[11px] text-[#a09c8d] pl-4 list-disc">
            <li>Konfirmasi status invoice dan penerimaan bukti transfer.</li>
            <li>Pengiriman kredensial akun digital (email/password atau undangan link resmi).</li>
            <li>Bantuan klaim garansi jika terjadi kendala selama masa aktif paket.</li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="space-y-2 border-t pt-3" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-amber-400" />
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--fg)' }}>
              2. Tidak Ada Penjualan Data (Zero Leak)
            </h3>
          </div>
          <p className="font-mono text-[11px] leading-relaxed text-[#a09c8d]">
            Kami <b>TIDAK PERNAH</b> menjual, menyewakan, atau menyebarluaskan nomor WhatsApp, email, atau data transaksi Anda kepada pihak ketiga mana pun. Tidak ada pesan spam marketing yang mengganggu.
          </p>
        </div>

        {/* Section 3 */}
        <div className="space-y-2 border-t pt-3" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--fg)' }}>
              3. Status Web &amp; Transaksi
            </h3>
          </div>
          <p className="font-mono text-[11px] leading-relaxed text-[#a09c8d]">
            Website REGARM-MART berfungsi sebagai <b>katalog digital interaktif dan generator format order</b>. Seluruh proses pembayaran uang riil dan pengiriman data akun dilakukan secara manual langsung oleh Admin resmi via WhatsApp, sehingga Anda terlindung dari phising atau gateway palsu.
          </p>
        </div>

        {/* Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onClose}
            className="brutal w-full py-3.5 font-display text-xl cursor-pointer"
            style={{ background: 'var(--lime)', color: 'var(--ink)' }}
          >
            Saya Mengerti ✓
          </button>
        </div>
      </div>
    </div>
  );
};
