/**
 * X Exclusive - Web Application Logic
 * Supports 49 Profiles, WhatsApp Button, multilingual priority sorting, live counter
 */

document.addEventListener("DOMContentLoaded", () => {
  // Current active language state
  let currentLang = "en";

  // Cache DOM elements
  const profilesGrid = document.getElementById("profilesGrid");
  const onlineCountText = document.getElementById("onlineCountText");
  const onlineLabel = document.getElementById("onlineLabel");
  const menuToggleBtn = document.getElementById("menuToggleBtn");
  const navDropdown = document.getElementById("navDropdown");
  const langSelectorWrap = document.querySelector(".lang-selector-wrap");
  const langToggleBtn = document.getElementById("langToggleBtn");
  const currentLangCode = document.getElementById("currentLangCode");
  const dropdownBackdrop = document.getElementById("dropdownBackdrop");
  const toast = document.getElementById("toastNotification");
  const toastMsg = document.getElementById("toastMsg");

  // Official WhatsApp SVG icon (exact match to competitor)
  const whatsAppIconSvg = `
    <span class="clp-wa" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M20.5 3.5A11.8 11.8 0 0 0 12.08 0C5.56 0 .25 5.31.25 11.83c0 2.09.55 4.14 1.6 5.94L.15 24l6.38-1.67a11.84 11.84 0 0 0 5.55 1.38h.01c6.52 0 11.83-5.31 11.83-11.83 0-3.16-1.23-6.13-3.42-8.38Zm-8.42 18.2h-.01a9.84 9.84 0 0 1-5.02-1.37l-.36-.21-3.79.99 1.01-3.69-.23-.38a9.82 9.82 0 1 1 8.4 4.66Zm5.39-7.36c-.29-.15-1.72-.85-1.99-.95-.27-.1-.47-.15-.67.15-.2.29-.76.95-.93 1.15-.17.2-.34.22-.63.07-.29-.15-1.2-.44-2.28-1.4-.84-.75-1.4-1.67-1.57-1.95-.16-.29-.02-.44.13-.59.13-.13.29-.34.44-.51.15-.17.2-.29.3-.49.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.29-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.21 5.08 4.5.71.31 1.26.5 1.69.64.71.23 1.36.2 1.87.12.57-.08 1.72-.7 1.96-1.38.24-.68.24-1.27.17-1.39-.07-.12-.27-.2-.56-.34Z"/>
      </svg>
    </span>
  `;

  // Get prioritized profiles based on selected language
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

  // Render all profile cards
  function renderProfiles(lang) {
    const t = CONFIG.translations[lang] || CONFIG.translations.en;
    const profiles = getSortedProfiles(lang);

    profilesGrid.innerHTML = "";

    profiles.forEach((p, i) => {
      const card = document.createElement("article");
      card.className = "profile-card";
      card.setAttribute("data-id", p.id);

      const loadingAttr = i < 6 ? 'loading="eager" fetchpriority="high"' : 'loading="lazy" decoding="async"';

      card.innerHTML = `
        <div class="card-photo-wrap">
          <img src="${p.image}?v=20260928_v3" alt="${p.name}" ${loadingAttr} onerror="this.onerror=null; this.src='images/card_01.jpg';">
          <span class="card-status" title="Online"></span>
          <div class="card-info">
            <h3 class="card-name">${p.name}</h3>
            <p class="card-location">${p.location}</p>
            <button type="button" class="profile-card-action btn-whatsapp" aria-label="WhatsApp with ${p.name}">
              ${whatsAppIconSvg}
              <span>${t.callChatBtn || 'WhatsApp'}</span>
            </button>
          </div>
        </div>
      `;

      // Button click listener
      const actionBtn = card.querySelector(".profile-card-action");
      actionBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        handleProfileClick(p, t);
      });

      // Card click listener
      card.addEventListener("click", () => {
        handleProfileClick(p, t);
      });

      profilesGrid.appendChild(card);
    });
  }

  // Handle CTA Click: brief feedback then open WhatsApp destination
  function handleProfileClick(profile, translation) {
    if (toast) {
      toastMsg.textContent = translation.connectingText || "Opening WhatsApp...";
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

    // Update Header
    if (currentLangCode) currentLangCode.textContent = t.code;
    if (onlineLabel) onlineLabel.textContent = t.onlineSuffix;

    // Update active state in dropdown
    document.querySelectorAll(".lang-option").forEach((opt) => {
      if (opt.getAttribute("data-lang") === lang) {
        opt.classList.add("active");
      } else {
        opt.classList.remove("active");
      }
    });

    // Re-render profiles with language-specific order
    renderProfiles(lang);
  }

  // Dropdown controls
  function closeAllDropdowns() {
    if (navDropdown) navDropdown.classList.remove("open");
    if (langSelectorWrap) langSelectorWrap.classList.remove("open");
    if (dropdownBackdrop) dropdownBackdrop.classList.remove("active");
  }

  if (menuToggleBtn) {
    menuToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = navDropdown.classList.contains("open");
      closeAllDropdowns();
      if (!isOpen) {
        navDropdown.classList.add("open");
        dropdownBackdrop.classList.add("active");
      }
    });
  }

  if (langToggleBtn) {
    langToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = langSelectorWrap.classList.contains("open");
      closeAllDropdowns();
      if (!isOpen) {
        langSelectorWrap.classList.add("open");
        dropdownBackdrop.classList.add("active");
      }
    });
  }

  if (dropdownBackdrop) {
    dropdownBackdrop.addEventListener("click", closeAllDropdowns);
  }

  // Handle clicking on language options
  document.querySelectorAll(".lang-option").forEach((opt) => {
    opt.addEventListener("click", () => {
      const selectedLang = opt.getAttribute("data-lang");
      setLanguage(selectedLang);
      closeAllDropdowns();

      const url = new URL(window.location.href);
      url.searchParams.set("lang", selectedLang);
      window.history.replaceState({}, "", url.toString());
    });
  });

  // Online Counter Simulation
  let onlineNum = CONFIG.onlineCounter.baseCount || 56;
  function updateOnlineCounter() {
    const min = CONFIG.onlineCounter.minCount || 50;
    const max = CONFIG.onlineCounter.maxCount || 65;
    const delta = Math.floor(Math.random() * 3) - 1;
    onlineNum = Math.max(min, Math.min(max, onlineNum + delta));
    
    if (onlineCountText) {
      onlineCountText.textContent = String(onlineNum).padStart(3, "0");
    }
  }
  setInterval(updateOnlineCounter, CONFIG.onlineCounter.updateIntervalMs || 5000);

  // Auto-detect language from URL or Browser
  function detectInitialLanguage() {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get("lang");
    if (langParam && CONFIG.translations[langParam]) {
      return langParam;
    }

    const browserLang = (navigator.language || navigator.userLanguage || "en").toLowerCase();
    if (browserLang.startsWith("ja")) return "ja";
    if (browserLang.startsWith("id")) return "id";
    if (browserLang.startsWith("fil") || browserLang.startsWith("tl")) return "fil";

    return "en";
  }

  // Initialize
  const initialLang = detectInitialLanguage();
  setLanguage(initialLang);
});
