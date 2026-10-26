import { Product } from '../types';
import { getAllProductsFromDatabase } from './catalogParser';

export const ADMIN_WHATSAPP = '62895325627342';
export const ADMIN_TELEGRAM_PROOF = 'https://t.me/jejakbeli';
export const ADMIN_TELEGRAM_CONTACT = 'https://t.me/sadraxh';
export const ADMIN_TELEGRAM = ADMIN_TELEGRAM_PROOF;
export const OPEN_HOUR = 10;
export const CLOSE_HOUR = 24;

// All 42 authentic applications from user's primary code (regarmz.shop / paste october)
export const PRODUCTS: Product[] = getAllProductsFromDatabase();

export const VOUCHERS = [
  {
    code: 'REGARMHEMAT',
    discountType: 'fixed' as const,
    discountValue: 3000,
    minSpend: 15000,
    description: 'Potongan Rp3.000 untuk minimal belanja Rp15.000'
  },
  {
    code: 'PROMOAI',
    discountType: 'percentage' as const,
    discountValue: 10,
    minSpend: 25000,
    description: 'Diskon 10% untuk kategori AI & Education'
  },
  {
    code: 'NEWUSER',
    discountType: 'fixed' as const,
    discountValue: 2000,
    minSpend: 10000,
    description: 'Potongan Rp2.000 untuk pelanggan baru'
  }
];
