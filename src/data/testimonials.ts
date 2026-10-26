import { Testimonial, FAQItem } from '../types';

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    customerName: 'Dimas Aditya',
    avatarSeed: 'dimas',
    rating: 5,
    productName: 'Netflix Premium 1P1U 1 Bulan',
    date: '2 jam yang lalu',
    comment: 'Gokil, belum ada 3 menit setelah kirim bukti tf, akun Netflix langsung dikirim admin! Profilnya private ada PIN, nonton 4K lancar no buffering. Langganan terus di sini.',
    verified: true
  },
  {
    id: 't-2',
    customerName: 'Salsabila Putri',
    avatarSeed: 'salsa',
    rating: 5,
    productName: 'Canva Pro Lifetime Edu Garansi',
    date: 'Kemarin',
    comment: 'Canva Pro langsung aktif di email pribadi aku, brand kit & template premium kebuka semua. Sangat ngebantu buat kerjaan social media agency! Rekomendasi banget.',
    verified: true
  },
  {
    id: 't-3',
    customerName: 'Kevin Wijaya',
    avatarSeed: 'kevin',
    rating: 5,
    productName: 'ChatGPT Plus 1 Bulan',
    date: 'Kemarin',
    comment: 'Beli ChatGPT Plus buat bantu olah data skripsi & coding. Fitur Canvas sama GPT-4o jalan mulus banget tanpa kendala limit. Murah meriah tapi pelayanan sultan.',
    verified: true
  },
  {
    id: 't-4',
    customerName: 'Rian Pratama',
    avatarSeed: 'rian',
    rating: 5,
    productName: 'CapCut Pro Sharing 1 Bulan',
    date: '2 hari yang lalu',
    comment: 'Template pro dan efek velocity kebuka semua tanpa watermark di video TikTok saya. Adminnya ramah banget walau order tengah malem tetep dilayanin cepet!',
    verified: true
  },
  {
    id: 't-5',
    customerName: 'Anindya Kirana',
    avatarSeed: 'anindya',
    rating: 5,
    productName: 'Spotify Premium Famplan 2 Bulan',
    date: '3 hari yang lalu',
    comment: 'Spotify invite family langsung masuk ke akun lama, semua playlist & liked songs tetap utuh. Sebelumnya pernah beli di lapak lain sering kena kick, di REGARM aman bergaransi!',
    verified: true
  },
  {
    id: 't-6',
    customerName: 'Fajar Nugraha',
    avatarSeed: 'fajar',
    rating: 5,
    productName: 'YouTube Premium Famplan 1 Bulan',
    date: '4 hari yang lalu',
    comment: 'Mantap nonton podcast YouTube ga ada iklannya sama sekali. YouTube Music juga aktif, enak banget buat nemenin nyetir mobil. Harga 10k dapet sebulan mantul.',
    verified: true
  }
];

export const FAQ_LIST: FAQItem[] = [
  {
    category: 'Akun',
    question: 'Apa perbedaan paket 1P1U vs 1P2U vs Akun Private?',
    answer: '• 1P1U (1 Profile 1 User): 1 profil khusus hanya milik Anda dengan PIN pribadi, tidak dicampur dengan siapapun di profil tersebut.\n• 1P2U (1 Profile 2 User): 1 profil digunakan bersama dengan 1 customer lain secara hemat, cocok bagi yang jarang nonton.\n• Akun Private: Seluruh akun (semua profil & layar) 100% milik Anda sendiri, bebas ganti password & bikin profil keluarga.'
  },
  {
    category: 'Garansi',
    question: 'Bagaimana ketentuan dan cara klaim garansi jika terjadi kendala?',
    answer: 'Semua produk di REGARM-MART memiliki Full Garansi selama masa aktif yang Anda beli. Jika akun mengalami kendala seperti reset password, error, atau screen limit, cukup kirim chat ke WhatsApp Admin dengan menyertakan Nomor Order ID atau email akun. Admin akan melakukan pengecekan dan langsung memberikan akun pengganti / re-invite secepatnya!'
  },
  {
    category: 'Proses',
    question: 'Berapa lama proses akun dikirim setelah melakukan pembayaran?',
    answer: 'Rata-rata proses hanya memakan waktu 3 hingga 10 menit setelah Anda mengirimkan bukti transfer via WhatsApp pada jam operasional kami (10.00 – 00.30 WIB). Di luar jam operasional, pesanan akan diproses pada antrean pertama pagi harinya.'
  },
  {
    category: 'Pembayaran',
    question: 'Metode pembayaran apa saja yang diterima di REGARM-MART?',
    answer: 'Kami menerima pembayaran otomatis QRIS (mendukung GoPay, OVO, DANA, ShopeePay, LinkAja, BCA Mobile, Livin Mandiri, BRImo, BNI Mobile, serta semua bank digital), transfer SeaBank, dan transfer Bank BCA.'
  },
  {
    category: 'Akun',
    question: 'Apakah langganan Canva, Spotify, dan YouTube memakai email pribadi pembeli?',
    answer: 'Ya! Untuk Canva Pro, Spotify Famplan, dan YouTube Premium Famplan, sistemnya menggunakan link invite resmi yang dikirim ke email atau akun pribadi Anda sendiri, sehingga playlist, history, dan file desain Anda tetap 100% aman dan tidak tercampur.'
  }
];
