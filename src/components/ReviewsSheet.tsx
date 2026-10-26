import React, { useState, useEffect } from 'react';
import { ADMIN_TELEGRAM_PROOF, ADMIN_WHATSAPP, PRODUCTS } from '../data/products';
import { TESTIMONIALS } from '../data/testimonials';
import { Testimonial } from '../types';
import { Star, Send, MessageSquare, Plus, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReviewsSheetProps {
  onClose: () => void;
  onShowToast?: (message: string, type?: 'success' | 'info' | 'error') => void;
}

export const ReviewsSheet: React.FC<ReviewsSheetProps> = ({ onClose, onShowToast }) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [selectedApp, setSelectedApp] = useState(PRODUCTS[0]?.name || 'Netflix');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // User reviews from localStorage
  const [userReviews, setUserReviews] = useState<Testimonial[]>(() => {
    try {
      const stored = localStorage.getItem('regarm_user_reviews');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const allReviews = [...userReviews, ...TESTIMONIALS];

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      if (onShowToast) onShowToast('Harap isi nama dan ulasan Anda!', 'error');
      return;
    }

    const newRev: Testimonial = {
      id: `rev-${Date.now()}`,
      customerName: name.trim(),
      avatarSeed: name.toLowerCase().replace(/\s+/g, '-'),
      rating,
      productName: selectedApp,
      date: 'Baru saja',
      comment: comment.trim(),
      verified: true
    };

    const updated = [newRev, ...userReviews];
    setUserReviews(updated);
    try {
      localStorage.setItem('regarm_user_reviews', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (_) {}

    if (onShowToast) {
      onShowToast('Terima kasih! Live note Anda berhasil diposting ✺', 'success');
    }

    setSubmittedSuccess(true);
    setComment('');
  };

  const handleShareToWA = (rev: Testimonial) => {
    const text = encodeURIComponent(
      `Halo Admin REGARM-MART, saya mau kirim review/testimoni:\n\n` +
      `• Nama: ${rev.customerName}\n` +
      `• Aplikasi: ${rev.productName}\n` +
      `• Rating: ${'★'.repeat(rev.rating)}\n` +
      `• Ulasan: "${rev.comment}"\n\n` +
      `Bisa dipost ke channel bukti transaksi ya min! Terimakasih 🙏`
    );
    window.open(`https://wa.me/${ADMIN_WHATSAPP}?text=${text}`, '_blank');
  };

  return (
    <div className="pb-10">
      {/* Header */}
      <div className="px-5 pt-6 pb-2">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--muted)' }}>
            Customer Love Notes
          </p>
          <span className="font-mono text-[10px] text-[#d4f534] font-bold">
            {allReviews.length}+ Ulasan Masuk
          </span>
        </div>
        <div className="flex items-end justify-between mt-1">
          <h2 className="font-display text-6xl text-[#f2eee3] leading-[0.85]">
            Reviews
          </h2>
          <button
            type="button"
            onClick={() => {
              setShowForm(!showForm);
              setSubmittedSuccess(false);
            }}
            className="brutal px-3 py-1.5 font-mono text-[11px] font-black uppercase cursor-pointer flex items-center gap-1.5"
            style={{ background: 'var(--lime)', color: 'var(--ink)' }}
          >
            <Plus className={`w-3.5 h-3.5 transition-transform ${showForm ? 'rotate-45' : ''}`} />
            <span>{showForm ? 'Tutup Form' : 'Tulis Testi ✎'}</span>
          </button>
        </div>
      </div>

      {/* Form Tulis Testi / Live Notes */}
      {showForm && (
        <div className="mx-5 my-4 p-4 border-2 rounded-xs shadow-xl animate-fade-in" style={{ borderColor: 'var(--lime)', background: 'var(--card)' }}>
          <div className="flex items-center justify-between mb-3 border-b pb-2" style={{ borderColor: 'var(--border)' }}>
            <h3 className="font-display text-xl text-[#f2eee3]">Tulis Live Note Baru</h3>
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#d4f534]">
              Publik &amp; Transparan
            </span>
          </div>

          {submittedSuccess ? (
            <div className="py-4 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-[#d4f534] mx-auto" />
              <p className="font-display text-xl text-[#f2eee3]">Testimoni Kamu Sudah Muncul!</p>
              <p className="font-mono text-xs text-[#a09c8d]">
                Live note kamu tersimpan di perangkat ini dan tampil di galeri bawah. Kamu juga bisa kirim langsung ke WhatsApp admin.
              </p>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSubmittedSuccess(false)}
                  className="flex-1 py-2 font-mono text-[10px] font-bold uppercase border"
                  style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
                >
                  Tulis Lagi
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-2 font-mono text-[10px] font-bold uppercase"
                  style={{ background: 'var(--lime)', color: 'var(--ink)' }}
                >
                  Lihat Reviews
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitReview} className="space-y-3">
              <div>
                <label className="block font-mono text-[10px] font-bold uppercase text-[#a09c8d] mb-1">
                  Nama Anda *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Dimas Aditya"
                  className="w-full bg-[#111317] border p-2 text-xs font-mono text-[#f2eee3] outline-none rounded-xs"
                  style={{ borderColor: 'var(--border)' }}
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] font-bold uppercase text-[#a09c8d] mb-1">
                  Aplikasi yang Dipesan *
                </label>
                <select
                  value={selectedApp}
                  onChange={(e) => setSelectedApp(e.target.value)}
                  className="w-full bg-[#111317] border p-2 text-xs font-mono text-[#f2eee3] outline-none rounded-xs"
                  style={{ borderColor: 'var(--border)' }}
                >
                  {PRODUCTS.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                  <option value="Lainnya">Aplikasi Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-[10px] font-bold uppercase text-[#a09c8d] mb-1">
                  Rating Kepuasan ({rating} / 5 Bintang)
                </label>
                <div className="flex gap-2 items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-125 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="font-mono text-xs font-bold text-amber-400 ml-2">
                    {'★'.repeat(rating)}
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] font-bold uppercase text-[#a09c8d] mb-1">
                  Ulasan / Pengalaman Order *
                </label>
                <textarea
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Ceritakan kecepatan proses admin, kualitas akun, atau layanan garansi..."
                  className="w-full bg-[#111317] border p-2 text-xs font-mono text-[#f2eee3] outline-none rounded-xs resize-none"
                  style={{ borderColor: 'var(--border)' }}
                />
              </div>

              <button
                type="submit"
                className="brutal w-full py-2.5 font-display text-lg uppercase cursor-pointer flex items-center justify-center gap-2"
                style={{ background: 'var(--lime)', color: 'var(--ink)' }}
              >
                <Send className="w-4 h-4" />
                <span>Kirim Live Note Sekarang ✺</span>
              </button>
            </form>
          )}
        </div>
      )}

      {/* Grid of Testimonials */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-5">
        {allReviews.map((r, i) => {
          const isUserCustom = r.id.startsWith('rev-');
          return (
            <figure
              key={r.id}
              className="paper relative flex flex-col p-4 pt-6 text-[#26282e] shadow-lg"
              style={{ transform: `rotate(${i % 2 === 0 ? -1.5 : 1.5}deg)` }}
            >
              <span className="tape -top-1 left-1/2 w-16 -translate-x-1/2"></span>
              
              <div className="flex items-center justify-between mb-1.5">
                <div className="text-amber-600 font-bold tracking-widest text-xs">
                  {'★'.repeat(r.rating || 5)}
                </div>
                {isUserCustom ? (
                  <span className="text-[8px] font-mono font-bold bg-[#131519] text-[#d4f534] px-1.5 py-0.5 rounded-xs uppercase">
                    Live Note Baru
                  </span>
                ) : (
                  <span className="text-[8.5px] font-mono text-[#26282e]/70">
                    {r.date}
                  </span>
                )}
              </div>

              <blockquote className="mt-1 text-xs font-bold leading-relaxed">
                "{r.comment}"
              </blockquote>

              <figcaption className="mt-3 pt-2 border-t border-[#26282e]/15 flex items-center justify-between font-mono text-[9.5px] uppercase tracking-wider text-[#26282e]/90">
                <span className="font-black">— {r.customerName}</span>
                <span className="text-[#26282e]/75 truncate max-w-[110px]">{r.productName}</span>
              </figcaption>

              {/* Quick share to WA if it's the customer's own review */}
              {isUserCustom && (
                <button
                  type="button"
                  onClick={() => handleShareToWA(r)}
                  className="mt-2 text-[9px] font-mono font-bold uppercase underline hover:text-black flex items-center gap-1 cursor-pointer"
                >
                  <MessageSquare className="w-2.5 h-2.5" />
                  Kirim ke WA Admin ↗
                </button>
              )}
            </figure>
          );
        })}
      </div>

      {/* Proof Channel Link */}
      <div className="px-5 space-y-2">
        <a
          href={ADMIN_TELEGRAM_PROOF}
          target="_blank"
          rel="noreferrer"
          className="brutal flex items-center justify-between px-5 py-3.5 cursor-pointer"
          style={{ background: 'var(--lime)', color: 'var(--ink)' }}
        >
          <span className="font-display text-xl">300+ Bukti Transaksi Real (Telegram)</span>
          <span className="font-display text-2xl">↗</span>
        </a>
      </div>
    </div>
  );
};
