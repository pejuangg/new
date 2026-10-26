import { PaymentMethod } from '../types';

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'qris',
    name: 'QRIS All Payment',
    category: 'qris',
    fee: 0,
    badge: 'OTOMATIS / BEBAS ADMIN',
    iconName: 'QrCode',
    instructions: [
      'Buka aplikasi e-wallet (GoPay, OVO, DANA, ShopeePay) atau m-Banking (BCA, Mandiri, BRI, BNI).',
      'Scan kode QRIS yang tampil di layar atau simpan gambar QRIS.',
      'Periksa nominal pembayaran sesuai total tagihan.',
      'Selesaikan pembayaran dan simpan screenshot bukti transfer untuk dikirimkan ke WhatsApp admin.'
    ]
  },
  {
    id: 'seabank',
    name: 'SeaBank',
    category: 'bank',
    accountNumber: '9019 4821 7361',
    accountHolder: 'REGARM DIGITAL STORE',
    fee: 0,
    badge: 'TRANSFER CEPAT (KODE 535)',
    iconName: 'Building2',
    instructions: [
      'Pilih transfer antar SeaBank atau Transfer Bank Online (Kode: 535).',
      'Masukkan nomor rekening SeaBank: 9019 4821 7361.',
      'Pastikan nama penerima: REGARM DIGITAL STORE.',
      'Transfer tepat sesuai nominal pesanan lalu konfirmasi ke WA.'
    ]
  },
  {
    id: 'gopay',
    name: 'GoPay',
    category: 'ewallet',
    accountNumber: '0895-3256-27342',
    accountHolder: 'REGARM MART',
    fee: 0,
    badge: 'INSTAN TRANSFER',
    iconName: 'Smartphone',
    instructions: [
      'Buka aplikasi GoPay atau Gojek.',
      'Pilih menu Transfer atau Bayar ke Nomor HP.',
      'Masukkan nomor: 0895-3256-27342 (REGARM MART).',
      'Ketik nominal yang sesuai lalu kirimkan bukti transfer ke WhatsApp admin.'
    ]
  }
];
