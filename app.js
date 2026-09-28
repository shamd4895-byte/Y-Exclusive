/**
 * S Exclusive - Application Logic
 * Supports 49 Profiles, 12 Languages, WhatsApp Button, Clean Competitor Look
 */

document.addEventListener("DOMContentLoaded", () => {
  let currentLang = "en";

  const grid = document.getElementById("clp-grid");
  const langBtn = document.getElementById("langBtn");
  const langMenu = document.getElementById("langMenu");
  const currentLangDisplay = document.getElementById("currentLangDisplay");
  const menuToggleBtn = document.getElementById("menuToggleBtn");
  const navDropdown = document.getElementById("navDropdown");
  const toast = document.getElementById("toastNotification");
  const toastMsg = document.getElementById("toastMsg");

  // Official WhatsApp SVG icon (exact match to competitor)
  const whatsAppSvg = `
    <span class="clp-wa" aria-hidden="true">
      <svg viewBox="0 0 24 24"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.08 0C5.56 0 .25 5.31.25 11.83c0 2.09.55 4.14 1.6 5.94L.15 24l6.38-1.67a11.84 11.84 0 0 0 5.55 1.38h.01c6.52 0 11.83-5.31 11.83-11.83 0-3.16-1.23-6.13-3.42-8.38Zm-8.42 18.2h-.01a9.84 9.84 0 0 1-5.02-1.37l-.36-.21-3.79.99 1.01-3.69-.23-.38a9.82 9.82 0 1 1 8.4 4.66Zm5.39-7.36c-.29-.15-1.72-.85-1.99-.95-.27-.1-.47-.15-.67.15-.2.29-.76.95-.93 1.15-.17.2-.34.22-.63.07-.29-.15-1.2-.44-2.28-1.4-.84-.75-1.4-1.67-1.57-1.95-.16-.29-.02-.44.13-.59.13-.13.29-.34.44-.51.15-.17.2-.29.3-.49.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.29-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.21 5.08 4.5.71.31 1.26.5 1.69.64.71.23 1.36.2 1.87.12.57-.08 1.72-.7 1.96-1.38.24-.68.24-1.27.17-1.39-.07-.12-.27-.2-.56-.34Z"/></svg>
    </span>
  `;

  // Get prioritized profiles
  function getSortedProfiles(lang) {
    const t = CONFIG.translations[lang] || CONFIG.translations.en;
    const priority = t.priorityCountries || [];
    const list = [...CONFIG.profiles];

    list.sort((a, b) => {
      const idxA = priority.indexOf(a.countryCode);
      const idxB = priority.indexOf(b.countryCode);
      const rankA = idxA === -1 ? 999 : idxA;
      const rankB = idxB === -1 ? 999 : idxB;
      return rankA - rankB;
    });

    return list;
  }

  // Render cards
  function renderProfiles(lang) {
    const t = CONFIG.translations[lang] || CONFIG.translations.en;
    const profiles = getSortedProfiles(lang);

    grid.innerHTML = "";

    profiles.forEach((p, i) => {
      const card = document.createElement("article");
      card.className = "clp-card";

      const loadingAttr = i < 8 ? 'loading="eager" fetchpriority="high"' : 'loading="lazy" decoding="async"';

      card.innerHTML = `
        <div class="clp-photo">
          <img src="${p.image}?v=20260928_v5" alt="${p.name}" ${loadingAttr} onerror="this.onerror=null; this.src='images/card_01.jpg';">
        </div>
        <div class="clp-info">
          <h2 class="clp-name">${p.name}</h2>
          <p class="clp-location">${p.location}</p>
          <button type="button" class="clp-cta" aria-label="WhatsApp with ${p.name}">
            ${whatsAppSvg}
            <span>${t.btnText || 'WhatsApp'}</span>
          </button>
        </div>
      `;

      // Click on card or WhatsApp button
      card.addEventListener("click", () => {
        handleCtaClick(p, t);
      });

      grid.appendChild(card);
    });
  }

  function handleCtaClick(profile, translation) {
    if (toast) {
      toastMsg.textContent = translation.connecting || "Opening WhatsApp...";
      toast.classList.add("active");
      setTimeout(() => {
        toast.classList.remove("active");
        window.open(CONFIG.callChatUrl, "_blank", "noopener,noreferrer");
      }, 400);
    } else {
      window.open(CONFIG.callChatUrl, "_blank", "noopener,noreferrer");
    }
  }

  // Set Language
  function setLanguage(lang) {
    if (!CONFIG.translations[lang]) lang = "en";
    currentLang = lang;

    const t = CONFIG.translations[lang];

    // Update Language Display in Header
    if (currentLangDisplay) {
      currentLangDisplay.textContent = t.code;
    }

    // Update active class in dropdown
    document.querySelectorAll(".clp-lang-menu a").forEach((item) => {
      if (item.getAttribute("data-lang") === lang) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    renderProfiles(lang);
  }

  // Language Menu Toggle
  if (langBtn && langMenu) {
    langBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = !langMenu.hasAttribute("hidden");
      if (open) {
        langMenu.setAttribute("hidden", "");
      } else {
        langMenu.removeAttribute("hidden");
        if (navDropdown) navDropdown.setAttribute("hidden", "");
      }
      langBtn.setAttribute("aria-expanded", open ? "false" : "true");
    });

    document.addEventListener("click", () => {
      langMenu.setAttribute("hidden", "");
      langBtn.setAttribute("aria-expanded", "false");
    });
  }

  // Language click handlers
  document.querySelectorAll(".clp-lang-menu a").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const selected = a.getAttribute("data-lang");
      setLanguage(selected);
      langMenu.setAttribute("hidden", "");
      langBtn.setAttribute("aria-expanded", "false");

      const url = new URL(window.location.href);
      url.searchParams.set("lang", selected);
      window.history.replaceState({}, "", url.toString());
    });
  });

  // Nav Menu Toggle
  if (menuToggleBtn && navDropdown) {
    menuToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = !navDropdown.hasAttribute("hidden");
      if (open) {
        navDropdown.setAttribute("hidden", "");
      } else {
        navDropdown.removeAttribute("hidden");
        if (langMenu) langMenu.setAttribute("hidden", "");
      }
    });

    document.addEventListener("click", () => {
      navDropdown.setAttribute("hidden", "");
    });
  }

  // Initial Language detection
  function detectInitial() {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = (urlParams.get("lang") || "").toLowerCase();
    if (langParam && CONFIG.translations[langParam]) return langParam;

    const browser = (navigator.language || navigator.userLanguage || "en").toLowerCase();
    for (const code of Object.keys(CONFIG.translations)) {
      if (browser.startsWith(code)) return code;
    }
    return "en";
  }

  setLanguage(detectInitial());
});
