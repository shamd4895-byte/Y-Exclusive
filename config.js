// Velvet Exclusive - Configuration File
const CONFIG = {
  // Brand details
  brandName: "Velvet Exclusive",
  
  // Test link for Call | Chat button (as requested: google.com)
  callChatUrl: "https://www.google.com",

  // Live online counter simulation
  onlineCounter: {
    baseCount: 62,
    minCount: 55,
    maxCount: 72,
    updateIntervalMs: 4000
  },

  // 14 Complete Model Profiles - researched realistic names matching countries
  profiles: [
    {
      id: "freja-nielsen",
      name: "Freja Nielsen",
      location: "Copenhagen, Denmark",
      image: "images/model_1.jpg",
      online: true
    },
    {
      id: "charlotte-hayes",
      name: "Charlotte Hayes",
      location: "Sydney, Australia",
      image: "images/model_2.jpg",
      online: true
    },
    {
      id: "olivia-whitmore",
      name: "Olivia Whitmore",
      location: "Manchester, UK",
      image: "images/model_3.jpg",
      online: true
    },
    {
      id: "giulia-conti",
      name: "Giulia Conti",
      location: "Milan, Italy",
      image: "images/model_4.jpg",
      online: true
    },
    {
      id: "lucia-herrera",
      name: "Lucia Herrera",
      location: "Madrid, Spain",
      image: "images/model_5.jpg",
      online: true
    },
    {
      id: "olivia-reeves",
      name: "Olivia Reeves",
      location: "Los Angeles, USA",
      image: "images/model_6.jpg",
      online: true
    },
    {
      id: "lily-tremblay",
      name: "Lily Tremblay",
      location: "Toronto, Canada",
      image: "images/model_7.jpg",
      online: true
    },
    {
      id: "amelia-parker",
      name: "Amelia Parker",
      location: "London, UK",
      image: "images/model_8.jpg",
      online: true
    },
    {
      id: "sofia-caruso",
      name: "Sofia Caruso",
      location: "Rome, Italy",
      image: "images/model_9.jpg",
      online: true
    },
    {
      id: "helena-costa",
      name: "Helena Costa",
      location: "São Paulo, Brazil",
      image: "images/model_10.jpg",
      online: true
    },
    {
      id: "eliska-novak",
      name: "Eliška Novak",
      location: "Prague, Czechia",
      image: "images/model_11.jpg",
      online: true
    },
    {
      id: "camille-duval",
      name: "Camille Duval",
      location: "Paris, France",
      image: "images/model_12.jpg",
      online: true
    },
    {
      id: "hannah-richter",
      name: "Hannah Richter",
      location: "Berlin, Germany",
      image: "images/model_13.jpg",
      online: true
    },
    {
      id: "emma-laurent",
      name: "Emma Laurent",
      location: "Vancouver, Canada",
      image: "images/model_14.jpg",
      online: true
    }
  ],

  // Multilingual translations
  translations: {
    en: {
      code: "EN",
      onlineSuffix: "Online",
      callChatBtn: "Call | Chat",
      menuHome: "Home",
      menuProfiles: "Profiles",
      menuVip: "VIP Club",
      connectingText: "Redirecting...",
      disclaimerTitle: "Exclusive Member Community",
      disclaimerText: "18+ Adults only. All members are verified. Discretion and privacy guaranteed."
    },
    ja: {
      code: "JA",
      onlineSuffix: "オンライン",
      callChatBtn: "通話 | チャット",
      menuHome: "ホーム",
      menuProfiles: "プロフィール",
      menuVip: "VIPクラブ",
      connectingText: "リダイレクト中...",
      disclaimerTitle: "限定会員コミュニティ",
      disclaimerText: "18歳以上限定。全会員認証済み。プライバシー完全保護。"
    },
    id: {
      code: "ID",
      onlineSuffix: "Online",
      callChatBtn: "Telepon | Obrolan",
      menuHome: "Beranda",
      menuProfiles: "Profil",
      menuVip: "Klub VIP",
      connectingText: "Mengalihkan...",
      disclaimerTitle: "Komunitas Anggota Eksklusif",
      disclaimerText: "Khusus dewasa 18+. Semua profil telah diverifikasi. Privasi terjamin."
    },
    fil: {
      code: "FIL",
      onlineSuffix: "Online",
      callChatBtn: "Tawag | Chat",
      menuHome: "Home",
      menuProfiles: "Mga Profile",
      menuVip: "VIP Club",
      connectingText: "Nagre-redirect...",
      disclaimerTitle: "Eksklusibong Komunidad ng Miyembro",
      disclaimerText: "18+ Lamang. Lahat ng profile ay beripikado. Garantisado ang privacy."
    }
  }
};
