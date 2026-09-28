/**
 * X Exclusive - Web Application Logic
 * Supports 49 Profiles, multilingual priority sorting, live counter & actions
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
  const langDropdown = document.getElementById("langDropdown");
  const dropdownBackdrop = document.getElementById("dropdownBackdrop");
  const toast = document.getElementById("toastNotification");
  const toastMsg = document.getElementById("toastMsg");

  // Phone Call SVG icon helper
  const phoneIconSvg = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  `;

  // Get prioritized profiles based on selected language
  function getSortedProfiles(lang) {
    const t = CONFIG.translations[lang] || CONFIG.translations.en;
    const priority = t.priorityCountries || [];
    
    // Clone list
    const list = [...CONFIG.profiles];
    
    // Sort according to country priority list
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

      // Eager load first 6 cards for instant paint, lazy load the rest
      const loadingAttr = i < 6 ? 'loading="eager" fetchpriority="high"' : 'loading="lazy" decoding="async"';

      card.innerHTML = `
        <div class="card-photo-wrap">
          <img src="${p.image}" alt="${p.name}" ${loadingAttr} onerror="this.onerror=null; this.src='images/card_01.jpg';">
          <span class="card-status" title="Online"></span>
          <div class="card-info">
            <h3 class="card-name">${p.name}</h3>
            <p class="card-location">${p.location}</p>
            <button type="button" class="profile-card-action" aria-label="Call or Chat with ${p.name}">
              ${phoneIconSvg}
              <span>${t.callChatBtn}</span>
            </button>
          </div>
        </div>
      `;

      // Card action listener
      const actionBtn = card.querySelector(".profile-card-action");
      actionBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        handleProfileClick(p, t);
      });

      // Clicking anywhere on card also triggers
      card.addEventListener("click", () => {
        handleProfileClick(p, t);
      });

      profilesGrid.appendChild(card);
    });
  }

  // Handle CTA Click: brief feedback then open chat destination
  function handleProfileClick(profile, translation) {
    if (toast) {
      toastMsg.textContent = translation.connectingText || "Connecting...";
      toast.classList.add("active");
      
      setTimeout(() => {
        toast.classList.remove("active");
        window.open(CONFIG.callChatUrl, "_blank", "noopener,noreferrer");
      }, 500);
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

      // Persist in URL query param for sharing
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
    const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, or +1
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
