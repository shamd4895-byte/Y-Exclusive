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

  // 14 Complete Model Profiles with realistic locations & local optimized photos
  profiles: [
    {
      id: "nora-jensen",
      name: "Nora Jensen",
      location: "Copenhagen, Denmark",
      image: "images/model_1.jpg",
      online: true
    },
    {
      id: "amelia-clarke",
      name: "Amelia Clarke",
      location: "Sydney, Australia",
      image: "images/model_2.jpg",
      online: true
    },
    {
      id: "chloe-wilson",
      name: "Chloe Wilson",
      location: "Manchester, UK",
      image: "images/model_3.jpg",
      online: true
    },
    {
      id: "isabella-rossi",
      name: "Isabella Rossi",
      location: "Milan, Italy",
      image: "images/model_4.jpg",
      online: true
    },
    {
      id: "sofia-martinez",
      name: "Sofia Martinez",
      location: "Madrid, Spain",
      image: "images/model_5.jpg",
      online: true
    },
    {
      id: "ava-mitchell",
      name: "Ava Mitchell",
      location: "Los Angeles, USA",
      image: "images/model_6.jpg",
      online: true
    },
    {
      id: "mia-anderson",
      name: "Mia Anderson",
      location: "Toronto, Canada",
      image: "images/model_7.jpg",
      online: true
    },
    {
      id: "sophia-bennett",
      name: "Sophia Bennett",
      location: "London, UK",
      image: "images/model_8.jpg",
      online: true
    },
    {
      id: "valentina-moretti",
      name: "Valentina Moretti",
      location: "Rome, Italy",
      image: "images/model_9.jpg",
      online: true
    },
    {
      id: "camila-duarte",
      name: "Camila Duarte",
      location: "São Paulo, Brazil",
      image: "images/model_10.jpg",
      online: true
    },
    {
      id: "elena-rostova",
      name: "Elena Rostova",
      location: "Prague, Czechia",
      image: "images/model_11.jpg",
      online: true
    },
    {
      id: "juliette-dubois",
      name: "Juliette Dubois",
      location: "Paris, France",
      image: "images/model_12.jpg",
      online: true
    },
    {
      id: "hannah-schmidt",
      name: "Hannah Schmidt",
      location: "Berlin, Germany",
      image: "images/model_13.jpg",
      online: true
    },
    {
      id: "maya-tremblay",
      name: "Maya Tremblay",
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
