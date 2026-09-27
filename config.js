// Website Configuration
// आप यहाँ अपना WhatsApp नंबर और सेटिंग्स आसानी से बदल सकते हैं

const CONFIG = {
  // अपना WhatsApp नंबर यहाँ डालें (कंट्री कोड के साथ, बिना '+' या spaces के, जैसे 919876543210 या 14155552671)
  whatsappNumber: "1234567890", 
  
  // डिफ़ॉल्ट मैसेज जो WhatsApp खुलने पर टाइप हुआ आएगा
  defaultMessage: "Hi {name}, I saw your profile on X Exclusive and would like to chat!",

  // लाइव ऑनलाइन यूजर काउंट सेटिंग्स
  onlineCounter: {
    baseCount: 56,
    minCount: 48,
    maxCount: 65,
    updateIntervalMs: 5000 // हर 5 सेकंड में थोड़ा चेंज होगा
  },

  // प्रोफाइल्स डेटा (Same to same as in screenshot)
  profiles: [
    {
      id: "nora-jensen",
      name: "Nora Jensen",
      location: "Copenhagen, Denmark",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80",
      online: true
    },
    {
      id: "amelia-clarke",
      name: "Amelia Clarke",
      location: "Sydney, Australia",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=80",
      online: true
    },
    {
      id: "chloe-wilson",
      name: "Chloe Wilson",
      location: "Manchester, UK",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80",
      online: true
    },
    {
      id: "isabella-rossi",
      name: "Isabella Rossi",
      location: "Milan, Italy",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80",
      online: true
    },
    {
      id: "sofia-martinez",
      name: "Sofia Martinez",
      location: "Madrid, Spain",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=700&q=80",
      online: true
    },
    {
      id: "ava-mitchell",
      name: "Ava Mitchell",
      location: "Los Angeles, USA",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=700&q=80",
      online: true
    },
    {
      id: "mia-anderson",
      name: "Mia Anderson",
      location: "Toronto, Canada",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80",
      online: true
    },
    {
      id: "sofia-bennett",
      name: "Sofia Bennett",
      location: "London, UK",
      image: "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?auto=format&fit=crop&w=700&q=80",
      online: true
    },
    {
      id: "elena-rostova",
      name: "Elena Rostova",
      location: "Prague, Czechia",
      image: "https://images.unsplash.com/photo-1524638431109-9373293c4ea2?auto=format&fit=crop&w=700&q=80",
      online: true
    },
    {
      id: "camila-duarte",
      name: "Camila Duarte",
      location: "São Paulo, Brazil",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=700&q=80",
      online: true
    }
  ],

  // भाषा अनुवाद (Languages)
  translations: {
    en: {
      code: "EN",
      onlineSuffix: "Online",
      callChatBtn: "Call | Chat",
      menuHome: "Home",
      menuProfiles: "Profiles",
      connectingText: "Connecting to WhatsApp..."
    },
    ja: {
      code: "JA",
      onlineSuffix: "オンライン",
      callChatBtn: "通話 | チャット",
      menuHome: "ホーム",
      menuProfiles: "プロフィール",
      connectingText: "WhatsAppに接続中..."
    },
    id: {
      code: "ID",
      onlineSuffix: "Online",
      callChatBtn: "Telepon | Obrolan",
      menuHome: "Beranda",
      menuProfiles: "Profil",
      connectingText: "Menghubungkan ke WhatsApp..."
    },
    fil: {
      code: "FIL",
      onlineSuffix: "Online",
      callChatBtn: "Tawag | Chat",
      menuHome: "Home",
      menuProfiles: "Mga Profile",
      connectingText: "Kumokonekta sa WhatsApp..."
    }
  }
};
