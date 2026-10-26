import { Product, Paket } from '../types';
import { MAIN_DATABASE, APP_DOMAINS, APP_INFO } from './mainDatabase';

// Brand colors for zine magazine covers
const APP_COLORS: { [key: string]: { brand: string; ink: string; tagline: string } } = {
  "Netflix": { brand: "#c4170e", ink: "#f2eee3", tagline: "Good stories travel further" },
  "YouTube": { brand: "#e62117", ink: "#f2eee3", tagline: "Less ads, more you" },
  "Spotify": { brand: "#1ed760", ink: "#131519", tagline: "Play. Discover. Belong." },
  "Disney": { brand: "#1b2a6b", ink: "#f2eee3", tagline: "Stories for everyone" },
  "Viu": { brand: "#f5c518", ink: "#131519", tagline: "Binge the drama" },
  "iQIYI": { brand: "#00c355", ink: "#131519", tagline: "Asian drama & anime live" },
  "WeTV": { brand: "#ff5c00", ink: "#f2eee3", tagline: "Watch Chinese drama & Asian series" },
  "HBO Max": { brand: "#5822b4", ink: "#f2eee3", tagline: "Where HBO meets blockbuster" },
  "Viki": { brand: "#00a1ff", ink: "#f2eee3", tagline: "Global Asian entertainment" },
  "Vidio Platinum": { brand: "#d81f26", ink: "#f2eee3", tagline: "Lokal punya cerita" },
  "Prime Video": { brand: "#0073a8", ink: "#f2eee3", tagline: "Great stories, anytime" },
  "Loklok": { brand: "#e50914", ink: "#f2eee3", tagline: "Stream movies anywhere" },
  "Youku": { brand: "#0f8fff", ink: "#f2eee3", tagline: "Best Asian & Chinese cinema" },
  "Bstation": { brand: "#00a1d6", ink: "#f2eee3", tagline: "Anime streaming in 4K" },
  "Apple Music": { brand: "#d81a38", ink: "#f2eee3", tagline: "Lossless spatial audio" },
  "Canva": { brand: "#7d2ae8", ink: "#f2eee3", tagline: "Design anything anywhere" },
  "Capcut": { brand: "#2b2e37", ink: "#f2eee3", tagline: "Cut. Edit. Post." },
  "Picsart": { brand: "#d63384", ink: "#f2eee3", tagline: "Creative photo editor" },
  "Alight Motion": { brand: "#219653", ink: "#f2eee3", tagline: "Pro motion graphics" },
  "Figma": { brand: "#0acf83", ink: "#131519", tagline: "Collaborative design" },
  "IbisPaint": { brand: "#ff6f00", ink: "#f2eee3", tagline: "Digital art creation" },
  "Meitu": { brand: "#e91e63", ink: "#f2eee3", tagline: "AI beauty & portrait retouch" },
  "Oldroll": { brand: "#8d6e63", ink: "#f2eee3", tagline: "Vintage film camera presets" },
  "Wink": { brand: "#673ab7", ink: "#f2eee3", tagline: "AI video portrait retouch" },
  "Dazzcam": { brand: "#424242", ink: "#f2eee3", tagline: "Classic retro camera" },
  "ChatGPT": { brand: "#10a37f", ink: "#f2eee3", tagline: "Higher ideas, faster tomorrow" },
  "Claude AI": { brand: "#d97757", ink: "#131519", tagline: "Think deeper" },
  "Gemini": { brand: "#4796e3", ink: "#f2eee3", tagline: "AI Google + 2TB cloud" },
  "Zoom": { brand: "#2d8cff", ink: "#f2eee3", tagline: "Meet without limits" },
  "Grammarly": { brand: "#11a683", ink: "#f2eee3", tagline: "Write with clarity" },
  "Quillbot": { brand: "#307147", ink: "#f2eee3", tagline: "AI paraphrasing & rewrite" },
  "MS365": { brand: "#d83b01", ink: "#f2eee3", tagline: "Official Office Suite & Cloud" },
  "Scribd": { brand: "#1e7b85", ink: "#f2eee3", tagline: "Millions of books & documents" },
  "Kahoot": { brand: "#46178f", ink: "#f2eee3", tagline: "Interactive trivia & quizzes" },
  "DeepL": { brand: "#0f2b46", ink: "#f2eee3", tagline: "World's most accurate translator" },
  "iLovePDF": { brand: "#e5322d", ink: "#f2eee3", tagline: "Complete PDF tools" },
  "Coursera": { brand: "#0056d2", ink: "#f2eee3", tagline: "Learn from top universities" },
  "WPS Pro": { brand: "#ff3e30", ink: "#f2eee3", tagline: "Lightweight Office Pro" },
  "Quizizz": { brand: "#8854c0", ink: "#f2eee3", tagline: "Fun classroom learning" },
  "Duolingo": { brand: "#58cc02", ink: "#131519", tagline: "Learn languages with infinite hearts" },
  "Academia": { brand: "#2f3542", ink: "#f2eee3", tagline: "Academic research papers" },
  "HMA VPN": { brand: "#ffbb00", ink: "#131519", tagline: "Fast & secure private VPN" }
};

function parseNumericPrice(str: string): number {
  if (!str) return 0;
  // If price is e.g. "Rp4.000 / Rp7.000", pick the first price
  const match = str.replace(/\./g, '').match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

function parseDuration(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("lifetime") || lower.includes("edu")) return "Lifetime";
  if (lower.includes("tahun")) {
    const m = lower.match(/(\d+)\s*tahun/);
    return m ? `${m[1]} Tahun` : "1 Tahun";
  }
  if (lower.includes("bulan")) {
    const m = lower.match(/(\d+)\s*bulan/);
    return m ? `${m[1]} Bulan` : "1 Bulan";
  }
  if (lower.includes("hari")) {
    const m = lower.match(/(\d+)\s*hari/);
    return m ? `${m[1]} Hari` : "1 Hari";
  }
  if (lower.includes("jam")) {
    const m = lower.match(/(\d+)\s*jam/);
    return m ? `${m[1]} Jam` : "1 Jam";
  }
  return "Aktif";
}

function parseAccountType(name: string): '1P1U' | '1P2U' | 'Private' | 'Family' | 'Sharing' {
  const lower = name.toLowerCase();
  if (lower.includes("1p1u")) return "1P1U";
  if (lower.includes("1p2u")) return "1P2U";
  if (lower.includes("private") || lower.includes("privat")) return "Private";
  if (lower.includes("famplan") || lower.includes("family")) return "Family";
  return "Sharing";
}

export function getAllProductsFromDatabase(): Product[] {
  const list: Product[] = [];

  for (const [catName, appGroup] of Object.entries(MAIN_DATABASE)) {
    // Map category
    let mappedCat: 'Streaming' | 'Editing' | 'Education & AI' | 'Music' | 'Other' = 'Other';
    if (catName.includes("Streaming") || catName.includes("Music")) {
      mappedCat = 'Streaming';
    } else if (catName.includes("Editing")) {
      mappedCat = 'Editing';
    } else if (catName.includes("Education")) {
      mappedCat = 'Education & AI';
    }

    for (const [appName, rawPakets] of Object.entries(appGroup)) {
      const colors = APP_COLORS[appName] || {
        brand: "#22252b",
        ink: "#f2eee3",
        tagline: APP_INFO[appName] || "Layanan digital premium bergaransi"
      };

      const parsedPakets: Paket[] = rawPakets.map((rawPkt, idx) => {
        const parts = rawPkt.split(" - ");
        let rawName = parts[0] || "";
        const rawPrice = parts[1] || "";

        const isHot = rawName.includes("[HOT]");
        const isPromo = rawName.includes("[PROMO]");
        const isBaru = rawName.includes("[BARU]");

        // Clean name
        const cleanName = rawName.replace(/\[(HOT|PROMO|BARU|HABIS)\]/gi, "").trim();
        const numPrice = parseNumericPrice(rawPrice);
        const duration = parseDuration(cleanName);
        const accType = parseAccountType(cleanName);

        return {
          id: `${appName.toLowerCase().replace(/\s+/g, '-')}-${idx + 1}`,
          name: cleanName,
          duration,
          price: numPrice,
          priceFormatted: rawPrice.trim(),
          isPopular: isHot,
          warranty: `Garansi ${duration}`,
          accountType: accType,
          features: [
            `Tipe Akun: ${accType}`,
            `Garansi ${duration}`,
            "Proses 1-30 Menit",
            "Full Support WhatsApp"
          ]
        };
      });

      // Compute min price
      const validPrices = parsedPakets.map(p => p.price).filter(p => p > 0);
      const minPrice = validPrices.length > 0 ? Math.min(...validPrices) : 0;
      const minPriceFormatted = minPrice > 0 ? `Rp${minPrice.toLocaleString('id-ID')}` : 'Cek Paket';

      // Check if hot
      const hasHot = rawPakets.some(p => p.includes("[HOT]"));
      const hasPromo = rawPakets.some(p => p.includes("[PROMO]"));
      const hasBaru = rawPakets.some(p => p.includes("[BARU]"));

      let tag: 'TERLARIS' | 'HOT' | 'PROMO' | 'BARU' | undefined;
      if (hasHot) tag = 'HOT';
      else if (hasPromo) tag = 'PROMO';
      else if (hasBaru) tag = 'BARU';

      list.push({
        id: appName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        name: appName,
        category: (appName === 'Spotify' || appName === 'Apple Music') ? 'Music' : mappedCat,
        tag,
        iconDomain: APP_DOMAINS[appName] || "google.com",
        minPrice,
        minPriceFormatted,
        description: APP_INFO[appName] || "Layanan aplikasi digital premium bergaransi resmi.",
        accentColor: colors.brand,
        brandColor: colors.brand,
        inkColor: colors.ink,
        tagline: colors.tagline,
        loginMethod: appName === "YouTube" || appName === "Canva" || appName === "Spotify" ? "Invite ke email pribadi Anda" : "Akun & Password dari admin",
        warrantyPeriod: "Full Garansi masa aktif",
        pakets: parsedPakets
      });
    }
  }

  return list;
}
