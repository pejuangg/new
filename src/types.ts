export interface Paket {
  id: string;
  name: string;
  duration: string;
  price: number;
  priceFormatted: string;
  originalPrice?: string;
  isPopular?: boolean;
  warranty: string;
  accountType: '1P1U' | '1P2U' | 'Private' | 'Family' | 'Sharing';
  features: string[];
}

export interface Product {
  id: string;
  name: string;
  category: 'Streaming' | 'Editing' | 'Education & AI' | 'Music' | 'Other';
  tag?: 'TERLARIS' | 'HOT' | 'PROMO' | 'BARU' | 'HEMAT';
  iconDomain: string;
  badgeText?: string;
  minPrice: number;
  minPriceFormatted: string;
  description: string;
  accentColor: string;
  brandColor?: string;
  inkColor?: string;
  tagline?: string;
  loginMethod: string;
  warrantyPeriod: string;
  pakets: Paket[];
}

export interface PaymentMethod {
  id: string;
  name: string;
  category: 'qris' | 'bank' | 'ewallet';
  accountNumber?: string;
  accountHolder?: string;
  fee: number;
  badge?: string;
  instructions: string[];
  iconName: string;
}

export interface CartItem {
  id: string;
  app: string;
  nama: string;
  harga: string;
  priceNumeric: number;
  yt?: string;
  q: number;
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  product: Product;
  paket: Paket;
  paymentMethod: PaymentMethod;
  customerWhatsApp: string;
  customerEmail?: string;
  customerNotes?: string;
  voucherCode?: string;
  discountAmount: number;
  totalPrice: number;
  createdAt: string;
  status: 'Menunggu Pembayaran' | 'Sedang Diproses' | 'Selesai' | 'Dibatalkan';
}

export interface Testimonial {
  id: string;
  customerName: string;
  avatarSeed: string;
  rating: number;
  productName: string;
  date: string;
  comment: string;
  verified: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Akun' | 'Garansi' | 'Pembayaran' | 'Proses';
}

export interface Voucher {
  code: string;
  discountType: 'fixed' | 'percentage';
  discountValue: number;
  minSpend?: number;
  description: string;
}
