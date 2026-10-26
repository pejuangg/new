import React from 'react';
import { LayoutGrid, MessageSquare, ShieldCheck, ReceiptText } from 'lucide-react';
import { ADMIN_WHATSAPP, ADMIN_TELEGRAM } from '../data/products';

interface BottomBarProps {
  activeTab: 'katalog' | 'hubungi' | 'testi' | 'lacak';
  onSelectTab: (tab: 'katalog' | 'hubungi' | 'testi' | 'lacak') => void;
  onOpenTestimonials: () => void;
  onOpenOrderTracker: () => void;
  onScrollToCatalog: () => void;
}

export const BottomBar: React.FC<BottomBarProps> = ({
  activeTab,
  onSelectTab,
  onOpenTestimonials,
  onOpenOrderTracker,
  onScrollToCatalog
}) => {
  const handleTabClick = (tab: 'katalog' | 'hubungi' | 'testi' | 'lacak') => {
    onSelectTab(tab);
    if (tab === 'katalog') {
      onScrollToCatalog();
    } else if (tab === 'hubungi') {
      window.open(
        `https://wa.me/${ADMIN_WHATSAPP}?text=Halo%20Admin%20REGARM-MART,%20mau%20tanya-tanya%20dong!%20⚡`,
        '_blank',
        'noopener,noreferrer'
      );
    } else if (tab === 'testi') {
      onOpenTestimonials();
    } else if (tab === 'lacak') {
      onOpenOrderTracker();
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-[64px] pb-[env(safe-area-inset-bottom)] bg-[#0b0f17]/95 backdrop-blur-xl border-t border-cyan-400/20 flex justify-around items-center z-40 max-w-lg mx-auto sm:max-w-2xl">
      {/* Katalog */}
      <button
        type="button"
        onClick={() => handleTabClick('katalog')}
        className={`flex flex-col items-center justify-center gap-1 w-full h-full text-[10px] font-bold uppercase transition-colors ${
          activeTab === 'katalog' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <LayoutGrid className="w-5 h-5" />
        <span>Katalog</span>
      </button>

      {/* Admin WA */}
      <button
        type="button"
        onClick={() => handleTabClick('hubungi')}
        className="flex flex-col items-center justify-center gap-1 w-full h-full text-[10px] font-bold uppercase text-slate-400 hover:text-cyan-300 transition-colors"
      >
        <MessageSquare className="w-5 h-5 text-cyan-400" />
        <span>Admin WA</span>
      </button>

      {/* Bukti & Testi */}
      <button
        type="button"
        onClick={() => handleTabClick('testi')}
        className="flex flex-col items-center justify-center gap-1 w-full h-full text-[10px] font-bold uppercase text-slate-400 hover:text-cyan-300 transition-colors"
      >
        <ShieldCheck className="w-5 h-5" />
        <span>Bukti</span>
      </button>

      {/* Cek Order */}
      <button
        type="button"
        onClick={() => handleTabClick('lacak')}
        className="flex flex-col items-center justify-center gap-1 w-full h-full text-[10px] font-bold uppercase text-slate-400 hover:text-cyan-300 transition-colors"
      >
        <ReceiptText className="w-5 h-5" />
        <span>Cek Order</span>
      </button>
    </nav>
  );
};
