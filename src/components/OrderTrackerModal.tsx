import React, { useState, useEffect } from 'react';
import { OrderItem } from '../types';
import { ADMIN_WHATSAPP } from '../data/products';
import { 
  X, 
  Search, 
  ReceiptText, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Copy,
  ChevronRight
} from 'lucide-react';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOrder: (order: OrderItem) => void;
  onShowToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  onSelectOrder,
  onShowToast
}) => {
  if (!isOpen) return null;

  const [searchKey, setSearchKey] = useState('');
  const [orders, setOrders] = useState<OrderItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('regarm_orders');
      if (stored) {
        setOrders(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, [isOpen]);

  const filteredOrders = orders.filter((o) => {
    if (!searchKey.trim()) return true;
    const query = searchKey.toLowerCase().trim();
    return (
      o.orderNumber.toLowerCase().includes(query) ||
      o.customerWhatsApp.includes(query) ||
      o.product.name.toLowerCase().includes(query)
    );
  });

  const formatRupiah = (num: number) => 'Rp' + num.toLocaleString('id-ID');

  const handleCopyOrderId = (id: string) => {
    navigator.clipboard.writeText(id);
    onShowToast(`Nomor ${id} disalin!`, 'success');
  };

  const handleClearHistory = () => {
    if (confirm('Yakin ingin menghapus riwayat pesanan di perangkat ini?')) {
      localStorage.removeItem('regarm_orders');
      setOrders([]);
      onShowToast('Riwayat pesanan dibersihkan', 'info');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg bg-[#0f1523] border border-cyan-400/25 rounded-2xl max-h-[88vh] flex flex-col overflow-hidden shadow-2xl shadow-cyan-950/70">
        {/* Header */}
        <div className="p-4 bg-[#131b2a] border-b border-cyan-400/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ReceiptText className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="font-anton text-base tracking-wide text-white">
                LACAK PESANAN &amp; STATUS
              </h3>
              <p className="text-[11px] text-slate-400">
                Cek riwayat pembelian dan status klaim garansi
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-3 bg-[#111827] border-b border-slate-800">
          <div className="relative">
            <Search className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              placeholder="Cari berdasarkan Order ID (RGM-...) atau No WhatsApp"
              className="w-full bg-[#0b0f17] border border-cyan-400/20 text-white pl-9 pr-3 py-2 rounded-xl text-xs outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Content list */}
        <div className="p-4 overflow-y-auto space-y-2.5 flex-1">
          {filteredOrders.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <ReceiptText className="w-10 h-10 mx-auto text-slate-600 stroke-[1.5]" />
              <div className="font-semibold text-sm text-slate-300">Belum Ada Riwayat Pesanan</div>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Pesanan yang Anda buat di REGARM-MART akan tersimpan otomatis di sini.
              </p>
            </div>
          ) : (
            filteredOrders.map((ord) => (
              <div
                key={ord.id}
                className="p-3 rounded-xl bg-[#131b2a]/70 border border-slate-800 hover:border-cyan-400/40 transition-all flex flex-col gap-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="font-jetbrains font-bold text-cyan-300">
                      {ord.orderNumber}
                    </span>
                    <button
                      onClick={() => handleCopyOrderId(ord.orderNumber)}
                      className="text-slate-500 hover:text-slate-300"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                    {ord.status}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-white">{ord.product.name}</div>
                    <div className="text-xs text-slate-400">
                      {ord.paket.name} · {formatRupiah(ord.totalPrice)}
                    </div>
                  </div>
                  <button
                    onClick={() => onSelectOrder(ord)}
                    className="px-2.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-[11px] font-bold flex items-center gap-1 transition-colors"
                  >
                    <span>Buka Invoice</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[10.5px] text-slate-500 pt-1 border-t border-slate-800/80">
                  <span>Metode: {ord.paymentMethod.name}</span>
                  <span>{new Date(ord.createdAt).toLocaleDateString('id-ID')}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {orders.length > 0 && (
          <div className="p-3 bg-[#131b2a] border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Total {orders.length} pesanan tercatat</span>
            <button
              onClick={handleClearHistory}
              className="text-slate-500 hover:text-rose-400 text-[11px] transition-colors"
            >
              Hapus Riwayat
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
