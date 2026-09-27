# X Exclusive - Same to Same Website

यह वेबसाइट आपके द्वारा दिए गए स्क्रीनशॉट के अनुसार **Same to Same** प्रीमियम डार्क थीम, 2-कॉलम मोबाइल लेआउट, लाइव ऑनलाइन काउंटर, बहुभाषी (Multilingual) सपोर्ट और डायरेक्ट WhatsApp 'Call | Chat' इंटीग्रेशन के साथ तैयार की गई है।

---

## 📁 प्रोजेक्ट स्ट्रक्चर (Files Overview)

```
x-exclusive-website/
├── index.html        # मुख्य HTML पेज (Header, Badges, Dropdowns, Grid)
├── style.css         # आधुनिक डार्क और लक्ज़री स्टाइलिंग (CSS)
├── app.js            # इंटरएक्टिव लॉजिक (काउंटर, ट्रांसलेशन, ड्रॉपडाउन, व्हाट्सएप)
├── config.js         # आसान सेटिंग्स (अपना WhatsApp नंबर और मॉडल्स बदलने के लिए)
└── README.md         # गाइड और जानकारी
```

---

## ⚙️ अपना WhatsApp नंबर कैसे बदलें?

`config.js` फ़ाइल को खोलें:

```javascript
const CONFIG = {
  // यहाँ अपना WhatsApp नंबर कंट्री कोड के साथ लिखें (बिना '+' या spaces के)
  // उदाहरण के लिए भारत: "919876543210" या USA: "14155552671"
  whatsappNumber: "919876543210", 

  // व्हाट्सएप खुलने पर जो मैसेज अपने आप लिखा आएगा:
  defaultMessage: "Hi {name}, I saw your profile on X Exclusive and would like to chat!",
  ...
```

जैसे ही कोई यूजर **"Call | Chat"** बटन दबाएगा, सीधे आपका WhatsApp चैट उस मॉडल के नाम के साथ ओपन हो जाएगा।

---

## 🌐 नई प्रोफाइल्स / मॉडल्स कैसे जोड़ें या बदलें?

`config.js` में `profiles` लिस्ट के अंदर आप जितने चाहें प्रोफाइल्स जोड़ सकते हैं:

```javascript
{
  id: "nora-jensen",
  name: "Nora Jensen",
  location: "Copenhagen, Denmark",
  image: "फोटो का URL या लोकल पाथ",
  online: true
}
```

---

## 🚀 अपने कंप्यूटर पर चलाने का तरीका

1. वेबसाइट पहले से ही आपके ब्राउज़र में `http://localhost:8080` पर लाइव चल रही है।
2. अगर कभी दोबारा चलाना हो, तो इस फोल्डर में टर्मिनल खोलकर यह कमांड चलाएं:
   ```bash
   python -m http.server 8080
   ```
   और ब्राउज़र में `http://localhost:8080` खोलें।
3. आप बिना किसी सर्वर के सिर्फ `index.html` पर डबल-क्लिक करके भी इसे सीधे किसी भी ब्राउज़र में खोल सकते हैं।

---

## ☁️ इंटरनेट पर लाइव होस्ट कैसे करें?

आप इस पूरे फोल्डर को किसी भी फ़्री होस्टिंग पर 1 मिनट में लाइव कर सकते हैं:
- **Netlify / Vercel**: बस इस फोल्डर को ड्रैग & ड्रॉप (Drag & Drop) करें।
- **Cloudflare Pages / GitHub Pages**: सीधे डिप्लॉय कर सकते हैं।
- **cPanel / Shared Hosting**: `public_html` में सभी फाइल्स अपलोड कर दें।
