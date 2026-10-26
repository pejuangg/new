// Exact database and configurations from the user's main code (paste october)

export interface AppDatabase {
  [category: string]: {
    [appName: string]: string[];
  };
}

export const MAIN_DATABASE: AppDatabase = {
  "Streaming & Music": {
    "Netflix": [
      "Single Screen 1 Bulan - Rp65.000",
      "1P1U 1 Hari - Rp5.000",
      "1P1U 3 Hari [HOT] - Rp12.000",
      "1P1U 5 Hari - Rp15.000",
      "1P1U 7 Hari [HOT] - Rp18.000",
      "1P1U 1 Bulan [HOT] - Rp45.000",
      "1P1U 2 Bulan - Rp88.000",
      "1P1U 3 Bulan - Rp115.000",
      "1P2U 1 Bulan [HOT] - Rp30.000",
      "1P2U 2 Bulan - Rp55.000",
      "1P2U 3 Bulan - Rp65.000",
      "Semi Private 1 Bulan - Rp55.000",
      "Anti Limit (4U) 1 Bulan - Rp60.000",
      "Private 1 Bulan - Rp180.000"
    ],
    "YouTube": [
      "Famplan 1 Bulan [HOT] - Rp10.000",
      "Famplan 2 Bulan [HOT] - Rp15.000",
      "Famplan 3 Bulan - Rp20.000",
      "Famplan 4 Bulan - Rp30.000",
      "Indplan 1 Bulan - Rp25.000",
      "Mixplan 1 Bulan - Rp30.000",
      "Mixplan 3 Bulan - Rp30.000",
      "Mixplan 4 Bulan - Rp35.000",
      "Mixplan 5 Bulan - Rp47.000",
      "Mixplan 6 Bulan - Rp50.000"
    ],
    "Spotify": [
      "Famplan 1 Bulan - Rp30.000",
      "Famplan 2 Bulan - Rp55.000",
      "Famplan 3 Bulan - Rp65.000",
      "Indplan 1 Bulan - Rp35.000",
      "Indplan 2 Bulan - Rp60.000",
      "Indplan 3 Bulan - Rp75.000"
    ],
    "Disney": [
      "Sharing/Anlim 1 Hari - Rp4.000 / Rp7.000",
      "Sharing/Anlim 3 Hari - Rp8.000 / Rp12.000",
      "Sharing/Anlim 5 Hari - Rp10.000 / Rp15.000",
      "Sharing/Anlim 7 Hari - Rp15.000 / Rp20.000",
      "Premium 1 Bulan 3U - Rp55.000",
      "Premium 1 Bulan 4U - Rp45.000",
      "Premium 1 Bulan 5U - Rp40.000",
      "Premium 1 Bulan 6U - Rp32.000",
      "Premium 1 Bulan 10U - Rp25.000",
      "Premium Private 1 Bulan - Rp130.000"
    ],
    "Viu": [
      "Private Anlim/Biasa 1 Hari - Rp4.000 / Rp2.500",
      "Private Anlim/Biasa 3 Hari - Rp6.000 / Rp4.500",
      "Private Anlim/Biasa 7 Hari - Rp8.000 / Rp7.000",
      "Private Anlim/Biasa 1 Bulan - Rp15.000 / Rp10.000",
      "Private Anlim/Biasa 3 Bulan - Rp20.000 / Rp15.000",
      "Private Anlim/Biasa 6 Bulan - Rp25.000 / Rp20.000",
      "Private Anlim/Biasa 1 Tahun - Rp30.000 / Rp25.000"
    ],
    "iQIYI": [
      "Sharing 1 Hari - Rp3.000",
      "Sharing 3 Hari - Rp7.000",
      "Sharing 7 Hari - Rp10.000",
      "Sharing 1 Bulan - Rp15.000",
      "Sharing 3 Bulan - Rp25.000",
      "Sharing 1 Tahun - Rp30.000",
      "Antilimit 1 Bulan - Rp25.000",
      "Private 1 Bulan - Rp35.000"
    ],
    "WeTV": [
      "Sharing 1 Hari - Rp4.000",
      "Sharing 3 Hari - Rp7.000",
      "Sharing 7 Hari - Rp10.000",
      "Sharing 1 Bulan - Rp15.000",
      "Sharing 3 Bulan - Rp30.000",
      "Sharing Anlim 1 Bulan - Rp25.000",
      "Private 1 Bulan - Rp40.000"
    ],
    "HBO Max": [
      "Sharing Std/Ulti 5 Hari - Rp12.000 / Rp14.000",
      "Sharing Std/Ulti 7 Hari - Rp15.000 / Rp18.000",
      "Sharing Std/Ulti 1 Bulan - Rp25.000 / Rp30.000",
      "Sharing Std/Ulti 2 Bulan - Rp40.000 / Rp50.000",
      "Sharing Std/Ulti 3 Bulan - Rp50.000 / Rp70.000",
      "Private Std/Ulti 1 Bulan - Rp90.000 / Rp110.000"
    ],
    "Viki": [
      "Sharing Standar 1 Bulan - Rp18.000",
      "Sharing Standar 1 Tahun - Rp30.000",
      "Sharing Plus 1 Bulan - Rp20.000",
      "Private 1 Bulan Standar - Rp30.000",
      "Private 1 Bulan Plus - Rp35.000"
    ],
    "Vidio Platinum": [
      "Private Mobile 1 Hari - Rp10.000",
      "Private Mobile 3 Hari - Rp15.000",
      "Private Mobile 7 Hari - Rp20.000",
      "Private Mobile 1 Bulan - Rp35.000",
      "Private Alldev 1 Hari - Rp12.000",
      "Private Alldev 3 Hari - Rp20.000",
      "Private Alldev 7 Hari - Rp28.000",
      "Private Alldev 1 Bulan - Rp55.000",
      "Private Plat Extra Mobile 1 Bulan - Rp85.000",
      "Alldev 1 Bulan - Rp95.000",
      "Private Ultimate Mobile 1 Bulan - Rp125.000",
      "Private Ultimate Alldev 1 Bulan - Rp190.000"
    ],
    "Prime Video": [
      "Sharing 1 Hari - Rp3.000",
      "Sharing 3 Hari - Rp6.000",
      "Sharing 7 Hari - Rp8.000",
      "Sharing 1 Bulan 4U - Rp10.000",
      "Sharing 1 Bulan 3U - Rp15.000",
      "Private 1 Bulan - Rp25.000"
    ],
    "Loklok": [
      "Sharing Basic 1 Hari - Rp5.000",
      "Sharing Basic 3 Hari - Rp10.000",
      "Sharing Basic 7 Hari - Rp15.000",
      "Sharing Basic 1 Bulan (No TV) - Rp25.000",
      "Sharing Standar 1 Hari - Rp6.000",
      "Sharing Standar 3 Hari - Rp12.000",
      "Sharing Standar 7 Hari - Rp17.000",
      "Sharing Standar 1 Bulan (Bisa TV) - Rp30.000",
      "Private Basic 1 Bulan - Rp65.000",
      "Private Standar 1 Bulan - Rp85.000"
    ],
    "Youku": [
      "Sharing 1 Bulan - Rp15.000",
      "Sharing 3 Bulan - Rp20.000",
      "Sharing 1 Tahun - Rp25.000",
      "Private 1 Bulan - Rp40.000"
    ],
    "Bstation": [
      "Sharing 1 Hari - Rp3.000",
      "Sharing 3 Hari - Rp6.000",
      "Sharing 7 Hari - Rp9.000",
      "Sharing 1 Bulan - Rp15.000",
      "Sharing 3 Bulan - Rp20.000",
      "Sharing 1 Tahun - Rp35.000",
      "Private 1 Bulan - Rp40.000"
    ],
    "Apple Music": [
      "Imess No Renew 1 Bulan - Rp15.000",
      "Imess No Renew 2 Bulan - Rp25.000",
      "Imess No Renew 3 Bulan - Rp35.000",
      "Imess No Renew 4 Bulan - Rp40.000"
    ]
  },
  "Editing": {
    "Canva": [
      "Designer 1 Hari - Rp2.000",
      "Designer 3 Hari - Rp4.000",
      "Designer 7 Hari - Rp5.000",
      "Designer 1 Bulan - Rp10.000",
      "Designer 2 Bulan - Rp15.000",
      "Designer 3 Bulan - Rp20.000",
      "Designer 6 Bulan - Rp25.000",
      "Designer 1 Tahun - Rp30.000",
      "Lifetime Edu (Fullgar) [HOT] - Rp35.000"
    ],
    "Capcut": [
      "Sharing 2U 3 Hari - Rp7.000",
      "Sharing 2U 7 Hari - Rp15.000",
      "Sharing 2U 1 Bulan - Rp30.000",
      "Private 3 Hari - Rp12.000",
      "Private 7 Hari - Rp25.000",
      "Private 1 Bulan (Fullgar) - Rp55.000"
    ],
    "Picsart": [
      "Sharing 1 Bulan - Rp12.000",
      "Sharing 2 Bulan - Rp15.000",
      "Sharing 3 Bulan - Rp20.000",
      "Sharing 6 Bulan - Rp35.000",
      "Private 1 Hari - Rp4.000",
      "Private 3 Hari - Rp5.000",
      "Private 7 Hari - Rp10.000",
      "Private 1 Bulan - Rp25.000"
    ],
    "Alight Motion": [
      "Sharing 1 Bulan - Rp10.000",
      "Sharing 1 Tahun - Rp20.000",
      "Private 1 Bulan - Rp15.000",
      "Private 1 Tahun - Rp25.000"
    ],
    "Figma": [
      "Private 1 Bulan - Rp55.000"
    ],
    "IbisPaint": [
      "Sharing 5 Hari - Rp10.000",
      "Sharing 7 Hari - Rp15.000",
      "Sharing 1 Bulan - Rp20.000",
      "Sharing 1 Tahun - Rp30.000"
    ],
    "Meitu": [
      "Private VIP 7 Hari - Rp15.000",
      "Private VIP 1 Bulan - Rp45.000",
      "Private VIP+ 7 Hari - Rp20.000",
      "Private VIP+ 1 Bulan - Rp55.000"
    ],
    "Oldroll": [
      "Sharing 3 Hari - Rp6.000",
      "Sharing 5 Hari - Rp7.000",
      "Sharing 7 Hari - Rp8.000",
      "Sharing 1 Bulan - Rp10.000",
      "Sharing 3 Bulan - Rp13.000",
      "Sharing 6 Bulan - Rp15.000",
      "Lifetime (Garansi 1 Tahun) - Rp30.000"
    ],
    "Wink": [
      "Private 7 Hari (No Refund) - Rp20.000"
    ],
    "Dazzcam": [
      "Lifetime Garansi 6B - Rp25.000"
    ]
  },
  "Education": {
    "ChatGPT": [
      "Go Sharing 5U 1 Hari - Rp7.000",
      "Go Sharing 5U 3 Hari - Rp12.000",
      "Go Sharing 5U 7 Hari - Rp22.000",
      "Go Sharing 5U 1 Bulan - Rp35.000",
      "Go Private 1 Bulan - Rp85.000",
      "Sharing Plus 1 Hari - Rp12.000",
      "Sharing Plus 3 Hari - Rp20.000",
      "Sharing Plus 7 Hari - Rp30.000",
      "Sharing Plus 1 Bulan - Rp60.000"
    ],
    "Claude AI": [
      "3U 1 Hari - Rp30.000",
      "3U 3 Hari - Rp50.000",
      "3U 5 Hari - Rp65.000",
      "3U 7 Hari - Rp70.000",
      "3U 1 Bulan - Rp185.000",
      "2U 1 Hari - Rp40.000",
      "2U 3 Hari - Rp65.000",
      "2U 5 Hari - Rp80.000",
      "2U 7 Hari - Rp95.000",
      "Private 1 Hari - Rp45.000",
      "Private 3 Hari - Rp85.000",
      "Private 5 Hari - Rp115.000",
      "Private 7 Hari - Rp180.000"
    ],
    "Gemini": [
      "Private/Famplan 1 Bulan - Rp25.000",
      "Private/Famplan 2 Bulan - Rp35.000",
      "Private/Famplan 3 Bulan - Rp45.000",
      "Private/Famplan 4 Bulan - Rp55.000",
      "Private/Famplan 5 Bulan - Rp65.000",
      "Private/Famplan 6 Bulan - Rp75.000",
      "Private/Famplan 1 Tahun - Rp85.000"
    ],
    "Zoom": [
      "100P 1 Jam - Rp4.000",
      "100P 2 Jam - Rp6.000",
      "100P 3 Jam - Rp10.000",
      "100P 1 Hari - Rp13.000",
      "100P 2 Hari - Rp15.000",
      "100P 3 Hari - Rp20.000",
      "100P 7 Hari - Rp25.000",
      "100P 1 Bulan - Rp60.000",
      "100P 2 Bulan - Rp75.000",
      "100P 3 Bulan - Rp90.000",
      "300P 1 Jam - Rp15.000",
      "300P 1 Hari - Rp40.000",
      "300P 1 Bulan - Rp180.000",
      "500P 1 Jam - Rp30.000",
      "500P 1 Hari - Rp70.000",
      "500P 1 Bulan - Rp355.000"
    ],
    "Grammarly": [
      "Sharing 3 Hari - Rp6.000",
      "Sharing 1 Bulan - Rp15.000",
      "Sharing 3 Bulan - Rp32.000",
      "Private 1 Bulan - Rp45.000",
      "Private 2 Bulan - Rp65.000"
    ],
    "Quillbot": [
      "Sharing 3 Hari - Rp8.000",
      "Sharing 1 Bulan - Rp20.000",
      "Sharing 3 Bulan - Rp45.000",
      "Private 1 Bulan - Rp50.000",
      "Private 3 Bulan - Rp80.000"
    ],
    "MS365": [
      "Member (Famplan) 7 Hari - Rp10.000",
      "Member (Famplan) 1 Bulan - Rp15.000",
      "Member (Famplan) 2 Bulan - Rp20.000",
      "Member (Famplan) 3 Bulan - Rp25.000",
      "Member (Famplan) 4 Bulan - Rp35.000",
      "Member (Famplan) 5 Bulan - Rp40.000",
      "Member (Famplan) 6 Bulan - Rp50.000",
      "Member (Famplan) 1 Tahun - Rp70.000"
    ],
    "Scribd": [
      "Sharing 1 Bulan - Rp12.000",
      "Sharing 2 Bulan - Rp15.000",
      "Private 1 Bulan - Rp20.000",
      "Private 2 Bulan - Rp25.000"
    ],
    "Kahoot": [
      "Private 200P 3 Hari - Rp10.000",
      "Private 200P 5 Hari - Rp15.000",
      "Private 7 Hari - Rp20.000",
      "Private 200P 1 Bulan - Rp45.000",
      "Private 400P 3 Hari - Rp15.000",
      "Private 2000P 3 Hari - Rp25.000",
      "Private 2000P - Rp40.000"
    ],
    "DeepL": [
      "Private Fullgar 7 Hari - Rp25.000",
      "Private Fullgar 1 Bulan - Rp45.000",
      "Translate File 1 File - Rp8.000",
      "Sharing 3U 1 Bulan - Rp30.000"
    ],
    "iLovePDF": [
      "Sharing 1 Bulan - Rp15.000",
      "Sharing 1 Tahun - Rp30.000",
      "Private 1 Bulan - Rp25.000",
      "Private 3 Bulan - Rp45.000"
    ],
    "Coursera": [
      "Private 7 Hari - Rp10.000",
      "Private 1 Bulan - Rp25.000",
      "Private 2 Bulan - Rp40.000",
      "Private 3 Bulan - Rp50.000",
      "Private 6 Bulan - Rp65.000",
      "Private 1 Tahun - Rp120.000"
    ],
    "WPS Pro": [
      "Sharing 1 Bulan - Rp15.000",
      "Sharing 3 Bulan - Rp20.000",
      "Private 1 Bulan - Rp35.000",
      "Private 6 Bulan - Rp65.000"
    ],
    "Quizizz": [
      "Private 1 Bulan - Rp25.000",
      "Private 3 Bulan - Rp42.000",
      "Private 1 Tahun - Rp87.000"
    ],
    "Duolingo": [
      "Famplan 3 Hari - Rp5.000",
      "Famplan 1 Bulan - Rp20.000",
      "Famplan 3 Bulan - Rp35.000"
    ],
    "Academia": [
      "Sharing 7 Hari - Rp9.000",
      "Sharing 1 Bulan - Rp17.000",
      "Sharing 3 Bulan - Rp25.000",
      "Sharing 1 Tahun - Rp35.000",
      "Private 1 Bulan - Rp40.000"
    ]
  },
  "Other": {
    "HMA VPN": [
      "Sharing 7 Hari - Rp8.000",
      "Sharing 14 Hari - Rp10.000",
      "Sharing 1 Bulan - Rp15.000",
      "Private 7 Hari - Rp10.000",
      "Private 14 Hari - Rp15.000",
      "Private 1 Bulan - Rp25.000"
    ]
  }
};

export const APP_DOMAINS: { [key: string]: string } = {
  "Netflix": "netflix.com",
  "YouTube": "youtube.com",
  "Spotify": "spotify.com",
  "Disney": "disneyplus.com",
  "Viu": "viu.com",
  "iQIYI": "iq.com",
  "WeTV": "wetv.vip",
  "HBO Max": "hbomax.com",
  "Viki": "viki.com",
  "Vidio Platinum": "vidio.com",
  "Prime Video": "primevideo.com",
  "Loklok": "loklok.com",
  "Youku": "youku.tv",
  "Bstation": "bilibili.tv",
  "Apple Music": "music.apple.com",
  "Canva": "canva.com",
  "Capcut": "capcut.com",
  "Picsart": "picsart.com",
  "Alight Motion": "alightmotionsapps.com",
  "Figma": "figma.com",
  "IbisPaint": "ibispaint.com",
  "Meitu": "meituxiuxiu.com",
  "Oldroll": "oldroll.id.aptoide.com",
  "Wink": "wink.ai",
  "Dazzcam": "dazzcam.org",
  "ChatGPT": "chatgpt.com",
  "Claude AI": "claude.ai",
  "Gemini": "gemini.google.com",
  "Zoom": "zoom.us",
  "Grammarly": "grammarly.com",
  "Quillbot": "quillbot.com",
  "MS365": "microsoft365.com",
  "Scribd": "scribd.com",
  "Kahoot": "kahoot.it",
  "DeepL": "deepl.com",
  "iLovePDF": "ilovepdf.com",
  "Coursera": "coursera.org",
  "WPS Pro": "wps.com",
  "Quizizz": "quizizz.com",
  "Duolingo": "duolingo.com",
  "Academia": "academia.edu",
  "HMA VPN": "hidemyass.com"
};

export const APP_INFO: { [key: string]: string } = {
  "Netflix": "Layanan streaming yang menyediakan berbagai macam acara TV, film, anime, film dokumenter, dan lainnya.",
  "Spotify": "Layanan streaming musik digital yang memberimu akses ke jutaan lagu dan podcast tanpa batas.",
  "YouTube": "Bebas iklan, download offline, background play, dan akses YouTube Music Premium bebas gangguan.",
  "Canva": "Buka semua template premium, penghapus background 1 klik, Magic Studio AI, dan brand kit lengkap.",
  "ChatGPT": "Akses GPT-4o, pembuatan Custom GPTs, Canvas, DALL-E 3 image generation, dan analisis data cerdas.",
  "Capcut": "Akses filter Pro, efek velocity, auto captions AI, hapus latar belakang, dan render 4K 60fps.",
  "Claude AI": "Model AI penalaran mendalam Anthropic (Claude 3.5 Sonnet & Opus) dengan fitur Artifacts interaktif.",
  "DEFAULT": "Penjelasan detail mengenai aplikasi ini sedang dalam proses update. Silakan hubungi admin via WhatsApp untuk informasi lebih lanjut."
};

export const POPULER_LIST = [
  "Netflix",
  "YouTube",
  "Spotify",
  "Canva",
  "Capcut",
  "ChatGPT",
  "Claude AI",
  "Disney",
  "Gemini",
  "Zoom",
  "Viu",
  "Vidio Platinum"
];

export const SNK_ORDER_ITEMS = [
  "Proses 1 - 30 menit, no rush order!!!",
  "This is blackmarket, don't expect too much.",
  "Wajib send form + ss login, tidak kirim garansi hangus.",
  "Garansi max 3x24 jam, bisa 7x24 jam (error massal).",
  "NO REFUND jika bukan kesalahan kami.",
  "Payment first."
];

export const SNK_KLAIM_ITEMS = [
  "Tolong double cek akunnya terlebih dahulu sebelum report.",
  "Wajib send ss problem.",
  "Mohon tunggu sesuai estimasi, dilarang buru-buru atau garansi hangus.",
  "Bisa untuk renewal."
];

export const FAQ_ITEMS = [
  {
    q: "Berapa lama proses pesanan setelah transfer?",
    a: "Estimasi normal 1 sampai 30 menit tergantung antrean. Mohon bersabar dan dilarang spam (no rush order)."
  },
  {
    q: "Apakah ada garansi jika akun bermasalah?",
    a: "Tentu! Garansi diberikan penuh sesuai durasi paket yang kamu beli (max klaim 3x24 jam dengan syarat kirim screenshot kendala)."
  },
  {
    q: "Bagaimana cara pembayarannya?",
    a: "Pembayaran bisa melalui QRIS All Payment, SeaBank, Bank BCA, Bank Mandiri, atau GoPay. Silakan cek detailnya saat checkout nota digital."
  },
  {
    q: "Apakah bisa untuk perpanjangan (renewal)?",
    a: "Bisa banget, cukup konfirmasikan ke admin saat chat WhatsApp atau centang opsi perpanjangan di keranjang."
  }
];

export const STORE_SETTINGS = {
  noWa: "62895325627342",
  noWaDisplay: "0895325627342",
  telegramAdmin: "sadraxh",
  telegramProof: "https://t.me/jejakbeli",
  twitterX: "https://x.com/klebuss",
  openHour: 10,
  openMinute: 0,
  closeHour: 0,
  closeMinute: 30
};
