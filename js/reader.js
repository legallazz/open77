// Reading interface controller
class BookReader {
  constructor() {
    this.isReaderActive = false;
    this.readingMode = "page";
    this.currentProgress = 0;
    this.bookId = "";
    this.savedPosition = null;
    this.lastProgressSave = 0;
    this.readingStartTime = 0;
  }

  setupMenuVisibility() {
    this.isMenuVisible = true;
    this.toggleMenuBtn = document.getElementById("toggle-menu-visibility");
    this.showMenuBtn = document.createElement("button");

    // Создаем кнопку для показа меню
    this.showMenuBtn.className = "show-menu-btn";
    this.showMenuBtn.innerHTML = '<i class="fas fa-eye"></i>';
    this.showMenuBtn.title = "Показать меню";
    this.showMenuBtn.style.display = "none";
    document.body.appendChild(this.showMenuBtn);

    // Обработчики событий
    if (this.toggleMenuBtn) {
      this.toggleMenuBtn.addEventListener("click", () =>
        this.toggleMenuVisibility()
      );
    }

    this.showMenuBtn.addEventListener("click", () => this.showMenu());

    // Меню больше не скрывается автоматически при прокрутке
    // Убрано автоматическое скрытие для лучшего UX
  }

  toggleMenuVisibility() {
    if (this.isMenuVisible) {
      this.hideMenu();
    } else {
      this.showMenu();
    }
  }

  hideMenu() {
    const readingMenu = document.querySelector(".reading-menu");
    if (readingMenu) {
      readingMenu.classList.add("hidden");
      this.isMenuVisible = false;
      this.updateToggleButton();
      this.showMenuBtn.style.display = "flex";

      // Сохраняем состояние в localStorage
      this.saveMenuState();
    }
  }

  showMenu() {
    const readingMenu = document.querySelector(".reading-menu");
    if (readingMenu) {
      readingMenu.classList.remove("hidden");
      this.isMenuVisible = true;
      this.updateToggleButton();
      this.showMenuBtn.style.display = "none";

      // Сохраняем состояние в localStorage
      this.saveMenuState();

      // Автоматическое скрытие отключено для лучшего UX
    }
  }

  updateToggleButton() {
    if (this.toggleMenuBtn) {
      const icon = this.toggleMenuBtn.querySelector("i");
      if (icon) {
        if (this.isMenuVisible) {
          icon.className = "fas fa-eye-slash";
          this.toggleMenuBtn.title = "Скрыть меню";
        } else {
          icon.className = "fas fa-eye";
          this.toggleMenuBtn.title = "Показать меню";
        }
      }
    }
  }


  saveMenuState() {
    const menuState = {
      isMenuVisible: this.isMenuVisible,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem(
      `menu-state-${this.bookId}`,
      JSON.stringify(menuState)
    );
  }

  loadMenuState() {
    const stored = localStorage.getItem(`menu-state-${this.bookId}`);
    if (stored) {
      try {
        const state = JSON.parse(stored);
        const stateAge = Date.now() - new Date(state.timestamp).getTime();

        // Загружаем состояние если оно не старше 24 часов
        if (stateAge < 24 * 60 * 60 * 1000) {
          this.isMenuVisible = state.isMenuVisible;

          if (!this.isMenuVisible) {
            this.hideMenu();
          } else {
            this.showMenu();
          }

          return true;
        }
      } catch (error) {
        console.error("Error loading menu state:", error);
      }
    }
    return false;
  }

  init() {
    const bookConfig = window.bookConfig.getCurrentBook();
    this.bookId = bookConfig ? bookConfig.id : "unknown";

    this.bindEvents();
    this.loadReadingProgress();
    this.setupReadingTracking();
    this.initializeReaderState();
    this.checkSavedProgress();
    this.updateStartButton();
    this.setupMenuVisibility(); // Добавляем эту строку
    this.loadMenuState(); // Загружаем сохраненное состояние меню
  }

  // Добавьте новый метод:
  updateStartButton() {
    const startBtn = document.getElementById("start-reading");
    const continueBtn = document.getElementById("continue-reading");
    const progress = this.loadReadingProgress();

    if (progress && progress.progress > 5) {
      if (startBtn) {
        startBtn.textContent = "Продолжить чтение";
        startBtn.innerHTML =
          '<i class="fas fa-book-open"></i> Продолжить чтение';
      }
      if (continueBtn) {
        continueBtn.style.display = "inline-flex";
        try {
          continueBtn.textContent = `Продолжить с ${Math.round(
            progress.progress
          )}%`;
        } catch (e) {
          console.warn("Could not set continueBtn textContent:", e);
        }
      }
    } else {
      if (startBtn) {
        startBtn.textContent = "Начать чтение";
        startBtn.innerHTML = '<i class="fas fa-book-open"></i> Начать чтение';
      }
      if (continueBtn) {
        continueBtn.style.display = "none";
      }
    }
  }

  checkSavedProgress() {
    const progress = this.loadReadingProgress();
    const continueBtn = document.getElementById("continue-reading");
    const startBtn = document.getElementById("start-reading");

    if (progress && progress.progress > 5) {
      if (continueBtn) {
        continueBtn.style.display = "inline-flex";
        try {
          continueBtn.textContent = `Продолжить с ${Math.round(
            progress.progress
          )}%`;
        } catch (e) {
          console.warn(
            "Could not set continueBtn textContent in checkSavedProgress:",
            e
          );
        }
      }
    } else {
      if (continueBtn) {
        continueBtn.style.display = "none";
      }
    }
  }

  bindEvents() {
    // Start reading button
    const startReadingBtn = document.getElementById("start-reading");
    const startTextReadingBtn = document.getElementById("start-text-reading");

    if (startReadingBtn) {
      startReadingBtn.addEventListener("click", () => this.startReading());
    }

    if (startTextReadingBtn) {
      startTextReadingBtn.addEventListener("click", () => this.startReading());
    }

    // Continue reading button
    const continueReadingBtn = document.getElementById("continue-reading");
    if (continueReadingBtn) {
      continueReadingBtn.addEventListener("click", () =>
        this.continueReading()
      );
    }

    // Exit reading button
    const exitReadingBtn = document.getElementById("exit-reading");
    if (exitReadingBtn) {
      exitReadingBtn.addEventListener("click", () => this.exitReading());
    }

    // Reading color settings button
    const readingColorBtn = document.getElementById("reading-color-settings");
    if (readingColorBtn) {
      readingColorBtn.addEventListener("click", () => this.openColorSettings());
    }

    // Fullscreen toggle button
    const fullscreenBtn = document.getElementById("fullscreen-toggle");
    if (fullscreenBtn) {
      fullscreenBtn.addEventListener("click", () => this.toggleFullscreen());
    }

    // Theme selector
    const themeSelector = document.getElementById("theme-selector");
    if (themeSelector) {
      themeSelector.addEventListener("change", (e) =>
        this.changeTheme(e.target.value)
      );
    }

    // Reading mode is handled by reading-settings.js


    // Keyboard shortcuts
    document.addEventListener("keydown", (e) =>
      this.handleKeyboardShortcuts(e)
    );

    // Scroll tracking for progress
    window.addEventListener("scroll", () => this.updateReadingProgress());

    // Auto-save progress periodically
    setInterval(() => {
      if (this.isReaderActive) {
        this.saveReadingProgress();
      }
    }, 10000); // Save every 10 seconds

    // Слушатель для изменения полноэкранного режима
    document.addEventListener("fullscreenchange", () =>
      this.updateFullscreenIcon()
    );
    document.addEventListener("webkitfullscreenchange", () =>
      this.updateFullscreenIcon()
    );
    document.addEventListener("mozfullscreenchange", () =>
      this.updateFullscreenIcon()
    );
    document.addEventListener("MSFullscreenChange", () =>
      this.updateFullscreenIcon()
    );
  }

  startReading() {
    this.isReaderActive = true;
    this.savedPosition = null; // Start from beginning
    this.currentProgress = 0;
    this.scrollToReading();
    this.showReadingInterface();
    this.saveReadingProgress();

    // Trigger book content loading
    window.dispatchEvent(new CustomEvent("startReading"));
  }

  continueReading() {
    this.isReaderActive = true;
    const progress = this.loadReadingProgress();

    if (progress) {
      this.currentProgress = progress.progress || 0;
      this.readingMode = progress.readingMode || "page";
      this.savedPosition = progress.savedPosition;

      // Apply the reading mode settings first
      if (window.readingSettings) {
        window.readingSettings.setReadingMode(this.readingMode);
      }
    }

    this.scrollToReading();
    this.showReadingInterface();

    // Wait for content to load before restoring position
    window.addEventListener(
      "bookContentLoaded",
      () => {
        setTimeout(() => {
          this.restoreReadingPosition();
        }, 500);
      },
      { once: true }
    );

    this.restoreReadingPosition();
  }

  scrollToReading() {
    // Show the full-screen reading modal
    const readingModal = document.getElementById("reading-modal");
    if (readingModal) {
      readingModal.style.display = "block";
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }
  }

  exitReading() {
    this.isReaderActive = false;

    // Hide reading modal
    const readingModal = document.getElementById("reading-modal");
    if (readingModal) {
      readingModal.style.display = "none";
      document.body.style.overflow = ""; // Restore background scrolling
    }

    // Hide reading mode controls
    const readingModeControls = document.getElementById(
      "reading-mode-controls"
    );
    const readingControls = document.getElementById("reading-controls");
    if (readingModeControls) {
      readingModeControls.style.display = "none";
    }
    if (readingControls) {
      readingControls.style.display = "none";
    }

    // Save progress before exiting
    this.saveReadingProgress();
  }

  openColorSettings() {
    // Use the reading settings modal
    if (window.readingSettings) {
      window.readingSettings.openSettings();
    }
  }

  changeTheme(theme) {
    // Apply theme using color customizer
    if (window.colorCustomizer) {
      window.colorCustomizer.applyTheme(theme);
    }
  }

  showReadingInterface() {
    const readingModeControls = document.getElementById(
      "reading-mode-controls"
    );
    const readingControls = document.getElementById("reading-controls");

    if (readingModeControls) {
      readingModeControls.style.display = "block";
    }

    this.setReadingMode(this.readingMode);
    this.updateProgress(this.currentProgress);
  }

  setReadingMode(mode) {
    this.readingMode = "scroll"; // Always use scroll mode

    // Delegate to reading settings
    if (window.readingSettings) {
      window.readingSettings.setReadingMode("scroll");
    }

    this.saveReadingProgress();
  }






  handleKeyboardShortcuts(e) {
    if (!this.isReaderActive) return;

    // All keyboard shortcuts removed for page mode
    // Only scroll mode is supported now
  }

  updateReadingProgress() {
    if (!this.isReaderActive) return;

    let progress = 0;

    // Only scroll mode supported - calculate based on scroll position
    const scrollTop =
      window.pageYOffset || document.documentElement.scrollTop;
    const docHeight =
      Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      ) - window.innerHeight;

    progress =
      docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;

    this.currentProgress = Math.max(progress, this.currentProgress || 0);
    this.updateProgress(this.currentProgress);

    // Save progress periodically
    if (Date.now() - (this.lastProgressSave || 0) > 2000) {
      this.saveReadingProgress();
      this.lastProgressSave = Date.now();

      // Также обновляем прогресс на главной странице
      BookDOMHelper.updateHomePageProgress(this.bookId, this.currentProgress);
    }
  }

  updateProgress(progress) {
    // Обновляем все прогресс бары с правильными ID
    const progressElements = [
      { fill: "reading-progress-fill", text: "reading-progress-text" },
      {
        fill: "reading-modal-progress-fill",
        text: "reading-modal-progress-text",
      },
      { fill: "progress-fill", text: "progress-text" }, // для совместимости
    ];

    progressElements.forEach(({ fill, text }) => {
      const fillEl = document.getElementById(fill);
      const textEl = document.getElementById(text);

      if (fillEl) {
        fillEl.style.width = `${progress}%`;
      }

      if (textEl) {
        try {
          textEl.textContent = `${Math.round(progress)}%`;
        } catch (e) {
          console.warn(`Could not set textContent for ${text}:`, e);
        }
      }
    });

    // Логируем прогресс для отладки
    if (progress > 0) {
      console.log(`Progress updated: ${Math.round(progress)}%`);
    }
  }

  saveReadingProgress() {
    const savedPosition = {
      scrollTop: window.pageYOffset || document.documentElement.scrollTop,

    };

    const progressData = {
      progress: this.currentProgress,

      readingMode: this.readingMode,
      savedPosition: savedPosition,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem(
      `reading-progress-${this.bookId}`,
      JSON.stringify(progressData)
    );

    // Update continue button text
    const continueBtn = document.getElementById("continue-reading");
    if (continueBtn && this.currentProgress > 5) {
      continueBtn.textContent = `Продолжить с ${Math.round(
        this.currentProgress
      )}%`;
      continueBtn.style.display = "inline-flex";
    }
  }

  loadReadingProgress() {
    const stored = localStorage.getItem(`reading-progress-${this.bookId}`);
    if (stored) {
      try {
        const progressData = JSON.parse(stored);

        // Only restore if not too old (30 days)
        const dataAge = Date.now() - new Date(progressData.timestamp).getTime();
        if (dataAge < 30 * 24 * 60 * 60 * 1000) {
          return progressData;
        }
      } catch (e) {
        console.error("Error loading reading progress:", e);
      }
    }
    return null;
  }

  updateProgress(progress) {
    // Обновляем все прогресс бары с правильными ID
    const progressElements = [
      { fill: "reading-progress-fill", text: "reading-progress-text" },
      {
        fill: "reading-modal-progress-fill",
        text: "reading-modal-progress-text",
      },
      { fill: "progress-fill", text: "progress-text" }, // на случай если есть
    ];

    progressElements.forEach(({ fill, text }) => {
      const fillEl = document.getElementById(fill);
      const textEl = document.getElementById(text);

      if (fillEl) {
        fillEl.style.width = `${progress}%`;
      }

      if (textEl) {
        textEl.textContent = `${Math.round(progress)}%`;
      }
    });
  }

  restoreReadingPosition() {
    if (!this.savedPosition) return;

    // Only scroll mode supported: restore scroll position
    setTimeout(() => {
      window.scrollTo({
        top: this.savedPosition.scrollTop || 0,
        behavior: "instant",
      });
    }, 100);
  }

  saveReadingProgress() {
    const savedPosition = {
      scrollTop: window.pageYOffset || document.documentElement.scrollTop,

    };

    const progressData = {
      progress: this.currentProgress,

      readingMode: this.readingMode,
      savedPosition: savedPosition,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem(
      `reading-progress-${this.bookId}`,
      JSON.stringify(progressData)
    );

    // Update continue button text
    const continueBtn = document.getElementById("continue-reading");
    if (continueBtn && this.currentProgress > 5) {
      try {
        continueBtn.textContent = `Продолжить с ${Math.round(
          this.currentProgress
        )}%`;
      } catch (e) {
        console.warn(
          "Could not set continueBtn textContent in saveReadingProgress:",
          e
        );
      }
      continueBtn.style.display = "inline-flex";
    }
  }

  loadReadingProgress() {
    const stored = localStorage.getItem(`reading-progress-${this.bookId}`);
    if (stored) {
      try {
        const progressData = JSON.parse(stored);

        // Only restore if not too old (30 days)
        const dataAge = Date.now() - new Date(progressData.timestamp).getTime();
        if (dataAge < 30 * 24 * 60 * 60 * 1000) {
          return progressData;
        }
      } catch (e) {
        console.error("Error loading reading progress:", e);
      }
    }
    return null;
  }

  setupReadingTracking() {
    // Track time spent reading
    this.readingStartTime = Date.now();

    // Save reading session on page unload
    window.addEventListener("beforeunload", () => {
      this.saveReadingSession();
    });
  }

  saveReadingSession() {
    if (!this.isReaderActive) return;

    const sessionData = {
      bookId: this.bookId,
      startTime: this.readingStartTime,
      endTime: Date.now(),
      progress: this.currentProgress,
      readingMode: this.readingMode,
    };

    // Save to session storage for analytics
    const sessions = JSON.parse(
      sessionStorage.getItem("reading-sessions") || "[]"
    );
    sessions.push(sessionData);

    // Keep only last 10 sessions
    if (sessions.length > 10) {
      sessions.splice(0, sessions.length - 10);
    }

    sessionStorage.setItem("reading-sessions", JSON.stringify(sessions));
  }

  initializeReaderState() {
    // Set up initial reading mode
    this.setReadingMode(this.readingMode);

    // Add reading mode styles
    const style = document.createElement("style");
    style.textContent = `
      .book-content.page-mode {
        overflow: hidden;
        position: relative;
      }
      
      .book-content.scroll-mode {
        overflow: visible;
        height: auto !important;
      }
      
      .reading-controls {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: var(--background-primary);
        border-radius: var(--radius-xl);
        padding: 1rem;
        box-shadow: var(--shadow-xl);
        border: 1px solid var(--border-color);
        z-index: 200;
      }
      
      .control-buttons {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      
      .control-btn {
        width: 2.5rem;
        height: 2.5rem;
        border: none;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
      }
      
      .control-btn:hover {
        background-color: var(--primary-hover);
        transform: scale(1.05);
      }
      
      .control-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      .control-btn svg {
        width: 1rem;
        height: 1rem;
      }
      
      .page-info {
        font-size: 0.875rem;
        color: var(--text-secondary);
        font-weight: 500;
        min-width: 4rem;
        text-align: center;
      }
      
      .reading-mode-controls {
        background: var(--background-secondary);
        border-bottom: 1px solid var(--border-color);
        padding: 1rem 0;
      }
      
      .mode-selector h4 {
        margin-bottom: 1rem;
        color: var(--text-primary);
      }
      
      .mode-buttons {
        display: flex;
        gap: 1rem;
      }
      
      .mode-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1rem;
        border: 2px solid var(--border-color);
        background: var(--background-primary);
        border-radius: var(--radius-md);
        cursor: pointer;
        transition: all 0.2s ease;
        font-weight: 500;
        color: var(--text-secondary);
      }
      
      .mode-btn:hover {
        border-color: var(--primary-color);
        color: var(--text-primary);
      }
      
      .mode-btn.active {
        border-color: var(--primary-color);
        background: var(--primary-color);
        color: white;
      }
      
      .mode-btn svg {
        width: 1.25rem;
        height: 1.25rem;
      }
    `;

    document.head.appendChild(style);
  }

  // Полноэкранный режим
  toggleFullscreen() {
    const readingModal = document.getElementById("reading-modal");

    if (!document.fullscreenElement) {
      // Входим в полноэкранный режим
      if (readingModal.requestFullscreen) {
        readingModal.requestFullscreen();
      } else if (readingModal.webkitRequestFullscreen) {
        readingModal.webkitRequestFullscreen();
      } else if (readingModal.msRequestFullscreen) {
        readingModal.msRequestFullscreen();
      }
    } else {
      // Выходим из полноэкранного режима
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }

  updateFullscreenIcon() {
    const expandIcon = document.querySelector(".fullscreen-expand");
    const compressIcon = document.querySelector(".fullscreen-compress");
    const fullscreenBtn = document.getElementById("fullscreen-toggle");
    const readingMenu = document.querySelector(".reading-menu");

    if (document.fullscreenElement) {
      // В полноэкранном режиме - скрываем верхнее меню
      if (expandIcon && compressIcon) {
        expandIcon.style.display = "none";
        compressIcon.style.display = "inline";
      }
      if (fullscreenBtn) {
        fullscreenBtn.title = "Выйти из полноэкранного режима";
      }
      if (readingMenu) {
        readingMenu.style.display = "none";
      }
    } else {
      // Не в полноэкранном режиме - показываем верхнее меню
      if (expandIcon && compressIcon) {
        expandIcon.style.display = "inline";
        compressIcon.style.display = "none";
      }
      if (fullscreenBtn) {
        fullscreenBtn.title = "Полноэкранный режим";
      }
      if (readingMenu) {
        readingMenu.style.display = "block";
      }
    }
  }

  // Public API methods
  getCurrentProgress() {
    return this.currentProgress;
  }

  getReadingMode() {
    return this.readingMode;
  }

  isActive() {
    return this.isReaderActive;
  }
}

// Initialize reader when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.bookReader = new BookReader();
  window.bookReader.init();
});
