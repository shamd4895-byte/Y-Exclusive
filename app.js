// ==========================================================================
// Velvet Exclusive - Main JavaScript Engine
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  const state = {
    currentLang: localStorage.getItem("velvet_exclusive_lang") || "en",
    onlineCount: CONFIG.onlineCounter.baseCount,
    activeMenu: null
  };

  const profilesGrid = document.getElementById("profilesGrid");
  const onlineCountText = document.getElementById("onlineCountText");
  const onlineLabel = document.getElementById("onlineLabel");
  const langToggleBtn = document.getElementById("langToggleBtn");
  const currentLangCode = document.getElementById("currentLangCode");
  const langDropdown = document.getElementById("langDropdown");
  const menuToggleBtn = document.getElementById("menuToggleBtn");
  const navDropdown = document.getElementById("navDropdown");
  const dropdownBackdrop = document.getElementById("dropdownBackdrop");
  const toastNotification = document.getElementById("toastNotification");
  const toastMsg = document.getElementById("toastMsg");
  const navHome = document.getElementById("navHome");
  const navProfiles = document.getElementById("navProfiles");
  const navVip = document.getElementById("navVip");
  const footerTitle = document.getElementById("footerTitle");
  const footerText = document.getElementById("footerText");

  const phoneIconSvg = `
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.44-5.15-3.75-6.59-6.59l1.97-1.57c.28-.28.37-.67.25-1.02A11.36 11.36 0 0 1 8.56 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.62c0-.55-.45-1-1-1z"/>
    </svg>
  `;

  // Render 14 Profile Cards
  function renderProfiles() {
    profilesGrid.innerHTML = "";
    const t = CONFIG.translations[state.currentLang] || CONFIG.translations.en;
    const testUrl = CONFIG.callChatUrl || "https://www.google.com";

    CONFIG.profiles.forEach((profile) => {
      const card = document.createElement("article");
      card.className = "profile-card";
      card.id = `card-${profile.id}`;

      card.innerHTML = `
        <div class="profile-img-wrap">
          <img 
            src="${profile.image}" 
            alt="${profile.name}" 
            class="profile-img" 
            loading="lazy" 
            onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80';"
          />
        </div>
        <div class="card-overlay"></div>
        ${profile.online ? '<span class="card-online-indicator" title="Online now"></span>' : ''}
        
        <div class="card-details">
          <h2 class="profile-name">${profile.name}</h2>
          <span class="profile-location">${profile.location}</span>
          <a href="${testUrl}" target="_blank" rel="noopener noreferrer" class="btn-call-chat" data-name="${profile.name}">
            ${phoneIconSvg}
            <span>${t.callChatBtn}</span>
          </a>
        </div>
      `;

      const callBtn = card.querySelector(".btn-call-chat");
      callBtn.addEventListener("click", () => {
        showToast(t.connectingText);
      });

      profilesGrid.appendChild(card);
    });
  }

  // Update Translations
  function applyLanguage(lang) {
    if (!CONFIG.translations[lang]) lang = "en";
    state.currentLang = lang;
    localStorage.setItem("velvet_exclusive_lang", lang);

    const t = CONFIG.translations[lang];

    currentLangCode.textContent = t.code;
    onlineLabel.textContent = t.onlineSuffix;
    navHome.textContent = t.menuHome;
    navProfiles.textContent = t.menuProfiles;
    if (navVip) navVip.textContent = t.menuVip;
    if (footerTitle) footerTitle.textContent = t.disclaimerTitle;
    if (footerText) footerText.textContent = t.disclaimerText;

    document.querySelectorAll(".lang-option").forEach((opt) => {
      opt.classList.toggle("active", opt.dataset.lang === lang);
    });

    document.querySelectorAll(".btn-call-chat span").forEach((btnSpan) => {
      btnSpan.textContent = t.callChatBtn;
    });
  }

  // Toast
  let toastTimer = null;
  function showToast(message) {
    toastMsg.textContent = message;
    toastNotification.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotification.classList.remove("show");
    }, 2000);
  }

  // Live online counter fluctuation
  function initLiveCounter() {
    function updateCounterDisplay(num) {
      const formatted = String(num).padStart(3, "0");
      onlineCountText.textContent = formatted;
    }

    updateCounterDisplay(state.onlineCount);

    setInterval(() => {
      const delta = (Math.random() > 0.48 ? 1 : -1) * Math.floor(Math.random() * 2 + 1);
      let nextCount = state.onlineCount + delta;
      if (nextCount < CONFIG.onlineCounter.minCount) nextCount = CONFIG.onlineCounter.minCount + 2;
      if (nextCount > CONFIG.onlineCounter.maxCount) nextCount = CONFIG.onlineCounter.maxCount - 2;
      
      state.onlineCount = nextCount;
      updateCounterDisplay(state.onlineCount);
    }, CONFIG.onlineCounter.updateIntervalMs || 4000);
  }

  // Dropdown Manager
  function closeAllDropdowns() {
    langDropdown.classList.remove("open");
    navDropdown.classList.remove("open");
    langToggleBtn.classList.remove("active");
    menuToggleBtn.classList.remove("active");
    dropdownBackdrop.classList.remove("active");
    langDropdown.setAttribute("aria-hidden", "true");
    navDropdown.setAttribute("aria-hidden", "true");
    state.activeMenu = null;
  }

  function toggleLanguageDropdown() {
    if (state.activeMenu === "lang") {
      closeAllDropdowns();
    } else {
      closeAllDropdowns();
      langDropdown.classList.add("open");
      langToggleBtn.classList.add("active");
      dropdownBackdrop.classList.add("active");
      langDropdown.setAttribute("aria-hidden", "false");
      state.activeMenu = "lang";
    }
  }

  function toggleNavDropdown() {
    if (state.activeMenu === "nav") {
      closeAllDropdowns();
    } else {
      closeAllDropdowns();
      navDropdown.classList.add("open");
      menuToggleBtn.classList.add("active");
      dropdownBackdrop.classList.add("active");
      navDropdown.setAttribute("aria-hidden", "false");
      state.activeMenu = "nav";
    }
  }

  langToggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleLanguageDropdown();
  });

  menuToggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleNavDropdown();
  });

  dropdownBackdrop.addEventListener("click", () => {
    closeAllDropdowns();
  });

  document.querySelectorAll(".lang-option").forEach((opt) => {
    opt.addEventListener("click", () => {
      const selectedLang = opt.dataset.lang;
      applyLanguage(selectedLang);
      closeAllDropdowns();
    });
  });

  navHome.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    closeAllDropdowns();
  });

  navProfiles.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.getElementById("profiles");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    closeAllDropdowns();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllDropdowns();
  });

  renderProfiles();
  applyLanguage(state.currentLang);
  initLiveCounter();
});
